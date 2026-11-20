## Component roadmap

The following public component families are pending development. This proposed backlog
targets broad coverage of application interfaces and the public pages around them;
completeness depends on the products using the library. Priorities indicate a suggested
implementation order, without release commitments: **P1** for core interactions and page
foundations, **P2** for broader composition, and **P3** for advanced navigation.

Some behaviors already exist inside other components. Those rows describe the missing
reusable public API and should reuse the existing implementation where appropriate.

| Priority | Component family           | Category     | Intended scope and current gap                                                                                                            |
| -------- | -------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| P2       | Chip / Tag                 | Data display | Standalone removable or selectable tokens; MultiSelect currently owns its selected tags, while Badge displays status.                     |
| P2       | Separator                  | Layout       | Horizontal or vertical dividers with decorative and semantic modes.                                                                       |
| P2       | EmptyState                 | Feedback     | Reusable empty views with a title, description, illustration and actions; DataTable has its own empty view.                               |
| P2       | List / ListItem            | Data display | Structured static content with leading/trailing elements and descriptions, separate from action menus.                                    |
| P3       | TreeView / TreeItem        | Navigation   | Hierarchical expansion and selection with roving focus and keyboard navigation.                                                           |
| P3       | CommandPalette             | Navigation   | Searchable commands with shortcuts, grouping, keyboard selection and empty/loading states.                                                |
| P3       | NavigationMenu             | Navigation   | Horizontal or nested application navigation with active links and responsive overflow, complementing Sidebar.                             |

Each family must include recipes for all six design systems and both color modes,
accessible interactions, responsive behavior where applicable, per-part customization,
typed exports, one interactive story per public component, tests and documentation.
Update this table and the [component catalog](./docs/components/README.md) when a family
becomes available. Domain-specific additions such as charts, rich text editors or media
players should be scoped separately when a product needs them.
