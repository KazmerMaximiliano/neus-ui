# Neus rules for the audit

Apply the Vercel Web Interface Guidelines with these adjustments. Re-check
the Library section against the component guides
(`node_modules/neus-ui/docs/components/<Name>.md`) when the library version
changes: library fixes remove entries.

## neus-ui lint (pass 1)

`npx neus-ui lint <files> --json` checks the neus contract mechanically. Each
entry in `findings` is a finding with the severity it carries; read the line
before reporting it, since the checks are per-line patterns. Its rules:

| Rule | Severity | What it means |
| --- | --- | --- |
| `unknown-token` | P0 | `var(--x)` without fallback names no neus token and no project declaration |
| `raw-color` | P0 | Hex, rgb, hsl or oklch outside `neus.overrides.css` |
| `palette` | P0 | A hand-written palette variable (`npx neus-ui init` owns them) |
| `inline-color` | P0 | Inline background, color or border on an interactive component |
| `private-class` | P0 | A selector on a neus class no guide documents |
| `important` | P0 | `!important` |
| `deep-import` | P0 | An import from a `neus-ui/…` path that is not a public entry |
| `theme-owner` | P0 | A global ThemeProvider the rendering mode does not allow |
| `raw-element` | P1 | A raw element a neus component replaces |
| `app-shell` | P1 | A Sidebar with a hand-made header, or an overridden sidebar background: use AppTemplate |
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
- Popover wires its trigger with `aria-haspopup="dialog"`, `aria-expanded`
  and `aria-controls`; its panel is a named non-modal dialog on the top layer
  that flips to stay on screen, moves focus inside on opening, and closes on
  Escape (focus back to the trigger), an outside click or Tab out. Flag a
  hand-made floating panel (`popover` attribute, absolutely positioned
  `div` toggled by state) and a Popover used for a list of actions (Menu)
  or for a task that must be finished first (Modal).
- Tooltip gives its trigger `aria-describedby`, shows on hover after 150ms and at
  once on keyboard focus, can be hovered itself, and closes on Escape without
  moving focus (WCAG 1.4.13); touch does not show it. Flag a hand-made
  `role="tooltip"`, a `title` attribute used as a tooltip on a control, a
  tooltip that replaces an icon button's name, and links or buttons inside a
  tooltip (Popover).
- Combobox is an Input with `role="combobox"`, `aria-autocomplete="list"` and
  `aria-activedescendant`: focus stays in the field while the arrows move
  through the options, and leaving the field keeps an exact match or the last
  choice. Flag a hand-made autocomplete (a text input over a list of buttons or
  a `<datalist>`) and a Select used where people must type to find a value.
- Tabs follows the WAI-ARIA tabs pattern: a named `tablist`, tabs with
  `aria-selected` and `aria-controls`, labelled panels, one tab in the Tab
  sequence, and arrow keys, Home and End that move and select. Flag a
  hand-made `role="tablist"` or a row of buttons that swaps content, and Tabs
  used for steps that follow an order (Stepper) or for page navigation.
- Breadcrumbs is a named `nav` around an ordered list whose last item carries
  `aria-current="page"` and is not a link; its separators are silent for
  screen readers. Flag a hand-made trail (links joined by "/" or "›" text, a
  `nav` labelled "Breadcrumb") and a trail that repeats the history of pages
  visited instead of the hierarchy.
- Pagination is a named `nav`: page buttons named "Page N" with
  `aria-current="page"` on the current one, ellipses hidden from screen
  readers, previous and next disabled at the ends, and a polite live position
  in the compact variant. DataTable renders the compact one. Flag hand-made
  previous/next or numbered page buttons, and page labels left in English on a
  page in another language.
- Accordion is native `details` and `summary`: it opens with the keyboard and
  without JavaScript, the browser opens it to show a find-in-page match, and
  `type="single"` shares a `name` so one item stays open. FAQ renders it with
  the questions as headings. Flag a hand-made disclosure (a button toggling
  a hidden panel, a raw `details` list) and FAQ answers hidden in a Modal.
- PricingCard writes the plan name as a heading, the price and period as one
  line and the features as a list with decorative checks; PricingTable is a
  `ul` of them with aligned actions. Flag prices composed from loose Cards
  and a featured plan marked only by color.
- Built-in texts are English: accessible names and fallbacks such as "Open
  menu", "Previous page", "No results", "Hours" or "Menu". On a page in another
  language, flag every one left in English; each has a prop (`labels`,
  `paginationLabels`, `searchBarPlaceholder`, Stepper `texts`, Dropdown
  `label`, Menu `text`). Dates and day names follow `language` on Calendar,
  DateInput and WeekCalendar.
- Field components (Input, Textarea, Combobox, Select, MultiSelect, DateInput, TimeInput) render
  their own `<label>` from `label`, mark `required` with an asterisk and
  `aria-required`, and wire `description` and errors to `aria-describedby`.
  Flag "Required" or "Obligatorio" written as a hint instead of `required`. Flag a field only when it has neither `label` nor
  `aria-label`.
- Input forwards native attributes (`autoComplete`, `inputMode`,
  `spellCheck`, `pattern`…): flag a missing one on Input like on a raw
  `<input>`.
- Switch is a native checkbox with `role="switch"` inside its label: its name
  is the label alone and its description is wired to `aria-describedby`; it
  works and submits without JavaScript. Flag a hand-made toggle (a `div` or
  `button` with `role="switch"` or `aria-pressed` for a setting) and a Switch
  used for a choice that only applies after a submit button.
- RadioGroup is a `<fieldset role="radiogroup">` named by its legend, with
  `aria-required`, `aria-invalid` and its description and error wired to
  `aria-describedby`; it gives its Radios a shared name, so the arrow keys move
  the choice and it submits without JavaScript. Radio also works alone: radios
  that share a `name` outside a RadioGroup need their own named fieldset. Flag a
  hand-made radio (`role="radio"` or `role="radiogroup"` on a `div`), a raw
  `<input type="radio">`, and a Select or checkboxes for a single choice
  among two to five options that should stay visible.
- Textarea is a native `<textarea>` with Input's look; `rows`, `maxRows` and
  `autoResize` size it in whole lines through CSS. Flag a raw `<textarea>` and
  hand-made growth (a `scrollHeight` handler on input).
- Button, Sidebar and AppTemplate items with `href` render links with
  `aria-current="page"` on the active item. Flag navigation built with
  `onClick` and `window.location` where an `href` would do.
- SiteHeader renders a `banner`, a labelled `nav`, a skip link and a native
  popover menu that closes on Escape and on a followed link; SiteFooter a
  `contentinfo` with one labelled `nav` per column; Hero, CallToAction and
  Section with `aria-labelledby` are named regions; Testimonial is a
  `figure` with `blockquote` and `q`. Check `labels` are in the project's
  language.
- Heading separates the document level (`as`) from the look (`size`): judge
  heading order by `as`. Section with `aria-labelledby` is a region landmark;
  Text with `lines` keeps the full text in the DOM.
- MediaPlaceholder is one `role="img"` named by `label`, with the visible
  label and the photo credit hidden from assistive technology. Its Pixabay
  preview fetches only in the browser and keeps the placeholder while it
  loads, when nothing matches and on errors.
- Spinner with `label` is a polite `role="status"` with that text visually
  hidden; without `label` it is `aria-hidden`. It slows down, never stops,
  under reduced motion. Button and IconButton `loading` already render one
  with `aria-busy`: flag a Spinner placed inside a button, and flag a
  hand-made spinner (a rotating border, an animated SVG) or an unlabelled
  Spinner with no other announcement of the wait.
- Progress is a named `role="progressbar"` with `aria-valuenow`, `aria-valuemin`
  and `aria-valuemax` (none while indeterminate) and `valueText` as
  `aria-valuetext`; the visible value is hidden from assistive technology.
  Stepper's linear mode already renders one. Flag a raw `<progress>`, a
  hand-made `role="progressbar"` and a Progress with no name.
- Skeleton is always `aria-hidden` and stands still under reduced motion. Flag
  a loading region with skeletons but no `aria-busy`, and focusable controls
  inside a skeleton.
- ToastProvider announces toasts through two persistent live lists (polite and
  assertive) in a labelled region; every toast has a named close button and
  pauses while hovered or focused. Flag a hand-made toast or snackbar (a fixed
  box with `aria-live` or a `setTimeout` that removes it), several
  ToastProviders, `live: "assertive"` for anything but a blocking error, and a
  toast with an action that closes in under five seconds.
- Buttons and fields ship hover, focus-visible and disabled styles through
  recipe tokens. Flag project CSS or `*Style` props that remove or override
  them.

## Project language overrides

- Replace the guidelines' "Title Case for headings and buttons" with sentence
  case in every language, English included: headings, buttons, labels and
  menu items. Flag Title Case as a `guidelines` finding.
- Typography rules (`…`, curly quotes, non-breaking spaces) apply in every
  language, with the quote marks of that language.
- Dates, times, numbers and currency use `Intl.*` with the project's locale.

## Neus contract rules (tag `neus`)

- Only tokens that exist (component guides and `docs/design/tokens.md`), only
  documented parts, only public entries (`"neus-ui"`, `"neus-ui/theme"`, the
  stylesheet).
- Palette variables are never written by hand; `npx neus-ui init` owns them.
- The brand block in `neus.overrides.css` sets only ground, ink, border,
  font and button-label tokens (the neus-design skill's `references/brand.md`),
  in light and dark, with ink at 4.5:1 or more on both grounds.
- No inline background, color or border on interactive components.
- One global theme owner per document (see the neus-design skill's
  `references/frameworks.md`).
- `pixabayKey` is the development-only expression `npx neus-ui context` prints,
  never a literal key or an unguarded variable: the key is visible in the
  browser. A Pixabay preview is not a final picture; its MediaPlaceholder
  stays marked `SAMPLE:`.

## Library limitations (report once, tag `library`)

- Button labels in the Neus system are uppercase with wide tracking by
  design; this is a system decision, not a project finding.
- MediaPlaceholder previews Pixabay's 640 px photo, which looks soft in wide
  frames; it is a design-time preview, not the delivered picture.
