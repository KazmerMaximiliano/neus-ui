import { describe, expect, it } from "vitest";
import { rgbToHex } from "./rgbToHex";

describe("rgbToHex", () => {
  it("converts red RGB to hex", () => {
    expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
  });

  it("converts black RGB to hex", () => {
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
  });

  it("converts white RGB to hex", () => {
    expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
  });

  it("converts a mixed color to hex", () => {
    expect(rgbToHex(26, 43, 60)).toBe("#1a2b3c");
  });

  it("pads single digit hex values with leading zero", () => {
    expect(rgbToHex(0, 0, 15)).toBe("#00000f");
  });

  it("clamps values above 255 to 255", () => {
    expect(rgbToHex(300, 0, 0)).toBe("#ff0000");
  });

  it("clamps values below 0 to 0", () => {
    expect(rgbToHex(-10, 0, 0)).toBe("#000000");
  });

  it("rounds decimal values", () => {
    expect(rgbToHex(127.6, 0, 0)).toBe("#800000");
  });
});
