# Button

```tsx
import { Button } from "neus-ui";

<Button label="Save" variant="tonal" color="primary" size="medium" />
```

Variant, color, size, loading, disabled and fullWidth are independent controls.
Busy buttons retain their idle size and accessible name and prevent activation.

## Presentation

| API | Behavior |
| --- | --- |
| `variant` | solid, secondary, tonal, elevated, outlined, text |

Uses all six recipes through ThemeProvider in light and dark mode. See
[Theming](../theming.md) for provider setup and scoped customization.
