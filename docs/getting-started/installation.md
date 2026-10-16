# Installation

[Getting started](./README.md) · [Documentation](../README.md)

## Install and import

Use React and ReactDOM 19+ in the consuming application. The package contains TypeScript
declarations and ES module named exports. Install from GitHub:

```bash
pnpm add git+https://github.com/KazmerMaximiliano/neus-ui.git
```

Git installation can run the package's build preparation. For repository development, use
the pnpm version recorded in package.json and a compatible Node.js version; see
[Development](../contributing/development.md).

Import the exported CSS bundle once at the application entry point. It includes the
component styles, foundations and design-system recipes. It also supplies a global
box-sizing/reset and body defaults. The stylesheet requests its baseline fonts from Google
Fonts; font stacks provide local fallbacks.

```tsx
import { Button, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";
import "./application.css";

export const App = () => (
  <ThemeProvider designSystem="neus">
    <Button label="It works" />
  </ThemeProvider>
);
```

Load application overrides after the library stylesheet. The package's public stylesheet
subpath is `neus-ui/dist/neus-ui.css`; source/generated repository paths are documentation
references, not supported package subpath imports.

## TypeScript

Import public types from the same package entry point:

```tsx
import type { ButtonProps, DesignSystemId, ThemeConfig } from "neus-ui";

const system: DesignSystemId = "carbon";
const colors: ThemeConfig = { primaryColor: "#3975C2" };
const button: ButtonProps = { label: "Continue", variant: "secondary" };
```

Your React application still needs the normal React/ReactDOM typings. No separate Neus UI
typings package is required. The current manifest declares React and ReactDOM as
dependencies; the library build externalizes both. Do not assume that they are declared as
peerDependencies.

## Explore and troubleshoot

- Missing appearance: verify the CSS import and its order.
- Theme hooks throw: render their consumer under ThemeProvider.
- A nested preview uses different tokens: inspect its nearest
  `data-design-system`/`data-color-scheme` boundary.
- Map integration: follow [InteractiveMap](../components/InteractiveMap.md) for keys and service requirements.

[ThemeProvider](../design/theme-provider.md) · [Components](../components/README.md)
