import { describe, expect, it } from "vitest";
import { getDarkenColor } from "./getDarkenColor";

describe("getDarkenColor", () => {
  it("darkens white by 50% to gray", () => {
    expect(getDarkenColor("#ffffff", 50)).toBe("#808080");
  });

  it("darkens a color by 0% returning the same color", () => {
    expect(getDarkenColor("#ff0000", 0)).toBe("#ff0000");
  });

  it("darkens a color by 100% returning black", () => {
    expect(getDarkenColor("#ff0000", 100)).toBe("#000000");
  });

  it("darkens a color by 15%", () => {
    const result = getDarkenColor("#3366cc", 15);
    expect(result).toBe("#2b57ad");
  });

  it("returns the original hex for an invalid hex string", () => {
    expect(getDarkenColor("invalid", 50)).toBe("invalid");
  });

  it("handles hex without # prefix", () => {
    expect(getDarkenColor("ffffff", 50)).toBe("#808080");
  });
});
