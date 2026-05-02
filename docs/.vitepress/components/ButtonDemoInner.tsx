import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { Button } from "@neus-ui/src/components/Button/Button";

const variants = ["solid", "outlined", "text"] as const;
const colors = ["primary", "success", "error", "info"] as const;

const sectionLabelStyle: React.CSSProperties = {
  marginBottom: "0.75rem",
  fontWeight: 600,
  textTransform: "capitalize",
  fontSize: "0.85rem",
  color: "#64748b",
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: "1rem",
  flexWrap: "wrap",
  alignItems: "center",
};

export function ButtonDemoInner() {
  return (
    <ThemeProvider>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "1.5rem 0" }}>
        {variants.map((variant) => (
          <div key={variant}>
            <p style={sectionLabelStyle}>{variant}</p>
            <div style={rowStyle}>
              {colors.map((color) => (
                <Button
                  key={color}
                  label={color.charAt(0).toUpperCase() + color.slice(1)}
                  variant={variant}
                  color={color}
                />
              ))}
            </div>
          </div>
        ))}

        <div>
          <p style={sectionLabelStyle}>Special States</p>
          <div style={rowStyle}>
            <Button label="Disabled" variant="solid" color="primary" disabled />
            <Button label="Loading" variant="solid" color="primary" loading />
          </div>
        </div>

        <div>
          <p style={sectionLabelStyle}>Full Width</p>
          <Button label="Full Width Button" variant="solid" color="primary" fullWidth />
        </div>
      </div>
    </ThemeProvider>
  );
}
