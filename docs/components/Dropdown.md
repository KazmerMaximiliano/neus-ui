# Dropdown

Dropdown menu component triggered by an icon avatar with a caret indicator.

## Props

| Property | Type             | Required | Description                 |
| -------- | ---------------- | -------- | --------------------------- |
| `icon`   | `IconType`       | ❌       | Icon displayed as avatar    |
| `name`   | `string`         | ❌       | Name displayed in the panel |
| `items`  | `DropdownItem[]` | ✅       | Array of dropdown items     |

**DropdownItem:**

```tsx
type DropdownItem = {
  label: string;
  onClick: () => void;
};
```


## Live Demo

<ClientOnly>
  <DropdownDemo />
</ClientOnly>

## Usage Example

```tsx
import { Dropdown } from "@neus-ui/components";
import { FiUser } from "react-icons/fi";

export function UserDropdown() {
  const items = [
    {
      label: "Profile",
      onClick: () => console.log("Go to profile"),
    },
    {
      label: "Settings",
      onClick: () => console.log("Go to settings"),
    },
    {
      label: "Logout",
      onClick: () => console.log("Logging out..."),
    },
  ];

  return <Dropdown icon={FiUser} name="John Doe" items={items} />;
}
```
