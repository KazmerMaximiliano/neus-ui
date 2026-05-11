---
name: neus-page-dashboard
description: |
  Generates a dashboard page with KPI cards and optional data table using Neus UI components.
  Produces a .tsx file with Card-based KPI metrics and DataTable, wrapped in AppTemplate.
  Use whenever the user asks for: "dashboard", "panel de control", "métricas", "KPIs",
  "overview page", "home de la app", "resumen de datos", "página principal con stats",
  "admin dashboard", "analytics page". Always use for any metrics/overview page.
od:
  mode: prototype
  platform: desktop
  scenario: design
  design_system:
    requires: true
  inputs:
    - name: dashboard_name
      type: string
      required: true
      description: "Dashboard name (e.g.: Sales Panel, Overview)"
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Dashboard with sales metrics: total, average, and conversion rate, plus recent orders table"
---

# Neus Page Dashboard

Generates a dashboard with KPI cards (using Card) and data table (using DataTable).

## Before starting

The "Shared Rules" section below is always active. Additionally read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Card, DataTable, AppTemplate sections
- `.agents/skills/_shared/design-personality.md` — apply VISUAL DIRECTIVE; KPI cards must have `fill={true}` with distinct colors, primary KPI spans 2 columns, apply slide-in animation
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates
- `.agents/skills/_shared/layout-patterns.md` — dashboard KPI strip, 2fr/1fr panel grid, and panel-head patterns (optional advanced layouts)
- `references/dashboard-layouts.md` — KPI grid patterns
- `.agents/skills/_shared/dark-surfaces.md` — dark mode CSS recipes (read when Mode: dark)
- `.agents/skills/_shared/light-surfaces.md` — light mode CSS recipes (read when Mode: light)

## Phase 0 — Collect Data

Ask the user these questions and wait for their complete reply before generating:

---

**Table** — Does the dashboard include a data table?
- Yes, with data table (recommended) — KPI cards + DataTable for an entity
- No, KPI cards only — metrics only, no table

**KPIs** — How many KPIs will the dashboard have?
- 3 KPIs — grid of 3 metric cards
- 4 KPIs — grid of 4 metric cards
- 6 KPIs — grid of 6 metric cards

**Layout** — Will the page use AppTemplate?
- Yes, with AppTemplate (recommended) — includes sidebar + header
- No, content only — no app shell

Also include in your reply:
- Dashboard name
- KPIs: name + value type (number, percentage, currency) + icon name
- If has table: entity + exact columns to display
- If using AppTemplate: sidebar items + active route
- Theme color

---

- **Theme mode**: light or dark? (default: light)

## Phase 1 — P0 Verification
## Phase 1 — Visual Resolution

- Mode: `dark` → read `dark-surfaces.md`; use `#0a0a14` canvas, glass surfaces where applicable
- Mode: `light` → read `light-surfaces.md`; use `var(--color-white)` or `var(--color-surface)` backgrounds (default)

Declare:

```
VISUAL DIRECTIVE
  Mode: dark | light
  Surface file: dark-surfaces.md | light-surfaces.md
```



- [ ] Output KPIs == intake KPIs (exact)
- [ ] KPI data received as props (not hardcoded)
- [ ] If has table: data as prop `data: Entity[]`
- [ ] No invented metrics or hardcoded demo data

## Phase 2 — Generate Artifact

Read `references/dashboard-layouts.md` for the card grid pattern.
Produce **three files**: `Dashboard.tsx` + `Dashboard.styles.css` + `Dashboard.types.ts`.

### Dashboard.types.ts

```ts
export type KpiData = {
  total: number;
  average: number;
  // ...exact KPIs from intake
};

export type RecentEntity = {
  id: number;
  // ...exact columns from intake
};

export type PaginationInfo = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type DashboardProps = {
  kpis: KpiData;                    // from API — never hardcode
  recentData?: RecentEntity[];      // if table requested
  pagination?: PaginationInfo;      // if table requested
  routes?: SidebarItem[];
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
import { AppTemplate, Card, DataTable, Badge } from 'neus-ui';
import { TrendingUp, DollarSign, Users, [OtherIcons] } from 'lucide-react';
import './Dashboard.styles.css';
import type { KpiData, RecentEntity, DashboardProps, SidebarItem } from './Dashboard.types';

export const Dashboard = ({ kpis, recentData, pagination, routes }: DashboardProps) => {
  const content = (
    <div className="dashboard">
      <h1>Dashboard Name</h1>

      {/* KPI Cards Grid */}
      <div className="dashboard__kpis">
        <Card color="blue" fill>
          <div className="dashboard__kpi">
            <TrendingUp size={24} />
            <span className="dashboard__kpi-value">{kpis.total}</span>
            <span className="dashboard__kpi-label">KPI Label</span>
          </div>
        </Card>
        {/* ...repeat for each KPI */}
      </div>

      {/* Badge can be used inside Card body for status indicators */}
      {/* e.g. <Badge label="Online" variant="dot" color="success" /> */}

      {/* Data Table (if requested) */}
      {recentData && pagination && (
        <div className="dashboard__table">
          <h2>Recent records</h2>
          <DataTable
            data={recentData}
            pagination={pagination}
            columnLabels={{ /* ...from intake */ }}
            hiddenColumns={['id']}
          />
        </div>
      )}
    </div>
  );

  if (routes) {
    return <AppTemplate routes={routes}>{content}</AppTemplate>;
  }
  return content;
};
```

### Dashboard.styles.css

Apply Mode from the VISUAL DIRECTIVE: `light` → standard surfaces; `dark` → glass surfaces on dark canvas.

```css
@keyframes neus-slide-in {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* Light mode (default) */
.dashboard { padding: 2rem; }
.dashboard h1 {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--color-gray-900);
  border-left: 4px solid var(--color-primary);
  padding-left: 1rem;
}
.dashboard__kpis {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* or repeat(4,1fr) for 4 KPIs */
  gap: 1.5rem;
  margin-bottom: 3rem;
  animation: neus-slide-in 0.4s ease forwards;
}
/* Primary KPI spans 2 columns — add class="dashboard__kpi-primary" to first card */
.dashboard__kpi-primary { grid-column: span 2; }
.dashboard__kpi {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  text-align: center;
  color: var(--color-white);
}
.dashboard__kpi-value {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 800;
}
.dashboard__kpi-label {
  font-family: var(--font-mono);
  font-size: 0.6875rem; /* 11px */
  font-weight: 500;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}
.dashboard__table h2 {
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-gray-700);
}

/* Dark mode overrides — apply when Mode: dark */
/* .dashboard { background: #0a0a14; color: #e2e8f0; } */
/* .dashboard h1 { color: #e2e8f0; } */
/* .dashboard__table h2 { color: #94a3b8; } */
/* KPI panel/card surfaces become glass — handled by Card component fill */
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
