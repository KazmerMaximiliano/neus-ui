# DrawerFooter

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Actions at the end of a Drawer.

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

Its actions sit in a row that wraps, aligned as the system aligns dialog actions, and keep their place while the content scrolls. Put the primary action last. Native div attributes, `className`, a nullable `style` and `ref` are available.

## Props

See [the type source](../../src/components/Drawer/components/DrawerFooter/DrawerFooter.types.ts) and
[implementation](../../src/components/Drawer/components/DrawerFooter/DrawerFooter.tsx) for the exact
contract. All props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `children` | `ReactNode` | Omitted | Footer actions |
| `className` | `string` | Omitted | Additional classes on `.drawer-footer` |
| `style` | `CSSProperties \| null` | `null` | Inline styles on `.drawer-footer` |
| Native attributes and ref | `div` props | Optional | Forwarded to the root |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.drawer-footer` | `div` | `className` | `style` | `Always` |

Use the [stylesheet](../../src/components/Drawer/components/DrawerFooter/DrawerFooter.styles.css) for the
exact declarations.

### Instance styles and classes

```tsx
<DrawerFooter className="example-drawer-footer">Footer actions</DrawerFooter>
```

```css
.example-drawer-footer {
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
| `--drawer-footer-padding` | Footer padding | `var(--modal-footer-padding)` |
| `--drawer-footer-gap` | Space between actions | `var(--modal-footer-gap)` |
| `--drawer-footer-justify` | Footer alignment | `var(--modal-footer-justify)` |
| `--drawer-footer-item-flex` | How each action grows; `1 1 0` makes full-width actions | `var(--modal-footer-item-flex)` |
| `--drawer-footer-outlined-border-width` | Outline of an outlined Button in the footer; `0px` for actions that fill the row | `var(--modal-footer-outlined-border-width)` |
| `--drawer-divider-width` | Rule above the footer | `var(--modal-divider-width)` |
| `--drawer-divider-color` | Its color | `var(--modal-divider-color)` |

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --drawer-footer-padding: 16px;
}
```

## Storybook and related guides

The single DrawerFooter story, under Base/Drawer, previews the part on a static drawer surface.
Related: [Drawer](./Drawer.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
