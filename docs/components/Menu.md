# Menu

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Text or icon trigger for an accessible action menu.

## Usage

```tsx
import { ThemeProvider, Menu } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Menu text="Actions" items={[{ label: "Edit", onClick: () => window.alert("Edit") }]} />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

The icon trigger uses IconButton classes; the text trigger uses Button classes. Both are
owned native buttons. Menu items support disabled state. Opening focuses a usable item;
arrows, Home and End move focus, Escape restores the trigger, and Tab/outside interaction
dismisses the panel. `menuStyle` targets the panel, not the root; `style` targets the root.
`itemStyle` and itemClassName apply to all menu items.

## Props

See [the type source](../../src/components/Menu/Menu.types.ts) and
[implementation](../../src/components/Menu/Menu.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `buttonLabelClassName` | `string` | Omitted | Additional classes on `.button-label` |
| `buttonLabelStyle` | `CSSProperties` | Omitted | Inline styles on `.button-label` |
| `className` | `string` | Omitted | Additional classes on `.menu` |
| `iconButtonIconClassName` | `string` | Omitted | Additional classes on `.icon-button-icon` |
| `iconButtonIconStyle` | `CSSProperties` | Omitted | Inline styles on `.icon-button-icon` |
| `itemClassName` | `string` | Omitted | Additional classes on `.menu__item` |
| `menuClassName` | `string` | Omitted | Additional classes on `.menu__panel` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.menu` |
| `triggerClassName` | `string` | Omitted | Additional classes on `.button.icon-button` |
| `triggerStyle` | `CSSProperties` | Omitted | Inline styles on `.button.icon-button` |
| `icon` | `IconButtonIcon` | Omitted | Icon-only trigger rendered with the IconButton recipe |
| `text` | `string` | Omitted | Trigger label; names the icon trigger when an icon is set |
| `size` | `MenuSize` | `"medium"` | Size of the trigger |
| `items` | `MenuItem[]` | Required | Menu items with label, onClick and optional disabled |
| `menuStyle` | `CSSProperties` | Omitted | Inline styles on `.menu__panel` |
| `itemStyle` | `CSSProperties` | Omitted | Inline styles on `.menu__item` |

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/Menu/index.ts). A type shown here is not necessarily a
package export.

```ts
type MenuSize = "small" | "medium" | "large";

type MenuItem = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.menu` | `div` | `className` | `style` | `Always` |
| `.button .icon-button` | `button` | `triggerClassName` | `triggerStyle` | `Always` |
| `.icon-button-icon` | `Icon` | `iconButtonIconClassName` | `iconButtonIconStyle` | `Icon` |
| `.button-label` | `span` | `buttonLabelClassName` | `buttonLabelStyle` | `Always` |
| `.menu__panel` | `div` | `menuClassName` | `menuStyle` | `Always` |
| `.menu__item` | `button` | `itemClassName` | `itemStyle` | `Always` |

Interaction states use native pseudo-classes and ARIA/data attributes where present.

Use the [stylesheet](../../src/components/Menu/Menu.styles.css) for pseudo-elements and
state selectors. For shared field/listbox parts, also inspect the shared styles linked from
the implementation. Consumer content and third-party generated internals retain their own
customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<Menu triggerClassName="example-menu" triggerStyle={{ outlineOffset: 4 }} text="Actions" items={[{ label: "Edit", onClick: () => window.alert("Edit") }]} />
```

```css
.example-menu {
  outline-offset: 4px;
}
.example-menu:focus-visible {
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

- [overlay baseline recipe](../../src/design-systems/neus/generated/recipes/overlay.css)

- [button baseline recipe](../../src/design-systems/neus/generated/recipes/button.css)

- [icon-button baseline recipe](../../src/design-systems/neus/generated/recipes/icon-button.css)

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--button-active-transform` | button active transform | `none` |
| `--button-disabled-background` | button disabled background | `var(--color-gray-400)` |
| `--button-disabled-color` | button disabled color | `var(--color-white)` |
| `--button-disabled-opacity` | button disabled opacity | `0.6` |
| `--button-disabled-shadow` | button disabled shadow | `none` |
| `--button-elevated-shadow-hover` | button elevated shadow hover | `var(--elevation-dialog)` |
| `--button-focus-color` | button focus color | `var(--color-focus)` |
| `--button-focus-inner-shadow` | button focus inner shadow | `none` |
| `--button-focus-offset` | button focus offset | `3px` |
| `--button-focus-width` | button focus width | `2px` |
| `--button-secondary-hover` | button secondary hover | `color-mix(in srgb, var(--button-secondary-background) 88%, var(--color-surface))` |
| `--button-shadow-active` | button shadow active | `none` |
| `--button-shadow-hover` | button shadow hover | `none` |
| `--icon-button-active-transform` | icon button active transform | `none` |
| `--icon-button-disabled-background` | icon button disabled background | `var(--color-gray-400)` |
| `--icon-button-disabled-color` | icon button disabled color | `var(--color-white)` |
| `--icon-button-disabled-opacity` | icon button disabled opacity | `0.6` |
| `--icon-button-disabled-shadow` | icon button disabled shadow | `none` |
| `--icon-button-focus-color` | icon button focus color | `var(--color-focus)` |
| `--icon-button-focus-inner-shadow` | icon button focus inner shadow | `none` |
| `--icon-button-focus-offset` | icon button focus offset | `3px` |
| `--icon-button-focus-width` | icon button focus width | `2px` |
| `--icon-button-shadow-active` | icon button shadow active | `none` |
| `--icon-button-shadow-hover` | icon button shadow hover | `none` |
| `--overlay-focus-color` | overlay focus color | `var(--color-focus)` |
| `--overlay-item-hover-background` | overlay item hover background | `var(--color-surface-hover)` |
| `--overlay-item-hover-color` | overlay item hover color | `var(--overlay-color)` |
| `--overlay-item-selected-background` | overlay item selected background | `var(--color-primary-light)` |
| `--overlay-item-selected-color` | overlay item selected color | `var(--color-primary-text)` |

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--button-border-color` | button border color | `transparent` |
| `--button-border-width` | button border width | `0px` |
| `--button-elevated-background` | button elevated background | `var(--color-surface-container-low)` |
| `--button-elevated-color` | button elevated color | `color-mix(in srgb, var(--color-primary-text) 80%, var(--color-text-primary))` |
| `--button-elevated-shadow` | button elevated shadow | `var(--elevation-floating)` |
| `--button-outlined-border-width` | button outlined border width | `1px` |
| `--button-secondary-background` | button secondary background | `var(--color-text-primary)` |
| `--button-secondary-color` | button secondary color | `var(--color-surface)` |
| `--button-shadow` | button shadow | `none` |
| `--button-tonal-background` | button tonal background | `var(--color-secondary-container)` |
| `--button-tonal-color` | button tonal color | `var(--color-on-secondary-container)` |
| `--icon-button-border-color` | icon button border color | `transparent` |
| `--icon-button-border-width` | icon button border width | `0px` |
| `--icon-button-outlined-border-width` | icon button outlined border width | `1px` |
| `--icon-button-shadow` | icon button shadow | `none` |
| `--overlay-background` | overlay background | `var(--color-surface)` |
| `--overlay-border-color` | overlay border color | `var(--color-border-input)` |
| `--overlay-border-width` | overlay border width | `1px` |
| `--overlay-color` | overlay color | `var(--color-text-primary)` |
| `--overlay-divider-color` | overlay divider color | `var(--color-border-subtle)` |
| `--overlay-shadow` | overlay shadow | `var(--elevation-floating)` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--button-font-family` | button font family | `var(--font-body)` |
| `--button-font-size-large` | button font size large | `var(--fs-base)` |
| `--button-font-size-medium` | button font size medium | `var(--fs-sm)` |
| `--button-font-size-small` | button font size small | `var(--fs-xs)` |
| `--button-label-weight` | button label weight | `700` |
| `--button-line-height` | button line height | `1` |
| `--overlay-font-family` | overlay font family | `var(--font-body)` |
| `--overlay-item-font-size` | overlay item font size | `var(--fs-base)` |
| `--overlay-item-font-weight` | overlay item font weight | `500` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--button-justify` | button justify | `center` |
| `--button-label-spacing` | button label spacing | `0.25em` |
| `--button-label-transform` | button label transform | `uppercase` |
| `--button-loader-gap` | button loader gap | `0px` |
| `--button-loader-size` | button loader size | `6px` |
| `--button-padding-large` | button padding large | `16px 28px` |
| `--button-padding-medium` | button padding medium | `12px 22px` |
| `--button-padding-small` | button padding small | `8px 14px` |
| `--button-radius` | button radius | `var(--radius-pill)` |
| `--button-transition` | button transition | `background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease, transform 180ms ease` |
| `--icon-button-icon-size-large` | icon button icon size large | `24px` |
| `--icon-button-icon-size-medium` | icon button icon size medium | `20px` |
| `--icon-button-icon-size-small` | icon button icon size small | `16px` |
| `--icon-button-icon-stroke` | icon button icon stroke | `2` |
| `--icon-button-radius` | icon button radius | `50%` |
| `--icon-button-size-large` | icon button size large | `68px` |
| `--icon-button-size-medium` | icon button size medium | `54px` |
| `--icon-button-size-small` | icon button size small | `40px` |
| `--icon-button-transition` | icon button transition | `background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease, transform 180ms ease` |
| `--overlay-item-min-height` | overlay item min height | `44px` |
| `--overlay-item-padding` | overlay item padding | `12px 16px` |
| `--overlay-item-radius` | overlay item radius | `0px` |
| `--overlay-min-width` | overlay min width | `11em` |
| `--overlay-offset` | overlay offset | `8px` |
| `--overlay-padding` | overlay padding | `0px` |
| `--overlay-radius` | overlay radius | `var(--radius-default)` |
| `--overlay-transition` | overlay transition | `opacity 0.2s ease, transform 0.2s ease` |

### Shared dependencies and runtime values

`--color-text-disabled`, `--popover-right`, `--popover-top`.

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
  --button-loader-gap: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Menu story exposes props as controls. Design selection is preview configuration;
applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
