import type { DesignSystemId } from "../../design-systems";
import { DESIGN_SYSTEM_PALETTES } from "../../design-systems/design-systems.consts";
import { resolvePalette } from "../../utils/resolvePalette";
import type { ColorScheme, ThemeConfig } from "./ThemeProvider.types";

export const resolveTheme = (
  designSystem: DesignSystemId,
  scheme: ColorScheme,
  overrides: ThemeConfig,
) => resolvePalette(DESIGN_SYSTEM_PALETTES[designSystem][scheme], scheme, overrides);

/**
 * Static equivalent of a global ThemeProvider: the resolved palette for both
 * color schemes as CSS, for server-rendered pages that set
 * `data-design-system` and `data-color-scheme` on `<html>` themselves.
 */
export const buildThemeCss = (designSystem: DesignSystemId, overrides: ThemeConfig = {}) =>
  (["light", "dark"] as const).map((scheme) => {
    const { variables } = resolveTheme(designSystem, scheme, overrides);
    const declarations = Object.entries(variables).map(([name, value]) => `  ${name}: ${value};`).join("\n");
    return `:root[data-design-system="${designSystem}"][data-color-scheme="${scheme}"] {\n${declarations}\n}\n`;
  }).join("\n");

export const applyTheme = (
  element: HTMLElement,
  designSystem: DesignSystemId,
  scheme: ColorScheme,
  variables: Record<string, string>,
) => {
  const attributes = {
    "data-design-system": designSystem,
    "data-color-scheme": scheme,
  };
  const previousAttributes = Object.keys(attributes).map((name) => [name, element.getAttribute(name)] as const);
  const previous = Object.keys(variables).map((name) => ({
    name,
    value: element.style.getPropertyValue(name),
    priority: element.style.getPropertyPriority(name),
  }));
  for (const [name, value] of Object.entries(attributes)) element.setAttribute(name, value);
  for (const [name, value] of Object.entries(variables)) element.style.setProperty(name, value);

  return () => {
    for (const { name, value, priority } of previous) {
      if (value) element.style.setProperty(name, value, priority);
      else element.style.removeProperty(name);
    }
    for (const [name, value] of previousAttributes) {
      if (value === null) element.removeAttribute(name);
      else element.setAttribute(name, value);
    }
  };
};
