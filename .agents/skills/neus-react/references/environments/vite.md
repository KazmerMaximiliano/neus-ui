# React SPA with Vite

Source: the PushBox frontend (Vite + React 19 + React Router), generalized.

## Contents

1. Entry and app shell
2. Routing
3. Pages, route controllers and overlays
4. Environment variables
5. Aliases and imports
6. Tests and validation

## 1. Entry and app shell

```text
src/
├── main.tsx        creates the router and the root; imports i18n and global CSS
└── App/
    ├── index.ts
    ├── App.tsx     named export; renders <RouterProvider router={router} />
    └── App.types.ts
```

`App` is a component, so it follows the folder contract like any other. It has
no `.styles.css` because the global stylesheet is imported in `main.tsx`.

```tsx
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { App } from "./App";
import { APP_ROUTES } from "./routes/app.routes";
import "./i18n";
import "./styles/global.css";

const root = document.getElementById("root");
if (root === null)
  throw new Error("The #root element is missing from index.html.");

const router = createBrowserRouter(APP_ROUTES);

createRoot(root).render(
  <StrictMode>
    <App router={router} />
  </StrictMode>,
);
```

- Side-effect imports (i18n initialization, global CSS) happen once here.
- Import from the router package the project already uses: `react-router` from
  v7 on, `react-router-dom` before that.

## 2. Routing

- Create the browser router **once, outside React** (in `main.tsx`), and pass it
  through `App` to `RouterProvider`. Never build route arrays or routers during
  render.
- The application route tree lives in `src/routes/app.routes.tsx` (profile C:
  `core/presentation/routes/app.routes.tsx`). It only composes route arrays
  beneath the root layout route.
- Each area defines its routes in `src/routes/<area>.routes.tsx` (profile C: the
  feature's `presentation/routes/<feature>.routes.tsx`). That file exports:
  - path constants (`PROJECTS_PATH`),
  - path builders (`projectDetailPath(id)`),
  - the complete `RouteObject[]` (`PROJECTS_ROUTES`).
- In profile C, core never imports feature pages or components, except in the
  single root layout route that composes global regions (sidebar actions and the
  like). Cross-feature navigation goes through exported path builders and
  feature-owned hooks.
- Use URL parameters for routable identity (`/projects/:projectId`).
- Lazy routes keep named exports:
  `lazy: async () => ({ Component: (await import("./ProjectsRoute")).ProjectsRoute })`.

```tsx
// src/routes/projects.routes.tsx
import type { RouteObject } from "react-router";
import { ProjectDetailRoute } from "./ProjectDetailRoute";
import { ProjectsRoute } from "./ProjectsRoute";

export const PROJECTS_PATH = "/projects";
export const PROJECT_DETAIL_PATH = `${PROJECTS_PATH}/:projectId`;

export const projectDetailPath = (projectId: string): string =>
  `${PROJECTS_PATH}/${projectId}`;

export const PROJECTS_ROUTES: RouteObject[] = [
  { path: PROJECTS_PATH, Component: ProjectsRoute },
  { path: PROJECT_DETAIL_PATH, Component: ProjectDetailRoute },
];
```

Path constants live in the routes file, not in `.consts.ts`, because they are
the feature's public navigation contract and sit next to the route objects that
use them.

## 3. Pages, route controllers and overlays

- A **route controller** (`routes/ProjectsRoute/ProjectsRoute.tsx`, full
  component contract) reads URL params, invokes presentation hooks and use
  cases, handles navigation and notifications, and passes props to the page.
- A **page** (`pages/ProjectsPage/`) renders the destination from props. It does
  not read the router or call use cases. That split keeps pages easy to test and
  reuse.
- **Ephemeral overlays** (forms, event lists and connection panels shown in
  drawers or modals) use provider state, not routes. Reloading keeps the current
  page and closes the overlay. Only overlays that represent an independently
  navigable resource get a route.
- Active navigation links expose `aria-current="page"` (React Router's
  `NavLink` does this for you).

## 4. Environment variables

- Only `import.meta.env.VITE_*` variables reach client code. Never put secrets in
  them.
- Type them by augmenting `ImportMetaEnv` in `src/vite-env.d.ts` (an allowed
  declaration-merging `interface`).
- Read env values once, in a datasource or a config module, and validate them.
  Do not read them in components.

## 5. Aliases and imports

- Prefer `package.json` subpath imports (`"#core/*": "./src/core/*"`). Mirror
  the pattern in `tsconfig` `paths` so TypeScript resolves folder barrels such
  as `#core/presentation/components/Button` (see `code-style.md` §4). Otherwise
  use the existing `resolve.alias` + `tsconfig` `paths` pair.
- Omit extensions unless the project already writes them (see `code-style.md`).

## 6. Tests and validation

- Vitest with `environment: "jsdom"` and a setup file that loads
  `@testing-library/jest-dom/vitest`. In profile C, tests live in the mirrored
  `test/` tree (`include: ["test/**/*.test.{ts,tsx}"]`, `testing.md` §2).
- Router-level tests render with `createMemoryRouter(ROUTES, { initialEntries })`
  and cover direct URL entry and `aria-current`.
- Validate with the existing scripts, typically `typecheck` (`tsc --noEmit` or
  `tsc -b`), `test`, `lint` and `build`.
