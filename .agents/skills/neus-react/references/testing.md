# Testing

## Contents

1. Tooling
2. Location and naming
3. What to test
4. Component test template
5. Hooks, utilities and hexagonal layers
6. Coverage
7. Commands
8. Storybook

## 1. Tooling

- **Vitest** as the runner, importing `describe`, `it`, `expect` and `vi` from
  `vitest` explicitly, even when globals are enabled.
- **React Testing Library** for rendering, **`@testing-library/user-event`**
  for interaction (always through `userEvent.setup()`), and
  **`@testing-library/jest-dom`** matchers loaded in the Vitest setup file.
- A `jsdom` environment for component tests. Browser-level tests (Playwright or
  Vitest browser mode) cover rendered pages, navigation and responsive behavior
  only once that tooling exists in the project.
- If the project has no test toolchain yet, do not invent results. Ask before
  adding one, or report that tests could not run.

## 2. Location and naming

Where tests live depends on the architecture profile (`architecture.md`). An
existing project keeps the location it already uses.

### Profiles A and B: colocated

Tests sit with the code they test:

```text
ProjectCard/
├── index.ts
├── ProjectCard.tsx
└── ProjectCard.test.tsx          one test file: beside the implementation
```

```text
ProjectCard/
├── index.ts
├── ProjectCard.tsx
├── ProjectCard.utils.ts
└── tests/                        two or more: all of them in tests/
    ├── ProjectCard.test.tsx
    └── ProjectCard.utils.test.ts
```

- Never mix a root-level test with a `tests/` folder in the same component.
- A hook, service, utility or server action with a test is a folder module
  (`architecture.md` §5, §7), so the test goes in its folder:
  `useProjects/useProjects.test.ts`. The same one-or-`tests/` rule applies.

### Profile C: a `test/` tree that mirrors `src/`

Every test, components included, lives in a `test/` folder beside `src/`, at
the same relative path as the file it tests:

```text
src/features/projects/domain/useCases/createProject.useCase.ts
test/features/projects/domain/useCases/createProject.useCase.test.ts

src/features/projects/presentation/components/ProjectCard/ProjectCard.tsx
test/features/projects/presentation/components/ProjectCard/ProjectCard.test.tsx
```

- Why: layered code has many small role files. Keeping tests out of `src/`
  leaves each layer holding only production code, and role files, hooks and
  utilities stay single files instead of turning into folders just to hold a
  test (their types and constants go to the layer files, `architecture.md` §4).
- Mirror the path exactly, so a test is always one predictable move away from
  its source. No tests inside `src/`, and no `tests/` subfolders.
- Configure it once: Vitest `include: ["test/**/*.test.{ts,tsx}"]` and
  `setupFiles: ["./test/setup.ts"]`, plus `"include": ["src", "test"]` in
  `tsconfig`.
- Import the code under test through the project's alias where one reaches it
  (`#core/…`), otherwise through the relative path into `src/`.

### Every profile

- A test may import any file of the module it tests (its `.utils`, `.consts` or
  `.types`). That is the one exception to importing a module through its
  `index.ts`.
- Use `.test.tsx` when the file renders JSX and `.test.ts` otherwise.
- Never put tests inside a directory the framework turns into routes. In Astro,
  any `.ts` file in `src/pages/` becomes an endpoint, so test page logic through
  the components and utilities it uses.

## 3. What to test

Test public, observable behavior: what a user or a consumer can see and do.
Avoid implementation details, internal state, CSS classes as assertions and
large DOM snapshots.

Each component suite covers, where applicable:

- every behaviorally distinct render path and meaningful prop value;
- every event handler, through realistic `user-event` interaction;
- accessible names, roles, labels, focus behavior and ARIA state;
- the empty, disabled, loading, success and error states the component owns;
- boundary inputs, plus a regression test for every bug you fix.

Do not test the Cartesian product of props when the combinations behave the
same. Do test props that change each other's effect, such as `disabled`
preventing `onClick`.

Components that only render static markup do not need a test that repeats that
markup. A component with logic, interaction or conditional rendering does need
tests.

Query by role, label and visible text (`getByRole`, `getByLabelText`,
`getByText`), in that order of preference. Use `getByTestId` only when there is
no accessible handle.

## 4. Component test template

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProjectCard } from "./ProjectCard";

describe("ProjectCard", () => {
  it("renders the project name as a heading", () => {
    render(<ProjectCard name="Portfolio" />);

    expect(
      screen.getByRole("heading", { name: "Portfolio" }),
    ).toBeInTheDocument();
  });

  it("calls onDeploy after a user click", async () => {
    const user = userEvent.setup();
    const handleDeploy = vi.fn();
    render(<ProjectCard name="Portfolio" onDeploy={handleDeploy} />);

    await user.click(screen.getByRole("button", { name: "Deploy" }));

    expect(handleDeploy).toHaveBeenCalledOnce();
  });

  it("does not call onDeploy when disabled", async () => {
    const user = userEvent.setup();
    const handleDeploy = vi.fn();
    render(<ProjectCard name="Portfolio" disabled onDeploy={handleDeploy} />);

    await user.click(screen.getByRole("button", { name: "Deploy" }));

    expect(handleDeploy).not.toHaveBeenCalled();
  });
});
```

- Text queries use the copy of the locale the test setup initializes (here
  English). Assert on real translated text, not on translation keys.
- One top-level `describe` per unit. Nested `describe` blocks (`rendering`,
  `interactions`, `edge cases`) are fine when a suite grows.
- Test names describe behavior in the present tense ("renders…", "calls…",
  "does not call…").
- Arrange, act and assert are separated by a blank line.
- When the component needs providers (i18n, router, theme), wrap them in a
  render helper rather than mocking each one. The helper starts inside the test
  file that uses it, like any other local test function (`renderForm`,
  `renderPage`), so the test reads on its own.
- Move a helper to a shared file only once two or more test files need the
  same wrapper. Then a change to the providers touches one place:
  - Name the file after the function, as a plain module:
    `renderWithIntl.tsx`. No `.test-utils` or other suffix, and no `index.ts`.
  - Put it beside the Vitest setup file. In profile C that is the `test/` root
    (`test/setup.ts`, `test/renderWithIntl.tsx`). In profiles A and B, whose
    tests already live in `src/`, it is `src/test/`, imported through the
    project's alias (`@/test/renderWithIntl`). If the project already keeps
    shared test support somewhere, use that place.
- Router tests cover direct URL entry and observable navigation state, such as
  `aria-current` on the active link.

## 5. Hooks, utilities and hexagonal layers

| Unit                                | Strategy                                                                                              |
| :---------------------------------- | :---------------------------------------------------------------------------------------------------- |
| Hooks                               | `renderHook` from Testing Library, asserting the returned contract. Wrap providers as for components. |
| Utilities, mappers, domain services | Pure unit tests with no mocks.                                                                        |
| Use cases                           | Mock **only** the port. Verify delegation, and verify that unrelated port methods are never called.   |
| Entities with the sentinel pattern  | Test all three cases: omitted value, explicit value and explicit `null`.                              |
| Adapters                            | Mock the datasource; verify mapping and error translation.                                            |
| Datasources                         | Mock `fetch`/`EventSource` at the boundary; assert the request and parsing.                           |
| Locale files                        | One parity test asserting that every locale exposes the same keys.                                    |

## 6. Coverage

- Aim for full coverage of meaningful render paths and handlers rather than a
  number.
- Once coverage reporting is configured, keep each component at **70% line
  coverage or more**, and raise the floor for logic with security or data-loss
  consequences.
- Never claim coverage that has not been measured.

## 7. Commands

Run only scripts that exist in `package.json`. Read it first, because names
vary between projects (`test`, `test:unit`, `test:watch`, `test:coverage`,
`--filter` in workspaces). To target a single file, pass its path to the
existing script (`pnpm test -- ProjectCard.test.tsx`). If a validation script is
missing, say so in your report instead of substituting another command.

## 8. Storybook

Stories live in `storybook.md`: when to write them, how to set Storybook up,
the one-story format and components with subcomponents.
