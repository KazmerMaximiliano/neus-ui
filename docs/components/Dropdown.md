# Dropdown

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Avatar or icon trigger with an action menu.

## Usage

```tsx
import { ThemeProvider, Dropdown } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Dropdown name="Account" items={[{ label: "Sign out", onClick: () => window.alert("Sign out") }]} />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

The trigger exposes menu expansion and controls. A supplied icon is shown in the avatar;
otherwise the name initial is used. `name` also adds a header inside the panel. Items can be
disabled. Arrow/Home/End navigation, Escape, outside dismissal and focus restoration use the
shared menu/popover implementation. `menuStyle` targets the panel, and `itemStyle` targets
every item.

## Props

See [the type source](../../src/components/Dropdown/Dropdown.types.ts) and
[implementation](../../src/components/Dropdown/Dropdown.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `itemClassName` | `string` | Omitted | Additional classes on `.menu__item` |
| `menuClassName` | `string` | Omitted | Additional classes on `.menu__panel` |
| `avatarClassName` | `string` | Omitted | Additional classes on `.dropdown__avatar` |
| `avatarIconClassName` | `string` | Omitted | Additional classes on `.dropdown__avatar-icon` |
| `avatarIconStyle` | `CSSProperties` | Omitted | Inline styles on `.dropdown__avatar-icon` |
| `avatarStyle` | `CSSProperties` | Omitted | Inline styles on `.dropdown__avatar` |
| `caretClassName` | `string` | Omitted | Additional classes on `.dropdown__caret` |
| `caretStyle` | `CSSProperties` | Omitted | Inline styles on `.dropdown__caret` |
| `className` | `string` | Omitted | Additional classes on `.dropdown` |
| `nameClassName` | `string` | Omitted | Additional classes on `.dropdown__name` |
| `nameStyle` | `CSSProperties` | Omitted | Inline styles on `.dropdown__name` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.dropdown` |
| `triggerClassName` | `string` | Omitted | Additional classes on `.dropdown__trigger` |
| `icon` | `IconButtonIcon` | Omitted | Avatar icon; without it the avatar shows the name initial |
| `name` | `string` | Omitted | Account name shown in the menu header and used as trigger label |
| `items` | `MenuItem[]` | Required | Menu items with label, onClick and optional disabled |
| `triggerStyle` | `CSSProperties` | Omitted | Inline styles on `.dropdown__trigger` |
| `menuStyle` | `CSSProperties` | Omitted | Inline styles on `.menu__panel` |
| `itemStyle` | `CSSProperties` | Omitted | Inline styles on `.menu__item` |

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/Dropdown/index.ts). A type shown here is not necessarily a
package export.

```ts
type DropdownItem = MenuItem;
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.dropdown` | `div` | `className` | `style` | `Always` |
| `.dropdown__trigger` | `button` | `triggerClassName` | `triggerStyle` | `Always` |
| `.dropdown__avatar` | `span` | `avatarClassName` | `avatarStyle` | `Always` |
| `.dropdown__avatar-icon` | `Icon` | `avatarIconClassName` | `avatarIconStyle` | `Icon` |
| `.dropdown__caret` | `ChevronDown` | `caretClassName` | `caretStyle` | `Always` |
| `.dropdown__name` | `div` | `nameClassName` | `nameStyle` | `name` |
| `.menu__panel` | `div` | `menuClassName` | `menuStyle` | `Always` |
| `.menu__item` | `button` | `itemClassName` | `itemStyle` | `Always` |

State/variant selectors: `.dropdown__trigger--open`.

Use the [stylesheet](../../src/components/Dropdown/Dropdown.styles.css) for pseudo-elements
and state selectors. For shared field/listbox parts, also inspect the shared styles linked
from the implementation. Consumer content and third-party generated internals retain their
own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<Dropdown triggerClassName="example-dropdown" triggerStyle={{ outlineOffset: 4 }} name="Account" items={[{ label: "Sign out", onClick: () => window.alert("Sign out") }]} />
```

```css
.example-dropdown {
  outline-offset: 4px;
}
.example-dropdown:focus-visible {
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

- [dropdown baseline recipe](../../src/design-systems/neus/generated/recipes/dropdown.css)

- [overlay baseline recipe](../../src/design-systems/neus/generated/recipes/overlay.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--dropdown-avatar-background` | dropdown avatar background | `var(--color-primary)` |
| `--dropdown-avatar-color` | dropdown avatar color | `var(--color-text-on-primary)` |
| `--dropdown-background` | dropdown background | `var(--color-surface)` |
| `--dropdown-border-color` | dropdown border color | `var(--color-border-input)` |
| `--dropdown-border-width` | dropdown border width | `1px` |
| `--dropdown-caret-color` | dropdown caret color | `var(--color-primary-text)` |
| `--dropdown-name-color` | dropdown name color | `var(--color-primary-text)` |
| `--dropdown-shadow` | dropdown shadow | `none` |
| `--overlay-background` | overlay background | `var(--color-surface)` |
| `--overlay-border-color` | overlay border color | `var(--color-border-input)` |
| `--overlay-border-width` | overlay border width | `1px` |
| `--overlay-color` | overlay color | `var(--color-text-primary)` |
| `--overlay-divider-color` | overlay divider color | `var(--color-border-subtle)` |
| `--overlay-shadow` | overlay shadow | `var(--elevation-floating)` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--dropdown-avatar-radius` | dropdown avatar radius | `50%` |
| `--dropdown-avatar-size` | dropdown avatar size | `36px` |
| `--dropdown-caret-size` | dropdown caret size | `20px` |
| `--dropdown-caret-stroke` | dropdown caret stroke | `3` |
| `--dropdown-gap` | dropdown gap | `0.5em` |
| `--dropdown-name-transform` | dropdown name transform | `uppercase` |
| `--dropdown-padding` | dropdown padding | `0.5em 0.75em 0.5em 0.5em` |
| `--dropdown-radius` | dropdown radius | `var(--radius-default)` |
| `--dropdown-transition` | dropdown transition | `border-color 0.2s ease` |
| `--overlay-item-min-height` | overlay item min height | `44px` |
| `--overlay-item-padding` | overlay item padding | `12px 16px` |
| `--overlay-item-radius` | overlay item radius | `0px` |
| `--overlay-min-width` | overlay min width | `11em` |
| `--overlay-offset` | overlay offset | `8px` |
| `--overlay-padding` | overlay padding | `0px` |
| `--overlay-radius` | overlay radius | `var(--radius-default)` |
| `--overlay-transition` | overlay transition | `opacity 0.2s ease, transform 0.2s ease` |

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--dropdown-hover-border-color` | dropdown hover border color | `var(--color-border-input-hover)` |
| `--overlay-focus-color` | overlay focus color | `var(--color-focus)` |
| `--overlay-item-hover-background` | overlay item hover background | `var(--color-surface-hover)` |
| `--overlay-item-hover-color` | overlay item hover color | `var(--overlay-color)` |
| `--overlay-item-selected-background` | overlay item selected background | `var(--color-primary-light)` |
| `--overlay-item-selected-color` | overlay item selected color | `var(--color-primary-text)` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--dropdown-name-weight` | dropdown name weight | `700` |
| `--overlay-font-family` | overlay font family | `var(--font-body)` |
| `--overlay-item-font-size` | overlay item font size | `var(--fs-base)` |
| `--overlay-item-font-weight` | overlay item font weight | `500` |

### Shared dependencies and runtime values

`--color-focus`, `--color-text-disabled`, `--popover-right`, `--popover-top`.

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
  --dropdown-avatar-radius: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

Related composition: [Menu](./Menu.md).

The single Dropdown story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
