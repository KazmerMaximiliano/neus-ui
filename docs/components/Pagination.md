# Pagination

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Moves through a long list split into pages, and optionally changes how many items a page
holds.

## Usage

```tsx
import { useState } from "react";
import { Pagination, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  return (
    <ThemeProvider designSystem="neus">
      <Pagination
        page={page}
        totalPages={Math.ceil(480 / pageSize)}
        onChange={setPage}
        pageSize={pageSize}
        pageSizeOptions={[10, 25, 50]}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </ThemeProvider>
  );
};
```

Pagination is controlled: it shows `page` of `totalPages` and calls `onChange` with the page
chosen; the app loads that page and passes it back. Use the `pages` variant (the default)
below lists and results people jump around in, and `compact` where room is short or the
position matters more than the count, as in [DataTable](./DataTable.md), which renders it.
For a feed people read in order, a "Load more" [Button](./Button.md) usually serves better.

## Behavior and accessibility

Pagination renders a `nav` landmark named by `labels.navigation` ("Pagination" by default).

- `pages`: a list holding previous, the page buttons and next. It shows the first and last
  pages, the current one and `siblingCount` pages on each side, with an ellipsis for each gap;
  the number of buttons stays the same as the page moves, so they do not shift under the
  pointer. Each page button is named by `labels.page` ("Page 3"), and the current one carries
  `aria-current="page"`. The ellipses are hidden from screen readers.
- `compact`: previous and next around "page / total", a polite live region, so the new
  position is announced after each move.

Previous and next are text [IconButtons](./IconButton.md), disabled on the first and last
page. `onChange` is not called for the current page. A `page` outside the range shows the
nearest end, and zero pages show one. With `pageSize` and `pageSizeOptions`, a
[Select](./Select.md) labelled by `labels.pageSize` sits after the pages and calls
`onPageSizeChange` with the number chosen; reset the page yourself if the count changes.
Pagination needs JavaScript, so it lives in a hydrated client component.

## Props

See [the type source](../../src/components/Pagination/Pagination.types.ts) and
[implementation](../../src/components/Pagination/Pagination.tsx) for the exact contract. All
props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `page` | `number` | Required | The current page, from 1 |
| `totalPages` | `number` | Required | How many pages there are |
| `onChange` | `(page: number) => void` | Omitted | Called with the page chosen |
| `siblingCount` | `number` | `1` | Pages shown on each side of the current one |
| `variant` | `"pages" \| "compact"` | `"pages"` | Page buttons, or previous and next around "page / total" |
| `pageSize` | `number` | Omitted | Items per page, shown in the select |
| `pageSizeOptions` | `readonly number[]` | Omitted | Choices of the page-size select; with `pageSize`, shows it |
| `onPageSizeChange` | `(pageSize: number) => void` | Omitted | Called with the page size chosen |
| `labels` | `PaginationLabels` | English defaults | Accessible names and the select's label |
| `className`, `style` | `string`, `CSSProperties` | Omitted | Root `nav.pagination` |
| `listClassName`, `listStyle` | `string`, `CSSProperties` | Omitted | `ul.pagination__list` |
| `pageClassName`, `pageStyle` | `string`, `CSSProperties` | Omitted | Each `.pagination__page` |
| `ellipsisClassName`, `ellipsisStyle` | `string`, `CSSProperties` | Omitted | Each `.pagination__ellipsis` |
| `infoClassName`, `infoStyle` | `string`, `CSSProperties` | Omitted | `.pagination__info` |
| `pageSizeClassName`, `pageSizeStyle` | `string`, `CSSProperties` | Omitted | The page-size Select's root |
| Native `nav` props | `ComponentPropsWithRef<"nav">` | Optional | `aria-label`, `id`, `data-*`, `ref` and other attributes, except `children` and `onChange` |

### Supporting types

```ts
type PaginationLabels = {
  readonly navigation?: string; // "Pagination"
  readonly previous?: string; // "Previous page"
  readonly next?: string; // "Next page"
  readonly page?: (page: number) => string; // "Page 3"
  readonly pageSize?: string; // "Items per page"
};
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Hooks do not create a part whose
rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.pagination`, `.pagination--pages` or `.pagination--compact` | `nav` | `className` | `style` | `Always` |
| `.pagination__list` | `ul` | `listClassName` | `listStyle` | `pages` |
| `.pagination__previous`, `.pagination__next` | IconButton `button` | None | None | `Always` |
| `.pagination__page` | `button` | `pageClassName` | `pageStyle` | `pages`, one per page shown |
| `.pagination__ellipsis` | `span` inside an `li` hidden from screen readers | `ellipsisClassName` | `ellipsisStyle` | `pages`, one per gap |
| `.pagination__info` | `span` with `aria-live="polite"` | `infoClassName` | `infoStyle` | `compact` |
| `.pagination__page-size` | Select root (`.select__wrapper`) | `pageSizeClassName` | `pageSizeStyle` | With `pageSize` and `pageSizeOptions` |
| `.pagination__page-size-label` | The Select's `label`, on one line | None | None | With the page-size select |

State selector: `[aria-current="page"]` on the current page button. Use the
[stylesheet](../../src/components/Pagination/Pagination.styles.css) for the exact
declarations.

### Instance styles and classes

```tsx
<Pagination className="square-pages" page={page} totalPages={12} onChange={setPage} />
```

```css
.square-pages {
  --pagination-item-radius: var(--radius-sm);
  --pagination-gap: 8px;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [pagination baseline recipe](../../src/design-systems/neus/generated/recipes/pagination.css)

### Pages

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--pagination-font-family` | Font | `var(--font-body)` |
| `--pagination-font-size` | Page number size | `var(--fs-sm)` |
| `--pagination-font-weight` | Page number weight | `500` |
| `--pagination-current-font-weight` | Current page weight | `700` |
| `--pagination-gap` | Space between buttons | `4px` |
| `--pagination-item-size` | Height and narrowest width of a page button | `var(--icon-button-size-small)` |
| `--pagination-item-padding` | Space inside it, for long numbers | `0 8px` |
| `--pagination-item-radius` | Its corners | `var(--radius-pill)` |
| `--pagination-item-border-width`, `--pagination-item-border-color` | Its outline | `0px`, `transparent` |
| `--pagination-item-background`, `--pagination-item-color` | Its fill and number | `transparent`, `var(--color-text-primary)` |
| `--pagination-item-hover-background`, `--pagination-item-hover-color` | On hover | `var(--color-surface-hover)`, `var(--color-text-primary)` |
| `--pagination-current-background`, `--pagination-current-color` | The current page | `var(--color-primary)`, `var(--color-text-on-primary)` |
| `--pagination-current-border-color` | Its outline color | `transparent` |
| `--pagination-current-shadow` | Its shadow or indicator | `none` |
| `--pagination-ellipsis-color` | Ellipsis | `var(--color-text-secondary)` |
| `--pagination-focus-width`, `--pagination-focus-color`, `--pagination-focus-offset` | Focus outline | `2px`, `var(--color-focus)`, `2px` |
| `--pagination-transition` | Color and fill changes | `background-color 180ms ease, color 180ms ease` |

### Compact position

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--pagination-info-color` | "page / total" color | `var(--color-text-secondary)` |
| `--pagination-info-font-size` | Its size | `var(--fs-sm)` |

### Shared dependencies and runtime values

Previous and next follow the [IconButton](./IconButton.md) recipe and the page-size select the
[Select](./Select.md) and Input recipes. Also `--color-primary`, `--color-text-on-primary`,
`--color-text-primary`, `--color-text-secondary`, `--color-surface-hover`, `--color-focus`,
`--radius-pill`, `--font-body` and `--fs-sm`. Pagination has no runtime values.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --pagination-current-background: var(--color-text-primary);
  --pagination-current-color: var(--color-surface);
}
```

## Storybook and related guides

The single Pagination story exposes props as controls with twelve pages and a page-size
select. Related: [DataTable](./DataTable.md), [IconButton](./IconButton.md),
[Select](./Select.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
