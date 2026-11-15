# Code style

## Contents

1. TypeScript
2. Exports and modules
3. Imports
4. Extensions, aliases and barrels
5. Naming
6. Formatting
7. Comments

## 1. TypeScript

- Keep the project's strict configuration. Resolve type errors; do not suppress
  them with `@ts-ignore`, `@ts-expect-error`, `as any` or non-null assertions
  that hide a real gap.
- Never use `any`: not explicit, not through casts, not through generic
  defaults, not at third-party boundaries, not "temporarily". Use `unknown` for
  untrusted or unnarrowed values (API payloads, `JSON.parse`, `catch` errors,
  storage) and narrow them with a type guard or a validator before use.
- Use `type` for every definition. `interface` is allowed only when the feature
  needs declaration merging, which is essentially module augmentation:
  i18next's `CustomTypeOptions`, next-intl's `AppConfig`, Vite's
  `ImportMetaEnv`. Convenience or habit is not a reason.
- Never use `enum`. Model finite sets with string unions, and when you need the
  values at runtime, derive the union from a `const` array in `.consts.ts`:

  ```ts
  // Theme.consts.ts
  export const THEMES = ["light", "dark", "system"] as const;
  ```

  ```ts
  // Theme.types.ts
  import type { THEMES } from "./Theme.consts";

  export type Theme = (typeof THEMES)[number];
  ```

- Mark props and other immutable inputs `readonly`, collections `readonly T[]`.
  A `readonly T[]` input accepts mutable arrays, `readonly` arrays and `as const`
  tuples alike. Arrays a component creates and passes to a callback stay `T[]`
  (`onChange?: (values: string[]) => void`): the receiver owns the new array, and
  a `readonly string[]` parameter rejects a state setter such as `setSelected`.
- Use `import type` for every type-only import. Inline `type` specifiers are fine
  when a module provides both values and types
  (`import { createElement, type MouseEvent } from "react";`).
- Exported types and contracts live in `*.types.ts`. In a hexagonal app, the
  types of role files, hooks, utilities and server actions live in one file per
  layer
  (`<feature>.types.ts`, `<feature>.data.types.ts`,
  `<feature>.presentation.types.ts`; `architecture.md` §4).
- Prefer narrow, explicit return types on exported utilities and hooks. They
  document the contract and catch accidental widening.

## 2. Exports and modules

- Use named exports in every `.ts` and `.tsx` module, and declare components as
  arrow constants: `export const ProjectCard = (...) => { ... };`.
- Default exports are allowed only where the host requires them:
  - Next.js special files (`page`, `layout`, `loading`, `error`, `not-found`,
    `template`, `default`).
  - Inertia page files resolved by the page glob.
  - `.astro` components (Astro's own import semantics).
  - Storybook `meta`.
  - Modules that tools load through their default export: config files
    (`vite.config.ts`, `vitest.config.ts`, `astro.config.mjs`), Next.js
    `proxy.ts`, and next-intl's `i18n/request.ts`.

  Keep these files thin: import a named component and render or re-export it.
  The real code stays testable and greppable by name.

- For lazy loading, keep the named export and adapt at the call site:
  `lazy(() => import("./SettingsPage").then((m) => ({ default: m.SettingsPage })))`.
- Use ES modules only. Never use `require()` or `module.exports`.

## 3. Imports

One contiguous block with no blank lines between declarations, followed by one
blank line before the code. Multiline declarations are fine.

Order:

1. React and external packages.
2. Internal runtime modules: components, hooks, providers, services, domain
   values. Alias imports (`#core/…`, `@/…`) come first, then relative paths from
   the most distant (`../../`) to the nearest (`./components/…`).
3. `import type` statements.
4. The module's own `.consts`.
5. The module's own `.utils`.
6. CSS: shared stylesheets first, the component's own `.styles.css` last.

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "#core/presentation/components/Button";
import { useServers } from "../../hooks/useServers";
import { ServerRow } from "./components/ServerRow";
import type { ServerListProps } from "./ServerList.types";
import { PAGE_SIZE } from "./ServerList.consts";
import { sortServers } from "./ServerList.utils";
import "./ServerList.styles.css";
```

Why this order: external first and local last shows the dependency direction at
a glance, and putting CSS last isolates the only side-effect imports so they are
easy to spot. If an installed linter or formatter enforces a different order,
follow the tool.

## 4. Extensions, aliases and barrels

**Extensions.** Omit extensions in local imports (`./ProjectCard.types`). Vite,
Next.js, Astro and Laravel's Vite setup all resolve them. Include `.ts`/`.tsx`
only when the code runs in Node without a bundler (shared packages executed
directly, `node --experimental-strip-types` scripts) or when the project already
writes them consistently. Then also set `allowImportingTsExtensions`. CSS
imports always use the literal filename (`./ProjectCard.styles.css`).

**Aliases.** Use an alias only once the project has configured it:

- Prefer Node subpath imports in `package.json` (`"imports": { "#core/*":
"./src/core/*" }`). Node, Vite and TypeScript (`moduleResolution` `bundler` or
  `nodenext`) understand them without extra config. One gap: TypeScript does
  not resolve a folder's `index.ts` through `imports` (Vite does), so
  `#core/presentation/components/Button` fails to type-check. Mirror the
  pattern in `tsconfig` `paths` (`"#core/*": ["./src/core/*"]`, no `baseUrl`
  needed). That is the only config the barrels below require.
- If the framework already ships a `tsconfig` alias (Next.js and Laravel kits
  use `@/*`), use that one instead of adding a second.
- Cross-cutting `core` code is imported through the alias, never through long
  relative chains. Inside a module or feature, use relative imports.

**Module barrels.** Every folder module has an `index.ts`, and other modules
import the folder, so the name is not repeated (`@/components/ProjectCard`, not
`@/components/ProjectCard/ProjectCard`).

```ts
// components/ProjectCard/index.ts
export { ProjectCard } from "./ProjectCard";
export type { ProjectCardProps, ProjectCardTone } from "./ProjectCard.types";
```

- Which modules are folders:
  - Always: components, pages, templates, layouts and providers. They always
    have sidecars.
  - Only once they have a sidecar (types, constants, utils, styles or a
    colocated test): hooks, services, utilities, server actions and i18n setup
    (`i18n/`, `locales/`). Until then they stay one flat file without a barrel
    (`hooks/useProjects.ts`).
  - Never, in the hexagonal profile: role files (`*.useCase.ts`,
    `*.datasource.ts`, …), hooks, domain services, utilities and server
    actions. Their tests
    live in `test/`. Their types and constants go to the layer file
    (`<feature>.presentation.types.ts`, …), or to `core/` when other features
    share them (`architecture.md` §4).
- Promoting a flat file to a folder does not change its importers.
  `@/hooks/useProjects` resolves `useProjects.ts` and `useProjects/index.ts`
  alike.
- Re-export by name (`export { … }`, `export type { … }`) only what other
  modules use: the main export, its public types, and the constants or helpers
  a consumer needs. Never `export *` in a module barrel, because it publishes
  internals without anyone deciding to.
- Never import a file inside another module's folder. The one exception is the
  module's own tests, which may import its internal files (`testing.md` §2).
  Inside the folder, files import each other directly (`./ProjectCard.types`,
  `./components/Meta`) and never through their own `index.ts` or an ancestor's:
  that creates a cycle.
- `.astro` components are the exception to the barrel rule: their folder has no
  `index.ts` and they are imported by file (`environments/astro.md`).
- Each module barrel fronts a single module, so it does not have the costs of
  aggregating barrels.
- Code that runs in Node without a bundler cannot import a directory. There,
  import the barrel file explicitly (`./useProjects/index.ts`).

**Aggregating barrels** (`components/index.ts`, `utils/index.ts`, re-exporting
many modules) exist only as a library's public API: its package entry points and
public component families. In applications they hide the real dependency,
invite circular imports, and slow down dev servers and test runs that must load
every re-exported module. When you add a public component to a library, update
its family `index.ts` and the package entry in the same change.

## 5. Naming

| Item                                | Pattern                                     | Examples                                                                           |
| :---------------------------------- | :------------------------------------------ | :--------------------------------------------------------------------------------- |
| Components, their folders and files | PascalCase                                  | `ProjectCard/ProjectCard.tsx`                                                      |
| Pages                               | PascalCase + `Page`                         | `ProjectsPage`                                                                     |
| Templates                           | PascalCase + `Template`                     | `AppTemplate`                                                                      |
| Providers                           | PascalCase + `Provider`                     | `ToastProvider`                                                                    |
| Hooks                               | camelCase with `use` prefix                 | `useProjects.ts`                                                                   |
| Services and utility modules        | camelCase                                   | `policyLoader`, `formatDate`                                                       |
| Functions and variables             | camelCase                                   | `handleClick`, `effectiveDate`, `isLoading`                                        |
| Event props and their handlers      | `onX` props, `handleX` handlers             | `onDeploy` → `handleDeploy`                                                        |
| Constants                           | UPPER_SNAKE_CASE                            | `MAX_VISIBLE_TAGS`, `SUPPORT_EMAIL`                                                |
| Types                               | PascalCase; props are `<Component>Props`    | `ProjectCardProps`, `ProjectTone`                                                  |
| Sidecar files                       | `Name.<role>.ts`                            | `.types.ts`, `.consts.ts`, `.utils.ts`, `.styles.css`, `.test.tsx`, `.stories.tsx` |
| Hexagonal role files                | `<name>.<artifact>.ts`                      | `project.entity.ts`, `deployProject.useCase.ts`                                    |
| Hexagonal layer files               | `<feature>[.<layer>].<types\|consts>.ts`    | `projects.types.ts`, `projects.data.consts.ts`, `projects.presentation.types.ts`   |
| Feature folders                     | lowercase / camelCase                       | `projects`, `hardening`                                                            |
| Framework route files               | the framework's convention                  | `app/settings/page.tsx`, `privacy-policy.astro`                                    |
| CSS classes                         | kebab-case BEM                              | `project-card__name--muted`                                                        |
| CSS tokens                          | `--<category>-<name>`                       | `--color-surface`, `--space-4`                                                     |
| Locale files                        | `<feature>.json` (or `.ts`/`.php` per host) | `locales/es/projects.json`                                                         |

Use `.consts.ts` consistently, never `.constants.ts`.

## 6. Formatting

| Rule            | Value                   |
| :-------------- | :---------------------- |
| Indentation     | 2 spaces                |
| Semicolons      | always                  |
| Quotes          | double                  |
| Trailing commas | in multiline constructs |
| Line length     | 80–100 characters       |

An installed formatter or linter overrides this table. Never reformat files you
are not otherwise changing.

## 7. Comments

- Write a comment only when it explains a non-obvious _why_: a workaround, a
  browser quirk, a business rule, or the reason for an inline custom property.
- Comments are in English.
- No mandatory JSDoc, no comments that restate the code, and no commented-out
  code.
