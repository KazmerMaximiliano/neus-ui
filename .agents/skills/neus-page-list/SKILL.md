---
name: neus-page-list
description: |
  Generates a complete list/table page for a data entity using Neus UI components.
  Produces a .tsx file with DataTable, Actions, Modal confirmation, and optional AppTemplate.
  Use whenever the user asks for: "lista de X", "listado de X", "tabla de X", "page list",
  "listar entidad", "página de listado", "crud list", "ver todos los X", "gestionar X".
  Always use this skill for any entity list or table view in a Neus UI project.
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
      description: "Entity name in singular PascalCase (e.g.: Product, ServiceOrder)"
    - name: columns
      type: string
      required: true
      description: "Columns to display: field:type pairs comma-separated (e.g.: name:string, price:number)"
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Create a Product list with columns name, price and stock"
---

# Neus Page List

Generates a complete list page using DataTable, Actions, and a delete confirmation Modal.

## Before starting

Read these reference files:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/component-catalog.md` — component props
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates

## Phase 0 — Collect Data

Use `AskUserQuestion` in ONE call:

```json
{
  "questions": [
    {
      "question": "What is the entity name? (singular PascalCase, e.g.: Product, ServiceOrder)",
      "header": "Entity",
      "multiSelect": false,
      "options": []
    },
    {
      "question": "What row actions will the table have?",
      "header": "Actions",
      "multiSelect": true,
      "options": [
        { "label": "View detail", "description": "Info button that navigates to the detail page" },
        { "label": "Edit", "description": "Edit button that opens the edit form" },
        { "label": "Delete", "description": "Delete button with confirmation modal" }
      ]
    },
    {
      "question": "Will this page use AppTemplate (navigation sidebar)?",
      "header": "Layout",
      "multiSelect": false,
      "options": [
        { "label": "Yes, with AppTemplate (Recommended)", "description": "Includes sidebar + navigation header" },
        { "label": "No, content only", "description": "Just the list component, no app shell" }
      ]
    },
    {
      "question": "Does data come from an API/backend?",
      "header": "Data",
      "multiSelect": false,
      "options": [
        { "label": "Yes, from API (Recommended)", "description": "Component will receive data[] and pagination as props" },
        { "label": "No, static test data", "description": "Use hardcoded mock data for prototype" }
      ]
    }
  ]
}
```

Also ask in free text:
- Columns to display (field + type), exact — do not add extras
- If using AppTemplate: sidebar items (label + lucide-react icon) and active route
- Primary theme color (hex or "use default")

## Phase 1 — P0 Verification

Before writing code:
- [ ] Fields from intake == fields in output (zero extras)
- [ ] If API data: use typed props, not hardcoded arrays
- [ ] Imports from `neus-ui` only
- [ ] AppTemplate only if requested

## Phase 2 — Generate Artifact

Read `references/layouts.md` for the layout pattern.
Produce the complete `.tsx` file.

### Component structure

```tsx
import { AppTemplate, DataTable, Modal, Button } from 'neus-ui';
import { PlusCircle, [IconFromSidebar] } from 'lucide-react';

// Types
type Entity = {
  id: number;
  // ...exact fields from intake
};

type EntityListProps = {
  data: Entity[];              // from API — never hardcode
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  onEdit?: (item: Entity) => void;
  onDelete?: (item: Entity) => void;
  onInfo?: (item: Entity) => void;
  onPaginationChange?: (params: { currentPage: number; pageSize: number }) => void;
  onCreateNew?: () => void;
};

export const EntityList = ({
  data,
  pagination,
  onEdit,
  onDelete,
  onInfo,
  onPaginationChange,
  onCreateNew,
}: EntityListProps) => {
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; item?: Entity }>({
    open: false,
  });

  // AppTemplate routes (only if requested)
  const routes = [/* SidebarItem[] from intake */];

  const content = (
    <div className="entity-list">
      <div className="entity-list__header">
        <h1>Entities</h1>
        {onCreateNew && (
          <Button
            label="Create new"
            onClick={onCreateNew}
            variant="solid"
            color="primary"
          />
        )}
      </div>

      <DataTable
        data={data}
        pagination={pagination}
        columnLabels={{/* field: 'Label' from intake */}}
        hiddenColumns={['id']}
        onEdit={onEdit ? (row) => onEdit(row) : undefined}
        onDelete={onDelete ? (row) => setDeleteModal({ open: true, item: row }) : undefined}
        onInfo={onInfo ? (row) => onInfo(row) : undefined}
        onPaginationChange={onPaginationChange}
      />

      <Modal
        isOpen={deleteModal.open}
        title="Delete record?"
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonColor="error"
        onConfirm={() => {
          if (deleteModal.item) onDelete?.(deleteModal.item);
          setDeleteModal({ open: false });
        }}
        onCancel={() => setDeleteModal({ open: false })}
      >
        This action cannot be undone.
      </Modal>
    </div>
  );

  // Wrap with AppTemplate if requested
  if (/* useAppTemplate */) {
    return <AppTemplate routes={routes}>{content}</AppTemplate>;
  }
  return content;
};
```

### Minimal CSS

```css
.entity-list { padding: 1.5rem; }
.entity-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.entity-list__header h1 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-gray-900);
}
```

## Phase 3 — P1/P2 Checklist

- [ ] Optional props (`onEdit?`, `onDelete?`, `onInfo?`)
- [ ] Delete confirmation modal wired to onDelete
- [ ] columnLabels mapped correctly
- [ ] hiddenColumns includes 'id' by default
- [ ] If a component was missing, document it in NEUS-DESING.md "Pending Components"
