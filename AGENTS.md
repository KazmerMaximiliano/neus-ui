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
5. **Tests MUST be co-located**: .test.tsx files in same directory as component
6. **Styles MUST use CSS files**: Separate .styles.css files with CSS variables
7. **No default exports**: Only use named exports throughout the project

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
│   └── index.ts                 [FILE] Library entry point
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
├── ComponentName.test.tsx       [REQUIRED] Unit tests
├── ComponentName.utils.ts       [OPTIONAL] Utility functions
└── ComponentName.stories.tsx    [REQUIRED] Storybook documentation
```

## COMPONENT INVENTORY

### Implemented Components (24 total)

| NAME            | FILE_PATH                       | STATUS | FEATURES                                        |
| --------------- | ------------------------------- | ------ | ----------------------------------------------- |
| Actions         | src/components/Actions/         | STABLE | Action grouping                                 |
| Badge           | src/components/Badge/           | STABLE | Solid/dot variants, 5 semantic colors           |
| Button          | src/components/Button/          | STABLE | Multiple variants, loading state                |
| Calendar        | src/components/Calendar/        | STABLE | Date picker                                     |
| Card            | src/components/Card/            | STABLE | Avatar, header, color variants, fill mode       |
| Checkbox        | src/components/Checkbox/        | STABLE | Indeterminate state                             |
| Clock           | src/components/Clock/           | STABLE | Time picker                                     |
| DataTable       | src/components/DataTable/       | STABLE | Sorting, pagination, filtering                  |
| DateInput       | src/components/DateInput/       | STABLE | Date validation                                 |
| Dropdown        | src/components/Dropdown/        | STABLE | Dropdown menu                                   |
| FileUploader    | src/components/FileUploader/    | STABLE | Drag and drop                                   |
| IconButton      | src/components/IconButton/      | STABLE | Icon containers                                 |
| Input           | src/components/Input/           | STABLE | Text validation                                 |
| InteractiveMap  | src/components/InteractiveMap/  | STABLE | Google Maps integration                         |
| Link            | src/components/Link/            | STABLE | Styled links                                    |
| Menu            | src/components/Menu/            | STABLE | Actions menu                                    |
| Modal           | src/components/Modal/           | STABLE | Dialog boxes                                    |
| MultiSelect     | src/components/MultiSelect/     | STABLE | Multiple selection                              |
| Select          | src/components/Select/          | STABLE | Single selection                                |
| Sidebar         | src/components/Sidebar/         | STABLE | Navigation panel                                |
| TimeInput       | src/components/TimeInput/       | STABLE | Time validation                                 |
| WeekCalendar    | src/components/WeekCalendar/    | STABLE | Weekly view, event categories, navigation       |
| WeekCalendarRow | src/components/WeekCalendarRow/ | STABLE | Event row with hover tooltip, click handler     |
| Stepper         | src/components/Stepper/         | STABLE | Dots/linear/simple variants, labels, step click |

### Implemented Templates (2 total)

| NAME         | FILE_PATH                   | STATUS | PURPOSE                                    |
| ------------ | --------------------------- | ------ | ------------------------------------------ |
| AppTemplate  | src/templates/AppTemplate/  | STABLE | Full application layout                    |
| FormTemplate | src/templates/FormTemplate/ | STABLE | Form layout with validation and submission |

## COMMAND REFERENCE

### Development Commands

| COMMAND          | PURPOSE                      | BLOCKING |
| ---------------- | ---------------------------- | -------- |
| `pnpm install`   | Install all dependencies     | YES      |
| `pnpm dev`       | Start Vite dev server        | NO       |
| `pnpm storybook` | Start Storybook on port 6006 | NO       |
| `pnpm preview`   | Preview production build     | NO       |

### Build Commands

| COMMAND                | OUTPUT                          | TIME   |
| ---------------------- | ------------------------------- | ------ |
| `pnpm build`           | dist/ folder with compiled code | 5-10s  |
| `pnpm build:types`     | TypeScript declaration files    | 3-5s   |
| `pnpm build-storybook` | Static Storybook site           | 15-30s |
| `pnpm build-docs`      | Documentation in docs/          | 15-30s |

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

1. React and external dependencies
2. Internal components and hooks
3. CSS files
4. Type definitions
5. Utility functions

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
| Component exports | PascalCase       | Button, Modal                |
| Functions         | camelCase        | handleClick, getData         |
| Variables         | camelCase        | isLoading, errorMessage      |
| Constants         | UPPER_SNAKE_CASE | MAX_WIDTH, DEFAULT_COLOR     |
| CSS classes       | kebab-case       | button-primary, modal-header |
| Type names        | PascalCase       | ButtonProps, ComponentColor  |

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

- Be located in same directory as component
- Use .test.tsx extension
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

### Test Commands - AI REFERENCE

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
- [ ] Check existing similar components for patterns
- [ ] Plan component props interface
- [ ] Identify required CSS variables

### Implementation

- [ ] Create ComponentName/ directory
- [ ] Create ComponentName.types.ts with props interface
- [ ] Create ComponentName.tsx with export const
- [ ] Create ComponentName.styles.css using CSS variables
- [ ] Create ComponentName.utils.ts if needed
- [ ] Create ComponentName.test.tsx with 100% coverage
- [ ] Create ComponentName.stories.tsx for Storybook
- [ ] Run `pnpm lint` - must pass
- [ ] Run `pnpm test:unit` - must pass

### Post-implementation

- [ ] Update src/components/index.ts with export
- [ ] Verify `pnpm build` succeeds
- [ ] Verify `pnpm test:coverage` shows 70%+ coverage
- [ ] Verify component works in Storybook
- [ ] Create guides/components/ComponentName.md with props and usage example
- [ ] Update guides/COMPONENTS.md index table with the new component
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

```
React 19+
ReactDOM 19+
ag-grid-community (DataTable)
ag-grid-react (DataTable)
react-day-picker (Calendar)
react-icons (Icon components)
react-spinners (Loading indicators)
@react-google-maps/api (InteractiveMap)
```

### Development Dependencies (Build/Test)

```
TypeScript 5+
Vite 7+
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
3. Create .test.tsx file for components
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

| QUESTION                    | SOURCE                             | LOCATION                      |
| --------------------------- | ---------------------------------- | ----------------------------- |
| Component usage?            | README.md                          | /README.md                    |
| Component index?            | guides/COMPONENTS.md               | /guides/COMPONENTS.md         |
| Component props + examples? | guides/components/ComponentName.md | /guides/components/           |
| Design system / theming?    | guides/DESING_SYSTEM.md            | /guides/DESING_SYSTEM.md      |
| Type definitions?           | Component.types.ts                 | src/components/ComponentName/ |
| Test examples?              | Component.test.tsx                 | src/components/ComponentName/ |
| Styling reference?          | Component.styles.css               | src/components/ComponentName/ |
