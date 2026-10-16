import type { CSSProperties } from "react";

export type LocationData = {
  address: string;
  country: string;
  state: string;
  city: string;
  coordinates: string;
};

export type MapCoordinates = { lat: number; lng: number; };

export type InteractiveMapProps = {
  errorClassName?: string;
  instructionsClassName?: string;
  loadingClassName?: string;
  mapClassName?: string;
  searchClassName?: string;
  className?: string;
  style?: CSSProperties;
  mapStyle?: CSSProperties;
  searchStyle?: CSSProperties;
  instructionsStyle?: CSSProperties;
  loadingStyle?: CSSProperties;
  errorStyle?: CSSProperties;
  mapOptions?: google.maps.MapOptions;
  onError?: (error: Error) => void;
  googleMapsApiKey: string;
  initialCoordinates?: string;
  initialAddress?: string;
  searchBoxPlaceholder?: string;
  instructionsText?: string;
  readonly?: boolean;
  onLocationSelect?: (location: LocationData) => void;
};

export type MapSelection = { position: MapCoordinates | null; error: Error | null; };
