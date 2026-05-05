---
name: neus-flow-wizard
description: |
  Generates a multi-step wizard form with step validation and progress indicator using Neus UI.
  Produces a .tsx component with FormTemplate per step and navigation between steps.
  Use whenever the user asks for: "wizard", "paso a paso", "multi-step form", "formulario multi-paso",
  "formulario por pasos", "stepper form", "wizard form", "proceso de varios pasos".
  Always use for any multi-step form or guided process in a Neus UI project.
od:
  mode: prototype
  platform: desktop
  scenario: design
  design_system:
    requires: true
  inputs:
    - name: wizard_name
      type: string
      required: true
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Company registration wizard in 3 steps: basic info, address, account setup"
---

# Neus Flow Wizard

Generates a multi-step form with FormTemplate per step and navigation.

**Pending Component**: `Stepper` does not exist in Neus UI — implement with CSS and document.

## Before starting

Read:
- `.agents/skills/_shared/component-catalog.md` — FormTemplate, Input, Select, Button sections
- `.agents/skills/neus-page-form/references/form-patterns.md` — field patterns

## Phase 0 — Collect Data

Ask in free text:
1. Wizard name
2. Steps (step name + exact fields per step with input type)
3. Are there selects with backend options? If yes: prop name and step where it appears
4. Final CTA: button text
5. Uses AppTemplate? (yes/no)

## Phase 2 — Generate

```tsx
import { FormTemplate, Input, Select, Button } from 'neus-ui';
import { useState } from 'react';

const STEPS = [
  { title: '[Step 1 title]', fields: [...] },
  { title: '[Step 2 title]', fields: [...] },
];

type WizardProps = {
  onSubmit: (allData: WizardFormData) => void;
  loading?: boolean;
  // Backend-driven options per step
  [field]Options?: SelectOption[];
};

export const WizardForm = ({ onSubmit, loading }: WizardProps) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Partial<WizardFormData>>({});
  const isLast = step === STEPS.length - 1;

  return (
    <div className="wizard">
      {/* Progress bar (Stepper pending — CSS workaround) */}
      <div className="wizard__progress">
        <div
          className="wizard__progress-bar"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="wizard__step-info">
        <span className="wizard__step-count">Step {step + 1} of {STEPS.length}</span>
        <h2>{STEPS[step].title}</h2>
      </div>

      <FormTemplate
        submitLabel={isLast ? '[Final CTA]' : 'Continue'}
        loading={isLast ? loading : false}
      >
        {/* Fields for current step — from intake */}
      </FormTemplate>

      {step > 0 && (
        <Button
          label="Back"
          variant="text"
          color="primary"
          onClick={() => setStep((s) => s - 1)}
        />
      )}
    </div>
  );
};
```

```css
.wizard { max-width: 700px; margin: 2rem auto; padding: 0 1.5rem; }
.wizard__progress { height: 4px; background: var(--color-gray-200); border-radius: 2px; margin-bottom: 2rem; }
.wizard__progress-bar { height: 100%; background: var(--color-primary); border-radius: 2px; transition: width 0.3s ease; }
.wizard__step-info { margin-bottom: 1.5rem; }
.wizard__step-count { font-size: 0.8rem; color: var(--color-gray-500); text-transform: uppercase; letter-spacing: 0.05em; }
.wizard__step-info h2 { font-size: 1.5rem; font-weight: 600; color: var(--color-gray-900); margin-top: 0.25rem; }
```
