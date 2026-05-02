# DataTable

Data table component with pagination, row actions, and card layout support.

## Props

| Property             | Type                                       | Required | Description                   |
| -------------------- | ------------------------------------------ | -------- | ----------------------------- |
| `data`               | `T[]`                                      | ✅       | Array of data to display      |
| `pagination`         | `PaginationInfo`                           | ✅       | Pagination information        |
| `onEdit`             | `(rowData: T) => void`                     | ❌       | Callback on row edit          |
| `onDelete`           | `(rowData: T) => void`                     | ❌       | Callback on row delete        |
| `onInfo`             | `(rowData: T) => void`                     | ❌       | Callback on more info         |
| `onPaginationChange` | `(params: PaginationChangeParams) => void` | ❌       | Callback on pagination change |
| `columnLabels`       | `Record<string, string>`                   | ❌       | Column name mappings          |
| `useCardLayout`      | `boolean`                                  | ❌       | Use card layout on mobile     |
| `noDataTitle`        | `string`                                   | ❌       | Title when no data            |
| `noDataDescription`  | `string`                                   | ❌       | Description when no data      |
| `hiddenColumns`      | `string[]`                                 | ❌       | Column names to hide          |

**PaginationInfo:**

```tsx
interface PaginationInfo {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

interface PaginationChangeParams {
  currentPage: number;
  pageSize: number;
}
```


## Live Demo

<ClientOnly>
  <DataTableDemo />
</ClientOnly>

## Usage Example

```tsx
import { DataTable } from "@neus-ui/components";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export function UsersTable() {
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      createdAt: "2024-01-10",
    },
  ]);

  const [pagination] = useState({
    current_page: 1,
    last_page: 5,
    per_page: 10,
    total: 50,
  });

  return (
    <DataTable
      data={users}
      pagination={pagination}
      onEdit={(user) => console.log("Edit user:", user)}
      onDelete={(user) => console.log("Delete user:", user)}
      columnLabels={{
        id: "ID",
        name: "Name",
        email: "Email",
        role: "Role",
        createdAt: "Created At",
      }}
      hiddenColumns={["id"]}
      useCardLayout={true}
      noDataTitle="No users"
      noDataDescription="No users found in the system"
      onPaginationChange={(params) => {
        console.log("Go to page:", params.currentPage);
      }}
    />
  );
}
```
