import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { reverseGeocode } from "../../../services/geocoding";
import { Input } from "../../Input/Input";
import type {
  InteractiveMapProps,
  MapCoordinates,
  MapSelection,
} from "../InteractiveMap.types";
import {
  DEFAULT_CENTER,
  GOOGLE_MAPS_LIBRARIES,
} from "../InteractiveMap.consts";
import { parseCoordinates } from "../InteractiveMap.utils";

export const MapRuntime = ({
  errorClassName,
  instructionsClassName,
  loadingClassName,
  mapClassName,
  searchClassName,
  googleMapsApiKey,
  initialCoordinates,
  initialAddress,
  searchBoxPlaceholder,
  instructionsText,
  readonly = false,
  onLocationSelect,
  onError,
  mapOptions,
  mapStyle,
  searchStyle,
  instructionsStyle,
  loadingStyle,
  errorStyle,
}: InteractiveMapProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] =
    useState<google.maps.places.SearchBox | null>(null);
  const [searchValue, setSearchValue] = useState(initialAddress ?? "");
  const [selection, setSelection] = useState<MapSelection>({
    position: parseCoordinates(initialCoordinates),
    error: null,
  });
  const [userLocation, setUserLocation] = useState<MapCoordinates | null>(null);
  const requestId = useRef(0);

  useLayoutEffect(() => {
    requestId.current += 1;
    return () => {
      requestId.current += 1;
    };
  }, [readonly]);

  useEffect(() => {
    if (loadError) onError?.(loadError);
  }, [loadError, onError]);

  useEffect(() => {
    if (initialCoordinates || !navigator.geolocation) return;
    let active = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (active)
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
      },
      () => { },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
    return () => {
      active = false;
    };
  }, [initialCoordinates]);

  const selectLocation = useCallback(
    async (position: MapCoordinates) => {
      if (readonly) return;
      const id = ++requestId.current;
      setSelection({ position, error: null });
      map?.setCenter(position);
      map?.setZoom(15);
      try {
        const location = await reverseGeocode(
          position.lat,
          position.lng,
          googleMapsApiKey,
        );
        if (id !== requestId.current) return;
        setSearchValue(location.address);
        onLocationSelect?.({
          ...location,
          coordinates: `${position.lat},${position.lng}`,
        });
      } catch (cause) {
        if (id !== requestId.current) return;
        const error =
          cause instanceof Error
            ? cause
            : new Error("Unable to resolve this location");
        setSelection({ position, error });
        onError?.(error);
      }
    },
    [readonly, map, googleMapsApiKey, onLocationSelect, onError],
  );

  if (loadError)
    return (
      <div
        role="alert"
        className={["interactive-map__error", errorClassName]
          .filter(Boolean)
          .join(" ")}
        style={errorStyle}
      >
        Unable to load the map.
      </div>
    );
  if (!isLoaded)
    return (
      <div
        role="status"
        className={["interactive-map__loading", loadingClassName]
          .filter(Boolean)
          .join(" ")}
        style={loadingStyle}
      >
        Loading map…
      </div>
    );

  return (
    <>
      {!readonly && (
        <div
          className={["interactive-map__search-box", searchClassName]
            .filter(Boolean)
            .join(" ")}
          style={searchStyle}
        >
          <StandaloneSearchBox
            onLoad={setSearchBox}
            onPlacesChanged={() => {
              if (readonly) return;
              const location = searchBox?.getPlaces()?.[0]?.geometry?.location;
              if (location)
                void selectLocation({
                  lat: location.lat(),
                  lng: location.lng(),
                });
            }}
          >
            <Input
              aria-label="Find location"
              placeholder={searchBoxPlaceholder || "Find location..."}
              value={searchValue}
              onChange={setSearchValue}
            />
          </StandaloneSearchBox>
        </div>
      )}
      <GoogleMap
        mapContainerClassName={["interactive-map__map", mapClassName]
          .filter(Boolean)
          .join(" ")}
        mapContainerStyle={mapStyle}
        center={selection.position ?? userLocation ?? DEFAULT_CENTER}
        zoom={selection.position ? 15 : 12}
        options={mapOptions}
        onLoad={setMap}
        onUnmount={() => setMap(null)}
        onClick={
          readonly
            ? undefined
            : (e) => {
              if (e.latLng)
                void selectLocation({
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                });
            }
        }
      >
        {selection.position && (
          <Marker
            position={selection.position}
            draggable={!readonly}
            onDragEnd={
              readonly
                ? undefined
                : (e) => {
                  if (e.latLng)
                    void selectLocation({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                    });
                }
            }
          />
        )}
      </GoogleMap>
      {selection.error && (
        <div
          role="alert"
          className={["interactive-map__error", errorClassName]
            .filter(Boolean)
            .join(" ")}
          style={errorStyle}
        >
          Unable to resolve this location. Choose another location to try again.
        </div>
      )}
      {!readonly && (
        <div
          className={["interactive-map__info", instructionsClassName]
            .filter(Boolean)
            .join(" ")}
          style={instructionsStyle}
        >
          <p>
            {instructionsText ||
              "Click on the map or search for a location to place a pin. You can drag the marker to adjust the location."}
          </p>
        </div>
      )}
    </>
  );
};
