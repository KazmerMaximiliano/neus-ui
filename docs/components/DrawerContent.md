# DrawerContent

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Body of a Drawer; it scrolls between the header and the footer.

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

It takes the room left between the header and the footer and scrolls inside it, so the title and the actions stay in view. Put the drawer's fields, lists or text here. Native div attributes, `className`, a nullable `style` and `ref` are available.

## Props

See [the type source](../../src/components/Drawer/components/DrawerContent/DrawerContent.types.ts) and
[implementation](../../src/components/Drawer/components/DrawerContent/DrawerContent.tsx) for the exact
contract. All props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `children` | `ReactNode` | Omitted | Body content |
| `className` | `string` | Omitted | Additional classes on `.drawer-content` |
| `style` | `CSSProperties \| null` | `null` | Inline styles on `.drawer-content` |
| Native attributes and ref | `div` props | Optional | Forwarded to the root |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.drawer-content` | `div` | `className` | `style` | `Always` |

Use the [stylesheet](../../src/components/Drawer/components/DrawerContent/DrawerContent.styles.css) for the
exact declarations.

### Instance styles and classes

```tsx
<DrawerContent className="example-drawer-content">Pick the categories to show.</DrawerContent>
```

```css
.example-drawer-content {
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
| `--drawer-content-padding` | Body padding | `var(--modal-content-padding)` |
| `--drawer-content-color` | Body text | `var(--modal-content-color)` |
| `--drawer-content-line-height` | Body line height | `var(--modal-content-line-height)` |

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --drawer-content-padding: 16px;
}
```

## Storybook and related guides

The single DrawerContent story, under Base/Drawer, previews the part on a static drawer surface.
Related: [Drawer](./Drawer.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
