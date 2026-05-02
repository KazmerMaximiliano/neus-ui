# Link

Link component with consistent styling and two theme variants.

## Props

| Property | Type                       | Required | Description                           |
| -------- | -------------------------- | -------- | ------------------------------------- |
| `label`  | `string`                   | ✅       | Link text                             |
| `type`   | `'primary' \| 'secondary'` | ❌       | Visual variant (default: `'primary'`) |
| `href`   | `string`                   | ❌       | URL destination                       |


## Live Demo

<ClientOnly>
  <LinkDemo />
</ClientOnly>

## Usage Example

```tsx
import { Link } from "@neus-ui/components";

export function Navigation() {
  return (
    <nav>
      <Link label="Home" type="primary" href="/" />

      <Link label="Documentation" type="secondary" href="/docs" />

      <Link label="About Us" href="/about" />
    </nav>
  );
}
```
