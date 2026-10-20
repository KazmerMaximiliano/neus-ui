import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { specimenFiles } from "./specimen.mjs";

const project = (dirs = [], files = {}) => {
  const root = mkdtempSync(path.join(tmpdir(), "neus-specimen-"));
  for (const dir of dirs) mkdirSync(path.join(root, dir), { recursive: true });
  for (const [file, text] of Object.entries(files)) writeFileSync(path.join(root, file), text);
  return root;
};
const config = (overrides) => ({
  framework: "vite", rendering: "spa", designSystem: "carbon", derivedSystem: null, colorScheme: "light",
  colors: { primaryColor: "#2f5d3a" }, paths: { styles: "src/styles" }, ...overrides,
});
const byFile = (result) => Object.fromEntries(result.files.map(({ file, content }) => [file, content]));

describe("neus specimen", () => {
  it("fills the component with the system, the name and the project's colors", () => {
    const component = byFile(specimenFiles(project(["src"]), config()))["src/neus/NeusSpecimen.tsx"];
    expect(component).toContain('const SYSTEM = "carbon" as DesignSystemId;');
    expect(component).toContain('const NAME = "carbon";');
    expect(component).toContain(`const COLORS: ThemeConfig = JSON.parse('{"primaryColor":"#2f5d3a"}');`);
    expect(component).not.toMatch(/\{\{[A-Z_]+\}\}/);
  });

  it("writes a Vite page from the project's index.html with the derived system stylesheet", () => {
    const root = project(["src", "design/system"], {
      "index.html": '<html><head><title>App</title><link href="fonts.css" rel="stylesheet" /></head><body><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>',
      "design/system/DESIGN.md": "---\nversion: alpha\nname: Monte\n---\n",
    });
    const result = specimenFiles(root, config({ derivedSystem: "design/system/DESIGN.md" }));
    const files = byFile(result);
    expect(result.route).toBe("/neus-specimen.html");
    expect(files["neus-specimen.html"]).toContain('<link href="fonts.css" rel="stylesheet" />');
    expect(files["neus-specimen.html"]).toContain('<script type="module" src="/src/neus/specimen.tsx"></script>');
    expect(files["neus-specimen.html"]).toContain("<title>neus specimen</title>");
    expect(files["src/neus/specimen.tsx"]).toContain('import "neus-ui/dist/neus-ui.css";\nimport "../styles/neus.system.css";\nimport "../styles/neus.overrides.css";');
    expect(files["src/neus/NeusSpecimen.tsx"]).toContain('const NAME = "Monte";');
  });

  it.each([
    [{ framework: "next", rendering: "rsc" }, ["src/app"], ["src/app/neus-specimen/NeusSpecimen.tsx", "src/app/neus-specimen/page.tsx"], "/neus-specimen"],
    [{ framework: "next", rendering: "ssr" }, ["pages"], ["neus/NeusSpecimen.tsx", "pages/neus-specimen.tsx"], "/neus-specimen"],
    [{ framework: "astro", rendering: "islands" }, ["src"], ["src/neus/NeusSpecimen.tsx", "src/pages/neus-specimen.astro"], "/neus-specimen"],
    [{ framework: "react-router", rendering: "ssr" }, ["app"], ["app/neus/NeusSpecimen.tsx"], "/neus-specimen"],
  ])("writes the route files for %o", (overrides, dirs, files, route) => {
    const result = specimenFiles(project(dirs), config(overrides));
    expect(result.files.map(({ file }) => file)).toEqual(files);
    expect(result.route).toBe(route);
    if (overrides.framework === "react-router") expect(result.note).toContain("Add a route at /neus-specimen");
    if (overrides.framework === "next" && overrides.rendering === "ssr") {
      expect(byFile(result)["pages/neus-specimen.tsx"]).toContain('from "../neus/NeusSpecimen"');
    }
  });
});
