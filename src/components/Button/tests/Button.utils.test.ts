import { describe, expect, it } from "vitest";
import { mockThemeColors } from "../../../mock/mocks";
import { getButtonClasses, getLoaderColor } from "../Button.utils";

describe("getButtonClasses", () => {
  it("returns base button class", () => {
    const result = getButtonClasses("solid", "primary", false);
    expect(result).toContain("button");
  });

  it("returns correct variant-color class", () => {
    const result = getButtonClasses("solid", "primary", false);
    expect(result).toContain("button--solid-primary");
  });

  it("includes fullWidth class when true", () => {
    const result = getButtonClasses("solid", "primary", true);
    expect(result).toContain("button--full-width");
  });

  it("does not include fullWidth class when false", () => {
    const result = getButtonClasses("solid", "primary", false);
    expect(result).not.toContain("button--full-width");
  });

  it.each([
    ["solid", "primary"],
    ["solid", "success"],
    ["solid", "error"],
    ["solid", "info"],
    ["outlined", "primary"],
    ["outlined", "success"],
    ["outlined", "error"],
    ["outlined", "info"],
    ["text", "primary"],
    ["text", "success"],
    ["text", "error"],
    ["text", "info"],
  ])("returns correct class for %s variant with %s color", (variant, color) => {
    const result = getButtonClasses(variant, color, false);
    expect(result).toBe(`button button--${variant}-${color}`);
  });

  it("returns trimmed string without extra spaces when fullWidth is false", () => {
    const result = getButtonClasses("solid", "primary", false);
    expect(result).not.toMatch(/\s{2,}/);
  });
});

describe("getLoaderColor", () => {
  it("returns white for solid variant", () => {
    const result = getLoaderColor("solid", "primary", mockThemeColors);
    expect(result).toBe(mockThemeColors.white);
  });

  it("returns primary color for non-solid variant with primary color", () => {
    const result = getLoaderColor("outlined", "primary", mockThemeColors);
    expect(result).toBe(mockThemeColors.primary.main);
  });

  it("returns success color for non-solid variant with success color", () => {
    const result = getLoaderColor("text", "success", mockThemeColors);
    expect(result).toBe(mockThemeColors.success.main);
  });

  it("returns error color for non-solid variant with error color", () => {
    const result = getLoaderColor("outlined", "error", mockThemeColors);
    expect(result).toBe(mockThemeColors.error.main);
  });

  it("returns info color for non-solid variant with info color", () => {
    const result = getLoaderColor("text", "info", mockThemeColors);
    expect(result).toBe(mockThemeColors.info.main);
  });

  it("returns gray for disabled color", () => {
    const result = getLoaderColor("outlined", "disabled", mockThemeColors);
    expect(result).toBe(mockThemeColors.gray[500]);
  });

  it("returns primary color as fallback for unknown color", () => {
    const result = getLoaderColor("outlined", "unknown", mockThemeColors);
    expect(result).toBe(mockThemeColors.primary.main);
  });

  it.each(["outlined", "text"])(
    "returns non-white color for %s variant",
    (variant) => {
      const result = getLoaderColor(variant, "primary", mockThemeColors);
      expect(result).not.toBe(mockThemeColors.white);
    },
  );
});
