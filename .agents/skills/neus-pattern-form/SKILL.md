---
name: neus-pattern-form
description: |
  Generates a standalone form component using Neus UI FormTemplate without full page structure.
  Use when user needs just the form pattern without AppTemplate or page shell.
  Trigger: "form pattern", "patrón de formulario", "solo el formulario", "componente de form",
  "form standalone", "formulario reutilizable", "form component".
od:
  mode: prototype
  platform: desktop
  scenario: design
  design_system:
    requires: true
  inputs:
    - name: entity_name
      type: string
      required: true
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Standalone Product form with name, price, and category select"
---

# Neus Pattern Form

Generates a standalone form component using FormTemplate.

## Before starting

Read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — FormTemplate, Card, Input, Select, etc. sections
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates
- `.agents/skills/neus-page-form/references/form-patterns.md` — field patterns

## Radio-group / Option picker

When the form has a single-choice field that benefits from a visual card layout (e.g. plan selector, goal picker), use `Card` with `title`, `description`, `selected`, and `onClick`:

```tsx
import { Card } from 'neus-ui';

<div role="radiogroup" aria-label="[Field label]">
  {options.map((opt) => (
    <Card
      key={opt.value}
      title={opt.label}
      description={opt.description}
      selected={value === opt.value}
      onClick={() => onChange(opt.value)}
    />
  ))}
</div>
```

## Phase 0 — Collect Data

Same intake as `neus-page-form` but without asking about AppTemplate.

## Phase 2 — Generate

Produce only the FormTemplate component with its fields. No page wrapper. The exported component is the form itself, ready to embed in any page or modal.

```tsx
import { FormTemplate, Input, Select, ... } from 'neus-ui';

type EntityFormProps = {
  defaultValues?: Partial<Entity>;
  [field]Options?: SelectOption[];   // only if backend-driven selects
  onSubmit: (data: EntityFormData) => void;
  loading?: boolean;
};

export const EntityForm = ({ defaultValues, onSubmit, loading }: EntityFormProps) => (
  <FormTemplate submitLabel="Save" loading={loading}>
    {/* Fields — exact from intake */}
  </FormTemplate>
);
```
