# SectionHeader

[Section index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

The title block that opens a section: optional eyebrow, title, description and a side action.

## Usage

```tsx
import { Section } from "neus-ui";
import { SectionHeader } from "neus-ui/sections";

export const Agenda = () => (
  <Section id="agenda" aria-labelledby="agenda-title">
    <SectionHeader titleId="agenda-title" title="Dos días, dos recorridos"
      description="El viernes, plataforma y rendimiento; el sábado, diseño y oficio." />
    {/* The agenda itself. */}
  </Section>
);
```

## Behavior and accessibility

The title is an `h2` at the section size by default. Pass `titleId` and point the Section's
`aria-labelledby` at it to name the region. `align="center"` centers the block and stacks
the actions under it; `start` puts the actions at the end of the row. The block keeps its
space below (`--section-header-margin-block-end`) before the section's content.

## Props

See [the type source](../../src/sections/SectionHeader/SectionHeader.types.ts) and
[implementation](../../src/sections/SectionHeader/SectionHeader.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `title` | `ReactNode` | Required | Section title |
| `eyebrow` | `ReactNode` | Omitted | Overline above the title |
| `description` | `ReactNode` | Omitted | One sentence under the title |
| `actions` | `ReactNode` | Omitted | A link or button beside the title |
| `align` | `"start" \| "center"` | `"start"` | Alignment |
| `titleAs` | `"h1"` … `"h6"` | `"h2"` | Heading level |
| `titleId` | `string` | Omitted | id of the heading, for `aria-labelledby` |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.section-header` |
| `eyebrowClassName`, `eyebrowStyle` | `string`, `CSSProperties` | Omitted | `.section-header__eyebrow` |
| `titleClassName`, `titleStyle` | `string`, `CSSProperties` | Omitted | `.section-header__title` |
| `descriptionClassName`, `descriptionStyle` | `string`, `CSSProperties` | Omitted | `.section-header__description` |
| `actionsClassName`, `actionsStyle` | `string`, `CSSProperties` | Omitted | `.section-header__actions` |
| Native attributes and ref | React props for a `div` | Optional | Forwarded to `.section-header` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.section-header` | `div` | `className` | `style` | `Always` |
| `.section-header__text` | `div` | None | None | `Always` |
| `.section-header__eyebrow` | Text `p` | `eyebrowClassName` | `eyebrowStyle` | `eyebrow` given |
| `.section-header__title` | Heading | `titleClassName` | `titleStyle` | `Always` |
| `.section-header__description` | Text `p` | `descriptionClassName` | `descriptionStyle` | `description` given |
| `.section-header__actions` | `div` | `actionsClassName` | `actionsStyle` | `actions` given |

State/variant selectors: `.section-header[data-align]`.

## CSS token reference

All six systems supply the `sections` recipe in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files.

- [sections baseline recipe](../../src/design-systems/neus/generated/recipes/sections.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--section-header-gap` | section header gap | `var(--space-3)` |
| `--section-header-margin-block-end` | section header margin block end | `var(--space-12)` |

## Storybook and related guides

The single SectionHeader story exposes props as controls. Related: [Section](../components/Section.md),
[Heading](../components/Heading.md).

[Components](../components/README.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
