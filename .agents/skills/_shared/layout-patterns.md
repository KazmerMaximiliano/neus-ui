# Layout Patterns — Reference from new_design/kits

These patterns are derived from the four reference kits in `new_design/kits/` (dashboard, landing, docs, playground). They represent proven layout and information architecture decisions worth reusing.

**Usage:** These are optional reference patterns — consult them when the intake suggests a similar need, not as mandatory requirements. The `neus-designer` agent and individual skills may reference these when generating richer layouts.

---

## Dashboard Patterns

Source: `new_design/kits/dashboard.html`

### KPI Strip (4-column)

```css
.dashboard__kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
```

**KPI card anatomy:**
1. Monospace label + trend badge (top row)
2. Large value (primary content)
3. Footer note (muted mono, bottom)

```css
/* KPI label */
.kpi__label {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-gray-500);
}

/* KPI value */
.kpi__value {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-gray-900); /* or #e2e8f0 in dark mode */
}

/* KPI footer note */
.kpi__note {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-gray-400);
}
```

### Main Content — 2fr/1fr Panel Grid

For dashboard pages with a primary content area (chart, table) and a secondary panel (feed, summary):

```css
.dashboard__content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
}
```

### Panel Structure

Each content panel uses a consistent head + body structure:

```css
.panel {
  background: var(--color-white); /* or glass in dark mode */
  border: 1px solid var(--color-border-light);
  border-radius: 16px;
  overflow: hidden;
}

.panel__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border-light);
}

.panel__title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 15px;
}

/* Optional right-side controls (segmented buttons, tabs) */
.panel__controls {
  display: flex;
  gap: 4px;
  align-items: center;
}
```

### Table with Monospace Headers

```css
.data-table th {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-gray-500);
  padding: 10px 20px;
}

.data-table td {
  padding: 12px 20px;
  border-bottom: 1px solid var(--color-border-light);
}
```

### Activity Feed Pattern

Vertical list of timestamped entries with colored status dots:

```css
.feed__item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border-light);
}

.feed__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary);
  margin-top: 5px;
  flex-shrink: 0;
}

.feed__time {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-gray-400);
  white-space: nowrap;
}
```

---

## Landing Page Patterns

Source: `new_design/kits/landing.html`

### Hero Eyebrow Pill

Small pill above H1 — signals category or status:

```tsx
<div className="hero__eyebrow">
  <span className="hero__eyebrow-dot" />
  <span>Component Library</span>
</div>
```

```css
.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-primary);
  margin-bottom: 1.5rem;
}

.hero__eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-primary);
}
```

### Hero Showcase Grid (below CTAs)

Two-column grid after the CTA buttons — left: code/demo, right: preview:

```css
.hero__showcase {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 4rem;
}
```

### Stats Row

Large numbers with mono labels — signals scale/traction:

```css
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  padding: 5rem 2rem;
  text-align: center;
}

.stats__value {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  /* optionally: gradient text via .neus-gradient-text */
}

.stats__label {
  font-family: var(--font-mono);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-gray-500);
  margin-top: 0.5rem;
}
```

### Section Head Split (1fr/1fr)

Replaces centered H2 + body paragraph with a side-by-side split:

```css
.section__head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
  margin-bottom: 3rem;
}

.section__headline {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.section__description {
  font-size: 1.0625rem;
  color: var(--color-gray-600);
  line-height: 1.65;
}
```

### Feature Grid (3-column, fixed)

`repeat(3, 1fr)` with icon square + h3 + p. More structured than `auto-fit`:

```css
.features__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature__icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--color-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
```

### Compact Component Tile Grid

For "X components included" showcases — compact tiles with hover:

```css
.component-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}

.component-tile {
  padding: 12px;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 12px;
  text-align: center;
  cursor: default;
  transition: background 0.15s;
}

.component-tile:hover {
  background: var(--color-primary-light);
}
```

### CTA Bottom Card

Single large card with install command and CTA button:

```css
.cta-card {
  background: var(--color-primary-light);
  border: 1px solid var(--color-border-light);
  border-radius: 20px;
  padding: 4rem 3rem;
  text-align: center;
}

.cta-card__install {
  font-family: var(--font-mono);
  font-size: 13px;
  background: var(--color-gray-100);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  padding: 12px 20px;
  display: inline-block;
  margin: 1.5rem 0;
}
```

---

## Docs Layout Patterns

Source: `new_design/kits/docs.html`

### 3-Column Layout

Left nav (280px) + main content (fluid, max 880px) + right TOC (240px):

```css
.docs-layout {
  display: grid;
  grid-template-columns: 280px 1fr 240px;
  min-height: 100vh;
}

.docs-layout__main {
  padding: 40px 56px 80px;
  max-width: 880px;
}

.docs-layout__left {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.docs-layout__right {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  padding: 40px 24px;
}
```

### Docs Nav Group

Left sidebar with grouped nav items:

```css
.nav-group__title {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-gray-400);
  padding: 16px 20px 8px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  font-size: 13px;
  color: var(--color-gray-600);
  cursor: pointer;
  transition: background 0.15s;
}

.nav-item.active {
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-left: 2px solid var(--color-primary);
}
```

### Demo Block (Preview + Code Tabs)

```css
.demo {
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin: 2rem 0;
}

.demo__tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border-light);
  padding: 0 16px;
}

.demo__preview {
  padding: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.demo__code {
  padding: 20px 24px;
  font-family: var(--font-mono);
  font-size: 13px;
  overflow-x: auto;
}
```

### Props Table

```css
.props-table {
  width: 100%;
  border-collapse: collapse;
}

.props-table th {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-gray-500);
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-border-light);
  text-align: left;
}

.props-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--color-border-light);
  font-size: 14px;
}

/* Prop name: colored mono */
.props-table td:first-child {
  font-family: var(--font-mono);
  color: var(--color-primary);
  font-size: 13px;
}

/* Type: muted mono */
.props-table td:nth-child(2) {
  font-family: var(--font-mono);
  color: var(--color-info);
  font-size: 13px;
}
```

---

## Playground Patterns

Source: `new_design/kits/playground.html`

### 3-Column Tool Layout

Library (260px) + canvas (fluid) + controls (340px):

```css
.playground {
  display: grid;
  grid-template-columns: 260px 1fr 340px;
  grid-template-rows: 56px 1fr;
  height: 100vh;
}

.playground__topbar {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid var(--color-border-light);
}
```

### Canvas with Grid Overlay

```css
.canvas {
  position: relative;
  overflow: hidden;
}

.canvas__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--color-border-light) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border-light) 1px, transparent 1px);
  background-size: 32px 32px;
  pointer-events: none;
}

.canvas__stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 240px;
}
```

### Control Group

```css
.control-group {
  margin-bottom: 20px;
}

.control-group__title {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-gray-500);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border-light);
  margin-bottom: 12px;
}
```

---

## Mode-Adaptive Surface Recipes

Apply these to panel/card surfaces based on the resolved Mode from the VISUAL DIRECTIVE:

### Light mode (default)
```css
.surface {
  background: var(--color-white);
  border: 1px solid var(--color-border-light);
  border-radius: 16px;
}

.surface:hover {
  box-shadow: 0 4px 12px var(--color-shadow);
}
```

### Dark mode (glass)
```css
.surface {
  background: rgba(20, 20, 40, 0.55);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
}

.surface:hover {
  border-color: rgba(129, 140, 248, 0.3);
}

/* Canvas behind glass surfaces */
.page-canvas {
  background: #0a0a14;
  color: #e2e8f0;
  min-height: 100vh;
}
```

### Mode-adaptive nav (glass sticky)
```css
/* Light */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

/* Dark */
.nav--dark {
  background: rgba(10, 10, 20, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
```
