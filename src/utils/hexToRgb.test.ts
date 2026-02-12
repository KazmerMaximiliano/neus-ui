import { describe, expect, it } from "vitest";
import { hexToRgb } from "./hexToRgb";

describe("hexToRgb", () => {
  it("converts a valid hex color to RGB", () => {
    expect(hexToRgb("#ff0000")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("converts black hex to RGB", () => {
    expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
  });

  it("converts white hex to RGB", () => {
    expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
  });

  it("converts a mixed color hex to RGB", () => {
    expect(hexToRgb("#1a2b3c")).toEqual({ r: 26, g: 43, b: 60 });
  });

  it("handles hex without # prefix", () => {
    expect(hexToRgb("ff0000")).toEqual({ r: 255, g: 0, b: 0 });
  });

  it("handles uppercase hex values", () => {
    expect(hexToRgb("#ABCDEF")).toEqual({ r: 171, g: 205, b: 239 });
  });

  it("returns null for invalid hex string", () => {
    expect(hexToRgb("invalid")).toBeNull();
  });

  it("returns null for hex string that is too short", () => {
    expect(hexToRgb("#fff")).toBeNull();
  });

  it("returns null for hex string that is too long", () => {
    expect(hexToRgb("#fffffff")).toBeNull();
  });

  it("returns null for hex string with invalid characters", () => {
    expect(hexToRgb("#gggggg")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(hexToRgb("")).toBeNull();
  });
});
