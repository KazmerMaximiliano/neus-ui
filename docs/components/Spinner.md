# Spinner

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

An indeterminate loading indicator for a wait whose length is unknown.

## Usage

```tsx
import { ThemeProvider, Spinner } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Spinner label="Cargando resultados" />
    </ThemeProvider>
  );
};
```

Use Spinner while a region loads and its length is unknown. A loading button already has its
own: set `loading` on Button or IconButton instead of placing a Spinner inside.

## Behavior and accessibility

With `label`, the spinner is a polite live region (`role="status"`) whose visually hidden text
is the label, in the project's language. Without `label` it is decorative (`aria-hidden`):
leave it out only where something else already announces the wait, such as a container with
`aria-busy="true"` and its own message. The ring turns and the dots pulse; under
`prefers-reduced-motion: reduce` both slow to half speed instead of stopping, so the page never
looks frozen. The spinner takes no space beyond its size and never shifts the layout around it.

## Props

See [the type source](../../src/components/Spinner/Spinner.types.ts) and
[implementation](../../src/components/Spinner/Spinner.tsx) for the exact contract. All props
are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `label` | `string` | Omitted | Text announced as a polite status; without it the spinner is decorative |
| `variant` | `"ring" \| "dots"` | `"ring"` | A rotating ring, or three pulsing dots for inline use |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Diameter of the ring; the dots scale with it |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.spinner` |
| `ringClassName`, `ringStyle` | `string`, `CSSProperties` | Omitted | `.spinner__ring` |
| `dotClassName`, `dotStyle` | `string`, `CSSProperties` | Omitted | Each `.spinner__dot` |
| `labelClassName`, `labelStyle` | `string`, `CSSProperties` | Omitted | `.spinner__label` |
| Native attributes and ref | React props for a `span` | Optional | Forwarded to `.spinner`, except `children` and `role` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render removes
that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.spinner` | `span` | `className` | `style` | `Always` |
| `.spinner__ring` | `span` | `ringClassName` | `ringStyle` | `variant="ring"` |
| `.spinner__dot` | `span` (three) | `dotClassName` | `dotStyle` | `variant="dots"` |
| `.spinner__label` | `span`, visually hidden | `labelClassName` | `labelStyle` | `label` given |

State/variant selectors: `.spinner--ring`, `.spinner--dots`, `.spinner--small`,
`.spinner--medium`, `.spinner--large`. The root rules use `:where()` and carry no specificity,
so a single class of yours overrides them. The spinner's color is its `color`: the ring's arc
and the dots use `currentColor`. Use the [stylesheet](../../src/components/Spinner/Spinner.styles.css)
for the exact declarations.

### Instance styles and classes

```tsx
<Spinner className="results-spinner" size="large" label="Cargando resultados" />
```

```css
.results-spinner {
  margin-inline: auto;
  color: var(--color-text-secondary);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [spinner baseline recipe](../../src/design-systems/neus/generated/recipes/spinner.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--spinner-color` | Color of the arc and the dots | `var(--color-primary-text)` |
| `--spinner-track-color` | Ring behind the arc | `color-mix(in srgb, currentColor 18%, transparent)` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--spinner-size-small` | Small diameter | `16px` |
| `--spinner-size-medium` | Medium diameter | `24px` |
| `--spinner-size-large` | Large diameter | `40px` |
| `--spinner-stroke-width` | Ring width, in `em` of the diameter | `0.125em` |
| `--spinner-dot-size` | Dot diameter, in `em` of the size | `0.25em` |
| `--spinner-dot-margin` | Space on each side of a dot | `0.083em` |

### Motion

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--spinner-ring-duration` | One turn of the ring | `0.8s` |
| `--spinner-dot-duration` | One pulse of the dots | `1.4s` |

### Shared dependencies and runtime values

`--color-primary-text` and `currentColor`. `--spinner-size` is set by the size modifier from
the three size tokens; Button and IconButton set `--spinner-dot-size` and
`--spinner-dot-margin` from their own loader tokens.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --spinner-track-color: transparent;
  --spinner-stroke-width: 0.1em;
}
```

## Storybook and related guides

The single Spinner story exposes props as controls. Related: [Button](./Button.md) and
[IconButton](./IconButton.md) `loading`, [Alert](./Alert.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
