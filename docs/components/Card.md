# Card

[Component catalog](../components.md) · [Design systems](../design-systems.md)

Card is a passive surface composed with optional sections. Import all components
and their prop types from `neus-ui`:

```tsx
import {
  Button, Card, CardHeader, CardMedia, CardContent, CardFooter,
  type CardProps, type CardMediaProps,
} from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const Product = () => (
  <Card className="product-card" style={null}>
    <CardHeader><h2>Mountain retreat</h2></CardHeader>
    <CardMedia src="/mountains.jpg" alt="Mountains at sunrise" />
    <CardContent><p>A quiet place to discover.</p></CardContent>
    <CardFooter>
      <Button label="Explore" />
      <a href="/saved">Saved places</a>
    </CardFooter>
  </Card>
);
```

## Props and composition

| Component | Element | Component-specific props |
| --- | --- | --- |
| Card | `div` | `children?: ReactNode` |
| [CardHeader](./CardHeader.md) | `div` | `children?: ReactNode` |
| [CardMedia](./CardMedia.md) | `img` by default | `component?: ElementType`; inferred native/custom props and ref |
| [CardContent](./CardContent.md) | `div` | `children?: ReactNode` |
| [CardFooter](./CardFooter.md) | `div` | `children?: ReactNode` |

All five accept `className?: string` and `style?: CSSProperties | null`.
Styles default to `null`; omitted/null styles leave CSS tokens in control.
Classes are appended to the element's base class. A style object affects only
that element, while inherited CSS properties such as color follow normal CSS
inheritance. Returning to `null` removes prior inline overrides.

Native DOM attributes, accessibility attributes, data attributes and correctly
typed refs are forwarded. Card excludes the native names `title`, `color` and
`onClick`; compose headings and actions in its children. Media retains its own native
attributes, such as iframe `title` and video `onPlay`.

Sections are independent and optional. Card renders its children directly,
without inserting sections, validating their order or requiring context:

```tsx
<Card><p className="custom-content">Entirely custom content</p></Card>

<Card>
  <CardContent>Only a content section</CardContent>
</Card>
```

Card has no padding or gap. Header and Content have 16px padding; Footer has 8px
padding and an 8px gap. Header aligns children horizontally with space between
them. Footer wraps its children when space runs out. Media reaches the inside
edge of the card border; images and video keep their natural proportions.
Card clips overflowing content to its rounded corners. Typography and heading
semantics belong to the children.

## Media and actions

```tsx
<Card>
  <CardMedia component="video" controls poster="/preview.jpg">
    <source src="/tour.webm" type="video/webm" />
    <track kind="captions" src="/tour.vtt" srcLang="en" label="English" />
    Your browser does not support video.
  </CardMedia>
  <CardFooter>
    <button type="button" onClick={save} disabled={saving}>Save</button>
    <a href="/tour">Tour details</a>
  </CardFooter>
</Card>
```

Card adds no click handler, tab stop, selected/disabled behavior or hover motion.
Use native links/buttons or library controls for actions. Provide image `alt`,
iframe `title`, and captions for video as appropriate.

## Themes and overrides

Use `ThemeProvider` to select Neus, Apple, Carbon, Material, Neobrutalism or Vercel.
There is no `designSystem` prop on Card. The same components work in light and
dark modes, nested scopes, and runtime theme changes.

Neus uses a themed surface, 1px border, 16px default radius and header
divider. Other systems adapt their geometry through scoped tokens; they do not
change the component structure. Spacing follows the
[Material Cards content-block guidance](https://m1.material.io/components/cards.html).
These are project adaptations, not complete implementations of external libraries.

For reusable overrides, use CSS classes:

```css
.product-card {
  --card-background: var(--color-surface-secondary);
  --card-radius: 24px;
  --card-content-padding: 24px;
}
```

For one instance, use `style={{ borderRadius: 24 }}`. Section styles are passed
directly to the section, for example `<CardHeader style={{ gap: 16 }}>`.

Public tokens: `--card-radius`, `--card-background`, `--card-color`,
`--card-font-family`, `--card-border-width`, `--card-border-color`,
`--card-shadow`, `--card-header-padding`, `--card-header-gap`,
`--card-header-border-width`, `--card-header-border-color`,
`--card-content-padding`, `--card-footer-padding`, `--card-footer-gap`,
`--card-media-object-fit` and `--card-media-object-position`.

The base classes are `card`, `card-header`, `card-media`, `card-content` and
`card-footer`. Free-form children provide their own spacing or use CardContent.

## Storybook

Storybook has one story per component. The main Card story demonstrates the
complete composition; section stories expose their own controls. Each has a local
design-system selector and inherits the toolbar's light/dark mode. JSX children
are documented with controls disabled; serializable children and CSS objects can
be edited in their controls. CardMedia provides image, video, audio and iframe
previews without fetching remote demo assets.


## Presentation

| API | Behavior |
| --- | --- |
| `variant` | auto (default), filled, outlined, elevated |

Uses all six recipes through ThemeProvider in light and dark mode. See
[Theming](../theming.md) for provider setup and scoped customization.
