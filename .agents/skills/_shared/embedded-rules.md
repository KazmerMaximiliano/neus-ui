# Embedded Rules — Neus UI Skills

**This file is the source of truth for the `## Shared Rules (Embedded)` section in every SKILL.md.**
Copy the section below verbatim into each skill. Update this file first, then propagate.

---

## Shared Rules (Embedded)

> These rules are always active. They apply even if `_shared/` files are not read.

### Output — always three files

Every skill output: `ComponentName.types.ts` → `ComponentName.tsx` → `ComponentName.styles.css`.
No inline styles (`style={{}}`). No `<style>` tags inside components. CSS only in `.styles.css`.

### Imports

```tsx
// CORRECT
import { Button, Card, Input, Badge, Link, Select, Modal, DataTable } from 'neus-ui';

// WRONG — never import from internal paths
import { Button } from '../../components/Button/Button';
```

### Types

All `type` / `interface` declarations → `ComponentName.types.ts`. Never declare types in `.tsx`.

### React 19 — No FormEvent

Never `import { FormEvent } from 'react'`. Use `<Button type="submit" onClick={...} />` instead.

### Component Prop Constraints

**Button**
- `variant`: `"solid"` | `"outlined"` | `"text"` — `"ghost"` / `"outline"` do NOT exist
- `color`: `"primary"` | `"success"` | `"error"` | `"info"` | `"white"` — `"secondary"` / `"danger"` do NOT exist
- `size`: `"small"` | `"medium"` | `"large"` — no other values
- `color="white"`: dark canvas only — white solid/outlined/text on dark surfaces; do NOT use on light bg

**Card**
- `variant`: `"default"` | `"glass"` — `"glass"` for dark canvas glass-morphism; light mode uses `"default"`
- Free-form content via `children`; `title`/`description`/`icon` are simple slot props

**Badge**
- `color`: `"primary"` | `"success"` | `"error"` | `"info"` | `"neutral"` — `"gray"` does NOT exist
- `variant`: `"solid"` | `"dot"`
- Use `<Badge>` for all category pills and status tags — never raw `<span>`

**Link**
- `type`: `"primary"` (brand color, for light/nav) | `"secondary"` (muted gray, works on any bg)
- `onClick` supported — use for in-page actions without navigation
- Never use raw `<a>` tags — always use `<Link>`

**Select**
- No `required` prop — handle validation externally
- Valid props: `options`, `name`, `value`, `defaultValue`, `placeholder`, `label`, `error`, `disabled`, `onChange`

**FormTemplate**
- Only 3 props: `children`, `submitLabel`, `loading`
- No `onSubmit` / `onCancel` / `cancelLabel` — wrap with `<form onSubmit>` externally

**Stepper**
- `currentStep` is 0-indexed — first step = `currentStep={0}`
- `labels.length` must equal `totalSteps` when provided

**Input / DateInput / TimeInput**
- Use these components for all form fields — never raw `<input>` elements

### Slop Blacklist (abbreviated)

- No inline styles / `style={{}}` / `<style>` tags
- No hardcoded data arrays when user said data comes from API — use `data: Entity[]` props
- No invented copy (fake testimonials, placeholder names, fake metrics)
- No decorative elements not requested in intake
- No `any` TypeScript type
- No `import { FormEvent } from 'react'`
- No `type` / `interface` in `.tsx` files
- No raw `<a>`, `<span>`, `<input>`, `<button>` when a Neus UI component exists
- No hardcoded font stacks — use `var(--font-display)` / `var(--font-mono)`
- No colors outside `var(--color-*)` unless ThemeProvider override was requested
- In dark mode: no `var(--color-primary-light)` as section background (light-mode-only)
- In dark mode: no raw div cards — use `<Card variant="glass">`

### Self-Critique (run before emitting)

| Dimension | Pass condition |
|-----------|---------------|
| Visual hierarchy | Primary action prominent; secondary subordinate |
| Component usage | Every UI element uses Neus UI component if one exists |
| Theme coherence | All colors via `var(--color-*)` or ThemeProvider; no hardcoded hex |
| Field specificity | Field count in output == field count in intake; zero extras |
| Visual containment | No decorative noise; every element serves a function |

### VISUAL DIRECTIVE format

When Mode is resolved, declare the directive before Phase 2:

```
VISUAL DIRECTIVE
  Mode: dark | light
  Palette: Neutral | Vibrant | Minimal | Warm | Cool
  Personality: [chosen from intake or default]
  Surface file: dark-surfaces.md | light-surfaces.md
```

Apply the surface file recipes throughout all output.
