# Dark Surfaces — Copy-Pasteable CSS Reference

Read this file when `Mode: dark` is set in the VISUAL DIRECTIVE. It provides complete, drop-in CSS blocks for every dark surface used in Neus UI skills, and establishes which Neus UI components to use for each pattern.

Cross-reference with Section 9 of `design-personality.md` for the design rationale.

---

## 1 — Page Canvas

```css
/* Page root — dark canvas */
.your-page {
  min-height: 100vh;
  background: #0a0a14;
  color: #e2e8f0;
  overflow-x: hidden;
}

/* Mesh gradient layer — fixed, behind everything */
.your-page__mesh {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 60% 50% at 15% 0%, rgba(34,211,238,0.18), transparent 60%),
    radial-gradient(ellipse 60% 50% at 85% 30%, rgba(217,70,239,0.16), transparent 60%),
    radial-gradient(ellipse 80% 60% at 50% 90%, rgba(99,102,241,0.20), transparent 70%);
}

/* Grid overlay — subtle, masked to upper portion */
.your-page__grid {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.4;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 30%, black, transparent 80%);
}

/* Content wrapper — above mesh/grid layers */
.your-page__content {
  position: relative;
  z-index: 1;
}
```

Replace `.your-page` with the component BEM root (e.g. `.devblog-landing`).

---

## 2 — Glass Card → use `<Card variant="glass">`

For article cards, feature tiles, and info panels, use the Neus UI `<Card>` component with `variant="glass"`. The `card--glass` CSS class is defined in the component:

```tsx
import { Card } from 'neus-ui';

// Article card
<Card variant="glass" onClick={() => onArticleClick?.(article.id)}>
  {/* children */}
</Card>

// Feature tile
<Card variant="glass" icon={<SomeIcon size={24} />} title="Title" description="Description" />
```

No extra CSS needed. The glass surface (`backdrop-filter: blur(14px)`, `rgba(20,20,40,0.55)` background, `rgba(255,255,255,0.08)` border) is applied by `card--glass` in the component styles.

---

## 3 — Glass Nav (sticky top bar)

```css
.your-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px;
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(10,10,20,0.6);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}

/* Brand mark — gradient square with monospace initial */
.your-brand-mark {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: linear-gradient(135deg, #22d3ee 0%, #6366f1 50%, #d946ef 100%);
  display: grid;
  place-items: center;
  font-family: var(--font-mono);
  font-weight: 700;
  color: #0a0a14;
  font-size: 14px;
  letter-spacing: -0.04em;
  box-shadow: 0 0 24px rgba(99,102,241,0.45);
}

/* Nav links — use <Link type="secondary"> from neus-ui */
.your-nav-links {
  display: flex;
  gap: 28px;
  align-items: center;
}
```

Nav links **must** use `<Link type="secondary">` from Neus UI — not raw `<a>` tags:

```tsx
import { Link, Button } from 'neus-ui';

<nav className="your-nav">
  <div className="your-nav-brand">
    <div className="your-brand-mark" aria-hidden="true">P</div>
    <span>Brand</span>
  </div>
  <div className="your-nav-links">
    {navItems.map(item => (
      <Link key={item.href} type="secondary" href={item.href} label={item.label} />
    ))}
  </div>
  <Button label="Subscribe" variant="solid" color="primary" size="small" onClick={onCta} />
</nav>
```

---

## 4 — Newsletter / CTA Glow Card

The outer glow card is a CSS surface. The form inside uses Neus UI `<Input>` + `<Button>`.

### Glow card CSS:

```css
.your-nl-card {
  position: relative;
  overflow: hidden;
  background: rgba(15,15,30,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 64px 56px;
  text-align: center;
}

/* Radial glow behind content */
.your-nl-card::before {
  content: "";
  position: absolute;
  inset: -40% -10% auto -10%;
  height: 80%;
  background: radial-gradient(ellipse 50% 60% at 50% 50%, rgba(99,102,241,0.32), transparent 70%);
  z-index: -1;
  filter: blur(60px);
  pointer-events: none;
}

/* Subtle grid texture */
.your-nl-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent 80%);
  z-index: 0;
  pointer-events: none;
}

/* All direct children above pseudo layers */
.your-nl-card > * { position: relative; z-index: 1; }
```

### Newsletter form — use Neus UI `<Input>` + `<Button>`:

```tsx
import { Input, Button } from 'neus-ui';

<div className="your-nl-form">
  <Input
    name="newsletter-email"
    type="email"
    label="Email"
    placeholder="your@email.com"
    value={email}
    onChange={setEmail}
    required
  />
  <Button
    label={loading ? "…" : "Subscribe"}
    type="submit"
    variant="solid"
    color="primary"
    loading={loading}
    onClick={() => onSubscribe?.(email)}
  />
</div>
```

```css
.your-nl-form {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  max-width: 520px;
  margin: 0 auto;
}
```

Input and Button are dark-mode native (all token-based). No extra CSS needed for them.

---

## 5 — Eyebrow Pill (dark hero)

```css
.your-eyebrow-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 28px;
}

.your-eyebrow-pill__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22d3ee;
  box-shadow: 0 0 12px #22d3ee;
  flex-shrink: 0;
}
```

Usage in TSX (raw div — no Neus UI equivalent for this pattern):

```tsx
<div className="your-eyebrow-pill">
  <span className="your-eyebrow-pill__dot" aria-hidden="true" />
  BRAND NAME
  <span style={{ color: "#475569" }}>/</span>
  TAGLINE KEYWORD
</div>
```

---

## 6 — Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, #22d3ee 0%, #818cf8 45%, #d946ef 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Apply as `<span className="gradient-text">` around accent word(s) in H1 or newsletter heading. Define the class in the component's `.styles.css`.

---

## 7 — Category Pills → use `<Badge variant="solid">`

For editorial category tags, use Neus UI `<Badge>` with semantic color mapping. Do NOT use raw `<span>` tags with custom CSS color classes.

**Canonical BADGE_COLOR mapping** (define this constant in the component's `.types.ts`):

```ts
import type { BadgeColor } from 'neus-ui';

export const BADGE_COLOR: Record<string, BadgeColor> = {
  systems:  "primary",  // indigo — #a5b4fc in dark
  design:   "error",    // red/magenta — #ef5350 in dark
  craft:    "neutral",  // gray — #64748b in dark
  tools:    "success",  // green — #66bb6a in dark
  featured: "primary",
};
```

**Note:** `primary` and `info` resolve to the same color in dark mode — only use 4 of the 5 semantic colors for distinct categories.

Usage:

```tsx
import { Badge } from 'neus-ui';

{article.categories?.map(cat => (
  <Badge
    key={cat}
    variant="solid"
    color={BADGE_COLOR[cat] ?? "neutral"}
    label={cat}
  />
))}
```

---

## 8 — Featured Content Art Panel

This is decorative — no Neus UI component equivalent. Raw HTML + CSS is correct here:

```css
.your-featured-art {
  background:
    radial-gradient(ellipse 70% 60% at 30% 30%, rgba(34,211,238,0.45), transparent 60%),
    radial-gradient(ellipse 60% 60% at 80% 80%, rgba(217,70,239,0.5), transparent 60%),
    #0e0e22;
  min-height: 360px;
  position: relative;
  overflow: hidden;
}

/* Inner grid texture */
.your-featured-art::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent 80%);
}

/* Code glyph — centered decorative text */
.your-featured-art__glyph {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-mono);
  font-size: 96px;
  font-weight: 700;
  color: rgba(255,255,255,0.95);
  letter-spacing: -0.04em;
  text-shadow: 0 0 60px rgba(99,102,241,0.6);
  user-select: none;
}

/* Blinking cursor inside glyph */
.your-featured-art__cursor {
  display: inline-block;
  width: 0.12em;
  height: 0.9em;
  background: #22d3ee;
  margin-left: 0.06em;
  vertical-align: -0.05em;
  animation: blink 1s steps(2) infinite;
}

@keyframes blink { 50% { opacity: 0; } }
```

TSX usage:

```tsx
<div className="your-featured-art" aria-hidden="true">
  <div className="your-featured-art__glyph">
    {"</>"}
    <span className="your-featured-art__cursor" />
  </div>
</div>
```

---

## 9 — Meta Row (author + date, dark)

No Neus UI equivalent — raw HTML + CSS:

```css
.meta-row {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #64748b;
  font-size: 12px;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  padding-top: 12px;
  border-top: 1px solid rgba(255,255,255,0.05);
}

/* Avatar circle — gradient fill */
.meta-row__avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, #22d3ee, #6366f1);
  display: grid;
  place-items: center;
  color: #0a0a14;
  font-weight: 700;
  font-size: 11px;
  font-family: var(--font-display);
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

.meta-row__author { color: #cbd5e1; }
.meta-row__sep { color: #334155; }
```

---

## 10 — Dark Footer → use `<Link type="secondary">`

Footer links **must** use `<Link type="secondary">` — not raw `<a>` tags:

```css
.your-footer {
  padding: 36px 32px 48px;
  border-top: 1px solid rgba(255,255,255,0.06);
  color: #64748b;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.your-footer-links {
  display: flex;
  gap: 24px;
  align-items: center;
}
```

```tsx
import { Link } from 'neus-ui';

<footer className="your-footer">
  <span>© {new Date().getFullYear()} Brand.</span>
  <div className="your-footer-links">
    {footerLinks.map(link => (
      <Link key={link.href} type="secondary" href={link.href} label={link.label} />
    ))}
  </div>
</footer>
```

---

## Responsive Breakpoints (dark mode landings)

```css
@media (max-width: 960px) {
  /* featured split → stack */
  .your-featured { grid-template-columns: 1fr; }
  .your-featured-art { min-height: 220px; }
  .your-featured-art__glyph { font-size: 64px; }

  /* article grid → single column */
  .your-article-grid { grid-template-columns: 1fr; }

  /* section head → stack */
  .your-section-head { flex-direction: column; align-items: flex-start; }

  /* newsletter card → tighter padding */
  .your-nl-card { padding: 48px 24px; }
}

@media (max-width: 640px) {
  /* nav → hide links, show mobile toggle */
  .your-nav-links { display: none; }
  .your-nav-links--open { display: flex; flex-direction: column; }
}
```

---

## Component Usage Summary

| Pattern | Use |
|---|---|
| Article / feature cards | `<Card variant="glass">` |
| Nav links | `<Link type="secondary">` |
| Footer links | `<Link type="secondary">` |
| "See all" links | `<Link type="secondary">` |
| Category pills | `<Badge variant="solid" color={BADGE_COLOR[cat]}>` |
| Newsletter form | `<Input>` + `<Button>` in flex layout |
| Primary CTA buttons | `<Button variant="solid" color="primary">` |
| Secondary CTA buttons | `<Button variant="outlined" color="primary">` |
| Eyebrow pill | raw div (no Neus UI equivalent) |
| Brand mark | raw div (no Neus UI equivalent) |
| Art panel / code glyph | raw div (decorative, no Neus UI equivalent) |
| Meta row (author/date) | raw div (no Neus UI equivalent) |
