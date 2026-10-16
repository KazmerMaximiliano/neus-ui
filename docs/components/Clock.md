# Clock

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Pointer and keyboard operated hour/minute dial.

## Usage

```tsx
import { useState } from "react";
import { ThemeProvider, Clock } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  const [time, setTime] = useState({ hours: 9, minutes: 30 });
  return (
    <ThemeProvider designSystem="neus">
      <Clock value={time} onChange={setTime} format="24h" />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

`value` contains 24-hour `hours` and `minutes`. A defined value selects controlled mode;
otherwise internal state starts at 12:00. The default format is 12h. Segment buttons select
hours or minutes; AM/PM buttons appear only in 12h mode. Arrow keys change by one,
PageUp/PageDown by five, and Enter on the hour dial switches to minutes. Pointer selection
of an hour also switches to minutes. `disabled` and `readonly` block changes.

The face exposes slider semantics and the current value. Numbers are decorative labels, with
selected/inner ring classes and a contrast foreground drawn by a pseudo-element.
`clockStyle` targets the inner container; `style` targets the outer wrapper. `segmentStyle`
and `periodStyle` affect all corresponding buttons. Hand and number positioning use runtime
CSS variables; override geometry with care.

## Props

See [the type source](../../src/components/Clock/Clock.types.ts) and
[implementation](../../src/components/Clock/Clock.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `centerClassName` | `string` | Omitted | Additional classes on `.clock__center` |
| `centerStyle` | `CSSProperties` | Omitted | Inline styles on `.clock__center` |
| `className` | `string` | Omitted | Additional classes on `.clock__wrapper` |
| `clockClassName` | `string` | Omitted | Additional classes on `.clock__container` |
| `displayClassName` | `string` | Omitted | Additional classes on `.clock__display` |
| `displayStyle` | `CSSProperties` | Omitted | Inline styles on `.clock__display` |
| `faceClassName` | `string` | Omitted | Additional classes on `.clock__face` |
| `handTipClassName` | `string` | Omitted | Additional classes on `.clock__hand-tip` |
| `handTipStyle` | `CSSProperties` | Omitted | Inline styles on `.clock__hand-tip` |
| `headerClassName` | `string` | Omitted | Additional classes on `.clock__header` |
| `indicatorClassName` | `string` | Omitted | Additional classes on `.clock__hand` |
| `numberClassName` | `string` | Omitted | Additional classes on `.clock__number` |
| `numbersClassName` | `string` | Omitted | Additional classes on `.clock__numbers` |
| `numbersStyle` | `CSSProperties` | Omitted | Inline styles on `.clock__numbers` |
| `periodClassName` | `string` | Omitted | Additional classes on `.clock__period-button` |
| `periodContentClassName` | `string` | Omitted | Additional classes on `.clock__period` |
| `periodContentStyle` | `CSSProperties` | Omitted | Inline styles on `.clock__period` |
| `segmentClassName` | `string` | Omitted | Additional classes on `.clock__time-button` |
| `separatorClassName` | `string` | Omitted | Additional classes on `.clock__separator` |
| `separatorStyle` | `CSSProperties` | Omitted | Inline styles on `.clock__separator` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.clock__wrapper` |
| `value` | `TimeValue` | Omitted | The current selected time |
| `disabled` | `boolean` | Omitted | Disables the clock from user interaction |
| `readonly` | `boolean` | Omitted | Makes the clock read-only |
| `format` | `"12h" \| "24h"` | `"12h"` | Time format (12-hour or 24-hour) |
| `clockStyle` | `CSSProperties` | Omitted | Inline styles on `.clock__container` |
| `headerStyle` | `CSSProperties` | Omitted | Inline styles on `.clock__header` |
| `faceStyle` | `CSSProperties` | Omitted | Inline styles on `.clock__face` |
| `segmentStyle` | `CSSProperties` | Omitted | Inline styles on `.clock__time-button` |
| `periodStyle` | `CSSProperties` | Omitted | Inline styles on `.clock__period-button` |
| `numberStyle` | `CSSProperties` | Omitted | Inline styles on `.clock__number` |
| `indicatorStyle` | `CSSProperties` | Omitted | Inline styles on `.clock__hand` |
| `onChange` | `((value: TimeValue) => void)` | Omitted | Callback when time selection changes |

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/Clock/index.ts). A type shown here is not necessarily a
package export.

```ts
type TimeValue = {
  hours: number;
  minutes: number;
};
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.clock__wrapper` | `div` | `className` | `style` | `Always` |
| `.clock__container` | `div` | `clockClassName` | `clockStyle` | `Always` |
| `.clock__header` | `div` | `headerClassName` | `headerStyle` | `Always` |
| `.clock__display` | `div` | `displayClassName` | `displayStyle` | `Always` |
| `.clock__time-button` | `button` | `segmentClassName` | `segmentStyle` | `Always` |
| `.clock__separator` | `span` | `separatorClassName` | `separatorStyle` | `Always` |
| `.clock__period` | `div` | `periodContentClassName` | `periodContentStyle` | `format === "12h"` |
| `.clock__period-button` | `button` | `periodClassName` | `periodStyle` | `format === "12h"` |
| `.clock__face` | `div` | `faceClassName` | `faceStyle` | `Always` |
| `.clock__center` | `div` | `centerClassName` | `centerStyle` | `Always` |
| `.clock__hand` | `div` | `indicatorClassName` | `indicatorStyle` | `Always` |
| `.clock__hand-tip` | `div` | `handTipClassName` | `handTipStyle` | `Always` |
| `.clock__numbers` | `div` | `numbersClassName` | `numbersStyle` | `Always` |
| `.clock__number` | `span` | `numberClassName` | `numberStyle` | `Always` |

State/variant selectors: `.clock__number--inner`, `.clock__number--selected`,
`.clock__period-button--active`, `.clock__time-button--active`, `.clock__wrapper--disabled`,
`.clock__wrapper--readonly`.

Use the [stylesheet](../../src/components/Clock/Clock.styles.css) for pseudo-elements and
state selectors. For shared field/listbox parts, also inspect the shared styles linked from
the implementation. Consumer content and third-party generated internals retain their own
customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<Clock clockClassName="example-clock" clockStyle={{ outlineOffset: 4 }} value={time} onChange={setTime} format="24h" />
```

```css
.example-clock {
  outline-offset: 4px;
}
.example-clock:focus-visible {
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

- [clock baseline recipe](../../src/design-systems/neus/generated/recipes/clock.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--clock-background` | clock background | `var(--color-surface)` |
| `--clock-border-color` | clock border color | `var(--color-border-input)` |
| `--clock-border-width` | clock border width | `1px` |
| `--clock-color` | clock color | `var(--color-text-primary)` |
| `--clock-face-background` | clock face background | `var(--color-surface-secondary)` |
| `--clock-face-border-width` | clock face border width | `0px` |
| `--clock-hand-color` | clock hand color | `var(--color-primary)` |
| `--clock-header-background` | clock header background | `var(--color-primary)` |
| `--clock-header-border-width` | clock header border width | `0px` |
| `--clock-header-color` | clock header color | `var(--color-text-on-primary)` |
| `--clock-inner-number-color` | clock inner number color | `var(--color-text-secondary)` |
| `--clock-number-color` | clock number color | `var(--color-text-primary)` |
| `--clock-shadow` | clock shadow | `none` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--clock-display-font-size` | clock display font size | `48px` |
| `--clock-font-family` | clock font family | `var(--font-body)` |
| `--clock-hand-text-color` | clock hand text color | `var(--color-text-on-primary)` |
| `--clock-inner-number-font-size` | clock inner number font size | `0.8em` |
| `--clock-number-font-size` | clock number font size | `0.9em` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--clock-face-size` | clock face size | `240px` |
| `--clock-hand-width` | clock hand width | `2px` |
| `--clock-header-padding` | clock header padding | `24px` |
| `--clock-min-width` | clock min width | `350px` |
| `--clock-number-radius` | clock number radius | `50%` |
| `--clock-number-size` | clock number size | `32px` |
| `--clock-radius` | clock radius | `var(--radius-default)` |
| `--clock-segment-gap` | clock segment gap | `0px` |
| `--clock-segment-inactive-opacity` | clock segment inactive opacity | `0.7` |
| `--clock-segment-padding` | clock segment padding | `0` |
| `--clock-segment-radius` | clock segment radius | `4px` |

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--clock-focus-color` | clock focus color | `var(--color-focus)` |
| `--clock-segment-active-background` | clock segment active background | `transparent` |
| `--clock-segment-active-color` | clock segment active color | `inherit` |
| `--clock-selected-background` | clock selected background | `var(--color-primary)` |
| `--clock-selected-color` | clock selected color | `var(--color-text-on-primary)` |

### Shared dependencies and runtime values

`--clock-hand-angle`, `--clock-hand-scale`, `--clock-inner-ring-radius`,
`--clock-number-angle`, `--clock-ring-radius`, `--clock-tip-local-x`, `--clock-tip-local-y`,
`--clock-tip-x`, `--clock-tip-y`.

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
  --clock-header-padding: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Clock story exposes props as controls. Design selection is preview configuration;
applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
