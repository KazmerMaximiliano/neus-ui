import { cpSync, mkdtempSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { stringify } from "yaml";
import type { DesignDocument } from "../design-systems.types";
import { SYSTEM_IDS } from "../design-systems.consts";
import { collectArtifacts, generateDesignSystems, parseDesignDocument, resolveReference, watchDesignDocuments } from "../design-systems.utils";

const repository = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../..");
const temporaryRoots: string[] = [];

const source = (id = "apple", root = repository) => readFileSync(path.join(root, "src/design-systems", id, "DESIGN.md"), "utf8");
const markdown = (document: DesignDocument, id = "apple") => `---\n${stringify(document)}---\n${source(id).split(/\n---\r?\n/)[1]}`;
const document = () => parseDesignDocument(source(), "apple");
const temporaryRepository = () => {
  const root = mkdtempSync(path.join(tmpdir(), "neus-design-generator-"));
  temporaryRoots.push(root);
  for (const id of SYSTEM_IDS) {
    cpSync(path.join(repository, "src/design-systems", id, "DESIGN.md"),
      path.join(root, "src/design-systems", id, "DESIGN.md"), { recursive: true });
  }
  return root;
};

afterEach(() => {
  for (const root of temporaryRoots.splice(0)) rmSync(root, { recursive: true, force: true });
});

describe("document validation", () => {
  it.each(SYSTEM_IDS)("accepts the %s Google document and Neus extension", id => {
    expect(parseDesignDocument(source(id), id)["x-neus"].id).toBe(id);
  });

  it("rejects duplicate YAML keys instead of silently overwriting values", () => {
    expect(() => parseDesignDocument(source().replace("name: Apple", "name: Apple\nname: Duplicate"), "apple"))
      .toThrow(/unique|same|duplicate/i);
  });

  it("requires front matter and the exact ordered prose sections", () => {
    expect(() => parseDesignDocument("## Overview", "apple")).toThrow(/front matter/);
    expect(() => parseDesignDocument(source().replace("## Shapes", "## Colors"), "apple")).toThrow(/canonical order/);
  });

  it("rejects mismatched IDs, unknown modes and undeclared recipe names", () => {
    const value = document();
    value["x-neus"].id = "../apple";
    expect(() => parseDesignDocument(markdown(value), "apple")).toThrow(/identifier/);
    value["x-neus"].id = "apple";
    Object.assign(value["x-neus"].tokens, { dim: {} });
    expect(() => parseDesignDocument(markdown(value), "apple")).toThrow(/unknown key dim/);
    delete (value["x-neus"].tokens as Record<string, unknown>).dim;
    value["x-neus"].recipes.unknown = {};
    expect(() => parseDesignDocument(markdown(value), "apple")).toThrow(/unknown key unknown/);
  });

  it("rejects incorrect dimensions, palette colors, typography and property types", () => {
    const value = document();
    value.rounded.button = "eight";
    expect(() => parseDesignDocument(markdown(value), "apple")).toThrow(/dimension/);
    value.rounded.button = "8px";
    value["x-neus"].palette.light.primary = "rgb(1, 2, 3)";
    expect(() => parseDesignDocument(markdown(value), "apple")).toThrow(/six-digit hex/);
    value["x-neus"].palette.light.primary = "{colors.primary}";
    value.typography["body-md"].fontWeight = "bold";
    expect(() => parseDesignDocument(markdown(value), "apple")).toThrow(/font weight/);
    value.typography["body-md"].fontWeight = 400;
    Object.assign(value["x-neus"].recipes.button.base!, { "--button-radius": [] });
    expect(() => parseDesignDocument(markdown(value), "apple")).toThrow(/string or finite number/);
  });

  it("rejects unresolved and cyclic references including unused token definitions", () => {
    const value = document();
    value.colors.primary = "{colors.missing}";
    expect(() => parseDesignDocument(markdown(value), "apple")).toThrow(/Missing reference/);
    value.colors.primary = "{colors.on-primary}";
    value.colors["on-primary"] = "{colors.primary}";
    expect(() => parseDesignDocument(markdown(value), "apple")).toThrow(/Cyclic reference/);
  });

  it("resolves scalar chains and retains CSS variables, calculations and color mixes", () => {
    const value = document();
    value.spacing.control = "{spacing.step-2}";
    const expression = "calc({spacing.control} + var(--consumer-offset, 2px))";
    expect(resolveReference(value, expression)).toBe("calc(8px + var(--consumer-offset, 2px))");
    expect(resolveReference(value, "color-mix(in srgb, var(--color-primary) 25%, transparent)"))
      .toBe("color-mix(in srgb, var(--color-primary) 25%, transparent)");
    expect(() => resolveReference(value, "{colors}")).toThrow(/string or finite number/);
    expect(() => resolveReference(value, "{constructor.prototype}")).toThrow(/Missing reference/);
  });

  it("rejects CSS declarations and selector injection inside a value", () => {
    const value = document();
    value["x-neus"].recipes.button.base!["--button-radius"] = "8px; color: red";
    expect(() => parseDesignDocument(markdown(value), "apple")).toThrow(/CSS value/);
  });

  it("reserves the shared foundations for Neus", () => {
    const value = document();
    value["x-neus"].foundations = { base: {} };
    expect(() => parseDesignDocument(markdown(value), "apple")).toThrow(/only Neus/);
  });
});

describe("artifact generation", () => {
  it("generates palette and recipe changes from the standard tokens", () => {
    const root = temporaryRepository();
    const value = document();
    value.colors.primary = "#123456";
    value.rounded.button = "10px";
    writeFileSync(path.join(root, "src/design-systems/apple/DESIGN.md"), markdown(value));
    const result = collectArtifacts(root);
    expect(result.artifacts.get("src/design-systems/apple/generated/apple.consts.ts")).toContain('"primary": "#123456"');
    expect(result.artifacts.get("src/design-systems/apple/generated/recipes/button.css")).toContain("--button-radius: 10px;");
    expect(result.artifacts.get("src/design-systems/neus/generated/recipes/button.css")).toContain(":root,\n[data-design-system]");
    expect(result.artifacts.get("src/design-systems/apple/generated/tokens.css")).toContain('[data-design-system="apple"][data-color-scheme="dark"]');
    expect(result.artifacts.get("src/design-systems/apple/generated/tokens.css")).toContain("--color-primary: #123456;");
    expect(result.artifacts.get("src/design-systems/neus/generated/tokens.css")).not.toContain("--color-primary:");
  });

  it("generates deterministically, preserves timestamps and checks without writing", () => {
    const root = temporaryRepository();
    const first = generateDesignSystems(root);
    const file = path.join(root, "src/design-systems/neus/generated/tokens.css");
    const timestamp = statSync(file).mtimeMs;
    expect(generateDesignSystems(root).artifacts).toEqual(first.artifacts);
    expect(statSync(file).mtimeMs).toBe(timestamp);
    expect(generateDesignSystems(root, true).artifacts).toEqual(first.artifacts);
    expect(statSync(file).mtimeMs).toBe(timestamp);
  });

  it("detects missing or edited artifacts without overwriting them in check mode", () => {
    const root = temporaryRepository();
    expect(() => generateDesignSystems(root, true)).toThrow(/outdated/);
    generateDesignSystems(root);
    const file = path.join(root, "src/design-systems/apple/generated/tokens.css");
    writeFileSync(file, "manual edit");
    expect(() => generateDesignSystems(root, true)).toThrow(/outdated/);
    expect(readFileSync(file, "utf8")).toBe("manual edit");
  });

  it("detects stale generated files and removes them only during generation", () => {
    const root = temporaryRepository();
    generateDesignSystems(root);
    const file = path.join(root, "src/design-systems/apple/generated/obsolete.css");
    writeFileSync(file, "obsolete");
    expect(() => generateDesignSystems(root, true)).toThrow(/obsolete.css/);
    expect(readFileSync(file, "utf8")).toBe("obsolete");
    generateDesignSystems(root);
    expect(() => readFileSync(file)).toThrow();
  });

  it("validates all documents before changing any artifact", () => {
    const root = temporaryRepository();
    generateDesignSystems(root);
    const file = path.join(root, "src/design-systems/neus/generated/tokens.css");
    writeFileSync(file, "unchanged on failure");
    writeFileSync(path.join(root, "src/design-systems/vercel/DESIGN.md"), "invalid");
    expect(() => generateDesignSystems(root)).toThrow(/front matter/);
    expect(readFileSync(file, "utf8")).toBe("unchanged on failure");
  });

  it("keeps the committed artifacts synchronized with every document", () => {
    expect(() => generateDesignSystems(repository, true)).not.toThrow();
  });

  it("keeps the last valid output and recovers after an atomic editor save", async () => {
    const root = temporaryRepository();
    generateDesignSystems(root);
    const file = path.join(root, "src/design-systems/apple/DESIGN.md");
    const artifact = path.join(root, "src/design-systems/apple/generated/recipes/button.css");
    const original = readFileSync(artifact, "utf8");
    const outcomes: string[] = [];
    const close = watchDesignDocuments(root, () => {
      try { generateDesignSystems(root); outcomes.push("valid"); }
      catch { outcomes.push("invalid"); }
    });
    try {
      writeFileSync(file, "invalid");
      await expect.poll(() => outcomes.includes("invalid"), { timeout: 5000 }).toBe(true);
      expect(readFileSync(artifact, "utf8")).toBe(original);
      const value = document();
      value.rounded.button = "11px";
      writeFileSync(`${file}.tmp`, markdown(value));
      renameSync(`${file}.tmp`, file);
      await expect.poll(() => outcomes.includes("valid"), { timeout: 5000 }).toBe(true);
      expect(readFileSync(artifact, "utf8")).toContain("--button-radius: 11px;");
    } finally { close(); }
  });
});
