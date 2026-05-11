---
name: neus-page-form
description: |
  Generates a complete create/edit form page for a data entity using Neus UI FormTemplate.
  Produces a .tsx file with FormTemplate, typed inputs, and optional AppTemplate.
  Handles Select/MultiSelect with backend-driven options (API props), FileUploader, and
  InteractiveMap as typed props — never hardcoded data.
  Use whenever the user asks for: "formulario de X", "crear X", "editar X", "form page",
  "formulario de creación", "formulario de edición", "new form", "edit form", "high form".
  Always use for any create or edit form view in a Neus UI project.
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
      description: "Entity name in singular PascalCase"
    - name: fields
      type: string
      required: true
      description: "Fields with input type: field:inputType comma-separated"
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Product creation form with name, price, category (select), and image"
---

# Neus Page Form

Generates a form page using FormTemplate with typed fields and external data source integration.

## Before starting

The "Shared Rules" section below is always active. Additionally read:
- `.agents/skills/_shared/anti-slop.md`
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — FormTemplate, Input, Select, MultiSelect, FileUploader, InteractiveMap sections
- `.agents/skills/_shared/design-personality.md` — apply VISUAL DIRECTIVE; H1 gets left-border accent `border-left: 4px solid var(--color-primary); padding-left: 1rem`, field gap `1.25rem`
- `.agents/skills/_shared/checklist.md`
- `.agents/skills/_shared/dark-surfaces.md` — dark mode CSS recipes (read when Theme mode: dark)
- `.agents/skills/_shared/light-surfaces.md` — light mode CSS recipes (read when Theme mode: light)
- `references/form-patterns.md` — layout patterns and special field types

## Phase 0 — Collect Data

Ask the user these questions and wait for their complete reply before generating:

---

**Mode** — Is the form for creating, editing, or both?
- Create (recommended) — creation form, no initial values
- Edit — receives defaultValues from API
- Both (Create/Edit) — single component used for both modes

**Layout** — Will this page use AppTemplate (navigation sidebar)?
- Yes, with AppTemplate (recommended) — includes sidebar + header
- No, form only — just FormTemplate without app shell

**External data** — Are there fields that receive options from the backend?
- Yes (Select/MultiSelect with API options) — component will receive options as prop `Array<{value, label}>`
- No, all fields are text/date/number — no selects with dynamic options

Also include in your reply:
- Entity name (singular PascalCase)
- Form fields with exact input type: `name:text, price:number, category:select, tags:multiselect, avatar:file, birthDate:date, startTime:time, location:map`
- Required vs optional fields
- If Select/MultiSelect: exact prop name for the options (e.g.: `categoryOptions`)
- If FileUploader: allowed file types (image, PDF, etc.)
- If using AppTemplate: sidebar items + active route
  — IMPORTANT: sidebar shows only top-level sections. This form route (create/edit)
    MUST have `visible: false`; it is reached via list/detail buttons, not sidebar.
- Primary theme color (hex or "use default")
- **Theme mode**: light or dark? (default: light) — note: "Mode" above refers to create/edit; this is for visual theme

---

## Phase 1 — Visual Resolution

- Theme mode: `dark` → read `dark-surfaces.md`; use `#0a0a14` canvas, glass form wrapper
- Theme mode: `light` → read `light-surfaces.md`; use `var(--color-white)` or `var(--color-surface)` (default)

Declare:

```
VISUAL DIRECTIVE
  Mode: dark | light
  Surface file: dark-surfaces.md | light-surfaces.md
```

## Phase 1b — P0 Verification

- [ ] Output fields == intake fields (zero extras)
- [ ] Select/MultiSelect with backend-driven options: receives prop `options: SelectOption[]`, not hardcoded
- [ ] FileUploader: `onChange` handler as prop, not hardcoded
- [ ] InteractiveMap: initial values as props, handler as prop
- [ ] Imports from `neus-ui` only
- [ ] FormTemplate has NO `onSubmit`, `onCancel`, or `cancelLabel` props — these do not exist
- [ ] Select has NO `required` prop — handle validation externally
- [ ] SidebarItem NOT imported from `neus-ui` — defined locally if needed

## Phase 2 — Generate Artifact

Read `references/form-patterns.md` for special field patterns.
Produce **three files**: `EntityForm.tsx` + `EntityForm.styles.css` + `EntityForm.types.ts`.

### EntityForm.types.ts

```ts
export type SelectOption = { value?: string | null; label: string };

export type Entity = {
  // ...exact fields from intake
};

export type EntityFormProps = {
  // Edit mode: receive existing values
  defaultValues?: Partial<Entity>;
  // Backend-driven options (only for select/multiselect fields from API)
  [fieldName]Options?: SelectOption[];
  // Submit handler
  onSubmit: (data: FormData) => void;
  loading?: boolean;
  // FileUploader handler (if file field exists)
  onFileChange?: (data: FileUploadData | null, error?: FileUploadError) => void;
  // InteractiveMap handler (if map field exists)
  onLocationSelect?: (location: LocationData) => void;
  // AppTemplate routes (only if requested)
  routes?: SidebarItem[];
};

// SidebarItem is NOT exported from neus-ui — define locally
export type SidebarItem = {
  label: string;
  icon?: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;
};
```

### Base component structure

```tsx
import { AppTemplate, FormTemplate, Input, Select, MultiSelect,
         FileUploader, DateInput, TimeInput, InteractiveMap, FileType } from 'neus-ui';
import './EntityForm.styles.css';
import type { Entity, EntityFormProps, SelectOption, SidebarItem } from './EntityForm.types';

export const EntityForm = ({
  defaultValues,
  [fieldName]Options = [],
  onSubmit,
  loading = false,
  routes,
}: EntityFormProps) => {
  // FormTemplate only accepts: children, submitLabel, loading.
  // NO onSubmit, NO onCancel, NO cancelLabel props.
  // Wrap with <form> to handle submission. Handle cancel externally via Button.
  const content = (
    <div className="entity-form">
      <h1>Create / Edit [Entity]</h1>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(/* collect form data */); }}>
        <FormTemplate submitLabel="Save" loading={loading}>
          {/* Fields from intake — exact order, no extras */}
        </FormTemplate>
      </form>
      {/* Cancel: external Button, not a FormTemplate prop */}
      {onCancel && (
        <Button label="Cancel" variant="text" color="primary" onClick={onCancel} />
      )}
    </div>
  );

  if (routes) {
    return <AppTemplate routes={routes}>{content}</AppTemplate>;
  }
  return content;
};
```

### EntityForm.styles.css

Apply Mode from VISUAL DIRECTIVE.

```css
.entity-form { padding: 2rem; }
.entity-form h1 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--color-gray-900);
  border-left: 4px solid var(--color-primary);
  padding-left: 1rem;
}

/* Dark mode overrides — apply when Mode: dark */
/* .entity-form { background: #0a0a14; color: #e2e8f0; } */
/* .entity-form h1 { color: #e2e8f0; } */
```

## Phase 3 — P1/P2 Checklist

- [ ] defaultValues wired to inputs via `defaultValue` prop
- [ ] Required fields marked with `required` prop
- [ ] Optional fields without `required`
- [ ] Missing component names documented in NEUS-DESING.md

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
