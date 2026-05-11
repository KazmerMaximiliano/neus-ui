---
name: neus-flow-onboarding
description: |
  Generates a 3-screen mobile/web onboarding flow with stepper, content, and CTAs using Neus UI.
  Produces a .tsx component with step state management, step content, and navigation buttons.
  Use whenever the user asks for: "onboarding", "bienvenida", "flujo de registro inicial",
  "onboarding flow", "pantallas de bienvenida", "first-run experience", "flujo inicial".
  Always use for any multi-step onboarding experience in a Neus UI project.
od:
  mode: prototype
  platform: web
  scenario: design
  design_system:
    requires: true
  inputs:
    - name: product_name
      type: string
      required: true
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "3-step onboarding flow for FitTrack: set up profile, choose goals, connect device"
---

# Neus Flow Onboarding

Generates a multi-step onboarding flow with visual stepper and navigation.


## Before starting

The "Shared Rules" section below is always active. Additionally read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Button, Card, Input, Checkbox, Stepper sections
- `.agents/skills/_shared/design-personality.md` — apply VISUAL DIRECTIVE; use fade-up animation on `.onboarding__step`, H2 at `1.75rem weight-700`
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates
- `.agents/skills/_shared/dark-surfaces.md` — dark mode CSS recipes (read when Mode: dark)
- `.agents/skills/_shared/light-surfaces.md` — light mode CSS recipes (read when Mode: light)

## Phase 0 — Collect Data

Ask the user these questions and wait for their complete reply before generating:

---

**Form** — Does any step include a data form?
- Yes, some step has inputs — email, name, preferences, etc.
- No, informational content only — text, images, and action buttons

**Style** — What onboarding style?
- Minimalist (recommended) — centered content, clean background, large typography
- Illustrated — areas for illustrations or large icons per step
- Data first — form in the first step, explanations after

Also include in your reply:
- Product/app name
- 3 steps: title + short description (exact — do not invent)
- Final CTA: text + destination (e.g.: "Get started" → dashboard)
- If form: which fields on which step
- Primary theme color

---

- **Theme mode**: light or dark? (default: light)

## Phase 1 — P0 Verification
## Phase 1 — Visual Resolution

- Mode: `dark` → read `dark-surfaces.md`; use `#0a0a14` canvas, glass surfaces where applicable
- Mode: `light` → read `light-surfaces.md`; use `var(--color-white)` or `var(--color-surface)` backgrounds (default)

Declare:

```
VISUAL DIRECTIVE
  Mode: dark | light
  Surface file: dark-surfaces.md | light-surfaces.md
```



- [ ] Exactly 3 steps (or specified number) — do not add extras
- [ ] Exact copy from intake — do not invent text
- [ ] No AppTemplate or sidebar

## Phase 2 — Generate

### Base structure

## Selectable Card (option picker steps)

When a step asks the user to pick one option from a list, use `Card` with `title`, `description`, `selected`, and `onClick` props instead of custom button styles:

```tsx
import { Card } from 'neus-ui';

<div role="radiogroup" aria-label="[Step question]">
  {options.map((opt) => (
    <Card
      key={opt.value}
      title={opt.label}
      description={opt.description}
      selected={selected === opt.value}
      onClick={() => setSelected(opt.value)}
    />
  ))}
</div>
```

## Base structure

Produce **three files** in this order: `OnboardingFlow.types.ts` → `OnboardingFlow.tsx` → `OnboardingFlow.styles.css`.

### OnboardingFlow.types.ts

```ts
export type OnboardingStep = {
  title: string;
  description: string;
};

export type OnboardingProps = {
  onComplete: () => void;
};
```

### OnboardingFlow.tsx

```tsx
import { Button, Card, Input, Checkbox, Stepper } from 'neus-ui';
import { useState } from 'react';
import './OnboardingFlow.styles.css';
import type { OnboardingProps } from './OnboardingFlow.types';

const STEPS = [
  { title: '[Step 1 title from intake]', description: '[Step 1 desc from intake]' },
  { title: '[Step 2 title from intake]', description: '[Step 2 desc from intake]' },
  { title: '[Step 3 title from intake]', description: '[Step 3 desc from intake]' },
];

export const OnboardingFlow = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const isLast = currentStep === STEPS.length - 1;

  return (
    <div className="onboarding">
      {/* Step indicator */}
      <Stepper
        currentStep={currentStep}
        totalSteps={STEPS.length}
        variant="dots"
        labels={STEPS.map((s) => s.title)}
        showLabels
      />

      {/* Step content */}
      <div className="onboarding__content">
        <h2>{STEPS[currentStep].title}</h2>
        <p>{STEPS[currentStep].description}</p>
        {/* Form fields for step — if requested */}
      </div>

      {/* Navigation */}
      <div className="onboarding__nav">
        {currentStep > 0 && (
          <Button
            label="Back"
            variant="text"
            color="primary"
            onClick={() => setCurrentStep((s) => s - 1)}
          />
        )}
        <Button
          label={isLast ? '[CTA from intake]' : 'Next'}
          variant="solid"
          color="primary"
          onClick={() => isLast ? onComplete() : setCurrentStep((s) => s + 1)}
        />
      </div>
    </div>
  );
};
```

### OnboardingFlow.styles.css

Apply Mode from VISUAL DIRECTIVE: `light` → white background, white card; `dark` → dark canvas, glass card.

```css
@keyframes neus-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Light mode (default) */
.onboarding {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--color-gray-100);
}
.onboarding__step { animation: neus-fade-up 0.5s ease forwards; }
.onboarding__content { max-width: 480px; text-align: center; margin-bottom: 3rem; }
.onboarding__content h2 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-gray-900);
  margin-bottom: 1rem;
}
.onboarding__content p { font-size: 1rem; color: var(--color-gray-600); line-height: 1.6; }
.onboarding__nav { display: flex; gap: 1rem; align-items: center; }

/* Dark mode overrides — apply when Mode: dark */
/* .onboarding { background: #0a0a14; color: #e2e8f0; } */
/* .onboarding__content h2 { color: #e2e8f0; } */
/* .onboarding__content p { color: #94a3b8; } */
/* Card wrapper: background: rgba(20,20,40,0.55); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 2.5rem; */
```

---

## Shared Rules (Embedded)

> These rules are always active. They apply even if `_shared/` files are not read.

### Output — always three files

Every skill output: `ComponentName.types.ts` → `ComponentName.tsx` → `ComponentName.styles.css`.
No inline styles (`style={{}}`). No `<style>` tags inside components. CSS only in `.styles.css`.

### Imports

```tsx
import { Button, Card, Input, Badge, Link, Select, Modal, DataTable } from 'neus-ui';
```

Never import from internal paths like `../../components/Button/Button`.

### Types

All `type` / `interface` declarations → `ComponentName.types.ts`. Never declare types in `.tsx`.

### React 19 — No FormEvent

Never `import { FormEvent } from 'react'`. Use `<Button type="submit" onClick={...} />` instead.

### Component Prop Constraints

- **Button** `variant`: `"solid"` | `"outlined"` | `"text"` — `"ghost"` does NOT exist
- **Button** `color`: `"primary"` | `"success"` | `"error"` | `"info"` | `"white"` — `"white"` for dark canvas only
- **Button** `size`: `"small"` | `"medium"` | `"large"`
- **Card** `variant`: `"default"` | `"glass"` — `"glass"` for dark canvas
- **Badge** `color`: `"primary"` | `"success"` | `"error"` | `"info"` | `"neutral"`
- **Link** `type`: `"primary"` (brand) | `"secondary"` (muted gray)
- **Select**: no `required` prop — handle validation externally
- **FormTemplate**: only `children`, `submitLabel`, `loading` — no `onSubmit`/`onCancel`

### Slop Blacklist

- No inline styles / `style={{}}` / `<style>` tags
- No hardcoded data arrays when data comes from API — use typed props
- No invented copy (fake testimonials, placeholder names, fake metrics)
- No `any` TypeScript type
- No raw `<a>`, `<span>`, `<input>`, `<button>` when a Neus UI component exists
- No hardcoded font stacks — use `var(--font-display)` / `var(--font-mono)`
- In dark mode: no `var(--color-primary-light)` as section background; no raw div cards — use `<Card variant="glass">`
