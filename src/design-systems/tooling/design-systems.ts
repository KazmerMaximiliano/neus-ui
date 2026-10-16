import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateDesignSystems, watchDesignDocuments } from "./design-systems.utils";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const check = process.argv.includes("--check");
const watching = process.argv.includes("--watch");

const run = () => {
  try {
    const { artifacts, warnings } = generateDesignSystems(root, check);
    for (const warning of warnings) process.stderr.write(`${warning}\n`);
    process.stdout.write(`${check ? "Checked" : "Generated"} ${artifacts.size} design-system artifacts.\n`);
    return true;
  } catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
    return false;
  }
};

if (!run() && !watching) process.exitCode = 1;
if (watching) {
  const close = watchDesignDocuments(root, run);
  process.stdout.write("Watching six DESIGN.md documents.\n");
  process.once("SIGINT", close);
  process.once("SIGTERM", close);
}
