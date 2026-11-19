import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { userEvent as pointer } from "vitest/browser";
import { Breadcrumbs } from "../../components/Breadcrumbs";
import { Link } from "../../components/Link";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import type { DesignSystemId } from "../../design-systems";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", separator: "/", fontSize: "13px" },
  { id: "apple", separator: "›", fontSize: "12px" },
  { id: "carbon", separator: "/", fontSize: "14px" },
  { id: "material", separator: "/", fontSize: "14px" },
  { id: "neobrutalism", separator: "›", fontSize: "14px" },
  { id: "vercel", separator: "›", fontSize: "14px" },
] as const;

const ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Settings" },
];

const trail = (system: DesignSystemId, scheme: "light" | "dark" = "light", width = 480) => (
  <ThemeProvider scope="local" designSystem={system} colorScheme={scheme}>
    <div style={{ width }}>
      <Breadcrumbs items={ITEMS} />
    </div>
  </ThemeProvider>
);

describe.each(["light", "dark"] as const)("Breadcrumbs designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("separates the $id items and keeps the links and the current page legible", (system) => {
    render(trail(system.id, scheme));
    const link = screen.getByRole("link", { name: "Projects" });
    const current = screen.getByText("Settings");
    const item = current.parentElement!;
    const surface = resolveColor(item, "--color-surface");
    const separator = getComputedStyle(item, "::before");

    expect(getComputedStyle(screen.getByRole("navigation")).fontSize).toBe(system.fontSize);
    // Drawn with empty alternative text, so screen readers skip it.
    expect(separator.content).toBe(`"${system.separator}" / ""`);
    expect(parseFloat(separator.marginInlineStart)).toBeGreaterThan(0);
    expect(contrastRatio(flatten(separator.color, surface), surface)).toBeGreaterThanOrEqual(3);
    expect(contrastRatio(flatten(getComputedStyle(link).color, surface), surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(flatten(getComputedStyle(current).color, surface), surface)).toBeGreaterThanOrEqual(4.5);
    expect(getComputedStyle(screen.getByRole("link", { name: "Home" }).parentElement!, "::before").content).toBe("none");
  });
});

describe("Breadcrumbs links", () => {
  it("follows the system's links: Carbon's link blue, Neus's secondary ink", () => {
    render(
      <>
        {trail("carbon")}
        <ThemeProvider scope="local" designSystem="carbon">
          <Link href="#" label="Carbon link" />
        </ThemeProvider>
      </>,
    );

    expect(getComputedStyle(screen.getByRole("link", { name: "Projects" })).color)
      .toBe(getComputedStyle(screen.getByRole("link", { name: "Carbon link" })).color);

    cleanup();
    render(trail("neus"));
    const link = screen.getByRole("link", { name: "Projects" });
    expect(getComputedStyle(link).color).toBe(resolveColor(link, "--color-text-secondary"));
  });

  it("underlines a link on hover and outlines it on keyboard focus", async () => {
    const user = userEvent.setup();
    render(trail("neus"));
    const link = screen.getByRole("link", { name: "Home" });

    await pointer.hover(link);
    await waitFor(() => expect(getComputedStyle(link).textDecorationLine).toBe("underline"));
    await user.tab();

    expect(link).toHaveFocus();
    expect(getComputedStyle(link).outlineStyle).toBe("solid");
    expect(getComputedStyle(link).outlineWidth).toBe("2px");
  });
});

describe("Breadcrumbs layout and scopes", () => {
  it("wraps a long trail onto more lines with the separator before each item", () => {
    render(
      <ThemeProvider scope="local">
        <div style={{ width: 160 }}>
          <Breadcrumbs items={[{ label: "Home", href: "#" }, { label: "Projects", href: "#" }, { label: "Neus UI", href: "#" }, { label: "Settings" }]} />
        </div>
      </ThemeProvider>,
    );
    const items = screen.getAllByRole("listitem");

    expect(items.at(-1)!.getBoundingClientRect().top).toBeGreaterThan(items[0].getBoundingClientRect().top);
    expect(screen.getByRole("navigation").getBoundingClientRect().width).toBeLessThanOrEqual(160);
  });

  it("gives the expand button a target of at least 24px", () => {
    render(
      <ThemeProvider scope="local">
        <Breadcrumbs maxItems={2} items={ITEMS} />
      </ThemeProvider>,
    );
    const box = screen.getByRole("button", { name: "Show all breadcrumbs" }).getBoundingClientRect();

    expect(box.width).toBeGreaterThanOrEqual(24);
    expect(box.height).toBeGreaterThanOrEqual(24);
  });

  it("resets a nested Neus scope inside Apple", () => {
    render(
      <ThemeProvider scope="local" designSystem="apple">
        <ThemeProvider designSystem="neus">
          <Breadcrumbs items={ITEMS} />
        </ThemeProvider>
      </ThemeProvider>,
    );
    const item = screen.getByText("Settings").parentElement!;

    expect(getComputedStyle(item, "::before").content).toBe('"/" / ""');
    expect(getComputedStyle(screen.getByRole("navigation")).fontSize).toBe("13px");
    expect(getComputedStyle(screen.getByText("Settings")).fontWeight).toBe("600");
  });
});
