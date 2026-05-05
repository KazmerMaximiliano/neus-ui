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

Read:
- `.agents/skills/_shared/component-catalog.md` — Card, Button sections

## Phase 0 — Collect Data

Ask in free text:
1. What entity do the cards represent (e.g.: Category, Service, Team member)
2. Fields to display on each card (exact)
3. Is there an image/avatar? (yes/no)
4. Is there a card action? (view detail, select, etc.)
5. Does data come from API? (yes → prop data[]; no → mock for demo)
6. Colors: use Card colors (purple/pink/red/yellow/blue/green) or white only?

## Phase 2 — Generate

```tsx
import { Card, Button } from 'neus-ui';

const CARD_COLORS = ['blue', 'green', 'purple', 'yellow', 'pink', 'red'] as const;

type Entity = {
  id: number;
  // ...exact fields from intake
};

type EntityCardGridProps = {
  items: Entity[];       // from API — never hardcode
  onSelect?: (item: Entity) => void;
};

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

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
}
.card-grid__title { font-size: 1rem; font-weight: 600; margin-bottom: 0.25rem; }
```
