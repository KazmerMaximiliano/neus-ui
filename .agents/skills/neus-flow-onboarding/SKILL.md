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

**Pending Component**: `Stepper` does not exist in Neus UI — implement with CSS and document as pending.

## Before starting

Read:
- `.agents/skills/_shared/anti-slop.md`
- `.agents/skills/_shared/component-catalog.md` — Button, Input, Checkbox sections

## Phase 0 — Collect Data

Use `AskUserQuestion` in ONE call:

```json
{
  "questions": [
    {
      "question": "Does any step include a data form?",
      "header": "Form",
      "multiSelect": false,
      "options": [
        { "label": "Yes, some step has inputs", "description": "Email, name, preferences, etc." },
        { "label": "No, informational content only", "description": "Text, images, and action buttons" }
      ]
    },
    {
      "question": "What onboarding style?",
      "header": "Style",
      "multiSelect": false,
      "options": [
        { "label": "Minimalist (Recommended)", "description": "Centered content, clean background, large typography" },
        { "label": "Illustrated", "description": "Areas for illustrations or large icons per step" },
        { "label": "Data first", "description": "Form in the first step, explanations after" }
      ]
    }
  ]
}
```

Also ask in free text:
- Product/app name
- 3 steps: title + short description (exact from user)
- Final CTA: text + destination (e.g.: "Get started" → dashboard)
- If form: which fields on which step
- Primary theme color

## Phase 1 — P0 Verification

- [ ] Exactly 3 steps (or specified number) — do not add extras
- [ ] Exact copy from intake — do not invent text
- [ ] No AppTemplate or sidebar

## Phase 2 — Generate

### Base structure

```tsx
import { Button, Input, Checkbox } from 'neus-ui';
import { useState } from 'react';

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
      {/* Step indicator (Stepper — pending component, CSS workaround) */}
      <div className="onboarding__stepper">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`onboarding__step-dot ${i <= currentStep ? 'onboarding__step-dot--active' : ''}`}
          />
        ))}
      </div>

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
.onboarding__stepper { display: flex; gap: 0.5rem; margin-bottom: 3rem; }
.onboarding__step-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-gray-200);
  transition: background 0.2s ease;
}
.onboarding__step-dot--active { background: var(--color-primary); }
.onboarding__content { max-width: 480px; text-align: center; margin-bottom: 3rem; }
.onboarding__content h2 { font-size: 1.75rem; font-weight: 700; color: var(--color-gray-900); margin-bottom: 1rem; }
.onboarding__content p { font-size: 1rem; color: var(--color-gray-600); line-height: 1.6; }
.onboarding__nav { display: flex; gap: 1rem; align-items: center; }
```
