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

Read:
- `.agents/skills/_shared/component-catalog.md` — DataTable, Actions, Modal sections

## Phase 0 — Collect Data

Ask in free text:
1. Entity name (singular PascalCase)
2. Columns to display (field + type — exact, do not add extras)
3. Row actions (edit/delete/info — which apply)
4. API data? (yes → typed props; no → mock data for demo)

## Phase 2 — Generate

```tsx
import { DataTable, Modal } from 'neus-ui';
import { useState } from 'react';

type Entity = { id: number; /* exact fields */ };

type EntityTableProps = {
  data: Entity[];
  pagination: { current_page: number; last_page: number; per_page: number; total: number };
  onEdit?: (item: Entity) => void;
  onDelete?: (item: Entity) => void;
  onInfo?: (item: Entity) => void;
  onPaginationChange?: (params: { currentPage: number; pageSize: number }) => void;
};

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
