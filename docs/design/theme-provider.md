# ThemeProvider

[Design index](./README.md) · [Documentation](../README.md)

ThemeProvider selects the nearest design system and color scheme, resolves action colors,
and exposes the same palette to CSS and React hooks. Import the package stylesheet once
before application overrides.

## Props

| Prop | Type | Default and behavior |
| --- | --- | --- |
| `children` | `ReactNode` | Required |
| `designSystem` | `DesignSystemId` | Parent's system, otherwise `neus`; updates when the prop changes |
| `initialTheme` | `ThemeConfig` | `{}`; initializes this provider's color overrides once |
| `initialColorScheme` | `"light" \| "dark"` | Initializes local mode; otherwise inherits parent or uses light |
| `colorScheme` | `"light" \| "dark"` | Controlled mode; takes precedence over local state and parent |
| `scope` | `"global" \| "local"` | Global at a root; any nested provider is always local |
| `className` | `string` | Applied only to the local scope wrapper |

ThemeConfig contains optional `primaryColor`, `successColor`, `errorColor`, `infoColor` and
`warningColor` strings. Use six-digit hex colors to support all variant and contrast utilities. These are
action color overrides, not a general token/style object. The provider does not accept a
style prop or arbitrary component tokens.

```tsx
import { Button, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const App = () => (
  <ThemeProvider
    designSystem="apple"
    initialColorScheme="light"
    initialTheme={{ primaryColor: "#3975C2", successColor: "#287A44" }}
  >
    <Button label="Continue" />
  </ThemeProvider>
);
```

Changing initialTheme or initialColorScheme after mounting does not reinitialize state. Use
the hooks for later updates or remount the provider to reset it.

## Hooks and runtime updates

`useTheme()` returns `designSystem`, `colorScheme`, `colors`, `updateTheme` and
`setColorScheme`. `useColors()` returns only `colors`. Both require a provider and throw
outside one. The colors object contains primary/success/error/info variants, white/black,
gray values, borderLight and shadow; it is not a complete map of CSS tokens or recipe
geometry.

```tsx
import { Button, ThemeProvider, useColors, useTheme } from "neus-ui";

export const ThemeControls = () => {
  const { colorScheme, setColorScheme, updateTheme } = useTheme();
  const colors = useColors();
  return (
    <>
      <Button label={`Current primary: ${colors.primary.main}`}
        onClick={() => updateTheme({ primaryColor: "#6750A4" })} />
      <Button label="Toggle mode"
        onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")} />
    </>
  );
};

export const App = () => (
  <ThemeProvider initialColorScheme="light"><ThemeControls /></ThemeProvider>
);
```

updateTheme shallow-merges the supplied color fields with previous overrides. Updating
primary leaves success/error/info overrides intact. Supplied colors remain overrides when
the system or mode changes and are used unchanged as the main color in either mode. Omitting
a field does not reset it. There is no dedicated reset method; remount without overrides for
a complete reset.

The provider derives light variants at 10% opacity in light mode and 15% in dark mode, and
dark variants by darkening valid hex colors by 15%. System defaults can provide their own
primary hover/active values. Contrast foregrounds are calculated for supplied colors. These
changes do not guarantee contrast for every arbitrary consumer combination; verify the final
states in the browser.

## Controlled color scheme

```tsx
import { useState } from "react";
import { Button, ThemeProvider } from "neus-ui";

export const App = () => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  return (
    <ThemeProvider colorScheme={mode}>
      <Button label="Toggle mode"
        onClick={() => setMode(mode === "light" ? "dark" : "light")} />
    </ThemeProvider>
  );
};
```

While colorScheme is supplied, setColorScheme still updates internal state but cannot
override the controlled prop. The provider has no onColorSchemeChange callback and does not
automatically follow prefers-color-scheme or persist state. The application owns those
behaviors. Removing the controlled prop exposes local state, then inherited/default mode.

## Global and local scopes

A global root provider adds no wrapper. In a layout effect, before the first client paint,
it sets data-design-system, data-color-scheme and runtime palette variables on
document.documentElement. Cleanup
restores the attributes and properties it changed. Use a single global owner for a document.

```tsx
import { Button, Input, ThemeProvider } from "neus-ui";

export const ScopedExample = () => (
  <ThemeProvider designSystem="carbon" colorScheme="dark">
    <Button label="Carbon dark" />
    <ThemeProvider designSystem="neus" colorScheme="light" className="checkout-theme">
      <Input label="Independent light field" />
    </ThemeProvider>
  </ThemeProvider>
);
```

Every nested provider creates a div.neus-theme-scope with display contents, scope attributes
and inline palette variables. An independent top-level provider can request the same
behavior with scope local. className belongs to this wrapper, which supplies inheritance but
has no layout box: use a real child element for padding, backgrounds, dimensions and
borders.

Nested providers inherit omitted system and mode choices, not the parent's
initialTheme/updateTheme overrides. Each resolves its own palette. Inline palette values on
the boundary also take precedence over ordinary stylesheet declarations of those same
variables there; use initialTheme/updateTheme for those colors.

### Dark band on a light page

`Section tone="inverse"` darkens one band without changing the color scheme: cards and fields
inside keep their light surfaces. When the band's own fields and cards must be dark too, wrap
the Section in a local provider with the dark scheme. A nested provider does not inherit the
parent's colors, so pass the project's colors from `neus.config.json`:

```tsx
import { Section, ThemeProvider } from "neus-ui";
import neusConfig from "../neus.config.json";

export const SignupBand = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider scope="local" colorScheme="dark" initialTheme={neusConfig.colors}>
    <Section tone="subtle">{children}</Section>
  </ThemeProvider>
);
```

The wrapper has no box, so the Section paints the band. Project overrides written with
`[data-design-system="<id>"][data-color-scheme="dark"]` (the selectors `npx neus init` writes,
without `:root`) reach the boundary, so a brand's dark surfaces apply inside it. The same
code renders on the server in every rendering mode.

## CSS, portals and server rendering

CSS follows the DOM, while React context follows the React tree. A component portaled
outside a local wrapper inherits tokens from its portal container even though hooks still
see the original provider. Keep the portal destination within the intended scope or provide
a corresponding theme boundary at that destination. Native popovers and dialogs retain their
DOM inheritance when promoted to the browser top layer.

Local scope attributes and palette variables are included in server markup. Global document
mutations happen only on the client. Server-rendered pages therefore set the attributes on
`<html>` themselves: the library CSS carries every system's palette, and `buildThemeCss` from
`neus-ui/theme` emits custom colors as static CSS. See
[Frameworks](../getting-started/frameworks.md).

CSS token overrides do not update useColors; the hook reflects the provider's resolved
palette. For shared palette changes use the provider; for recipe shape, spacing and instance
styling use [CSS customization](./customization.md).

[Type source](../../src/providers/ThemeProvider/ThemeProvider.types.ts) ·
[Implementation](../../src/providers/ThemeProvider/ThemeProvider.tsx)
