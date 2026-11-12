# Changelog

All notable changes to Neus UI are documented in this file. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project follows
[Semantic Versioning](https://semver.org/spec/v2.0.0.html); see the
[versioning policy](./docs/contributing/releasing.md#versioning-policy) for what counts as a
breaking change.

## [Unreleased]

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

[Unreleased]: https://github.com/KazmerMaximiliano/neus-ui/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/KazmerMaximiliano/neus-ui/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/KazmerMaximiliano/neus-ui/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/KazmerMaximiliano/neus-ui/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/KazmerMaximiliano/neus-ui/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/KazmerMaximiliano/neus-ui/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/KazmerMaximiliano/neus-ui/releases/tag/v1.0.0
