# Fieldset

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Several controls under one caption: a native `<fieldset>` with its legend, help text, required
mark and error, such as an address or the channels for notifications.

## Usage

```tsx
import { Fieldset, Input, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => (
  <ThemeProvider designSystem="neus">
    <Fieldset label="Shipping address" description="Where we send the order." required>
      <Input name="street" label="Street" required />
      <Input name="city" label="City" required />
    </Fieldset>
  </ThemeProvider>
);
```

Radios use [RadioGroup](./RadioGroup.md), which is a Fieldset with the radio-group behavior.
For one control that neus-ui does not draw, use [FormField](./FormField.md).

## Behavior and accessibility

The `<legend>` names the group, so screen readers announce it before the first control.
Without a visible caption, pass `aria-label` or `aria-labelledby`. The description and the
error are linked to the fieldset through `aria-describedby`, after any id the caller passes.
`disabled` uses the fieldset's native `disabled`: every control inside is disabled and none is
submitted. `required` only shows the hidden asterisk on the legend; set `required` on the
controls that need a value. Native fieldset attributes (`name`, `form`, `role`, `aria-*`…) and
the ref reach the `<fieldset>`.

The controls stack with the gap of a related group; lay them out differently with a
[Stack](./Stack.md) or [Grid](./Grid.md) inside, or with `contentClassName`.

## Props

See [the type source](../../src/components/Fieldset/Fieldset.types.ts) and
[implementation](../../src/components/Fieldset/Fieldset.tsx) for the exact contract. All props
are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `children` | `ReactNode` | Required | The controls in the group |
| `label` | `ReactNode` | Omitted | Legend that names the group |
| `description` | `ReactNode` | Omitted | Help text under the legend |
| `error` | `ReactNode` | Omitted | Error message after the controls; colors the legend |
| `required` | `boolean` | `false` | Shows the hidden asterisk on the legend |
| `disabled` | `boolean` | `false` | Disables every control inside |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.fieldset` |
| `labelClassName`, `labelStyle` | `string`, `CSSProperties` | Omitted | `.fieldset__label` |
| `requiredClassName`, `requiredStyle` | `string`, `CSSProperties` | Omitted | `.fieldset__required` |
| `descriptionClassName`, `descriptionStyle` | `string`, `CSSProperties` | Omitted | `.field__description` |
| `contentClassName`, `contentStyle` | `string`, `CSSProperties` | Omitted | `.fieldset__content` |
| `errorClassName`, `errorStyle` | `string`, `CSSProperties` | Omitted | `.fieldset__error` |
| Native attributes and ref | React props for a `fieldset` | Optional | Forwarded to the `<fieldset>` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.fieldset` | `fieldset` | `className` | `style` | `Always` |
| `.fieldset__label` | `legend` | `labelClassName` | `labelStyle` | `label` |
| `.fieldset__required` | `span`, `aria-hidden` | `requiredClassName` | `requiredStyle` | `label` and `required` |
| `.field__description` | `div` | `descriptionClassName` | `descriptionStyle` | `description` |
| `.fieldset__content` | `div` | `contentClassName` | `contentStyle` | `Always` |
| `.fieldset__error` | `div` | `errorClassName` | `errorStyle` | `error` |

States: `.fieldset--invalid` and `.fieldset:disabled` color the legend. Use the
[stylesheet](../../src/components/Fieldset/Fieldset.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Fieldset label="Size" contentClassName="size-options">
  <Switch label="Small" />
  <Switch label="Large" />
</Fieldset>
```

```css
.size-options {
  flex-direction: row;
  flex-wrap: wrap;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files. Fieldset shares the `form-field` recipe with
[FormField](./FormField.md): the legend, the required mark and the error use its
`--form-field-*` tokens.

- [form-field baseline recipe](../../src/design-systems/neus/generated/recipes/form-field.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--fieldset-gap` | Space between the legend block, the description, the controls and the error | `4px` |
| `--fieldset-label-gap` | Space under the legend | `8px` |
| `--fieldset-content-gap` | Space between the controls | `16px` |
| `--form-field-font-family` | Font of the legend, help text and error | `var(--input-font-family)` |
| `--form-field-label-color` | Legend color | `var(--input-label-color)` |
| `--form-field-label-font-size` | Legend size | `var(--input-label-font-size)` |
| `--form-field-label-weight` | Legend weight | `var(--input-label-weight)` |
| `--form-field-required-color` | Asterisk color | `var(--input-required-color)` |
| `--form-field-required-gap` | Space before the asterisk | `var(--input-required-gap)` |
| `--form-field-error-color` | Error message, and legend while invalid | `var(--input-error-color)` |
| `--form-field-error-font-size` | Error message size | `var(--input-error-font-size)` |
| `--form-field-disabled-color` | Legend while disabled | `var(--input-disabled-color)` |

### Shared dependencies and runtime values

The legend and error follow the field tokens of the [Input recipe](./Input.md), so a group
reads like the fields inside it. The description uses `--input-description-color` and
`--input-description-font-size`. [RadioGroup](./RadioGroup.md) sets these tokens from its own
`--radio-group-*` ones.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --fieldset-content-gap: var(--space-6);
}
```

## Storybook and related guides

The single Fieldset story exposes props as controls. Related: [FormField](./FormField.md),
[RadioGroup](./RadioGroup.md), [Switch](./Switch.md), [FormTemplate](../templates/FormTemplate.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
