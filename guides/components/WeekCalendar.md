# WeekCalendar

Weekly calendar component that displays events organized by categories across a 7-day view with navigation.

## Props

| Property       | Type                                              | Required | Description                                        |
| -------------- | ------------------------------------------------- | -------- | -------------------------------------------------- |
| `title`        | `string`                                          | ❌       | Calendar title (default: `'Calendar'`)             |
| `events`       | `EventsByCategory[]`                              | ❌       | Array of event groups organized by category        |
| `hoverContent` | `(event: CalendarEvent) => React.ReactNode`       | ❌       | Function that returns a tooltip node for an event  |
| `onEventClick` | `(event: CalendarEvent) => void`                  | ❌       | Callback when clicking an event cell               |
| `onDayChange`  | `(weekStart: Date, weekEnd: Date) => void`         | ❌       | Callback when navigating to a different week       |

**EventsByCategory / CalendarEvent:**

```tsx
type EventsByCategory = {
  category: Category;
  events: CalendarEvent[];
};

type Category = {
  color?: string;
  title: string;
  label: string;
};

type CalendarEvent = {
  id?: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
};
```

## Usage Example

```tsx
import { WeekCalendar } from "@neus-ui/components";

export function EventsCalendar() {
  const events = [
    {
      category: { title: "Room A", label: "Suite", color: "purple" },
      events: [
        {
          id: 1,
          title: "John Doe",
          start: new Date(2024, 0, 15),
          end: new Date(2024, 0, 17),
          description: "2 guests",
        },
      ],
    },
    {
      category: { title: "Room B", label: "Standard", color: "blue" },
      events: [
        {
          id: 2,
          title: "Jane Smith",
          start: new Date(2024, 0, 14),
          end: new Date(2024, 0, 14),
          description: "1 guest",
        },
      ],
    },
  ];

  return (
    <WeekCalendar
      title="Reservations"
      events={events}
      hoverContent={(event) => <div>{event.title} — {event.description}</div>}
      onEventClick={(event) => console.log("Clicked:", event.title)}
      onDayChange={(start, end) => console.log("Week:", start, end)}
    />
  );
}
```
