# Badge

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Status indicator with solid and dot variants.

## Usage

```tsx
import { ThemeProvider, Badge } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Badge label="Active" color="success" variant="dot" />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

The dot exists only for `variant="dot"`. The label is a text node inside the root; root
typography styles it. Badge is presentational and adds no live-region behavior. Supply
surrounding semantics when a status change must be announced.

## Props

See [the type source](../../src/components/Badge/Badge.types.ts) and
[implementation](../../src/components/Badge/Badge.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `className` | `string` | Omitted | Additional classes on `.badge` |
| `dotClassName` | `string` | Omitted | Additional classes on `.badge__dot` |
| `label` | `string` | Required | Text displayed inside the badge |
| `variant` | `BadgeVariant` | `"solid"` | Visual style of the badge |
| `color` | `BadgeColor` | `"neutral"` | Semantic color of the badge |
| `badgeStyle` | `CSSProperties` | Omitted | Inline styles on `.badge` |
| `dotStyle` | `CSSProperties` | Omitted | Inline styles on `.badge__dot` |

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/Badge/index.ts). A type shown here is not necessarily a
package export.

```ts
type BadgeVariant = "solid" | "dot";

type BadgeColor = "primary" | "success" | "error" | "info" | "neutral";
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.badge` | `span` | `className` | `badgeStyle` | `Always` |
| `.badge__dot` | `span` | `dotClassName` | `dotStyle` | `variant === "dot"` |

State/variant selectors: `.badge--dot`, `.badge--error`, `.badge--info`, `.badge--neutral`,
`.badge--primary`, `.badge--solid`, `.badge--success`.

Use the [stylesheet](../../src/components/Badge/Badge.styles.css) for pseudo-elements and
state selectors. For shared field/listbox parts, also inspect the shared styles linked from
the implementation. Consumer content and third-party generated internals retain their own
customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<Badge dotClassName="example-badge" dotStyle={{ outlineOffset: 4 }} label="Active" color="success" variant="dot" />
```

```css
.example-badge {
  outline-offset: 4px;
}
.example-badge:focus-visible {
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

- [badge baseline recipe](../../src/design-systems/neus/generated/recipes/badge.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--badge-border-color` | badge border color | `transparent` |
| `--badge-border-width` | badge border width | `0px` |
| `--badge-dot-border-width` | badge dot border width | `0px` |
| `--badge-dot-label-color` | badge dot label color | `var(--color-text-secondary)` |
| `--badge-shadow` | badge shadow | `none` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--badge-dot-font-size` | badge dot font size | `0.75em` |
| `--badge-dot-font-weight` | badge dot font weight | `400` |
| `--badge-font-family` | badge font family | `var(--font-body)` |
| `--badge-font-size` | badge font size | `0.65em` |
| `--badge-font-weight` | badge font weight | `700` |
| `--badge-letter-spacing` | badge letter spacing | `0.08em` |
| `--badge-line-height` | badge line height | `normal` |
| `--badge-text-mix` | badge text mix | `55%` |
| `--badge-text-transform` | badge text transform | `uppercase` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--badge-dot-radius` | badge dot radius | `50%` |
| `--badge-dot-size` | badge dot size | `6px` |
| `--badge-gap` | badge gap | `0.4em` |
| `--badge-padding` | badge padding | `0.3em 0.8em` |
| `--badge-radius` | badge radius | `2em` |

### Shared dependencies and runtime values

`--badge-accent`, `--badge-accent-subtle`, `--badge-accent-text`, `--color-error`,
`--color-error-light`, `--color-gray-150`, `--color-gray-400`, `--color-info`,
`--color-info-light`, `--color-primary`, `--color-primary-light`, `--color-primary-text`,
`--color-success`, `--color-success-light`, `--color-text-primary`,
`--color-text-secondary`.

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
  --badge-dot-radius: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Badge story exposes props as controls. Design selection is preview configuration;
applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
