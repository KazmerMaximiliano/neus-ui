# Tabs

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Views of the same subject, one at a time, switched from a row of tabs.

## Usage

```tsx
import { Tabs, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => (
  <ThemeProvider designSystem="neus">
    <Tabs
      label="Project settings"
      items={[
        { value: "general", label: "General", content: <GeneralSettings /> },
        { value: "members", label: "Members", content: <MemberList /> },
        { value: "billing", label: "Billing", content: <Billing />, disabled: true },
      ]}
    />
  </ThemeProvider>
);
```

Use tabs for parallel views of one thing, such as the settings of a project, that people do not
need to compare side by side. Steps that follow an order belong in a [Stepper](./Stepper.md),
moving between pages in a [Sidebar](./Sidebar.md) or links, and a choice that changes a value
in a [RadioGroup](./RadioGroup.md). Keep labels to one or two words.

`line` (the default) draws the tabs over a divider with an indicator under the selected one;
`contained` puts them in a shared container, a segmented control, where the selected one is a
raised surface. Use `contained` for a few short views inside a card or a toolbar.

## Behavior and accessibility

Tabs follows the WAI-ARIA tabs pattern with automatic activation. The row is a `tablist` named
by `label`; each tab is a `button` with `role="tab"`, `aria-selected` and `aria-controls`
pointing at its `tabpanel`, which is named by the tab. Only the selected tab is in the Tab
sequence: Tab reaches it, ArrowRight and ArrowLeft move to the next or previous enabled tab and
select it, wrapping at both ends, and Home and End go to the first and last. In right-to-left
text the arrows follow the reading direction. Tab from the list moves into the panel, which can
take focus so its content can be scrolled or read.

Every panel is rendered, so the content of each one is in the server HTML and keeps its state
while hidden; the ones not selected carry `hidden`. Disabled tabs are skipped and cannot be
clicked. Without `value` or `defaultValue`, or when they name a disabled or missing tab, the
first enabled tab is selected. Tabs that do not fit scroll sideways inside the list.

## Props

See [the type source](../../src/components/Tabs/Tabs.types.ts) and
[implementation](../../src/components/Tabs/Tabs.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `items` | `readonly TabsItem[]` | Required | Tabs and their panels, in order |
| `value` | `string` | Omitted | The selected tab (controlled) |
| `defaultValue` | `string` | First enabled tab | The tab selected first (uncontrolled) |
| `onChange` | `(value: string) => void` | Omitted | Called with the value of the tab chosen |
| `label` | `string` | Omitted | Accessible name of the tab list |
| `variant` | `"line" \| "contained"` | `"line"` | Tabs over a divider, or inside a container |
| `className`, `style` | `string`, `CSSProperties` | Omitted | Root `.tabs` |
| `listClassName`, `listStyle` | `string`, `CSSProperties` | Omitted | `.tabs__list` |
| `tabClassName`, `tabStyle` | `string`, `CSSProperties` | Omitted | Each `.tabs__tab` |
| `panelClassName`, `panelStyle` | `string`, `CSSProperties` | Omitted | Each `.tabs__panel` |
| Native `div` props | `ComponentPropsWithRef<"div">` | Optional | `id`, `data-*`, `ref` and other attributes on the root, except `children`, `onChange` and `defaultValue` |

### Supporting types

```ts
type TabsItem = {
  readonly value: string;
  readonly label: ReactNode;
  readonly content: ReactNode;
  readonly disabled?: boolean;
};
```

A `label` can hold an icon before the text; the tab lays them out with `--tabs-icon-gap`.

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render removes
that override.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.tabs`, `.tabs--line` or `.tabs--contained` | `div` | `className` | `style` | `Always` |
| `.tabs__list` | `div` with `role="tablist"` | `listClassName` | `listStyle` | `Always` |
| `.tabs__tab` | `button` with `role="tab"` | `tabClassName` | `tabStyle` | One per item |
| `.tabs__panel` | `div` with `role="tabpanel"` | `panelClassName` | `panelStyle` | One per item; `hidden` unless selected |

State selectors: `[aria-selected="true"]` on the selected tab, `:disabled` on disabled tabs.
The line indicator is each tab's `::after`, filled on hover and when selected. Use the
[stylesheet](../../src/components/Tabs/Tabs.styles.css) for the exact declarations.

### Instance styles and classes

```tsx
<Tabs className="wide-tabs" items={items} label="Report" />
```

```css
.wide-tabs {
  --tabs-min-width: 120px;
  --tabs-indicator-height: 4px;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [tabs baseline recipe](../../src/design-systems/neus/generated/recipes/tabs.css)

### Tabs

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--tabs-font-family` | Font | `var(--font-body)` |
| `--tabs-font-size` | Label size | `var(--fs-sm)` |
| `--tabs-font-weight` | Label weight | `600` |
| `--tabs-selected-font-weight` | Selected label weight | `600` |
| `--tabs-line-height` | Label line height | `1.4` |
| `--tabs-letter-spacing` | Label tracking | `normal` |
| `--tabs-height` | Tab height in the line variant | `44px` |
| `--tabs-min-width` | Narrowest a tab gets | `0px` |
| `--tabs-padding` | Space inside a tab | `0 16px` |
| `--tabs-gap` | Space between line tabs | `0px` |
| `--tabs-icon-gap` | Space between an icon and the text | `8px` |
| `--tabs-radius` | Corners of a line tab | `var(--radius-sm) var(--radius-sm) 0 0` |
| `--tabs-background` | Line tab fill | `transparent` |
| `--tabs-color` | Label color | `var(--color-text-secondary)` |
| `--tabs-hover-color` | Label color on hover | `var(--color-text-primary)` |
| `--tabs-hover-background` | Line tab fill on hover | `var(--color-surface-hover)` |
| `--tabs-selected-color` | Selected line tab label | `var(--color-primary-text)` |
| `--tabs-disabled-color` | Disabled label | `var(--color-text-disabled)` |
| `--tabs-focus-width`, `--tabs-focus-color` | Focus outline, drawn inside the tab | `2px`, `var(--color-focus)` |
| `--tabs-focus-offset` | Panel focus outline offset | `2px` |
| `--tabs-transition` | Color and fill changes | `color 0.2s ease, background-color 0.2s ease` |

### Line variant

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--tabs-divider-width`, `--tabs-divider-color` | Line under the list | `1px`, `var(--color-border-subtle)` |
| `--tabs-indicator-height` | Thickness of the selected tab's indicator | `3px` |
| `--tabs-indicator-inset` | Space between the indicator and the tab's sides | `0px` |
| `--tabs-indicator-radius` | Indicator corners | `3px 3px 0 0` |
| `--tabs-indicator-color` | Indicator color | `var(--color-primary)` |
| `--tabs-hover-indicator-color` | Indicator under a hovered tab that is not selected | `transparent` |

### Contained variant

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--tabs-contained-height` | Tab height | `36px` |
| `--tabs-contained-gap` | Space between tabs | `4px` |
| `--tabs-contained-padding` | Space inside the container | `4px` |
| `--tabs-contained-border-width`, `--tabs-contained-border-color` | Container outline | `0px`, `transparent` |
| `--tabs-contained-radius` | Container corners | `var(--radius-default)` |
| `--tabs-contained-background` | Container fill | `var(--color-surface-secondary)` |
| `--tabs-contained-tab-radius` | Tab corners | `var(--radius-sm)` |
| `--tabs-contained-tab-padding` | Space inside a tab | `var(--tabs-padding)` |
| `--tabs-contained-font-size` | Label size | `var(--tabs-font-size)` |
| `--tabs-contained-tab-background` | Tab fill | `transparent` |
| `--tabs-contained-color` | Label color | `var(--color-text-secondary)` |
| `--tabs-contained-hover-background` | Tab fill on hover | `color-mix(in srgb, var(--color-text-primary) 6%, transparent)` |
| `--tabs-contained-selected-background` | Selected tab fill | `var(--color-surface)` |
| `--tabs-contained-selected-color` | Selected tab label | `var(--color-text-primary)` |
| `--tabs-contained-selected-shadow` | Lift or indicator of the selected tab | `0 1px 3px rgb(15 23 42 / 0.12)` |

### Panel

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--tabs-panel-gap` | Space between the list and the panel | `16px` |

### Shared dependencies and runtime values

`--color-text-primary`, `--color-text-secondary`, `--color-text-disabled`,
`--color-primary`, `--color-primary-text`, `--color-surface`, `--color-surface-secondary`,
`--color-surface-hover`, `--color-border-subtle`, `--color-focus`, `--radius-sm`,
`--radius-default`, `--font-body` and `--fs-sm`. Tabs has no runtime values.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --tabs-indicator-color: var(--color-success);
  --tabs-selected-color: var(--color-success-text);
}
```

## Storybook and related guides

The single Tabs story exposes props as controls with four project settings views. Related:
[Stepper](./Stepper.md), [Sidebar](./Sidebar.md), [RadioGroup](./RadioGroup.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
