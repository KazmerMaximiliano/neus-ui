# WeekCalendar

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Seven-day event view grouped by category.

## Usage

```tsx
import { ThemeProvider, WeekCalendar } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <WeekCalendar title="Schedule" events={[{ category: { title: "Team", label: "Work" }, events: [{ title: "Planning", start: new Date(2026, 9, 16), end: new Date(2026, 9, 18) }] }]} />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

Navigation shifts the visible seven-day interval by one day and calls onDayChange with the
new bounds. Events are grouped in EventsByCategory entries; each contains category
title/label/optional color and CalendarEvent values. Events use Date bounds, with optional
id and description. onEventClick receives the event. hoverContent supplies a tooltip for
pointer or keyboard focus.

The main component owns the header and day headings; WeekCalendarRow owns each
category/event row. Existing categoryStyle/eventStyle/tooltipStyle and their class
counterparts forward to rows. Other row internals are customized through WeekCalendarRow
directly or scoped CSS. The today heading uses aria-current date.

## Props

See [the type source](../../src/components/WeekCalendar/WeekCalendar.types.ts) and
[implementation](../../src/components/WeekCalendar/WeekCalendar.tsx) for the exact contract.
All customization props are optional and default to undefined unless noted; section style
props retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `dateRangeClassName` | `string` | Omitted | Additional classes on `.week-calendar__date-range` |
| `dateRangeStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar__date-range` |
| `categoryClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__category-cell` |
| `eventClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__event--single/start/continue/end`, `.week-calendar-row__event-content` |
| `tooltipClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__hover-tooltip` |
| `dayNameClassName` | `string` | Omitted | Additional classes on `.week-calendar__day-name` |
| `dayNameStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar__day-name` |
| `dayNumberClassName` | `string` | Omitted | Additional classes on `.week-calendar__day-number` |
| `dayNumberStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar__day-number` |
| `gridClassName` | `string` | Omitted | Additional classes on `.week-calendar__grid` |
| `headerCategoryCellClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__category-cell` |
| `headerCategoryCellStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__category-cell` |
| `headerClassName` | `string` | Omitted | Additional classes on `.week-calendar__header` |
| `headerDayCellClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__day-cell` |
| `headerDayCellStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__day-cell` |
| `headerRowClassName` | `string` | Omitted | Additional classes on `.week-calendar-row` |
| `headerRowStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row` |
| `navigationClassName` | `string` | Omitted | Additional classes on `.week-calendar__selector` |
| `titleClassName` | `string` | Omitted | Additional classes on `.week-calendar__title` |
| `titleStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar__title` |
| `className` | `string` | Omitted | Additional classes on `.week-calendar` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.week-calendar` |
| `headerStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar__header` |
| `navigationStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar__selector` |
| `gridStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar__grid` |
| `categoryStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__category-cell` |
| `eventStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__event--single/start/continue/end`, `.week-calendar-row__event-content` |
| `tooltipStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__hover-tooltip` |
| `title` | `string` | `"Calendar"` | The title displayed in the calendar header |
| `events` | `EventsByCategory[]` | `[]` | Array of event categories with their events |
| `hoverContent` | `((event: CalendarEvent) => React.ReactNode)` | Omitted | Render function called with the hovered CalendarEvent, returns a React node displayed as tooltip at the cursor position |
| `onEventClick` | `((event: CalendarEvent) => void)` | Omitted | Callback fired when clicking an event cell, receives the CalendarEvent |
| `onDayChange` | `((weekStart: Date, weekEnd: Date) => void)` | Omitted | Callback fired when navigating to a different day, receives weekStart and weekEnd dates |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.week-calendar` | `div` | `className` | `style` | `Always` |
| `.week-calendar__header` | `div` | `headerClassName` | `headerStyle` | `Always` |
| `.week-calendar__title` | `div` | `titleClassName` | `titleStyle` | `Always` |
| `.week-calendar__selector` | `div` | `navigationClassName` | `navigationStyle` | `Always` |
| `.week-calendar__date-range` | `span` | `dateRangeClassName` | `dateRangeStyle` | `Always` |
| `.week-calendar__grid` | `div` | `gridClassName` | `gridStyle` | `Always` |
| `.week-calendar-row` | `div` | `headerRowClassName` | `headerRowStyle` | `Always` |
| `.week-calendar-row__category-cell` | `div` | `headerCategoryCellClassName` | `headerCategoryCellStyle` | `Always` |
| `.week-calendar-row__day-cell` | `div` | `headerDayCellClassName` | `headerDayCellStyle` | `Always` |
| `.week-calendar__day-name` | `span` | `dayNameClassName` | `dayNameStyle` | `Always` |
| `.week-calendar__day-number` | `span` | `dayNumberClassName` | `dayNumberStyle` | `Always` |
| `.week-calendar-row__category-cell` | `WeekCalendarRow part` | `categoryClassName` | `categoryStyle` | `Each category row` |
| `.week-calendar-row__event--single/start/continue/end` | `WeekCalendarRow part` | `eventClassName` | `eventStyle` | `Event bars` |
| `.week-calendar-row__event-content` | `WeekCalendarRow part` | `eventClassName` | `eventStyle` | `Event start/single content` |
| `.week-calendar-row__hover-tooltip` | `WeekCalendarRow part` | `tooltipClassName` | `tooltipStyle` | `hoverContent and active hover/focus` |

State/variant selectors: `.week-calendar-row__category-cell--with-point`,
`.week-calendar-row__day-cell--clickable`, `.week-calendar-row__event--continue`,
`.week-calendar-row__event--end`, `.week-calendar-row__event--single`,
`.week-calendar-row__event--start`, `.week-calendar__day-cell--today`.

Use the [stylesheet](../../src/components/WeekCalendar/WeekCalendar.styles.css) for
pseudo-elements and state selectors. For shared field/listbox parts, also inspect the shared
styles linked from the implementation. Consumer content and third-party generated internals
retain their own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<WeekCalendar headerClassName="example-week-calendar" headerStyle={{ outlineOffset: 4 }} title="Schedule" events={[{ category: { title: "Team", label: "Work" }, events: [{ title: "Planning", start: new Date(2026, 9, 16), end: new Date(2026, 9, 18) }] }]} />
```

```css
.example-week-calendar {
  outline-offset: 4px;
}
.example-week-calendar:focus-visible {
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

- [week-calendar baseline recipe](../../src/design-systems/neus/generated/recipes/week-calendar.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--week-calendar-avatar-background` | week calendar avatar background | `var(--color-surface)` |
| `--week-calendar-background` | week calendar background | `var(--color-surface)` |
| `--week-calendar-border-color` | week calendar border color | `var(--color-border-subtle)` |
| `--week-calendar-border-width` | week calendar border width | `1px` |
| `--week-calendar-cell-border-width` | week calendar cell border width | `1px` |
| `--week-calendar-color` | week calendar color | `var(--color-text-primary)` |
| `--week-calendar-event-color` | week calendar event color | `var(--color-text-primary)` |
| `--week-calendar-shadow` | week calendar shadow | `none` |
| `--week-calendar-today-background` | week calendar today background | `var(--color-selection)` |
| `--week-calendar-today-color` | week calendar today color | `var(--color-on-selection)` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--week-calendar-cell-height` | week calendar cell height | `56px` |
| `--week-calendar-event-height` | week calendar event height | `46px` |
| `--week-calendar-event-radius` | week calendar event radius | `50%` |
| `--week-calendar-gap` | week calendar gap | `16px` |
| `--week-calendar-grid-min-width` | week calendar grid min width | `720px` |
| `--week-calendar-grid-padding` | week calendar grid padding | `3px` |
| `--week-calendar-muted` | week calendar muted | `var(--color-text-secondary)` |
| `--week-calendar-padding` | week calendar padding | `20px 24px` |
| `--week-calendar-radius` | week calendar radius | `var(--radius-default)` |
| `--week-calendar-title-size` | week calendar title size | `18px` |
| `--week-calendar-today-ring` | week calendar today ring | `inset 0 0 0 1px var(--color-primary-text)` |

### Shared dependencies and runtime values

`--category-color`, `--color-focus`, `--color-primary`, `--event-duration`, `--font-body`,
`--overlay-background`, `--overlay-border-color`, `--overlay-border-width`,
`--overlay-color`, `--overlay-item-padding`, `--overlay-radius`, `--overlay-shadow`,
`--tooltip-x`, `--tooltip-y`.

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
  --week-calendar-event-radius: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single WeekCalendar story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider. Public sections:
[WeekCalendarRow](./WeekCalendarRow.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
