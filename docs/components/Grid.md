# Grid

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Equal-width columns that change at 768px and 1024px, or as many columns as fit a minimum
item width.

## Usage

```tsx
import { ThemeProvider, Card, CardContent, CardHeader, Grid, Heading, Text } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Grid as="ul" columns={{ base: 1, md: 3 }}>
        {features.map((feature) => (
          <Card as="li" key={feature.title}>
            <CardHeader><Heading as="h3" size="sm">{feature.title}</Heading></CardHeader>
            <CardContent><Text>{feature.text}</Text></CardContent>
          </Card>
        ))}
      </Grid>
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

Without `columns` the grid has 1 column on phones, 2 from 768px and 3 from 1024px. `columns`
takes a count or `{ base, md, lg }`; missing breakpoints inherit the previous one.
`minItemWidth` (for example `"16rem"`) switches to `repeat(auto-fit, minmax(min(100%, …), 1fr))`
and ignores `columns`. `gap` uses `--space-*` steps (default 6). Values become inline custom
properties (`--grid-columns`, `--grid-columns-md`, `--grid-columns-lg`, `--grid-gap*`,
`--grid-min-item-width`) read by media queries; every grid resets them, so nested grids stay
independent. With `as="ul"` or `"ol"` the children are list items, for example `Card as="li"`.

## Props

See [the type source](../../src/components/Grid/Grid.types.ts) and
[implementation](../../src/components/Grid/Grid.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `as` | `"div" \| "ul" \| "ol" \| "section"` | `"div"` | Rendered element |
| `columns` | `Responsive<number>` | `{ base: 1, md: 2, lg: 3 }` | Equal columns per breakpoint |
| `minItemWidth` | `string` | Omitted | Auto-fit columns of at least this width; ignores `columns` |
| `gap` | `Responsive<SpaceStep>` | `6` | Space between items |
| `children` | `ReactNode` | Omitted | Grid items |
| `className` | `string` | Omitted | Additional classes on `.grid` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.grid`, merged after the layout properties |
| Native attributes and ref | React props for the `as` element | Optional | Forwarded to the element |

`Responsive` and `SpaceStep` are described in [Stack](./Stack.md#supporting-types).

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.grid` | `as` element (`div`) | `className` | `style` | `Always` |

State/variant selectors: `.grid[data-auto]` when `minItemWidth` is set. Use the
[stylesheet](../../src/components/Grid/Grid.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Grid className="example-grid" style={{ alignItems: "start" }}>{items}</Grid>
```

```css
.example-grid > :first-child {
  grid-column: 1 / -1;
}
```

Style props win over ordinary stylesheet declarations for the same property. Use a
stylesheet for hover, focus and pseudo-elements. Custom properties still follow CSS
inheritance, scope resets and specificity; see [the cascade guide](../design/customization.md).

## CSS token reference

Grid has no recipe tokens: gaps come from the system's `--space-*` scale
([token reference](../design/tokens.md)).

## Storybook and related guides

The single Grid story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider. Related:
[Stack](./Stack.md), [Card](./Card.md), [Section](./Section.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
