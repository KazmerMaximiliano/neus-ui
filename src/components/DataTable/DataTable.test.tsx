import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AgGridReactProps } from "ag-grid-react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DataTable } from "./DataTable";
import type { DataTableSampleRow } from "./DataTable.types";

const grid = vi.hoisted(() => ({
  props: {} as AgGridReactProps<DataTableSampleRow>,
  mobile: false,
}));
vi.mock("../../hooks/useResponsive", () => ({
  useResponsive: () => ({ isMobile: grid.mobile }),
}));
vi.mock("ag-grid-react", () => ({
  AgGridReact: (props: AgGridReactProps<DataTableSampleRow>) => {
    grid.props = props;
    const Empty = props.noRowsOverlayComponent;
    return (
      <div data-testid="grid">
        {props.rowData?.length ? (
          props.rowData.map((row) => <span key={row.id}>{row.name}</span>)
        ) : (
          <Empty {...props.noRowsOverlayComponentParams} />
        )}
      </div>
    );
  },
}));
afterEach(() => {
  cleanup();
  grid.mobile = false;
});
const data = [{ id: 1, name: "Ana", email: "ana@example.com" }];
const columnDefs = [
  { field: "name" as const, headerName: "User", hide: false },
];
const pagination = { current_page: 1, last_page: 3, per_page: 10, total: 25 };

describe("DataTable consumer composition", () => {
  it("forwards typed columns and updates rows without derived state", () => {
    const { rerender } = render(
      <DataTable data={data} columnDefs={columnDefs} pagination={pagination} />,
    );
    expect(grid.props.columnDefs).toBe(columnDefs);
    expect(screen.getByText("Ana")).toBeInTheDocument();
    rerender(
      <DataTable
        data={[{ ...data[0], name: "Bea" }]}
        columnDefs={columnDefs}
        pagination={pagination}
      />,
    );
    expect(screen.queryByText("Ana")).not.toBeInTheDocument();
    expect(screen.getByText("Bea")).toBeInTheDocument();
  });
  it("keeps mobile grid without a card renderer", () => {
    grid.mobile = true;
    render(
      <DataTable data={data} columnDefs={columnDefs} pagination={pagination} />,
    );
    expect(screen.getByTestId("grid")).toBeInTheDocument();
  });
  it("uses consumer cards and actions only on mobile", async () => {
    grid.mobile = true;
    const action = vi.fn();
    render(
      <DataTable
        data={data}
        columnDefs={columnDefs}
        pagination={pagination}
        renderMobileCard={(row) => (
          <button onClick={() => action(row)}>Open {row.name}</button>
        )}
      />,
    );
    expect(screen.queryByTestId("grid")).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Open Ana" }));
    expect(action).toHaveBeenCalledWith(data[0]);
  });
  it.each([false, true])(
    "shows an accessible empty state (mobile %s)",
    (mobile) => {
      grid.mobile = mobile;
      render(
        <DataTable<(typeof data)[number]>
          data={[]}
          columnDefs={columnDefs}
          pagination={pagination}
          renderMobileCard={(row) => row.name}
          noDataTitle="Nothing here"
          noDataDescription="Change filters"
          emptyStateStyle={{ padding: 12 }}
        />,
      );
      expect(screen.getByRole("status")).toHaveTextContent("Nothing here");
      expect(screen.getByRole("status")).toHaveTextContent("Change filters");
      expect(screen.getByRole("status")).toHaveStyle({ padding: "12px" });
    },
  );
  it("requests pages without mutating controlled pagination", async () => {
    const onPaginationChange = vi.fn();
    const { rerender } = render(
      <DataTable
        data={data}
        columnDefs={columnDefs}
        pagination={pagination}
        onPaginationChange={onPaginationChange}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Página anterior" }),
    ).toBeDisabled();
    await userEvent.click(
      screen.getByRole("button", { name: "Página siguiente" }),
    );
    expect(onPaginationChange).toHaveBeenCalledWith({
      currentPage: 2,
      pageSize: 10,
    });
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
    rerender(
      <DataTable
        data={data}
        columnDefs={columnDefs}
        pagination={{ ...pagination, current_page: 3 }}
        onPaginationChange={onPaginationChange}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Página siguiente" }),
    ).toBeDisabled();
    await userEvent.click(
      screen.getByRole("button", { name: "Página anterior" }),
    );
    expect(onPaginationChange).toHaveBeenLastCalledWith({
      currentPage: 2,
      pageSize: 10,
    });
  });
  it("treats an empty pagination range as a single page", () => {
    render(
      <DataTable<(typeof data)[number]>
        data={[]}
        columnDefs={columnDefs}
        pagination={{ ...pagination, last_page: 0 }}
      />,
    );
    expect(screen.getByText("1 / 1")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Página siguiente" }),
    ).toBeDisabled();
  });
  it("applies root and pagination styles independently", () => {
    const { container } = render(
      <DataTable
        data={data}
        columnDefs={columnDefs}
        pagination={pagination}
        className="custom"
        style={{ gap: 12 }}
        paginationStyle={{ opacity: 0.8 }}
      />,
    );
    expect(container.querySelector(".data-table")).toHaveClass("custom");
    expect(container.querySelector(".data-table")).toHaveStyle({ gap: "12px" });
    expect(container.querySelector(".data-table__pagination")).toHaveStyle({
      opacity: 0.8,
    });
  });
});
