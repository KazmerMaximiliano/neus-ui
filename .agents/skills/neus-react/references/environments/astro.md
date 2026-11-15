# React islands in Astro

Source: the qota and magicpalooza guides (Astro first, React opt-in) plus the
portfolio site. Verified against the Astro 7 docs (November 2026).

## Contents

1. Astro first
2. Project structure
3. React islands
4. Pages and routing
5. Layouts, content and SEO
6. Environment variables and security
7. Validation

## 1. Astro first

- Use `.astro` components for layouts and for static or content-driven UI.
  React is an implementation detail reserved for genuinely interactive islands.
- Ship no client JavaScript unless an interaction requires it. Prefer HTML and
  CSS for navigation, disclosure (`<details>`) and layout behavior.
- Never add a React root, `createRoot`, an `App.tsx` or a client-side router.
  Do not convert a static Astro component to React for familiarity.
- `.astro` components use Astro's default-import semantics (exempt from the
  named-export rule). Their folder has no `index.ts`, and other files import
  the component by file (`../Header/Header.astro`). React islands keep their
  barrel (`../ThemeToggle`).

## 2. Project structure

```text
src/
├── assets/                 images processed by Astro
├── components/
│   ├── Header/             Astro component: Header.astro, .types.ts, .styles.css
│   └── ThemeToggle/        React island: full React component contract
├── content/                content collections (optional)
├── content.config.ts       collection schemas (when collections exist)
├── i18n/                   see i18n.md §5
├── layouts/
│   └── BaseLayout/         BaseLayout.astro, .types.ts (+ .styles.css if needed)
├── pages/                  file-based routes only
├── services/               external integrations: <name>.ts or <name>/
├── styles/global.css       tokens, reset, global rules
└── utils/
```

- Astro components and layouts follow the same folder contract: `Name.astro`,
  `Name.styles.css`, `Name.consts.ts` for reusable constants, and
  `Name.types.ts` whenever the component takes props. As in React, no type is
  declared in the implementation file, frontmatter included.
- The frontmatter imports the props type under the name `Props`:
  `import type { HeaderProps as Props } from "./Header.types";`. Astro reads
  that name to type-check every `<Header … />` usage. Do not cast
  `Astro.props as HeaderProps`: with no `Props` in scope, Astro types the
  component as `Record<string, any>`, and wrong or missing props go unnoticed.
- The `.types.ts` is used inside the folder by the component, so it needs no
  barrel. Another file that needs the type imports it by path
  (`../Header/Header.types`).
- React islands live in `src/components/` next to Astro components and follow
  the full React contract from `components.md`.
- Do not create `hooks/` or `providers/` folders until an interactive feature
  needs them.

```astro
---
// Header.astro
import { ThemeToggle } from "../ThemeToggle";
import type { HeaderProps as Props } from "./Header.types";
import "./Header.styles.css";

const { title } = Astro.props;
---

<header class="header">
  <a class="header__brand" href="/">{title}</a>
  <ThemeToggle client:idle labels={{ light: "Tema claro", dark: "Tema oscuro" }} />
</header>
```

On a single-locale site without i18n, the copy lives in the `.astro` parent, as
above. With i18n, pass the translated strings instead (§3). Either way, the
island receives its copy as props.

## 3. React islands

- Apply the least eager directive that works:
  - `client:visible` for anything below the fold;
  - `client:idle` for above-the-fold controls that are not needed in the first
    milliseconds;
  - `client:media="(query)"` for behavior that only exists at some breakpoints;
  - `client:load` only when the behavior must be available immediately;
  - `client:only="react"` only when server rendering is impossible.
- Never add `client:load` by default, and do not hydrate an island that
  renders correctly without browser behavior.
- Pass only serializable props (strings, numbers, booleans, plain objects and
  arrays). No functions, class instances or JSX props. Pass content through
  slots (`children` or named slots).
- Pass copy as props: plain strings from the `.astro` parent on a single-locale
  site, translated strings or the current locale when the site has i18n
  (`i18n.md` §5). Islands do not initialize their own translation runtime.
- Browser APIs (`window`, `document`, `localStorage`, `matchMedia`) are touched
  only inside effects or event handlers. Islands are server-rendered first
  unless `client:only` is set.
- Do not introduce global providers for state local to one island.
- Frontmatter runs on the server or at build time. Keep browser-only code out of
  it.

## 4. Pages and routing

- Routes are defined only by files in `src/pages/`. Do not add React Router, a
  parallel route registry, or path constants that imitate one.
- Route files use kebab-case (`privacy-policy.astro`). Dynamic routes use
  `[param].astro` with `getStaticPaths()` for static builds.
- Every `.astro`, `.md`, `.mdx`, `.html`, `.js` and `.ts` file in `src/pages/`
  becomes a route (`.js`/`.ts` as endpoints). Prefix helpers with `_`, or better,
  keep components, utilities and tests out of `src/pages/` entirely.
- Prefer one page with semantic sections and anchor navigation while the
  product is single-page. Add routes only when the content needs separate URLs.
- Pages compose layouts, sections and components; they should not accumulate
  duplicated markup.
- Add redirects in `astro.config.mjs` only for real legacy or canonical URLs.

## 5. Layouts, content and SEO

- `layouts/BaseLayout/BaseLayout.astro` owns the document: doctype, `<html
lang>`, viewport, title, description, canonical URL, favicon links, the global
  stylesheet import and a `<slot />`. Do not duplicate metadata across pages:
  pass it as layout props. With neus-ui, `NeusLayout.astro` owns the document
  instead (`neus-ui.md` §5).
- Introduce content collections (`src/content/` + `src/content.config.ts` with
  validated schemas) once content needs structured metadata, Markdown authoring,
  several locales or several documents. Install MDX only when JSX inside
  content is truly needed.
- One descriptive `<h1>` per page, a logical heading order, and semantic
  landmarks.
- A unique title and description per route. Add Open Graph metadata only when
  the values and assets are real.
- Use Astro's asset pipeline for local images and always supply dimensions. Keep
  files that need a stable public URL in `public/`.

## 6. Environment variables and security

- Only `PUBLIC_`-prefixed variables reach client code. Prefer the typed
  `astro:env` schema (`envField`) when the project uses it.
- Never pass untrusted HTML to `set:html` without sanitizing it.
- Prefer local or static content over fetching essential text at runtime.
- Analytics, cookies, trackers and remote fonts need explicit approval and a
  matching privacy disclosure.

## 7. Validation

- `pnpm build` always.
- `pnpm astro check` (or a `check` script) only when `@astrojs/check` is
  installed.
- Run lint and test scripts only if they exist. Test React islands with Vitest +
  Testing Library, and test pure utilities with the project's runner.
- When visual behavior changed, inspect the built page or the dev server, and
  verify internal links, fragment identifiers and titles.
