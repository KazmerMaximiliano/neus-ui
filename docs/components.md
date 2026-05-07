# Components

Neus UI keeps this page as a lightweight reference for the available
components and templates. Interactive previews, prop controls, and examples
are available in [Storybook](/storybook/).

## Component Reference

| Component | Description |
| --- | --- |
| Actions | Action group for edit, delete, and info flows |
| Badge | Small status indicator with semantic color variants |
| Button | Button with variants, colors, loading, and disabled states |
| Calendar | Date picker for single, range, or multiple selection |
| Card | Content container with avatar, header, and color variants |
| Checkbox | Controlled or uncontrolled checkbox with indeterminate state |
| Clock | Circular time picker for hours and minutes |
| DataTable | Sortable, paginated table with filtering and row actions |
| DateInput | Text input that opens a calendar picker |
| Dropdown | Icon-triggered dropdown menu |
| FileUploader | File upload with drag and drop, type, and size validation |
| IconButton | Button optimized for rendering a single icon |
| Input | Text input with multiple types and validation states |
| InteractiveMap | Google Maps location picker |
| Link | Styled anchor with primary and secondary variants |
| Menu | Contextual menu with configurable actions |
| Modal | Dialog with confirm and cancel actions |
| MultiSelect | Select multiple options from a list |
| Select | Select a single option from a list |
| Sidebar | Navigation sidebar with icon support |
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

Open [Storybook](/storybook/) to explore every component with interactive
controls and generated API documentation.

## General Usage

### Importing Components

```tsx
// Import a single component
import { Button } from "@neus-ui/components";

// Import multiple components
import { Button, Input, Checkbox, Modal } from "@neus-ui/components";
```

### Importing Templates

```tsx
import { AppTemplate, FormTemplate } from "@neus-ui/templates";
```
