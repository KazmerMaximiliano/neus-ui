# Calendar

DayPicker-based calendar with six recipes, accessible month/year pickers and
independent visible-month and selection controls.

| Prop | Type / default | Purpose |
| --- | --- | --- |
| `language` | `string`; en-US | BCP 47 language tag for Gregorian date text; native Intl, no additional dependencies |
| `mode` | single (default), range, multiple | Discriminates value and callback types |
| `value`, `defaultValue` | Date / DateRange / Date[] according to mode | Controlled or initial selection |
| `onChange` | Matching value type or undefined | Selection changes; multiple can emit an empty array |
| `numberOfMonths` | `number`; 1 | Visible months, independent of mode |
| `required` | `boolean`; false | Prevent removing the last required selection |
| `name`, `label`, `error` | `string` | Form serialization and accessible descriptions |
| `disabled`, `readonly` | `boolean` | Prevent selection changes |
| `yearRange` | `{ from: number; to: number }` | Year picker bounds |
| `calendarStyle`, `labelStyle`, `errorStyle` | `CSSProperties` | Independent part overrides |

```tsx
<Calendar mode="range" value={range} onChange={setRange} numberOfMonths={2} />
<Calendar mode="multiple" defaultValue={dates} required />
```

Explicit `value={undefined}` clears a controlled selection.
Changing mode normalizes an incompatible prior value
before passing it to DayPicker. On narrow screens multi-month grids can scroll.

In Storybook, `designSystem` follows the same pattern as Button: a select with
the six design systems, defaulting to **Neus**, applied through a local
ThemeProvider in the story render. Light/dark follows the global toolbar.
This preview control is not a component prop.
The day grid fills the available content width with seven equal columns. Day
buttons stay centered and retain their recipe geometry when the surface is resized.

Storybook's dark-mode chrome is scoped to documentation tables, so it does not
replace calendar surfaces, weekday text or range bands. The preview keeps the
recipe's default width unless `calendarStyle` supplies a different width.
The date container grows to fit all six week rows without vertical scrolling;
horizontal scrolling remains available for multiple months on narrow screens.


## Language

```tsx
<Calendar language="es-AR" />
<Calendar language="fr-FR" />
```

The first localization option uses native `Intl.DateTimeFormat` and
`Intl.RelativeTimeFormat`: no package installation or language dictionaries are
required. It formats month names, captions, weekdays, day numbers, years and
date/navigation ARIA labels. Consumer labels and errors remain consumer content.
The default is `en-US`; malformed or unsupported language tags fall back to
`en-US`, making server and client defaults deterministic.

The date arithmetic and displayed months remain Gregorian, including languages
whose default calendar differs. The week still starts on Sunday. Changing
`language` preserves selection and the open month/year view. Serialization remains
ISO. Month-name overrides are unnecessary for this implementation.

Static defaults live in `Calendar.consts.ts`; locale-derived month names are
computed by `Calendar.utils.ts` and memoized by the component.
