import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import {
  CONFIG_FILE, FILLER_PATTERN, INTERACTIVE_ELEMENTS, JSX_EXTENSIONS, LIBRARY_STYLESHEET, LINT_EXTENSIONS,
  LINT_IGNORED_DIRS, LINT_PATHS, OVERRIDES_FILE, RAW_TO_COMPONENT, THEME_FILES,
} from "./neus.consts.mjs";
import { PACKAGE_ROOT, readJson, toPosix } from "./neus.utils.mjs";

const HELP = `Usage: npx neus lint [paths...] [--json]

Checks UI code against the neus-ui contract and measures how much of it uses neus
components. Default paths: ${LINT_PATHS.join(", ")} (those that exist).

P0: tokens that do not exist, raw colors outside ${OVERRIDES_FILE}, hand-written
    palette variables, inline colors on interactive components, private neus classes,
    !important, deep imports, theme owners the rendering mode does not allow.
P1: raw elements a neus component replaces, filler copy, emoji, third-party
    internals, the library stylesheet imported twice.
Info: // SAMPLE: content to replace before launch.

Coverage = neus component tags / (neus tags + raw elements a neus component replaces).

Options:
  --json       Print the report as JSON
  -h, --help   Show this help

Exit codes: 0 no P0, 1 at least one P0, 2 usage error or the library CSS is missing.`;

const lineAt = (text, index) => text.slice(0, index).split("\n").length;
const isCss = (file) => file.endsWith(".css");

/** Custom properties and classes a stylesheet defines. */
export const cssVocabulary = (css) => ({
  tokens: new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map((match) => match[1])),
  // Class names in selectors only: the text before each `{`, without strings or url() values.
  classes: new Set([...css.matchAll(/([^{}]+)\{/g)].flatMap(([, selector]) =>
    [...selector.replace(/url\([^)]*\)|"[^"]*"|'[^']*'/g, "").matchAll(/\.(-?[a-zA-Z_][\w-]*)/g)].map((match) => match[1]))),
});

/** Classes the guides document as parts or state selectors: the only ones project CSS may target. */
export const documentedClasses = (markdown) => new Set([...markdown.matchAll(/`([^`\n]+)`/g)]
  .flatMap(([, code]) => [...code.matchAll(/\.([a-zA-Z_][\w-]*)/g)].map((match) => match[1])));

/**
 * Lints files ({ file, text }, paths relative to the project) against the library vocabulary.
 * Pure: everything it needs comes in the arguments.
 */
export const lintFiles = (files, { tokens, classes, documented, allowedImports, rendering }) => {
  const findings = [];
  const samples = [];
  const coverage = {};
  const report = (file, line, severity, rule, message) => findings.push({ file, line, severity, rule, message });
  const declared = new Set(files.flatMap(({ text }) =>
    [...text.matchAll(/["']?(--[\w-]+)["']?\s*:/g)].map((match) => match[1])));
  const globalProviders = [];
  const stylesheetImports = [];

  for (const { file, text } of files) {
    const base = path.basename(file);
    if (THEME_FILES.includes(base)) continue;
    const lines = text.split("\n");
    let lastTag = null;
    lines.forEach((line, index) => {
      const at = index + 1;
      // ponytail: per-line regexes; a style prop on a later line is matched to the last tag opened above it.
      lastTag = [...line.matchAll(/<([A-Za-z][\w.]*)/g)].at(-1)?.[1] ?? lastTag;
      for (const [, token] of line.matchAll(/var\(\s*(--[\w-]+)\s*\)/g)) {
        if (!tokens.has(token) && !declared.has(token)) report(file, at, "P0", "unknown-token", `${token} is not a neus-ui token and is not declared in the project`);
      }
      if (/--color-(primary|success|error|info)[a-z-]*["']?\s*:|--color-(text-on-[a-z-]+|focus)["']?\s*:/.test(line)) {
        report(file, at, "P0", "palette", "palette variables belong to neus.theme.css and npx neus init");
      }
      if (line.includes("!important")) report(file, at, "P0", "important", "!important breaks the token cascade");
      if (/\b(\w*Style|style)=\{\{[^}]*\b(background|color|border)/.test(line) && INTERACTIVE_ELEMENTS.includes(lastTag)) {
        report(file, at, "P0", "inline-color", `inline color on <${lastTag}> overrides its hover, focus and disabled states; use a token`);
      }
      for (const [, specifier] of line.matchAll(/(?:from\s*|import\s*\(?\s*|@import\s+(?:url\()?)["'](neus-ui\/[^"']+)["']/g)) {
        if (!allowedImports.includes(specifier)) report(file, at, "P0", "deep-import", `${specifier} is not a public entry; import from "neus-ui"`);
      }
      if (line.includes(LIBRARY_STYLESHEET)) stylesheetImports.push({ file, line: at });
      if (base !== OVERRIDES_FILE && /#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|oklch\(/.test(line.replace(/var\([^)]*\)/g, ""))) {
        report(file, at, "P0", "raw-color", `raw color outside ${OVERRIDES_FILE}; use a semantic --color-* token`);
      }
      if (FILLER_PATTERN.test(line)) report(file, at, "P1", "filler", "filler copy; write specific copy for this product");
      if (!isCss(file) && /\p{Emoji_Presentation}|\p{Extended_Pictographic}️/u.test(line)) {
        report(file, at, "P1", "emoji", "emoji used as an icon; use a lucide-react icon");
      }
      if (/(\/\/|\{\/\*|\/\*)\s*SAMPLE:/.test(line)) samples.push({ file, line: at, text: line.trim() });
      if (isCss(file)) {
        if (/\.(ag|rdp|gm|pac)-[a-z]/.test(line)) report(file, at, "P1", "third-party", "selector on third-party internals; use the component's documented parts");
        const selector = line.includes("{") ? line.slice(0, line.indexOf("{")) : null;
        for (const [, name] of selector?.matchAll(/\.(-?[a-zA-Z_][\w-]*)/g) ?? []) {
          if (classes.has(name) && !documented.has(name)) report(file, at, "P0", "private-class", `.${name} is internal to neus-ui; style documented parts through their *ClassName props`);
        }
      }
    });

    if (JSX_EXTENSIONS.includes(path.extname(file))) {
      const neusNames = [...text.matchAll(/import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*["']neus-ui["']/g)]
        .flatMap(([, names]) => names.split(",").map((name) => name.trim().split(/\s+as\s+/).at(-1)))
        .filter((name) => /^[A-Z]/.test(name) && name !== "ThemeProvider");
      const neus = neusNames.reduce((sum, name) => sum + (text.match(new RegExp(`<${name}[\\s>/]`, "g"))?.length ?? 0), 0);
      let raw = 0;
      for (const match of text.matchAll(/<([a-z][a-z0-9]*)(?=[\s>/])/g)) {
        const component = RAW_TO_COMPONENT[match[1]];
        if (!component) continue;
        raw += 1;
        report(file, lineAt(text, match.index), "P1", "raw-element", `<${match[1]}>: use ${component}`);
      }
      if (neus + raw) coverage[file] = { neus, raw };
      for (const match of text.matchAll(/<ThemeProvider\b([^>]*)>/g)) {
        if (!/scope=["']local["']/.test(match[1])) globalProviders.push({ file, line: lineAt(text, match.index) });
      }
    }
  }

  const ownerLimit = rendering === "spa" ? 1 : 0;
  for (const owner of globalProviders.slice(ownerLimit)) {
    report(owner.file, owner.line, "P0", "theme-owner", rendering === "spa"
      ? "a second global ThemeProvider; the app has one in NeusRoot"
      : `no global ThemeProvider in ${rendering} rendering; <html> attributes and neus.theme.css own the theme, use scope="local"`);
  }
  if (stylesheetImports.length > 1) {
    for (const { file, line } of stylesheetImports) report(file, line, "P1", "stylesheet", `${LIBRARY_STYLESHEET} is imported in ${stylesheetImports.length} files; import it once`);
  }

  const total = Object.values(coverage).reduce((sum, { neus, raw }) => ({ neus: sum.neus + neus, raw: sum.raw + raw }), { neus: 0, raw: 0 });
  const ratio = ({ neus, raw }) => neus + raw ? Math.round((neus / (neus + raw)) * 100) : null;
  return {
    findings: findings.sort((a, b) => a.severity.localeCompare(b.severity) || a.file.localeCompare(b.file) || a.line - b.line),
    samples,
    coverage: {
      percent: ratio(total), ...total,
      files: Object.fromEntries(Object.entries(coverage).map(([file, counts]) => [file, { percent: ratio(counts), ...counts }])),
    },
  };
};

const walk = (target) => statSync(target).isDirectory()
  ? readdirSync(target).filter((entry) => !LINT_IGNORED_DIRS.includes(entry)).flatMap((entry) => walk(path.join(target, entry)))
  : LINT_EXTENSIONS.includes(path.extname(target)) ? [target] : [];

const formatReport = ({ files, findings, samples, coverage }) => {
  const p0 = findings.filter(({ severity }) => severity === "P0");
  const p1 = findings.filter(({ severity }) => severity === "P1");
  // Raw elements repeat on every line; one row per file and element keeps the report readable.
  const grouped = Object.values(Object.groupBy(p1, ({ file, message }) => `${file}\0${message}`)).map((group) =>
    `  ${group[0].file}:${group.map(({ line }) => line).join(",")}  ${group[0].message}${group.length > 1 ? ` (×${group.length})` : ""}`);
  return [
    `Linted ${files} file(s).`,
    p0.length ? `P0 (${p0.length}):` : "No P0.",
    ...p0.map(({ file, line, message }) => `  ${file}:${line}  ${message}`),
    ...(p1.length ? [`P1 (${p1.length}):`, ...grouped] : []),
    `Coverage: ${coverage.percent ?? "–"}% (${coverage.neus} neus components, ${coverage.raw} raw elements neus replaces)`,
    ...(samples.length ? [`SAMPLE content to replace before launch: ${samples.length} block(s).`] : []),
  ].join("\n");
};

export const run = async (argv, root = process.cwd()) => {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: { json: { type: "boolean" }, help: { type: "boolean", short: "h" } },
  });
  if (values.help) {
    process.stdout.write(`${HELP}\n`);
    return 0;
  }
  const cssFile = path.join(PACKAGE_ROOT, "dist/neus-ui.css");
  if (!existsSync(cssFile)) {
    process.stderr.write(`neus lint needs ${toPosix(path.relative(root, cssFile))}; reinstall neus-ui.\n`);
    return 2;
  }
  const targets = positionals.length ? positionals : LINT_PATHS.filter((entry) => existsSync(path.join(root, entry)));
  const missing = targets.find((target) => !existsSync(path.join(root, target)));
  if (missing || !targets.length) {
    process.stderr.write(`${missing ? `${missing} does not exist` : "No source folder found"}. Pass the paths to lint.\n`);
    return 2;
  }
  const docs = ["docs/components", "docs/templates", "docs/design"].flatMap((folder) =>
    readdirSync(path.join(PACKAGE_ROOT, folder)).filter((file) => file.endsWith(".md"))
      .map((file) => readFileSync(path.join(PACKAGE_ROOT, folder, file), "utf8"))).join("\n");
  const exportsMap = readJson(path.join(PACKAGE_ROOT, "package.json")).exports;
  const files = targets.flatMap((target) => walk(path.join(root, target)))
    .map((file) => ({ file: toPosix(path.relative(root, file)), text: readFileSync(file, "utf8") }));
  const result = lintFiles(files, {
    ...cssVocabulary(readFileSync(cssFile, "utf8")),
    documented: documentedClasses(docs),
    allowedImports: Object.keys(exportsMap).filter((key) => key !== ".").map((key) => `neus-ui/${key.slice(2)}`),
    rendering: readJson(path.join(root, CONFIG_FILE))?.rendering ?? "spa",
  });
  const report = { files: files.length, ...result };
  process.stdout.write(`${values.json ? JSON.stringify(report, null, 2) : formatReport(report)}\n`);
  return result.findings.some(({ severity }) => severity === "P0") ? 1 : 0;
};
