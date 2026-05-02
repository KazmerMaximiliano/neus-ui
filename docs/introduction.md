# Introduction

**Neus UI** is a React component library built with TypeScript, designed to accelerate web application development with consistent, customizable interfaces and a dynamic theming system.

## Why Neus UI?

| Feature | Description |
| --- | --- |
| **Dynamic Theming** | Real-time color switching via `ThemeProvider` — no page reload |
| **22+ Components** | Button, DataTable, Calendar, Modal, Select, Sidebar, WeekCalendar, and more |
| **TypeScript First** | Full type definitions on every component and hook |
| **CSS Variables** | Deep integration with CSS custom properties for easy overrides |
| **Custom Hooks** | `useTheme`, `useColors`, `useResponsive` for maximum flexibility |
| **Ready-Made Templates** | Pre-built layouts: `AppTemplate`, `FormTemplate` |

## Project Structure

```
src/
├── components/    # 22+ reusable UI components
├── templates/     # Pre-built layouts (AppTemplate, FormTemplate)
├── hooks/         # useTheme, useColors, useResponsive
├── providers/     # ThemeProvider
├── css/           # Global CSS variables
├── utils/         # Color utilities
└── services/      # Auxiliary services
```

## Quick Start

### 1. Install

```bash
npm install git+https://github.com/KazmerMaximiliano/neus-ui.git
# or
pnpm add git+https://github.com/KazmerMaximiliano/neus-ui.git
```

### 2. Wrap your app

```tsx
import "neus-ui/dist/neus-ui.css";
import { ThemeProvider } from "neus-ui";

function App() {
  return (
    <ThemeProvider initialTheme={{ primaryColor: "#3975C2" }}>
      {/* your app */}
    </ThemeProvider>
  );
}
```

### 3. Use components

```tsx
import { Button, Input, Modal } from "neus-ui";

function MyPage() {
  return (
    <div>
      <Input label="Name" placeholder="Enter your name" />
      <Button label="Submit" variant="solid" color="primary" />
    </div>
  );
}
```

## Next Steps

- [Installation →](./installation) — full install guide, peer deps, CSS setup
- [Theming →](./theming) — ThemeProvider API, CSS variables, custom colors
- [Components →](./components) — all 22 components with live demos
- [Design System →](./design-system) — color system, spacing, typography
- [Testing →](./testing) — Vitest setup, test patterns, coverage
