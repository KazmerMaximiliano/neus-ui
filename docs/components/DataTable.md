# DataTable

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Typed AG Grid table with consumer-controlled pagination and optional mobile cards.

## Usage

```tsx
import { ThemeProvider, DataTable } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <DataTable data={[{ id: 1, name: "Ada" }]} columnDefs={[{ field: "name" }]} pagination={{ current_page: 1, last_page: 1, per_page: 10, total: 1 }} />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

`DataTableProps<T>` keeps row and column types aligned. Columns are sortable, filterable and
resizable by default; a column definition can override those settings and supply a cell
renderer. Pagination callbacks request a page but do not fetch or replace data. Supply the
next `data` and `pagination` from the application.

Below the mobile breakpoint, `renderMobileCard` replaces the grid with consumer-rendered
cards. Without it the grid remains. Empty grid and mobile content share NoRowsOverlay and
its customization props. Compose row actions using buttons or menus in a cell/card; there is
no Actions component. Neus owns the grid container and empty overlay, while AG Grid owns
generated cells, rows and headers. Use column definitions and the documented AG Grid theme
bridge for those internals.

## Props

See [the type source](../../src/components/DataTable/DataTable.types.ts) and
[implementation](../../src/components/DataTable/DataTable.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `emptyStateClassName` | `string` | Omitted | Additional classes on `.data-table__no-rows` |
| `noRowsDescriptionClassName` | `string` | Omitted | Additional classes on `.data-table__no-rows-description` |
| `noRowsDescriptionStyle` | `CSSProperties` | Omitted | Inline styles on `.data-table__no-rows-description` |
| `noRowsTitleClassName` | `string` | Omitted | Additional classes on `.data-table__no-rows-title` |
| `noRowsTitleStyle` | `CSSProperties` | Omitted | Inline styles on `.data-table__no-rows-title` |
| `noDataTitle` | `string` | `"No data to show"` | Empty title |
| `noDataDescription` | `string` | `"No records found matching the search criteria"` | Empty description |
| `emptyStateStyle` | `CSSProperties` | Omitted | Inline styles on `.data-table__no-rows` |
| `cardClassName` | `string` | Omitted | Additional classes on `.data-table__card` |
| `cardStyle` | `CSSProperties` | Omitted | Inline styles on `.data-table__card` |
| `cardsClassName` | `string` | Omitted | Additional classes on `.data-table__cards` |
| `cardsStyle` | `CSSProperties` | Omitted | Inline styles on `.data-table__cards` |
| `gridClassName` | `string` | Omitted | Additional classes on `.data-table__grid` |
| `gridStyle` | `CSSProperties` | Omitted | Inline styles on `.data-table__grid` |
| `paginationClassName` | `string` | Omitted | Additional classes on `.data-table__pagination` |
| `paginationInfoClassName` | `string` | Omitted | Additional classes on `.data-table__pagination-info` |
| `paginationInfoStyle` | `CSSProperties` | Omitted | Inline styles on `.data-table__pagination-info` |
| `data` | `T[]` | Required | Rows for the current page |
| `columnDefs` | `DataTableColDef<T>[]` | Required | Typed AG Grid definitions, including custom cells |
| `pagination` | `PaginationInfo` | Required | Controlled pagination |
| `renderMobileCard` | `((row: T) => ReactNode)` | Omitted | Consumer card renderer; absent keeps the mobile grid |
| `onPaginationChange` | `((params: PaginationChangeParams) => void)` | Omitted | Requests a page; consumer supplies data |
| `className` | `string` | Omitted | Additional classes on `.data-table` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.data-table` |
| `paginationStyle` | `CSSProperties` | Omitted | Inline styles on `.data-table__pagination` |

### AG Grid integration

The [theme bridge](../../src/components/DataTable/DataTable.consts.ts) maps data-table
tokens into AG Grid Quartz parameters, including fonts, row/header heights, colors, spacing
and radii. Column definitions support AG Grid cell/header classes and cell renderers. Use
those APIs to target generated grid content; Neus part props target its own grid wrapper,
cards, empty overlay and pagination. Style consumer mobile-card content through its own
components.

DataTable registers only the AG Grid Community modules its own options need: client-side
rows, text/number/date filters and cell styles. Register any other module your column
definitions use (for example `TooltipModule`) with `ModuleRegistry.registerModules` from
`ag-grid-community`, which the application installs itself.

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/DataTable/index.ts). A type shown here is not necessarily
a package export.

```ts
type PaginationInfo = { current_page: number; last_page: number; per_page: number; total: number; };

type PaginationChangeParams = { currentPage: number; pageSize: number; };

type DataTableColDef<T extends object = object> = ColDef<T> | ColGroupDef<T>;

type DataTableSampleRow = { id: number; name: string; email: string; };
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.data-table` | `div` | `className` | `style` | `Always` |
| `.data-table__cards` | `div` | `cardsClassName` | `cardsStyle` | `data.length` |
| `.data-table__card` | `div` | `cardClassName` | `cardStyle` | `Always` |
| `.data-table__grid` | `div` | `gridClassName` | `gridStyle` | `Always` |
| `.data-table__pagination` | `div` | `paginationClassName` | `paginationStyle` | `Always` |
| `.data-table__pagination-info` | `span` | `paginationInfoClassName` | `paginationInfoStyle` | `Always` |
| `.data-table__no-rows` | `div` | `emptyStateClassName` | `emptyStateStyle` | `Always` |
| `.data-table__no-rows-title` | `h3` | `noRowsTitleClassName` | `noRowsTitleStyle` | `Always` |
| `.data-table__no-rows-description` | `p` | `noRowsDescriptionClassName` | `noRowsDescriptionStyle` | `Always` |

Interaction states use native pseudo-classes and ARIA/data attributes where present.

Use the [stylesheet](../../src/components/DataTable/DataTable.styles.css) for
pseudo-elements and state selectors. For shared field/listbox parts, also inspect the shared
styles linked from the implementation. Consumer content and third-party generated internals
retain their own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<DataTable cardsClassName="example-data-table" cardsStyle={{ outlineOffset: 4 }} data={[{ id: 1, name: "Ada" }]} columnDefs={[{ field: "name" }]} pagination={{ current_page: 1, last_page: 1, per_page: 10, total: 1 }} />
```

```css
.example-data-table {
  outline-offset: 4px;
}
.example-data-table:focus-visible {
  outline: 2px solid var(--color-focus);
}
```

Style props win over ordinary stylesheet declarations for the same property. Use a
stylesheet for hover, focus, disabled states and pseudo-elements. Custom properties still
follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [data-table baseline recipe](../../src/design-systems/neus/generated/recipes/data-table.css)

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--data-table-accent` | data table accent | `var(--color-primary)` |
| `--data-table-control-radius` | data table control radius | `var(--radius-sm)` |
| `--data-table-empty-height` | data table empty height | `150px` |
| `--data-table-empty-padding` | data table empty padding | `24px` |
| `--data-table-empty-title-size` | data table empty title size | `18px` |
| `--data-table-gap` | data table gap | `16px` |
| `--data-table-header-height` | data table header height | `44px` |
| `--data-table-muted` | data table muted | `var(--color-text-secondary)` |
| `--data-table-radius` | data table radius | `var(--radius-default)` |
| `--data-table-row-height` | data table row height | `48px` |
| `--data-table-spacing` | data table spacing | `8px` |

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--data-table-background` | data table background | `var(--color-surface)` |
| `--data-table-border-color` | data table border color | `var(--color-border-subtle)` |
| `--data-table-color` | data table color | `var(--color-text-primary)` |
| `--data-table-header-background` | data table header background | `var(--color-surface-secondary)` |
| `--data-table-header-color` | data table header color | `var(--color-text-primary)` |
| `--data-table-selection-background` | data table selection background | `var(--color-selection)` |
| `--data-table-shadow` | data table shadow | `none` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--data-table-font-family` | data table font family | `var(--font-body)` |
| `--data-table-font-size` | data table font size | `var(--type-body-size)` |
| `--data-table-header-font-size` | data table header font size | `var(--type-label-size)` |

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--data-table-hover-background` | data table hover background | `var(--color-surface-hover)` |

### Shared dependencies and runtime values

`--color-focus`, `--overlay-shadow`, `--theme-color-scheme`.

Semantic/foundation tokens are described in [the shared token
reference](../design/tokens.md). Component dependencies belong to their own linked recipe.
Position, size, category and progress variables set by the implementation are runtime
values, not provider configuration fields.

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
  --data-table-control-radius: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

Related composition: [Card](./Card.md), [Menu](./Menu.md), [Button](./Button.md).

The single DataTable story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
