import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { cssVocabulary, documentedClasses, lintFiles } from "./lint.mjs";
import { PACKAGE_ROOT } from "./neus.utils.mjs";

// The vocabulary neus-ui lint reads from dist/neus-ui.css, built here from the sources.
const files = (folder, extension) => readdirSync(path.join(PACKAGE_ROOT, folder), { recursive: true })
  .filter((file) => file.endsWith(extension)).map((file) => readFileSync(path.join(PACKAGE_ROOT, folder, file), "utf8"));
const vocabulary = {
  ...cssVocabulary([...files("src", ".css")].join("\n")),
  documented: documentedClasses([...files("docs/components", ".md"), ...files("docs/sections", ".md"), ...files("docs/templates", ".md"),
    ...files("docs/design", ".md")].join("\n")),
  allowedImports: ["neus-ui/theme", "neus-ui/sections", "neus-ui/dist/neus-ui.css", "neus-ui/package.json"],
  rendering: "spa",
};
const lint = (file, text, options = {}) => lintFiles([{ file, text }], { ...vocabulary, ...options });
const rules = (result) => result.findings.map(({ severity, rule }) => `${severity} ${rule}`);

describe("neus-ui lint", () => {
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
    const css = `.intro { gap: var(--space-8); padding: var(--intro-padding); --intro-padding: var(--space-12); color: var(--color-text-secondary); }
.intro .card-header, .page .hero__media { border: 0; }
.intro-cta .button__label, .tags .select__wrapper.multiselect { letter-spacing: 0; }`;
    const result = lintFiles([{ file: "src/Page.tsx", text: page }, { file: "src/Page.css", text: css }], vocabulary);
    expect(result.findings).toEqual([]);
    expect(result.coverage).toMatchObject({ percent: 100, neus: 4, raw: 0 });
  });

  it.each([
    ["unknown-token", "a.css", ".x { gap: var(--space-5); }"],
    ["palette", "a.css", ".x { --color-primary: #ff0000; }"],
    ["palette", "a.css", ".x { --color-warning-light: var(--color-surface); }"],
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
    ["raw-element", "a.tsx", "<footer>© 2027</footer>"],
    ["raw-element", "a.tsx", `<textarea name="notes" rows={3} />`],
    ["raw-element", "a.tsx", `<div role="alert">Payment failed</div>`],
    ["raw-element", "a.tsx", `<button role="switch" aria-checked={on} onClick={toggle} />`],
    ["raw-element", "a.tsx", `<div role="radiogroup" aria-label="Plan">{plans}</div>`],
    ["raw-element", "a.tsx", `<div id="filters" popover="auto" className="filters">{filters}</div>`],
    ["raw-element", "a.tsx", `<div popover className="share">{links}</div>`],
    ["raw-element", "a.tsx", `<span className="loader" aria-hidden />`],
    ["raw-element", "a.css", "@keyframes spin { to { transform: rotate(1turn); } }"],
    ["raw-element", "a.tsx", `<progress value={3} max={10} />`],
    ["raw-element", "a.tsx", `<div role="progressbar" aria-valuenow={40} />`],
    ["raw-element", "a.tsx", `<div className="skeleton" />`],
    ["raw-element", "a.css", "@keyframes shimmer { to { background-position: 0 0; } }"],
    ["raw-element", "a.tsx", `<div className="toast" aria-live="polite">{message}</div>`],
    ["raw-element", "a.tsx", `<span role="tooltip" id="hint">Moves it to the trash</span>`],
    ["raw-element", "a.tsx", `<IconButton icon={Trash2} label="Delete" title="Moves it to the trash" />`],
    ["raw-element", "a.tsx", `<input role="combobox" aria-expanded={open} value={query} />`],
    ["raw-element", "a.tsx", `<datalist id="cities">{cities}</datalist>`],
    ["raw-element", "a.tsx", `<div role="tablist" aria-label="Settings">{tabs}</div>`],
    ["raw-element", "a.tsx", `<button role="tab" aria-selected={selected}>General</button>`],
    ["raw-element", "a.tsx", `<nav aria-label="Breadcrumb"><ol>{crumbs}</ol></nav>`],
    ["raw-element", "a.tsx", `<nav className="pager" aria-label="Paginación">{pages}</nav>`],
    ["app-shell", "a.tsx", `import { Sidebar, Stack } from "neus-ui";\n<Sidebar title="Pulso" items={items} />\n<Stack as="header">Workspace</Stack>`],
    ["app-shell", "a.css", ".pulso-sidebar { --sidebar-background: var(--color-surface); }"],
  ])("reports P1 %s", (rule, file, text) => {
    expect(rules(lint(file, text))).toContain(`P1 ${rule}`);
  });

  it("does not take a Popover's props or text about popovers for the attribute", () => {
    const text = `<Popover label="Filters" trigger={(props) => <Button {...props} label="Filters" />}>\n<Text>The popover shows filters.</Text>`;
    expect(rules(lint("a.tsx", text))).not.toContain("P1 raw-element");
  });

  it("does not take Skeleton or Progress components for hand-made ones", () => {
    const text = `<Skeleton className="skeleton-card" lines={3} />\n<Progress label="Upload" value={3} max={10} />`;
    expect(rules(lint("a.tsx", text))).not.toContain("P1 raw-element");
  });

  it("does not take Tabs, Breadcrumbs, Pagination or a tab panel for hand-made ones", () => {
    const text = `<Tabs label="Settings" items={items} />\n<Breadcrumbs items={trail} labels={{ navigation: "Breadcrumb" }} />\n<Pagination page={page} totalPages={9} labels={{ navigation: "Pagination" }} />\n<div role="tabpanel" aria-label="Notes">{notes}</div>`;
    expect(rules(lint("a.tsx", text))).not.toContain("P1 raw-element");
  });

  it("does not take Tooltip, Combobox or a titled Modal for hand-made ones", () => {
    const text = `<Tooltip content="Moves it to the trash" trigger={(props) => <IconButton {...props} icon={Trash2} label="Delete" />} />\n<Combobox label="City" options={cities} />\n<ModalHeader title="Delete project" />`;
    expect(rules(lint("a.tsx", text))).not.toContain("P1 raw-element");
  });

  it("does not take a class that only contains spinner for a hand-made one", () => {
    const text = `<div className="results-spinner"><Spinner className="results-spinner__icon" label="Loading" /></div>`;
    expect(rules(lint("a.tsx", text))).not.toContain("P1 raw-element");
  });

  it("accepts next/font variables declared in the project, also when only the overrides are linted", () => {
    const layout = { file: "src/app/layout.tsx", text: `const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });` };
    const overrides = { file: "src/styles/neus.overrides.css", text: `[data-design-system="neus"] { --font-body: var(--font-manrope), sans-serif; }` };
    expect(lintFiles([layout, overrides], vocabulary).findings).toEqual([]);
    expect(lintFiles([overrides], { ...vocabulary, context: [layout] }).findings).toEqual([]);
    expect(rules(lintFiles([overrides], vocabulary))).toEqual(["P0 unknown-token"]);
  });

  it("allows raw colors in neus.overrides.css, skips neus-ui init's theme files and ignores the copyright sign", () => {
    expect(lint("src/styles/neus.overrides.css", ":root { --font-body: x; color-scheme: light; background: #fff; }").findings).toEqual([]);
    expect(lint("src/styles/neus.theme.css", ":root { --color-primary: #ff0000 !important; }").findings).toEqual([]);
    expect(lint("src/neus/neus.theme.ts", `export const THEME = { primaryColor: "#ff0000" };`).findings).toEqual([]);
    expect(lint("a.tsx", "<small>© 2026 AuraFlow</small>").findings).toEqual([]);
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

  it("counts components imported from neus-ui/sections", () => {
    const page = `import { Hero } from "neus-ui/sections";\nimport { Button } from "neus-ui";\nexport const P = () => <Hero title="T" actions={<Button label="Go" />} />;`;
    expect(lint("src/P.tsx", page).coverage).toMatchObject({ percent: 100, neus: 2, raw: 0 });
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
