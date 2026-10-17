#!/usr/bin/env node
import { COMMANDS } from "./neus.consts.mjs";

const HELP = `Usage: npx neus <command> [options]

Commands:
${Object.entries(COMMANDS).map(([name, { summary }]) => `  ${name.padEnd(8)}${summary}`).join("\n")}

Run npx neus <command> --help for its options.`;

const main = async (argv) => {
  // The first known command wins, so flags may come before it (`neus -y init`).
  const index = argv.findIndex((arg) => Object.hasOwn(COMMANDS, arg));
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
  process.stderr.write(`neus: ${error.message}\n`);
  process.exitCode = 1;
});
