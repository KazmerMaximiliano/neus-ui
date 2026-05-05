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
- `.agents/skills/_shared/anti-slop.md` — "Marketing Pages" section
- `references/pricing-layouts.md` — plan card and FAQ patterns

## Phase 0 — Collect Data

Use `AskUserQuestion` in ONE call:

```json
{
  "questions": [
    {
      "question": "Will it include a feature comparison table?",
      "header": "Comparison",
      "multiSelect": false,
      "options": [
        { "label": "Yes, feature comparison table (Recommended)", "description": "Table with all features and which plan includes each" },
        { "label": "No, just plan cards", "description": "No comparison table" }
      ]
    },
    {
      "question": "Will it include a FAQ section?",
      "header": "FAQ",
      "multiSelect": false,
      "options": [
        { "label": "Yes, with real questions", "description": "User will provide exact questions" },
        { "label": "Yes, generate 4 generic FAQs", "description": "Generate typical product FAQs" },
        { "label": "No FAQ", "description": "Omit the section" }
      ]
    }
  ]
}
```

Also ask in free text:
- Product name
- Plans (name + price + period + list of included features — exact per plan)
- CTA per plan (button text + destination)
- If FAQ: exact questions and answers (or confirm generic generation)
- If there is a "featured" or "recommended" plan → indicate which one
- Primary theme color

## Phase 1 — P0 Verification

- [ ] Plans and features in output == intake (exact)
- [ ] No invented pricing or feature data
- [ ] FAQ real or generic per user's choice

## Phase 2 — Generate Artifact

Read `references/pricing-layouts.md`.

## Missing Neus UI Components

- **Accordion/FAQ**: Use `<details>`/`<summary>` native HTML — document as pending
- **PricingCard**: Use custom structure with Card — document as pending
