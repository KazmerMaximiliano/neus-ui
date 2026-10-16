# CardMedia

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Polymorphic media region for native or custom elements.

## Usage

```tsx
import { ThemeProvider, CardMedia } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <CardMedia component="img" src="/cover.jpg" alt="Mountain landscape" />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

`component` defaults to `img`. Native/custom props and refs follow the selected element.
Void elements reject children; video, audio, iframe and custom components can receive their
corresponding props. Supply alt text for images and titles for frames, and native controls
where appropriate. Custom components must forward className, style and ref to preserve media
styling. Neus styles the selected media element, not its external content.

## Props

See [the type source](../../src/components/Card/components/CardMedia/CardMedia.types.ts) and
[implementation](../../src/components/Card/components/CardMedia/CardMedia.tsx) for the exact
contract. All customization props are optional and default to undefined unless noted;
section style props retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `component` | `C` | `"img"` | Element to render. The API also accepts custom React components with inferred props. |
| `className` | `string` | Omitted | Additional classes for class name |
| `style` | `CSSProperties \| null` | `null` | Inline styles for style |
| Native attributes and ref | React props for the selected element | Optional | Forwarded to the root; the type source lists excluded/replaced fields |

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/Card/index.ts). A type shown here is not necessarily a
package export.

```ts
type VoidElement =
  | "area" | "base" | "br" | "col" | "embed" | "hr" | "img" | "input"
  | "link" | "meta" | "param" | "source" | "track" | "wbr";
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |

Interaction states use native pseudo-classes and ARIA/data attributes where present.

Use the [stylesheet](../../src/components/Card/components/CardMedia/CardMedia.styles.css)
for pseudo-elements and state selectors. For shared field/listbox parts, also inspect the
shared styles linked from the implementation. Consumer content and third-party generated
internals retain their own customization APIs.

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [card baseline recipe](../../src/design-systems/neus/generated/recipes/card.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--card-background` | card background | `var(--color-surface)` |
| `--card-border-color` | card border color | `var(--color-border-input)` |
| `--card-border-width` | card border width | `1px` |
| `--card-color` | card color | `var(--color-text-primary)` |
| `--card-elevated-background` | card elevated background | `var(--color-surface)` |
| `--card-elevated-shadow` | card elevated shadow | `var(--elevation-floating)` |
| `--card-filled-background` | card filled background | `var(--color-surface-secondary)` |
| `--card-filled-border-width` | card filled border width | `0px` |
| `--card-header-border-color` | card header border color | `var(--card-border-color)` |
| `--card-header-border-width` | card header border width | `1px` |
| `--card-nested-background` | card nested background | `var(--card-background)` |
| `--card-outlined-background` | card outlined background | `var(--color-surface)` |
| `--card-outlined-border-width` | card outlined border width | `1px` |
| `--card-shadow` | card shadow | `none` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--card-content-padding` | card content padding | `16px` |
| `--card-footer-gap` | card footer gap | `8px` |
| `--card-footer-padding` | card footer padding | `8px` |
| `--card-header-gap` | card header gap | `8px` |
| `--card-header-padding` | card header padding | `16px` |
| `--card-media-object-fit` | card media object fit | `cover` |
| `--card-media-object-position` | card media object position | `center` |
| `--card-radius` | card radius | `var(--radius-default)` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--card-font-family` | card font family | `var(--font-body)` |

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
  --card-content-padding: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

Related composition: [Card](./Card.md).

The single CardMedia story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
