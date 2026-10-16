# AppTemplate

Responsive application layout with six CSS recipes. Sidebar owns its desktop panel,
tablet rail and mobile drawer; the template follows the same 768/1024px boundaries.

| Prop | Type / default | Purpose |
| --- | --- | --- |
| `children` | `ReactNode`, required | Main content |
| `routes` | `SidebarItem[]`, required | Navigation destinations |
| `menu` | `ReactNode` | Header content |
| `title` | `string`; app name or `NEUS UI` | Sidebar title |
| `className`, `style` | `string`, `CSSProperties` | Root customization |
| `headerStyle` | `CSSProperties` | Header region |
| `sidebarStyle` | `CSSProperties` | Sidebar surface |
| `contentStyle` | `CSSProperties` | Main region |
| `contentContainerStyle` | `CSSProperties` | Inner content region |

```tsx
<ThemeProvider designSystem="carbon" colorScheme="dark">
  <AppTemplate title="Admin" routes={[{ label: "Home", active: true }]}
    menu={<Button label="Account" variant="text" />}>
    <h1>Overview</h1>
    <Card><CardContent>Application content</CardContent></Card>
  </AppTemplate>
</ThemeProvider>
```

Use `--app-template-*` for reusable region sizing and spacing; Sidebar's width tokens
remain the source of navigation offsets. See [migration](../refactor-migration.md).
