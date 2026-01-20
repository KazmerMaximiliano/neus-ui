import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { reverseGeocode } from "../../services/geocoding";
import { Input } from "../Input/Input";
import { useColors } from "../theme";
import "./InteractiveMap.styles.css";
import { InteractiveMapProps } from "./InteractiveMap.types";

const GOOGLE_MAPS_LIBRARIES: "places"[] = ["places"];

export const InteractiveMap = ({
  googleMapsApiKey,
  initialCoordinates,
  initialAddress,
  searchBoxPlaceholder,
  instructionsText,
  readonly = false,
  onLocationSelect,
}: InteractiveMapProps) => {
  const colors = useColors();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const handleMapClickRef = useRef<(lat: number, lng: number) => Promise<void>>(
    async () => {},
  );

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const defaultCenter = useMemo(() => {
    if (initialCoordinates) {
      const [lat, lng] = initialCoordinates.split(",").map(Number);
      return { lat, lng };
    }
    if (userLocation) {
      return userLocation;
    }
    return { lat: -31.4201, lng: -64.1888 };
  }, [initialCoordinates, userLocation]);

  // Set initial marker position if coordinates are provided
  useEffect(() => {
    if (initialCoordinates) {
      const [lat, lng] = initialCoordinates.split(",").map(Number);
      setMarkerPosition({ lat, lng });
    }
  }, [initialCoordinates]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const onSearchBoxLoad = useCallback((ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  }, []);

  const updateLocationFromCoordinates = useCallback(
    async (lat: number, lng: number) => {
      try {
        const locationData = await reverseGeocode(lat, lng, googleMapsApiKey);

        if (onLocationSelect) {
          onLocationSelect({
            coordinates: `${lat},${lng}`,
            address: locationData.address,
            country: locationData.country,
            state: locationData.state,
            city: locationData.city,
          });
        }
      } catch (error) {
        console.error("Error en reverse geocoding:", error);
      }
    },
    [onLocationSelect],
  );

  const onPlacesChanged = useCallback(async () => {
    if (!searchBox) return;

    const places = searchBox.getPlaces();
    if (!places || places.length === 0) return;

    const place = places[0];
    if (!place.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    await handleMapClickRef.current(lat, lng);
  }, [searchBox]);

  useEffect(() => {
    handleMapClickRef.current = async (lat: number, lng: number) => {
      if (!map) return;

      setMarkerPosition({ lat, lng });

      map.setCenter({ lat, lng });
      map.setZoom(15);

      await updateLocationFromCoordinates(lat, lng);
    };
  }, [map, updateLocationFromCoordinates]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          if (import.meta.env.DEV) {
            console.debug("Geolocation error:", error.message);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        },
      );
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="map-loading">
        <BeatLoader color={colors.primary.main} speedMultiplier={0.5} />
      </div>
    );
  }

  return (
    <div className="interactive-map-container">
      {!readonly && (
        <div className="search-box-wrapper">
          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <Input
              type="text"
              placeholder={searchBoxPlaceholder || "Find location..."}
              value={initialAddress || ""}
            ></Input>
          </StandaloneSearchBox>
        </div>
      )}

      <GoogleMap
        mapContainerClassName="map-container"
        center={defaultCenter}
        zoom={initialCoordinates ? 15 : 12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={(e) => {
          if (e.latLng) {
            handleMapClickRef.current(e.latLng.lat(), e.latLng.lng());
          }
        }}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable={true}
            onDragEnd={(e) => {
              if (e.latLng) {
                const lat = e.latLng.lat();
                const lng = e.latLng.lng();
                setMarkerPosition({ lat, lng });
                updateLocationFromCoordinates(lat, lng);
              }
            }}
          />
        )}
      </GoogleMap>

      {!readonly && (
        <div className="map-info">
          {instructionsText ? (
            <p>{instructionsText}</p>
          ) : (
            <p>
              Click on the map or search for a location to place a pin <br />
              You can drag the marker to adjust the location
            </p>
          )}
        </div>
      )}
    </div>
  );
};
