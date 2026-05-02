# Calendar

Interactive calendar component for selecting individual dates, ranges, or multiple dates.

## Props

| Property       | Type                                                        | Required | Description                   |
| -------------- | ----------------------------------------------------------- | -------- | ----------------------------- |
| `value`        | `Date \| Date[] \| DateRange`                               | ❌       | Currently selected value      |
| `defaultValue` | `Date \| Date[] \| DateRange`                               | ❌       | Default value                 |
| `name`         | `string`                                                    | ❌       | Name attribute                |
| `label`        | `string`                                                    | ❌       | Calendar label                |
| `disabled`     | `boolean`                                                   | ❌       | Disables the calendar         |
| `readonly`     | `boolean`                                                   | ❌       | Read-only mode                |
| `multiple`     | `boolean`                                                   | ❌       | Allow multiple date selection |
| `error`        | `string`                                                    | ❌       | Error message                 |
| `onChange`     | `(value: Date \| Date[] \| DateRange \| undefined) => void` | ❌       | Callback on date change       |


## Live Demo

<ClientOnly>
  <CalendarDemo />
</ClientOnly>

## Usage Example

```tsx
import { Calendar } from "@neus-ui/components";
import { useState } from "react";

export function EventScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  return (
    <div>
      <Calendar
        label="Select a date"
        value={selectedDate}
        onChange={setSelectedDate}
      />

      <Calendar label="Date range" value={dateRange} onChange={setDateRange} />
    </div>
  );
}
```
