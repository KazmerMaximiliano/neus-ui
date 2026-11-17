# Changelog

All notable changes to Neus UI are documented in this file. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project follows
[Semantic Versioning](https://semver.org/spec/v2.0.0.html); see the
[versioning policy](./docs/contributing/releasing.md#versioning-policy) for what counts as a
breaking change.

## [Unreleased]

## [2.6.0] - Unreleased

### Added

- Text fields with a floating label (Input, Textarea, DateInput, TimeInput) draw their border
  with a hidden fieldset, `.field__outline`, so the raised label sits in a gap of the border
  with nothing painted behind it. New input tokens: `--input-label-focus-color`,
  `--input-focus-border-width`, `--input-notch-outline-width`, `--input-notch-border-image`, and
  for the filled variant `--input-filled-border-color`, `--input-filled-radius`,
  `--input-filled-padding`, `--input-filled-label-top`, `--input-filled-label-translate` and
  `--input-filled-label-background`. Their Neus defaults keep every system's current look.
- Textarea wraps its field and outline in `.textarea__control`.
- Select and MultiSelect take the shared field props `variant`, `labelPlacement` and `size`, as
  Input, Textarea and the picker fields do. With a floating label (Material by default), the
  label rests inside the empty field and rises into the outline's gap once a value is chosen
  or the list opens; the placeholder hides until then.
- New tokens, with defaults that keep every other system's look: `--input-error-value-color`,
  `--input-label-hover-color`, `--input-filled-hover-background`, `--textarea-filled-radius`,
  `--button-outlined-shadow-hover` and `--sidebar-item-active-weight`.
- A floating label slides between its two positions instead of jumping, and the outline's gap
  opens with it: new tokens `--input-label-duration` and `--input-label-easing` (Material:
  150ms with its standard easing); no motion under `prefers-reduced-motion: reduce`.

### Changed

- Material follows the M3 baseline scheme and its text field, dialog and picker tokens
  (Material Web v0.192):
  - primary `#6750a4` (dark `#d0bcff`) and error `#b3261e` (dark `#f2b8b5`), instead of
    `#6442d6` and the Neus error red;
  - outlined fields have no fill and 56px of height; the label rests in body large and
    on-surface-variant, rises into the gap of the outline, and turns primary on focus, with a 2px
    primary outline instead of an inset shadow; supporting and error text are body small, 16px in
    from the edge, and errors use the error color;
  - the filled variant has top corners only and its label rises inside the container;
  - Select and MultiSelect float their label like the other fields, at 56px, also with tags
    (new token `--select-tag-margin-block`);
  - labels use the regular weight of body large and body small instead of medium;
  - an invalid field keeps its value in on-surface instead of red; an outlined field's label
    turns on-surface on hover; a filled field takes the 8% hover layer, and a filled Textarea
    rounds only its top corners;
  - filled and tonal buttons rise to level 1 on hover; outlined buttons stay flat; elevated
    buttons rest at level 1, rise to level 2 on hover and return to level 1 when pressed;
  - the sidebar is the standard navigation drawer: surface color, no shadow, 56px items with
    24px icons and a bold current item; the application shell's header sits on the surface and
    its content on surface-container-low;
  - dialogs, the calendar and the clock sit on the high surface container, the clock dial on the
    highest, and the selected hour or minute on the primary container; outlined cards use
    outline-variant and MultiSelect chips the outline color.

### Fixed

- The control of Radio, Checkbox and Switch lines up with the first line of its label and centers
  on its lowercase letters, instead of sitting 1–1.5px above them in every system.
- In Storybook and the browser tests, every design system now uses its own fonts and foundations:
  `src/css/app.css` imported the Neus foundations a second time, after the systems' overrides. The
  published stylesheet was not affected.
- Elevated buttons keep their shadow on hover and press: the shared hover and press rules
  replaced it with `--button-shadow-hover` and `--button-shadow-active`, which are `none` in Neus,
  Apple, Carbon and Vercel. New token `--button-elevated-shadow-active` (Neus: the resting
  shadow; Neobrutalism: the pressed 2px offset).

## [2.5.0] - Unreleased

### Added

- `Popover`: content anchored to a button in a non-modal `role="dialog"` panel on the top
  layer. `trigger` renders a Button or IconButton with the props it receives; four placements
  that flip to the other side or edge when the panel does not fit, Escape, outside clicks and
  Tab out close it, focus moves inside on opening and returns to the trigger on Escape, and
  it can be controlled. Every design system styles it through the new `popover` recipe
  family, which follows each system's overlay tokens.
- `Button` and `IconButton` forward native attributes (`aria-*`, `data-*`, `form`…) and their
  ref to the rendered element.

### Changed

- Menu, Dropdown, Select, MultiSelect, DateInput and TimeInput render their floating panel
  through the shared `.popover-panel`, which Popover uses too. Their look, classes and part
  props are unchanged. Their panels now open above the trigger, or from the other edge, when
  there is no room, and follow the text direction: a Menu in right-to-left text opens from
  the trigger's left edge.

## [2.4.0] - Unreleased

### Added

- `Radio`: a native radio with a label, optional help text and controlled or uncontrolled
  state. It works on its own, and inside a `RadioGroup` takes the group's name, choice,
  required and invalid states.
- `RadioGroup`: one choice among a few visible options, a `<fieldset role="radiogroup">` with a
  legend around `Radio` components, with arrow-key navigation, vertical or horizontal layout,
  help text, required and error states, and controlled or uncontrolled value.
- Every design system styles both through the new `radio` recipe family, which follows each
  system's checkbox tokens.

### Changed

- `neus-ui context` lists components, templates and sections by name under their catalog
  category, without a purpose per name; the need → component table and `neus-ui docs <Name>`
  still give the purposes. The output stays under 3000 tokens for every system.

### Fixed

- `pnpm design:watch` no longer misses a DESIGN.md saved right after it starts. `fs.watchFile`
  read each file's first state on the libuv thread pool, so under load a save could land
  before that read, become the first state and never trigger a regeneration. The watcher now
  reads the first state synchronously and polls itself at the same interval. This also made
  the generator test "keeps the last valid output and recovers after an atomic editor save"
  fail intermittently in CI.

## [2.3.0] - Unreleased

### Added

- `Switch`: an on/off setting that applies at once, a native checkbox with `role="switch"`,
  a label, optional help text and controlled or uncontrolled state. Every design system styles
  it through the new `switch` recipe family.

## [2.2.0] - Unreleased

### Added

- `Textarea`: multi-line text with Input's label, description, error, variant, size and label
  placement. `rows` sets its resting height in lines; `autoResize` lets it grow with its text up
  to `maxRows`. It reuses the `input` recipes; the new `--textarea-radius` caps Neus' pill at
  16px so a box of several lines stays a rounded rectangle.

## [2.1.0] - Unreleased

### Added

- `Spinner`: an indeterminate loading indicator, a ring or three dots in three sizes. With a
  `label` it is a polite status announced in the project's language; without one it is
  decorative. Every design system styles it through the new `spinner` recipe family.

### Changed

- Button and IconButton draw their loading dots with Spinner. They look the same and keep
  `.button-loader`, `.icon-button-loader`, `loaderClassName`, `loaderStyle` and the
  `--button-loader-*` tokens; under reduced motion the dots now pulse at half speed.
- `react-spinners` is no longer a dependency.

## [2.0.0] - 2026-11-15

The CLI is now `npx neus-ui`; see "Removed" for the one-step migration. Components, props,
tokens and package entries are unchanged apart from the stricter types under "Changed".

### Added

- In a terminal, every `neus-ui` command opens with a short animated NEUS banner with `/ui`
  beside it, followed by the version. Pipes, agents and `--json` get the output alone, as
  before. The `init` prompts now open with "Set up this project".

### Changed

- Props types are now `readonly`, including the arrays and data a component receives
  (`options: readonly SelectOption[]`, `SidebarItem`, `CalendarEvent`), so TypeScript reports
  code that mutates them. Mutable arrays, `readonly` arrays and `as const` tuples are all
  accepted, and callbacks still receive mutable arrays.
- **Breaking (types only):** `FileType` is no longer an `enum`: it is an object of the same
  values plus a union type of the same name, so `FileType.PNG` and `FileType[]` keep working
  and plain strings such as `".png"` are now accepted. A member can no longer be used as a
  type: replace `FileType.PNG` in a type position with `typeof FileType.PNG` or `".png"`.

### Removed

- **Breaking:** the CLI's `neus` bin is now `neus-ui`, matching the package name, so
  `npx neus-ui <command>` also works where neus-ui is not installed yet. The commands and
  flags are unchanged. To migrate, replace `npx neus` with `npx neus-ui` in scripts and docs,
  then run `npx neus-ui init` once: it rewrites the skills, the subagents and the `AGENTS.md`
  block, whose instructions still call `npx neus`.

## [1.3.0] - 2026-11-11

### Added

- `--site-header-sticky-backdrop-filter`: the filter behind a `sticky` SiteHeader, now a token
  of each system instead of a fixed blur.

### Changed

- A `sticky` SiteHeader is opaque with no blur in Neus and Neobrutalism, whose specifications
  rule out glass and blur. Apple, Carbon, Material and Vercel keep the translucent, blurred
  bar.

## [1.2.1] - 2026-11-11

### Changed

- The managed `AGENTS.md` block and the `neus-reviewer` subagent ask for a fresh-eyes review
  after a new public page, product or multi-screen flow (neus-design's full mode), as the
  skill does, instead of after any new page. Without a spec, the reviewer judges against the
  request.
- The neus-design framework rules say that Astro pages render neus components from `.astro`
  files without a directive, as its page patterns already did. The dialog pattern and the
  Modal, ModalHeader, Card and CardHeader guides no longer put a raw `<h2>` in the header:
  ModalHeader takes the title text and CardHeader a `Heading`.

### Fixed

- `neus lint` accepts custom properties declared through `next/font`'s `variable` option,
  also when only some files are linted, so the font mapping the skill recommends for
  Next.js no longer reports P0 unknown tokens.
- `neus shot` uses the dev server when the dev script starts it in the background and exits,
  as Astro 7 does in agent sessions, instead of asking for `--url`.

## [1.2.0] - 2026-11-11

### Changed

- The neus-design skill says how other skills in the session fit: general design skills such
  as `frontend-design` add criteria only, while the system, brand, palette, type and
  composition stay neus-design's decisions; code-style skills such as neus-react decide how
  the code is written. Its page patterns show composition, not code conventions.
- Astro islands above the fold hydrate with `client:idle` instead of `client:load`, which is
  kept for islands that must respond the moment the page appears.
- In Next.js App Router, the one Client Component per interactive screen lives where the
  project's code conventions put it, no longer in `app/`.
- The neus-audit skill asks for sentence case in every language, English included, instead of
  Title Case for English projects.
- The managed block that `npx neus init` writes in `AGENTS.md` states that neus-ui decides how
  the interface looks and that other design guidance only adds criteria, never a palette, a
  font, a token or the brand.

## [1.1.0] - 2026-10-21

### Added

- MediaPlaceholder previews a matching Pixabay photo while a page is designed: `pixabayKey`
  (development only) and `query` props, the `.media-placeholder__image` and
  `.media-placeholder__credit` parts with their class and style props, and the
  `--media-placeholder-credit-background`, `--media-placeholder-credit-color` and
  `--media-placeholder-transition` tokens. The placeholder stays while the photo loads, when
  nothing matches and on errors; answers are cached for 24 hours without the key.
- `npx neus context` names a Pixabay key found in the project's `.env` files (never its value)
  and the development-only expression to pass as `pixabayKey`.

### Changed

- The neus-design skill and the MediaPlaceholder guide allow a stock photo as a design-time
  preview and never as the final picture; previewed placeholders stay marked `SAMPLE:`. The
  neus-audit skill flags a literal or unguarded `pixabayKey`.

## [1.0.1] - 2026-10-21

### Changed

- Releases publish to npm through trusted publishing with provenance; no library changes.

## [1.0.0] - 2026-10-20

First public release on npm.

### Components and sections

- 40 React 19 components, counting public subcomponents: actions and status, fields and
  selection, date and time, surfaces and dialogs, navigation, data and location,
  typography and layout (Heading, Text, Container, Stack, Grid, Section), feedback and
  content (Alert, Avatar, AvatarGroup, MediaPlaceholder).
- `neus-ui/sections`: SiteHeader, Hero, SectionHeader, FeatureList, FeatureItem,
  TestimonialList, Testimonial, CallToAction and SiteFooter for public pages, server
  rendered, with a native popover menu in SiteHeader.
- AppTemplate (sidebar and header as one band, `headerStart`, `menu`) and FormTemplate
  (responsive field grid; a single action lines up with the field above it).
- Per-part `className` and `style` props on every component, polymorphic `as` where it keeps
  semantics, native attributes on Input, `description` and `required` on every field.

### Design systems

- Six token-driven systems, each specified in a Google DESIGN.md: Neus UI, Apple, Carbon,
  Material, Neobrutalism and Vercel, in light and dark, with scope isolation so systems can
  nest.
- A fluid display, headline and lead scale; a warning color in the runtime palette.
- `neus-ui/theme`: server-safe palette data and `buildThemeCss` for server-rendered hosts.

### AI design kit

- `npx neus init`: arrow-key setup of the system (or None), color scheme, action colors,
  language and agents; writes theme files for Vite, Next.js, React Router, TanStack Start
  and Astro, and installs the `neus-design` and `neus-audit` skills and the
  `neus-reviewer` subagent for Claude Code and Codex.
- `npx neus context` and `npx neus docs`: the active system, catalog and rules, and one
  component's guide, read from the installed package.
- `npx neus lint`: contract checks (unknown tokens, raw colors, palette variables, inline
  colors on interactive components, private classes, deep imports, theme owners, app
  shells), raw elements a component replaces, and component coverage.
- `npx neus shot`: full-page screenshots at 1440 and 390 px with overflow, clipped content,
  uneven form rows, body text size, fonts, console errors and solid buttons per viewport.
- None mode: `npx neus design build` compiles a project's derived DESIGN.md into
  `neus.system.css` on its base system; `npx neus specimen` writes a preview page.
- The `neus-design` skill asks one round of questions with the host's selector (brand,
  composition, pictures, missing facts), applies a brand on top of the system, builds with
  the components and sections, and checks its work with lint and screenshots.

### Documentation

- Guides for every component, section and template; customization, tokens and ThemeProvider
  guides; contributor guides, including adding a component end to end.
- Five reference examples with the pages the design skill produced, on a built-in system
  with a brand and on a derived system.

[Unreleased]: https://github.com/KazmerMaximiliano/neus-ui/compare/v2.0.0...HEAD
[2.6.0]: https://github.com/KazmerMaximiliano/neus-ui/compare/v2.5.0...v2.6.0
[2.5.0]: https://github.com/KazmerMaximiliano/neus-ui/compare/v2.4.0...v2.5.0
[2.4.0]: https://github.com/KazmerMaximiliano/neus-ui/compare/v2.3.0...v2.4.0
[2.3.0]: https://github.com/KazmerMaximiliano/neus-ui/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/KazmerMaximiliano/neus-ui/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/KazmerMaximiliano/neus-ui/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/KazmerMaximiliano/neus-ui/compare/v1.3.0...v2.0.0
[1.3.0]: https://github.com/KazmerMaximiliano/neus-ui/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/KazmerMaximiliano/neus-ui/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/KazmerMaximiliano/neus-ui/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/KazmerMaximiliano/neus-ui/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/KazmerMaximiliano/neus-ui/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/KazmerMaximiliano/neus-ui/releases/tag/v1.0.0
