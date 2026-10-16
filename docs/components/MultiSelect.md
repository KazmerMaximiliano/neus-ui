# MultiSelect

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Multiple selection with removable tags and searchable options.

## Usage

```tsx
import { ThemeProvider, MultiSelect } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <MultiSelect name="roles" label="Roles" options={[{ value: "editor", label: "Editor" }, { value: "viewer", label: "Viewer" }]} defaultValue={["editor"]} />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

Values and callbacks are string arrays; each selected value creates an indexed hidden input.
Selected tags can be removed unless disabled. The shared listbox supports search, keyboard
navigation, aria-selected and multi-selection. Empty option values are ignored.
`viewSearchBar` defaults to true.

Current compatibility behavior uses a nonempty value array as the external selection and
otherwise falls back to internal values initialized from defaultValue. An empty controlled
array does not reliably clear an edited internal selection; use uncontrolled/defaultValue
usage or remount when a reset is required. This work documents that behavior without
changing it. Shared `.select__*` parts belong to the same per-part customization contract.
Checkbox wrappers inside options are decorative, not public Checkbox instances.

## Props

See [the type source](../../src/components/MultiSelect/MultiSelect.types.ts) and
[implementation](../../src/components/MultiSelect/MultiSelect.tsx) for the exact contract.
All customization props are optional and default to undefined unless noted; section style
props retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `tagRemoveIconClassName` | `string` | Omitted | Additional classes on `.multiselect__tag-remove-icon` |
| `tagRemoveIconStyle` | `CSSProperties` | Omitted | Inline styles on `.multiselect__tag-remove-icon` |
| `boxClassName` | `string` | Omitted | Additional classes on `.checkbox__box` |
| `boxStyle` | `CSSProperties` | Omitted | Inline styles on `.checkbox__box` |
| `checkboxClassName` | `string` | Omitted | Additional classes on `.checkbox` |
| `checkboxStyle` | `CSSProperties` | Omitted | Inline styles on `.checkbox` |
| `emptyClassName` | `string` | Omitted | Additional classes on `.select__empty` |
| `emptyStyle` | `CSSProperties` | Omitted | Inline styles on `.select__empty` |
| `iconClassName` | `string` | Omitted | Additional classes on `.checkbox__icon` |
| `iconStyle` | `CSSProperties` | Omitted | Inline styles on `.checkbox__icon` |
| `listClassName` | `string` | Omitted | Additional classes on `.select__popover` |
| `listContentClassName` | `string` | Omitted | Additional classes on `.select__list` |
| `listContentStyle` | `CSSProperties` | Omitted | Inline styles on `.select__list` |
| `optionClassName` | `string` | Omitted | Additional classes on `.select__option` |
| `optionLabelClassName` | `string` | Omitted | Additional classes on `.select__option-label` |
| `optionLabelStyle` | `CSSProperties` | Omitted | Inline styles on `.select__option-label` |
| `panelClassName` | `string` | Omitted | Additional classes on `.select__panel` |
| `panelStyle` | `CSSProperties` | Omitted | Inline styles on `.select__panel` |
| `searchClassName` | `string` | Omitted | Additional classes on `.select__search` |
| `searchInputClassName` | `string` | Omitted | Additional classes on `.select__search-input` |
| `searchInputStyle` | `CSSProperties` | Omitted | Inline styles on `.select__search-input` |
| `searchStyle` | `CSSProperties` | Omitted | Inline styles on `.select__search` |
| `caretClassName` | `string` | Omitted | Additional classes on `.select__caret` |
| `caretStyle` | `CSSProperties` | Omitted | Inline styles on `.select__caret` |
| `className` | `string` | Omitted | Additional classes on `.select__wrapper.multiselect` |
| `errorMessageClassName` | `string` | Omitted | Additional classes on `.select__error-message` |
| `errorMessageStyle` | `CSSProperties` | Omitted | Inline styles on `.select__error-message` |
| `fieldClassName` | `string` | Omitted | Additional classes on `.select__field` |
| `labelClassName` | `string` | Omitted | Additional classes on `.select__label` |
| `labelStyle` | `CSSProperties` | Omitted | Inline styles on `.select__label` |
| `placeholderClassName` | `string` | Omitted | Additional classes on `.select__placeholder` |
| `placeholderStyle` | `CSSProperties` | Omitted | Inline styles on `.select__placeholder` |
| `srOnlyClassName` | `string` | Omitted | Additional classes on `.select__sr-only` |
| `srOnlyStyle` | `CSSProperties` | Omitted | Inline styles on `.select__sr-only` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.select__wrapper.multiselect` |
| `tagClassName` | `string` | Omitted | Additional classes on `.multiselect__tag` |
| `tagRemoveClassName` | `string` | Omitted | Additional classes on `.multiselect__tag-remove` |
| `tagRemoveStyle` | `CSSProperties` | Omitted | Inline styles on `.multiselect__tag-remove` |
| `triggerClassName` | `string` | Omitted | Additional classes on `.select__trigger` |
| `triggerStyle` | `CSSProperties` | Omitted | Inline styles on `.select__trigger` |
| `name` | `string` | Required | Name of the hidden form input |
| `options` | `SelectOption[]` | Required | Options with value and label |
| `error` | `string` | Omitted | Error message linked to the field |
| `placeholder` | `string` | Omitted | Text shown without a value |
| `label` | `string` | Omitted | Visible label naming the combobox |
| `value` | `string[]` | `[]` | Controlled values |
| `defaultValue` | `string[]` | `[]` | Initial uncontrolled values |
| `disabled` | `boolean` | `false` | Disables the field |
| `viewSearchBar` | `boolean` | `true` | Shows the search box |
| `searchBarPlaceholder` | `string` | `"Buscar..."` | Placeholder and accessible name of the search box |
| `fieldStyle` | `CSSProperties` | Omitted | Inline styles on `.select__field` |
| `tagStyle` | `CSSProperties` | Omitted | Inline styles on `.multiselect__tag` |
| `listStyle` | `CSSProperties` | Omitted | Inline styles on `.select__popover` |
| `optionStyle` | `CSSProperties` | Omitted | Inline styles on `.select__option` |
| `onChange` | `((values: string[]) => void)` | Omitted | Called with the selected values |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.select__wrapper .multiselect` | `div` | `className` | `style` | `Always` |
| `.select__label` | `label` | `labelClassName` | `labelStyle` | `displayLabel` |
| `.select__field` | `div` | `fieldClassName` | `fieldStyle` | `Always` |
| `.multiselect__tag` | `span` | `tagClassName` | `tagStyle` | `Always` |
| `.multiselect__tag-remove` | `button` | `tagRemoveClassName` | `tagRemoveStyle` | `!disabled` |
| `.multiselect__tag-remove-icon` | `X` | `tagRemoveIconClassName` | `tagRemoveIconStyle` | `!disabled` |
| `.select__trigger` | `button` | `triggerClassName` | `triggerStyle` | `Always` |
| `.select__placeholder` | `span` | `placeholderClassName` | `placeholderStyle` | `selectedOptions.length === 0` |
| `.select__sr-only` | `span` | `srOnlyClassName` | `srOnlyStyle` | `Always` |
| `.select__caret` | `ChevronDown` | `caretClassName` | `caretStyle` | `Always` |
| `.select__error-message` | `div` | `errorMessageClassName` | `errorMessageStyle` | `error` |
| `.select__popover` | `div` | `listClassName` | `listStyle` | `Always` |
| `.select__panel` | `div` | `panelClassName` | `panelStyle` | `Always` |
| `.select__search` | `div` | `searchClassName` | `searchStyle` | `viewSearchBar` |
| `.select__search-input` | `input` | `searchInputClassName` | `searchInputStyle` | `viewSearchBar` |
| `.select__list` | `div` | `listContentClassName` | `listContentStyle` | `Always` |
| `.select__option` | `div` | `optionClassName` | `optionStyle` | `Always` |
| `.checkbox` | `span` | `checkboxClassName` | `checkboxStyle` | `multiple` |
| `.checkbox__box` | `span` | `boxClassName` | `boxStyle` | `multiple` |
| `.checkbox__icon` | `Check` | `iconClassName` | `iconStyle` | `multiple` |
| `.select__option-label` | `span` | `optionLabelClassName` | `optionLabelStyle` | `Always` |
| `.select__empty` | `div` | `emptyClassName` | `emptyStyle` | `filtered.length === 0` |

State/variant selectors: `.checkbox--checked`, `.select__field--disabled`,
`.select__field--error`, `.select__field--open`, `.select__label--disabled`,
`.select__label--error`, `.select__option--selected`.

Use the [stylesheet](../../src/components/MultiSelect/MultiSelect.styles.css) for
pseudo-elements and state selectors. For shared field/listbox parts, also inspect the shared
styles linked from the implementation. Consumer content and third-party generated internals
retain their own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<MultiSelect labelClassName="example-multi-select" labelStyle={{ outlineOffset: 4 }} name="roles" label="Roles" options={[{ value: "editor", label: "Editor" }, { value: "viewer", label: "Viewer" }]} defaultValue={["editor"]} />
```

```css
.example-multi-select {
  outline-offset: 4px;
}
.example-multi-select:focus-visible {
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

- [checkbox baseline recipe](../../src/design-systems/neus/generated/recipes/checkbox.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--checkbox-background` | checkbox background | `var(--color-surface)` |
| `--checkbox-border-color` | checkbox border color | `var(--color-primary-dark)` |
| `--checkbox-border-width` | checkbox border width | `2px` |
| `--checkbox-check-color` | checkbox check color | `var(--color-text-on-primary)` |
| `--checkbox-checked-background` | checkbox checked background | `var(--color-primary)` |
| `--checkbox-checked-border-color` | checkbox checked border color | `var(--color-primary)` |
| `--checkbox-checked-shadow` | checkbox checked shadow | `0 4px 12px -4px var(--color-focus-ring)` |
| `--checkbox-label-color` | checkbox label color | `var(--color-text-primary)` |
| `--checkbox-shadow` | checkbox shadow | `none` |
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
| `--checkbox-disabled-background` | checkbox disabled background | `var(--color-surface-disabled)` |
| `--checkbox-disabled-border-color` | checkbox disabled border color | `var(--color-border-subtle)` |
| `--checkbox-disabled-color` | checkbox disabled color | `var(--color-text-disabled)` |
| `--checkbox-focus-color` | checkbox focus color | `var(--color-focus)` |
| `--checkbox-focus-offset` | checkbox focus offset | `2px` |
| `--checkbox-focus-width` | checkbox focus width | `2px` |
| `--checkbox-hover-border-color` | checkbox hover border color | `var(--color-primary)` |
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
| `--checkbox-font-family` | checkbox font family | `var(--font-body)` |
| `--checkbox-label-font-size` | checkbox label font size | `var(--fs-base)` |
| `--checkbox-label-line-height` | checkbox label line height | `20px` |
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

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--checkbox-gap` | checkbox gap | `8px` |
| `--checkbox-icon-size` | checkbox icon size | `12px` |
| `--checkbox-icon-stroke` | checkbox icon stroke | `3` |
| `--checkbox-radius` | checkbox radius | `4px` |
| `--checkbox-size` | checkbox size | `18px` |
| `--checkbox-transition` | checkbox transition | `background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease` |
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

### Shared dependencies and runtime values

`--color-focus`, `--color-surface-hover`, `--color-text-secondary`,
`--popover-anchor-width`, `--popover-left`, `--popover-top`.

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
  --checkbox-gap: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single MultiSelect story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
