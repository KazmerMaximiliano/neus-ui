# Design with AI

[Getting started](./README.md) · [Documentation](../README.md)

Neus UI ships the knowledge an AI coding agent needs to design with it: the six DESIGN.md
specifications, the component guides, a design skill, an audit skill and a review
subagent. `npx neus init` installs them in your project for Claude Code and Codex, so
`/neus-design` in Claude Code, or `$neus-design` in the Codex CLI, designs screens with your
system, your components and your tokens.

## Set up

```bash
npm install neus-ui
npx neus init
```

`neus init` detects the framework and how it renders, then asks, with arrow-key choices
(↑/↓ to move, Enter to confirm, Ctrl+C to cancel without writing anything):

1. **Design system**: one of the six, or **None** to let the agent derive one for the project.
2. **Color scheme**: light or dark.
3. **Action colors**: keep the system's (the `neus-design` skill can choose a brand later), or
   type primary, success, error, info and warning.
4. **Language** of user-facing copy.
5. **Agents**: Claude Code, Codex or both.

`npx neus init --yes` accepts the defaults; flags such as `--system carbon` or
`--primary "#0f766e"` set values directly. Run `npx neus init --help` for all of them. Run
it again at any time to change the system or colors: it rewrites the managed files, keeps
yours and updates the `data-design-system` / `data-color-scheme` values it finds in the
root layout.

## What it writes

| File | Owner | Purpose |
| --- | --- | --- |
| `neus.config.json` | `neus init` | Framework, rendering mode, system, derived system, scheme, colors, brand, language, agents and paths |
| `<styles>/neus.theme.css` | `neus init` | Custom action colors as static CSS (server-rendered hosts) |
| `src/neus/neus.theme.ts` + `NeusRoot.tsx` | `neus init` / you | Global ThemeProvider values and root (client-only hosts) |
| `<styles>/neus.overrides.css` | You | Project-wide token overrides, including the brand's ground, ink and faces |
| `<styles>/neus.system.css` | `neus design build` | None mode: the derived system, compiled from `design/system/DESIGN.md` |
| `src/layouts/NeusLayout.astro` | You | Astro layout with theme attributes, fonts and stylesheets |
| `.claude/skills/neus-design`, `.claude/skills/neus-audit` | `neus init` | Skills for Claude Code |
| `.agents/skills/neus-design`, `.agents/skills/neus-audit` | `neus init` | The same skills for Codex |
| `.claude/agents/neus-reviewer.md`, `.codex/agents/neus-reviewer.toml` | `neus init` | Fresh-eyes review subagent |
| `AGENTS.md` block, `CLAUDE.md` | `neus init` (block only) | Points every agent session to the skills |

Managed files are copies, not symlinks, and are replaced on every run: keep project rules
in `AGENTS.md` outside the `neus-ui` markers. Commit all of them.

## How a design session runs

The `neus-design` skill runs in the main conversation, where it can ask and iterate. It
works in full mode for new public pages, new products and multi-screen flows, and in quick
mode for one screen, a widget or a change: quick mode skips the spec file, the audit and the
reviewer, and keeps the brand question, `neus lint` and the screenshots.

1. **Contract.** Runs `npx neus context` (the active system, key tokens, catalog,
   which component answers which need and, when an `.env` file has a Pixabay key, the
   expression that turns on MediaPlaceholder photo previews) and `npx neus docs <Name>` for each component it
   will use.
2. **One round of questions** for every new page, screen or product: the brand when it was
   never decided (two or three directions built for the subject, or the system as it is),
   the composition of a public page, pictures and missing facts. The chosen brand is applied
   with `npx neus init --primary <hex> --brand "..."` and a block of ground, ink and font
   tokens in `neus.overrides.css`, and recorded in `neus.config.json`.
3. **System derivation**, in None mode only (below).
4. **Spec.** Writes `design/specs/<slug>.md`, so another session, in Claude Code or Codex,
   continues in the same direction.
5. **Build.** Composes Neus components, choosing the lowest step of the customization
   ladder: props, palette, tokens, part classes, part styles.
6. **Verify.** Runs `neus lint` and the `neus-audit` skill, looks at the render with `neus shot` (up to
   three rounds of screenshots and fixes), then asks the `neus-reviewer` subagent for an
   independent review of new pages and flows.

## Screenshots: `neus shot`

```bash
npx neus shot /                       # starts the dev script if needed
npx neus shot / /pricing --widths 1440,768,390
npx neus shot / --url http://localhost:3000 --json
npx neus shot --stop                  # stops the server neus shot started
```

`neus shot` captures every route full page at each width into `.neus/shots/<route>-<width>.png`
and reports horizontal scroll, content cut off by `overflow: hidden`, FormTemplate rows with fields of uneven height, console errors, the body text size, fonts that did
not load, solid buttons per viewport and the active system, scheme and primary color. Without
`--url` it runs the project's `dev` script, reads the URL it prints and leaves it running for
the next round. `.neus/` ignores itself in git.

It uses an installed Chrome, Edge or Chromium (or `--browser <path>`) through
`playwright-core`, an optional dependency of neus-ui, and never downloads a browser. When it
finds none it exits with code 2, and the skill says so instead of claiming it reviewed the
render.

## Context, guides and lint

```bash
npx neus context                      # system, key tokens, catalog, need → component
npx neus context --for page           # adds the system's guidance for public pages
npx neus docs Button                  # usage, behavior, props and parts of one guide
npx neus docs Button --full           # the whole guide, with its CSS tokens
npx neus lint                         # src, app, pages and components
npx neus lint src/pages --json
```

`neus context` and `neus docs` read the DESIGN.md and guides shipped in the package, or the
project's derived system, so they always match the installed version. `neus lint` checks
the code against the contract with per-line patterns, no type checker needed. P0 findings
are unknown tokens, raw colors outside `neus.overrides.css`, hand-written palette
variables, inline colors on interactive components, private neus classes, `!important`,
deep imports and theme owners the rendering mode does not allow. P1 findings are raw
elements a neus component replaces (headings, paragraphs, sections, lists, buttons, fields,
links), filler copy, emoji and selectors on third-party internals. It also reports
component coverage: neus component tags over neus tags plus those raw elements. It exits
with 1 when it finds a P0.

## Quality layers

| Layer | What it does |
| --- | --- |
| Taste | Product-screen rules against the generated look (card-in-card layouts, invented KPI tiles, gradient chrome, filler copy) and, for public pages, substance rules (Heading display, 16px Text, Section bands at the system's width, an anchor per section) and a sample-content policy, adapted from taste-skill (MIT) and Open Design (Apache 2.0); see [third-party notices](../../THIRD_PARTY_NOTICES.md) |
| Brand | Two or three brand directions built for the subject (action color, ground, display face, button case), offered as a question with the system as it is; applied through `neus init` and `neus.overrides.css` |
| Directions | `scripts/deal-directions.mjs` deals the hero, features, testimonials and call-to-action layouts of a public page; in None mode it also deals palette, type pairing, shape, density and elevation for the derived system |
| Inspiration | An index of the VoltAgent/awesome-design-md analyses; the agent takes concepts, never identities |
| Audit | Type checks, `neus lint`, the Vercel Web Interface Guidelines and the design contract, reported as `file:line` with P0/P1/P2 |
| Review | The `neus-reviewer` subagent judges the result against the spec without the conversation that produced it |

## None: a system of your own

Choosing None leaves `derivedSystem: "design/system/DESIGN.md"` in the configuration. On
its first run the skill picks the closest built-in system as the base, gathers one to three
references, deals three directions, asks you to choose, and writes the derived system:

- `design/system/DESIGN.md` in Google's DESIGN.md format, validated with
  `npx @google/design.md lint`, with an `x-neus` block that names the base (`extends`) and
  overrides its tokens and component recipes;
- the base and palette through `npx neus init --base <id> --primary …`;
- `npx neus design build`, which validates that block and compiles it into
  `<styles>/neus.system.css`, scoped to the base system's attribute so it applies at the root
  and in every local provider.

It then runs `npx neus specimen`, which writes a page with the type scale, palette, buttons
beside fields, fields, alerts, cards and section tones in light and dark, looks at it with
`neus shot` and iterates with you before designing screens.

```bash
npx neus design build    # design/system/DESIGN.md → <styles>/neus.system.css
npx neus specimen        # writes the specimen page and prints its route
npx neus shot /neus-specimen.html
```

Load `neus.system.css` after `neus-ui/dist/neus-ui.css` and before `neus.theme.css`. The
document attribute keeps the base system's id, so one derived system per project replaces
its base everywhere.

[Frameworks](./frameworks.md) · [Customization](../design/customization.md) ·
[Design systems](../design/systems.md)
