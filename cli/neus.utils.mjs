import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const PACKAGE_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export const readJson = (file) => existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : null;
export const toPosix = (value) => value.split(path.sep).join("/");

/** Relative import specifier from a directory to a file, always starting with "." */
export const importPath = (fromDir, file) => {
  const relative = toPosix(path.relative(fromDir, file));
  return relative.startsWith(".") ? relative : `./${relative}`;
};

/** Detects the host framework and how it renders from the project's package.json. */
export const detectProject = (root) => {
  const pkg = readJson(path.join(root, "package.json")) ?? {};
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  if (deps.next) {
    const appRouter = existsSync(path.join(root, "app")) || existsSync(path.join(root, "src/app"));
    return { framework: "next", rendering: appRouter ? "rsc" : "ssr" };
  }
  if (deps.astro) return { framework: "astro", rendering: "islands" };
  if (deps["@react-router/dev"]) return { framework: "react-router", rendering: "ssr" };
  if (deps["@tanstack/react-start"]) return { framework: "tanstack-start", rendering: "ssr" };
  if (deps["@remix-run/react"]) return { framework: "remix", rendering: "ssr" };
  if (deps.vite) return { framework: "vite", rendering: "spa" };
  return null;
};

/**
 * The section under `heading` (a full heading line such as "## Usage"), heading included, up to the
 * next heading of the same or a higher level outside a code fence. Null when the heading is absent.
 */
export const markdownSection = (text, heading) => {
  const lines = text.split("\n");
  const start = lines.indexOf(heading);
  if (start === -1) return null;
  const level = heading.indexOf(" ");
  let fenced = false;
  let end = lines.length;
  for (let index = start + 1; index < lines.length; index += 1) {
    if (lines[index].startsWith("```")) fenced = !fenced;
    const hashes = lines[index].match(/^(#+) /)?.[1].length;
    if (!fenced && hashes && hashes <= level) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join("\n").trim();
};
