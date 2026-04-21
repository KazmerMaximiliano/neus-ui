# AppTemplate

Full application layout template that combines a `Sidebar` for navigation with a main content area and optional top menu.

## Props

| Property   | Type              | Required | Description                                |
| ---------- | ----------------- | -------- | ------------------------------------------ |
| `children` | `React.ReactNode` | ✅       | Main content area                          |
| `routes`   | `SidebarItem[]`   | ✅       | Navigation items passed to the Sidebar     |
| `menu`     | `React.ReactNode` | ❌       | Optional content rendered in the top menu  |

**SidebarItem** (from [Sidebar](./Sidebar.md)):

```tsx
type SidebarItem = {
  label: string;
  icon?: IconType;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;
};
```

## Usage Example

```tsx
import { AppTemplate } from "@neus-ui/templates";
import { FiHome, FiSettings, FiUsers } from "react-icons/fi";
import { useState } from "react";

export function App() {
  const [activePage, setActivePage] = useState("home");

  const routes = [
    {
      label: "Home",
      icon: FiHome,
      onClick: () => setActivePage("home"),
      active: activePage === "home",
    },
    {
      label: "Users",
      icon: FiUsers,
      onClick: () => setActivePage("users"),
      active: activePage === "users",
    },
    {
      label: "Settings",
      icon: FiSettings,
      onClick: () => setActivePage("settings"),
      active: activePage === "settings",
    },
  ];

  return (
    <AppTemplate routes={routes} menu={<span>My App</span>}>
      <h1>Welcome to {activePage}</h1>
    </AppTemplate>
  );
}
```
