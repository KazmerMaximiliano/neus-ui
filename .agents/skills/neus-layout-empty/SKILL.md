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

The "Shared Rules" section below is always active. Additionally read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Button section
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates
- `.agents/skills/_shared/dark-surfaces.md` — dark mode CSS recipes (read when Mode: dark)
- `.agents/skills/_shared/light-surfaces.md` — light mode CSS recipes (read when Mode: light)

## Phase 0 — Collect Data

Ask in free text:
1. Empty state context (e.g.: "empty product list")
2. Empty state title (e.g.: "No products yet")
3. Description (e.g.: "Start by adding your first product")
4. Has CTA? If yes: text + handler
5. lucide-react icon (e.g.: Package, Inbox, Search)
6. **Theme mode**: light or dark? (default: light — inherits from parent app)

## Phase 1 — Visual Resolution

- Mode: `dark` → icon color `rgba(255,255,255,0.3)`, title `#e2e8f0`, description `#94a3b8`
- Mode: `light` → icon color `var(--color-gray-300)`, title `var(--color-gray-700)`, description `var(--color-gray-500)` (default)

## Phase 2 — Generate

Produce **three files** in this order: `EmptyState.types.ts` → `EmptyState.tsx` → `EmptyState.styles.css`.

### EmptyState.types.ts

```ts
export type EmptyStateProps = {
  onAction?: () => void;
};
```

### EmptyState.tsx

```tsx
import { Button } from 'neus-ui';
import { [IconName] } from 'lucide-react';
import './EmptyState.styles.css';
import type { EmptyStateProps } from './EmptyState.types';

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

### EmptyState.styles.css


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
.empty-state__title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-gray-700);
}
.empty-state__description { font-size: 0.95rem; color: var(--color-gray-500); max-width: 320px; line-height: 1.5; }

/* Dark mode (Mode: dark) — use instead: */
/* .empty-state__icon color → rgba(255,255,255,0.3) */
/* .empty-state__title { color: #e2e8f0; } */
/* .empty-state__description { color: #94a3b8; } */
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
