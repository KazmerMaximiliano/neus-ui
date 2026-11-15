# Styling

This file covers how CSS is written and organized. How the interface looks
(palette, type, spacing scale, layout, motion) is the design source's call
(SKILL.md, "Code, not visual design"); the values in the examples below are
placeholders. With neus-ui, read `neus-ui.md` §3 first: it replaces parts of
this file.

## Contents

1. Where styles live
2. BEM
3. Design tokens
4. Dynamic values
5. Responsive, accessible CSS
6. Library theming
7. Other styling systems

## 1. Where styles live

- A component, page or template with something of its own to style (its own
  markup, or classes it hands to another component's parts) imports its own
  `Name.styles.css`. One that only arranges other components has none. Styles
  are never mixed into the implementation: no inline `style` objects, no
  CSS-in-JS, no `<style>` tags in React components.
- Tokens, the reset, base typography, the body background and global
  accessibility rules live in **one** global stylesheet, imported once at the app
  entry or root layout:

  | Profile / host                       | Global stylesheet                                              |
  | :----------------------------------- | :------------------------------------------------------------- |
  | Hexagonal app                        | `src/core/presentation/styles/global.css`                      |
  | Responsibility folders (Vite, Astro) | `src/styles/global.css`                                        |
  | Next.js                              | `src/styles/global.css`, imported in the root `app/layout.tsx` |
  | Laravel + Inertia                    | `resources/css/app.css`                                        |
  | Library                              | the theme/tokens stylesheet the package exports                |

- Styles that belong to the whole page do not go into a component stylesheet.

## 2. BEM

- **Block**: the component name in kebab-case (`ProjectCard` → `.project-card`).
  A component owns exactly one root block.
- **Element**: `.project-card__name`. Never chain elements
  (`__header__title`); flatten to `.project-card__title`.
- **Modifier**: `.project-card--danger`, `.project-card__name--muted`.
- No standalone generic modifiers (`.disabled`, `.active`, `.error`). They leak
  across components. Use a block modifier, a native pseudo-class (`:disabled`,
  `:checked`) or an ARIA/data attribute (`[aria-current="page"]`,
  `[data-state="open"]`).
- Prefer a class over element selectors or nesting. Keep specificity low.
  Never style components with IDs or `!important`. `!important` is acceptable
  only to override a third-party style you cannot otherwise control, with a
  comment.
- Never reach into another component's block (`.project-card .button__label`).
  Style the child through its public props or variants.
- When the design calls for interaction states, write them with native
  pseudo-classes (`:hover`, `:focus-visible`, `:disabled`) rather than React
  state, and keep keyboard focus clearly visible.

```css
.project-card {
  display: grid;
  gap: var(--space-2);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
}

.project-card--danger {
  border-color: var(--color-danger);
}

.project-card--disabled {
  opacity: 0.5;
}

.project-card__action:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

.project-card__action:disabled {
  cursor: not-allowed;
}
```

## 3. Design tokens

- Every color, spacing value, radius, font, font size, shadow, z-index and
  duration comes from a CSS custom property declared in the global stylesheet.
  Do not hardcode `8px 16px` or `#1a1a1a` inside a component.
  - Fine without tokens: `0`, hairline widths (`1px`, `2px`), percentages, `fr`,
    layout keywords, and unitless values such as `opacity` or `line-height`
    ratios.
- Name tokens `--<category>-<name>` so they group and autocomplete:
  `--color-*`, `--space-*`, `--radius-*`, `--font-*`, `--fs-*`, `--shadow-*`,
  `--z-*`, `--duration-*`.
- Name color tokens by role (`--color-surface`, `--color-text-muted`,
  `--color-danger`) rather than by hue (`--red`), so themes can change without
  renaming.
- When the design needs a value the stylesheet lacks (a new semantic token, or
  a light, dark or opacity variant), add it to the global stylesheet next to its
  base token. Take the value from the design source, and never compute a private
  variant inside a component (`color-mix(...)` with a literal, or a hand-tuned
  hex).
- Before adding a token, use the ones the project already has. Read the global
  stylesheet first.

## 4. Dynamic values

Inline styles are forbidden with one exception: a runtime value that CSS cannot
know, such as a progress percentage, a measured size or a user-picked color.
Expose it as a narrowly scoped custom property and let the stylesheet use it:

```tsx
import type { CSSProperties } from "react";

// Progress comes from the server; the width transition stays in CSS.
const style = { "--progress-bar-value": `${percent}%` } as CSSProperties;

return <div className="progress-bar" style={style} />;
```

```css
.progress-bar::after {
  inline-size: var(--progress-bar-value, 0%);
}
```

- Prefix the property with the block name so it cannot collide.
- Leave a one-line comment explaining why the value is dynamic.
- Layout props in a library (gap, columns per breakpoint) follow the same
  pattern: they write custom properties such as `--stack-gap-md`, and the
  stylesheet reads them inside its media queries. That way layout keeps
  working with server rendering and islands.

## 5. Responsive, accessible CSS

- Mobile-first: base styles for small screens, `min-width` media queries upward.
  Use the breakpoints the project already defines.
- Prefer relative units (`rem`, `em`, `ch`) for typography and spacing tokens.
- Wrap non-essential motion in
  `@media (prefers-reduced-motion: no-preference)` or disable it under
  `reduce`.
- Keep focus states visible. Never remove outlines without a replacement.
- Do not convey state through color alone. Add text, an icon or a shape.

## 6. Library theming

In a component library, every visual value of a component is either a
component-scoped token or a shared role token:

```css
.button {
  padding: var(--button-padding, var(--space-2) var(--space-4));
  background: var(--button-bg, var(--color-primary));
}
```

Theme packages and design systems then override `--button-*` or the shared
roles without touching component CSS. If the library tests that runtime custom
properties are registered (a tokens test), list new ones there.

## 7. Other styling systems

These conventions assume plain CSS files. If a project has already standardized
on another system (Tailwind, CSS Modules, a CSS-in-JS library), that is the
project's styling convention (precedence rule 2). Follow it consistently and do
not mix BEM files into it. Never introduce one of those systems yourself.
