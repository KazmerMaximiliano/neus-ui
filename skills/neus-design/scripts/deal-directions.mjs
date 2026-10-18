#!/usr/bin/env node
// Deals design directions from ../assets/directions.json so the agent starts
// from a random combination instead of the category default.
// Usage: node deal-directions.mjs [--options 3] [--surface product|marketing] [--seed <n>] [--keep <axes>]
// --keep drops axes the design system already decides, e.g. palette,type,shape,density,elevation.
import { readFileSync } from "node:fs";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    options: { type: "string", default: "3" },
    surface: { type: "string", default: "product" },
    seed: { type: "string" },
    keep: { type: "string", default: "" },
  },
});
const data = JSON.parse(readFileSync(new URL("../assets/directions.json", import.meta.url), "utf8"));
const seed = Number(values.seed ?? Math.floor(Math.random() * 2 ** 32)) >>> 0;
const marketing = values.surface === "marketing";

// mulberry32: small seeded PRNG, so a seed reproduces a deal.
let state = seed;
const random = () => {
  state = (state + 0x6d2b79f5) >>> 0;
  let t = Math.imul(state ^ (state >>> 15), state | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 2 ** 32;
};
const shuffle = (list) => list.map((item) => [random(), item]).sort((a, b) => a[0] - b[0]).map(([, item]) => item);

const decks = {
  palette: shuffle(data.palettes),
  type: shuffle(data.typePairings),
  shape: shuffle(data.shapes),
  density: shuffle(data.densities),
  elevation: shuffle(data.elevations),
  signature: shuffle(marketing ? data.marketingMoves : data.productMoves),
  // Composition: which curated layout each page section uses.
  ...(marketing ? Object.fromEntries(Object.entries(data.composition).map(([axis, deck]) => [axis, shuffle(deck)])) : {}),
};
// Kept axes are dropped after shuffling, so a seed deals the same composition with or without --keep.
const keep = values.keep.split(",").map((axis) => axis.trim()).filter(Boolean);
const unknown = keep.filter((axis) => !Object.hasOwn(decks, axis));
if (unknown.length) {
  process.stderr.write(`Unknown axis: ${unknown.join(", ")}. Axes: ${Object.keys(decks).join(", ")}.\n`);
  process.exit(1);
}
for (const axis of keep) delete decks[axis];

// Dealt without replacement, so options differ on every axis the deck allows.
const directions = Array.from({ length: Number(values.options) }, (_, index) =>
  Object.fromEntries(Object.entries(decks).map(([axis, deck]) => [axis, deck[index % deck.length]])));

process.stdout.write(`${JSON.stringify({ seed, surface: values.surface, keep, directions }, null, 2)}\n`);
