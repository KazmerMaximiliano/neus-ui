# TimeInput


## Presentation contract (2026-10-15)

| API | Behavior |
| --- | --- |
| `variant / labelPlacement / size / panelStyle` | shared Input presentation and picker panel styles |

Uses all six recipes through ThemeProvider in light and dark mode. See the
[migration guide](../refactor-migration.md) for examples and breaking changes.

With a floating label (Material's default), an empty field hides its placeholder
at rest to avoid overlapping text. Focusing the field or opening the picker raises
the label and reveals the placeholder. External labels and fields without a label
keep their placeholder visible.

In Storybook, `designSystem` follows the same pattern as Button: a select with
the six design systems, defaulting to **Neus**, applied through a local
ThemeProvider in the story render. Light/dark follows the global toolbar.
This preview control is not a component prop.
