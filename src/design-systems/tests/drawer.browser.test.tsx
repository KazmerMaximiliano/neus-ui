import { useState } from "react";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { cdp, page, userEvent } from "vitest/browser";
import { Button } from "../../components/Button";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader } from "../../components/Drawer";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import type { DrawerSide } from "../../components/Drawer";
import type { DesignSystemId } from "../design-systems.types";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS: readonly { id: DesignSystemId; width: number; radius: string }[] = [
  { id: "neus", width: 400, radius: "16px" },
  { id: "apple", width: 400, radius: "16px" },
  { id: "carbon", width: 480, radius: "0px" },
  { id: "material", width: 256, radius: "16px" },
  { id: "neobrutalism", width: 384, radius: "0px" },
  { id: "vercel", width: 384, radius: "0px" },
];

const Example = ({ system = "neus", scheme = "light", side = "end" }: {
  system?: DesignSystemId;
  scheme?: "light" | "dark";
  side?: DrawerSide;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider scope="local" designSystem={system} colorScheme={scheme}>
      <Button label="Open" onClick={() => setOpen(true)} />
      <Drawer side={side} isOpen={open} onClose={() => setOpen(false)}>
        <DrawerHeader>Filters</DrawerHeader>
        <DrawerContent>
          <p>Pick the categories to show.</p>
          <div style={{ height: 2000 }} />
        </DrawerContent>
        <DrawerFooter>
          <Button label="Show results" onClick={() => setOpen(false)} />
        </DrawerFooter>
      </Drawer>
    </ThemeProvider>
  );
};

const open = async () => {
  await userEvent.click(screen.getByRole("button", { name: "Open" }));
  const drawer = screen.getByRole("dialog", { name: "Filters" });
  await Promise.all(drawer.getAnimations({ subtree: true }).map((animation) => animation.finished));
  return drawer;
};

describe.each(["light", "dark"] as const)("Drawer designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("slides the $id drawer in at the end with readable parts", async (system) => {
    await page.viewport(1200, 800);
    render(<Example system={system.id} scheme={scheme} />);
    const drawer = await open();
    const box = drawer.getBoundingClientRect();
    const styles = getComputedStyle(drawer);
    const surface = flatten(styles.backgroundColor, resolveColor(drawer, "--color-surface"));

    expect(drawer.matches(":modal")).toBe(true);
    expect(drawer.closest(`[data-design-system="${system.id}"]`)).not.toBeNull();
    expect(Math.round(box.right)).toBe(1200);
    expect(Math.round(box.width)).toBe(system.width);
    expect(Math.round(box.height)).toBe(800);
    expect(styles.borderTopLeftRadius).toBe(system.radius);
    expect(styles.borderTopRightRadius).toBe("0px");
    expect(getComputedStyle(drawer, "::backdrop").backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
    for (const text of ["Filters", "Pick the categories to show."]) {
      expect(contrastRatio(getComputedStyle(screen.getByText(text)).color, surface)).toBeGreaterThanOrEqual(4.5);
    }
  });
});

describe("Drawer layout, behavior and motion", () => {
  it("keeps the header and footer in view while the content scrolls", async () => {
    await page.viewport(1200, 800);
    render(<Example />);
    const drawer = await open();
    const content = drawer.querySelector<HTMLElement>(".drawer-content")!;
    const footer = drawer.querySelector<HTMLElement>(".drawer-footer")!;

    expect(content.scrollHeight).toBeGreaterThan(content.clientHeight);
    expect(Math.round(footer.getBoundingClientRect().bottom)).toBe(Math.round(drawer.getBoundingClientRect().bottom));
    expect(getComputedStyle(document.documentElement).overflow).toBe("hidden");
  });

  it.each([
    ["start", (box: DOMRect) => [Math.round(box.left), Math.round(box.height)], [0, 800]],
    ["bottom", (box: DOMRect) => [Math.round(box.bottom), Math.round(box.width)], [800, 1200]],
    ["top", (box: DOMRect) => [Math.round(box.top), Math.round(box.width)], [0, 1200]],
  ] as const)("places a %s drawer against its edge", async (side, measure, expected) => {
    await page.viewport(1200, 800);
    render(<Example side={side} />);
    const drawer = await open();

    expect(measure(drawer.getBoundingClientRect())).toEqual(expected);
  });

  it("caps a sheet's height and keeps the viewport margin beside a side drawer on a phone", async () => {
    await page.viewport(360, 640);
    render(<Example />);
    const drawer = await open();

    expect(Math.round(drawer.getBoundingClientRect().width)).toBe(360 - 16);
    cleanup();
    render(<Example side="bottom" />);
    const sheet = await open();
    expect(sheet.getBoundingClientRect().height).toBeLessThanOrEqual(640 * 0.85 + 1);
  });

  it("starts at the right edge in right-to-left text for start", async () => {
    await page.viewport(1200, 800);
    render(<div dir="rtl"><Example side="start" /></div>);
    const drawer = await open();

    expect(Math.round(drawer.getBoundingClientRect().right)).toBe(1200);
  });

  it("closes on a backdrop press and on Escape, giving focus back", async () => {
    await page.viewport(1200, 800);
    render(<Example />);
    const opener = screen.getByRole("button", { name: "Open" });
    const drawer = await open();

    await userEvent.click(drawer, { position: { x: -200, y: 300 }, force: true });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(opener).toHaveFocus();
    await open();
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(opener).toHaveFocus();
  });

  it("wraps Tab inside the drawer", async () => {
    await page.viewport(1200, 800);
    render(<Example />);
    await open();
    const results = screen.getByRole("button", { name: "Show results" });

    results.focus();
    await userEvent.tab();
    expect(screen.getByRole("dialog").contains(document.activeElement)).toBe(true);
    await userEvent.tab({ shift: true });
    expect(results).toHaveFocus();
  });

  it("slides in, and drops the motion under reduced motion", async () => {
    await page.viewport(1200, 800);
    render(<Example />);
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const drawer = screen.getByRole("dialog");
    expect(getComputedStyle(drawer).transitionDuration).toContain("0.3s");
    cleanup();

    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
      render(<Example />);
      await userEvent.click(screen.getByRole("button", { name: "Open" }));
      expect(getComputedStyle(screen.getByRole("dialog")).transitionDuration).toBe("0s");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });

  it("rounds Material's bottom sheet more than its side sheet, and lets Carbon's actions fill the row", async () => {
    await page.viewport(1200, 800);
    render(
      <ThemeProvider scope="local" designSystem="material">
        <Drawer isOpen side="bottom" aria-label="Sheet"><DrawerContent>Body</DrawerContent></Drawer>
      </ThemeProvider>,
    );
    const sheet = screen.getByRole("dialog");
    expect(getComputedStyle(sheet).borderTopLeftRadius).toBe("28px");
    expect(Math.round(sheet.getBoundingClientRect().width)).toBe(640);
    cleanup();

    render(<Example system="carbon" />);
    const drawer = await open();
    const footer = drawer.querySelector<HTMLElement>(".drawer-footer")!;
    expect(Math.round(screen.getByRole("button", { name: "Show results" }).getBoundingClientRect().width))
      .toBe(Math.round(footer.clientWidth - parseFloat(getComputedStyle(footer).paddingLeft) - parseFloat(getComputedStyle(footer).paddingRight)));
  });

  it("drops the outline of an outlined action in Carbon's full-bleed footer, and keeps it elsewhere", async () => {
    await page.viewport(1200, 800);
    const footer = (id: DesignSystemId) => (
      <ThemeProvider scope="local" designSystem={id}>
        <Drawer isOpen aria-label={id}>
          <DrawerContent>Body</DrawerContent>
          <DrawerFooter>
            <Button label={`Clear ${id}`} variant="outlined" />
          </DrawerFooter>
        </Drawer>
      </ThemeProvider>
    );
    render(footer("carbon"));
    const content = screen.getByText("Body");
    expect(getComputedStyle(content).paddingTop).toBe("16px");
    expect(getComputedStyle(screen.getByRole("button", { name: "Clear carbon" })).borderTopWidth).toBe("0px");
    cleanup();

    render(footer("neus"));
    expect(getComputedStyle(screen.getByRole("button", { name: "Clear neus" })).borderTopWidth).toBe("1px");
  });

  it("resets a nested Neus scope inside Carbon", async () => {
    await page.viewport(1200, 800);
    render(
      <ThemeProvider scope="local" designSystem="carbon">
        <ThemeProvider designSystem="neus">
          <Drawer isOpen aria-label="Inner"><DrawerContent>Body</DrawerContent></Drawer>
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(getComputedStyle(screen.getByRole("dialog")).borderTopLeftRadius).toBe("16px");
  });
});
