# RadioGroup

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

One choice among a few options that all stay visible: a `<fieldset>` with a legend around
[Radio](./Radio.md) components, which it gives a shared name, the choice and the group's
required and invalid states.

## Usage

```tsx
import { useState } from "react";
import { ThemeProvider, Radio, RadioGroup } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  const [delivery, setDelivery] = useState("standard");

  return (
    <ThemeProvider designSystem="neus">
      <RadioGroup label="Delivery" name="delivery" value={delivery} onChange={setDelivery}>
        <Radio value="standard" label="Standard" description="Three to five business days." />
        <Radio value="express" label="Express" description="Next business day." />
        <Radio value="pickup" label="Store pickup" />
      </RadioGroup>
    </ThemeProvider>
  );
};
```

Use RadioGroup for two to five options that should be compared side by side, with one always
chosen or none until the user decides. Use [Select](./Select.md) for longer lists,
[Checkbox](./Checkbox.md) when several can be chosen, and [Switch](./Switch.md) for a single
on/off setting.

## Behavior and accessibility

RadioGroup renders a [Fieldset](./Fieldset.md) with `role="radiogroup"`, whose `<legend>` names it. The Radio
components inside it share one `name` (the `name` prop, or a generated one), so the browser gives them radio-group
keyboard behavior: Tab enters the group at the chosen radio, the arrow keys move the choice and
Tab leaves the group. `value` makes it controlled (`null` keeps nothing chosen) and
`defaultValue` uncontrolled; `onChange` receives the value of the chosen radio. In a form the
chosen value is submitted under `name`, without JavaScript.

`required` sets `aria-required` on the group, `required` on every radio so the browser blocks
an empty submission, and a hidden asterisk on the legend. `error` sets `aria-invalid` on the
group and its radios, shows the message after the options and colors the legend; each Radio
colors its own circle while not chosen. A prop set on a Radio wins over the group's. The description
and the error are linked to the group through `aria-describedby`, after any id the caller
passes. `disabled` uses the fieldset's native `disabled`, which disables every radio. Without
a visible label, pass `aria-label` or `aria-labelledby`. Native fieldset attributes and the ref
reach the `<fieldset>`; the role is the group's own.

The options stack by default; `orientation="horizontal"` lays them in a row that wraps.

## Props

See [the type source](../../src/components/RadioGroup/RadioGroup.types.ts) and
[implementation](../../src/components/RadioGroup/RadioGroup.tsx) for the exact contract. All
props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `children` | `ReactNode` | Required | [Radio](./Radio.md) elements |
| `label` | `string` | Omitted | Legend that names the group |
| `description` | `ReactNode` | Omitted | Help text under the legend, linked with `aria-describedby` |
| `error` | `string` | Omitted | Error message after the options; marks the group invalid |
| `name` | `string` | Generated | Name its radios submit with a form |
| `value` | `string \| null` | Omitted | Chosen value (controlled); `null` chooses nothing |
| `defaultValue` | `string` | Omitted | Initial value (uncontrolled) |
| `onChange` | `(value: string) => void` | Omitted | Called with the value of the chosen radio |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | Stacks the radios or lays them in a wrapping row |
| `required` | `boolean` | `false` | Requires a choice before the form submits |
| `disabled` | `boolean` | `false` | Disables every radio |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.radio-group` |
| `labelClassName`, `labelStyle` | `string`, `CSSProperties` | Omitted | `.radio-group__label` |
| `requiredClassName`, `requiredStyle` | `string`, `CSSProperties` | Omitted | `.radio-group__required` |
| `descriptionClassName`, `descriptionStyle` | `string`, `CSSProperties` | Omitted | `.field__description` |
| `optionsClassName`, `optionsStyle` | `string`, `CSSProperties` | Omitted | `.radio-group__options` |
| `errorClassName`, `errorStyle` | `string`, `CSSProperties` | Omitted | `.radio-group__error` |
| Native attributes and ref | React props for a `fieldset` | Optional | Forwarded to the `<fieldset>` (`id`, `aria-*`, `data-*`…), except `role` and `form` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.radio-group` | `fieldset` | `className` | `style` | `Always` |
| `.radio-group__label` | `legend` | `labelClassName` | `labelStyle` | `label` |
| `.radio-group__required` | `span`, `aria-hidden` | `requiredClassName` | `requiredStyle` | `label` and `required` |
| `.field__description` | `div` | `descriptionClassName` | `descriptionStyle` | `description` |
| `.radio-group__options` | `div` | `optionsClassName` | `optionsStyle` | `Always` |
| `.radio-group__error` | `div` | `errorClassName` | `errorStyle` | `error` |

Each part also carries the matching [Fieldset](./Fieldset.md) class (`.fieldset`,
`.fieldset__label`, `.fieldset__content`…); target the `radio-group` classes above.

States: `.radio-group[data-orientation="horizontal"]`, `.radio-group[aria-invalid="true"]` and
`.radio-group:disabled`. Use the
[stylesheet](../../src/components/RadioGroup/RadioGroup.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<RadioGroup label="Plan" optionsClassName="plan-options">
  <Radio value="monthly" label="Monthly" />
  <Radio value="yearly" label="Yearly" />
</RadioGroup>
```

```css
.plan-options {
  padding: var(--space-4);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files. The group tokens belong to the `radio` recipe, with the
[Radio](./Radio.md) tokens that draw each option.

- [radio baseline recipe](../../src/design-systems/neus/generated/recipes/radio.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--radio-group-gap` | Space between stacked radios | `12px` |
| `--radio-group-inline-gap` | Space between radios in a row | `24px` |
| `--radio-group-text-gap` | Space between the description, the options and the error | `4px` |
| `--radio-group-label-gap` | Space under the legend | `8px` |
| `--radio-group-label-color` | Legend color | `var(--input-label-color)` |
| `--radio-group-label-font-size` | Legend size | `var(--input-label-font-size)` |
| `--radio-group-label-weight` | Legend weight | `var(--input-label-weight)` |
| `--radio-group-required-color` | Asterisk color | `var(--input-required-color)` |
| `--radio-group-required-gap` | Space before the asterisk | `var(--input-required-gap)` |
| `--radio-group-error-color` | Error message, and legend while invalid | `var(--input-error-color)` |
| `--radio-group-error-font-size` | Error message size | `var(--input-error-font-size)` |
| `--radio-group-disabled-color` | Legend while disabled | `var(--input-disabled-color)` |

RadioGroup sets the Fieldset's `--fieldset-*` and `--form-field-*` tokens from the ones
above, so they keep driving its legend, required mark, gaps and error.

### Shared dependencies and runtime values

The legend, the required mark, the error and the description follow the field tokens of the
[Input recipe](./Input.md), so a group reads like the fields around it. The description uses
`--input-description-color` and `--input-description-font-size`.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --radio-group-gap: var(--space-2);
  --radio-group-inline-gap: var(--space-8);
}
```

## Storybook and related guides

The single RadioGroup story exposes props as controls. Related: [Radio](./Radio.md), [Checkbox](./Checkbox.md), [Select](./Select.md),
[FormTemplate](../templates/FormTemplate.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
