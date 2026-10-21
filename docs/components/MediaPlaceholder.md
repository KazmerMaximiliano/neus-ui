# MediaPlaceholder

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A sized frame that stands in for a picture not taken yet and says what it will show. With a
Pixabay key it previews a matching stock photo while the page is designed.

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
whoever supplies the photos what to shoot. Mark each one `SAMPLE:` in the code; never ship stock
imagery as the final picture, and never replace it with gradients or a fake interface.

To see the page with pictures while it is designed, pass a [Pixabay API key](https://pixabay.com/api/docs/)
in development and a short `query`:

```tsx
{/* SAMPLE: replace with the clinic's own photo. */}
<MediaPlaceholder
  label="Vet examining a dog in the consulting room"
  query="vet dog"
  pixabayKey={import.meta.env.DEV ? import.meta.env.VITE_PIXABAY_KEY : undefined}
/>
```

Keep the key in `.env.development.local`. `npx neus context` names the variable it finds and
the expression to pass; for Next.js it is
`process.env.NODE_ENV === "development" ? process.env.NEXT_PUBLIC_PIXABAY_KEY : undefined`.

## Behavior and accessibility

The frame is `role="img"` with the label as its accessible name; the visible label is hidden
from assistive technology so it is read once. `ratio` sets the CSS `aspect-ratio` through the
inline `--media-placeholder-ratio` custom property, so the frame keeps its proportions at
every width. It takes the width of its container.

### Photo preview

Without `pixabayKey` the component never touches the network. With a key, after hydration it
asks Pixabay for one photo that matches `query` (or `label` when `query` is omitted), with safe
search on. The frame's `ratio` picks a horizontal or vertical photo, and its language (`lang`,
or the page's `<html lang>`) is sent when Pixabay supports it. The striped placeholder stays
while the photo loads, when nothing matches, when the search fails and when the photo does not
load; once loaded, the photo fades in over the frame (no fade with reduced motion) with
"Pixabay" and its author in a corner; a long name is cut, the source never is. The `<img>` has an empty `alt`: the frame stays the only
image, named by `label`, and the credit is hidden from assistive technology.

- Pixabay matches every word, so a sentence often finds nothing. Use two or three words in the
  page's language.
- Answers are cached for 24 hours, as Pixabay's terms require, in memory and in
  `localStorage` (without the key). Identical frames share one request; failures are not
  cached. The API allows 100 requests per minute per key.
- Pixabay allows its photo URLs only for temporary display. A preview is not the delivered
  picture: the frame stays marked `SAMPLE:` until the real photo replaces it.
- The key is visible in the browser. Pass it only in development, as in the example above, so
  production builds do not carry it.
- Server rendering and the first client render show the placeholder. A frame rendered as
  static HTML (an island without a client directive) never searches. A Content Security
  Policy that blocks `pixabay.com` or `cdn.pixabay.com` leaves the placeholder.

## Props

See [the type source](../../src/components/MediaPlaceholder/MediaPlaceholder.types.ts) and
[implementation](../../src/components/MediaPlaceholder/MediaPlaceholder.tsx) for the exact
contract. All props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `label` | `string` | Required | What the real picture will show; also the accessible name |
| `ratio` | `string` | `"4 / 3"` | CSS aspect ratio of the frame; also the preview photo's orientation |
| `query` | `string` | `label` | Words for the preview search, in the page's language |
| `pixabayKey` | `string` | Omitted | Pixabay API key that turns on the photo preview; development only |
| `className` | `string` | Omitted | Additional classes on `.media-placeholder` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.media-placeholder`, merged after the ratio |
| `labelClassName` | `string` | Omitted | Additional classes on `.media-placeholder__label` |
| `labelStyle` | `CSSProperties` | Omitted | Inline styles on `.media-placeholder__label` |
| `imageClassName` | `string` | Omitted | Additional classes on `.media-placeholder__image` |
| `imageStyle` | `CSSProperties` | Omitted | Inline styles on `.media-placeholder__image` |
| `creditClassName` | `string` | Omitted | Additional classes on `.media-placeholder__credit` |
| `creditStyle` | `CSSProperties` | Omitted | Inline styles on `.media-placeholder__credit` |
| Native attributes and ref | React props for a `div` | Optional | Forwarded to the frame; `lang` also sets the search language |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.media-placeholder` | `div` | `className` | `style` | `Always` |
| `.media-placeholder__label` | `span` | `labelClassName` | `labelStyle` | `Always` |
| `.media-placeholder__image` | `img` | `imageClassName` | `imageStyle` | `pixabayKey` given and a photo found |
| `.media-placeholder__credit` | `span` | `creditClassName` | `creditStyle` | Photo loaded |

State selector: `.media-placeholder__image[data-loaded="true"]`.

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
| `--media-placeholder-credit-background` | photo credit background | `color-mix(in srgb, var(--color-black) 60%, transparent)` |
| `--media-placeholder-credit-color` | photo credit color | `var(--color-white)` |

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

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--media-placeholder-transition` | preview photo fade-in | `opacity 0.2s ease` |

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
