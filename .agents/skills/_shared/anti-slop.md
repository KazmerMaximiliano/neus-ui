# Anti-AI-Slop Rules for Neus Design

Apply these rules in EVERY skill before emitting any artifact.

## Slop Blacklist — Never do these

- Add fields, columns, or sections not explicitly requested in the intake
- Hardcode option arrays in Select/MultiSelect when user said data comes from API
- Use inline styles (`style={{}}`) when a CSS variable or component prop exists
- Import from internal paths like `../../components/Button/Button` — always use `neus-ui`
- Invent copy: fake testimonials, made-up metrics, placeholder company names like "Acme Corp"
- Add decorative elements (gradients, emojis as icons, random illustrations) unless requested
- Use colors outside `var(--color-*)` CSS variables unless ThemeProvider override was requested
- Generate a sidebar or AppTemplate for landing/marketing pages
- Add features not in the intake ("I added a search bar just in case")
- Use `any` TypeScript type — always type props correctly
- Import `FormEvent` from React — React 19: use Button `type="submit"` + `onClick` instead
- Declare `type` or `interface` in a `.tsx` file — all types must live in `ComponentName.types.ts`
- Hardcode `Arial`, `Helvetica`, or generic `sans-serif` as a display font stack — use `var(--font-display)` (Manrope is now the library default)
- Use flat `border` to style a Button outlined element — the component uses `inset box-shadow` internally; a border override will conflict visually
- Override Button disabled opacity with `0.6` — the current spec is `0.4`
- Use `var(--color-white)` or `background: white` as the page background when `Mode: dark` — use `#0a0a14` canvas + surfaces from `dark-surfaces.md`
- Use a raw `<div>` with custom CSS for content cards in dark mode — use `<Card variant="glass">` instead
- Skip the sticky glass nav on dark landing pages — always include a nav with `position: sticky; backdrop-filter: blur(20px)`
- Use raw `<a>` tags for nav or footer links — always use `<Link type="secondary" href label />`
- Use raw `<span>` elements for category or content tags — always use `<Badge variant="solid" color={BADGE_COLOR[cat] ?? "neutral"} label={cat} />`
- Use raw `<input>` + `<button>` for newsletter/email forms — always use Neus UI `<Input>` + `<Button>` in a flex layout
- Omit the eyebrow pill in dark mode hero — always include it (glowing dot + mono label)
- Skip gradient text when `Mode: dark` + `Palette: Vibrant` — apply `.gradient-text` to the H1 accent word
- Use `var(--color-primary-light)` as a section background in dark mode — it is a light-mode-only utility; use `rgba` surfaces in dark

## Self-Critique Mandatory (5 dimensions)

Run this internal check before emitting code. If any dimension fails, fix it first.

| Dimension | Pass condition |
|-----------|---------------|
| **Jerarquía visual** | Primary action is visually prominent; secondary actions are subordinate |
| **Uso de componentes** | Every UI element uses a Neus UI component if one exists; CSS only for gaps |
| **Coherencia del tema** | All colors use `var(--color-*)` or ThemeProvider config; no hardcoded hex |
| **Especificidad de campos** | Field count in output == field count in intake; zero extras |
| **Contención visual** | No decorative noise; every element serves a function |

## Two Anti-Slop Profiles

### App Views (page-*, flow-*, layout-app)
- No extra fields in forms or tables
- Props for API-driven data: `data: Entity[]`, `options: SelectOption[]`
- No hardcoded data arrays in component body
- Actions handler props always optional: `onEdit?: () => void`

### Marketing Pages (landing-*, page-auth, page-blog)
- Copy comes 100% from intake — no invented headlines, features, or pricing
- If user said "no social proof" → zero testimonials in output
- No stock photo placeholders unless user requested images
- Nav items must match exactly what user specified

## CSS Rules

1. Check component props first — `color`, `variant`, `fullWidth`, `size` cover most needs
2. Use `var(--color-primary)`, `var(--color-gray-300)` etc. for theme consistency
3. Custom CSS only when component props cannot achieve the layout requirement
4. Never override component internals with `!important`
5. Prefer `var(--fs-*)` tokens over hardcoded `px` font sizes (e.g. `var(--fs-sm)` instead of `13px`)
6. Prefer `var(--space-*)` tokens over hardcoded `px` spacing where a token maps cleanly
7. Prefer `var(--radius-sm)`, `var(--radius-md)`, `var(--radius-pill)` over hardcoded radius values
8. Use `var(--font-display)` for headings and UI labels; `var(--font-mono)` for code, metadata, KPI labels

**Dark mode CSS rules:**

9. When `Mode: dark`: use `dark-surfaces.md` recipes instead of `var(--color-*)` for backgrounds and borders. The `var(--color-*)` tokens are light-mode-first; dark mode uses explicit `rgba(...)` values from the surface system.
10. Glass card surfaces: `background: rgba(20,20,40,0.55); backdrop-filter: blur(14px); border: 1px solid rgba(255,255,255,0.08)` — copy verbatim from `dark-surfaces.md §2`
11. Gradient text: define `.gradient-text { background: linear-gradient(135deg, #22d3ee 0%, #818cf8 45%, #d946ef 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }` in the component's `.styles.css`; apply as `<span className="gradient-text">` in JSX

**CRITICAL — CSS must always go in a separate file. Never inline.**

- **NEVER** use `<style>{...}</style>` tags inside a component — this is the primary source of unscoped, hard-to-override styles
- **NEVER** use `style={{}}` inline style props
- **ALWAYS** output CSS in a dedicated `ComponentName.styles.css` file and import it:

```tsx
// ComponentName.tsx
import './ComponentName.styles.css';
```

```css
/* ComponentName.styles.css */
.component-name { ... }
```

Each skill output is **three files minimum**: `ComponentName.tsx` + `ComponentName.styles.css` + `ComponentName.types.ts`.

**Types file pattern** — all `type` and `interface` declarations MUST live in `ComponentName.types.ts`, not in the `.tsx` file:

```ts
// ComponentName.types.ts
export type Entity = {
  id: number;
  // ...fields from intake
};

export type EntityProps = {
  data: Entity[];
  onEdit?: (item: Entity) => void;
  // ...
};

// SidebarItem is NOT exported from neus-ui — define it here
export type SidebarItem = {
  label: string;
  icon?: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;
};
```

```tsx
// ComponentName.tsx — import types, never redeclare them
import type { Entity, EntityProps } from './ComponentName.types';
import './ComponentName.styles.css';
```

## React 19 — Form Handling

NEVER use `import { FormEvent } from 'react'` or `import type { FormEvent } from 'react'`.

Use Button with `type="submit"` and `onClick`. No `<form onSubmit>` handler needed:

```tsx
<Button
  label="Submit"
  type="submit"
  variant="solid"
  color="primary"
  onClick={() => onSubmit?.(data)}
/>
```

## Import Rule

```tsx
// CORRECT
import { Button, Card, DataTable, Modal } from 'neus-ui';

// WRONG
import { Button } from '../../components/Button/Button';
import { Card } from '../Card/Card';
```
