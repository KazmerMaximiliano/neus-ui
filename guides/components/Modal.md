# Modal

Modal dialog component for displaying content in the foreground with confirmation/cancellation actions.

## Props

| Property             | Type              | Required | Description                                 |
| -------------------- | ----------------- | -------- | ------------------------------------------- |
| `isOpen`             | `boolean`         | ❌       | Controls modal visibility                   |
| `title`              | `string`          | ❌       | Modal title                                 |
| `children`           | `React.ReactNode` | ❌       | Modal content                               |
| `confirmText`        | `string`          | ❌       | Confirm button text (default: `'Confirm'`)  |
| `cancelText`         | `string`          | ❌       | Cancel button text (default: `'Cancel'`)    |
| `confirmButtonColor` | `ButtonColor`     | ❌       | Confirm button color (default: `'primary'`) |
| `onConfirm`          | `() => void`      | ❌       | Callback on confirm                         |
| `onCancel`           | `() => void`      | ❌       | Callback on cancel                          |

## Usage Example

```tsx
import { Modal } from "@neus-ui/components";
import { useState } from "react";

export function ConfirmationDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    console.log("Item deleted");
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Delete Item</button>

      <Modal
        isOpen={isOpen}
        title="Confirm deletion"
        confirmText="Yes, delete"
        cancelText="Cancel"
        confirmButtonColor="error"
        onConfirm={handleDelete}
        onCancel={() => setIsOpen(false)}
      >
        <p>Are you sure you want to delete this item?</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </>
  );
}
```
