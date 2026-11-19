import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist", "coverage", "storybook-static", "docs/examples"]),
  {
    rules: {
      "padding-line-between-statements": [
        "error",
        { blankLine: "never", prev: "import", next: "import" },
      ],
    },
  },
  {
    files: ["cli/**/*.mjs", "skills/**/*.mjs"],
    extends: [js.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      // The import order of AGENTS.md, fixed on save; one inner array keeps the steps without blank lines.
      "simple-import-sort/imports": ["error", {
        groups: [[
          "^react(-dom)?(/.*)?$",
          "^@?\\w",
          "^\\.",
          "^@?\\w.*\\u0000$",
          "^\\..*\\u0000$",
          "^\\.[./]*/[^/]+\\.consts$",
          "^\\.[./]*/[^/]+\\.utils$",
          "^\\u0000",
        ]],
      }],
    },
  },
]);
