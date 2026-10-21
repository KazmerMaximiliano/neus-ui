# Installation

[Getting started](./README.md) · [Documentation](../README.md)

## Install and import

Use React and ReactDOM 19+ in the consuming application; they are peer dependencies. The
package contains TypeScript declarations and ES module named exports. Install it from npm
(or with `pnpm add neus-ui` / `yarn add neus-ui`), then let `neus init` set up the theme and the AI design tools:

```bash
npm install neus-ui
npx neus init
```

See [Design with AI](./ai-design.md) for what `neus init` writes, and
[Frameworks](./frameworks.md) for Next.js, Astro and other server-rendered hosts.

The `neus` CLI needs Node.js 22.13 or later. For repository development, use the pnpm
version recorded in package.json; see [Development](../contributing/development.md).

Import the exported CSS bundle once at the application entry point. It includes the
component styles, foundations, design-system recipes and palettes. It also supplies a
global box-sizing/reset and body defaults. It loads no fonts: load the active system's faces
in your document ([Fonts](./frameworks.md#fonts)); font stacks provide local fallbacks.

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
typings package is required. Server code and build scripts can import design-system data
and theme helpers without React from `neus-ui/theme`.

## Explore and troubleshoot

- Missing appearance: verify the CSS import and its order.
- Theme hooks throw: render their consumer under ThemeProvider.
- A nested preview uses different tokens: inspect its nearest
  `data-design-system`/`data-color-scheme` boundary.
- Map integration: follow [InteractiveMap](../components/InteractiveMap.md) for keys and service requirements.

[ThemeProvider](../design/theme-provider.md) · [Components](../components/README.md)
