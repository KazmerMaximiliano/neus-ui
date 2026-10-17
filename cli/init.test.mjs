import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import * as theme from "../src/theme";
import { syncAttributes, upsertBlock, writeProject } from "./init.mjs";
import { detectProject } from "./neus.utils.mjs";

const project = (pkg, dirs = []) => {
  const root = mkdtempSync(path.join(tmpdir(), "neus-init-"));
  writeFileSync(path.join(root, "package.json"), JSON.stringify(pkg));
  for (const dir of dirs) mkdirSync(path.join(root, dir), { recursive: true });
  return root;
};
const read = (root, file) => readFileSync(path.join(root, file), "utf8");
const config = (overrides) => ({
  framework: "next", rendering: "rsc", designSystem: "vercel", derivedSystem: null, colorScheme: "light",
  colors: {}, language: "es", agents: ["claude", "codex"], paths: { styles: "src/styles" }, ...overrides,
});

describe("neus init", () => {
  it("detects the framework and how it renders", () => {
    expect(detectProject(project({ dependencies: { next: "16" } }, ["app"]))).toEqual({ framework: "next", rendering: "rsc" });
    expect(detectProject(project({ dependencies: { next: "16" } }, ["pages"]))).toEqual({ framework: "next", rendering: "ssr" });
    expect(detectProject(project({ dependencies: { astro: "6" } }))).toEqual({ framework: "astro", rendering: "islands" });
    expect(detectProject(project({ devDependencies: { "@react-router/dev": "8" } }))).toEqual({ framework: "react-router", rendering: "ssr" });
    expect(detectProject(project({ devDependencies: { vite: "8" } }))).toEqual({ framework: "vite", rendering: "spa" });
    expect(detectProject(project({}))).toBeNull();
  });

  it("replaces only the managed AGENTS.md block", () => {
    const first = upsertBlock("# Team rules\n", "<!-- neus-ui:start -->\nA\n<!-- neus-ui:end -->");
    expect(first).toBe("# Team rules\n\n<!-- neus-ui:start -->\nA\n<!-- neus-ui:end -->\n");
    const second = upsertBlock(`${first}\n## Later\n`, "<!-- neus-ui:start -->\nB\n<!-- neus-ui:end -->");
    expect(second).toContain("B\n<!-- neus-ui:end -->\n\n## Later");
    expect(second).not.toContain("A\n");
  });

  it("syncs existing theme attributes without inserting new ones", () => {
    expect(syncAttributes('<html data-design-system="neus" data-color-scheme="dark">', "carbon", "light"))
      .toBe('<html data-design-system="carbon" data-color-scheme="light">');
    expect(syncAttributes("<html>", "carbon", "light")).toBe("<html>");
  });

  it("writes a Next.js App Router project and keeps the user's files on a second run", () => {
    const root = project({ dependencies: { next: "16" } }, ["app", "src"]);
    writeFileSync(path.join(root, "app/layout.tsx"), '<html data-design-system="neus" data-color-scheme="light">');
    writeFileSync(path.join(root, "AGENTS.md"), "# Team rules\n");
    writeProject(root, config({ colors: { primaryColor: "#0f766e" } }), theme);

    expect(read(root, "src/styles/neus.theme.css")).toContain("--color-primary: #0f766e;");
    expect(read(root, "app/layout.tsx")).toContain('data-design-system="vercel"');
    expect(read(root, "AGENTS.md")).toMatch(/^# Team rules\n\n<!-- neus-ui:start/);
    expect(read(root, "CLAUDE.md")).toBe("@AGENTS.md\n");
    for (const file of [".claude/skills/neus-design/SKILL.md", ".agents/skills/neus-audit/SKILL.md",
      ".claude/agents/neus-reviewer.md", ".codex/agents/neus-reviewer.toml",
      ".agents/skills/neus-design/scripts/deal-directions.mjs"]) {
      expect(existsSync(path.join(root, file)), file).toBe(true);
    }

    writeFileSync(path.join(root, "src/styles/neus.overrides.css"), "/* mine */");
    writeProject(root, config({ designSystem: "carbon" }), theme);
    expect(read(root, "src/styles/neus.overrides.css")).toBe("/* mine */");
    expect(read(root, "src/styles/neus.theme.css")).not.toContain("--color-primary");
    expect(read(root, "AGENTS.md").match(/neus-ui:start/g)).toHaveLength(1);
    expect(read(root, "CLAUDE.md")).toBe("@AGENTS.md\n");
  });

  it("writes the SPA root and the Astro layout", () => {
    const spa = project({ devDependencies: { vite: "8" } }, ["src"]);
    writeProject(spa, config({ framework: "vite", rendering: "spa", agents: ["codex"] }), theme);
    expect(read(spa, "src/neus/neus.theme.ts")).toContain('"designSystem": "vercel"');
    expect(existsSync(path.join(spa, "src/neus/NeusRoot.tsx"))).toBe(true);
    expect(existsSync(path.join(spa, ".claude"))).toBe(false);
    expect(existsSync(path.join(spa, "CLAUDE.md"))).toBe(false);

    const astro = project({ dependencies: { astro: "6" } }, ["src"]);
    writeProject(astro, config({ framework: "astro", rendering: "islands", designSystem: "carbon" }), theme);
    const layout = read(astro, "src/layouts/NeusLayout.astro");
    expect(layout).toContain('import "../styles/neus.theme.css";');
    expect(layout).toContain('data-design-system="carbon"');
    expect(layout).toContain("family=IBM+Plex+Sans");
    expect(layout).not.toContain("{{");
  });
});

describe("neus bin", () => {
  const neus = (...args) => spawnSync(process.execPath, [path.resolve("cli/neus.mjs"), ...args], { encoding: "utf8" });

  it("finds the command after leading flags", () => {
    expect(neus("--system", "carbon", "init", "--help")).toMatchObject({ status: 0, stdout: expect.stringContaining("npx neus init") });
    expect(neus("-y", "init", "--help").status).toBe(0);
  });

  it("prints the command list, failing only for unknown commands", () => {
    expect(neus()).toMatchObject({ status: 0, stdout: expect.stringContaining("shot") });
    expect(neus("--help").status).toBe(0);
    expect(neus("nope").status).toBe(1);
  });
});

describe("deal-directions", () => {
  const deal = (...args) => JSON.parse(execFileSync(process.execPath,
    [path.resolve("skills/neus-design/scripts/deal-directions.mjs"), ...args], { encoding: "utf8" }));

  it("deals distinct, reproducible directions", () => {
    const { directions } = deal("--seed", "7", "--options", "3");
    expect(new Set(directions.map((direction) => direction.palette.name)).size).toBe(3);
    expect(new Set(directions.map((direction) => direction.type.name)).size).toBe(3);
    expect(deal("--seed", "7").directions).toEqual(directions);
    expect(deal("--seed", "7", "--surface", "marketing").directions[0].signature).not.toBe(directions[0].signature);
  });

  it("deals only the composition when the system is locked", () => {
    const keep = ["--keep", "palette,type,shape,density,elevation"];
    const { directions } = deal("--seed", "7", "--surface", "marketing", ...keep);
    expect(Object.keys(directions[0])).toEqual(["signature", "hero", "features", "testimonials", "cta"]);
    expect(new Set(directions.map((direction) => direction.hero.name))).toEqual(new Set(["split", "centered", "media-first"]));
    expect(deal("--seed", "7", "--surface", "marketing").directions.map(({ hero }) => hero)).toEqual(directions.map(({ hero }) => hero));
    expect(deal("--seed", "7", ...keep).directions[0]).not.toHaveProperty("hero");
    expect(() => execFileSync(process.execPath, [path.resolve("skills/neus-design/scripts/deal-directions.mjs"), "--keep", "hero"],
      { stdio: "pipe" })).toThrow(/Unknown axis: hero/);
  });
});
