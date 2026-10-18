import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { CONFIG_FILE } from "./neus.consts.mjs";
import { PACKAGE_ROOT, markdownSection, readJson } from "./neus.utils.mjs";

const HELP = `Usage: npx neus context [--for app|page]

Prints what to know before designing in this project, in one short read: the active
system's identity and rules, the key tokens, the component catalog, which component
answers which need, and the next commands. --for page adds the system's guidance for
public pages (layout, hero, features, testimonials).

Options:
  --for <surface>   app (default) or page
  -h, --help        Show this help`;

const read = (file) => readFileSync(path.join(PACKAGE_ROOT, file), "utf8");
// Citations and format notes help maintainers, not the agent reading the context.
const withoutSources = (section) => section?.split("\n")
  .filter((line) => !/^(Format|Design references|Reference)\b/.test(line)).join("\n").trim();
const catalog = (file) => [...read(file).matchAll(/^\| \[(\w+)\]\([^)]+\) \| (.+) \|$/gm)]
  .map(([, name, purpose]) => `- ${name}: ${purpose}`);

/** The context text for a project root; throws when the project has no neus.config.json. */
export const contextFor = (root, surface = "app") => {
  const config = readJson(path.join(root, CONFIG_FILE));
  if (!config) throw new Error(`No ${CONFIG_FILE} in ${root}. Run npx neus init first.`);
  const derived = config.derivedSystem && existsSync(path.join(root, config.derivedSystem));
  const design = derived
    ? readFileSync(path.join(root, config.derivedSystem), "utf8")
    : read(`src/design-systems/${config.designSystem}/DESIGN.md`);
  const system = derived ? `${config.derivedSystem} (derived from ${config.designSystem})` : `${config.designSystem} (locked)`;
  const sections = ["## Overview", "## Typography", ...(surface === "page"
    ? ["## Layout", "### Hero", "### Feature list", "### Testimonial"] : []), "## Do's and Don'ts"];
  const need = markdownSection(read("skills/neus-design/SKILL.md"), "### Need → component");

  return [
    `# neus-ui context (${surface})`,
    "",
    `System: ${system} · ${config.framework}, ${config.rendering} · ${config.colorScheme} · language ${config.language}` +
      ` · styles in ${config.paths?.styles ?? "?"}`,
    config.derivedSystem && !derived
      ? `\nNone mode: ${config.derivedSystem} does not exist yet. Derive the system before any screen.` : null,
    "",
    ...sections.map((heading) => withoutSources(markdownSection(design, heading))).filter(Boolean).flatMap((text) => [text, ""]),
    markdownSection(read("docs/design/tokens.md"), "## Key tokens"),
    "",
    "## Components",
    "",
    ...catalog("docs/components/README.md"),
    ...catalog("docs/templates/README.md"),
    "",
    need?.replace("### Need → component", "## Need → component"),
    "",
    "## Next",
    "",
    "- npx neus docs <Name>: usage, behavior, props and parts of one component (--full adds its tokens)",
    "- npx neus shot <route>: screenshots at 1440 and 390 px with the problems measured",
  ].filter((line) => line !== null && line !== undefined).join("\n");
};

export const run = async (argv, root = process.cwd()) => {
  const { values } = parseArgs({
    args: argv,
    options: { for: { type: "string", default: "app" }, help: { type: "boolean", short: "h" } },
  });
  if (values.help) {
    process.stdout.write(`${HELP}\n`);
    return 0;
  }
  if (!["app", "page"].includes(values.for)) throw new Error("--for takes app or page.");
  process.stdout.write(`${contextFor(root, values.for)}\n`);
  return 0;
};
