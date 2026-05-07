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
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules ("Marketing Pages" section)
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Button, Card, Link, Input sections
- `.agents/skills/_shared/design-personality.md` — apply VISUAL DIRECTIVE; asymmetric hero grid, flagship feature card spans full width, fade-up animation on hero, section padding `6rem 2rem`
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates

## Phase 0 — Collect Data

Ask the user these questions and wait for their complete reply before generating:

---

1. What type of page is it? (portfolio, company, event, agency, personal, other)
2. Page name/brand
3. Main headline (H1)
4. Sections to include (exact — do not add more)
5. Primary CTA: text + destination
6. Does it include a contact form? (yes/no)
7. Primary theme color

---

## Phase 1 — P0 Verification

- [ ] Output sections == intake sections
- [ ] No invented copy — everything comes from the user
- [ ] No AppTemplate or sidebar

## Feature Tile

When the page has a features/services section, use `Card` with `icon`, `title`, and `description` slots:

```tsx
<Card
  icon={<SomeIcon size={24} color="var(--color-primary)" />}
  title="[Service title from intake]"
  description="[Service description from intake]"
/>
```

## Phase 2 — Generate Artifact

Produce **three files** in this order: `PageName.types.ts` → `PageName.tsx` → `PageName.styles.css`.

### PageName.types.ts

```ts
export type NavItem = {
  label: string;
  href: string;
};

// Add section-specific types based on intake (services, portfolio items, event details, etc.)
export type PageNameProps = {
  // Static content — no API props for marketing copy
};
```

### PageName.tsx

```tsx
import { Button, Card, Link } from 'neus-ui';
import './PageName.styles.css';
import type { PageNameProps } from './PageName.types';

export const PageName = ({}: PageNameProps) => {
  return (
    <div className="landing">
      {/* sections exactly as requested in intake */}
    </div>
  );
};
```

Produce the page with exactly the sections requested. Flexible structure based on landing type. Use the same CSS patterns from `neus-landing-saas` references for style consistency.

If it includes a contact form:
```tsx
<section className="landing__contact">
  <h2>Contact</h2>
  <div className="landing__contact-form">
    <Input name="name" label="Name" required />
    <Input name="email" label="Email" type="email" required />
    <Button label="Send" type="submit" variant="solid" color="primary" onClick={() => onSubmit?.()} />
  </div>
</section>
```
