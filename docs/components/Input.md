# Input

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Native input with field presentation, adornments and accessible errors.

## Usage

```tsx
import { ThemeProvider, Input } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Input name="email" label="Email" type="email" required prefix="@" />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

Supports text, password, email, number, color, tel and url. Native value/defaultValue choose
controlled/uncontrolled usage; avoid switching mode during an input lifetime. `onChange`
always receives a string, including numeric values and the empty string. `readonly` maps to
native readOnly. Native min/max/step/required retain browser behavior; `error` is supplied
by the consumer.

A generated or supplied id associates the label. Nonempty errors set aria-invalid;
`description` and the error are linked through aria-describedby, after any id the caller
passes. Native attributes such as `autoComplete`, `inputMode` and `spellCheck` reach the
`<input>`; Input's own wiring (id, label, state and value handling) takes precedence. Required markers and the error icon are decorative. Supply a label or
aria-label. Prefix and suffix render when non-null. Error icons render only with an error
and can be suppressed with `errorIcon={null}`. Field presentation uses variant, size and
labelPlacement data attributes. `wrapperStyle` targets the root; `inputStyle` targets the
native field.

## Props

See [the type source](../../src/components/Input/Input.types.ts) and
[implementation](../../src/components/Input/Input.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `variant` | `"outlined" \| "auto" \| "filled"` | `"auto"` | Field surface |
| `labelPlacement` | `"auto" \| "external" \| "floating"` | `"auto"` | Label presentation |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Field size |
| `className` | `string` | Omitted | Additional classes on `.input__wrapper.field-presentation` |
| `controlClassName` | `string` | Omitted | Additional classes on `.input__control` |
| `controlStyle` | `CSSProperties` | Omitted | Inline styles on `.input__control` |
| `errorClassName` | `string` | Omitted | Additional classes on `.input__error-message` |
| `errorIconClassName` | `string` | Omitted | Additional classes on `.input__error-icon` |
| `inputClassName` | `string` | Omitted | Additional classes on `.input` |
| `labelClassName` | `string` | Omitted | Additional classes on `.input__label` |
| `prefixClassName` | `string` | Omitted | Additional classes on `.input__prefix` |
| `requiredClassName` | `string` | Omitted | Additional classes on `.input__required` |
| `suffixClassName` | `string` | Omitted | Additional classes on `.input__suffix` |
| `prefix` | `ReactNode` | Omitted | Content for prefix; JSX supported in application code |
| `suffix` | `ReactNode` | Omitted | Content for suffix; JSX supported in application code |
| `errorIcon` | `ReactNode` | Omitted | Content for errorIcon; JSX supported in application code |
| `prefixStyle` | `CSSProperties` | Omitted | Inline styles on `.input__prefix` |
| `suffixStyle` | `CSSProperties` | Omitted | Inline styles on `.input__suffix` |
| `errorIconStyle` | `CSSProperties` | Omitted | Inline styles on `.input__error-icon` |
| `id` | `string` | Omitted | Field ID; generated when omitted |
| `aria-label` | `string` | Omitted | aria label |
| `name` | `string` | Omitted | The name attribute for the input element |
| `value` | `string \| number` | Omitted | The current value for the input |
| `defaultValue` | `string \| number` | Omitted | The default value for the input (for uncontrolled usage) |
| `placeholder` | `string` | Omitted | Placeholder text for the input |
| `label` | `string` | Omitted | Label text for the input |
| `error` | `string` | Omitted | Error message to display |
| `description` | `ReactNode` | Omitted | Help text below the field, linked with `aria-describedby` before the error |
| `descriptionClassName` | `string` | Omitted | Additional classes on `.field__description` |
| `descriptionStyle` | `CSSProperties` | Omitted | Inline styles on `.field__description` |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `readonly` | `boolean` | `false` | Whether the input is read-only |
| `required` | `boolean` | `false` | Whether the input is required (shows red asterisk) |
| `type` | `"number" \| "text" \| "color" \| "password" \| "email" \| "tel" \| "url"` | `"text"` | The type of input field |
| `min` | `string \| number` | Omitted | The minimum value (for number inputs) |
| `max` | `string \| number` | Omitted | The maximum value (for number inputs) |
| `step` | `string \| number` | Omitted | The step increment (for number inputs) |
| `wrapperStyle` | `CSSProperties` | Omitted | Inline styles on `.input__wrapper.field-presentation` |
| `inputStyle` | `CSSProperties` | Omitted | Inline styles on `.input` |
| `labelStyle` | `CSSProperties` | Omitted | Inline styles on `.input__label` |
| `requiredStyle` | `CSSProperties` | Omitted | Inline styles on `.input__required` |
| `errorStyle` | `CSSProperties` | Omitted | Inline styles on `.input__error-message` |
| `onChange` | `((value: string) => void)` | Omitted | Callback function triggered when input value changes |
| Native attributes | `InputHTMLAttributes<HTMLInputElement>` | Optional | Forwarded to the native `<input>` (`autoComplete`, `inputMode`, `spellCheck`, `pattern`, `maxLength`, `onBlur`, `aria-*`, `data-*`…), except `size`, `prefix`, `type`, `value`, `defaultValue`, `onChange`, `readOnly` and `style`, which Input replaces |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.input__wrapper .field-presentation` | `div` | `className` | `wrapperStyle` | `Always` |
| `.input__label` | `label` | `labelClassName` | `labelStyle` | `label` |
| `.input__required` | `span` | `requiredClassName` | `requiredStyle` | `required` |
| `.input__control` | `div` | `controlClassName` | `controlStyle` | `Always` |
| `.input__prefix` | `span` | `prefixClassName` | `prefixStyle` | `prefix != null` |
| `.input` | `input` | `inputClassName` | `inputStyle` | `Always` |
| `.input__suffix` | `span` | `suffixClassName` | `suffixStyle` | `suffix != null` |
| `.input__error-icon` | `span` | `errorIconClassName` | `errorIconStyle` | `error && errorIcon !== null` |
| `.field__description` | `div` | `descriptionClassName` | `descriptionStyle` | `description` |
| `.input__error-message` | `div` | `errorClassName` | `errorStyle` | `error` |

State/variant selectors: `.input--color`, `.input--disabled`, `.input--error`,
`.input--number`, `.input__label--disabled`, `.input__label--error`,
`.picker-field__field--open`.

Use the [stylesheet](../../src/components/Input/Input.styles.css) for pseudo-elements and
state selectors. For shared field/listbox parts, also inspect the shared styles linked from
the implementation. Consumer content and third-party generated internals retain their own
customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<Input labelClassName="example-input" labelStyle={{ outlineOffset: 4 }} name="email" label="Email" type="email" required prefix="@" />
```

```css
.example-input {
  outline-offset: 4px;
}
.example-input:focus-visible {
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
| `--input-description-color` | input description color | `var(--color-text-secondary)` |
| `--input-description-font-size` | input description font size | `var(--input-error-font-size)` |
| `--input-error-offset` | input error offset | `1em` |
| `--input-error-shadow` | input error shadow | `var(--input-shadow)` |
| `--input-focus-border-color` | input focus border color | `var(--color-info-300)` |
| `--input-focus-shadow` | input focus shadow | `0 0 0 3px var(--color-focus-ring)` |
| `--input-hover-border-color` | input hover border color | `var(--color-border-input-hover)` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--input-font-family` | input font family | `var(--font-body)` |
| `--input-font-size` | input font size | `13.333333px` |
| `--input-font-weight` | input font weight | `400` |
| `--input-label-font-size` | input label font size | `0.9em` |
| `--input-label-weight` | input label weight | `500` |
| `--input-line-height` | input line height | `normal` |

### Shared dependencies and runtime values

`--field-height`, `--field-label-background`, `--field-label-left`, `--field-label-padding`,
`--field-label-position`, `--field-label-raised-size`, `--field-label-raised-top`,
`--field-label-raised-translate`, `--field-label-size`, `--field-label-top`,
`--field-label-translate`, `--field-placeholder-opacity`.

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

The single Input story exposes props as controls. Design selection is preview configuration;
applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
