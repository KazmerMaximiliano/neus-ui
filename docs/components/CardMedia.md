# CardMedia

[Card guide](./Card.md) · [Component catalog](../components.md)

CardMedia renders the selected element directly, without a wrapper.

| Prop | Type | Default |
| --- | --- | --- |
| `component` | React `ElementType` | `"img"` |
| `className` | `string` | omitted |
| `style` | `CSSProperties \| null` | `null` |
| Other props and `ref` | Inferred from `component` | forwarded |

```tsx
import { CardMedia } from "neus-ui";

<CardMedia src="/photo.jpg" alt="A mountain landscape" loading="lazy" />

<CardMedia component="video" controls poster="/preview.jpg">
  <source src="/tour.webm" type="video/webm" />
  <track kind="captions" src="/tour.vtt" srcLang="en" />
</CardMedia>

<CardMedia component="audio" src="/recording.ogg" controls />

<CardMedia component="iframe" src="/embed" title="Tour player" />

<CardMedia component={CustomPlayer} playbackId="tour" />
```

Custom players must accept/forward `className` and `style` for styling and a
`ref` if they support one. Their required props remain required.
Native events, accessibility attributes, media controls and refs preserve the
chosen element's types. Void elements such as `img` cannot have children.

Images and videos use `height: auto`, `object-fit: cover` and full available
width. Use `style={{ height: 240, objectFit: "contain" }}` to define a media frame,
or `aspectRatio` for a fixed proportion. Other elements retain their native
height behavior. Supply the appropriate native attributes for responsive images,
embedded frames and accessibility. There is no format detection, automatic
playback, loading UI or error fallback.
