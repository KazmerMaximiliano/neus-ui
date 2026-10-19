# CardFooter

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Wrapping action and metadata region for Card composition.

## Usage

```tsx
import { ThemeProvider, Button, CardFooter } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <CardFooter><span>Draft</span><Button label="Publish" /></CardFooter>
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

Renders a div with wrapping layout, native div attributes and ref. Compose links, buttons
and metadata as children; the footer provides spacing rather than action behavior.

## Props

See [the type source](../../src/components/Card/components/CardFooter/CardFooter.types.ts)
and [implementation](../../src/components/Card/components/CardFooter/CardFooter.tsx) for the
exact contract. All customization props are optional and default to undefined unless noted;
section style props retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `className` | `string` | Omitted | Additional classes on `.card-footer` |
| `children` | `ReactNode` | Omitted | Free-form footer content, including text, JSX, and interactive elements |
| `style` | `CSSProperties \| null` | `null` | Inline styles on `.card-footer` |
| Native attributes and ref | React props for a div | Optional | Forwarded to the root; the type source lists excluded/replaced fields |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.card-footer` | `div` | `className` | `style` | `Always` |

Interaction states use native pseudo-classes and ARIA/data attributes where present.

Use the [stylesheet](../../src/components/Card/components/CardFooter/CardFooter.styles.css)
for pseudo-elements and state selectors. For shared field/listbox parts, also inspect the
shared styles linked from the implementation. Consumer content and third-party generated
internals retain their own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<CardFooter className="example-card-footer" style={{ outlineOffset: 4 }}><span>Draft</span><Button label="Publish" /></CardFooter>
```

```css
.example-card-footer {
  outline-offset: 4px;
}
.example-card-footer:focus-visible {
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
| `--card-footer-padding` | card footer padding | `8px 16px 16px` |
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

The single CardFooter story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
