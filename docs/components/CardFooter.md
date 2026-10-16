# CardFooter

[Card guide](./Card.md) · [Component catalog](../components.md)

CardFooter renders a `div` containing arbitrary children. It can be used on its
own or anywhere inside Card.

| Prop | Type | Default |
| --- | --- | --- |
| `children` | `ReactNode` | omitted |
| `className` | `string` | omitted |
| `style` | `CSSProperties \| null` | `null` |
| Native div attributes and `ref` | React div props | forwarded |

```tsx
import { CardFooter } from "neus-ui";

<CardFooter className="custom-footer" style={null}>
  <a href="/details">View details</a>
</CardFooter>
```

The footer uses a wrapping flex row with centered alignment, 8px padding and an
8px gap. Its children provide all actions and interaction states.
Typography and semantics belong to the children. See the Card guide for themes,
CSS tokens and style precedence.
