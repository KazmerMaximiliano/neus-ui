# Slider

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A value picked by dragging along a track: a volume, a number of rooms, a budget. With `range`,
two thumbs pick both ends of a range, such as a price filter.

## Usage

```tsx
import { useState } from "react";
import { Slider, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  const [price, setPrice] = useState<[number, number]>([200, 800]);

  return (
    <ThemeProvider designSystem="neus">
      <Slider label="Rooms" name="rooms" min={1} max={8} defaultValue={3} />
      <Slider
        label="Price per night"
        range
        value={price}
        onChange={setPrice}
        max={1000}
        step={10}
        formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
        labels={{ minimum: "Minimum price", maximum: "Maximum price" }}
      />
    </ThemeProvider>
  );
};
```

Use a slider when the exact number matters less than its place in a range. When people type
an exact quantity or amount, use [NumberInput](./NumberInput.md); a choice among a few named
options is a [RadioGroup](./RadioGroup.md) or a [ToggleGroup](./ToggleGroup.md).

## Behavior and accessibility

Each thumb is a native `<input type="range">`: the arrow keys step it by `step`, Page Up and
Page Down by a larger amount, Home and End go to `min` and `max`, and screen readers announce
it as a slider with `aria-valuetext`, the value formatted with `locale` and `formatOptions`
(such as "$400"). The label names the input, and the description and error describe it;
`error` also sets `aria-invalid`.

- **Range.** The two inputs sit in a `role="group"` named by the label, each named by `labels`
  (`"Minimum"` and `"Maximum"` by default, in English). A thumb stops where the other one is,
  so the lower value never passes the upper one. Only the thumbs take the pointer: a press on
  the track between them does nothing.
- **Value.** `showValue` writes the formatted value, or "low – high" for a range, at the end of
  the label row. It is hidden from screen readers, which read each input's own value.
- **Steps.** `showSteps` marks every reachable value on the track: inside the value the marks
  take the active color. Use it for a few steps; above 100 marks none are drawn. The marks are
  decorative; the input announces the value.
- **Pointer.** Hover, press and focus styles belong to the thumb: moving the pointer along the
  track changes nothing until it is over a thumb.
- **Forms.** With `name`, the input submits the plain number; a range submits both numbers
  under the same name (`formData.getAll(name)`).

`value` makes it controlled and `defaultValue` uncontrolled; without either, a slider starts
at `min` and a range covers `min` to `max`. `onChange` receives the number, or the pair
`[low, high]` with `range`. Values outside `min` and `max` are clamped. `locale` defaults to
`"en-US"` so the server and the browser render the same text.

## Props

See [the type source](../../src/components/Slider/Slider.types.ts) and
[implementation](../../src/components/Slider/Slider.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `label` | `ReactNode` | Required | Label that names the slider, or the group of a range |
| `range` | `boolean` | `false` | Two thumbs for the ends of a range; changes the type of `value` |
| `value` | `number`, or `readonly [number, number]` with `range` | Omitted | The value (controlled) |
| `defaultValue` | `number`, or `readonly [number, number]` with `range` | `min`, or `[min, max]` | Initial value (uncontrolled) |
| `onChange` | `(value: number) => void`, or `(value: [number, number]) => void` with `range` | Omitted | Called with the new value |
| `min`, `max` | `number` | `0`, `100` | Ends of the track |
| `step` | `number` | `1` | Distance between values |
| `description` | `ReactNode` | Omitted | Help text under the label row |
| `error` | `ReactNode` | Omitted | Error message under the track; marks the slider invalid |
| `disabled` | `boolean` | `false` | Disables every thumb |
| `name` | `string` | Omitted | Name submitted with the value, or both values of a range |
| `showValue` | `boolean` | `true` | Shows the formatted value at the end of the label row |
| `showSteps` | `boolean` | `false` | Marks every step on the track (up to 100) |
| `locale` | `string` | `"en-US"` | Locale that formats the value |
| `formatOptions` | `Intl.NumberFormatOptions` | Omitted | Currency, percent, unit or fraction digits for the value |
| `labels` | `SliderLabels` | `{ minimum: "Minimum", maximum: "Maximum" }` | Names of the two thumbs of a range, in the project's language |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.slider` |
| `labelClassName`, `labelStyle` | `string`, `CSSProperties` | Omitted | `.slider__label` |
| `valueClassName`, `valueStyle` | `string`, `CSSProperties` | Omitted | `.slider__value` |
| `descriptionClassName`, `descriptionStyle` | `string`, `CSSProperties` | Omitted | `.field__description` |
| `controlClassName`, `controlStyle` | `string`, `CSSProperties` | Omitted | `.slider__control` |
| `trackClassName`, `trackStyle` | `string`, `CSSProperties` | Omitted | `.slider__track` |
| `fillClassName`, `fillStyle` | `string`, `CSSProperties` | Omitted | `.slider__fill` |
| `railClassName`, `railStyle` | `string`, `CSSProperties` | Omitted | Every `.slider__rail` |
| `stepClassName`, `stepStyle` | `string`, `CSSProperties` | Omitted | Every `.slider__step` |
| `inputClassName`, `inputStyle` | `string`, `CSSProperties` | Omitted | Every `.slider__input` |
| `errorClassName`, `errorStyle` | `string`, `CSSProperties` | Omitted | `.slider__error` |
| Native attributes | `div` attributes and `ref` | Optional | `id`, `aria-*`, `data-*` and the ref land on the root |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.slider` | `div` | `className` | `style` | `Always` |
| `.slider__label` | `label` | `labelClassName` | `labelStyle` | `Always` |
| `.slider__value` | `span`, `aria-hidden` | `valueClassName` | `valueStyle` | `showValue` |
| `.field__description` | `span` | `descriptionClassName` | `descriptionStyle` | `description` |
| `.slider__control` | `div`, `role="group"` with `range` | `controlClassName` | `controlStyle` | `Always` |
| `.slider__track` | `span`, `aria-hidden` | `trackClassName` | `trackStyle` | `Always` |
| `.slider__fill` | `span` in the track | `fillClassName` | `fillStyle` | `Always` |
| `.slider__rail` | `span` in the track, `--before` and `--after` | `railClassName` | `railStyle` | `--before` with `range`; `--after` always |
| `.slider__steps` | `span`, `aria-hidden` | — | — | `showSteps`, up to 100 steps |
| `.slider__step` | `span` in `.slider__steps`, `[data-active]` inside the value | `stepClassName` | `stepStyle` | `showSteps`, up to 100 steps |
| `.slider__input` | `input type="range"`, one or two | `inputClassName` | `inputStyle` | `Always` |
| `.slider__error` | `span` | `errorClassName` | `errorStyle` | `error` |

The track is the fill and the rails, the stretches outside the value; they follow the thumbs from
`--slider-start` and `--slider-end`, the shares (0 to 1) the component writes on the control
(`controlStyle` merges after them), and each step mark from its own `--slider-step`. A rail's
`::after` is the stop that marks the end of the track where a system draws one. States:
`.slider--invalid` colors the label, `.slider--disabled` dims the control and the label, and
`[data-range]` marks a range. The thumb is drawn with `::-webkit-slider-thumb` and
`::-moz-range-thumb`, with its own `:hover` and `:active`. Use the [stylesheet](../../src/components/Slider/Slider.styles.css) for
the exact declarations.

### Instance styles and classes

```tsx
<Slider label="Volume" controlClassName="volume-track" />
```

```css
.volume-track {
  --slider-fill-background: var(--color-success);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [slider baseline recipe](../../src/design-systems/neus/generated/recipes/slider.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--slider-font-family` | Font of the label, value, help text and error | `var(--input-font-family)` |
| `--slider-gap` | Space between the rows | `8px` |
| `--slider-text-gap` | Space between the label and the value | `16px` |
| `--slider-min-width` | Narrowest the slider gets | `var(--input-min-width)` |
| `--slider-label-color` | Label color | `var(--input-label-color)` |
| `--slider-label-font-size` | Label size | `var(--input-label-font-size)` |
| `--slider-label-weight` | Label weight | `var(--input-label-weight)` |
| `--slider-value-color` | Value color | `var(--color-text-secondary)` |
| `--slider-value-font-size` | Value size | `var(--input-label-font-size)` |
| `--slider-value-weight` | Value weight | `500` |
| `--slider-error-color` | Error message, and label while invalid | `var(--input-error-color)` |
| `--slider-error-font-size` | Error message size | `var(--input-error-font-size)` |
| `--slider-disabled-color` | Label while disabled | `var(--input-disabled-color)` |
| `--slider-control-height` | Height of the control, the pointer target | `24px` |
| `--slider-track-height` | Track thickness | `6px` |
| `--slider-track-radius` | Track corners | `3em` |
| `--slider-track-border-width` | Track outline width | `0px` |
| `--slider-track-border-color` | Track outline color | `transparent` |
| `--slider-track-background` | Rails, the track outside the value | `var(--color-border-subtle)` |
| `--slider-track-inner-radius` | Corners of the track's ends beside a thumb | `0px` |
| `--slider-track-gap` | Track cleared on each side of a thumb's center; `0px` lets the thumb cover the joint | `0px` |
| `--slider-fill-background` | Filled stretch | `var(--color-primary)` |
| `--slider-thumb-width`, `--slider-thumb-height` | Thumb size | `20px`, `20px` |
| `--slider-thumb-inset` | Distance from each end of the track to a thumb's center at `min` and `max` | `calc(var(--slider-thumb-width) / 2)` |
| `--slider-thumb-radius` | Thumb corners | `50%` |
| `--slider-thumb-background` | Thumb fill | `var(--color-surface)` |
| `--slider-thumb-border-width` | Thumb outline width | `2px` |
| `--slider-thumb-border-color` | Thumb outline color | `var(--color-primary)` |
| `--slider-thumb-shadow` | Thumb shadow; never `none`, use `0 0 #0000` | `0 1px 3px rgb(15 23 42 / 0.2)` |
| `--slider-thumb-hover-shadow` | Ring while the pointer is on the thumb, before the thumb shadow; never `none` | `0 0 0 6px color-mix(in srgb, var(--color-primary) 14%, transparent)` |
| `--slider-thumb-active-shadow` | Ring while the thumb is pressed; never `none` | `0 0 0 8px color-mix(in srgb, var(--color-primary) 18%, transparent)` |
| `--slider-thumb-focus-width` | Thumb width on keyboard focus | `var(--slider-thumb-width)` |
| `--slider-thumb-active-width` | Thumb width while pressed | `var(--slider-thumb-width)` |
| `--slider-focus-shadow` | Keyboard focus ring, before the thumb shadow | `0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-focus)` |
| `--slider-step-width`, `--slider-step-height` | Step mark size | `4px`, `4px` |
| `--slider-step-radius` | Step mark corners | `50%` |
| `--slider-step-offset` | Step mark distance below the track's center | `0px` |
| `--slider-step-color` | Step marks outside the value | `var(--color-text-secondary)` |
| `--slider-step-active-color` | Step marks inside the value | `var(--color-text-on-primary)` |
| `--slider-stop-size` | End-of-track stop; `0px` draws none | `0px` |
| `--slider-stop-inset` | Stop distance from the track's end | `0px` |
| `--slider-stop-color` | Stop color | `var(--slider-step-color)` |
| `--slider-disabled-opacity` | Control opacity while disabled | `0.38` |
| `--slider-transition` | Thumb transition, off under reduced motion | `box-shadow 0.2s ease` |

### Shared dependencies and runtime values

The label, error and disabled tokens follow the field tokens of the [Input recipe](./Input.md),
and the description uses `--input-description-color` and `--input-description-font-size`.
`--slider-start`, `--slider-end` and each mark's `--slider-step` are written inline at runtime;
the stylesheet derives `--slider-from`, `--slider-to`, `--slider-travel` and the input's margins
from them and the thumb tokens.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --slider-track-height: 4px;
  --slider-thumb-width: 16px;
  --slider-thumb-height: 16px;
}
```

## Storybook and related guides

The single Slider story exposes props as controls, with `range` switching between one thumb
and two. Related: [NumberInput](./NumberInput.md), [Progress](./Progress.md),
[FormTemplate](../templates/FormTemplate.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
