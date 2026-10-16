# Clock


## Presentation contract (2026-10-15)

| API | Behavior |
| --- | --- |
| `segmentStyle / periodStyle / numberStyle / indicatorStyle` | independent CSSProperties overrides |

Uses all six recipes through ThemeProvider in light and dark mode. See the
[migration guide](../refactor-migration.md) for examples and breaking changes.

In Storybook, `designSystem` follows the same pattern as Button: a select with
the six design systems, defaulting to **Neus**, applied through a local
ThemeProvider in the story render. Light/dark follows the global toolbar.
This preview control is not a component prop.

Dial labels render above the indicator. A clipped foreground keeps only the part
of a number covered by the tip in its contrasting color, including minutes between
five-minute marks. `--clock-hand-text-color` controls that foreground; the selected
label retains `--clock-selected-color`. Shared animated geometry keeps the text and
indicator aligned, with reduced-motion support.
