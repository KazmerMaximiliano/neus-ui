# Link

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Styled native anchor with primary and secondary treatments.

## Usage

```tsx
import { ThemeProvider, Link } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Link href="/settings" label="Settings" type="primary" />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

Forwards native anchor attributes and ref; label replaces children. `type` is a visual
primary/secondary choice, not an HTML anchor attribute. Native href, target, rel and event
semantics remain available. Style visited, hover and focus states through CSS. The root
accepts className and nullable style.

## Props

See [the type source](../../src/components/Link/Link.types.ts) and
[implementation](../../src/components/Link/Link.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `className` | `string` | Omitted | Additional classes on `.link` |
| `label` | `string` | Required | The text content of the link |
| `type` | `LinkType` | `"primary"` | The visual style variant of the link |
| `style` | `CSSProperties \| null` | `null` | Inline styles on `.link` |
| Native attributes and ref | React props for an anchor | Optional | Forwarded to the root; the type source lists excluded/replaced fields |

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/Link/index.ts). A type shown here is not necessarily a
package export.

```ts
type LinkType = "primary" | "secondary";
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.link` | `a` | `className` | `style` | `Always` |

State/variant selectors: `.link--primary`, `.link--secondary`.

Use the [stylesheet](../../src/components/Link/Link.styles.css) for pseudo-elements and
state selectors. For shared field/listbox parts, also inspect the shared styles linked from
the implementation. Consumer content and third-party generated internals retain their own
customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<Link className="example-link" style={{ outlineOffset: 4 }} href="/settings" label="Settings" type="primary" />
```

```css
.example-link {
  outline-offset: 4px;
}
.example-link:focus-visible {
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

- [link baseline recipe](../../src/design-systems/neus/generated/recipes/link.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--link-color` | link color | `var(--color-primary-text)` |
| `--link-secondary-color` | link secondary color | `var(--color-text-secondary)` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--link-decoration` | link decoration | `none` |
| `--link-decoration-thickness` | link decoration thickness | `from-font` |
| `--link-padding` | link padding | `0` |
| `--link-radius` | link radius | `2px` |
| `--link-transition` | link transition | `color 0.2s ease, background-color 0.2s ease` |
| `--link-underline-offset` | link underline offset | `auto` |

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--link-focus-color` | link focus color | `var(--color-focus)` |
| `--link-focus-offset` | link focus offset | `2px` |
| `--link-focus-width` | link focus width | `2px` |
| `--link-hover-background` | link hover background | `transparent` |
| `--link-hover-decoration` | link hover decoration | `underline` |
| `--link-hover-primary-color` | link hover primary color | `var(--link-color)` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--link-font-weight` | link font weight | `inherit` |

### Shared dependencies and runtime values

`--link-hover-color`.

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
  --link-padding: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Link story exposes props as controls. Design selection is preview configuration;
applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
