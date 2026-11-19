# Radio

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A native radio with a label and optional help text. It works on its own, and
[RadioGroup](./RadioGroup.md) uses it for each option.

## Usage

Inside a RadioGroup, a radio only needs a `value` and a `label`; the group supplies the rest:

```tsx
import { ThemeProvider, Radio, RadioGroup } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => (
  <ThemeProvider designSystem="neus">
    <RadioGroup label="Plan" name="plan" defaultValue="monthly">
      <Radio value="monthly" label="Monthly" />
      <Radio value="yearly" label="Yearly" description="Two months free." />
      <Radio value="lifetime" label="Lifetime" disabled />
    </RadioGroup>
  </ThemeProvider>
);
```

On its own, radios that share a `name` form one choice, for layouts a RadioGroup does not
draw, such as one radio per plan card. Name the choice yourself, with a `<fieldset>` and
`<legend>` or `aria-labelledby` on a container with `role="radiogroup"`:

```tsx
<fieldset>
  <legend>Plan</legend>
  <Card><Radio name="plan" value="monthly" label="Monthly" checked={plan === "monthly"} onChange={setPlan} /></Card>
  <Card><Radio name="plan" value="yearly" label="Yearly" checked={plan === "yearly"} onChange={setPlan} /></Card>
</fieldset>
```

## Behavior and accessibility

Radio is a native `<input type="radio">` inside a `<label>`. Clicking the label or the circle
chooses it, and the arrow keys move the choice between radios with the same `name`. `checked`
makes it controlled and `defaultChecked` uncontrolled; `onChange` receives the radio's
`value` when it becomes the chosen one. In a form it submits its `value` under `name` while
chosen, without JavaScript.

The circle lines up with the first line of the label, its center half an x-height above the baseline (as `vertical-align: middle` defines it), so it stays centered on lowercase text in every system's font.

Inside a [RadioGroup](./RadioGroup.md), the group supplies the `name`, whether it is chosen
(from the group's `value` or `defaultValue`), `required` and `aria-invalid`, and calls the
group's `onChange` after the radio's own. A prop set on the radio wins over the group's.

The label names the radio; the description is linked through `aria-describedby`, after any
id the caller passes, and is kept out of the name. Without a visible label, pass
`aria-label` or `aria-labelledby`. Native attributes and the ref reach the `<input>`; the
type is the radio's own. `aria-invalid` colors the circle while it is not chosen. A disabled
radio that is chosen keeps its dot in the disabled color. The circle is decorative
(`aria-hidden`). Under `prefers-reduced-motion: reduce` the dot appears without growing.

## Props

See [the type source](../../src/components/Radio/Radio.types.ts) and
[implementation](../../src/components/Radio/Radio.tsx) for the exact contract. All props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `value` | `string` | Required | Value it reports and submits when chosen |
| `label` | `string` | Omitted | Visible label that names the radio |
| `description` | `ReactNode` | Omitted | Help text under the label, linked with `aria-describedby`; phrasing content, since it sits inside the label |
| `checked` | `boolean` | From the group | Whether it is the chosen radio (controlled) |
| `defaultChecked` | `boolean` | From the group | Initial state (uncontrolled) |
| `onChange` | `(value: string) => void` | Omitted | Called with its value when it becomes the chosen one |
| `disabled` | `boolean` | Omitted | Disables this radio |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.radio` |
| `circleClassName`, `circleStyle` | `string`, `CSSProperties` | Omitted | `.radio__circle` |
| `dotClassName`, `dotStyle` | `string`, `CSSProperties` | Omitted | `.radio__dot` |
| `labelClassName`, `labelStyle` | `string`, `CSSProperties` | Omitted | `.radio__label` |
| `descriptionClassName`, `descriptionStyle` | `string`, `CSSProperties` | Omitted | `.field__description` |
| Native attributes and ref | React props for an `input` | Optional | Forwarded to the `<input>` (`name`, `required`, `form`, `id`, `onBlur`, `aria-*`, `data-*`…), except `type` and `children`; inside a RadioGroup, `name` and `required` default to the group's |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.radio` | `label` | `className` | `style` | `Always` |
| `.radio__input` | `input`, visually hidden | — | — | `Always` |
| `.radio__circle` | `span`, `aria-hidden` | `circleClassName` | `circleStyle` | `Always` |
| `.radio__dot` | `span` inside the circle | `dotClassName` | `dotStyle` | `Always` |
| `.radio__label` | `span` | `labelClassName` | `labelStyle` | `label` |
| `.field__description` | `span` | `descriptionClassName` | `descriptionStyle` | `description` |

States come from the native input: `.radio__input:checked + .radio__circle`,
`.radio__input[aria-invalid="true"] + .radio__circle`, `.radio__input:focus-visible + .radio__circle`, `.radio__input:disabled + .radio__circle` and
`.radio:has(.radio__input:disabled)`. Use the
[stylesheet](../../src/components/Radio/Radio.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Radio value="yearly" label="Yearly" labelClassName="plan-label" />
```

```css
.plan-label {
  font-weight: 600;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files. Most radio tokens default to the
[Checkbox](./Checkbox.md) token of the same role, so a radio matches the checkboxes of its
system; set a `--radio-*` token to change radios alone.

- [radio baseline recipe](../../src/design-systems/neus/generated/recipes/radio.css)

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--radio-size` | Circle diameter | `var(--checkbox-size)` (18px) |
| `--radio-border-width` | Circle border | `var(--checkbox-border-width)` (2px) |
| `--radio-dot-size` | Dot diameter when chosen | `8px` |
| `--radio-gap` | Space between the circle and the label | `var(--checkbox-gap)` (8px) |
| `--radio-text-gap` | Space between the label and the description | `2px` |

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--radio-background` | Circle fill | `var(--checkbox-background)` |
| `--radio-border-color` | Circle border | `var(--checkbox-border-color)` |
| `--radio-shadow` | Circle shadow | `var(--checkbox-shadow)` |
| `--radio-checked-background` | Circle fill when chosen | `var(--checkbox-checked-background)` |
| `--radio-checked-border-color` | Circle border when chosen | `var(--checkbox-checked-border-color)` |
| `--radio-checked-shadow` | Circle shadow when chosen | `var(--checkbox-checked-shadow)` |
| `--radio-dot-color` | Dot color | `var(--checkbox-check-color)` |

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--radio-hover-border-color` | Circle border on hover while not chosen | `var(--checkbox-hover-border-color)` |
| `--radio-focus-width` | Keyboard focus outline width | `var(--checkbox-focus-width)` |
| `--radio-focus-color` | Keyboard focus outline color | `var(--checkbox-focus-color)` |
| `--radio-focus-offset` | Keyboard focus outline offset | `var(--checkbox-focus-offset)` |
| `--radio-error-border-color` | Circle border while invalid and not chosen | `var(--input-error-border-color)` |
| `--radio-disabled-background` | Circle fill while disabled | `var(--checkbox-disabled-background)` |
| `--radio-disabled-border-color` | Circle border while disabled | `var(--checkbox-disabled-border-color)` |
| `--radio-disabled-color` | Dot and label while disabled | `var(--checkbox-disabled-color)` |

### Typography and motion

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--radio-font-family` | Label and legend font | `var(--checkbox-font-family)` |
| `--radio-label-color` | Label color | `var(--checkbox-label-color)` |
| `--radio-label-font-size` | Label size | `var(--checkbox-label-font-size)` |
| `--radio-label-line-height` | Label line height | `var(--checkbox-label-line-height)` |
| `--radio-transition` | Circle color change | `var(--checkbox-transition)` |
| `--radio-dot-transition` | Dot growth | `scale 0.2s ease` |

### Shared dependencies and runtime values

The description uses the field description tokens of the [Input recipe](./Input.md)
(`--input-description-color`, `--input-description-font-size`).

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --radio-checked-background: var(--radio-background);
  --radio-dot-color: var(--color-primary);
}
```

## Storybook and related guides

The single Radio story exposes props as controls. Related: [RadioGroup](./RadioGroup.md),
[Checkbox](./Checkbox.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
