---
name: neus-page-detail
description: |
  Generates a complete detail/show page for a data entity using Neus UI Card and Actions.
  Produces a .tsx file with entity data display, action buttons, and delete confirmation modal.
  Use whenever the user asks for: "detalle de X", "vista de X", "show X", "page detail",
  "ver X", "ficha de X", "perfil de X", "información de X", "detail page", "show page".
  Always use for any entity detail/show view in a Neus UI project.
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
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Product detail showing name, price, category, and description"
---

# Neus Page Detail

Generates a detail/show page with Card, Actions, and delete confirmation Modal.

## Before starting

Read:
- `.agents/skills/_shared/anti-slop.md`
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Card, Actions, Modal, Button, Link sections

## Phase 0 — Collect Data

Ask the user these questions and wait for their complete reply before generating:

---

**Actions** — What actions will be available on the detail page? (can select multiple)
- Edit — button that navigates to the edit form
- Delete — button with confirmation modal
- Back to list — navigation link back to the list

**Image** — Is there an image/avatar to display?
- Yes, has image/avatar — show record image in the Card
- No image — text fields and data only

**Layout** — Will this page use AppTemplate (navigation sidebar)?
- Yes, with AppTemplate (recommended) — includes sidebar + header
- No, content only — no app shell

Also include in your reply:
- Entity name (singular PascalCase)
- Fields to display (exact — do not add extras)
- If using AppTemplate: sidebar items + active route
  — IMPORTANT: sidebar shows only top-level sections. This detail route
    MUST have `visible: false`; it is reached via list row action, not sidebar.

---

## Phase 1 — P0 Verification

- [ ] Output fields == intake fields
- [ ] Entity arrives as typed prop (`item: Entity`)
- [ ] No hardcoded data

## Phase 2 — Generate Artifact

Produce **three files**: `EntityDetail.tsx` + `EntityDetail.styles.css` + `EntityDetail.types.ts`.

### EntityDetail.types.ts

```ts
export type Entity = {
  id: number;
  // ...exact fields from intake
};

export type EntityDetailProps = {
  item: Entity;                    // from API — never hardcode
  onEdit?: () => void;
  onDelete?: () => void;
  onBack?: () => void;
  routes?: SidebarItem[];          // for AppTemplate
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

### Base structure

```tsx
import { AppTemplate, Card, Actions, Modal, Button, Badge } from 'neus-ui';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
// Requires: pnpm add lucide-react
import './EntityDetail.styles.css';
import type { Entity, EntityDetailProps, SidebarItem } from './EntityDetail.types';

export const EntityDetail = ({
  item,
  onEdit,
  onDelete,
  onBack,
  routes,
}: EntityDetailProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const content = (
    <div className="entity-detail">
      <div className="entity-detail__nav">
        {/* Back button: use outlined/text variant — never ghost/secondary (do not exist) */}
        {onBack && (
          <Button label="← Back to list" variant="outlined" color="primary" onClick={onBack} />
        )}
        <Actions
          onEdit={onEdit}
          onDelete={onDelete ? () => setShowDeleteModal(true) : undefined}
          editLabel="Edit"
          deleteLabel="Delete"
        />
      </div>

      <Card
        avatarImage={/* item.avatar if exists, else omit */}
        avatarAlt={/* item.name if avatar exists, else omit */}
      >
        {/* Fields from intake — exact, no extras */}
        <div className="entity-detail__field">
          <span className="entity-detail__label">Field</span>
          <span className="entity-detail__value">{item.field}</span>
        </div>
      </Card>

      <Modal
        isOpen={showDeleteModal}
        title="Delete record?"
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonColor="error"
        onConfirm={() => { onDelete?.(); setShowDeleteModal(false); }}
        onCancel={() => setShowDeleteModal(false)}
      >
        This action cannot be undone.
      </Modal>
    </div>
  );

  if (routes) {
    return <AppTemplate routes={routes}>{content}</AppTemplate>;
  }
  return content;
};
```

### EntityDetail.styles.css


```css
.entity-detail { padding: 1.5rem; }
.entity-detail__nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.entity-detail__field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border-light);
}
.entity-detail__label {
  font-size: 0.8em;
  font-weight: 600;
  color: var(--color-gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.entity-detail__value {
  font-size: 1rem;
  color: var(--color-gray-900);
}
```

### Status field pattern

```tsx
{/* For status/enum fields: use Badge with semantic color mapping */}
<div className="entity-detail__field">
  <span className="entity-detail__label">Status</span>
  <span className="entity-detail__value">
    <Badge
      label={item.status === 'active' ? 'Active' : 'Inactive'}
      color={item.status === 'active' ? 'success' : 'neutral'}
    />
  </span>
</div>
```
