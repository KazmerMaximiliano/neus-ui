# ToggleGroup

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

[Toggles](./Toggle.md) that work together: one choice at a time, like a segmented control that
switches a list between list, grid and map views, or several at once, like the text styles of
an editor toolbar.

## Usage

```tsx
import { Bold, Italic, LayoutGrid, List, Underline } from "lucide-react";
import { useState } from "react";
import { ThemeProvider, Toggle, ToggleGroup } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => {
  const [view, setView] = useState("list");

  return (
    <ThemeProvider designSystem="neus">
      <ToggleGroup label="View" value={view} onChange={setView}>
        <Toggle value="list" label="List" icon={List} />
        <Toggle value="grid" label="Grid" icon={LayoutGrid} />
      </ToggleGroup>
      <ToggleGroup type="multiple" label="Text style" defaultValue={["bold"]} size="small">
        <Toggle value="bold" label="Bold" icon={Bold} iconOnly />
        <Toggle value="italic" label="Italic" icon={Italic} iconOnly />
        <Toggle value="underline" label="Underline" icon={Underline} iconOnly />
      </ToggleGroup>
    </ThemeProvider>
  );
};
```

Use a single-choice group for two to five short options that change the view at once. Options
sent with a form stay a [RadioGroup](./RadioGroup.md); views with their own content panels are
[Tabs](./Tabs.md).

## Behavior and accessibility

- **Single** (`type="single"`, the default). The group is a `radiogroup` named by `label`, and
  its toggles are radios with `aria-checked`. One toggle is pressed at a time; pressing it again
  keeps it, as with radios. The arrow keys move to the next or previous toggle and press it,
  Home and End to the first and last.
- **Multiple** (`type="multiple"`). The group is a `group` named by `label`, and its toggles
  keep `aria-pressed`, each pressed or not on its own. The arrow keys, Home and End only move
  the focus.

Tab reaches one toggle of the group, the last one focused, else the first pressed, else the
first enabled, and arrows move between the rest (roving focus); disabled toggles are skipped.
With `orientation="vertical"` the up and down arrows move instead of left and right, which swap
in right-to-left text. `aria-labelledby` names the group with visible text instead of `label`.

`value` makes it controlled and `defaultValue` uncontrolled. `onChange` receives the pressed
value in a single group and the list of pressed values in a multiple one. `size` and `disabled`
reach every toggle that does not set its own.

## Props

See [the type source](../../src/components/ToggleGroup/ToggleGroup.types.ts) and
[implementation](../../src/components/ToggleGroup/ToggleGroup.tsx) for the exact contract. All
props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `label` | `string` | Required | Accessible name of the group |
| `children` | `ReactNode` | Required | The [Toggle](./Toggle.md) elements, each with a `value` |
| `type` | `"single" \| "multiple"` | `"single"` | One pressed toggle, or any number; changes the type of `value` |
| `value` | `string \| null`, or `readonly string[]` with `"multiple"` | Omitted | Pressed toggles (controlled) |
| `defaultValue` | `string \| null`, or `readonly string[]` with `"multiple"` | None pressed | Initial pressed toggles (uncontrolled) |
| `onChange` | `(value: string) => void`, or `(value: string[]) => void` with `"multiple"` | Omitted | Called with the new pressed value or values |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | Row or column, and which arrows move |
| `size` | `"small" \| "medium" \| "large"` | Omitted | Size of every toggle without its own |
| `disabled` | `boolean` | `false` | Disables every toggle without its own `disabled` |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.toggle-group` |
| Native attributes | `div` attributes and `ref` | Optional | `id`, `aria-labelledby`, `data-*`, `onKeyDown` and the ref land on the group; `role` is the group's |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. The toggles keep their own
hooks.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.toggle-group` | `div`, `role="radiogroup"` or `"group"` | `className` | `style` | `Always` |
| `.toggle` | Each [Toggle](./Toggle.md#anatomy-and-per-part-customization) | `className` on the toggle | `style` on the toggle | Each child |

`[data-orientation]` carries the orientation. Toggles stretch to equal widths; the first and
last follow the group's outer corners, and a divider separates neighbors where the system draws
one. Use the [stylesheet](../../src/components/ToggleGroup/ToggleGroup.styles.css) for the
exact declarations.

### Instance styles and classes

```tsx
<ToggleGroup label="View" className="view-switcher">…</ToggleGroup>
```

```css
.view-switcher {
  width: 100%;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files. ToggleGroup shares the `toggle` recipe with
[Toggle](./Toggle.md#css-token-reference); in Neus, Apple, Material and Neobrutalism it follows
the contained [Tabs](./Tabs.md#css-token-reference), so a segmented control looks the same
in both.

- [toggle baseline recipe](../../src/design-systems/neus/generated/recipes/toggle.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--toggle-group-gap` | Space between toggles | `var(--tabs-contained-gap)` |
| `--toggle-group-padding` | Space inside the group | `var(--tabs-contained-padding)` |
| `--toggle-group-border-width` | Group outline width | `var(--tabs-contained-border-width)` |
| `--toggle-group-border-color` | Group outline color | `var(--tabs-contained-border-color)` |
| `--toggle-group-radius` | Group corners | `var(--tabs-contained-radius)` |
| `--toggle-group-background` | Group fill | `var(--tabs-contained-background)` |
| `--toggle-group-divider-width` | Rule between neighboring toggles | `0px` |
| `--toggle-group-divider-color` | Color of that rule | `transparent` |
| `--toggle-group-item-radius` | Corners of each toggle | `var(--tabs-contained-tab-radius)` |
| `--toggle-group-item-outer-radius` | Outer corners of the first and last toggles | `var(--toggle-group-item-radius)` |
| `--toggle-group-item-border-width` | Border of each toggle | `0px` |
| `--toggle-group-item-background` | Toggle fill at rest | `var(--tabs-contained-tab-background)` |
| `--toggle-group-item-color` | Toggle text at rest | `var(--tabs-contained-color)` |
| `--toggle-group-item-shadow` | Toggle shadow at rest | `none` |
| `--toggle-group-item-hover-background` | Toggle fill under the pointer | `var(--tabs-contained-hover-background)` |
| `--toggle-group-item-hover-color` | Toggle text under the pointer | `var(--tabs-contained-selected-color)` |
| `--toggle-group-item-pressed-background` | Pressed toggle fill | `var(--tabs-contained-selected-background)` |
| `--toggle-group-item-pressed-color` | Pressed toggle text | `var(--tabs-contained-selected-color)` |
| `--toggle-group-item-pressed-border-color` | Pressed toggle border | `var(--toggle-pressed-border-color)` |
| `--toggle-group-item-pressed-shadow` | Pressed toggle shadow | `var(--tabs-contained-selected-shadow)` |

### Shared dependencies and runtime values

The toggles keep their size, type and focus tokens; the group sets their `--toggle-radius`,
`--toggle-border-width`, `--toggle-background`, `--toggle-color`, hover and pressed tokens from
the item tokens above.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --toggle-group-background: transparent;
  --toggle-group-gap: var(--space-2);
  --toggle-group-item-border-width: 1px;
}
```

## Storybook and related guides

The single ToggleGroup story exposes props as controls, with `type` switching between one
choice and several. Related: [Toggle](./Toggle.md), [Tabs](./Tabs.md),
[RadioGroup](./RadioGroup.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
