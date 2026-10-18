# Section

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A full-width band of the page with its own background and vertical rhythm, its content
centered in a Container.

## Usage

```tsx
import { ThemeProvider, Heading, Section, Text } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Section id="features" tone="subtle" aria-labelledby="features-title">
        <Heading id="features-title">Not another audio library</Heading>
        <Text variant="lead" tone="muted">Each session starts from how you arrive.</Text>
      </Section>
    </ThemeProvider>
  );
};
```

Alternate `default` and `subtle` between consecutive sections instead of drawing rules; keep
`accent` for one band, such as the final call to action.

## Behavior and accessibility

Section renders a `section` element; with an accessible name (`aria-labelledby` pointing at
its heading) it becomes a region landmark. `id` makes it a link destination, for example a
Button with `href="#features"`. `tone` sets the band background: `default` is transparent,
`subtle` uses the system's low surface container and `accent` tints the surface with 8% of
the primary color while keeping the normal ink, so primary buttons inside stay legible. An
inverse band is not offered: it needs a local ThemeProvider with the opposite color scheme.
`spacing` sets the vertical padding (`lg` grows from 48px to 96px in Neus). `container`
wraps the children in a Container of that size; `false` renders them directly and drops
`contentClassName` and `contentStyle`.

## Props

See [the type source](../../src/components/Section/Section.types.ts) and
[implementation](../../src/components/Section/Section.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `as` | `"section" \| "div" \| "header" \| "footer" \| "aside"` | `"section"` | Rendered element |
| `tone` | `"default" \| "subtle" \| "accent"` | `"default"` | Band background |
| `spacing` | `"sm" \| "md" \| "lg"` | `"lg"` | Vertical padding |
| `container` | `ContainerSize \| false` | `"lg"` | Container around the content |
| `children` | `ReactNode` | Omitted | Content |
| `className` | `string` | Omitted | Additional classes on `.section` |
| `style` | `CSSProperties` | Omitted | Inline styles on `.section` |
| `contentClassName` | `string` | Omitted | Additional classes on `.section__content` |
| `contentStyle` | `CSSProperties` | Omitted | Inline styles on `.section__content` |
| Native attributes and ref | React props for the `as` element | Optional | Forwarded to the band; use `id` and `aria-labelledby` |

`ContainerSize` is described in [Container](./Container.md#supporting-types).

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.section` | `as` element (`section`) | `className` | `style` | `Always` |
| `.section__content` | Container (`div.layout-container`) | `contentClassName` | `contentStyle` | `container !== false` |

State/variant selectors: `.section[data-tone]`, `.section[data-spacing]`. Use the
[stylesheet](../../src/components/Section/Section.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Section className="example-section" contentClassName="example-section-content">Content</Section>
```

```css
.example-section-content {
  display: grid;
  gap: var(--space-8);
}
```

Style props win over ordinary stylesheet declarations for the same property. Use a
stylesheet for hover, focus and pseudo-elements. Custom properties still follow CSS
inheritance, scope resets and specificity; see [the cascade guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [layout baseline recipe](../../src/design-systems/neus/generated/recipes/layout.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--section-default-background` | section default background | `transparent` |
| `--section-default-color` | section default color | `currentColor` |
| `--section-subtle-background` | section subtle background | `var(--color-surface-container-low)` |
| `--section-subtle-color` | section subtle color | `currentColor` |
| `--section-accent-background` | section accent background | `color-mix(in srgb, var(--color-primary) 8%, var(--color-surface))` |
| `--section-accent-color` | section accent color | `var(--color-text-primary)` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--section-sm-padding-block` | section sm padding block | `clamp(var(--space-6), 4vw, var(--space-8))` |
| `--section-md-padding-block` | section md padding block | `clamp(var(--space-8), 6vw, var(--space-16))` |
| `--section-lg-padding-block` | section lg padding block | `clamp(var(--space-12), 8vw, 96px)` |

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
  --section-lg-padding-block: clamp(64px, 10vw, 128px);
}
```

Nested provider boundaries reset recipe tokens. Apply overrides to the boundary or component
that should own them, rather than relying on an ancestor override crossing a nested scope.

## Storybook and related guides

The single Section story exposes props as controls. Design selection is preview
configuration; applications select it through ThemeProvider. Related:
[Container](./Container.md), [Heading](./Heading.md), [Grid](./Grid.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
