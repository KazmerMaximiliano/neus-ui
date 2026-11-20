import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { cdp, userEvent as pointer } from "vitest/browser";
import { Tabs } from "../../components/Tabs";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import type { TabsVariant } from "../../components/Tabs";
import type { DesignSystemId } from "../../design-systems";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", height: 44, contained: 36, indicator: 3 },
  { id: "apple", height: 44, contained: 32, indicator: 2 },
  { id: "carbon", height: 40, contained: 48, indicator: 2 },
  { id: "material", height: 48, contained: 40, indicator: 3 },
  { id: "neobrutalism", height: 44, contained: 40, indicator: 4 },
  { id: "vercel", height: 32, contained: 26, indicator: 2 },
] as const;

const ITEMS = [
  { value: "general", label: "General", content: "General settings" },
  { value: "members", label: "Members", content: "Member list" },
  { value: "billing", label: "Billing", content: "Invoices" },
];

const tabs = (system: DesignSystemId, scheme: "light" | "dark", variant: TabsVariant = "line") => (
  <ThemeProvider scope="local" designSystem={system} colorScheme={scheme}>
    <div style={{ width: 480 }}>
      <Tabs label="Settings" items={ITEMS} variant={variant} />
    </div>
  </ThemeProvider>
);

const surfaceOf = (element: HTMLElement) => resolveColor(element, "--color-surface");

describe.each(["light", "dark"] as const)("Tabs designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("draws the $id line tabs over a divider with a legible selected indicator", (system) => {
    render(tabs(system.id, scheme));
    const selected = screen.getByRole("tab", { name: "General" });
    const other = screen.getByRole("tab", { name: "Members" });
    const list = screen.getByRole("tablist");
    const surface = surfaceOf(list);
    const indicator = getComputedStyle(selected, "::after");

    expect(selected.getBoundingClientRect().height).toBe(system.height);
    expect(parseFloat(indicator.height)).toBe(system.indicator);
    expect(contrastRatio(flatten(indicator.backgroundColor, surface), surface)).toBeGreaterThanOrEqual(3);
    expect(getComputedStyle(other, "::after").backgroundColor).toBe("rgba(0, 0, 0, 0)");
    expect(getComputedStyle(list).boxShadow).toMatch(/inset/);
    expect(contrastRatio(getComputedStyle(selected).color, surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(getComputedStyle(other).color, surface)).toBeGreaterThanOrEqual(4.5);
    // The indicator sits on the list's bottom edge, over the divider.
    expect(selected.getBoundingClientRect().bottom).toBe(list.getBoundingClientRect().bottom);
  });

  it.each(SYSTEMS)("sets the $id contained selected tab apart inside its container", (system) => {
    render(tabs(system.id, scheme, "contained"));
    const selected = screen.getByRole("tab", { name: "General" });
    const other = screen.getByRole("tab", { name: "Members" });
    const list = screen.getByRole("tablist");
    const surface = surfaceOf(list);
    const container = flatten(getComputedStyle(list).backgroundColor, surface);
    const selectedFill = flatten(getComputedStyle(selected).backgroundColor, container);
    const otherFill = flatten(getComputedStyle(other).backgroundColor, container);

    expect(selected.getBoundingClientRect().height).toBe(system.contained);
    expect(list.getBoundingClientRect().width).toBeLessThan(480);
    expect(contrastRatio(getComputedStyle(selected).color, selectedFill)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(getComputedStyle(other).color, otherFill)).toBeGreaterThanOrEqual(4.5);
    expect([selectedFill, getComputedStyle(selected).boxShadow]).not.toEqual([otherFill, getComputedStyle(other).boxShadow]);
  });
});

describe("Tabs per system", () => {
  it("follows Carbon: a gray underline on hover, a top line on the selected contained tab", async () => {
    const { rerender } = render(tabs("carbon", "light"));
    const other = screen.getByRole("tab", { name: "Members" });

    // A real pointer, so CSS :hover applies.
    await pointer.hover(other);
    await waitFor(() => expect(getComputedStyle(other, "::after").backgroundColor).toBe("rgb(141, 141, 141)"));
    expect(getComputedStyle(screen.getByRole("tab", { name: "General" })).fontWeight).toBe("600");

    rerender(tabs("carbon", "light", "contained"));
    expect(getComputedStyle(screen.getByRole("tab", { name: "General" })).boxShadow).toBe("rgb(15, 98, 254) 0px 2px 0px 0px inset");
  });

  it("follows Material: the indicator spans the label, the contained tabs are a segmented button", () => {
    render(tabs("material", "light"));
    const selected = screen.getByRole("tab", { name: "General" });

    expect(parseFloat(getComputedStyle(selected, "::after").width)).toBeCloseTo(selected.getBoundingClientRect().width - 32, 1);

    cleanup();
    render(tabs("material", "light", "contained"));
    const list = screen.getByRole("tablist");
    expect(getComputedStyle(list).borderTopWidth).toBe("1px");
    expect(getComputedStyle(list).borderTopLeftRadius).not.toBe("0px");
    expect(getComputedStyle(screen.getByRole("tab", { name: "General" })).backgroundColor)
      .toBe(resolveColor(list, "--color-secondary-container"));
  });
});

describe("Tabs focus, overflow and scopes", () => {
  it("draws the keyboard focus inside the tab, where the scrolling list cannot clip it", async () => {
    const user = userEvent.setup();
    render(tabs("neus", "light"));

    await user.tab();
    const styles = getComputedStyle(screen.getByRole("tab", { name: "General" }));

    expect(styles.outlineStyle).toBe("solid");
    expect(styles.outlineWidth).toBe("2px");
    expect(styles.outlineOffset).toBe("-2px");
  });

  it("scrolls tabs that do not fit and brings the focused one into view", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local">
        <div style={{ width: 200 }}>
          <Tabs label="Report" items={["Summary", "Revenue", "Customers", "Retention", "Exports"].map((label) => ({ value: label, label, content: label }))} />
        </div>
      </ThemeProvider>,
    );
    const list = screen.getByRole("tablist");

    expect(list.scrollWidth).toBeGreaterThan(list.clientWidth);
    await user.tab();
    await user.keyboard("{End}");

    expect(list.scrollLeft).toBeGreaterThan(0);
    const last = screen.getByRole("tab", { name: "Exports" }).getBoundingClientRect();
    expect(last.right).toBeLessThanOrEqual(list.getBoundingClientRect().right + 1);
  });

  it("resets a nested Neus scope inside Carbon", () => {
    render(
      <ThemeProvider scope="local" designSystem="carbon">
        <ThemeProvider designSystem="neus">
          <Tabs label="Settings" items={ITEMS} />
        </ThemeProvider>
      </ThemeProvider>,
    );
    const selected = screen.getByRole("tab", { name: "General" });

    expect(selected.getBoundingClientRect().height).toBe(44);
    expect(getComputedStyle(selected, "::after").height).toBe("3px");
    expect(getComputedStyle(selected, "::after").borderTopLeftRadius).toBe("3px");
  });

  it("drops transitions under reduced motion", async () => {
    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      render(tabs("neus", "light"));
      const tab = screen.getByRole("tab", { name: "General" });

      expect(getComputedStyle(tab).transitionDuration).toBe("0s");
      expect(getComputedStyle(tab, "::after").transitionDuration).toBe("0s");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });
});
