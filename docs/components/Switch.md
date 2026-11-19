# Switch

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

On/off setting that applies at once, on a native checkbox with the switch role.

## Usage

```tsx
import { useState } from "react";
import { ThemeProvider, Switch } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  const [alerts, setAlerts] = useState(true);

  return (
    <ThemeProvider designSystem="neus">
      <Switch
        label="Email notifications"
        description="A summary of the week, every Monday."
        checked={alerts}
        onChange={setAlerts}
      />
    </ThemeProvider>
  );
};
```

Use Switch for a setting that takes effect as soon as it changes: notifications, dark mode, a
feature flag. Use [Checkbox](./Checkbox.md) for a choice that is submitted with a form, for
consent, or for one option among several in a list.

## Behavior and accessibility

Switch is a native `<input type="checkbox" role="switch">` inside a `<label>`, so screen
readers announce a switch that is on or off. Clicking the label or the track, or pressing
Space while it has focus, toggles it. `checked` makes it controlled and `defaultChecked`
uncontrolled; `onChange` receives the new state as a boolean. In a form it submits its
`value` (`"on"` by default) under `name` while on, and nothing while off. It works without
JavaScript, so a server-rendered or static page can submit it as is.

The label names the switch; the description is linked through `aria-describedby`, after any
id the caller passes, and is kept out of the name. Without a visible label, pass
`aria-label` or `aria-labelledby`. Native attributes and the ref reach the `<input>`; the
type, the role and the label wiring are the switch's own. The track is decorative
(`aria-hidden`).

The label comes first and the track at the end of the row. Placed where it stretches, such as
a FormTemplate cell, a Stack or a settings list, the track reaches the far edge; inline, it
sits right after the label. The description goes under the label. Disabled switches dim
without losing their on or off look. Under `prefers-reduced-motion: reduce` the thumb jumps
instead of sliding.

The track lines up with the first line of the label, its center half an x-height above the baseline (as `vertical-align: middle` defines it), so it stays centered on lowercase text in every system's font.

## Props

See [the type source](../../src/components/Switch/Switch.types.ts) and
[implementation](../../src/components/Switch/Switch.tsx) for the exact contract. All props
are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `label` | `string` | Omitted | Visible label that names the switch |
| `description` | `ReactNode` | Omitted | Help text under the label, linked with `aria-describedby`; phrasing content, since it sits inside the label |
| `checked` | `boolean` | Omitted | Whether it is on (controlled) |
| `defaultChecked` | `boolean` | Omitted | Initial state (uncontrolled) |
| `onChange` | `(checked: boolean) => void` | Omitted | Called with the new state |
| `disabled` | `boolean` | Omitted | Disables the switch |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.switch` |
| `labelClassName`, `labelStyle` | `string`, `CSSProperties` | Omitted | `.switch__label` |
| `trackClassName`, `trackStyle` | `string`, `CSSProperties` | Omitted | `.switch__track` |
| `thumbClassName`, `thumbStyle` | `string`, `CSSProperties` | Omitted | `.switch__thumb` |
| `descriptionClassName`, `descriptionStyle` | `string`, `CSSProperties` | Omitted | `.field__description` |
| Native attributes and ref | React props for an `input` | Optional | Forwarded to the `<input>` (`name`, `value`, `id`, `required`, `form`, `onBlur`, `aria-*`, `data-*`…), except `type`, `role` and `children` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.switch` | `label` | `className` | `style` | `Always` |
| `.switch__label` | `span` | `labelClassName` | `labelStyle` | `label` |
| `.switch__input` | `input`, visually hidden | — | — | `Always` |
| `.switch__track` | `span`, `aria-hidden` | `trackClassName` | `trackStyle` | `Always` |
| `.switch__thumb` | `span` inside the track | `thumbClassName` | `thumbStyle` | `Always` |
| `.field__description` | `span` | `descriptionClassName` | `descriptionStyle` | `description` |

States come from the native input: `.switch__input:checked + .switch__track`,
`.switch__input:focus-visible + .switch__track`, `.switch__input:disabled + .switch__track`
and `.switch:has(.switch__input:disabled)`. Use the
[stylesheet](../../src/components/Switch/Switch.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Switch className="settings-row" label="Modo oscuro" />
```

```css
.settings-row {
  width: 100%;
  padding-block: var(--space-3);
  border-bottom: 1px solid var(--color-border-subtle);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [switch baseline recipe](../../src/design-systems/neus/generated/recipes/switch.css)

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--switch-gap` | Space between the label and the track | `12px` |
| `--switch-text-gap` | Space between the label and the description | `2px` |
| `--switch-track-width` | Track width | `44px` |
| `--switch-track-height` | Track height; the thumb's center sits half of it from each end | `24px` |
| `--switch-track-radius` | Track corners | `3em` |
| `--switch-track-border-width` | Track border | `2px` |
| `--switch-thumb-size` | Thumb diameter while off | `12px` |
| `--switch-thumb-checked-size` | Thumb diameter while on | `16px` |
| `--switch-thumb-radius` | Thumb corners | `50%` |

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--switch-track-background` | Track while off | `var(--color-surface)` |
| `--switch-track-border-color` | Track border while off | `var(--color-primary-dark)` |
| `--switch-track-shadow` | Track shadow while off | `none` |
| `--switch-track-checked-background` | Track while on | `var(--color-primary)` |
| `--switch-track-checked-border-color` | Track border while on | `var(--color-primary)` |
| `--switch-track-checked-shadow` | Track shadow while on | `0 4px 12px -4px var(--color-focus-ring)` |
| `--switch-thumb-color` | Thumb while off | `var(--color-primary-dark)` |
| `--switch-thumb-checked-color` | Thumb while on | `var(--color-text-on-primary)` |
| `--switch-thumb-shadow` | Thumb shadow | `none` |

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--switch-track-hover-border-color` | Track border on hover while off | `var(--color-primary)` |
| `--switch-thumb-hover-color` | Thumb on hover while off | `var(--color-primary)` |
| `--switch-focus-width` | Keyboard focus outline width | `2px` |
| `--switch-focus-color` | Keyboard focus outline color | `var(--color-focus)` |
| `--switch-focus-offset` | Keyboard focus outline offset | `2px` |
| `--switch-disabled-opacity` | Track opacity while disabled | `0.38` |
| `--switch-disabled-color` | Label color while disabled | `var(--color-text-disabled)` |

### Typography and motion

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--switch-font-family` | Label font | `var(--font-body)` |
| `--switch-label-color` | Label color | `var(--color-text-primary)` |
| `--switch-label-font-size` | Label size | `var(--fs-base)` |
| `--switch-label-line-height` | Label line height | `20px` |
| `--switch-duration` | Slide and color change | `0.2s` |
| `--switch-easing` | Slide and color change easing | `ease` |

### Shared dependencies and runtime values

The description uses the field description tokens of the [Input recipe](./Input.md)
(`--input-description-color`, `--input-description-font-size`).

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --switch-track-checked-background: var(--color-success-dark);
  --switch-track-checked-border-color: var(--color-success-dark);
}
```

## Storybook and related guides

The single Switch story exposes props as controls. Related: [Checkbox](./Checkbox.md),
[FormTemplate](../templates/FormTemplate.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
