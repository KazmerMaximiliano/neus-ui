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

// neus shot: working folder (self-ignored), viewports and problem thresholds.
export const NEUS_DIR = ".neus";
export const SHOT_WIDTHS = "1440,390";
export const SHOT_TIMEOUT_S = "60";
export const SHOT_VIEWPORT = { phoneMaxWidth: 480, phoneHeight: 844, height: 900 };
export const SHOT_LIMITS = { minBodyFontPx: 16, solidCtasPerViewport: 1 };
// Dev servers print their URL; these ports are probed only when the log shows none.
export const FRAMEWORK_PORTS = { next: 3000, astro: 4321, "tanstack-start": 3000, "react-router": 5173, vite: 5173 };
export const PORT_FALLBACK_AFTER_MS = 10_000;
export const LOCKFILES = [["pnpm-lock.yaml", "pnpm"], ["yarn.lock", "yarn"], ["bun.lock", "bun"], ["bun.lockb", "bun"]];
// Installed browsers, in order of preference; playwright never downloads one.
export const BROWSER_PATHS = {
  darwin: ["Google Chrome", "Microsoft Edge", "Chromium", "Brave Browser"],
  win32: ["Google\\Chrome\\Application\\chrome.exe", "Microsoft\\Edge\\Application\\msedge.exe", "Chromium\\Application\\chrome.exe"],
  linux: ["/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/opt/google/chrome/chrome", "/usr/bin/microsoft-edge",
    "/usr/bin/chromium", "/usr/bin/chromium-browser", "/snap/bin/chromium"],
};
// Generic families and OS faces that browsers do not expose by name; never reported as not loaded.
export const SYSTEM_FONT_FAMILIES = ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-sans-serif",
  "ui-serif", "ui-monospace", "ui-rounded", "-apple-system", "BlinkMacSystemFont", "emoji", "math", "fangsong",
  "SF Pro Display", "SF Pro Text", "Segoe UI"];
