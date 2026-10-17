# Frameworks and server rendering

[Getting started](./README.md) · [Documentation](../README.md)

Neus UI works in any React 19 host. What changes between hosts is who owns the theme: a
global ThemeProvider in client-only apps, or attributes and stylesheets on `<html>` in
server-rendered ones. `npx neus init` detects the host, writes the theme files and prints
the remaining wiring; see [Design with AI](./ai-design.md).

## What the package provides

| Entry | Contents | Where it runs |
| --- | --- | --- |
| `neus-ui` | Components, templates, ThemeProvider, hooks, `DESIGN_SYSTEMS`, color utilities | Component, hook and context modules carry `"use client"`; data modules do not |
| `neus-ui/theme` | `DESIGN_SYSTEMS`, `DESIGN_SYSTEM_PALETTES`, `resolveTheme`, `buildThemeCss` and their types | Anywhere: no React, no CSS |
| `neus-ui/dist/neus-ui.css` | Reset, foundations, the six systems with their palettes, and component recipes | Import once at the root |

The build keeps one file per source module and leaves dependencies external, so an
application only downloads what it imports: a page with a Badge does not load AG Grid,
Google Maps or react-day-picker. The library loads no fonts; see [Fonts](#fonts).

## Theme without JavaScript

Every built-in palette ships in `neus-ui.css`, so a server-rendered page is themed from the
first byte when `<html>` carries the attributes:

```html
<html lang="en" data-design-system="vercel" data-color-scheme="light">
```

Custom action colors come from `buildThemeCss`, which emits the same variables a global
ThemeProvider writes, for both schemes. `neus init` saves it as `neus.theme.css`:

```ts
import { buildThemeCss } from "neus-ui/theme";

const css = buildThemeCss("vercel", { primaryColor: "#0f766e" });
```

Import order: `neus-ui/dist/neus-ui.css`, `neus.theme.css`, `neus.overrides.css`, then
application styles. Do not mount a global ThemeProvider as well; wrap only subtrees that
need `useTheme()` in `<ThemeProvider scope="local">`.

## Vite and other client-only apps

Wrap the root once in a global ThemeProvider (`neus init` writes `src/neus/NeusRoot.tsx`).
The provider applies its attributes and variables in a layout effect, before the first
paint.

```tsx
import { createRoot } from "react-dom/client";
import "neus-ui/dist/neus-ui.css";
import "./styles/neus.overrides.css";
import { App } from "./App";
import { NeusRoot } from "./neus/NeusRoot";

createRoot(document.getElementById("root")!).render(<NeusRoot><App /></NeusRoot>);
```

## Next.js App Router

The root layout owns the theme. Server Components can render Neus components directly;
any prop that is a function (`onClick`, `routes` handlers, `cellRenderer`,
`renderMobileCard`) must be passed from a Client Component.

```tsx
// app/layout.tsx
import type { ReactNode } from "react";
import "neus-ui/dist/neus-ui.css";
import "../styles/neus.theme.css";
import "../styles/neus.overrides.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-design-system="vercel" data-color-scheme="light">
      <body>{children}</body>
    </html>
  );
}
```

```tsx
// app/page.tsx (Server Component)
import { Badge, Card, CardContent } from "neus-ui";
import { DESIGN_SYSTEMS } from "neus-ui/theme";

export default function Page() {
  return (
    <Card>
      <CardContent>
        <Badge label={`${DESIGN_SYSTEMS.length} systems`} color="info" />
      </CardContent>
    </Card>
  );
}
```

Import data such as `DESIGN_SYSTEMS` from `neus-ui/theme` in server code. Navigation in
Sidebar and AppTemplate routes uses `useRouter().push()` inside `onClick`, with `active`
from `usePathname()`.

## Next.js Pages Router, React Router and TanStack Start

Put the attributes on the root document (`pages/_document.tsx`, the `Layout` export of
React Router's `app/root.tsx`, or TanStack Start's root route) and import the stylesheets in
the entry that loads global CSS (`pages/_app.tsx` in the Pages Router).

## Astro

Use React through `@astrojs/react`. A layout owns `<html>` and the stylesheets (`neus init`
writes `src/layouts/NeusLayout.astro`). Components without handlers render as static HTML
with no client directive; interactive regions are islands:

```astro
---
import { Badge } from "neus-ui";
import NeusLayout from "../layouts/NeusLayout.astro";
import { OrdersScreen } from "../components/OrdersScreen";
---

<NeusLayout title="Orders">
  <Badge label="Synced" color="success" />
  <OrdersScreen client:load />
</NeusLayout>
```

Do not render a global ThemeProvider inside islands: each island is its own React root.

## Dark mode before paint

With static attributes, set the saved scheme with an inline script in `<head>` and flip
`data-color-scheme` from your toggle; `neus.theme.css` and the library CSS cover both
schemes.

```html
<script>
  try {
    const saved = localStorage.getItem("neus-color-scheme");
    if (saved === "light" || saved === "dark") document.documentElement.dataset.colorScheme = saved;
  } catch {}
</script>
```

## Fonts

Load the active system's faces once, in the root document, with a `<link>` (the URL
`neus init` prints), `next/font` or Fontsource. Font tokens name the families:

| System | Families | Notes |
| --- | --- | --- |
| `neus` | Manrope, JetBrains Mono | |
| `apple` | SF Pro | Proprietary; falls back to the system font stack |
| `carbon` | IBM Plex Sans, IBM Plex Mono | |
| `material` | Roboto | |
| `neobrutalism` | Inter, JetBrains Mono | |
| `vercel` | Geist, Geist Mono | |

When a loader exposes a different family name (such as `next/font` variables), point
`--font-body`, `--font-display` and `--font-mono` at it in `neus.overrides.css`.

## DataTable and AG Grid

DataTable registers only the AG Grid Community modules its own options need: client-side
rows, text/number/date filters and cell styles. Column definitions that use other grid
features register those modules in the application with `ModuleRegistry.registerModules`.
Install `ag-grid-community` in the application to import its types or modules.

[Installation](./installation.md) · [ThemeProvider](../design/theme-provider.md)
