# SiteHeader

[Section index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

The top bar of a public page: brand, navigation and actions, with a native phone menu.

## Usage

```tsx
import { Button } from "neus-ui";
import { SiteHeader } from "neus-ui/sections";

export const Header = () => (
  <SiteHeader
    brand="Veterinaria Los Aromos"
    links={[{ label: "Servicios", href: "#servicios" }, { label: "Equipo", href: "#equipo" }]}
    actions={<Button label="Pedir turno" href="#turno" variant="outlined" size="small" />}
    variant="sticky"
    skipLinkTarget="#main"
    labels={{ navigation: "Principal", menu: "Menú", skipLink: "Saltar al contenido" }}
  />
);
```

## Behavior and accessibility

The header is a `banner` landmark. From 768px the links and actions sit inline. Below that, a
menu button opens them with the native Popover API (`popovertarget`), which works without
JavaScript and inside Astro islands: Escape and a click outside close it, and following a link
closes it too. The navigation is a `nav` landmark named by `labels.navigation`; the menu
button is named by `labels.menu`. An `active` link gets `aria-current="page"`. With
`skipLinkTarget`, a skip link is the first focusable element and appears on focus. `sticky`
keeps the bar at the top with a translucent surface. `linkComponent` renders the brand and the
links with the host router's link (Next.js `Link` takes `href` directly).

## Props

See [the type source](../../src/sections/SiteHeader/SiteHeader.types.ts) and
[implementation](../../src/sections/SiteHeader/SiteHeader.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `brand` | `ReactNode` | Required | Logo or name, linked to `brandHref` |
| `brandHref` | `string` | `"/"` | Destination of the brand link |
| `links` | `SiteLink[]` | `[]` | `{ label, href, active }` navigation links |
| `actions` | `ReactNode` | Omitted | Buttons at the end; keep the primary call to action `outlined` here when the hero has the solid one |
| `variant` | `"plain" \| "sticky"` | `"plain"` | Static or sticky bar |
| `skipLinkTarget` | `string` | Omitted | Target of the skip link, for example `"#main"` |
| `labels` | `SiteHeaderLabels` | English texts | `navigation`, `menu` and `skipLink` in the project's language |
| `linkComponent` | `ElementType` | `"a"` | Router link component |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.site-header` |
| `innerClassName`, `innerStyle` | `string`, `CSSProperties` | Omitted | `.site-header__inner` |
| `brandClassName`, `brandStyle` | `string`, `CSSProperties` | Omitted | `.site-header__brand` |
| `menuClassName`, `menuStyle` | `string`, `CSSProperties` | Omitted | `.site-header__menu` |
| `linkClassName`, `linkStyle` | `string`, `CSSProperties` | Omitted | `.site-header__link` |
| `actionsClassName`, `actionsStyle` | `string`, `CSSProperties` | Omitted | `.site-header__actions` |
| `menuButtonClassName`, `menuButtonStyle` | `string`, `CSSProperties` | Omitted | `.site-header__menu-button` |
| `skipLinkClassName`, `skipLinkStyle` | `string`, `CSSProperties` | Omitted | `.site-header__skip` |
| Native attributes and ref | React props for a `header` | Optional | Forwarded to `.site-header` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.site-header` | `header` | `className` | `style` | `Always` |
| `.site-header__skip` | `a` | `skipLinkClassName` | `skipLinkStyle` | `skipLinkTarget` given |
| `.site-header__inner` | Container `div` | `innerClassName` | `innerStyle` | `Always` |
| `.site-header__brand` | `linkComponent` | `brandClassName` | `brandStyle` | `Always` |
| `.site-header__menu-button` | `button` | `menuButtonClassName` | `menuButtonStyle` | Links or actions given; hidden from 768px |
| `.site-header__menu` | `div[popover]` | `menuClassName` | `menuStyle` | Links or actions given |
| `.site-header__link` | `linkComponent` | `linkClassName` | `linkStyle` | One per link |
| `.site-header__actions` | `div` | `actionsClassName` | `actionsStyle` | `actions` given |

State/variant selectors: `.site-header[data-variant="sticky"]`, `.site-header__menu:popover-open`,
`.site-header__link[aria-current="page"]`. Use the
[stylesheet](../../src/sections/SiteHeader/SiteHeader.styles.css) for the exact declarations.

## CSS token reference

All six systems supply the `sections` recipe in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files.

- [sections baseline recipe](../../src/design-systems/neus/generated/recipes/sections.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--site-header-height` | site header height | `64px` |
| `--site-header-background` | site header background | `var(--color-surface)` |
| `--site-header-sticky-background` | site header sticky background | `color-mix(in srgb, var(--color-surface) 88%, transparent)` |
| `--site-header-border-color` | site header border color | `var(--color-border-subtle)` |
| `--site-header-brand-font-family` | site header brand font family | `var(--font-display)` |
| `--site-header-brand-font-size` | site header brand font size | `var(--fs-lg)` |
| `--site-header-brand-font-weight` | site header brand font weight | `700` |
| `--site-header-link-color` | site header link color | `var(--color-text-secondary)` |
| `--site-header-link-active-color` | site header link active color | `var(--color-text-primary)` |
| `--site-header-link-font-size` | site header link font size | `var(--fs-base)` |
| `--site-header-link-gap` | site header link gap | `var(--space-6)` |
| `--site-header-menu-background` | site header menu background | `var(--color-surface)` |

## Storybook and related guides

The single SiteHeader story exposes props as controls. Related: [SiteFooter](./SiteFooter.md),
[Hero](./Hero.md), [Button](../components/Button.md).

[Components](../components/README.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
