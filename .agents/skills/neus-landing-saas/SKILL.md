---
name: neus-landing-saas
description: |
  Generates a complete SaaS landing page with hero, features, social proof, pricing, and footer CTA.
  Produces a .tsx file using Neus UI Button, Card, and Link components with custom nav header.
  NO AppTemplate — this is a public marketing page, not an app dashboard.
  Use whenever the user asks for: "landing page", "página de producto", "saas landing",
  "hero + features", "landing de mi app", "página de presentación del producto",
  "marketing page", "website de mi SaaS", "product page". Always use for SaaS/product marketing pages.
od:
  mode: prototype
  platform: web
  scenario: marketing
  design_system:
    requires: true
  inputs:
    - name: product_name
      type: string
      required: true
      description: "Product or brand name"
    - name: tagline
      type: string
      required: true
      description: "One-line tagline"
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Landing page for Facturo, my invoicing app for SMBs, with 4 features and 2 pricing plans"
---

# Neus Landing SaaS

Generates a product landing page with hero, features, optional social proof, optional pricing, and footer CTA.

**IMPORTANT**: This page does NOT use AppTemplate. It is a public marketing page.

## Before starting

Read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules ("Marketing Pages" section)
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Button, Card, Link sections
- `.agents/skills/_shared/theme-config.md` — ThemeProvider config
- `.agents/skills/_shared/design-personality.md` — apply VISUAL DIRECTIVE from neus-designer context; enforce layout composition, typography scale, color usage, and animation budget
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates
- `references/landing-sections.md` — section patterns

## Phase 0 — Collect Data

Ask the user these questions and wait for their complete reply before generating:

---

**Pricing** — Will the landing include a pricing section?
- Yes, with plans and prices (recommended) — section with pricing plan cards
- No, just hero + features + CTA — landing without pricing

**Social proof** — Will it include social proof (testimonials or metrics)?
- Yes, real testimonials/metrics — user will provide them
- No social proof — omit testimonials section entirely

Also include in your reply:
- Product name and tagline (1 line)
- Features to highlight (max 6, exact: title + short description)
- Primary CTA: button text + destination
- If pricing: plans (name + price + period + included features — exact)
- If social proof: exact testimonials or metrics (if said "no", omit completely)
- Primary theme color (hex or "use default")
- Header nav items (navigation links)

---

## Phase 1 — P0 Verification

- [ ] ZERO invented data — everything comes from intake or user explicitly stated what to use
- [ ] No AppTemplate, no Sidebar
- [ ] Exact features from intake (do not add "intuitive" extras)
- [ ] If said "no social proof" → zero testimonials in output

## Phase 2 — Generate Artifact

Read `references/landing-sections.md` for each section's patterns.

Produce **three files** in this order: `ProductLanding.types.ts` → `ProductLanding.tsx` → `ProductLanding.styles.css`.

### ProductLanding.types.ts

```ts
export type NavItem = {
  label: string;
  href: string;
};

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

export type PricingPlan = {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export type ProductLandingProps = {
  // Static marketing content — no API props
  onGetStarted?: () => void;
};
```

### Base component structure

```tsx
import { Button, Card, Link } from 'neus-ui';
import './ProductLanding.styles.css';
import type { ProductLandingProps } from './ProductLanding.types';

export const ProductLanding = ({ onGetStarted }: ProductLandingProps) => {
  return (
    <div className="landing">
      {/* 1. Navigation Header */}
      <header className="landing__nav">...</header>

      {/* 2. Hero */}
      <section className="landing__hero">
        <h1>[Product Name] — [Tagline from intake]</h1>
        <p>[Subheading from intake]</p>
        <div className="landing__hero-cta">
          <Button label="[CTA from intake]" variant="solid" color="primary" />
          {/* Secondary link in hero: use type="primary" — hero has a light background */}
          <Link label="See how it works" type="primary" href="#features" />
        </div>
      </section>

      {/* 3. Features (exact features from intake) */}
      <section className="landing__features">
        <h2>Features</h2>
        <div className="landing__features-grid">
          {/* Card per feature — exactly as specified */}
        </div>
      </section>

      {/* 4. Social Proof (only if requested + data provided) */}
      {/* 5. Pricing (only if requested) */}
      {/* 6. Footer CTA */}
      {/* 7. Footer */}
    </div>
  );
};
```

## Feature Tile

Use `Card` with `icon`, `title`, and `description` slots:

```tsx
<Card
  icon={<SomeIcon size={24} color="var(--color-primary)" />}
  title="[Feature title from intake]"
  description="[Feature description from intake]"
/>
```

## Pricing Card

Use `Card` with `highlighted` prop. Compose full content in `children`:

```tsx
<Card highlighted={plan.highlighted}>
  {plan.highlighted && <span className="pricing__badge">Most popular</span>}
  <p className="pricing__name">{plan.name}</p>
  <div className="pricing__amount">
    <span className="pricing__price">{plan.price}</span>
    <span className="pricing__period">{plan.period}</span>
  </div>
  <ul className="pricing__features">
    {plan.features.map((f) => (
      <li key={f}><span aria-hidden="true">✓</span> {f}</li>
    ))}
  </ul>
  <Button
    label={plan.cta}
    variant={plan.highlighted ? "solid" : "outlined"}
    color="primary"
    fullWidth
  />
</Card>
```

## Missing Neus UI Components

- **NavigationBar**: `<header>` with flex nav — document as pending
- **TestimonialCard**: Use `Card` with `avatarImage` + blockquote content (if requested)

## Phase 3 — ProductLanding.styles.css

```css
@keyframes neus-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.landing { font-family: inherit; }
.landing__nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border-light);
  box-shadow: 0 2px 8px var(--color-shadow);
}
.landing__hero {
  display: grid;
  grid-template-columns: 1.4fr 0.6fr;
  align-items: center;
  gap: 3rem;
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
/* If no visual element on right side, use centered single-column: */
/* .landing__hero { text-align: center; padding: 6rem 2rem; max-width: 800px; margin: 0 auto; } */
.landing__hero h1 {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
  animation: neus-fade-up 0.5s ease forwards;
}
.landing__hero p {
  font-size: 1.25rem;
  color: var(--color-gray-600);
  margin-bottom: 2rem;
  animation: neus-fade-up 0.5s 0.1s ease both;
}
.landing__hero-cta {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1.5rem;
  animation: neus-fade-up 0.5s 0.2s ease both;
}
.landing__features { padding: 6rem 2rem; max-width: 1200px; margin: 0 auto; }
.landing__features h2 { text-align: center; font-size: 2rem; font-weight: 700; margin-bottom: 3rem; color: var(--color-gray-900); }
/* Flagship feature: first card spans full width */
.landing__features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
.landing__features-grid > *:first-child { grid-column: 1 / -1; }
/* Staggered card animation */
.landing__features-grid > *:nth-child(1) { animation: neus-fade-up 0.5s 0.05s ease both; }
.landing__features-grid > *:nth-child(2) { animation: neus-fade-up 0.5s 0.15s ease both; }
.landing__features-grid > *:nth-child(3) { animation: neus-fade-up 0.5s 0.25s ease both; }
.landing__features-grid > *:nth-child(4) { animation: neus-fade-up 0.5s 0.35s ease both; }
/* Alternating section backgrounds */
.landing__features-alt { background: var(--color-primary-light); }
/* Footer CTA */
.landing__cta-section { background: var(--color-primary-light); padding: 6rem 2rem; text-align: center; }
```
