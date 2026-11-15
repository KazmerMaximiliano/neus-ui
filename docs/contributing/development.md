# Development

[Documentation index](../README.md)

## Commands

Use `pnpm` for all repository commands.

Keep `vitest`, `@vitest/browser-playwright`, and `@vitest/coverage-v8` on matching 4.x
versions for `@storybook/addon-vitest` 10.6.0. TypeScript is restricted to `~6.0.3` because
`typescript-eslint` 8.69.0 requires a version below 6.1.0. Run `pnpm peers check` after
dependency updates.

### Development

```bash
pnpm install
pnpm dev
pnpm storybook
pnpm preview
```

### Library build

```bash
pnpm build
pnpm build:types
```

### Interactive component catalog

```bash
pnpm build-storybook
```

The static catalog is written to `storybook-static/`. Written documentation lives under
docs/ as Markdown and has no build step.

### Design-system sources

```bash
pnpm design:generate
pnpm design:check
pnpm design:watch
```

Edit the six `src/design-systems/<id>/DESIGN.md` documents and commit their generated
artifacts. Development and build commands generate before starting. Run the watcher in a
second terminal for continuous editing; CI checks committed outputs before building. See
[Design systems](./design-system-authoring.md) for the YAML extension, scoped resets and
validation policy.

### Tests and quality

```bash
pnpm test
pnpm test:unit
pnpm test:design-systems
pnpm test:watch
pnpm test:coverage
pnpm lint
```

## Code Style Guidelines

Neus UI uses strict TypeScript conventions and component file boundaries. New components
must follow the established directory structure:

```text
ComponentName/
├── index.ts                 # named re-exports other modules import
├── ComponentName.tsx
├── ComponentName.types.ts
├── ComponentName.styles.css
├── ComponentName.test.tsx
├── ComponentName.stories.tsx
├── ComponentName.consts.ts  # required when declaring constants
├── ComponentName.utils.ts   # optional
└── components/             # owned internal and public parts, when needed
```

The tree above shows the single-file case. For multiple test files, replace the root test
file with a `tests/` directory containing all tests for that component. See
[Testing](./testing.md#test-structure) for both layouts.

Core rules:

- Use named exports for components. Storybook metadata uses a default export.
- Every folder module has an `index.ts` that re-exports by name, never with `export *`.
  Other modules import the folder (`../Button`, `./components/CardHeader`), never a file
  inside it; files inside a folder import each other directly, never through their own or an
  ancestor's `index.ts`.
- A family `index.ts` exports its components, their public types and the internals a sibling
  family needs (`FieldDescriptionProps`, `getButtonClasses`). `src/components/index.ts`,
  `src/sections/index.ts` and `src/templates/index.ts` list the public names explicitly, so
  those internals never reach the package. Add a new public name to both barrels.
- Hooks, utilities and services stay one flat file until they gain types, constants or a
  test; then they become a folder with an `index.ts` (`hooks/useResponsive/`,
  `utils/hexToRgb/`).
- Put all owned rendering subcomponents in `ComponentName/components/`, following Stepper. Small internal parts can be direct files; parts with their own supporting files (types included) use `components/PartName/` with an `index.ts`. Public sections (CardHeader, ModalHeader, WeekCalendarRow) follow the full component conventions in those directories and remain exported from the family index.
- Shared internal parts keep one owner: TimeInput reuses DateInput's PickerField, Dropdown reuses MenuItems, and MultiSelect reuses SelectListbox. Contexts, hooks, types, constants and utilities keep their dedicated files outside `components/`.
- Keep props and shared types in `ComponentName.types.ts`. Use `type`, never `enum` or a
  convenience `interface`; every prop is `readonly` and received arrays are `readonly T[]`.
  Type-only imports use `import type`.
- Keep styles in `ComponentName.styles.css`; use theme CSS variables.
- Declare static arrays, defaults, selectors, key maps and stable configuration in `ComponentName.consts.ts`, with named UPPER_SNAKE_CASE exports. Use `.consts.ts`, not `.constants.ts`. Derived values, hooks, contexts and mutable runtime state stay with their owning logic.
- Generate localized date text with native Intl or expose consumer configuration; do not hardcode user-facing month names in one language.
- Keep a single test file beside the component. When multiple test files are needed, place all of them in `ComponentName/tests/`, retaining descriptive filenames.
- Public sections have their own tests and stories. Small internal parts can reuse parent styles and types and be exercised by the parent's tests without exposing extra public stories.
- Use ES module imports and follow the project import order: React and external
  packages, internal modules from the farthest relative path to the nearest, `import type`,
  the module's own `.consts` and `.utils`, then CSS with its own `.styles.css` last. Keep the
  import block contiguous, without blank lines between declarations or categories.
  Multiline import declarations are allowed.
- Prefer semantic React Testing Library queries over implementation details.
- Keep components typed, focused, and compatible with React 19+.

Recommended import order:

```text
import { useState } from "react";
import { Plus } from "lucide-react";
import { useColors } from "../../hooks/useColors";
import { Button } from "../Button";
import type { ComponentNameProps } from "./ComponentName.types";
import { getComponentClasses } from "./ComponentName.utils";
import "./ComponentName.styles.css";
```

Style components with CSS variables:

```css
.component-name {
  background-color: var(--color-primary);
  border: 1px solid var(--color-border-light);
  color: var(--color-white);
}

.component-name:hover {
  background-color: var(--color-primary-light);
}
```

## Testing

See [Testing](./testing.md) for test structure, browser setup, coverage, and commands.
Install Chromium before running the browser suites:

```bash
pnpm exec playwright install chromium --only-shell
```

## Maintaining documentation

Use getting-started/ for onboarding, design/ for consumption and customization, components/
and templates/ for API references, and contributing/ for maintenance. Every folder has a
README index. Keep guides in English. Each public guide must cover complete props, defaults,
anatomy, class/style destinations, states, tokens and examples. Update stories and tests
alongside the implementation.


- Keep project guides in `docs/` as `.md` files.
- Add each new guide to the [documentation index](../README.md).
- Use relative links with an explicit `.md` extension.
- Use standard Markdown headings, tables, lists, and fenced code examples.
- Update guides alongside changes to public APIs, commands, or component behavior.
- Keep the root README as the project overview and entry point to these guides.

Open the files directly in GitHub or a Markdown editor. Storybook remains the interactive
catalog for component previews and prop controls.

The [Storybook deployment workflow](../../.github/workflows/deploy-storybook.yml) publishes
the catalog to GitHub Pages on pushes to `main` or a manual run. The published `/storybook/`
URL stays the same, and the Pages root redirects to it. Documentation is read from this
repository's `docs/` directory.

Repository instructions for agents live in [AGENTS.md](../../AGENTS.md).
