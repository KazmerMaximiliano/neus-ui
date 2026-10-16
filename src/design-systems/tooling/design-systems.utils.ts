import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, unlinkSync, unwatchFile, watchFile, writeFileSync } from "node:fs";
import path from "node:path";
import { lint } from "@google/design.md/linter";
import { parseDocument } from "yaml";
import type { DesignDocument, GenerationResult, ModeDeclarations, TokenValue } from "./design-systems.types";
import {
  COLOR_MODES, COMPONENT_KEYS, DIMENSION_GROUPS, DIMENSION_PATTERN, DOCUMENT_KEYS,
  EXTENSION_KEYS, MODES, PALETTE_KEYS, RECIPE_NAMES, REFERENCE_PATTERN,
  SECTION_NAMES, SYSTEM_IDS, TEXT_KEYS, TOKEN_GROUPS, TYPOGRAPHY_DIMENSIONS, TYPOGRAPHY_KEYS,
  WATCH_DEBOUNCE_MS, WATCH_INTERVAL_MS,
} from "./design-systems.consts";

const object = (value: unknown, location: string): Record<string, unknown> => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${location}: expected an object`);
  }
  return value as Record<string, unknown>;
};

const keys = (value: Record<string, unknown>, allowed: readonly string[], location: string) => {
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) throw new Error(`${location}: unknown key ${key}`);
  }
};

const scalar = (value: unknown, location: string): TokenValue => {
  if ((typeof value !== "string" || !value.trim()) &&
    (typeof value !== "number" || !Number.isFinite(value))) {
    throw new Error(`${location}: expected a nonempty string or finite number`);
  }
  return value as TokenValue;
};

/** Resolve document references; CSS var() dependencies deliberately stay dynamic. */
export const resolveReference = (
  document: unknown,
  value: TokenValue,
  chain: string[] = [],
): string => String(value).replace(REFERENCE_PATTERN, (_, reference: string) => {
  if (chain.includes(reference)) throw new Error(`Cyclic reference: ${[...chain, reference].join(" -> ")}`);
  let target: unknown = document;
  for (const segment of reference.split(".")) {
    const group = object(target, reference);
    if (!Object.hasOwn(group, segment)) throw new Error(`Missing reference: ${reference}`);
    target = group[segment];
  }
  return resolveReference(document, scalar(target, reference), [...chain, reference]);
});

const modes = (value: unknown, location: string, document: unknown) => {
  const group = object(value, location);
  keys(group, MODES, location);
  for (const [mode, values] of Object.entries(group)) {
    for (const [name, value] of Object.entries(object(values, `${location}.${mode}`))) {
      if (!/^--[a-z][a-z0-9-]*$/.test(name)) throw new Error(`${location}: invalid CSS variable ${name}`);
      const resolved = resolveReference(document, scalar(value, `${location}.${mode}.${name}`));
      if (/[;{}]/.test(resolved) || /!important\s*$/i.test(resolved)) {
        throw new Error(`${location}.${mode}.${name}: expected a CSS value without declarations`);
      }
    }
  }
};

/** Parse and validate both the Google document and the scoped Neus extension. */
export const parseDesignDocument = (markdown: string, id: string): DesignDocument => {
  const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatter) throw new Error(`${id}: missing YAML front matter`);
  const parsed = parseDocument(frontmatter[1], { uniqueKeys: true });
  if (parsed.errors.length) throw new Error(`${id}: ${parsed.errors.map(error => error.message).join("; ")}`);
  const document = object(parsed.toJS({ maxAliasCount: 0 }), id);
  keys(document, DOCUMENT_KEYS, id);
  if (document.version !== "alpha") throw new Error(`${id}: version must be alpha`);
  for (const field of TEXT_KEYS) {
    if (typeof document[field] !== "string" || !document[field].trim()) throw new Error(`${id}.${field}: expected text`);
  }
  const sections = [...markdown.slice(frontmatter[0].length).matchAll(/^## (.+)$/gm)].map(match => match[1].trim());
  if (JSON.stringify(sections) !== JSON.stringify(SECTION_NAMES)) {
    throw new Error(`${id}: expected the eight Google sections in canonical order`);
  }
  for (const section of TOKEN_GROUPS) {
    object(document[section], `${id}.${section}`);
  }
  for (const [name, color] of Object.entries(object(document.colors, "colors"))) {
    if (typeof color !== "string") throw new Error(`${id}.colors.${name}: expected a CSS color`);
    resolveReference(document, color);
  }
  for (const section of DIMENSION_GROUPS) {
    for (const [name, value] of Object.entries(object(document[section], section))) {
      const resolved = resolveReference(document, scalar(value, `${section}.${name}`));
      if (!(section === "spacing" && typeof value === "number") && !DIMENSION_PATTERN.test(resolved)) {
        throw new Error(`${id}.${section}.${name}: expected a dimension`);
      }
    }
  }
  for (const [name, value] of Object.entries(object(document.typography, "typography"))) {
    const role = object(value, `typography.${name}`);
    keys(role, TYPOGRAPHY_KEYS, `typography.${name}`);
    for (const [property, token] of Object.entries(role)) {
      const resolved = resolveReference(document, scalar(token, `typography.${name}.${property}`));
      if (TYPOGRAPHY_DIMENSIONS.some(dimension => dimension === property) && !DIMENSION_PATTERN.test(resolved)) {
        throw new Error(`${id}.typography.${name}.${property}: expected a dimension`);
      }
      if (property === "fontWeight" && !/^\d+$/.test(resolved)) throw new Error(`${id}: invalid font weight`);
      if (property === "lineHeight" && !DIMENSION_PATTERN.test(resolved) && !/^\d+(\.\d+)?$/.test(resolved)) {
        throw new Error(`${id}: invalid line height`);
      }
    }
  }
  for (const [name, values] of Object.entries(object(document.components, "components"))) {
    const component = object(values, `components.${name}`);
    keys(component, COMPONENT_KEYS, `components.${name}`);
    for (const [property, token] of Object.entries(component)) {
      if (property === "typography" && typeof token === "string" && /^\{typography\.[\w-]+\}$/.test(token)) {
        const role = token.slice(1, -1).split(".")[1];
        if (!Object.hasOwn(object(document.typography, "typography"), role)) throw new Error(`Missing reference: ${token}`);
      } else resolveReference(document, scalar(token, `components.${name}.${property}`));
    }
  }
  const extension = object(document["x-neus"], `${id}.x-neus`);
  keys(extension, EXTENSION_KEYS, `${id}.x-neus`);
  if (!SYSTEM_IDS.includes(id as typeof SYSTEM_IDS[number]) || extension.id !== id) throw new Error(`${id}: invalid system identifier`);
  const palette = object(extension.palette, `${id}.palette`);
  keys(palette, COLOR_MODES, `${id}.palette`);
  for (const mode of COLOR_MODES) {
    const values = object(palette[mode], `${id}.palette.${mode}`);
    keys(values, PALETTE_KEYS, `${id}.palette.${mode}`);
    if (!values.primary || !values.onPrimary) throw new Error(`${id}.palette.${mode}: primary and onPrimary are required`);
    for (const [name, value] of Object.entries(values)) {
      const color = resolveReference(document, scalar(value, `${id}.palette.${mode}.${name}`));
      if (!/^#[\da-f]{6}$/i.test(color)) throw new Error(`${id}.palette.${mode}.${name}: expected a six-digit hex color`);
    }
  }
  if (id === "neus") {
    modes(extension.foundations, `${id}.foundations`, document);
    if (!object(extension.foundations, "foundations").base) throw new Error("Neus foundations need a base reset");
  } else if (extension.foundations !== undefined) throw new Error(`${id}: only Neus owns foundations`);
  modes(extension.tokens, `${id}.tokens`, document);
  const recipes = object(extension.recipes, `${id}.recipes`);
  keys(recipes, RECIPE_NAMES, `${id}.recipes`);
  for (const name of RECIPE_NAMES) modes(recipes[name], `${id}.recipes.${name}`, document);
  return document as DesignDocument;
};

const renderModes = (document: DesignDocument, values: ModeDeclarations, foundations = false): string => {
  const id = document["x-neus"].id;
  return MODES.flatMap(mode => {
    const declarations = values[mode];
    if (!declarations || !Object.keys(declarations).length) return [];
    let selector = `[data-design-system="${id}"]`;
    if (id === "neus") {
      selector = mode === "base" ? ":root,\n[data-design-system]" : `[data-color-scheme="${mode}"]`;
    } else if (mode !== "base") selector += `[data-color-scheme="${mode}"]`;
    if (foundations && id !== "neus") throw new Error("Foundations belong to Neus");
    return [`${selector} {\n${Object.entries(declarations).map(([name, value]) =>
      `  ${name}: ${resolveReference(document, value)};`).join("\n")}\n}\n`];
  }).join("\n");
};

/** Build every artifact in memory before any file can be changed. */
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
    if (extension.foundations) artifacts.set(`${directory}/foundations.css`, header + renderModes(document, extension.foundations, true));
    artifacts.set(`${directory}/tokens.css`, header + renderModes(document, extension.tokens));
    for (const name of RECIPE_NAMES) {
      artifacts.set(`${directory}/recipes/${name}.css`, header + renderModes(document, extension.recipes[name]));
    }
    artifacts.set(`${directory}/index.css`, header + ["tokens", ...RECIPE_NAMES.map(name => `recipes/${name}`)]
      .map(name => `@import "./${name}.css";`).join("\n") + "\n");
    const palette = Object.fromEntries(Object.entries(extension.palette).map(([mode, entries]) => [mode,
      Object.fromEntries(Object.entries(entries).map(([name, value]) => [name, resolveReference(document, value)])),
    ]));
    artifacts.set(`${directory}/${id}.consts.ts`, `${header}import type { DesignSystemPalette } from "../../design-systems.types";\n\n` +
      `export const ${id.toUpperCase()}_METADATA = ${JSON.stringify({ id, name: document.name, description: document.description, source }, null, 2)} as const;\n\n` +
      `export const ${id.toUpperCase()}_PALETTE: DesignSystemPalette = ${JSON.stringify(palette, null, 2)};\n`);
  }
  return { artifacts, warnings };
};

const generatedFiles = (directory: string): string[] => existsSync(directory)
  ? readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory()
    ? generatedFiles(path.join(directory, entry.name)) : [path.join(directory, entry.name)]) : [];

/** Check mode is read-only; generation only owns files inside generated directories. */
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

/** Poll six paths to support atomic saves and volumes without native file events. */
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
