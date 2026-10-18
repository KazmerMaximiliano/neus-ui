# Stack

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Lays children out in a column or a row with a gap from the space scale, optionally changing
at the 768px and 1024px breakpoints.

## Usage

```tsx
import { ThemeProvider, Button, Stack } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Stack direction={{ base: "column", md: "row" }} gap={3} align="center">
        <Button label="Start free" href="#signup" />
        <Button label="See plans" variant="outlined" href="#plans" />
      </Stack>
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

`direction` and `gap` take one value or `{ base, md, lg }`; `md` applies from 768px and `lg`
from 1024px, the breakpoints Sidebar uses. Missing breakpoints inherit the previous one.
Gaps are steps of `--space-*` (0, 1, 2, 3, 4, 6, 8, 12, 16). The values become inline custom
properties (`--stack-direction`, `--stack-direction-md`, `--stack-direction-lg` and the same
for `--stack-gap`) read by media queries, so the layout changes in CSS, with server rendering
and islands. Every stack resets them, so a nested stack never inherits its parent's layout.
`as="ul"` or `"ol"` removes list markers and spacing while keeping list semantics; give it
`li` children.

## Props

See [the type source](../../src/components/Stack/Stack.types.ts) and
[implementation](../../src/components/Stack/Stack.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `as` | `StackElement` | `"div"` | Rendered element |
| `direction` | `Responsive<"column" \| "row">` | `"column"` | Main axis |
| `gap` | `Responsive<SpaceStep>` | `4` | Space between children |
| `align` | `"start" \| "center" \| "end" \| "stretch" \| "baseline"` | Omitted (stretch) | Cross-axis alignment |
| `justify` | `"start" \| "center" \| "end" \| "between"` | Omitted (start) | Main-axis distribution |
| `wrap` | `boolean` | `false` | Wraps children onto new lines |
| `children` | `ReactNode` | Omitted | Content |
| `className` | `string` | Omitted | Additional classes on `.stack` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.stack`, merged after the layout properties |
| Native attributes and ref | React props for the `as` element | Optional | Forwarded to the element |

### Supporting types

```ts
type Responsive<T> = T | { base: T; md?: T; lg?: T };

type SpaceStep = 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16;

type StackElement = "div" | "ul" | "ol" | "section" | "nav" | "header" | "footer" | "article" | "aside" | "form";
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.stack` | `as` element (`div`) | `className` | `style` | `Always` |

State/variant selectors: `.stack[data-align]`, `.stack[data-justify]`, `.stack[data-wrap]`.
Use the [stylesheet](../../src/components/Stack/Stack.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Stack className="example-stack" style={{ paddingBlock: 16 }}>Content</Stack>
```

```css
.example-stack > :last-child {
  margin-block-start: auto;
}
```

Style props win over ordinary stylesheet declarations for the same property. Use a
stylesheet for hover, focus and pseudo-elements. Custom properties still follow CSS
inheritance, scope resets and specificity; see [the cascade guide](../design/customization.md).

## CSS token reference

Stack has no recipe tokens: gaps come from the system's `--space-*` scale
([token reference](../design/tokens.md)), so every system keeps its own rhythm.

## Storybook and related guides

The single Stack story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider. Related:
[Grid](./Grid.md), [Container](./Container.md), [Section](./Section.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
