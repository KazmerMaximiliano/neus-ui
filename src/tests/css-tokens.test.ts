import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// Custom properties a component writes inline at runtime (geometry, positions, counts); every other
// var() in the library CSS must name a token some stylesheet declares.
const RUNTIME = [
  "--clock-hand-angle", "--clock-hand-scale", "--clock-number-angle", "--media-placeholder-ratio", "--popover-anchor-width",
  "--popover-left", "--popover-right", "--popover-top", "--text-lines", "--tooltip-x", "--tooltip-y",
];

const root = path.resolve(import.meta.dirname, "..");
const files = readdirSync(root, { recursive: true, encoding: "utf8" })
  .filter((file) => file.endsWith(".css") && !/fixtures|stories/.test(file));
const declared = new Set(files.flatMap((file) =>
  [...readFileSync(path.join(root, file), "utf8").matchAll(/(--[\w-]+)\s*:/g)].map((match) => match[1])));

describe("library CSS", () => {
  it("references only declared tokens or documented runtime properties", () => {
    const missing = files.flatMap((file) =>
      [...readFileSync(path.join(root, file), "utf8").matchAll(/var\(\s*(--[\w-]+)\s*\)/g)]
        .map((match) => match[1])
        .filter((name) => !declared.has(name) && !RUNTIME.includes(name))
        .map((name) => `${file}: ${name}`));
    expect(missing).toEqual([]);
  });
});
