# Deriving a design system ("None" mode)

Use this when `neus.config.json` has a `derivedSystem` path that does not
exist yet (the user chose None at init), or when the user asks for a look
none of the six systems gives. You build a new system on top of the closest
built-in one and iterate on it until it is the project's own. Screens come
after the system is approved.

A derived system is three things, kept in sync:

| Part | File | Owns |
| --- | --- | --- |
| Specification | `design/system/DESIGN.md` | Identity, tokens, do's and don'ts (Google DESIGN.md format) |
| Base and palette | `neus.config.json` (`designSystem`, `colors`) | The built-in system it extends and the four action colors |
| Tokens | `<styles>/neus.overrides.css` | Every other change, as neus token values |

## 1. Read the brief as traits

Write one line each: domain, audience, how often they use it, information
density, tone (calm, technical, playful, luxury, editorial, bold), light or
dark first, and any brand material that already exists (logo, colors,
typefaces). Brand material always wins over anything you invent.

## 2. Choose the base

| Base | Starting character | Fits | Weak fit |
| --- | --- | --- | --- |
| `neus` | Approachable, Manrope, pill controls, curved sidebar | Forms, internal tools, friendly SaaS | Dense data, luxury |
| `apple` | Content first, soft corners, sober opaque surfaces | Consumer apps, reading, settings | Data-dense admin |
| `carbon` | Square geometry, precise alignment, purposeful color | Enterprise, operations, finance, data-heavy | Playful consumer |
| `material` | Tonal surfaces, semantic color pairs, rounded shapes | Broad consumer and productivity | Editorial, luxury |
| `neobrutalism` | Thick borders, hard offset shadows, bright flat accents | Creative tools, youth, events, games | Enterprise, health |
| `vercel` | Neutral surfaces, compact controls, small radii | Developer tools, technical settings, data workflows | Warm consumer |

Read the base's `node_modules/neus-ui/src/design-systems/<base>/DESIGN.md`
and state your choice in one sentence with the reason.

## 3. Gather inspiration

Follow [inspiration.md](inspiration.md): one to three references that match
the traits, reduced to concepts you can express with neus tokens.

## 4. Deal directions, then choose

Asked to invent, a model picks the category default. Do not invent the
direction yourself:

```sh
node <this skill>/scripts/deal-directions.mjs --options 3
```

Each dealt direction combines a palette family, a type pairing, a shape
scale, a density, an elevation style and one signature move. Hold each
against the traits and the inspiration concepts, then present the three to
the user in one question, with your recommendation first. If nobody
answers, take your recommendation and say so. Redeal one ingredient
(`--seed <n>` for a new draw) only for a reason you can state, such as a
conflict with brand material.

## 5. Write the derived DESIGN.md

Create `design/system/DESIGN.md` in Google's DESIGN.md format, the format of
the built-in systems (`npx @google/design.md spec` prints it): YAML front
matter with `version: alpha`, `name`, `description`, `colors`,
`typography`, `rounded`, `spacing` and `components`, then the eight
sections in order: Overview, Colors, Typography, Layout, Elevation & Depth,
Shapes, Components, Do's and Don'ts.

- The Overview names the base ("Extends carbon") and the signature move,
  and records inspiration provenance.
- The derived system must differ from its base in palette **and**
  typography **and** at least one of shape scale, elevation style or
  density. If it only changes the primary color, it is not a new system:
  keep the base and change the palette with `npx neus init`.
- Do's and Don'ts list which taste-rule devices this system allows.
- Fonts must be loadable: an open license or the project's own files.

Validate it:

```sh
npx @google/design.md lint design/system/DESIGN.md
```

Fix every error. Warnings are acceptable when you can say why.

## 6. Translate to the project

1. Palette: `npx neus init --yes --system <base> --primary "#…"` (also
   `--success`, `--error`, `--info` when the system defines them). This
   regenerates the theme file.
2. Tokens: write the rest in `<styles>/neus.overrides.css`, under
   `:root[data-design-system="<base>"]` (light and shared values) and
   `:root[data-design-system="<base>"][data-color-scheme="dark"]`. Use only
   token names from the component guides and `docs/design/tokens.md`: the
   `--font-*` and `--type-*` roles, `--radius-*` and recipe radii,
   `--space-*`, `--elevation-*`, surfaces and text roles. Start each block
   with `/* Derived system: design/system/DESIGN.md */`.
3. Fonts: load the new faces as frameworks.md describes.

## 7. Show and iterate

Build a specimen route (for example `/neus-specimen`) from the skeletons in
[patterns.md](patterns.md): an app shell, a form, a data list, a dialog,
buttons in every variant, badges and cards, in light and dark. Ask the user
to open it. With a dev server running, take one round of screenshots (see
neus-audit) and fix contrast or overflow in the tokens, not in component
CSS. Iterate until the user approves, then record the system in the feature
spec and move on to screens.

## Limits

A derived system changes tokens and the palette. It cannot change a
component's structure or behavior. When a direction depends on something
the library lacks, say so and propose the closest composition. When the
DESIGN.md and `neus.overrides.css` disagree, the DESIGN.md is the intent:
fix the CSS.
