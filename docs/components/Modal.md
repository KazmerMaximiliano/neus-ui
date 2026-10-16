# Modal

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Controlled native dialog with composable sections.

## Usage

```tsx
import { useState } from "react";
import { ThemeProvider, Button, Modal, ModalHeader, ModalContent, ModalFooter } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider designSystem="neus">
      <><Button label="Open dialog" onClick={() => setOpen(true)} /><Modal isOpen={open} onClose={() => setOpen(false)}><ModalHeader><h2>Confirm changes</h2></ModalHeader><ModalContent>Review the changes.</ModalContent><ModalFooter><Button label="Close" onClick={() => setOpen(false)} /></ModalFooter></Modal></>
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

`isOpen` defaults to false and is controlled. The component uses showModal/close on a native
dialog. Escape and backdrop interaction request onClose; update isOpen in the consumer.
Children compose the header, content and footer; confirm/cancel labels or callbacks are not
Modal props. ModalHeader supplies the generated title id; alternatively provide aria-label
or aria-labelledby. Native dialog props/ref are forwarded except the managed
open/onClose/onCancel fields.

The backdrop is a pseudo-element: target `.your-dialog::backdrop` or backdrop tokens, not a
nonexistent backdrop prop. The dialog stays under its provider in the DOM, preserving CSS
inheritance in the browser top layer.

## Props

See [the type source](../../src/components/Modal/Modal.types.ts) and
[implementation](../../src/components/Modal/Modal.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `className` | `string` | Omitted | Additional classes on `.modal` |
| `children` | `ReactNode` | Omitted | Composition of ModalHeader, ModalContent, ModalFooter or free content |
| `isOpen` | `boolean` | `false` | Shows the native modal dialog |
| `onClose` | `(() => void)` | Omitted | Requested by Escape and backdrop clicks |
| `style` | `CSSProperties \| null` | `null` | Inline styles on `.modal` |
| Native attributes and ref | React props for a dialog, excluding managed open/onClose/onCancel | Optional | Forwarded to the root; the type source lists excluded/replaced fields |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.modal` | `dialog` | `className` | `style` | `Always` |

Interaction states use native pseudo-classes and ARIA/data attributes where present.

Use the [stylesheet](../../src/components/Modal/Modal.styles.css) for pseudo-elements and
state selectors. For shared field/listbox parts, also inspect the shared styles linked from
the implementation. Consumer content and third-party generated internals retain their own
customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<><Button label="Open dialog" onClick={() => setOpen(true)} /><Modal className="example-modal" style={{ outlineOffset: 4 }} isOpen={open} onClose={() => setOpen(false)}><ModalHeader><h2>Confirm changes</h2></ModalHeader><ModalContent>Review the changes.</ModalContent><ModalFooter><Button label="Close" onClick={() => setOpen(false)} /></ModalFooter></Modal></>
```

```css
.example-modal {
  outline-offset: 4px;
}
.example-modal:focus-visible {
  outline: 2px solid var(--color-focus);
}
```

Style props win over ordinary stylesheet declarations for the same property. Use a
stylesheet for hover, focus, disabled states and pseudo-elements. Custom properties still
follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [modal baseline recipe](../../src/design-systems/neus/generated/recipes/modal.css)

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--modal-backdrop` | modal backdrop | `var(--color-overlay)` |
| `--modal-content-padding` | modal content padding | `24px` |
| `--modal-divider-width` | modal divider width | `1px` |
| `--modal-footer-gap` | modal footer gap | `12px` |
| `--modal-footer-item-flex` | modal footer item flex | `0 1 auto` |
| `--modal-footer-justify` | modal footer justify | `flex-end` |
| `--modal-footer-padding` | modal footer padding | `16px 24px` |
| `--modal-header-gap` | modal header gap | `8px` |
| `--modal-header-padding` | modal header padding | `24px` |
| `--modal-radius` | modal radius | `var(--radius-default)` |
| `--modal-title-size` | modal title size | `var(--fs-xl)` |
| `--modal-viewport-margin` | modal viewport margin | `16px` |
| `--modal-width` | modal width | `500px` |

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--modal-background` | modal background | `var(--color-surface)` |
| `--modal-border-color` | modal border color | `transparent` |
| `--modal-border-width` | modal border width | `0px` |
| `--modal-color` | modal color | `var(--color-text-primary)` |
| `--modal-content-color` | modal content color | `var(--color-text-secondary)` |
| `--modal-divider-color` | modal divider color | `var(--color-border-subtle)` |
| `--modal-shadow` | modal shadow | `var(--elevation-dialog)` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--modal-content-line-height` | modal content line height | `1.5` |
| `--modal-font-family` | modal font family | `var(--font-body)` |
| `--modal-title-font-family` | modal title font family | `var(--font-display)` |
| `--modal-title-line-height` | modal title line height | `1.3` |
| `--modal-title-weight` | modal title weight | `600` |

### Scoped recipe override

Wrap the usage example in a local provider with a class:

```tsx
<ThemeProvider scope="local" designSystem="vercel" className="example-scope">
  {/* Place the component usage here. */}
</ThemeProvider>
```

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --modal-content-padding: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Modal story exposes props as controls. Design selection is preview configuration;
applications select it through ThemeProvider. Public sections:
[ModalHeader](./ModalHeader.md), [ModalContent](./ModalContent.md),
[ModalFooter](./ModalFooter.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
