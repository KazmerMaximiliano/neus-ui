# Customization

[Design index](./README.md) · [Documentation](../README.md)

Choose the level that matches the change:

| Level | Mechanism | Example |
| --- | --- | --- |
| System and mode | ThemeProvider | Carbon in dark mode |
| Runtime action palette | initialTheme / updateTheme | Brand primary color |
| Reusable appearance | CSS custom properties | Field radius and padding for a feature |
| Element or state | className / partClassName and CSS | A label, focus state or backdrop |
| Single rendered part | partStyle | One label's weight or an icon's opacity |

## Reusable token overrides

```tsx
import { Input, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";
import "./checkout.css";

export const Checkout = () => (
  <ThemeProvider scope="local" designSystem="vercel" className="checkout-theme">
    <Input label="Email" name="email" type="email" />
  </ThemeProvider>
);
```

```css
[data-design-system].checkout-theme {
  --input-radius: 10px;
  --input-padding: 12px 16px;
  --input-focus-border-color: var(--color-primary);
}
```

Library recipes declare tokens at each data-design-system boundary. Loading CSS later
resolves equal specificity; a more specific library selector still wins. Combining the
boundary attribute with an application class gives a scoped selector that can override
ordinary recipe declarations. A nested provider resets its own recipe tokens, so overrides
on its ancestor do not automatically cross that reset. Target the nested boundary explicitly
when it should receive the same overrides.

For global changes, target the actual document boundary, for example
`:root[data-design-system="neus"]`. Root overrides do not automatically customize
independent local providers. Palette variables supplied inline by ThemeProvider need
provider color configuration rather than a competing ordinary CSS rule.

## Classes and styles by part

```tsx
import { Input } from "neus-ui";

export const EmailField = () => (
  <Input
    className="checkout-field"
    label="Email"
    labelClassName="checkout-field-label"
    inputClassName="checkout-field-input"
    errorClassName="checkout-field-error"
    labelStyle={{ fontWeight: 600 }}
    error="Enter a valid email"
  />
);
```

```css
.checkout-field .checkout-field-label { letter-spacing: 0.02em; }
.checkout-field .checkout-field-input:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
}
.checkout-field .checkout-field-input:disabled { cursor: not-allowed; }
.checkout-field .checkout-field-error { font-weight: 600; }
```

The root class is appended to the library's classes. Each partClassName is added to its
documented element; each partStyle is applied to that same part. Names follow the existing
partStyle API where one already existed. For example, Button uses buttonStyle at its root,
while Input uses wrapperStyle at its root. Input inputStyle belongs to the native field;
Checkbox checkboxStyle belongs to its visual box. Consult the anatomy table rather than
assuming names imply roots.

Existing style props retain their destinations. listStyle in Select/MultiSelect belongs to
the popover container; listContentStyle belongs to its inner listbox. Clock periodStyle
belongs to the AM/PM buttons; periodContentStyle belongs to their enclosing region. Public
Card/Modal sections have their own className and style, configured directly in composition.

Inline consumer properties override ordinary CSS and internal inline defaults for that
element. Removing the prop removes the override. Inherited properties can affect
descendants; hooks do not render absent parts. Repeated item/label/dot hooks affect every
matching instance. A style object cannot express :hover, :focus-visible, :disabled or
pseudo-elements; use a class and stylesheet.

Popover position variables (`--popover-top`, `--popover-left`, `--popover-right` and
`--popover-anchor-width`) are refreshed by the positioning hook on open, scroll and resize.
Treat them as runtime placement data. Use overlay spacing tokens or ordinary panel styles
for appearance instead of relying on those values staying fixed after an interaction.

## Tokens and state selectors

Prefer a component token when it expresses the intended state. A direct inline background on
a button also overrides the recipe's hover/disabled background; tokens let the component
keep its state rules. For a targeted state, retain the documented base classes and use
sufficient specificity in application CSS.

```css
[data-design-system].checkout-theme {
  --input-error-border-color: var(--color-error);
  --input-disabled-color: var(--color-text-disabled);
}
.checkout-dialog::backdrop { background: rgb(0 0 0 / 65%); }
```

Each component guide lists every token in its applicable recipe and shared/runtime
dependencies. Values vary by system/mode. The shared [token reference](./tokens.md) explains
semantic roles. If a TypeScript style object sets a custom property, use a CSSProperties
assertion for the custom keys; a stylesheet usually avoids that extra typing.

## Composition and external content

Style public sections directly. Internal parts such as PickerField, MenuItems and
SelectListbox remain private; their owners expose the relevant individual hooks. A parent
does not expose a new deep customization API for integrated public Calendar, Clock or
Sidebar parts. Use scoped tokens/CSS, or compose the public component directly when its own
API is needed.

AG Grid cells and Google Maps content follow their underlying APIs. Neus hooks target its
own wrappers and explicit integration containers. Do not rely on third-party private DOM
structures as Neus contracts. Loader hooks target the loader container, and icon hooks
target the SVG root rather than paths.

For portals and browser top-layer elements, follow the DOM-scope guidance in
[ThemeProvider](./theme-provider.md). For permanent shipped recipe changes, edit the
appropriate DESIGN.md and follow [authoring](../contributing/design-system-authoring.md).
