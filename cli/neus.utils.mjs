import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const PACKAGE_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export const readJson = (file) => existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : null;
export const toPosix = (value) => value.split(path.sep).join("/");

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
