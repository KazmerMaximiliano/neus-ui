import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { cdp } from "vitest/browser";
import { Skeleton } from "../../components/Skeleton";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", animation: "skeleton-pulse", square: false },
  { id: "apple", animation: "skeleton-pulse", square: false },
  { id: "carbon", animation: "skeleton-shimmer", square: true },
  { id: "material", animation: "skeleton-pulse", square: false },
  { id: "neobrutalism", animation: "skeleton-pulse", square: true },
  { id: "vercel", animation: "skeleton-pulse", square: false },
] as const;

describe.each(["light", "dark"] as const)("Skeleton designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("draws visible $id placeholders from its recipe", (system) => {
    const { container } = render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <div style={{ width: 300 }}>
          <Skeleton lines={3} />
          <Skeleton variant="rect" />
          <Skeleton variant="circle" />
        </div>
      </ThemeProvider>,
    );
    const [first, , last] = container.querySelectorAll<HTMLElement>(".skeleton__line");
    const rect = container.querySelector<HTMLElement>(".skeleton--rect")!;
    const circle = container.querySelector<HTMLElement>(".skeleton--circle")!;
    const line = getComputedStyle(first);
    const surface = resolveColor(first, "--color-surface");

    expect(contrastRatio(flatten(line.backgroundColor, surface), surface)).toBeGreaterThanOrEqual(1.1);
    expect(line.animationName).toBe(system.animation);
    expect(line.borderTopLeftRadius === "0px").toBe(system.square);
    expect(first.getBoundingClientRect().width).toBe(300);
    expect(last.getBoundingClientRect().width).toBeCloseTo(180, 0);
    expect(rect.getBoundingClientRect().height).toBe(120);
    expect(circle.getBoundingClientRect().width).toBe(40);
    expect(circle.getBoundingClientRect().height).toBe(40);
    expect(getComputedStyle(circle).borderTopLeftRadius).toBe("50%");
  });
});

describe("Skeleton sizes, scopes and motion", () => {
  it("keeps a circle round beside text in a flex row", () => {
    const { container } = render(
      <ThemeProvider scope="local">
        <div style={{ display: "flex", gap: 12, width: 300 }}>
          <Skeleton variant="circle" />
          <Skeleton lines={4} />
        </div>
      </ThemeProvider>,
    );
    const circle = container.querySelector(".skeleton--circle")!.getBoundingClientRect();

    expect(circle).toMatchObject({ width: 40, height: 40 });
    expect(container.querySelector(".skeleton--text")!.getBoundingClientRect().width).toBe(248);
  });

  it("takes sizes from its props and gives a circle its width as height", () => {
    const { container } = render(
      <ThemeProvider scope="local">
        <Skeleton variant="rect" width={200} height="3rem" />
        <Skeleton variant="circle" width={64} />
        <Skeleton width="50%" />
      </ThemeProvider>,
    );
    const [rect, circle, text] = container.querySelectorAll<HTMLElement>(".skeleton");

    expect(rect.getBoundingClientRect()).toMatchObject({ width: 200, height: 48 });
    expect(circle.getBoundingClientRect()).toMatchObject({ width: 64, height: 64 });
    expect(text.getBoundingClientRect().width).toBeCloseTo(container.getBoundingClientRect().width / 2, 0);
  });

  it("resets a nested Neus scope inside Carbon", () => {
    const { container } = render(
      <ThemeProvider scope="local" designSystem="carbon">
        <Skeleton />
        <ThemeProvider designSystem="neus">
          <Skeleton />
        </ThemeProvider>
      </ThemeProvider>,
    );
    const [outer, inner] = [...container.querySelectorAll(".skeleton__line")].map((line) => getComputedStyle(line));

    expect(outer.animationName).toBe("skeleton-shimmer");
    expect(inner.animationName).toBe("skeleton-pulse");
    expect(inner.borderTopLeftRadius).toBe("4px");
  });

  it("stops under reduced motion", async () => {
    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      const { container } = render(
        <ThemeProvider scope="local" designSystem="carbon">
          <Skeleton />
          <Skeleton variant="rect" />
        </ThemeProvider>,
      );

      for (const shape of container.querySelectorAll(".skeleton__line, .skeleton--rect")) {
        expect(getComputedStyle(shape).animationName).toBe("none");
      }
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });
});
