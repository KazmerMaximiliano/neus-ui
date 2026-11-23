# Separator

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A line between groups of content: across a column, such as between two sections of a menu or a
panel, or down a row of items, such as between toolbar actions.

## Usage

```tsx
import { Button, Separator, Stack, Text, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => (
  <ThemeProvider designSystem="neus">
    <Stack gap={0}>
      <Text>Account settings</Text>
      <Separator />
      <Text tone="muted">Billing and invoices</Text>
    </Stack>
    <Stack direction="row" align="center" gap={0}>
      <Button label="Edit" variant="text" size="small" />
      <Separator orientation="vertical" decorative />
      <Button label="Share" variant="text" size="small" />
    </Stack>
  </ThemeProvider>
);
```

Use a separator where spacing alone does not tell two groups apart. Between the rows of a list,
use [List](./List.md) with `divided`; around a group of content, a [Card](./Card.md) or a
[Section](./Section.md) band.

## Behavior and accessibility

The line is a `div` with the `separator` role, which screen readers announce as a boundary
between the groups; a vertical one adds `aria-orientation="vertical"`. With `decorative` it takes
`role="none"` and is only drawn: use it when the groups are already clear, such as between
buttons that each have a name. Across a column it fills the width and keeps
`--separator-spacing` above and below; down a row it takes the row's height, at least one line of
text, and keeps the spacing on each side.

## Props

See [the type source](../../src/components/Separator/Separator.types.ts) and
[implementation](../../src/components/Separator/Separator.tsx) for the exact contract. All props
are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Across the content, or down a row of items |
| `decorative` | `boolean` | `false` | Hides the line from assistive technology |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.separator` |
| Native attributes | `div` attributes and `ref` | Optional | `id`, `data-*` and the ref land on the line; `role` and `children` are the separator's |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.separator` | `div`, `role="separator"` or `"none"`, `[data-orientation]` | `className` | `style` | `Always` |

Use the [stylesheet](../../src/components/Separator/Separator.styles.css) for the exact
declarations.

### Instance styles and classes

```tsx
<Separator className="section-rule" />
```

```css
.section-rule {
  --separator-spacing: var(--space-8);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files.

- [separator baseline recipe](../../src/design-systems/neus/generated/recipes/separator.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--separator-color` | Line color | `var(--color-border-subtle)` |
| `--separator-thickness` | Line thickness | `1px` |
| `--separator-spacing` | Space on both sides along its axis | `16px` |

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --separator-spacing: var(--space-2);
}
```

## Storybook and related guides

The single Separator story, under Layout, shows a horizontal line between two texts and vertical
lines between buttons. Related: [List](./List.md), [Stack](./Stack.md), [Card](./Card.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
