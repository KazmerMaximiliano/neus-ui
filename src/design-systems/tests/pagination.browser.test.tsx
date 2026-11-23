import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { cdp, userEvent as pointer } from "vitest/browser";
import { Pagination } from "../../components/Pagination";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import type { DesignSystemId } from "../../design-systems";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", size: 40 },
  { id: "apple", size: 32 },
  { id: "carbon", size: 32 },
  { id: "material", size: 32 },
  { id: "neobrutalism", size: 40 },
  { id: "vercel", size: 32 },
] as const;

const pages = (system: DesignSystemId, scheme: "light" | "dark" = "light") => (
  <ThemeProvider scope="local" designSystem={system} colorScheme={scheme}>
    <Pagination page={5} totalPages={20} pageSize={25} pageSizeOptions={[10, 25, 50]} />
  </ThemeProvider>
);

describe.each(["light", "dark"] as const)("Pagination designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("lines the $id pages up with the arrows and marks the current one", (system) => {
    render(pages(system.id, scheme));
    const current = screen.getByRole("button", { name: "Page 5" });
    const other = screen.getByRole("button", { name: "Page 4" });
    const previous = screen.getByRole("button", { name: "Previous page" });
    const surface = resolveColor(current, "--color-surface");
    const currentStyles = getComputedStyle(current);
    const currentFill = flatten(currentStyles.backgroundColor, surface);
    const otherFill = flatten(getComputedStyle(other).backgroundColor, surface);

    expect(current.getBoundingClientRect().height).toBe(system.size);
    expect(current.getBoundingClientRect().width).toBeGreaterThanOrEqual(system.size);
    expect(previous.getBoundingClientRect().height).toBe(system.size);
    expect(current.getBoundingClientRect().top).toBe(previous.getBoundingClientRect().top);
    expect(contrastRatio(currentStyles.color, currentFill)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(getComputedStyle(other).color, otherFill)).toBeGreaterThanOrEqual(4.5);
    // The current page stands out by a fill, a 3:1 border (Vercel's outline), Carbon's bar under the
    // number or Neobrutalism's ink shadow.
    expect(
      contrastRatio(currentFill, surface) >= 3 ||
        (parseFloat(currentStyles.borderTopWidth) > 0 && contrastRatio(currentStyles.borderTopColor, surface) >= 3) ||
        currentStyles.backgroundImage !== "none" ||
        currentStyles.boxShadow !== "none",
    ).toBe(true);
  });
});

describe("Pagination states and layout", () => {
  it("fills a page on hover and outlines it on keyboard focus", async () => {
    const user = userEvent.setup();
    render(pages("neus"));
    const page = screen.getByRole("button", { name: "Page 4" });
    const rest = getComputedStyle(page).backgroundColor;

    await pointer.hover(page);
    await waitFor(() => expect(getComputedStyle(page).backgroundColor).not.toBe(rest));
    page.blur();
    await user.tab();
    while (document.activeElement !== page) await user.tab();

    expect(getComputedStyle(page).outlineStyle).toBe("solid");
    expect(getComputedStyle(page).outlineWidth).toBe("2px");
  });

  it("keeps the page-size label beside its select on the row", () => {
    render(pages("neus"));
    const select = screen.getByRole("combobox", { name: "Items per page" });
    const label = screen.getByText("Items per page");
    const field = select.getBoundingClientRect();
    const text = label.getBoundingClientRect();

    expect(text.right).toBeLessThanOrEqual(field.left);
    expect(text.top + text.height / 2).toBeCloseTo(field.top + field.height / 2, -1);
  });

  it("draws Carbon's 4px bar under the current number", () => {
    render(pages("carbon"));
    const styles = getComputedStyle(screen.getByRole("button", { name: "Page 5" }));

    expect(styles.backgroundImage).toBe("linear-gradient(rgb(15, 98, 254), rgb(15, 98, 254))");
    expect(styles.backgroundPosition).toBe("50% 100%");
    expect(styles.fontWeight).toBe("600");
    expect(styles.borderTopLeftRadius).toBe("0px");
  });

  it("resets a nested Neus scope inside Neobrutalism", () => {
    render(
      <ThemeProvider scope="local" designSystem="neobrutalism">
        <ThemeProvider designSystem="neus">
          <Pagination page={2} totalPages={4} />
        </ThemeProvider>
      </ThemeProvider>,
    );
    const page = getComputedStyle(screen.getByRole("button", { name: "Page 1" }));

    expect(page.borderTopWidth).toBe("0px");
    expect(page.fontWeight).toBe("500");
  });

  it("drops transitions under reduced motion", async () => {
    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      render(pages("neus"));

      expect(getComputedStyle(screen.getByRole("button", { name: "Page 4" })).transitionDuration).toBe("0s");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });
});
