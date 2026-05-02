# Installation

## Requirements

| Dependency | Version |
| --- | --- |
| React | 19+ |
| TypeScript | 5+ |
| Node.js | 18+ |

## Install the Package

Neus UI is distributed via GitHub. Install it directly:

```bash
# npm
npm install git+https://github.com/KazmerMaximiliano/neus-ui.git

# yarn
yarn add git+https://github.com/KazmerMaximiliano/neus-ui.git

# pnpm
pnpm add git+https://github.com/KazmerMaximiliano/neus-ui.git
```

## Import Styles

Import the CSS bundle once — at your app entry point:

```tsx
import "neus-ui/dist/neus-ui.css";
```

This file provides the CSS custom properties (`--color-primary`, etc.) used by all components. Without it, components render without color.

## Setup ThemeProvider

Wrap your root component with `ThemeProvider`. All Neus UI components must be rendered inside it:

```tsx
import { ThemeProvider } from "neus-ui";

function App() {
  return (
    <ThemeProvider>
      {/* your app */}
    </ThemeProvider>
  );
}
```

### Custom Initial Theme

Pass an `initialTheme` to override the default colors at startup:

```tsx
<ThemeProvider
  initialTheme={{
    primaryColor: "#3975C2",
    successColor: "#4caf50",
    errorColor: "#f44336",
    infoColor: "#2196f3",
  }}
>
  {/* your app */}
</ThemeProvider>
```

## Importing Components

All components are named exports from the root package:

```tsx
import { Button, Input, Modal, DataTable, Select } from "neus-ui";
```

## TypeScript

Types ship with the package. No `@types/*` packages needed:

```tsx
import type { ButtonProps, ButtonColor } from "neus-ui";
```

## Peer Dependencies

Neus UI bundles React separately. Ensure these are installed in your project:

```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

## Verify Installation

```tsx
import "neus-ui/dist/neus-ui.css";
import { ThemeProvider, Button } from "neus-ui";

export default function App() {
  return (
    <ThemeProvider>
      <Button label="It works!" variant="solid" color="primary" />
    </ThemeProvider>
  );
}
```

If the button renders with color, installation is complete.
