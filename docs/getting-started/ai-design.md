# Design with AI

[Getting started](./README.md) · [Documentation](../README.md)

Neus UI ships the knowledge an AI coding agent needs to design with it: the six DESIGN.md
specifications, the component guides, a design skill, an audit skill and a review
subagent. `npx neus init` installs them in your project for Claude Code and Codex, so
`/neus-design` (Claude Code) or `$neus-design` (Codex) designs screens from the terminal
with your system, your components and your tokens.

## Set up

```bash
pnpm add git+https://github.com/KazmerMaximiliano/neus-ui.git
npx neus init
```

`neus init` detects the framework and how it renders, then asks for:

1. **Design system**: one of the six, or **None** to let the agent derive one for the project.
2. **Color scheme**: light or dark.
3. **Action colors**: keep the system's, or choose primary, success, error and info.
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
| `neus.config.json` | `neus init` | Framework, rendering mode, system, scheme, colors, language, agents and paths |
| `<styles>/neus.theme.css` | `neus init` | Custom action colors as static CSS (server-rendered hosts) |
| `src/neus/neus.theme.ts` + `NeusRoot.tsx` | `neus init` / you | Global ThemeProvider values and root (client-only hosts) |
| `<styles>/neus.overrides.css` | You | Project-wide token overrides |
| `src/layouts/NeusLayout.astro` | You | Astro layout with theme attributes, fonts and stylesheets |
| `.claude/skills/neus-design`, `.claude/skills/neus-audit` | `neus init` | Skills for Claude Code |
| `.agents/skills/neus-design`, `.agents/skills/neus-audit` | `neus init` | The same skills for Codex |
| `.claude/agents/neus-reviewer.md`, `.codex/agents/neus-reviewer.toml` | `neus init` | Fresh-eyes review subagent |
| `AGENTS.md` block, `CLAUDE.md` | `neus init` (block only) | Points every agent session to the skills |

Managed files are copies, not symlinks, and are replaced on every run: keep project rules
in `AGENTS.md` outside the `neus-ui` markers. Commit all of them.

## How a design session runs

The `neus-design` skill runs in the main conversation, where it can ask and iterate:

1. **Contract.** Reads `neus.config.json`, the active DESIGN.md and the guides of the
   components it will use, from `node_modules/neus-ui`.
2. **One round of questions**, only when the brief leaves something open.
3. **System derivation**, in None mode only (below).
4. **Spec.** Writes `design/specs/<slug>.md`, so another session, in Claude Code or Codex,
   continues in the same direction.
5. **Build.** Composes Neus components, choosing the lowest step of the customization
   ladder: props, palette, tokens, part classes, part styles.
6. **Verify.** Runs the `neus-audit` skill, looks at the render with `neus shot` (up to
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
and reports horizontal scroll, console errors, the smallest running-text size, fonts that did
not load, solid buttons per viewport and the active system, scheme and primary color. Without
`--url` it runs the project's `dev` script, reads the URL it prints and leaves it running for
the next round. `.neus/` ignores itself in git.

It uses an installed Chrome, Edge or Chromium (or `--browser <path>`) through
`playwright-core`, an optional dependency of neus-ui, and never downloads a browser. When it
finds none it exits with code 2, and the skill says so instead of claiming it reviewed the
render.

## Quality layers

| Layer | What it does |
| --- | --- |
| Taste | Product-screen rules against the generated look (card-in-card layouts, invented KPI tiles, gradient chrome, filler copy) and, for public pages, substance rules (display headline, 16px text, wide container, an anchor per section) and a sample-content policy, adapted from taste-skill and Open Design |
| Directions | `scripts/deal-directions.mjs` deals palette, type pairing, shape, density, elevation, a signature move and, for public pages, the hero, features, testimonials and call-to-action layouts. With a locked system it deals only the composition, so the system's palette and type stay intact |
| Inspiration | An index of the VoltAgent/awesome-design-md analyses; the agent takes concepts, never identities |
| Audit | Type checks, deterministic searches, the Vercel Web Interface Guidelines and the design contract, reported as `file:line` with P0/P1/P2 |
| Review | The `neus-reviewer` subagent judges the result against the spec without the conversation that produced it |

## None: a system of your own

Choosing None leaves `derivedSystem: "design/system/DESIGN.md"` in the configuration. On
its first run the skill picks the closest built-in system as the base, gathers one to three
references, deals three directions, asks you to choose, and writes the derived system:

- `design/system/DESIGN.md` in Google's DESIGN.md format, validated with
  `npx @google/design.md lint`;
- the base and palette through `npx neus init --base <id> --primary …`;
- every other change as tokens in `neus.overrides.css`.

It then builds a specimen route and iterates with you before designing screens.

[Frameworks](./frameworks.md) · [Customization](../design/customization.md) ·
[Design systems](../design/systems.md)
