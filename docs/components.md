# Components

[Documentation index](./README.md)

Neus UI keeps this page as a lightweight reference for the available
components and templates. Interactive previews, prop controls, and examples
are available in
[Storybook](https://kazmermaximiliano.github.io/neus-ui/storybook/).

## Component Reference

| Component | Description |
| --- | --- |
| Actions | Action group for edit, delete, and info flows |
| Badge | Small status indicator with semantic color variants |
| Button | Button with variants, sizes (small/medium/large), colors, loading, and disabled states |
| Calendar | Date picker for single, range, or multiple selection |
| [Card](./components/Card.md) | Composable surface with six design-system adaptations |
| [CardHeader](./components/CardHeader.md) | Free-form header content and actions |
| [CardMedia](./components/CardMedia.md) | Images, video, audio, frames and custom media components |
| [CardContent](./components/CardContent.md) | Themed content spacing |
| [CardFooter](./components/CardFooter.md) | Wrapping footer content and actions |
| Checkbox | Controlled or uncontrolled checkbox with indeterminate state |
| Clock | Circular time picker for hours and minutes |
| DataTable | Sortable, paginated table with filtering and row actions |
| DateInput | Text input that opens a calendar picker |
| Dropdown | Icon-triggered dropdown menu |
| FileUploader | File upload with drag and drop, type, and size validation |
| IconButton | Button optimized for rendering a single icon |
| [Input](./components/Input.md) | Native field with seven types, accessible errors, per-part styles and six design-system adaptations |
| InteractiveMap | Google Maps location picker |
| Link | Styled anchor with primary and secondary variants |
| Menu | Contextual menu with configurable actions |
| Modal | Dialog with confirm and cancel actions |
| MultiSelect | Select multiple options from a list |
| Select | Select a single option from a list |
| [Sidebar](./components/Sidebar.md) | Six token recipes, transparent curves, compact tablet rail and mobile drawer |
| Stepper | Progress indicator with dots, linear, and simple variants |
| TimeInput | Text input that opens a clock picker |
| WeekCalendar | 7-day calendar with categorized events |
| WeekCalendarRow | Category row used by WeekCalendar |

## Templates

| Template | Description |
| --- | --- |
| AppTemplate | Full application layout with sidebar and top menu |
| FormTemplate | Form layout with validation and submission support |

## Storybook

Run `pnpm storybook` locally, or use `pnpm build-storybook` to generate the
interactive catalog in `storybook-static/`.

Open
[Storybook](https://kazmermaximiliano.github.io/neus-ui/storybook/)
to explore every component with interactive controls and generated API
documentation.

### Design-system selection

The single **Components / Button / Button** story includes a `designSystem`
control for **Neus UI** (default), **Apple**, **Carbon**, **Material**,
**Neobrutalism**, and **Vercel**. It previews one button in the selected system,
independently of the toolbar's design-system selection.

The preview uses a local `ThemeProvider` scope and follows the toolbar's light/dark
selection. `designSystem` is a
story control declared in `Button.types.ts`; applications select the system
through `ThemeProvider`, rather than a Button prop.

Use the object controls to edit `buttonStyle` (the button), `labelStyle` (the text
span), and `loaderStyle` (the BeatLoader container, not its individual dots).
Design recipes live in `src/design-systems/` and supply CSS tokens to the actual
components. `loaderStyle.color` colors the dots through `currentColor`, and
`loaderStyle.fontSize` controls their size. The recipes are project adaptations;
unspecified details are illustrative choices.
Fonts use local fallbacks when the original font is unavailable.

Variant, color, size, loading, disabled, and fullWidth remain independent controls
in every Button design. Enable `loading` to preview the loader in the selected
system. Card and its four subcomponents also have one story each with the same
local design selector. Card exposes `className` and `style` on every component;
the main example composes all sections, while their stories expose independent
controls. CardMedia previews images, video, audio and iframes.
See the [Card guide](./components/Card.md) for the new API and migration.
Input now has six token-driven recipes and per-part style overrides, while preserving its existing behavior. See the [Input guide](./components/Input.md). See
[Design systems](./design-systems.md) for architecture and extension steps.

Sidebar has a single fullscreen story with local design selection and page-background controls. See [Sidebar](./components/Sidebar.md) for responsive behavior, tokens and AppTemplate integration.

## General Usage

### Importing Components

```tsx
// Import a single component
import { Button } from "neus-ui";

// Import multiple components
import { Button, Input, Checkbox, Modal } from "neus-ui";
```

### Importing Templates

```tsx
import { AppTemplate, FormTemplate } from "neus-ui";
```
