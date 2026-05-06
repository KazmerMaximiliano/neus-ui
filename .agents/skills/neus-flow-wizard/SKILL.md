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


## Before starting

Read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — FormTemplate, Input, Select, Button sections
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates
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
import { FormTemplate, Input, Select, Button, Stepper } from 'neus-ui';
import { useState } from 'react';
// CSS goes in WizardForm.styles.css — NEVER use <style> tags or inline styles
import './WizardForm.styles.css';

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
      {/* Step progress */}
      <Stepper
        currentStep={step}
        totalSteps={STEPS.length}
        variant="linear"
        showLabels
      />

      <div className="wizard__step-info">
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

### WizardForm.styles.css


```css
.wizard { max-width: 700px; margin: 2rem auto; padding: 0 1.5rem; }
.wizard__step-info { margin-bottom: 1.5rem; margin-top: 1.5rem; }
.wizard__step-info h2 { font-size: 1.5rem; font-weight: 600; color: var(--color-gray-900); margin: 0; }
```
