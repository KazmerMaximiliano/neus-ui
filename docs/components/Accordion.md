# Accordion

[Component index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Sections of content that open and close under their titles, one at a time or any number.

## Usage

```tsx
import { Accordion, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Example = () => (
  <ThemeProvider designSystem="neus">
    <Accordion
      type="single"
      defaultValue={["shipping"]}
      items={[
        { value: "shipping", title: "Shipping", content: "Orders leave within two business days." },
        { value: "returns", title: "Returns", content: "Send anything back within 30 days." },
        { value: "warranty", title: "Warranty", content: "Two years on every device." },
      ]}
    />
  </ThemeProvider>
);
```

Use an accordion when a page holds several blocks of related content that people read one at
a time, such as settings groups or the details of a product, and the titles alone help them
find the block they need. Content everyone must read stays visible. On public pages,
questions and answers are a [FAQ](../sections/FAQ.md), which renders this accordion.

## Behavior and accessibility

Each item is a native `details` element with its title in a `summary`, so it opens with a
click, Enter or Space, works before hydration and without JavaScript, and the browser opens an
item by itself to show a find-in-page match. With `type="single"` the items share a `name`,
and the browser keeps one open even without JavaScript; opening another closes it. With
`multiple` (the default) items open independently.

`value` and `defaultValue` list the open items; `onChange` receives the new list. A disabled
item keeps its state, open or closed, carries `aria-disabled` and ignores clicks. `titleAs`
wraps each title in a heading of that level, so the titles appear in the page outline and in
screen readers' heading lists; without it the title is plain text inside the summary. The
chevron is decorative and turns when the item opens; under reduced motion it turns at once.

## Props

See [the type source](../../src/components/Accordion/Accordion.types.ts) and
[implementation](../../src/components/Accordion/Accordion.tsx) for the exact contract. All
props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `items` | `readonly AccordionItem[]` | Required | Items in order |
| `type` | `"single" \| "multiple"` | `"multiple"` | One open item at a time, or any number |
| `value` | `readonly string[]` | Omitted | The open items (controlled) |
| `defaultValue` | `readonly string[]` | `[]` | The items open first (uncontrolled) |
| `onChange` | `(value: string[]) => void` | Omitted | Called with the open items |
| `titleAs` | `"h2" \| "h3" \| "h4" \| "h5" \| "h6"` | Omitted | Heading level that wraps each title |
| `className`, `style` | `string`, `CSSProperties` | Omitted | Root `.accordion` |
| `itemClassName`, `itemStyle` | `string`, `CSSProperties` | Omitted | Each `details.accordion__item` |
| `headerClassName`, `headerStyle` | `string`, `CSSProperties` | Omitted | Each `summary.accordion__header` |
| `contentClassName`, `contentStyle` | `string`, `CSSProperties` | Omitted | Each `.accordion__content` |
| Native `div` props | `ComponentPropsWithRef<"div">` | Optional | `id`, `data-*`, `ref` and other attributes on the root, except `children`, `onChange` and `defaultValue` |

### Supporting types

```ts
type AccordionItem = {
  readonly value: string;
  readonly title: ReactNode;
  readonly content: ReactNode;
  readonly disabled?: boolean;
};
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Omitting a hook on a later render removes
that override.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.accordion` | `div` | `className` | `style` | `Always` |
| `.accordion__item` | `details` | `itemClassName` | `itemStyle` | One per item |
| `.accordion__header` | `summary` | `headerClassName` | `headerStyle` | One per item |
| `.accordion__title` | `span`, or the `titleAs` heading | None | None | One per item |
| `.accordion__icon` | `svg`, decorative | None | None | One per item |
| `.accordion__content` | `div` | `contentClassName` | `contentStyle` | One per item; shown while open |

State selectors: `[open]` on an open item, `[aria-disabled="true"]` on a disabled header. Use
the [stylesheet](../../src/components/Accordion/Accordion.styles.css) for the exact
declarations.

### Instance styles and classes

```tsx
<Accordion className="spec-sheet" items={items} titleAs="h3" />
```

```css
.spec-sheet {
  --accordion-title-size: var(--fs-lg);
  --accordion-icon-rotation: 90deg;
}
```

Style props win over ordinary stylesheet declarations for the same property. Custom
properties still follow CSS inheritance, scope resets and specificity; see [the cascade
guide](../design/customization.md).

## CSS token reference

All six systems supply scoped recipes in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Runtime CSS expressions remain live
dependencies. Do not edit generated files.

- [accordion baseline recipe](../../src/design-systems/neus/generated/recipes/accordion.css)

### Items

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--accordion-font-family` | Font | `var(--font-body)` |
| `--accordion-gap` | Space between items; above `0px` with an item border, items read as cards | `0px` |
| `--accordion-divider-width`, `--accordion-divider-color` | Rule above each item and under the last | `1px`, `var(--color-border-subtle)` |
| `--accordion-item-background` | Item fill | `transparent` |
| `--accordion-item-border-width`, `--accordion-item-border-color` | Item outline on the other sides | `0px`, `transparent` |
| `--accordion-item-radius` | Item corners | `0px` |
| `--accordion-item-shadow` | Item shadow | `none` |

### Header and title

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--accordion-header-min-height` | Smallest header height | `56px` |
| `--accordion-header-padding` | Space inside the header | `12px 8px` |
| `--accordion-header-gap` | Space between the title and the chevron | `16px` |
| `--accordion-header-radius` | Header corners, for its fill | `var(--accordion-item-radius)` |
| `--accordion-header-background` | Header fill | `transparent` |
| `--accordion-header-hover-background` | Header fill on hover | `var(--color-surface-hover)` |
| `--accordion-title-color` | Title color | `var(--color-text-primary)` |
| `--accordion-title-size`, `--accordion-title-weight` | Title size and weight | `var(--fs-base)`, `600` |
| `--accordion-title-line-height`, `--accordion-title-letter-spacing` | Title line height and tracking | `1.4`, `normal` |
| `--accordion-icon-size`, `--accordion-icon-color` | Chevron size and color | `20px`, `var(--color-text-secondary)` |
| `--accordion-icon-rotation` | Chevron turn when open | `180deg` |
| `--accordion-icon-duration` | Chevron turn duration | `0.2s` |
| `--accordion-disabled-color` | Disabled title and chevron | `var(--color-text-disabled)` |
| `--accordion-focus-width`, `--accordion-focus-color`, `--accordion-focus-offset` | Focus outline | `2px`, `var(--color-focus)`, `-2px` |
| `--accordion-transition` | Header fill change | `background-color 0.2s ease` |

### Content

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--accordion-content-padding` | Space around the content | `0 8px 20px` |
| `--accordion-content-divider-width` | Rule between an open header and its content, in the divider color | `0px` |
| `--accordion-content-color` | Content color | `var(--color-text-secondary)` |
| `--accordion-content-size`, `--accordion-content-line-height` | Content size and line height | `var(--fs-base)`, `1.6` |

### Shared dependencies and runtime values

`--color-text-primary`, `--color-text-secondary`, `--color-text-disabled`,
`--color-border-subtle`, `--color-surface-hover`, `--color-focus`, `--font-body` and
`--fs-base`. Accordion has no runtime values.

### Scoped recipe override

```css
/* Import after neus-ui/dist/neus-ui.css. */
[data-design-system].example-scope {
  --accordion-divider-color: var(--color-border-input);
  --accordion-title-weight: 500;
}
```

## Storybook and related guides

The single Accordion story exposes props as controls with four items, one disabled. Related:
[FAQ](../sections/FAQ.md), [Tabs](./Tabs.md), [Sidebar](./Sidebar.md).

[ThemeProvider](../design/theme-provider.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
