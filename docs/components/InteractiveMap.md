# InteractiveMap

Location picker backed by Google Maps. The six recipes style its surrounding
interface; `mapOptions` configures Google cartography.

| Prop | Type | Purpose |
| --- | --- | --- |
| `googleMapsApiKey` | `string`, required | Consumer's Google Maps key |
| `initialCoordinates` | `string` | Initial `latitude,longitude` in valid ranges |
| `initialAddress` | `string` | Initial search text |
| `searchBoxPlaceholder`, `instructionsText` | `string` | Interface copy |
| `readonly` | `boolean` | Explore without selecting or dragging a marker |
| `mapOptions` | `google.maps.MapOptions` | Map appearance and navigation options |
| `onLocationSelect` | `(location: LocationData) => void` | Latest successful selection |
| `onError` | `(error: Error) => void` | Invalid configuration, SDK or geocoding failure |
| `className`, `style` | `string`, `CSSProperties` | Root customization |
| `mapStyle`, `searchStyle`, `instructionsStyle` | `CSSProperties` | Part customization |
| `loadingStyle`, `errorStyle` | `CSSProperties` | State customization |

```tsx
<InteractiveMap googleMapsApiKey={mapsKey}
  initialCoordinates="-31.4201,-64.1888"
  mapOptions={{ disableDefaultUI: true }}
  onLocationSelect={setLocation} onError={reportMapError} />
```

Invalid configuration is reported before calling the SDK. Later selections supersede
pending reverse-geocoding requests. See [migration and validation](../refactor-migration.md).
