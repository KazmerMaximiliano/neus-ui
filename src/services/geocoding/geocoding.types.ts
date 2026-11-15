export type LocationData = {
  address: string;
  country: string;
  state: string;
  city: string;
};

export type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

export type GeocodeResult = {
  formatted_address: string;
  address_components: AddressComponent[];
};
