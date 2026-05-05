---
name: neus-pattern-modal
description: |
  Generates a Modal pattern with trigger button and confirmation handlers using Neus UI.
  Produces a reusable .tsx snippet with state management for open/close. Use when user needs
  just the modal pattern. Trigger: "modal de confirmación", "modal pattern", "modal de X",
  "confirmar acción", "dialog pattern", "modal standalone", "componente modal".
od:
  mode: prototype
  platform: desktop
  scenario: design
  design_system:
    requires: true
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Confirmation modal for deleting a product"
---

# Neus Pattern Modal

Generates a Modal pattern with trigger button and open/close state management.

## Before starting

Read:
- `.agents/skills/_shared/component-catalog.md` — Modal, Button sections

## Phase 0 — Collect Data

Ask in free text:
1. What action is the modal for? (delete, confirm, approve, etc.)
2. Confirm button color (error/primary/success)
3. Modal title and message text
4. Trigger button text

## Phase 2 — Generate

```tsx
import { Modal, Button } from 'neus-ui';
import { useState } from 'react';

type ConfirmModalProps = {
  onConfirm: () => void;
  loading?: boolean;
};

export const DeleteConfirmModal = ({ onConfirm, loading }: ConfirmModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        label="Delete"
        variant="outlined"
        color="error"
        onClick={() => setIsOpen(true)}
      />
      <Modal
        isOpen={isOpen}
        title="Delete record?"
        confirmText="Delete"
        cancelText="Cancel"
        confirmButtonColor="error"
        onConfirm={() => { onConfirm(); setIsOpen(false); }}
        onCancel={() => setIsOpen(false)}
      >
        This action cannot be undone. Are you sure you want to continue?
      </Modal>
    </>
  );
};
```
