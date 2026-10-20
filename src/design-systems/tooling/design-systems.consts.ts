export const SYSTEM_IDS = [
  "neus", "apple", "carbon", "material", "neobrutalism", "vercel",
] as const;

export const MODES = ["base", "light", "dark"] as const;
export const COLOR_MODES = ["light", "dark"] as const;
export const TEXT_KEYS = ["name", "description"] as const;
export const TOKEN_GROUPS = ["colors", "rounded", "spacing", "typography", "components"] as const;
export const DIMENSION_GROUPS = ["rounded", "spacing"] as const;
export const TYPOGRAPHY_DIMENSIONS = ["fontSize", "letterSpacing"] as const;
export const DOCUMENT_KEYS = [
  "version", "name", "description", ...TOKEN_GROUPS, "x-neus",
] as const;
export const EXTENSION_KEYS = ["id", "palette", "foundations", "tokens", "recipes"] as const;
export const DERIVED_EXTENSION_KEYS = ["extends", "tokens", "recipes"] as const;
// Variables npx neus init owns: a derived system never writes them.
export const PALETTE_VARIABLE_PATTERN = /^--color-(primary|success|error|info|warning)([a-z-]*)$|^--color-(text-on-[a-z-]+|focus)$/;
export const WATCH_INTERVAL_MS = 250;
export const WATCH_DEBOUNCE_MS = 100;

export const RECIPE_NAMES = [
  "badge", "button", "calendar", "card", "checkbox", "clock", "dropdown",
  "file-uploader", "icon-button", "input", "link", "modal", "overlay", "select",
  "sidebar", "stepper", "week-calendar", "interactive-map", "data-table", "templates",
  "typography", "layout", "media-placeholder", "alert", "avatar", "sections",
] as const;

export const SECTION_NAMES = [
  "Overview", "Colors", "Typography", "Layout", "Elevation & Depth", "Shapes",
  "Components", "Do's and Don'ts",
] as const;

export const PALETTE_KEYS = [
  "primary", "onPrimary", "hover", "active", "focus", "success", "error", "info", "warning",
] as const;

export const TYPOGRAPHY_KEYS = [
  "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", "fontFeature",
  "fontVariation",
] as const;

export const COMPONENT_KEYS = [
  "backgroundColor", "textColor", "typography", "rounded", "padding", "size", "height", "width",
] as const;

export const DIMENSION_PATTERN = /^-?(?:\d*\.)?\d+(?:px|rem|em)$/;
export const REFERENCE_PATTERN = /\{([\w.-]+)\}/g;
