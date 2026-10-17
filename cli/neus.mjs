#!/usr/bin/env node
import { run } from "./init.mjs";

run(process.argv.slice(2)).then((code) => {
  process.exitCode = code;
}, (error) => {
  process.stderr.write(`neus: ${error.message}\n`);
  process.exitCode = 1;
});
