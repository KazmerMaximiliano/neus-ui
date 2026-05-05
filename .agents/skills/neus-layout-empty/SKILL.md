---
name: neus-layout-empty
description: |
  Generates an empty state component with icon, message, and optional CTA using Neus UI Button.
  Produces a reusable .tsx component for when there is no data to display.
  Use when user asks for: "empty state", "sin datos", "placeholder de vacío", "estado vacío",
  "no hay datos", "pantalla sin resultados", "empty component", "estado sin contenido".
od:
  mode: prototype
  platform: desktop
  scenario: design
  design_system:
    requires: true
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Empty state for the product list when no products are registered"
---

# Neus Layout Empty

Generates an empty state component with icon, message, and optional CTA.

**Pending Component**: `EmptyState` does not exist in Neus UI — implement with CSS and document.

## Before starting

Read:
- `.agents/skills/_shared/component-catalog.md` — Button section

## Phase 0 — Collect Data

Ask in free text:
1. Empty state context (e.g.: "empty product list")
2. Empty state title (e.g.: "No products yet")
3. Description (e.g.: "Start by adding your first product")
4. Has CTA? If yes: text + handler
5. lucide-react icon (e.g.: Package, Inbox, Search)

## Phase 2 — Generate

```tsx
import { Button } from 'neus-ui';
import { [IconName] } from 'lucide-react';

type EmptyStateProps = {
  onAction?: () => void;
};

export const EmptyState = ({ onAction }: EmptyStateProps) => (
  <div className="empty-state">
    <div className="empty-state__icon">
      <[IconName] size={48} color="var(--color-gray-300)" />
    </div>
    <h3 className="empty-state__title">[Title from intake]</h3>
    <p className="empty-state__description">[Description from intake]</p>
    {onAction && (
      <Button
        label="[CTA from intake]"
        variant="solid"
        color="primary"
        onClick={onAction}
      />
    )}
  </div>
);
```

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  gap: 1rem;
}
.empty-state__icon { margin-bottom: 0.5rem; }
.empty-state__title { font-size: 1.25rem; font-weight: 600; color: var(--color-gray-700); }
.empty-state__description { font-size: 0.95rem; color: var(--color-gray-500); max-width: 320px; line-height: 1.5; }
```
