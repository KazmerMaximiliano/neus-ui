import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { cdp, page } from "vitest/browser";
import { Toast } from "../../components/Toast";
import { ThemeProvider, ToastProvider, useToast } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import type { ToastApi, ToastPlacement } from "../../providers";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", width: 360, radius: "16px" },
  { id: "apple", width: 360, radius: "12px" },
  { id: "carbon", width: 288, radius: "0px" },
  { id: "material", width: 360, radius: "4px" },
  { id: "neobrutalism", width: 360, radius: "4px" },
  { id: "vercel", width: 384, radius: "18px" },
] as const;

const box = (title: string) => screen.getByText(title).closest<HTMLElement>(".toast")!;

const mount = (placement: ToastPlacement) => {
  const api: { current?: ToastApi } = {};
  const Probe = () => {
    api.current = useToast();
    return null;
  };
  render(
    <ThemeProvider scope="local">
      <ToastProvider placement={placement} duration={null}>
        <Probe />
      </ToastProvider>
    </ThemeProvider>,
  );
  return api as { current: ToastApi };
};

describe.each(["light", "dark"] as const)("Toast designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("lifts the $id toast over the page with its own corners and width", (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <div style={{ width: 600 }}>
          <Toast status="success" title="Changes saved" onDismiss={() => undefined} dismissLabel="Dismiss">
            Your profile is up to date and visible to your team.
          </Toast>
        </div>
      </ThemeProvider>,
    );
    const toast = getComputedStyle(box("Changes saved"));

    expect(toast.boxShadow).not.toBe("none");
    expect(toast.borderTopLeftRadius).toBe(system.radius);
    expect(box("Changes saved").getBoundingClientRect().width).toBe(system.width);
    expect(toast.animationName).toBe("toast-enter");
    expect(contrastRatio(toast.color, toast.backgroundColor)).toBeGreaterThanOrEqual(4.5);
    expect(resolveColor(box("Changes saved"), "--toast-shadow")).toBeDefined();
  });
});

describe.each(["light", "dark"] as const)("Material toast in %s mode", (scheme) => {
  it("floats at level 2 with statuses that read apart", () => {
    render(
      <ThemeProvider scope="local" designSystem="material" colorScheme={scheme}>
        {(["success", "warning", "error"] as const).map((status) => (
          <Toast key={status} status={status} title={status} />
        ))}
      </ThemeProvider>,
    );
    const rgb = (title: string) =>
      flatten(getComputedStyle(box(title)).backgroundColor, "rgb(0, 0, 0)").match(/\d+/g)!.map(Number);
    const [r, g, b] = rgb("success");
    const style = getComputedStyle(box("success"));

    expect(style.getPropertyValue("--toast-shadow")).toBe(style.getPropertyValue("--elevation-floating"));
    // Green, not the gray the tinted surface made of it.
    expect(g - Math.max(r, b)).toBeGreaterThanOrEqual(6);
    expect(Math.hypot(...rgb("warning").map((channel, i) => channel - rgb("error")[i]))).toBeGreaterThanOrEqual(20);
  });
});

describe("Toast region", () => {
  it.each([
    ["bottom-end", "right", "bottom"],
    ["top-start", "left", "top"],
  ] as const)("stacks %s toasts with the newest nearest the edge", async (placement, side, edge) => {
    await page.viewport(1000, 700);
    const api = mount(placement);

    act(() => {
      api.current.show({ title: "First" });
      api.current.show({ title: "Second" });
    });
    await Promise.all(document.getAnimations().map((animation) => animation.finished));
    const first = box("First").getBoundingClientRect();
    const second = box("Second").getBoundingClientRect();
    const offset = 24;

    if (side === "right") expect(second.right).toBe(1000 - offset);
    else expect(second.left).toBe(offset);
    if (edge === "bottom") {
      expect(second.bottom).toBe(700 - offset);
      expect(first.bottom).toBe(second.top - 12);
    } else {
      expect(second.top).toBe(offset);
      expect(first.top).toBe(second.bottom + 12);
    }
  });

  it("centers top-center toasts and narrows them on small screens", async () => {
    await page.viewport(320, 600);
    const api = mount("top-center");

    act(() => {
      api.current.show({ title: "Saved" });
    });
    await Promise.all(document.getAnimations().map((animation) => animation.finished));
    const rect = box("Saved").getBoundingClientRect();

    expect(rect.width).toBe(320 - 48);
    expect(rect.left).toBe(24);
  });

  it("lets clicks through the empty parts of the region", async () => {
    await page.viewport(1000, 700);
    mount("bottom-end");

    expect(getComputedStyle(document.querySelector(".toast-region")!).pointerEvents).toBe("none");
  });

  it("appears without motion under reduced motion", async () => {
    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      render(
        <ThemeProvider scope="local">
          <Toast title="Saved" />
        </ThemeProvider>,
      );

      expect(getComputedStyle(box("Saved")).animationName).toBe("none");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });
});
