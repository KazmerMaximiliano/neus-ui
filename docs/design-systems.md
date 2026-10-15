# Design systems

[Documentation index](./README.md)

Design systems belong to a shared theme layer. Components define their structure,
behavior, and states once; CSS tokens supply their visual choices. Storybook uses
the same provider and styles as an application.

## Usage and coverage

```tsx
import { Button, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const SaveAction = () => (
  <ThemeProvider designSystem="carbon" initialColorScheme="light">
    <Button label="Save changes" />
  </ThemeProvider>
);
```

| ID | Design specification | Component adaptations |
| --- | --- | --- |
| `neus` | [Neus UI (default)](../src/design-systems/neus/DESIGN.md) | Original library design; token recipes for Button, Card, Input, Sidebar |
| `apple` | [Apple HIG — sober surfaces](../src/design-systems/apple/DESIGN.md) | Button, Card, Input, Sidebar |
| `carbon` | [IBM Carbon](../src/design-systems/carbon/DESIGN.md) | Button, Card, Input, Sidebar |
| `material` | [Material 3 base](../src/design-systems/material/DESIGN.md) | Button, Card, Input, Sidebar |
| `neobrutalism` | [Neobrutalism — Neus vocabulary](../src/design-systems/neobrutalism/DESIGN.md) | Button, Card, Input, Sidebar |
| `vercel` | [Vercel Geist](../src/design-systems/vercel/DESIGN.md) | Button, Card, Input, Sidebar |

External systems are project adaptations of their design references,
with illustrative choices where a reference leaves details unspecified. They are
not complete implementations of the original libraries. Fonts use local fallbacks.
Button, Input, Sidebar and the composable Card family have component-specific adaptations.
Other components receive shared theme colors but retain their existing structure
and styles. See the [Input guide](./components/Input.md) for its token contract and
per-part customization.
`DESIGN_SYSTEMS` and `DesignSystemId` are public exports for application selectors.

## Design intent and implementation

Each system has a `DESIGN.md` beside its CSS recipes, following the eight prose
sections of [Google's DESIGN.md format](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)
(alpha; consulted 2026-10-14). YAML is intentionally omitted: CSS and TypeScript
remain the source of implemented values. The documents explain how to apply those
values and what future adaptations should achieve.

- **Target rules** define visual direction. External systems aim toward their
  primary references; local web mappings are identified explicitly.
- **Current implementation** describes the existing recipes and inherited defaults.
- **Refactor gaps** identify differences and missing roles, anatomy, or behavior.
  They are future work, not implemented capabilities or automatic API changes.

Read the relevant specification before adapting a component, then inspect its
recipe, shared defaults, and actual states. Add any missing token to the complete
Neus reset contract before overriding it in another system. Update the current
implementation and gaps when a refactor lands; update source links and consultation
dates when revisiting external guidance. A source update does not silently change
the chosen target: Apple uses sober surfaces without requiring Liquid Glass, and
Material uses M3 base rather than Expressive.

`DESIGN_SYSTEMS.source` contains repository-relative paths to these documents,
not application URLs or package subpath exports. The documents are available in
the repository; the published package still contains only `dist` artifacts.
The existing [token reference](./design-system.md) and [theming guide](./theming.md)
describe shared mechanics; they do not replace each system's visual specification.

## Responsibilities

```text
src/design-systems/
├── design-systems.types.ts   # IDs and metadata contracts
├── registry.ts              # Names, references, and component coverage
├── palettes.ts              # Light/dark action colors for CSS and useColors
├── design-systems.css       # Ordered CSS entry point
├── neus/
│   ├── DESIGN.md             # Design intent, current implementation, and gaps
│   ├── tokens.css           # Default semantic tokens
│   ├── button.css           # Complete Button token contract
│   ├── card.css             # Complete Card token contract
│   ├── input.css            # Complete Input token contract
│   └── sidebar.css          # Complete Sidebar token contract
└── <system>/
    ├── DESIGN.md             # Reference-based target and local adaptation decisions
    ├── tokens.css           # Shared visual tokens
    ├── button.css           # Button token overrides
    ├── card.css             # Card family token overrides
    ├── input.css            # Input token overrides
    └── sidebar.css          # Sidebar token overrides

src/providers/ThemeProvider/ # Scope, palette resolution, context, and cleanup
src/components/Button/Button.stories.tsx # Single preview with a design-system selector
```

`ThemeProvider` owns theme selection. It resolves one action palette for both
the context and CSS, adds `data-design-system` and `data-color-scheme`, and applies
runtime color overrides. Local scopes isolate siblings and nested examples.
Global providers restore the properties they changed when unmounted.

`Button.styles.css` owns Button selectors, layout, and interaction states. System styles override variables on their scope selector,
never target the component's DOM. Components contain no design-system conditionals.

Neus defines every component token on `:root` and `[data-design-system]` before
external overrides are loaded. This reset matters: a Neus child inside a
Neobrutalism parent must not inherit its thick borders or hard shadows.

## Individual overrides

Button keeps `buttonStyle`, `labelStyle`, and `loaderStyle` for one-off changes.
Shared themes use CSS variables; they do not construct or merge these objects.
Variant, semantic color, size, and loading state remain independent of the system.

Loader dots inherit `currentColor`. `loaderStyle.color` changes their color and
`loaderStyle.fontSize` changes their size; `gap` changes the spacing between dots.
The label inherits the button's color and typography unless overridden.

Card, CardHeader, CardMedia, CardContent and CardFooter each accept `className`
and `style?: CSSProperties | null`, defaulting to null. Card is a passive container
with no padding; Header/Content use 16px, Footer uses 8px with an 8px gap, and Media
reaches the inside border. Every Card token resets at each provider boundary.
See the [Card guide](./components/Card.md) for the public tokens, examples and
breaking migration from the previous slot/state props.

Card recipes preserve the original Neus surface and header divider, with geometry
adaptations for all other systems. Their missing layout details use
[Material Cards](https://m1.material.io/components/cards.html) as a reference;
[Carbon tiles](https://www.carbondesignsystem.com/building-blocks/core/components/tile/specifications)
and [Geist materials](https://vercel.com/geist/materials) inform those adaptations.
The specifications linked above record the target and remaining differences for
each Card adaptation. Its implemented values live under `src/design-systems/`;
the Material 1 reference used for the earlier Card work does not define the new
Material 3 target.

For reusable application overrides, use a local scope class in a stylesheet:

```tsx
<ThemeProvider scope="local" designSystem="apple" className="checkout-theme">
  <Button label="Place order" />
</ThemeProvider>
```

```css
[data-design-system].checkout-theme {
  --button-radius: var(--radius-pill);
}
```

Sidebar keeps its mobile dialog inside the provider scope, preserving inherited tokens in the browser top layer. Its NEUS curves use transparent decoration; other recipes disable the concave wedge. See [Sidebar](./components/Sidebar.md) for per-part styles, token controls and responsive behavior.

## Adding a component

1. Read each relevant `DESIGN.md`. Keep behavior and props independent of the
   selected system; distinguish visual gaps from changes requiring shared anatomy
   or a separately designed public API.
2. Replace visual constants in its stylesheet with component-prefixed tokens.
3. Define every token's Neus default in `neus/<component>.css`, resetting it on
   both `:root` and `[data-design-system]`.
4. Add optional overrides in each system's `<component>.css` and import those
   files in `design-systems.css`, after the Neus contract.
5. Update the registry's coverage metadata. Integrate a design-system selector into
   the component's existing story using a local provider scope. Keep
   story argument types in the component's `.types.ts` file.
6. Test behavior in the component's unit tests and computed styles, nested scope
   resets, and light/dark states in the browser project.
7. Update each affected specification's current implementation and remaining gaps.

## Adding a system

1. Write its `DESIGN.md` using the same eight sections, source/date attribution,
   and target/current/gaps distinction. Add its typed ID, registry metadata with a
   repository-relative document path, and light/dark action palette.
2. Create its `tokens.css` and component recipe files. Use a scope selector such
   as `[data-design-system="example"]`; avoid descendant overrides and `!important`.
3. Import its CSS after the Neus baseline and list only implemented adaptations
   in the registry. Missing recipes intentionally use the Neus token defaults.
4. Add browser cases for its palettes and distinctive geometry. The Storybook
   toolbar and Button story's selector populate from the registry automatically.

## Scope boundaries

Use one global provider for the application. Independent roots can opt into
`scope="local"`; nested providers are always local. Unspecified nested systems
and modes follow their parent, while color overrides belong to each provider.
See [Theming](./theming.md) for controlled mode and runtime updates.

CSS follows the DOM. A component portaled outside a local scope uses the portal
container's CSS tokens even though React context still follows its original
parent. Portal-aware local theming is outside the current Button coverage.
On the server, local scopes include their attributes and palette variables in
the markup. Global providers apply document variables when mounted in the client.
