---
name: neus-landing-generic
description: |
  Generates a flexible general-purpose landing page with hero, content sections, and CTA.
  Produces a .tsx file using Neus UI Button, Card, and Link. NO AppTemplate.
  Use whenever the user asks for: "landing genérica", "página de presentación", "landing de X"
  (when X is not a SaaS product), "portfolio landing", "landing de empresa", "landing de evento",
  "agency landing", "personal page". Use when neus-landing-saas doesn't fit the context.
od:
  mode: prototype
  platform: web
  scenario: marketing
  design_system:
    requires: true
  inputs:
    - name: page_name
      type: string
      required: true
      description: "Page name or topic"
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Landing page for a design agency with hero, services, and contact form"
---

# Neus Landing Generic

Generates a general-purpose landing with hero, content sections, and CTA. Adapts to the user's purpose.

**IMPORTANT**: No AppTemplate. Public page.

## Before starting

Read:
- `.agents/skills/_shared/anti-slop.md` — "Marketing Pages" section
- `.agents/skills/_shared/component-catalog.md` — Button, Card, Link, Input sections

## Phase 0 — Collect Data

Ask in free text via `AskUserQuestion`:
1. What type of page is it? (portfolio, company, event, agency, personal, other)
2. Page name/brand
3. Main headline (H1)
4. Sections to include (exact — do not add more)
5. Primary CTA: text + destination
6. Does it include a contact form? (yes/no)
7. Primary theme color

## Phase 1 — P0 Verification

- [ ] Output sections == intake sections
- [ ] No invented copy — everything comes from the user
- [ ] No AppTemplate or sidebar

## Phase 2 — Generate Artifact

Produce the page with exactly the sections requested. Flexible structure based on landing type. Use the same CSS patterns from `neus-landing-saas` references for style consistency.

If it includes a contact form:
```tsx
<section className="landing__contact">
  <h2>Contact</h2>
  <div className="landing__contact-form">
    <Input name="name" label="Name" required />
    <Input name="email" label="Email" type="email" required />
    <Button label="Send" type="submit" variant="solid" color="primary" />
  </div>
</section>
```
