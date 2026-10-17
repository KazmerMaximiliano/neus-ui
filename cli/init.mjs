import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import {
  AGENT_TARGETS, BLOCK_END, BLOCK_START, COLOR_KEYS, COLOR_PATTERN, CONFIG_FILE,
  DERIVED_SYSTEM_FILE, SCHEME_STORAGE_KEY, SKILLS, SYSTEM_FONTS,
} from "./neus.consts.mjs";

const PACKAGE_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const TEMPLATES = path.join(PACKAGE_ROOT, "cli/templates");
// Root documents whose existing theme attributes `neus init` keeps in sync.
const ROOT_DOCUMENTS = ["app/layout.tsx", "src/app/layout.tsx", "pages/_document.tsx", "src/pages/_document.tsx", "app/root.tsx", "src/layouts/NeusLayout.astro"];

const HELP = `Usage: npx neus init [options]

Sets up neus-ui in this project: design system, palette, theme files and the
neus-design / neus-audit skills and neus-reviewer subagent for Claude Code and Codex.
Run it again to change the system or colors; it rewrites only managed files.

Options:
  -y, --yes                 Accept defaults (existing neus.config.json, then the flags) without prompting
  --system <id|none>        neus, apple, carbon, material, neobrutalism, vercel, or none to derive one with AI
  --base <id>               Base of a derived system; keeps derived mode
  --scheme <light|dark>     Initial color scheme
  --primary, --success, --error, --info <#rrggbb>   Action colors ("" restores the system's)
  --language <code>         Language of user-facing copy, for example es or en
  --agents <list>           claude, codex or claude,codex
  --styles <dir>            Folder for neus.theme.css and neus.overrides.css
  -h, --help                Show this help`;

const readJson = (file) => existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : null;
const toPosix = (value) => value.split(path.sep).join("/");
const importPath = (fromDir, file) => {
  const relative = toPosix(path.relative(fromDir, file));
  return relative.startsWith(".") ? relative : `./${relative}`;
};
const fill = (template, values) => template.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => values[key] ?? "");

/** Detects the host framework and how it renders from the project's package.json. */
export const detectProject = (root) => {
  const pkg = readJson(path.join(root, "package.json")) ?? {};
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (deps.next) {
    const appRouter = existsSync(path.join(root, "app")) || existsSync(path.join(root, "src/app"));
    return { framework: "next", rendering: appRouter ? "rsc" : "ssr" };
  }
  if (deps.astro) return { framework: "astro", rendering: "islands" };
  if (deps["@react-router/dev"]) return { framework: "react-router", rendering: "ssr" };
  if (deps["@tanstack/react-start"]) return { framework: "tanstack-start", rendering: "ssr" };
  if (deps["@remix-run/react"]) return { framework: "remix", rendering: "ssr" };
  if (deps.vite) return { framework: "vite", rendering: "spa" };
  return null;
};

/** Replaces the managed block in AGENTS.md, or appends it. */
export const upsertBlock = (text, block) => {
  const start = text.indexOf(BLOCK_START);
  const end = text.indexOf(BLOCK_END);
  if (start !== -1 && end > start) return text.slice(0, start) + block + text.slice(end + BLOCK_END.length);
  return `${text.trimEnd()}${text.trim() ? "\n\n" : ""}${block}\n`;
};

/** Rewrites existing data-design-system / data-color-scheme values; never inserts attributes. */
export const syncAttributes = (text, designSystem, colorScheme) => text
  .replace(/data-design-system="[^"]*"/g, `data-design-system="${designSystem}"`)
  .replace(/data-color-scheme="[^"]*"/g, `data-color-scheme="${colorScheme}"`);

export const fontHref = (designSystem) =>
  SYSTEM_FONTS[designSystem] ? `https://fonts.googleapis.com/css2?${SYSTEM_FONTS[designSystem]}&display=swap` : null;

const askChoice = async (rl, question, choices, fallback) => {
  const lines = choices.map((choice, index) => `  ${index + 1}. ${choice.label}${choice.value === fallback ? " (default)" : ""}`);
  const answer = (await rl.question(`${question}\n${lines.join("\n")}\n> `)).trim();
  if (!answer) return fallback;
  const picked = choices[Number(answer) - 1] ?? choices.find((choice) => choice.value === answer);
  if (picked) return picked.value;
  process.stdout.write("Unknown option, keeping the default.\n");
  return fallback;
};

const askColor = async (rl, label, fallback) => {
  for (;;) {
    const answer = (await rl.question(`${label} color (#rrggbb, empty for ${fallback ?? "the system's"}, "-" to reset): `)).trim();
    if (!answer) return fallback;
    if (answer === "-") return undefined;
    if (COLOR_PATTERN.test(answer)) return answer.toLowerCase();
    process.stdout.write("Use six-digit hex, for example #0f766e.\n");
  }
};

const resolveOptions = async (argv, root, theme) => {
  const { values } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      yes: { type: "boolean", short: "y" },
      system: { type: "string" },
      base: { type: "string" },
      scheme: { type: "string" },
      primary: { type: "string" },
      success: { type: "string" },
      error: { type: "string" },
      info: { type: "string" },
      language: { type: "string" },
      agents: { type: "string" },
      styles: { type: "string" },
    },
  });
  const ids = theme.DESIGN_SYSTEMS.map((system) => system.id);
  const previous = readJson(path.join(root, CONFIG_FILE)) ?? {};
  const detected = detectProject(root) ?? { framework: previous.framework, rendering: previous.rendering };
  const locale = Intl.DateTimeFormat().resolvedOptions().locale.split("-")[0];
  const config = {
    framework: detected.framework ?? "react",
    rendering: detected.rendering ?? "spa",
    designSystem: previous.designSystem ?? "neus",
    derivedSystem: previous.derivedSystem ?? null,
    colorScheme: previous.colorScheme ?? "light",
    colors: { ...previous.colors },
    language: previous.language ?? locale ?? "en",
    agents: previous.agents ?? [...AGENT_TARGETS],
    paths: { styles: previous.paths?.styles ?? (existsSync(path.join(root, "src")) ? "src/styles" : "styles") },
  };

  const fail = (message) => { throw new Error(message); };
  if (values.system === "none") config.derivedSystem = DERIVED_SYSTEM_FILE;
  else if (values.system) {
    if (!ids.includes(values.system)) fail(`Unknown system "${values.system}". Use one of: ${ids.join(", ")}, none.`);
    config.designSystem = values.system;
    config.derivedSystem = null;
  }
  if (values.base) {
    if (!ids.includes(values.base)) fail(`Unknown base "${values.base}". Use one of: ${ids.join(", ")}.`);
    config.designSystem = values.base;
    config.derivedSystem ??= DERIVED_SYSTEM_FILE;
  }
  if (values.scheme) {
    if (!["light", "dark"].includes(values.scheme)) fail("--scheme must be light or dark.");
    config.colorScheme = values.scheme;
  }
  for (const [flag, key] of [["primary", "primaryColor"], ["success", "successColor"], ["error", "errorColor"], ["info", "infoColor"]]) {
    if (values[flag] === undefined) continue;
    if (values[flag] === "") delete config.colors[key];
    else if (COLOR_PATTERN.test(values[flag])) config.colors[key] = values[flag].toLowerCase();
    else fail(`--${flag} must be a six-digit hex color such as #0f766e.`);
  }
  if (values.language) config.language = values.language;
  if (values.agents) {
    config.agents = values.agents.split(",").map((agent) => agent.trim()).filter(Boolean);
    const unknown = config.agents.filter((agent) => !AGENT_TARGETS.includes(agent));
    if (unknown.length || !config.agents.length) fail("--agents must be claude, codex or claude,codex.");
  }
  if (values.styles) config.paths.styles = toPosix(values.styles);

  if (!values.yes && process.stdin.isTTY) {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    try {
      if (!detectProject(root)) {
        config.rendering = await askChoice(rl, "How does this project render?", [
          { value: "spa", label: "Client-only React (Vite, SPA)" },
          { value: "ssr", label: "Server rendering (Next.js Pages Router, React Router, TanStack Start)" },
          { value: "rsc", label: "React Server Components (Next.js App Router)" },
          { value: "islands", label: "Islands (Astro)" },
        ], config.rendering);
      }
      const system = await askChoice(rl, "Design system:", [
        ...theme.DESIGN_SYSTEMS.map((item) => ({ value: item.id, label: `${item.name}: ${item.description}` })),
        { value: "none", label: "None: derive a system for this project with the neus-design skill" },
      ], config.derivedSystem ? "none" : config.designSystem);
      if (system === "none") config.derivedSystem = DERIVED_SYSTEM_FILE;
      else Object.assign(config, { designSystem: system, derivedSystem: null });
      config.colorScheme = await askChoice(rl, "Color scheme:", [
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
      ], config.colorScheme);
      const keep = await askChoice(rl, "Action colors:", [
        { value: "system", label: "Keep the system's colors (or the current ones)" },
        { value: "custom", label: "Choose primary, success, error and info" },
      ], "system");
      if (keep === "custom") {
        for (const key of COLOR_KEYS) {
          const color = await askColor(rl, key.replace("Color", ""), config.colors[key]);
          if (color) config.colors[key] = color;
          else delete config.colors[key];
        }
      }
      config.language = (await rl.question(`Language of user-facing copy (${config.language}): `)).trim() || config.language;
      config.agents = (await askChoice(rl, "Coding agents:", [
        { value: "claude,codex", label: "Claude Code and Codex" },
        { value: "claude", label: "Claude Code" },
        { value: "codex", label: "Codex" },
      ], config.agents.join(","))).split(",");
    } finally {
      rl.close();
    }
  }
  return config;
};

const write = (root, file, content, report, { keep = false } = {}) => {
  const target = path.join(root, file);
  const exists = existsSync(target);
  if (exists && keep) return report.push(`kept     ${file}`);
  if (exists && readFileSync(target, "utf8") === content) return report.push(`same     ${file}`);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, content);
  report.push(`${exists ? "updated" : "created"}  ${file}`);
};

const copyManaged = (root, from, to, report) => {
  const target = path.join(root, to);
  rmSync(target, { recursive: true, force: true });
  mkdirSync(path.dirname(target), { recursive: true });
  // Copies, not symlinks: symlinks need extra permissions on Windows.
  cpSync(path.join(PACKAGE_ROOT, from), target, { recursive: true });
  report.push(`managed  ${to}`);
};

/** Writes the configuration, theme files, skills, subagents and agent instructions. */
export const writeProject = (root, config, theme) => {
  const report = [];
  const styles = config.paths.styles;
  const header = "Generated by `npx neus init` from neus.config.json. Do not edit: run `npx neus init` again.";
  const hasColors = Object.keys(config.colors).length > 0;
  write(root, CONFIG_FILE, `${JSON.stringify(config, null, 2)}\n`, report);

  if (config.rendering === "spa") {
    const neusTheme = { designSystem: config.designSystem, colorScheme: config.colorScheme, colors: config.colors };
    write(root, "src/neus/neus.theme.ts", `// ${header}\nimport type { ColorScheme, DesignSystemId, ThemeConfig } from "neus-ui";\n\n` +
      `export const NEUS_THEME: { designSystem: DesignSystemId; colorScheme: ColorScheme; colors: ThemeConfig } = ${JSON.stringify(neusTheme, null, 2)};\n`, report);
    write(root, "src/neus/NeusRoot.tsx", readFileSync(path.join(TEMPLATES, "NeusRoot.tsx"), "utf8"), report, { keep: true });
  } else {
    write(root, `${styles}/neus.theme.css`, `/* ${header} */\n` + (hasColors
      ? theme.buildThemeCss(config.designSystem, config.colors)
      : `/* The ${config.designSystem} palette ships in neus-ui.css; this file holds custom colors only. */\n`), report);
  }
  write(root, `${styles}/neus.overrides.css`, `/* Project-wide neus token overrides. Loaded after neus-ui.css and neus.theme.css.\n` +
    `   Use the token names in node_modules/neus-ui/docs; never write palette variables here. */\n` +
    `:root[data-design-system="${config.designSystem}"] {\n}\n\n:root[data-design-system="${config.designSystem}"][data-color-scheme="dark"] {\n}\n`, report, { keep: true });

  if (config.rendering === "islands") {
    const fonts = fontHref(config.designSystem);
    const styleDir = importPath(path.join(root, "src/layouts"), path.join(root, styles));
    write(root, "src/layouts/NeusLayout.astro", fill(readFileSync(path.join(TEMPLATES, "NeusLayout.astro"), "utf8"), {
      LANG: config.language,
      SYSTEM: config.designSystem,
      SCHEME: config.colorScheme,
      STYLES: styleDir,
      STORAGE_KEY: SCHEME_STORAGE_KEY,
      FONTS: fonts ? `<link rel="stylesheet" href="${fonts}" />` : "",
    }), report, { keep: true });
  }
  for (const file of ROOT_DOCUMENTS) {
    const target = path.join(root, file);
    if (!existsSync(target)) continue;
    const text = readFileSync(target, "utf8");
    const synced = syncAttributes(text, config.designSystem, config.colorScheme);
    if (synced !== text) write(root, file, synced, report);
  }

  for (const agent of config.agents) {
    const skillsDir = agent === "claude" ? ".claude/skills" : ".agents/skills";
    for (const skill of SKILLS) copyManaged(root, `skills/${skill}`, `${skillsDir}/${skill}`, report);
    if (agent === "claude") copyManaged(root, "agents/neus-reviewer.md", ".claude/agents/neus-reviewer.md", report);
    else copyManaged(root, "agents/neus-reviewer.toml", ".codex/agents/neus-reviewer.toml", report);
  }

  const system = config.derivedSystem
    ? `a derived design system (\`${config.derivedSystem}\`, base \`${config.designSystem}\`)`
    : `the \`${config.designSystem}\` design system`;
  const block = fill(readFileSync(path.join(TEMPLATES, "agents-md-block.md"), "utf8"), { SYSTEM: system, STYLES: styles }).trimEnd();
  const agentsFile = path.join(root, "AGENTS.md");
  write(root, "AGENTS.md", upsertBlock(existsSync(agentsFile) ? readFileSync(agentsFile, "utf8") : "", block), report);
  if (config.agents.includes("claude")) {
    const claudeFile = path.join(root, "CLAUDE.md");
    const claude = existsSync(claudeFile) ? readFileSync(claudeFile, "utf8") : "";
    if (!/^@AGENTS\.md\s*$/m.test(claude)) write(root, "CLAUDE.md", `${claude.trimEnd()}${claude.trim() ? "\n\n" : ""}@AGENTS.md\n`, report);
  }
  return report;
};

/** Root document of each server-rendered host, relative to the project root. */
const rootDocument = (root, config) => {
  const src = (file) => existsSync(path.join(root, "src", path.dirname(file))) ? `src/${file}` : file;
  if (config.framework === "next") return config.rendering === "rsc" ? src("app/layout.tsx") : src("pages/_document.tsx");
  if (config.framework === "tanstack-start") return "src/routes/__root.tsx";
  return "app/root.tsx";
};

/** Wiring the project still needs, with paths already resolved. */
export const nextSteps = (root, config) => {
  const styles = config.paths.styles;
  const fonts = fontHref(config.designSystem);
  const fontLine = fonts ? `  Fonts: <link rel="stylesheet" href="${fonts}" />` : "  Fonts: the system font stack; nothing to load";
  let steps;
  if (config.rendering === "spa") {
    steps = [
      `  Entry file (src/main.tsx): import "neus-ui/dist/neus-ui.css", then "${importPath(path.join(root, "src"), path.join(root, styles, "neus.overrides.css"))}"`,
      "  Render <NeusRoot><App /></NeusRoot> from src/neus/NeusRoot.tsx",
      `${fontLine} in index.html`,
    ];
  } else if (config.rendering === "islands") {
    steps = ["  Use src/layouts/NeusLayout.astro as the layout of every page."];
  } else {
    const document = rootDocument(root, config);
    const from = path.join(root, path.dirname(document));
    const css = ["neus.theme.css", "neus.overrides.css"].map((file) => `"${importPath(from, path.join(root, styles, file))}"`);
    steps = [
      `  ${document}${document.endsWith("_document.tsx") ? " (stylesheets in pages/_app.tsx)" : ""}:`,
      `    <html lang="${config.language}" data-design-system="${config.designSystem}" data-color-scheme="${config.colorScheme}">`,
      `    import "neus-ui/dist/neus-ui.css", then ${css.join(", then ")}`,
      `  ${fontLine.trim()} in <head>`,
    ];
  }
  const invoke = config.agents.map((agent) => agent === "claude" ? "/neus-design in Claude Code" : "$neus-design in Codex").join(" or ");
  return ["", "Next steps:", ...steps, "", `Then design with ${invoke}${config.derivedSystem ? " (it starts by deriving your system)" : ""}.`,
    "The skill can finish this wiring for you."].join("\n");
};

export const run = async (argv, root = process.cwd()) => {
  const [command] = argv.filter((arg) => !arg.startsWith("-"));
  if (argv.includes("-h") || argv.includes("--help") || command !== "init") {
    process.stdout.write(`${HELP}\n`);
    return command === "init" || !command ? 0 : 1;
  }
  if (!existsSync(path.join(root, "package.json"))) throw new Error("Run `npx neus init` in the project root (no package.json here).");
  const theme = await import(new URL("../dist/theme.js", import.meta.url).href);
  const config = await resolveOptions(argv, root, theme);
  const report = writeProject(root, config, theme);
  process.stdout.write(`${report.join("\n")}\n${nextSteps(root, config)}\n`);
  return 0;
};
