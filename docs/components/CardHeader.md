# CardHeader

[Card guide](./Card.md) · [Component catalog](../components.md)

CardHeader renders a `div` containing arbitrary children. It can be used on its
own or anywhere inside Card.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | omitted |
| `className` | `string` | omitted |
| `style` | `CSSProperties \| null` | `null` |
| Native div attributes and `ref` | React div props | forwarded |

```tsx
import { CardHeader } from "neus-ui";

<CardHeader className="custom-header" style={null}>
  <h2>Mountain retreat</h2>
</CardHeader>
```

The header uses 16px padding, an 8px gap, centered alignment and space-between
horizontal distribution. Neus retains its header divider; other designs omit it.
Typography and semantics belong to the children. See the Card guide for themes,
CSS tokens and style precedence.
