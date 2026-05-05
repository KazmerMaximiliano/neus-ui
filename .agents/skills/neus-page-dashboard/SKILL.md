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

Read:
- `.agents/skills/_shared/anti-slop.md`
- `.agents/skills/_shared/component-catalog.md` — Card, DataTable, AppTemplate sections
- `references/dashboard-layouts.md` — KPI grid patterns

## Phase 0 — Collect Data

Use `AskUserQuestion` in ONE call:

```json
{
  "questions": [
    {
      "question": "Does the dashboard include a data table?",
      "header": "Table",
      "multiSelect": false,
      "options": [
        { "label": "Yes, with data table (Recommended)", "description": "KPI cards + DataTable for an entity" },
        { "label": "No, KPI cards only", "description": "Metrics only, no table" }
      ]
    },
    {
      "question": "How many KPIs will the dashboard have?",
      "header": "KPIs",
      "multiSelect": false,
      "options": [
        { "label": "3 KPIs", "description": "Grid of 3 metric cards" },
        { "label": "4 KPIs", "description": "Grid of 4 metric cards" },
        { "label": "6 KPIs", "description": "Grid of 6 metric cards" }
      ]
    },
    {
      "question": "Will the page use AppTemplate?",
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
- Dashboard name
- KPIs: name + value type (number, percentage, currency) + lucide-react icon
- If has table: entity + exact columns to display
- If using AppTemplate: sidebar items + active route
- Theme color

## Phase 1 — P0 Verification

- [ ] Output KPIs == intake KPIs (exact)
- [ ] KPI data received as props (not hardcoded)
- [ ] If has table: data as prop `data: Entity[]`
- [ ] No invented metrics or hardcoded demo data

## Phase 2 — Generate Artifact

Read `references/dashboard-layouts.md` for the card grid pattern.

### Base structure

```tsx
import { AppTemplate, Card, DataTable } from 'neus-ui';
import { TrendingUp, DollarSign, Users, [OtherIcons] } from 'lucide-react';

type KpiData = {
  total: number;
  average: number;
  // ...exact KPIs from intake
};

type RecentEntity = {
  id: number;
  // ...exact columns from intake
};

type DashboardProps = {
  kpis: KpiData;                    // from API — never hardcode
  recentData?: RecentEntity[];      // if table requested
  pagination?: PaginationInfo;      // if table requested
  routes?: SidebarItem[];
};

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

### Minimal CSS

```css
.dashboard { padding: 1.5rem; }
.dashboard h1 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; color: var(--color-gray-900); }
.dashboard__kpis {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}
.dashboard__kpi {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  text-align: center;
  color: var(--color-white);
}
.dashboard__kpi-value { font-size: 2rem; font-weight: 700; }
.dashboard__kpi-label { font-size: 0.85rem; opacity: 0.9; }
.dashboard__table h2 { font-size: 1.2rem; font-weight: 600; margin-bottom: 1rem; color: var(--color-gray-700); }
```
