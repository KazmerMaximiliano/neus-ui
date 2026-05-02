import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { DateInput } from "@neus-ui/src/components/DateInput/DateInput";

const labelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#64748b",
  fontWeight: 600,
  marginBottom: "0.75rem",
};

const sectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  padding: "1.5rem 0",
  maxWidth: "320px",
};

export function DateInputDemoInner() {
  return (
    <ThemeProvider>
      <div style={sectionStyle}>
        <div>
          <p style={labelStyle}>Single date</p>
          <DateInput label="Date" placeholder="Select a date" mode="single" />
        </div>
        <div>
          <p style={labelStyle}>Date range</p>
          <DateInput label="Range" placeholder="Select a range" mode="range" />
        </div>
        <div>
          <p style={labelStyle}>Disabled</p>
          <DateInput label="Date" placeholder="Disabled" disabled />
        </div>
        <div>
          <p style={labelStyle}>With error</p>
          <DateInput label="Date" placeholder="Select a date" error="This field is required" />
        </div>
      </div>
    </ThemeProvider>
  );
}
