import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Badge } from "../components/Badge";
import "../css/app.css";
import { ThemeProvider } from "../providers";
import {
  contrastRatio,
  flatten,
  resolveColor,
} from "./design-systems.test-utils";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", transform: "uppercase", border: "0px" },
  { id: "apple", transform: "none", border: "0px" },
  { id: "carbon", transform: "none", border: "0px" },
  { id: "material", transform: "none", border: "0px" },
  { id: "neobrutalism", transform: "uppercase", border: "2px" },
  { id: "vercel", transform: "none", border: "0px" },
] as const;
const COLORS = ["primary", "success", "error", "info", "neutral"] as const;

describe.each(["light", "dark"] as const)("Badge designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("renders $id badges with legible text for every color", (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        {COLORS.map((color) => (
          <Badge key={color} label={color} color={color} />
        ))}
        <Badge label="Dot" variant="dot" color="success" />
      </ThemeProvider>,
    );
    const surface = resolveColor(
      screen.getByText("primary").parentElement!,
      "--color-surface",
    );
    for (const color of COLORS) {
      const styles = getComputedStyle(screen.getByText(color));
      expect(styles.textTransform).toBe(system.transform);
      expect(styles.borderTopWidth).toBe(system.border);
      expect(
        contrastRatio(styles.color, flatten(styles.backgroundColor, surface)),
      ).toBeGreaterThanOrEqual(4.5);
    }
    const dot = getComputedStyle(screen.getByText("Dot"));
    expect(contrastRatio(dot.color, surface)).toBeGreaterThanOrEqual(4.5);
  });
});

describe("Badge theme boundaries", () => {
  it("resets a nested Neus scope", () => {
    render(
      <ThemeProvider scope="local" designSystem="vercel" colorScheme="dark">
        <Badge label="Outer" />
        <ThemeProvider designSystem="neus" colorScheme="light">
          <Badge label="Inner" />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(getComputedStyle(screen.getByText("Outer")).textTransform).toBe("none");
    expect(getComputedStyle(screen.getByText("Inner")).textTransform).toBe("uppercase");
    expect(getComputedStyle(screen.getByText("Inner")).fontWeight).toBe("700");
  });
});
