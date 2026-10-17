export const CONFIG_FILE = "neus.config.json";
export const DERIVED_SYSTEM_FILE = "design/system/DESIGN.md";
export const SKILLS = ["neus-design", "neus-audit"];
export const AGENT_TARGETS = ["claude", "codex"];
export const COLOR_KEYS = ["primaryColor", "successColor", "errorColor", "infoColor"];
export const COLOR_PATTERN = /^#[0-9a-f]{6}$/i;
export const BLOCK_START = "<!-- neus-ui:start";
export const BLOCK_END = "<!-- neus-ui:end -->";
export const SCHEME_STORAGE_KEY = "neus-color-scheme";

// Open-license faces of each system. Apple's SF Pro is proprietary: it uses the system font stack.
export const SYSTEM_FONTS = {
  neus: "family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500",
  apple: null,
  carbon: "family=IBM+Plex+Sans:wght@400;600&family=IBM+Plex+Mono",
  material: "family=Roboto:wght@400;500",
  neobrutalism: "family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500",
  vercel: "family=Geist:wght@400;500;600;700&family=Geist+Mono",
};

// Subcommands of the `neus` bin; each module exports run(argv, root).
export const COMMANDS = {
  init: { module: "./init.mjs", summary: "Set up neus-ui, its theme files, skills and subagents" },
  shot: { module: "./shot.mjs", summary: "Screenshot routes of the app and report basic problems" },
};
