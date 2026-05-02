# Design System

## Table of Contents

- [Theming](#theming)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing](#spacing)
- [Border Radius](#border-radius)
- [Shadows](#shadows)
- [Transitions & Animations](#transitions--animations)
- [Component Patterns](#component-patterns)

---

## Theming

Neus UI uses a dynamic theming system based on CSS custom properties. The four semantic colors (primary, success, error, info) can be overridden at startup or at runtime.

### Setup

Wrap your application with `ThemeProvider`. Pass `initialTheme` to set custom brand colors at startup.

```tsx
import { ThemeProvider } from "@neus-ui/providers";

function App() {
  return (
    <ThemeProvider
      initialTheme={{
        primaryColor: "#1a56db",
        successColor: "#057a55",
        errorColor: "#e02424",
        infoColor: "#1a56db",
      }}
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

### Runtime Updates

Use `useTheme()` to change the theme dynamically after mount (e.g. per user preference or brand switching).

```tsx
import { useTheme } from "@neus-ui/providers";

function BrandSwitcher() {
  const { updateTheme } = useTheme();

  return (
    <button onClick={() => updateTheme({ primaryColor: "#7c3aed" })}>
      Switch to purple
    </button>
  );
}
```

`updateTheme` accepts any combination of `primaryColor`, `successColor`, `errorColor`, and `infoColor`. Unspecified keys are left unchanged. Each hex value automatically generates `.main`, `.light` (10% opacity), and `.dark` (15% darker) variants, which are written directly to the CSS variables on `:root`.

### Reading Colors in Components

Inside any component, use `useColors()` to get the current resolved color tokens:

```tsx
import { useColors } from "@neus-ui/components";

function MyComponent() {
  const colors = useColors();
  // colors.primary.main, colors.success.light, colors.gray[500], etc.
}
```

### ThemeConfig Reference

| Property       | Type     | Description                    |
| -------------- | -------- | ------------------------------ |
| `primaryColor` | `string` | Hex color for the primary scale|
| `successColor` | `string` | Hex color for the success scale|
| `errorColor`   | `string` | Hex color for the error scale  |
| `infoColor`    | `string` | Hex color for the info scale   |

---

## Color System

### Semantic Colors

Each semantic color has three variants generated automatically from the base hex.

| Token     | Default   | Light (10% opacity)         | Dark (15% darker) |
| --------- | --------- | --------------------------- | ----------------- |
| `primary` | `#283593` | `rgba(40, 53, 147, 0.1)`   | `#1c258c`         |
| `success` | `#4caf50` | `rgba(76, 175, 80, 0.1)`   | `#357a3a`         |
| `error`   | `#f44336` | `rgba(244, 67, 54, 0.1)`   | `#d32f2f`         |
| `info`    | `#283593` | `rgba(40, 53, 147, 0.1)`   | `#1a237e`         |

#### CSS Variables

```css
--color-primary:       #283593;
--color-primary-light: rgba(40, 53, 147, 0.1);
--color-primary-dark:  #1c258c;

--color-success:       #4caf50;
--color-success-light: rgba(76, 175, 80, 0.1);
--color-success-dark:  #357a3a;

--color-error:         #f44336;
--color-error-light:   rgba(244, 67, 54, 0.1);
--color-error-dark:    #d32f2f;

--color-info:          #283593;
--color-info-light:    rgba(40, 53, 147, 0.1);
--color-info-dark:     #1a237e;
```

---

### Neutral / Gray Scale

Fixed colors not affected by `updateTheme`.

| Token              | Value     |
| ------------------ | --------- |
| `--color-gray-900` | `#333333` |
| `--color-gray-700` | `#475569` |
| `--color-gray-600` | `#666666` |
| `--color-gray-500` | `#64748b` |
| `--color-gray-400` | `#6b7280` |
| `--color-gray-300` | `#cbd5e1` |
| `--color-gray-200` | `#e0e0e0` |
| `--color-gray-150` | `#e5e7eb` |
| `--color-gray-100` | `#f9fafb` |

---

### White & Black Scales

| Token              | Value                        | Usage                         |
| ------------------ | ---------------------------- | ----------------------------- |
| `--color-white`    | `#ffffff`                    | Base white                    |
| `--color-white-100`| `rgba(255, 255, 255, 0.15)` | Hover on dark backgrounds     |
| `--color-white-200`| `rgba(255, 255, 255, 0.25)` | Active on dark backgrounds    |
| `--color-white-300`| `rgba(255, 255, 255, 0.55)` | Subtle overlay on dark        |
| `--color-black`    | `#000000`                    | Base black                    |
| `--color-black-100`| `rgba(0, 0, 0, 0.1)`        | Shadows                       |
| `--color-black-200`| `rgba(0, 0, 0, 0.5)`        | Modal backdrop                |

---

### Semantic Aliases

| Token                  | Resolves to               | Usage                                     |
| ---------------------- | ------------------------- | ----------------------------------------- |
| `--color-border-light` | `var(--color-info-light)` | Default border color for inputs and cards |
| `--color-shadow`       | `var(--color-black-100)`  | Default shadow base                       |

---

### Card Color Palette

`Card` and `WeekCalendarRow` use a fixed set of decorative colors (not part of the semantic scale).

| Name     | Value     |
| -------- | --------- |
| `purple` | `#7e6594` |
| `pink`   | `#c86b7b` |
| `red`    | `#c6412f` |
| `yellow` | `#d99e2b` |
| `blue`   | `#4a7b9d` |
| `green`  | `#5ca874` |

---

## Typography

Neus UI does not ship a custom font. The base stack is system sans-serif.

```css
font-family: Arial, Helvetica, sans-serif;
font-size: 16px; /* base */
```

### Text Styles Used Across Components

| Role           | Size     | Weight | Transform   | Notes                       |
| -------------- | -------- | ------ | ----------- | --------------------------- |
| Button label   | `0.7em`  | `bold` | `uppercase` | Letter-spacing `0.25em`     |
| Input label    | `0.9em`  | `500`  | —           | Shown above the field       |
| Error message  | `0.8em`  | `400`  | —           | Color `--color-error`       |
| Modal title    | `1.25rem`| `600`  | —           |                             |
| Section heading| `18px`   | `600`  | —           | WeekCalendar title          |
| Body / default | `1rem`   | `400`  | —           |                             |

---

## Spacing

Components use a mix of `em` (scales with font size) and fixed `px`/`rem` values.

### Common Padding Values

| Context              | Value          |
| -------------------- | -------------- |
| Button               | `1.25em 3em`   |
| Input / Select field | `1em 2em`      |
| Sidebar button       | `1.25em 2em`   |
| Card                 | `1rem`         |
| Modal header / body  | `1.5rem`       |
| Modal footer         | `1rem 1.5rem`  |
| Calendar             | `1rem 1.5rem`  |
| WeekCalendar outer   | `20px 32px`    |

### Common Gap Values

`0.5rem` · `0.75rem` · `1rem` · `8px` · `16px`

---

## Border Radius

| Context                               | Value              | Shape    |
| ------------------------------------- | ------------------ | -------- |
| `--radius-default`                    | `16px`             | Cards, modals, dropdowns, panels |
| Buttons, inputs, selects              | `3em`              | Pill     |
| Sidebar corners                       | `32px`             | Rounded panel |
| Event cells, avatars, clock face      | `50%`              | Circle   |
| Checkbox                              | `4px`              | Slightly rounded square |
| WeekCalendar grid cells               | `8px`              | Subtle   |

---

## Shadows

| Context                    | Value                                  |
| -------------------------- | -------------------------------------- |
| Modal, Dropdown panel      | `0 4px 20px var(--color-shadow)`       |
| Dropdown item hover        | `0 4px 8px var(--color-shadow)`        |
| Date / Time picker panel   | `0 4px 12px rgba(0, 0, 0, 0.15)`      |
| DataTable card (active)    | `0 2px 8px rgba(0, 0, 0, 0.12)`       |

---

## Transitions & Animations

### Standard Transitions

| Duration  | Property            | Usage                         |
| --------- | ------------------- | ----------------------------- |
| `0.2s ease` | `all`             | Buttons, general interactive  |
| `0.2s ease` | `border-color`    | Input focus                   |
| `0.2s ease` | `background-color`| Hover states                  |
| `0.3s ease` | `all`             | Dropdowns, menus, sidebar     |
| `0.3s ease` | `opacity, transform` | Panel open/close           |

### Keyframe Animations

#### `slideDown` — pickers opening downward

```css
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Used by: `DateInput`, `TimeInput` picker panels.

#### `fadeIn` — content appearing upward

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Used by: `FileUploader` file list.

---

## Component Patterns

### Interactive States

Every interactive component follows this state model:

| State      | Visual treatment                                                    |
| ---------- | ------------------------------------------------------------------- |
| Default    | `--color-border-light` border, white background                     |
| Hover      | Background switches to the color's `.light` variant                 |
| Focus      | Border color switches to the info/primary variant                   |
| Active     | Background switches to the color's `.main` variant                  |
| Disabled   | `--color-gray-400` tones, `opacity: 0.6`, `cursor: not-allowed`    |
| Error      | `--color-error` border and label text                               |

### Button Variants

| Variant    | Background     | Border      | Text color   |
| ---------- | -------------- | ----------- | ------------ |
| `solid`    | Color main     | None        | White        |
| `outlined` | Transparent    | Color main  | Color main   |
| `text`     | Transparent    | None        | Color main   |

All variants share the same hover, loading, and disabled logic.

### Color Prop Behavior

Components that accept a `color` prop (`Button`, `IconButton`) use it to select the matching `--color-{color}`, `--color-{color}-light`, and `--color-{color}-dark` CSS variables. Available values: `primary` · `success` · `error` · `info`.

### Controlled vs. Uncontrolled

Form components (`Input`, `Select`, `MultiSelect`, `Calendar`, `DateInput`, `TimeInput`, `Checkbox`) support both patterns:

- **Controlled:** pass `value` + `onChange` — the parent owns the state
- **Uncontrolled:** pass `defaultValue` only — the component manages its own state internally

### Layout Templates

`AppTemplate` and `FormTemplate` are pre-built layout shells. They compose existing components (`Sidebar`, `Button`) and define page-level structure. Use them as starting points, not as generic containers.
