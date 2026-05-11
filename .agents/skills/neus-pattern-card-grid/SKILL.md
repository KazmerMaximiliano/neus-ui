---
name: neus-pattern-card-grid
description: |
  Generates a responsive Card grid component using Neus UI Card with configurable colors and content.
  Produces a .tsx component with cards mapped from a data array. Use when user needs a card grid
  pattern. Trigger: "grilla de cards", "cards de X", "card grid", "grid de tarjetas",
  "cards pattern", "tarjetas de X", "card layout", "galería de cards".
od:
  mode: prototype
  platform: desktop
  scenario: design
  design_system:
    requires: true
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Card grid for product categories with name and image"
---

# Neus Pattern Card Grid

Generates a responsive Card grid component.

## Before starting

The "Shared Rules" section below is always active. Additionally read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Card, Button sections
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates
- `.agents/skills/_shared/dark-surfaces.md` — dark mode CSS recipes (read when Mode: dark)
- `.agents/skills/_shared/light-surfaces.md` — light mode CSS recipes (read when Mode: light)

## Phase 0 — Collect Data

Ask in free text:
1. What entity do the cards represent (e.g.: Category, Service, Team member)
2. Fields to display on each card (exact)
3. Is there an image/avatar? (yes/no)
4. Is there a card action? (view detail, select, etc.)
5. Does data come from API? (yes → prop data[]; no → mock for demo)
6. Colors: use Card colors (purple/pink/red/yellow/blue/green) or white only?

7. **Theme mode**: light or dark? (default: light)

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



Produce **three files** in this order: `EntityCardGrid.types.ts` → `EntityCardGrid.tsx` → `EntityCardGrid.styles.css`.

### EntityCardGrid.types.ts

```ts
export type Entity = {
  id: number;
  // ...exact fields from intake
};

export type EntityCardGridProps = {
  items: Entity[];
  onSelect?: (item: Entity) => void;
};
```

### EntityCardGrid.tsx

```tsx
import { Card, Button } from 'neus-ui';
import './EntityCardGrid.styles.css';
import type { Entity, EntityCardGridProps } from './EntityCardGrid.types';

const CARD_COLORS = ['blue', 'green', 'purple', 'yellow', 'pink', 'red'] as const;

export const EntityCardGrid = ({ items, onSelect }: EntityCardGridProps) => (
  <div className="card-grid">
    {items.map((item, index) => (
      <Card
        key={item.id}
        color={CARD_COLORS[index % CARD_COLORS.length]}
        avatarImage={item.avatar}    // only if intake specified avatar
        avatarAlt={item.name}        // only if avatar exists
        trailing={
          onSelect && (
            <Button
              label="View detail"
              variant="text"
              color="primary"
              onClick={() => onSelect(item)}
            />
          )
        }
      >
        {/* Fields from intake */}
        <h3 className="card-grid__title">{item.name}</h3>
      </Card>
    ))}
  </div>
);
```

### EntityCardGrid.styles.css

Apply Mode from VISUAL DIRECTIVE.

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}
.card-grid__title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

/* Dark mode overrides — apply when Mode: dark */
/* .card-grid wrapper: background: #0a0a14; padding: 2rem; */
/* Card component handles its own surface — use fill={true} for colored cards or let Card handle glass via parent */
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
