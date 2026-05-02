import React, { useState } from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { Checkbox } from "@neus-ui/src/components/Checkbox/Checkbox";

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: "2rem",
  alignItems: "center",
  flexWrap: "wrap",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#64748b",
  fontWeight: 600,
  marginBottom: "0.75rem",
};

function ControlledDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <Checkbox checked={checked} onChange={setChecked} />
      <span style={{ fontSize: "0.9rem" }}>{checked ? "Checked" : "Unchecked"}</span>
    </div>
  );
}

export function CheckboxDemoInner() {
  return (
    <ThemeProvider>
      <div style={{ padding: "1.5rem 0", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <p style={labelStyle}>Controlled</p>
          <div style={rowStyle}>
            <ControlledDemo />
          </div>
        </div>
        <div>
          <p style={labelStyle}>Disabled states</p>
          <div style={rowStyle}>
            <Checkbox checked={false} disabled />
            <Checkbox checked={true} disabled />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
