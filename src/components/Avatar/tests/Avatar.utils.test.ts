import { describe, expect, it } from "vitest";
import { initialsOf } from "../Avatar.utils";

describe("initialsOf", () => {
  it("takes the first letters of the first and last words", () => {
    expect(initialsOf("María José de la Torre")).toBe("MT");
    expect(initialsOf("  ana   paz ")).toBe("AP");
    expect(initialsOf("Cher")).toBe("C");
    expect(initialsOf("Ágata Ñandú")).toBe("ÁÑ");
    expect(initialsOf("")).toBe("");
  });
});
