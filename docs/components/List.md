# List

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A list of rows, each with optional leading content, a title, an optional description and
optional trailing content: settings, team members, recent files, notifications. Rows are
[ListItem](./ListItem.md)s.

## Usage

```tsx
import { Bell, Shield } from "lucide-react";
import { Badge, List, ListItem, Switch, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => (
  <ThemeProvider designSystem="neus">
    <List divided aria-label="Settings">
      <ListItem
        leading={<Bell aria-hidden />}
        title="Notifications"
        description="A summary of the week, every Monday."
        trailing={<Switch aria-label="Notifications" defaultChecked />}
      />
      <ListItem leading={<Shield aria-hidden />} title="Two-step sign-in" trailing={<Badge label="On" color="success" />} />
    </List>
  </ThemeProvider>
);
```

A List is static content: its rows are read, and the controls inside them act. Actions for a
button are a [Menu](./Menu.md); records with columns to sort are a [DataTable](./DataTable.md);
cards of features or products laid out side by side are a [Grid](./Grid.md) with `as="ul"`.

## Behavior and accessibility

The list is a native `<ul>`, or `<ol>` with `as="ol"` when the order matters, so screen readers
announce the number of rows. Without visible numbers, an ordered list still says its order;
put a number in a row's leading content to show it. Give the list an `aria-label` when nothing
around it names it. `divided` draws rules between the rows instead of space.

Rows are not focusable on their own: put a link in the title for a row that opens something,
and controls (a Switch, a Button) in its trailing content, each with its own name.

## Props

See [the type source](../../src/components/List/List.types.ts) and
[implementation](../../src/components/List/List.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `as` | `"ul" \| "ol"` | `"ul"` | Unordered, or ordered when the order matters |
| `divided` | `boolean` | `false` | Rules between the rows instead of space |
| `children` | `ReactNode` | Omitted | The [ListItem](./ListItem.md) rows |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.list` |
| Native attributes | `ul` attributes and `ref` | Optional | `aria-label`, `id`, `data-*` and the ref land on the list |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.list` | `ul` or `ol`, `[data-divided]` | `className` | `style` | `Always` |
| `.list-item` | [ListItem](./ListItem.md) | its `className` | its `style` | Each row |

With `[data-divided]`, each row after the first draws its rule in a `::before`, inset by
`--list-divider-inset` and `--list-divider-end-inset` from the row's ends. Use the
[stylesheet](../../src/components/List/List.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<List className="team-list" aria-label="Team">…</List>
```

```css
.team-list {
  --list-background: var(--color-surface-secondary);
  --list-radius: var(--radius-default);
  --list-padding: 0 var(--space-4);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files. List and
[ListItem](./ListItem.md) share the `list` recipe.

- [list baseline recipe](../../src/design-systems/neus/generated/recipes/list.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--list-font-family` | Font of the list | `var(--font-body)` |
| `--list-gap` | Space between rows without dividers | `8px` |
| `--list-padding` | Space inside the list | `0px` |
| `--list-radius` | Corners of the list | `0px` |
| `--list-background` | Fill of the list | `transparent` |
| `--list-border-width`, `--list-border-color` | Frame around the list | `0px`, `transparent` |
| `--list-divider-width`, `--list-divider-color` | Rules between rows | `1px`, `var(--color-border-subtle)` |
| `--list-divider-inset` | Space before a rule starts | `0px` |
| `--list-divider-end-inset` | Space after a rule ends | `0px` |

Row tokens (`--list-item-*`, `--list-leading-*`, `--list-title-*`, `--list-description-*`,
`--list-trailing-*`) are listed in [ListItem](./ListItem.md#css-token-reference).

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --list-divider-inset: 52px;
}
```

## Storybook and related guides

The single List story composes a settings list; ListItem has its own story under Base/List.
Related: [ListItem](./ListItem.md), [Card](./Card.md), [Menu](./Menu.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
