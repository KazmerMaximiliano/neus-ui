#!/usr/bin/env node
import { banner } from "./banner.mjs";
import { COMMANDS } from "./neus.consts.mjs";
import { PACKAGE_ROOT, readJson } from "./neus.utils.mjs";

const HELP = `Usage: npx neus-ui <command> [options]

Commands:
${Object.entries(COMMANDS).map(([name, { summary }]) => `  ${name.padEnd(10)}${summary}`).join("\n")}

Run npx neus-ui <command> --help for its options; npx neus-ui --version prints the version.`;

const main = async (argv) => {
  const { version } = readJson(`${PACKAGE_ROOT}/package.json`);
  // The first known command wins, so flags may come before it (`neus-ui -y init`).
  const index = argv.findIndex((arg) => Object.hasOwn(COMMANDS, arg));
  if (index === -1 && ["-v", "--version"].includes(argv[0])) {
    process.stdout.write(`${version}\n`);
    return 0;
  }
  // Only people at a terminal see the banner; pipes, agents and --json get the report alone.
  if (process.stdout.isTTY && !argv.includes("--json")) {
    await banner({ suffix: "/ui", name: "neus-ui", version, tagline: "React components and an AI design kit" });
  }
  if (index === -1) {
    process.stdout.write(`${HELP}\n`);
    return argv.length && !["-h", "--help"].includes(argv[0]) ? 1 : 0;
  }
  const { run } = await import(COMMANDS[argv[index]].module);
  return run([...argv.slice(0, index), ...argv.slice(index + 1)]);
};

main(process.argv.slice(2)).then((code) => {
  process.exitCode = code;
}, (error) => {
  process.stderr.write(`neus-ui: ${error.message}\n`);
  process.exitCode = 1;
});
