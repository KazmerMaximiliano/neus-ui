import React, { useState } from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { Clock } from "@neus-ui/src/components/Clock/Clock";
import type { TimeValue } from "@neus-ui/src/components/Clock/Clock.types";

const labelStyle: React.CSSProperties = {
  fontSize: "0.85rem",
  color: "#64748b",
  fontWeight: 600,
  marginBottom: "0.75rem",
};

function ClockDemo({ format }: { format: "12h" | "24h" }) {
  const [value, setValue] = useState<TimeValue>({ hours: 10, minutes: 30 });
  return (
    <div>
      <p style={labelStyle}>{format} format — {value.hours.toString().padStart(2, "0")}:{value.minutes.toString().padStart(2, "0")}</p>
      <Clock format={format} value={value} onChange={setValue} />
    </div>
  );
}

export function ClockDemoInner() {
  return (
    <ThemeProvider>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", padding: "1.5rem 0" }}>
        <ClockDemo format="24h" />
        <ClockDemo format="12h" />
      </div>
    </ThemeProvider>
  );
}
