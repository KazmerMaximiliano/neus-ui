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
  readonly errorClassName?: string;
  readonly instructionsClassName?: string;
  readonly loadingClassName?: string;
  readonly mapClassName?: string;
  readonly searchClassName?: string;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly mapStyle?: CSSProperties;
  readonly searchStyle?: CSSProperties;
  readonly instructionsStyle?: CSSProperties;
  readonly loadingStyle?: CSSProperties;
  readonly errorStyle?: CSSProperties;
  readonly mapOptions?: google.maps.MapOptions;
  readonly onError?: (error: Error) => void;
  readonly googleMapsApiKey: string;
  readonly initialCoordinates?: string;
  readonly initialAddress?: string;
  readonly searchBoxPlaceholder?: string;
  readonly instructionsText?: string;
  readonly readonly?: boolean;
  readonly onLocationSelect?: (location: LocationData) => void;
};

export type MapSelection = { position: MapCoordinates | null; error: Error | null; };
