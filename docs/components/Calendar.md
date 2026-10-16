# Calendar

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Localized date selection with single, range and multiple modes.

## Usage

```tsx
import { ThemeProvider, Calendar } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Calendar label="Appointment" mode="single" defaultValue={new Date(2026, 9, 16)} language="en-US" />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

The `mode` discriminant determines `value`, `defaultValue` and callback types: `Date` for
single, `DateRange` for range, and `Date[]` for multiple, each optionally undefined.
Presence of the `value` property selects controlled behavior, including an explicitly
undefined value. Otherwise `defaultValue` initializes internal selection. `required`
prevents clearing a selection; `disabled` and `readonly` prevent selection changes.
`language` uses locale data for month names, year formatting and accessible labels.

Click the caption for the month chooser, then its year control for the year list. Escape
returns to the day view. `yearRange` defaults to the current year minus 50 through the
current year plus 10; it bounds the year chooser. `numberOfMonths` defaults to 1 and is
normalized to a positive integer for DayPicker. A named hidden field serializes selection.
The visible label names the group, and error text is linked with `aria-describedby`.

## Props

See [the type source](../../src/components/Calendar/Calendar.types.ts) and
[implementation](../../src/components/Calendar/Calendar.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `overlayYearIconClassName` | `string` | Omitted | Additional classes on `.calendar__overlay-year-icon` |
| `overlayYearIconStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar__overlay-year-icon` |
| `captionClassName` | `string` | Omitted | Additional classes on `.rdp-caption_label` |
| `captionStyle` | `CSSProperties` | Omitted | Inline styles on `.rdp-caption_label` |
| `className` | `string` | Omitted | Additional classes on `.calendar` |
| `dayPickerClassName` | `string` | Omitted | Additional classes on `.calendar__day-picker.calendar` |
| `dayPickerStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar__day-picker.calendar` |
| `errorClassName` | `string` | Omitted | Additional classes on `.calendar__error-message` |
| `infoClassName` | `string` | Omitted | Additional classes on `.calendar__info` |
| `infoStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar__info` |
| `labelClassName` | `string` | Omitted | Additional classes on `.calendar__label` |
| `labelWrapperClassName` | `string` | Omitted | Additional classes on `.calendar__label-wrapper` |
| `labelWrapperStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar__label-wrapper` |
| `monthGridClassName` | `string` | Omitted | Additional classes on `.calendar__month-grid` |
| `monthGridStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar__month-grid` |
| `monthItemClassName` | `string` | Omitted | Additional classes on `.calendar__month-item` |
| `monthItemStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar__month-item` |
| `overlayClassName` | `string` | Omitted | Additional classes on `.calendar__overlay` |
| `overlayHeaderClassName` | `string` | Omitted | Additional classes on `.calendar__overlay-header` |
| `overlayHeaderStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar__overlay-header` |
| `overlayStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar__overlay` |
| `overlayYearBtnClassName` | `string` | Omitted | Additional classes on `.calendar__overlay-year-btn` |
| `overlayYearBtnStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar__overlay-year-btn` |
| `requiredClassName` | `string` | Omitted | Additional classes on `.calendar__required` |
| `requiredStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar__required` |
| `yearItemClassName` | `string` | Omitted | Additional classes on `.calendar__year-item` |
| `yearItemStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar__year-item` |
| `yearListClassName` | `string` | Omitted | Additional classes on `.calendar__year-list` |
| `yearListStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar__year-list` |
| `language` | `string` | Omitted | BCP 47 language tag for Gregorian months, weekdays and date labels; uses native Intl, with en-US fallback |
| `name` | `string` | Omitted | The name attribute for the input |
| `label` | `string` | Omitted | Label text displayed above the calendar |
| `disabled` | `boolean` | `false` | Disables the calendar from user interaction |
| `readonly` | `boolean` | `false` | Makes the calendar read-only |
| `required` | `boolean` | `false` | Whether a date selection is required |
| `numberOfMonths` | `number` | `1` | Number of visible months; independent of selection mode |
| `error` | `string` | Omitted | Error message to display |
| `yearRange` | `YearRange` | Omitted | Range of years available in the year picker |
| `calendarStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar` |
| `labelStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar__label` |
| `errorStyle` | `CSSProperties` | Omitted | Inline styles on `.calendar__error-message` |
| `mode` | `"single" \| "range" \| "multiple"` | Omitted | Calendar selection mode |
| `value` | `Date \| DateRange \| Date[]` | Omitted | The current selected date(s) |
| `defaultValue` | `Date \| DateRange \| Date[]` | Omitted | The initial date(s) value |
| `onChange` | `((value: Date \| undefined) => void) \| ((value: DateRange \| undefined) => void) \| ((value: Date[] \| undefined) => void)` | Omitted | Callback when date selection changes |

| Mode | Selection | Callback |
| --- | --- | --- |
| `single` (default) | `Date \| undefined` | `(value: Date \| undefined) => void` |
| `range` | `DateRange \| undefined` | `(value: DateRange \| undefined) => void` |
| `multiple` | `Date[] \| undefined` | `(value: Date[] \| undefined) => void` |

DateRange comes from react-day-picker and contains `from: Date | undefined` and optional
`to: Date`.

### DayPicker integration

The day grid is generated by react-day-picker. Neus applies its calendar tokens to these
current integration classes; they are not new per-day props:

| Classes | Part |
| --- | --- |
| `.rdp-root`, `.rdp-months`, `.rdp-month` | Calendar root and month layout |
| `.rdp-nav`, `.rdp-chevron` | Navigation and navigation icons |
| `.rdp-month_caption`, `.rdp-caption_label` | Caption region and Neus-owned caption button |
| `.rdp-month_grid`, `.rdp-week`, `.rdp-weekday` | Month grid, weeks and weekday headings |
| `.rdp-day`, `.rdp-day_button` | Day cell and interactive day button |
| `.rdp-selected`, `.rdp-today` | Selection and current-day styling |
| `.rdp-range_start`, `.rdp-range_middle`, `.rdp-range_end` | Range boundaries and interior |

Scope direct overrides beneath your calendar class, for example `.appointment-calendar
.rdp-day_button`. Prefer the listed calendar tokens for routine color/size changes. Preserve
DayPicker keyboard/focus behavior; inspect integration selectors when updating its
dependency.

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/Calendar/index.ts). A type shown here is not necessarily a
package export.

```ts
type YearRange = { from: number; to: number; };

type CalendarCaptionCustomization = {
  captionClassName?: string;
  captionStyle?: CSSProperties;
};
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.calendar` | `div` | `className` | `calendarStyle` | `Always` |
| `.calendar__label-wrapper` | `div` | `labelWrapperClassName` | `labelWrapperStyle` | `label` |
| `.calendar__label` | `span` | `labelClassName` | `labelStyle` | `label` |
| `.calendar__required` | `span` | `requiredClassName` | `requiredStyle` | `required` |
| `.calendar__day-picker .calendar` | `div` | `dayPickerClassName` | `dayPickerStyle` | `Always` |
| `.calendar__overlay` | `div` | `overlayClassName` | `overlayStyle` | `view === "month"` |
| `.calendar__overlay-header` | `div` | `overlayHeaderClassName` | `overlayHeaderStyle` | `view === "month"` |
| `.calendar__overlay-year-btn` | `button` | `overlayYearBtnClassName` | `overlayYearBtnStyle` | `view === "month"` |
| `.calendar__overlay-year-icon` | `ChevronDown` | `overlayYearIconClassName` | `overlayYearIconStyle` | `view === "month"` |
| `.calendar__month-grid` | `div` | `monthGridClassName` | `monthGridStyle` | `view === "month"` |
| `.calendar__month-item` | `button` | `monthItemClassName` | `monthItemStyle` | `Always` |
| `.calendar__year-list` | `div` | `yearListClassName` | `yearListStyle` | `view === "year"` |
| `.calendar__year-item` | `button` | `yearItemClassName` | `yearItemStyle` | `Always` |
| `.calendar__info` | `div` | `infoClassName` | `infoStyle` | `error` |
| `.calendar__error-message` | `div` | `errorClassName` | `errorStyle` | `error` |
| `.rdp-caption_label` | `button` | `captionClassName`, `captionClassName` | `captionStyle`, `captionStyle` | `Always` |

State/variant selectors: `.calendar--disabled`, `.calendar--multiple`,
`.calendar--readonly`, `.calendar__day-picker--calendar`, `.calendar__label--error`,
`.calendar__month-item--selected`, `.calendar__year-item--selected`.

Use the [stylesheet](../../src/components/Calendar/Calendar.styles.css) for pseudo-elements
and state selectors. For shared field/listbox parts, also inspect the shared styles linked
from the implementation. Consumer content and third-party generated internals retain their
own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<Calendar labelWrapperClassName="example-calendar" labelWrapperStyle={{ outlineOffset: 4 }} label="Appointment" mode="single" defaultValue={new Date(2026, 9, 16)} language="en-US" />
```

```css
.example-calendar {
  outline-offset: 4px;
}
.example-calendar:focus-visible {
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

- [calendar baseline recipe](../../src/design-systems/neus/generated/recipes/calendar.css)

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--calendar-accent` | calendar accent | `var(--color-primary)` |
| `--calendar-caption-size` | calendar caption size | `15px` |
| `--calendar-day-radius` | calendar day radius | `50%` |
| `--calendar-day-size` | calendar day size | `36px` |
| `--calendar-divider-width` | calendar divider width | `1px` |
| `--calendar-header-padding` | calendar header padding | `16px 24px` |
| `--calendar-item-radius` | calendar item radius | `6px` |
| `--calendar-label-size` | calendar label size | `1em` |
| `--calendar-min-width` | calendar min width | `325px` |
| `--calendar-multiple-min-width` | calendar multiple min width | `625px` |
| `--calendar-radius` | calendar radius | `var(--radius-default)` |
| `--calendar-today-ring` | calendar today ring | `inset 0 0 0 1px var(--color-primary)` |
| `--calendar-weekday-size` | calendar weekday size | `var(--fs-sm)` |

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--calendar-background` | calendar background | `var(--color-surface)` |
| `--calendar-border-color` | calendar border color | `var(--color-border-input)` |
| `--calendar-border-width` | calendar border width | `1px` |
| `--calendar-caption-color` | calendar caption color | `var(--color-primary-text)` |
| `--calendar-color` | calendar color | `var(--color-text-primary)` |
| `--calendar-divider-color` | calendar divider color | `var(--color-border-subtle)` |
| `--calendar-label-color` | calendar label color | `var(--color-control-text)` |
| `--calendar-nav-color` | calendar nav color | `var(--color-primary-text)` |
| `--calendar-range-edge-background` | calendar range edge background | `var(--color-primary)` |
| `--calendar-range-edge-color` | calendar range edge color | `var(--color-text-on-primary)` |
| `--calendar-range-middle-background` | calendar range middle background | `var(--color-primary-light)` |
| `--calendar-range-middle-color` | calendar range middle color | `var(--color-text-primary)` |
| `--calendar-shadow` | calendar shadow | `none` |
| `--calendar-today-color` | calendar today color | `var(--color-primary-text)` |
| `--calendar-weekday-color` | calendar weekday color | `var(--color-text-secondary)` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--calendar-caption-weight` | calendar caption weight | `700` |
| `--calendar-day-font-size` | calendar day font size | `var(--fs-sm)` |
| `--calendar-font-family` | calendar font family | `var(--font-body)` |
| `--calendar-label-weight` | calendar label weight | `500` |
| `--calendar-today-weight` | calendar today weight | `700` |

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--calendar-day-hover-background` | calendar day hover background | `var(--color-surface-hover)` |
| `--calendar-disabled-opacity` | calendar disabled opacity | `0.6` |
| `--calendar-error-color` | calendar error color | `color-mix(in srgb, var(--color-error) 65%, var(--color-text-primary))` |
| `--calendar-focus-color` | calendar focus color | `var(--color-focus)` |
| `--calendar-selected-background` | calendar selected background | `var(--color-primary-light)` |
| `--calendar-selected-color` | calendar selected color | `var(--color-primary-text)` |
| `--calendar-selected-shadow` | calendar selected shadow | `none` |
| `--calendar-selected-weight` | calendar selected weight | `700` |

### Shared dependencies and runtime values

`--theme-color-scheme`.

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
  --calendar-day-radius: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Calendar story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
