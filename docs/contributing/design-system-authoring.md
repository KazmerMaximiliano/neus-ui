# Authoring design systems

[Contributor index](./README.md) · [Documentation](../README.md) · [Consumer
guide](../design/systems.md)

## Editing a design system

Each `DESIGN.md` is the editable source for its system's tokens, action palettes and
component recipes. It follows [Google's DESIGN.md
format](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md) (alpha;
consulted 2026-10-15): YAML tokens followed by Overview, Colors, Typography, Layout,
Elevation & Depth, Shapes, Components, and Do's and Don'ts. The prose explains visual
identity and usage; component guides document APIs.

Edit a document, run `pnpm design:generate`, and commit both the document and its generated
files. `pnpm design:check` validates all six documents and checks the committed outputs
without writing. It fails on missing, edited or stale artifacts. Development and build
scripts generate before starting. For continuous editing, run `pnpm design:watch` in another
terminal alongside Vite or Storybook. The watcher reports invalid documents, retains the
last valid artifacts and recovers on the next valid edit, including an editor's atomic
replacement of `DESIGN.md`. It polls those six paths every 250ms, avoiding native watcher
limits and supporting volumes whose filesystem events are unreliable.

Read the relevant specification before adapting a component. Add new tokens to the complete
Neus reset contract before overriding them in another system. Keep source links and
consultation dates with the visual guidance. Apple uses sober opaque surfaces; Material
follows the M3 base vocabulary.

### YAML and the Neus extension

Standard groups are `colors`, `typography`, `rounded`, `spacing` and `components`. Names
without a mode suffix describe light mode; dark color names end in `-dark`. References use
`{path.to.token}`, including scalar typography properties such as
`{typography.body-md.fontSize}`. Standard groups also describe resolved inherited roles,
while the Neus extension explicitly controls which values override defaults.

`x-neus` is a local extension to Google's format, validated by our generator:

| Field | Meaning |
| --- | --- |
| `id` | The directory's typed system identifier |
| `palette.light`, `palette.dark` | `primary` and `onPrimary`, plus optional hover, active, focus, success, error, info and warning colors |
| `foundations` | Shared variable defaults; only the Neus document owns these |
| `tokens` | Semantic colors, typography, elevation and other system-wide variables |
| `recipes.<family>` | Component-specific CSS variable declarations |

Foundations, tokens and recipes contain `base`, `light` and/or `dark` mappings from existing
`--variable-names` to scalar values or token references. All twenty-six recipe families
(`RECIPE_NAMES` in `src/design-systems/tooling/design-systems.consts.ts`) must be present; an empty mapping intentionally inherits Neus. Palettes resolve to six-digit hex
colors for the existing runtime color utilities.

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

Document references are resolved during generation. CSS `var()`, `calc()` and `color-mix()`
expressions retain their runtime dependencies, including consumer overrides. Do not replace
a dynamic variable with its current computed value. Neus emits complete resets on `:root`
and `[data-design-system]`; other systems emit scoped overrides, with mode selectors
retaining their original specificity. General elevation roles belong in `tokens`; recipes
reference those roles.

The generator first validates all documents in memory, including duplicate keys, types,
references, cycles, IDs, modes and extension keys. It then writes changed artifacts and
removes obsolete files inside its owned `generated/` directories. Identical output is left
untouched. Generated files contain no timestamps.

Google's official linter runs during generation and checks. Its errors fail the command.
Warnings remain visible: `orphaned-tokens` does not see consumers inside `x-neus`, and
`token-like-ignored` identifies that local extension. Review a full report with `pnpm exec
designmd lint src/design-systems/<id>/DESIGN.md`; keep actual contrast checks in the browser
suites rather than changing visual values to silence those extension-related warnings.

`DESIGN_SYSTEMS.source` contains repository-relative paths to these documents, not
application URLs or package subpath exports. The documents are available in the repository;
the published package still contains only `dist` artifacts. The existing [token
reference](../design/tokens.md) and [theming guide](../design/theme-provider.md) describe
shared mechanics; they do not replace each system's visual specification.

## Responsibilities

```text
src/design-systems/
├── index.ts                 # Public registry and type exports
├── design-systems.types.ts  # IDs and metadata contracts
├── design-systems.consts.ts # Typed metadata/palette aggregation and public families
├── design-systems.css       # Foundations, then six system entry points
├── tooling/                 # Generator: pure core, Node-only file and lint layer, watcher and tests
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
`design-system-generator` Node project. `design-systems.core.ts` holds the pure parsing,
validation and rendering, without the file system or the Google linter; it is the only
tooling module emitted into `dist/`, through the internal `src/design.ts` entry that
`npx neus design build` uses to validate and compile a project's derived system
(`x-neus.extends` plus optional `tokens` and `recipes`, no palette, id or foundations).

`ThemeProvider` owns theme selection. It resolves one action palette for both the context
and CSS, adds `data-design-system` and `data-color-scheme`, and applies runtime color
overrides. Local scopes isolate siblings and nested examples. Global providers restore the
properties they changed when unmounted.

`Button.styles.css` owns Button selectors, layout, and interaction states. System styles
override variables on their scope selector, never target the component's DOM. Components
contain no design-system conditionals.

Neus defines every component token on `:root` and `[data-design-system]` before external
overrides are loaded. This reset matters: a Neus child inside a Neobrutalism parent must not
inherit its thick borders or hard shadows.

## Adding a component

1. Read each relevant `DESIGN.md`. Keep behavior and props independent of the
   selected system.
2. Replace visual constants in its stylesheet with component-prefixed tokens.
3. Define every token's Neus default in `x-neus.recipes.<family>.base`. Add a new
   family to the generator's recipe list when needed.
4. Add overrides to each system's document and run `pnpm design:generate`.
5. Update the aggregator's family metadata. Integrate a design-system selector into
   the component's existing story using a local provider scope. Keep preview arguments separate from the public API; shared selector arguments belong to `.storybook/designSystem.types.ts`.
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
   toolbar and registry-backed story selectors populate from the registry automatically.
