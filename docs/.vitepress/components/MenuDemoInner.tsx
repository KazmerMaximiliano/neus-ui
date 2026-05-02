import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { Menu } from "@neus-ui/src/components/Menu/Menu";
import { EllipsisVertical, MoreHorizontal } from "lucide-react";

const items = [
  { label: "Edit", onClick: () => alert("Edit") },
  { label: "Duplicate", onClick: () => alert("Duplicate") },
  { label: "Delete", onClick: () => alert("Delete") },
];

const labelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#64748b",
  fontWeight: 600,
  marginBottom: "0.75rem",
};

export function MenuDemoInner() {
  return (
    <ThemeProvider>
      <div style={{ padding: "1.5rem 0", display: "flex", gap: "3rem", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <p style={labelStyle}>Icon trigger (vertical)</p>
          <Menu icon={EllipsisVertical} items={items} />
        </div>
        <div>
          <p style={labelStyle}>Icon trigger (horizontal)</p>
          <Menu icon={MoreHorizontal} items={items} />
        </div>
        <div>
          <p style={labelStyle}>Text trigger</p>
          <Menu text="Options" items={items} />
        </div>
        <div>
          <p style={labelStyle}>Small size</p>
          <Menu icon={EllipsisVertical} size="small" items={items} />
        </div>
        <div>
          <p style={labelStyle}>Large size</p>
          <Menu icon={EllipsisVertical} size="large" items={items} />
        </div>
      </div>
    </ThemeProvider>
  );
}
