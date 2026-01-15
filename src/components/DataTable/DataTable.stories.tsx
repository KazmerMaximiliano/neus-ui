import { Meta, StoryObj } from "@storybook/react";
import { DataTable as DataTableComponent } from "./DataTable";

const meta: Meta<typeof DataTableComponent> = {
  title: "Components/DataTable",
  component: DataTableComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      control: false,
      description: "Array of data objects to display in the table",
    },
    pagination: {
      control: false,
      description: "Pagination information object",
    },
    onEdit: {
      action: "edited",
      description: "Callback function when edit action is clicked",
    },
    onDelete: {
      action: "deleted",
      description: "Callback function when delete action is clicked",
    },
    onInfo: {
      action: "info",
      description: "Callback function when info action is clicked",
    },
    onPaginationChange: {
      action: "page-changed",
      description: "Callback function when pagination changes",
    },
    columnLabels: {
      control: "object",
      description: "Object mapping column fields to display labels",
    },
    useCardLayout: {
      control: "boolean",
      description: "Enable card layout on mobile devices",
    },
    noDataTitle: {
      control: "text",
      description: "Title to show when no data is available",
    },
    noDataDescription: {
      control: "text",
      description: "Description to show when no data is available",
    },
    hiddenColumns: {
      control: "object",
      description: "Array of column field names to hide",
    },
  },
};

type Story = StoryObj<typeof meta>;

// Sample data for the story
const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    created_at: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    status: "Active",
    created_at: "2024-01-16",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Moderator",
    status: "Inactive",
    created_at: "2024-01-17",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "User",
    status: "Active",
    created_at: "2024-01-18",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "User",
    status: "Active",
    created_at: "2024-01-19",
  },
];

const samplePagination = {
  current_page: 1,
  last_page: 3,
  per_page: 5,
  total: 15,
};

const columnLabels = {
  id: "ID",
  name: "Full Name",
  email: "Email Address",
  role: "User Role",
  status: "Account Status",
  created_at: "Registration Date",
};

export const DataTable: Story = {
  args: {
    data: sampleData,
    pagination: samplePagination,
    columnLabels,
    useCardLayout: true,
    noDataTitle: "No users found",
    hiddenColumns: [],
    noDataDescription: "Try adjusting your search criteria or add new users",
    onEdit: (rowData: any) => {
      console.log("Edit user:", rowData);
    },
    onDelete: (rowData: any) => {
      console.log("Delete user:", rowData);
    },
    onInfo: (rowData: any) => {
      console.log("View user info:", rowData);
    },
    onPaginationChange: (params: any) => {
      console.log("Pagination changed:", params);
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "60vw",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
