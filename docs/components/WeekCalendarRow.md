# WeekCalendarRow

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Category and event row used by WeekCalendar.

## Usage

```tsx
import { ThemeProvider, WeekCalendarRow } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <WeekCalendarRow entry={{ category: { title: "Team", label: "Work" }, events: [{ title: "Planning", start: new Date(2026, 9, 16), end: new Date(2026, 9, 18) }] }} days={Array.from({ length: 7 }, (_, i) => new Date(2026, 9, 16 + i))} color="blue" hoverContent={(event) => <span>{event.title}</span>} />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

The caller supplies the seven days and an EventsByCategory entry. Color resolves the named
category colors purple/pink/red/yellow/blue/green or a supplied CSS color into
--category-color. Events render empty/single/start/continue/end cells; eventStyle and
eventClassName cover both event bars and content. Long events show extra details. Cells
become keyboard/click targets when callbacks/content are available. Enter/Space activate
event callbacks, focus/pointer movement shows the tooltip, and Escape/blur/leave hides it.
Runtime duration and tooltip position variables are applied before consumer styles.

## Props

Date bounds are inclusive and normalized to local midnight. Each day uses the first matching
event in the entry; overlapping events are not stacked.

See [the type
source](../../src/components/WeekCalendar/components/WeekCalendarRow/WeekCalendarRow.types.ts)
and
[implementation](../../src/components/WeekCalendar/components/WeekCalendarRow/WeekCalendarRow.tsx)
for the exact contract. All customization props are optional and default to undefined unless
noted; section style props retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `categoryClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__category-cell` |
| `categoryInfoClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__category-info` |
| `categoryInfoStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__category-info` |
| `categoryNameClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__category-name` |
| `categoryNameStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__category-name` |
| `dayCellClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__day-cell` |
| `dayCellStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__day-cell` |
| `eventAvatarClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__event-avatar` |
| `eventAvatarStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__event-avatar` |
| `eventClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__event--single/start/continue/end`, `.week-calendar-row__event-content` |
| `eventDescriptionClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__event-description` |
| `eventDescriptionStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__event-description` |
| `eventInfoClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__event-info` |
| `eventInfoStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__event-info` |
| `eventTitleClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__event-title` |
| `eventTitleStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__event-title` |
| `tooltipClassName` | `string` | Omitted | Additional classes on `.week-calendar-row__hover-tooltip` |
| `className` | `string` | Omitted | Additional classes on `.week-calendar-row` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row` |
| `categoryStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__category-cell` |
| `eventStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__event--single/start/continue/end`, `.week-calendar-row__event-content` |
| `tooltipStyle` | `CSSProperties` | Omitted | Inline styles on `.week-calendar-row__hover-tooltip` |
| `entry` | `EventsByCategory` | Required | Category and events |
| `days` | `Date[]` | Required | Displayed calendar dates |
| `color` | `string` | Required | Category accent |
| `hoverContent` | `((event: CalendarEvent) => React.ReactNode)` | Omitted | Informational tooltip on hover or focus |
| `onEventClick` | `((event: CalendarEvent) => void)` | Omitted | Mouse and keyboard event activation |

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/WeekCalendar/components/WeekCalendarRow/index.ts). A type
shown here is not necessarily a package export.

```ts
type EventsByCategory = {
  category: Category;
  events: CalendarEvent[];
};

type Category = {
  color?: string;
  title: string;
  label: string;
};

type CalendarEvent = {
  id?: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
};
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.week-calendar-row` | `div` | `className` | `style` | `Always` |
| `.week-calendar-row__category-cell` | `div` | `categoryClassName` | `categoryStyle` | `Always` |
| `.week-calendar-row__category-name` | `p` | `categoryNameClassName` | `categoryNameStyle` | `Always` |
| `.week-calendar-row__category-info` | `p` | `categoryInfoClassName` | `categoryInfoStyle` | `Always` |
| `.week-calendar-row__day-cell` | `div` | `dayCellClassName` | `dayCellStyle` | `Always` |
| `.week-calendar-row__event--single/start/continue/end` | `div` | `eventClassName` | `eventStyle` | `hasEvent` |
| `.week-calendar-row__event-content` | `div` | `eventClassName` | `eventStyle` | `showContent` |
| `.week-calendar-row__event-avatar` | `span` | `eventAvatarClassName` | `eventAvatarStyle` | `showContent` |
| `.week-calendar-row__event-info` | `div` | `eventInfoClassName` | `eventInfoStyle` | `showDetails && event` |
| `.week-calendar-row__event-title` | `span` | `eventTitleClassName` | `eventTitleStyle` | `showDetails && event` |
| `.week-calendar-row__event-description` | `span` | `eventDescriptionClassName` | `eventDescriptionStyle` | `event.description` |
| `.week-calendar-row__hover-tooltip` | `div` | `tooltipClassName` | `tooltipStyle` | `hoverContent && tooltip` |

State/variant selectors: `.week-calendar-row__category-cell--with-point`,
`.week-calendar-row__day-cell--clickable`, `.week-calendar-row__event--continue`,
`.week-calendar-row__event--end`, `.week-calendar-row__event--single`,
`.week-calendar-row__event--single/start/continue/end`, `.week-calendar-row__event--start`.

Use the
[stylesheet](../../src/components/WeekCalendar/components/WeekCalendarRow/WeekCalendarRow.styles.css)
for pseudo-elements and state selectors. For shared field/listbox parts, also inspect the
shared styles linked from the implementation. Consumer content and third-party generated
internals retain their own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<WeekCalendarRow categoryClassName="example-week-calendar-row" categoryStyle={{ outlineOffset: 4 }} entry={{ category: { title: "Team", label: "Work" }, events: [{ title: "Planning", start: new Date(2026, 9, 16), end: new Date(2026, 9, 18) }] }} days={Array.from({ length: 7 }, (_, i) => new Date(2026, 9, 16 + i))} color="blue" hoverContent={(event) => <span>{event.title}</span>} />
```

```css
.example-week-calendar-row {
  outline-offset: 4px;
}
.example-week-calendar-row:focus-visible {
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

`--category-color`, `--color-focus`, `--color-primary`, `--event-duration`,
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

Related composition: [WeekCalendar](./WeekCalendar.md).

The single WeekCalendarRow story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
