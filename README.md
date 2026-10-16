# Neus UI

Neus UI is a production-ready React component library built with TypeScript and
dynamic theming.

## Documentation

Project guides are available in [`docs/`](./docs/README.md) as Markdown files:

**[Open the documentation index](./docs/README.md)**

The guides cover installation, theming, components, development, and testing.
Read them directly in GitHub or a Markdown editor.

## Project Overview

Neus UI helps teams build consistent React interfaces with reusable components,
typed APIs, CSS variable theming, and ready-made layout templates.

### What is included

| Area           | Details                                                                                                                                                 |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Components     | 30 public components and sections including Button, composable Card and Modal sections, DataTable, Select, Calendar, Sidebar, Stepper, and WeekCalendar |
| Templates      | `AppTemplate` for application shells and `FormTemplate` for validated forms                                                                             |
| Theming        | Runtime theme updates with `ThemeProvider`, `useTheme`, `useColors`, and CSS variables                                                                  |
| Design systems | Scoped Neus UI, Apple, Carbon, Material, Neobrutalism, and Vercel themes; recipes for every public component family and both templates                  |
| Testing        | Vitest, React Testing Library, Storybook integration, and coverage reporting                                                                            |

### Project structure

```text
src/
├── components/        # Reusable UI components
├── templates/         # AppTemplate and FormTemplate
├── hooks/             # Shared hooks such as useResponsive
├── providers/         # Providers with their own context, types, and hooks
├── design-systems/    # DESIGN.md sources, generated palettes/recipes and shared tests
├── css/               # Global CSS variables and base styles
├── utils/             # Utility functions
└── services/          # Auxiliary services

docs/                  # Markdown guides and reference
.storybook/            # Interactive component catalog configuration
```

Each family keeps its owned subcomponents in `ComponentName/components/`.
Public sections remain available as named imports from `neus-ui`.
See [Development](./docs/development.md#code-style-guidelines) for the file layout.

### Installation

Install directly from GitHub:

```bash
pnpm add git+https://github.com/KazmerMaximiliano/neus-ui.git
```

Import the CSS bundle once and wrap your app with `ThemeProvider`:

```tsx
import "neus-ui/dist/neus-ui.css";
import { Button, ThemeProvider } from "neus-ui";

function App() {
  return (
    <ThemeProvider initialTheme={{ primaryColor: "#3975C2" }}>
      <Button
        label="Get started"
        variant="solid"
        color="primary"
        size="medium"
      />
    </ThemeProvider>
  );
}
```

### Design systems

Select a design system at the provider boundary. Neus UI remains the default:

```tsx
<ThemeProvider designSystem="carbon" colorScheme="dark">
  <Button label="Continue" />
</ThemeProvider>
```

Nested providers create isolated scopes. Button's `buttonStyle`, `labelStyle`, and
`loaderStyle` remain available for individual overrides. Card, CardHeader,
CardMedia, CardContent and CardFooter each accept `className` and nullable `style`.
Card composes its content through children; see the
[Card composition guide](./docs/components/Card.md). See the
[design-system architecture guide](docs/design-systems.md) for coverage and how
to add components or systems.

Sidebar preserves the NEUS curves over custom page backgrounds and adapts to all six systems. It provides a compact tablet rail and a floating mobile menu; AppTemplate uses the same navigation without duplicate controls. See the [Sidebar guide](./docs/components/Sidebar.md).

## Development

```bash
pnpm install
pnpm storybook
pnpm build
pnpm test:unit
pnpm lint
```

See [Development](./docs/development.md) for all commands and code conventions,
and [Testing](./docs/testing.md) for browser tests and coverage.

## Useful links

| Resource                 | Link                                                                                     |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| Documentation            | [Index](./docs/README.md)                                                                |
| Components and templates | [Component reference](./docs/components.md)                                              |
| Design specifications    | [Six systems: visual principles, token sources and generation](./docs/design-systems.md) |
| Storybook                | [Interactive catalog](https://kazmermaximiliano.github.io/neus-ui/storybook/)            |
| Repository               | [GitHub](https://github.com/KazmerMaximiliano/neus-ui)                                   |

## License

Copyright 2026 Maximiliano Kazmer

Licensed under the Apache License, Version 2.0. See [LICENSE](./LICENSE) for
the full license text.
