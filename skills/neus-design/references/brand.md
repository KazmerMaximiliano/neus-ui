# Brand

The design system (`designSystem` in `neus.config.json`) fixes how components
are built: their shape, density, elevation, spacing and states. The brand
belongs to the project: the action color, the ground and ink of the page, the
display face and the case of button labels. `brand` in `neus.config.json`
records it:

- `null`: never decided. Ask (Phase 1) before the first page, screen or
  product.
- `"system"`: the user keeps the system's own identity. Do not ask again.
- Any other text: the chosen direction. Keep it; never re-ask. Changing it is
  an explicit request from the user, and then you follow this reference again.

## Build two or three directions

Start from the subject inventory (taste.md, step 1): the place, the materials,
the audience, the era, what the category usually looks like. Each direction
must fit this subject and not its nearest competitor. Avoid the category's
reflex (blue for health and finance, purple gradients for AI, black and neon
for developer tools) unless the inventory gives a reason for it.

Each direction states:

- **Name** in two or three words and the reason it fits, in one line.
- **Action color**: one hex. neus picks white or black text for it; choose a
  color that also reads as a fill on the ground in dark mode (no near-black,
  no pastel).
- **Ground and ink**, light and dark: cool white, warm off-white, cream or
  paper, or the system's own.
- **Display face**: an open-license family (Google Fonts or Fontsource), or the
  system's. The body face stays the system's unless the direction needs
  another.
- **Button labels**: the system's treatment or natural case.

`<this skill>/assets/directions.json` holds curated palettes (`palettes`) and
type pairings (`typePairings`). Use them as a vocabulary: start from the entry
closest to the subject and adjust it. Never deal one at random.

Make the directions differ from each other in hue family, ground and display
face, so the choice means something. Recommend the most specific one. Always
add "Keep <system> as it is" as the last option.

## Apply the chosen direction

1. Record it and set the action color:

   ```sh
   npx neus init --yes --primary <#hex> --brand "<Name>: <action color, ground, display face>"
   ```

   With "Keep <system> as it is": `npx neus init --yes --brand system`.
   `neus init` rewrites the palette file (`src/neus/neus.theme.ts` or
   `<styles>/neus.theme.css`); never write palette variables yourself.
2. Write the ground, ink, faces and button case in `<styles>/neus.overrides.css`.
   Use the selectors below, without `:root`, so the brand also reaches local
   ThemeProvider boundaries (replace `:root[...]` selectors already in the
   file). Only these tokens; every color you set in the light block is set in
   the dark block too:

   | Token | Role |
   | --- | --- |
   | `--color-surface`, `--color-surface-secondary` | Page ground; raised bands and subtle sections |
   | `--color-text-primary`, `--color-text-secondary` | Ink and supporting text: 4.5:1 or more on both grounds |
   | `--color-border-subtle`, `--color-border-input`, `--color-border-muted` | Dividers, card and field borders |
   | `--font-display`, `--font-body` | Faces; the stack ends in the system's family and `sans-serif` or `serif` |
   | `--button-label-transform`, `--button-label-spacing` | `none` and `0` for natural-case labels |

   ```css
   /* Brand: Forest and cream (neus.config.json). */
   [data-design-system="neus"] {
     --color-surface: #fbf7ef;
     --color-surface-secondary: #f2eadb;
     --color-text-primary: #2a241c;
     --color-text-secondary: #5c5346;
     --color-border-subtle: #e4dacb;
     --color-border-input: #d3c6b1;
     --font-display: "Fraunces", "Manrope", serif;
     --button-label-transform: none;
     --button-label-spacing: 0;
   }

   [data-design-system="neus"][data-color-scheme="dark"] {
     --color-surface: #1b1a16;
     --color-surface-secondary: #25231e;
     --color-text-primary: #efe9dd;
     --color-text-secondary: #b8ae9d;
     --color-border-subtle: #3a362e;
     --color-border-input: #4a453b;
   }
   ```

3. Load the display face once in the root document, next to the system's font
   link (`index.html`, the root layout or `NeusLayout.astro`).
4. Record the direction in the spec: Level 1 (action color) and Level 2 (the
   override block).

Never change radius, spacing, density, elevation or component recipes as part
of a brand: they are the system. The action color is the same in both color
schemes. For bands of strong color use `Section tone="brand"` (the action
color) or `tone="inverse"` (the ink), not new surface colors.
