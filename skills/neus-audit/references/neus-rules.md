# Neus rules for the audit

Apply the Vercel Web Interface Guidelines with these adjustments. Re-check
the Library section against the component guides
(`node_modules/neus-ui/docs/components/<Name>.md`) when the library version
changes: library fixes remove entries.

## neus lint (pass 1)

`npx neus lint <files> --json` checks the neus contract mechanically. Each
entry in `findings` is a finding with the severity it carries; read the line
before reporting it, since the checks are per-line patterns. Its rules:

| Rule | Severity | What it means |
| --- | --- | --- |
| `unknown-token` | P0 | `var(--x)` without fallback names no neus token and no project declaration |
| `raw-color` | P0 | Hex, rgb, hsl or oklch outside `neus.overrides.css` |
| `palette` | P0 | A hand-written palette variable (`npx neus init` owns them) |
| `inline-color` | P0 | Inline background, color or border on an interactive component |
| `private-class` | P0 | A selector on a neus class no guide documents |
| `important` | P0 | `!important` |
| `deep-import` | P0 | An import from a `neus-ui/…` path that is not a public entry |
| `theme-owner` | P0 | A global ThemeProvider the rendering mode does not allow |
| `raw-element` | P1 | A raw element a neus component replaces |
| `filler`, `emoji` | P1 | Filler copy; emoji used as icons |
| `third-party` | P1 | Selectors on AG Grid, react-day-picker or Google Maps internals |
| `stylesheet` | P1 | The library stylesheet imported in more than one file |

`coverage.percent` is the share of neus components among the elements neus
could render; report it with the findings. `samples` lists the `SAMPLE:`
blocks to replace before launch.

## Already handled inside neus components

Do not flag these on neus components themselves; flag them only on markup
the project wrote.

- IconButton uses its required `label` as `aria-label`.
- Modal is a native `<dialog>`: focus trapping and Escape come from the
  browser.
- Field components (Input, Select, MultiSelect, DateInput, TimeInput) render
  their own `<label>` from `label` and wire `description` and errors to
  `aria-describedby`. Flag a field only when it has neither `label` nor
  `aria-label`.
- Input forwards native attributes (`autoComplete`, `inputMode`,
  `spellCheck`, `pattern`…): flag a missing one on Input like on a raw
  `<input>`.
- Button, Sidebar and AppTemplate items with `href` render links with
  `aria-current="page"` on the active item. Flag navigation built with
  `onClick` and `window.location` where an `href` would do.
- Heading separates the document level (`as`) from the look (`size`): judge
  heading order by `as`. Section with `aria-labelledby` is a region landmark;
  Text with `lines` keeps the full text in the DOM.
- Buttons and fields ship hover, focus-visible and disabled styles through
  recipe tokens. Flag project CSS or `*Style` props that remove or override
  them.

## Project language overrides

- "Title Case for headings and buttons" applies only when `language` in
  `neus.config.json` is English. For Spanish and most other languages, use
  sentence case.
- Typography rules (`…`, curly quotes, non-breaking spaces) apply in every
  language, with the quote marks of that language.
- Dates, times, numbers and currency use `Intl.*` with the project's locale.

## Neus contract rules (tag `neus`)

- Only tokens that exist (component guides and `docs/design/tokens.md`), only
  documented parts, only public entries (`"neus-ui"`, `"neus-ui/theme"`, the
  stylesheet).
- Palette variables are never written by hand; `npx neus init` owns them.
- No inline background, color or border on interactive components.
- One global theme owner per document (see the neus-design skill's
  `references/frameworks.md`).

## Library limitations (report once, tag `library`)

- Button labels in the Neus system are uppercase with wide tracking by
  design; this is a system decision, not a project finding.
