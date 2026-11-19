# FormField

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

The label, help text, required mark and error of one control that neus-ui does not draw: a
star rating, a signature pad, a third-party editor or another control of your own. FormField
renders them like the library's field labels and hands the control the ids and states that
connect them.

## Usage

```tsx
import { useState } from "react";
import { Star } from "lucide-react";
import { FormField, IconButton, Stack, ThemeProvider } from "neus-ui";
import type { FormFieldControl } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

const StarRating = ({ disabled, ...control }: FormFieldControl) => {
  const [rating, setRating] = useState(0);

  return (
    <Stack {...control} role="radiogroup" direction="row" gap={1}>
      {[1, 2, 3, 4, 5].map((stars) => (
        <IconButton key={stars} icon={Star} label={stars === 1 ? "1 star" : `${stars} stars`} variant="text" role="radio"
          aria-checked={stars === rating} disabled={disabled} onClick={() => setRating(stars)} />
      ))}
    </Stack>
  );
};

export const Example = () => (
  <ThemeProvider designSystem="neus">
    <FormField label="Rating" description="How was your stay?" required>
      {(control) => <StarRating {...control} />}
    </FormField>
  </ThemeProvider>
);
```

The rating spreads the props on its `radiogroup`, which takes the label, the description and
`aria-required`, and passes `disabled` on to its buttons. Add lucide-react to the project for
the icon, as for [IconButton](./IconButton.md).

Fields that neus-ui draws already have these parts: use the `label`, `description`, `error` and
`required` props of [Input](./Input.md), [NumberInput](./NumberInput.md),
[Textarea](./Textarea.md) for plain text, [Select](./Select.md),
[FileUploader](./FileUploader.md) for files and the other fields instead. To caption several
controls together, use [Fieldset](./Fieldset.md).

## Behavior and accessibility

`children` is a function that receives the props for the control; spread them on the element
that holds the value:

| Prop handed to the control | Value |
| --- | --- |
| `id` | The `id` prop, or a generated one |
| `aria-labelledby` | The label's id, so controls that are not labelable (a `div` with a role) are named too |
| `aria-describedby` | The description, then the error, when present |
| `aria-invalid` | `true` while `error` is set |
| `aria-required` | `true` with `required` |
| `disabled` | `true` with `disabled`; a composite control passes it to its own buttons |

The label is a `<label for>` pointing to the control, so a click on it focuses a native
control. The required asterisk is hidden from screen readers; `aria-required` carries the
state. Validation and submission stay with the application: pass the message through `error`.

## Props

See [the type source](../../src/components/FormField/FormField.types.ts) and
[implementation](../../src/components/FormField/FormField.tsx) for the exact contract. All
props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `label` | `ReactNode` | Required | Label that names the control |
| `children` | `(control: FormFieldControl) => ReactNode` | Required | Renders the control with the props it receives |
| `description` | `ReactNode` | Omitted | Help text under the label |
| `error` | `ReactNode` | Omitted | Error message after the control; marks it invalid |
| `required` | `boolean` | `false` | Shows the asterisk and sets `aria-required` |
| `disabled` | `boolean` | `false` | Passes `disabled` and dims the label |
| `id` | `string` | Generated | The control's id |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.form-field` |
| `labelClassName`, `labelStyle` | `string`, `CSSProperties` | Omitted | `.form-field__label` |
| `requiredClassName`, `requiredStyle` | `string`, `CSSProperties` | Omitted | `.form-field__required` |
| `descriptionClassName`, `descriptionStyle` | `string`, `CSSProperties` | Omitted | `.field__description` |
| `errorClassName`, `errorStyle` | `string`, `CSSProperties` | Omitted | `.form-field__error` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.form-field` | `div` | `className` | `style` | `Always` |
| `.form-field__label` | `label` | `labelClassName` | `labelStyle` | `Always` |
| `.form-field__required` | `span`, `aria-hidden` | `requiredClassName` | `requiredStyle` | `required` |
| `.field__description` | `div` | `descriptionClassName` | `descriptionStyle` | `description` |
| `.form-field__error` | `div` | `errorClassName` | `errorStyle` | `error` |

States: `.form-field--invalid` and `.form-field--disabled` color the label. Use the
[stylesheet](../../src/components/FormField/FormField.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<FormField label="Signature" labelClassName="signature-label">
  {(control) => <SignaturePad {...control} />}
</FormField>
```

```css
.signature-label {
  font-size: var(--fs-base);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files. FormField and [Fieldset](./Fieldset.md) share the
`form-field` recipe.

- [form-field baseline recipe](../../src/design-systems/neus/generated/recipes/form-field.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--form-field-font-family` | Font of the label, help text and error | `var(--input-font-family)` |
| `--form-field-gap` | Space between the label, the description, the control and the error | `var(--input-gap)` |
| `--form-field-label-color` | Label color | `var(--input-label-color)` |
| `--form-field-label-font-size` | Label size | `var(--input-label-font-size)` |
| `--form-field-label-weight` | Label weight | `var(--input-label-weight)` |
| `--form-field-required-color` | Asterisk color | `var(--input-required-color)` |
| `--form-field-required-gap` | Space before the asterisk | `var(--input-required-gap)` |
| `--form-field-error-color` | Error message, and label while invalid | `var(--input-error-color)` |
| `--form-field-error-font-size` | Error message size | `var(--input-error-font-size)` |
| `--form-field-disabled-color` | Label while disabled | `var(--input-disabled-color)` |

### Shared dependencies and runtime values

Every token follows the field tokens of the [Input recipe](./Input.md), so the five sibling
systems declare no values of their own. The description uses `--input-description-color` and
`--input-description-font-size`.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --form-field-gap: var(--space-3);
}
```

## Storybook and related guides

The single FormField story exposes props as controls. Related: [Fieldset](./Fieldset.md),
[Input](./Input.md), [FileUploader](./FileUploader.md),
[FormTemplate](../templates/FormTemplate.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
