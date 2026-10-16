# Neus UI

A React 19+ component library with TypeScript, 30 public components and sections, two layout
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

## Documentation

**[Open the documentation](./docs/README.md)**

| Guide | Contents |
| --- | --- |
| [Installation](./docs/getting-started/installation.md) | Package, stylesheet, provider and TypeScript setup |
| [Design systems](./docs/design/systems.md) | Six systems, scope behavior and visual specifications |
| [ThemeProvider](./docs/design/theme-provider.md) | Color modes, runtime palette updates, hooks and isolated scopes |
| [Customization](./docs/design/customization.md) | Tokens, root/part classes, style props and CSS cascade |
| [Components](./docs/components/README.md) | All 30 public components/sections, complete props, anatomy and token references |
| [Templates](./docs/templates/README.md) | AppTemplate and FormTemplate composition and responsive layouts |
| [Contributing](./docs/contributing/README.md) | Development, testing and DESIGN.md authoring |

Documentation is plain Markdown and needs no server. Storybook provides the interactive
catalog; both template stories include local design selection and inherit the global system
by default.

## Component roadmap

The following public component families are pending development. This proposed backlog
targets broad coverage of application interfaces; completeness depends on the products
using the library. Priorities indicate a suggested implementation order, without release
commitments: **P1** for core interactions, **P2** for broader composition, and **P3** for
advanced navigation.

Some behaviors already exist inside other components. Those rows describe the missing
reusable public API and should reuse the existing implementation where appropriate.

| Priority | Component family | Category | Intended scope and current gap |
| --- | --- | --- | --- |
| P1 | Textarea | Forms | Multiline text entry, optional auto-resize, labels, help text and error states. |
| P1 | RadioGroup / Radio | Forms | One choice from a visible set, with grouped labels and keyboard navigation. |
| P1 | Switch | Forms | Immediate on/off settings with an accessible checked state. |
| P1 | Combobox / Autocomplete | Forms | Editable text with suggestions, async results and optional custom values; Select currently searches predefined options. |
| P1 | Tooltip | Overlays | Reusable descriptions on hover and focus; the current tooltip belongs to WeekCalendarRow. |
| P1 | Popover | Overlays | Anchored arbitrary content with positioning, dismissal and focus handling; current popovers belong to menus and pickers. |
| P1 | Alert | Feedback | Inline informational, success, warning and error messages with optional actions. |
| P1 | Toast / ToastProvider | Feedback | Transient notifications with a queue, dismissal, configurable duration and live announcements. |
| P1 | Spinner | Feedback | Standalone indeterminate loading indicator; Button currently embeds its own loader. |
| P1 | Progress | Feedback | Determinate and indeterminate progress, accessible values and optional labels. |
| P1 | Skeleton | Feedback | Loading placeholders for text, media and component layouts. |
| P1 | Tabs | Navigation | Associated tab panels, keyboard navigation and controlled or uncontrolled selection. |
| P1 | Accordion | Disclosure | Expandable sections with single or multiple open items and keyboard support. |
| P1 | Breadcrumbs | Navigation | Hierarchical page links with a current-page indicator and overflow handling. |
| P1 | Pagination | Navigation | Reusable page navigation and page-size selection independent of DataTable. |
| P2 | NumberInput | Forms | Numeric stepping, precision and formatting beyond the existing native Input type="number". |
| P2 | Slider / RangeSlider | Forms | Single-value or interval selection with bounds, steps and keyboard controls. |
| P2 | ToggleGroup / Toggle | Forms | Pressed-state buttons and single or multiple selection for compact controls. |
| P2 | Drawer / Sheet | Overlays | General-purpose edge panels with focus management; Sidebar's mobile drawer is tied to navigation. |
| P2 | Avatar / AvatarGroup | Data display | Images, initials, fallbacks and grouped identities with overflow counts. |
| P2 | Chip / Tag | Data display | Standalone removable or selectable tokens; MultiSelect currently owns its selected tags, while Badge displays status. |
| P2 | Typography | Content | Token-based text and heading primitives with semantic element selection. |
| P2 | Separator | Layout | Horizontal or vertical dividers with decorative and semantic modes. |
| P2 | EmptyState | Feedback | Reusable empty views with a title, description, illustration and actions; DataTable has its own empty view. |
| P2 | FormField / Fieldset | Forms | Shared labels, descriptions, errors and accessible grouping for composed controls; validation and submission remain application concerns. |
| P2 | Box / Stack / Grid | Layout | Responsive layout primitives for spacing, alignment and wrapping beyond the existing templates. |
| P2 | List / ListItem | Data display | Structured static content with leading/trailing elements and descriptions, separate from action menus. |
| P3 | TreeView / TreeItem | Navigation | Hierarchical expansion and selection with roving focus and keyboard navigation. |
| P3 | CommandPalette | Navigation | Searchable commands with shortcuts, grouping, keyboard selection and empty/loading states. |
| P3 | NavigationMenu | Navigation | Horizontal or nested application navigation with active links and responsive overflow, complementing Sidebar. |

Each family must include recipes for all six design systems and both color modes,
accessible interactions, responsive behavior where applicable, per-part customization,
typed exports, one interactive story per public component, tests and documentation.
Update this table and the [component catalog](./docs/components/README.md) when a family
becomes available. Domain-specific additions such as charts, rich text editors or media
players should be scoped separately when a product needs them.

## Development

```bash
pnpm install
pnpm storybook
pnpm lint
pnpm test:unit
pnpm build
```

Use the pnpm version in package.json. [Development](./docs/contributing/development.md)
explains file conventions and commands; [Testing](./docs/contributing/testing.md) covers
browser checks and coverage. Agent instructions live in [AGENTS.md](./AGENTS.md).

Source families live in src/components, layouts in src/templates, and scoped
recipes/specifications in src/design-systems. Internal and public sections live under their
owning family's components directory. Public imports remain named exports from neus-ui.

## Links and license

[Storybook](https://kazmermaximiliano.github.io/neus-ui/storybook/) ·
[Repository](https://github.com/KazmerMaximiliano/neus-ui) · [Apache License 2.0](./LICENSE)

Copyright 2026 Maximiliano Kazmer
