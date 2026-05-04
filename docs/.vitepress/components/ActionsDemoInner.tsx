import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { Actions } from "@neus-ui/src/components/Actions/Actions";

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: "2rem",
  flexWrap: "wrap",
  alignItems: "center",
  padding: "1.5rem 0",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  color: "#64748b",
  fontWeight: 600,
  marginBottom: "0.5rem",
};

export function ActionsDemoInner({ colorScheme = "light" }: { colorScheme?: "light" | "dark" }) {
  return (
    <ThemeProvider initialColorScheme={colorScheme}>
      <div style={{ padding: "1.5rem 0" }}>
        <p style={labelStyle}>All actions</p>
        <div style={rowStyle}>
          <Actions
            onInfo={() => alert("Info")}
            onEdit={() => alert("Edit")}
            onDelete={() => alert("Delete")}
          />
        </div>
        <p style={labelStyle}>Info only</p>
        <div style={rowStyle}>
          <Actions onInfo={() => alert("Info")} />
        </div>
        <p style={labelStyle}>Edit + Delete</p>
        <div style={rowStyle}>
          <Actions
            onEdit={() => alert("Edit")}
            onDelete={() => alert("Delete")}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
