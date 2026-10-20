/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// https://vite.dev/config/
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import packageJson from './package.json' with { type: 'json' };
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const EXTERNAL_PACKAGES = Object.keys({ ...packageJson.dependencies, ...packageJson.peerDependencies });

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        index: path.resolve(dirname, 'src/index.ts'),
        theme: path.resolve(dirname, 'src/theme.ts'),
        sections: path.resolve(dirname, 'src/sections.ts'),
        design: path.resolve(dirname, 'src/design.ts'),
      },
      formats: ['es'],
      cssFileName: 'neus-ui'
    },
    rolldownOptions: {
      // Dependencies stay external so apps only download what they import;
      // their stylesheets are still bundled into neus-ui.css.
      external: (id) => !id.endsWith('.css') && EXTERNAL_PACKAGES.some((name) => id === name || id.startsWith(`${name}/`)),
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        // Modules that import React are client modules for React Server Components;
        // data modules (DESIGN_SYSTEMS, resolveTheme) stay usable on the server.
        banner: (chunk) => chunk.imports.some((id) => /^react(-dom)?($|\/)/.test(id)) ? '"use client";' : ''
      }
    },
    cssCodeSplit: false
  },
  test: {
    testTimeout: 30000,
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['src/**/*.test.{ts,tsx}'],
          exclude: ['src/**/*.browser.test.tsx', 'src/**/*.ssr.test.tsx', 'src/design-systems/tooling/**'],
          setupFiles: ['./vitest.setup.ts']
        }
      },
      {
        extends: true,
        test: {
          name: 'ssr',
          environment: 'node',
          include: ['src/**/*.ssr.test.tsx']
        }
      },
      {
        extends: true,
        test: {
          name: 'cli',
          environment: 'node',
          include: ['cli/**/*.test.mjs']
        }
      },
      {
        extends: true,
        test: {
          name: 'design-system-generator',
          environment: 'node',
          include: ['src/design-systems/tooling/tests/**/*.test.ts']
        }
      },
      {
        extends: true,
        test: {
          name: 'design-systems',
          include: ['src/design-systems/**/*.browser.test.tsx'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }]
          },
          setupFiles: ['./vitest.setup.ts']
        }
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook')
          })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{
              browser: 'chromium'
            }]
          },
          setupFiles: ['.storybook/vitest.setup.ts']
        }
      }
    ]
  }
});