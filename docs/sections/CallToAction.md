# CallToAction

[Section index](./README.md) · [Documentation](../README.md) ·
[Customization](../design/customization.md)

The closing band of a public page: the claim, the action and, in split, a form beside it.

## Usage

```tsx
import { Button } from "neus-ui";
import { CallToAction } from "neus-ui/sections";

export const Closing = () => (
  <CallToAction id="turno" tone="brand" title="Pedí tu turno en un minuto"
    text="Te llamamos para confirmar el horario." actions={<Button label="Pedir turno" href="#formulario" size="large" />} />
);
```

With a form beside the claim: `variant="split"` and `aside={<Card>…form…</Card>}`.

## Behavior and accessibility

CallToAction is a [Section](../components/Section.md) named by its title, `tone="accent"` by
default. `band` centers the title, text and actions; `split` aligns them to the start and puts
`aside` beside them from 1024px. On `tone="brand"` primary buttons swap fill and ink so the
action reads on the primary color; fields belong in a Card inside `aside`, which keeps its
own surface.

## Props

See [the type source](../../src/sections/CallToAction/CallToAction.types.ts) and
[implementation](../../src/sections/CallToAction/CallToAction.tsx) for the exact contract. All props are
optional and default to undefined unless noted.

| Prop | Type | Default / requirement | Purpose |
| --- | --- | --- | --- |
| `title` | `ReactNode` | Required | The claim |
| `text` | `ReactNode` | Omitted | One or two sentences |
| `actions` | `ReactNode` | Omitted | The action |
| `aside` | `ReactNode` | Omitted | A form or summary beside the text |
| `variant` | `"band" \| "split"` | `"band"` | Layout |
| `titleAs` | `"h1"` … `"h6"` | `"h2"` | Heading level |
| `tone`, `spacing`, `id` and other [Section](../components/Section.md) props | | `tone="accent"`, `spacing="lg"` | Forwarded to the band |
| `className`, `style` | `string`, `CSSProperties` | Omitted | `.call-to-action` |
| `bodyClassName`, `bodyStyle` | `string`, `CSSProperties` | Omitted | `.call-to-action__body` |
| `titleClassName`, `titleStyle` | `string`, `CSSProperties` | Omitted | `.call-to-action__title` |
| `textClassName`, `textStyle` | `string`, `CSSProperties` | Omitted | `.call-to-action__text` |
| `actionsClassName`, `actionsStyle` | `string`, `CSSProperties` | Omitted | `.call-to-action__actions` |
| `asideClassName`, `asideStyle` | `string`, `CSSProperties` | Omitted | `.call-to-action__aside` |

## Anatomy and per-part customization

Classes are appended to the built-in classes. Style props apply directly to their listed
elements. Omitting a hook on a later render removes that override. Hooks do not create a part
whose rendering condition is false.

| Base class / part | Element | Class prop | Style prop | Rendering condition |
| --- | --- | --- | --- | --- |
| `.call-to-action` | Section `section` | `className` | `style` | `Always` |
| `.call-to-action__layout` | Container `div` | None | None | `Always` |
| `.call-to-action__body` | `div` | `bodyClassName` | `bodyStyle` | `Always` |
| `.call-to-action__title` | Heading | `titleClassName` | `titleStyle` | `Always` |
| `.call-to-action__text` | Text `p` | `textClassName` | `textStyle` | `text` given |
| `.call-to-action__actions` | `div` | `actionsClassName` | `actionsStyle` | `actions` given |
| `.call-to-action__aside` | `div` | `asideClassName` | `asideStyle` | `aside` given |

State/variant selectors: `.call-to-action[data-variant]`, `.call-to-action[data-aside]`.

## CSS token reference

All six systems supply the `sections` recipe in light/dark modes. Values below show the Neus
baseline; system and mode overrides can differ. Do not edit generated files.

- [sections baseline recipe](../../src/design-systems/neus/generated/recipes/sections.css)

| Token | Purpose | Neus baseline |
| --- | --- | --- |
| `--call-to-action-gap` | call to action gap | `var(--space-8)` |

## Storybook and related guides

The single CallToAction story exposes props as controls. Related: [Section](../components/Section.md),
[FormTemplate](../templates/FormTemplate.md).

[Components](../components/README.md) · [Design systems](../design/systems.md) ·
[Customization](../design/customization.md)
