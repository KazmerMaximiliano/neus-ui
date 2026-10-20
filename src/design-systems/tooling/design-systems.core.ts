import { parseDocument } from "yaml";
import {
  COLOR_MODES, COMPONENT_KEYS, DERIVED_EXTENSION_KEYS, DIMENSION_GROUPS, DIMENSION_PATTERN, DOCUMENT_KEYS,
  EXTENSION_KEYS, MODES, PALETTE_KEYS, PALETTE_VARIABLE_PATTERN, RECIPE_NAMES, REFERENCE_PATTERN,
  SECTION_NAMES, SYSTEM_IDS, TEXT_KEYS, TOKEN_GROUPS, TYPOGRAPHY_DIMENSIONS, TYPOGRAPHY_KEYS,
} from "./design-systems.consts";
import type { DerivedDocument, DesignDocument, ModeDeclarations, TokenValue } from "./design-systems.types";

// Pure DESIGN.md parsing and rendering, without the file system or the Google linter, so the
// `neus` CLI can validate and compile a project's derived system from the published package.

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

/** Front matter, the eight sections and the standard token groups shared by every DESIGN.md. */
const parseDocumentBody = (markdown: string, id: string): Record<string, unknown> => {
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
  return document;
};

export const parseDesignDocument = (markdown: string, id: string): DesignDocument => {
  const document = parseDocumentBody(markdown, id);
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

export const renderModes = (document: DesignDocument, values: ModeDeclarations, foundations = false): string => {
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


const derivedLocation = "design/system/DESIGN.md";

/**
 * A derived system: a DESIGN.md whose `x-neus.extends` names one of the six systems and whose
 * tokens and recipes override it. The action palette stays in `npx neus init`.
 */
export const parseDerivedDocument = (markdown: string): DerivedDocument => {
  const document = parseDocumentBody(markdown, derivedLocation);
  const extension = object(document["x-neus"], `${derivedLocation} x-neus`);
  if ("palette" in extension) {
    throw new Error(`${derivedLocation}: x-neus.palette is not allowed; set action colors with npx neus init --primary <hex>`);
  }
  if ("foundations" in extension || "id" in extension) {
    throw new Error(`${derivedLocation}: a derived system has no id or foundations; put every override in x-neus.tokens or x-neus.recipes`);
  }
  keys(extension, DERIVED_EXTENSION_KEYS, `${derivedLocation} x-neus`);
  if (!SYSTEM_IDS.includes(extension.extends as typeof SYSTEM_IDS[number])) {
    throw new Error(`${derivedLocation}: x-neus.extends must be one of ${SYSTEM_IDS.join(", ")}`);
  }
  if (extension.tokens !== undefined) modes(extension.tokens, `${derivedLocation} x-neus.tokens`, document);
  if (extension.recipes !== undefined) {
    const recipes = object(extension.recipes, `${derivedLocation} x-neus.recipes`);
    keys(recipes, RECIPE_NAMES, `${derivedLocation} x-neus.recipes`);
    for (const [name, values] of Object.entries(recipes)) modes(values, `${derivedLocation} x-neus.recipes.${name}`, document);
  }
  return document as DerivedDocument;
};

export type CompileOptions = {
  /** Every custom property the library defines; an override of anything else is a typo. */
  known: Set<string>;
  /** Properties the base system (or the Neus reset under it) sets per color scheme. */
  schemeDependent: Set<string>;
};

/**
 * CSS for a derived system, scoped to its base system's attribute so it applies at the root and
 * in every local provider. Loaded after the library stylesheet, equal-specificity rules win; the
 * light and dark blocks add the color-scheme attribute and win over the base's mode rules.
 */
export const compileDerivedSystem = (document: DerivedDocument, { known, schemeDependent }: CompileOptions): string => {
  const { extends: base, tokens = {}, recipes = {} } = document["x-neus"];
  const merged: ModeDeclarations = {};
  for (const group of [tokens, ...Object.values(recipes)]) {
    for (const mode of MODES) {
      for (const [name, value] of Object.entries(group[mode] ?? {})) {
        if (PALETTE_VARIABLE_PATTERN.test(name)) {
          throw new Error(`${derivedLocation}: ${name} is a palette variable; set action colors with npx neus init --primary <hex>`);
        }
        if (!known.has(name)) throw new Error(`${derivedLocation}: ${name} is not a neus-ui token`);
        if (mode === "base" && schemeDependent.has(name)) {
          throw new Error(`${derivedLocation}: ${name} changes with the color scheme in ${base}; set it under light and dark instead of base`);
        }
        (merged[mode] ??= {})[name] = value;
      }
    }
  }
  const selector = `[data-design-system="${base}"]`;
  const blocks = MODES.flatMap((mode) => {
    const declarations = Object.entries(merged[mode] ?? {});
    if (!declarations.length) return [];
    const scoped = mode === "base" ? selector : `${selector}[data-color-scheme="${mode}"]`;
    return [`${scoped} {\n${declarations.map(([name, value]) => `  ${name}: ${resolveReference(document, value)};`).join("\n")}\n}\n`];
  });
  return [`/* ${document.name}: derived from ${base}. Generated by npx neus design build from ${derivedLocation}; do not edit. */\n`, ...blocks].join("\n");
};
