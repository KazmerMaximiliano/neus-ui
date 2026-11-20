# DrawerHeader

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Title row of a Drawer; inside one, it names the dialog.

## Usage

```tsx
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => (
  <ThemeProvider designSystem="neus">
    <Drawer isOpen={false}>
      <DrawerHeader>Filters</DrawerHeader>
      <DrawerContent>Pick the categories to show.</DrawerContent>
      <DrawerFooter>…</DrawerFooter>
    </Drawer>
  </ThemeProvider>
);
```

## Behavior and accessibility

Inside a [Drawer](./Drawer.md) it takes the id the drawer's `aria-labelledby` points to, so its text is the drawer's name. Keep it to the title: other controls inside it join the name. Do not override its id without a matching `aria-labelledby` on the drawer. It keeps its height while the content scrolls. Native div attributes, `className`, a nullable `style` and `ref` are available.

## Props

See [the type source](../../src/components/Drawer/components/DrawerHeader/DrawerHeader.types.ts) and
[implementation](../../src/components/Drawer/components/DrawerHeader/DrawerHeader.tsx) for the exact
contract. All props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `children` | `ReactNode` | Omitted | Header content; it names the drawer |
| `className` | `string` | Omitted | Additional classes on `.drawer-header` |
| `style` | `CSSProperties \| null` | `null` | Inline styles on `.drawer-header` |
| Native attributes and ref | `div` props | Optional | Forwarded to the root |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.drawer-header` | `div` | `className` | `style` | `Always` |

Use the [stylesheet](../../src/components/Drawer/components/DrawerHeader/DrawerHeader.styles.css) for the
exact declarations.

### Instance styles and classes

```tsx
<DrawerHeader className="example-drawer-header">Filters</DrawerHeader>
```

```css
.example-drawer-header {
  background: var(--color-surface-secondary);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files. The part reads
these tokens of the [drawer recipe](./Drawer.md#css-token-reference):

- [drawer baseline recipe](../../src/design-systems/neus/generated/recipes/drawer.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--drawer-header-padding` | Header padding | `var(--modal-header-padding)` |
| `--drawer-header-gap` | Space between header items | `var(--modal-header-gap)` |
| `--drawer-title-font-family` | Title font | `var(--modal-title-font-family)` |
| `--drawer-title-size` | Title size | `var(--modal-title-size)` |
| `--drawer-title-weight` | Title weight | `var(--modal-title-weight)` |
| `--drawer-title-line-height` | Title line height | `var(--modal-title-line-height)` |
| `--drawer-divider-width` | Rule under the header | `var(--modal-divider-width)` |
| `--drawer-divider-color` | Its color | `var(--modal-divider-color)` |

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --drawer-header-padding: 16px;
}
```

## Storybook and related guides

The single DrawerHeader story, under Base/Drawer, previews the part on a static drawer surface.
Related: [Drawer](./Drawer.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
