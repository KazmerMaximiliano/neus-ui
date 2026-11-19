# Tooltip

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A short description of a control, shown while the pointer rests on it or keyboard focus
reaches it.

## Usage

```tsx
import { IconButton, ThemeProvider, Tooltip } from "neus-ui";
import { Trash2 } from "lucide-react";
import "neus-ui/dist/neus-ui.css";

export const Example = () => (
  <ThemeProvider designSystem="neus">
    <Tooltip
      content="Moves it to the trash for 30 days"
      trigger={(props) => <IconButton {...props} icon={Trash2} label="Delete" />}
    />
  </ThemeProvider>
);
```

`trigger` renders the control: spread the props it receives on a [Button](./Button.md) or an
[IconButton](./IconButton.md). A [Link](./Link.md) works too; name its element type so the
ref fits: `<Tooltip<HTMLAnchorElement> … />`.

A tooltip adds context the visible label or the `aria-label` does not give, such as a
constraint or a consequence. It never replaces the control's name: an icon-only button still
needs its `label`. Keep it to one short sentence or fragment, with no links or buttons inside;
content people must read or act on belongs in a [Popover](./Popover.md), a field
`description` or the page. Do not put one on a disabled control, which cannot take focus,
nor on a labelled field.

## Behavior and accessibility

The trigger receives `aria-describedby`, so screen readers read the text as its description
on focus, whether the tooltip shows or not. The tooltip is a `span` with `role="tooltip"` and
the native `popover="manual"` attribute: it sits on the top layer, centered on the trigger.
It never takes focus.

It shows after the pointer rests on the trigger for `delay` milliseconds (150 by default), and
at once when keyboard focus reaches it; a mouse click, which focuses without a visible focus
ring, does not hold it open. Touch does not show it, since a tap would flash it over the
action it starts. It follows WCAG 1.4.13: the pointer can move onto the tooltip without it
closing, Escape closes it without moving focus, and it stays until the pointer leaves, focus
moves on or Escape is pressed. After Escape it stays closed until the pointer or focus comes
back.

`placement` (`top` by default) picks the side. When there is no room, it moves to the other
side if that one has more, and it stays inside the viewport horizontally. Its width comes from
its text, up to `--tooltip-max-width`. Systems that draw a caret (Carbon) point it at the
center of the trigger, also when the tooltip is pushed in from a screen edge. Text that wraps
takes the system's multi-line padding and width where it has them (Carbon), and the tooltip is
centered again. It follows the
trigger on scroll and resize. The tooltip needs JavaScript to show, so it lives in a hydrated
client component.

## Props

See [the type source](../../src/components/Tooltip/Tooltip.types.ts) and
[implementation](../../src/components/Tooltip/Tooltip.tsx) for the exact contract. All props
are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `content` | `ReactNode` | Required | Short text that describes the trigger |
| `trigger` | `(props: TooltipTriggerProps<T>) => ReactNode` | Required | Renders the trigger; spread `props` on a Button, IconButton or Link |
| `placement` | `"top" \| "bottom"` | `"top"` | Preferred side, centered on the trigger; flips when it does not fit |
| `delay` | `number` | `150` | Milliseconds of hover before it shows; keyboard focus shows it at once |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.tooltip` |

### Supporting types

```ts
// T is HTMLButtonElement unless named, as in Tooltip<HTMLAnchorElement>.
type TooltipTriggerProps<T extends HTMLElement = HTMLButtonElement> = {
  ref: Ref<T>;
  "aria-describedby": string;
  onPointerEnter: (event: PointerEvent<T>) => void;
  onPointerLeave: () => void;
  onFocus: (event: FocusEvent<T>) => void;
  onBlur: () => void;
};
```

If the trigger needs its own handler for one of these events, call both from it.

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.tooltip` | `span` with `role="tooltip"` and `popover="manual"`, after the trigger | `className` | `style` | `Always`; shown while open |

Tooltip renders no wrapper: the trigger stays where you put it. The resolved side is in
`data-placement`, `data-multiline` marks text that wraps, and `:popover-open` matches while it
shows. The caret is the tooltip's `::before`, filled with `--tooltip-background`; it has no
outline, so a system that gives the tooltip a border keeps `--tooltip-caret-size` at `0px`. WeekCalendarRow's event tooltip
is the same `.tooltip` bubble, placed at the pointer with the overlay surface. Use the
[stylesheet](../../src/components/Tooltip/Tooltip.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Tooltip className="wide-tip" content="…" trigger={(props) => <IconButton {...props} icon={Info} label="Details" />} />
```

```css
.wide-tip {
  --tooltip-max-width: 320px;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [tooltip baseline recipe](../../src/design-systems/neus/generated/recipes/tooltip.css)

### Surface and geometry

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--tooltip-background` | Fill | `var(--color-text-primary)` |
| `--tooltip-color` | Text color | `var(--color-surface)` |
| `--tooltip-border-width` | Outline | `0px` |
| `--tooltip-border-color` | Outline color | `transparent` |
| `--tooltip-radius` | Corners | `var(--radius-sm)` |
| `--tooltip-shadow` | Lift over the page | `none` |
| `--tooltip-padding` | Space inside | `6px 10px` |
| `--tooltip-max-width` | Widest it grows before wrapping | `240px` |
| `--tooltip-multiline-padding` | Space inside when the text wraps; unset keeps `--tooltip-padding` | `initial` (unset) |
| `--tooltip-multiline-max-width` | Widest it grows when the text wraps; unset keeps `--tooltip-max-width` | `initial` (unset) |
| `--tooltip-offset` | Gap between the trigger and the tooltip, caret included | `6px` |
| `--tooltip-caret-size` | Height of the caret toward the trigger, twice as wide; `0px` draws none | `0px` |

### Typography

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--tooltip-font-family` | Font | `var(--font-body)` |
| `--tooltip-font-size` | Text size | `var(--fs-xs)` |
| `--tooltip-font-weight` | Text weight | `500` |
| `--tooltip-line-height` | Line height | `1.4` |
| `--tooltip-letter-spacing` | Tracking | `normal` |

### Shared dependencies and runtime values

`--color-text-primary`, `--color-surface`, `--radius-sm`, `--font-body` and `--fs-xs`. While
it shows, the tooltip carries the placement values the [Popover](./Popover.md) panel uses,
written on open, scroll and resize; it reads `--popover-top`, `--popover-bottom` and
`--popover-center`, and the caret `--popover-left` and `--popover-anchor-width`.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --tooltip-background: var(--color-primary);
  --tooltip-color: var(--color-text-on-primary);
}
```

## Storybook and related guides

The single Tooltip story exposes props as controls on an IconButton trigger. Related:
[IconButton](./IconButton.md), [Popover](./Popover.md), [WeekCalendarRow](./WeekCalendarRow.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
