import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { cdp } from "vitest/browser";
import { Progress } from "../../components/Progress";
import { Stepper } from "../../components/Stepper";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", medium: 8, square: false },
  { id: "apple", medium: 6, square: false },
  { id: "carbon", medium: 8, square: true },
  { id: "material", medium: 4, square: true },
  { id: "neobrutalism", medium: 16, square: false },
  { id: "vercel", medium: 6, square: false },
] as const;

const part = (name: string) => screen.getByRole("progressbar").querySelector<HTMLElement>(`.progress__${name}`)!;

describe.each(["light", "dark"] as const)("Progress designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("draws the $id bar from its recipe with a fill that stands out", (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <div style={{ width: 300 }}>
          <Progress label="Uploading photos" value={40} showValue />
        </div>
      </ThemeProvider>,
    );
    const track = getComputedStyle(part("track"));
    const fill = getComputedStyle(part("fill"));
    const surface = resolveColor(part("track"), "--color-surface");
    const trackColor = flatten(track.backgroundColor, surface);

    expect(parseFloat(track.height)).toBe(system.medium);
    expect(part("fill").getBoundingClientRect().width).toBeCloseTo(part("track").clientWidth * 0.4, 0);
    // The fill's end is its boundary: its own color, or an edge drawn in the track's border color.
    const edges = [fill.backgroundColor, ...(parseFloat(fill.borderRightWidth) > 0 ? [fill.borderRightColor] : [])];
    expect(Math.max(...edges.map((edge) => contrastRatio(edge, trackColor)))).toBeGreaterThanOrEqual(3);
    expect(track.borderTopLeftRadius === "0px").toBe(system.square);
    expect(track.borderTopWidth).toBe(system.id === "neobrutalism" ? "3px" : "0px");
    for (const text of ["label", "value"]) {
      expect(contrastRatio(getComputedStyle(part(text)).color, surface), text).toBeGreaterThanOrEqual(4.5);
    }
    expect(part("value").getBoundingClientRect().right).toBeCloseTo(part("track").getBoundingClientRect().right, 0);
  });

  it.each(SYSTEMS)("slides a $id segment across an indeterminate bar", (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <div style={{ width: 300 }}>
          <Progress aria-label="Syncing" />
        </div>
      </ThemeProvider>,
    );
    const fill = getComputedStyle(part("fill"));

    expect(fill.animationName).toBe("progress-slide");
    expect(fill.position).toBe("absolute");
    expect(part("fill").getBoundingClientRect().width).toBeCloseTo(part("track").clientWidth * 0.4, 0);
  });
});

describe("Progress scopes, sizes and motion", () => {
  it("grows with size and resets a nested Neus scope inside Material", () => {
    render(
      <ThemeProvider scope="local" designSystem="material">
        <Progress aria-label="Outer" value={10} size="large" />
        <ThemeProvider designSystem="neus">
          <Progress aria-label="Inner" value={10} size="large" />
          <Progress aria-label="Small" value={10} size="small" />
        </ThemeProvider>
      </ThemeProvider>,
    );
    const height = (name: string) =>
      getComputedStyle(screen.getByRole("progressbar", { name }).querySelector(".progress__track")!).height;

    expect(height("Outer")).toBe("8px");
    expect(height("Inner")).toBe("12px");
    expect(height("Small")).toBe("4px");
    expect(getComputedStyle(screen.getByRole("progressbar", { name: "Inner" }).querySelector(".progress__track")!)
      .borderTopLeftRadius).not.toBe("0px");
  });

  it("gives Carbon a local 10px large bar above its two official sizes", () => {
    render(
      <ThemeProvider scope="local" designSystem="carbon">
        {(["small", "medium", "large"] as const).map((size) => (
          <Progress key={size} aria-label={size} value={10} size={size} />
        ))}
      </ThemeProvider>,
    );
    const heights = screen.getAllByRole("progressbar").map((bar) => bar.querySelector(".progress__track")!.clientHeight);

    expect(heights).toEqual([4, 8, 10]);
  });

  it("slows the segment and stops the fill transition under reduced motion", async () => {
    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      render(
        <ThemeProvider scope="local">
          <Progress aria-label="Syncing" />
          <Progress aria-label="Upload" value={20} />
        </ThemeProvider>,
      );
      const fill = (name: string) =>
        getComputedStyle(screen.getByRole("progressbar", { name }).querySelector(".progress__fill")!);

      expect(fill("Syncing").animationDuration).toBe("3.2s");
      expect(fill("Upload").transitionDuration).toBe("0s");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });
});

describe("Stepper's linear track", () => {
  it.each(SYSTEMS)("keeps the $id stepper bar, counter and fill on the stepper's tokens", (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id}>
        <div style={{ width: 300 }}>
          <Stepper variant="linear" currentStep={1} totalSteps={4} showLabels />
        </div>
      </ThemeProvider>,
    );
    const bar = screen.getByRole("progressbar", { name: "Progress" });
    const track = bar.querySelector<HTMLElement>(".stepper__bar")!;
    const counter = bar.querySelector<HTMLElement>(".stepper__counter")!;
    const resolveLength = (token: string) => {
      const probe = document.createElement("span");
      probe.style.width = `var(${token})`;
      track.append(probe);
      const width = getComputedStyle(probe).width;
      probe.remove();
      return width;
    };

    expect(bar).toHaveClass("progress", "stepper__track");
    expect(getComputedStyle(track).height).toBe(resolveLength("--stepper-bar-height"));
    expect(getComputedStyle(track).backgroundColor).toBe(resolveColor(track, "--stepper-bar-background"));
    expect(getComputedStyle(bar.querySelector(".stepper__bar-fill")!).backgroundColor)
      .toBe(resolveColor(track, "--stepper-bar-fill"));
    expect(getComputedStyle(counter).color).toBe(resolveColor(track, "--stepper-counter-color"));
    expect(getComputedStyle(counter).fontFamily).toBe(getComputedStyle(bar.closest(".stepper")!).fontFamily);
    expect(getComputedStyle(bar.querySelector(".stepper__bar-fill")!).borderRightWidth).toBe("0px");
    expect(counter.getBoundingClientRect().left).toBe(bar.getBoundingClientRect().left);
  });
});
