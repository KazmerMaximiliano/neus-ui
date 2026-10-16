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
| `neus` | [Neus UI (default)](../src/design-systems/neus/DESIGN.md) | All public component families and both templates |
| `apple` | [Apple HIG — sober surfaces](../src/design-systems/apple/DESIGN.md) | All public component families and both templates |
| `carbon` | [IBM Carbon](../src/design-systems/carbon/DESIGN.md) | All public component families and both templates |
| `material` | [Material 3 base](../src/design-systems/material/DESIGN.md) | All public component families and both templates |
| `neobrutalism` | [Neobrutalism — Neus vocabulary](../src/design-systems/neobrutalism/DESIGN.md) | All public component families and both templates |
| `vercel` | [Vercel Geist](../src/design-systems/vercel/DESIGN.md) | All public component families and both templates |

External systems are project adaptations of their design references,
with illustrative choices where a reference leaves details unspecified. They are
not complete implementations of the original libraries. Fonts use local fallbacks.
Base, Navigation, Date & Time, Location, DataTable and both templates have
component-specific recipes. Actions is documented consumer composition. See the [Input guide](./components/Input.md) for its token contract and
per-part customization.
`DESIGN_SYSTEMS` and `DesignSystemId` are public exports for application selectors.

## Editing a design system

Each `DESIGN.md` is the editable source for its system's tokens, action palettes
and component recipes. It follows [Google's DESIGN.md format](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)
(alpha; consulted 2026-10-15): YAML tokens followed by Overview, Colors,
Typography, Layout, Elevation & Depth, Shapes, Components, and Do's and Don'ts.
The prose explains visual identity and usage; component guides document APIs.

Edit a document, run `pnpm design:generate`, and commit both the document and its
generated files. `pnpm design:check` validates all six documents and checks the
committed outputs without writing. It fails on missing, edited or stale artifacts.
Development and build scripts generate before starting. For continuous editing,
run `pnpm design:watch` in another terminal alongside Vite or Storybook. The watcher
reports invalid documents, retains the last valid artifacts and recovers on the
next valid edit, including an editor's atomic replacement of `DESIGN.md`.
It polls those six paths every 250ms, avoiding native watcher limits and
supporting volumes whose filesystem events are unreliable.

Read the relevant specification before adapting a component. Add new tokens to
the complete Neus reset contract before overriding them in another system. Keep
source links and consultation dates with the visual guidance. Apple uses sober
opaque surfaces; Material follows the M3 base vocabulary.

### YAML and the Neus extension

Standard groups are `colors`, `typography`, `rounded`, `spacing` and `components`.
Names without a mode suffix describe light mode; dark color names end in `-dark`.
References use `{path.to.token}`, including scalar typography properties such as
`{typography.body-md.fontSize}`. Standard groups also describe resolved inherited
roles, while the Neus extension explicitly controls which values override defaults.

`x-neus` is a local extension to Google's format, validated by our generator:

| Field | Meaning |
| --- | --- |
| `id` | The directory's typed system identifier |
| `palette.light`, `palette.dark` | `primary` and `onPrimary`, plus optional hover, active, focus, success, error and info colors |
| `foundations` | Shared variable defaults; only the Neus document owns these |
| `tokens` | Semantic colors, typography, elevation and other system-wide variables |
| `recipes.<family>` | Component-specific CSS variable declarations |

Foundations, tokens and recipes contain `base`, `light` and/or `dark` mappings
from existing `--variable-names` to scalar values or token references. All twenty
recipe families must be present; an empty mapping intentionally inherits Neus.
Palettes resolve to six-digit hex colors for the existing runtime color utilities.

```yaml
x-neus:
  id: apple
  palette:
    light:
      primary: "{colors.primary}"
      onPrimary: "{colors.on-primary}"
    dark:
      primary: "{colors.primary-dark}"
      onPrimary: "{colors.on-primary-dark}"
  tokens:
    base:
      --font-body: "{typography.body-md.fontFamily}"
  recipes:
    button:
      base:
        --button-radius: "{rounded.button}"
    # The document also supplies the remaining recipe families.
```

Document references are resolved during generation. CSS `var()`, `calc()` and
`color-mix()` expressions retain their runtime dependencies, including consumer
overrides. Do not replace a dynamic variable with its current computed value.
Neus emits complete resets on `:root` and `[data-design-system]`; other systems
emit scoped overrides, with mode selectors retaining their original specificity.
General elevation roles belong in `tokens`; recipes reference those roles.

The generator first validates all documents in memory, including duplicate keys,
types, references, cycles, IDs, modes and extension keys. It then writes changed
artifacts and removes obsolete files inside its owned `generated/` directories.
Identical output is left untouched. Generated files contain no timestamps.

Google's official linter runs during generation and checks. Its errors fail the
command. Warnings remain visible: `orphaned-tokens` does not see consumers inside
`x-neus`, and `token-like-ignored` identifies that local extension. Review a full
report with `pnpm exec designmd lint src/design-systems/<id>/DESIGN.md`; keep
actual contrast checks in the browser suites rather than changing visual values
to silence those extension-related warnings.

`DESIGN_SYSTEMS.source` contains repository-relative paths to these documents,
not application URLs or package subpath exports. The documents are available in
the repository; the published package still contains only `dist` artifacts.
The existing [token reference](./design-system.md) and [theming guide](./theming.md)
describe shared mechanics; they do not replace each system's visual specification.

## Responsibilities

```text
src/design-systems/
├── index.ts                 # Public registry and type exports
├── design-systems.types.ts  # IDs and metadata contracts
├── design-systems.consts.ts # Typed metadata/palette aggregation and public families
├── design-systems.css       # Foundations, then six system entry points
├── tooling/                 # Node-only generator, validation, watcher and tests
├── tests/                   # Shared browser suites and helpers
│   └── fixtures/            # Test-only CSS
└── <system>/
    ├── DESIGN.md            # Editable tokens and visual guidance
    └── generated/           # Versioned output; never edit manually
        ├── index.css
        ├── tokens.css
        ├── <system>.consts.ts
        ├── foundations.css  # Neus only
        └── recipes/
            ├── button.css
            └── ...

src/css/variables.css        # Compatibility import for generated Neus foundations
src/providers/ThemeProvider/ # Scope, palette resolution, context, and cleanup
src/components/Button/Button.stories.tsx # Single preview with a design-system selector
```

The `tooling/` directory is checked by `tsconfig.node.json` and tested in the
`design-system-generator` Node project. Application, component-test and library
TypeScript configurations exclude it; its files are not emitted into `dist/`.

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
See the [Card guide](./components/Card.md) for public tokens, composition and examples.

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
   selected system.
2. Replace visual constants in its stylesheet with component-prefixed tokens.
3. Define every token's Neus default in `x-neus.recipes.<family>.base`. Add a new
   family to the generator's recipe list when needed.
4. Add overrides to each system's document and run `pnpm design:generate`.
5. Update the aggregator's family metadata. Integrate a design-system selector into
   the component's existing story using a local provider scope. Keep
   story argument types in the component's `.types.ts` file.
6. Test behavior in the component's unit tests and computed styles, nested scope
   resets, and light/dark states in the browser project.
7. Update the visual guidance and component usage documentation.

## Adding a system

1. Write its `DESIGN.md` with standard tokens, the eight prose sections,
   source/date attribution, and its `x-neus` palette and variable mappings.
2. Add the typed ID and generator system ID, then generate its artifacts.
   Keep recipes limited to variable overrides; inherit the complete Neus baseline.
3. Add its generated metadata and palette to the aggregator, and import its CSS
   entry after Neus in `design-systems.css`.
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


All public families and both templates have scoped recipes. See the
[component reference](./components.md) for public APIs and usage examples,
including shared presentations and DataTable customization.
