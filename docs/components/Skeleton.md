# Skeleton

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Placeholder shapes that hold the place of content while it loads.

## Usage

```tsx
import { ThemeProvider, Skeleton } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = ({ loading, children }: { loading: boolean; children: React.ReactNode }) => {
  return (
    <ThemeProvider designSystem="neus">
      <section aria-busy={loading} aria-label="Perfil">
        {loading ? (
          <>
            <Skeleton variant="circle" />
            <Skeleton lines={3} />
          </>
        ) : children}
      </section>
    </ThemeProvider>
  );
};
```

Draw the shapes the content will take (lines for text, a block for media or a card, a circle for
an avatar), so the page keeps its layout when the content arrives. Use it for regions and lists,
not for buttons or fields, and only for a few seconds: a longer wait needs a
[Progress](./Progress.md) bar or a [Spinner](./Spinner.md) with a message.

## Behavior and accessibility

A skeleton is always `aria-hidden`: it has nothing to say. Mark the region that is loading
with `aria-busy="true"` and give it a name, and remove both when the content is in place;
screen readers then read the finished content instead of the placeholders. Keep focusable
controls out of a skeleton. The shapes pulse or shimmer, depending on the system; under
`prefers-reduced-motion: reduce` they stand still.

## Props

See [the type source](../../src/components/Skeleton/Skeleton.types.ts) and
[implementation](../../src/components/Skeleton/Skeleton.tsx) for the exact contract. All props
are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `variant` | `"text" \| "rect" \| "circle"` | `"text"` | Lines of text, a block or a circle |
| `lines` | `number` | `1` | Text lines, at least one; the last is shorter when there are several |
| `width` | `number \| string` | Omitted | CSS length, or pixels; full width by default, the recipe size for a circle |
| `height` | `number \| string` | Omitted | CSS length, or pixels; the recipe height for a block, the width for a circle |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.skeleton` |
| `lineClassName`, `lineStyle` | `string`, `CSSProperties` | Omitted | Each `.skeleton__line` |
| Native attributes and ref | React props for a `span` | Optional | Forwarded to `.skeleton`, except `children`; `aria-hidden` stays `true` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render removes
that override. Hooks do not create a part whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.skeleton` | `span`, `aria-hidden` | `className` | `style` | `Always` |
| `.skeleton__line` | `span` (one per line) | `lineClassName` | `lineStyle` | `variant="text"` |

State/variant selectors: `.skeleton--text`, `.skeleton--rect`, `.skeleton--circle`. The root
is a block `span`, so it is valid inside paragraphs and buttons as well as in layout containers.
Use the [stylesheet](../../src/components/Skeleton/Skeleton.styles.css) for the exact
declarations.

### Instance styles and classes

```tsx
<Skeleton variant="rect" height={180} className="cover-placeholder" />
```

```css
.cover-placeholder {
  --skeleton-rect-radius: 0px;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [skeleton baseline recipe](../../src/design-systems/neus/generated/recipes/skeleton.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--skeleton-background` | Color of every shape | `var(--color-border-subtle)` |
| `--skeleton-highlight` | Band that crosses the shapes in the shimmer | `transparent` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--skeleton-text-height` | Thickness of a text line | `0.75em` |
| `--skeleton-line-gap` | Space between text lines | `0.75em` |
| `--skeleton-last-line-width` | Width of the last of several lines | `60%` |
| `--skeleton-text-radius` | Line corners | `4px` |
| `--skeleton-rect-height` | Block height without `height` | `120px` |
| `--skeleton-rect-radius` | Block corners | `var(--card-radius)` |
| `--skeleton-circle-size` | Circle diameter without `width` | `40px` |

### Motion

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--skeleton-animation-name` | `skeleton-pulse` or `skeleton-shimmer` | `skeleton-pulse` |
| `--skeleton-duration` | One pulse or pass | `1.6s` |

### Shared dependencies and runtime values

`--color-border-subtle` and `--card-radius`. The component writes `width` and `height` as
`--skeleton-width` and `--skeleton-height` on `.skeleton`.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --skeleton-animation-name: skeleton-shimmer;
  --skeleton-highlight: var(--color-surface);
}
```

## Storybook and related guides

The single Skeleton story exposes props as controls inside a busy region. Related:
[Progress](./Progress.md), [Spinner](./Spinner.md), [MediaPlaceholder](./MediaPlaceholder.md)
(a missing picture, not a loading one).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
