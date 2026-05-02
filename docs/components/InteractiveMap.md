# InteractiveMap

Interactive map component with location search and coordinate selection powered by Google Maps.

## Props

| Property               | Type                               | Required | Description                             |
| ---------------------- | ---------------------------------- | -------- | --------------------------------------- |
| `googleMapsApiKey`     | `string`                           | ✅       | Google Maps API key                     |
| `initialCoordinates`   | `string`                           | ❌       | Initial coordinates (format: "lat,lng") |
| `initialAddress`       | `string`                           | ❌       | Initial address                         |
| `searchBoxPlaceholder` | `string`                           | ❌       | Search placeholder text                 |
| `instructionsText`     | `string`                           | ❌       | Instructions text                       |
| `readonly`             | `boolean`                          | ❌       | Read-only mode                          |
| `onLocationSelect`     | `(location: LocationData) => void` | ❌       | Callback on location select             |

**LocationData:**

```tsx
type LocationData = {
  address: string;
  country: string;
  state: string;
  city: string;
  coordinates: string;
};
```

## Usage Example

```tsx
import { InteractiveMap } from "@neus-ui/components";
import { useState } from "react";

export function LocationSelector() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div>
      <InteractiveMap
        googleMapsApiKey="your-api-key-here"
        initialAddress="Buenos Aires, Argentina"
        searchBoxPlaceholder="Search a location..."
        instructionsText="Click on the map or search an address"
        onLocationSelect={setSelectedLocation}
      />

      {selectedLocation && (
        <div>
          <p>Address: {selectedLocation.address}</p>
          <p>Country: {selectedLocation.country}</p>
          <p>Coordinates: {selectedLocation.coordinates}</p>
        </div>
      )}
    </div>
  );
}
```
