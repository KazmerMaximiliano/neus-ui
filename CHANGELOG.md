# Changelog

All notable changes to Neus UI are documented in this file. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project follows
[Semantic Versioning](https://semver.org/spec/v2.0.0.html); see the
[versioning policy](./docs/contributing/releasing.md#versioning-policy) for what counts as a
breaking change.

## [Unreleased]

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

[Unreleased]: https://github.com/KazmerMaximiliano/neus-ui/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/KazmerMaximiliano/neus-ui/releases/tag/v1.0.0
