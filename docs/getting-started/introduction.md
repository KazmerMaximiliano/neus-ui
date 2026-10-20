# Introduction

[Getting started](./README.md) · [Documentation](../README.md)

Neus UI is a React 19+ component library with named TypeScript exports: 40 components
(counting public subcomponents), nine page sections in `neus-ui/sections` and two layout
templates. Components own structure, accessibility and
interactions. CSS tokens provide appearance through six scoped systems: Neus UI, Apple,
Carbon, Material, Neobrutalism and Vercel.

## Build an interface

Import the stylesheet once, wrap your interface with ThemeProvider, and compose components.
Select a system at the provider boundary rather than on each component.

```tsx
import { Button, Input, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const App = () => (
  <ThemeProvider designSystem="material" initialColorScheme="light">
    <Input label="Name" name="name" />
    <Button label="Continue" />
  </ThemeProvider>
);
```

## Customize appearance

ThemeProvider selects a system/mode and supports runtime overrides for five semantic action
colors (primary, success, error, info and warning). Stylesheets override shared or component-specific CSS tokens. Individual components
expose root classes and per-part style/class props; their guides identify the actual DOM
destination of each hook.

Card and Modal use public compositional sections. AppTemplate composes navigation and page
content; FormTemplate arranges fields and actions inside a consumer-owned form. The
application owns fetching, validation and business behavior.

[Install the library](./installation.md) · [Customization guide](../design/customization.md)
