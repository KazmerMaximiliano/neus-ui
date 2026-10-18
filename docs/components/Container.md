# Container

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Centers page content at a maximum width with responsive side padding.

## Usage

```tsx
import { ThemeProvider, Container, Heading } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Container as="header" size="xl">
        <Heading as="h1" size="md">AuraFlow</Heading>
      </Container>
    </ThemeProvider>
  );
};
```

Section already wraps its content in a Container; use Container directly for headers,
footers and content outside a band.

## Behavior and accessibility

Container is a passive layout element. `size` picks the maximum width from
`--container-<size>-max-width` (`full` has none); the width includes the gutter. `gutter`
(default true) adds `--container-gutter` on both sides, a `clamp()` that grows with the
viewport. `as` selects a landmark when the container is one (`main`, `header`, `footer`).
The root class is `.layout-container`, not `.container`, so Tailwind's and Bootstrap's
`.container` cannot restyle it.

## Props

See [the type source](../../src/components/Container/Container.types.ts) and
[implementation](../../src/components/Container/Container.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `as` | `"div" \| "section" \| "header" \| "footer" \| "main"` | `"div"` | Rendered element |
| `size` | `ContainerSize` | `"lg"` | Maximum width |
| `gutter` | `boolean` | `true` | Responsive side padding |
| `children` | `ReactNode` | Omitted | Content |
| `className` | `string` | Omitted | Additional classes on `.layout-container` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.layout-container` |
| Native attributes and ref | React props for the `as` element | Optional | Forwarded to the element |

### Supporting types

```ts
type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.layout-container` | `as` element (`div`) | `className` | `style` | `Always` |

State/variant selectors: `.layout-container[data-size]`, `.layout-container[data-gutter="false"]`.
Use the [stylesheet](../../src/components/Container/Container.styles.css) for the exact
declarations.

### Instance styles and classes

```tsx
<Container className="example-container" style={{ paddingBlock: 24 }}>Content</Container>
```

```css
.example-container {
  display: flex;
  align-items: center;
}
```

Style props win over ordinary stylesheet declarations for the same property. Use a
stylesheet for hover, focus and pseudo-elements. Custom properties still follow CSS
inheritance, scope resets and specificity; see [the cascade guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [layout baseline recipe](../../src/design-systems/neus/generated/recipes/layout.css)

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--container-sm-max-width` | container sm max width | `640px` |
| `--container-md-max-width` | container md max width | `768px` |
| `--container-lg-max-width` | container lg max width | `1120px` |
| `--container-xl-max-width` | container xl max width | `1280px` |
| `--container-gutter` | container gutter | `clamp(16px, 4vw, 32px)` |

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
  --container-lg-max-width: 1200px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Container story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider. Related:
[Section](./Section.md), [Stack](./Stack.md), [Grid](./Grid.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
