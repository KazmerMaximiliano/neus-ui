# Adding a component

[Contributing](./README.md) · [Documentation](../README.md) · [Agent instructions](../../AGENTS.md)

A component is finished when it works in all six design systems and the AI design kit
knows it. Only then can an agent using `neus-design` pick it, style it through the system's
tokens and check it. This guide follows one example from start to finish: a **Slider** for a
single value, built on `<input type="range">`.

[Development](./development.md) covers file conventions,
[Authoring design systems](./design-system-authoring.md) the DESIGN.md schema, and
[Testing](./testing.md) the test projects. This guide puts them in order and adds the
AI design kit.

## What has to change

| Piece | Where | How |
| --- | --- | --- |
| Component | `src/components/Slider/` | By hand |
| Tokens in six systems | `src/design-systems/<id>/DESIGN.md`, then `pnpm design:generate` | By hand, then generated |
| Recipe family | `RECIPE_NAMES`, `ADAPTED_COMPONENTS` | By hand |
| Tests | Unit, browser suite across six systems, server rendering | By hand (SSR finds the story automatically) |
| Guide and catalog | `docs/components/Slider.md`, `docs/components/README.md` | By hand |
| `neus context`, `neus docs` | Read the catalog and the guide | Automatic |
| `neus lint` documented classes, token checks | Read the guides and the library CSS | Automatic |
| `neus design build` (None mode) | Validates against the published CSS | Automatic |
| Skills | `SKILL.md` need table, `customization.md`, `patterns.md`, audit `neus-rules.md` | By hand |
| `neus lint` raw-element hint | `cli/neus.consts.mjs` or `cli/lint.mjs` | By hand, when a raw element is replaced |
| Specimen | `cli/templates/NeusSpecimen.tsx` | By hand |
| Inventory and counts | `AGENTS.md`, `README.md`, `docs/README.md`, introduction, `BACKLOG.md` | By hand |

## 1. Build it on tokens

Every visual value in the stylesheet is a custom property with the component's prefix. The
stylesheet holds structure, states and selectors; the DESIGN.md files hold the values. A
component never asks which system is active.

```css
/* src/components/Slider/Slider.styles.css */
.slider__input {
  appearance: none;
  width: 100%;
  height: var(--slider-thumb-size);
  background: transparent;
  accent-color: var(--slider-fill-background);
}
.slider__input::-webkit-slider-runnable-track {
  height: var(--slider-track-height);
  border-radius: var(--slider-track-radius);
  background: linear-gradient(to right, var(--slider-fill-background) var(--slider-progress),
    var(--slider-track-background) var(--slider-progress));
}
.slider__input::-webkit-slider-thumb {
  appearance: none;
  width: var(--slider-thumb-size);
  height: var(--slider-thumb-size);
  margin-top: calc((var(--slider-track-height) - var(--slider-thumb-size)) / 2);
  border: var(--slider-thumb-border-width) solid var(--slider-thumb-border-color);
  border-radius: var(--slider-thumb-radius);
  background: var(--slider-thumb-background);
  box-shadow: var(--slider-thumb-shadow);
}
.slider__input:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 var(--slider-focus-width) var(--color-focus-ring);
}
.slider__input:disabled { opacity: var(--slider-disabled-opacity); }
/* Repeat the track and thumb rules for ::-moz-range-track and ::-moz-range-thumb. */
```

- Values that change at runtime (here the filled share, `--slider-progress`) are written
  inline by the component as custom properties. List them in the `RUNTIME` array of
  `src/tests/css-tokens.test.ts`: that test fails on any `var()` that names a token no
  stylesheet declares.
- Use shared roles inside defaults (`--color-primary`, `--color-surface`, `--space-*`,
  `--radius-*`, `--color-focus-ring`), never literal colors. The [token
  reference](../design/tokens.md) lists them.
- Keep the native element: keyboard, screen readers and forms work without extra code.
  Follow the conventions in [Development](./development.md): a separate `.types.ts`, a
  `.consts.ts` for static data, named exports, `className` and `style` on the root, and a
  `*ClassName` / `*Style` pair for every part.

## 2. Give it values in all six systems

Add a recipe family to the generator, then declare it in every DESIGN.md:

```ts
// src/design-systems/tooling/design-systems.consts.ts
export const RECIPE_NAMES = [ /* ... */ "sections", "slider" ] as const;
// src/design-systems/design-systems.consts.ts
export const ADAPTED_COMPONENTS = [ /* ... */ "Slider" ] as const;
```

Neus owns the complete baseline. Every token the stylesheet reads has a value in
`x-neus.recipes.slider.base`, plus `dark` entries for values that change with the scheme:

```yaml
# src/design-systems/neus/DESIGN.md, inside x-neus.recipes
    slider:
      base:
        --slider-track-height: 6px
        --slider-track-radius: var(--radius-pill)
        --slider-track-background: var(--color-border-muted)
        --slider-fill-background: var(--color-primary)
        --slider-thumb-size: 20px
        --slider-thumb-radius: 50%
        --slider-thumb-background: var(--color-surface)
        --slider-thumb-border-width: 2px
        --slider-thumb-border-color: var(--color-primary)
        --slider-thumb-shadow: var(--elevation-floating)
        --slider-focus-width: 4px
        --slider-disabled-opacity: 0.5
```

The other five systems must each declare the family. An empty mapping inherits Neus;
overrides follow the system's own specification. Take the values from the official source,
such as the Material slider or the Carbon slider, and cite it in the document's prose with
the date you consulted it:

```yaml
# src/design-systems/<id>/DESIGN.md
    slider: {}            # inherits the Neus baseline
```

Then:

- Describe the component in each DESIGN.md's prose: a short paragraph under
  `### Supporting controls and content`, or its own `### Slider` subsection when the system
  gives it a distinct look. Keep visual guidance there, not implementation notes.
- Run `pnpm design:generate` and commit the generated files with their sources.
  `pnpm design:check` fails when they are out of date or a family is missing.
- Neus resets every token at each scope, so a Neus slider inside a Neobrutalism scope never
  inherits thick borders. Do not add design-system conditionals to the component.

## 3. Story, tests and server rendering

- **One story**, `Slider.stories.tsx`, with every prop in `argTypes` and a `designSystem`
  control that wraps the component in `<ThemeProvider scope="local">`. The
  server-rendering test (`src/tests/stories.ssr.test.tsx`) picks it up automatically and
  renders it with `renderToString`.
- **Unit tests**, `Slider.test.tsx`: rendering, props, the native value and `onChange`,
  keyboard steps, disabled state, every part hook, and type tests for invalid props
  (`@ts-expect-error`).
- **A browser suite**, `src/design-systems/tests/slider.browser.test.tsx`, across all six
  systems in light and dark: computed track, fill and thumb values from the recipe,
  focus ring contrast, the thumb's hit area, and a nested scope that resets to Neus.

```tsx
describe.each(["light", "dark"] as const)("Slider in %s mode", (scheme) => {
  it.each(DESIGN_SYSTEMS)("draws $id track, fill and thumb from its recipe", ({ id }) => {
    render(
      <ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
        <Slider label="Rooms" min={1} max={8} defaultValue={3} />
      </ThemeProvider>,
    );
    const input = screen.getByRole("slider", { name: "Rooms" });
    expect(contrastRatio(resolveColor(input, "--slider-fill-background"),
      resolveColor(input, "--slider-track-background"))).toBeGreaterThanOrEqual(3);
  });
});
```

## 4. Documentation

- `docs/components/Slider.md`, with the same sections as the other guides: Usage, Behavior
  and accessibility, Props, Anatomy and per-part customization (every part's class, class prop
  and style prop), CSS token reference (built from the generated Neus recipe), Storybook and
  related guides. `npx neus docs Slider` prints the first four sections to agents, and
  `neus lint` treats the classes in the anatomy table as public: a project stylesheet that
  targets a class missing from the table gets a `private-class` P0.
- A row in the right table of `docs/components/README.md`: the name linked to its guide and
  its purpose in one sentence. `npx neus context` builds the agents' catalog from these rows.
- Update the counts: the component count in `README.md`, `docs/README.md`,
  `docs/getting-started/introduction.md` and `docs/components/README.md`, plus the inventory
  table and the count in `AGENTS.md`. Remove the row from `BACKLOG.md`.

## 5. Teach it to the AI design kit

`skills/`, `agents/` and `cli/templates/` are copied into every project by `npx neus init`.
Update them in the same change as the component:

- **`skills/neus-design/SKILL.md`, "Need → component" table.** Add the need in plain words
  so the agent finds it before writing markup:
  `| One value in a range (rooms, hours, volume) | Slider (min, max, step; label and visible value) |`.
  `neus context` prints this table to the agent.
- **`skills/neus-design/references/customization.md`, Level 0.** Add the props and variants
  that change its look, so the agent tries props before tokens.
- **`skills/neus-design/references/patterns.md`.** Use it in the skeleton where it belongs (a
  settings form, a filter bar) if it changes how that pattern is built.
- **`skills/neus-audit/references/neus-rules.md`, "Already handled inside neus
  components".** Say what the component guarantees (native range semantics, the label wired
  to the input, the focus ring), so the audit does not flag it as missing on the component
  and does flag it on hand-written markup.
- **`neus lint`.** When the component replaces a raw element, teach the raw-element rule its
  name. Tags map in `RAW_TO_COMPONENT` (`cli/neus.consts.mjs`); an attribute variant such as
  `<input type="range">` needs a line check in `cli/lint.mjs`, next to the
  `role="alert"` check, with a test in `cli/lint.test.mjs`.
- **`cli/templates/NeusSpecimen.tsx`.** Add it to the page `npx neus specimen` writes, so
  a derived system shows it in light and dark before any screen is built.
- **`skills/neus-design/references/frameworks.md`.** Only when it needs something
  framework-specific, such as hydration in an Astro island because it holds state.

No change is needed for `neus context`, `neus docs`, `neus lint`'s token and class checks or
`neus design build`. They read the catalog, the guides and the published CSS. A derived
system may override the new `slider` family in its `x-neus.recipes`; families are optional
there.

A public-page section (a pricing table, an FAQ) follows the same steps with these
differences: it lives in `src/sections/<Name>/`, uses the `sections` recipe family, has its
guide in `docs/sections/`, and is exported from `neus-ui/sections`.

## 6. Verify

```bash
pnpm lint
pnpm design:check
pnpm test:unit              # unit, server rendering, CLI, generator
pnpm test:design-systems    # browser suites in all six systems
pnpm build
uvx --from skills-ref agentskills validate skills/neus-design
uvx --from skills-ref agentskills validate skills/neus-audit
```

Then try it the way a consumer would: run `pnpm build && pnpm pack`, install the tarball in
a fresh Vite project and run `npx neus init`. Ask `/neus-design` for a screen that needs the
component, for example the energy calculator in the [examples](../examples/README.md).
Check that the agent picks the Slider instead of writing `<input type="range">`, that
`npx neus lint` reports no P0, and that `npx neus shot /` shows it correctly at 1440 and
390 px.

## Checklist

- [ ] Stylesheet reads only `--slider-*` tokens and shared roles; runtime properties listed in the token test
- [ ] Neus baseline in `x-neus.recipes.slider`; the family declared in all six DESIGN.md files, with sourced overrides
- [ ] `RECIPE_NAMES` and `ADAPTED_COMPONENTS` updated; `pnpm design:generate` run and generated files committed
- [ ] DESIGN.md prose describes the component in each system
- [ ] One story with every prop and a design-system control; unit tests; a browser suite for six systems in light and dark
- [ ] Guide in `docs/components/` with a complete anatomy and token tables; a catalog row
- [ ] Need-table row in `SKILL.md`; `customization.md`, `patterns.md` and `neus-rules.md` updated
- [ ] Lint raw-element hint and specimen updated where they apply
- [ ] Counts, `AGENTS.md` inventory and `BACKLOG.md` updated
- [ ] Every verification command passes; tried in a packed install with `/neus-design`
