# TimeInput

Input field for selecting time with integrated clock interface.

## Props

| Property       | Type                                      | Required | Description                    |
| -------------- | ----------------------------------------- | -------- | ------------------------------ |
| `value`        | `TimeValue`                               | ❌       | Current time                   |
| `defaultValue` | `TimeValue`                               | ❌       | Default time                   |
| `name`         | `string`                                  | ❌       | Name attribute                 |
| `label`        | `string`                                  | ❌       | Input label                    |
| `placeholder`  | `string`                                  | ❌       | Placeholder text               |
| `required`     | `boolean`                                 | ❌       | Marks as required              |
| `error`        | `string`                                  | ❌       | Error message                  |
| `disabled`     | `boolean`                                 | ❌       | Disables the input             |
| `readonly`     | `boolean`                                 | ❌       | Read-only mode                 |
| `format`       | `'12h' \| '24h'`                          | ❌       | Time format (default: `'24h'`) |
| `onChange`     | `(value: TimeValue \| undefined) => void` | ❌       | Callback on change             |

**TimeValue:**

```tsx
type TimeValue = {
  hours: number;
  minutes: number;
};
```

## Usage Example

```tsx
import { TimeInput } from "@neus-ui/components";
import { useState } from "react";

export function AppointmentForm() {
  const [startTime, setStartTime] = useState<
    { hours: number; minutes: number } | undefined
  >();
  const [endTime, setEndTime] = useState<
    { hours: number; minutes: number } | undefined
  >();

  return (
    <form>
      <TimeInput
        label="Start time"
        format="24h"
        value={startTime}
        onChange={setStartTime}
        required
      />

      <TimeInput
        label="End time"
        format="24h"
        value={endTime}
        onChange={setEndTime}
      />
    </form>
  );
}
```
