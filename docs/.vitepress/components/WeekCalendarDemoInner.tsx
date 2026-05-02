import React from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { WeekCalendar } from "@neus-ui/src/components/WeekCalendar/WeekCalendar";
import type { CalendarEvent } from "@neus-ui/src/components/WeekCalendarRow/WeekCalendarRow.types";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const dayAfter = new Date(today);
dayAfter.setDate(today.getDate() + 2);
const threeDays = new Date(today);
threeDays.setDate(today.getDate() + 3);

const events = [
  {
    category: { title: "Room A", label: "Suite", color: "#283593" },
    events: [
      { id: 1, title: "John Doe", start: today, end: dayAfter, description: "2 guests" },
    ],
  },
  {
    category: { title: "Room B", label: "Standard", color: "#4caf50" },
    events: [
      { id: 2, title: "Jane Smith", start: tomorrow, end: threeDays, description: "1 guest" },
    ],
  },
  {
    category: { title: "Room C", label: "Deluxe", color: "#f44336" },
    events: [],
  },
];

const hoverContent = (event: CalendarEvent) => (
  <div style={{
    padding: "8px 12px",
    backgroundColor: "#fff",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    fontSize: "13px",
    minWidth: "140px",
  }}>
    <strong>{event.title}</strong>
    {event.description && <p style={{ margin: "4px 0 0", color: "#64748b" }}>{event.description}</p>}
  </div>
);

export function WeekCalendarDemoInner() {
  return (
    <ThemeProvider>
      <div style={{ padding: "1.5rem 0" }}>
        <WeekCalendar
          title="Room Schedule"
          events={events}
          hoverContent={hoverContent}
          onEventClick={(e) => alert(`Clicked: ${e.title}`)}
        />
      </div>
    </ThemeProvider>
  );
}
