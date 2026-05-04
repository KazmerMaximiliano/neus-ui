import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { Input } from "@neus-ui/src/components/Input/Input";

const types = ["text", "email", "password", "number", "tel", "url"] as const;

const sectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  padding: "1.5rem 0",
  maxWidth: "360px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#64748b",
  fontWeight: 600,
  marginBottom: "0.5rem",
};

export function InputDemoInner({ colorScheme = "light" }: { colorScheme?: "light" | "dark" }) {
  return (
    <ThemeProvider initialColorScheme={colorScheme}>
      <div style={sectionStyle}>
        {types.map((type) => (
          <div key={type}>
            <p style={labelStyle}>{type}</p>
            <Input
              type={type}
              label={type.charAt(0).toUpperCase() + type.slice(1)}
              placeholder={`Enter ${type}...`}
              name={type}
            />
          </div>
        ))}
        <div>
          <p style={labelStyle}>Disabled</p>
          <Input label="Disabled" placeholder="Cannot edit" disabled />
        </div>
        <div>
          <p style={labelStyle}>With error</p>
          <Input label="Email" placeholder="email@example.com" error="Invalid email address" />
        </div>
      </div>
    </ThemeProvider>
  );
}
