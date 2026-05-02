import React, { useState } from "react";
import { ThemeProvider } from "@neus-ui/src/providers/ThemeProvider";
import { DataTable } from "@neus-ui/src/components/DataTable/DataTable";
import type { PaginationInfo } from "@neus-ui/src/components/DataTable/DataTable.types";

const ROWS = [
  { id: 1, name: "Alice Martin", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Chen", email: "bob@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Clara Díaz", email: "clara@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "David Park", email: "david@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Eva Rossi", email: "eva@example.com", role: "Admin", status: "Active" },
];

const columnLabels: Record<string, string> = {
  id: "ID",
  name: "Full Name",
  email: "Email",
  role: "Role",
  status: "Status",
};

export function DataTableDemoInner() {
  const [pagination, setPagination] = useState<PaginationInfo>({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 5,
  });

  return (
    <ThemeProvider>
      <div style={{ padding: "1.5rem 0" }}>
        <DataTable
          data={ROWS}
          pagination={pagination}
          columnLabels={columnLabels}
          onEdit={(row) => alert(`Edit: ${row.name}`)}
          onDelete={(row) => alert(`Delete: ${row.name}`)}
          onInfo={(row) => alert(`Info: ${row.name}`)}
          onPaginationChange={(p) =>
            setPagination((prev) => ({ ...prev, current_page: p.currentPage, per_page: p.pageSize }))
          }
        />
      </div>
    </ThemeProvider>
  );
}
