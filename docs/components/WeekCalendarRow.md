# WeekCalendarRow

The public row component belongs to the WeekCalendar family. Its implementation,
styles, types, tests and story live in
`src/components/WeekCalendar/components/WeekCalendarRow/`; applications keep
importing `WeekCalendarRow` and its public types from `neus-ui`.

Event cells support Enter/Space activation and show tooltip details on focus;
Escape dismisses details. See [WeekCalendar](./WeekCalendar.md) for navigation
and event display behavior.

## Presentation

| API | Behavior |
| --- | --- |
| `style / categoryStyle / eventStyle / tooltipStyle` | row and per-part CSSProperties; optional className |

Uses all six recipes through ThemeProvider in light and dark mode. See
[Theming](../theming.md) for provider setup and scoped customization.

In Storybook, `designSystem` follows the same pattern as Button: a select with
the six design systems, defaulting to **Neus**, applied through a local
ThemeProvider in the story render. Light/dark follows the global toolbar.
This preview control is not a component prop.
