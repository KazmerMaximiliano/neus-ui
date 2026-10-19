# Hero

[Section index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

The opening section of a public page: display headline, lead, the primary action and its anchor.

## Usage

```tsx
import { Button, MediaPlaceholder } from "neus-ui";
import { Hero } from "neus-ui/sections";

export const Opening = () => (
  <Hero
    title="Tu veterinaria de barrio en Bv. Oroño"
    lead="Consultas, vacunas, cirugías menores y peluquería, con tiempo para escucharte."
    actions={<Button label="Pedir turno" href="#turno" size="large" />}
    note="Te llamamos para confirmar el horario."
    // SAMPLE: replace with the clinic's own photo.
    media={<MediaPlaceholder label="Veterinaria revisando a un perro en el consultorio" />}
  />
);
```

## Behavior and accessibility

Hero is a [Section](../components/Section.md) named by its title (`aria-labelledby`), so it is a
region landmark. The title is a `Heading size="display"`, an `h1` by default (`titleAs`
changes it when the page already has one). `variant` places the media: `split` beside the text
from 1024px, `centered` below centered text, `media-first` above the text. Without `media` the
text takes the full width. On phones the text comes first except in `media-first`. `eyebrow`
renders an overline in the primary text color; use it only when the system's DESIGN.md allows
overlines.

## Props

See [the type source](../../src/sections/Hero/Hero.types.ts) and
[implementation](../../src/sections/Hero/Hero.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `title` | `ReactNode` | Required | Display headline |
| `eyebrow` | `ReactNode` | Omitted | Overline above the title |
| `lead` | `ReactNode` | Omitted | One or two sentences under the title |
| `actions` | `ReactNode` | Omitted | The primary action and at most one secondary one |
| `note` | `ReactNode` | Omitted | Microcopy under the actions |
| `media` | `ReactNode` | Omitted | Interface, demo, picture or MediaPlaceholder |
| `variant` | `"split" \| "centered" \| "media-first"` | `"split"` | Where the media sits |
| `titleAs` | `"h1"` … `"h6"` | `"h1"` | Heading level of the title |
| `tone`, `spacing`, `id` and other [Section](../components/Section.md) props | | `tone="default"`, `spacing="lg"` | Forwarded to the band; `aria-labelledby` points at the title unless you pass one |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.hero` |
| `bodyClassName`, `bodyStyle` | `string`, `CSSProperties` | Omitted | `.hero__body` |
| `eyebrowClassName`, `eyebrowStyle` | `string`, `CSSProperties` | Omitted | `.hero__eyebrow` |
| `titleClassName`, `titleStyle` | `string`, `CSSProperties` | Omitted | `.hero__title` |
| `leadClassName`, `leadStyle` | `string`, `CSSProperties` | Omitted | `.hero__lead` |
| `actionsClassName`, `actionsStyle` | `string`, `CSSProperties` | Omitted | `.hero__actions` |
| `noteClassName`, `noteStyle` | `string`, `CSSProperties` | Omitted | `.hero__note` |
| `mediaClassName`, `mediaStyle` | `string`, `CSSProperties` | Omitted | `.hero__media` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.hero` | Section `section` | `className` | `style` | `Always` |
| `.hero__layout` | Container `div` | None | None | `Always` |
| `.hero__body` | `div` | `bodyClassName` | `bodyStyle` | `Always` |
| `.hero__eyebrow` | Text `p` | `eyebrowClassName` | `eyebrowStyle` | `eyebrow` given |
| `.hero__title` | Heading | `titleClassName` | `titleStyle` | `Always` |
| `.hero__lead` | Text `p` | `leadClassName` | `leadStyle` | `lead` given |
| `.hero__actions` | `div` | `actionsClassName` | `actionsStyle` | `actions` given |
| `.hero__note` | Text `p` | `noteClassName` | `noteStyle` | `note` given |
| `.hero__media` | `div` | `mediaClassName` | `mediaStyle` | `media` given |

State/variant selectors: `.hero[data-variant]`, `.hero[data-media]`. Use the
[stylesheet](../../src/sections/Hero/Hero.styles.css) for the exact declarations.

## CSS token reference

All six systems supply the `sections` recipe in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files.

- [sections baseline recipe](../../src/design-systems/neus/generated/recipes/sections.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--hero-gap` | hero gap | `var(--space-12)` |
| `--hero-body-gap` | hero body gap | `var(--space-6)` |
| `--hero-media-radius` | hero media radius | `var(--radius-default)` |

## Storybook and related guides

The single Hero story exposes props as controls. Related: [Heading](../components/Heading.md),
[MediaPlaceholder](../components/MediaPlaceholder.md), [SectionHeader](./SectionHeader.md).

[Components](../components/README.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
