# Card

Flexible card component with optional avatar, leading/trailing header content, color variants, and fill mode.

## Props

| Property      | Type                | Required | Description                                        |
| ------------- | ------------------- | -------- | -------------------------------------------------- |
| `children`    | `React.ReactNode`   | ❌       | Card body content                                  |
| `avatarImage` | `string`            | ❌       | URL for the avatar image                           |
| `avatarAlt`   | `string`            | ❌       | Alt text for avatar; first letter used as fallback |
| `leading`     | `React.ReactNode`   | ❌       | Content rendered in the leading (left) header slot |
| `trailing`    | `React.ReactNode`   | ❌       | Content rendered in the trailing (right) header slot|
| `fill`        | `boolean`           | ❌       | Enables filled background style                    |
| `color`       | `CardColor`         | ❌       | Color variant for the card                         |

**CardColor:**

```tsx
type CardColor = "purple" | "pink" | "red" | "yellow" | "blue" | "green";
```


## Live Demo

<ClientOnly>
  <CardDemo />
</ClientOnly>

## Usage Example

```tsx
import { Card } from "@neus-ui/components";

export function UserCard() {
  return (
    <Card
      avatarImage="https://example.com/avatar.jpg"
      avatarAlt="John"
      leading={<span>John Doe</span>}
      trailing={<span>Admin</span>}
      color="blue"
      fill
    >
      <p>User profile card with details.</p>
    </Card>
  );
}
```
