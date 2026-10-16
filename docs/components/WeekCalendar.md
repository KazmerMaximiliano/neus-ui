# WeekCalendar


## Presentation contract (2026-10-15)

| API | Behavior |
| --- | --- |
| `style / headerStyle / navigationStyle / gridStyle / categoryStyle / eventStyle / tooltipStyle` | root and per-part CSSProperties; optional className |

Uses all six recipes through ThemeProvider in light and dark mode. See the
[migration guide](../refactor-migration.md) for examples and breaking changes.

In Storybook, `designSystem` follows the same pattern as Button: a select with
the six design systems, defaulting to **Neus**, applied through a local
ThemeProvider in the story render. Light/dark follows the global toolbar.
This preview control is not a component prop.
