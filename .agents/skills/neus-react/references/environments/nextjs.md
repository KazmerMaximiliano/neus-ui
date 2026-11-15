# Next.js (App Router)

None of the owner's projects uses Next.js. This reference applies the house
conventions to the App Router, as documented for Next.js 16.x (verified November
2026). When an existing project's setup disagrees, the project wins (precedence
rule 2).

## Contents

1. Layout
2. Route entry files
3. Server and client components
4. Server actions and data
5. Special files and conventions
6. Styling, fonts and images
7. Environment, aliases and imports
8. Tests and validation

## 1. Layout

Default layout (profile B, see `architecture.md`):

```text
src/
├── app/                         routing only: special files, thin and default-exported
│   ├── layout.tsx               root layout: <html>, global.css, fonts
│   └── [locale]/
│       ├── layout.tsx
│       └── settings/page.tsx
├── views/<Name>Page/            page components
├── components/<Name>/           shared components
├── actions/                     server actions: <verbNoun>.ts or <verbNoun>/
├── i18n/                        next-intl (i18n.md §4)
├── styles/global.css
├── proxy.ts                     formerly middleware.ts (renamed in v16)
└── global.ts                    next-intl AppConfig augmentation
```

- Keep the project's root: if `app/` sits at the repository root rather than in
  `src/`, put these folders at the root too. Never move `app/`.
- In a project that already uses profile C, pages, components, hooks and actions
  go under `features/<feature>/presentation/` instead.
- **Never create `src/pages/` or a root `pages/`.** Next.js still treats it as
  the Pages Router.
- `app/` holds only route segments and special files. Components, hooks and
  page implementations live outside it, in `features/` or `views/` and
  `components/`. Then no private `_folders` are needed. Colocating inside `app/`
  is technically safe, but it splits code across two conventions.

## 2. Route entry files

Special files must default-export. Keep them as thin adapters around named
components:

```tsx
// app/[locale]/settings/page.tsx
import { SettingsPage } from "@/views/SettingsPage";

export default SettingsPage;
```

When the route must read params, the entry does it and passes plain props on:

```tsx
// app/[locale]/projects/[projectId]/page.tsx
import { ProjectDetailPage } from "@/views/ProjectDetailPage";

const Page = async ({
  params,
}: PageProps<"/[locale]/projects/[projectId]">) => {
  const { projectId } = await params;

  return <ProjectDetailPage projectId={projectId} />;
};

export default Page;
```

- `params` and `searchParams` are Promises: `await` them in Server Components,
  and read them with `use()` in Client Components.
- Use the generated global helpers `PageProps<"/route">`,
  `LayoutProps<"/route">` and `RouteContext<"/route">` (created by `next dev`,
  `next build` or `next typegen`) instead of hand-written param types.
- `export const metadata` / `export async function generateMetadata` belong in
  the route entry files. These named exports are part of the framework
  contract.
- The `XPage` component follows the page contract (`components.md` §3): it
  receives data as props, and fetching or param reading happens in the entry or
  in a server-side loader it calls.

## 3. Server and client components

- Components are Server Components by default. Keep them that way unless they
  need state, effects, event handlers or browser APIs.
- Put `"use client"` at the top of the **smallest** interactive component
  file, above the imports. The directive marks the entry of a client subtree;
  its imports become client code too. With neus-ui, neus-design sizes the
  boundary instead (one Client Component per interactive screen), and that
  component is the `XPage` view (`neus-ui.md` §5).
- Do not add `"use client"` to hooks, utils or types files. They become client
  code by being imported from a client component.
- Pass only serializable props from server to client components: no functions
  except server actions, and no class instances.
- Server-only modules (database clients, secrets, use case wiring) start with
  `import "server-only";` so a wrong import fails at build time.
- Client components cannot be `async`. Fetch in a Server Component and pass the
  result down.
- Do not wrap the whole tree in client providers "just in case". Put each
  provider as low as its consumers allow.

## 4. Server actions and data

- Each server action is a module in `actions/`. It follows the module rule
  (`code-style.md` §4): a lone `actions/<verbNoun>.ts` stays flat, and an
  action with sidecars (the usual case, since its result type is one) is a
  folder with `index.ts`:

  ```text
  actions/saveProfile/
  ├── index.ts                public surface, named re-exports
  ├── saveProfile.ts          "use server"; exports only the async action
  ├── saveProfile.types.ts    result or state type
  ├── saveProfile.consts.ts   limits and patterns (when needed)
  ├── saveProfile.utils.ts    validation shared with the form (when needed)
  └── saveProfile.test.ts
  ```

  ```ts
  // actions/saveProfile/index.ts
  export { saveProfile } from "./saveProfile";
  export type { SaveProfileState } from "./saveProfile.types";
  ```

- Consumers import `@/actions/saveProfile` in both forms.
- In profile C, an action is a presentation entry point, like a hook: always a
  flat file in the feature's `presentation/actions/saveProfile.ts`. Its result
  type and constants go to `<feature>.presentation.types.ts` and
  `.presentation.consts.ts`, its validation to a flat utility in
  `presentation/utils/` (or a domain service when it is a business rule), and
  its test to `test/` (`architecture.md` §4).
- `"use server"` goes in `saveProfile.ts`, never in `index.ts`. A
  `"use server"` file can export only async functions, so the types, constants
  and validation have to live in other files anyway (the sidecars, or the layer
  files in profile C).
- An action is an entry point, like a controller: it receives `unknown` input
  (`FormData`), validates and narrows it, does the work (or calls the project's
  service or use case), and returns a serializable result.
- In client forms, consume actions with React 19's `useActionState` and
  `useFormStatus` instead of hand-rolled loading state.
- Fetch data in Server Components or route entries. Hooks that fetch on the
  client are for genuinely client-only data.
- Route handlers (`app/**/route.ts`) export named `GET`, `POST`, … functions.
  Keep them thin over the same logic the actions use.

## 5. Special files and conventions

| File               | Notes                                                                                                                                                                                                |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `layout.tsx`       | The root layout renders `<html lang>` and `<body>`, and imports `global.css` and fonts. Layouts receive no `searchParams`.                                                                           |
| `page.tsx`         | Thin entry (§2).                                                                                                                                                                                     |
| `loading.tsx`      | Renders a skeleton component from `components/`.                                                                                                                                                     |
| `error.tsx`        | **Must** be a Client Component (`"use client"`), default-exported, with props `{ error, retry }` (`retry` is stable since 16.3). It does not catch errors from its own segment's layout or template. |
| `global-error.tsx` | Client Component that renders its own `<html>` and `<body>`. No `metadata`.                                                                                                                          |
| `not-found.tsx`    | Thin entry over a named component.                                                                                                                                                                   |
| `proxy.ts`         | Replaces `middleware.ts` since v16 and runs on the Node runtime. With next-intl it is just `createMiddleware(routing)` (i18n.md §4).                                                                 |

## 6. Styling, fonts and images

- Import `src/styles/global.css` once, in the root `app/layout.tsx`. Component
  `.styles.css` files are imported by their components (the App Router allows
  global CSS imports in any component). Plain CSS with BEM. No CSS Modules
  unless the project already uses them.
- Load the faces the design chose with `next/font` and expose them as tokens:
  `variable: "--font-sans"` on the font, applied to `<html>`, then consumed by
  `global.css` (with neus-ui, mapped to its `--font-*` in
  `neus.overrides.css`).
- Use `next/image` with explicit `width`/`height` or `fill` plus `sizes`.

## 7. Environment, aliases and imports

- Only `NEXT_PUBLIC_*` variables reach the browser, and they are inlined at
  build time. Dynamic lookups such as `process.env[name]` are not inlined. Keep
  secrets in server-only modules.
- Use the `@/*` alias that `create-next-app` configures. Do not add a second
  alias scheme.
- Omit extensions in imports. Turbopack's extension handling differs from Node's,
  and Next's own docs use extensionless imports.

## 8. Tests and validation

- Vitest + Testing Library for client components and synchronous server
  components. Async Server Components are not supported by those tools: test
  their logic through the use cases and utilities they call, and cover the page
  with browser tests once that tooling exists.
- Validate with the existing scripts, typically `lint`, `typecheck` or `tsc
--noEmit`, `test` and `build`. Since v16, `next build` type-checks with the
  project's `tsc`.
