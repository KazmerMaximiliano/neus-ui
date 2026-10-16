# Clock

```tsx
<Clock value={time} onChange={setTime} format="12h" />
```

`value` contains `hours` and `minutes`. The AM/PM state follows controlled values;
the dial supports keyboard interaction. Use `disabled` or `readonly` to prevent
time changes.

## Presentation

| API | Behavior |
| --- | --- |
| `segmentStyle / periodStyle / numberStyle / indicatorStyle` | independent CSSProperties overrides |

Uses all six recipes through ThemeProvider in light and dark mode. See
[Theming](../theming.md) for provider setup and scoped customization.

In Storybook, `designSystem` follows the same pattern as Button: a select with
the six design systems, defaulting to **Neus**, applied through a local
ThemeProvider in the story render. Light/dark follows the global toolbar.
This preview control is not a component prop.

Dial labels render above the indicator. A clipped foreground keeps only the part
of a number covered by the tip in its contrasting color, including minutes between
five-minute marks. `--clock-hand-text-color` controls that foreground; the selected
label retains `--clock-selected-color`. Shared animated geometry keeps the text and
indicator aligned, with reduced-motion support.
