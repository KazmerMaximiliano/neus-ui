# Framework rules

Read `framework`, `rendering` and `paths.styles` in `neus.config.json`.
`neus init` detects them; the rules below depend on how the host renders,
not on its name. `<styles>` below means `paths.styles`.

| `rendering` | Hosts | Theme owner | Library import |
| --- | --- | --- | --- |
| `spa` | Vite + React | One global ThemeProvider in `src/neus/NeusRoot.tsx` | `"neus-ui"` anywhere |
| `ssr` | Next.js Pages Router, React Router framework mode, TanStack Start | Attributes on `<html>` + `<styles>/neus.theme.css` | `"neus-ui"` anywhere |
| `rsc` | Next.js App Router | Attributes on `<html>` + `<styles>/neus.theme.css` | `"neus-ui"` anywhere; `"neus-ui/theme"` for data in server code |
| `islands` | Astro + React | `src/layouts/NeusLayout.astro` + `<styles>/neus.theme.css` | Only inside React components |

## Shared facts

- Component modules ship with `"use client"`. Their look comes from CSS:
  the nearest `data-design-system` / `data-color-scheme` attributes and the
  variables on that boundary. Only `useTheme()` and `useColors()` need a
  ThemeProvider, and they throw without one.
- The library CSS carries every built-in palette. `neus.theme.css` (written by
  `neus init`) adds the project's own colors; it is empty when the project
  keeps the system's colors. Never write palette variables by hand.
- Stylesheet order: `neus-ui/dist/neus-ui.css`, `neus.theme.css`,
  `neus.overrides.css`, then feature styles.
- Fonts: the library loads none. Load the active system's faces once in the
  root document (the `<link>` that `neus init` printed, `next/font`, or
  Fontsource) and, when the family name differs, point `--font-body`,
  `--font-display` and `--font-mono` at it in `neus.overrides.css`.
- Pass `title` to AppTemplate explicitly; its default is "NEUS UI".
- CSS follows the DOM, React context follows the tree. Portaled content
  inherits tokens from where it is mounted; native dialogs keep their DOM
  inheritance in the top layer.
- `DataTable` cells and `lucide-react` icons use those packages' types and
  components: add `ag-grid-community` or `lucide-react` to the project's own
  dependencies before importing from them (pnpm does not expose neus-ui's).

## spa

- The root is wrapped once in `NeusRoot`. Do not add another global
  provider. A nested ThemeProvider is always local; use one only for an
  isolated preview or a feature with its own token scope.
- Dark mode toggles call `useTheme().setColorScheme(...)` under the root.
- Sidebar and AppTemplate `routes` take `href` and render links; pass the
  router's link as `linkComponent` (React Router `Link` needs `to`, so wrap
  it: `({ href, ...props }) => <Link to={href} {...props} />`) and set
  `active` from the current location.

## ssr

- The root document sets `data-design-system` and `data-color-scheme` on
  `<html>` and imports the stylesheets in order. Next.js Pages Router:
  attributes on `<Html>` in `pages/_document.tsx`, stylesheets in
  `pages/_app.tsx`. React Router framework mode: the `Layout` export of
  `app/root.tsx`.
- Do not mount a global ThemeProvider: the stylesheet already themes the
  first paint. Need `useTheme()` somewhere? Wrap that subtree in
  `<ThemeProvider scope="local">`.
- Dark mode: an inline head script sets `data-color-scheme` before paint
  (read the saved choice from `localStorage`); a toggle flips the attribute
  and saves it. `neus.theme.css` covers both modes.

## rsc (Next.js App Router)

Everything in `ssr`, with the root layout `app/layout.tsx` owning `<html>`
and the stylesheet imports, plus:

- Server Components may render neus components directly: they are client
  components and hydrate on their own.
- Props from a Server Component to a neus component must be serializable:
  no functions. Anything with `onClick`, `onChange`, `routes` handlers,
  `cellRenderer` or `renderMobileCard` lives in a Client Component. Build
  one Client Component per interactive screen (for example
  `app/orders/OrdersScreen.tsx` with `"use client"`) and keep data loading
  in the page.
- Server code that needs data (`DESIGN_SYSTEMS`, `resolveTheme`) imports it
  from `"neus-ui/theme"`.
- Navigation: `href` on Button and on Sidebar/AppTemplate routes, with
  `linkComponent={Link}` from `next/link`; `active` from `usePathname()`.
  Routes with only `href` are serializable, but `linkComponent` is a
  function: keep the shell in a Client Component.
- Prefer `next/font` in the root layout for the system's faces; expose each
  one as a CSS variable and map `--font-*` to it in `neus.overrides.css`.

## islands (Astro + React)

Everything in `ssr`, plus:

- `NeusLayout.astro` owns the theme attributes, the fonts and the
  stylesheet imports. Pages use this layout.
- Do not render a global ThemeProvider inside islands: each island is its
  own React root and would write to `<html>`.
- `.astro` for static structure, content and data loading; React islands
  only for interactive regions. App screens (shell, tables, forms, dialogs)
  are one React component per page, rendered with one client directive.
- Props from `.astro` to a hydrated island must be serializable. Build
  `routes` inside the island; pass `currentPath={Astro.url.pathname}`;
  navigate with plain `href` links (no `linkComponent` needed).
- A React component without a client directive renders to static HTML with
  no JavaScript, which suits Badge, Card or Link with no handlers.
- Directives: `client:load` above the fold, `client:visible` below,
  `client:only="react"` for a component that fails in server rendering.
- Verify with `npx astro check`.
