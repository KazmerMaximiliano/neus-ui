# Testimonial

[Section index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

One quote with its author: a figure, inside a list item when it belongs to a TestimonialList.

## Usage

```tsx
<Testimonial
  quote="La abro en el ascensor antes de la daily."
  name="Lucía Ferreyra"
  role="Diseñadora de producto"
  avatar={<Avatar name="Lucía Ferreyra" alt="" />}
/>
```

## Behavior and accessibility

The quote is a `figure`: the words in a `blockquote` wrapped in `q`, which adds the quotation
marks of the document's language (pass the words without marks), and the author in a
`figcaption`. Inside a [TestimonialList](./TestimonialList.md) the root is a list item and the
list's variant applies; alone, `variant` decides (`card` by default). Give the avatar `alt=""`:
the name is written beside it. Mark example quotes `SAMPLE:` in the code.

## Props

See [the type source](../../src/sections/TestimonialList/components/Testimonial/Testimonial.types.ts) and
[implementation](../../src/sections/TestimonialList/components/Testimonial/Testimonial.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `quote` | `ReactNode` | Required | The words, without quotation marks |
| `name` | `ReactNode` | Required | Author |
| `role` | `ReactNode` | Omitted | Role, company or relation |
| `avatar` | `ReactNode` | Omitted | An Avatar with `alt=""` |
| `variant` | `"plain" \| "card" \| "featured"` | `"card"`; the list's inside one | Layout outside a list |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.testimonial` |
| `quoteClassName`, `quoteStyle` | `string`, `CSSProperties` | Omitted | `.testimonial__quote` |
| `captionClassName`, `captionStyle` | `string`, `CSSProperties` | Omitted | `.testimonial__caption` |
| `nameClassName`, `nameStyle` | `string`, `CSSProperties` | Omitted | `.testimonial__name` |
| `roleClassName`, `roleStyle` | `string`, `CSSProperties` | Omitted | `.testimonial__role` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.testimonial` | `li` or `div`; Card in card | `className` | `style` | `Always` |
| `.testimonial__figure` | `figure` | None | None | `Always` |
| `.testimonial__quote` | `blockquote` | `quoteClassName` | `quoteStyle` | `Always` |
| `.testimonial__caption` | `figcaption` | `captionClassName` | `captionStyle` | `Always` |
| `.testimonial__name` | `span` | `nameClassName` | `nameStyle` | `Always` |
| `.testimonial__role` | `span` | `roleClassName` | `roleStyle` | `role` given |

State/variant selectors: `.testimonial[data-variant-item]`.

## CSS token reference

Testimonial reads the `--testimonial-*` tokens listed in
[TestimonialList](./TestimonialList.md#css-token-reference) and `--card-content-padding`.

## Storybook and related guides

The single Testimonial story exposes props as controls. Owning family: [TestimonialList](./TestimonialList.md).

[Components](../components/README.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
