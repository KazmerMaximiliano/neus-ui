# Textarea

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Multi-line text with the Input field presentation, line-based height and optional growth.

## Usage

```tsx
import { ThemeProvider, Textarea } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Textarea
        name="message"
        label="Mensaje"
        description="Tell us what you need; we reply within a day."
        autoResize
        maxRows={8}
        required
      />
    </ThemeProvider>
  );
};
```

Use Textarea for text that wraps to several lines: a message, notes, a description. Use
[Input](./Input.md) for a single value such as a name or an email. Inside
[FormTemplate](../templates/FormTemplate.md), give it a whole row with
`className="form-template__full"`.

## Behavior and accessibility

Textarea is a native `<textarea>`, so typing, line breaks, selection, form submission and
`maxLength` behave as the browser defines them. `value` or `defaultValue` choose controlled or
uncontrolled use; `onChange` receives the text as a string. `readonly` maps to the native
`readOnly`, and `required` to the native attribute with a decorative asterisk.

A generated or supplied id associates the label; supply `label` or `aria-label`. A nonempty
`error` sets `aria-invalid`, and `description` and the error are linked through
`aria-describedby`, after any id the caller passes. Native attributes and the ref reach the
`<textarea>`; Textarea's own wiring (id, label, state and value handling) takes precedence.

Height is counted in lines. `rows` (default 3) is the resting height, and the field never gets
shorter. People can drag it taller unless it is disabled or growing on its own. With
`autoResize` it grows with its text and stops at `maxRows`, then scrolls. Growth uses the CSS
`field-sizing` property; a browser without it keeps the field at `rows` and lets people resize
it by hand. `maxRows` also caps manual resizing.

Variant, size and label placement follow Input. A floating label rests on the first line and
rises to the border once the field has focus or text. Under `prefers-reduced-motion: reduce`
the border transition is removed.

## Props

See [the type source](../../src/components/Textarea/Textarea.types.ts) and
[implementation](../../src/components/Textarea/Textarea.tsx) for the exact contract. All props
are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `label` | `string` | Omitted | Visible label that names the field |
| `description` | `ReactNode` | Omitted | Help text below the field, linked with `aria-describedby` before the error |
| `error` | `string` | Omitted | Error message; marks the field invalid |
| `placeholder` | `string` | Omitted | Example value while the field is empty |
| `value` | `string` | Omitted | Current text (controlled) |
| `defaultValue` | `string` | Omitted | Initial text (uncontrolled) |
| `onChange` | `(value: string) => void` | Omitted | Called with the new text on every edit |
| `rows` | `number` | `3` | Lines visible at rest; the minimum height |
| `maxRows` | `number` | Omitted | Lines the field may grow to, by hand or with `autoResize`, before it scrolls |
| `autoResize` | `boolean` | `false` | Grows with its text, up to `maxRows` |
| `variant` | `"auto" \| "filled" \| "outlined"` | `"auto"` | Field surface; `auto` follows the design system |
| `labelPlacement` | `"auto" \| "external" \| "floating"` | `"auto"` | Label above the field or floating inside it |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Padding of the field and the resting line of a floating label |
| `required` | `boolean` | `false` | Native `required` with a decorative asterisk |
| `disabled` | `boolean` | `false` | Disables the field |
| `readonly` | `boolean` | `false` | Keeps the text readable and focusable but not editable |
| `id` | `string` | Generated | Field id; the label, description and error ids derive from it |
| `className`, `wrapperStyle` | `string`, `CSSProperties` | Omitted | `.textarea__wrapper.field-presentation` |
| `labelClassName`, `labelStyle` | `string`, `CSSProperties` | Omitted | `.textarea__label` |
| `requiredClassName`, `requiredStyle` | `string`, `CSSProperties` | Omitted | `.textarea__required` |
| `textareaClassName`, `textareaStyle` | `string`, `CSSProperties` | Omitted | `.textarea` |
| `descriptionClassName`, `descriptionStyle` | `string`, `CSSProperties` | Omitted | `.field__description` |
| `errorClassName`, `errorStyle` | `string`, `CSSProperties` | Omitted | `.textarea__error-message` |
| Native attributes and ref | React props for a `textarea` | Optional | Forwarded to the `<textarea>` (`name`, `maxLength`, `autoComplete`, `spellCheck`, `onBlur`, `aria-*`, `data-*`…), except `readOnly`, `style` and `children`, which Textarea replaces |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.textarea__wrapper .field-presentation` | `div` | `className` | `wrapperStyle` | `Always` |
| `.textarea__label` | `label` | `labelClassName` | `labelStyle` | `label` |
| `.textarea__required` | `span` | `requiredClassName` | `requiredStyle` | `label && required` |
| `.textarea__control` | `div` around the textarea and its outline | — | — | `Always` |
| `.textarea` | `textarea` | `textareaClassName` | `textareaStyle` | `Always` |
| `.field__outline` | `fieldset`, `aria-hidden`, inside `.textarea__control` | — | — | `Always`; draws the border only for a floating label on an outlined field, as in [Input](./Input.md) |
| `.field__description` | `div` | `descriptionClassName` | `descriptionStyle` | `description` |
| `.textarea__error-message` | `div` | `errorClassName` | `errorStyle` | `error` |

State/variant selectors: `.textarea--auto-resize`, `.textarea__label--error`,
`.textarea__label--disabled`, and on `.textarea` the native `:disabled`, `[readonly]`,
`:focus` and `[aria-invalid="true"]`. The field uses `box-sizing: content-box`: a `width` or
`height` you give it excludes its padding and border. Use the
[stylesheet](../../src/components/Textarea/Textarea.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Textarea className="order-notes" label="Order notes" rows={2} />
```

```css
.order-notes {
  max-width: 40rem;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

Textarea reads the `input` recipe that all six systems supply in light and dark modes; the
[Input guide](./Input.md#css-token-reference) lists every `--input-*` token. Its surface,
border, padding by size, typography, focus, error, read-only and disabled values are the
Input's, so a form's fields match.

- [input baseline recipe](../../src/design-systems/neus/generated/recipes/input.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--textarea-radius` | Corner radius: the input radius, never more than the 16px content radius | `min(var(--input-radius), 16px)` |
| `--textarea-filled-radius` | Corner radius of a filled textarea | `var(--textarea-radius)` |
| `--textarea-line-height` | Height of each line, which `rows` and `maxRows` count | `var(--input-line-height)` |

### Shared dependencies and runtime values

`--input-*` (the input recipe) and the `--field-*` values of the field presentation.
`--textarea-rows` and `--textarea-max-rows` are set on the field from `rows` and `maxRows`
and become its minimum and maximum height in lines (`1lh`).

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --textarea-radius: 8px;
}
```

## Storybook and related guides

The single Textarea story exposes props as controls. Related: [Input](./Input.md),
[FormTemplate](../templates/FormTemplate.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
