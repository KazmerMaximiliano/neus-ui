# Neus UI Theme Configuration Reference

## ThemeProvider Setup

Wrap the app root with `ThemeProvider`. Pass `initialTheme` with the colors to override.

```tsx
import { ThemeProvider } from 'neus-ui';

const theme = {
  primaryColor: '#4F46E5',   // indigo
  successColor: '#10B981',   // emerald
  errorColor: '#EF4444',     // red
  infoColor: '#3B82F6',      // blue
};

<ThemeProvider initialTheme={theme}>
  <App />
</ThemeProvider>
```

## Runtime Theme Updates

```tsx
import { useTheme } from 'neus-ui';

const { updateTheme } = useTheme();

// Switch to dark palette at runtime
updateTheme({ primaryColor: '#818CF8' });
```

## Color System — Available CSS Variables

Each semantic color generates 3 variants automatically:

| Variable | Description |
|----------|-------------|
| `var(--color-primary)` | Primary brand color (alias for .main) |
| `var(--color-primary-main)` | Full saturation primary |
| `var(--color-primary-light)` | 10% opacity primary |
| `var(--color-primary-dark)` | 15% darker primary |
| `var(--color-success)` | Success green |
| `var(--color-success-light)` | 10% opacity success |
| `var(--color-success-dark)` | 15% darker success |
| `var(--color-error)` | Error red |
| `var(--color-error-light)` | 10% opacity error |
| `var(--color-error-dark)` | 15% darker error |
| `var(--color-info)` | Info blue |
| `var(--color-info-light)` | 10% opacity info |
| `var(--color-info-dark)` | 15% darker info |

## Fixed Color Scale (not themeable)

```css
/* Grays */
var(--color-gray-900)  /* #111 */
var(--color-gray-700)  /* #333 */
var(--color-gray-600)  /* #555 */
var(--color-gray-500)  /* #777 */
var(--color-gray-400)  /* #999 */
var(--color-gray-300)  /* #bbb */
var(--color-gray-200)  /* #ddd */
var(--color-gray-150)  /* #e8e8e8 */
var(--color-gray-100)  /* #f5f5f5 */

/* White/Black opacity */
var(--color-white)
var(--color-white-100)  /* rgba(255,255,255,0.1) */
var(--color-white-200)  /* rgba(255,255,255,0.2) */
var(--color-white-300)  /* rgba(255,255,255,0.3) */
var(--color-black)
var(--color-black-100)  /* rgba(0,0,0,0.1) — shadow */
var(--color-black-200)  /* rgba(0,0,0,0.2) */

/* Semantic aliases */
var(--color-border-light)  /* same as info-light */
var(--color-shadow)        /* same as black-100 */

/* Card palette (decorative, non-themeable) */
var(--color-card-purple)
var(--color-card-pink)
var(--color-card-red)
var(--color-card-yellow)
var(--color-card-blue)
var(--color-card-green)
```

## useColors() Hook

Access resolved color values in component logic (not CSS):

```tsx
import { useColors } from 'neus-ui';

const MyComponent = () => {
  const colors = useColors();
  // colors.primary, colors.success, colors.error, colors.info
  // Each has: main, light, dark properties
  return <div style={{ borderColor: colors.primary.main }} />;
};
```

## Color Palette Presets (for neus-designer intake)

| Mood | primary | success | error | info |
|------|---------|---------|-------|------|
| Vivos y enérgicos | `#F97316` | `#22C55E` | `#EF4444` | `#06B6D4` |
| Neutros y relajados | `#64748B` | `#4ADE80` | `#F87171` | `#7DD3FC` |
| Corporativos y formales | `#1E40AF` | `#059669` | `#DC2626` | `#0284C7` |
| Creativos y expresivos | `#8B5CF6` | `#10B981` | `#F43F5E` | `#6366F1` |

## Typography Tokens

The base font has changed from Arial/Helvetica to **Manrope**. All components inherit automatically via the stylesheet.

| Token | Value | Use |
|-------|-------|-----|
| `--font-display` | `Manrope, system-ui, sans-serif` | Headings, UI labels, buttons |
| `--font-body` | `Manrope, system-ui, sans-serif` | Body text, paragraphs |
| `--font-mono` | `JetBrains Mono, ui-monospace, monospace` | Code, metadata labels, KPI labels, eyebrows |

Always reference these tokens in skill-generated CSS — never hardcode `Arial`, `Helvetica`, or `sans-serif` as display fonts.

**Font size scale:**

| Token | Value | Use |
|-------|-------|-----|
| `--fs-xs` | `12px` | Micro labels, legal text |
| `--fs-sm` | `13px` | Small UI text, button labels |
| `--fs-base` | `14px` | Base body text |
| `--fs-md` | `16px` | Standard body |
| `--fs-lg` | `18px` | Large body, card descriptions |
| `--fs-xl` | `20px` | Sub-headings |
| `--fs-2xl` | `24px` | Section headings |
| `--fs-3xl` | `32px` | Page headings |
| `--fs-4xl` | `48px` | Display headings |
| `--fs-5xl` | `64px` | Hero display |

**Spacing scale (4px base unit):**

| Token | Value |
|-------|-------|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |

## Extended Design Tokens

### Radius variants

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | `8px` | Tags, accents, small chips |
| `--radius-md` | `12px` | Chips, search inputs |
| `--radius-default` | `16px` | Cards, panels (unchanged) |
| `--radius-pill` | `3em` | Buttons, pill inputs |

### Gradient tokens

| Token | Value |
|-------|-------|
| `--gradient-brand` | `linear-gradient(135deg, #22d3ee 0%, #6366f1 45%, #d946ef 100%)` |
| `--gradient-brand-soft` | Same stops at 18% opacity — for tinted surface backgrounds |
| `--gradient-mesh` | Mesh of 3 radial gradients (cyan top-left, magenta bottom-right, indigo center) on dark canvas |

**Gradient text pattern:**
```css
.element {
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
/* Or use the utility class: */
<span className="neus-gradient-text">Text</span>
```

### Glow tokens

| Token | Use |
|-------|-----|
| `--glow-brand` | Subtle indigo ambient glow for interactive elements |
| `--glow-brand-strong` | Strong indigo + magenta glow for hero surfaces |
| `--glow-cyan` | Cyan accent glow for info/accent states |

### Utility CSS classes

These classes are available globally after the Neus UI stylesheet is imported:

| Class | Effect |
|-------|--------|
| `.neus-gradient-text` | Clips `--gradient-brand` as text fill |
| `.neus-eyebrow` | Uppercase, letter-spaced label in primary color |
| `.neus-mono` | Applies `--font-mono` (JetBrains Mono) |

**Eyebrow pattern** (for section/metadata labels):
```css
font-family: var(--font-mono);
font-size: 11px;
text-transform: uppercase;
letter-spacing: 0.15em;
color: var(--color-primary);
```

## Design System Defaults (when no ThemeProvider config)

- Border radius: `16px` cards/modals (`--radius-default`), `3em` buttons/inputs (`--radius-pill`), `32px` sidebar
- Transitions: `0.2s ease` interactive, `0.3s ease` dropdowns/sidebar
- Shadows: `0 4px 20px var(--color-shadow)` modals, `0 4px 8px var(--color-shadow)` hover
- Typography: **Manrope** (`--font-display`), 16px base — *not* Arial/Helvetica
- Button label: 0.7em bold uppercase, letter-spacing 0.25em
