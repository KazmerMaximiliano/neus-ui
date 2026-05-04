import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { Link } from "@neus-ui/src/components/Link/Link";

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: "2rem",
  flexWrap: "wrap",
  alignItems: "center",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#64748b",
  fontWeight: 600,
  marginBottom: "0.75rem",
};

export function LinkDemoInner({ colorScheme = "light" }: { colorScheme?: "light" | "dark" }) {
  return (
    <ThemeProvider initialColorScheme={colorScheme}>
      <div style={{ padding: "1.5rem 0", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <p style={labelStyle}>Primary</p>
          <div style={rowStyle}>
            <Link label="Primary link" type="primary" href="#" />
          </div>
        </div>
        <div>
          <p style={labelStyle}>Secondary</p>
          <div style={rowStyle}>
            <Link label="Secondary link" type="secondary" href="#" />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
