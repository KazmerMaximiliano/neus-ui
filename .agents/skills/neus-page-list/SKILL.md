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
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — component props
- `.agents/skills/_shared/design-personality.md` — apply VISUAL DIRECTIVE; H1 gets left-border accent `border-left: 4px solid var(--color-primary)`, pair with Badge showing total count
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates

## Phase 0 — Collect Data

Ask the user these questions and wait for their complete reply before generating:

---

**Entity** — What is the entity name? (singular PascalCase, e.g.: Product, ServiceOrder)

**Actions** — What row actions will the table have? (can select multiple)
- View detail — info button that navigates to the detail page
- Edit — edit button that opens the edit form
- Delete — delete button with confirmation modal

**Layout** — Will this page use AppTemplate (navigation sidebar)?
- Yes, with AppTemplate (recommended) — includes sidebar + navigation header
- No, content only — just the list component, no app shell

**Data** — Does data come from an API/backend?
- Yes, from API (recommended) — component will receive data[] and pagination as props
- No, static test data — use hardcoded mock data for prototype

Also include in your reply:
- Columns to display (field + type), exact — do not add extras
- If using AppTemplate: sidebar items (label + icon name) and active route
  — IMPORTANT: sidebar shows only top-level sections. "Create", "Edit", "Detail" routes
    MUST have `visible: false`; they are reached via in-page buttons, never sidebar links.
- Primary theme color (hex or "use default")

---

## Phase 1 — P0 Verification

Before writing code:
- [ ] Fields from intake == fields in output (zero extras)
- [ ] If API data: use typed props, not hardcoded arrays
- [ ] Imports from `neus-ui` only
- [ ] AppTemplate only if requested

## Phase 2 — Generate Artifact

Read `references/layouts.md` for the layout pattern.
Produce **three files**: `EntityList.tsx` + `EntityList.styles.css` + `EntityList.types.ts`.

### EntityList.types.ts

```ts
export type Entity = {
  id: number;
  // ...exact fields from intake
};

export type PaginationInfo = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type EntityListProps = {
  data: Entity[];              // from API — never hardcode
  pagination: PaginationInfo;
  onEdit?: (item: Entity) => void;
  onDelete?: (item: Entity) => void;
  onInfo?: (item: Entity) => void;
  onPaginationChange?: (params: { currentPage: number; pageSize: number }) => void;
  onCreateNew?: () => void;
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

### Component structure

```tsx
import { AppTemplate, DataTable, Modal, Button, Badge } from 'neus-ui';
import { PlusCircle, [IconFromSidebar] } from 'lucide-react';
import './EntityList.styles.css';
import type { Entity, EntityListProps, SidebarItem } from './EntityList.types';

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

### Status column pattern

When a column represents status/state values, use `Badge` instead of plain text:

```tsx
// columnLabels maps the raw field name to a display label
columnLabels={{ status: 'Estado', name: 'Nombre' }}

// DataTable renders raw cell values — for status cells, use a custom renderer
// if DataTable supports it, or show the Badge in a detail/modal context.
// Simple approach: map status to human-readable label via columnLabels,
// and use Badge in detail/modal views where you control the cell JSX.

// Pattern for status display outside DataTable (e.g. in modals or detail cards):
<Badge
  label={item.status === 'active' ? 'Activo' : 'Inactivo'}
  color={item.status === 'active' ? 'success' : 'neutral'}
/>
```

### EntityList.styles.css

Apply Mode from VISUAL DIRECTIVE: `light` → standard surfaces; `dark` → dark canvas + glass table wrapper.

```css
.entity-list { padding: 2rem; }
.entity-list__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.entity-list__header h1 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-gray-900);
  border-left: 4px solid var(--color-primary);
  padding-left: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Dark mode overrides — apply when Mode: dark */
/* .entity-list { background: #0a0a14; color: #e2e8f0; } */
/* .entity-list__header h1 { color: #e2e8f0; } */
```

## Phase 3 — P1/P2 Checklist

- [ ] Optional props (`onEdit?`, `onDelete?`, `onInfo?`)
- [ ] Delete confirmation modal wired to onDelete
- [ ] columnLabels mapped correctly
- [ ] hiddenColumns includes 'id' by default
- [ ] If a component was missing, document it in NEUS-DESING.md "Pending Components"
