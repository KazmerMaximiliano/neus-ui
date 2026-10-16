# DataTable

AG Grid Community with six scoped recipes and externally controlled pagination.

| Prop | Type | Purpose |
| --- | --- | --- |
| `data` | `T[]`, required | Current page of rows |
| `columnDefs` | `DataTableColDef<T>[]`, required | Fields, headers, visibility and custom cell rendering |
| `pagination` | `PaginationInfo`, required | Current page, last page, page size and total |
| `onPaginationChange` | `(params: PaginationChangeParams) => void` | Requests a page from the consumer |
| `renderMobileCard` | `(row: T) => ReactNode` | Opts into consumer cards below 768px |
| `noDataTitle`, `noDataDescription` | `string` | Empty-state content |
| `className`, `style` | `string`, `CSSProperties` | Root customization |
| `paginationStyle`, `emptyStateStyle` | `CSSProperties` | State/region customization |

```tsx
<DataTable data={users}
  columnDefs={[{ field: "name", headerName: "Name" }, { field: "email" }]}
  pagination={pagination} onPaginationChange={loadPage}
  renderMobileCard={(row) => <Card><CardContent>{row.name}</CardContent></Card>} />
```

DataTable fills its container. Flexible columns share the available width;
horizontal scrolling stays inside the grid when column minimum widths exceed it.
Without a mobile renderer the grid remains available on narrow screens.
Sorting and filtering operate on supplied rows. Voluntary action columns use
`cellRenderer`; combine IconButton or Menu in consumer code. See the
[migration guide](../refactor-migration.md#datatable-and-voluntary-actions) and
Storybook's `Others/Integrations/DataTable actions` for the complete example.

In Storybook, `designSystem` is a preview control with six systems and the default
**Heredar global** option. It follows the toolbar until explicitly overridden;
light/dark always follows the toolbar. This control is not a component prop.
The actions example uses three small text buttons in a fixed 160px column,
with the same consumer composition reused in mobile cards.
The preview uses the available container width, capped at 1000px, in both Canvas
and Docs; its size does not depend on the browser viewport width.
