import { DESIGN_SYSTEM_PALETTES } from "../../design-systems/palettes";
import { getDarkenColor, hexToRgb } from "../../utils";
import type { DesignSystemId } from "../../design-systems";
import type { ColorScheme, ColorVariants, ThemeColors, ThemeConfig } from "./ThemeProvider.types";

const colorVariants = (color: string, scheme: ColorScheme): ColorVariants => {
  const rgb = hexToRgb(color);
  return {
    main: color,
    light: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${scheme === "dark" ? 0.15 : 0.1})` : color,
    dark: rgb ? getDarkenColor(color, 15) : color,
  };
};

/** Resolve a palette once for the context and the DOM, including user overrides. */
export const resolveTheme = (
  designSystem: DesignSystemId,
  scheme: ColorScheme,
  overrides: ThemeConfig,
) => {
  const palette = DESIGN_SYSTEM_PALETTES[designSystem][scheme];
  const isDark = scheme === "dark";
  const primary = colorVariants(overrides.primaryColor ?? palette.primary, scheme);
  if (!overrides.primaryColor && palette.hover) primary.dark = palette.hover;

  const colors: ThemeColors = {
    primary,
    success: colorVariants(overrides.successColor ?? palette.success ?? (isDark ? "#66bb6a" : "#4caf50"), scheme),
    error: colorVariants(overrides.errorColor ?? palette.error ?? (isDark ? "#ef5350" : "#f44336"), scheme),
    info: colorVariants(overrides.infoColor ?? palette.info ?? primary.main, scheme),
    white: "#ffffff",
    black: "#000000",
    gray: isDark
      ? { 900: "#e2e8f0", 700: "#94a3b8", 600: "#64748b", 500: "#475569", 400: "#64748b", 300: "#334155", 200: "#1e293b", 150: "#1a2235", 100: "#2a2a3d" }
      : { 900: "#333333", 700: "#475569", 600: "#666666", 500: "#64748b", 400: "#6b7280", 300: "#cbd5e1", 200: "#e0e0e0", 150: "#e5e7eb", 100: "#f9fafb" },
    borderLight: isDark ? "rgba(255, 255, 255, 0.1)" : primary.light,
    shadow: `rgba(0, 0, 0, ${isDark ? 0.4 : 0.1})`,
  };

  const variables: Record<string, string> = {
    "--color-text-on-primary": palette.onPrimary,
    "--color-primary-active": overrides.primaryColor ? primary.dark : palette.active ?? primary.dark,
    "--color-focus": overrides.primaryColor ?? palette.focus ?? primary.main,
    "--color-border-light": colors.borderLight,
    "--color-shadow": colors.shadow,
  };

  for (const name of ["primary", "success", "error", "info"] as const) {
    variables[`--color-${name}`] = colors[name].main;
    variables[`--color-${name}-light`] = colors[name].light;
    variables[`--color-${name}-dark`] = colors[name].dark;
  }

  return { colors, variables };
};

/** Apply owned properties only, restoring the previous DOM state on cleanup. */
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
