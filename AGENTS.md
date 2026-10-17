# NEUS UI

## METADATA

NAME: Neus UI
TYPE: React UI Component Library
PRIMARY_LANGUAGE: TypeScript
TARGET_FRAMEWORK: React 19+
REPOSITORY: <https://github.com/KazmerMaximiliano/neus-ui>
DEFAULT_BRANCH: main
PACKAGE_MANAGER: pnpm

## PROJECT PURPOSE

Neus UI is a production-ready React component library that provides:

- 21+ reusable UI components
- Dynamic theming system with CSS variables
- TypeScript support with full type safety
- React hooks for theme and color management
- Pre-built templates for common layouts

## CRITICAL FACTS FOR AGENTS

### Immutable Project Rules

1. **Code Style MUST be enforced**: All code must follow the Code Style Guidelines section
2. **File Structure MUST match pattern**: Each component follows ComponentName/ directory structure
3. **Export Strategy MUST be named exports**: All components use `export const` pattern
4. **Props MUST be in separate .types.ts**: Type definitions separated from implementation
5. **Tests MUST stay inside the component directory**: one test file lives beside the implementation; multiple test files MUST all live in its `tests/` subdirectory
6. **Styles MUST use CSS files**: Separate .styles.css files with CSS variables
7. **No default exports**: Only use named exports throughout the project
8. **Component constants MUST use a dedicated file**: Static data and configuration belong in `ComponentName.consts.ts`, using named UPPER_SNAKE_CASE exports
9. **Subcomponents MUST live in `components/`**: Every internal or public part belongs in `ComponentName/components/`, following the Stepper pattern

### Restricted Operations

DO NOT perform these operations:

- Create default exports for components
- Mix styles with component implementation
- Put type definitions in component files
- Use inline styles instead of CSS variables
- Create components without corresponding tests
- Use CommonJS require() instead of ES6 imports
- Ignore ESLint configuration

### Allowed Operations

PERMITTED operations:

- Create new components following the file structure
- Modify existing components if they follow conventions
- Write tests for new and modified components
- Update documentation
- Refactor code while maintaining structure
- Update CSS variables
- Modify utility functions

## PROJECT STRUCTURE

```
neus-ui/
├── src/
│   ├── components/              [DIRECTORY] 21+ UI components
│   ├── templates/               [DIRECTORY] Pre-built layouts
│   ├── hooks/                   [DIRECTORY] Custom React hooks
│   ├── providers/               [DIRECTORY] Context providers
│   ├── css/                     [DIRECTORY] Global styles and variables
│   ├── utils/                   [DIRECTORY] Utility functions
│   ├── services/                [DIRECTORY] Auxiliary services
│   ├── tests/                   [DIRECTORY] Cross-library suites (server rendering)
│   ├── index.ts                 [FILE] Library entry point (`neus-ui`)
│   └── theme.ts                 [FILE] Server-safe entry (`neus-ui/theme`), no React or CSS
├── cli/                         [DIRECTORY] `neus` CLI (init, shot) and the project templates it writes
├── skills/                      [DIRECTORY] neus-design and neus-audit Agent Skills installed by `neus init`
├── agents/                      [DIRECTORY] neus-reviewer subagent for Claude Code (.md) and Codex (.toml)
├── .storybook/                  [DIRECTORY] Storybook configuration
├── package.json                 [FILE] Dependencies and scripts
├── vite.config.ts               [FILE] Build and test configuration
├── vitest.setup.ts              [FILE] Test environment setup
├── eslint.config.js             [FILE] Code linting rules
├── tsconfig.json                [FILE] TypeScript configuration
└── README.md                    [FILE] User-facing documentation
```

## COMPONENT FILE STRUCTURE

Every component MUST follow this pattern:

```
ComponentName/
├── ComponentName.tsx            [REQUIRED] Component implementation
├── ComponentName.types.ts       [REQUIRED] Type definitions
├── ComponentName.styles.css     [REQUIRED] Component styles
├── ComponentName.test.tsx       [REQUIRED if there is only one test file]
├── ComponentName.consts.ts      [REQUIRED when declaring static constants]
├── ComponentName.utils.ts       [OPTIONAL] Utility functions
├── ComponentName.stories.tsx    [REQUIRED] Storybook documentation
└── components/                 [WHEN NEEDED] Internal and public subcomponents
```

Keep at most one test file at the component root. If the component needs two or
more test files (behavior, utilities, types or stories), move **all** of them into
`ComponentName/tests/`; never mix root-level tests with grouped tests:

```text
ComponentName/
├── ComponentName.tsx
├── ComponentName.types.ts
├── ComponentName.styles.css
├── ComponentName.stories.tsx
├── ComponentName.consts.ts      [WHEN NEEDED]
├── ComponentName.utils.ts       [OPTIONAL]
└── tests/
    ├── ComponentName.test.tsx
    ├── ComponentName.utils.test.ts
    └── ComponentName.types.test.tsx
```

Retain descriptive filenames. Public subcomponents apply the same rule within
their own directories. Shared browser suites in `src/design-systems/tests/` and tests of
standalone utilities are separate from this component layout rule.

### Subcomponent structure

All rendering parts owned by a component live in its `components/` directory,
including parts previously declared inside the main implementation. A small
internal part can be a direct file, as in Stepper; a part with its own styles,
utilities, tests or stories uses a named directory inside `components/`:

```text
ComponentName/
├── index.ts
├── ComponentName.tsx
├── ComponentName.types.ts
├── ComponentName.styles.css
├── ComponentName.test.tsx
└── components/
    ├── InternalPart.tsx
    └── PublicSection/
        ├── PublicSection.tsx
        ├── PublicSection.types.ts
        ├── PublicSection.styles.css
        ├── PublicSection.test.tsx
        └── PublicSection.stories.tsx
```

Public sections follow the full component conventions, including the `tests/`
rule when multiple test files are needed. Small internal parts may reuse their
parent's separate types, styles and behavioral tests; do not create empty files
or public stories for internal implementation details. Dedicated internal types
still belong in `.types.ts`, never inside the implementation.

Shared internal parts keep one owning family: PickerField belongs to DateInput,
MenuItems to Menu, and SelectListbox to Select. Sibling families import these
implementations directly rather than duplicating them. Contexts, hooks, constants
and utilities are not rendering subcomponents and keep their dedicated files.
Templates follow the same rule if they introduce owned subcomponents.

Expose public sections through the owning family's `index.ts`; moving source
files must not change imports from `neus-ui` or expose internal parts. For example,
WeekCalendarRow lives under WeekCalendar but remains a named package export.

## COMPONENT INVENTORY

### Implemented Components and Public Subcomponents (30 total)

| NAME            | FILE_PATH                       | STATUS | FEATURES                                        |
| --------------- | ------------------------------- | ------ | ----------------------------------------------- |
| Badge           | src/components/Badge/           | STABLE | Solid/dot variants, 5 semantic colors           |
| Button          | src/components/Button/          | STABLE | Multiple variants, sizes (small/medium/large), loading state |
| Calendar        | src/components/Calendar/        | STABLE | Date picker                                     |
| Card            | src/components/Card/            | STABLE | Composable themed surface, semantic `as`, className and style |
| CardHeader      | src/components/Card/components/CardHeader/ | STABLE | Free-form header content and actions |
| CardMedia       | src/components/Card/components/CardMedia/  | STABLE | Polymorphic media with native/custom props and refs |
| CardContent     | src/components/Card/components/CardContent/ | STABLE | Content spacing with arbitrary children |
| CardFooter      | src/components/Card/components/CardFooter/ | STABLE | Wrapping footer content and actions |
| Checkbox        | src/components/Checkbox/        | STABLE | Indeterminate state                             |
| Clock           | src/components/Clock/           | STABLE | Time picker                                     |
| DataTable       | src/components/DataTable/       | STABLE | Sorting, pagination, filtering                  |
| DateInput       | src/components/DateInput/       | STABLE | Calendar picker field                                 |
| Dropdown        | src/components/Dropdown/        | STABLE | Dropdown menu                                   |
| FileUploader    | src/components/FileUploader/    | STABLE | Drag and drop                                   |
| IconButton      | src/components/IconButton/      | STABLE | Icon containers                                 |
| Input           | src/components/Input/           | STABLE | Seven native types, accessible errors, per-part styles, six token recipes |
| InteractiveMap  | src/components/InteractiveMap/  | STABLE | Google Maps integration                         |
| Link            | src/components/Link/            | STABLE | Styled links                                    |
| Menu            | src/components/Menu/            | STABLE | Actions menu                                    |
| Modal           | src/components/Modal/           | STABLE | Dialog boxes                                    |
| ModalHeader     | src/components/Modal/components/ModalHeader/ | STABLE | Dialog title and header composition |
| ModalContent    | src/components/Modal/components/ModalContent/ | STABLE | Dialog body composition |
| ModalFooter     | src/components/Modal/components/ModalFooter/ | STABLE | Dialog action composition |
| MultiSelect     | src/components/MultiSelect/     | STABLE | Multiple selection                              |
| Select          | src/components/Select/          | STABLE | Single selection                                |
| Sidebar         | src/components/Sidebar/         | STABLE | Six token recipes, transparent curves, tablet rail and mobile drawer |
| TimeInput       | src/components/TimeInput/       | STABLE | Clock picker field                                 |
| WeekCalendar    | src/components/WeekCalendar/    | STABLE | Weekly view, event categories, navigation       |
| WeekCalendarRow | src/components/WeekCalendar/components/WeekCalendarRow/ | STABLE | Event row with hover tooltip, click handler     |
| Stepper         | src/components/Stepper/         | STABLE | Dots/linear/simple variants, labels, step click |

### Implemented Templates (2 total)

| NAME         | FILE_PATH                   | STATUS | PURPOSE                                    |
| ------------ | --------------------------- | ------ | ------------------------------------------ |
| AppTemplate  | src/templates/AppTemplate/  | STABLE | Full application layout                    |
| FormTemplate | src/templates/FormTemplate/ | STABLE | Responsive field/action layout; consumer owns form validation and submission |

## COMMAND REFERENCE

### Development Commands

| COMMAND          | PURPOSE                      | BLOCKING |
| ---------------- | ---------------------------- | -------- |
| `pnpm install`   | Install all dependencies     | YES      |
| `pnpm dev`       | Start Vite dev server        | NO       |
| `pnpm storybook` | Start Storybook on port 6006 | NO       |
| `pnpm preview`   | Preview production build     | NO       |
| `pnpm design:generate` | Generate palettes and CSS from DESIGN.md | YES |
| `pnpm design:check` | Validate documents and check generated artifacts without writing | YES |
| `pnpm design:watch` | Regenerate when a DESIGN.md changes | NO |

### Build Commands

| COMMAND                | OUTPUT                          | TIME   |
| ---------------------- | ------------------------------- | ------ |
| `pnpm build`           | dist/ folder with compiled code | 5-10s  |
| `pnpm build:types`     | TypeScript declaration files    | 3-5s   |
| `pnpm build-storybook` | Static Storybook site           | 15-30s |

### Testing Commands

| COMMAND              | SCOPE           | MODE                  | OUTPUT                      |
| -------------------- | --------------- | --------------------- | --------------------------- |
| `pnpm test`          | All tests       | Single run            | Pass/fail                   |
| `pnpm test:unit`     | Unit tests only | Single run            | Pass/fail                   |
| `pnpm test:watch`    | All tests       | Watch mode            | Pass/fail + rerun on change |
| `pnpm test:coverage` | All tests       | Single run + coverage | coverage/ directory         |

### Quality Commands

| COMMAND      | PURPOSE          | SHOULD_PASS |
| ------------ | ---------------- | ----------- |
| `pnpm lint`  | Check code style | YES         |
| `pnpm test`  | Run all tests    | YES         |
| `pnpm build` | Build library    | YES         |

## CODE STYLE REQUIREMENTS

### TypeScript Conventions

#### Type Definitions MUST follow pattern

```typescript
// FILE: ComponentName.types.ts
type ComponentType = "type1" | "type2";
export type ComponentColor = "primary" | "success" | "error";

export type ComponentProps = {
  label: string;
  type?: ComponentType;
  color?: ComponentColor;
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
};
```

#### Component Implementation MUST follow pattern

```typescript
// FILE: ComponentName.tsx
import { useColors } from "../theme";
import "./ComponentName.styles.css";
import { ComponentProps } from "./ComponentName.types";
import { utilFunction } from "./ComponentName.utils";

export const ComponentName = ({
  label,
  type = "default",
  color = "primary",
  disabled = false,
  onClick,
}: ComponentProps) => {
  const colors = useColors();

  return (
    <element className="component-name">
      {label}
    </element>
  );
};
```

### Import Order MUST be

Keep imports contiguous: do not insert blank lines between import declarations,
including between the categories below. Multiline import declarations are allowed.

1. React and external dependencies
2. Internal components and hooks
3. CSS files
4. Type definitions
5. Local constants from ComponentName.consts.ts
6. Utility functions

CORRECT ORDER EXAMPLE:

```typescript
import React, { useState } from "react";
import { FiIcon } from "react-icons/fi";
import { Button } from "../Button/Button";
import { useColors } from "../theme";
import "./Input.styles.css";
import { InputProps } from "./Input.types";
import { validateInput } from "./Input.utils";
```

### Naming Rules

| ITEM_TYPE         | PATTERN          | EXAMPLES                     |
| ----------------- | ---------------- | ---------------------------- |
| Component files   | PascalCase       | Button.tsx, Modal.tsx        |
| Constant modules  | ComponentName.consts.ts | Calendar.consts.ts |
| Component exports | PascalCase       | Button, Modal                |
| Functions         | camelCase        | handleClick, getData         |
| Variables         | camelCase        | isLoading, errorMessage      |
| Constants         | UPPER_SNAKE_CASE | MAX_WIDTH, DEFAULT_COLOR     |
| CSS classes       | kebab-case       | button-primary, modal-header |
| Type names        | PascalCase       | ButtonProps, ComponentColor  |

Static module data (arrays, defaults, key maps, selectors and stable configuration
objects) MUST be declared in `ComponentName.consts.ts`, not inside `.tsx` or
`.utils.ts` files. Use `.consts.ts` consistently, not `.constants.ts`. Import these
values into the implementation or utilities. Types remain in `.types.ts`; helper
functions remain in `.utils.ts`. This rule does not move components, hooks,
contexts, refs, derived render values or mutable runtime registries into a
constants module. Consumer-facing language must be configurable or generated from
locale data rather than fixed to the developer's language.

### Code Formatting Rules

| RULE            | VALUE             | ENFORCEABLE        |
| --------------- | ----------------- | ------------------ |
| Indentation     | 2 spaces          | YES (ESLint)       |
| Line length     | 80-100 characters | NO (informational) |
| Semicolons      | Always required   | YES (ESLint)       |
| Quotes          | Double quotes     | YES (ESLint)       |
| Trailing commas | Multi-line only   | YES (ESLint)       |

### CSS Rules

MUST use CSS variables from theme system:

```css
.component-name {
  background-color: var(--color-primary);
  border: 1px solid var(--color-border-light);
  color: var(--color-white);
  padding: 8px 16px;
}

.component-name:hover {
  background-color: var(--color-primary-light);
}

.component-name.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## TESTING REQUIREMENTS

### Test File Pattern

TEST_FILE MUST:

- Live beside the component when it has a single test file; when it has multiple files, all MUST be in its `tests/` subdirectory
- Use `.test.tsx` for component/JSX tests or `.test.ts` for tests without JSX
- Export from vitest framework
- Cover rendering, interactions, and edge cases

### Test Structure Template

```typescript
// FILE: ComponentName.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { ComponentName } from "./ComponentName";

describe("ComponentName", () => {
  describe("rendering", () => {
    it("should render with label", () => {
      render(<ComponentName label="Test" />);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("should call onClick handler", async () => {
      const handleClick = vi.fn();
      render(<ComponentName onClick={handleClick} />);
      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("edge cases", () => {
    it("should handle disabled state", () => {
      render(<ComponentName disabled />);
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });
});
```

### Test Coverage Targets

| SCOPE         | TARGET      | REQUIREMENT                     |
| ------------- | ----------- | ------------------------------- |
| Rendering     | 100%        | Must test all output paths      |
| Interactions  | 100%        | Must test all event handlers    |
| Props         | 100%        | Must test all prop combinations |
| Edge cases    | Required    | disabled, loading, error states |
| Line coverage | 70% minimum | For each component              |

### Test Commands

| INTENT                | COMMAND                              | WATCH_MODE |
| --------------------- | ------------------------------------ | ---------- |
| Quick validation      | `pnpm test:unit`                     | NO         |
| Development iteration | `pnpm test:watch`                    | YES        |
| Coverage check        | `pnpm test:coverage`                 | NO         |
| Single file           | `pnpm test -- path/to/file.test.tsx` | NO         |
| Specific test         | `pnpm test -- --grep="pattern"`      | NO         |
| Verbose output        | `pnpm test -- --reporter=verbose`    | NO         |

## THEMING SYSTEM

### CSS Variables Available

Theme colors with automatic variants:

| VARIABLE_NAME          | GENERATES         | NOTES                                       |
| ---------------------- | ----------------- | ------------------------------------------- |
| `--color-primary`      | main, light, dark | Brand primary                               |
| `--color-success`      | main, light, dark | Success state                               |
| `--color-error`        | main, light, dark | Error state                                 |
| `--color-info`         | main, light, dark | Info state                                  |
| `--color-white`        | base only         | White                                       |
| `--color-black`        | base only         | Black                                       |
| `--color-gray-*`       | base only         | 900, 700, 600, 500, 400, 300, 200, 150, 100 |
| `--color-white-*`      | opacity variants  | 100, 200, 300                               |
| `--color-black-*`      | opacity variants  | 100, 200                                    |
| `--color-border-light` | base only         | Light border                                |
| `--color-shadow`       | base only         | Shadow                                      |

### Color Variant Rules

| VARIANT | RULE           |
| ------- | -------------- |
| main    | Original color |
| light   | 10% opacity    |
| dark    | 15% darker     |

## AGENT TASK CHECKLIST

When agents need to implement new components, use this checklist:

### Pre-implementation

- [ ] Read component requirements
- [ ] Read the relevant `src/design-systems/<id>/DESIGN.md` before adapting a component
- [ ] Check existing similar components for patterns
- [ ] Plan component props interface
- [ ] Identify required CSS variables

### Implementation

- [ ] Create ComponentName/ directory
- [ ] Create ComponentName.types.ts with props interface
- [ ] Create ComponentName.tsx with export const
- [ ] Create ComponentName.styles.css using CSS variables
- [ ] Create ComponentName.consts.ts for static data/configuration
- [ ] Create ComponentName.utils.ts if needed
- [ ] Put owned subcomponents in ComponentName/components/; expose public sections through the family index
- [ ] Create ComponentName.test.tsx with 100% coverage; if adding multiple test files, place all of them in ComponentName/tests/
- [ ] Create ComponentName.stories.tsx for Storybook
- [ ] Run `pnpm lint` - must pass
- [ ] Run `pnpm test:unit` - must pass

### Post-implementation

- [ ] Update src/components/index.ts with export
- [ ] Verify `pnpm build` succeeds
- [ ] Verify `pnpm test:coverage` shows 70%+ coverage
- [ ] Verify component works in Storybook
- [ ] Create docs/components/ComponentName.md with props and usage example
- [ ] Update docs/components/README.md index table with the new component
- [ ] Update AGENTS.md COMPONENT INVENTORY if adding new component
- [ ] Update README.md if component is user-facing

## ERROR HANDLING FOR AGENTS

### Common Errors and Solutions

ERROR: ESLint violations
SOLUTION: Run `pnpm lint` and fix all reported issues
PREVENTIVE: Use provided templates, follow naming conventions

ERROR: Import paths incorrect
SOLUTION: Use relative paths from current file
PATTERN: `../ComponentName/ComponentName` for same level

ERROR: Type definitions missing
SOLUTION: Create or update ComponentName.types.ts
CHECK: All props must be typed, no implicit any

ERROR: Tests failing
SOLUTION: Update test to match implementation
CHECK: Use semantic queries (getByRole, getByLabelText)

ERROR: Component not rendering
SOLUTION: Verify className follows CSS pattern
CHECK: CSS classes use kebab-case, CSS variables exist

ERROR: Build fails
SOLUTION: Run `pnpm lint` and `pnpm test` first
CHECK: All files have correct exports, no circular imports

## DEPENDENCY INFORMATION

### Runtime Dependencies (Production)

React and ReactDOM are peer dependencies. The build keeps one file per source module,
leaves every dependency external, adds `"use client"` to modules that import React, and
loads no fonts. Never add build, Storybook or test tooling to `dependencies`.
`playwright-core` is an `optionalDependencies` entry used only by `neus shot` at runtime; it
downloads no browser.

```
React 19+ (peer)
ReactDOM 19+ (peer)
ag-grid-community (DataTable; register only the modules DataTable uses)
ag-grid-react (DataTable)
react-day-picker (Calendar)
lucide-react (Icon components)
react-spinners (Loading indicators)
@react-google-maps/api (InteractiveMap)
```

### Development Dependencies (Build/Test)

```
TypeScript 6+
Vite 8+
Vitest 4+
React Testing Library
@testing-library/jest-dom
@testing-library/user-event
Playwright (Browser testing)
ESLint
Storybook
```

## CRITICAL CONSTRAINTS

### MUST NOT VIOLATE

1. Component file structure pattern
2. Type definition separation
3. Named exports only
4. CSS variable usage
5. Test coverage requirements
6. ESLint rules
7. Import organization

### MUST ALWAYS

1. Create .types.ts file for components
2. Create .styles.css file for components
3. Create tests for components: one file at the component root, or all files in tests/ when there are multiple
4. Include descriptive JSDoc comments
5. Use TypeScript strict mode
6. Test all interactive features
7. Update documentation

### SHOULD TYPICALLY

1. Create .utils.ts if complex logic needed
2. Create .stories.tsx for Storybook
3. Add CSS transitions for user feedback
4. Handle disabled/loading/error states
5. Provide meaningful error messages
6. Support keyboard navigation

## STORYBOOK STORIES STYLE GUIDE

### Philosophy

Each component MUST export a single Story that exposes all props as editable controls via `argTypes`. Do NOT create multiple stories for different states (e.g., `Disabled`, `Loading`, `Outlined`). Instead, let the user explore all states interactively through Storybook controls.

### Story Rules

| RULE                          | DESCRIPTION                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------- |
| Single story per component    | Export only ONE named Story matching the component name                           |
| All props as args             | Every prop must appear in `args` with a sensible default value                    |
| All props in argTypes         | Every prop must have a `control` type and `description` in `argTypes`             |
| Use `action` for callbacks    | Event handler props use `action: "eventName"` instead of a value in `args`        |
| Use `autodocs` tag            | Always include `tags: ["autodocs"]` for automatic documentation                   |
| Centered layout               | Use `parameters: { layout: "centered" }` unless the component requires full width |
| Named export = component name | The Story export name must match the component name (e.g., `export const Button`) |
| Default export = meta         | The meta object is always the default export                                      |

### Control Types Reference

| PROP TYPE          | CONTROL     | EXAMPLE                                        |
| ------------------ | ----------- | ---------------------------------------------- |
| `string`           | `"text"`    | `control: "text"`                              |
| `boolean`          | `"boolean"` | `control: "boolean"`                           |
| `union of strings` | `"select"`  | `control: "select", options: [...]`            |
| `number`           | `"number"`  | `control: "number"`                            |
| `callback / event` | `action`    | `action: "clicked"` (in argTypes, not in args) |

## DOCUMENTATION SOURCES

For agents needing additional information:

| Question | Source |
| --- | --- |
| Start here | [Documentation index](./docs/README.md) |
| Installation and onboarding | [Getting started](./docs/getting-started/README.md) |
| Components and public sections | [Component catalog](./docs/components/README.md); individual docs/components/ComponentName.md guides |
| Application and form layouts | [Templates](./docs/templates/README.md) |
| Provider, scopes and runtime colors | [ThemeProvider](./docs/design/theme-provider.md) |
| Per-part classes/styles and CSS cascade | [Customization](./docs/design/customization.md) |
| Shared CSS variables | [Token reference](./docs/design/tokens.md) |
| Six visual specifications | [Design systems](./docs/design/systems.md) |
| Component conventions and commands | [Development](./docs/contributing/development.md) |
| Validation and coverage | [Testing](./docs/contributing/testing.md) |
| DESIGN.md schema and generation | [Authoring design systems](./docs/contributing/design-system-authoring.md) |
| Exact props and style destinations | ComponentName.types.ts, ComponentName.tsx and ComponentName.styles.css in the owning family |


Project guides live in `docs/` as Markdown; the root `README.md` provides the
overview, `AGENTS.md` defines repository instructions, and visual specifications
live in `src/design-systems/<id>/DESIGN.md`. The six design specifications are the
editable source for tokens, action palettes and all
component recipes. Follow Google's DESIGN.md alpha format: standard YAML token
groups, the validated `x-neus` extension, and the eight ordered prose sections.
Describe visual identity and usage; keep implementation reports and pending-work
lists out of these documents. Read the relevant specification before adapting a
recipe. Edit its YAML and run `pnpm design:generate`; never hand-edit files under
`src/design-systems/<id>/generated/`. Commit generated artifacts with their source.
Run `pnpm design:check` to validate without writing. Neus owns shared foundations
and complete per-scope resets; sibling systems override those defaults. Preserve
CSS variable names, runtime var() dependencies, scope isolation and public APIs.
The generator and its tests live in `src/design-systems/tooling/`; browser suites and
fixtures live in `src/design-systems/tests/`. See the architecture guide for the
extension schema, generation commands and official-linter warning policy.
Keep external source links and consultation dates in each specification,
distinguishing local decisions from official guidance. Use relative links with
explicit `.md` extensions and keep `docs/README.md` up to date when adding guides.
Documentation can be read directly in the repository or a Markdown editor;
it does not require a development server or build step. Storybook provides the
interactive component catalog separately.

## AI DESIGN KIT MAINTENANCE

- `skills/`, `agents/` and `cli/templates/` are copied into consumer projects by
  `npx neus init`; they are product code. Keep them in English and in sync with public
  props, docs and DESIGN.md files: when a prop, part, token or component changes, update
  `skills/neus-design/references/patterns.md`, `customization.md` and the audit's
  `references/neus-rules.md` (Library section) in the same change.
- Skills follow the Agent Skills specification: `name` equals the directory, only
  `name`, `description`, `license`, `compatibility`, `metadata` and `allowed-tools` in
  frontmatter, references one level deep. Validate with
  `uvx --from skills-ref agentskills validate skills/<name>`.
- Skills must not depend on commands the `neus` CLI does not provide; they read files from
  `node_modules/neus-ui/` and run their own `scripts/`.
- Server rendering is covered by `src/tests/stories.ssr.test.tsx`: every story must render
  with `renderToString` in Node.

## DOCUMENTATION AND CUSTOMIZATION MAINTENANCE

- Start at [docs/README.md](./docs/README.md). Consumer guides live in
  getting-started/ and design/; API references live in components/ and templates/;
  maintainer workflows live in contributing/. Every folder has a README index.
- Keep documentation in English. Add/update the relevant catalog and all relative
  links when moving files. Do not leave obsolete flat documentation paths.
- Every public component/section and template needs a guide with usage, complete
  props/defaults/callbacks, behavior/accessibility, anatomy, class/style destinations,
  states, complete applicable token inventories and practical customization examples.
- Keep public types, implementation, single story, tests and documentation in sync.
  Preserve existing style destinations. Add root className where missing; parts use
  individual partStyle/partClassName props. Append consumer classes and merge consumer
  styles after internal defaults. Removing a hook must restore default styling.
- Repeated parts share their hook; absent parts stay absent. Keep internal part
  forwarding in PickerField, MenuItems and SelectListbox. Public Card/Modal sections
  own their hooks. Integrated public children and third-party internals use their
  existing APIs or documented CSS; do not add new deep forwarding APIs.
- Use [customization](./docs/design/customization.md) for CSS cascade/scope guidance,
  [ThemeProvider](./docs/design/theme-provider.md) for runtime behavior and
  [authoring](./docs/contributing/design-system-authoring.md) for DESIGN.md generation.
- Storybook templates reuse the shared local design selector, initialize it to
  global, and inherit the toolbar color scheme. Preview args are not component props.

## CURRENT PUBLIC API CONTRACTS

All public families and both templates have six scoped recipes. Button supports
solid/secondary/tonal/elevated/outlined/text; Card supports
auto/filled/outlined/elevated. Input and picker fields share variant, size and
label-placement controls. Calendar is discriminated
by mode and uses numberOfMonths. DataTable requires typed columnDefs and accepts
renderMobileCard. DataTable actions are composed by consumers with buttons or menus,
as demonstrated in Storybook. See the [component reference](./docs/components/README.md)
for the current APIs and usage examples.
