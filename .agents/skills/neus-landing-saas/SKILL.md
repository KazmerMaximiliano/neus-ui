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
- `.agents/skills/_shared/anti-slop.md` — "Marketing Pages" section
- `.agents/skills/_shared/component-catalog.md` — Button, Card, Link sections
- `.agents/skills/_shared/theme-config.md` — for ThemeProvider config
- `references/landing-sections.md` — section patterns

## Phase 0 — Collect Data

Use `AskUserQuestion` in ONE call:

```json
{
  "questions": [
    {
      "question": "Will the landing include a pricing section?",
      "header": "Pricing",
      "multiSelect": false,
      "options": [
        { "label": "Yes, with plans and prices (Recommended)", "description": "Section with pricing plan cards" },
        { "label": "No, just hero + features + CTA", "description": "Landing without pricing" }
      ]
    },
    {
      "question": "Will it include social proof (testimonials or metrics)?",
      "header": "Social proof",
      "multiSelect": false,
      "options": [
        { "label": "Yes, real testimonials/metrics", "description": "User will provide them" },
        { "label": "No social proof", "description": "Omit testimonials section" }
      ]
    }
  ]
}
```

Also ask in free text:
- Product name and tagline (1 line)
- Features to highlight (max 6, exact: title + short description)
- Primary CTA: button text + destination
- If pricing: plans (name + price + period + included features — exact)
- If social proof: exact testimonials or metrics (if said "no", omit completely)
- Primary theme color (hex or "use default")
- Header nav items (navigation links)

## Phase 1 — P0 Verification

- [ ] ZERO invented data — everything comes from intake or user explicitly stated what to use
- [ ] No AppTemplate, no Sidebar
- [ ] Exact features from intake (do not add "intuitive" extras)
- [ ] If said "no social proof" → zero testimonials in output

## Phase 2 — Generate Artifact

Read `references/landing-sections.md` for each section's patterns.

### Base component structure

```tsx
import { Button, Card, Link } from 'neus-ui';

type LandingProps = {
  // Static content — no API props for marketing copy
};

export const ProductLanding = () => {
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
          <Link label="Watch demo" type="secondary" href="#demo" />
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

## Missing Neus UI Components

This skill requires components not yet available. Implement with CSS:
- **NavigationBar**: `<header>` with flex nav — document as pending
- **FeatureTile**: Use `Card` with `leading` prop for the icon
- **TestimonialCard**: Use `Card` with `avatarImage` + blockquote content (if requested)
- **PricingCard**: Use `Card` with custom pricing structure (if requested)

Document each in NEUS-DESING.md "Pending Components" section.

## Phase 3 — Theme CSS

```css
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
  text-align: center;
  padding: 5rem 2rem;
  max-width: 800px;
  margin: 0 auto;
}
.landing__hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; color: var(--color-gray-900); margin-bottom: 1rem; }
.landing__hero p { font-size: 1.25rem; color: var(--color-gray-600); margin-bottom: 2rem; }
.landing__hero-cta { display: flex; gap: 1rem; justify-content: center; align-items: center; }
.landing__features { padding: 4rem 2rem; max-width: 1200px; margin: 0 auto; }
.landing__features h2 { text-align: center; font-size: 2rem; font-weight: 600; margin-bottom: 3rem; color: var(--color-gray-900); }
.landing__features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
```
