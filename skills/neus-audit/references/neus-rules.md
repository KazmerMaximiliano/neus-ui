# Neus rules for the audit

Apply the Vercel Web Interface Guidelines with these adjustments. Re-check
the Library section against the component guides
(`node_modules/neus-ui/docs/components/<Name>.md`) when the library version
changes: library fixes remove entries.

## Searches (pass 1)

Run each over the audited files (`$FILES`). `neus.theme.css` is generated:
skip it. Every hit is a candidate; read the line before reporting it.

```sh
# P0 neus: hand-written palette variables
grep -nE -e '--color-(primary|success|error|info)[a-z-]*[[:space:]]*:' -e '--color-(text-on-[a-z-]+|focus)[[:space:]]*:' $FILES
# P1 neus: raw colors (allowed only in neus.overrides.css)
grep -nE '#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(' $FILES
# P0 neus: !important
grep -n '!important' $FILES
# P0 neus: deep imports (only "neus-ui", "neus-ui/theme" and the stylesheet)
grep -nE "from ['\"]neus-ui/" $FILES | grep -v 'neus-ui/theme'
# P1 neus: library stylesheet imported in more than one file
grep -rl 'neus-ui/dist/neus-ui.css' --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=dist .
# P1 neus: selectors on third-party internals (AG Grid, react-day-picker, Google Maps)
grep -nE '\.(ag|rdp|gm|pac)-[a-z]' $FILES
# P0 neus: inline color on interactive parts (single-line props; read multi-line JSX)
grep -nE '(buttonStyle|inputStyle|style)=\{\{[^}]*(background|color|border)' $FILES
# P0 neus: theme owners (spa: exactly one global; ssr, rsc, islands: only scope="local")
grep -rn '<ThemeProvider' --include='*.tsx' --include='*.jsx' --exclude-dir=node_modules .
# P1 taste: filler copy
grep -niE 'lorem ipsum|acme|john doe|jane doe|feature (one|two|1|2)|elevate your|seamless|unlock the power|welcome back' $FILES
# P1 taste: emoji as icons (ripgrep only; otherwise check by reading)
rg -n '\p{Extended_Pictographic}' $FILES
```

## Already handled inside neus components

Do not flag these on neus components themselves; flag them only on markup
the project wrote.

- IconButton uses its required `label` as `aria-label`.
- Modal is a native `<dialog>`: focus trapping and Escape come from the
  browser.
- Field components (Input, Select, MultiSelect, DateInput, TimeInput) render
  their own `<label>` from `label` and wire errors to `aria-describedby`.
  Flag a field only when it has neither `label` nor `aria-label`.
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
  documented parts, only `"neus-ui"` and `"neus-ui/theme"` imports.
- Palette variables are never written by hand; `npx neus init` owns them.
- No inline background, color or border on interactive components.
- One global theme owner per document (see the neus-design skill's
  `references/frameworks.md`).

## Library limitations (report once, tag `library`)

- Sidebar and AppTemplate `routes` items have `onClick` and no `href`, so
  navigation renders buttons, not links: no Cmd/Ctrl+click, middle-click or
  "open in new tab".
- Input does not accept `autoComplete`, `inputMode` or `spellCheck`, and
  does not pass through other native attributes, so the guidelines' form
  rules for those attributes cannot be met with neus Input.
- Button labels in the Neus system are uppercase with wide tracking by
  design; this is a system decision, not a project finding.
