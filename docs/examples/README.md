# Examples

[Documentation](../README.md) · [Design with AI](../getting-started/ai-design.md)

Five briefs used to build and check the `neus-design` skill, with the pages it produced.
Each brief was run twice in a fresh Vite project: once on a built-in design system with a
brand chosen during the session, and once in None mode, where the skill derived a design
system for the project. The questions the skill asked were answered as a designer would
(the brand direction it recommended, placeholders for photos, no invented facts).

| Example | Surface | Built-in system with a brand | Derived system (None mode) |
| --- | --- | --- | --- |
| [AuraFlow landing](./auraflow-landing/README.md) | Public page | Neus with the brand *Salvia y papel* | Derived system *AuraFlow Sand* on Neus |
| [Social media dashboard](./social-dashboard/README.md) | App screen | Neus with the brand *Esmeralda analítico* | Derived system *Bento tonal* on Neus |
| [Home energy savings calculator](./energy-widget/README.md) | App widget | Neus with the brand *Hogar cálido* | Derived system *Musgo* on Apple |
| [Jornadas Frontend Córdoba 2027](./conference-landing/README.md) | Public page | Neus with the brand *Ladrillo de la Docta* | Derived system *Programa* on Vercel |
| [Veterinaria Los Aromos](./vet-clinic-page/README.md) | Public page | Neus with the brand *Aromo y monte* | Derived system *Los Aromos* on Neus |

## Run a brief yourself

1. Create a project and install the library:

   ```bash
   pnpm create vite my-page --template react-ts
   cd my-page
   pnpm add git+https://github.com/KazmerMaximiliano/neus-ui.git
   ```

2. Set it up. Choose a design system for the first variant, or None for the second:

   ```bash
   npx neus init
   ```

   Wire the stylesheets, `NeusRoot` and the font link it prints, or let the skill do it.

3. Open Claude Code (`/neus-design`) or the Codex CLI (`$neus-design`) in the project and paste
   the brief exactly as written, with no extra instructions. Answer the skill's questions;
   its recommended option is first in every list.

4. When it delivers, check the result:

   ```bash
   npx neus lint          # contract breaks, raw elements, component coverage
   npx neus shot /        # screenshots at 1440 and 390 px in .neus/shots/
   ```

   Compare the screenshots with the reference pages here. Your page will differ: the skill
   builds each brand and composition for the brief, and the questions change the result.

## About the reference code

Each variant folder holds the files the session wrote, as it wrote them: the page, the theme
and root files `neus init` created, the overrides or derived system, and the spec. Example
content the brief did not give (testimonials, names, team members) is marked `SAMPLE:` in the
code. To run one, copy its `src/`, `index.html`, `neus.config.json` and `design/` into a Vite
project with neus-ui and `lucide-react` installed, then start the dev server.

The screenshots were taken with `neus shot` conditions (full page, 1440 and 390 px wide) on the
library version in this repository. These folders are documentation only: they are not part of
the npm package and are not linted with the library code.
