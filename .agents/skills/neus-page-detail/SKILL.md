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
- `.agents/skills/_shared/component-catalog.md` — Card, Actions, Modal, Button, Link sections

## Phase 0 — Collect Data

Use `AskUserQuestion` in ONE call:

```json
{
  "questions": [
    {
      "question": "What actions will be available on the detail page?",
      "header": "Actions",
      "multiSelect": true,
      "options": [
        { "label": "Edit", "description": "Button that navigates to the edit form" },
        { "label": "Delete", "description": "Button with confirmation modal" },
        { "label": "Back to list", "description": "Navigation link back to the list" }
      ]
    },
    {
      "question": "Is there an image/avatar to display?",
      "header": "Image",
      "multiSelect": false,
      "options": [
        { "label": "Yes, has image/avatar", "description": "Show record image in the Card" },
        { "label": "No image", "description": "Text fields and data only" }
      ]
    },
    {
      "question": "Will this page use AppTemplate (navigation sidebar)?",
      "header": "Layout",
      "multiSelect": false,
      "options": [
        { "label": "Yes, with AppTemplate (Recommended)", "description": "Includes sidebar + header" },
        { "label": "No, content only", "description": "No app shell" }
      ]
    }
  ]
}
```

Also ask in free text:
- Entity name (singular PascalCase)
- Fields to display (exact — do not add extras)
- If using AppTemplate: sidebar items + active route

## Phase 1 — P0 Verification

- [ ] Output fields == intake fields
- [ ] Entity arrives as typed prop (`item: Entity`)
- [ ] No hardcoded data

## Phase 2 — Generate Artifact

### Base structure

```tsx
import { AppTemplate, Card, Actions, Modal, Button, Link } from 'neus-ui';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

type Entity = {
  id: number;
  // ...exact fields from intake
};

type EntityDetailProps = {
  item: Entity;                    // from API — never hardcode
  onEdit?: () => void;
  onDelete?: () => void;
  onBack?: () => void;
  routes?: SidebarItem[];          // for AppTemplate
};

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
        {onBack && <Link label="← Back to list" type="secondary" onClick={onBack} />}
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

### Minimal CSS

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
