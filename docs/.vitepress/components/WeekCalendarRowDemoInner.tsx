import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { WeekCalendarRow } from "@neus-ui/src/components/WeekCalendarRow/WeekCalendarRow";
import type { CalendarEvent } from "@neus-ui/src/components/WeekCalendarRow/WeekCalendarRow.types";

const today = new Date();
const getDay = (offset: number) => {
  const d = new Date(today);
  d.setDate(today.getDate() + offset);
  return d;
};

const weekStart = (() => {
  const d = new Date(today);
  const day = d.getDay();
  d.setDate(d.getDate() - day);
  return d;
})();

const days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(weekStart);
  d.setDate(weekStart.getDate() + i);
  return d;
});

const entry = {
  category: { title: "Room A", label: "Suite", color: "#283593" },
  events: [
    { id: 1, title: "John Doe", start: getDay(0), end: getDay(2), description: "2 guests" },
    { id: 2, title: "Jane Smith", start: getDay(4), end: getDay(5), description: "1 guest" },
  ],
};

const hoverContent = (event: CalendarEvent) => (
  <div style={{
    padding: "8px 12px",
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    fontSize: "13px",
  }}>
    <strong>{event.title}</strong>
    {event.description && <p style={{ margin: "4px 0 0", color: "#64748b" }}>{event.description}</p>}
  </div>
);

export function WeekCalendarRowDemoInner() {
  return (
    <ThemeProvider>
      <div style={{ padding: "1.5rem 0" }}>
        <WeekCalendarRow
          entry={entry}
          days={days}
          color="#283593"
          hoverContent={hoverContent}
          onEventClick={(e) => alert(`Clicked: ${e.title}`)}
        />
      </div>
    </ThemeProvider>
  );
}
