# Actions

Action group component for edit, delete, or view more information.

## Props

| Property      | Type         | Required | Description                   |
| ------------- | ------------ | -------- | ----------------------------- |
| `onInfo`      | `() => void` | ❌       | Callback for information      |
| `onEdit`      | `() => void` | ❌       | Callback for edit             |
| `onDelete`    | `() => void` | ❌       | Callback for delete           |
| `infoLabel`   | `string`     | ❌       | Custom label for info button  |
| `editLabel`   | `string`     | ❌       | Custom label for edit button  |
| `deleteLabel` | `string`     | ❌       | Custom label for delete button|

## Usage Example

```tsx
import { Actions } from "@neus-ui/components";

export function UserRow({ user }) {
  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>

      <Actions
        onInfo={() => console.log("View info for:", user.name)}
        onEdit={() => console.log("Edit:", user.name)}
        onDelete={() => console.log("Delete:", user.name)}
        infoLabel="View"
        editLabel="Edit"
        deleteLabel="Remove"
      />
    </div>
  );
}
```
