import React, { useState } from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { Calendar } from "@neus-ui/src/components/Calendar/Calendar";
import type { DateRange } from "react-day-picker";

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
};

function SingleDemo() {
  const [value, setValue] = useState<Date | undefined>(new Date());
  return (
    <div>
      <p style={labelStyle}>Single</p>
      <Calendar
        mode="single"
        selected={value as Date}
        required={false}
        value={value}
        onChange={(v) => setValue(v as Date)}
      />
    </div>
  );
}

function RangeDemo() {
  const [value, setValue] = useState<DateRange | undefined>();
  return (
    <div>
      <p style={labelStyle}>Range</p>
      <Calendar
        mode="range"
        selected={value as DateRange}
        required={true}
        value={value}
        onChange={(v) => setValue(v as DateRange)}
      />
    </div>
  );
}

export function CalendarDemoInner({ colorScheme = "light" }: { colorScheme?: "light" | "dark" }) {
  return (
    <ThemeProvider initialColorScheme={colorScheme}>
      <div style={sectionStyle}>
        <SingleDemo />
        <RangeDemo />
      </div>
    </ThemeProvider>
  );
}
