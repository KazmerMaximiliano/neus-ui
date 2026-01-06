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
import "neus-ui/dist/app.css";
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

## 📚 Available Components

| Component        | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `Button`         | Buttons with multiple variants (solid, outlined, ghost) |
| `Input`          | Text input fields with validation states                |
| `Select`         | Dropdown select components                              |
| `MultiSelect`    | Multi-selection dropdown                                |
| `Checkbox`       | Checkbox with indeterminate state                       |
| `Modal`          | Modal dialogs with backdrop                             |
| `DataTable`      | Tables with sorting, filtering, and pagination          |
| `Sidebar`        | Collapsible sidebar navigation                          |
| `Link`           | Styled link components                                  |
| `IconButton`     | Buttons with icons                                      |
| `InteractiveMap` | Interactive map components                              |

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
