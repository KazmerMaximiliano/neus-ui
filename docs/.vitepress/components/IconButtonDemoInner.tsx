import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { IconButton } from "@neus-ui/src/components/IconButton/IconButton";
import { Star, Trash, Download, Settings } from "lucide-react";

const variants = ["solid", "outlined", "text"] as const;
const colors = ["primary", "success", "error", "info"] as const;
const sizes = ["small", "medium", "large"] as const;

const labelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#64748b",
  fontWeight: 600,
  marginBottom: "0.75rem",
  textTransform: "capitalize",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
  alignItems: "center",
};

export function IconButtonDemoInner({ colorScheme = "light" }: { colorScheme?: "light" | "dark" }) {
  return (
    <ThemeProvider initialColorScheme={colorScheme}>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "1.5rem 0" }}>
        {variants.map((variant) => (
          <div key={variant}>
            <p style={labelStyle}>{variant}</p>
            <div style={rowStyle}>
              {colors.map((color) => (
                <IconButton key={color} icon={Star} variant={variant} color={color} />
              ))}
            </div>
          </div>
        ))}
        <div>
          <p style={labelStyle}>Sizes</p>
          <div style={rowStyle}>
            {sizes.map((size) => (
              <IconButton key={size} icon={Settings} variant="solid" color="primary" size={size} />
            ))}
          </div>
        </div>
        <div>
          <p style={labelStyle}>Special states</p>
          <div style={rowStyle}>
            <IconButton icon={Trash} variant="solid" color="error" disabled />
            <IconButton icon={Download} variant="solid" color="primary" loading />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
