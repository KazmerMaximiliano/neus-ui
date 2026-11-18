# Progress

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A bar that shows how much of a task is done, or that a task of unknown length is running.

## Usage

```tsx
import { ThemeProvider, Progress } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = ({ uploaded, total }: { uploaded: number; total: number }) => {
  return (
    <ThemeProvider designSystem="neus">
      <Progress
        label="Subiendo fotos"
        value={uploaded}
        max={total}
        valueText={`${uploaded} de ${total} fotos`}
        showValue
      />
    </ThemeProvider>
  );
};
```

Use Progress when the task can say how far it is (an upload, a quota, an import). Leave out
`value` while the share is unknown; switch to a value as soon as it is known. A wait without
any measure is a [Spinner](./Spinner.md). Say what is progressing in the label; "Loading" alone
adds nothing.

## Behavior and accessibility

The root is the `progressbar`. With a value it carries `aria-valuenow`, `aria-valuemin` and
`aria-valuemax`, and the value is kept between `min` and `max`; without one it is indeterminate
and carries none of them. `valueText` becomes `aria-valuetext`, so screen readers say "3 of 8
photos" instead of a percentage. `label` is visible and names the bar through
`aria-labelledby`; without it, name the bar with `aria-label` or your own `aria-labelledby`,
which takes precedence. The visible value is hidden from assistive technology because the
bar already announces it. Progress does not announce changes by itself: if the end of the
task matters, announce it once, for example with a [Toast](./Toast.md).

The fill grows with a short transition. An indeterminate bar slides a segment along the track;
under `prefers-reduced-motion: reduce` the fill no longer animates and the segment slides at
half speed instead of stopping, so it never reads as a fixed amount. In right-to-left pages the
bar fills from the right.

## Props

See [the type source](../../src/components/Progress/Progress.types.ts) and
[implementation](../../src/components/Progress/Progress.tsx) for the exact contract. All props
are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `value` | `number` | Omitted | Current value; omitted makes the bar indeterminate |
| `min` | `number` | `0` | Value of an empty bar |
| `max` | `number` | `100` | Value of a full bar |
| `label` | `string` | Omitted | Visible text that names the bar |
| `showValue` | `boolean` | `false` | Shows `valueText`, or the rounded percentage, at the end of the label row |
| `valueText` | `string` | Omitted | The value in words, announced as `aria-valuetext` |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Thickness of the bar |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.progress` |
| `labelClassName`, `labelStyle` | `string`, `CSSProperties` | Omitted | `.progress__label` |
| `valueClassName`, `valueStyle` | `string`, `CSSProperties` | Omitted | `.progress__value` |
| `trackClassName`, `trackStyle` | `string`, `CSSProperties` | Omitted | `.progress__track` |
| `fillClassName`, `fillStyle` | `string`, `CSSProperties` | Omitted | `.progress__fill` |
| Native attributes and ref | React props for a `div` | Optional | Forwarded to `.progress`, except `children` and `role` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.progress` | `div`, `role="progressbar"` | `className` | `style` | `Always` |
| `.progress__label` | `span` | `labelClassName` | `labelStyle` | `label` given |
| `.progress__value` | `span`, `aria-hidden` | `valueClassName` | `valueStyle` | `showValue` and a value or `valueText` |
| `.progress__track` | `div` | `trackClassName` | `trackStyle` | `Always` |
| `.progress__fill` | `div` | `fillClassName` | `fillStyle` | `Always` |

State/variant selectors: `.progress--small`, `.progress--medium`, `.progress--large`,
`.progress--indeterminate`. The label and the value share the first row of a grid and the
track spans the second; without a label the value sits at the start. Use the
[stylesheet](../../src/components/Progress/Progress.styles.css) for the exact declarations.

Stepper's linear variant renders this bar: `.stepper__track` is `.progress`,
`.stepper__counter` is `.progress__value`, `.stepper__bar` is `.progress__track` and
`.stepper__bar-fill` is `.progress__fill`, all styled by the stepper's own tokens.

### Instance styles and classes

```tsx
<Progress className="quota" label="Almacenamiento" value={7.2} max={10} valueText="7,2 de 10 GB" showValue />
```

```css
.quota {
  --progress-fill-background: var(--color-warning);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [progress baseline recipe](../../src/design-systems/neus/generated/recipes/progress.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--progress-track-background` | Unfilled track | `var(--color-border-subtle)` |
| `--progress-track-border-color` | Frame of the track and edge of the fill | `transparent` |
| `--progress-fill-background` | Filled share and indeterminate segment | `var(--color-primary)` |
| `--progress-label-color` | Label text | `var(--color-text-primary)` |
| `--progress-value-color` | Value text | `var(--color-text-secondary)` |

### Typography

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--progress-font-family` | Label and value font | `var(--font-body)` |
| `--progress-label-font-size` | Label size | `var(--fs-sm)` |
| `--progress-label-weight` | Label weight | `600` |
| `--progress-value-font-size` | Value size | `var(--fs-sm)` |
| `--progress-value-weight` | Value weight | `500` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--progress-height-small` | Small thickness | `4px` |
| `--progress-height-medium` | Medium thickness | `8px` |
| `--progress-height-large` | Large thickness | `12px` |
| `--progress-track-radius` | Track corners | `3em` |
| `--progress-track-border-width` | Track frame | `0px` |
| `--progress-fill-radius` | Fill corners | `3em` |
| `--progress-fill-border-width` | Edge at the end of the fill, in the track's border color | `0px` |
| `--progress-gap` | Space between the text row and the track | `8px` |
| `--progress-text-gap` | Space between the label and the value | `16px` |
| `--progress-indeterminate-width` | Length of the sliding segment | `40%` |

### Motion

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--progress-transition` | Fill change | `width 0.3s ease` |
| `--progress-indeterminate-duration` | One pass of the segment | `1.6s` |

### Shared dependencies and runtime values

`--color-border-subtle`, `--color-primary`, `--color-text-primary`, `--color-text-secondary`,
`--font-body` and `--fs-sm`. The component writes the filled share, from 0 to 1, as
`--progress-value` on `.progress`; `--progress-height` is set by the size modifier.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --progress-height-medium: 6px;
  --progress-track-radius: 0px;
  --progress-fill-radius: 0px;
}
```

## Storybook and related guides

The single Progress story exposes props as controls. Related: [Spinner](./Spinner.md),
[Skeleton](./Skeleton.md), [Stepper](./Stepper.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
