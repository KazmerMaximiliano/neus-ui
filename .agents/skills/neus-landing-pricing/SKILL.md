---
name: neus-landing-pricing
description: |
  Generates a standalone pricing page with plan cards, feature comparison table, FAQ, and CTA.
  Produces a .tsx file using Neus UI Button, Card, and Link components. NO AppTemplate.
  Use whenever the user asks for: "página de precios", "pricing page", "planes y precios",
  "cuánto cuesta", "pricing standalone", "comparar planes", "tabla de precios".
  Always use for any dedicated pricing page in a Neus UI project.
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
      description: "Product name"
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Pricing page for Facturo with Free, Pro, and Enterprise plans"
---

# Neus Landing Pricing

Generates a standalone pricing page with plan cards, comparison table, and FAQ.

**IMPORTANT**: No AppTemplate. Public marketing page.

## Before starting

Read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules ("Marketing Pages" section)
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Button, Card, Link sections
- `.agents/skills/_shared/design-personality.md` — apply VISUAL DIRECTIVE; recommended plan card gets `highlighted={true}` and `grid-column: span 2` treatment, section background uses `var(--color-primary-light)`
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates
- `references/pricing-layouts.md` — plan card and FAQ patterns

## Phase 0 — Collect Data

Ask the user these questions and wait for their complete reply before generating:

---

**Comparison** — Will it include a feature comparison table?
- Yes, feature comparison table (recommended) — table with all features and which plan includes each
- No, just plan cards — no comparison table

**FAQ** — Will it include a FAQ section?
- Yes, with real questions — user will provide exact questions
- Yes, generate 4 generic FAQs — generate typical product FAQs
- No FAQ — omit the section

Also include in your reply:
- Product name
- Plans (name + price + period + list of included features — exact per plan)
- CTA per plan (button text + destination)
- If FAQ: exact questions and answers (or confirm generic generation)
- If there is a "featured" or "recommended" plan → indicate which one
- Primary theme color

---

## Phase 1 — P0 Verification

- [ ] Plans and features in output == intake (exact)
- [ ] No invented pricing or feature data
- [ ] FAQ real or generic per user's choice

## Phase 2 — Generate Artifact

Read `references/pricing-layouts.md`.

## Pricing Card

Use `Card` with `highlighted` prop. Compose full content in `children`:

```tsx
import { Card, Button } from 'neus-ui';

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

- **Accordion/FAQ**: Use `<details>`/`<summary>` native HTML — document as pending
