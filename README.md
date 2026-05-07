# Neus UI

Neus UI is a production-ready React component library built with TypeScript,
dynamic theming, co-located tests, Storybook, and an AI-first UI generation
workflow powered by project skills and the `neus-designer` subagent.

## Documentation

Start with the public documentation:

**[Open the Neus UI documentation](https://kazmermaximiliano.github.io/neus-ui/)**

The docs include installation, theming, component references, testing guidance,
Storybook, and the AI-first Neus Design workflow.

## Project Overview

Neus UI helps teams build consistent React interfaces with reusable components,
typed APIs, CSS variable theming, and ready-made layout templates.

### What is included

| Area | Details |
| --- | --- |
| Components | 24+ reusable UI components including Button, DataTable, Modal, Select, Calendar, Sidebar, Stepper, and WeekCalendar |
| Templates | `AppTemplate` for application shells and `FormTemplate` for validated forms |
| Theming | Runtime theme updates with `ThemeProvider`, `useTheme`, `useColors`, and CSS variables |
| Testing | Vitest, React Testing Library, Storybook integration, and coverage reporting |
| AI-first workflow | `neus-designer` orchestrates project intake and invokes Neus UI skills to generate typed `.tsx` UI artifacts |

### Project structure

```text
src/
├── components/        # Reusable UI components
├── templates/         # AppTemplate and FormTemplate
├── hooks/             # useTheme, useColors, useResponsive
├── providers/         # ThemeProvider
├── css/               # Global CSS variables and base styles
├── utils/             # Utility functions
└── services/          # Auxiliary services

docs/                  # VitePress documentation
.agents/               # Neus Design subagent and skills
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
      <Button label="Get started" variant="solid" color="primary" />
    </ThemeProvider>
  );
}
```

## Build and Test Commands

Use `pnpm` for all repository commands.

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

### Documentation build

```bash
pnpm docs:dev
pnpm docs:build
pnpm docs:preview
pnpm build-storybook
```

### Tests and quality

```bash
pnpm test
pnpm test:unit
pnpm test:watch
pnpm test:coverage
pnpm lint
```

## Code Style Guidelines

Neus UI uses strict TypeScript conventions and component file boundaries. New
components must follow the established directory structure:

```text
ComponentName/
├── ComponentName.tsx
├── ComponentName.types.ts
├── ComponentName.styles.css
├── ComponentName.test.tsx
├── ComponentName.stories.tsx
└── ComponentName.utils.ts   # optional
```

Core rules:

- Use named exports only. Do not use default exports.
- Keep props and shared types in `ComponentName.types.ts`.
- Keep styles in `ComponentName.styles.css`; use theme CSS variables.
- Keep tests co-located in `ComponentName.test.tsx`.
- Use ES module imports and follow the project import order.
- Prefer semantic React Testing Library queries over implementation details.
- Keep components typed, focused, and compatible with React 19+.

Recommended import order:

```tsx
import React, { useState } from "react";
import { FiIcon } from "react-icons/fi";
import { Button } from "../Button/Button";
import { useColors } from "../theme";
import "./ComponentName.styles.css";
import type { ComponentNameProps } from "./ComponentName.types";
import { getComponentClasses } from "./ComponentName.utils";
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

## Testing Instructions

Neus UI uses Vitest and React Testing Library. Tests should cover rendering,
interactions, prop variations, and edge cases such as disabled, loading, error,
and empty states.

Run the full test suite:

```bash
pnpm test
```

Run only unit tests:

```bash
pnpm test:unit
```

Run coverage:

```bash
pnpm test:coverage
```

Example test pattern:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();

    render(<Button label="Save" onClick={handleClick} />);

    await userEvent.click(screen.getByRole("button", { name: /save/i }));

    expect(handleClick).toHaveBeenCalled();
  });
});
```

## AI-First Neus Design

Neus Design turns natural language UI requests into production-ready `.tsx`
artifacts built from Neus UI components. The `neus-designer` subagent handles
project intake, resolves visual direction, and invokes specialized skills for
app layouts, dashboards, forms, lists, landing pages, onboarding flows, and
component patterns.

The workflow follows a strict anti-slop rule: generated fields, columns,
sections, and copy must come from the user's request. Neus Design should not
invent data, fake social proof, or extra UI surfaces.

Read the public guide:

**[AI-first workflow documentation](https://kazmermaximiliano.github.io/neus-ui/ai-first)**

The root [`NEUS-DESING.md`](./NEUS-DESING.md) file remains the deeper source
reference for the project-specific AI system.

## Useful Links

| Resource | Link |
| --- | --- |
| Documentation | https://kazmermaximiliano.github.io/neus-ui/ |
| AI-first workflow | https://kazmermaximiliano.github.io/neus-ui/ai-first |
| Storybook | https://kazmermaximiliano.github.io/neus-ui/storybook/ |
| Repository | https://github.com/KazmerMaximiliano/neus-ui |

## License

Copyright 2026 Maximiliano Kazmer

Licensed under the Apache License, Version 2.0. See [LICENSE](./LICENSE) for
the full license text.
