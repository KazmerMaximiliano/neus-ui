---
name: neus-layout-app
description: |
  Generates the AppTemplate shell with sidebar navigation and content slot for a Neus UI app.
  Produces a .tsx layout component with SidebarItem[] routes, menu slot, and children.
  Use when user needs the app shell without specific page content. Trigger: "layout de app",
  "shell de app", "app con sidebar", "app shell", "estructura de la app", "layout principal",
  "crear el shell", "skeleton de la app", "base de la aplicación con navegación".
  Always use as the first step when building a full app with AppTemplate.
od:
  mode: prototype
  platform: desktop
  scenario: design
  design_system:
    requires: true
  inputs:
    - name: app_name
      type: string
      required: true
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "App shell for an inventory management system with navigation sidebar"
---

# Neus Layout App

Generates the complete application shell using AppTemplate with sidebar and navigation routes.

## Before starting

Read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — AppTemplate, Sidebar sections
- `.agents/skills/_shared/theme-config.md` — ThemeProvider config
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates
- `references/sidebar-patterns.md` — SidebarItem[] patterns

## Phase 0 — Collect Data

Ask in free text:
1. App name (shown as title in the sidebar)
2. Sidebar sections (exact): label + lucide-react icon + route
3. Default active section
4. Is there a menu in the top-right header? (e.g.: user avatar, notifications)
5. Primary theme color (hex or "use default")
6. Visual mode: light (default) or dark?

## Phase 2 — Generate

Read `references/sidebar-patterns.md`.

Produce **three files** in this order: `AppShell.types.ts` → `AppShell.tsx` → `AppShell.styles.css`.

### AppShell.types.ts

```ts
export type SidebarItem = {
  label: string;
  icon?: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;
};

export type AppShellProps = {
  children: React.ReactNode;
  activeRoute?: string;
  onNavigate?: (route: string) => void;
};
```

### Navigation rule — sidebar vs. in-page access

**CRITICAL:** The sidebar shows ONLY top-level sections (e.g. "Employees", "Products").
Secondary routes (create, edit, detail) MUST have `visible: false` — they are reached via
buttons inside the list/detail pages, NOT via sidebar links.

Rule: if a route is accessible from within another page (e.g. "Add Employee" button in the
list, "Edit" button in the detail), it MUST NOT appear in the sidebar. Only include it in
`buildRoutes` with `visible: false` so state-based routing works, but never `visible: true`.

```
CORRECT:
  { label: 'Employees', visible: true }   // main section → sidebar shows it
  { label: 'Add Employee', visible: false } // reached via list's "Create" button → hidden
  { label: 'Employee Detail', visible: false } // reached via list row → hidden

WRONG:
  { label: 'Add Employee', visible: true }  // creates a redundant sidebar link
  { label: 'Employee Detail', visible: true } // detail has no stable standalone route
```

### Shell structure

```tsx
import { AppTemplate, ThemeProvider } from 'neus-ui';
import { Home, Users, Package, [OtherIcons] } from 'lucide-react';
import type { SidebarItem, AppShellProps } from './AppShell.types';
// Requires: pnpm add lucide-react

const buildRoutes = (activeRoute: string, onNavigate: (r: string) => void) => [
  {
    label: '[Section 1 from intake]',
    icon: Home,
    onClick: () => onNavigate('/'),
    active: activeRoute === '/',
    visible: true,  // top-level section → visible in sidebar
  },
  {
    label: '[Section 2 from intake]',
    icon: [Section2Icon],
    onClick: () => onNavigate('/[route]'),
    active: activeRoute === '/[route]',
    visible: true,  // top-level section → visible in sidebar
  },
  // Secondary routes (create/edit/detail): include here ONLY if state-based routing needs them,
  // always with visible: false — they are accessed via in-page buttons, not the sidebar.
  // ...exact sections from intake
];

export const AppShell = ({
  children,
  activeRoute = '/',
  onNavigate = () => {},
}: AppShellProps) => {
  const routes = buildRoutes(activeRoute, onNavigate);

  return (
    <ThemeProvider initialTheme={{
      primaryColor: '[hex from intake or default]',
      successColor: '#10B981',
      errorColor: '#EF4444',
      infoColor: '#3B82F6',
      // Dark mode preset — uncomment when Mode: dark
      // primaryColor: '#6366f1',
      // successColor: '#10b981',
      // errorColor: '#f87171',
      // infoColor: '#38bdf8',
    }}>
      <AppTemplate
        routes={routes}
        menu={/* UserMenu or null */}
      >
        {children}
      </AppTemplate>
    </ThemeProvider>
  );
};
```

### AppShell.styles.css

```css
/* AppTemplate and Sidebar handle their own surface styles — no sidebar CSS needed here. */

/* Light mode (default): no wrapper overrides needed */

/* Dark mode canvas — uncomment when Mode: dark */
/* html, body { background: #0a0a14; } */
/* AppTemplate passes dark context via ThemeProvider; content pages own their own bg */
```

### Shell usage

```tsx
// In app router or main layout:
<AppShell activeRoute={currentPath} onNavigate={navigate}>
  <Outlet /> {/* or {children} */}
</AppShell>
```
