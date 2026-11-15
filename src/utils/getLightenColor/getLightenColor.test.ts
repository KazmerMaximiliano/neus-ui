import { describe, expect, it } from "vitest";
import { getLightenColor } from "./getLightenColor";

describe("getLightenColor", () => {
  it("lightens black by 100% returning black (0 * 2 = 0)", () => {
    expect(getLightenColor("#000000", 100)).toBe("#000000");
  });

  it("lightens a color by 0% returning the same color", () => {
    expect(getLightenColor("#3366cc", 0)).toBe("#3366cc");
  });

  it("clamps RGB values to 255 when lightening would exceed", () => {
    const result = getLightenColor("#ffffff", 50);
    expect(result).toBe("#ffffff");
  });

  it("lightens a mid-range color", () => {
    const result = getLightenColor("#804020", 50);
    expect(result).toBe("#c06030");
  });

  it("returns the original hex for an invalid hex string", () => {
    expect(getLightenColor("invalid", 50)).toBe("invalid");
  });

  it("handles hex without # prefix", () => {
    expect(getLightenColor("804020", 50)).toBe("#c06030");
  });
});
