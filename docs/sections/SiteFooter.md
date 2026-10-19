# SiteFooter

[Section index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

The end of a public page: brand, columns of links and the legal line.

## Usage

```tsx
import { SiteFooter } from "neus-ui/sections";

export const Footer = () => (
  <SiteFooter
    brand="Veterinaria Los Aromos"
    columns={[{ title: "Clínica", links: [{ label: "Servicios", href: "#servicios" }, { label: "Equipo", href: "#equipo" }] }]}
    legal="Bv. Oroño 1450, Rosario · Lunes a viernes de 9 a 20 h, sábados de 9 a 13 h"
  />
);
```

## Behavior and accessibility

The footer is a `contentinfo` landmark. Each column is a `nav` named by its title. Without
columns, the brand and the legal line stand alone; with columns, the brand takes a wider first
column from 1024px and a hairline separates the legal line. `linkComponent` renders the links
with the host router's link.

## Props

See [the type source](../../src/sections/SiteFooter/SiteFooter.types.ts) and
[implementation](../../src/sections/SiteFooter/SiteFooter.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `brand` | `ReactNode` | Omitted | Logo or name |
| `columns` | `SiteFooterColumn[]` | `[]` | `{ title, links: { label, href }[] }` |
| `legal` | `ReactNode` | Omitted | Copyright, address, legal links |
| `linkComponent` | `ElementType` | `"a"` | Router link component |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.site-footer` |
| `innerClassName`, `innerStyle` | `string`, `CSSProperties` | Omitted | `.site-footer__inner` |
| `brandClassName`, `brandStyle` | `string`, `CSSProperties` | Omitted | `.site-footer__brand` |
| `columnClassName`, `columnStyle` | `string`, `CSSProperties` | Omitted | `.site-footer__column` |
| `columnTitleClassName`, `columnTitleStyle` | `string`, `CSSProperties` | Omitted | `.site-footer__column-title` |
| `linkClassName`, `linkStyle` | `string`, `CSSProperties` | Omitted | `.site-footer__link` |
| `legalClassName`, `legalStyle` | `string`, `CSSProperties` | Omitted | `.site-footer__legal` |
| Native attributes and ref | React props for a `footer` | Optional | Forwarded to `.site-footer` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.site-footer` | `footer` | `className` | `style` | `Always` |
| `.site-footer__inner` | Container `div` | `innerClassName` | `innerStyle` | `Always` |
| `.site-footer__top` | `div` | None | None | `brand` or `columns` given |
| `.site-footer__brand` | `div` | `brandClassName` | `brandStyle` | `brand` given |
| `.site-footer__column` | `nav` | `columnClassName` | `columnStyle` | One per column |
| `.site-footer__column-title` | `p` | `columnTitleClassName` | `columnTitleStyle` | One per column |
| `.site-footer__link` | `linkComponent` | `linkClassName` | `linkStyle` | One per link |
| `.site-footer__legal` | `div` | `legalClassName` | `legalStyle` | `legal` given |

State/variant selectors: `.site-footer[data-columns]`.

## CSS token reference

All six systems supply the `sections` recipe in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files.

- [sections baseline recipe](../../src/design-systems/neus/generated/recipes/sections.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--site-footer-background` | site footer background | `var(--color-surface)` |
| `--site-footer-border-color` | site footer border color | `var(--color-border-subtle)` |
| `--site-footer-padding-block` | site footer padding block | `var(--space-12)` |
| `--site-footer-link-color` | site footer link color | `var(--color-text-secondary)` |
| `--site-footer-title-color` | site footer title color | `var(--color-text-primary)` |
| `--site-footer-font-size` | site footer font size | `var(--fs-base)` |

## Storybook and related guides

The single SiteFooter story exposes props as controls. Related: [SiteHeader](./SiteHeader.md).

[Components](../components/README.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
