#!/usr/bin/env node
// Deals design directions from ../assets/directions.json so the agent starts
// from a random combination instead of the category default.
// Usage: node deal-directions.mjs [--options 3] [--surface product|marketing] [--seed <n>]
import { readFileSync } from "node:fs";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: {
    options: { type: "string", default: "3" },
    surface: { type: "string", default: "product" },
    seed: { type: "string" },
  },
});
const data = JSON.parse(readFileSync(new URL("../assets/directions.json", import.meta.url), "utf8"));
const seed = Number(values.seed ?? Math.floor(Math.random() * 2 ** 32)) >>> 0;

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
  signature: shuffle(values.surface === "marketing" ? data.marketingMoves : data.productMoves),
};
// Dealt without replacement, so options differ on every axis the deck allows.
const directions = Array.from({ length: Number(values.options) }, (_, index) =>
  Object.fromEntries(Object.entries(decks).map(([axis, deck]) => [axis, deck[index % deck.length]])));

process.stdout.write(`${JSON.stringify({ seed, surface: values.surface, directions }, null, 2)}\n`);
