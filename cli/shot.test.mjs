import { mkdtempSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { browserCandidates, findBrowser, packageManager, parseDevUrl, problems, routeSlug, shoot } from "./shot.mjs";

const tempDir = () => mkdtempSync(path.join(tmpdir(), "neus-shot-"));

describe("neus shot helpers", () => {
  it("names screenshots after the route", () => {
    expect(routeSlug("/")).toBe("index");
    expect(routeSlug("/pricing/")).toBe("pricing");
    expect(routeSlug("/a/b?tab=1#top")).toBe("a-b");
    expect(routeSlug("/neus-specimen.html")).toBe("neus-specimen-html");
  });

  it("reads the local URL from Vite, Next.js and Astro logs", () => {
    expect(parseDevUrl("\u001b[32m  ➜\u001b[39m  Local:   \u001b[36mhttp://localhost:\u001b[1m5174\u001b[22m/\u001b[39m")).toBe("http://localhost:5174");
    expect(parseDevUrl("   ▲ Next.js 16\n   - Local:        http://localhost:3000\n   - Network:      http://192.168.0.4:3000")).toBe("http://localhost:3000");
    expect(parseDevUrl(" astro  v6  ready in 300 ms\n┃ Local    http://127.0.0.1:4321/")).toBe("http://127.0.0.1:4321");
    expect(parseDevUrl("> vite\n")).toBeNull();
  });

  it("picks the package manager from the lockfile", () => {
    const root = tempDir();
    expect(packageManager(root)).toBe("npm");
    writeFileSync(path.join(root, "pnpm-lock.yaml"), "");
    expect(packageManager(root)).toBe("pnpm");
  });

  it("lists installed browsers per platform", () => {
    expect(browserCandidates("darwin", {}, "/Users/ana")).toEqual(expect.arrayContaining([
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Users/ana/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    ]));
    expect(browserCandidates("win32", { LOCALAPPDATA: "C:\\Users\\ana\\AppData\\Local" }))
      .toContain("C:\\Users\\ana\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe");
    expect(browserCandidates("linux")).toContain("/usr/bin/chromium");
    expect(findBrowser("/no/such/browser")).toBeNull();
  });

  it("turns measurements into problems", () => {
    const page = {
      route: "/", width: 390, consoleErrors: [], bodyFontPx: 16, missingFonts: [], overflow: null, clipped: [], solidCtas: { maxPerViewport: 1 },
    };
    expect(problems([page])).toEqual([]);
    expect(problems([{ ...page, overflow: { scrollWidth: 600, offenders: ["div.wide"] }, clipped: ["div.field inside div.card (50px)"],
      consoleErrors: ["boom"], bodyFontPx: 14, missingFonts: ["Manrope"], solidCtas: { maxPerViewport: 3 } }])).toEqual([
      "/ at 390px: horizontal scroll (600px wide) from div.wide",
      "/ at 390px: content cut off: div.field inside div.card (50px)",
      "/ at 390px: 1 console error(s), first: boom",
      "/ at 390px: body text at 14px (minimum 16px)",
      "/ at 390px: fonts not loaded: Manrope",
      "/ at 390px: 3 solid buttons in one viewport",
    ]);
  });
});

const playwright = await import("playwright-core").catch(() => null);
const executablePath = playwright && findBrowser(undefined, playwright.chromium);

// Runs where a browser is installed; skipped elsewhere, like neus shot itself exits with 2.
describe.skipIf(!executablePath)("neus shot in a browser", () => {
  const page = `<!doctype html>
<html data-design-system="neus" data-color-scheme="light" style="--color-primary: #283593">
<head><style>
  body { margin: 0; font: 16px/1.5 sans-serif; }
  .wide { width: 600px; } .small { font-size: 12px; } .ghost { font-family: NoSuchFont, serif; }
  .card { overflow: hidden; width: 200px; position: relative; } .field { width: 250px; } .card i { position: absolute; left: 150px; width: 300px; }
  .cut { overflow: hidden; width: 100px; white-space: nowrap; text-overflow: ellipsis; }
</style></head>
<body>
  <div class="wide">A block wider than a phone</div>
  <div class="card"><div class="field">Field wider than its card</div><i>decoration</i></div>
  <div class="card"><i>Only decoration overflows this card</i></div>
  <p class="cut">Deliberately truncated with an ellipsis</p>
  <iframe src="http://localhost:9/"></iframe>
  <p class="small">This paragraph is set far too small for running text on a phone.</p>
  <p class="small">A second small paragraph, so small text carries most of the page.</p>
  <p>A single comfortable paragraph at the default size of the page.</p>
  <button class="button--solid">Start</button><button class="button--solid">Buy</button>
  <p class="ghost">Declared in a font face that exists nowhere at all.</p>
  <script>console.error("boom")</script>
</body></html>`;
  let server;
  let url;

  beforeAll(async () => {
    server = createServer((request, response) => response.writeHead(200, { "content-type": "text/html" }).end(page));
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    url = `http://127.0.0.1:${server.address().port}`;
  });
  afterAll(() => server.close());

  it("captures the page and reports its problems", async () => {
    const outDir = tempDir();
    const [result] = await shoot({ chromium: playwright.chromium, executablePath, url, routes: ["/"], widths: [390], outDir });
    expect(result.file).toBe(path.join(outDir, "index-390.png"));
    expect(result.overflow.offenders).toContain("div.wide");
    expect(result.clipped).toEqual(["div.field inside div.card (50px)"]);
    expect(result.blankFrames).toBe(1);
    expect(result.consoleErrors).toEqual(["boom"]);
    expect(result.bodyFontPx).toBe(12);
    expect(result.missingFonts).toEqual(["NoSuchFont"]);
    expect(result.solidCtas).toEqual({ aboveFold: 2, maxPerViewport: 2 });
    expect(result.theme).toEqual({ designSystem: "neus", colorScheme: "light", primary: "#283593", font: "sans-serif" });
    expect(problems([result])).toHaveLength(6);
  }, 30_000);
});
