import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { contextFor } from "./context.mjs";
import { docsFor, guideNames } from "./docs.mjs";
import { markdownSection } from "./neus.utils.mjs";

const SYSTEMS = ["neus", "apple", "carbon", "material", "neobrutalism", "vercel"];
// ponytail: tokens estimated as characters / 4; swap in a tokenizer if the budget gets tight.
const tokens = (text) => Math.ceil(text.length / 4);

const project = (config, files = {}) => {
  const root = mkdtempSync(path.join(tmpdir(), "neus-context-"));
  writeFileSync(path.join(root, "neus.config.json"), JSON.stringify({
    framework: "vite", rendering: "spa", designSystem: "neus", derivedSystem: null, colorScheme: "light",
    colors: {}, language: "es", agents: ["claude"], paths: { styles: "src/styles" }, ...config,
  }));
  for (const [file, text] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    writeFileSync(path.join(root, file), text);
  }
  return root;
};

describe("markdownSection", () => {
  it("stops at the next heading of the same level, ignoring headings in code fences", () => {
    const text = "# T\n## A\none\n```md\n## not a heading\n```\n### Sub\ntwo\n## B\nthree";
    expect(markdownSection(text, "## A")).toBe("## A\none\n```md\n## not a heading\n```\n### Sub\ntwo");
    expect(markdownSection(text, "### Sub")).toBe("### Sub\ntwo");
    expect(markdownSection(text, "## C")).toBeNull();
  });
});

describe("neus context", () => {
  it.each(SYSTEMS.flatMap((system) => [[system, "app"], [system, "page"]]))("stays under 3000 tokens for %s (%s)", (system, surface) => {
    const text = contextFor(project({ designSystem: system }), surface);
    expect(tokens(text)).toBeLessThan(3000);
    expect(text).toContain(`System: ${system} (locked)`);
    expect(text).toContain("## Do's and Don'ts");
    expect(text).toContain("- Heading: ");
    expect(text).toContain("- FormTemplate: ");
    expect(text).toContain("- Hero: ");
    expect(text).toContain("| Features or services |");
    expect(text).toContain("`--space-1`");
    expect(text).not.toMatch(/^Format:/m);
  });

  it("tells whether the brand is still to be decided", () => {
    expect(contextFor(project({}))).toContain("Brand: not decided.");
    expect(contextFor(project({ brand: "Forest and cream: #1f5130, cream ground, Fraunces" }))).toContain("Brand: Forest and cream");
  });

  it("adds the layout guidance for public pages only", () => {
    const root = project({});
    expect(contextFor(root, "page")).toContain("## Layout");
    expect(contextFor(root, "app")).not.toContain("## Layout");
  });

  it("reads a derived system from the project, and flags one that does not exist yet", () => {
    const derived = "---\nversion: alpha\n---\n\n# Mine\n\n## Overview\n\nWarm and editorial.\n\n## Do's and Don'ts\n\n- Do use serif headlines.\n";
    const text = contextFor(project({ derivedSystem: "design/system/DESIGN.md" }, { "design/system/DESIGN.md": derived }));
    expect(text).toContain("System: design/system/DESIGN.md (derived from neus)");
    expect(text).toContain("Warm and editorial.");
    expect(contextFor(project({ derivedSystem: "design/system/DESIGN.md" }))).toContain("None mode: design/system/DESIGN.md does not exist yet");
  });

  it("asks for neus init without a config", () => {
    expect(() => contextFor(mkdtempSync(path.join(tmpdir(), "neus-context-")))).toThrow("Run npx neus init first.");
  });
});

describe("neus docs", () => {
  it("lists every component and template guide", () => {
    expect(guideNames()).toEqual(expect.arrayContaining(["Button", "Heading", "Section", "AppTemplate", "FormTemplate"]));
    expect(guideNames()).not.toContain("README");
  });

  it("prints usage, behavior, props and anatomy without the token tables", () => {
    const text = docsFor("button");
    expect(text.startsWith("# Button")).toBe(true);
    for (const heading of ["## Usage", "## Behavior and accessibility", "## Props", "## Anatomy and per-part customization"]) {
      expect(text).toContain(heading);
    }
    expect(text).not.toContain("## CSS token reference");
    expect(docsFor("Button", true)).toContain("## CSS token reference");
  });

  it("returns null for an unknown name", () => {
    expect(docsFor("Carousel")).toBeNull();
  });
});
