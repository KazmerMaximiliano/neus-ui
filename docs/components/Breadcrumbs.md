# Breadcrumbs

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A trail of links from the top of a hierarchy down to the current page.

## Usage

```tsx
import { Breadcrumbs, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => (
  <ThemeProvider designSystem="neus">
    <Breadcrumbs
      items={[
        { label: "Home", href: "/" },
        { label: "Projects", href: "/projects" },
        { label: "Neus UI", href: "/projects/neus-ui" },
        { label: "Settings" },
      ]}
    />
  </ThemeProvider>
);
```

Use breadcrumbs on pages two or more levels deep, above the page title, so people see where
they are and can climb back. They complement the main navigation and never replace it. The
items follow the hierarchy, not the history of pages visited.

With a router, pass its link component so navigation stays on the client:

```tsx
import NextLink from "next/link";

<Breadcrumbs linkComponent={NextLink} items={items} />
```

## Behavior and accessibility

Breadcrumbs renders a `nav` landmark named by `labels.navigation` ("Breadcrumb" by default)
around an ordered list. Every item but the last is a link when it has an `href`, or plain text
when it has none. The last item is the current page: it is never a link and carries
`aria-current="page"`. The separators are drawn by CSS with empty alternative text, so screen
readers announce the list and its links, not the slashes.

With `maxItems`, a trail longer than that keeps its first item and its last `maxItems - 1`
items, and the ones between collapse behind a "…" button named by `labels.expand`. The button
shows the whole trail and moves focus to the first item it revealed. The first item and the
current page always stay. On narrow screens the trail wraps onto more lines.

## Props

See [the type source](../../src/components/Breadcrumbs/Breadcrumbs.types.ts) and
[implementation](../../src/components/Breadcrumbs/Breadcrumbs.tsx) for the exact contract.
All props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `items` | `readonly BreadcrumbsItem[]` | Required | From the top of the hierarchy to the current page, which comes last |
| `maxItems` | `number` | Omitted | Above this many items, the middle ones collapse behind a button |
| `linkComponent` | `ElementType` | `"a"` | Router link rendered instead of `<a>`; receives `href`, `className`, `style` and `children` |
| `labels` | `BreadcrumbsLabels` | English defaults | Accessible names of the landmark and the expand button |
| `className`, `style` | `string`, `CSSProperties` | Omitted | Root `nav.breadcrumbs` |
| `listClassName`, `listStyle` | `string`, `CSSProperties` | Omitted | `ol.breadcrumbs__list` |
| `itemClassName`, `itemStyle` | `string`, `CSSProperties` | Omitted | Each `li.breadcrumbs__item` |
| `linkClassName`, `linkStyle` | `string`, `CSSProperties` | Omitted | Each `.breadcrumbs__link` |
| `currentClassName`, `currentStyle` | `string`, `CSSProperties` | Omitted | `.breadcrumbs__current` |
| `expandClassName`, `expandStyle` | `string`, `CSSProperties` | Omitted | `.breadcrumbs__expand` |
| Native `nav` props | `ComponentPropsWithRef<"nav">` | Optional | `aria-label`, `id`, `data-*`, `ref` and other attributes, except `children`; `aria-label` wins over `labels.navigation` |

### Supporting types

```ts
type BreadcrumbsItem = {
  readonly label: string;
  readonly href?: string;
};

type BreadcrumbsLabels = {
  readonly navigation?: string; // "Breadcrumb"
  readonly expand?: string; // "Show all breadcrumbs"
};
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Hooks do not create a part whose
rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.breadcrumbs` | `nav` | `className` | `style` | `Always` |
| `.breadcrumbs__list` | `ol` | `listClassName` | `listStyle` | `Always` |
| `.breadcrumbs__item` | `li` | `itemClassName` | `itemStyle` | One per item shown, and one around the expand button |
| `.breadcrumbs__link` | `a` or `linkComponent` | `linkClassName` | `linkStyle` | Items before the last with an `href` |
| `.breadcrumbs__current` | `span` with `aria-current="page"` | `currentClassName` | `currentStyle` | The last item |
| `.breadcrumbs__expand` | `button` | `expandClassName` | `expandStyle` | While collapsed |

The separator is `::before` on every item after the first. Use the
[stylesheet](../../src/components/Breadcrumbs/Breadcrumbs.styles.css) for the exact
declarations.

### Instance styles and classes

```tsx
<Breadcrumbs className="arrow-trail" items={items} />
```

```css
.arrow-trail {
  --breadcrumbs-separator: "→";
  --breadcrumbs-separator-gap: 12px;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [breadcrumbs baseline recipe](../../src/design-systems/neus/generated/recipes/breadcrumbs.css)

### Trail and separator

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--breadcrumbs-font-family` | Font | `var(--font-body)` |
| `--breadcrumbs-font-size` | Text size | `var(--fs-sm)` |
| `--breadcrumbs-font-weight` | Text weight | `400` |
| `--breadcrumbs-line-height` | Line height | `1.5` |
| `--breadcrumbs-letter-spacing` | Tracking | `normal` |
| `--breadcrumbs-row-gap` | Space between wrapped lines | `4px` |
| `--breadcrumbs-color` | Items without a link | `var(--color-text-secondary)` |
| `--breadcrumbs-separator` | Separator, a CSS string | `"/"` |
| `--breadcrumbs-separator-gap` | Space on each side of it | `8px` |
| `--breadcrumbs-separator-color` | Its color | `var(--color-text-secondary)` |
| `--breadcrumbs-separator-weight` | Its weight | `400` |

### Links, current page and expand button

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--breadcrumbs-link-color` | Link color | `var(--link-secondary-color)` |
| `--breadcrumbs-link-weight` | Link weight | `500` |
| `--breadcrumbs-link-padding`, `--breadcrumbs-link-radius` | Link box, for hover fills | `var(--link-padding)`, `var(--link-radius)` |
| `--breadcrumbs-link-decoration` | Underline at rest | `none` |
| `--breadcrumbs-link-underline-offset` | Underline offset | `var(--link-underline-offset)` |
| `--breadcrumbs-link-hover-color` | Link color on hover | `var(--link-hover-primary-color)` |
| `--breadcrumbs-link-hover-background` | Link fill on hover | `var(--link-hover-background)` |
| `--breadcrumbs-link-hover-decoration` | Underline on hover | `var(--link-hover-decoration)` |
| `--breadcrumbs-current-color` | Current page color | `var(--color-text-primary)` |
| `--breadcrumbs-current-weight` | Current page weight | `600` |
| `--breadcrumbs-expand-size` | Smallest side of the expand button | `24px` |
| `--breadcrumbs-focus-width`, `--breadcrumbs-focus-color`, `--breadcrumbs-focus-offset` | Focus outline | `var(--link-focus-width)`, `var(--link-focus-color)`, `var(--link-focus-offset)` |
| `--breadcrumbs-transition` | Color changes | `var(--link-transition)` |

### Shared dependencies and runtime values

The [Link](./Link.md) recipe (`--link-*`), `--color-text-primary`, `--color-text-secondary`,
`--font-body` and `--fs-sm`, so links in the trail follow each system's links. Breadcrumbs has
no runtime values.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --breadcrumbs-separator: "›";
  --breadcrumbs-link-color: var(--link-color);
}
```

## Storybook and related guides

The single Breadcrumbs story exposes props as controls with a five-level trail; set
`maxItems` to see the collapsed trail. Related: [Link](./Link.md), [Sidebar](./Sidebar.md),
[AppTemplate](../templates/AppTemplate.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
