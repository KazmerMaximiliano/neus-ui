import { cleanup, render, screen } from "@testing-library/react";
import { RefreshCw } from "lucide-react";
import { afterEach, describe, expect, it } from "vitest";
import { cdp } from "vitest/browser";
import { Button } from "../../components/Button";
import { IconButton } from "../../components/IconButton";
import { Spinner } from "../../components/Spinner";
import { ThemeProvider } from "../../providers";
import { contrastRatio, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import "../../css/app.css";

afterEach(cleanup);

// Strokes are em fractions of the size; Chromium rounds border widths down to whole pixels.
const SYSTEMS = [
  { id: "neus", medium: 24, stroke: 3, track: "visible" },
  { id: "apple", medium: 20, stroke: 2, track: "visible" },
  { id: "carbon", medium: 24, stroke: 2, track: "visible" },
  { id: "material", medium: 40, stroke: 4, track: "transparent" },
  { id: "neobrutalism", medium: 24, stroke: 4, track: "visible" },
  { id: "vercel", medium: 16, stroke: 1, track: "visible" },
] as const;

const ring = () => screen.getByRole("status").querySelector<HTMLElement>(".spinner__ring")!;

describe.each(["light", "dark"] as const)("Spinner designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("draws the $id ring from its recipe with a visible arc", (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <Spinner label="Loading" />
      </ThemeProvider>,
    );
    const styles = getComputedStyle(ring());
    const surface = resolveColor(ring(), "--color-surface");

    expect(parseFloat(styles.width)).toBe(system.medium);
    expect(parseFloat(styles.borderTopWidth)).toBe(system.stroke);
    expect(styles.animationName).toBe("spinner-rotate");
    expect(contrastRatio(styles.borderTopColor, surface)).toBeGreaterThanOrEqual(3);
    if (system.track === "transparent") {
      expect(styles.borderRightColor).toBe("rgba(0, 0, 0, 0)");
    } else {
      expect(styles.borderRightColor).not.toBe(styles.borderTopColor);
    }
  });

  it.each(SYSTEMS)("keeps $id button loaders at their own size", (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <Button label="Save" loading />
        <IconButton icon={RefreshCw} label="Refresh" loading />
      </ThemeProvider>,
    );
    const loader = screen.getByRole("button", { name: "Save" }).querySelector<HTMLElement>(".button-loader")!;
    const loaderSize = parseFloat(getComputedStyle(loader).fontSize);
    const dot = getComputedStyle(loader.children[0]);
    expect(loader.children).toHaveLength(3);
    expect(parseFloat(dot.width)).toBe(loaderSize);
    expect(parseFloat(dot.marginLeft)).toBeCloseTo(loaderSize / 3, 1);
    expect(dot.backgroundColor).toBe(getComputedStyle(loader).color);

    const iconLoader = screen.getByRole("button", { name: "Refresh" })
      .querySelector<HTMLElement>(".icon-button-loader")!;
    const iconSize = parseFloat(getComputedStyle(iconLoader).fontSize);
    expect(parseFloat(getComputedStyle(iconLoader.children[0]).width)).toBeCloseTo(iconSize * 0.3, 1);
  });
});

describe("Spinner scopes and motion", () => {
  it("resets a nested Neus scope inside Material", () => {
    render(
      <ThemeProvider scope="local" designSystem="material">
        <Spinner label="Outer" size="large" />
        <ThemeProvider designSystem="neus">
          <Spinner label="Inner" size="large" />
        </ThemeProvider>
      </ThemeProvider>,
    );
    const [outer, inner] = screen.getAllByRole("status").map((status) => status.querySelector(".spinner__ring")!);

    expect(getComputedStyle(outer).width).toBe("48px");
    expect(getComputedStyle(inner).width).toBe("40px");
    expect(getComputedStyle(inner).borderRightColor).not.toBe("rgba(0, 0, 0, 0)");
  });

  it("slows down instead of stopping under reduced motion", async () => {
    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      render(
        <ThemeProvider scope="local">
          <Spinner label="Loading" />
          <Spinner variant="dots" />
        </ThemeProvider>,
      );
      expect(getComputedStyle(ring()).animationDuration).toBe("1.6s");
      expect(getComputedStyle(document.querySelector(".spinner__dot")!).animationDuration).toBe("2.8s");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });
});
