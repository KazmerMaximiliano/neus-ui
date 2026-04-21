# Menu

Contextual or dropdown menu component with actions.

## Props

| Property | Type         | Required | Description                 |
| -------- | ------------ | -------- | --------------------------- |
| `icon`   | `IconType`   | ❌       | Icon that triggers the menu |
| `text`   | `string`     | ❌       | Menu display text           |
| `size`   | `'small' \| 'medium' \| 'large'` | ❌ | Menu size               |
| `items`  | `MenuItem[]` | ✅       | Array of menu items         |

**MenuItem:**

```tsx
type MenuItem = {
  label: string;
  onClick: () => void;
};
```

## Usage Example

```tsx
import { Menu } from "@neus-ui/components";
import { FiMoreVertical } from "react-icons/fi";

export function FileActions() {
  const menuItems = [
    {
      label: "Download",
      onClick: () => console.log("Downloading file..."),
    },
    {
      label: "Share",
      onClick: () => console.log("Opening share dialog..."),
    },
    {
      label: "Report",
      onClick: () => console.log("Reporting file..."),
    },
  ];

  return <Menu icon={FiMoreVertical} text="Actions" items={menuItems} />;
}
```
