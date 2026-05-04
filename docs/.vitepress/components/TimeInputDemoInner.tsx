import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { TimeInput } from "@neus-ui/src/components/TimeInput/TimeInput";

const sectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  padding: "1.5rem 0",
  maxWidth: "360px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#64748b",
  fontWeight: 600,
  marginBottom: "0.75rem",
};

export function TimeInputDemoInner({ colorScheme = "light" }: { colorScheme?: "light" | "dark" }) {
  return (
    <ThemeProvider initialColorScheme={colorScheme}>
      <div style={sectionStyle}>
        <div>
          <p style={labelStyle}>24h format</p>
          <TimeInput label="Time" placeholder="Select time" format="24h" />
        </div>
        <div>
          <p style={labelStyle}>12h format</p>
          <TimeInput label="Time" placeholder="Select time" format="12h" />
        </div>
        <div>
          <p style={labelStyle}>Disabled</p>
          <TimeInput label="Time" placeholder="Disabled" disabled />
        </div>
        <div>
          <p style={labelStyle}>With error</p>
          <TimeInput label="Time" placeholder="Select time" error="Time is required" />
        </div>
      </div>
    </ThemeProvider>
  );
}
