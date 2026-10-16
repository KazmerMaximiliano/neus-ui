# Select

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Single selection with a searchable, keyboard-operated listbox.

## Usage

```tsx
import { ThemeProvider, Select } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Select name="role" label="Role" options={[{ value: "editor", label: "Editor" }, { value: "viewer", label: "Viewer" }]} defaultValue="editor" />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

Values and callbacks are strings. The display label falls back to placeholder when no label
is supplied. Search filters option labels case-insensitively. Opening focuses the search
field or selected/first option; keyboard navigation, Escape/outside dismissal and focus
restoration follow the shared popover behavior. Choosing an option closes the list. A hidden
input is rendered when name is supplied.

Current compatibility behavior uses a truthy value as the external selection and otherwise
falls back to internal state initialized from defaultValue. Passing an empty controlled
string does not reliably clear an edited selection. Document and account for that behavior
when integrating forms. `listStyle`/listClassName target the popover;
`listContentStyle`/listContentClassName target the inner listbox. Value and placeholder
hooks target their respective display states.

## Props

See [the type source](../../src/components/Select/Select.types.ts) and
[implementation](../../src/components/Select/Select.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `placeholderClassName` | `string` | Omitted | Additional classes on `.select__value.select__placeholder` |
| `placeholderStyle` | `CSSProperties` | Omitted | Inline styles on `.select__value.select__placeholder` |
| `caretClassName` | `string` | Omitted | Additional classes on `.select__caret` |
| `caretStyle` | `CSSProperties` | Omitted | Inline styles on `.select__caret` |
| `className` | `string` | Omitted | Additional classes on `.select__wrapper` |
| `emptyClassName` | `string` | Omitted | Additional classes on `.select__empty` |
| `emptyStyle` | `CSSProperties` | Omitted | Inline styles on `.select__empty` |
| `errorMessageClassName` | `string` | Omitted | Additional classes on `.select__error-message` |
| `errorMessageStyle` | `CSSProperties` | Omitted | Inline styles on `.select__error-message` |
| `fieldClassName` | `string` | Omitted | Additional classes on `.select__field` |
| `labelClassName` | `string` | Omitted | Additional classes on `.select__label` |
| `labelStyle` | `CSSProperties` | Omitted | Inline styles on `.select__label` |
| `listClassName` | `string` | Omitted | Additional classes on `.select__popover` |
| `listContentClassName` | `string` | Omitted | Additional classes on `.select__list` |
| `listContentStyle` | `CSSProperties` | Omitted | Inline styles on `.select__list` |
| `optionCheckClassName` | `string` | Omitted | Additional classes on `.select__option-check` |
| `optionCheckStyle` | `CSSProperties` | Omitted | Inline styles on `.select__option-check` |
| `optionClassName` | `string` | Omitted | Additional classes on `.select__option` |
| `optionLabelClassName` | `string` | Omitted | Additional classes on `.select__option-label` |
| `optionLabelStyle` | `CSSProperties` | Omitted | Inline styles on `.select__option-label` |
| `panelClassName` | `string` | Omitted | Additional classes on `.select__panel` |
| `panelStyle` | `CSSProperties` | Omitted | Inline styles on `.select__panel` |
| `searchClassName` | `string` | Omitted | Additional classes on `.select__search` |
| `searchInputClassName` | `string` | Omitted | Additional classes on `.select__search-input` |
| `searchInputStyle` | `CSSProperties` | Omitted | Inline styles on `.select__search-input` |
| `searchStyle` | `CSSProperties` | Omitted | Inline styles on `.select__search` |
| `valueClassName` | `string` | Omitted | Additional classes on `.select__value.select__placeholder` |
| `valueStyle` | `CSSProperties` | Omitted | Inline styles on `.select__value.select__placeholder` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.select__wrapper` |
| `triggerClassName` | `string` | Omitted | Additional classes on `.select__trigger` |
| `triggerStyle` | `CSSProperties` | Omitted | Inline styles on `.select__trigger` |
| `options` | `SelectOption[]` | Required | Options with value and label |
| `name` | `string` | Omitted | Name of the hidden form input |
| `value` | `string` | Omitted | Controlled value |
| `defaultValue` | `string` | Omitted | Initial uncontrolled value |
| `placeholder` | `string` | Omitted | Text shown without a value |
| `label` | `string` | Omitted | Visible label naming the combobox |
| `error` | `string` | Omitted | Error message linked to the field |
| `disabled` | `boolean` | `false` | Disables the field |
| `viewSearchBar` | `boolean` | `true` | Shows the search box |
| `searchBarPlaceholder` | `string` | `"Buscar..."` | Placeholder and accessible name of the search box |
| `fieldStyle` | `CSSProperties` | Omitted | Inline styles on `.select__field` |
| `listStyle` | `CSSProperties` | Omitted | Inline styles on `.select__popover` |
| `optionStyle` | `CSSProperties` | Omitted | Inline styles on `.select__option` |
| `onChange` | `((value: string) => void)` | Omitted | Called with the new value |

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/Select/index.ts). A type shown here is not necessarily a
package export.

```ts
type SelectOption = {
  value?: string | null;
  label: string;
};
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.select__wrapper` | `div` | `className` | `style` | `Always` |
| `.select__label` | `label` | `labelClassName` | `labelStyle` | `displayLabel` |
| `.select__field` | `div` | `fieldClassName` | `fieldStyle` | `Always` |
| `.select__trigger` | `button` | `triggerClassName` | `triggerStyle` | `Always` |
| `.select__value .select__placeholder` | `span` | `valueClassName`, `placeholderClassName` | `valueStyle`, `placeholderStyle` | `Always` |
| `.select__caret` | `ChevronDown` | `caretClassName` | `caretStyle` | `Always` |
| `.select__error-message` | `div` | `errorMessageClassName` | `errorMessageStyle` | `error` |
| `.select__popover` | `div` | `listClassName` | `listStyle` | `Always` |
| `.select__panel` | `div` | `panelClassName` | `panelStyle` | `Always` |
| `.select__search` | `div` | `searchClassName` | `searchStyle` | `viewSearchBar` |
| `.select__search-input` | `input` | `searchInputClassName` | `searchInputStyle` | `viewSearchBar` |
| `.select__list` | `div` | `listContentClassName` | `listContentStyle` | `Always` |
| `.select__option` | `div` | `optionClassName` | `optionStyle` | `Always` |
| `.select__option-label` | `span` | `optionLabelClassName` | `optionLabelStyle` | `Always` |
| `.select__option-check` | `Check` | `optionCheckClassName` | `optionCheckStyle` | `!multiple && selected` |
| `.select__empty` | `div` | `emptyClassName` | `emptyStyle` | `filtered.length === 0` |

State/variant selectors: `.select__field--disabled`, `.select__field--error`,
`.select__field--open`, `.select__label--disabled`, `.select__label--error`,
`.select__option--selected`.

Use the [stylesheet](../../src/components/Select/Select.styles.css) for pseudo-elements and
state selectors. For shared field/listbox parts, also inspect the shared styles linked from
the implementation. Consumer content and third-party generated internals retain their own
customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<Select labelClassName="example-select" labelStyle={{ outlineOffset: 4 }} name="role" label="Role" options={[{ value: "editor", label: "Editor" }, { value: "viewer", label: "Viewer" }]} defaultValue="editor" />
```

```css
.example-select {
  outline-offset: 4px;
}
.example-select:focus-visible {
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

- [input baseline recipe](../../src/design-systems/neus/generated/recipes/input.css)

- [select baseline recipe](../../src/design-systems/neus/generated/recipes/select.css)

- [overlay baseline recipe](../../src/design-systems/neus/generated/recipes/overlay.css)

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--input-adornment-gap` | input adornment gap | `8px` |
| `--input-adornment-size` | input adornment size | `20px` |
| `--input-control-height-large` | input control height large | `56px` |
| `--input-control-height-medium` | input control height medium | `48px` |
| `--input-control-height-small` | input control height small | `36px` |
| `--input-gap` | input gap | `8px` |
| `--input-label-left` | input label left | `auto` |
| `--input-label-offset` | input label offset | `1em` |
| `--input-label-padding` | input label padding | `0px` |
| `--input-label-position` | input label position | `static` |
| `--input-label-raised-size` | input label raised size | `var(--input-label-font-size)` |
| `--input-label-raised-top` | input label raised top | `auto` |
| `--input-label-raised-translate` | input label raised translate | `none` |
| `--input-label-rest-size` | input label rest size | `var(--input-label-font-size)` |
| `--input-label-top` | input label top | `auto` |
| `--input-label-translate` | input label translate | `none` |
| `--input-large-padding` | input large padding | `18px 24px` |
| `--input-min-width` | input min width | `200px` |
| `--input-padding` | input padding | `1em 2em` |
| `--input-placeholder-opacity` | input placeholder opacity | `1` |
| `--input-placeholder-rest-opacity` | input placeholder rest opacity | `1` |
| `--input-radius` | input radius | `3em` |
| `--input-required-gap` | input required gap | `0.25em` |
| `--input-small-padding` | input small padding | `8px 16px` |
| `--input-transition` | input transition | `border-color 0.2s` |
| `--overlay-item-min-height` | overlay item min height | `44px` |
| `--overlay-item-padding` | overlay item padding | `12px 16px` |
| `--overlay-item-radius` | overlay item radius | `0px` |
| `--overlay-min-width` | overlay min width | `11em` |
| `--overlay-offset` | overlay offset | `8px` |
| `--overlay-padding` | overlay padding | `0px` |
| `--overlay-radius` | overlay radius | `var(--radius-default)` |
| `--overlay-transition` | overlay transition | `opacity 0.2s ease, transform 0.2s ease` |
| `--select-caret-gap` | select caret gap | `1.25em` |
| `--select-caret-size` | select caret size | `18px` |
| `--select-list-max-height` | select list max height | `250px` |
| `--select-search-radius` | select search radius | `var(--radius-default)` |
| `--select-tag-gap` | select tag gap | `6px` |
| `--select-tag-padding` | select tag padding | `2px 4px 2px 10px` |
| `--select-tag-radius` | select tag radius | `var(--radius-pill)` |

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--input-background` | input background | `var(--color-surface)` |
| `--input-border-color` | input border color | `var(--color-border-input)` |
| `--input-border-width` | input border width | `1px` |
| `--input-color` | input color | `var(--color-control-text)` |
| `--input-color-height` | input color height | `3.5em` |
| `--input-color-padding` | input color padding | `0px` |
| `--input-color-swatch-padding` | input color swatch padding | `0px` |
| `--input-filled-background` | input filled background | `var(--color-surface-secondary)` |
| `--input-filled-border-width` | input filled border width | `0 0 1px` |
| `--input-label-background` | input label background | `transparent` |
| `--input-label-color` | input label color | `var(--color-control-text)` |
| `--input-outlined-border-width` | input outlined border width | `1px` |
| `--input-placeholder-color` | input placeholder color | `var(--color-text-placeholder)` |
| `--input-readonly-background` | input readonly background | `transparent` |
| `--input-readonly-border-color` | input readonly border color | `var(--color-border-input-hover)` |
| `--input-readonly-border-style` | input readonly border style | `dashed` |
| `--input-readonly-shadow` | input readonly shadow | `none` |
| `--input-required-color` | input required color | `var(--color-error)` |
| `--input-shadow` | input shadow | `none` |
| `--overlay-background` | overlay background | `var(--color-surface)` |
| `--overlay-border-color` | overlay border color | `var(--color-border-input)` |
| `--overlay-border-width` | overlay border width | `1px` |
| `--overlay-color` | overlay color | `var(--color-text-primary)` |
| `--overlay-divider-color` | overlay divider color | `var(--color-border-subtle)` |
| `--overlay-shadow` | overlay shadow | `var(--elevation-floating)` |
| `--select-caret-color` | select caret color | `var(--input-color)` |
| `--select-tag-background` | select tag background | `var(--color-tag-bg)` |
| `--select-tag-border-color` | select tag border color | `transparent` |
| `--select-tag-border-width` | select tag border width | `0px` |
| `--select-tag-color` | select tag color | `var(--color-text-primary)` |
| `--select-tag-remove-color` | select tag remove color | `var(--color-tag-remove)` |

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--input-disabled-background` | input disabled background | `var(--color-surface-disabled)` |
| `--input-disabled-border-color` | input disabled border color | `var(--color-border-subtle)` |
| `--input-disabled-color` | input disabled color | `var(--color-text-disabled)` |
| `--input-disabled-shadow` | input disabled shadow | `none` |
| `--input-error-border-color` | input error border color | `var(--color-error)` |
| `--input-error-color` | input error color | `var(--color-error-text)` |
| `--input-error-focus-shadow` | input error focus shadow | `0 0 0 3px var(--color-focus-ring-error)` |
| `--input-error-font-size` | input error font size | `0.85em` |
| `--input-error-offset` | input error offset | `1em` |
| `--input-error-shadow` | input error shadow | `var(--input-shadow)` |
| `--input-focus-border-color` | input focus border color | `var(--color-info-300)` |
| `--input-focus-shadow` | input focus shadow | `0 0 0 3px var(--color-focus-ring)` |
| `--input-hover-border-color` | input hover border color | `var(--color-border-input-hover)` |
| `--overlay-focus-color` | overlay focus color | `var(--color-focus)` |
| `--overlay-item-hover-background` | overlay item hover background | `var(--color-surface-hover)` |
| `--overlay-item-hover-color` | overlay item hover color | `var(--overlay-color)` |
| `--overlay-item-selected-background` | overlay item selected background | `var(--color-primary-light)` |
| `--overlay-item-selected-color` | overlay item selected color | `var(--color-primary-text)` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--input-font-family` | input font family | `var(--font-body)` |
| `--input-font-size` | input font size | `13.333333px` |
| `--input-font-weight` | input font weight | `400` |
| `--input-label-font-size` | input label font size | `0.9em` |
| `--input-label-weight` | input label weight | `500` |
| `--input-line-height` | input line height | `normal` |
| `--overlay-font-family` | overlay font family | `var(--font-body)` |
| `--overlay-item-font-size` | overlay item font size | `var(--fs-base)` |
| `--overlay-item-font-weight` | overlay item font weight | `500` |
| `--select-tag-font-size` | select tag font size | `var(--fs-xs)` |

### Shared dependencies and runtime values

`--color-text-secondary`, `--popover-anchor-width`, `--popover-left`, `--popover-top`.

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
  --input-adornment-gap: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Select story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
