# Clock

Circular clock component for selecting hours and minutes.

## Props

| Property   | Type                         | Required | Description                    |
| ---------- | ---------------------------- | -------- | ------------------------------ |
| `value`    | `TimeValue`                  | ❌       | Currently selected time        |
| `disabled` | `boolean`                    | ❌       | Disables the clock             |
| `readonly` | `boolean`                    | ❌       | Read-only mode                 |
| `format`   | `'12h' \| '24h'`             | ❌       | Time format (default: `'24h'`) |
| `onChange` | `(value: TimeValue) => void` | ❌       | Callback on time change        |

**TimeValue:**

```tsx
type TimeValue = {
  hours: number;
  minutes: number;
};
```

## Usage Example

```tsx
import { Clock } from "@neus-ui/components";
import { useState } from "react";

export function TimePicker() {
  const [time, setTime] = useState<{ hours: number; minutes: number }>({
    hours: 14,
    minutes: 30,
  });

  return <Clock value={time} onChange={setTime} format="24h" />;
}
```
