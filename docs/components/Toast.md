# Toast

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A brief notification that floats in a corner after an action and closes itself. ToastProvider
queues and announces toasts; `useToast` shows them.

## Usage

```tsx
import { Button, ThemeProvider, ToastProvider, useToast } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

const SaveButton = () => {
  const { show } = useToast();
  return (
    <Button
      label="Guardar"
      onClick={() =>
        show({
          status: "success",
          title: "Cambios guardados",
          actions: (close) => <Button label="Deshacer" size="small" variant="text" onClick={close} />,
        })
      }
    />
  );
};

export const App = () => {
  return (
    <ThemeProvider designSystem="neus">
      <ToastProvider label="Notificaciones" dismissLabel="Cerrar">
        <SaveButton />
      </ToastProvider>
    </ThemeProvider>
  );
};
```

Mount one ToastProvider inside ThemeProvider, around the whole application, so every toast
takes the system's tokens. Use a toast to confirm something the person just did or to report
a result that does not block them. Persistent messages about the page belong in an
[Alert](./Alert.md); a decision that must be made now belongs in a [Modal](./Modal.md). Do not
narrate one task with several toasts.

## Behavior and accessibility

ToastProvider renders a labelled region with two lists that stay mounted while empty: a
polite live region and an assertive one. A toast is added to one of them, so screen readers
read it once without moving focus; the toast itself has no role. Keep `live: "assertive"` for
errors that block the task. The newest toasts are shown up to `max`; older ones wait and come
back when a newer one closes.

A toast closes after `duration` milliseconds, 5000 by default, or stays until dismissed with
`null`. Hovering it or moving keyboard focus into it pauses the time, and it resumes with what
was left (WCAG 2.2.1). Every toast has a close button named by `dismissLabel`. Toasts with an
action should stay long enough to use it: 5 to 10 seconds, or `null`. The region lets clicks
through its empty space. Toasts slide in by a few pixels; under
`prefers-reduced-motion: reduce` they appear without motion. A toast opened while a modal
dialog is open sits under the dialog.

## Props

See [the Toast types](../../src/components/Toast/Toast.types.ts),
[the provider types](../../src/providers/ToastProvider/ToastProvider.types.ts) and their
implementations for the exact contract. All props are optional and default to undefined
unless noted.

### ToastProvider

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `children` | `ReactNode` | Omitted | The application |
| `placement` | `"top-start" \| "top-center" \| "top-end" \| "bottom-start" \| "bottom-center" \| "bottom-end"` | `"bottom-end"` | Corner or edge the toasts come from |
| `max` | `number` | `3` | Toasts on screen at once |
| `duration` | `number \| null` | `5000` | Default time on screen; `null` keeps toasts until dismissed |
| `label` | `string` | `"Notifications"` | Accessible name of the region, in the project's language |
| `dismissLabel` | `string` | `"Dismiss"` | Accessible name of every close button, in the project's language |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.toast-region` |
| `listClassName`, `listStyle` | `string`, `CSSProperties` | Omitted | Both `.toast-region__list` |
| `toastClassName`, `toastStyle` | `string`, `CSSProperties` | Omitted | Every `.toast` |

### useToast

`useToast()` returns `{ show, dismiss }` and throws outside a ToastProvider.
`show(toast)` returns the toast's id; `dismiss(id)` closes it. A toast takes:

| Option | Type | Default | Purpose |
| --- | --- | --- | --- |
| `status` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Color and icon |
| `title` | `ReactNode` | Omitted | Short summary in bold |
| `message` | `ReactNode` | Omitted | The message |
| `actions` | `ReactNode \| (close) => ReactNode` | Omitted | Buttons or links; the function form receives a callback that closes this toast |
| `duration` | `number \| null` | The provider's | Time on screen |
| `live` | `"polite" \| "assertive"` | `"polite"` | How screen readers hear it |
| `dismissLabel` | `string` | The provider's | Accessible name of its close button |

### Toast

Toast renders one notification without the provider, for a custom stack. It takes every
[Alert](./Alert.md) prop except `live`, plus:

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `duration` | `number \| null` | Omitted | Milliseconds before `onDismiss` runs; omitted or `null` keeps it open |
| `onDismiss`, `dismissLabel` | `() => void`, `string` | Together | Close button and its accessible name; `onDismiss` also runs when the time is up |

A Toast on its own announces nothing: put it in a live region of yours.

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Hooks do not create a part whose rendering
condition is false. A toast is an Alert, so its parts and part props are the
[Alert's](./Alert.md#anatomy-and-per-part-customization).

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.toast-region` | `section`, labelled | `className` | `style` | `Always` |
| `.toast-region__list` | `ol`, `aria-live` (two) | `listClassName` | `listStyle` | `Always` |
| `.toast-region__item` | `li` | None | None | One per toast shown |
| `.toast` (`.alert`) | `div` | `toastClassName` / `className` | `toastStyle` / `style` | One per toast shown |

The region carries `data-placement`. Use the
[Toast stylesheet](../../src/components/Toast/Toast.styles.css) and the
[region stylesheet](../../src/providers/ToastProvider/ToastProvider.styles.css) for the exact
declarations.

### Instance styles and classes

```tsx
<ToastProvider toastClassName="app-toast" placement="top-center">
  {children}
</ToastProvider>
```

```css
.app-toast {
  --alert-title-weight: 700;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files. A toast's colors, padding and type are the
[Alert tokens](./Alert.md#css-token-reference).

- [toast baseline recipe](../../src/design-systems/neus/generated/recipes/toast.css)

### Surface and geometry

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--toast-width` | Width of a toast and of the region | `360px` |
| `--toast-radius` | Toast corners | `var(--alert-radius)` |
| `--toast-shadow` | Lift over the page | `var(--elevation-floating)` |
| `--toast-gap` | Space between stacked toasts | `12px` |
| `--toast-offset` | Distance from the edges of the screen | `24px` |
| `--toast-z-index` | Stacking of the region | `1100` |

### Motion

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--toast-duration` | Entrance | `0.2s` |
| `--toast-easing` | Entrance easing | `ease-out` |
| `--toast-enter-offset` | Distance a toast slides in from | `8px` |

### Shared dependencies and runtime values

`--alert-radius` and `--elevation-floating`. On narrow screens the region shrinks to the
screen width minus both offsets.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --toast-width: 420px;
  --toast-offset: 16px;
}
```

## Storybook and related guides

The single Toast story exposes props as controls, renders one toast and a button that shows it
through ToastProvider. Related: [Alert](./Alert.md), [Progress](./Progress.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
