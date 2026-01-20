# Neus UI

A modern React UI component library built with TypeScript and dynamic theming capabilities.

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

## 🎨 Dynamic Theming

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

## 📚 Available Components

| Component        | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `Actions`        | Action buttons grouping and management                  |
| `Button`         | Buttons with multiple variants (solid, outlined, ghost) |
| `Checkbox`       | Checkbox with indeterminate state                       |
| `DataTable`      | Tables with sorting, filtering, and pagination          |
| `FileUploader`   | File upload component with drag and drop support        |
| `IconButton`     | Buttons with icons                                      |
| `Input`          | Text input fields with validation states                |
| `InteractiveMap` | Interactive map components                              |
| `DateInput`      | Date input fields with validation states                |
| `TimeInput`      | Time input fields with validation states                |
| `Link`           | Styled link components                                  |
| `Menu`           | Dropdown menu with customizable items                   |
| `Modal`          | Modal dialogs with backdrop                             |
| `MultiSelect`    | Multi-selection dropdown                                |
| `Select`         | Dropdown select components                              |
| `Sidebar`        | Collapsible sidebar navigation                          |

## 🏗️ Available Templates

| Template       | Description                                         |
| -------------- | --------------------------------------------------- |
| `AppTemplate`  | Complete application layout with sidebar and header |
| `FormTemplate` | Form layout template with validation support        |

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

## 📖 Complete Documentation

> **💡 Tip**: For detailed component props, examples, and interactive demos, visit the complete documentation at [https://kazmermaximiliano.github.io/neus-ui](https://kazmermaximiliano.github.io/neus-ui)
