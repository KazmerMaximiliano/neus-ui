export const CONFIG_FILE = "neus.config.json";
export const DERIVED_SYSTEM_FILE = "design/system/DESIGN.md";
export const SKILLS = ["neus-design", "neus-audit"];
export const AGENT_TARGETS = ["claude", "codex"];
export const COLOR_KEYS = ["primaryColor", "successColor", "errorColor", "infoColor", "warningColor"];
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
  context: { module: "./context.mjs", summary: "Print the active system, catalog and rules to read before designing" },
  docs: { module: "./docs.mjs", summary: "Print the guide of one component or template" },
  lint: { module: "./lint.mjs", summary: "Check UI code against the neus contract and measure component coverage" },
};

// neus shot: working folder (self-ignored), viewports and problem thresholds.
export const NEUS_DIR = ".neus";
export const SHOT_WIDTHS = "1440,390";
export const SHOT_TIMEOUT_S = "60";
export const SHOT_VIEWPORT = { phoneMaxWidth: 480, phoneHeight: 844, height: 900 };
export const SHOT_LIMITS = { bodyFontPx: 16, solidCtasPerViewport: 1 };
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

// neus lint: what it reads by default and which raw elements a neus component replaces.
export const LINT_PATHS = ["src", "app", "pages", "components"];
export const LINT_IGNORED_DIRS = ["node_modules", "dist", "build", ".next", ".astro", ".neus", "generated", "coverage"];
export const LINT_EXTENSIONS = [".tsx", ".jsx", ".ts", ".js", ".mjs", ".css", ".astro"];
export const JSX_EXTENSIONS = [".tsx", ".jsx"];
// Written by neus init: the palette lives here, so they are never linted.
export const THEME_FILES = ["neus.theme.css", "neus.theme.ts"];
export const OVERRIDES_FILE = "neus.overrides.css";
export const LIBRARY_STYLESHEET = "neus-ui/dist/neus-ui.css";
export const RAW_TO_COMPONENT = {
  button: "Button or IconButton", input: "Input or Checkbox", select: "Select", dialog: "Modal",
  a: "Link, or Button with href", p: "Text", section: "Section", ul: "Grid or Stack as=\"ul\"", ol: "Stack as=\"ol\"",
  h1: "Heading", h2: "Heading", h3: "Heading", h4: "Heading", h5: "Heading", h6: "Heading",
  header: "SiteHeader (neus-ui/sections)", footer: "SiteFooter (neus-ui/sections)",
};
export const INTERACTIVE_ELEMENTS = ["Button", "IconButton", "Input", "Select", "MultiSelect", "Checkbox", "DateInput",
  "TimeInput", "Link", "Menu", "Dropdown", "button", "input", "select", "textarea", "a"];
export const FILLER_PATTERN =
  /lorem ipsum|\bacme\b|john doe|jane doe|feature (one|two|1|2)\b|elevate your|seamless|unlock the power|welcome back/i;
