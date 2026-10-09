# Theming

[Documentation index](./README.md)

Neus UI uses CSS custom properties for shared semantic colors and component design
tokens. `ThemeProvider` selects a design system, resolves its palette, and exposes
the same colors to CSS and `useColors()`. Neus UI is the default design system.

## ThemeProvider

Wrap your app once at the root. All components must be inside it:

```tsx
import { ThemeProvider } from "neus-ui";

export const App = () => {
  return (
    <ThemeProvider initialTheme={{ primaryColor: "#3975C2" }}>
      {/* your app */}
    </ThemeProvider>
  );
};
```

### Props

```tsx
type ThemeProviderProps = {
  children: ReactNode;
  designSystem?: "neus" | "apple" | "carbon" | "material" | "neobrutalism" | "vercel";
  initialColorScheme?: "light" | "dark";
  colorScheme?: "light" | "dark";
  scope?: "global" | "local";
  className?: string;
  initialTheme?: {
    primaryColor?: string;  // hex color
    successColor?: string;
    errorColor?: string;
    infoColor?: string;
  };
};
```

`initialTheme` and `initialColorScheme` initialize internal state. Change colors
later with `updateTheme()` and mode with `setColorScheme()` from `useTheme()`.
The `colorScheme` prop is controlled and takes precedence over internal state.
`designSystem` can change at any time. Color overrides remain until replaced or
the provider is remounted; their values are used as supplied in both modes.

The root provider writes tokens to the document root without adding a wrapper.
Nested providers always create a local scope. Use `scope="local"` for independent
top-level previews; `className` applies to this scope's `display: contents` wrapper.
Local scopes never change the document root or body. Nested providers inherit
the system and mode when omitted, but resolve their own palette and overrides.

```tsx
<ThemeProvider designSystem="carbon" colorScheme="dark">
  <Button label="Continue" />
  <ThemeProvider designSystem="neus" colorScheme="light">
    <Input label="Name" />
  </ThemeProvider>
</ThemeProvider>
```

Only Button currently has component-specific adaptations in every system.
Input retains its existing implementation and styles.
See [Design systems](./design-systems.md) for architecture, coverage, and extension
steps. Components rendered through a portal outside a local scope inherit the
portal container's CSS theme. Local providers render their scope attributes and
CSS variables on the server as well. Global document updates happen on client mount.

Each resolved color includes three variants:

| Variant | Rule |
| --- | --- |
| `main` | The original color |
| `light` | 10% opacity in light mode, 15% in dark mode |
| `dark` | 15% darker, or the design system's explicit primary hover color |

## Source organization

Each provider owns its implementation, context, types, styles, utilities, and
hooks. The root `providers/index.ts` re-exports each provider's public barrel.

```text
src/providers/
├── index.ts
└── ThemeProvider/
    ├── index.ts
    ├── ThemeProvider.tsx
    ├── ThemeProvider.types.ts
    ├── ThemeProvider.styles.css
    ├── ThemeProvider.utils.ts
    ├── ThemeProvider.test.tsx
    ├── ThemeProvider.stories.tsx
    ├── ThemeContext.ts
    └── hooks/
        ├── index.ts
        └── useTheme.ts
```

Library consumers continue to import `ThemeProvider`, `useTheme`, and the public
theme types from `neus-ui`. Internal consumers can use the `providers` barrel;
`ThemeContext` remains internal to `ThemeProvider`.

## Changing Theme at Runtime

Use `useTheme` to update colors dynamically — no page reload needed:

```tsx
import { useTheme } from "neus-ui";

export const ThemeSwitcher = () => {
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
};
```

## useColors Hook

Access all resolved theme colors in any component:

```tsx
import { useColors } from "neus-ui";

export const PrimaryColor = () => {
  const colors = useColors();

  return <output>{colors.primary.main}</output>;
};
```

### Colors Object Shape

```tsx
colors.primary.main   // "#3975C2"
colors.primary.light  // "rgba(57, 117, 194, 0.1)"
colors.primary.dark   // Resolved hover color
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

Theme colors are available on `:root` for a global provider and on the local
container for a scoped provider. Use them directly in CSS files:

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
| `--color-primary-light` | Subtle primary background |
| `--color-primary-dark` | Primary hover color |
| `--color-primary-active` | Primary pressed color |
| `--color-text-on-primary` | Foreground on a solid primary background |
| `--color-focus` | Focus indicator color |
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
