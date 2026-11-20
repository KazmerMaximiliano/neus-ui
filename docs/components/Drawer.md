# Drawer

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A modal panel that slides in from an edge of the screen: filters beside a list, a record's
details, a settings panel, or a sheet of choices from the bottom on a phone. It is composed of
[DrawerHeader](./DrawerHeader.md), [DrawerContent](./DrawerContent.md) and
[DrawerFooter](./DrawerFooter.md), like [Modal](./Modal.md).

## Usage

```tsx
import { useState } from "react";
import {
  Button, Checkbox, Drawer, DrawerContent, DrawerFooter, DrawerHeader, ThemeProvider,
} from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider designSystem="neus">
      <Button label="Filters" variant="outlined" onClick={() => setOpen(true)} />
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerHeader>Filters</DrawerHeader>
        <DrawerContent>
          <Checkbox label="In stock" />
        </DrawerContent>
        <DrawerFooter>
          <Button label="Clear" variant="outlined" onClick={() => setOpen(false)} />
          <Button label="Show results" onClick={() => setOpen(false)} />
        </DrawerFooter>
      </Drawer>
    </ThemeProvider>
  );
};
```

Use a drawer for a task that belongs to the page behind it and benefits from keeping it in
view: refining a list, editing one item, reading details. A short confirmation or a decision
that blocks the flow stays a [Modal](./Modal.md); a few controls tied to one button stay a
[Popover](./Popover.md).

## Behavior and accessibility

The drawer is a native `<dialog>` opened with `showModal()`: the page behind it is inert and
does not scroll, and the browser moves focus into the panel. Tab and Shift+Tab wrap inside it
instead of leaving for the browser's controls; a `keydown` handler that calls
`preventDefault()` keeps its own Tab. Escape and a press that starts and ends on the backdrop
request `onClose`, which the parent answers by setting `isOpen` to `false`; a press that starts
inside the panel and is released outside does not. When the drawer closes, focus returns to
the element that had it before opening. A dialog closed by something else, such as a form with
`method="dialog"`, also calls `onClose`.

`DrawerHeader` names the drawer through `aria-labelledby`; `aria-label` replaces that name, as
for a drawer without a header. Keep the header to its title: a close button inside it would
join the name, so put actions in the footer, or give the drawer an `aria-label`.

The content stays mounted while the drawer is closed, so it slides out and keeps its state
(the filters chosen so far); a closed dialog is hidden from assistive technology. `side`
places it: `start` and `end` follow the writing direction and take the full height, `top` and
`bottom` take their content's height. It slides in and out over `--drawer-duration`, and
without motion under reduced motion.

## Props

See [the type source](../../src/components/Drawer/Drawer.types.ts) and
[implementation](../../src/components/Drawer/Drawer.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `isOpen` | `boolean` | `false` | Shows the drawer (controlled) |
| `onClose` | `() => void` | Omitted | Requested by Escape, a backdrop press and a native close |
| `side` | `"start" \| "end" \| "top" \| "bottom"` | `"end"` | The edge it slides from |
| `children` | `ReactNode` | Omitted | DrawerHeader, DrawerContent, DrawerFooter or free content |
| `className` | `string` | Omitted | Additional classes on `.drawer` |
| `style` | `CSSProperties \| null` | `null` | Inline styles on `.drawer` |
| Native attributes and ref | `dialog` props | Optional | `id`, `aria-label`, `aria-labelledby`, handlers and the ref land on the dialog; `open`, `onClose` and `onCancel` are the drawer's |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.drawer` | `dialog`, `[data-side]` | `className` | `style` | `Always` |
| `.drawer-header` | [DrawerHeader](./DrawerHeader.md) | its `className` | its `style` | When composed |
| `.drawer-content` | [DrawerContent](./DrawerContent.md) | its `className` | its `style` | When composed |
| `.drawer-footer` | [DrawerFooter](./DrawerFooter.md) | its `className` | its `style` | When composed |

The panel is a column: the header and the footer keep their height and the content scrolls
between them. `[data-side]` carries the side, `[open]` the open state and `::backdrop` the
dimmed page. Use the [stylesheet](../../src/components/Drawer/Drawer.styles.css) for the exact
declarations.

### Instance styles and classes

```tsx
<Drawer isOpen={open} onClose={() => setOpen(false)} className="details-drawer">…</Drawer>
```

```css
.details-drawer {
  --drawer-width: 560px;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files. The Neus baseline follows the
[Modal recipe](./Modal.md#css-token-reference), so a drawer matches the dialogs of its system.

- [drawer baseline recipe](../../src/design-systems/neus/generated/recipes/drawer.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--drawer-width` | Width of a start or end drawer | `400px` |
| `--drawer-viewport-margin` | Space always left beside a side drawer on narrow screens | `var(--modal-viewport-margin)` |
| `--drawer-sheet-width` | Largest width of a top or bottom drawer, centered | `100%` |
| `--drawer-sheet-max-height` | Largest height of a top or bottom drawer | `85%` |
| `--drawer-background` | Panel fill | `var(--modal-background)` |
| `--drawer-color` | Panel text | `var(--modal-color)` |
| `--drawer-border-width` | Border on the edge that faces the page | `var(--modal-border-width)` |
| `--drawer-border-color` | Its color | `var(--modal-border-color)` |
| `--drawer-radius` | Corners on the edge that faces the page, for a start or end drawer | `var(--modal-radius)` |
| `--drawer-sheet-radius` | The same corners for a top or bottom drawer | `var(--drawer-radius)` |
| `--drawer-shadow` | Panel shadow | `var(--modal-shadow)` |
| `--drawer-backdrop` | Dimmed page behind | `var(--modal-backdrop)` |
| `--drawer-header-padding` | Header padding | `var(--modal-header-padding)` |
| `--drawer-header-gap` | Space between header items | `var(--modal-header-gap)` |
| `--drawer-title-font-family` | Title font | `var(--modal-title-font-family)` |
| `--drawer-title-size` | Title size | `var(--modal-title-size)` |
| `--drawer-title-weight` | Title weight | `var(--modal-title-weight)` |
| `--drawer-title-line-height` | Title line height | `var(--modal-title-line-height)` |
| `--drawer-content-padding` | Body padding | `var(--modal-content-padding)` |
| `--drawer-content-color` | Body text | `var(--modal-content-color)` |
| `--drawer-content-line-height` | Body line height | `var(--modal-content-line-height)` |
| `--drawer-footer-padding` | Footer padding | `var(--modal-footer-padding)` |
| `--drawer-footer-gap` | Space between footer actions | `var(--modal-footer-gap)` |
| `--drawer-footer-justify` | Footer alignment | `var(--modal-footer-justify)` |
| `--drawer-footer-item-flex` | How each footer action grows; `1 1 0` makes full-width actions | `var(--modal-footer-item-flex)` |
| `--drawer-footer-outlined-border-width` | Outline of an outlined Button in the footer; `0px` for actions that fill the row | `var(--modal-footer-outlined-border-width)` |
| `--drawer-divider-width` | Rule under the header and above the footer | `var(--modal-divider-width)` |
| `--drawer-divider-color` | Its color | `var(--modal-divider-color)` |
| `--drawer-duration` | Slide duration; `0s` turns it off | `0.3s` |
| `--drawer-easing` | Slide curve | `cubic-bezier(0.2, 0, 0, 1)` |
| `--drawer-font-family` | Panel font | `var(--modal-font-family)` |

### Shared dependencies and runtime values

`--drawer-offset` is set by the stylesheet for each side: the distance the panel travels while
it slides. [Sidebar](./Sidebar.md) opens its phone menu in a Drawer and sets these tokens on
`.sidebar__dialog` so its own panel draws the look.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --drawer-width: 480px;
  --drawer-radius: 0px;
}
```

## Storybook and related guides

The single Drawer story exposes props as controls and composes a filters panel; each part has
its own story under Base/Drawer. Related: [Modal](./Modal.md), [Popover](./Popover.md),
[Sidebar](./Sidebar.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
