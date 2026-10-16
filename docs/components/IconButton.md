# IconButton

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Accessible icon-only button with loading feedback.

## Usage

```tsx
import { ThemeProvider, IconButton } from "neus-ui";
import { Settings } from "lucide-react";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <IconButton icon={Settings} label="Settings" variant="text" />
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

`label` supplies the accessible name. `icon` accepts a Lucide-compatible forwarded-ref icon.
The native button defaults to type button; loading and disabled block activation. Loading
sets `aria-busy` and replaces the icon with a BeatLoader container. The icon is decorative.
Use `buttonStyle` for the root, `iconStyle` for the SVG, and `loaderStyle` for the loader
container, not its individual dots.

## Props

The example imports Settings directly from lucide-react. Add lucide-react to the consuming
application's dependencies when using that import; the icon is not exported by neus-ui.

See [the type source](../../src/components/IconButton/IconButton.types.ts) and
[implementation](../../src/components/IconButton/IconButton.tsx) for the exact contract. All
customization props are optional and default to undefined unless noted; section style props
retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `className` | `string` | Omitted | Additional classes on `.icon-button` |
| `iconClassName` | `string` | Omitted | Additional classes on `.icon-button-icon` |
| `loaderClassName` | `string` | Omitted | Additional classes on `.icon-button-loader` |
| `icon` | `IconButtonIcon` | Required | The lucide icon component rendered inside the button |
| `label` | `string` | Required | Accessible name announced for the icon-only action |
| `type` | `IconButtonType` | `"button"` | The HTML button type |
| `variant` | `IconButtonVariant` | `"solid"` | The visual style variant of the button |
| `color` | `IconButtonColor` | `"primary"` | The color scheme of the button |
| `size` | `IconButtonSize` | `"medium"` | The size of the button |
| `disabled` | `boolean` | `false` | Disables the button when true |
| `loading` | `boolean` | `false` | Replaces the icon with a busy loader when true |
| `buttonStyle` | `CSSProperties` | Omitted | Inline styles on `.icon-button` |
| `iconStyle` | `CSSProperties` | Omitted | Inline styles on `.icon-button-icon` |
| `loaderStyle` | `CSSProperties` | Omitted | Inline styles on `.icon-button-loader` |
| `onClick` | `((e?: MouseEvent<HTMLButtonElement>) => void)` | Omitted | Callback function triggered on button click |

### Supporting types

These types describe the named values used above; package exports are defined by the [family
entry point](../../src/components/IconButton/index.ts). A type shown here is not necessarily
a package export.

```ts
type IconButtonType = "button" | "submit" | "reset";

type IconButtonVariant = "outlined" | "text" | "solid";

type IconButtonColor = "primary" | "success" | "error" | "info";

type IconButtonSize = "small" | "medium" | "large";

type IconButtonIcon = ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.icon-button` | `button` | `className` | `buttonStyle` | `Always` |
| `.icon-button-loader` | `BeatLoader` | `loaderClassName` | `loaderStyle` | `loading` |
| `.icon-button-icon` | `Icon` | `iconClassName` | `iconStyle` | `Always` |

State/variant selectors: `.icon-button--error`, `.icon-button--info`, `.icon-button--large`,
`.icon-button--outlined`, `.icon-button--primary`, `.icon-button--small`,
`.icon-button--solid`, `.icon-button--success`, `.icon-button--text`.

Use the [stylesheet](../../src/components/IconButton/IconButton.styles.css) for
pseudo-elements and state selectors. For shared field/listbox parts, also inspect the shared
styles linked from the implementation. Consumer content and third-party generated internals
retain their own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<IconButton loaderClassName="example-icon-button" loaderStyle={{ outlineOffset: 4 }} icon={Settings} label="Settings" variant="text" />
```

```css
.example-icon-button {
  outline-offset: 4px;
}
.example-icon-button:focus-visible {
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

- [icon-button baseline recipe](../../src/design-systems/neus/generated/recipes/icon-button.css)

### States

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--icon-button-active-transform` | icon button active transform | `none` |
| `--icon-button-disabled-background` | icon button disabled background | `var(--color-gray-400)` |
| `--icon-button-disabled-color` | icon button disabled color | `var(--color-white)` |
| `--icon-button-disabled-opacity` | icon button disabled opacity | `0.6` |
| `--icon-button-disabled-shadow` | icon button disabled shadow | `none` |
| `--icon-button-focus-color` | icon button focus color | `var(--color-focus)` |
| `--icon-button-focus-inner-shadow` | icon button focus inner shadow | `none` |
| `--icon-button-focus-offset` | icon button focus offset | `3px` |
| `--icon-button-focus-width` | icon button focus width | `2px` |
| `--icon-button-shadow-active` | icon button shadow active | `none` |
| `--icon-button-shadow-hover` | icon button shadow hover | `none` |

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--icon-button-border-color` | icon button border color | `transparent` |
| `--icon-button-border-width` | icon button border width | `0px` |
| `--icon-button-outlined-border-width` | icon button outlined border width | `1px` |
| `--icon-button-shadow` | icon button shadow | `none` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--icon-button-icon-size-large` | icon button icon size large | `24px` |
| `--icon-button-icon-size-medium` | icon button icon size medium | `20px` |
| `--icon-button-icon-size-small` | icon button icon size small | `16px` |
| `--icon-button-icon-stroke` | icon button icon stroke | `2` |
| `--icon-button-radius` | icon button radius | `50%` |
| `--icon-button-size-large` | icon button size large | `68px` |
| `--icon-button-size-medium` | icon button size medium | `54px` |
| `--icon-button-size-small` | icon button size small | `40px` |
| `--icon-button-transition` | icon button transition | `background-color 180ms ease, border-color 180ms ease, color 180ms ease, box-shadow 180ms ease, transform 180ms ease` |

### Shared dependencies and runtime values

`--color-black`, `--color-error`, `--color-error-dark`, `--color-error-light`,
`--color-gray-400`, `--color-info`, `--color-info-dark`, `--color-info-light`,
`--color-primary`, `--color-primary-active`, `--color-primary-dark`,
`--color-primary-light`, `--color-primary-text`, `--color-success`, `--color-success-dark`,
`--color-success-light`, `--color-text-on-primary`, `--color-white`, `--icon-button-accent`,
`--icon-button-accent-active`, `--icon-button-accent-hover`, `--icon-button-accent-subtle`,
`--icon-button-accent-text`, `--icon-button-icon-size`, `--icon-button-on-accent`,
`--icon-button-size`.

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
  --icon-button-radius: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single IconButton story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
