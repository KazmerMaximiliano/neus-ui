# Avatar

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A person or organization shown as a picture, or as initials when there is none.

## Usage

```tsx
import { ThemeProvider, Avatar } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  return (
    <ThemeProvider designSystem="neus">
      <Avatar name="Lucía Ferreyra" src="/team/lucia.jpg" size="large" />
    </ThemeProvider>
  );
};
```

Beside a visible name, as in a testimonial, pass `alt=""` so the name is read once:

```tsx
<Avatar name={quote.name} alt="" /> <strong>{quote.name}</strong>
```

## Behavior and accessibility

The avatar is `role="img"` named by `alt`, which defaults to `name`; the picture inside has an
empty `alt`. With `alt=""` the avatar is hidden from assistive technology. The initials are the
first letters of the first and last words of `name`. They show while `src` is missing and
when the picture fails to load, including a failure that happened before hydration. `size`
defaults to the enclosing [AvatarGroup](./AvatarGroup.md)'s size, then `medium`. `shape`
overrides the system's shape (`--avatar-radius`) and is not set by default.

## Props

See [the type source](../../src/components/Avatar/Avatar.types.ts) and
[implementation](../../src/components/Avatar/Avatar.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `name` | `string` | Required | Gives the initials and the accessible name |
| `src` | `string` | Omitted | Picture |
| `alt` | `string` | `name` | Accessible name; `""` hides a decorative avatar |
| `size` | `"small" \| "medium" \| "large"` | Group's size, then `"medium"` | Size |
| `shape` | `"circle" \| "rounded"` | System's shape | Overrides the shape |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.avatar` |
| `imageClassName`, `imageStyle` | `string`, `CSSProperties` | Omitted | `.avatar__image` |
| `initialsClassName`, `initialsStyle` | `string`, `CSSProperties` | Omitted | `.avatar__initials` |
| Native attributes and ref | React props for a `span` | Optional | Forwarded to `.avatar` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.avatar` | `span` | `className` | `style` | `Always` |
| `.avatar__image` | `img` | `imageClassName` | `imageStyle` | `src` given and loaded |
| `.avatar__initials` | `span` | `initialsClassName` | `initialsStyle` | No picture to show |

State/variant selectors: `.avatar[data-size]`, `.avatar[data-shape]`. Use the
[stylesheet](../../src/components/Avatar/Avatar.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Avatar className="speaker-avatar" name="Valeria Ocampo" size="large" />
```

```css
.speaker-avatar {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [avatar baseline recipe](../../src/design-systems/neus/generated/recipes/avatar.css)

### Surface and color

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--avatar-background` | avatar background | `color-mix(in srgb, var(--color-primary) 14%, var(--color-surface))` |
| `--avatar-color` | avatar color | `color-mix(in srgb, var(--color-primary) 55%, var(--color-text-primary))` |
| `--avatar-group-ring-color` | avatar group ring color | `var(--color-surface)` |

### Geometry and layout

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--avatar-size-small` | avatar size small | `32px` |
| `--avatar-size-medium` | avatar size medium | `40px` |
| `--avatar-size-large` | avatar size large | `56px` |
| `--avatar-radius` | avatar radius | `50%` |
| `--avatar-rounded-radius` | avatar rounded radius | `var(--radius-md)` |
| `--avatar-group-overlap` | avatar group overlap | `0.25` |
| `--avatar-group-ring-width` | avatar group ring width | `2px` |

### Typography and text

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--avatar-font-family` | avatar font family | `var(--font-body)` |
| `--avatar-font-weight` | avatar font weight | `600` |

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --avatar-radius: var(--radius-sm);
}
```

## Storybook and related guides

The single Avatar story exposes props as controls. Public section:
[AvatarGroup](./AvatarGroup.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
