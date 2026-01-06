interface LocationData {
  address: string;
  country: string;
  state: string;
  city: string;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GeocodeResult {
  formatted_address: string;
  address_components: AddressComponent[];
}

// Perform reverse geocoding of coordinates using Google Geocoding API
export async function reverseGeocode(
  lat: number,
  lng: number
): Promise<LocationData> {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!googleMapsApiKey) {
    throw new Error("VITE_GOOGLE_MAPS_API_KEY no está configurada");
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}&language=es`
    );

    if (!response.ok) {
      throw new Error(`Error en geocoding: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.status !== "OK" || data.results.length === 0) {
      throw new Error("No se encontraron resultados de geocoding");
    }

    const result: GeocodeResult = data.results[0];
    const locationData = extractLocationData(result);

    return locationData;
  } catch (error) {
    console.error("Error en reverse geocoding:", error);
    throw error;
  }
}

// Extracts location information from Google's address_components
function extractLocationData(result: GeocodeResult): LocationData {
  const components = result.address_components;

  let country = "";
  let state = "";
  let city = "";

  // Map types of components to location information
  components.forEach((component: AddressComponent) => {
    const types = component.types;

    if (types.includes("country")) {
      country = component.long_name;
    }
    if (
      types.includes("administrative_area_level_1") ||
      types.includes("administrative_area_level_2")
    ) {
      // Take the first one (usually the state/province)
      if (!state) {
        state = component.long_name;
      }
    }
    if (types.includes("locality")) {
      city = component.long_name;
    }

    // If locality is not found, check for sublocality or administrative_area_level_3
    if (!city && types.includes("administrative_area_level_3")) {
      city = component.long_name;
    }
  });

  return {
    address: result.formatted_address,
    country,
    state,
    city,
  };
}
