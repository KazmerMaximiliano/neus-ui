# Alert

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

An inline message about the page or a task: information, success, a warning or an error.

## Usage

```tsx
import { ThemeProvider, Alert, Button } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = ({ onDismiss }: { onDismiss: () => void }) => {
  return (
    <ThemeProvider designSystem="neus">
      <Alert
        status="warning"
        title="Tu prueba termina en 3 días"
        actions={<Button label="Agregar medio de pago" size="small" variant="outlined" />}
        onDismiss={onDismiss}
        dismissLabel="Cerrar"
      >
        Agregá un medio de pago para conservar tus sesiones.
      </Alert>
    </ThemeProvider>
  );
};
```

Use Alert for a message that belongs to the page or a form as a whole. A problem with one
field belongs to that field's `error`.

## Behavior and accessibility

`live` decides how assistive technology hears the message. `polite` (default) gives
`role="status"`, announced when the reader is idle; `assertive` gives `role="alert"`, which
interrupts: keep it for errors that appear after an action. `off` adds no role, for messages
already on the page when it loads. The status icon is decorative (`aria-hidden`); the color
always comes with the icon and the text. `icon` replaces it with any node, and `null` removes
it. The close button exists only with `onDismiss`, and the types require `dismissLabel` with
it so the button has a name in the project's language. The application removes the alert.

## Props

See [the type source](../../src/components/Alert/Alert.types.ts) and
[implementation](../../src/components/Alert/Alert.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `status` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Meaning; sets the color and the default icon |
| `title` | `ReactNode` | Omitted | Short summary in bold |
| `children` | `ReactNode` | Omitted | The message |
| `actions` | `ReactNode` | Omitted | Buttons or links under the message |
| `icon` | `ReactNode \| null` | Status icon | Replaces the icon; `null` removes it |
| `live` | `"polite" \| "assertive" \| "off"` | `"polite"` | `role="status"`, `role="alert"` or no role |
| `onDismiss` | `() => void` | Omitted | Shows the close button and runs on click |
| `dismissLabel` | `string` | Required with `onDismiss` | Accessible name of the close button |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.alert` |
| `iconClassName`, `iconStyle` | `string`, `CSSProperties` | Omitted | `.alert__icon` |
| `titleClassName`, `titleStyle` | `string`, `CSSProperties` | Omitted | `.alert__title` |
| `contentClassName`, `contentStyle` | `string`, `CSSProperties` | Omitted | `.alert__content` |
| `actionsClassName`, `actionsStyle` | `string`, `CSSProperties` | Omitted | `.alert__actions` |
| `dismissClassName`, `dismissStyle` | `string`, `CSSProperties` | Omitted | `.alert__dismiss` (an IconButton) |
| Native attributes and ref | React props for a `div` | Optional | Forwarded to `.alert`, except `title` and `role` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.alert` | `div` | `className` | `style` | `Always` |
| `.alert__icon` | `span` | `iconClassName` | `iconStyle` | `icon !== null` |
| `.alert__body` | `div` | None | None | `Always` |
| `.alert__title` | `p` | `titleClassName` | `titleStyle` | `title` given |
| `.alert__content` | `div` | `contentClassName` | `contentStyle` | `children` given |
| `.alert__actions` | `div` | `actionsClassName` | `actionsStyle` | `actions` given |
| `.alert__dismiss` | IconButton `button` | `dismissClassName` | `dismissStyle` | `onDismiss` given |

State/variant selectors: `.alert[data-status="info" | "success" | "warning" | "error"]`. Use
the [stylesheet](../../src/components/Alert/Alert.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Alert className="checkout-alert" titleStyle={{ fontSize: 16 }} status="error" title="No pudimos cobrar">Revisá la tarjeta.</Alert>
```

```css
.checkout-alert {
  margin-block-end: var(--space-6);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [alert baseline recipe](../../src/design-systems/neus/generated/recipes/alert.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--alert-color` | alert color | `var(--color-text-primary)` |
| `--alert-info-background` | alert info background | `color-mix(in srgb, var(--color-info) 8%, var(--color-surface))` |
| `--alert-info-border-color` | alert info border color | `color-mix(in srgb, var(--color-info) 35%, var(--color-surface))` |
| `--alert-info-icon-color` | alert info icon color | `var(--color-info-text)` |
| `--alert-success-background` | alert success background | `color-mix(in srgb, var(--color-success) 8%, var(--color-surface))` |
| `--alert-success-border-color` | alert success border color | `color-mix(in srgb, var(--color-success) 35%, var(--color-surface))` |
| `--alert-success-icon-color` | alert success icon color | `var(--color-success-text)` |
| `--alert-warning-background` | alert warning background | `color-mix(in srgb, var(--color-warning) 10%, var(--color-surface))` |
| `--alert-warning-border-color` | alert warning border color | `color-mix(in srgb, var(--color-warning) 45%, var(--color-surface))` |
| `--alert-warning-icon-color` | alert warning icon color | `var(--color-warning-text)` |
| `--alert-error-background` | alert error background | `color-mix(in srgb, var(--color-error) 8%, var(--color-surface))` |
| `--alert-error-border-color` | alert error border color | `color-mix(in srgb, var(--color-error) 35%, var(--color-surface))` |
| `--alert-error-icon-color` | alert error icon color | `var(--color-error-text)` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--alert-radius` | alert radius | `var(--card-radius)` |
| `--alert-padding` | alert padding | `var(--space-4)` |
| `--alert-gap` | alert gap | `var(--space-3)` |
| `--alert-border-width` | alert border width | `1px` |
| `--alert-icon-size` | alert icon size | `20px` |
| `--alert-actions-gap` | alert actions gap | `var(--space-2)` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--alert-font-family` | alert font family | `var(--font-body)` |
| `--alert-font-size` | alert font size | `var(--fs-base)` |
| `--alert-line-height` | alert line height | `1.5` |
| `--alert-title-weight` | alert title weight | `600` |

### Shared dependencies

`--color-info`, `--color-success`, `--color-warning`, `--color-error` and their `-text`
roles, `--color-surface`, `--color-text-primary`, `--card-radius`. The warning color is part of
the runtime palette (`warningColor` in [ThemeProvider](../design/theme-provider.md)).

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --alert-border-width: 0px;
}
```

## Storybook and related guides

The single Alert story exposes props as controls. Related: [Badge](./Badge.md) for a short
status label, [IconButton](./IconButton.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
