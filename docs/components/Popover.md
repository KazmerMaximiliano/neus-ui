# Popover

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Content anchored to a button, in a non-modal panel on the top layer that moves to stay on
screen.

## Usage

```tsx
import { ThemeProvider, Button, Checkbox, Popover, Stack } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => (
  <ThemeProvider designSystem="neus">
    <Popover label="Filtros" trigger={(props) => <Button {...props} label="Filtros" variant="outlined" />}>
      <Stack gap={3}>
        <Checkbox label="Activos" checked />
        <Checkbox label="Archivados" />
      </Stack>
    </Popover>
  </ThemeProvider>
);
```

`trigger` renders the button that opens the panel: spread the props it receives on a
[Button](./Button.md) or an [IconButton](./IconButton.md). Use Popover for a few controls or
details tied to that button, such as filters, a short explanation or a share link. Use
[Menu](./Menu.md) for a list of actions and [Modal](./Modal.md) for a task that must be
finished or dismissed before going on.

To close the panel from its content, for example after "Apply", control it:

```tsx
const [open, setOpen] = useState(false);

<Popover label="Filtros" open={open} onOpenChange={setOpen} trigger={(props) => <Button {...props} label="Filtros" />}>
  <FiltersForm onApply={() => setOpen(false)} />
</Popover>
```

## Behavior and accessibility

The trigger receives `aria-haspopup="dialog"`, `aria-expanded` and `aria-controls`, its ref
and an `onClick` that toggles the panel. The panel is a `role="dialog"` named by `label`, with
the native `popover="manual"` attribute, so it shows on the top layer above any stacking
context. It is non-modal: the rest of the page stays usable.

On opening, focus moves to the first link, button, field or element with a `tabindex` inside
the panel; without one, it stays on the trigger and Tab reaches the content next. Escape
closes the panel and returns focus to the trigger; a click outside or Tab past its last
control closes it too. The content stays rendered while closed, so form state survives
between openings.

`placement` (`bottom-start` by default) picks the side and which edges line up: `start` lines
up the leading edges, `end` the trailing ones, both following the text direction. When the
panel does not fit, it moves to the other side or edge if that one has more room, and it
follows the trigger on scroll and resize. `open` makes it controlled: the trigger, Escape and
outside clicks call `onOpenChange` and the panel follows `open`. `defaultOpen` opens it on
the first render without moving focus.

The panel needs JavaScript to open, so it lives in a hydrated client component.

## Props

See [the type source](../../src/components/Popover/Popover.types.ts) and
[implementation](../../src/components/Popover/Popover.tsx) for the exact contract. All props
are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `trigger` | `(props: PopoverTriggerProps) => ReactNode` | Required | Renders the trigger; spread `props` on a Button or IconButton |
| `label` | `string` | Required | Accessible name of the panel |
| `children` | `ReactNode` | Required | Content of the panel |
| `placement` | `"bottom-start" \| "bottom-end" \| "top-start" \| "top-end"` | `"bottom-start"` | Preferred side and alignment; flips when it does not fit |
| `open` | `boolean` | Omitted | Whether the panel is open (controlled) |
| `defaultOpen` | `boolean` | `false` | Initial state (uncontrolled) |
| `onOpenChange` | `(open: boolean) => void` | Omitted | Called when the trigger, Escape, an outside click or Tab opens or closes it |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.popover` |
| `panelClassName`, `panelStyle` | `string`, `CSSProperties` | Omitted | `.popover__panel` |

### Supporting types

```ts
type PopoverTriggerProps = {
  ref: Ref<HTMLButtonElement>;
  "aria-haspopup": "dialog";
  "aria-expanded": boolean;
  "aria-controls": string;
  onClick: () => void;
};
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.popover` | `div`, inline block around the trigger and the panel | `className` | `style` | `Always` |
| `.popover__panel` | `div` with `role="dialog"` and `popover="manual"`; also `.popover-panel` | `panelClassName` | `panelStyle` | `Always`; shown while open |

The panel's resolved placement is in `data-placement`, and `:popover-open` matches while it is
open. `.popover-panel` positions every floating panel of the library (Menu, Dropdown, Select,
MultiSelect, DateInput and TimeInput use it too); style the surface through `.popover__panel`.
Use the [stylesheet](../../src/components/Popover/Popover.styles.css) for the exact
declarations.

### Instance styles and classes

```tsx
<Popover label="Compartir" panelClassName="share-panel" trigger={(props) => <IconButton {...props} icon={Share2} label="Compartir" />}>
  …
</Popover>
```

```css
.share-panel {
  width: 20rem;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files. The surface tokens default to the
[overlay](./Menu.md) tokens, so a popover matches the menus and listboxes of its system.

- [popover baseline recipe](../../src/design-systems/neus/generated/recipes/popover.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--popover-background` | Panel fill | `var(--overlay-background)` |
| `--popover-color` | Text color | `var(--overlay-color)` |
| `--popover-border-width` | Panel border | `var(--overlay-border-width)` |
| `--popover-border-color` | Panel border color | `var(--overlay-border-color)` |
| `--popover-radius` | Panel corners | `var(--overlay-radius)` |
| `--popover-shadow` | Panel shadow | `var(--overlay-shadow)` |
| `--popover-font-family` | Panel font | `var(--overlay-font-family)` |
| `--popover-padding` | Space inside the panel | `16px` |
| `--popover-max-width` | Widest the panel grows | `320px` |

### Shared dependencies and runtime values

The gap to the trigger is `--overlay-offset`. While open, the panel carries runtime
properties written on open, scroll and resize: `--popover-top`, `--popover-bottom`,
`--popover-left`, `--popover-right` and `--popover-anchor-width`. Treat them as placement
data, not appearance.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --popover-padding: var(--space-6);
  --popover-max-width: 24rem;
}
```

## Storybook and related guides

The single Popover story exposes props as controls. Related: [Menu](./Menu.md),
[Modal](./Modal.md), [Button](./Button.md), [IconButton](./IconButton.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
