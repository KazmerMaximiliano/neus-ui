import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { Card } from "@neus-ui/src/components/Card/Card";
import type { CardColor } from "@neus-ui/src/components/Card/Card.types";

const colors: CardColor[] = ["purple", "pink", "red", "yellow", "blue", "green"];

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "1rem",
  padding: "1.5rem 0",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#64748b",
  fontWeight: 600,
  marginBottom: "0.75rem",
};

export function CardDemoInner({ colorScheme = "light" }: { colorScheme?: "light" | "dark" }) {
  return (
    <ThemeProvider initialColorScheme={colorScheme}>
      <div style={{ padding: "1.5rem 0" }}>
        <p style={labelStyle}>Color variants (fill)</p>
        <div style={gridStyle}>
          {colors.map((color) => (
            <Card
              key={color}
              color={color}
              fill
              avatarAlt="User"
              leading={<strong style={{ textTransform: "capitalize" }}>{color}</strong>}
              trailing={<span style={{ fontSize: "0.75rem" }}>Trailing</span>}
            >
              <p style={{ margin: 0, fontSize: "0.85rem" }}>Card body content</p>
            </Card>
          ))}
        </div>
        <p style={{ ...labelStyle, marginTop: "2rem" }}>Without fill</p>
        <div style={gridStyle}>
          {colors.slice(0, 3).map((color) => (
            <Card
              key={color}
              color={color}
              avatarAlt="User"
              leading={<strong style={{ textTransform: "capitalize" }}>{color}</strong>}
            >
              <p style={{ margin: 0, fontSize: "0.85rem" }}>Card body content</p>
            </Card>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}
