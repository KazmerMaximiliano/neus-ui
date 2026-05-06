# Dashboard Layouts — Neus Page Dashboard

## KPI Card Color Assignment

Assign Card colors to give each KPI visual distinction. Use `fill={true}` for colored background:

| KPI Order | Recommended Color |
|-----------|------------------|
| 1st KPI | `blue` |
| 2nd KPI | `green` |
| 3rd KPI | `purple` |
| 4th KPI | `yellow` |
| 5th KPI | `pink` |
| 6th KPI | `red` |

## KPI Grid Patterns

### 3 KPIs
```tsx
<div className="dashboard__kpis dashboard__kpis--3">
  <Card color="blue" fill>...</Card>
  <Card color="green" fill>...</Card>
  <Card color="purple" fill>...</Card>
</div>
```
```css
.dashboard__kpis--3 { grid-template-columns: repeat(3, 1fr); }
```

### 4 KPIs
```css
.dashboard__kpis--4 { grid-template-columns: repeat(4, 1fr); }
```

### 6 KPIs
```css
.dashboard__kpis--6 { grid-template-columns: repeat(3, 1fr); }
/* 2 rows of 3 */
```

## KPI Value Formatting

```tsx
// Number
<span className="dashboard__kpi-value">{kpis.total.toLocaleString()}</span>

// Percentage
<span className="dashboard__kpi-value">{kpis.rate}%</span>

// Currency
<span className="dashboard__kpi-value">
  ${kpis.revenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
</span>
```

## Icon in KPI Card

Use lucide-react icons. Pass icon name from intake:

```tsx
import { TrendingUp, DollarSign, Users, ShoppingCart, Percent, Package } from 'lucide-react';

// Inside Card:
<div className="dashboard__kpi">
  <TrendingUp size={32} />
  <span className="dashboard__kpi-value">{kpis.total}</span>
  <span className="dashboard__kpi-label">Total sales</span>
</div>
```

## Full Dashboard Layout with Table

```tsx
<div className="dashboard">
  {/* Header */}
  <div className="dashboard__header">
    <h1>Control Panel</h1>
  </div>

  {/* KPI Grid */}
  <div className="dashboard__kpis">
    {/* KPI Cards */}
  </div>

  {/* Recent Data Section */}
  <section className="dashboard__section">
    <h2>Recent data</h2>
    <DataTable
      data={recentData}
      pagination={pagination}
      columnLabels={{ /* ...from intake */ }}
      hiddenColumns={['id', 'created_at']}
      useCardLayout={false}
    />
  </section>
</div>
```

## Props Pattern for Dashboard

```tsx
type DashboardProps = {
  // KPIs — never hardcode, always from API
  kpis: {
    [kpiName]: number;    // one per KPI from intake
  };
  // Recent data table — optional
  recentData?: Entity[];
  pagination?: PaginationInfo;
  onPaginationChange?: (params: { currentPage: number; pageSize: number }) => void;
  // Navigation
  routes?: SidebarItem[];
};
```
