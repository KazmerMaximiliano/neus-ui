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
- `.agents/skills/_shared/component-catalog.md` — AppTemplate, Sidebar sections
- `.agents/skills/_shared/theme-config.md` — ThemeProvider config
- `references/sidebar-patterns.md` — SidebarItem[] patterns

## Phase 0 — Collect Data

Ask in free text:
1. App name (shown as title in the sidebar)
2. Sidebar sections (exact): label + lucide-react icon + route
3. Default active section
4. Is there a menu in the top-right header? (e.g.: user avatar, notifications)
5. Primary theme color (hex or "use default")

## Phase 2 — Generate

Read `references/sidebar-patterns.md`.

### Shell structure

```tsx
import { AppTemplate, ThemeProvider } from 'neus-ui';
import { Home, Users, Package, [OtherIcons] } from 'lucide-react';

// Types
import type { SidebarItem } from 'neus-ui';

type AppShellProps = {
  children: React.ReactNode;
  activeRoute?: string;
  onNavigate?: (route: string) => void;
};

const buildRoutes = (activeRoute: string, onNavigate: (r: string) => void): SidebarItem[] => [
  {
    label: '[Section 1 from intake]',
    icon: Home,
    onClick: () => onNavigate('/'),
    active: activeRoute === '/',
    visible: true,
  },
  {
    label: '[Section 2 from intake]',
    icon: [Section2Icon],
    onClick: () => onNavigate('/[route]'),
    active: activeRoute === '/[route]',
    visible: true,
  },
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

### Shell usage

```tsx
// In app router or main layout:
<AppShell activeRoute={currentPath} onNavigate={navigate}>
  <Outlet /> {/* or {children} */}
</AppShell>
```
