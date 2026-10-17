import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ModuleRegistry, ValidationModule } from "ag-grid-community";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DataTable } from "../../components/DataTable/DataTable";
import "../../css/app.css";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// ValidationModule reports features used without their module (AG Grid error #200).
ModuleRegistry.registerModules([ValidationModule]);

describe("DataTable grid modules", () => {
  it("registers every module its sorting, filtering and cell styling need", async () => {
    const messages: string[] = [];
    const record = (...args: unknown[]) => messages.push(args.map(String).join(" "));
    vi.spyOn(console, "error").mockImplementation(record);
    vi.spyOn(console, "warn").mockImplementation(record);
    render(
      <div style={{ width: 900 }}>
        <DataTable
          data={[
            { id: 1, name: "Ana", total: 3, createdAt: new Date(2024, 1, 1) },
            { id: 2, name: "Bruno", total: 1, createdAt: new Date(2024, 2, 1) },
          ]}
          pagination={{ current_page: 1, last_page: 1, per_page: 10, total: 2 }}
          columnDefs={[
            { field: "name" },
            { field: "total" },
            { field: "createdAt" },
            { field: "id", cellStyle: { fontWeight: 600 } },
          ]}
        />
      </div>,
    );
    await screen.findByText("Ana");

    await userEvent.click(document.querySelector(".ag-header-cell-label") as HTMLElement);
    await vi.waitFor(() => expect(document.querySelector(".ag-header-cell")).toHaveAttribute("aria-sort", "ascending"));

    for (const button of document.querySelectorAll(".ag-header-cell-filter-button")) {
      await userEvent.click(button as HTMLElement);
    }
    await vi.waitFor(() => expect(document.querySelector(".ag-filter")).not.toBeNull());

    // Warning #9 only reports grid CSS variables read before styles load.
    expect(messages.filter((message) => /AG Grid/.test(message) && !/warning #9/.test(message))).toEqual([]);
  });
});
