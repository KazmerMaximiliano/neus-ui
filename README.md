# Neus UI

A modern React UI component library built with TypeScript and dynamic theming capabilities.

## 📑 Table of Contents

- [📋 Project Overview](#-project-overview)
- [📦 Installation](#-installation)
- [🚀 Quick Start](#-quick-start)
- [🏗️ Build and Test](#-build-and-test)
- [🎨 Dynamic Theming](#-dynamic-theming)
- [📚 Components](#-components)
  - [Available Components](#available-components)
  - [Available Templates](#-available-templates)
- [📖 Documentation](#-documentation)
- [🔧 API Reference](#-api-reference)
- [💻 Code Style Guidelines](#-code-style-guidelines)
- [✅ Testing Instructions](#-testing-instructions)

## 📋 Project Overview

**Neus UI** is a modern and professional React component library, built with TypeScript and designed to accelerate web application development with consistent and customizable interfaces.

### Why Neus UI?

- **🎨 Dynamic Theming**: Flexible theming system allowing real-time color changes
- **🛠️ Ready-to-Use Components**: 21+ professional pre-built components
- **📱 Responsive**: Designed with mobile-first approach in mind
- **🧩 Composable**: Modular components that are easy to combine
- **🎭 Customizable**: CSS variables and hooks for deep customization

### Key Features

| Feature                  | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| **Theming System**       | Real-time theme switching without page reload                  |
| **UI Components**        | Button, Input, Modal, DataTable, Select, Menu, and more        |
| **Ready-Made Templates** | Pre-built layouts for applications (AppTemplate, FormTemplate) |
| **Custom Hooks**         | useTheme, useColors, useResponsive for maximum flexibility     |
| **CSS Variables**        | Complete integration with CSS custom properties                |

### Project Structure

```
src/
├── components/        # 21+ reusable UI components
├── templates/         # Pre-built layouts
├── hooks/             # Custom hooks (useTheme, useColors, useResponsive)
├── providers/         # ThemeProvider for theme management
├── css/               # Global variables and styles
├── utils/             # Utility functions (color manipulation)
└── services/          # Auxiliary services
```

## 📦 Installation

Install directly from GitHub:

```bash
npm install git+https://github.com/KazmerMaximiliano/neus-ui.git
# or
yarn add git+https://github.com/KazmerMaximiliano/neus-ui.git
# or
pnpm add git+https://github.com/KazmerMaximiliano/neus-ui.git
```

## 🚀 Quick Start

### 1. Import CSS and Setup Theme Provider

```tsx
import "neus-ui/dist/neus-ui.css";
import { ThemeProvider } from "neus-ui";

function App() {
  return (
    <ThemeProvider initialTheme={{ primaryColor: "#e91e63" }}>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### 2. Use Components

```tsx
import { Button, Input, Modal, DataTable, useColors } from "neus-ui";

function MyComponent() {
  const colors = useColors();

  return (
    <div>
      <Button variant="solid" color="primary">
        Click me
      </Button>
      <Input placeholder="Enter text..." />
    </div>
  );
}
```

## 🏗️ Build and Test

This section covers the build and test commands for developing Neus UI.

### Development

```bash
# Install dependencies
pnpm install

# Start Vite development server
pnpm dev

# Start Storybook for component development
pnpm storybook

# Preview the production build
pnpm preview
```

### Building

```bash
# Build the library for production
pnpm build

# Build TypeScript declarations only
pnpm build:types

# Build Storybook for static hosting
pnpm build-storybook

# Build Storybook documentation
pnpm build-docs
```

### Testing

```bash
# Run all unit tests
pnpm test

# Run unit tests in watch mode
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage

# Run only unit tests (filtered)
pnpm test:unit
```

## Dynamic Theming

### Basic Theme Configuration

```tsx
import { ThemeProvider, useTheme } from "neus-ui";

function ThemeControls() {
  const { updateTheme } = useTheme();

  return (
    <div>
      <button onClick={() => updateTheme({ primaryColor: "#e91e63" })}>
        Pink Theme
      </button>
      <button onClick={() => updateTheme({ primaryColor: "#2196f3" })}>
        Blue Theme
      </button>
    </div>
  );
}
```

### Using Colors in Custom Components

```tsx
import { useColors } from "neus-ui";

function CustomComponent() {
  const colors = useColors();

  return (
    <div
      style={{
        backgroundColor: colors.primary.main,
        color: colors.white,
        border: `1px solid ${colors.primary.dark}`,
      }}
    >
      Custom styled component
    </div>
  );
}
```

### CSS Variables

All theme colors are available as CSS variables:

```css
.custom-element {
  background-color: var(--color-primary);
  border-color: var(--color-primary-dark);
  color: var(--color-white);
}

.custom-element:hover {
  background-color: var(--color-primary-light);
}
```

### Available Theme Colors

| Variable                | Description           |
| ----------------------- | --------------------- |
| `--color-primary`       | Primary brand color   |
| `--color-primary-light` | Primary light variant |
| `--color-primary-dark`  | Primary dark variant  |
| `--color-success`       | Success state color   |
| `--color-success-light` | Success light variant |
| `--color-success-dark`  | Success dark variant  |
| `--color-error`         | Error state color     |
| `--color-error-light`   | Error light variant   |
| `--color-error-dark`    | Error dark variant    |
| `--color-info`          | Info state color      |
| `--color-info-light`    | Info light variant    |
| `--color-info-dark`     | Info dark variant     |
| `--color-white`         | White                 |
| `--color-black`         | Black                 |
| `--color-white-100`     | White 15% opacity     |
| `--color-white-200`     | White 25% opacity     |
| `--color-white-300`     | White 55% opacity     |
| `--color-black-100`     | Black 10% opacity     |
| `--color-black-200`     | Black 50% opacity     |
| `--color-gray-900`      | Gray 900              |
| `--color-gray-700`      | Gray 700              |
| `--color-gray-600`      | Gray 600              |
| `--color-gray-500`      | Gray 500              |
| `--color-gray-400`      | Gray 400              |
| `--color-gray-300`      | Gray 300              |
| `--color-gray-200`      | Gray 200              |
| `--color-gray-150`      | Gray 150              |
| `--color-gray-100`      | Gray 100              |
| `--color-border-light`  | Light border color    |
| `--color-shadow`        | Shadow color          |

## 📚 Components

### Available Components

| Component          | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `Actions`          | Action buttons grouping and management                  |
| `Button`           | Buttons with multiple variants (solid, outlined, ghost) |
| `Calendar`         | Date picker component                                   |
| `Card`             | Flexible card with avatar, header, and color variants   |
| `Checkbox`         | Checkbox with indeterminate state                       |
| `Clock`            | Time picker component                                   |
| `DataTable`        | Tables with sorting, filtering, and pagination          |
| `DateInput`        | Date input fields with validation states                |
| `Dropdown`         | Dropdown menu triggered by icon avatar                  |
| `FileUploader`     | File upload component with drag and drop support        |
| `IconButton`       | Buttons with icons                                      |
| `Input`            | Text input fields with validation states                |
| `InteractiveMap`   | Interactive map components                              |
| `Link`             | Styled link components                                  |
| `Menu`             | Contextual actions menu                                 |
| `Modal`            | Modal dialogs with backdrop                             |
| `MultiSelect`      | Multi-selection dropdown                                |
| `Select`           | Dropdown select components                              |
| `Sidebar`          | Collapsible sidebar navigation                          |
| `TimeInput`        | Time input fields with validation states                |
| `WeekCalendar`     | Weekly calendar with event categories and navigation    |
| `WeekCalendarRow`  | Event row for WeekCalendar (internal)                   |

### 🏗️ Available Templates

| Template       | Description                                         |
| -------------- | --------------------------------------------------- |
| `AppTemplate`  | Complete application layout with sidebar and header |
| `FormTemplate` | Form layout with validation and submission handling |

> **💡 Pro Tip**: Explore all components interactively at **[kazmermaximiliano.github.io/neus-ui](https://kazmermaximiliano.github.io/neus-ui/)** — live props editor, usage examples, and full API docs powered by Storybook.

## 📖 Documentation

In-repo guides are located in the [`guides/`](guides/) directory:

| Guide | Description |
| --- | --- |
| [Storybook Docs](https://kazmermaximiliano.github.io/neus-ui/) | Interactive component explorer with live props and usage examples |
| [guides/COMPONENTS.md](guides/COMPONENTS.md) | Index of all components and templates with links to individual docs |
| [guides/components/](guides/components/) | One dedicated file per component — props, types, and usage examples |
| [guides/DESING_SYSTEM.md](guides/DESING_SYSTEM.md) | Theming API, color system, typography, spacing, and visual patterns |

## 🔧 API Reference

### ThemeProvider

```tsx
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: {
    primaryColor?: string;
    successColor?: string;
    errorColor?: string;
    infoColor?: string;
  };
}
```

### Hooks

- `useTheme()` - Access theme configuration and update functions
- `useColors()` - Access all theme colors with variants
- `useResponsive()` - Responsive breakpoint utilities

### Color Variants

Each theme color automatically generates:

- `main` - The original color
- `light` - 10% opacity variant
- `dark` - 15% darker variant

## 💻 Code Style Guidelines

The Neus UI project follows consistent code style standards to ensure maintainability and readability across all components.

### File Structure

Each component follows a standardized directory structure:

```
ComponentName/
├── ComponentName.tsx          # Main component implementation
├── ComponentName.types.ts     # TypeScript type definitions and interfaces
├── ComponentName.utils.ts     # Utility functions and helpers
├── ComponentName.styles.css   # Component styles
├── ComponentName.stories.tsx  # Storybook stories for documentation
└── ComponentName.test.tsx     # Unit tests
```

### TypeScript Conventions

#### Type Definitions

- Use **type aliases** for simple types and **interfaces** for object shapes
- Define props types in a separate `.types.ts` file
- Use descriptive type names with clear naming conventions

```typescript
// Button.types.ts
type ButtonType = "button" | "submit" | "reset";
type ButtonVariant = "outlined" | "text" | "solid";
export type ButtonColor = "primary" | "success" | "error" | "info";

export type ButtonProps = {
  label: string;
  type?: ButtonType;
  variant?: ButtonVariant;
  color?: ButtonColor;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};
```

#### Component Implementation

- Use **named exports** for components
- Use destructured parameters with default values
- Keep components focused and single-responsibility
- Prefer functional components with hooks

```typescript
// Button.tsx
export const Button = ({
  label,
  type = "button",
  variant = "solid",
  color = "primary",
  disabled = false,
  loading = false,
  onClick,
}: ButtonProps) => {
  const colors = useColors();
  const buttonClasses = getButtonClasses(variant, color);

  return (
    <button
      className={buttonClasses}
      onClick={(e) => onClick?.(e)}
      type={type}
      disabled={disabled || loading}
    >
      {loading ? <BeatLoader /> : label}
    </button>
  );
};
```

### Imports Organization

Organize imports in the following order:

1. External dependencies (React, third-party libraries)
2. Internal hooks and utilities
3. Styles
4. Component types
5. Utility functions and helpers

```typescript
import React, { useCallback, useRef, useState } from "react";
import { FiFile, FiImage } from "react-icons/fi";
import { Button } from "../Button/Button";
import { useColors } from "../theme";
import "./Component.styles.css";
import { ComponentProps } from "./Component.types";
import { helperFunction } from "./Component.utils";
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Button`, `Modal`, `DataTable`)
- **Files**: Match component name (e.g., `Button.tsx`, `Button.types.ts`)
- **Functions/Variables**: camelCase (e.g., `handleClick`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_WIDTH`, `DEFAULT_TIMEOUT`)
- **CSS Classes**: kebab-case (e.g., `button-primary`, `modal-header`)

### Code Formatting

- **Indentation**: 2 spaces
- **Line length**: Maximum 80-100 characters
- **Semicolons**: Always use semicolons
- **Quotes**: Double quotes for strings
- **Trailing commas**: Use trailing commas in multi-line objects/arrays

### Component Props Best Practices

- Always define all props in the `.types.ts` file
- Use destructuring in component parameters
- Provide meaningful default values
- Use optional chaining for event handlers

```typescript
const Component = ({
  isOpen = false,
  title = "Default Title",
  onConfirm,
  onCancel,
}: ComponentProps) => {
  return (
    <div onClick={() => onCancel?.()}>
      {title && <h3>{title}</h3>}
      <button onClick={(e) => onConfirm?.(e)} />
    </div>
  );
};
```

### Styling

- Use **CSS modules** organized by component
- Use **CSS variables** from the theme system for colors and spacing
- Follow BEM (Block Element Modifier) naming convention for classes
- Keep component styles in separate `.styles.css` files

```css
/* Button.styles.css */
.button {
  background-color: var(--color-primary);
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
}

.button:hover {
  background-color: var(--color-primary-light);
}

.button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

### Testing

- Write tests alongside components in `.test.tsx` files
- Use descriptive test names
- Test component behavior, not implementation details
- Aim for meaningful test coverage

### ESLint Configuration

The project uses ESLint with:

- `@eslint/js` - JavaScript linting rules
- `typescript-eslint` - TypeScript support
- `eslint-plugin-react-hooks` - React Hooks best practices
- `eslint-plugin-react-refresh` - React Fast Refresh support
- `eslint-plugin-storybook` - Storybook compatibility

Run linting with:

```bash
pnpm lint
```

## ✅ Testing Instructions

The Neus UI project uses **Vitest** for unit testing and integration testing with React Testing Library. Tests are organized into two main categories:

### Testing Framework

The project is configured with:

- **Vitest** - Fast unit testing framework
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Custom matchers for DOM assertions
- **@testing-library/user-event** - User interaction simulation
- **@vitest/coverage-v8** - Code coverage reporting
- **Playwright** - Browser automation for Storybook integration tests

### Running Tests

#### Run All Tests (Single Run)

Execute all tests once and exit:

```bash
pnpm test
```

This runs both unit tests and Storybook integration tests.

#### Run Tests in Watch Mode

Watch for file changes and re-run affected tests automatically:

```bash
pnpm test:watch
```

Useful during development when iterating on components and tests.

#### Run Unit Tests Only

Run only unit tests from `.test.tsx` files:

```bash
pnpm test:unit
```

Excludes Storybook integration tests.

#### Generate Coverage Report

Run tests with code coverage analysis:

```bash
pnpm test:coverage
```

This generates a coverage report showing:

- Line coverage
- Branch coverage
- Function coverage
- Uncovered lines

Coverage reports are available in the `coverage/` directory.

### Test File Structure

Test files follow a consistent naming and organization pattern:

```
src/components/Button/
├── Button.tsx
├── Button.test.tsx      # Unit tests
└── Button.types.ts
```

Test files are co-located with their corresponding components and use the `.test.tsx` extension.

### Writing Tests

#### Basic Test Structure

```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  describe("rendering", () => {
    it("should render button with label", () => {
      render(<Button label="Click me" />);
      expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
    });

    it("should apply correct variant class", () => {
      const { container } = render(<Button label="Test" variant="outlined" />);
      expect(container.querySelector(".button-outlined")).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("should call onClick handler when clicked", async () => {
      const handleClick = vi.fn();
      render(<Button label="Click" onClick={handleClick} />);

      const button = screen.getByRole("button", { name: /click/i });
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("disabled state", () => {
    it("should disable button when disabled prop is true", () => {
      render(<Button label="Disabled" disabled />);
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });
});
```

#### Testing Best Practices

1. **Use Semantic Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
2. **Test User Behavior**: Focus on how users interact with components, not implementation
3. **Async Operations**: Use `waitFor` for async updates
4. **Mock External Dependencies**: Mock API calls and third-party libraries with `vi.mock()`
5. **Describe Blocks**: Organize tests into logical groups with `describe()`

```typescript
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("Input", () => {
  it("should call onChange with input value", async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    await userEvent.type(input, "test value");

    expect(handleChange).toHaveBeenCalledWith("test value");
  });

  it("should display error message when provided", () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
```

### Test Coverage Goals

- **Unit Tests**: Aim for 70%+ line coverage on components
- **Critical Paths**: 100% coverage for user interactions and edge cases
- **Edge Cases**: Test disabled, loading, error, and empty states
- **Props Validation**: Verify component behavior with different prop combinations

### Configuration Files

#### `vitest.setup.ts`

Configures the testing environment and imports Testing Library matchers:

```typescript
import "@testing-library/jest-dom/vitest";
```

#### `vite.config.ts` - Test Projects

The project defines two test configurations:

1. **Unit Tests**
   - Environment: JSDOM
   - Pattern: `src/**/*.test.{ts,tsx}`
   - Runs component unit tests

2. **Storybook Integration Tests**
   - Browser: Chromium (Playwright)
   - Runs stories with visual regression and interaction tests
   - Enabled in browser context

### Debugging Tests

#### Run Tests with Verbose Output

```bash
pnpm test -- --reporter=verbose
```

#### Run Single Test File

```bash
pnpm test -- src/components/Button/Button.test.tsx
```

#### Run Tests Matching Pattern

```bash
pnpm test -- --grep="Button"
```

#### Use `test.only` to Isolate Tests

```typescript
it.only("should render correctly", () => {
  // Only this test will run
  render(<Button label="Test" />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});
```

### Troubleshooting

#### "Cannot find module" Errors

Ensure all imports in test files match component exports:

```typescript
// ✅ Correct
export const Button = ({ label }: ButtonProps) => { ... };
import { Button } from "./Button";

// ❌ Incorrect
export default Button;
import Button from "./Button";
```

#### Async Test Timeouts

Increase timeout for slow async operations:

```typescript
it("should load data", async () => {
  render(<AsyncComponent />);
  await waitFor(() => {
    expect(screen.getByText("Loaded")).toBeInTheDocument();
  }, { timeout: 3000 });
}, { timeout: 5000 });
```

#### React Context Errors

Wrap components that use context in providers during testing:

```typescript
it("should render with theme", () => {
  render(
    <ThemeProvider>
      <Button label="Test" />
    </ThemeProvider>
  );
  expect(screen.getByRole("button")).toBeInTheDocument();
});
```
