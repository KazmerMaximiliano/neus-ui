# DateInput

Input field for selecting dates with a user-friendly interface.

## Props

| Property       | Type                                              | Required | Description                          |
| -------------- | ------------------------------------------------- | -------- | ------------------------------------ |
| `value`        | `Date \| DateRange`                               | ❌       | Current value                        |
| `defaultValue` | `Date \| DateRange`                               | ❌       | Default value                        |
| `name`         | `string`                                          | ❌       | Name attribute                       |
| `label`        | `string`                                          | ❌       | Input label                          |
| `placeholder`  | `string`                                          | ❌       | Placeholder text                     |
| `disabled`     | `boolean`                                         | ❌       | Disables the input                   |
| `readonly`     | `boolean`                                         | ❌       | Read-only mode                       |
| `required`     | `boolean`                                         | ❌       | Marks as required                    |
| `error`        | `string`                                          | ❌       | Error message                        |
| `mode`         | `'single' \| 'range'`                             | ❌       | Selection mode (default: `'single'`) |
| `onChange`     | `(value: Date \| DateRange \| undefined) => void` | ❌       | Callback on change                   |

## Usage Example

```tsx
import { DateInput } from "@neus-ui/components";
import { useState } from "react";

export function ReservationForm() {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [stayPeriod, setStayPeriod] = useState<{ from?: Date; to?: Date }>({});

  return (
    <form>
      <DateInput
        label="Check-in date"
        mode="single"
        value={checkInDate}
        onChange={setCheckInDate}
        required
      />

      <DateInput
        label="Stay period"
        mode="range"
        value={stayPeriod}
        onChange={setStayPeriod}
      />
    </form>
  );
}
```
