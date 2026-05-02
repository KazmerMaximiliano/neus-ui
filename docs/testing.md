# Testing

Neus UI uses **Vitest** + **React Testing Library**. Test files live next to their components (`.test.tsx`).

## Run Tests

```bash
# Single run
pnpm test

# Unit tests only
pnpm test:unit

# Watch mode (re-runs on file change)
pnpm test:watch

# Coverage report
pnpm test:coverage
```

## Test Structure

```
src/components/Button/
├── Button.tsx
├── Button.test.tsx   ← unit tests
└── Button.types.ts
```

## Basic Test Pattern

```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

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
import { ThemeProvider } from "neus-ui";

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

## Async Tests

```tsx
import { waitFor } from "@testing-library/react";

it("loads async data", async () => {
  render(<AsyncComponent />);
  await waitFor(() => {
    expect(screen.getByText("Loaded")).toBeInTheDocument();
  });
});
```

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
pnpm test -- --grep="Button"
```

## Configuration

- **`vitest.setup.ts`** — imports `@testing-library/jest-dom/vitest` matchers
- **`vite.config.ts`** — defines two test projects: `unit` (jsdom) and `storybook` (Playwright/Chromium)
