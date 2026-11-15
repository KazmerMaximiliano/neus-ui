import { PassThrough } from "node:stream";
import { stripVTControlCharacters } from "node:util";
import { describe, expect, it } from "vitest";
import { banner, frames, LOGO, miniText, renderLogo } from "./banner.mjs";

// A fake terminal with a color depth and width; records everything written.
const terminal = ({ depth = 24, columns = 80 } = {}) => {
  const stream = Object.assign(new PassThrough(), { isTTY: true, columns, getColorDepth: () => depth });
  let text = "";
  stream.on("data", (chunk) => { text += chunk; });
  return { stream, text: () => text };
};
const instant = async () => {};
const TITLE = "  neus-ui  2.0.0  React components and an AI design kit\n\n";
const options = { suffix: "/ui", name: "neus-ui", version: "2.0.0", tagline: "React components and an AI design kit", env: {}, wait: instant };

describe("banner", () => {
  it("draws NEUS in rows of equal width", () => {
    expect(LOGO).toHaveLength(6);
    expect(LOGO.every((line) => [...line].length === [...LOGO[0]].length)).toBe(true);
    expect(renderLogo()).toEqual(LOGO.map((line) => `  ${line}`));
  });

  it("writes the suffix in a two-row pixel font of half blocks", () => {
    expect(miniText("/ui")).toEqual([" ▄▀ ▄ ▄ ▀", "▄▀  ▀▄█ █"]);
    for (const character of "abcdefghijklmnopqrstuvwxyz/-. ") {
      const [top, bottom] = miniText(character);
      expect(top.length, `"${character}" has rows of one width`).toBe(bottom.length);
    }
    expect(() => miniText("/UI")).toThrow(/The banner font has no "U"/);
  });

  it("sets the suffix beside NEUS, on its baseline", () => {
    const rows = renderLogo({ suffix: "/ui" });
    const [top, bottom] = miniText("/ui");
    expect(rows[3]).toBe(`  ${LOGO[3]} ${top}`);
    expect(rows[4]).toBe(`  ${LOGO[4]} ${bottom}`);
    expect(rows[0].trimEnd()).toBe(`  ${LOGO[0]}`);
    expect(rows[5].trimEnd()).toBe(`  ${LOGO[5]}`);
  });

  it("reveals the logo with a slanted wipe and settles on the full logo in under half a second", () => {
    const partial = renderLogo({ suffix: "/ui", reveal: 12 });
    expect(partial[0]).toContain("███╗");
    expect(partial[0]).not.toContain("███████╗██╗");
    expect(partial[0].trimEnd().length).toBeGreaterThan(partial[5].trimEnd().length);
    for (const suffix of ["", "/ui", "/a-much-longer-suffix"]) {
      const list = frames(suffix);
      expect(list.at(-1)).toEqual({ reveal: list.at(-1).reveal });
      expect(list.length * 20).toBeLessThanOrEqual(500);
    }
  });

  it("paints NEUS with the palette and the suffix in the terminal's own color", () => {
    const rows = renderLogo({ suffix: "/ui", depth: 24 });
    expect(rows[0]).toContain("\x1b[38;2;165;180;252m");
    expect(rows[4]).toContain("\x1b[39m▄▀");
    expect(renderLogo({ depth: 8 })[0]).toContain("\x1b[38;5;");
    expect(renderLogo({ depth: 4 })[0]).toContain("\x1b[94m");
    expect(rows.every((line) => line.endsWith("\x1b[0m"))).toBe(true);
  });

  it("animates in place, hides the cursor and gives it back", async () => {
    const io = terminal();
    await banner({ ...options, output: io.stream });
    const text = io.text();
    expect(text.split("\x1b[6A")).toHaveLength(frames("/ui").length);
    expect(text.indexOf("\x1b[?25l")).toBeLessThan(text.indexOf("\x1b[?25h"));
    const [, bottom] = miniText("/ui");
    expect(stripVTControlCharacters(text).endsWith(`${LOGO.at(-1)}${" ".repeat(bottom.length + 1)}\n\n${TITLE}`)).toBe(true);
  });

  it("prints only the name line in a narrow terminal and no motion on TERM=dumb", async () => {
    const narrow = terminal({ columns: 40 });
    await banner({ ...options, output: narrow.stream });
    expect(stripVTControlCharacters(narrow.text())).toBe(`\n${TITLE}`);
    const dumb = terminal({ depth: 1 });
    await banner({ ...options, output: dumb.stream, env: { TERM: "dumb" } });
    expect(dumb.text()).not.toContain("\x1b[6A");
    expect(dumb.text()).not.toContain("\x1b[?25l");
    expect(dumb.text()).toContain(`${LOGO[4]} ${miniText("/ui")[1]}`);
  });
});
