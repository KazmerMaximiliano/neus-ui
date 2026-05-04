import React, { useState } from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { Sidebar } from "@neus-ui/src/components/Sidebar/Sidebar";
import { House, User, Files, Settings, LogOut } from "lucide-react";
import type { SidebarItem } from "@neus-ui/src/components/Sidebar/Sidebar.types";

const baseItems: SidebarItem[] = [
  { label: "Dashboard", icon: House, visible: true },
  { label: "Profile", icon: User, visible: true },
  { label: "Documents", icon: Files, visible: true },
  { label: "Settings", icon: Settings, visible: true },
  { label: "Logout", icon: LogOut, visible: true },
];

export function SidebarDemoInner({ colorScheme = "light" }: { colorScheme?: "light" | "dark" }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = baseItems.map((item, i) => ({
    ...item,
    active: i === activeIndex,
    onClick: () => setActiveIndex(i),
  }));

  return (
    <ThemeProvider initialColorScheme={colorScheme}>
      <div style={{ padding: "1.5rem 0", height: "320px", display: "flex" }}>
        <Sidebar title="Navigation" items={items} />
      </div>
    </ThemeProvider>
  );
}
