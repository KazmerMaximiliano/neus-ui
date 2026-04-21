# MultiSelect

Component for selecting multiple options from a set.

## Props

| Property              | Type                         | Required | Description                        |
| --------------------- | ---------------------------- | -------- | ---------------------------------- |
| `name`                | `string`                     | ✅       | Name attribute                     |
| `options`             | `SelectOption[]`             | ✅       | Array of available options         |
| `value`               | `string[]`                   | ❌       | Array of selected values           |
| `defaultValue`        | `string[]`                   | ❌       | Array of default values            |
| `label`               | `string`                     | ❌       | Component label                    |
| `placeholder`         | `string`                     | ❌       | Placeholder text                   |
| `error`               | `string`                     | ❌       | Error message                      |
| `disabled`            | `boolean`                    | ❌       | Disables the component             |
| `viewSearchBar`       | `boolean`                    | ❌       | Show search bar inside the dropdown|
| `searchBarPlaceholder`| `string`                     | ❌       | Placeholder for the search bar     |
| `onChange`            | `(values: string[]) => void` | ❌       | Callback on selection change       |

**SelectOption:**

```tsx
type SelectOption = {
  value?: string | null;
  label: string;
};
```

## Usage Example

```tsx
import { MultiSelect } from "@neus-ui/components";
import { useState } from "react";

export function PermissionsManager() {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const permissions = [
    { label: "Read", value: "read" },
    { label: "Write", value: "write" },
    { label: "Delete", value: "delete" },
    { label: "Admin", value: "admin" },
  ];

  return (
    <MultiSelect
      name="permissions"
      label="Permissions"
      options={permissions}
      value={selectedPermissions}
      onChange={setSelectedPermissions}
      placeholder="Select one or more permissions"
      viewSearchBar
      searchBarPlaceholder="Search permissions..."
    />
  );
}
```
