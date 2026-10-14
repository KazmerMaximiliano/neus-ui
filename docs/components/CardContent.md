# CardContent

[Card guide](./Card.md) · [Component catalog](../components.md)

CardContent renders a `div` containing arbitrary children. It can be used on its
own or anywhere inside Card.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | omitted |
| `className` | `string` | omitted |
| `style` | `CSSProperties \| null` | `null` |
| Native div attributes and `ref` | React div props | forwarded |

```tsx
import { CardContent } from "neus-ui";

<CardContent className="custom-content" style={null}>
  <p>A quiet place to discover.</p>
</CardContent>
```

Content uses normal document flow with 16px padding. It does not generate titles,
descriptions, icons or additional wrappers.
Typography and semantics belong to the children. See the Card guide for themes,
CSS tokens, style precedence and migration.
