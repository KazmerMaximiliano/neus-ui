import { describe, expect, it } from "vitest";
import { resolvePlacement } from "./usePopover.utils";

const viewport = { width: 1000, height: 800 };
const anchor = (top: number, left: number) => ({ top, bottom: top + 40, left, right: left + 100 });
const panel = { width: 300, height: 200 };

describe("resolvePlacement", () => {
  it("keeps the preferred placement when it fits", () => {
    expect(resolvePlacement("bottom-start", anchor(100, 100), panel, viewport)).toBe("bottom-start");
    expect(resolvePlacement("top-end", anchor(400, 500), panel, viewport)).toBe("top-end");
  });

  it("flips to the other side only when that side has more room", () => {
    expect(resolvePlacement("bottom-start", anchor(700, 100), panel, viewport)).toBe("top-start");
    expect(resolvePlacement("top-start", anchor(20, 100), panel, viewport)).toBe("bottom-start");
    expect(resolvePlacement("bottom-start", anchor(700, 100), { width: 300, height: 900 }, { width: 1000, height: 1600 }))
      .toBe("bottom-start");
  });

  it("flips to the other edge when the panel would leave the viewport", () => {
    expect(resolvePlacement("bottom-start", anchor(100, 850), panel, viewport)).toBe("bottom-end");
    expect(resolvePlacement("bottom-end", anchor(100, 10), panel, viewport)).toBe("bottom-start");
    expect(resolvePlacement("bottom-end", anchor(100, 10), { width: 1200, height: 200 }, viewport)).toBe("bottom-end");
  });

  it("centers a side without an edge and flips only its side", () => {
    expect(resolvePlacement("top", anchor(400, 10), panel, viewport)).toBe("top");
    expect(resolvePlacement("top", anchor(20, 100), panel, viewport)).toBe("bottom");
    expect(resolvePlacement("bottom", anchor(700, 900), panel, viewport, true)).toBe("top");
  });

  it("reads start and end from the trailing edge in right-to-left text", () => {
    expect(resolvePlacement("bottom-start", anchor(100, 10), panel, viewport, true)).toBe("bottom-end");
    expect(resolvePlacement("bottom-start", anchor(100, 850), panel, viewport, true)).toBe("bottom-start");
  });
});
