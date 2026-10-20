# FormTemplate

[Template index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Responsive field grid with a replaceable action region.

## Usage

```tsx
import { ThemeProvider, Input, FormTemplate } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <form onSubmit={(event) => { event.preventDefault(); window.alert("Submitted"); }}><FormTemplate submitLabel="Save" columns={2} mobileColumns={1} gap={24}><Input label="Name" name="name" required /><Input label="Email" name="email" type="email" required /></FormTemplate></form>
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

Renders a div rather than a form. The consumer supplies the form element, validation,
submission and error state. By default the action region contains a submit Button; actions
replaces it when non-null. Loading affects only that default Button.

Columns default to 2/2/1 for desktop/tablet/mobile. Invalid column counts fall back to safe
defaults; numeric gap values become pixels. Runtime column/gap variables are placed before
root style overrides. Every direct child can shrink, and the action region spans all
columns. A single action (the default submit Button or one custom element) sits in the last
column with that column's width, so it lines up with the field above it; in a one-column form
it spans the form. Several actions keep their natural widths, aligned to the end. Below 768px
actions expand to full width. Use the child components own hooks to
customize fields and buttons.

Rows take the height of their tallest field, so a hint (`description`) or a two-line label on
only one field of a row leaves a gap under its neighbours. Give every field of a row a hint or
none, keep hints to one line (put examples in `placeholder`), and give a field with a long
hint, a textarea or a consent checkbox its own row with `className="form-template__full"`,
which spans every column. `npx neus shot` reports rows whose fields differ by more than
20px.

## Props

Column counts are set inline from the corresponding props. Use those props or root `style`
overrides to change them; an inherited scope token cannot replace a variable declared
directly on the element. Gap follows its recipe until the `gap` prop or a root override
supplies a value.

See [the type source](../../src/templates/FormTemplate/FormTemplate.types.ts) and
[implementation](../../src/templates/FormTemplate/FormTemplate.tsx) for the exact contract.
All customization props are optional and default to undefined unless noted; section style
props retain their nullable default.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `actionsClassName` | `string` | Omitted | Additional classes on `.form-template__submit` |
| `children` | `ReactNode` | Required | Content to display in the main area |
| `submitLabel` | `string` | Required | Label for the submit button |
| `loading` | `boolean` | Omitted | Loading state for the submit button |
| `actions` | `ReactNode` | Omitted | Composed custom actions |
| `className` | `string` | Omitted | Additional classes on `.form-template` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.form-template` |
| `actionsStyle` | `CSSProperties` | Omitted | Inline styles on `.form-template__submit` |
| `columns` | `number` | `2` | columns override |
| `tabletColumns` | `number` | `2` | tabletColumns override |
| `mobileColumns` | `number` | `1` | mobileColumns override |
| `gap` | `import(".pnpm/csstype@3.2.3/node_modules/csstype").Property.Gap<string \| number>` | Omitted | gap override |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render
removes that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.form-template` | `div` | `className` | `style` | `Always` |
| `.form-template__submit` | `div` | `actionsClassName` | `actionsStyle` | `Always` |
| `.form-template__full` | Your field's root | Add it to the field's `className` | None | When you add it |

Interaction states use native pseudo-classes and ARIA/data attributes where present.

Use the [stylesheet](../../src/templates/FormTemplate/FormTemplate.styles.css) for
pseudo-elements and state selectors. For shared field/listbox parts, also inspect the shared
styles linked from the implementation. Consumer content and third-party generated internals
retain their own customization APIs.

### Instance styles and classes

Use these props in the usage example above (keep its imports and local state):

```tsx
<form onSubmit={(event) => { event.preventDefault(); window.alert("Submitted"); }}><FormTemplate actionsClassName="example-form-template" actionsStyle={{ outlineOffset: 4 }} submitLabel="Save" columns={2} mobileColumns={1} gap={24}><Input label="Name" name="name" required /><Input label="Email" name="email" type="email" required /></FormTemplate></form>
```

```css
.example-form-template {
  outline-offset: 4px;
}
.example-form-template:focus-visible {
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

- [templates baseline recipe](../../src/design-systems/neus/generated/recipes/templates.css)

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--form-template-action-gap` | form template action gap | `12px` |
| `--form-template-action-padding` | form template action padding | `8px` |
| `--form-template-columns` | form template columns | `2` |
| `--form-template-gap` | form template gap | `16px` |
| `--form-template-margin-top` | form template margin top | `16px` |
| `--form-template-mobile-columns` | form template mobile columns | `1` |
| `--form-template-padding` | form template padding | `0px` |
| `--form-template-tablet-columns` | form template tablet columns | `2` |

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--form-template-background` | form template background | `transparent` |
| `--form-template-color` | form template color | `var(--color-text-primary)` |

### Shared dependencies and runtime values

`--font-body`.

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
  --form-template-action-gap: 12px;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

Related composition: [Input](../components/Input.md), [Button](../components/Button.md).

The single FormTemplate story exposes props as controls. Its local design selector defaults
to Inherit global, supports all six systems, and follows the toolbar color scheme.

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
