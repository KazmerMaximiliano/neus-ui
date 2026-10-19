import type { ActionPalette } from "../design-systems/design-systems.types";
import type { ColorScheme, ColorVariants, ThemeColors, ThemeConfig } from "../providers/ThemeProvider/ThemeProvider.types";
import { getDarkenColor } from "./getDarkenColor";
import { hexToRgb } from "./hexToRgb";

const colorVariants = (color: string, scheme: ColorScheme): ColorVariants => {
  const rgb = hexToRgb(color);
  return {
    main: color,
    light: rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${scheme === "dark" ? 0.15 : 0.1})` : color,
    dark: rgb ? getDarkenColor(color, 15) : color,
  };
};

const onColor = (color: string, fallback: string): string => {
  const rgb = hexToRgb(color);
  if (!rgb) return fallback;
  const linear = [rgb.r, rgb.g, rgb.b].map((channel) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  const luminance = linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
  return (luminance + 0.05) / 0.05 >= 1.05 / (luminance + 0.05) ? "#000000" : "#ffffff";
};

/**
 * Resolves one action palette and the runtime color overrides into theme
 * colors and the CSS variables ThemeProvider writes. Pure: it does not read
 * the generated palettes, so the design-system generator can reuse it.
 */
export const resolvePalette = (
  palette: ActionPalette,
  scheme: ColorScheme,
  overrides: ThemeConfig,
) => {
  const isDark = scheme === "dark";
  const primary = colorVariants(overrides.primaryColor ?? palette.primary, scheme);
  if (!overrides.primaryColor && palette.hover) primary.dark = palette.hover;

  const colors: ThemeColors = {
    primary,
    success: colorVariants(overrides.successColor ?? palette.success ?? (isDark ? "#66bb6a" : "#4caf50"), scheme),
    error: colorVariants(overrides.errorColor ?? palette.error ?? (isDark ? "#ef5350" : "#f44336"), scheme),
    info: colorVariants(overrides.infoColor ?? palette.info ?? primary.main, scheme),
    warning: colorVariants(overrides.warningColor ?? palette.warning ?? (isDark ? "#ffa726" : "#ed6c02"), scheme),
    white: "#ffffff",
    black: "#000000",
    gray: isDark
      ? { 900: "#e2e8f0", 700: "#94a3b8", 600: "#64748b", 500: "#475569", 400: "#64748b", 300: "#334155", 200: "#1e293b", 150: "#1a2235", 100: "#2a2a3d" }
      : { 900: "#333333", 700: "#475569", 600: "#666666", 500: "#64748b", 400: "#6b7280", 300: "#cbd5e1", 200: "#e0e0e0", 150: "#e5e7eb", 100: "#f9fafb" },
    borderLight: isDark ? "rgba(255, 255, 255, 0.1)" : primary.light,
    shadow: `rgba(0, 0, 0, ${isDark ? 0.4 : 0.1})`,
  };

  const variables: Record<string, string> = {
    "--color-text-on-primary": overrides.primaryColor ? onColor(primary.main, palette.onPrimary) : palette.onPrimary,
    "--color-primary-active": overrides.primaryColor ? primary.dark : palette.active ?? primary.dark,
    "--color-focus": overrides.primaryColor ? "color-mix(in srgb, var(--color-primary) 25%, var(--color-text-primary))" : palette.focus ?? primary.main,
    "--color-border-light": colors.borderLight,
    "--color-shadow": colors.shadow,
  };

  if (overrides.primaryColor) variables["--color-primary-text"] = "color-mix(in srgb, var(--color-primary) 25%, var(--color-text-primary))";

  for (const name of ["primary", "success", "error", "info", "warning"] as const) {
    variables[`--color-${name}`] = colors[name].main;
    variables[`--color-${name}-light`] = colors[name].light;
    variables[`--color-${name}-dark`] = colors[name].dark;
    if (name !== "primary") variables[`--color-text-on-${name}`] = onColor(colors[name].main, palette.onPrimary);
    variables[`--color-text-on-${name}-hover`] = onColor(colors[name].dark, palette.onPrimary);
    variables[`--color-text-on-${name}-active`] = onColor(
      name === "primary" ? variables["--color-primary-active"] : colors[name].dark,
      palette.onPrimary,
    );
  }

  return { colors, variables };
};
