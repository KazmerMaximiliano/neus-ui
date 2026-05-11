---
name: neus-pattern-table
description: |
  Generates a standalone DataTable component pattern with sorting, pagination, and row actions.
  Produces a reusable .tsx component (not a full page). Use when user needs just the table
  pattern without full page structure. Trigger: "tabla standalone", "data table pattern",
  "solo la tabla", "componente de tabla", "table component", "tabla reutilizable".
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
  example_prompt: "Table pattern for Products with name, price, and actions columns"
---

# Neus Pattern Table

Generates a standalone, reusable DataTable component without full page structure.

## Before starting

The "Shared Rules" section below is always active. Additionally read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — DataTable, Actions, Modal sections
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates
- `.agents/skills/_shared/dark-surfaces.md` — dark mode CSS recipes (read when Mode: dark)
- `.agents/skills/_shared/light-surfaces.md` — light mode CSS recipes (read when Mode: light)

## Phase 0 — Collect Data

Ask in free text:
1. Entity name (singular PascalCase)
2. Columns to display (field + type — exact, do not add extras)
3. Row actions (edit/delete/info — which apply)
4. API data? (yes → typed props; no → mock data for demo)

5. **Theme mode**: light or dark? (default: light)

## Phase 2 — Generate
## Phase 1 — Visual Resolution

- Mode: `dark` → read `dark-surfaces.md`; use `#0a0a14` canvas, glass surfaces where applicable
- Mode: `light` → read `light-surfaces.md`; use `var(--color-white)` or `var(--color-surface)` backgrounds (default)

Declare:

```
VISUAL DIRECTIVE
  Mode: dark | light
  Surface file: dark-surfaces.md | light-surfaces.md
```



Produce **three files** in this order: `EntityTable.types.ts` → `EntityTable.tsx` → `EntityTable.styles.css`.

### EntityTable.types.ts

```ts
export type Entity = { id: number; /* exact fields from intake */ };

export type PaginationInfo = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type EntityTableProps = {
  data: Entity[];
  pagination: PaginationInfo;
  onEdit?: (item: Entity) => void;
  onDelete?: (item: Entity) => void;
  onInfo?: (item: Entity) => void;
  onPaginationChange?: (params: { currentPage: number; pageSize: number }) => void;
};
```

### EntityTable.tsx

```tsx
import { DataTable, Modal } from 'neus-ui';
import { useState } from 'react';
import type { Entity, EntityTableProps } from './EntityTable.types';

export const EntityTable = ({ data, pagination, onEdit, onDelete, onInfo, onPaginationChange }: EntityTableProps) => {
  const [deleteTarget, setDeleteTarget] = useState<Entity | null>(null);

  return (
    <>
      <DataTable
        data={data}
        pagination={pagination}
        columnLabels={{ /* field: 'Label' from intake */ }}
        hiddenColumns={['id', 'created_at']}
        onEdit={onEdit ? (row) => onEdit(row) : undefined}
        onDelete={onDelete ? (row) => setDeleteTarget(row) : undefined}
        onInfo={onInfo ? (row) => onInfo(row) : undefined}
        onPaginationChange={onPaginationChange}
      />
      <Modal
        isOpen={!!deleteTarget}
        title="Delete record?"
        confirmButtonColor="error"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => { if (deleteTarget) onDelete?.(deleteTarget); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      >
        This action cannot be undone.
      </Modal>
    </>
  );
};
```

### EntityTable.styles.css

```css
/* Wrapper — apply Mode from VISUAL DIRECTIVE */
/* Light (default): no additional wrapper styles needed; DataTable handles its own surface */
/* Dark: .entity-table { background: #0a0a14; color: #e2e8f0; } */
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
