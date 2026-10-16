# InteractiveMap

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Google Maps location picker with search, reverse geocoding and error states.

## Usage

```tsx
import { ThemeProvider, InteractiveMap } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <InteractiveMap googleMapsApiKey="YOUR_GOOGLE_MAPS_KEY" initialCoordinates="-31.4201,-64.1888" onLocationSelect={(location) => console.log(location.coordinates)} />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

Requires a configured Google Maps API key and the services needed for maps, places and
geocoding. Blank keys and invalid coordinates produce an alert and call onError. Initial
coordinates are a lat,lng string. Without coordinates the component can request geolocation,
with a fallback center. Selection and marker dragging trigger reverse geocoding; the latest
request wins and stale completions are ignored.

Readonly removes search/instructions and blocks map/marker changes. `mapOptions` configures
the Google map; `mapStyle`/`mapClassName` target the map container. Search and instructions
props target Neus wrappers, not Google autocomplete internals. Google-controlled overlays
and tiles are outside the per-part contract and can live outside local theme scopes. Tests
should mock the service and browser APIs rather than require a real key.

## Props

Selection is internal. Changing the API key, initialCoordinates or initialAddress remounts
the map runtime and resets its selection. There is no controlled location value prop.

See [the type source](../../src/components/InteractiveMap/InteractiveMap.types.ts) and
[implementation](../../src/components/InteractiveMap/InteractiveMap.tsx) for the exact
contract. All customization props are optional and default to undefined unless noted;
section style props retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `errorClassName` | `string` | Omitted | Additional classes on `.interactive-map__error` |
| `instructionsClassName` | `string` | Omitted | Additional classes on `.interactive-map__info` |
| `loadingClassName` | `string` | Omitted | Additional classes on `.interactive-map__loading` |
| `mapClassName` | `string` | Omitted | Additional classes on `.interactive-map__map` |
| `searchClassName` | `string` | Omitted | Additional classes on `.interactive-map__search-box` |
| `className` | `string` | Omitted | Additional classes on `.interactive-map` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.interactive-map` |
| `mapStyle` | `CSSProperties` | Omitted | Inline styles on `.interactive-map__map` |
| `searchStyle` | `CSSProperties` | Omitted | Inline styles on `.interactive-map__search-box` |
| `instructionsStyle` | `CSSProperties` | Omitted | Inline styles on `.interactive-map__info` |
| `loadingStyle` | `CSSProperties` | Omitted | Inline styles on `.interactive-map__loading` |
| `errorStyle` | `CSSProperties` | Omitted | Inline styles on `.interactive-map__error` |
| `mapOptions` | `google.maps.MapOptions` | Omitted | mapOptions override |
| `onError` | `((error: Error) => void)` | Omitted | Reports map errors |
| `googleMapsApiKey` | `string` | Required | Google Maps API key for map functionality |
| `initialCoordinates` | `string` | Omitted | Initial coordinates in 'lat,lng' format |
| `initialAddress` | `string` | Omitted | Initial address to display in search box |
| `searchBoxPlaceholder` | `string` | Omitted | Placeholder text for the search box |
| `instructionsText` | `string` | Omitted | Custom instructions text below the map |
| `readonly` | `boolean` | `false` | If true, the map is in read-only mode |
| `onLocationSelect` | `((location: LocationData) => void)` | Omitted | Callback when a location is selected |

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/InteractiveMap/index.ts). A type shown here is not
necessarily a package export.

```ts
type LocationData = {
  address: string;
  country: string;
  state: string;
  city: string;
  coordinates: string;
};

type MapCoordinates = { lat: number; lng: number; };
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.interactive-map` | `div` | `className` | `style` | `Always` |
| `.interactive-map__error` | `div` | `errorClassName` | `errorStyle` | `error` |
| `.interactive-map__loading` | `div` | `loadingClassName` | `loadingStyle` | `Always` |
| `.interactive-map__search-box` | `div` | `searchClassName` | `searchStyle` | `!readonly` |
| `.interactive-map__map` | `GoogleMap` | `mapContainerClassName`, `mapClassName` | `mapContainerStyle`, `mapStyle` | `Always` |
| `.interactive-map__info` | `div` | `instructionsClassName` | `instructionsStyle` | `!readonly` |

Interaction states use native pseudo-classes and ARIA/data attributes where present.

Use the [stylesheet](../../src/components/InteractiveMap/InteractiveMap.styles.css) for
pseudo-elements and state selectors. For shared field/listbox parts, also inspect the shared
styles linked from the implementation. Consumer content and third-party generated internals
retain their own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<InteractiveMap searchClassName="example-interactive-map" searchStyle={{ outlineOffset: 4 }} googleMapsApiKey="YOUR_GOOGLE_MAPS_KEY" initialCoordinates="-31.4201,-64.1888" onLocationSelect={(location) => console.log(location.coordinates)} />
```

```css
.example-interactive-map {
  outline-offset: 4px;
}
.example-interactive-map:focus-visible {
  outline: 2px solid var(--color-focus);
}
```

Style props win over ordinary stylesheet declarations for the same property. Use a
stylesheet for hover, focus, disabled states and pseudo-elements. Custom properties still
follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [interactive-map baseline recipe](../../src/design-systems/neus/generated/recipes/interactive-map.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--interactive-map-background` | interactive map background | `var(--color-surface)` |
| `--interactive-map-border-color` | interactive map border color | `var(--color-border-subtle)` |
| `--interactive-map-border-width` | interactive map border width | `1px` |
| `--interactive-map-color` | interactive map color | `var(--color-text-primary)` |
| `--interactive-map-shadow` | interactive map shadow | `none` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--interactive-map-height` | interactive map height | `400px` |
| `--interactive-map-muted` | interactive map muted | `var(--color-text-secondary)` |
| `--interactive-map-padding` | interactive map padding | `16px` |
| `--interactive-map-radius` | interactive map radius | `var(--radius-default)` |
| `--interactive-map-state-height` | interactive map state height | `120px` |
| `--interactive-map-state-padding` | interactive map state padding | `32px` |

### Shared dependencies and runtime values

`--color-error-text`, `--font-body`, `--type-body-line-height`, `--type-caption-size`.

Semantic/foundation tokens are described in [the shared token
reference](../design/tokens.md). Component dependencies belong to their own linked recipe.
Position, size, category and progress variables set by the implementation are runtime
values, not provider configuration fields.

### Scoped recipe override

Wrap the usage example in a local provider with a class:

```tsx
<ThemeProvider scope="local" designSystem="vercel" className="example-scope">
  {/* Place the component usage here. */}
</ThemeProvider>
```

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --interactive-map-padding: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single InteractiveMap story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
