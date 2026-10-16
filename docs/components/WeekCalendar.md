# WeekCalendar

WeekCalendar displays a seven-day window with one-day navigation. Event cells
support Enter/Space activation and tooltip details on focus; Escape dismisses
details. Events sharing a day use the first matching event, so the component does
not arrange overlapping events. Event accents are tinted against the active surface.

## Presentation

| API | Behavior |
| --- | --- |
| `style / headerStyle / navigationStyle / gridStyle / categoryStyle / eventStyle / tooltipStyle` | root and per-part CSSProperties; optional className |

Uses all six recipes through ThemeProvider in light and dark mode. See
[Theming](../theming.md) for provider setup and scoped customization.

In Storybook, `designSystem` follows the same pattern as Button: a select with
the six design systems, defaulting to **Neus**, applied through a local
ThemeProvider in the story render. Light/dark follows the global toolbar.
This preview control is not a component prop.
