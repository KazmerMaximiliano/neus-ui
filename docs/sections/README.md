# Sections

[Documentation](../README.md) · [Components](../components/README.md) ·
[Customization](../design/customization.md)

The `neus-ui/sections` entry exports 9 composed regions of public pages, built from the
components and styled by each system's `sections` recipe. Import them by name:

```tsx
import { Hero, SiteHeader } from "neus-ui/sections";
```

Their styles ship in `neus-ui/dist/neus-ui.css`; there is nothing else to import. Every
section renders on the server, and the SiteHeader phone menu uses the native Popover API, so
it works without JavaScript and inside Astro islands.

| Section | Purpose |
| --- | --- |
| [SiteHeader](./SiteHeader.md) | Top bar with brand, navigation, actions, skip link and a native phone menu. |
| [Hero](./Hero.md) | Opening section with display headline, lead, actions, note and a split, centered or media-first anchor. |
| [SectionHeader](./SectionHeader.md) | Eyebrow, title, description and side action that open a section. |
| [FeatureList](./FeatureList.md) | Features or services as plain blocks, rows or cards. |
| [FeatureItem](./FeatureItem.md) | One feature with icon tile, title, text and link. |
| [TestimonialList](./TestimonialList.md) | Quotes as running text, cards or one featured quote. |
| [Testimonial](./Testimonial.md) | One quote in a figure with its author and avatar. |
| [CallToAction](./CallToAction.md) | Closing band with the claim, the action and an optional form beside it. |
| [SiteFooter](./SiteFooter.md) | Brand, columns of links and the legal line. |

The variant names match the composition decks the neus-design skill deals: hero `split`,
`centered` and `media-first`; features `grid`, `list` and `cards`; testimonials `plain`,
`card` and `featured`; call to action `band` and `split`.
