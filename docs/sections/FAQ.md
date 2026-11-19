# FAQ

[Section index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

Questions and answers of a public page, each answer behind its question.

## Usage

```tsx
import { Section } from "neus-ui";
import { FAQ, SectionHeader } from "neus-ui/sections";

export const Questions = () => (
  <Section aria-labelledby="faq-title">
    <SectionHeader titleId="faq-title" title="Before your first visit" />
    <FAQ
      items={[
        { question: "Do I need an appointment?", answer: "For check-ups, yes. Emergencies are seen at any time." },
        { question: "Which pets do you treat?", answer: "Dogs, cats, rabbits and small rodents." },
      ]}
    />
  </Section>
);
```

Answer what people ask before they act: prices, times, what to bring, what happens next. Keep
each answer to a few sentences, and put answers everyone needs on the page itself.

## Behavior and accessibility

FAQ is an [Accordion](../components/Accordion.md): each question is a native `summary` over
its answer in a `details`, so it opens with a click, Enter or Space, renders on the server and
works without JavaScript, and find-in-page opens the answer it matches. Each question is a
heading (`questionAs`, `h3` by default, one level below the SectionHeader title), so the
questions appear in the page outline. With `single`, opening a question closes the open one,
also without JavaScript. `variant="list"` sets the questions over the system's dividers;
`variant="cards"` makes each one a card of the system with the card's fill, outline,
corners, shadow and inset. The list stops at `--faq-max-width` so answers keep a readable
measure.

## Props

See [the type source](../../src/sections/FAQ/FAQ.types.ts) and
[implementation](../../src/sections/FAQ/FAQ.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `items` | `readonly FAQItem[]` | Required | Questions and answers in order |
| `variant` | `"list" \| "cards"` | `"list"` | Questions over dividers, or each a card |
| `single` | `boolean` | `false` | One answer open at a time |
| `questionAs` | `"h2" \| "h3" \| "h4" \| "h5" \| "h6"` | `"h3"` | Heading level of each question |
| `className`, `style` | `string`, `CSSProperties` | Omitted | Root `.accordion.faq` |
| `itemClassName`, `itemStyle` | `string`, `CSSProperties` | Omitted | Each `details.faq__item` |
| `questionClassName`, `questionStyle` | `string`, `CSSProperties` | Omitted | Each `summary.faq__question` |
| `answerClassName`, `answerStyle` | `string`, `CSSProperties` | Omitted | Each `.faq__answer` |
| Native attributes and ref | React props for a `div` | Optional | Forwarded to the root, except `defaultValue` and `onChange` |

### Supporting types

```ts
type FAQItem = {
  readonly question: ReactNode;
  readonly answer: ReactNode;
};
```

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements; repeated parts receive the same override. The parts also carry the Accordion's
classes.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.accordion.faq` | `div` | `className` | `style` | `Always` |
| `.accordion__item.faq__item` | `details` | `itemClassName` | `itemStyle` | One per question |
| `.accordion__header.faq__question` | `summary` with the heading inside | `questionClassName` | `questionStyle` | One per question |
| `.accordion__content.faq__answer` | `div` | `answerClassName` | `answerStyle` | One per question; shown while open |

State/variant selectors: `.faq[data-variant]`, `[open]` on an open item.

## CSS token reference

All six systems supply the `sections` recipe in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files.

- [sections baseline recipe](../../src/design-systems/neus/generated/recipes/sections.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--faq-max-width` | Widest the list grows | `48rem` |
| `--faq-cards-gap` | Space between cards | `var(--space-3)` |

The questions and answers follow the [accordion](../components/Accordion.md#css-token-reference)
recipe; the cards variant reads `--card-background`, `--card-border-width`,
`--card-border-color`, `--card-radius`, `--card-shadow` and `--card-content-padding` from the
[Card](../components/Card.md) recipe.

## Storybook and related guides

The single FAQ story exposes props as controls with three questions. Related:
[Accordion](../components/Accordion.md), [SectionHeader](./SectionHeader.md).

[Components](../components/README.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
