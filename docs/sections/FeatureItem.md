# FeatureItem

[Section index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

One feature or service of a [FeatureList](./FeatureList.md), laid out by the list's variant.

## Usage

```tsx
<FeatureItem icon={<Timer />} title="Cabe entre dos reuniones" action={<Link href="/sesiones" label="Ver sesiones" />}>
  Sesiones de uno a diez minutos para el escritorio o el transporte.
</FeatureItem>
```

## Behavior and accessibility

The item is a list item: a `li` in `grid` and `list`, a `Card as="li"` in `cards`. Use it
inside a FeatureList. The title is an `h3` at size `sm` (`titleAs` changes the level). The
icon sits on a tinted tile and is decorative (`aria-hidden`); pass a lucide-react element.

## Props

See [the type source](../../src/sections/FeatureList/components/FeatureItem/FeatureItem.types.ts) and
[implementation](../../src/sections/FeatureList/components/FeatureItem/FeatureItem.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `title` | `ReactNode` | Required | Feature title |
| `children` | `ReactNode` | Omitted | The explanation |
| `icon` | `ReactNode` | Omitted | A lucide-react icon element |
| `action` | `ReactNode` | Omitted | A link to more detail |
| `titleAs` | `"h1"` … `"h6"` | `"h3"` | Heading level |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.feature-item` |
| `iconClassName`, `iconStyle` | `string`, `CSSProperties` | Omitted | `.feature-item__icon` |
| `titleClassName`, `titleStyle` | `string`, `CSSProperties` | Omitted | `.feature-item__title` |
| `descriptionClassName`, `descriptionStyle` | `string`, `CSSProperties` | Omitted | `.feature-item__description` |
| `actionClassName`, `actionStyle` | `string`, `CSSProperties` | Omitted | `.feature-item__action` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.feature-item` | `li`, or `Card as="li"` in cards | `className` | `style` | `Always` |
| `.feature-item__header` | `div`, or CardHeader in cards | None | None | `Always` |
| `.feature-item__icon` | `span` | `iconClassName` | `iconStyle` | `icon` given |
| `.feature-item__title` | Heading | `titleClassName` | `titleStyle` | `Always` |
| `.feature-item__body` | `div`, or CardContent in cards | None | None | `Always` |
| `.feature-item__description` | Text `p` | `descriptionClassName` | `descriptionStyle` | `children` given |
| `.feature-item__action` | `div` | `actionClassName` | `actionStyle` | `action` given |

State/variant selectors: `.feature-item[data-variant-item]`.

## CSS token reference

FeatureItem reads the `--feature-*` tokens listed in [FeatureList](./FeatureList.md#css-token-reference).

## Storybook and related guides

The single FeatureItem story exposes props as controls. Owning family: [FeatureList](./FeatureList.md).

[Components](../components/README.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
