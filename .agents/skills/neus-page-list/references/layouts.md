# Page List — Layout Patterns

## Pattern 1: List with AppTemplate

```tsx
<AppTemplate routes={sidebarRoutes} menu={<UserMenu />}>
  <div className="[entity]-list">
    <div className="[entity]-list__header">
      <h1>[Entity Name]</h1>
      <Button label="Create new" onClick={onCreateNew} />
    </div>
    <DataTable ... />
    <Modal ... />
  </div>
</AppTemplate>
```

## Pattern 2: List without AppTemplate

```tsx
<div className="[entity]-list">
  <div className="[entity]-list__header">
    <h1>[Entity Name]</h1>
    <Button label="Create new" onClick={onCreateNew} />
  </div>
  <DataTable ... />
  <Modal ... />
</div>
```

## DataTable Column Labels Pattern

Map field names to human-readable labels. Never leave field names as column headers:

```tsx
columnLabels={{
  name: 'Name',
  price: 'Price',
  status: 'Status',
  created_at: 'Created',
  // ...one entry per visible column
}}
```

## Hidden Columns

Always hide technical fields the user doesn't need to see:
```tsx
hiddenColumns={['id', 'created_at', 'updated_at', 'deleted_at']}
```

## Delete Confirmation Modal State Pattern

```tsx
const [deleteModal, setDeleteModal] = useState<{
  open: boolean;
  item?: Entity;
}>({ open: false });

// Trigger:
onDelete={(row) => setDeleteModal({ open: true, item: row })}

// Modal:
<Modal
  isOpen={deleteModal.open}
  title="Delete record?"
  confirmText="Delete"
  cancelText="Cancel"
  confirmButtonColor="error"
  onConfirm={() => {
    if (deleteModal.item) onDelete?.(deleteModal.item);
    setDeleteModal({ open: false });
  }}
  onCancel={() => setDeleteModal({ open: false })}
>
  This action cannot be undone.
</Modal>
```

## SidebarItem Array Pattern

```tsx
import { Home, Package, Users } from 'lucide-react';

const routes: SidebarItem[] = [
  { label: 'Dashboard', icon: Home, onClick: () => navigate('/'), active: false },
  { label: '[Entity Plural]', icon: [EntityIcon], onClick: () => navigate('/[route]'), active: true },
];
```

## Pagination Prop Pattern (API-driven)

```tsx
type PageListProps = {
  data: Entity[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  onPaginationChange?: (params: { currentPage: number; pageSize: number }) => void;
};
```
