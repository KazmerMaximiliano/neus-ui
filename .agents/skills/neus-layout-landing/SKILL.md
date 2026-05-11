---
name: neus-layout-landing
description: |
  Generates a marketing page shell without sidebar — sticky header, main content area, footer.
  Produces a .tsx layout wrapper for landing pages and public-facing pages. NO AppTemplate.
  Use when user needs the shell structure for marketing pages before adding content.
  Trigger: "shell de landing", "layout de marketing", "layout sin sidebar", "marketing shell",
  "layout de página pública", "header + footer layout", "base de landing".
od:
  mode: prototype
  platform: web
  scenario: marketing
  design_system:
    requires: true
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Landing shell for Facturo with nav header and footer"
---

# Neus Layout Landing

Generates a public page shell: sticky header + main + footer. No AppTemplate, no sidebar.

## Before starting

The "Shared Rules" section below is always active. Additionally read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Button, Link sections
- `.agents/skills/_shared/theme-config.md` — ThemeProvider config
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates
- `.agents/skills/_shared/dark-surfaces.md` — dark mode CSS recipes (read when Mode: dark)
- `.agents/skills/_shared/light-surfaces.md` — light mode CSS recipes (read when Mode: light)

## Phase 0 — Collect Data

Ask in free text:
1. Brand/product name (for the logo in the header)
2. Header nav items (exact links)
3. Header CTA? (button text — e.g.: "Get started free")
4. Footer: link columns or copyright only
5. Primary theme color
6. **Theme mode**: light or dark? (default: light)

## Phase 1 — Visual Resolution

Before writing any code, resolve the VISUAL DIRECTIVE from the intake answers.

- Mode: `dark` → read `dark-surfaces.md`; use dark canvas `#0a0a14`, glass nav, glass surfaces
- Mode: `light` → read `light-surfaces.md`; use `var(--color-white)` canvas, solid white nav

Declare the directive:

```
VISUAL DIRECTIVE
  Mode: dark | light
  Surface file: dark-surfaces.md | light-surfaces.md
```

## Phase 2 — Generate

Produce **three files** in this order: `LandingLayout.types.ts` → `LandingLayout.tsx` → `LandingLayout.styles.css`.

### LandingLayout.types.ts

```ts
export type NavItem = {
  label: string;
  href: string;
};

export type LandingLayoutProps = {
  children: React.ReactNode;
};
```

### LandingLayout.tsx

```tsx
import { Button, Link, ThemeProvider } from 'neus-ui';
import './LandingLayout.styles.css';
import type { LandingLayoutProps } from './LandingLayout.types';

export const LandingLayout = ({ children }: LandingLayoutProps) => (
  <ThemeProvider initialTheme={{ primaryColor: '[hex from intake]' }}>
    <div className="landing-layout">
      {/* Sticky Navigation Header */}
      <header className="landing-layout__header">
        <div className="landing-layout__header-inner">
          <span className="landing-layout__brand">[BrandName]</span>
          <nav className="landing-layout__nav">
            {/* Nav items from intake — type="primary" on white header background */}
            <Link label="[NavItem1]" type="primary" href="#[section]" />
          </nav>
          <Button label="[Header CTA]" variant="solid" color="primary" onClick={() => {}} />
        </div>
      </header>

      {/* Page content */}
      <main className="landing-layout__main">
        {children}
      </main>

      {/* Footer */}
      <footer className="landing-layout__footer">
        <span>[BrandName] © {new Date().getFullYear()}</span>
        <div className="landing-layout__footer-links">
          <Link label="Terms" type="secondary" href="/terms" />
          <Link label="Privacy" type="secondary" href="/privacy" />
        </div>
      </footer>
    </div>
  </ThemeProvider>
);
```

### LandingLayout.styles.css

Apply Mode from VISUAL DIRECTIVE. Use surface recipes from the resolved surface file.

**Light mode (Mode: light):**

```css
.landing-layout { min-height: 100vh; display: flex; flex-direction: column; background: var(--color-white); }
.landing-layout__header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border-light);
}
.landing-layout__header-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}
.landing-layout__brand {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-primary);
}
.landing-layout__nav { display: flex; gap: 1.5rem; align-items: center; }
.landing-layout__main { flex: 1; }
.landing-layout__footer {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--color-border-light);
  font-size: 0.9rem;
  color: var(--color-gray-500);
}
.landing-layout__footer-links { display: flex; gap: 1rem; }
```

**Dark mode (Mode: dark) — use instead of light mode rules:**

```css
.landing-layout { min-height: 100vh; display: flex; flex-direction: column; background: #0a0a14; color: #e2e8f0; }
.landing-layout__header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 20, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
/* (header-inner, brand, nav, main — same as light) */
.landing-layout__brand { color: #818cf8; }
.landing-layout__footer {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.9rem;
  color: #64748b;
}
```

---

## Shared Rules (Embedded)

> These rules are always active. They apply even if `_shared/` files are not read.

### Output — always three files

Every skill output: `ComponentName.types.ts` → `ComponentName.tsx` → `ComponentName.styles.css`.
No inline styles (`style={{}}`). No `<style>` tags inside components. CSS only in `.styles.css`.

### Imports

```tsx
import { Button, Card, Input, Badge, Link, Select, Modal, DataTable } from 'neus-ui';
```

Never import from internal paths like `../../components/Button/Button`.

### Types

All `type` / `interface` declarations → `ComponentName.types.ts`. Never declare types in `.tsx`.

### React 19 — No FormEvent

Never `import { FormEvent } from 'react'`. Use `<Button type="submit" onClick={...} />` instead.

### Component Prop Constraints

- **Button** `variant`: `"solid"` | `"outlined"` | `"text"` — `"ghost"` does NOT exist
- **Button** `color`: `"primary"` | `"success"` | `"error"` | `"info"` | `"white"` — `"white"` for dark canvas only
- **Button** `size`: `"small"` | `"medium"` | `"large"`
- **Card** `variant`: `"default"` | `"glass"` — `"glass"` for dark canvas
- **Badge** `color`: `"primary"` | `"success"` | `"error"` | `"info"` | `"neutral"`
- **Link** `type`: `"primary"` (brand) | `"secondary"` (muted gray)
- **Select**: no `required` prop — handle validation externally
- **FormTemplate**: only `children`, `submitLabel`, `loading` — no `onSubmit`/`onCancel`

### Slop Blacklist

- No inline styles / `style={{}}` / `<style>` tags
- No hardcoded data arrays when data comes from API — use typed props
- No invented copy (fake testimonials, placeholder names, fake metrics)
- No `any` TypeScript type
- No raw `<a>`, `<span>`, `<input>`, `<button>` when a Neus UI component exists
- No hardcoded font stacks — use `var(--font-display)` / `var(--font-mono)`
- In dark mode: no `var(--color-primary-light)` as section background; no raw div cards — use `<Card variant="glass">`
