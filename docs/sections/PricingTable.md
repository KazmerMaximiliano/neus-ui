# PricingTable

[Section index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

The plans of a product side by side, as a list of PricingCards whose actions line up.

## Usage

```tsx
import { Button, Section } from "neus-ui";
import { PricingCard, PricingTable, SectionHeader } from "neus-ui/sections";

export const Plans = () => (
  <Section aria-labelledby="plans-title">
    <SectionHeader titleId="plans-title" title="One price per seat" />
    <PricingTable>
      <PricingCard name="Hobby" price="Free" features={["Three projects"]}
        action={<Button label="Start" variant="outlined" fullWidth />} />
      <PricingCard name="Team" price="$24" period="per seat, per month" featured badge="Most popular"
        features={["Unlimited projects", "Preview deployments"]} action={<Button label="Start a trial" fullWidth />} />
      <PricingCard name="Enterprise" price="Custom" features={["Single sign-on", "Audit logs"]}
        action={<Button label="Talk to sales" variant="outlined" fullWidth />} />
    </PricingTable>
  </Section>
);
```

Two to four plans compare best. Put the recommended plan in the middle with `featured` and a
`badge`, give it the one solid action and the others outlined actions, and keep the features
of every plan in the same order so they can be compared line by line.

## Behavior and accessibility

PricingTable is a `ul` ([Grid](../components/Grid.md)) whose [PricingCard](./PricingCard.md)
children become list items through context; a PricingCard's own props always apply. The cards
stretch to the tallest one in their row and their actions sit at the bottom, so they line up.
`columns` defaults to 1, 2 from 768px and 3 from 1024px; set `{ base: 1, md: 2, lg: 4 }` for
four plans. Name the list with the section's heading through `aria-labelledby`, or with
`aria-label`.

## Props

See [the type source](../../src/sections/PricingTable/PricingTable.types.ts) and
[implementation](../../src/sections/PricingTable/PricingTable.tsx) for the exact contract.
All props are optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `children` | `ReactNode` | Required | PricingCard elements, one per plan |
| `columns` | `Responsive<number>` | `{ base: 1, md: 2, lg: 3 }` | Columns |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.grid.pricing-table` |
| Native attributes and ref | React props for a `ul` | Optional | Forwarded to the list |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.grid.pricing-table` | Grid `ul` | `className` | `style` | `Always` |

## CSS token reference

PricingTable has no tokens of its own: the grid uses the space scale and each plan the
[PricingCard](./PricingCard.md#css-token-reference) tokens of the `sections` recipe.

## Storybook and related guides

The single PricingTable story exposes props as controls with three plans, the middle one
featured. Public section: [PricingCard](./PricingCard.md).

[Components](../components/README.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
