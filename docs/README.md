# Neus UI documentation

Neus UI is a React component library with TypeScript, CSS variable theming,
reusable components, and application templates.

The main guides are Markdown files in this directory; individual design
specifications live beside their recipes under `src/design-systems/`. Read them
directly in GitHub or a Markdown editor; no server or build step is required.

## Getting started

1. [Introduction](./introduction.md): project overview and first component.
2. [Installation](./installation.md): install the package, import styles, and set up the provider.
3. [Components](./components.md): component and template catalog, imports, and interactive examples.

## Guides and reference

| Guide | Contents |
| --- | --- |
| [Theming](./theming.md) | ThemeProvider, light/dark modes, scopes, hooks, and runtime color changes |
| [Design system](./design-system.md) | Color tokens, typography, spacing, and component styling conventions |
| [Design systems and specifications](./design-systems.md) | Six DESIGN.md sources: visual identity, YAML tokens, generated recipes, validation and references |
| [Input](./components/Input.md) | Props, accessibility, CSS tokens, six recipes and per-part customization |
| [Card composition](./components/Card.md) | Card, Header, Media, Content and Footer props, themes and examples |
| [Sidebar](./components/Sidebar.md) | Responsive navigation, transparent curves, six recipes and AppTemplate integration |
| [Development](./development.md) | Repository commands, component/subcomponent layout, code style, and documentation maintenance |
| [Testing](./testing.md) | Unit tests, browser tests, coverage, and Storybook type checking |
| [AppTemplate](./templates/AppTemplate.md) | Application shell, responsive navigation and layout customization |
| [FormTemplate](./templates/FormTemplate.md) | Form layout, columns and action customization |

## Interactive component catalog

Run Storybook locally to explore component states and prop controls:

```bash
pnpm install
pnpm storybook
```

See [Components](./components.md#storybook) for more details.

[Back to the project overview](../README.md)
