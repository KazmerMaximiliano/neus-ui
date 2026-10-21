# Contributing

[Documentation](../README.md) · [Agent instructions](../../AGENTS.md) ·
[How to contribute](../../CONTRIBUTING.md)

| Guide | Contents |
| --- | --- |
| [Development](./development.md) | Setup, commands, component structure and code conventions |
| [Testing](./testing.md) | Unit, browser and Storybook checks, coverage and types |
| [Authoring design systems](./design-system-authoring.md) | DESIGN.md schema, generated artifacts, recipes and validation |
| [Adding a component](./adding-a-component.md) | A new component end to end: tokens in six systems, tests, guide, skills, lint and specimen |
| [Releasing](./releasing.md) | Versioning policy, changelog, npm publishing and licensing |

To add a component, follow [Adding a component](./adding-a-component.md): it is finished
only when all six design systems style it and the AI design kit knows it. When changing a
public component, keep its types, implementation, single story, tests, reference guide and
skills synchronized. Document each new style/class destination and update token
inventories when the recipe contract changes. New components and sections must appear in the
[catalog](../components/README.md), root overview and AGENTS.md inventory. See
[customization conventions](../design/customization.md).
