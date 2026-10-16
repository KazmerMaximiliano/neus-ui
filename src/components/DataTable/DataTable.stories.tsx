import type { Meta, StoryObj } from "@storybook/react";
import type { ICellRendererParams } from "ag-grid-community";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { action } from "storybook/actions";
import {
  designSystemControl,
  withDesignSystem,
} from "../../../.storybook/designSystem";
import type { DesignSystemPreviewArgs } from "../../../.storybook/designSystem.types";
import { Card, CardContent, CardFooter, IconButton } from "../index";
import { DataTable as DataTableComponent } from "./DataTable";
import "./DataTable.stories.css";
import type { DataTableProps, DataTableSampleRow } from "./DataTable.types";

const sampleData: DataTableSampleRow[] = [
  { id: 1, name: "Ana Pérez", email: "ana@example.com" },
  { id: 2, name: "Juan Díaz", email: "juan@example.com" },
];

const renderActions = (row: DataTableSampleRow) => (
  <div className="data-table-story-actions">
    <IconButton
      icon={Eye}
      label={`View ${row.name}`}
      variant="text"
      size="small"
      onClick={() => action("row-view")(row)}
    />
    <IconButton
      icon={Pencil}
      label={`Edit ${row.name}`}
      variant="text"
      size="small"
      onClick={() => action("row-edit")(row)}
    />
    <IconButton
      icon={Trash2}
      label={`Delete ${row.name}`}
      variant="text"
      size="small"
      color="error"
      onClick={() => action("row-delete")(row)}
    />
  </div>
);

const meta: Meta<DataTableProps<DataTableSampleRow> & DesignSystemPreviewArgs> =
  {
    title: "Base/DataTable",
    component: DataTableComponent,
    tags: ["autodocs"],
    parameters: { layout: "padded" },
    decorators: [withDesignSystem],
    argTypes: {
      designSystem: designSystemControl,
      data: { control: "object", description: "Rows for the current page" },
      columnDefs: {
        control: "object",
        description: "Typed AG Grid definitions, including custom cells",
      },
      pagination: { control: "object", description: "Controlled pagination" },
      renderMobileCard: {
        control: false,
        description: "Consumer card renderer; absent keeps the mobile grid",
      },
      onPaginationChange: {
        action: "page-changed",
        description: "Requests a page; consumer supplies data",
      },
      noDataTitle: { control: "text", description: "Empty title" },
      noDataDescription: { control: "text", description: "Empty description" },
      className: { control: "text", description: "Root classes" },
      style: { control: "object", description: "Root override" },
      paginationStyle: {
        control: "object",
        description: "Pagination override",
      },
      emptyStateStyle: {
        control: "object",
        description: "Empty content override",
      },
    },
  };

export const DataTable: StoryObj<typeof meta> = {
  args: {
    designSystem: "global",
    data: sampleData,
    columnDefs: [
      { field: "name", headerName: "Name" },
      { field: "email", headerName: "Email" },
      {
        colId: "actions",
        headerName: "Actions",
        width: 160,
        minWidth: 160,
        maxWidth: 160,
        flex: 0,
        resizable: false,
        sortable: false,
        filter: false,
        cellRenderer: ({ data }: ICellRendererParams<DataTableSampleRow>) =>
          data ? renderActions(data) : null,
      },
    ],
    pagination: { current_page: 1, last_page: 3, per_page: 2, total: 6 },
    renderMobileCard: (row) => (
      <Card>
        <CardContent>
          {row.name}
          <p>{row.email}</p>
        </CardContent>
        <CardFooter>{renderActions(row)}</CardFooter>
      </Card>
    ),
    noDataTitle: "No users found",
    noDataDescription: "Try adjusting your search",
    className: "",
    style: {},
    paginationStyle: {},
    emptyStateStyle: {},
  },
  render: (args) => (
    <div className="data-table-story">
      <DataTableComponent {...args} />
    </div>
  ),
};

export default meta;
