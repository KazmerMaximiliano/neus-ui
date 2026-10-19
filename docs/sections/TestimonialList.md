# TestimonialList

[Section index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Quotes from customers or users, as running text, cards or one featured quote.

## Usage

```tsx
import { Avatar } from "neus-ui";
import { Testimonial, TestimonialList } from "neus-ui/sections";

// SAMPLE: example reviews; replace with real ones.
const REVIEWS = [{ quote: "Nos atendieron un sábado sin turno.", name: "Graciela P.", role: "Bruno, labrador" }];

export const Reviews = () => (
  <TestimonialList variant="card">
    {REVIEWS.map(({ quote, name, role }) => (
      <Testimonial key={name} quote={quote} name={name} role={role} avatar={<Avatar name={name} alt="" />} />
    ))}
  </TestimonialList>
);
```

## Behavior and accessibility

TestimonialList is a `ul` ([Grid](../components/Grid.md)) of [Testimonial](./Testimonial.md) list
items. `variant` reaches every quote through context: `plain` sets the quotes as running text
with wide gaps, `card` puts each in a Card, `featured` spans the first quote across the row in
the display face and lays the rest out below. `columns` defaults to 1, 2 from 768px and 3 from
1024px.

## Props

See [the type source](../../src/sections/TestimonialList/TestimonialList.types.ts) and
[implementation](../../src/sections/TestimonialList/TestimonialList.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `children` | `ReactNode` | Required | Testimonial elements |
| `variant` | `"plain" \| "card" \| "featured"` | `"card"` | Layout of every quote |
| `columns` | `Responsive<number>` | `{ base: 1, md: 2, lg: 3 }` | Columns |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.testimonial-list` |
| Native attributes and ref | React props for a `ul` | Optional | Forwarded to the list |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.testimonial-list` | Grid `ul` | `className` | `style` | `Always` |

State/variant selectors: `.testimonial-list[data-variant]`.

## CSS token reference

All six systems supply the `sections` recipe in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files.

- [sections baseline recipe](../../src/design-systems/neus/generated/recipes/sections.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--testimonial-quote-size` | testimonial quote size | `var(--fs-lg)` |
| `--testimonial-quote-line-height` | testimonial quote line height | `1.55` |
| `--testimonial-featured-quote-size` | testimonial featured quote size | `var(--heading-md-size)` |
| `--testimonial-name-weight` | testimonial name weight | `600` |
| `--testimonial-gap` | testimonial gap | `var(--space-4)` |

## Storybook and related guides

The single TestimonialList story exposes props as controls. Public section: [Testimonial](./Testimonial.md).

[Components](../components/README.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
