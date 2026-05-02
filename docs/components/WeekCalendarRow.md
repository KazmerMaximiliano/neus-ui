# WeekCalendarRow

Row component used internally by `WeekCalendar` to render a single category row with its events across the week days.

## Props

| Property       | Type                                        | Required | Description                                        |
| -------------- | ------------------------------------------- | -------- | -------------------------------------------------- |
| `entry`        | `EventsByCategory`                          | ✅       | Category with its events                           |
| `days`         | `Date[]`                                    | ✅       | Array of dates representing the week               |
| `color`        | `string`                                    | ✅       | Color for the category indicator                   |
| `hoverContent` | `(event: CalendarEvent) => React.ReactNode` | ❌       | Function that returns a tooltip node for an event  |
| `onEventClick` | `(event: CalendarEvent) => void`            | ❌       | Callback when clicking an event cell               |

## Note

This is typically used internally by `WeekCalendar` and does not need to be used directly in most applications.
