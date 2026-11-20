# Toggle

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A button that stays pressed until pressed again: Bold in an editor toolbar, "Show archived" over
a list, a pin on a map. Inside a [ToggleGroup](./ToggleGroup.md), toggles share one choice or
several.

## Usage

```tsx
import { Bold, Italic } from "lucide-react";
import { useState } from "react";
import { ThemeProvider, Toggle } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  const [bold, setBold] = useState(false);

  return (
    <ThemeProvider designSystem="neus">
      <Toggle label="Bold" icon={Bold} iconOnly pressed={bold} onPressedChange={setBold} />
      <Toggle label="Italic" icon={Italic} iconOnly defaultPressed />
      <Toggle label="Show archived" size="small" />
    </ThemeProvider>
  );
};
```

A toggle changes what the page shows or how content is formatted, at once. A setting that
reads on and off in a list or a form is a [Switch](./Switch.md); a choice sent with a form is a
[Checkbox](./Checkbox.md); a one-off action is a [Button](./Button.md). Add lucide-react to the
project for the icons, as for [IconButton](./IconButton.md).

## Behavior and accessibility

The toggle is a native `<button type="button">` with `aria-pressed`, so Enter and Space press it
and screen readers announce "toggle button, pressed". With `iconOnly` the label becomes the
button's `aria-label` and only the icon shows; the icon is always `aria-hidden`. Give an
icon-only toggle a [Tooltip](./Tooltip.md) when its icon alone may not be clear.

`pressed` makes it controlled and `defaultPressed` uncontrolled; `onPressedChange` receives the
new state. An `onClick` that calls `preventDefault()` keeps the state as it is. Inside a
ToggleGroup the group holds what is pressed: a toggle with a `value` takes its state, size and
disabled state from the group, and its own `size` and `disabled` win. In a single-choice group
the toggle is a `radio` with `aria-checked` instead of `aria-pressed`. A toggle without a
`value` stays on its own.

## Props

See [the type source](../../src/components/Toggle/Toggle.types.ts) and
[implementation](../../src/components/Toggle/Toggle.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `label` | `string` | Required | Visible text, or the accessible name alone with `iconOnly` |
| `icon` | `IconButtonIcon` | Omitted | A lucide icon before the label |
| `iconOnly` | `boolean` | `false` | Shows the icon alone in a square button |
| `pressed` | `boolean` | Omitted | Whether the toggle is on (controlled) |
| `defaultPressed` | `boolean` | `false` | Initial state (uncontrolled) |
| `onPressedChange` | `(pressed: boolean) => void` | Omitted | Called with the new state |
| `value` | `string` | Omitted | Identifies the toggle inside a ToggleGroup |
| `size` | `"small" \| "medium" \| "large"` | `"medium"`, or the group's | Height, padding and icon size |
| `disabled` | `boolean` | `false`, or the group's | Disables the toggle |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.toggle` |
| `iconClassName`, `iconStyle` | `string`, `CSSProperties` | Omitted | `.toggle__icon` |
| `labelClassName`, `labelStyle` | `string`, `CSSProperties` | Omitted | `.toggle__label` |
| Native attributes | `button` attributes and `ref` | Optional | `aria-*`, `data-*`, `onClick`, `title` and the ref land on the button; `type`, `aria-pressed` and `children` are the toggle's |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.toggle` | `button` | `className` | `style` | `Always` |
| `.toggle__icon` | `svg`, `aria-hidden` | `iconClassName` | `iconStyle` | `icon` |
| `.toggle__label` | `span` | `labelClassName` | `labelStyle` | Without `iconOnly` |

States: `[aria-pressed="true"]`, or `[aria-checked="true"]` in a single-choice group, draws the
pressed look; `[data-size]` carries the size; `:hover`, `:focus-visible` and `:disabled` style
the rest. Use the [stylesheet](../../src/components/Toggle/Toggle.styles.css) for the exact
declarations.

### Instance styles and classes

```tsx
<Toggle label="Favorite" icon={Star} iconOnly className="favorite-toggle" />
```

```css
.favorite-toggle {
  --toggle-pressed-color: var(--color-warning);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files. Toggle and [ToggleGroup](./ToggleGroup.md) share
the `toggle` recipe.

- [toggle baseline recipe](../../src/design-systems/neus/generated/recipes/toggle.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--toggle-font-family` | Label font | `var(--font-body)` |
| `--toggle-font-size` | Label size | `var(--fs-sm)` |
| `--toggle-font-weight` | Label weight | `600` |
| `--toggle-gap` | Space between the icon and the label | `8px` |
| `--toggle-height-small`, `--toggle-height-medium`, `--toggle-height-large` | Height, and width of an icon-only toggle | `32px`, `40px`, `48px` |
| `--toggle-padding-small`, `--toggle-padding-medium`, `--toggle-padding-large` | Padding around the label | `0 12px`, `0 16px`, `0 20px` |
| `--toggle-icon-size-small`, `--toggle-icon-size-medium`, `--toggle-icon-size-large` | Icon size | `16px`, `18px`, `20px` |
| `--toggle-radius` | Corners | `3em` |
| `--toggle-border-width` | Border width | `1px` |
| `--toggle-border-color` | Border color at rest | `var(--color-border-input)` |
| `--toggle-background` | Fill at rest | `transparent` |
| `--toggle-color` | Text and icon at rest | `var(--color-text-primary)` |
| `--toggle-shadow` | Shadow at rest | `none` |
| `--toggle-hover-background` | Fill under the pointer | `var(--color-surface-hover)` |
| `--toggle-hover-color` | Text under the pointer | `var(--toggle-color)` |
| `--toggle-pressed-background` | Fill while pressed | `color-mix(in srgb, var(--color-primary) 12%, var(--color-surface))` |
| `--toggle-pressed-hover-background` | Fill while pressed, under the pointer | `color-mix(in srgb, var(--color-primary) 18%, var(--color-surface))` |
| `--toggle-pressed-color` | Text while pressed | `var(--color-primary-text)` |
| `--toggle-pressed-border-color` | Border while pressed | `var(--color-primary)` |
| `--toggle-pressed-shadow` | Shadow while pressed | `none` |
| `--toggle-focus-width` | Focus ring width | `2px` |
| `--toggle-focus-color` | Focus ring color | `var(--color-focus)` |
| `--toggle-focus-offset` | Focus ring offset | `2px` |
| `--toggle-disabled-opacity` | Opacity while disabled | `0.38` |
| `--toggle-transition` | State transition, off under reduced motion | `background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease` |

### Shared dependencies and runtime values

`--toggle-height`, `--toggle-padding` and `--toggle-icon-size` are set by the stylesheet from
the size tokens; a ToggleGroup sets the radius, border, fill and pressed tokens of its toggles
from its own `--toggle-group-item-*` tokens.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --toggle-radius: var(--radius-sm);
  --toggle-pressed-background: var(--color-primary);
  --toggle-pressed-color: var(--color-text-on-primary);
}
```

## Storybook and related guides

The single Toggle story exposes props as controls. Related: [ToggleGroup](./ToggleGroup.md),
[IconButton](./IconButton.md), [Switch](./Switch.md), [Tooltip](./Tooltip.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
