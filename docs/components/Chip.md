# Chip

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

A compact label for one value: a filter you switch on and off, a tag you remove, or both. A
selectable chip is a toggle; a removable chip ends in a remove button. The selected values of
[MultiSelect](./MultiSelect.md) are chips.

## Usage

```tsx
import { useState } from "react";
import { Chip, Stack, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

const CATEGORIES = ["Design", "Engineering", "Sales"];

export const Example = () => {
  const [active, setActive] = useState<string[]>(["Design"]);
  const [tags, setTags] = useState(["urgent", "q3"]);

  return (
    <ThemeProvider designSystem="neus">
      <Stack direction="row" gap={2} role="group" aria-label="Departments">
        {CATEGORIES.map((category) => (
          <Chip
            key={category}
            label={category}
            selected={active.includes(category)}
            onSelectedChange={(on) =>
              setActive((current) => (on ? [...current, category] : current.filter((item) => item !== category)))
            }
          />
        ))}
      </Stack>
      <Stack direction="row" gap={2}>
        {tags.map((tag) => (
          <Chip key={tag} label={tag} size="small" onRemove={() => setTags(tags.filter((item) => item !== tag))} />
        ))}
      </Stack>
    </ThemeProvider>
  );
};
```

Use chips for values a person picks or drops in place: filters over a list, the tags of an
item. A status that only informs is a [Badge](./Badge.md); a choice of one view among a few is a
[ToggleGroup](./ToggleGroup.md); values chosen from a long list go in a
[MultiSelect](./MultiSelect.md) or a [Combobox](./Combobox.md).

## Behavior and accessibility

- **Static.** Without selection props or `onRemove`, the chip is plain text in its frame.
- **Selectable.** `selected`, `defaultSelected` or `onSelectedChange` turns the label into a
  `<button aria-pressed>`: Enter and Space switch it, and screen readers announce "toggle button,
  pressed". A selected chip shows a check in place of its icon, so the state does not rest on
  color alone. `selected` makes it controlled and `defaultSelected` uncontrolled;
  `onSelectedChange` receives the new state.
- **Removable.** `onRemove` adds a remove button after the label, named "Remove {label}" by
  default (`labels.remove` in the project's language). The two buttons are siblings, never one
  inside the other, so a chip can be selectable and removable at once. Move focus to a nearby
  control after a removal, since the button goes away with the chip.
- **Disabled.** `disabled` disables both buttons and dims the chip.

The icon is decorative (`aria-hidden`); the label names the chip. Long labels end in an
ellipsis inside the space the chip gets. Group related selectable chips in an element with
`role="group"` and an `aria-label`.

## Props

See [the type source](../../src/components/Chip/Chip.types.ts) and
[implementation](../../src/components/Chip/Chip.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `label` | `string` | Required | Text of the chip |
| `icon` | `IconButtonIcon` | Omitted | A decorative lucide icon before the label |
| `selected` | `boolean` | Omitted | Makes the chip a toggle, on or off (controlled) |
| `defaultSelected` | `boolean` | Omitted | Makes the chip a toggle with an initial state (uncontrolled) |
| `onSelectedChange` | `(selected: boolean) => void` | Omitted | Makes the chip a toggle; called with the new state |
| `onRemove` | `() => void` | Omitted | Adds the remove button; called when it is pressed |
| `size` | `"small" \| "medium"` | `"medium"` | Height, padding and type size |
| `disabled` | `boolean` | `false` | Disables the buttons and dims the chip |
| `labels` | `ChipLabels` | `{ remove: (label) => \`Remove ${label}\` }` | Name of the remove button, in the project's language |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.chip` |
| `iconClassName`, `iconStyle` | `string`, `CSSProperties` | Omitted | `.chip__icon`, the icon or the check |
| `actionClassName`, `actionStyle` | `string`, `CSSProperties` | Omitted | `.chip__action` |
| `labelClassName`, `labelStyle` | `string`, `CSSProperties` | Omitted | `.chip__label` |
| `removeClassName`, `removeStyle` | `string`, `CSSProperties` | Omitted | `.chip__remove` |
| `removeIconClassName`, `removeIconStyle` | `string`, `CSSProperties` | Omitted | `.chip__remove-icon` |
| Native attributes | `span` attributes and `ref` | Optional | `id`, `title`, `data-*` and the ref land on the root |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.chip` | `span` | `className` | `style` | `Always` |
| `.chip__action` | `button`, `aria-pressed` | `actionClassName` | `actionStyle` | Selectable |
| `.chip__icon` | `svg`, `aria-hidden`; `.chip__check` while selected | `iconClassName` | `iconStyle` | `icon`, or selected |
| `.chip__label` | `span` | `labelClassName` | `labelStyle` | `Always` |
| `.chip__remove` | `button` | `removeClassName` | `removeStyle` | `onRemove` |
| `.chip__remove-icon` | `svg`, `aria-hidden` | `removeIconClassName` | `removeIconStyle` | `onRemove` |

States: `[data-selected]`, `[data-disabled]` and `[data-size]` on the root; `:hover` on the
action fills the whole chip, `:focus-visible` on each button draws its ring. Use the
[stylesheet](../../src/components/Chip/Chip.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Chip label="Urgent" className="urgent-chip" />
```

```css
.urgent-chip {
  --chip-border-color: var(--color-error);
  --chip-color: var(--color-error-text);
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [chip baseline recipe](../../src/design-systems/neus/generated/recipes/chip.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--chip-font-family` | Label font | `var(--font-body)` |
| `--chip-font-size-small`, `--chip-font-size-medium` | Label size | `var(--fs-xs)`, `var(--fs-sm)` |
| `--chip-font-weight` | Label weight | `500` |
| `--chip-line-height` | Label line height | `1.4` |
| `--chip-height-small`, `--chip-height-medium` | Least height | `24px`, `32px` |
| `--chip-padding-small`, `--chip-padding-medium` | Space at each end | `10px`, `12px` |
| `--chip-padding-block` | Space above and below | `0px` |
| `--chip-gap` | Space between the icon, the label and the remove button | `6px` |
| `--chip-radius` | Corners | `3em` |
| `--chip-border-width` | Border width | `1px` |
| `--chip-border-color` | Border at rest | `var(--color-border-input)` |
| `--chip-background` | Fill at rest | `transparent` |
| `--chip-color` | Text and icon at rest | `var(--color-text-primary)` |
| `--chip-icon-size` | Icon and check size | `16px` |
| `--chip-hover-background` | Fill of a selectable chip under the pointer | `var(--color-surface-hover)` |
| `--chip-selected-background` | Fill while selected | `color-mix(in srgb, var(--color-primary) 12%, var(--color-surface))` |
| `--chip-selected-hover-background` | Fill while selected, under the pointer | `color-mix(in srgb, var(--color-primary) 18%, var(--color-surface))` |
| `--chip-selected-color` | Text while selected | `var(--color-primary-text)` |
| `--chip-selected-border-color` | Border while selected | `var(--color-primary)` |
| `--chip-remove-size-small`, `--chip-remove-size-medium` | Remove button size, within the chip's height | `20px`, `20px` |
| `--chip-remove-icon-size` | Remove icon size | `14px` |
| `--chip-remove-inset` | Space between the remove button and the chip's end | `4px` |
| `--chip-remove-radius` | Remove button corners | `50%` |
| `--chip-remove-color` | Remove icon color | `var(--color-text-secondary)` |
| `--chip-remove-hover-background` | Remove button fill under the pointer | `var(--color-surface-hover)` |
| `--chip-focus-width`, `--chip-focus-color`, `--chip-focus-offset` | Keyboard focus ring | `2px`, `var(--color-focus)`, `1px` |
| `--chip-disabled-opacity` | Opacity while disabled | `0.38` |
| `--chip-transition` | State transition, off under reduced motion | `background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease` |

### Shared dependencies and runtime values

`--chip-height`, `--chip-padding`, `--chip-font-size` and `--chip-remove-size` are set by the
stylesheet from the size tokens. [MultiSelect](./MultiSelect.md) sets the chip tokens of its tags from its
`--select-tag-*` tokens, so its tags keep the select's look.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --chip-radius: var(--radius-sm);
  --chip-selected-background: var(--color-primary);
  --chip-selected-color: var(--color-text-on-primary);
}
```

## Storybook and related guides

The single Chip story exposes props as controls, with preview switches for a selectable and a
removable chip. Related: [Badge](./Badge.md), [ToggleGroup](./ToggleGroup.md),
[MultiSelect](./MultiSelect.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
