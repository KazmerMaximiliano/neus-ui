export type LocationData = {
  address: string;
  country: string;
  state: string;
  city: string;
  coordinates: string;
}

export type InteractiveMapProps = {
  googleMapsApiKey: string;
  initialCoordinates?: string;
  initialAddress?: string;
  searchBoxPlaceholder?: string;
  instructionsText?: string;
  onLocationSelect: (location: LocationData) => void;
}