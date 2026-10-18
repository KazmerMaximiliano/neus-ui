import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { cssVocabulary, documentedClasses, lintFiles } from "./lint.mjs";
import { PACKAGE_ROOT } from "./neus.utils.mjs";

// The vocabulary neus lint reads from dist/neus-ui.css, built here from the sources.
const files = (folder, extension) => readdirSync(path.join(PACKAGE_ROOT, folder), { recursive: true })
  .filter((file) => file.endsWith(extension)).map((file) => readFileSync(path.join(PACKAGE_ROOT, folder, file), "utf8"));
const vocabulary = {
  ...cssVocabulary([...files("src", ".css")].join("\n")),
  documented: documentedClasses([...files("docs/components", ".md"), ...files("docs/templates", ".md"), ...files("docs/design", ".md")].join("\n")),
  allowedImports: ["neus-ui/theme", "neus-ui/dist/neus-ui.css", "neus-ui/package.json"],
  rendering: "spa",
};
const lint = (file, text, options = {}) => lintFiles([{ file, text }], { ...vocabulary, ...options });
const rules = (result) => result.findings.map(({ severity, rule }) => `${severity} ${rule}`);

describe("neus lint", () => {
  it("passes code that follows the contract", () => {
    const page = `import { Button, Heading, Section, Text } from "neus-ui";
import "neus-ui/dist/neus-ui.css";
export const Page = () => (
  <Section tone="subtle" style={{ minHeight: "50vh" }}>
    <Heading as="h1" size="display">Calm</Heading>
    <Text variant="lead">Sessions between meetings.</Text>
    <Button label="Start" href="#signup" buttonStyle={{ width: "100%" }} />
  </Section>
);`;
    const css = `.hero { gap: var(--space-8); padding: var(--hero-padding); --hero-padding: var(--space-12); color: var(--color-text-secondary); }
.hero .card-header { border: 0; }
.hero-cta .button__label, .tags .select__wrapper.multiselect { letter-spacing: 0; }`;
    const result = lintFiles([{ file: "src/Page.tsx", text: page }, { file: "src/Page.css", text: css }], vocabulary);
    expect(result.findings).toEqual([]);
    expect(result.coverage).toMatchObject({ percent: 100, neus: 4, raw: 0 });
  });

  it.each([
    ["unknown-token", "a.css", ".x { gap: var(--space-5); }"],
    ["palette", "a.css", ".x { --color-primary: #ff0000; }"],
    ["palette", "a.tsx", `const style = { "--color-text-on-primary": "white" };`],
    ["important", "a.css", ".x { gap: 0 !important; }"],
    ["inline-color", "a.tsx", `<Button label="Go" buttonStyle={{ background: "var(--color-error)" }} />`],
    ["inline-color", "a.tsx", `<Input\n  label="Name"\n  inputStyle={{ color: "var(--color-error)" }}\n/>`],
    ["deep-import", "a.tsx", `import { Button } from "neus-ui/dist/components/Button/Button.js";`],
    ["private-class", "a.css", "body.sidebar-scroll-locked { overflow: auto; }"],
    ["raw-color", "a.css", ".x { color: #333; }"],
    ["raw-color", "a.tsx", `<div style={{ boxShadow: "0 1px rgba(0, 0, 0, 0.1)" }} />`],
  ])("reports P0 %s", (rule, file, text) => {
    expect(rules(lint(file, text))).toContain(`P0 ${rule}`);
  });

  it.each([
    ["filler", "a.tsx", "<p>Lorem ipsum dolor</p>"],
    ["emoji", "a.tsx", "<span>🚀 Fast</span>"],
    ["third-party", "a.css", ".table .ag-header-cell { color: inherit; }"],
    ["raw-element", "a.tsx", "<button onClick={go}>Go</button>"],
  ])("reports P1 %s", (rule, file, text) => {
    expect(rules(lint(file, text))).toContain(`P1 ${rule}`);
  });

  it("allows raw colors in neus.overrides.css, skips neus init's theme files and ignores the copyright sign", () => {
    expect(lint("src/styles/neus.overrides.css", ":root { --font-body: x; color-scheme: light; background: #fff; }").findings).toEqual([]);
    expect(lint("src/styles/neus.theme.css", ":root { --color-primary: #ff0000 !important; }").findings).toEqual([]);
    expect(lint("src/neus/neus.theme.ts", `export const THEME = { primaryColor: "#ff0000" };`).findings).toEqual([]);
    expect(lint("a.tsx", "<footer>© 2026 AuraFlow</footer>").findings).toEqual([]);
  });

  it("allows one global ThemeProvider in an SPA and none in server-rendered projects", () => {
    const root = { file: "src/neus/NeusRoot.tsx", text: `<ThemeProvider designSystem="neus">{children}</ThemeProvider>` };
    const preview = { file: "src/Preview.tsx", text: `<ThemeProvider\n  scope="local"\n  designSystem="carbon"\n>x</ThemeProvider>` };
    const second = { file: "src/App.tsx", text: `<ThemeProvider designSystem="neus">x</ThemeProvider>` };
    expect(lintFiles([root, preview], vocabulary).findings).toEqual([]);
    expect(rules(lintFiles([root, second], vocabulary))).toEqual(["P0 theme-owner"]);
    expect(rules(lintFiles([root], { ...vocabulary, rendering: "rsc" }))).toEqual(["P0 theme-owner"]);
    expect(lintFiles([preview], { ...vocabulary, rendering: "islands" }).findings).toEqual([]);
  });

  it("reports the library stylesheet imported in more than one file", () => {
    const entry = (file) => ({ file, text: `import "neus-ui/dist/neus-ui.css";` });
    expect(rules(lintFiles([entry("src/main.tsx"), entry("src/Page.tsx")], vocabulary))).toEqual(["P1 stylesheet", "P1 stylesheet"]);
  });

  it("measures coverage per file and in total, and collects SAMPLE blocks", () => {
    const page = `import { Card, CardContent, ThemeProvider } from "neus-ui";
// SAMPLE: quotes to replace
export const A = () => (
  <ThemeProvider designSystem="neus">
    <section>
      <h2>Quotes</h2>
      <Card><CardContent>{/* SAMPLE: quote */}Nice</CardContent></Card>
      <div>not counted</div>
    </section>
  </ThemeProvider>
);`;
    const result = lintFiles([{ file: "src/A.tsx", text: page }, { file: "src/B.tsx", text: "<p>Hi</p>" }], vocabulary);
    expect(result.coverage.files["src/A.tsx"]).toEqual({ percent: 50, neus: 2, raw: 2 });
    expect(result.coverage.files["src/B.tsx"]).toEqual({ percent: 0, neus: 0, raw: 1 });
    expect(result.coverage).toMatchObject({ percent: 40, neus: 2, raw: 3 });
    expect(result.samples.map(({ line }) => line)).toEqual([2, 7]);
  });
});
