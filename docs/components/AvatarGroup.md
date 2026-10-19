# AvatarGroup

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Overlapping avatars of a team or the people in a thread, with a count for those not shown.

## Usage

```tsx
import { ThemeProvider, Avatar, AvatarGroup } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = ({ team }: { team: { name: string; photo?: string }[] }) => {
  return (
    <ThemeProvider designSystem="neus">
      <AvatarGroup aria-label="Equipo" max={3} moreLabel={(hidden) => `+${hidden}`}>
        {team.map((person) => <Avatar key={person.name} name={person.name} src={person.photo} />)}
      </AvatarGroup>
    </ThemeProvider>
  );
};
```

## Behavior and accessibility

The group is `role="group"`; name it with `aria-label`. It shows the first `max` children and
a count for the rest, `role="img"` and named by `moreLabel(hidden)` (default `+N`; pass a
function in the project's language for a fuller name, such as `` (n) => `${n} personas más` ``).
`size` applies to every avatar that does not set its own. Avatars overlap by
`--avatar-group-overlap` times their size, separated by a ring in the surface color.

## Props

See [the type source](../../src/components/Avatar/components/AvatarGroup/AvatarGroup.types.ts)
and [implementation](../../src/components/Avatar/components/AvatarGroup/AvatarGroup.tsx) for the
exact contract. All props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `children` | `ReactNode` | Required | Avatar elements, in order of importance |
| `max` | `number` | All shown | Avatars shown before the count |
| `size` | `"small" \| "medium" \| "large"` | `"medium"` | Size of every avatar |
| `moreLabel` | `(hidden: number) => string` | `` (n) => `+${n}` `` | Text and accessible name of the count |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.avatar-group` |
| `moreClassName`, `moreStyle` | `string`, `CSSProperties` | Omitted | `.avatar-group__more` |
| Native attributes and ref | React props for a `div` | Optional | Forwarded to `.avatar-group` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.avatar-group` | `div` | `className` | `style` | `Always` |
| `.avatar-group__more` | `span.avatar` | `moreClassName` | `moreStyle` | More children than `max` |

Use the [stylesheet](../../src/components/Avatar/components/AvatarGroup/AvatarGroup.styles.css)
for the exact declarations.

### Instance styles and classes

```tsx
<AvatarGroup className="thread-people" max={4}>{avatars}</AvatarGroup>
```

```css
.thread-people {
  margin-inline-start: var(--space-2);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

AvatarGroup reads the [Avatar](./Avatar.md) recipe: `--avatar-group-overlap`,
`--avatar-group-ring-width` and `--avatar-group-ring-color`. The count uses
`--color-surface-container-high` and `--color-text-secondary`.

## Storybook and related guides

The single AvatarGroup story exposes props as controls. Owning family: [Avatar](./Avatar.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
