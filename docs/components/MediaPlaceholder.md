# MediaPlaceholder

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A sized frame that stands in for a picture not taken yet and says what it will show.

## Usage

```tsx
import { ThemeProvider, MediaPlaceholder } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      {/* SAMPLE: replace with the clinic's own photo. */}
      <MediaPlaceholder label="Vet examining a dog in the consulting room" ratio="4 / 3" />
    </ThemeProvider>
  );
};
```

Use it where a public page needs a real picture the project does not have yet: the hero, the
team, the place. It keeps the layout and the rhythm of the final page, and its label tells
whoever supplies the photos what to shoot. Mark each one `SAMPLE:` in the code; never replace
it with stock imagery, gradients or a fake interface.

## Behavior and accessibility

The frame is `role="img"` with the label as its accessible name; the visible label is hidden
from assistive technology so it is read once. `ratio` sets the CSS `aspect-ratio` through the
inline `--media-placeholder-ratio` custom property, so the frame keeps its proportions at
every width. It takes the width of its container.

## Props

See [the type source](../../src/components/MediaPlaceholder/MediaPlaceholder.types.ts) and
[implementation](../../src/components/MediaPlaceholder/MediaPlaceholder.tsx) for the exact
contract. All props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `label` | `string` | Required | What the real picture will show; also the accessible name |
| `ratio` | `string` | `"4 / 3"` | CSS aspect ratio of the frame |
| `className` | `string` | Omitted | Additional classes on `.media-placeholder` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.media-placeholder`, merged after the ratio |
| `labelClassName` | `string` | Omitted | Additional classes on `.media-placeholder__label` |
| `labelStyle` | `CSSProperties` | Omitted | Inline styles on `.media-placeholder__label` |
| Native attributes and ref | React props for a `div` | Optional | Forwarded to the frame |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.media-placeholder` | `div` | `className` | `style` | `Always` |
| `.media-placeholder__label` | `span` | `labelClassName` | `labelStyle` | `Always` |

Use the [stylesheet](../../src/components/MediaPlaceholder/MediaPlaceholder.styles.css) for the
exact declarations.

### Instance styles and classes

```tsx
<MediaPlaceholder className="hero-picture" label="The clinic's front door on Bv. Oroño" ratio="3 / 4" />
```

```css
.hero-picture {
  min-height: 100%;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files.

- [media-placeholder baseline recipe](../../src/design-systems/neus/generated/recipes/media-placeholder.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--media-placeholder-background` | media placeholder background | `var(--color-surface-container-low)` |
| `--media-placeholder-stripe` | media placeholder stripe | `color-mix(in srgb, var(--color-text-primary) 6%, transparent)` |
| `--media-placeholder-color` | media placeholder color | `var(--color-text-secondary)` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--media-placeholder-radius` | media placeholder radius | `var(--radius-default)` |
| `--media-placeholder-padding` | media placeholder padding | `var(--space-4)` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--media-placeholder-font-family` | media placeholder font family | `var(--font-mono)` |
| `--media-placeholder-font-size` | media placeholder font size | `var(--fs-xs)` |

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --media-placeholder-radius: 0px;
}
```

## Storybook and related guides

The single MediaPlaceholder story exposes props as controls. Related: [Card](./Card.md),
[CardMedia](./CardMedia.md) for real pictures, [Section](./Section.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
