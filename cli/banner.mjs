import { setTimeout as sleep } from "node:timers/promises";
import { styleText } from "node:util";

// The banner every neus CLI opens with: NEUS plus the CLI's suffix ("/skills", "/ui"). This file
// imports nothing from its CLI, so neus-skills and neus-ui keep identical copies of it.

const paint = (output, format, text) => styleText(format, text, { stream: output });

// "NEUS" in block letters (ANSI Shadow style): solid blocks with a box-drawing shadow.
const LETTERS = {
  N: ["███╗   ██╗", "████╗  ██║", "██╔██╗ ██║", "██║╚██╗██║", "██║ ╚████║", "╚═╝  ╚═══╝"],
  E: ["███████╗", "██╔════╝", "█████╗  ", "██╔══╝  ", "███████╗", "╚══════╝"],
  U: ["██╗   ██╗", "██║   ██║", "██║   ██║", "██║   ██║", "╚██████╔╝", " ╚═════╝ "],
  S: ["███████╗", "██╔════╝", "███████╗", "╚════██║", "███████║", "╚══════╝"],
};
export const LOGO = LETTERS.N.map((_, row) => ["N", "E", "U", "S"].map((letter) => LETTERS[letter][row]).join(""));

// The suffix beside NEUS, in a lowercase pixel font: 4 pixels tall, a 3-pixel x-height (1.5 rows,
// a quarter of NEUS's 6) plus one row for ascenders. Half blocks put two pixels in each cell, so a
// word takes two rows. Glyphs list their pixel rows top to bottom; # is ink.
const MINI = {
  a: ["...", ".##", "#.#", ".##"],
  b: ["#..", "##.", "#.#", "##."],
  c: ["...", ".##", "#..", ".##"],
  d: ["..#", ".##", "#.#", ".##"],
  e: ["...", "###", "##.", "###"],
  f: [".##", "###", ".#.", ".#."],
  g: [".##", "#.#", "###", "..#"],
  h: ["#..", "##.", "#.#", "#.#"],
  i: ["#", ".", "#", "#"],
  j: ["..#", "...", "..#", "##."],
  k: ["#..", "#.#", "##.", "#.#"],
  l: ["#", "#", "#", "#"],
  m: [".....", "####.", "#.#.#", "#.#.#"],
  n: ["...", "##.", "#.#", "#.#"],
  o: ["...", "###", "#.#", "###"],
  p: ["##.", "#.#", "##.", "#.."],
  q: [".##", "#.#", ".##", "..#"],
  r: ["..", "##", "#.", "#."],
  s: ["...", ".##", ".#.", "##."],
  t: [".#.", "###", ".#.", ".##"],
  u: ["...", "#.#", "#.#", ".##"],
  v: ["...", "#.#", "#.#", ".#."],
  w: [".....", "#.#.#", "#.#.#", ".#.#."],
  x: ["...", "#.#", ".#.", "#.#"],
  y: ["...", "#.#", ".#.", ".#."],
  z: ["...", "##.", ".#.", ".##"],
  "/": ["..#", ".#.", ".#.", "#.."],
  "-": ["..", "..", "##", ".."],
  ".": [".", ".", ".", "#"],
  " ": ["..", "..", "..", ".."],
};
const HALF = { "..": " ", "#.": "▀", ".#": "▄", "##": "█" };

/** `text` in the pixel font: two rows of half blocks, with one blank column between glyphs. */
export const miniText = (text) => {
  const glyphs = [...text].map((character) => {
    if (!Object.hasOwn(MINI, character)) throw new Error(`The banner font has no "${character}": use a-z, "/", "-", "." or a space.`);
    return MINI[character];
  });
  return [0, 2].map((top) => glyphs.map((glyph) => [...glyph[top]].map((pixel, col) => HALF[pixel + glyph[top + 1][col]]).join("")).join(" "));
};

const ROWS = LOGO.length;
const LOGO_WIDTH = LOGO[0].length;
// The suffix sits on NEUS's baseline: rows 3 and 4, above the shadow row.
const SUFFIX_ROWS = [3, 4];
const GAP = " ";
const INDENT = "  ";

/** NEUS and the suffix as one block of rows, and the column where the suffix starts. */
const lockup = (suffix) => {
  if (!suffix) return { lines: LOGO, suffixStart: Infinity };
  const small = miniText(suffix);
  const blank = " ".repeat(small[0].length);
  return {
    lines: LOGO.map((line, row) => `${line}${GAP}${SUFFIX_ROWS.includes(row) ? small[SUFFIX_ROWS.indexOf(row)] : blank}`),
    suffixStart: LOGO_WIDTH + GAP.length,
  };
};

// The wipe and the shine travel along col + row, which slants their edge. This reveal leaves every
// cell behind the glowing edge.
const fullReveal = (suffix) => lockup(suffix).lines[0].length + ROWS + 1;

// The neus palette: primary-dark #a5b4fc into indigo #5c6bc0, the shadow in the primary family.
// The suffix keeps the terminal's own text color, so it reads on light and dark themes alike.
const FROM = [165, 180, 252];
const TO = [92, 107, 192];
const SHADOW = [57, 73, 171];
const LIGHT = [255, 255, 255];
// 16-color terminals get the nearest ANSI colors.
const BASIC = { solid: 94, shadow: 34, light: 97 };

const mix = (from, to, amount) => from.map((value, index) => Math.round(value + (to[index] - value) * amount));

const colorCode = (rgb, role, depth) => {
  if (depth < 4) return "";
  if (role === "ink") return "\x1b[39m";
  if (depth >= 24) return `\x1b[38;2;${rgb.join(";")}m`;
  if (depth >= 8) {
    const [red, green, blue] = rgb.map((value) => Math.round((value / 255) * 5));
    return `\x1b[38;5;${16 + 36 * red + 6 * green + blue}m`;
  }
  return `\x1b[${BASIC[role]}m`;
};

/**
 * One frame of the banner, one string per row: NEUS plus the CLI's `suffix` ("/ui"). `reveal` is
 * how far the slanted wipe has gone (cells behind it show, the two at its edge glow white); `shine`
 * is the center of a light band crossing the logo, or null. `depth` is the terminal's color depth
 * in bits; 1 draws plain characters.
 */
export const renderLogo = ({ suffix = "", reveal = fullReveal(suffix), shine = null, depth = 1 } = {}) => {
  const { lines, suffixStart } = lockup(suffix);
  const width = lines[0].length;
  return lines.map((line, row) => {
    let text = INDENT;
    let current = "";
    [...line].forEach((character, col) => {
      const at = col + row;
      if (character === " " || at >= reveal) {
        text += " ";
        return;
      }
      const solid = character === "█";
      let role = col >= suffixStart ? "ink" : solid ? "solid" : "shadow";
      let rgb = role === "solid" ? mix(FROM, TO, col / (Math.min(width, LOGO_WIDTH) - 1)) : SHADOW;
      if (at >= reveal - 2) {
        rgb = LIGHT;
        role = "light";
      } else if (shine !== null && Math.abs(at - shine) < 2) {
        rgb = role === "ink" ? LIGHT : mix(rgb, LIGHT, 0.75 - Math.abs(at - shine) * 0.3);
        role = "light";
      }
      const code = colorCode(rgb, role, depth);
      if (code !== current) text += code;
      current = code;
      text += character;
    });
    return current ? `${text}\x1b[0m` : text;
  });
};

const WIPE_FRAMES = 11;
const SHINE_FRAMES = 10;

/** The wipe, a pause, the shine and the settled logo: 23 frames, about 0.45 s at any width. */
export const frames = (suffix = "") => {
  const full = fullReveal(suffix);
  const wipe = Math.ceil(full / WIPE_FRAMES);
  const shine = Math.ceil((full + 4) / SHINE_FRAMES);
  return [
    ...Array.from({ length: WIPE_FRAMES }, (_, step) => ({ reveal: Math.min(full, (step + 1) * wipe) })),
    { reveal: full },
    ...Array.from({ length: SHINE_FRAMES }, (_, step) => ({ reveal: full, shine: step * shine - 2 })),
    { reveal: full },
  ];
};

/**
 * Prints the animated NEUS banner with the CLI's `suffix`, then a line with its `name`, `version`
 * and `tagline`. Callers show it only on a TTY, so pipes, agents and --json get plain output. A
 * narrow terminal gets the name line only; TERM=dumb gets the logo without motion.
 */
export const banner = async ({
  suffix = "", name = "neus", version = "", tagline = "", output = process.stdout, env = process.env, frameMs = 20, wait = sleep,
} = {}) => {
  const depth = output.getColorDepth?.(env) ?? 1;
  const details = [version, tagline].filter(Boolean).map((text) => paint(output, "dim", text));
  const title = `${INDENT}${[paint(output, "bold", name), ...details].join("  ")}\n\n`;
  if ((output.columns ?? 80) < lockup(suffix).lines[0].length + INDENT.length * 2) {
    output.write(`\n${title}`);
    return;
  }
  if (env.TERM === "dumb") {
    output.write(`\n${renderLogo({ suffix, depth }).join("\n")}\n\n${title}`);
    return;
  }
  const showCursor = () => output.write("\x1b[?25h");
  const onInterrupt = () => {
    showCursor();
    process.exit(130);
  };
  process.once("SIGINT", onInterrupt);
  output.write("\n\x1b[?25l");
  try {
    for (const [index, frame] of frames(suffix).entries()) {
      output.write(`${index ? `\x1b[${ROWS}A` : ""}${renderLogo({ ...frame, suffix, depth }).join("\n")}\n`);
      await wait(frameMs);
    }
  } finally {
    showCursor();
    process.off("SIGINT", onInterrupt);
  }
  output.write(`\n${title}`);
};
