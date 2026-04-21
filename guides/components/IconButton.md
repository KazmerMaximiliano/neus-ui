# IconButton

Specialized button component that displays an icon with support for different sizes, variants, and colors.

## Props

| Property   | Type                                          | Required | Description                         |
| ---------- | --------------------------------------------- | -------- | ----------------------------------- |
| `icon`     | `IconType` (lucide-react)                     | ✅       | Icon to display                     |
| `type`     | `'button' \| 'submit' \| 'reset'`             | ❌       | HTML button type                    |
| `variant`  | `'solid' \| 'outlined' \| 'text'`             | ❌       | Visual style (default: `'solid'`)   |
| `color`    | `'primary' \| 'success' \| 'error' \| 'info'` | ❌       | Color scheme (default: `'primary'`) |
| `size`     | `'small' \| 'medium' \| 'large'`              | ❌       | Button size (default: `'medium'`)   |
| `disabled` | `boolean`                                     | ❌       | Disables the button                 |
| `loading`  | `boolean`                                     | ❌       | Shows loading state                 |
| `onClick`  | `() => void`                                  | ❌       | Callback function on click          |

## Usage Example

```tsx
import { IconButton } from "@neus-ui/components";
import { Edit2, Trash2, Eye } from "lucide-react";

export function ActionsBar() {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <IconButton
        icon={Edit2}
        color="primary"
        size="medium"
        onClick={() => console.log("Edit")}
      />

      <IconButton icon={Eye} color="info" size="small" />

      <IconButton icon={Trash2} color="error" variant="outlined" />
    </div>
  );
}
```
