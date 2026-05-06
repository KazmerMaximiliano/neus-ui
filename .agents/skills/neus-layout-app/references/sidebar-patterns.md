# Sidebar Patterns — Neus Layout App

## SidebarItem Type

```tsx
type SidebarItem = {
  label: string;                    // display text in sidebar
  icon?: LucideIcon;               // lucide-react icon component
  onClick?: () => void;            // navigation handler
  active?: boolean;                // highlights current route
  visible?: boolean;               // permission gate (false = hidden)
};
```

## Common Lucide Icons for Sidebar

Import from `lucide-react`:

| Use case | Icon name |
|----------|-----------|
| Dashboard / Home | `LayoutDashboard`, `Home` |
| Users / People | `Users`, `UserCircle`, `Contact` |
| Products / Items | `Package`, `Box`, `ShoppingBag` |
| Orders | `ShoppingCart`, `Receipt`, `ClipboardList` |
| Settings | `Settings`, `Sliders` |
| Reports / Analytics | `BarChart2`, `TrendingUp`, `PieChart` |
| Calendar / Schedule | `Calendar`, `Clock` |
| Documents / Files | `FileText`, `Folder` |
| Finance / Money | `DollarSign`, `CreditCard`, `Wallet` |
| Map / Location | `MapPin`, `Globe` |
| Messages | `MessageSquare`, `Mail` |
| Tasks | `CheckSquare`, `Kanban` |
| Categories | `Tag`, `Layers` |

## Routes Array Pattern

```tsx
const routes: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    onClick: () => navigate('/'),
    active: currentPath === '/',
    visible: true,
  },
  {
    label: 'Usuarios',
    icon: Users,
    onClick: () => navigate('/users'),
    active: currentPath.startsWith('/users'),
    visible: userHasPermission('users.view'), // permission gate
  },
  {
    label: 'Configuración',
    icon: Settings,
    onClick: () => navigate('/settings'),
    active: currentPath === '/settings',
    visible: true,
  },
];
```

## ThemeProvider in App Shell

Wrap the entire AppTemplate with ThemeProvider at the outermost level:

```tsx
<ThemeProvider initialTheme={{ primaryColor: '#4F46E5' }}>
  <AppTemplate routes={routes} menu={<UserMenu />}>
    {children}
  </AppTemplate>
</ThemeProvider>
```

Only one ThemeProvider per app tree — don't nest multiple.

## Responsive Behavior

- **Desktop (1024px+)**: Fixed 250px sidebar always visible
- **Tablet (769-1024px)**: Collapsed sidebar, expands on hover
- **Mobile (≤768px)**: No sidebar by default, toggle button (☰) shows overlay

This is handled automatically by AppTemplate — no extra code needed.

## Menu Prop (Top Right)

```tsx
// Simple user menu example
const UserMenu = () => (
  <Menu
    text="Mi cuenta"
    size="small"
    items={[
      { label: 'Perfil', onClick: () => navigate('/profile') },
      { label: 'Cerrar sesión', onClick: handleLogout },
    ]}
  />
);

<AppTemplate routes={routes} menu={<UserMenu />}>
  {children}
</AppTemplate>
```
