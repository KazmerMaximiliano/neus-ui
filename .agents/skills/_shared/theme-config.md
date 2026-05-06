# Neus UI Theme Configuration Reference

## ThemeProvider Setup

Wrap the app root with `ThemeProvider`. Pass `initialTheme` with the colors to override.

```tsx
import { ThemeProvider } from 'neus-ui';

const theme = {
  primaryColor: '#4F46E5',   // indigo
  successColor: '#10B981',   // emerald
  errorColor: '#EF4444',     // red
  infoColor: '#3B82F6',      // blue
};

<ThemeProvider initialTheme={theme}>
  <App />
</ThemeProvider>
```

## Runtime Theme Updates

```tsx
import { useTheme } from 'neus-ui';

const { updateTheme } = useTheme();

// Switch to dark palette at runtime
updateTheme({ primaryColor: '#818CF8' });
```

## Color System — Available CSS Variables

Each semantic color generates 3 variants automatically:

| Variable | Description |
|----------|-------------|
| `var(--color-primary)` | Primary brand color (alias for .main) |
| `var(--color-primary-main)` | Full saturation primary |
| `var(--color-primary-light)` | 10% opacity primary |
| `var(--color-primary-dark)` | 15% darker primary |
| `var(--color-success)` | Success green |
| `var(--color-success-light)` | 10% opacity success |
| `var(--color-success-dark)` | 15% darker success |
| `var(--color-error)` | Error red |
| `var(--color-error-light)` | 10% opacity error |
| `var(--color-error-dark)` | 15% darker error |
| `var(--color-info)` | Info blue |
| `var(--color-info-light)` | 10% opacity info |
| `var(--color-info-dark)` | 15% darker info |

## Fixed Color Scale (not themeable)

```css
/* Grays */
var(--color-gray-900)  /* #111 */
var(--color-gray-700)  /* #333 */
var(--color-gray-600)  /* #555 */
var(--color-gray-500)  /* #777 */
var(--color-gray-400)  /* #999 */
var(--color-gray-300)  /* #bbb */
var(--color-gray-200)  /* #ddd */
var(--color-gray-150)  /* #e8e8e8 */
var(--color-gray-100)  /* #f5f5f5 */

/* White/Black opacity */
var(--color-white)
var(--color-white-100)  /* rgba(255,255,255,0.1) */
var(--color-white-200)  /* rgba(255,255,255,0.2) */
var(--color-white-300)  /* rgba(255,255,255,0.3) */
var(--color-black)
var(--color-black-100)  /* rgba(0,0,0,0.1) — shadow */
var(--color-black-200)  /* rgba(0,0,0,0.2) */

/* Semantic aliases */
var(--color-border-light)  /* same as info-light */
var(--color-shadow)        /* same as black-100 */

/* Card palette (decorative, non-themeable) */
var(--color-card-purple)
var(--color-card-pink)
var(--color-card-red)
var(--color-card-yellow)
var(--color-card-blue)
var(--color-card-green)
```

## useColors() Hook

Access resolved color values in component logic (not CSS):

```tsx
import { useColors } from 'neus-ui';

const MyComponent = () => {
  const colors = useColors();
  // colors.primary, colors.success, colors.error, colors.info
  // Each has: main, light, dark properties
  return <div style={{ borderColor: colors.primary.main }} />;
};
```

## Color Palette Presets (for neus-designer intake)

| Mood | primary | success | error | info |
|------|---------|---------|-------|------|
| Vivos y enérgicos | `#F97316` | `#22C55E` | `#EF4444` | `#06B6D4` |
| Neutros y relajados | `#64748B` | `#4ADE80` | `#F87171` | `#7DD3FC` |
| Corporativos y formales | `#1E40AF` | `#059669` | `#DC2626` | `#0284C7` |
| Creativos y expresivos | `#8B5CF6` | `#10B981` | `#F43F5E` | `#6366F1` |

## Design System Defaults (when no ThemeProvider config)

- Border radius: `16px` cards/modals, `3em` buttons/inputs, `32px` sidebar
- Transitions: `0.2s ease` interactive, `0.3s ease` dropdowns/sidebar
- Shadows: `0 4px 20px var(--color-shadow)` modals, `0 4px 8px var(--color-shadow)` hover
- Typography: Arial, Helvetica, sans-serif; 16px base
- Button label: 0.7em bold uppercase, letter-spacing 0.25em
