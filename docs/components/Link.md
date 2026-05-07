# Link

Inline hyperlink component with two visual variants. Primary uses the brand color and suits light backgrounds. Secondary uses neutral gray and is legible on both light and dark backgrounds. Both variants show an underline on hover.

## Props

| Property  | Type                       | Required | Description                           |
| --------- | -------------------------- | -------- | ------------------------------------- |
| `label`   | `string`                   | ✅       | Link text                             |
| `type`    | `'primary' \| 'secondary'` | ❌       | Visual variant (default: `'primary'`) |
| `href`    | `string`                   | ❌       | URL destination (default: `'#'`)      |
| `onClick` | `() => void`               | ❌       | Click handler                         |


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
      {/* Primary: brand color, use on light/white backgrounds */}
      <Link label="Home" type="primary" href="/" />

      {/* Secondary: muted gray, legible on any background */}
      <Link label="Documentation" type="secondary" href="/docs" />

      {/* With onClick — inline action, no page navigation */}
      <Link label="Learn more →" type="primary" onClick={() => openModal()} />
    </nav>
  );
}
```
