import { cleanup, render, screen } from "@testing-library/react";
import { Inbox } from "lucide-react";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "../../components/Button";
import { DataTable } from "../../components/DataTable";
import { EmptyState } from "../../components/EmptyState";
import { Separator } from "../../components/Separator";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import type { DesignSystemId } from "../design-systems.types";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS: readonly DesignSystemId[] = ["neus", "apple", "carbon", "material", "neobrutalism", "vercel"];

/** The text color against what is painted behind it, down to the page surface. */
const textContrast = (element: HTMLElement, ...layers: HTMLElement[]) => {
  const surface = resolveColor(element, "--color-surface");
  const ground = [element, ...layers].reduceRight(
    (backdrop, layer) => flatten(getComputedStyle(layer).backgroundColor, backdrop),
    surface,
  );
  return contrastRatio(getComputedStyle(element).color, ground);
};

describe.each(["light", "dark"] as const)("Content in %s mode", (scheme) => {
  it.each(SYSTEMS)("draws the %s separator across and down a row from its recipe", (id) => {
    render(
      <ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
        <div style={{ display: "flex", flexDirection: "column", width: 300 }}>
          <span>Above</span>
          <Separator />
          <span>Below</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", height: 40 }}>
          <span>Edit</span>
          <Separator orientation="vertical" />
          <span>Share</span>
        </div>
      </ThemeProvider>,
    );
    const [across, down] = screen.getAllByRole("separator");
    const thickness = parseFloat(getComputedStyle(across).getPropertyValue("--separator-thickness"));

    expect(across.getBoundingClientRect().width).toBe(300);
    expect(across.getBoundingClientRect().height).toBe(thickness);
    expect(down.getBoundingClientRect().width).toBe(thickness);
    expect(down.getBoundingClientRect().height).toBe(40);
    expect(getComputedStyle(across).backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
    expect(screen.getByText("Below").getBoundingClientRect().top).toBeGreaterThan(across.getBoundingClientRect().bottom);
  });

  it.each(SYSTEMS)("lays out the %s empty state with a readable title and description", (id) => {
    render(
      <ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
        <div style={{ width: 480 }}>
          <EmptyState
            media={<Inbox aria-hidden />}
            title="No messages yet"
            description="Messages appear here as soon as customers write."
            actions={<Button label="Invite customers" />}
          />
        </div>
      </ThemeProvider>,
    );
    const root = screen.getByText("No messages yet").closest<HTMLElement>(".empty-state")!;
    const title = screen.getByRole("heading", { name: "No messages yet" });
    const description = screen.getByText("Messages appear here as soon as customers write.");
    const media = root.querySelector<HTMLElement>(".empty-state__media")!;
    const action = screen.getByRole("button", { name: "Invite customers" });

    expect(textContrast(title, root)).toBeGreaterThanOrEqual(4.5);
    expect(textContrast(description, root)).toBeGreaterThanOrEqual(4.5);
    expect(media.getBoundingClientRect().bottom).toBeLessThanOrEqual(title.getBoundingClientRect().top);
    expect(description.getBoundingClientRect().top).toBeGreaterThanOrEqual(title.getBoundingClientRect().bottom);
    expect(action.getBoundingClientRect().top).toBeGreaterThanOrEqual(description.getBoundingClientRect().bottom);
    expect(root.getBoundingClientRect().width).toBeLessThanOrEqual(480);
  });
});

describe("Content layout and scopes", () => {
  it("leaves the decorative separator out of the accessibility tree but draws it", () => {
    const { container } = render(
      <ThemeProvider scope="local">
        <div style={{ display: "flex", flexDirection: "column", width: 200 }}>
          <Separator decorative />
        </div>
      </ThemeProvider>,
    );

    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
    expect(container.querySelector<HTMLElement>(".separator")!.getBoundingClientRect().height).toBe(1);
  });

  it("centers the empty state's parts and keeps the text to a readable measure", () => {
    render(
      <ThemeProvider scope="local">
        <div style={{ width: 900 }}>
          <EmptyState title="Nothing here" description={"A long description that keeps going. ".repeat(6)} />
        </div>
      </ThemeProvider>,
    );
    const root = screen.getByText("Nothing here").closest<HTMLElement>(".empty-state")!;
    const title = screen.getByRole("heading").getBoundingClientRect();
    const description = screen.getByText(/A long description/).getBoundingClientRect();
    const center = root.getBoundingClientRect().left + root.getBoundingClientRect().width / 2;

    expect(Math.abs(title.left + title.width / 2 - center)).toBeLessThan(1);
    expect(description.width).toBeLessThan(root.getBoundingClientRect().width - 100);
  });

  it("keeps the DataTable empty state in the table's look", async () => {
    render(
      <ThemeProvider scope="local">
        <div style={{ width: 800, height: 400 }}>
          <DataTable<{ name: string }>
            data={[]}
            columnDefs={[{ field: "name", headerName: "Name" }]}
            pagination={{ current_page: 1, last_page: 1, per_page: 10, total: 0 }}
            noDataTitle="No data to show"
          />
        </div>
      </ThemeProvider>,
    );
    const title = await screen.findByRole("heading", { level: 3, name: "No data to show" });

    expect(title.closest(".empty-state")).toHaveClass("data-table__no-rows");
    expect(getComputedStyle(title).fontSize).toBe("18px");
    expect(getComputedStyle(title).fontWeight).toBe("700");
    expect(getComputedStyle(title.closest(".empty-state")!).minHeight).toBe("150px");
  });

  it("resets a nested Neus scope inside Material", () => {
    render(
      <ThemeProvider scope="local" designSystem="material">
        <ThemeProvider designSystem="neus">
          <EmptyState title="Inner" />
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(getComputedStyle(screen.getByRole("heading")).fontWeight).toBe("600");
  });
});
