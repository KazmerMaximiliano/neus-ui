# Light Mode — Surface Recipes

Use this file when `Mode: light` is resolved in Phase 1 Visual Resolution.

---

## Page Canvas

```css
background: var(--color-white);
color: var(--color-text-primary); /* #333333 */
```

---

## Navigation — White with Bottom Border

```tsx
<nav className="nav">
  <div className="nav__brand">
    <span className="nav__logo-text">Brand</span>
  </div>
  <div className="nav__links">
    <Link label="Features" type="primary" href="#features" />
    <Link label="Pricing" type="primary" href="#pricing" />
    <Link label="Blog" type="primary" href="#blog" />
  </div>
  <div className="nav__cta">
    <Button label="Get Started" variant="solid" color="primary" size="small" />
  </div>
</nav>
```

```css
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  height: 64px;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border-light);
}
```

---

## Section — Alternating Backgrounds

Alternate between white and a soft primary tint every other section:

```css
.section {
  padding: 5rem 2rem;
  background: var(--color-white);
}

.section--tinted {
  padding: 5rem 2rem;
  background: var(--color-primary-light); /* rgba(40,53,147,0.1) — light indigo wash */
}
```

---

## Card — Default (Light)

Standard `<Card>` renders light surface from token. No extra CSS needed.

```tsx
<Card>
  <p className="feature__title">Title</p>
  <p className="feature__desc">Description</p>
</Card>
```

For feature grids:
```css
.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

---

## Hero Section

```tsx
<section className="hero">
  <p className="hero__eyebrow neus-eyebrow">Category · Tagline</p>
  <h1 className="hero__title">Main Headline<br /><span className="hero__title-accent">Accented Part</span></h1>
  <p className="hero__subtitle">Supporting description text</p>
  <div className="hero__actions">
    <Button label="Primary CTA" variant="solid" color="primary" size="large" />
    <Button label="Secondary CTA" variant="outlined" color="primary" size="large" />
  </div>
</section>
```

```css
.hero {
  padding: 6rem 2rem 5rem;
  text-align: center;
}

.hero__eyebrow {
  /* neus-eyebrow utility handles color: var(--color-primary) */
}

.hero__title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  color: var(--color-text-primary);
  line-height: 1.1;
  margin: 1rem 0;
}

.hero__title-accent {
  color: var(--color-primary);
}

.hero__subtitle {
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto 2.5rem;
}

.hero__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
```

---

## CTA / Newsletter Block

```tsx
<section className="cta-block">
  <h2 className="cta-block__title">Stay in the loop</h2>
  <p className="cta-block__subtitle">Get updates delivered to your inbox.</p>
  <div className="cta-block__form">
    <Input name="email" placeholder="your@email.com" type="email" />
    <Button label="Subscribe" variant="solid" color="primary" />
  </div>
</section>
```

```css
.cta-block {
  background: var(--color-primary-light);
  padding: 5rem 2rem;
  text-align: center;
  border-radius: var(--radius-default);
  margin: 2rem auto;
  max-width: 640px;
}

.cta-block__title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.75rem;
}

.cta-block__subtitle {
  color: var(--color-text-secondary);
  margin-bottom: 2rem;
}

.cta-block__form {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 480px;
  margin: 0 auto;
}
```

---

## Badge — Category Pills (Light Mode)

```tsx
const BADGE_COLOR: Record<string, BadgeColor> = {
  design: "primary",
  engineering: "success",
  product: "info",
  default: "neutral",
};
```

All 5 Badge colors are distinguishable on light backgrounds.

---

## Footer

```tsx
<footer className="footer">
  <div className="footer__brand">
    <span className="footer__logo">Brand</span>
    <p className="footer__tagline">Short tagline here.</p>
  </div>
  <nav className="footer__links">
    <Link label="Privacy" type="secondary" href="/privacy" />
    <Link label="Terms" type="secondary" href="/terms" />
    <Link label="Contact" type="secondary" href="/contact" />
  </nav>
  <p className="footer__copy">© 2025 Brand. All rights reserved.</p>
</footer>
```

```css
.footer {
  padding: 3rem 2rem;
  border-top: 1px solid var(--color-border-light);
  color: var(--color-text-muted);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.footer__logo {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary);
}

.footer__tagline {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.footer__links {
  display: flex;
  gap: 2rem;
}

.footer__copy {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}
```

---

## Component Quick Reference — Light Mode

| Pattern | Component | Props |
|---------|-----------|-------|
| Primary CTA button | `<Button>` | `variant="solid" color="primary"` |
| Secondary / cancel button | `<Button>` | `variant="outlined" color="primary"` |
| Tertiary text link | `<Button>` | `variant="text" color="primary"` |
| Nav links | `<Link>` | `type="primary"` |
| Footer links | `<Link>` | `type="secondary"` |
| Category pill | `<Badge>` | `variant="solid" color={BADGE_COLOR[cat]}` |
| Newsletter input | `<Input>` | `type="email" placeholder="..."` |
| Feature tile | `<Card>` | `variant="default"` (no variant needed) |
| Page canvas | `<div>` | `background: var(--color-white)` |
| Tinted section | `<section>` | `background: var(--color-primary-light)` |
| Eyebrow text | `.neus-eyebrow` | utility class — `color: var(--color-primary)` |

---

## What NOT to do in Light Mode

- Do NOT use `color="white"` on Button — white on white is invisible
- Do NOT use `Card variant="glass"` — glass effect requires a dark/blurred background
- Do NOT use hardcoded `#ffffff` for text — use `var(--color-text-primary)` or `var(--color-text-secondary)`
- Do NOT use raw `<a>`, `<button>`, `<input>` — use `<Link>`, `<Button>`, `<Input>`
- Do NOT add `backdrop-filter` — no glass surfaces exist in light mode
