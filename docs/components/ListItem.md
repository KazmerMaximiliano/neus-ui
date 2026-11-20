# ListItem

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A row of a [List](./List.md): leading content, a title with an optional description, and
trailing content.

## Usage

```tsx
import { Bell } from "lucide-react";
import { List, ListItem, Switch, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => (
  <ThemeProvider designSystem="neus">
    <List aria-label="Settings">
      <ListItem
        leading={<Bell aria-hidden />}
        title="Notifications"
        description="A summary of the week, every Monday."
        trailing={<Switch aria-label="Notifications" defaultChecked />}
      />
    </List>
  </ThemeProvider>
);
```

## Behavior and accessibility

The row is an `<li>`: use it inside a List. `leading` holds an icon (mark it `aria-hidden`), an
[Avatar](./Avatar.md) or a picture; `trailing` holds meta text, a [Badge](./Badge.md) or a
control such as a [Switch](./Switch.md) or a [Button](./Button.md), each with its own name.
`children` adds content under the description. Rows are not focusable: a row that opens
something has a link in its title.

## Props

See [the type source](../../src/components/List/components/ListItem/ListItem.types.ts) and
[implementation](../../src/components/List/components/ListItem/ListItem.tsx) for the exact
contract. All props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `title` | `ReactNode` | Required | The row's main text |
| `description` | `ReactNode` | Omitted | Secondary text under the title |
| `leading` | `ReactNode` | Omitted | An icon, avatar or picture before the text |
| `trailing` | `ReactNode` | Omitted | Meta text or a control after the text |
| `children` | `ReactNode` | Omitted | More content under the description |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.list-item` |
| `leadingClassName`, `leadingStyle` | `string`, `CSSProperties` | Omitted | `.list-item__leading` |
| `bodyClassName`, `bodyStyle` | `string`, `CSSProperties` | Omitted | `.list-item__body` |
| `titleClassName`, `titleStyle` | `string`, `CSSProperties` | Omitted | `.list-item__title` |
| `descriptionClassName`, `descriptionStyle` | `string`, `CSSProperties` | Omitted | `.list-item__description` |
| `trailingClassName`, `trailingStyle` | `string`, `CSSProperties` | Omitted | `.list-item__trailing` |
| Native attributes | `li` attributes and `ref` | Optional | `aria-current`, `id`, `data-*` and the ref land on the row |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.list-item` | `li` | `className` | `style` | `Always` |
| `.list-item__leading` | `div` | `leadingClassName` | `leadingStyle` | `leading` |
| `.list-item__body` | `div` | `bodyClassName` | `bodyStyle` | `Always` |
| `.list-item__title` | `div` | `titleClassName` | `titleStyle` | `Always` |
| `.list-item__description` | `div` | `descriptionClassName` | `descriptionStyle` | `description` |
| `.list-item__trailing` | `div` | `trailingClassName` | `trailingStyle` | `trailing` |

An SVG directly inside the leading part takes `--list-leading-size`. Use the
[stylesheet](../../src/components/List/components/ListItem/ListItem.styles.css) for the exact
declarations.

### Instance styles and classes

```tsx
<ListItem title="Ana Paz" titleClassName="member-name" />
```

```css
.member-name {
  font-weight: 500;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files.

- [list baseline recipe](../../src/design-systems/neus/generated/recipes/list.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--list-item-min-height` | Least row height | `56px` |
| `--list-item-padding` | Space inside a row | `12px 0` |
| `--list-item-gap` | Space between leading, body and trailing | `12px` |
| `--list-body-gap` | Space between the title and the description | `2px` |
| `--list-leading-size` | Size of an icon in the leading part | `24px` |
| `--list-leading-color` | Leading icon color | `var(--color-text-secondary)` |
| `--list-title-color` | Title color | `var(--color-text-primary)` |
| `--list-title-size` | Title size | `var(--fs-base)` |
| `--list-title-weight` | Title weight | `600` |
| `--list-title-line-height` | Title line height | `1.4` |
| `--list-description-color` | Description color | `var(--color-text-secondary)` |
| `--list-description-size` | Description size | `var(--fs-sm)` |
| `--list-description-line-height` | Description line height | `1.5` |
| `--list-trailing-color` | Trailing text color | `var(--color-text-secondary)` |
| `--list-trailing-size` | Trailing text size | `var(--fs-sm)` |

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --list-item-min-height: 48px;
  --list-title-weight: 500;
}
```

## Storybook and related guides

The single ListItem story, under Base/List, shows one row inside a list. Related:
[List](./List.md), [Avatar](./Avatar.md), [Switch](./Switch.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
