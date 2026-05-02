# Components Documentation

Detailed documentation for each component and template is maintained in individual files inside the `components/` directory. Click any link below to open it.

## Components

| Component                                          | Description                                                 |
| -------------------------------------------------- | ----------------------------------------------------------- |
| [Actions](./components/Actions.md)                 | Action group for edit, delete, and info                     |
| [Button](./components/Button.md)                   | Versatile button with variants, colors, and states          |
| [Calendar](./components/Calendar.md)               | Date picker — single, range, or multiple                    |
| [Card](./components/Card.md)                       | Flexible card with avatar, header slots, and color variants |
| [Checkbox](./components/Checkbox.md)               | Controlled/uncontrolled checkbox                            |
| [Clock](./components/Clock.md)                     | Circular clock for picking hours and minutes                |
| [ClockNumbers](./components/ClockNumbers.md)       | Internal clock numbers display (used by Clock)              |
| [DataTable](./components/DataTable.md)             | Paginated data table with row actions                       |
| [DateInput](./components/DateInput.md)             | Text input that opens a date picker                         |
| [Dropdown](./components/Dropdown.md)               | Icon-triggered dropdown menu                                |
| [FileUploader](./components/FileUploader.md)       | File upload with type and size validation                   |
| [IconButton](./components/IconButton.md)           | Button that renders a single icon                           |
| [Input](./components/Input.md)                     | Text input with multiple types and validation               |
| [InteractiveMap](./components/InteractiveMap.md)   | Google Maps location picker                                 |
| [Link](./components/Link.md)                       | Styled anchor with primary/secondary variants               |
| [Menu](./components/Menu.md)                       | Contextual menu with configurable actions                   |
| [Modal](./components/Modal.md)                     | Dialog with confirm/cancel actions                          |
| [MultiSelect](./components/MultiSelect.md)         | Select multiple options from a list                         |
| [Select](./components/Select.md)                   | Select a single option from a list                          |
| [Sidebar](./components/Sidebar.md)                 | Navigation sidebar with icon support                        |
| [TimeInput](./components/TimeInput.md)             | Text input that opens a clock picker                        |
| [WeekCalendar](./components/WeekCalendar.md)       | 7-day calendar with categorized events                      |
| [WeekCalendarRow](./components/WeekCalendarRow.md) | Single category row inside WeekCalendar                     |

## Templates

| Template                                     | Description                               |
| -------------------------------------------- | ----------------------------------------- |
| [AppTemplate](./components/AppTemplate.md)   | Full app layout with sidebar and top menu |
| [FormTemplate](./components/FormTemplate.md) | Form layout with built-in submit button   |

---

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
