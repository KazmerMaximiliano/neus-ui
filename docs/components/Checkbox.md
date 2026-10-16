# Checkbox

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Controlled checkbox with an indeterminate visual state.

## Usage

```tsx
import { useState } from "react";
import { ThemeProvider, Checkbox } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  const [checked, setChecked] = useState(false);
  return (
    <ThemeProvider designSystem="neus">
      <Checkbox label="Accept terms" checked={checked} onChange={setChecked} />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

`checked` defaults to false and is controlled; there is no `defaultChecked` prop or
internally managed checked state. `onChange` receives the next boolean. `indeterminate` sets
the native input property and displays a mixed-state icon. Clicking the enclosing label
toggles the native input. `disabled` prevents interaction. `checkboxStyle` targets the
visual box, while `style` targets the enclosing label. Preserve the visually hidden input
and its focus behavior when customizing.

## Props

See [the type source](../../src/components/Checkbox/Checkbox.types.ts) and
[implementation](../../src/components/Checkbox/Checkbox.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `checkboxClassName` | `string` | Omitted | Additional classes on `.checkbox__box` |
| `className` | `string` | Omitted | Additional classes on `.checkbox` |
| `iconClassName` | `string` | Omitted | Additional classes on `.checkbox__icon` |
| `iconStyle` | `CSSProperties` | Omitted | Inline styles on `.checkbox__icon` |
| `inputClassName` | `string` | Omitted | Additional classes on `.checkbox__input` |
| `inputStyle` | `CSSProperties` | Omitted | Inline styles on `.checkbox__input` |
| `labelClassName` | `string` | Omitted | Additional classes on `.checkbox__label` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.checkbox` |
| `name` | `string` | Omitted | The name attribute of the native input |
| `value` | `string` | Omitted | The value submitted with a form |
| `label` | `string` | Omitted | Visible label that also names the checkbox |
| `checked` | `boolean` | `false` | Whether the checkbox is checked |
| `indeterminate` | `boolean` | `false` | Mixed state for partially selected groups |
| `disabled` | `boolean` | `false` | Disables the checkbox |
| `checkboxStyle` | `CSSProperties` | Omitted | Inline styles on `.checkbox__box` |
| `labelStyle` | `CSSProperties` | Omitted | Inline styles on `.checkbox__label` |
| `onChange` | `((checked: boolean) => void)` | Omitted | Called with the new checked state |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.checkbox` | `label` | `className` | `style` | `Always` |
| `.checkbox__input` | `input` | `inputClassName` | `inputStyle` | `Always` |
| `.checkbox__box` | `span` | `checkboxClassName` | `checkboxStyle` | `Always` |
| `.checkbox__icon` | `Icon` | `iconClassName` | `iconStyle` | `Always` |
| `.checkbox__label` | `span` | `labelClassName` | `labelStyle` | `label` |

State/variant selectors: `.checkbox--checked`, `.checkbox--disabled`,
`.checkbox--indeterminate`.

Use the [stylesheet](../../src/components/Checkbox/Checkbox.styles.css) for pseudo-elements
and state selectors. For shared field/listbox parts, also inspect the shared styles linked
from the implementation. Consumer content and third-party generated internals retain their
own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<Checkbox inputClassName="example-checkbox" inputStyle={{ outlineOffset: 4 }} label="Accept terms" checked={checked} onChange={setChecked} />
```

```css
.example-checkbox {
  outline-offset: 4px;
}
.example-checkbox:focus-visible {
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

- [checkbox baseline recipe](../../src/design-systems/neus/generated/recipes/checkbox.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--checkbox-background` | checkbox background | `var(--color-surface)` |
| `--checkbox-border-color` | checkbox border color | `var(--color-primary-dark)` |
| `--checkbox-border-width` | checkbox border width | `2px` |
| `--checkbox-check-color` | checkbox check color | `var(--color-text-on-primary)` |
| `--checkbox-checked-background` | checkbox checked background | `var(--color-primary)` |
| `--checkbox-checked-border-color` | checkbox checked border color | `var(--color-primary)` |
| `--checkbox-checked-shadow` | checkbox checked shadow | `0 4px 12px -4px var(--color-focus-ring)` |
| `--checkbox-label-color` | checkbox label color | `var(--color-text-primary)` |
| `--checkbox-shadow` | checkbox shadow | `none` |

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--checkbox-disabled-background` | checkbox disabled background | `var(--color-surface-disabled)` |
| `--checkbox-disabled-border-color` | checkbox disabled border color | `var(--color-border-subtle)` |
| `--checkbox-disabled-color` | checkbox disabled color | `var(--color-text-disabled)` |
| `--checkbox-focus-color` | checkbox focus color | `var(--color-focus)` |
| `--checkbox-focus-offset` | checkbox focus offset | `2px` |
| `--checkbox-focus-width` | checkbox focus width | `2px` |
| `--checkbox-hover-border-color` | checkbox hover border color | `var(--color-primary)` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--checkbox-font-family` | checkbox font family | `var(--font-body)` |
| `--checkbox-label-font-size` | checkbox label font size | `var(--fs-base)` |
| `--checkbox-label-line-height` | checkbox label line height | `20px` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--checkbox-gap` | checkbox gap | `8px` |
| `--checkbox-icon-size` | checkbox icon size | `12px` |
| `--checkbox-icon-stroke` | checkbox icon stroke | `3` |
| `--checkbox-radius` | checkbox radius | `4px` |
| `--checkbox-size` | checkbox size | `18px` |
| `--checkbox-transition` | checkbox transition | `background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease` |

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
  --checkbox-gap: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Checkbox story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
