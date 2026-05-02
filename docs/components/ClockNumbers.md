# ClockNumbers

Internal component that displays clock numbers (hours or minutes). Typically used within `Clock`.

## Props

| Property       | Type                   | Required | Description        |
| -------------- | ---------------------- | -------- | ------------------ |
| `mode`         | `'hours' \| 'minutes'` | ✅       | Display mode       |
| `format`       | `'12h' \| '24h'`       | ✅       | Time format        |
| `currentValue` | `TimeValue`            | ✅       | Current time value |

## Note

This is a low-level component and is generally not used directly in applications.
