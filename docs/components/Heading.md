# Heading

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A heading whose document level and visual size are chosen separately, on the system's
type scale.

## Usage

```tsx
import { ThemeProvider, Heading, Text } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Heading as="h1" size="display">A pause made for how you arrive</Heading>
      <Text variant="lead">Sessions that fit between two meetings.</Text>
    </ThemeProvider>
  );
};
```

Keep one `h1` per page and descend levels in order; pick the look with `size`. A section
title is usually `<Heading id="plans-title">Plans</Heading>` (an `h2` at size `lg`) with
`aria-labelledby="plans-title"` on its Section.

## Behavior and accessibility

`as` sets the document level (`h1` to `h6`, default `h2`) and therefore the heading's role and
level for assistive technology. `size` only changes the look; without it the level picks one:
h1 → `xl`, h2 → `lg`, h3 → `md`, h4 → `sm`, h5 and h6 → `xs`. `display` is reserved for the
main headline of a public page. `display`, `xl` and `lg` scale with the viewport through
`clamp()` in each system. `balance` (default true) evens out line lengths with
`text-wrap: balance`; long words break instead of overflowing. The color inherits from the
surrounding surface through `--heading-color`.

## Props

See [the type source](../../src/components/Heading/Heading.types.ts) and
[implementation](../../src/components/Heading/Heading.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `as` | `HeadingLevel` | `"h2"` | Document level |
| `size` | `HeadingSize` | Follows `as` | Visual size; `display` for the main headline of a public page |
| `align` | `"start" \| "center" \| "end"` | `"start"` | Text alignment |
| `balance` | `boolean` | `true` | Applies `text-wrap: balance` |
| `children` | `ReactNode` | Omitted | Heading text |
| `className` | `string` | Omitted | Additional classes on `.heading` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.heading` |
| Native attributes and ref | React props for a heading element | Optional | Forwarded to the heading; use `id` for `aria-labelledby` |

### Supporting types

```ts
type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingSize = "display" | "xl" | "lg" | "md" | "sm" | "xs";
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.heading` | `as` element (`h2`) | `className` | `style` | `Always` |

State/variant selectors: `.heading[data-size="display" | "xl" | "lg" | "md" | "sm" | "xs"]`,
`.heading[data-align]`, `.heading[data-balance]`. Use the
[stylesheet](../../src/components/Heading/Heading.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Heading as="h2" className="example-heading" style={{ marginBlockEnd: 8 }}>Plans</Heading>
```

```css
.example-heading {
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

The sizes read the system roles `--type-display-*`, `--type-headline-*` and `--type-heading-*`
([token reference](../design/tokens.md)); `lg` sits halfway between heading and headline so the
ladder never inverts.

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--heading-font-family` | heading font family | `var(--font-display)` |
| `--heading-color` | heading color | `currentColor` |
| `--heading-display-size` | heading display size | `var(--type-display-size)` |
| `--heading-display-weight` | heading display weight | `var(--type-display-weight)` |
| `--heading-display-line-height` | heading display line height | `var(--type-display-line-height)` |
| `--heading-display-tracking` | heading display tracking | `var(--type-display-tracking)` |
| `--heading-xl-size` | heading xl size | `var(--type-headline-size)` |
| `--heading-xl-weight` | heading xl weight | `var(--type-headline-weight)` |
| `--heading-xl-line-height` | heading xl line height | `var(--type-headline-line-height)` |
| `--heading-xl-tracking` | heading xl tracking | `var(--type-headline-tracking)` |
| `--heading-lg-size` | heading lg size | `calc((var(--type-heading-size) + var(--type-headline-size)) / 2)` |
| `--heading-lg-weight` | heading lg weight | `var(--type-headline-weight)` |
| `--heading-lg-line-height` | heading lg line height | `var(--type-headline-line-height)` |
| `--heading-lg-tracking` | heading lg tracking | `var(--type-headline-tracking)` |
| `--heading-md-size` | heading md size | `var(--type-heading-size)` |
| `--heading-md-weight` | heading md weight | `var(--type-heading-weight)` |
| `--heading-md-line-height` | heading md line height | `var(--type-heading-line-height)` |
| `--heading-md-tracking` | heading md tracking | `var(--type-heading-tracking)` |
| `--heading-sm-size` | heading sm size | `var(--fs-xl)` |
| `--heading-sm-weight` | heading sm weight | `var(--type-heading-weight)` |
| `--heading-sm-line-height` | heading sm line height | `var(--type-heading-line-height)` |
| `--heading-sm-tracking` | heading sm tracking | `var(--type-heading-tracking)` |
| `--heading-xs-size` | heading xs size | `var(--fs-lg)` |
| `--heading-xs-weight` | heading xs weight | `var(--type-heading-weight)` |
| `--heading-xs-line-height` | heading xs line height | `var(--type-heading-line-height)` |
| `--heading-xs-tracking` | heading xs tracking | `var(--type-heading-tracking)` |

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
  --heading-display-weight: 800;
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Heading story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider. Related:
[Text](./Text.md), [Section](./Section.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
