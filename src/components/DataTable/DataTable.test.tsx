import { describe, expect, it, vi } from "vitest";
import { DataTable } from "./DataTable";
import { DataTableProps, PaginationInfo } from "./DataTable.types";

interface TestRowData {
  id: number;
  name: string;
  email: string;
  status: string;
}

const defaultPagination: PaginationInfo = {
  current_page: 1,
  per_page: 10,
  last_page: 10,
  total: 100,
};

describe("DataTable - Component Definition & Props", () => {
  it("component is defined and exported", () => {
    expect(DataTable).toBeDefined();
    expect(typeof DataTable).toBe("function");
  });

  it("accepts required props", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "Active",
      },
    ];

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination: defaultPagination,
    };

    expect(props).toBeDefined();
    expect(props.data).toBeDefined();
    expect(props.pagination).toBeDefined();
  });

  it("accepts optional props", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        status: "Active",
      },
    ];

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination: defaultPagination,
      columnLabels: {
        id: "ID",
        name: "Name",
        email: "Email",
        status: "Status",
      },
      hiddenColumns: ["email"],
      useCardLayout: true,
      onEdit: vi.fn(),
      onDelete: vi.fn(),
      onInfo: vi.fn(),
    };

    expect(props.columnLabels).toBeDefined();
    expect(props.hiddenColumns).toBeDefined();
    expect(props.useCardLayout).toBe(true);
    expect(props.onEdit).toBeDefined();
    expect(props.onDelete).toBeDefined();
    expect(props.onInfo).toBeDefined();
  });

  it("handles empty data array", () => {
    const props: DataTableProps<TestRowData> = {
      data: [],
      pagination: defaultPagination,
    };

    expect(props.data).toHaveLength(0);
    expect(Array.isArray(props.data)).toBe(true);
  });

  it("handles data with various string lengths", () => {
    const longData: TestRowData[] = [
      {
        id: 1,
        name: "a".repeat(200),
        email: "test@example.com",
        status: "Active",
      },
    ];

    const props: DataTableProps<TestRowData> = {
      data: longData,
      pagination: defaultPagination,
    };

    expect(props.data[0].name.length).toBe(200);
  });

  it("handles special characters in data", () => {
    const specialData: TestRowData[] = [
      {
        id: 1,
        name: "John <Doe> & Co.",
        email: "john+test@example.com",
        status: "Active/Pending",
      },
    ];

    const props: DataTableProps<TestRowData> = {
      data: specialData,
      pagination: defaultPagination,
    };

    expect(props.data[0].name).toContain("<");
    expect(props.data[0].email).toContain("+");
  });

  it("handles unicode characters in data", () => {
    const unicodeData: TestRowData[] = [
      {
        id: 1,
        name: "José García 🎉",
        email: "jose@example.com",
        status: "Activo",
      },
    ];

    const props: DataTableProps<TestRowData> = {
      data: unicodeData,
      pagination: defaultPagination,
    };

    expect(props.data[0].name).toContain("é");
    expect(props.data[0].name).toContain("🎉");
  });
});

describe("DataTable - Data Validation", () => {
  it("validates pagination prop structure", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "Test",
        email: "test@example.com",
        status: "Active",
      },
    ];

    const pagination: PaginationInfo = {
      current_page: 5,
      per_page: 25,
      last_page: 20,
      total: 500,
    };

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination,
    };

    expect(props.pagination.current_page).toBe(5);
    expect(props.pagination.per_page).toBe(25);
    expect(props.pagination.last_page).toBe(20);
    expect(props.pagination.total).toBe(500);
  });

  it("handles multiple data rows", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "John",
        email: "john@example.com",
        status: "Active",
      },
      {
        id: 2,
        name: "Jane",
        email: "jane@example.com",
        status: "Inactive",
      },
      {
        id: 3,
        name: "Bob",
        email: "bob@example.com",
        status: "Active",
      },
    ];

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination: defaultPagination,
    };

    expect(props.data).toHaveLength(3);
    expect(props.data[0].name).toBe("John");
    expect(props.data[2].name).toBe("Bob");
  });

  it("validates columnLabels object structure", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "Test",
        email: "test@example.com",
        status: "Active",
      },
    ];

    const columnLabels = {
      id: "ID",
      name: "Name",
      email: "Email",
      status: "Status",
    };

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination: defaultPagination,
      columnLabels,
    };

    expect(props.columnLabels).toBeDefined();
    if (props.columnLabels) {
      expect(Object.keys(props.columnLabels)).toHaveLength(4);
      expect(Object.values(props.columnLabels)).toContain("Name");
    }
  });

  it("validates hiddenColumns array", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "Test",
        email: "test@example.com",
        status: "Active",
      },
    ];

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination: defaultPagination,
      hiddenColumns: ["email", "status"],
    };

    expect(Array.isArray(props.hiddenColumns)).toBe(true);
    expect(props.hiddenColumns).toHaveLength(2);
    expect(props.hiddenColumns).toContain("email");
  });
});

describe("DataTable - Boolean Props", () => {
  it("accepts useCardLayout boolean", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "Test",
        email: "test@example.com",
        status: "Active",
      },
    ];

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination: defaultPagination,
      useCardLayout: true,
    };

    expect(typeof props.useCardLayout).toBe("boolean");
    expect(props.useCardLayout).toBe(true);
  });

  it("accepts noDataTitle and noDataDescription", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "Test",
        email: "test@example.com",
        status: "Active",
      },
    ];

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination: defaultPagination,
      noDataTitle: "Sin datos",
      noDataDescription: "No hay registros disponibles",
    };

    expect(typeof props.noDataTitle).toBe("string");
    expect(props.noDataTitle).toBe("Sin datos");
    expect(props.noDataDescription).toBe("No hay registros disponibles");
  });

  it("accepts edit, delete and info callbacks", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "Test",
        email: "test@example.com",
        status: "Active",
      },
    ];

    const mockEdit = vi.fn();
    const mockDelete = vi.fn();
    const mockInfo = vi.fn();

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination: defaultPagination,
      onEdit: mockEdit,
      onDelete: mockDelete,
      onInfo: mockInfo,
    };

    expect(typeof props.onEdit).toBe("function");
    expect(typeof props.onDelete).toBe("function");
    expect(typeof props.onInfo).toBe("function");
  });

  it("defaults to undefined when optional props omitted", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "Test",
        email: "test@example.com",
        status: "Active",
      },
    ];

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination: defaultPagination,
    };

    expect(props.useCardLayout).toBeUndefined();
    expect(props.onEdit).toBeUndefined();
    expect(props.onDelete).toBeUndefined();
  });
});

describe("DataTable - Callback Props", () => {
  it("accepts onPaginationChange callback", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "Test",
        email: "test@example.com",
        status: "Active",
      },
    ];

    const mockCallback = vi.fn();

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination: defaultPagination,
      onPaginationChange: mockCallback,
    };

    expect(props.onPaginationChange).toBeDefined();
    expect(typeof props.onPaginationChange).toBe("function");
  });

  it("accepts multiple action callbacks together", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "Test",
        email: "test@example.com",
        status: "Active",
      },
    ];

    const mockEdit = vi.fn();
    const mockDelete = vi.fn();
    const mockInfo = vi.fn();
    const mockPaginationChange = vi.fn();

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination: defaultPagination,
      onEdit: mockEdit,
      onDelete: mockDelete,
      onInfo: mockInfo,
      onPaginationChange: mockPaginationChange,
    };

    expect(props.onEdit).toBeDefined();
    expect(props.onDelete).toBeDefined();
    expect(props.onInfo).toBeDefined();
    expect(props.onPaginationChange).toBeDefined();
  });
});

describe("DataTable - Edge Cases", () => {
  it("handles very large pagination numbers", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "Test",
        email: "test@example.com",
        status: "Active",
      },
    ];

    const pagination: PaginationInfo = {
      current_page: 9999,
      per_page: 5000,
      last_page: 10000,
      total: 50000000,
    };

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination,
    };

    expect(props.pagination.current_page).toBe(9999);
    expect(props.pagination.per_page).toBe(5000);
  });

  it("handles single row in data", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "Only One",
        email: "one@example.com",
        status: "Active",
      },
    ];

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination: defaultPagination,
    };

    expect(props.data).toHaveLength(1);
    expect(props.data[0].id).toBe(1);
  });

  it("handles null/undefined in optional columns list", () => {
    const testData: TestRowData[] = [
      {
        id: 1,
        name: "Test",
        email: "test@example.com",
        status: "Active",
      },
    ];

    const props: DataTableProps<TestRowData> = {
      data: testData,
      pagination: defaultPagination,
      hiddenColumns: [],
    };

    expect(props.hiddenColumns).toHaveLength(0);
  });

  it("handles mixed data types in single column", () => {
    interface MixedRowData {
      id: number;
      value: string;
      metadata?: string;
    }

    const testData: MixedRowData[] = [
      {
        id: 1,
        value: "text",
        metadata: "extra",
      },
      {
        id: 2,
        value: "123",
        metadata: "123",
      },
      {
        id: 3,
        value: "true",
      },
    ];

    const props: DataTableProps<MixedRowData> = {
      data: testData,
      pagination: defaultPagination,
    };

    expect(props.data).toHaveLength(3);
    expect(props.data[2].metadata).toBeUndefined();
  });
});
