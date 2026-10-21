# Testing

[Documentation index](../README.md)

Neus UI uses **Vitest** + **React Testing Library**. A single test file lives next to its
component. When a component has multiple test files, all of them live in its `tests/`
subdirectory.

## Run Tests

The CLI tests run `neus init`, which imports the built `dist/theme.js`: run `pnpm build`
once in a fresh clone before the tests.

```bash
# Single run
pnpm test

# Unit tests only
pnpm test:unit

# Computed CSS, nested theme scopes, and keyboard interactions in Chromium
pnpm test:design-systems

# Watch mode (re-runs on file change)
pnpm test:watch

# Coverage report
pnpm test:coverage
```

## Storybook Type Checking

Story files and `.storybook/` configuration use `tsconfig.storybook.json`, referenced by the
root TypeScript configuration. It includes Vite's client types and `src/vite-env.d.ts` so
the editor can resolve CSS imports in stories. Stories remain excluded from the library
build.

```bash
pnpm exec tsc --project tsconfig.storybook.json --noEmit
```

## Visual validation

Browser tests cover all six systems in both color schemes, computed states and contrast,
nested providers, runtime changes, field anatomy, and AG Grid/DayPicker behavior. To
generate visual captures from the shared browser fixture:

```bash
VITE_REFACTOR_VISUAL_QA=true pnpm test:design-systems
```

Inspect the generated PNGs for clipping, alignment, and readability. Tests use fallback
fonts; selecting a design system does not load branded assets. Google Maps and geocoding
tests use mocks. Checking the live SDK requires a valid consumer-provided API key and
enabled Google services; Storybook renders the configuration state without a credential.

## Test Structure

```
src/components/Button/
├── Button.tsx
├── Button.test.tsx   ← component, accessibility, story, and utility tests
└── Button.types.ts
```

Button's tests are consolidated in `Button.test.tsx`, including `getButtonClasses` and the
existing story's design-system controls. A component with a single test file keeps it beside
the implementation and groups cases with `describe` blocks.

When a component has multiple test files, group **all** of them in `tests/`:

```text
src/components/Calendar/
├── Calendar.tsx
├── Calendar.types.ts
├── Calendar.utils.ts
└── tests/
    ├── Calendar.test.tsx
    ├── Calendar.types.test.tsx
    └── Calendar.utils.test.ts
```

Do not mix root-level test files with files inside `tests/`. Keep descriptive filenames and
adjust relative imports when moving tests. Use `.test.tsx` for component/JSX tests and
`.test.ts` for tests without JSX. Subcomponents follow the same rule within their own
directories. Shared browser suites remain in `src/design-systems/tests/`; standalone utility
tests remain beside their utilities. Generator validation and synchronization tests live in
`src/design-systems/tooling/tests/` and run with `pnpm test:unit` in the Node project.

Owned subcomponents live in `ComponentName/components/`. Public sections keep their tests
next to their implementation (for example,
`Card/components/CardHeader/CardHeader.test.tsx`), or use their own `tests/` directory when
needed. Small internal parts such as StepperDots, MenuItems and SelectListbox can be covered
through their parent's behavior tests. Moving a part must preserve those tests and update
their imports; it does not require duplicate tests that only check the new file location.

Vitest already discovers both layouts through `src/**/*.test.{ts,tsx}`. Library builds
exclude these filenames recursively, so moving them does not change the published package.

```bash
pnpm test:unit src/components/Calendar/tests/
```

## Basic Test Pattern

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Button } from "neus-ui";
import "@testing-library/jest-dom/vitest";

describe("Button", () => {
  describe("rendering", () => {
    it("renders label", () => {
      render(<Button label="Click me" />);
      expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("calls onClick", async () => {
      const handleClick = vi.fn();
      render(<Button label="Click" onClick={handleClick} />);
      await userEvent.click(screen.getByRole("button"));
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe("states", () => {
    it("is disabled when disabled prop is true", () => {
      render(<Button label="Disabled" disabled />);
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });
});
```

## Testing with ThemeProvider

Components using `useColors()` require `ThemeProvider` in tests:

```tsx
import { Button, ThemeProvider } from "neus-ui";
import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

it("renders with theme", () => {
  render(
    <ThemeProvider>
      <Button label="Test" />
    </ThemeProvider>
  );
  expect(screen.getByRole("button")).toBeInTheDocument();
});
```

## Useful Queries

Prefer semantic queries over `getByTestId`:

```tsx
screen.getByRole("button", { name: /submit/i })
screen.getByLabelText("Email")
screen.getByPlaceholderText("Enter text...")
screen.getByText("Error message")
```

## Asynchronous interactions

Await user-event operations and findByRole/findByText queries when interaction updates a
panel. Use waitFor for an eventual assertion, such as a transition's final computed style.
Mock external network/SDK behavior instead of adding fixed sleep durations.

## Coverage Targets

| Scope | Target |
| --- | --- |
| Rendering | 100% of output paths |
| Interactions | 100% of event handlers |
| Props | All combinations |
| Edge cases | disabled, loading, error, empty |
| Line coverage | 70%+ per component |

## Debug Commands

```bash
# Verbose output
pnpm test -- --reporter=verbose

# Single file
pnpm test -- src/components/Button/Button.test.tsx

# Pattern match
pnpm test -- -t "Button"
```

## Configuration

- **`vitest.setup.ts`** — imports `@testing-library/jest-dom/vitest` matchers
- **`vite.config.ts`** — defines `unit` (jsdom), `ssr` (every story rendered with `renderToString` in Node, `*.ssr.test.tsx`), `cli` (`neus init` and the skill scripts, `cli/**/*.test.mjs`), `design-system-generator` (Node), `design-systems` (computed CSS and interactions in Chromium), and `storybook` (stories in Chromium)

Design-system browser tests verify all six palettes in both color schemes, independent
Button variants and sizes, nested scope resets, runtime switching, loader overrides,
keyboard focus, and disabled/loading Button interactions. They wait for transitions before
asserting final styles. Unit tests cover provider cleanup and state updates.

Card browser tests also cover the six designs in light/dark mode, section padding, media
proportions and edge alignment, nested/sibling scopes, runtime switching, per-element
overrides, and keyboard navigation of child actions. The co-located Card tests cover
composition, media types, custom players, refs and public exports. Negative type assertions
reject unsupported Card props and invalid media attributes, refs and children. Run them
through the existing test TypeScript project:

```bash
pnpm exec tsc --project tsconfig.test.json --noEmit
```

## Customization acceptance

Check every new class/style destination, base-class preservation, removal on rerender,
conditional parts and repeated parts. Exercise shared PickerField, MenuItems and
SelectListbox through their public owners. Keep the single-story controls synchronized with
optional props.

The documentation browser suite checks both template stories across six systems and two
modes, global inheritance/local overrides, responsive layouts, scoped CSS examples,
focus/disabled states, popovers and dialog backdrops. Validate local Markdown links/anchors
and compile complete consumer examples against the current public types when editing
reference guides.
