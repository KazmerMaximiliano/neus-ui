---
name: neus-react
description: Conventions for writing React + TypeScript frontends the neus way — component folder contract (index.ts + Name.tsx + .types.ts + .styles.css + .consts.ts + .utils.ts), imports through folder barrels, colocated tests (a mirrored test/ tree in hexagonal projects), named exports, strict types with readonly props, contiguous imports with CSS last, BEM CSS on design tokens, Vitest + Testing Library, framework-native i18n, and responsibility folders by default (feature-first hexagonal only where the project already uses it). Covers React in Vite SPAs, Next.js App Router, Astro islands and Laravel + Inertia. Use this skill whenever you create, edit, refactor, review or scaffold React components, hooks, pages, providers, templates, styles, tests or Storybook stories, start a new React frontend or feature, or decide where a React file belongs — even if the user never mentions conventions, style or folder structure. Not for React Native, Vue, Svelte or backend-only work.
---

# neus-react

These are the owner's conventions for React + TypeScript frontends. They apply to React wherever it runs:
Vite, Next.js, Astro or Laravel + Inertia.

The goal is code that looks like it was written by one person across every
project: predictable file locations, small single-purpose files, explicit
contracts, and styling that flows from design tokens.

## Code, not visual design

This skill decides how the code is written: files and folders, names,
architecture, types, imports and exports, tests, and where copy lives. It makes
no visual decisions. Which components a screen renders, the palette, type,
spacing scale, layout, motion, theme and dark mode come from the project's
design source:

- **neus-ui**, when the project uses it (`neus.config.json` at the root, or
  `neus-ui` in `package.json`). Its `neus-design` skill and design contract
  decide everything visual. Read `references/neus-ui.md` before writing UI code
  there.
- **The `frontend-design` skill**, when it is installed and the project does
  not use neus-ui.
- **Otherwise, your judgment**, starting from what the project already has (its
  stylesheet, tokens and components) and the user's brief.

When the task involves a visual decision (a new screen, a restyle), load that
design skill too. Both then work on the same files: the design source says what
renders and how it looks; this skill says where that code lives and how it is
written. A `.styles.css`, for example, follows this skill (when it exists, BEM
names, where its tokens are declared), while its values and effects are the
design's.

## Precedence

When rules disagree, resolve them in this order:

1. An explicit instruction from the user in the current task.
2. The project's own `AGENTS.md` / `CLAUDE.md` and its enforced tooling: ESLint,
   formatter, `tsconfig`, `package.json` scripts. A linter that fails the build
   is a fact, not a suggestion.
3. neus-ui's skills and design contract, in projects that use neus-ui.
4. The `frontend-design` skill, when it is installed.
5. This skill.
6. Framework defaults and generators.

Apply the skill to the files you create or modify. Do not reformat, rename or
restructure unrelated code: drive-by refactors make reviews harder and hide the
real change. If existing code clearly deviates from these conventions, follow the
skill in your new files and mention the deviation to the user instead of fixing
it silently.

## Workflow

1. **Identify the host and the existing structure.** Look at `package.json`, the
   config files and the `src/` tree (or what the user describes). Mirror what
   is there. When there is no clear signal, use the responsibility-folders
   profile (see Architecture below).
2. **Plan the files before writing them.** For each component decide which
   sidecars have content: `.types.ts` when it has props or types, `.styles.css`
   when it styles something of its own, `.consts.ts`, `.utils.ts` and tests
   likewise, and a story when Storybook is configured or the user asks for one. Never create an empty file, and never invent props, types
   or CSS to justify one. Keep the change proportional to the request: a form is
   a component, a test and its copy, not a new layer. Every file your code will
   import must either exist already or be on this list.
3. **Write the code** following the core rules below. Open a reference only when
   the reading guide says so.
4. **Validate** with the scripts that actually exist in `package.json` (lint,
   typecheck, test, build). Never invent commands.
5. **Report** what you changed, which validations ran, and anything you could not
   validate because the tooling is not configured.

## Reading guide

The core rules below are enough for most work. References hold detail and
templates; each starts with a contents list, so jump to the section you need
instead of reading the whole file. Do not open a reference to re-confirm a rule
already stated here.

| Task                                                                | Read                                                                                |
| :------------------------------------------------------------------ | :---------------------------------------------------------------------------------- |
| Edit, fix or refactor existing code                                 | Nothing more. Follow the surrounding code and the core rules.                       |
| New component, page or hook in an existing project                  | Your host's environment file. Add `components.md` §5 if you want the full template. |
| User-facing text                                                    | `i18n.md` §1 plus your host's section only                                          |
| Writing tests                                                       | `testing.md` §2–4                                                                   |
| Writing stories or setting up Storybook                             | `storybook.md`                                                                      |
| New CSS beyond the core rules (theming, dynamic values, responsive) | The matching section of `styling.md`                                                |
| New feature, new project, or deciding where something lives         | `architecture.md` + your host's environment file                                    |
| Naming, alias or barrel questions                                   | The matching section of `code-style.md`                                             |
| Any UI code in a project that uses neus-ui                          | `neus-ui.md`, before the rows above                                                 |

Environment files: `references/environments/vite.md` (React Router SPA),
`nextjs.md` (App Router), `astro.md` (islands), `laravel-inertia.md`.

## Core rules

The references hold the details and rationale. This is the summary you should
keep in mind for every change.

### Component contract

Every component lives in its own PascalCase folder whose name matches the file:

```text
ProjectCard/
├── index.ts                  named re-exports: what other modules may import
├── ProjectCard.tsx           implementation, named export
├── ProjectCard.types.ts      props and exported UI types (when it has any)
├── ProjectCard.styles.css    BEM styles on design tokens (when it styles something of its own)
├── ProjectCard.consts.ts     static data and configuration (when needed)
├── ProjectCard.utils.ts      pure helpers (when needed)
├── ProjectCard.test.tsx      single test file beside it (profiles A and B)
├── ProjectCard.stories.tsx   its one story (with Storybook, or when asked)
└── components/               owned subcomponents (when needed)
```

- Only `index.ts` and `Name.tsx` always exist; every other file exists because
  it has content. A component without props has no `.types.ts` and no props
  type. One that only arranges other components, with no markup or classes of
  its own, has no `.styles.css`: three library buttons in a library row that
  all run the same action are just `index.ts` and `Name.tsx`. Never add a prop,
  a type or a CSS rule so that a file has something in it.
- With two or more test files, move **all** of them to `ProjectCard/tests/`;
  never mix root-level and grouped tests. (In the hexagonal profile, tests live
  in a `test/` tree instead; see Tests.)
- Subparts rendered by the component go in `components/`, not inline in the main
  `.tsx`. Pages (`XPage`) and templates (`XTemplate`) follow the same contract.
- Types never live in the implementation file; static data never lives in `.tsx`
  or `.utils.ts`. The suffix is `.consts.ts`, never `.constants.ts`.
- Other modules import the folder (`../ProjectCard`, `@/components/ProjectCard`),
  never a file inside it (tests excepted, see Tests). Inside the folder, files
  import each other directly
  (`./ProjectCard.types`), never through `index.ts`, which would create a cycle.

### Exports and modules

- Named exports only: `export const ProjectCard = (...) => { ... };`.
- Default exports appear only where a framework or tool demands them: Next.js
  special files, Inertia pages, `.astro` components, Storybook `meta`, and
  modules loaded by default export (configs, `proxy.ts`, next-intl
  `request.ts`). Keep those entry files thin: they import a named component and
  re-export or render it.
- ES modules only; never `require()`.
- **Module barrels.** Every folder module has an `index.ts` and is imported
  through it. Components, pages, templates and providers are always folders.
  Outside the hexagonal profile, hooks, services, utilities and server actions
  stay a single flat file
  (`hooks/useProjects.ts`) while they have nothing else. They become a folder
  with `index.ts` (`hooks/useProjects/`) once they gain any sidecar: types,
  constants, utils, styles or a colocated test. The import
  (`@/hooks/useProjects`) is the same either way. i18n setup folders follow the
  same rule (`./i18n`).
- In the hexagonal profile, role files (`createContact.useCase.ts`,
  `dns.datasource.ts`, …), hooks, domain services, utilities and server
  actions are always flat files. Their types and constants go to one file per layer:
  `<feature>.types.ts`, `<feature>.data.types.ts` or
  `<feature>.presentation.types.ts` (and the matching `.consts.ts`), or to
  `core/` when several features share them. See `architecture.md` §4.
- Aggregating barrels (`components/index.ts` re-exporting many modules) exist
  only as a library's public API.

### TypeScript

- Strict mode; fix type errors instead of suppressing them.
- `type` for every definition. Use `interface` only when declaration merging is
  required (module augmentation such as i18n or env typings).
- No `any`, explicit or implied. Use `unknown` and narrow it.
- No `enum`; model finite variants with string unions.
- Every prop is `readonly`; collections are `readonly T[]`. Arrays a component
  creates and passes to a callback stay `T[]`, so a state setter fits.
- Type-only imports always use `import type`.
- Destructure props in the signature with explicit defaults for optional visual
  or behavioral props. Never default a callback to a no-op. For discriminated
  union props, take `props` and destructure after narrowing.

### Imports

One contiguous block with no blank lines, in this order:

1. React and external packages.
2. Internal runtime modules: aliases first, then relative paths from far to near.
3. `import type` statements.
4. The module's own `.consts`.
5. The module's own `.utils`.
6. CSS: shared stylesheets first, then the component's own `.styles.css` last.

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "#core/presentation/components/Button";
import { StatusBadge } from "../StatusBadge";
import type { ProjectCardProps } from "./ProjectCard.types";
import { MAX_VISIBLE_TAGS } from "./ProjectCard.consts";
import { getProjectCardClasses } from "./ProjectCard.utils";
import "./ProjectCard.styles.css";
```

Omit file extensions in local imports by default. Include `.ts`/`.tsx` only when
the code runs in Node without a bundler or the project already writes them.

Every local import points to a file that exists or that the same change
creates. An import of a missing file breaks the build, and nothing in the diff
shows the reader that it is missing. Check before importing (list the folder,
read the file), and never import a path you only assume is there, such as a
`Header.types.ts` that an existing header "probably" has. When all you have is
a description of the project, only the files the user named exist. Create
everything else your code imports, or do without the import.

### Naming and formatting

- PascalCase: components, pages (`…Page`), templates (`…Template`), providers
  (`…Provider`), their folders and files, and every type (`…Props`).
- camelCase: functions, variables, hooks (`useX`), services and utility modules.
- UPPER_SNAKE_CASE: constants.
- kebab-case BEM for CSS classes; `--category-name` for tokens.
- Formatting: 2 spaces, semicolons, double quotes, trailing commas in multiline
  constructs, 80–100 columns. An installed formatter overrides this list.

### Styling

- A component's own styles live in its `.styles.css`, which it imports. A
  component with nothing of its own to style (its own markup, or classes it
  hands to another component's parts) has no stylesheet. No inline styles, no
  CSS-in-JS.
- BEM: block = component name in kebab-case, `block__element`,
  `block--modifier`. One root block per component. No standalone generic
  modifiers such as `.disabled`; use `--disabled`, `:disabled` or ARIA/data
  attributes.
- Every color, spacing value, radius, font and shadow comes from tokens in the
  single global stylesheet. New tokens and variants are defined there, never
  computed inside a component. Which tokens exist and what they are worth is
  the design source's call; this rule only fixes where they live.
- With neus-ui, its rules replace parts of this section: tokens come from neus,
  and `*Style` props are allowed where its ladder allows them (`neus-ui.md` §3).
- Dynamic runtime values are the only inline exception: pass a narrowly scoped
  CSS custom property through `style` and say why in a short comment.
- No IDs or `!important` for component styling; keep specificity low; keep focus
  visible.

### Tests

- Vitest + React Testing Library + `user-event` (`userEvent.setup()`), with
  semantic queries (role, label, visible text).
- Location follows the architecture: colocated as described above in libraries
  and responsibility folders; in feature-first hexagonal projects, a `test/`
  folder beside `src/` that mirrors its paths exactly
  (`test/features/projects/…/ProjectCard/ProjectCard.test.tsx`). `.test.tsx`
  when JSX is involved, `.test.ts` otherwise.
- A test may import the internal files of the module it tests (`.utils`,
  `.consts`), the one exception to importing through `index.ts`.
- A render helper that wraps providers (`renderWithIntl`) lives inside the
  test that uses it. Only when two or more test files share it does it move to
  a plain `renderWithIntl.tsx` beside the Vitest setup file (`testing.md` §4).
- Test observable behavior: meaningful render paths, every handler, accessible
  names and states, and the disabled/loading/empty/error states the component
  owns. Skip trivial tests that only repeat static markup and skip the
  Cartesian product of props.

### Storybook

- Write stories when the project has Storybook (`.storybook/`) or the user asks
  for them. Without Storybook, set it up first with the official installer
  (`storybook.md` §2); never add it on your own initiative.
- Each new component, template or page view gets one `Name.stories.tsx` beside
  it in every profile (the hexagonal `test/` tree holds only tests), with a
  single story named exactly like the component. Every prop goes in
  `argTypes` (control and description) and in `args` (a sensible default).
  Callbacks use `action` in `argTypes`, and the meta has `tags: ["autodocs"]`.
  The controls explore the states, so there are no extra stories.
- In a family of public subcomponents (a Card with CardHeader and CardContent),
  the parent's story composes the whole family. Each part has its own story,
  titled under the parent and rendered inside it.

### i18n

React components never hardcode user-facing strings. Where the copy comes from
depends on the project:

- **The project has i18n, or has more than one locale:** use it, through the
  host's native mechanism (i18next in Vite, next-intl in Next.js, an Astro typed
  dictionary, Laravel translations through Inertia). English is the default and
  fallback locale unless the user, the project's i18n config or the language of
  its current content says otherwise; adding a locale never changes the existing
  default. There is one file per feature per locale, and keys stay in parity. A
  project that already keeps one file per locale keeps it: add the feature's
  namespace there and suggest the split (`i18n.md` §1).
- **Single-locale project without i18n:** do not scaffold an i18n system. The
  copy lives in the parent that renders the component (an `.astro` file, a page,
  a route entry) or in a `.consts.ts`, and reaches the React component as props.
- **Libraries:** copy arrives through props or locale data.

### Architecture

An existing project keeps the structure it has. Otherwise:

- **Default: responsibility folders** (`components/`, `hooks/`, `services/`,
  `utils/` and so on), for any app or site.
- **Library** (published package, React as a peer dependency): a flat
  `components/` folder with public barrels.
- **Feature-first hexagonal** (`features/<feature>/{domain,data,presentation}` +
  `core/`): only when the project already uses it or the user asks for it.
  Never introduce entities, ports, use cases or services on your own initiative.

### Comments

Write comments only when they explain a non-obvious _why_, in English. No
mandatory JSDoc and no comments that restate the code. Markers that the
project's tooling reads, such as neus-ui's `// SAMPLE:`, count as a why.

## Never

- Default exports outside framework-mandated entry files.
- Deep imports into another module's folder (`ProjectCard/ProjectCard`) outside
  that module's tests.
- Imports of files that do not exist and that the change does not create.
- Types, constants or subcomponents declared inside the main `.tsx`.
- Inline styles (except scoped custom properties), CSS-in-JS, or a component
  styling another component's internals.
- Hardcoded UI copy, colors, spacing or radii.
- `any`, `enum`, convenience `interface`s, `@ts-ignore` or `eslint-disable` used
  to silence a real problem.
- New dependencies, global providers or abstractions without a current use case.
- Ignoring lint, type, test or build failures.

## Done checklist

- [ ] Each new component has `index.ts` and `.tsx`, plus only the files that
      have content: `.types.ts` when it has props or types, `.styles.css` when
      it styles something of its own. No empty files, and no props, types or
      CSS invented to fill one. Any other module with sidecars is a folder with
      `index.ts`, except in the hexagonal profile, where it stays flat and its
      types and constants go to the layer files.
- [ ] Modules are imported through their folder, never through files inside it.
- [ ] Every local import resolves to a file that exists or that this change
      created.
- [ ] Named exports; framework entry files are thin.
- [ ] `readonly` props, `import type`, no `any`/`enum`/convenience `interface`.
- [ ] One contiguous import block, CSS last.
- [ ] BEM classes on tokens; no hardcoded visual values; no inline styles.
- [ ] No user-facing text is hardcoded in React components. With i18n, every
      locale was updated.
- [ ] Interactive or conditional behavior is covered by tests in the profile's
      location (colocated, or the mirrored `test/` tree).
- [ ] With Storybook, or when stories were requested, each new component has
      its one story, and existing stories reflect changed props.
- [ ] Lint, typecheck, test and build ran where those scripts exist (plus
      `npx neus-ui lint` with neus-ui, and `build-storybook` when stories
      changed). Anything that could not run is reported.
- [ ] Project docs, inventories or public barrels updated if the project keeps them.
