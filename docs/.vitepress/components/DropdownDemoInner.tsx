import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { Dropdown } from "@neus-ui/src/components/Dropdown/Dropdown";
import { User } from "lucide-react";

const items = [
  { label: "My Profile", onClick: () => alert("Profile") },
  { label: "Settings", onClick: () => alert("Settings") },
  { label: "Help", onClick: () => alert("Help") },
  { label: "Sign Out", onClick: () => alert("Sign Out") },
];

export function DropdownDemoInner() {
  return (
    <ThemeProvider>
      <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start", padding: "1.5rem 0" }}>
        <div>
          <p style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600, marginBottom: "0.75rem" }}>With icon + name</p>
          <Dropdown icon={User} name="John Doe" items={items} />
        </div>
        <div>
          <p style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600, marginBottom: "0.75rem" }}>Without name</p>
          <Dropdown icon={User} items={items} />
        </div>
      </div>
    </ThemeProvider>
  );
}
