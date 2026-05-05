---
name: neus-theme-preview
description: |
  Generates a visual preview page of all Neus UI theme tokens and components in the active palette.
  Produces a .tsx page showing colors, typography, spacing, and component examples with the current theme.
  Use when user wants to see the theme, check colors, or preview design system tokens. Trigger:
  "preview del tema", "ver colores", "paleta activa", "theme preview", "ver el design system",
  "mostrar colores", "preview de colores", "ver cómo se ve el tema".
od:
  mode: prototype
  platform: desktop
  scenario: design
  design_system:
    requires: true
  craft:
    requires: [neus-components, typescript]
  example_prompt: "Show me a preview of all colors in the current theme"
---

# Neus Theme Preview

Generates a preview page showing all Neus UI design system tokens.

## Before starting

Read:
- `.agents/skills/_shared/theme-config.md` — all available CSS variables
- `.agents/skills/_shared/component-catalog.md` — to show components in action

## Phase 0 — Collect Data (minimum)

Only ask:
1. Are there active custom theme colors? If yes: which ones (hex)
2. Show sample components or color swatches only?

## Phase 2 — Generate

```tsx
import { ThemeProvider, Button, Input, Card, Checkbox } from 'neus-ui';

export const ThemePreviewPage = () => (
  <div className="theme-preview">
    <h1>Design System — Neus UI</h1>

    {/* Semantic Colors */}
    <section className="theme-preview__section">
      <h2>Semantic colors</h2>
      <div className="theme-preview__swatches">
        {['primary', 'success', 'error', 'info'].map((color) => (
          <div key={color} className="theme-preview__swatch-group">
            <div className={`theme-preview__swatch theme-preview__swatch--${color}`} />
            <div className={`theme-preview__swatch theme-preview__swatch--${color}-light`} />
            <div className={`theme-preview__swatch theme-preview__swatch--${color}-dark`} />
            <span>{color}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Gray Scale */}
    <section className="theme-preview__section">
      <h2>Gray scale</h2>
      <div className="theme-preview__grays">
        {[900, 700, 600, 500, 400, 300, 200, 150, 100].map((n) => (
          <div key={n} className={`theme-preview__gray theme-preview__gray--${n}`}>
            <span>{n}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Button variants */}
    <section className="theme-preview__section">
      <h2>Buttons</h2>
      <div className="theme-preview__row">
        <Button label="Solid Primary" variant="solid" color="primary" />
        <Button label="Outlined" variant="outlined" color="primary" />
        <Button label="Text" variant="text" color="primary" />
        <Button label="Success" variant="solid" color="success" />
        <Button label="Error" variant="solid" color="error" />
        <Button label="Loading" variant="solid" color="primary" loading />
      </div>
    </section>

    {/* Input */}
    <section className="theme-preview__section">
      <h2>Inputs</h2>
      <div className="theme-preview__inputs">
        <Input name="demo" label="Text field" placeholder="Type here..." />
        <Input name="error" label="With error" error="This field is required" />
        <Input name="disabled" label="Disabled" disabled value="Value" />
      </div>
    </section>

    {/* Card */}
    <section className="theme-preview__section">
      <h2>Cards</h2>
      <div className="theme-preview__cards">
        {['purple', 'blue', 'green', 'yellow', 'pink', 'red'].map((color) => (
          <Card key={color} color={color as any}><span>{color}</span></Card>
        ))}
      </div>
    </section>
  </div>
);
```

```css
.theme-preview { padding: 2rem; max-width: 1000px; margin: 0 auto; }
.theme-preview h1 { font-size: 2rem; font-weight: 700; margin-bottom: 2rem; }
.theme-preview__section { margin-bottom: 3rem; }
.theme-preview__section h2 { font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem; color: var(--color-gray-700); }
.theme-preview__swatches { display: flex; gap: 1.5rem; flex-wrap: wrap; }
.theme-preview__swatch-group { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.theme-preview__swatch { width: 60px; height: 60px; border-radius: 8px; }
.theme-preview__swatch--primary { background: var(--color-primary); }
.theme-preview__swatch--primary-light { background: var(--color-primary-light); border: 1px solid var(--color-border-light); }
.theme-preview__swatch--primary-dark { background: var(--color-primary-dark); }
/* Repeat for success, error, info */
.theme-preview__grays { display: flex; gap: 8px; }
.theme-preview__gray { width: 50px; height: 50px; border-radius: 8px; display: flex; align-items: flex-end; padding: 4px; }
.theme-preview__gray span { font-size: 0.65rem; color: white; mix-blend-mode: difference; }
.theme-preview__gray--900 { background: var(--color-gray-900); }
/* etc... */
.theme-preview__row { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
.theme-preview__inputs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.theme-preview__cards { display: flex; gap: 1rem; flex-wrap: wrap; }
```
