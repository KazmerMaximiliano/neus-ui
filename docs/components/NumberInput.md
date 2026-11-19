# NumberInput

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A field for a number people count or pay: guests, units, a budget. It steps with the
keyboard and two buttons, keeps the number inside its range and precision, and shows it in the
locale's format, with currency, percent or units.

## Usage

```tsx
import { useState } from "react";
import { NumberInput, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  const [budget, setBudget] = useState<number | null>(1200);

  return (
    <ThemeProvider designSystem="neus">
      <NumberInput
        label="Budget"
        name="budget"
        value={budget}
        onChange={setBudget}
        min={0}
        step={50}
        formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
      />
    </ThemeProvider>
  );
};
```

Use NumberInput for quantities and amounts. Codes that only look like numbers (a phone, a
postal code, a card number) stay an [Input](./Input.md); a value picked by dragging along a
range is a slider.

## Behavior and accessibility

The field is an [Input](./Input.md) with `role="spinbutton"`, `inputMode="decimal"`,
`aria-valuenow`, `aria-valuemin`, `aria-valuemax` and `aria-valuetext` (the formatted number,
such as "$1,200"). Its label, description, error, variants and sizes are Input's.

- **Typing.** While the field has focus it shows the plain number without grouping ("1200") so
  it can be edited; on blur or Enter the text is read in `locale`, clamped to `min` and `max`,
  rounded to `precision` and shown formatted again. Empty text clears the value to `null`;
  text that is not a number brings the last value back.
- **Keys.** ↑ and ↓ add or subtract `step`, Page Up and Page Down `largeStep`, Home and End go
  to `min` and `max` when they are set. A `keydown` handler that calls `preventDefault()`
  cancels the step.
- **Steppers.** The minus and plus buttons step the same way. They stay out of the Tab order,
  as in the WAI-ARIA spinbutton pattern, keep the focus in the field, and turn disabled at the
  end of the range.
- **Forms.** With `name`, a hidden input submits the plain number ("1200"), not the formatted
  text.

`value` makes it controlled and `defaultValue` uncontrolled; `onChange` receives the settled
number, or `null`, only when it changes. Formatting uses `Intl.NumberFormat`; `locale`
defaults to `"en-US"` so the server and the browser render the same text.

## Props

See [the type source](../../src/components/NumberInput/NumberInput.types.ts) and
[implementation](../../src/components/NumberInput/NumberInput.tsx) for the exact contract. All
props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `value` | `number \| null` | Omitted | The number (controlled); `null` leaves the field empty |
| `defaultValue` | `number \| null` | `null` | Initial number (uncontrolled) |
| `onChange` | `(value: number \| null) => void` | Omitted | Called with the settled number, or `null` when cleared |
| `min`, `max` | `number` | Omitted | Range the number is clamped to |
| `step` | `number` | `1` | Amount the arrow keys and steppers add |
| `largeStep` | `number` | `step * 10` | Amount Page Up and Page Down add |
| `precision` | `number` | Decimals of `step` | Decimals kept after rounding |
| `locale` | `string` | `"en-US"` | Locale that formats and reads the number |
| `formatOptions` | `Intl.NumberFormatOptions` | Omitted | Currency, percent, unit or fraction digits for the shown number |
| `hideStepper` | `boolean` | `false` | Hides the minus and plus buttons |
| `labels` | `NumberInputLabels` | `{ increment: "Increase", decrement: "Decrease" }` | Accessible names of the steppers, in the project's language |
| `stepperClassName`, `stepperStyle` | `string`, `CSSProperties` | Omitted | `.number-input__stepper` |
| `incrementClassName`, `incrementStyle` | `string`, `CSSProperties` | Omitted | `.number-input__increment` |
| `decrementClassName`, `decrementStyle` | `string`, `CSSProperties` | Omitted | `.number-input__decrement` |
| Input props | [Input](./Input.md#props) | Optional | `label`, `description`, `error`, `placeholder`, `variant`, `labelPlacement`, `size`, `required`, `disabled`, `readonly`, `prefix`, `name`, part hooks and native attributes, except `type`, `min`, `max`, `step`, `role`, `inputMode` and `suffix` |

`className` lands on the Input wrapper, which also carries `.number-input`. The steppers take
the place of Input's `suffix`.

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false. The field's parts are
[Input's](./Input.md#anatomy-and-per-part-customization).

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.number-input` | Input wrapper `div` | `className` | `wrapperStyle` | `Always` |
| `.number-input__stepper` | `span` inside `.input__suffix` | `stepperClassName` | `stepperStyle` | Without `hideStepper` |
| `.number-input__button` | `button`, `tabindex="-1"` | — | — | Without `hideStepper` |
| `.number-input__decrement` | First `.number-input__button` | `decrementClassName` | `decrementStyle` | Without `hideStepper` |
| `.number-input__increment` | Second `.number-input__button` | `incrementClassName` | `incrementStyle` | Without `hideStepper` |

States: a stepper is `:disabled` at the end of the range and while the field is disabled or
read-only. Use the [stylesheet](../../src/components/NumberInput/NumberInput.styles.css) for
the exact declarations.

### Instance styles and classes

```tsx
<NumberInput label="Seats" min={1} incrementClassName="seats-add" />
```

```css
.seats-add:not(:disabled) {
  color: var(--color-primary);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [number-input baseline recipe](../../src/design-systems/neus/generated/recipes/number-input.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--number-input-stepper-gap` | Space between the two buttons | `4px` |
| `--number-input-stepper-inset` | Space between the steppers and the field's end | `var(--input-adornment-gap)` |
| `--number-input-stepper-background` | Fill behind both buttons | `transparent` |
| `--number-input-stepper-radius` | Corners of the stepper pair | `0px` |
| `--number-input-button-size` | Width and height of each button | `28px` |
| `--number-input-button-radius` | Corners of each button | `var(--radius-pill)` |
| `--number-input-button-background` | Button fill | `transparent` |
| `--number-input-button-color` | Icon color | `var(--color-text-secondary)` |
| `--number-input-button-hover-background` | Fill under the pointer | `var(--color-surface-hover)` |
| `--number-input-button-hover-color` | Icon color under the pointer | `var(--color-text-primary)` |
| `--number-input-icon-size` | Minus and plus icon size | `16px` |
| `--number-input-divider-width` | Rule between the buttons | `0px` |
| `--number-input-divider-color` | Color of that rule | `var(--input-border-color)` |
| `--number-input-disabled-color` | Icon color at the end of the range | `var(--color-text-disabled)` |
| `--number-input-transition` | Fill and color transition | `background-color 0.2s ease, color 0.2s ease` |

### Shared dependencies and runtime values

The field draws everything else from the [Input recipe](./Input.md#css-token-reference), so a
NumberInput matches the Inputs of its form. Its right padding grows with the steppers'
width, from these tokens and `--input-adornment-gap` and `--input-adornment-size`.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --number-input-button-size: 32px;
  --number-input-button-background: var(--color-surface-secondary);
}
```

## Storybook and related guides

The single NumberInput story exposes props as controls. Related: [Input](./Input.md),
[FormField](./FormField.md), [FormTemplate](../templates/FormTemplate.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
