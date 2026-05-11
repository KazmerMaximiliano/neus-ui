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

Neus UI ships **Manrope** as its primary typeface (loaded from Google Fonts) and **JetBrains Mono** for code and metadata. The base font is set via CSS variables and applied to `html, body` in the library stylesheet — all components inherit it automatically.

### Font Tokens

| Token            | Value                                          | Usage                      |
| ---------------- | ---------------------------------------------- | -------------------------- |
| `--font-display` | `"Manrope", system-ui, sans-serif`             | Display and UI text        |
| `--font-body`    | `"Manrope", system-ui, sans-serif`             | Body and component text    |
| `--font-mono`    | `"JetBrains Mono", ui-monospace, monospace`    | Code, tokens, metadata     |

To use the monospace family in your own CSS:

```css
.my-code { font-family: var(--font-mono); }
```

Or use the utility class:

```html
<span class="neus-mono">API key: abc123</span>
```

### Font Size Scale

| Token       | Value  | Role                          |
| ----------- | ------ | ----------------------------- |
| `--fs-xs`   | `12px` | Eyebrow, caption, badge       |
| `--fs-sm`   | `13px` | Button label, helper text     |
| `--fs-base` | `14px` | Body default (standard UI)    |
| `--fs-md`   | `16px` | Body large, base font-size    |
| `--fs-lg`   | `18px` | Card title, section heads     |
| `--fs-xl`   | `20px` | Section title                 |
| `--fs-2xl`  | `24px` | Subsection heading            |
| `--fs-3xl`  | `32px` | Section heading               |
| `--fs-4xl`  | `48px` | Main heading                  |
| `--fs-5xl`  | `64px` | Hero / display                |

### Text Styles Used Across Components

| Role           | Size          | Weight | Transform   | Notes                       |
| -------------- | ------------- | ------ | ----------- | --------------------------- |
| Button label   | `var(--fs-sm)`| `bold` | `uppercase` | Letter-spacing `0.25em`     |
| Input label    | `0.9em`       | `500`  | —           | Shown above the field       |
| Error message  | `0.85em`      | `400`  | —           | Color `--color-error`       |
| Modal title    | `1.25rem`     | `600`  | —           |                             |
| Section heading| `var(--fs-lg)`| `600`  | —           | WeekCalendar title          |
| Body / default | `var(--fs-md)`| `400`  | —           |                             |

---

## Spacing

Neus UI uses a **4px base unit** spacing scale. Prefer these tokens over ad-hoc values.

### Spacing Tokens

| Token        | Value  |
| ------------ | ------ |
| `--space-1`  | `4px`  |
| `--space-2`  | `8px`  |
| `--space-3`  | `12px` |
| `--space-4`  | `16px` |
| `--space-6`  | `24px` |
| `--space-8`  | `32px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |

### Common Component Padding

| Context              | Value                    |
| -------------------- | ------------------------ |
| Button (medium)      | `12px 22px`              |
| Button (small)       | `8px 14px`               |
| Button (large)       | `16px 28px`              |
| Input / Select field | `1em 2em`                |
| Sidebar button       | `1.25em 2em`             |
| Card                 | `1rem`                   |
| Modal header / body  | `1.5rem`                 |
| Modal footer         | `1rem 1.5rem`            |
| WeekCalendar outer   | `20px 32px`              |

---

## Border Radius

| Token              | Value  | Usage                                    |
| ------------------ | ------ | ---------------------------------------- |
| `--radius-default` | `16px` | Cards, modals, dropdowns, panels         |
| `--radius-md`      | `12px` | Inputs, chips, search fields             |
| `--radius-sm`      | `8px`  | Tags, small surface accents              |
| `--radius-pill`    | `3em`  | Buttons, pill inputs, selects            |
| —                  | `32px` | Sidebar corners                          |
| —                  | `50%`  | Avatars, clock face, dot indicators      |
| —                  | `4px`  | Checkbox                                 |

---

## Shadows & Glows

### Component Shadows

| Context                    | Value                                             |
| -------------------------- | ------------------------------------------------- |
| Modal, Dropdown panel      | `0 4px 20px var(--color-shadow)`                  |
| DataTable card (active)    | `0 2px 8px var(--color-shadow)`                   |
| Date / Time picker panel   | `0 4px 12px rgba(0, 0, 0, 0.15)`                 |
| Button solid primary       | `inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 24px -6px rgba(99,102,241,0.55)` |
| Button solid success       | `inset 0 1px 0 rgba(255,255,255,0.3), 0 8px 24px -6px rgba(74,222,128,0.4)`  |
| Button solid error         | `inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 24px -6px rgba(248,113,113,0.4)` |
| Checkbox checked           | `0 4px 12px -4px rgba(99,102,241,0.6)`           |
| Input focus ring           | `inset 0 1px 2px rgba(0,0,0,0.2), 0 0 0 3px rgba(129,140,248,0.18)` |
| Input error focus ring     | `0 0 0 3px rgba(248,113,113,0.18)`               |

### Glow Tokens

Use these tokens for glow effects in custom components or decorative surfaces.

| Token                | Value                                                               | Usage               |
| -------------------- | ------------------------------------------------------------------- | ------------------- |
| `--glow-brand`       | `0 0 40px rgba(99, 102, 241, 0.35)`                                | Subtle indigo glow  |
| `--glow-brand-strong`| `0 0 60px rgba(99, 102, 241, 0.5), 0 0 100px rgba(217, 70, 239, 0.25)` | Hero glow      |
| `--glow-cyan`        | `0 0 30px rgba(34, 211, 238, 0.4)`                                 | Accent cyan glow    |

```css
.my-card { box-shadow: var(--glow-brand); }
```

---

## Gradients

Brand gradients are available as tokens for decorative use. Do not apply them to interactive state backgrounds.

| Token                  | Value                                                                         | Usage                    |
| ---------------------- | ----------------------------------------------------------------------------- | ------------------------ |
| `--gradient-brand`     | `linear-gradient(135deg, #22d3ee 0%, #6366f1 45%, #d946ef 100%)`             | Spectrum accent gradient |
| `--gradient-brand-soft`| `linear-gradient(135deg, rgba(34,211,238,0.18) … rgba(217,70,239,0.18) 100%)`| Subtle tinted surface    |

```css
.hero-title { background: var(--gradient-brand); }
```

Or use the utility class for gradient text:

```html
<h1 class="neus-gradient-text">Welcome to Neus UI</h1>
```

---

## Utility Classes

The library exposes three global utility classes available after importing the stylesheet.

| Class                | Description                                                      |
| -------------------- | ---------------------------------------------------------------- |
| `.neus-gradient-text`| Clips the brand gradient as text fill (use on headings)          |
| `.neus-eyebrow`      | Uppercase, spaced label in primary color. Used for section labels|
| `.neus-mono`         | Switches font to `--font-mono` (JetBrains Mono)                 |

```html
<p class="neus-eyebrow">New feature</p>
<h2 class="neus-gradient-text">Built for the modern web</h2>
<code class="neus-mono">const x = 42;</code>
```

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

| Variant    | Background                  | Border         | Text color          |
| ---------- | --------------------------- | -------------- | ------------------- |
| `solid`    | Gradient (color-based glow) | None           | White (dark on success) |
| `outlined` | Transparent                 | Inset shadow   | Color main          |
| `text`     | Transparent                 | None           | Color main          |

Solid primary/info use an indigo gradient with a glow shadow. Solid success uses a green gradient with dark text (`#052e16`). Solid error uses a red gradient. All variants share hover, loading, and disabled logic. Active state adds `transform: translateY(1px)`.

### Color Prop Behavior

Components that accept a `color` prop (`Button`, `IconButton`) use it to select the matching `--color-{color}`, `--color-{color}-light`, and `--color-{color}-dark` CSS variables. Available values: `primary` · `success` · `error` · `info`.

### Controlled vs. Uncontrolled

Form components (`Input`, `Select`, `MultiSelect`, `Calendar`, `DateInput`, `TimeInput`, `Checkbox`) support both patterns:

- **Controlled:** pass `value` + `onChange` — the parent owns the state
- **Uncontrolled:** pass `defaultValue` only — the component manages its own state internally

### Layout Templates

`AppTemplate` and `FormTemplate` are pre-built layout shells. They compose existing components (`Sidebar`, `Button`) and define page-level structure. Use them as starting points, not as generic containers.
