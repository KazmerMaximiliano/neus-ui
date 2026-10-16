# Stepper

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Step progress in dots, linear or simple presentation.

## Usage

```tsx
import { ThemeProvider, Stepper } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Stepper currentStep={1} totalSteps={4} labels={["Account", "Profile", "Review", "Done"]} showLabels showConnectors />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

Steps are zero-indexed. Keep totalSteps positive and currentStep in range. Dots are the
default, small is the default size. In dots mode, only completed steps become buttons when
onStepClick exists; the active step uses aria-current step. Visible labels depend on
showLabels and labels. Connectors appear unless showConnectors is false.

Linear/simple modes expose progressbar semantics. Linear labels use
labelStyle/labelClassName just like dot labels; barStyle targets the track and barFillStyle
targets its fill. Simple dots share dotStyle/dotClassName. Repeated hooks affect every
matching part. Screen-reader text in dots mode must retain its visually hidden behavior.

## Props

See [the type source](../../src/components/Stepper/Stepper.types.ts) and
[implementation](../../src/components/Stepper/Stepper.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `barClassName` | `string` | Omitted | Additional classes on `.stepper__bar` |
| `barFillClassName` | `string` | Omitted | Additional classes on `.stepper__bar-fill` |
| `barFillStyle` | `CSSProperties` | Omitted | Inline styles on `.stepper__bar-fill` |
| `checkClassName` | `string` | Omitted | Additional classes on `.stepper__check` |
| `checkStyle` | `CSSProperties` | Omitted | Inline styles on `.stepper__check` |
| `className` | `string` | Omitted | Additional classes on `.stepper` |
| `connectorClassName` | `string` | Omitted | Additional classes on `.stepper__connector` |
| `dotClassName` | `string` | Omitted | Additional classes on `.stepper__dot`, `.stepper__simple-dot` |
| `labelClassName` | `string` | Omitted | Additional classes on `.stepper__label`, `.stepper__counter` |
| `srOnlyClassName` | `string` | Omitted | Additional classes on `.stepper__sr-only` |
| `srOnlyStyle` | `CSSProperties` | Omitted | Inline styles on `.stepper__sr-only` |
| `stepClassName` | `string` | Omitted | Additional classes on `.stepper__step` |
| `stepStyle` | `CSSProperties` | Omitted | Inline styles on `.stepper__step` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.stepper` |
| `trackClassName` | `string` | Omitted | Additional classes on `.stepper__track` |
| `trackStyle` | `CSSProperties` | Omitted | Inline styles on `.stepper__track` |
| `currentStep` | `number` | Required | Current active step (0-indexed) |
| `totalSteps` | `number` | Required | Total number of steps |
| `variant` | `StepperVariant` | `"dots"` | Visual style: dots (numbered markers), linear (progress bar), simple (compact markers) |
| `size` | `StepperSize` | `"small"` | Size of the dot indicators (dots variant only) |
| `labels` | `string[]` | Omitted | Step names; announced even when not shown |
| `showLabels` | `boolean` | Omitted | Show step labels (dots) or the step counter (linear) |
| `showConnectors` | `boolean` | Omitted | Show connector lines between dots (dots variant only) |
| `dotStyle` | `CSSProperties` | Omitted | Inline styles on `.stepper__dot`, `.stepper__simple-dot` |
| `labelStyle` | `CSSProperties` | Omitted | Inline styles on `.stepper__label`, `.stepper__counter` |
| `connectorStyle` | `CSSProperties` | Omitted | Inline styles on `.stepper__connector` |
| `barStyle` | `CSSProperties` | Omitted | Inline styles on `.stepper__bar` |
| `onStepClick` | `((step: number) => void)` | Omitted | Makes completed steps buttons; receives the step index (0-indexed) |

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/Stepper/index.ts). A type shown here is not necessarily a
package export.

```ts
type StepperVariant = "dots" | "linear" | "simple";

type StepperSize = "small" | "medium" | "large";
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.stepper` | `div` | `className` | `style` | `Always` |
| `.stepper__track` | `nav` | `trackClassName` | `trackStyle` | `Always` |
| `.stepper__step` | `div` | `stepClassName` | `stepStyle` | `Always` |
| `.stepper__dot` | `Dot` | `dotClassName` | `dotStyle` | `Always` |
| `.stepper__check` | `Check` | `checkClassName` | `checkStyle` | `isDone` |
| `.stepper__sr-only` | `span` | `srOnlyClassName` | `srOnlyStyle` | `Always` |
| `.stepper__label` | `span` | `labelClassName` | `labelStyle` | `visibleLabel` |
| `.stepper__connector` | `div` | `connectorClassName` | `connectorStyle` | `showConnectors !== false && index < totalSteps - 1` |
| `.stepper__counter` | `span` | `labelClassName` | `labelStyle` | `showLabels` |
| `.stepper__bar` | `div` | `barClassName` | `barStyle` | `Always` |
| `.stepper__bar-fill` | `div` | `barFillClassName` | `barFillStyle` | `Always` |
| `.stepper__simple-dot` | `div` | `dotClassName` | `dotStyle` | `Always` |

State/variant selectors: `.stepper--dots`, `.stepper--large`, `.stepper--linear`,
`.stepper--medium`, `.stepper--simple`, `.stepper__connector--done`,
`.stepper__dot--active`, `.stepper__dot--clickable`, `.stepper__dot--done`,
`.stepper__label--active`, `.stepper__label--done`, `.stepper__simple-dot--active`,
`.stepper__simple-dot--current`.

Use the [stylesheet](../../src/components/Stepper/Stepper.styles.css) for pseudo-elements
and state selectors. For shared field/listbox parts, also inspect the shared styles linked
from the implementation. Consumer content and third-party generated internals retain their
own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<Stepper trackClassName="example-stepper" trackStyle={{ outlineOffset: 4 }} currentStep={1} totalSteps={4} labels={["Account", "Profile", "Review", "Done"]} showLabels showConnectors />
```

```css
.example-stepper {
  outline-offset: 4px;
}
.example-stepper:focus-visible {
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

- [stepper baseline recipe](../../src/design-systems/neus/generated/recipes/stepper.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--stepper-bar-background` | stepper bar background | `var(--color-border-subtle)` |
| `--stepper-bar-border-color` | stepper bar border color | `transparent` |
| `--stepper-bar-border-width` | stepper bar border width | `0px` |
| `--stepper-connector-color` | stepper connector color | `var(--color-border-subtle)` |
| `--stepper-connector-done-color` | stepper connector done color | `var(--color-primary)` |
| `--stepper-counter-color` | stepper counter color | `var(--color-text-secondary)` |
| `--stepper-dot-background` | stepper dot background | `var(--color-surface)` |
| `--stepper-dot-border-color` | stepper dot border color | `var(--color-border-input-hover)` |
| `--stepper-dot-border-width` | stepper dot border width | `2px` |
| `--stepper-dot-color` | stepper dot color | `var(--color-text-secondary)` |
| `--stepper-dot-done-background` | stepper dot done background | `var(--color-primary-light)` |
| `--stepper-dot-done-border-color` | stepper dot done border color | `var(--color-primary)` |
| `--stepper-dot-done-color` | stepper dot done color | `var(--color-primary-text)` |
| `--stepper-label-color` | stepper label color | `var(--color-text-secondary)` |
| `--stepper-label-done-color` | stepper label done color | `var(--color-text-primary)` |
| `--stepper-simple-background` | stepper simple background | `var(--color-border-subtle)` |
| `--stepper-simple-border-color` | stepper simple border color | `transparent` |
| `--stepper-simple-border-width` | stepper simple border width | `0px` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--stepper-bar-fill` | stepper bar fill | `var(--color-primary)` |
| `--stepper-bar-fill-radius` | stepper bar fill radius | `2px` |
| `--stepper-bar-height` | stepper bar height | `4px` |
| `--stepper-bar-radius` | stepper bar radius | `2px` |
| `--stepper-connector-min-width` | stepper connector min width | `24px` |
| `--stepper-connector-thickness` | stepper connector thickness | `2px` |
| `--stepper-counter-spacing` | stepper counter spacing | `0.05em` |
| `--stepper-counter-transform` | stepper counter transform | `uppercase` |
| `--stepper-dot-radius` | stepper dot radius | `50%` |
| `--stepper-dot-size-large` | stepper dot size large | `48px` |
| `--stepper-dot-size-medium` | stepper dot size medium | `36px` |
| `--stepper-dot-size-small` | stepper dot size small | `28px` |
| `--stepper-gap` | stepper gap | `8px` |
| `--stepper-simple-current-width` | stepper simple current width | `24px` |
| `--stepper-simple-radius` | stepper simple radius | `999px` |
| `--stepper-simple-size` | stepper simple size | `10px` |
| `--stepper-transition` | stepper transition | `background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--stepper-counter-font-size` | stepper counter font size | `var(--fs-sm)` |
| `--stepper-counter-weight` | stepper counter weight | `500` |
| `--stepper-dot-font-size-large` | stepper dot font size large | `16px` |
| `--stepper-dot-font-size-medium` | stepper dot font size medium | `13px` |
| `--stepper-dot-font-size-small` | stepper dot font size small | `11px` |
| `--stepper-dot-font-weight` | stepper dot font weight | `700` |
| `--stepper-font-family` | stepper font family | `var(--font-body)` |
| `--stepper-label-font-size-large` | stepper label font size large | `15px` |
| `--stepper-label-font-size-medium` | stepper label font size medium | `13px` |
| `--stepper-label-font-size-small` | stepper label font size small | `11px` |
| `--stepper-label-weight` | stepper label weight | `500` |

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--stepper-dot-active-background` | stepper dot active background | `var(--color-primary)` |
| `--stepper-dot-active-border-color` | stepper dot active border color | `var(--color-primary)` |
| `--stepper-dot-active-color` | stepper dot active color | `var(--color-text-on-primary)` |
| `--stepper-dot-active-shadow` | stepper dot active shadow | `none` |
| `--stepper-dot-hover-background` | stepper dot hover background | `color-mix(in srgb, var(--color-primary) 22%, var(--color-surface))` |
| `--stepper-focus-color` | stepper focus color | `var(--color-focus)` |
| `--stepper-label-active-color` | stepper label active color | `var(--color-primary-text)` |
| `--stepper-label-active-weight` | stepper label active weight | `600` |
| `--stepper-simple-active-background` | stepper simple active background | `var(--color-primary)` |

### Shared dependencies and runtime values

`--stepper-dot-font-size`, `--stepper-dot-size`, `--stepper-label-font-size`,
`--stepper-progress`.

Semantic/foundation tokens are described in [the shared token
reference](../design/tokens.md). Component dependencies belong to their own linked recipe.
Position, size, category and progress variables set by the implementation are runtime
values, not provider configuration fields.

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
  --stepper-bar-fill-radius: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Stepper story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
