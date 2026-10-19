# FeatureList

[Section index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

The features or services of a public page, as plain blocks, rows or cards.

## Usage

```tsx
import { Scissors, Stethoscope, Syringe } from "lucide-react";
import { FeatureItem, FeatureList } from "neus-ui/sections";

export const Services = () => (
  <FeatureList variant="cards">
    <FeatureItem icon={<Stethoscope />} title="Consultas">Controles de rutina y la consulta cuando algo no anda bien.</FeatureItem>
    <FeatureItem icon={<Syringe />} title="Vacunación">Plan de vacunas con la libreta al día.</FeatureItem>
    <FeatureItem icon={<Scissors />} title="Peluquería">Baño y corte con turno.</FeatureItem>
  </FeatureList>
);
```

## Behavior and accessibility

FeatureList is a `ul` ([Grid](../components/Grid.md)) of [FeatureItem](./FeatureItem.md) list
items, named by the section's heading or `aria-label`. `variant` reaches every item through
context: `grid` lays out plain blocks with wide gaps, `list` one row per item with the title
beside the text from 768px and hairlines between rows, `cards` a `Card as="li"` per item.
`columns` sets the grid and cards columns (default 1, 2 from 768px, 3 from 1024px); `list` is
always one column.

## Props

See [the type source](../../src/sections/FeatureList/FeatureList.types.ts) and
[implementation](../../src/sections/FeatureList/FeatureList.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `children` | `ReactNode` | Required | FeatureItem elements |
| `variant` | `"grid" \| "list" \| "cards"` | `"grid"` | Layout of every item |
| `columns` | `Responsive<number>` | `{ base: 1, md: 2, lg: 3 }` | Columns of grid and cards |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.feature-list` |
| Native attributes and ref | React props for a `ul` | Optional | Forwarded to the list |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.feature-list` | Grid `ul` | `className` | `style` | `Always` |

State/variant selectors: `.feature-list[data-variant]`. Items document their own parts.

## CSS token reference

All six systems supply the `sections` recipe in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files.

- [sections baseline recipe](../../src/design-systems/neus/generated/recipes/sections.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--feature-icon-size` | feature icon size | `40px` |
| `--feature-icon-glyph-size` | feature icon glyph size | `20px` |
| `--feature-icon-radius` | feature icon radius | `var(--radius-md)` |
| `--feature-icon-background` | feature icon background | `color-mix(in srgb, var(--color-primary) 10%, var(--color-surface))` |
| `--feature-icon-color` | feature icon color | `var(--color-primary-text)` |
| `--feature-gap` | feature gap | `var(--space-3)` |

## Storybook and related guides

The single FeatureList story exposes props as controls. Public section: [FeatureItem](./FeatureItem.md).

[Components](../components/README.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
