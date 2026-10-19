# Components

[Documentation](../README.md) · [Templates](../templates/README.md) ·
[Customization](../design/customization.md)

The package exports 40 components and public sections. Import each by name from `neus-ui`.
Each guide covers behavior, props, anatomy, per-part classes/styles and CSS tokens.

## Typography, layout and media

| Component | Purpose |
| --- | --- |
| [Heading](./Heading.md) | Heading with independent document level and visual size, display to xs. |
| [Text](./Text.md) | Running text in lead, body, small, caption and overline steps with semantic tones. |
| [Container](./Container.md) | Centered maximum width with responsive side padding. |
| [Stack](./Stack.md) | Column or row with space-scale gaps that can change at 768px and 1024px. |
| [Grid](./Grid.md) | Equal responsive columns or auto-fit items of a minimum width. |
| [Section](./Section.md) | Full-width page band with tone, vertical rhythm and an inner Container. |
| [Avatar](./Avatar.md) | Picture or initials of a person or organization, with an image-failure fallback. |
| [AvatarGroup](./AvatarGroup.md) | Overlapping avatars with a +N count. |
| [MediaPlaceholder](./MediaPlaceholder.md) | Sized frame that stands in for a picture not taken yet and says what it will show. |

## Actions and status

| Component | Purpose |
| --- | --- |
| [Alert](./Alert.md) | Inline info, success, warning or error message with actions and an optional close button. |
| [Badge](./Badge.md) | Status indicator with solid and dot variants. |
| [Button](./Button.md) | Semantic button with six variants, three sizes and loading feedback. |
| [IconButton](./IconButton.md) | Accessible icon-only button with loading feedback. |
| [Link](./Link.md) | Styled native anchor with primary and secondary treatments. |

## Fields and selection

| Component | Purpose |
| --- | --- |
| [Input](./Input.md) | Native input with field presentation, adornments and accessible errors. |
| [Checkbox](./Checkbox.md) | Controlled checkbox with an indeterminate visual state. |
| [Select](./Select.md) | Single selection with a searchable, keyboard-operated listbox. |
| [MultiSelect](./MultiSelect.md) | Multiple selection with removable tags and searchable options. |
| [FileUploader](./FileUploader.md) | File selection and drag/drop with size and type validation. |

## Date and time

| Component | Purpose |
| --- | --- |
| [Calendar](./Calendar.md) | Localized date selection with single, range and multiple modes. |
| [Clock](./Clock.md) | Pointer and keyboard operated hour/minute dial. |
| [DateInput](./DateInput.md) | Read-only display field that opens a Calendar popover. |
| [TimeInput](./TimeInput.md) | Display field with a Clock popover and serialized time value. |
| [WeekCalendar](./WeekCalendar.md) | Seven-day event view grouped by category. |
| [WeekCalendarRow](./WeekCalendarRow.md) | Category and event row used by WeekCalendar. |

## Surfaces and dialogs

| Component | Purpose |
| --- | --- |
| [Card](./Card.md) | Composable surface for arbitrary content and actions. |
| [CardHeader](./CardHeader.md) | Free-form header region for Card composition. |
| [CardMedia](./CardMedia.md) | Polymorphic media region for native or custom elements. |
| [CardContent](./CardContent.md) | Content region with recipe-controlled spacing. |
| [CardFooter](./CardFooter.md) | Wrapping action and metadata region for Card composition. |
| [Modal](./Modal.md) | Controlled native dialog with composable sections. |
| [ModalHeader](./ModalHeader.md) | Title region for an owning Modal. |
| [ModalContent](./ModalContent.md) | Body region for Modal composition. |
| [ModalFooter](./ModalFooter.md) | Action region for Modal composition. |

## Navigation, data and location

| Component | Purpose |
| --- | --- |
| [Sidebar](./Sidebar.md) | Responsive navigation with desktop panel, tablet rail and mobile dialog. |
| [Menu](./Menu.md) | Text or icon trigger for an accessible action menu. |
| [Dropdown](./Dropdown.md) | Avatar or icon trigger with an action menu. |
| [Stepper](./Stepper.md) | Step progress in dots, linear or simple presentation. |
| [DataTable](./DataTable.md) | Typed AG Grid table with consumer-controlled pagination and optional mobile cards. |
| [InteractiveMap](./InteractiveMap.md) | Google Maps location picker with search, reverse geocoding and error states. |

## Storybook

Run `pnpm storybook` for the interactive catalog or `pnpm build-storybook` for a static
build. Use the toolbar for the global system and light/dark scheme. Stories with a local
design control can override the system; controls offering Inherit global follow the toolbar.
Other stories initialize a local system explicitly. These controls are preview arguments,
not public component props.
