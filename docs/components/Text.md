# Text

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Running text on the system's type scale: lead, body, small, caption or overline.

## Usage

```tsx
import { ThemeProvider, Text } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Text variant="lead">Tell it how you arrive and it picks the session.</Text>
      <Text>Short guided sessions for the desk, the commute or before a hard call.</Text>
      <Text variant="small" tone="muted">Only your name and email. No card required.</Text>
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

`variant` picks the step of the scale; `body` is at least 16px in every system, and controls
keep their own 14px `--type-body-size`. `measure` (default on for lead and body) caps the line
length at `--text-measure`; with `align="center"` the measured block is centered too. `tone`
maps to semantic color roles; `default` inherits the surrounding color. `lines` truncates
with `line-clamp` after that many lines (the full text stays in the DOM for assistive
technology). `numeric` switches to tabular figures. `overline` is uppercase only where the
system allows it; other systems render it in natural case.

## Props

See [the type source](../../src/components/Text/Text.types.ts) and
[implementation](../../src/components/Text/Text.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `as` | `"p" \| "span" \| "div" \| "small" \| "strong"` | `"p"` | Rendered element |
| `variant` | `TextVariant` | `"body"` | Step of the type scale |
| `tone` | `TextTone` | `"default"` | Color role; default inherits |
| `weight` | `"regular" \| "medium" \| "semibold"` | Variant's weight | Overrides the weight |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Text alignment |
| `measure` | `boolean` | `true` for lead and body | Caps the line length at `--text-measure` |
| `lines` | `number` | Omitted | Truncates after this many lines |
| `numeric` | `boolean` | `false` | Tabular figures |
| `children` | `ReactNode` | Omitted | Text content |
| `className` | `string` | Omitted | Additional classes on `.text` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.text`, merged after `--text-lines` |
| Native attributes and ref | React props for the `as` element | Optional | Forwarded to the element |

### Supporting types

```ts
type TextVariant = "lead" | "body" | "small" | "caption" | "overline";

type TextTone = "default" | "muted" | "primary" | "success" | "error";
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.text` | `as` element (`p`) | `className` | `style` | `Always` |

State/variant selectors: `.text[data-variant]`, `.text[data-tone]`, `.text[data-weight]`,
`.text[data-align]`, `.text[data-measure]`, `.text[data-numeric]`, `.text[data-lines]`. The
inline `--text-lines` custom property carries the `lines` value. Use the
[stylesheet](../../src/components/Text/Text.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Text className="example-text" style={{ marginBlockStart: 8 }}>Body copy</Text>
```

```css
.example-text {
  text-wrap: pretty;
}
```

Style props win over ordinary stylesheet declarations for the same property. Use a
stylesheet for hover, focus and pseudo-elements. Custom properties still follow CSS
inheritance, scope resets and specificity; see [the cascade guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [typography baseline recipe](../../src/design-systems/neus/generated/recipes/typography.css)

Lead and caption read the system roles `--type-lead-*` and `--type-caption-*`
([token reference](../design/tokens.md)).

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--text-font-family` | text font family | `var(--font-body)` |
| `--text-weight-regular` | text weight regular | `400` |
| `--text-weight-medium` | text weight medium | `500` |
| `--text-weight-semibold` | text weight semibold | `600` |
| `--text-lead-size` | text lead size | `var(--type-lead-size)` |
| `--text-lead-weight` | text lead weight | `var(--type-lead-weight)` |
| `--text-lead-line-height` | text lead line height | `var(--type-lead-line-height)` |
| `--text-lead-tracking` | text lead tracking | `var(--type-lead-tracking)` |
| `--text-body-size` | text body size | `var(--fs-md)` |
| `--text-body-weight` | text body weight | `var(--type-body-weight)` |
| `--text-body-line-height` | text body line height | `1.6` |
| `--text-body-tracking` | text body tracking | `var(--type-body-tracking)` |
| `--text-small-size` | text small size | `var(--fs-base)` |
| `--text-small-weight` | text small weight | `var(--type-body-weight)` |
| `--text-small-line-height` | text small line height | `var(--type-body-line-height)` |
| `--text-small-tracking` | text small tracking | `var(--type-body-tracking)` |
| `--text-caption-size` | text caption size | `var(--type-caption-size)` |
| `--text-caption-weight` | text caption weight | `var(--type-caption-weight)` |
| `--text-caption-line-height` | text caption line height | `var(--type-caption-line-height)` |
| `--text-caption-tracking` | text caption tracking | `var(--type-caption-tracking)` |
| `--text-overline-size` | text overline size | `var(--fs-xs)` |
| `--text-overline-weight` | text overline weight | `600` |
| `--text-overline-line-height` | text overline line height | `var(--type-caption-line-height)` |
| `--text-overline-tracking` | text overline tracking | `0.08em` |
| `--text-overline-transform` | text overline transform | `uppercase` |

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--text-muted-color` | text muted color | `var(--color-text-secondary)` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--text-measure` | text measure | `65ch` |

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
  --text-measure: 60ch;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Text story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider. Related:
[Heading](./Heading.md), [Section](./Section.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
