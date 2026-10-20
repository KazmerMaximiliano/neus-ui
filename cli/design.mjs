import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { CONFIG_FILE, SYSTEM_CSS_FILE, SYSTEM_CSS_ENTRIES } from "./neus.consts.mjs";
import { PACKAGE_ROOT, readJson, toPosix } from "./neus.utils.mjs";

const HELP = `Usage: npx neus design build

Validates the derived system named by derivedSystem in neus.config.json (a DESIGN.md
whose x-neus.extends names its base) and compiles its tokens and recipes into
<styles>/${SYSTEM_CSS_FILE}, scoped to the base system so it applies everywhere the
base does. Load it after neus-ui/dist/neus-ui.css and before neus.theme.css.

Action colors stay in npx neus init --primary <hex>.

Options:
  -h, --help   Show this help`;

/**
 * Every custom property the library CSS declares, and those the base system (or the Neus reset
 * that sits under every system) declares per color scheme. Selectors may be minified (no quotes).
 */
export const tokenSets = (css, base) => {
  const known = new Set();
  const schemeDependent = new Set();
  const ownSystem = new RegExp(`data-design-system=["']?${base}["']?\\]`);
  for (const [, selector, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const names = [...body.matchAll(/(--[\w-]+)\s*:/g)].map((match) => match[1]);
    for (const name of names) known.add(name);
    const scoped = !/data-design-system=/.test(selector) || ownSystem.test(selector);
    if (/data-color-scheme/.test(selector) && scoped) for (const name of names) schemeDependent.add(name);
  }
  return { known, schemeDependent };
};

/** Compiles the project's derived system; `core` is the package's design entry (dist/design.js). */
export const buildDesign = (root, core, css) => {
  const config = readJson(path.join(root, CONFIG_FILE));
  if (!config) throw new Error(`No ${CONFIG_FILE} here. Run npx neus init --system none first.`);
  if (!config.derivedSystem) {
    throw new Error(`${CONFIG_FILE} has no derivedSystem: this project uses the ${config.designSystem} system as it is. Run npx neus init --system none to derive one.`);
  }
  const source = path.join(root, config.derivedSystem);
  if (!existsSync(source)) throw new Error(`${config.derivedSystem} does not exist yet. Derive the system with the neus-design skill first.`);
  const document = core.parseDerivedDocument(readFileSync(source, "utf8"));
  const base = document["x-neus"].extends;
  if (base !== config.designSystem) {
    throw new Error(`${config.derivedSystem} extends ${base} but ${CONFIG_FILE} uses ${config.designSystem}. Run npx neus init --base ${base}.`);
  }
  const target = path.join(root, config.paths.styles, SYSTEM_CSS_FILE);
  writeFileSync(target, core.compileDerivedSystem(document, tokenSets(css, base)));
  const wired = SYSTEM_CSS_ENTRIES.some((file) => existsSync(path.join(root, file)) &&
    readFileSync(path.join(root, file), "utf8").includes(SYSTEM_CSS_FILE));
  return { file: toPosix(path.relative(root, target)), base, name: document.name, wired };
};

export const run = async (argv, root = process.cwd()) => {
  const { values, positionals } = parseArgs({ args: argv, allowPositionals: true, options: { help: { type: "boolean", short: "h" } } });
  if (values.help || positionals[0] !== "build") {
    process.stdout.write(`${HELP}\n`);
    return values.help ? 0 : 1;
  }
  const core = await import(new URL("../dist/design.js", import.meta.url).href);
  const css = readFileSync(path.join(PACKAGE_ROOT, "dist/neus-ui.css"), "utf8");
  const { file, base, name, wired } = buildDesign(root, core, css);
  process.stdout.write(`Compiled ${name} (derived from ${base}) into ${file}.\n` + (wired ? "" :
    `Import it once, after "neus-ui/dist/neus-ui.css" and before neus.theme.css (see the neus-design skill's frameworks.md).\n`));
  return 0;
};
