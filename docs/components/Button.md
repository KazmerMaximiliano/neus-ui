# Button

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Semantic button with six variants, three sizes and loading feedback.

## Usage

```tsx
import { ThemeProvider, Button } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Button label="Save" variant="tonal" onClick={() => window.alert("Saved")} />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

`type` defaults to `button`. With `href`, Button renders a link with the same look:
`linkComponent` swaps `<a>` for a router link (Next.js `Link`, a wrapped React Router `Link`)
and receives `href`, `target`, `rel`, the class, style and click handler. A disabled or
loading link drops its `href`, reports `aria-disabled` and ignores clicks. `loading` disables interaction, sets `aria-busy`, keeps the
accessible name and hides the label visually while preserving its space. `disabled` also
blocks native button activation. The label remains in the DOM during loading. `loaderStyle`
and `loaderClassName` target the BeatLoader container; dots use `currentColor`, and their
size follows its font size.

## Props

See [the type source](../../src/components/Button/Button.types.ts) and
[implementation](../../src/components/Button/Button.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `className` | `string` | Omitted | Additional classes on `.button` |
| `labelClassName` | `string` | Omitted | Additional classes on `.button-label` |
| `loaderClassName` | `string` | Omitted | Additional classes on `.button-loader` |
| `label` | `string` | Required | The text displayed inside the button |
| `type` | `ButtonType` | `"button"` | The HTML button type |; ignored with `href`
| `variant` | `ButtonVariant` | `"solid"` | The visual style variant of the button |
| `color` | `ButtonColor` | `"primary"` | The color scheme of the button |
| `size` | `ButtonSize` | `"medium"` | The size of the button |
| `disabled` | `boolean` | `false` | Disables the button when true |
| `fullWidth` | `boolean` | `false` | Makes the button take full width when true |
| `loading` | `boolean` | `false` | Shows a loading spinner when true |
| `buttonStyle` | `CSSProperties` | Omitted | Inline styles on `.button` |
| `labelStyle` | `CSSProperties` | Omitted | Inline styles on `.button-label` |
| `loaderStyle` | `CSSProperties` | Omitted | Inline styles on `.button-loader` |
| `onClick` | `((e?: MouseEvent<HTMLButtonElement>) => void)`; with `href`, `MouseEvent<HTMLAnchorElement>` | Omitted | Callback function triggered on button click |
| `href` | `string` | Omitted | Destination; renders a link with the button\'s look instead of a `<button>` |
| `linkComponent` | `ElementType` | `"a"` | Router link rendered instead of `<a>`; only with `href` |
| `target` | `HTMLAttributeAnchorTarget` | Omitted | Link target; only with `href` |
| `rel` | `string` | Omitted | Link relationship; only with `href` |

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/Button/index.ts). A type shown here is not necessarily a
package export.

```ts
type ButtonType = "button" | "submit" | "reset";

type ButtonVariant = "outlined" | "text" | "solid" | "secondary" | "tonal" | "elevated";

type ButtonColor = "primary" | "success" | "error" | "info" | "white";

type ButtonSize = "small" | "medium" | "large";
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.button` | `button`, or `a` / `linkComponent` with `href` | `className` | `buttonStyle` | `Always` |
| `.button-label` | `span` | `labelClassName` | `labelStyle` | `Always` |
| `.button-loader` | `BeatLoader` | `loaderClassName` | `loaderStyle` | `loading` |

State/variant selectors: `.button--elevated`, `.button--error`, `.button--full-width`,
`.button--info`, `.button--large`, `.button--outlined`, `.button--primary`,
`.button--secondary`, `.button--small`, `.button--solid`, `.button--success`,
`.button--text`, `.button--tonal`, `.button--white`.

Use the [stylesheet](../../src/components/Button/Button.styles.css) for pseudo-elements and
state selectors. For shared field/listbox parts, also inspect the shared styles linked from
the implementation. Consumer content and third-party generated internals retain their own
customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<Button labelClassName="example-button" labelStyle={{ outlineOffset: 4 }} label="Save" variant="tonal" onClick={() => window.alert("Saved")} />
```

```css
.example-button {
  outline-offset: 4px;
}
.example-button:focus-visible {
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

- [button baseline recipe](../../src/design-systems/neus/generated/recipes/button.css)

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--button-active-transform` | button active transform | `none` |
| `--button-disabled-background` | button disabled background | `var(--color-gray-400)` |
| `--button-disabled-color` | button disabled color | `var(--color-white)` |
| `--button-disabled-opacity` | button disabled opacity | `0.6` |
| `--button-disabled-shadow` | button disabled shadow | `none` |
| `--button-elevated-shadow-hover` | button elevated shadow hover | `var(--elevation-dialog)` |
| `--button-focus-color` | button focus color | `var(--color-focus)` |
| `--button-focus-inner-shadow` | button focus inner shadow | `none` |
| `--button-focus-offset` | button focus offset | `3px` |
| `--button-focus-width` | button focus width | `2px` |
| `--button-secondary-hover` | button secondary hover | `color-mix(in srgb, var(--button-secondary-background) 88%, var(--color-surface))` |
| `--button-shadow-active` | button shadow active | `none` |
| `--button-shadow-hover` | button shadow hover | `none` |

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--button-border-color` | button border color | `transparent` |
| `--button-border-width` | button border width | `0px` |
| `--button-elevated-background` | button elevated background | `var(--color-surface-container-low)` |
| `--button-elevated-color` | button elevated color | `color-mix(in srgb, var(--color-primary-text) 80%, var(--color-text-primary))` |
| `--button-elevated-shadow` | button elevated shadow | `var(--elevation-floating)` |
| `--button-outlined-border-width` | button outlined border width | `1px` |
| `--button-secondary-background` | button secondary background | `var(--color-text-primary)` |
| `--button-secondary-color` | button secondary color | `var(--color-surface)` |
| `--button-shadow` | button shadow | `none` |
| `--button-tonal-background` | button tonal background | `var(--color-secondary-container)` |
| `--button-tonal-color` | button tonal color | `var(--color-on-secondary-container)` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--button-font-family` | button font family | `var(--font-body)` |
| `--button-font-size-large` | button font size large | `var(--fs-base)` |
| `--button-font-size-medium` | button font size medium | `var(--fs-sm)` |
| `--button-font-size-small` | button font size small | `var(--fs-xs)` |
| `--button-label-weight` | button label weight | `700` |
| `--button-line-height` | button line height | `1` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--button-justify` | button justify | `center` |
| `--button-label-spacing` | button label spacing | `0.25em` |
| `--button-label-transform` | button label transform | `uppercase` |
| `--button-loader-gap` | button loader gap | `0px` |
| `--button-loader-size` | button loader size | `6px` |
| `--button-padding-large` | button padding large | `16px 28px` |
| `--button-padding-medium` | button padding medium | `12px 22px` |
| `--button-padding-small` | button padding small | `8px 14px` |
| `--button-radius` | button radius | `var(--radius-pill)` |
| `--button-transition` | button transition | `background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease, transform 180ms ease` |

### Shared dependencies and runtime values

`--button-accent`, `--button-accent-active`, `--button-accent-hover`,
`--button-accent-subtle`, `--button-accent-text`, `--button-on-accent`,
`--button-on-active`, `--button-on-hover`, `--color-black`, `--color-error`,
`--color-error-dark`, `--color-error-light`, `--color-error-text`, `--color-gray-400`,
`--color-info`, `--color-info-dark`, `--color-info-light`, `--color-info-text`,
`--color-primary`, `--color-primary-active`, `--color-primary-dark`,
`--color-primary-light`, `--color-primary-text`, `--color-success`, `--color-success-dark`,
`--color-success-light`, `--color-success-text`, `--color-text-on-error`,
`--color-text-on-error-active`, `--color-text-on-error-hover`, `--color-text-on-info`,
`--color-text-on-info-active`, `--color-text-on-info-hover`, `--color-text-on-primary`,
`--color-text-on-primary-active`, `--color-text-on-primary-hover`,
`--color-text-on-success`, `--color-text-on-success-active`,
`--color-text-on-success-hover`, `--color-white`, `--color-white-100`, `--color-white-200`,
`--color-white-300`.

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
  --button-loader-gap: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Button story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
