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

The "Shared Rules" section below is always active. Additionally read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — FormTemplate, Card, Input, Select, etc. sections
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates
- `.agents/skills/neus-page-form/references/form-patterns.md` — field patterns
- `.agents/skills/_shared/dark-surfaces.md` — dark mode CSS recipes (read when Mode: dark)
- `.agents/skills/_shared/light-surfaces.md` — light mode CSS recipes (read when Mode: light)

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

Same intake as `neus-page-form` but without asking about AppTemplate. Add:
- **Theme mode**: light or dark? (default: light)

## Phase 1 — Visual Resolution

- Mode: `dark` → read `dark-surfaces.md`; use `#0a0a14` canvas, glass form wrapper
- Mode: `light` → read `light-surfaces.md`; use `var(--color-white)` or `var(--color-surface)` (default)

Declare:

```
VISUAL DIRECTIVE
  Mode: dark | light
  Surface file: dark-surfaces.md | light-surfaces.md
```

## Phase 2 — Generate



Produce **three files** in this order: `EntityForm.types.ts` → `EntityForm.tsx` → `EntityForm.styles.css`.

### EntityForm.types.ts

```ts
export type Entity = {
  // exact fields from intake
};

export type EntityFormProps = {
  defaultValues?: Partial<Entity>;
  // [field]Options?: SelectOption[];   — only if backend-driven selects
  onSubmit: (data: Entity) => void;
  loading?: boolean;
};
```

### EntityForm.tsx

Produce only the FormTemplate component with its fields. No page wrapper. The exported component is the form itself, ready to embed in any page or modal.

```tsx
import { FormTemplate, Input, Select } from 'neus-ui';
import type { EntityFormProps } from './EntityForm.types';

export const EntityForm = ({ defaultValues, onSubmit, loading }: EntityFormProps) => (
  <FormTemplate submitLabel="Save" loading={loading}>
    {/* Fields — exact from intake */}
  </FormTemplate>
);
```

### EntityForm.styles.css

```css
/* FormTemplate handles its own layout. Add wrapper styles per Mode if needed. */
/* Dark mode: .entity-form { background: #0a0a14; color: #e2e8f0; } */
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
