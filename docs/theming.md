# Theming

Neus UI uses a dynamic theming system built on CSS custom properties. Colors are set at runtime by `ThemeProvider` and consumed by all components via CSS variables.

## ThemeProvider

Wrap your app once at the root. All components must be inside it:

```tsx
import { ThemeProvider } from "neus-ui";

function App() {
  return (
    <ThemeProvider initialTheme={{ primaryColor: "#3975C2" }}>
      {/* your app */}
    </ThemeProvider>
  );
}
```

### Props

```tsx
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: {
    primaryColor?: string;  // hex color
    successColor?: string;
    errorColor?: string;
    infoColor?: string;
  };
}
```

Each color automatically generates three variants:

| Variant | Rule |
| --- | --- |
| `main` | The original color |
| `light` | 10% opacity |
| `dark` | 15% darker |

## Changing Theme at Runtime

Use `useTheme` to update colors dynamically — no page reload needed:

```tsx
import { useTheme } from "neus-ui";

function ThemeSwitcher() {
  const { updateTheme } = useTheme();

  return (
    <div>
      <button onClick={() => updateTheme({ primaryColor: "#3975C2" })}>
        Blue
      </button>
      <button onClick={() => updateTheme({ primaryColor: "#C83B9B" })}>
        Pink
      </button>
    </div>
  );
}
```

## useColors Hook

Access all resolved theme colors in any component:

```tsx
import { useColors } from "neus-ui";

function CustomCard() {
  const colors = useColors();

  return (
    <div
      style={{
        backgroundColor: colors.primary.main,
        border: `1px solid ${colors.primary.dark}`,
        color: colors.white,
      }}
    >
      Custom styled element
    </div>
  );
}
```

### Colors Object Shape

```tsx
colors.primary.main   // "#3975C2"
colors.primary.light  // "rgba(57, 117, 194, 0.1)"
colors.primary.dark   // "#2a5a9e"
colors.success.main
colors.error.main
colors.info.main
colors.white          // "#ffffff"
colors.black          // "#000000"
colors.gray[900]      // "#333333"
colors.gray[500]      // "#64748b"
// ...
```

## CSS Variables

All theme colors are available as CSS variables on `:root`. Use them directly in any CSS file or inline style:

```css
.my-element {
  background-color: var(--color-primary);
  border-color: var(--color-primary-dark);
  color: var(--color-white);
}

.my-element:hover {
  background-color: var(--color-primary-light);
}
```

### Full Variable Reference

#### Semantic Colors

| Variable | Description |
| --- | --- |
| `--color-primary` | Primary brand color |
| `--color-primary-light` | Primary at 10% opacity |
| `--color-primary-dark` | Primary 15% darker |
| `--color-success` | Success state |
| `--color-success-light` | Success light |
| `--color-success-dark` | Success dark |
| `--color-error` | Error state |
| `--color-error-light` | Error light |
| `--color-error-dark` | Error dark |
| `--color-info` | Info state |
| `--color-info-light` | Info light |
| `--color-info-dark` | Info dark |

#### Neutral Colors

| Variable | Value |
| --- | --- |
| `--color-white` | `#ffffff` |
| `--color-black` | `#000000` |
| `--color-white-100` | White 15% opacity |
| `--color-white-200` | White 25% opacity |
| `--color-white-300` | White 55% opacity |
| `--color-black-100` | Black 10% opacity |
| `--color-black-200` | Black 50% opacity |

#### Gray Scale

| Variable | Hex |
| --- | --- |
| `--color-gray-900` | `#333333` |
| `--color-gray-700` | `#475569` |
| `--color-gray-600` | `#666666` |
| `--color-gray-500` | `#64748b` |
| `--color-gray-400` | `#6b7280` |
| `--color-gray-300` | `#cbd5e1` |
| `--color-gray-200` | `#e0e0e0` |
| `--color-gray-150` | `#e5e7eb` |
| `--color-gray-100` | `#f9fafb` |

#### Utility

| Variable | Description |
| --- | --- |
| `--color-border-light` | Light border (primary at 10% opacity) |
| `--color-shadow` | Shadow color |
