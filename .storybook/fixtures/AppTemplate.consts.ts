import { Bell, House, Search, Settings, User } from "lucide-react";

export const DEFAULT_ROUTES = [
  {
    label: "Home",
    icon: House,
    onClick: () => console.log("Home clicked"),
    active: true,
    visible: true,
  },
  {
    label: "Profile",
    icon: User,
    onClick: () => console.log("Profile clicked"),
    active: false,
    visible: true,
  },
  {
    label: "Search",
    icon: Search,
    onClick: () => console.log("Search clicked"),
    active: false,
    visible: true,
  },
  {
    label: "Settings",
    icon: Settings,
    onClick: () => console.log("Settings clicked"),
    active: false,
    visible: true,
  },
  {
    label: "Notifications",
    icon: Bell,
    onClick: () => console.log("Notifications clicked"),
    active: false,
    visible: false,
  },
];

export const MENU_ITEMS = [
  {
    label: "Logout",
    onClick: () => console.log("Logout clicked"),
  },
];
