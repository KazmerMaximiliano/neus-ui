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
| Base and palette | `neus.config.json` (`designSystem`, `colors`) | The built-in system it extends and the action colors |
| Compiled tokens | `<styles>/neus.system.css` | Generated from the DESIGN.md's `x-neus` block by `npx neus design build` |

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

1. Base and palette: `npx neus init --yes --base <base> --primary "#…"` (also
   `--success`, `--error`, `--info`, `--warning` when the direction needs
   them). It keeps None mode, records the base and regenerates the palette
   file. Never write palette variables anywhere else.
2. Tokens: add an `x-neus` block to the front matter of
   `design/system/DESIGN.md` with `extends: <base>` and the overrides, using
   only token names from the component guides and `docs/design/tokens.md`.
   `tokens` holds the shared roles (`--font-*`, `--type-*`, `--radius-*`,
   `--space-*`, `--elevation-*`, surfaces and text); `recipes` holds
   component tokens by family (`button`, `input`, `card`…). Values that change
   with the color scheme (surfaces, text, borders) go under `light` and
   `dark`; the rest under `base`. Reference the document's own tokens with
   `"{colors.ground}"`.

   ```yaml
   x-neus:
     extends: neus
     tokens:
       base:
         --font-display: "{typography.display.fontFamily}"
         --radius-default: "{rounded.card}"
       light:
         --color-surface: "{colors.ground}"
       dark:
         --color-surface: "{colors.ground-dark}"
     recipes:
       button:
         base:
           --button-radius: "{rounded.control}"
           --button-label-transform: none
   ```

3. Compile it: `npx neus design build`. It validates the document (known
   tokens only, no palette, scheme-dependent tokens in light and dark) and
   writes `<styles>/neus.system.css`, scoped to the base system. Fix every
   error it reports in the DESIGN.md, never in the generated file, and run it
   again after every change to the document.
4. Wire it once: import `neus.system.css` after `neus-ui/dist/neus-ui.css`
   and before `neus.theme.css` and `neus.overrides.css` (frameworks.md);
   `neus init` printed the exact line. `neus.overrides.css` stays for
   project tweaks that are not part of the system.
5. Fonts: load the new faces as frameworks.md describes.

## 7. Show and iterate

Run `npx neus specimen`: it writes a page with the type scale, the palette and
surfaces, every button variant beside a field of each size, fields with hints
and errors, alerts, cards, avatars and the section tones, in light and dark.
Then run `npx neus shot <route it printed>`, open the screenshots and fix
contrast, overflow and fonts that did not load in the DESIGN.md, then
`npx neus design build` again. The specimen shows many solid buttons on
purpose: ignore that one count there. Ask the user to open it, iterate until
they approve, record the system in the feature spec and move on to screens.
The specimen files are generated; delete them before delivery if the user
does not want them.

## Limits

A derived system changes tokens and the palette. It cannot change a
component's structure or behavior. When a direction depends on something
the library lacks, say so and propose the closest composition. When the
DESIGN.md and the screenshots disagree, the DESIGN.md is the intent: change
it and build again. A derived system replaces its base everywhere in the
project: one derived system per project.
