# Design systems

[Design index](./README.md) · [Documentation](../README.md)

Components define their DOM, states and behavior once. ThemeProvider selects CSS recipes and
an action palette for a system and light/dark mode. Every public component family and both
templates have recipes in all six systems.

| ID | Specification | Role |
| --- | --- | --- |
| `neus` | [Neus UI](../../src/design-systems/neus/DESIGN.md) | Default; owns shared foundations and complete scope resets |
| `apple` | [Apple](../../src/design-systems/apple/DESIGN.md) | Project adaptation of Apple visual guidance |
| `carbon` | [Carbon](../../src/design-systems/carbon/DESIGN.md) | Project adaptation of IBM Carbon |
| `material` | [Material](../../src/design-systems/material/DESIGN.md) | Project adaptation of Material 3 base vocabulary |
| `neobrutalism` | [Neobrutalism](../../src/design-systems/neobrutalism/DESIGN.md) | Bold borders, geometry and hard shadows |
| `vercel` | [Vercel](../../src/design-systems/vercel/DESIGN.md) | Project adaptation of Geist |

External systems are adaptations, not complete implementations of their original libraries.
Their specifications record sources, consultation dates and local decisions. Fonts use local
fallbacks when unavailable.

## Select a system

```tsx
import { Button, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const App = () => (
  <ThemeProvider designSystem="carbon" colorScheme="dark">
    <Button label="Continue" variant="secondary" />
  </ThemeProvider>
);
```

`DESIGN_SYSTEMS` and `DesignSystemId` are public exports for application selectors, also
available without React from `neus-ui/theme`. Changing
designSystem updates the recipe and default palette while retaining the provider's explicit
color overrides. `DESIGN_SYSTEMS.source` is a repository-relative specification path, not a
deployed URL or package export.

## Scope and recipe ownership

Use one global provider for an application. Nested providers always create local boundaries,
even if scope is set to global. Independent previews can explicitly use scope local. Omitted
nested system/mode values inherit their parent; each provider resolves its own action
palette and overrides.

Neus resets all recipe tokens on every data-design-system boundary before sibling system
overrides apply. A nested Neus preview therefore restores its defaults inside a Neobrutalism
parent. Application token overrides must target the desired boundary or a component within
it.

## Storybook

The toolbar controls the global system and light/dark scheme. AppTemplate and FormTemplate
also have a local selector with Inherit global as the initial value. Selecting a local
system changes the template and its composed children while continuing to inherit the
toolbar mode. Other stories document their local defaults. Preview controls never become
component props.

[ThemeProvider API](./theme-provider.md) · [Customization](./customization.md) · [Authoring
recipes](../contributing/design-system-authoring.md)
