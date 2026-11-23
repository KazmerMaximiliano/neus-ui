# EmptyState

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Says that a region has no content yet, and what to do about it: a list before its first item,
search results that found nothing, a cleared inbox. It has an optional icon or illustration, a
title, an optional description and optional actions. [DataTable](./DataTable.md) shows one when
it has no rows.

## Usage

```tsx
import { Inbox } from "lucide-react";
import { Button, EmptyState, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => (
  <ThemeProvider designSystem="neus">
    <EmptyState
      media={<Inbox aria-hidden />}
      title="No messages yet"
      description="Messages from your customers appear here as soon as they write."
      actions={<Button label="Invite customers" />}
    />
  </ThemeProvider>
);
```

Write the title as what is missing ("No messages yet"), the description as why or what will
appear, and give at most one primary action with an optional secondary one. While content is
still loading, show a [Skeleton](./Skeleton.md) or a [Spinner](./Spinner.md) instead; when
loading failed, an [Alert](./Alert.md).

## Behavior and accessibility

The title is an `h2` by default; set `titleAs` (`h3`, `h4` or `p`) to keep the page's heading
order. The description is a paragraph. `media` sits above the title: mark an icon `aria-hidden`
when the title already says the same, or give a picture its `alt`. When the empty state replaces
content after an action (a search with no results), pass `role="status"` so screen readers
announce it, as DataTable does.

## Props

See [the type source](../../src/components/EmptyState/EmptyState.types.ts) and
[implementation](../../src/components/EmptyState/EmptyState.tsx) for the exact contract. All
props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `title` | `ReactNode` | Required | What is missing, in a few words |
| `titleAs` | `"h2" \| "h3" \| "h4" \| "p"` | `"h2"` | The title's element |
| `description` | `ReactNode` | Omitted | Why it is empty, or what appears here; phrasing content |
| `media` | `ReactNode` | Omitted | An icon or illustration above the title |
| `actions` | `ReactNode` | Omitted | The way forward: one Button, or a primary and a secondary |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.empty-state` |
| `mediaClassName`, `mediaStyle` | `string`, `CSSProperties` | Omitted | `.empty-state__media` |
| `titleClassName`, `titleStyle` | `string`, `CSSProperties` | Omitted | `.empty-state__title` |
| `descriptionClassName`, `descriptionStyle` | `string`, `CSSProperties` | Omitted | `.empty-state__description` |
| `actionsClassName`, `actionsStyle` | `string`, `CSSProperties` | Omitted | `.empty-state__actions` |
| Native attributes | `div` attributes and `ref` | Optional | `role`, `id`, `aria-*` and the ref land on the root |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.empty-state` | `div` | `className` | `style` | `Always` |
| `.empty-state__media` | `div` | `mediaClassName` | `mediaStyle` | `media` |
| `.empty-state__title` | `h2`, `h3`, `h4` or `p` | `titleClassName` | `titleStyle` | `Always` |
| `.empty-state__description` | `p` | `descriptionClassName` | `descriptionStyle` | `description` |
| `.empty-state__actions` | `div` | `actionsClassName` | `actionsStyle` | `actions` |

An SVG directly inside the media takes `--empty-state-media-size`. Use the
[stylesheet](../../src/components/EmptyState/EmptyState.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<EmptyState title="Drop files here" className="drop-zone" />
```

```css
.drop-zone {
  --empty-state-border-width: 2px;
  --empty-state-border-style: dashed;
  --empty-state-border-color: var(--color-border-input);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files.

- [empty-state baseline recipe](../../src/design-systems/neus/generated/recipes/empty-state.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--empty-state-font-family` | Font | `var(--font-body)` |
| `--empty-state-gap` | Space between the parts | `8px` |
| `--empty-state-padding` | Space inside | `32px 24px` |
| `--empty-state-min-height` | Least height | `0px` |
| `--empty-state-max-width` | Measure of the title and description | `40ch` |
| `--empty-state-align` | Alignment of the parts | `center` |
| `--empty-state-text-align` | Alignment of the text | `center` |
| `--empty-state-background` | Fill | `transparent` |
| `--empty-state-border-width`, `--empty-state-border-style`, `--empty-state-border-color` | Frame | `0px`, `solid`, `transparent` |
| `--empty-state-radius` | Corners | `var(--card-radius)` |
| `--empty-state-media-size` | Icon size | `24px` |
| `--empty-state-media-color` | Icon color | `var(--color-primary-text)` |
| `--empty-state-media-background` | Tile behind the icon | `color-mix(in srgb, var(--color-primary) 12%, var(--color-surface))` |
| `--empty-state-media-padding` | Space around the icon | `12px` |
| `--empty-state-media-radius` | Tile corners | `50%` |
| `--empty-state-title-color` | Title color | `var(--color-text-primary)` |
| `--empty-state-title-size` | Title size | `var(--fs-lg)` |
| `--empty-state-title-weight` | Title weight | `600` |
| `--empty-state-title-line-height` | Title line height | `1.3` |
| `--empty-state-description-color` | Description color | `var(--color-text-secondary)` |
| `--empty-state-description-size` | Description size | `var(--fs-sm)` |
| `--empty-state-description-line-height` | Description line height | `1.5` |
| `--empty-state-actions-gap` | Space between actions | `12px` |
| `--empty-state-actions-spacing` | Extra space above the actions | `8px` |

### Shared dependencies and runtime values

[DataTable](./DataTable.md) sets these tokens on `.data-table__no-rows` from its
`--data-table-empty-*` tokens, so its empty state keeps the table's look.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --empty-state-align: flex-start;
  --empty-state-text-align: start;
}
```

## Storybook and related guides

The single EmptyState story, under Feedback, shows an empty inbox with two actions. Related:
[DataTable](./DataTable.md), [Skeleton](./Skeleton.md), [Alert](./Alert.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
