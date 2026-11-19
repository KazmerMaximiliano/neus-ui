import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../providers";
import { DataTable } from "./DataTable";
import type { AgGridReactProps } from "ag-grid-react";
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
    const forwardedColumnDefs = grid.props.columnDefs;
    expect(forwardedColumnDefs).toEqual(columnDefs);
    expect(screen.getByText("Ana")).toBeInTheDocument();
    rerender(
      <DataTable
        data={[{ ...data[0], name: "Bea" }]}
        columnDefs={columnDefs}
        pagination={pagination}
      />,
    );
    expect(grid.props.columnDefs).toBe(forwardedColumnDefs);
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
    const user = userEvent.setup();
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
    await user.click(screen.getByRole("button", { name: "Open Ana" }));
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
    const user = userEvent.setup();
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
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();
    await user.click(
      screen.getByRole("button", { name: "Next page" }),
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
      screen.getByRole("button", { name: "Next page" }),
    ).toBeDisabled();
    await user.click(
      screen.getByRole("button", { name: "Previous page" }),
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
      screen.getByRole("button", { name: "Next page" }),
    ).toBeDisabled();
  });
  it("renders a compact pagination whose names paginationLabels replaces", () => {
    const { rerender } = render(
      <DataTable data={data} columnDefs={columnDefs} pagination={pagination} />,
    );

    expect(screen.getByRole("navigation", { name: "Pagination" })).toHaveClass(
      "data-table__pagination",
      "pagination--compact",
    );
    expect(screen.getByText("1 / 3")).toHaveAttribute("aria-live", "polite");

    rerender(
      <DataTable
        data={data}
        columnDefs={columnDefs}
        pagination={pagination}
        paginationLabels={{ navigation: "Orders pages", next: "More orders" }}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Orders pages" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "More orders" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Previous page" })).toBeInTheDocument();
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

describe("DataTable part customization", () => {
  it.each([
    {
      cls: "className",
      sty: "style",
      base: "data-table",
      phase: "default",
    },
    {
      cls: "cardsClassName",
      sty: "cardsStyle",
      base: "data-table__cards",
      phase: "cards",
    },
    {
      cls: "cardClassName",
      sty: "cardStyle",
      base: "data-table__card",
      phase: "cards",
    },
    {
      cls: "gridClassName",
      sty: "gridStyle",
      base: "data-table__grid",
      phase: "default",
    },
    {
      cls: "paginationClassName",
      sty: "paginationStyle",
      base: "data-table__pagination",
      phase: "default",
    },
    {
      cls: "paginationInfoClassName",
      sty: "paginationInfoStyle",
      base: "data-table__pagination-info",
      phase: "default",
    },
    {
      cls: "emptyStateClassName",
      sty: "emptyStateStyle",
      base: "data-table__no-rows",
      phase: "empty",
    },
    {
      cls: "noRowsTitleClassName",
      sty: "noRowsTitleStyle",
      base: "data-table__no-rows-title",
      phase: "empty",
    },
    {
      cls: "noRowsDescriptionClassName",
      sty: "noRowsDescriptionStyle",
      base: "data-table__no-rows-description",
      phase: "empty",
    },
  ])(
    "applies and removes $cls / $sty ($phase) while preserving base classes",
    async ({ cls, sty, base, phase }) => {
      grid.mobile = phase === "cards";
      const overrides = {
        [cls]: "consumer-part",
        [sty]: { outlineOffset: "7px" },
      };
      const view = render(
        <ThemeProvider scope="local">
          <DataTable
            data={phase === "empty" ? [] : [{ id: 1, name: "Ada" }]}
            columnDefs={[{ field: "name" }]}
            pagination={{
              current_page: 1,
              last_page: 2,
              per_page: 10,
              total: 12,
            }}
            noDataTitle="Empty"
            noDataDescription="Add rows"
            renderMobileCard={(row) => <span>{row.name}</span>}
            {...overrides}
          />
        </ThemeProvider>,
      );
      const targets = view.container.querySelectorAll(".consumer-part");
      expect(targets.length).toBeGreaterThan(0);
      for (const target of targets) {
        expect(target).toHaveClass(base);
        expect(target).toHaveStyle({ outlineOffset: "7px" });
      }
      view.rerender(
        <ThemeProvider scope="local">
          <DataTable
            data={phase === "empty" ? [] : [{ id: 1, name: "Ada" }]}
            columnDefs={[{ field: "name" }]}
            pagination={{
              current_page: 1,
              last_page: 2,
              per_page: 10,
              total: 12,
            }}
            noDataTitle="Empty"
            noDataDescription="Add rows"
            renderMobileCard={(row) => <span>{row.name}</span>}
          />
        </ThemeProvider>,
      );
      expect(view.container.querySelector(".consumer-part")).toBeNull();
      for (const target of view.container.querySelectorAll("." + base)) {
        expect((target as HTMLElement).style.outlineOffset).not.toBe("7px");
      }
    },
  );
});
