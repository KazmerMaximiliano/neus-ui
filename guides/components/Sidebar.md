# Sidebar

Sidebar component with navigation items.

## Props

| Property | Type            | Required | Description            |
| -------- | --------------- | -------- | ---------------------- |
| `items`  | `SidebarItem[]` | ✅       | Array of sidebar items |
| `title`  | `string`        | ❌       | Sidebar title          |

**SidebarItem:**

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
import { Sidebar } from "@neus-ui/components";
import { FiHome, FiSettings, FiUsers, FiLogOut } from "react-icons/fi";
import { useState } from "react";

export function AppLayout() {
  const [activePage, setActivePage] = useState("home");

  const menuItems = [
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
    {
      label: "Logout",
      icon: FiLogOut,
      onClick: () => console.log("Logout"),
      visible: true,
    },
  ];

  return <Sidebar title="My Application" items={menuItems} />;
}
```
