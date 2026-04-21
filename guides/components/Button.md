# Button

Versatile button component with multiple variants, colors, and states.

## Props

| Property    | Type                                                | Required | Description                               |
| ----------- | --------------------------------------------------- | -------- | ----------------------------------------- |
| `label`     | `string`                                            | ✅       | Text displayed inside the button          |
| `type`      | `'button' \| 'submit' \| 'reset'`                   | ❌       | HTML button type (default: `'button'`)    |
| `variant`   | `'solid' \| 'outlined' \| 'text'`                   | ❌       | Visual style variant (default: `'solid'`) |
| `color`     | `'primary' \| 'success' \| 'error' \| 'info'`       | ❌       | Color scheme (default: `'primary'`)       |
| `disabled`  | `boolean`                                           | ❌       | Disables the button when true             |
| `fullWidth` | `boolean`                                           | ❌       | Makes the button take full width          |
| `loading`   | `boolean`                                           | ❌       | Shows a loading spinner                   |
| `onClick`   | `(e?: React.MouseEvent<HTMLButtonElement>) => void` | ❌       | Callback function on click                |

## Usage Example

```tsx
import { Button } from "@neus-ui/components";

export function MyComponent() {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <div>
      <Button
        label="Save"
        variant="solid"
        color="primary"
        onClick={handleClick}
      />

      <Button label="Cancel" variant="outlined" color="error" />

      <Button label="Loading..." loading={true} disabled={true} />
    </div>
  );
}
```
