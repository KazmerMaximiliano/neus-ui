---
name: neus-pattern-hero
description: |
  Generates a standalone hero section with headline, subheading, and CTA buttons.
  Produces a reusable .tsx hero component using Neus UI Button and Link. Use when user needs
  just the hero section pattern. Trigger: "hero section", "sección hero", "banner principal",
  "hero pattern", "hero component", "sección de bienvenida", "cabecera de la landing".
od:
  mode: prototype
  platform: web
  scenario: design
  design_system:
    requires: true
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Hero section for Facturo with headline, subheading, and two CTAs"
---

# Neus Pattern Hero

Generates a standalone hero section component.

## Before starting

Read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Button, Link sections
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates

## Phase 0 — Collect Data

Ask in free text:
1. Headline (H1) — exact from user
2. Subheading (paragraph) — exact
3. Primary CTA: text + action
4. Secondary CTA (optional): text + action
5. Is there an image or illustration? (yes/no — if yes: placeholder or URL)
6. Alignment: centered or left
7. Primary theme color

## Phase 2 — Generate

Produce **three files** in this order: `Hero.types.ts` → `Hero.tsx` → `Hero.styles.css`.

### Hero.types.ts

```ts
export type HeroProps = {
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
};
```

### Hero.tsx

```tsx
import { Button, Link } from 'neus-ui';
import './Hero.styles.css';
import type { HeroProps } from './Hero.types';

export const Hero = ({ onPrimaryAction, onSecondaryAction }: HeroProps) => (
  <section className="hero">
    <div className="hero__content">
      <h1 className="hero__headline">[Headline from intake]</h1>
      <p className="hero__subheading">[Subheading from intake]</p>
      <div className="hero__actions">
        <Button label="[Primary CTA]" variant="solid" color="primary" onClick={onPrimaryAction} />
        {/* Hero has light background → type="primary". Use "secondary" only on dark bg. */}
        {onSecondaryAction && (
          <Link label="[Secondary CTA] →" type="primary" onClick={onSecondaryAction} />
        )}
      </div>
    </div>
    {/* Image slot — only if requested */}
  </section>
);
```

### Hero.styles.css

Apply Mode from VISUAL DIRECTIVE. See `layout-patterns.md` for optional eyebrow pill pattern.

```css
@keyframes neus-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Light mode (default) */
.hero { padding: 6rem 2rem; text-align: center; /* or text-align: left for left-aligned */ }
.hero__content { max-width: 700px; margin: 0 auto; }
.hero__headline {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
  line-height: 1.1;
  animation: neus-fade-up 0.5s ease forwards;
}
.hero__subheading {
  font-size: 1.2rem;
  color: var(--color-gray-600);
  margin-bottom: 2rem;
  line-height: 1.6;
  animation: neus-fade-up 0.5s 0.1s ease both;
}
.hero__actions { display: flex; gap: 1rem; justify-content: center; align-items: center; flex-wrap: wrap; }

/* Dark mode overrides — apply when Mode: dark */
/* .hero { background: #0a0a14; color: #e2e8f0; } */
/* .hero__headline { color: #e2e8f0; }
   Add class="neus-gradient-text" to H1 element for gradient text */
/* .hero__subheading { color: #94a3b8; } */
```
