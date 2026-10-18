import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { PACKAGE_ROOT, markdownSection } from "./neus.utils.mjs";

const HELP = `Usage: npx neus docs <Name> [--full]

Prints the usage, behavior and accessibility, props and anatomy of one component or
template guide. --full prints the whole guide, including its CSS token tables.

Options:
  --full       Print the whole guide
  -h, --help   Show this help`;

const FOLDERS = ["docs/components", "docs/templates"];
const SECTIONS = ["## Usage", "## Behavior and accessibility", "## Props", "## Anatomy and per-part customization"];

/** Names of every component and template guide. */
export const guideNames = () => FOLDERS.flatMap((folder) => readdirSync(path.join(PACKAGE_ROOT, folder))
  .filter((file) => file.endsWith(".md") && file !== "README.md").map((file) => file.slice(0, -3))).sort();

/** The guide text for a name (any case), or null when there is no such guide. */
export const docsFor = (name, full = false) => {
  const match = guideNames().find((guide) => guide.toLowerCase() === name.toLowerCase());
  if (!match) return null;
  const file = FOLDERS.map((folder) => path.join(PACKAGE_ROOT, folder, `${match}.md`)).find(existsSync);
  const text = readFileSync(file, "utf8");
  if (full) return text.trim();
  return [`# ${match}`, ...SECTIONS.map((heading) => markdownSection(text, heading)).filter(Boolean)].join("\n\n");
};

export const run = async (argv) => {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: { full: { type: "boolean" }, help: { type: "boolean", short: "h" } },
  });
  if (values.help || !positionals.length) {
    process.stdout.write(`${HELP}\n`);
    return values.help ? 0 : 1;
  }
  const text = docsFor(positionals[0], values.full);
  if (!text) {
    process.stderr.write(`No guide named ${positionals[0]}. Guides: ${guideNames().join(", ")}.\n`);
    return 1;
  }
  process.stdout.write(`${text}\n`);
  return 0;
};
