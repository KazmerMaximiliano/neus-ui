# Select

Dropdown list component for selecting one option from a predefined set.

## Props

| Property              | Type                      | Required | Description                        |
| --------------------- | ------------------------- | -------- | ---------------------------------- |
| `options`             | `SelectOption[]`          | ✅       | Array of available options         |
| `name`                | `string`                  | ❌       | Name attribute                     |
| `value`               | `string`                  | ❌       | Currently selected value           |
| `defaultValue`        | `string`                  | ❌       | Default value                      |
| `placeholder`         | `string`                  | ❌       | Placeholder text                   |
| `label`               | `string`                  | ❌       | Select label                       |
| `error`               | `string`                  | ❌       | Error message                      |
| `disabled`            | `boolean`                 | ❌       | Disables the select                |
| `viewSearchBar`       | `boolean`                 | ❌       | Show search bar inside the dropdown|
| `searchBarPlaceholder`| `string`                  | ❌       | Placeholder for the search bar     |
| `onChange`            | `(value: string) => void` | ❌       | Callback on selection change       |

**SelectOption:**

```tsx
type SelectOption = {
  value?: string | null;
  label: string;
};
```

## Usage Example

```tsx
import { Select } from "@neus-ui/components";
import { useState } from "react";

export function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState("");

  const countries = [
    { label: "Argentina", value: "AR" },
    { label: "Chile", value: "CL" },
    { label: "Colombia", value: "CO" },
    { label: "Mexico", value: "MX" },
    { label: "Peru", value: "PE" },
  ];

  return (
    <Select
      label="Country"
      placeholder="Select a country"
      options={countries}
      value={selectedCountry}
      onChange={setSelectedCountry}
      viewSearchBar
      searchBarPlaceholder="Search country..."
    />
  );
}
```
