import { describe, expect, it } from "vitest";
import { resolveResponsive } from "./resolveResponsive";

describe("resolveResponsive", () => {
  it("writes nothing when the prop is omitted", () => {
    expect(resolveResponsive("--grid-columns", undefined, String)).toEqual({});
  });

  it("repeats a single value at every breakpoint", () => {
    expect(resolveResponsive("--grid-columns", 2, String)).toEqual({
      "--grid-columns": "2", "--grid-columns-md": "2", "--grid-columns-lg": "2",
    });
  });

  it("lets md inherit base and lg inherit md", () => {
    expect(resolveResponsive("--stack-direction", { base: "column", lg: "row" }, String)).toEqual({
      "--stack-direction": "column", "--stack-direction-md": "column", "--stack-direction-lg": "row",
    });
    expect(resolveResponsive("--stack-gap", { base: 2, md: 6 }, (step) => `var(--space-${step})`)).toEqual({
      "--stack-gap": "var(--space-2)", "--stack-gap-md": "var(--space-6)", "--stack-gap-lg": "var(--space-6)",
    });
  });
});
