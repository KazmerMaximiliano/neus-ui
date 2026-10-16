# Input

[Component index](../components.md) · [Documentation index](../README.md)

Input is a native field with a label, required marker and error message. Its
appearance comes from CSS tokens and six design-system recipes. It retains its
existing API and CSS classes, including `.input__wrapper` used by FormTemplate.

## Usage

```tsx
import { useState } from "react";
import { Input, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const NameField = () => {
  const [name, setName] = useState("");
  return (
    <ThemeProvider designSystem="apple">
      <Input name="name" label="Name" value={name} onChange={setName} required />
    </ThemeProvider>
  );
};
```

For an uncontrolled field, omit `value` and use `defaultValue`:

```tsx
<Input name="quantity" label="Quantity" type="number" defaultValue={1}
  min={0} max={100} step={1} />
```

Choose controlled or uncontrolled usage for the lifetime of a field. Do not pass
both `value` and `defaultValue`. `onChange` receives a **string**, including for
number inputs; clearing the field emits `""`. Input does not parse values or add
custom validation. `min`, `max`, `step`, `required` and input types retain native
browser behavior. The `error` prop displays a consumer-provided message.

## Props

| Prop | Type | Default / purpose |
| --- | --- | --- |
| `id` | `string` | Stable generated ID when omitted |
| `aria-label` | `string` | Accessible name when no visible label is supplied |
| `name` | `string` | Native form field name |
| `value` | `string \| number` | Controlled value |
| `defaultValue` | `string \| number` | Initial uncontrolled value |
| `placeholder` | `string` | Native placeholder |
| `label` | `string` | Optional visible, associated label |
| `error` | `string` | Optional error message associated with the field |
| `type` | `"text" \| "password" \| "email" \| "number" \| "color" \| "tel" \| "url"` | `"text"` |
| `disabled` | `boolean` | `false`; blocks editing and skips keyboard focus |
| `readonly` | `boolean` | `false`; prevents editing but remains focusable |
| `required` | `boolean` | `false`; native constraint and visible asterisk when a label exists |
| `min`, `max`, `step` | `string \| number` | Native numeric constraints |
| `onChange` | `(value: string) => void` | Called on edits with the field's string value |
| `wrapperStyle` | `CSSProperties` | Outer `.input__wrapper` |
| `inputStyle` | `CSSProperties` | Native `input` |
| `labelStyle` | `CSSProperties` | Visible `label` |
| `requiredStyle` | `CSSProperties` | Required marker `span` |
| `errorStyle` | `CSSProperties` | Error message `div` |

The five style objects are optional and default to `undefined`, like Button.
Omitting an override on a subsequent render restores CSS styling. They do not
create absent parts: an error style does not render a message without `error`.
Inherited CSS properties can still affect descendants. `InputProps` is exported
from `"neus-ui"`; the preview-only `InputStoryArgs` type is internal.

## Accessibility

Clicking the associated label focuses the field. Input generates unique IDs with
React `useId` unless the consumer supplies an `id`; supplied IDs must be unique.
A nonempty error sets `aria-invalid` and links the message with
`aria-describedby`. Removing the error removes both attributes. The required
asterisk is hidden from assistive technology because native `required` already
exposes that state. Provide `label` or `aria-label`; a placeholder is not a label.

## Customization and design systems

```tsx
<Input label="Email" type="email" error="Enter a valid email"
  wrapperStyle={{ gap: 12 }} inputStyle={{ borderRadius: 10 }}
  labelStyle={{ fontWeight: 600 }} requiredStyle={{ marginLeft: 6 }}
  errorStyle={{ fontSize: 13 }} required />
```

Use a theme scope for reusable changes:

```tsx
<ThemeProvider scope="local" designSystem="vercel" className="checkout-fields">
  <Input label="Name" />
</ThemeProvider>
```

```css
[data-design-system].checkout-fields {
  --input-radius: 10px;
  --input-padding: 12px 16px;
  --input-label-offset: 0px;
}
```

Load application CSS after the library stylesheet. All tokens are declared in
[the Neus contract](../../src/design-systems/neus/input.css) and reset at each
`[data-design-system]` boundary, so nested and sibling themes remain isolated.
Recipes contain only variable overrides; the component owns all state selectors.

| Token group | Tokens (all prefixed with `--input-`) |
| --- | --- |
| Layout and type | `gap`, `font-family`, `font-size`, `line-height`, `font-weight`, `padding`, `min-width`, `radius` |
| Field | `background`, `color`, `border-width`, `border-color`, `shadow`, `transition` |
| Placeholder | `placeholder-color`, `placeholder-opacity` |
| Interaction | `hover-border-color`, `focus-border-color`, `focus-shadow` |
| Label | `label-color`, `label-font-size`, `label-weight`, `label-offset` |
| Required | `required-color`, `required-gap` |
| Error | `error-color`, `error-border-color`, `error-font-size`, `error-offset`, `error-focus-shadow` |
| Disabled | `disabled-background`, `disabled-border-color`, `disabled-color`, `disabled-shadow` |
| Color picker | `color-padding`, `color-height`, `color-swatch-padding` |

Neus keeps its pill radius, `1em 2em` padding, 200px minimum width, 8px gap,
1px border and `3.5em` color picker height. The native field's baseline font size
is explicitly 13.333333px, and its family now follows the theme's `--font-body`.
External recipes are project adaptations, not complete reproductions of external
libraries; all retain the external label and the existing Input behavior.

| Design | Radius | Padding | Appearance |
| --- | --- | --- | --- |
| Apple | 8px | 12px 16px | Subtle border |
| Carbon | 0px | 12px 16px | Secondary surface |
| Material | 4px | 16px | Outlined field |
| Neobrutalism | 4px | 12px 16px | 3px border and solid 4px shadow |
| Vercel | 6px | 8px 12px | Compact, subtle border |

Error styling wins over hover/focus. Disabled styling wins on the field and label,
while the error message remains visible. Reduced-motion preferences disable
transitions. Color swatches follow the field radius; number spinner behavior is
preserved.

## Storybook

The single Input story exposes all props and a local `designSystem` selector,
independent from the global design selector and inheriting the toolbar's color
scheme. Typing updates the `value` control in controlled mode. Clear/remove the
`value` argument (set it to `undefined`) to explore uncontrolled usage with
`defaultValue`. Switching modes remounts the preview field; changing
`defaultValue` alone does not reset an already edited uncontrolled field.

No props or CSS classes were removed. `designSystem` is not an Input prop: use
ThemeProvider in applications. See [Theming](../theming.md) and
[Design systems](../design-systems.md).


## Presentation contract (2026-10-15)

| API | Behavior |
| --- | --- |
| `variant / labelPlacement / size` | auto/filled/outlined; auto/external/floating; small/medium/large |

Uses all six recipes through ThemeProvider in light and dark mode. See the
[migration guide](../refactor-migration.md) for examples and breaking changes.
