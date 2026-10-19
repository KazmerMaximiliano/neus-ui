/* global document, window, location, getComputedStyle, NodeFilter */
import { spawn, spawnSync } from "node:child_process";
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { homedir } from "node:os";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { pathToFileURL } from "node:url";
import { parseArgs, stripVTControlCharacters } from "node:util";
import {
  BROWSER_PATHS, FRAMEWORK_PORTS, LOCKFILES, NEUS_DIR, PORT_FALLBACK_AFTER_MS, SHOT_LIMITS, SHOT_TIMEOUT_S,
  SHOT_VIEWPORT, SHOT_WIDTHS, SYSTEM_FONT_FAMILIES,
} from "./neus.consts.mjs";
import { detectProject, readJson, toPosix } from "./neus.utils.mjs";

const HELP = `Usage: npx neus shot [routes...] [options]

Screenshots each route (default /) full page at every width into ${NEUS_DIR}/shots/ and
reports horizontal overflow, content cut off by overflow: hidden, console errors, the body text size, fonts
that did not load and solid buttons per viewport. Without --url it starts the
project's dev script and leaves it running for the next round.

Options:
  --url <base>        Base URL of a server that is already running
  --widths <list>     Viewport widths in px (default ${SHOT_WIDTHS})
  --browser <path>    Chrome, Edge or Chromium executable to use
  --timeout <s>       Seconds to wait for the dev server (default ${SHOT_TIMEOUT_S})
  --json              Print the report as JSON
  --stop              Stop the dev server started by neus shot
  -h, --help          Show this help

Exit codes: 0 screenshots taken (problems are reported, not failures),
1 the server or a page failed, 2 no browser or playwright-core.`;

const NO_PLAYWRIGHT = "neus shot needs playwright-core, an optional dependency of neus-ui that is not installed.\n" +
  "Install it with `npm i -D playwright-core`; it downloads no browser.";
const NO_BROWSER = "No Chrome, Edge or Chromium found. Install one or pass --browser <path>; neus shot never downloads browsers.";

/** File-name slug of a route: "/" is "index", "/a/b?x" is "a-b". */
export const routeSlug = (route) =>
  route.replace(/[?#].*$/, "").replace(/^\/+|\/+$/g, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "index";

/** First local URL a dev server printed (Vite, Next.js, Astro), or null. */
export const parseDevUrl = (log) => {
  const match = stripVTControlCharacters(log).match(/https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\]|0\.0\.0\.0):\d+/);
  return match ? match[0].replace("0.0.0.0", "localhost") : null;
};

export const packageManager = (root) => LOCKFILES.find(([file]) => existsSync(path.join(root, file)))?.[1] ?? "npm";

/** Executable paths of installed browsers on this platform, most preferred first. */
export const browserCandidates = (platform = process.platform, env = process.env, home = homedir()) => {
  if (platform === "darwin") return BROWSER_PATHS.darwin.flatMap((app) =>
    ["/Applications", path.join(home, "Applications")].map((dir) => `${dir}/${app}.app/Contents/MacOS/${app}`));
  if (platform === "win32") return [env.LOCALAPPDATA, env.PROGRAMFILES, env["PROGRAMFILES(X86)"]].filter(Boolean)
    .flatMap((dir) => BROWSER_PATHS.win32.map((exe) => path.win32.join(dir, exe)));
  return BROWSER_PATHS.linux;
};

/** The --browser path, an installed browser, or a browser playwright already downloaded for this machine. */
export const findBrowser = (explicit, chromium) => {
  if (explicit) return existsSync(explicit) ? explicit : null;
  const installed = browserCandidates().find((file) => existsSync(file));
  if (installed) return installed;
  try {
    const downloaded = chromium?.executablePath();
    return downloaded && existsSync(downloaded) ? downloaded : null;
  } catch {
    return null;
  }
};

const loadPlaywright = async (root) => {
  try {
    return await import("playwright-core");
  } catch {
    // Installed without optional dependencies: use the project's own copy, if any.
  }
  const require = createRequire(path.join(root, "package.json"));
  for (const name of ["playwright-core", "playwright"]) {
    try {
      return await import(pathToFileURL(require.resolve(name)).href);
    } catch {
      // Try the next name.
    }
  }
  return null;
};

const neusDir = (root) => {
  const dir = path.join(root, NEUS_DIR);
  mkdirSync(dir, { recursive: true });
  // Self-ignored, so screenshots and logs never reach a commit.
  writeFileSync(path.join(dir, ".gitignore"), "*\n");
  return dir;
};

const alive = (pid) => {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code === "EPERM";
  }
};

const responds = async (url, ms = 5000) => {
  try {
    return (await fetch(url, { signal: AbortSignal.timeout(ms) })).status < 500;
  } catch {
    return false;
  }
};

const killTree = (pid) => {
  try {
    if (process.platform === "win32") spawnSync("taskkill", ["/pid", String(pid), "/T", "/F"]);
    else process.kill(-pid);
  } catch {
    // Already stopped.
  }
};

const logTail = (file) => readFileSync(file, "utf8").trimEnd().split("\n").slice(-20).join("\n");

/** Base URL to capture: --url, the server a previous run left running, or a newly started dev script. */
const devServer = async (root, url, timeoutMs) => {
  if (url) return { url, managed: false };
  const dir = neusDir(root);
  const stateFile = path.join(dir, "dev.json");
  const state = readJson(stateFile);
  if (state && alive(state.pid) && await responds(state.url)) return { url: state.url, managed: true };
  if (!readJson(path.join(root, "package.json"))?.scripts?.dev) throw new Error("No dev script in package.json; start the server and pass --url.");

  const logFile = path.join(dir, "dev.log");
  const log = openSync(logFile, "w");
  const child = spawn(packageManager(root), ["run", "dev"], {
    cwd: root, detached: true, stdio: ["ignore", log, log], shell: process.platform === "win32",
    env: { ...process.env, BROWSER: "none", NO_COLOR: "1" },
  });
  closeSync(log);
  child.unref();
  const fallback = `http://localhost:${FRAMEWORK_PORTS[detectProject(root)?.framework] ?? FRAMEWORK_PORTS.vite}`;
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    if (child.exitCode !== null || child.signalCode !== null) {
      throw new Error(`The dev script exited:\n${logTail(logFile)}\nStart the server yourself and pass --url.`);
    }
    // The default port is probed late: before the log shows a URL it may belong to another project.
    const candidate = parseDevUrl(readFileSync(logFile, "utf8")) ?? (Date.now() - started > PORT_FALLBACK_AFTER_MS ? fallback : null);
    if (candidate && await responds(candidate)) {
      writeFileSync(stateFile, `${JSON.stringify({ pid: child.pid, url: candidate })}\n`);
      return { url: candidate, managed: true };
    }
    await sleep(250);
  }
  killTree(child.pid);
  throw new Error(`The dev server did not answer within ${timeoutMs / 1000} s:\n${logTail(logFile)}\nPass --url to use a running server.`);
};

const stopServer = (root) => {
  const stateFile = path.join(root, NEUS_DIR, "dev.json");
  const state = readJson(stateFile);
  if (!state) return "No dev server started by neus shot is running.";
  killTree(state.pid);
  rmSync(stateFile, { force: true });
  return `Stopped the dev server at ${state.url}.`;
};

/** Runs inside the page, so it must stay self-contained. */
export const measure = (systemFonts) => {
  const ignored = new Set(systemFonts);
  const visible = (element) => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden";
  const firstFamily = (style) => style.fontFamily.split(",")[0].trim().replace(/^["']|["']$/g, "");
  const root = document.documentElement;
  const width = root.clientWidth;
  const overflows = (element) => element.getBoundingClientRect().right > width + 1;
  const label = (element) => element.tagName.toLowerCase() + (element.classList[0] ? `.${element.classList[0]}` : "");

  // Innermost elements past the right edge: the cause, not the wrappers around it.
  const offenders = root.scrollWidth > width
    ? [...document.body.querySelectorAll("*")]
      .filter((element) => overflows(element) && visible(element) && ![...element.children].some(overflows))
      .slice(0, 5)
      .map(label)
    : [];

  // Content an overflow: hidden/clip box cuts off without scrolling the page. Ellipsis is deliberate,
  // and positioned descendants are skipped with their subtree: they are decoration or visually hidden labels.
  // ponytail: an overflow: hidden carousel reports its track; carousels that scroll are not affected.
  const clipped = [];
  const inFlow = { acceptNode: (element) => ["absolute", "fixed"].includes(getComputedStyle(element).position) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT };
  for (const box of document.querySelectorAll("body, body *")) {
    const style = getComputedStyle(box);
    if (clipped.length === 5 || !["hidden", "clip"].includes(style.overflowX) || style.textOverflow === "ellipsis" ||
      box.clientWidth <= 1 || box.scrollWidth <= box.clientWidth + 1 || !visible(box)) continue;
    const edge = box.getBoundingClientRect().right;
    const walker = document.createTreeWalker(box, NodeFilter.SHOW_ELEMENT, inFlow);
    for (let element = walker.nextNode(); element; element = walker.nextNode()) {
      const past = Math.round(element.getBoundingClientRect().right - edge);
      if (past > 1 && visible(element)) {
        clipped.push(`${label(element)} inside ${label(box)} (${past}px)`);
        break;
      }
    }
  }
  // Chrome paints frames from other origins only while they are on screen, so full-page shots show them blank.
  const blankFrames = [...document.querySelectorAll("iframe[src]")]
    .filter((frame) => visible(frame) && new URL(frame.src, location.href).origin !== location.origin).length;

  let minFontPx = null;
  const runningText = {};
  const families = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent.trim();
    const parent = node.parentElement;
    if (!text || !parent || !visible(parent)) continue;
    const style = getComputedStyle(parent);
    const size = parseFloat(style.fontSize);
    minFontPx = Math.min(minFontPx ?? size, size);
    // ponytail: running text = visible text nodes of 40+ characters; short paragraphs split by inline tags slip through.
    if (text.length >= 40) runningText[size] = (runningText[size] ?? 0) + text.length;
    families.add(firstFamily(style));
  }

  // A face that did not load measures exactly like each fallback it is stacked on.
  const context = document.createElement("canvas").getContext("2d");
  const probe = (font) => {
    context.font = `72px ${font}`;
    return context.measureText("mmmmmmmmmmlli1WQ@#").width;
  };
  const missing = [...families].filter((family) => !ignored.has(family) &&
    ["monospace", "serif"].every((fallback) => probe(`"${family}", ${fallback}`) === probe(fallback)));
  for (const face of document.fonts) if (face.status === "error") missing.push(face.family.replace(/^["']|["']$/g, ""));

  const perViewport = {};
  for (const button of document.querySelectorAll(".button--solid")) {
    if (!visible(button)) continue;
    const index = Math.floor((button.getBoundingClientRect().top + window.scrollY) / window.innerHeight);
    perViewport[index] = (perViewport[index] ?? 0) + 1;
  }

  const scope = document.querySelector("[data-design-system]") ?? root;
  return {
    overflow: root.scrollWidth > width ? { scrollWidth: root.scrollWidth, offenders } : null,
    clipped,
    blankFrames,
    minFontPx,
    // The size that carries most of the running text: help text and footnotes may be smaller, the body may not.
    bodyFontPx: Number(Object.entries(runningText).sort(([, a], [, b]) => b - a)[0]?.[0] ?? NaN) || null,
    missingFonts: [...new Set(missing)],
    solidCtas: { aboveFold: perViewport[0] ?? 0, maxPerViewport: Math.max(0, ...Object.values(perViewport)) },
    theme: {
      designSystem: scope.getAttribute("data-design-system"),
      colorScheme: scope.getAttribute("data-color-scheme"),
      primary: getComputedStyle(scope).getPropertyValue("--color-primary").trim() || null,
      font: firstFamily(getComputedStyle(document.body)),
    },
  };
};

/** Screenshots and measures every route at every width. */
export const shoot = async ({ chromium, executablePath, url, routes, widths, outDir }) => {
  mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ executablePath, headless: true });
  const pages = [];
  try {
    for (const route of routes) {
      for (const width of widths) {
        const height = width <= SHOT_VIEWPORT.phoneMaxWidth ? SHOT_VIEWPORT.phoneHeight : SHOT_VIEWPORT.height;
        const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
        const consoleErrors = [];
        page.on("console", (message) => {
          if (message.type() === "error") consoleErrors.push(message.text());
        });
        page.on("pageerror", (error) => consoleErrors.push(error.message));
        const response = await page.goto(new URL(route, url).href, { waitUntil: "networkidle" });
        if (response && response.status() >= 400) throw new Error(`${route} answered HTTP ${response.status()}.`);
        await page.evaluate(async () => {
          await document.fonts.ready;
        });
        const metrics = await page.evaluate(measure, SYSTEM_FONT_FAMILIES);
        const file = path.join(outDir, `${routeSlug(route)}-${width}.png`);
        await page.screenshot({ path: file, fullPage: true });
        await page.close();
        pages.push({ route, width, file, consoleErrors, ...metrics });
      }
    }
  } finally {
    await browser.close();
  }
  return pages;
};

/** Human-readable problems found in the measured pages. */
export const problems = (pages) => pages.flatMap(({ route, width, overflow, clipped, consoleErrors, bodyFontPx, missingFonts, solidCtas }) => {
  const at = `${route} at ${width}px`;
  return [
    overflow && `${at}: horizontal scroll (${overflow.scrollWidth}px wide) from ${overflow.offenders.join(", ") || "the page"}`,
    clipped.length && `${at}: content cut off: ${clipped.join(", ")}`,
    consoleErrors.length && `${at}: ${consoleErrors.length} console error(s), first: ${consoleErrors[0]}`,
    bodyFontPx !== null && bodyFontPx < SHOT_LIMITS.bodyFontPx &&
      `${at}: body text at ${bodyFontPx}px (minimum ${SHOT_LIMITS.bodyFontPx}px)`,
    missingFonts.length && `${at}: fonts not loaded: ${missingFonts.join(", ")}`,
    solidCtas.maxPerViewport > SHOT_LIMITS.solidCtasPerViewport && `${at}: ${solidCtas.maxPerViewport} solid buttons in one viewport`,
  ].filter(Boolean);
});

const formatReport = ({ url, pages, problems: found }, managed) => {
  const { theme } = pages[0];
  return [
    `Screenshots of ${url}:`,
    ...pages.map(({ file }) => `  ${file}`),
    `Theme: ${[theme.designSystem ?? "no data-design-system", theme.colorScheme, theme.primary && `--color-primary ${theme.primary}`, theme.font]
      .filter(Boolean).join(" · ")}`,
    found.length ? "Problems:" : "No problems found.",
    ...found.map((problem) => `  - ${problem}`),
    ...(pages.some(({ blankFrames }) => blankFrames)
      ? ["Note: iframes from other origins (maps, video) show blank in full-page shots; Chrome paints them only on screen."]
      : []),
    ...(managed ? ["The dev server keeps running for the next round; stop it with npx neus shot --stop."] : []),
  ].join("\n");
};

export const run = async (argv, root = process.cwd()) => {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      url: { type: "string" },
      widths: { type: "string", default: SHOT_WIDTHS },
      browser: { type: "string" },
      timeout: { type: "string", default: SHOT_TIMEOUT_S },
      json: { type: "boolean" },
      stop: { type: "boolean" },
      help: { type: "boolean", short: "h" },
    },
  });
  if (values.help) {
    process.stdout.write(`${HELP}\n`);
    return 0;
  }
  if (values.stop) {
    process.stdout.write(`${stopServer(root)}\n`);
    return 0;
  }
  const widths = values.widths.split(",").map(Number);
  if (widths.some((width) => !Number.isInteger(width) || width < 200)) throw new Error("--widths takes pixel widths such as 1440,390.");
  const timeout = Number(values.timeout);
  if (!(timeout > 0)) throw new Error("--timeout takes a number of seconds.");

  const playwright = await loadPlaywright(root);
  const chromium = playwright?.chromium ?? playwright?.default?.chromium;
  if (!chromium) {
    process.stderr.write(`${NO_PLAYWRIGHT}\n`);
    return 2;
  }
  const executablePath = findBrowser(values.browser, chromium);
  if (!executablePath) {
    process.stderr.write(`${NO_BROWSER}\n`);
    return 2;
  }
  const server = await devServer(root, values.url, timeout * 1000);
  const pages = await shoot({
    chromium, executablePath, url: server.url, routes: positionals.length ? positionals : ["/"], widths,
    outDir: path.join(neusDir(root), "shots"),
  });
  const report = {
    url: server.url,
    browser: executablePath,
    pages: pages.map((page) => ({ ...page, file: toPosix(path.relative(root, page.file)) })),
    problems: problems(pages),
  };
  process.stdout.write(`${values.json ? JSON.stringify(report, null, 2) : formatReport(report, server.managed)}\n`);
  return 0;
};
