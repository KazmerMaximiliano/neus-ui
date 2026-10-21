# Neus UI

A React 19+ component library with TypeScript: 40 components (counting public subcomponents
such as CardHeader), nine page sections for public pages (`neus-ui/sections`), two layout
templates, and six design systems driven by scoped CSS tokens.

## Get started

```bash
pnpm add git+https://github.com/KazmerMaximiliano/neus-ui.git
```

```tsx
import { Button, ThemeProvider } from "neus-ui";
import "neus-ui/dist/neus-ui.css";

export const App = () => (
  <ThemeProvider designSystem="carbon" initialColorScheme="light">
    <Button label="Get started" variant="solid" />
  </ThemeProvider>
);
```

Select Neus UI, Apple, Carbon, Material, Neobrutalism or Vercel through ThemeProvider.
Customize action colors at runtime, override CSS tokens for shared appearance, or target
individual parts with classes and style props.

### Design with AI

```bash
npx neus init
```

`neus init` asks for a design system (or None, to derive your own), the color scheme, the
action colors, the language and your coding agents. It writes the theme files for Vite,
Next.js or Astro and installs the `neus-design` and `neus-audit` skills plus a
`neus-reviewer` subagent. Then design from Claude Code with `/neus-design`, or from the Codex
CLI with `$neus-design`. The skill asks about the brand, the composition and pictures before
building, and checks its work with the commands below.

| Command | Purpose |
| --- | --- |
| `npx neus init` | Set up or change the system, palette, theme files, skills and subagent |
| `npx neus context` · `npx neus docs <Name>` | The active system, catalog and rules; one component's guide |
| `npx neus lint` | Contract breaks (P0), raw elements a component replaces, component coverage |
| `npx neus shot <route>` | Screenshots at 1440 and 390 px with the problems measured |
| `npx neus design build` · `npx neus specimen` | None mode: compile the derived system; preview it |

## Documentation

**[Open the documentation](./docs/README.md)**

| Guide                                                  | Contents                                                                        |
| ------------------------------------------------------ | ------------------------------------------------------------------------------- |
| [Installation](./docs/getting-started/installation.md) | Package, stylesheet, provider and TypeScript setup                              |
| [Frameworks](./docs/getting-started/frameworks.md)     | Vite, Next.js, Astro, server rendering, fonts and the `neus-ui/theme` entry     |
| [Design with AI](./docs/getting-started/ai-design.md)  | `neus init`, design and audit skills, review subagent and None mode             |
| [Design systems](./docs/design/systems.md)             | Six systems, scope behavior and visual specifications                           |
| [ThemeProvider](./docs/design/theme-provider.md)       | Color modes, runtime palette updates, hooks and isolated scopes                 |
| [Customization](./docs/design/customization.md)        | Tokens, root/part classes, style props and CSS cascade                          |
| [Components](./docs/components/README.md)              | All 40 public components/sections, complete props, anatomy and token references |
| [Sections](./docs/sections/README.md)                  | `neus-ui/sections`: header, hero, features, testimonials, call to action and footer for public pages |
| [Templates](./docs/templates/README.md)                | AppTemplate and FormTemplate composition and responsive layouts                 |
| [Examples](./docs/examples/README.md)                  | Five briefs to try the design skill, with the pages it produced and their code |
| [Contributing](./docs/contributing/README.md)          | Development, testing and DESIGN.md authoring                                    |

Documentation is plain Markdown and needs no server. Storybook provides the interactive
catalog; both template stories include local design selection and inherit the global system
by default.

## Development

```bash
pnpm install
pnpm storybook
pnpm lint
pnpm test:unit
pnpm build
```

Use the pnpm version in package.json. To add a component, follow [Adding a
component](./docs/contributing/adding-a-component.md): tokens in all six design systems,
tests, the guide, and the skills, lint and specimen of the AI design kit.
[Development](./docs/contributing/development.md) explains file conventions and commands; [Testing](./docs/contributing/testing.md) covers
browser checks and coverage. Agent instructions live in [AGENTS.md](./AGENTS.md).

Source families live in src/components, layouts in src/templates, and scoped
recipes/specifications in src/design-systems. The `neus` CLI lives in cli/, and the agent
skills and subagents it installs in skills/ and agents/. Subcomponents live under their owning
family's components directory and page sections in src/sections. Public imports are named
exports from `neus-ui` and `neus-ui/sections`.

## Links and license

[Storybook](https://kazmermaximiliano.github.io/neus-ui/storybook/) ·
[Repository](https://github.com/KazmerMaximiliano/neus-ui) · [Apache License 2.0](./LICENSE)

Copyright 2026 Maximiliano Kazmer
