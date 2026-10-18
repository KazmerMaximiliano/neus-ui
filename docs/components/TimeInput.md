# TimeInput

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Display field with a Clock popover and serialized time value.

## Usage

```tsx
import { ThemeProvider, TimeInput } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <TimeInput name="time" label="Start time" defaultValue={{ hours: 9, minutes: 30 }} format="24h" />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

The trigger opens Clock; direct text editing is not supported. Presence of value chooses
controlled mode, including undefined. Otherwise defaultValue initializes internal state.
Format defaults to 24h and affects display; the hidden input always serializes a 24-hour
value. Disabled and readonly block opening/changes. Required and error are presented through
field semantics; consumer validation owns acceptance.

PickerField provides the same label, icon, value/placeholder, required, panel and error
hooks as DateInput. The integrated public Clock inherits tokens; its deep parts are
customized through scoped CSS rather than new forwarding props. Popover dismissal restores
focus.

## Props

See [the type source](../../src/components/TimeInput/TimeInput.types.ts) and
[implementation](../../src/components/TimeInput/TimeInput.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `variant` | `"outlined" \| "auto" \| "filled"` | `"auto"` | Shared field variant |
| `labelPlacement` | `"auto" \| "external" \| "floating"` | `"auto"` | Shared field labelPlacement |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Shared field size |
| `placeholderClassName` | `string` | Omitted | Additional classes on `.picker-field__value.picker-field__placeholder` |
| `placeholderStyle` | `CSSProperties` | Omitted | Inline styles on `.picker-field__value.picker-field__placeholder` |
| `className` | `string` | Omitted | Additional classes on `.picker-field.field-presentation` |
| `containerClassName` | `string` | Omitted | Additional classes on `.picker-field__container` |
| `containerStyle` | `CSSProperties` | Omitted | Inline styles on `.picker-field__container` |
| `dropdownClassName` | `string` | Omitted | Additional classes on `.time-input__dropdown` |
| `dropdownStyle` | `CSSProperties` | Omitted | Inline styles on `.time-input__dropdown` |
| `errorClassName` | `string` | Omitted | Additional classes on `.picker-field__error` |
| `fieldClassName` | `string` | Omitted | Additional classes on `.picker-field__field` |
| `iconClassName` | `string` | Omitted | Additional classes on `.picker-field__icon` |
| `iconStyle` | `CSSProperties` | Omitted | Inline styles on `.picker-field__icon` |
| `labelClassName` | `string` | Omitted | Additional classes on `.picker-field__label` |
| `panelClassName` | `string` | Omitted | Additional classes on `.picker-field__popover` |
| `requiredClassName` | `string` | Omitted | Additional classes on `.picker-field__required` |
| `requiredStyle` | `CSSProperties` | Omitted | Inline styles on `.picker-field__required` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.picker-field.field-presentation` |
| `valueClassName` | `string` | Omitted | Additional classes on `.picker-field__value.picker-field__placeholder` |
| `valueStyle` | `CSSProperties` | Omitted | Inline styles on `.picker-field__value.picker-field__placeholder` |
| `panelStyle` | `CSSProperties` | Omitted | Inline styles on `.picker-field__popover` |
| `value` | `TimeValue` | Omitted | The current selected time(s) |
| `defaultValue` | `TimeValue` | Omitted | The initial time(s) value |
| `name` | `string` | Omitted | The name attribute for the input |
| `label` | `string` | Omitted | Label text displayed above the input |
| `placeholder` | `string` | Omitted | Placeholder text for the input |
| `required` | `boolean` | `false` | Whether a time selection is required |
| `error` | `string` | Omitted | Error message to display |
| `description` | `ReactNode` | Omitted | Help text below the field, linked with `aria-describedby` before the error |
| `descriptionClassName` | `string` | Omitted | Additional classes on `.field__description` |
| `descriptionStyle` | `CSSProperties` | Omitted | Inline styles on `.field__description` |
| `disabled` | `boolean` | `false` | Disables the input from user interaction |
| `readonly` | `boolean` | `false` | Makes the input read-only |
| `format` | `"12h" \| "24h"` | `"24h"` | Time display format (12-hour or 24-hour) |
| `fieldStyle` | `CSSProperties` | Omitted | Inline styles on `.picker-field__field` |
| `labelStyle` | `CSSProperties` | Omitted | Inline styles on `.picker-field__label` |
| `errorStyle` | `CSSProperties` | Omitted | Inline styles on `.picker-field__error` |
| `onChange` | `((value: TimeValue \| undefined) => void)` | Omitted | Callback when time selection changes |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.picker-field .field-presentation` | `div` | `className` | `style` | `Always` |
| `.picker-field__label` | `label` | `labelClassName` | `labelStyle` | `label` |
| `.picker-field__required` | `span` | `requiredClassName` | `requiredStyle` | `required` |
| `.picker-field__container` | `div` | `containerClassName` | `containerStyle` | `Always` |
| `.picker-field__field` | `button` | `fieldClassName` | `fieldStyle` | `Always` |
| `.picker-field__value .picker-field__placeholder` | `span` | `valueClassName`, `placeholderClassName` | `valueStyle`, `placeholderStyle` | `Always` |
| `.picker-field__icon` | `Icon` | `iconClassName` | `iconStyle` | `Always` |
| `.picker-field__popover` | `div` | `panelClassName` | `panelStyle` | `Always` |
| `.time-input__dropdown` | `div` | `dropdownClassName` | `dropdownStyle` | `open` |
| `.field__description` | `div` | `descriptionClassName` | `descriptionStyle` | `description` |
| `.picker-field__error` | `div` | `errorClassName` | `errorStyle` | `error` |

State/variant selectors: `.date-input__field--readonly`, `.date-input__label--disabled`,
`.date-input__label--error`, `.picker-field__field--open`, `.time-input__field--readonly`,
`.time-input__label--disabled`, `.time-input__label--error`.

Use the
[stylesheet](../../src/components/DateInput/components/PickerField/PickerField.styles.css)
for pseudo-elements and state selectors. For shared field/listbox parts, also inspect the
shared styles linked from the implementation. Consumer content and third-party generated
internals retain their own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<TimeInput labelClassName="example-time-input" labelStyle={{ outlineOffset: 4 }} name="time" label="Start time" defaultValue={{ hours: 9, minutes: 30 }} format="24h" />
```

```css
.example-time-input {
  outline-offset: 4px;
}
.example-time-input:focus-visible {
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

### Shared dependencies and runtime values

`--field-height`, `--field-label-background`, `--field-label-left`, `--field-label-padding`,
`--field-label-position`, `--field-label-raised-size`, `--field-label-raised-top`,
`--field-label-raised-translate`, `--field-label-size`, `--field-label-top`,
`--field-label-translate`, `--field-placeholder-opacity`, `--popover-left`, `--popover-top`,
`--select-caret-color`, `--select-caret-size`.

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

Related composition: [Clock](./Clock.md).

The single TimeInput story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
