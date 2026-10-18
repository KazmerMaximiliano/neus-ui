# Neus UI documentation

Neus UI provides 36 public React components and sections, two layout templates, and six
design systems driven by scoped CSS tokens. These guides are Markdown; read them in GitHub
or an editor without starting a server.

## Start building

1. [Introduction](./getting-started/introduction.md): capabilities and mental model.
2. [Installation](./getting-started/installation.md): package, stylesheet and provider.
3. [Frameworks](./getting-started/frameworks.md): Vite, Next.js, Astro and server rendering.
4. [Design with AI](./getting-started/ai-design.md): `neus init`, skills and review for Claude Code and Codex.
5. [Design systems](./design/systems.md): select a system and explore its recipes.
6. [ThemeProvider](./design/theme-provider.md): modes, colors, runtime updates and scopes.
7. [Customization](./design/customization.md): tokens, classes and styles by part.

## Reference

| Reference | Contents |
| --- | --- |
| [Components](./components/README.md) | All 36 components/sections, props, anatomy, states and complete token inventories |
| [Templates](./templates/README.md) | AppTemplate and FormTemplate composition, responsive behavior and styling |
| [CSS tokens](./design/tokens.md) | Shared foundations, semantic roles and runtime palette variables |
| [Design guide index](./design/README.md) | Consumer theming and customization guides |

## Maintain the library

[Contributor index](./contributing/README.md) links development conventions, testing and
design-system authoring. Visual specifications remain in each system's `DESIGN.md`; the
[systems guide](./design/systems.md) indexes all six.

Run `pnpm storybook` for interactive examples and prop controls. Both templates include a
local design selector that inherits the toolbar selection by default.

[Project overview](../README.md) · [Agent instructions](../AGENTS.md)
