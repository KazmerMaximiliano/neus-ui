#!/usr/bin/env node
// Scores one evaluation run and rebuilds the summary of its label. See README.md.
// Usage: node eval/score.mjs <project> --brief <id> --label <label> [--url <base>]
//        node eval/score.mjs --label <label>   (summary only, after editing scores.json)
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";

const EVAL = import.meta.dirname;
const NEUS = path.join(EVAL, "../cli/neus.mjs");
const AXES = ["hierarchy", "composition", "fidelity", "substance", "responsive", "polish"];
// Project files that hold what the session wrote, copied for later re-scoring.
const CODE = ["src", "app", "pages", "design", "index.html", "neus.config.json"];
const PHASE_1 = { designSystem: "neus", primary: "#283593", font: "Manrope" };

const readJson = (file) => existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : null;
const fail = (message) => {
  process.stderr.write(`${message}\n`);
  process.exit(1);
};

const briefs = Object.fromEntries(readdirSync(path.join(EVAL, "briefs")).map((file) => {
  const text = readFileSync(path.join(EVAL, "briefs", file), "utf8");
  const meta = Object.fromEntries([...text.match(/^---\n([\s\S]*?)\n---/)[1].matchAll(/^(\w+):\s*(.+)$/gm)]
    .map(([, key, value]) => [key, value.trim()]));
  return [meta.id, meta];
}));

const neus = (project, args) => execFileSync(process.execPath, [NEUS, ...args],
  { cwd: project, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] });

// neus lint exits with 1 when it finds a P0; the report is on stdout either way.
const lint = (dir) => {
  try {
    return JSON.parse(neus(dir, ["lint", "--json"]));
  } catch (error) {
    if (error.status === 1) return JSON.parse(error.stdout);
    fail(`neus lint failed in ${dir} (exit ${error.status}). Run pnpm build first.`);
  }
};
const lintSummary = ({ findings, coverage }) => ({
  p0: findings.filter(({ severity }) => severity === "P0").length,
  p1: findings.filter(({ severity }) => severity === "P1").length,
  coverage: coverage.percent,
});

const score = (project, id, label, url) => {
  const brief = briefs[id] ?? fail(`Unknown brief "${id}". Briefs: ${Object.keys(briefs).join(", ")}.`);
  if (!existsSync(path.join(project, "package.json"))) fail(`${project} is not a project (no package.json).`);
  const dir = path.join(EVAL, "runs", label, id);
  let report;
  try {
    report = JSON.parse(neus(project, ["shot", brief.route, "--json", ...(url ? ["--url", url] : [])]));
  } catch (error) {
    fail(error.status === 2 ? "neus shot found no browser or playwright-core." : `neus shot failed (exit ${error.status}).`);
  } finally {
    if (!url) neus(project, ["shot", "--stop"]);
  }

  for (const folder of ["shots", "code"]) rmSync(path.join(dir, folder), { recursive: true, force: true });
  mkdirSync(path.join(dir, "shots"), { recursive: true });
  for (const page of report.pages) {
    cpSync(path.join(project, page.file), path.join(dir, "shots", path.basename(page.file)));
    page.file = `shots/${path.basename(page.file)}`;
  }
  for (const entry of CODE) {
    if (existsSync(path.join(project, entry))) cpSync(path.join(project, entry), path.join(dir, "code", entry), { recursive: true });
  }
  writeFileSync(path.join(dir, "metrics.json"), `${JSON.stringify({ project: path.resolve(project), ...report, lint: lint(project) }, null, 2)}\n`);
  // Human scores survive re-scoring; the template is written once.
  if (!existsSync(path.join(dir, "scores.json"))) {
    const template = { axes: Object.fromEntries(AXES.map((axis) => [axis, null])), versus: null, readScreenshots: null, notes: "" };
    writeFileSync(path.join(dir, "scores.json"), `${JSON.stringify(template, null, 2)}\n`);
  }
  process.stdout.write(`Saved runs/${label}/${id}: ${report.problems.length} problem(s) measured.\n`);
};

const summarize = (label) => {
  const root = path.join(EVAL, "runs", label);
  const runs = (existsSync(root) ? readdirSync(root) : []).filter((id) => existsSync(path.join(root, id, "metrics.json"))).sort()
    .map((id) => ({ id, brief: briefs[id] ?? {}, metrics: readJson(path.join(root, id, "metrics.json")), scores: readJson(path.join(root, id, "scores.json")) ?? {} }));
  if (!runs.length) fail(`No scored runs in runs/${label}.`);
  // Runs saved before neus lint existed are linted from their copied code.
  for (const { id, metrics } of runs) {
    if (metrics.lint) continue;
    metrics.lint = lint(path.join(root, id, "code"));
    writeFileSync(path.join(root, id, "metrics.json"), `${JSON.stringify(metrics, null, 2)}\n`);
  }

  const rows = runs.map(({ id, brief, metrics, scores }) => {
    const { theme } = metrics.pages[0];
    const minBody = Math.min(...metrics.pages.map((page) => page.minBodyFontPx ?? Infinity));
    const axes = AXES.map((axis) => scores.axes?.[axis]).filter(Number.isFinite);
    const { p0, coverage } = lintSummary(metrics.lint);
    return [id, brief.surface, [theme.designSystem, theme.primary, theme.font].join(" · "), Number.isFinite(minBody) ? `${minBody}px` : "–",
      `${coverage ?? "–"}%`, p0, metrics.problems.length, axes.length ? (axes.reduce((sum, value) => sum + value, 0) / axes.length).toFixed(1) : "–",
      scores.versus ?? "–", scores.readScreenshots ?? "–"];
  });
  const first = runs.find(({ id }) => id === "01");
  const theme = first?.metrics.pages[0].theme;
  const phase1 = first && theme.designSystem === PHASE_1.designSystem && theme.primary?.toLowerCase() === PHASE_1.primary &&
    theme.font === PHASE_1.font && runs.every(({ scores }) => scores.readScreenshots === true);
  // A run without running text (a dashboard of figures) has nothing under 16px.
  const phase2 = runs.every(({ metrics }) => {
    const { p0, coverage } = lintSummary(metrics.lint);
    return coverage >= 80 && p0 === 0 && metrics.pages.every(({ minBodyFontPx }) => (minBodyFontPx ?? 16) >= 16);
  });
  const pages = runs.filter(({ brief }) => brief.surface === "page");
  const wins = pages.filter(({ scores }) => ["win", "tie"].includes(scores.versus)).length;

  const summary = [
    `# Evaluation run: ${label}`,
    "",
    "| Brief | Surface | System · primary · font | Smallest text | Coverage | P0 | Problems | Axes (avg) | vs Claude Design | Read shots |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...rows.map((row) => `| ${row.join(" | ")} |`),
    "",
    `- Phase 1 cut: ${phase1 ? "pass" : "not met"} (brief 01 on ${Object.values(PHASE_1).join(" · ")}, every run read its screenshots).`,
    `- Phase 2 cut: ${phase2 ? "pass" : "not met"} (every brief: coverage of 80% or more, no P0, running text of 16px or more).`,
    `- Phase 3 cut: ${wins} of ${pages.length} public pages win or tie (needs 2 of 3).`,
    "",
    "Problems measured by neus shot:",
    "",
    ...runs.flatMap(({ id, metrics }) => metrics.problems.map((problem) => `- ${id}: ${problem}`)),
    "",
  ].join("\n");
  writeFileSync(path.join(root, "summary.md"), summary);
  process.stdout.write(`Wrote runs/${label}/summary.md\n`);
};

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { brief: { type: "string" }, label: { type: "string" }, url: { type: "string" } },
});
if (!values.label) fail("Usage: node eval/score.mjs <project> --brief <id> --label <label> [--url <base>]\n       node eval/score.mjs --label <label>");
if (positionals.length) {
  if (!values.brief) fail("--brief is required when scoring a project.");
  score(positionals[0], values.brief, values.label, values.url);
}
summarize(values.label);
