import { lint } from "@google/design.md/linter";
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, unlinkSync, unwatchFile, watchFile, writeFileSync } from "node:fs";
import path from "node:path";
import { resolvePalette } from "../../utils/resolvePalette";
import type { ActionPalette } from "../design-systems.types";
import { COLOR_MODES, RECIPE_NAMES, SYSTEM_IDS, WATCH_DEBOUNCE_MS, WATCH_INTERVAL_MS } from "./design-systems.consts";
import { parseDesignDocument, renderModes, resolveReference } from "./design-systems.core";
import type { GenerationResult, ModeDeclarations } from "./design-systems.types";

export { parseDesignDocument, resolveReference } from "./design-systems.core";

export const collectArtifacts = (root: string): GenerationResult => {
  const artifacts = new Map<string, string>();
  const warnings: string[] = [];
  for (const id of SYSTEM_IDS) {
    const source = `src/design-systems/${id}/DESIGN.md`;
    const markdown = readFileSync(path.join(root, source), "utf8");
    const document = parseDesignDocument(markdown, id);
    const report = lint(markdown);
    const errors = report.findings.filter(finding => finding.severity === "error");
    if (errors.length) throw new Error(`${source}: ${errors.map(error => error.message).join("; ")}`);
    if (report.summary.warnings) warnings.push(`${id}: ${report.summary.warnings} Google warnings (inspect with pnpm exec designmd lint ${source})`);
    const directory = `src/design-systems/${id}/generated`;
    const header = `/* Generated from ${source}. Edit the document, then run pnpm design:generate. */\n`;
    const extension = document["x-neus"];
    const palette = Object.fromEntries(Object.entries(extension.palette).map(([mode, entries]) => [mode,
      Object.fromEntries(Object.entries(entries).map(([name, value]) => [name, resolveReference(document, value)])),
    ])) as Record<typeof COLOR_MODES[number], ActionPalette>;
    // Siblings ship their resolved action palette as CSS so static pages render it without ThemeProvider.
    const tokens: ModeDeclarations = { ...extension.tokens };
    if (id !== "neus") for (const mode of COLOR_MODES) {
      tokens[mode] = { ...resolvePalette(palette[mode], mode, {}).variables, ...extension.tokens?.[mode] };
    }
    if (extension.foundations) artifacts.set(`${directory}/foundations.css`, header + renderModes(document, extension.foundations, true));
    artifacts.set(`${directory}/tokens.css`, header + renderModes(document, tokens));
    for (const name of RECIPE_NAMES) {
      artifacts.set(`${directory}/recipes/${name}.css`, header + renderModes(document, extension.recipes[name]));
    }
    artifacts.set(`${directory}/index.css`, header + ["tokens", ...RECIPE_NAMES.map(name => `recipes/${name}`)]
      .map(name => `@import "./${name}.css";`).join("\n") + "\n");
    artifacts.set(`${directory}/${id}.consts.ts`, `${header}import type { DesignSystemPalette } from "../../design-systems.types";\n\n` +
      `export const ${id.toUpperCase()}_METADATA = ${JSON.stringify({ id, name: document.name, description: document.description, source }, null, 2)} as const;\n\n` +
      `export const ${id.toUpperCase()}_PALETTE: DesignSystemPalette = ${JSON.stringify(palette, null, 2)};\n`);
  }
  return { artifacts, warnings };
};

const generatedFiles = (directory: string): string[] => existsSync(directory)
  ? readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
    ? generatedFiles(path.join(directory, entry.name)) : [path.join(directory, entry.name)]) : [];

export const generateDesignSystems = (root: string, check = false): GenerationResult => {
  const result = collectArtifacts(root);
  const changed = [...result.artifacts].filter(([file, content]) => !existsSync(path.join(root, file)) ||
    readFileSync(path.join(root, file), "utf8") !== content);
  const stale = SYSTEM_IDS.flatMap(id => generatedFiles(path.join(root, "src/design-systems", id, "generated")))
    .filter(file => !result.artifacts.has(path.relative(root, file).split(path.sep).join("/")));
  if (check && (changed.length || stale.length)) {
    throw new Error(`Generated design systems are outdated. Run pnpm design:generate.\n${[
      ...changed.map(([file]) => file), ...stale.map(file => path.relative(root, file)),
    ].join("\n")}`);
  }
  if (!check) {
    for (const [file, content] of changed) {
      const target = path.join(root, file);
      mkdirSync(path.dirname(target), { recursive: true });
      writeFileSync(`${target}.tmp`, content);
      renameSync(`${target}.tmp`, target);
    }
    for (const file of stale) unlinkSync(file);
  }
  return result;
};

export const watchDesignDocuments = (root: string, onChange: () => void): (() => void) => {
  let timer: ReturnType<typeof setTimeout>;
  const listeners = SYSTEM_IDS.map(id => {
    const file = path.join(root, "src/design-systems", id, "DESIGN.md");
    const listener = () => {
      clearTimeout(timer);
      timer = setTimeout(onChange, WATCH_DEBOUNCE_MS);
    };
    watchFile(file, { interval: WATCH_INTERVAL_MS }, listener);
    return () => unwatchFile(file, listener);
  });
  return () => {
    clearTimeout(timer);
    listeners.forEach(close => close());
  };
};
