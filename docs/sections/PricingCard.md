# PricingCard

[Section index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

One plan: its name, price, what it includes and the action that starts it.

## Usage

```tsx
import { Button } from "neus-ui";
import { PricingCard } from "neus-ui/sections";

export const TeamPlan = () => (
  <PricingCard
    name="Team"
    price="$24"
    period="per seat, per month"
    description="For teams that ship every week."
    features={["Unlimited projects", "Preview deployments", "Email support within a day"]}
    action={<Button label="Start a trial" fullWidth />}
    featured
    badge="Most popular"
  />
);
```

A single plan can stand alone, for example beside the argument of a page. Several plans go in
a [PricingTable](./PricingTable.md). Write the price as people read it in the page's locale
("$24", "24 €", "Free"); take prices, periods and trials only from the brief.

## Behavior and accessibility

PricingCard is a [Card](../components/Card.md): a `div` alone, a list item inside a
PricingTable. The name is a heading (`nameAs`, `h3` by default) followed by the `badge`, a
[Badge](../components/Badge.md), so screen readers read "Team, Most popular". The price and
period are one line of text; the features are a list whose check marks are decorative; the
action sits in the footer at the bottom, so the actions of a row of plans line up. `featured`
draws the system's featured outline and shadow; give the featured plan a `badge` too, so it is
not set apart by color alone.

## Props

See [the type source](../../src/sections/PricingCard/PricingCard.types.ts) and
[implementation](../../src/sections/PricingCard/PricingCard.tsx) for the exact contract. All
props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `name` | `string` | Required | Name of the plan, as a heading |
| `price` | `string` | Required | The price, formatted in the page's locale |
| `period` | `string` | Omitted | What the price covers, such as "per month" |
| `description` | `ReactNode` | Omitted | Who the plan is for |
| `features` | `readonly ReactNode[]` | `[]` | What the plan includes, one short line each |
| `action` | `ReactNode` | Omitted | The plan's call to action, usually a `fullWidth` Button |
| `featured` | `boolean` | `false` | Sets the recommended plan apart |
| `badge` | `string` | Omitted | A short tag beside the name |
| `nameAs` | `"h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h3"` | Heading level of the name |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.card.pricing-card` |
| `headerClassName`, `headerStyle` | `string`, `CSSProperties` | Omitted | `.pricing-card__header` |
| `nameClassName`, `nameStyle` | `string`, `CSSProperties` | Omitted | `.pricing-card__name` |
| `priceClassName`, `priceStyle` | `string`, `CSSProperties` | Omitted | `.pricing-card__price` |
| `descriptionClassName`, `descriptionStyle` | `string`, `CSSProperties` | Omitted | `.pricing-card__description` |
| `featuresClassName`, `featuresStyle` | `string`, `CSSProperties` | Omitted | `.pricing-card__features` |
| `featureClassName`, `featureStyle` | `string`, `CSSProperties` | Omitted | Each `.pricing-card__feature` |
| `actionClassName`, `actionStyle` | `string`, `CSSProperties` | Omitted | `.pricing-card__action` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. Hooks do not create a part whose
rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.card.pricing-card` | `div`, or `li` in a PricingTable | `className` | `style` | `Always` |
| `.card-header.pricing-card__header` | `div` | `headerClassName` | `headerStyle` | `Always` |
| `.pricing-card__name` | Heading (`nameAs`) | `nameClassName` | `nameStyle` | `Always` |
| `.pricing-card__badge` | Badge | None | None | `badge` given |
| `.pricing-card__price` | `p` with `.pricing-card__amount` and `.pricing-card__period` | `priceClassName` | `priceStyle` | `Always` |
| `.pricing-card__description` | Text `p` | `descriptionClassName` | `descriptionStyle` | `description` given |
| `.pricing-card__features` | `ul` inside `.card-content` | `featuresClassName` | `featuresStyle` | `features` not empty |
| `.pricing-card__feature` | `li` with a decorative `.pricing-card__check` | `featureClassName` | `featureStyle` | One per feature |
| `.card-footer.pricing-card__action` | `div` | `actionClassName` | `actionStyle` | `action` given |

State selector: `.pricing-card[data-featured]`.

## CSS token reference

All six systems supply the `sections` recipe in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files.

- [sections baseline recipe](../../src/design-systems/neus/generated/recipes/sections.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--pricing-header-gap` | Space between name, price and description | `var(--space-3)` |
| `--pricing-price-font-family` | Price font | `var(--font-display)` |
| `--pricing-price-size`, `--pricing-price-weight` | Price size and weight | `var(--fs-3xl)`, `700` |
| `--pricing-price-tracking` | Price tracking | `-0.02em` |
| `--pricing-period-font-family` | Period font | `inherit` |
| `--pricing-period-color`, `--pricing-period-size` | Period color and size | `var(--color-text-secondary)`, `var(--fs-sm)` |
| `--pricing-feature-size`, `--pricing-feature-gap` | Feature text size and spacing | `var(--fs-base)`, `var(--space-3)` |
| `--pricing-check-size`, `--pricing-check-color` | Check mark size and color | `18px`, `var(--color-primary-text)` |
| `--pricing-featured-border-color` | Featured outline color | `var(--color-primary)` |
| `--pricing-featured-ring-width` | Ring added outside the border, so the outline thickens without moving the content | `1px` |
| `--pricing-featured-shadow` | Featured shadow; a shadow value, `0 0 #0000` for none | `var(--elevation-floating)` |

The card, header, content and footer follow the [Card](../components/Card.md) recipe; the
badge, the [Badge](../components/Badge.md) recipe.

## Storybook and related guides

The single PricingCard story exposes props as controls with a featured team plan. Related:
[PricingTable](./PricingTable.md), [Card](../components/Card.md).

[Components](../components/README.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
