import { describe, expect, it } from "vitest";
import { getPaginationItems } from "../Pagination.utils";

describe("getPaginationItems", () => {
  it("lists every page when they fit", () => {
    expect(getPaginationItems(1, 1)).toEqual([1]);
    expect(getPaginationItems(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("keeps the first pages together near the start", () => {
    expect(getPaginationItems(1, 20)).toEqual([1, 2, 3, 4, 5, "end-ellipsis", 20]);
    expect(getPaginationItems(4, 20)).toEqual([1, 2, 3, 4, 5, "end-ellipsis", 20]);
  });

  it("puts the current page and its siblings between two ellipses", () => {
    expect(getPaginationItems(10, 20)).toEqual([1, "start-ellipsis", 9, 10, 11, "end-ellipsis", 20]);
  });

  it("keeps the last pages together near the end", () => {
    expect(getPaginationItems(17, 20)).toEqual([1, "start-ellipsis", 16, 17, 18, 19, 20]);
    expect(getPaginationItems(20, 20)).toEqual([1, "start-ellipsis", 16, 17, 18, 19, 20]);
  });

  it("widens the window with more siblings", () => {
    expect(getPaginationItems(10, 20, 2)).toEqual([1, "start-ellipsis", 8, 9, 10, 11, 12, "end-ellipsis", 20]);
    expect(getPaginationItems(10, 20, 0)).toEqual([1, "start-ellipsis", 10, "end-ellipsis", 20]);
  });
});
