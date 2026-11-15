# Architecture

## Contents

1. Choose a profile
2. Profile A: library
3. Profile B: responsibility folders
4. Profile C: feature-first hexagonal
5. Hooks
6. Providers and contexts
7. Services and utilities
8. Principles for every profile

## 1. Choose a profile

| Signal                                                                                                                         | Profile                                 |
| :----------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| The project already has `features/<feature>/{domain,data,presentation}`, or the user asks for hexagonal / feature-first layers | **C: feature-first hexagonal**          |
| `package.json` publishes the code (`exports`/`main`/`module`), React is a `peerDependency`, there is no app routing            | **A: library**                          |
| Anything else: apps and sites of any size, new or existing                                                                     | **B: responsibility folders (default)** |

- An existing project keeps the structure it already has. Extend it rather than
  migrating.
- Profile B is the default. Never upgrade a project to profile C on your own,
  even if the app has remote data or business rules. Suggest it to the user if
  the code clearly suffers without it.
- Keep the change proportional inside any profile: validation for one form is a
  `.utils.ts` function, not a domain service; one server action is one
  module, not a layer.
- The host framework decides where its route entry files go (`app/`,
  `src/pages/`, `resources/js/pages/`). The profile decides where everything
  else goes. See the environment references.

## 2. Profile A: library

```text
src/
├── index.ts                    package entry: public exports only
├── components/
│   ├── index.ts                public component families
│   └── Button/                 full component contract, including index.ts
├── hooks/                      public and shared hooks: useX.ts, or useX/ with sidecars
├── providers/                  optional: context providers
│   └── ThemeProvider/
├── styles/                     tokens and themes the package exports
├── templates/                  optional: page-level compositions
└── utils/                      camelCase helpers: <name>.ts or <name>/
```

- Barrels are the public API. Anything not reachable from an entry point is
  internal.
- Consumer-facing text is configurable (see `i18n.md`, libraries).
- Additional entry points (`theme.ts`, `sections.ts`) are fine when they are
  declared in `package.json` `exports`.

## 3. Profile B: responsibility folders

```text
src/
├── components/<Name>/          shared UI, full component contract
├── views/<Name>Page/           page components when the host reserves pages/
│                               (in a Vite SPA, use pages/<Name>Page/)
├── templates/<Name>Template/   application-wide layouts with slots
├── hooks/                      useX.ts, or useX/ once it has sidecars
├── providers/<Name>Provider/
├── services/                   external integrations: <name>.ts or <name>/
├── utils/                      pure helpers: <name>.ts or <name>/
├── i18n/                       see i18n.md for the host
└── styles/global.css           tokens, reset, global rules
```

- Create folders only when there is something to put in them. Do not add
  `hooks/` or `providers/` "for later".
- Responsibility folders still hold modules, not loose code: every component,
  page, template and provider has its own folder with an `index.ts`. Hooks,
  services and utilities get one as soon as they have a sidecar (§5, §7). This
  differs from profile C, where those stay flat files (§4).

## 4. Profile C: feature-first hexagonal

Use this profile only in projects that already follow it, or when the user asks
for it. Each feature owns its layers. Create a feature by copying this shape, not
by inventing a variation:

```text
src/features/<feature>/
├── domain/
│   ├── entities/        <entity>.entity.ts
│   ├── ports/           <name>.port.ts
│   ├── useCases/        <verbNoun>.useCase.ts
│   ├── services/        <name>.ts              pure functions: no ports, no I/O
│   ├── <feature>.types.ts                      domain types, use case inputs/results
│   └── <feature>.consts.ts                     business constants
├── data/
│   ├── models/          <name>.model.ts        DTOs matching the API
│   ├── mappers/         <name>.mapper.ts
│   ├── datasources/     <name>.datasource.ts   HTTP, EventSource, storage
│   ├── adapters/        <name>.adapter.ts      implement the ports
│   ├── <feature>.data.types.ts                 transport-only types
│   └── <feature>.data.consts.ts                endpoints, storage keys
└── presentation/
    ├── components/
    ├── pages/           (or the host's route entries + views; see environments)
    ├── routes/          <feature>.routes.tsx   (SPA only)
    ├── hooks/           useX.ts                always a flat file
    ├── <feature>.presentation.types.ts         hook results, UI state
    └── <feature>.presentation.consts.ts        UI constants

src/core/
├── domain/              ports/, services/, core.types.ts, core.consts.ts
├── data/                models/, datasources/, adapters/,
│                        core.data.types.ts, core.data.consts.ts
├── presentation/        components/, templates/, pages/, routes/,
│                        providers/, hooks/, utils/, styles/, i18n/,
│                        core.presentation.types.ts, core.presentation.consts.ts
└── container.ts         dependency injection

test/                    mirrors src/ exactly: every test of the project
├── setup.ts
├── core/…
└── features/<feature>/…
```

Create a layer file only when it has content. Tests do not live in `src/` in
this profile (`testing.md` §2).

### Single files and layer files

Role files (`createContact.useCase.ts`, `dns.datasource.ts`,
`projects.adapter.ts`) are always single files, and so are hooks, domain
services, utilities and server actions. None of them becomes a folder, gets an
`index.ts`, or gets a sidecar beside it. Their types and constants go to their
layer's file:

| Layer        | Types                             | Constants                          |
| :----------- | :-------------------------------- | :--------------------------------- |
| domain       | `<feature>.types.ts`              | `<feature>.consts.ts`              |
| data         | `<feature>.data.types.ts`         | `<feature>.data.consts.ts`         |
| presentation | `<feature>.presentation.types.ts` | `<feature>.presentation.consts.ts` |

`core/` uses the same scheme with `core` as the name (`core.types.ts`,
`core.data.types.ts`, `core.presentation.types.ts`).

1. **A layer file holds only its layer's concepts.** The domain file has no
   React, no DTOs and no UI state (`isLoading`, visual variants). The data file
   holds transport details such as datasource options; the DTOs themselves stay
   in `models/`. The presentation file holds hook results, UI state and UI
   constants.
2. **Type imports follow the dependency rule.** The domain file imports nothing
   from `data` or `presentation`. The data and presentation files may import
   domain types. Presentation never imports data types: it does not know the
   DTOs.
3. **Other features see only your domain types.** Like ports and entities,
   `<feature>.types.ts` may be imported by another feature. The data and
   presentation files may not. Types or constants that several features need go
   to `core/`, in the same layer.
4. **Hooks are always flat files.** A hook's return type and constants go to
   `<feature>.presentation.types.ts` and `<feature>.presentation.consts.ts`.

Why one file per layer: in a hexagonal feature, almost no type belongs to a
single role file. A use case's input is also used by the port, the adapter, the
mapper, the hook and the form. One file per layer gives each type one home,
keeps imports stable when role files are renamed or removed, and the layer in
the file name keeps UI state out of the domain.

Components, pages, templates, routes and providers keep their full folder
contract, so their props and local constants stay in their own `Name.types.ts`
and `Name.consts.ts`. The presentation layer file is for what has no component
to own it.

### Layer rules

**Domain** is pure TypeScript with no dependency on React, frameworks, HTTP or
storage.

- _Entities_ are immutable domain objects. For partial updates, use a sentinel
  value to distinguish an omitted field from an explicit `null`.
- _Ports_ are `type`s describing what the domain needs (`ProjectsRepository`).
- _Use cases_ are classes for a single business operation. They receive ports
  through the constructor, keep them in `readonly #private` fields and expose
  `execute()`.
- _Services_ are pure calculation or validation functions.

**Data** implements the ports.

- _Models_ are DTOs shaped like the API response.
- _Mappers_ are static functions converting models to entities and back.
- _Datasources_ perform the external I/O (`fetch`, `EventSource`,
  `localStorage`, clocks and timers behind a port).
- _Adapters_ implement a port by orchestrating a datasource and a mapper. An
  adapter file exports only its adapter class: no constants, DTOs, error
  classes, parsers or helpers, and no direct `fetch`. Constants and types go to
  the layer files above, DTOs to `models/`.
- Each data file is limited to the artifact its name declares.

**Presentation** is the entry layer: components, templates, pages, routes and
the hooks and providers that connect the UI to use cases.

- Hooks obtain use cases from the container and expose UI-shaped state.
- Presentation mechanisms own their contracts. Toast, drawer and modal state,
  visual variants, timing constants and UI callbacks live with their provider
  or component in `core/presentation/`, not in `core/domain`.
- Normalizing errors for display is a presentation utility, not a domain
  service.
- Translations and locale-dependent formatting live only in presentation.

### Dependency rules

- A feature may import another feature's **ports, entities and domain types**
  (`<feature>.types.ts`) only. It never imports another feature's adapters,
  datasources, layer files for `data` or `presentation`, components or pages.
- `core/` is the cross-cutting feature. It follows the same layers, and nothing
  in it belongs to a single feature. Do not move a component to `core` just
  because a second feature imports it: it moves only when it has no single
  owner.
- Import `core` through the alias (`#core/*` via `package.json` `imports`, or
  the host's `@/core/*`). Inside `core` and inside a feature, use relative
  imports.
- The container (`core/container.ts`) is the only place where implementations
  are wired: datasources and adapters as singletons, use cases as factories.

## 5. Hooks

- A hook with nothing else is a flat file, `useX.ts` (`useX.tsx` only if it
  returns JSX). In profiles A and B, once it has a sidecar (`useX.types.ts`,
  `useX.consts.ts` or a colocated `useX.test.ts`), it becomes a folder with an
  `index.ts`:

  ```text
  hooks/useProjects/
  ├── index.ts              export { useProjects }; export type { … }
  ├── useProjects.ts
  ├── useProjects.types.ts
  └── useProjects.test.ts
  ```

  Importers write `@/hooks/useProjects` in both cases.

- In profile C, a hook is always a flat file. Its types and constants go to
  `<feature>.presentation.types.ts` and `.presentation.consts.ts` (§4), and its
  test goes to `test/`.
- Location: `hooks/` in profiles A and B, `presentation/hooks/` in the owning
  feature or `core/presentation/hooks/` in profile C, and the provider's folder
  for a hook that consumes its context.
- One responsibility per hook. Declare its return type when it is exported: in
  `useX.types.ts` in profiles A and B, in the presentation layer file in
  profile C.
- Browser APIs (`window`, `document`, storage) are touched only inside effects
  or event handlers, so server rendering and islands keep working.
- Do not wrap or redefine library hooks such as `useTranslation` or router
  hooks. Use the library API directly.

## 6. Providers and contexts

```text
ToastProvider/
├── index.ts                 provider, consumer hook and public types
├── ToastProvider.tsx        provider component (named export)
├── ToastProvider.types.ts   value, props and input types
├── ToastProvider.consts.ts  durations, limits (when needed)
├── ToastContext.ts          createContext
└── useToast.ts              consumer hook that throws outside the provider
```

- Keep `createContext` and the consumer hook out of the provider's `.tsx`. That
  keeps the component file exporting only a component, which Fast Refresh needs.
  A barrel that re-exports both is fine: the provider's `.tsx` is still the
  refresh boundary, so edits to it refresh in place.
- The context object stays internal unless another module genuinely needs it.
  Consumers use the hook.
- Do not create a global provider for state that is local to one component,
  page or island. Lift state only as far as it is actually shared.
- Memoize the context value when consumers are many or frequent re-renders
  matter.

## 7. Services and utilities

- **Services** contain network, storage, analytics or other external
  integrations. (In profile C this role is played by datasources and adapters.)
- **Utilities** are pure whenever practical.
- In profiles A and B, both follow the module rule. A service or utility that
  is one file with no types, constants or test stays flat
  (`utils/formatDate.ts`). As soon as it has any sidecar, a colocated test
  included, it becomes a folder with an `index.ts`
  (`utils/formatDate/{index.ts, formatDate.ts, formatDate.test.ts}`).
  Importers write `@/utils/formatDate` either way.
- In profile C, utilities and domain services are always flat files, and their
  types and constants go to the layer file (§4).
- Browser-only code guards `window`, `document` and storage access, or runs only
  in client code.
- Component-local helpers stay in the component's `.utils.ts`; promote them to
  `utils/` only when a second module needs them.

## 8. Principles for every profile

- Do not add dependencies, layers or abstractions without a current use case.
- Never expose secrets to client code. Only the host's public env prefix
  reaches the browser (`VITE_`, `NEXT_PUBLIC_`, `PUBLIC_`).
- Validate and narrow external data at the boundary (datasource, route
  controller, server action) before it reaches components.
- Treat third-party scripts, analytics, cookies, trackers and remote fonts as
  product and privacy decisions. Do not add them without explicit approval.
