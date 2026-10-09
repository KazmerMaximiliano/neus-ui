# Neus UI

Neus UI is a production-ready React component library built with TypeScript,
dynamic theming, co-located tests, Storybook, and an AI-first UI generation
workflow powered by project skills and the `neus-designer` subagent.

## Documentation

All project guides live in [`docs/`](./docs/README.md) as Markdown files:

**[Open the documentation index](./docs/README.md)**

The guides cover installation, theming, components, development, testing, and
the Neus Design workflow. Read them directly in GitHub or a Markdown editor.

## Project Overview

Neus UI helps teams build consistent React interfaces with reusable components,
typed APIs, CSS variable theming, and ready-made layout templates.

### What is included

| Area | Details |
| --- | --- |
| Components | 24+ reusable UI components including Button, DataTable, Modal, Select, Calendar, Sidebar, Stepper, and WeekCalendar |
| Templates | `AppTemplate` for application shells and `FormTemplate` for validated forms |
| Theming | Runtime theme updates with `ThemeProvider`, `useTheme`, `useColors`, and CSS variables |
| Design systems | Scoped Neus UI, Apple, Carbon, Material, Neobrutalism, and Vercel themes; Button adaptations |
| Testing | Vitest, React Testing Library, Storybook integration, and coverage reporting |
| AI-first workflow | `neus-designer` orchestrates project intake and invokes Neus UI skills to generate typed `.tsx` UI artifacts |

### Project structure

```text
src/
├── components/        # Reusable UI components
├── templates/         # AppTemplate and FormTemplate
├── hooks/             # Shared hooks such as useResponsive
├── providers/         # Providers with their own context, types, and hooks
├── design-systems/    # Shared palettes and per-component CSS tokens
├── css/               # Global CSS variables and base styles
├── utils/             # Utility functions
└── services/          # Auxiliary services

docs/                  # Markdown guides and reference
.storybook/            # Interactive component catalog configuration
```

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
      <Button label="Get started" variant="solid" color="primary" size="medium" />
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
`loaderStyle` remain available for individual overrides. See the
[design-system architecture guide](docs/design-systems.md) for coverage and how
to add components or systems.

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

| Resource | Link |
| --- | --- |
| Documentation | [Index](./docs/README.md) |
| Components and templates | [Component reference](./docs/components.md) |
| AI-first workflow | [Workflow guide](./docs/ai-first.md) |
| Neus Design | [Detailed reference](./docs/neus-design.md) |
| Storybook | [Interactive catalog](https://kazmermaximiliano.github.io/neus-ui/storybook/) |
| Repository | [GitHub](https://github.com/KazmerMaximiliano/neus-ui) |

## License

Copyright 2026 Maximiliano Kazmer

Licensed under the Apache License, Version 2.0. See [LICENSE](./LICENSE) for
the full license text.
