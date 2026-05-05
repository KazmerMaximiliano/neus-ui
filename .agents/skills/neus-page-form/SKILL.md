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

Read these files:
- `.agents/skills/_shared/anti-slop.md`
- `.agents/skills/_shared/component-catalog.md` — FormTemplate, Input, Select, MultiSelect, FileUploader, InteractiveMap sections
- `.agents/skills/_shared/checklist.md`
- `references/form-patterns.md` — layout patterns and special field types

## Phase 0 — Collect Data

Use `AskUserQuestion` in ONE call:

```json
{
  "questions": [
    {
      "question": "Is the form for creating, editing, or both?",
      "header": "Mode",
      "multiSelect": false,
      "options": [
        { "label": "Create (Recommended)", "description": "Creation form — no initial values" },
        { "label": "Edit", "description": "Edit form — receives defaultValues from API" },
        { "label": "Both (Create/Edit)", "description": "Single component used for both create and edit" }
      ]
    },
    {
      "question": "Will this page use AppTemplate (navigation sidebar)?",
      "header": "Layout",
      "multiSelect": false,
      "options": [
        { "label": "Yes, with AppTemplate (Recommended)", "description": "Includes sidebar + header" },
        { "label": "No, form only", "description": "Just FormTemplate without app shell" }
      ]
    },
    {
      "question": "Are there fields that receive options from the backend?",
      "header": "External data",
      "multiSelect": false,
      "options": [
        { "label": "Yes (Select/MultiSelect with API options)", "description": "Component will receive options as prop Array<{value, label}>" },
        { "label": "No, all fields are text/date/number", "description": "No selects with dynamic options" }
      ]
    }
  ]
}
```

Also ask in free text:
- Entity name (singular PascalCase)
- Form fields with exact input type: `name:text, price:number, category:select, tags:multiselect, avatar:file, birthDate:date, startTime:time, location:map`
- Required vs optional fields
- If Select/MultiSelect: exact prop name for the options (e.g.: `categoryOptions`)
- If FileUploader: allowed file types (image, PDF, etc.)
- If using AppTemplate: sidebar items + active route
- Primary theme color (hex or "use default")

## Phase 1 — P0 Verification

- [ ] Output fields == intake fields (zero extras)
- [ ] Select/MultiSelect with backend-driven options: receives prop `options: SelectOption[]`, not hardcoded
- [ ] FileUploader: `onChange` handler as prop, not hardcoded
- [ ] InteractiveMap: initial values as props, handler as prop
- [ ] Imports from `neus-ui` only

## Phase 2 — Generate Artifact

Read `references/form-patterns.md` for special field patterns.

### Base component structure

```tsx
import { AppTemplate, FormTemplate, Input, Select, MultiSelect,
         FileUploader, DateInput, TimeInput, InteractiveMap, FileType } from 'neus-ui';

// Types
type SelectOption = { value?: string | null; label: string };

type EntityFormProps = {
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

export const EntityForm = ({
  defaultValues,
  [fieldName]Options = [],
  onSubmit,
  loading = false,
  routes,
}: EntityFormProps) => {
  const content = (
    <div className="entity-form">
      <h1>Create / Edit [Entity]</h1>
      <FormTemplate submitLabel="Save" loading={loading}>
        {/* Fields from intake — exact order, no extras */}
      </FormTemplate>
    </div>
  );

  if (routes) {
    return <AppTemplate routes={routes}>{content}</AppTemplate>;
  }
  return content;
};
```

## Phase 3 — P1/P2 Checklist

- [ ] defaultValues wired to inputs via `defaultValue` prop
- [ ] Required fields marked with `required` prop
- [ ] Optional fields without `required`
- [ ] Missing component names documented in NEUS-DESING.md
