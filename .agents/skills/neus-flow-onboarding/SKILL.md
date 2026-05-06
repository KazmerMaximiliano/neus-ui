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

Read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Button, Card, Input, Checkbox, Stepper sections
- `.agents/skills/_shared/design-personality.md` — apply VISUAL DIRECTIVE; use fade-up animation on `.onboarding__step`, H2 at `1.75rem weight-700`
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates

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

## Phase 1 — P0 Verification

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

```tsx
import { Button, Card, Input, Checkbox, Stepper } from 'neus-ui';
import { useState } from 'react';
// CSS goes in OnboardingFlow.styles.css — NEVER use <style> tags or inline styles
import './OnboardingFlow.styles.css';

const STEPS = [
  { title: '[Step 1 title from intake]', description: '[Step 1 desc from intake]' },
  { title: '[Step 2 title from intake]', description: '[Step 2 desc from intake]' },
  { title: '[Step 3 title from intake]', description: '[Step 3 desc from intake]' },
];

type OnboardingProps = {
  onComplete: () => void;
};

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


```css
.onboarding {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--color-white);
}
.onboarding__content { max-width: 480px; text-align: center; margin-bottom: 3rem; }
.onboarding__content h2 { font-size: 1.75rem; font-weight: 700; color: var(--color-gray-900); margin-bottom: 1rem; }
.onboarding__content p { font-size: 1rem; color: var(--color-gray-600); line-height: 1.6; }
.onboarding__nav { display: flex; gap: 1rem; align-items: center; }
```
