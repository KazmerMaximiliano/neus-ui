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
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/theme-config.md` — all available CSS variables
- `.agents/skills/_shared/component-catalog.md` — to show components in action

## Phase 0 — Collect Data (minimum)

Only ask:
1. Are there active custom theme colors? If yes: which ones (hex)
2. Show sample components or color swatches only?
3. Visual mode: light (default) or dark?

## Phase 2 — Generate

```tsx
import { ThemeProvider, Button, Input, Card, Checkbox } from 'neus-ui';
// CSS goes in ThemePreviewPage.styles.css — NEVER use <style> tags or inline styles
import './ThemePreviewPage.styles.css';

export const ThemePreviewPage = () => (
  <div className="theme-preview">
    <h1 className="theme-preview__title">Design System — Neus UI</h1>

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

    {/* Gradients */}
    <section className="theme-preview__section">
      <h2>Gradients</h2>
      <div className="theme-preview__row">
        <div className="theme-preview__gradient theme-preview__gradient--brand">
          <span>--gradient-brand</span>
        </div>
        <div className="theme-preview__gradient theme-preview__gradient--brand-soft">
          <span>--gradient-brand-soft</span>
        </div>
        <div className="theme-preview__gradient-text">
          <span className="neus-gradient-text">Gradient text (.neus-gradient-text)</span>
        </div>
      </div>
    </section>

    {/* Radius */}
    <section className="theme-preview__section">
      <h2>Radius</h2>
      <div className="theme-preview__row">
        {[
          { token: '--radius-sm', value: '8px', cls: 'sm' },
          { token: '--radius-md', value: '12px', cls: 'md' },
          { token: '--radius-pill', value: '3em', cls: 'pill' },
        ].map(({ token, value, cls }) => (
          <div key={cls} className={`theme-preview__radius theme-preview__radius--${cls}`}>
            <span className="theme-preview__mono">{token}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Font Scale */}
    <section className="theme-preview__section">
      <h2>Font scale</h2>
      <div className="theme-preview__type-scale">
        {[
          { token: '--fs-xs', size: '12px' },
          { token: '--fs-sm', size: '13px' },
          { token: '--fs-base', size: '14px' },
          { token: '--fs-md', size: '16px' },
          { token: '--fs-lg', size: '18px' },
          { token: '--fs-xl', size: '20px' },
          { token: '--fs-2xl', size: '24px' },
          { token: '--fs-3xl', size: '32px' },
          { token: '--fs-4xl', size: '48px' },
        ].map(({ token, size }) => (
          <div key={token} className="theme-preview__type-row">
            <span className="theme-preview__mono">{token} ({size})</span>
            <span style={{ fontSize: `var(${token})`, fontFamily: 'var(--font-display)' }}>
              The quick brown fox
            </span>
          </div>
        ))}
      </div>
    </section>

    {/* Spacing Scale */}
    <section className="theme-preview__section">
      <h2>Spacing scale</h2>
      <div className="theme-preview__spacing-scale">
        {[
          ['--space-1', '4px'], ['--space-2', '8px'], ['--space-3', '12px'],
          ['--space-4', '16px'], ['--space-5', '20px'], ['--space-6', '24px'],
          ['--space-8', '32px'], ['--space-10', '40px'], ['--space-12', '48px'],
          ['--space-16', '64px'],
        ].map(([token, value]) => (
          <div key={token} className="theme-preview__spacing-row">
            <span className="theme-preview__mono">{token} ({value})</span>
            <div className="theme-preview__spacing-bar" style={{ width: `var(${token})` }} />
          </div>
        ))}
      </div>
    </section>

    {/* Button variants */}
    <section className="theme-preview__section">
      <h2>Buttons</h2>
      <div className="theme-preview__row">
        <Button label="Solid Primary" variant="solid" color="primary" size="medium" />
        <Button label="Outlined" variant="outlined" color="primary" size="medium" />
        <Button label="Text" variant="text" color="primary" size="medium" />
        <Button label="Small" variant="solid" color="primary" size="small" />
        <Button label="Large" variant="solid" color="primary" size="large" />
        <Button label="Success" variant="solid" color="success" size="medium" />
        <Button label="Error" variant="solid" color="error" size="medium" />
        <Button label="Loading" variant="solid" color="primary" size="medium" loading />
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

### ThemePreviewPage.styles.css


```css
/* Light mode (default) */
.theme-preview {
  padding: var(--space-8);
  max-width: 1000px;
  margin: 0 auto;
  font-family: var(--font-display);
}
.theme-preview__title {
  font-family: var(--font-display);
  font-size: var(--fs-3xl);
  font-weight: 700;
  margin-bottom: var(--space-8);
  color: var(--color-gray-900);
}
.theme-preview__section { margin-bottom: 3rem; }
.theme-preview__section h2 {
  font-family: var(--font-display);
  font-size: var(--fs-md);
  font-weight: 600;
  margin-bottom: var(--space-4);
  color: var(--color-gray-700);
}
.theme-preview__mono {
  font-family: var(--font-mono);
  font-size: var(--fs-xs);
  color: var(--color-gray-500);
}

/* Swatches */
.theme-preview__swatches { display: flex; gap: 1.5rem; flex-wrap: wrap; }
.theme-preview__swatch-group { display: flex; flex-direction: column; align-items: center; gap: 4px; font-family: var(--font-mono); font-size: var(--fs-xs); }
.theme-preview__swatch { width: 60px; height: 60px; border-radius: var(--radius-sm); }
.theme-preview__swatch--primary { background: var(--color-primary); }
.theme-preview__swatch--primary-light { background: var(--color-primary-light); border: 1px solid var(--color-border-light); }
.theme-preview__swatch--primary-dark { background: var(--color-primary-dark); }
/* Repeat for success, error, info */

/* Gray scale */
.theme-preview__grays { display: flex; gap: var(--space-2); }
.theme-preview__gray { width: 50px; height: 50px; border-radius: var(--radius-sm); display: flex; align-items: flex-end; padding: 4px; }
.theme-preview__gray span { font-family: var(--font-mono); font-size: 0.6rem; color: white; mix-blend-mode: difference; }
.theme-preview__gray--900 { background: var(--color-gray-900); }
/* etc... */

/* Gradients */
.theme-preview__gradient {
  height: 60px;
  width: 200px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
}
.theme-preview__gradient span { font-family: var(--font-mono); font-size: var(--fs-xs); color: white; }
.theme-preview__gradient--brand { background: var(--gradient-brand); }
.theme-preview__gradient--brand-soft { background: var(--gradient-brand-soft); border: 1px solid var(--color-border-light); }
.theme-preview__gradient-text { display: flex; align-items: center; }
.theme-preview__gradient-text span { font-family: var(--font-display); font-size: var(--fs-xl); font-weight: 700; }

/* Radius */
.theme-preview__radius {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}
.theme-preview__radius--sm  { width: 60px; height: 60px; background: var(--color-primary-light); border-radius: var(--radius-sm); }
.theme-preview__radius--md  { width: 60px; height: 60px; background: var(--color-primary-light); border-radius: var(--radius-md); }
.theme-preview__radius--pill { width: 100px; height: 40px; background: var(--color-primary-light); border-radius: var(--radius-pill); }

/* Font scale */
.theme-preview__type-scale { display: flex; flex-direction: column; gap: var(--space-3); }
.theme-preview__type-row { display: flex; align-items: baseline; gap: var(--space-4); }

/* Spacing scale */
.theme-preview__spacing-scale { display: flex; flex-direction: column; gap: var(--space-2); }
.theme-preview__spacing-row { display: flex; align-items: center; gap: var(--space-4); }
.theme-preview__spacing-bar { height: 12px; background: var(--color-primary); border-radius: var(--radius-sm); min-width: 4px; }

/* Components */
.theme-preview__row { display: flex; gap: var(--space-3); flex-wrap: wrap; align-items: center; }
.theme-preview__inputs { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); }
.theme-preview__cards { display: flex; gap: var(--space-4); flex-wrap: wrap; }

/* Dark mode overrides — apply when Mode: dark */
/* .theme-preview { background: #0a0a14; color: #e2e8f0; } */
/* .theme-preview__title { color: #e2e8f0; } */
/* .theme-preview__section h2 { color: #94a3b8; } */
/* .theme-preview__mono { color: #64748b; } */
```
