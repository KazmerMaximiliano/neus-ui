# Projects that use neus-ui

neus-ui is the owner's component library and AI design kit. In a project that
uses it, neus-ui decides everything visual and this skill decides how the code
is written. Read this file before writing UI code in such a project. Where it
and the rest of this skill disagree, this file wins.

## Contents

1. Detecting it
2. Who decides what
3. Styling
4. Code around neus components
5. Hosts
6. Validation

## 1. Detecting it

- `neus.config.json` at the project root, or `neus-ui` in the dependencies of
  `package.json`.
- `npx neus-ui init` writes `neus.config.json`, installs the `neus-design` and
  `neus-audit` skills and the `neus-reviewer` subagent in the project, and adds
  a managed block to `AGENTS.md`. That block is a project rule (precedence 2).
- The CLI is `npx neus-ui <command>` from neus-ui 2.0. Version 1.x ships the
  same commands as `npx neus <command>`, so check the installed version.
- When neus-ui is a dependency but `neus.config.json` is missing, `neus-ui init`
  has not run and its skills are not installed. Say so to the user, and take
  visual answers from the library's guides in `node_modules/neus-ui/docs/`.

## 2. Who decides what

| Question                                                            | Decided by                                                                                                    |
| :------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------ |
| Which component renders, with which props and variants              | `neus-design`                                                                                                 |
| Palette, ground and ink, type, spacing, radius, motion, button case | The design contract (`neus.config.json`, the system's DESIGN.md, `neus.overrides.css`), through `neus-design` |
| Theme and dark mode                                                 | neus-ui: one theme owner per document                                                                         |
| What the copy says                                                  | `neus-design` (real copy from the domain)                                                                     |
| Where the copy lives (locale files, props)                          | This skill                                                                                                    |
| How big a Next.js client boundary is                                | `neus-design`: one Client Component per interactive screen                                                    |
| Where that file lives, its name and sidecars                        | This skill (§5)                                                                                               |
| File layout, names, types, imports, exports, tests, architecture    | This skill                                                                                                    |

Before writing a screen or changing how something looks, load `neus-design`
and follow its steps (`npx neus-ui context`, `npx neus-ui docs <Name>`). Never guess
a neus prop, part or token name: its guide lists them.

## 3. Styling

neus-ui's rules replace these parts of `styling.md`:

- **Tokens.** Use only tokens neus documents (the component guides and
  `node_modules/neus-ui/docs/design/tokens.md`) or that the project declares in
  `neus.overrides.css`. Do not start a token stylesheet of your own, and write
  no hex, rgb or hsl outside `neus.overrides.css`. Palette variables belong to
  `npx neus-ui init`; never write them by hand.
- **BEM** still names the project's classes. The block is the project
  component, and a class handed to a neus part is one of its elements
  (`checkout-form__email` on Input's `inputClassName`). Never select a neus
  class that its guide does not document.
- **Part styles.** `*Style` props (`buttonStyle`, `wrapperStyle`) are allowed
  where neus-design's customization ladder allows them: one static property on
  one part. They are not the inline styles this skill forbids.
- **No `!important`**, not even against third-party CSS.
- **Theme.** No ThemeProvider, `data-theme` attribute or dark-mode script of
  your own. Who owns the theme depends on the rendering mode (neus-design's
  `references/frameworks.md`).

## 4. Code around neus components

- `neus-ui`, `neus-ui/sections` and `neus-ui/theme` are external packages:
  import group 1. Import only those public entries and the library stylesheet,
  never a deeper path. The component's own `.styles.css` stays last.
- neus-design's page patterns are composition skeletons squeezed into one file.
  Keep their components and props, and write the code with this skill: the
  props type in `.types.ts`, constant arrays such as `QUOTES` in `.consts.ts`,
  copy through the project's i18n or props, subparts in `components/`, and the
  tests this skill asks for.
- Copy for neus props (`label`, SiteHeader `labels`, DataTable empty texts)
  follows the i18n rules like any other string.
- Keep neus-design's `// SAMPLE:` markers above the code that declares or
  renders sample content: `neus-ui lint` lists them so they get replaced before
  launch.
- Files that `npx neus-ui init` writes keep its names and places, outside the
  folder contract: `neus.config.json`, `src/neus/NeusRoot.tsx` and
  `neus.theme.ts`, `src/layouts/NeusLayout.astro`, and `neus.theme.css` and
  `neus.overrides.css` in the styles folder. Never edit the installed
  `neus-*` skills or the managed block in `AGENTS.md`, because `neus-ui init`
  rewrites them.
- Tests query neus components by role and label like your own. Components that
  call `useTheme()` or `useColors()` need a ThemeProvider in the test's render
  helper (`testing.md` §4).

## 5. Hosts

- **Vite.** `NeusRoot` wraps the app once in the entry and is the only global
  theme provider. Do not add another.
- **Next.js.** neus-design sizes the client boundary: a screen whose neus
  components need functions (handlers, `linkComponent`, `cellRenderer`) gets
  one Client Component for the whole screen, and the data loads in the route.
  That component is this skill's page view: `views/OrdersPage/OrdersPage.tsx`
  with `"use client"` in profile B, or
  `features/<feature>/presentation/pages/OrdersPage/` in profile C. The thin
  `app/**/page.tsx` loads the data and passes it as props. This replaces "the
  smallest interactive component" (`nextjs.md` §3) for neus screens. Load the
  system's faces with `next/font` and map them to neus's `--font-*` in
  `neus.overrides.css`.
- **Astro.** `NeusLayout.astro` owns the document: theme attributes, fonts and
  stylesheets. Pages use it instead of a `BaseLayout` of your own. Neus
  components without handlers render as static HTML with no directive; an
  interactive region is an island with the directives in `astro.md` §3
  (`client:idle` above the fold, `client:visible` below). An app screen is one
  React component per page with one directive.
- **Laravel + Inertia.** neus-ui documents no Inertia setup. Follow the
  `rendering` value in `neus.config.json` and the matching section of
  neus-design's frameworks reference.

## 6. Validation

- Run `npx neus-ui lint` on the changed files with the other checks, and fix every
  P0. It ships with the library, so it counts as the project's own tooling.
- The visual review (`npx neus-ui shot`, the audit, the reviewer) belongs to
  neus-design's workflow, not to this skill.
