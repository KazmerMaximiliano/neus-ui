---
name: neus-page-settings
description: |
  Generates a settings/configuration page with grouped form sections using Neus UI components.
  Produces a .tsx file with Input, Select, Checkbox fields organized in sections with save button.
  Use whenever the user asks for: "settings", "configuración", "preferencias", "perfil de usuario",
  "ajustes de la app", "settings page", "config page", "account settings", "preferences page".
  Always use for any configuration or settings view in a Neus UI project.
od:
  mode: prototype
  platform: desktop
  scenario: design
  design_system:
    requires: true
  inputs:
    - name: page_name
      type: string
      required: true
      description: "Settings page name (e.g.: Account Settings, Profile, Preferences)"
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Account settings page with profile section and preferences section"
---

# Neus Page Settings

Generates a settings page with grouped form sections.

## Before starting

The "Shared Rules" section below is always active. Additionally read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Input, Select, Checkbox, Button sections
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates
- `.agents/skills/_shared/dark-surfaces.md` — dark mode CSS recipes (read when Mode: dark)
- `.agents/skills/_shared/light-surfaces.md` — light mode CSS recipes (read when Mode: light)

## Phase 0 — Collect Data

Ask the user these questions and wait for their complete reply before generating:

---

**Layout** — Will the page use AppTemplate?
- Yes, with AppTemplate (recommended) — sidebar + navigation header
- No, content only — no app shell

Also include in your reply:
- Page name
- Configuration sections (e.g.: "Profile: name, email, avatar"; "Notifications: email_alerts:checkbox, sms_alerts:checkbox")
- Exact fields per section with input type
- If using AppTemplate: sidebar items + active route

---

- **Theme mode**: light or dark? (default: light)

## Phase 1 — P0 Verification
## Phase 1 — Visual Resolution

- Mode: `dark` → read `dark-surfaces.md`; use `#0a0a14` canvas, glass surfaces where applicable
- Mode: `light` → read `light-surfaces.md`; use `var(--color-white)` or `var(--color-surface)` backgrounds (default)

Declare:

```
VISUAL DIRECTIVE
  Mode: dark | light
  Surface file: dark-surfaces.md | light-surfaces.md
```



- [ ] Sections and fields in output == intake
- [ ] Current data received as props (`defaultValues`)
- [ ] `onSave` handler as prop

## Phase 2 — Generate Artifact

Produce **three files**: `SettingsPage.tsx` + `SettingsPage.styles.css` + `SettingsPage.types.ts`.

### SettingsPage.types.ts

```ts
export type SettingsData = {
  // ...exact fields from intake
};

export type SettingsPageProps = {
  defaultValues?: Partial<SettingsData>;
  onSave: (data: SettingsData) => void;
  loading?: boolean;
  routes?: SidebarItem[];
};

// SidebarItem is NOT exported from neus-ui — define locally
export type SidebarItem = {
  label: string;
  icon?: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;
};
```

### Base structure

```tsx
import { AppTemplate, Input, Select, Checkbox, Button } from 'neus-ui';
import './SettingsPage.styles.css';
import type { SettingsData, SettingsPageProps, SidebarItem } from './SettingsPage.types';

export const SettingsPage = ({ defaultValues, onSave, loading, routes }: SettingsPageProps) => {
  const [values, setValues] = useState<Partial<SettingsData>>(defaultValues ?? {});

  const handleChange = (field: keyof SettingsData, value: unknown) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const content = (
    <div className="settings-page">
      <h1>Settings</h1>

      {/* Section 1: [Section Name from intake] */}
      <section className="settings-page__section">
        <h2 className="settings-page__section-title">[Section Name]</h2>
        <div className="settings-page__fields">
          {/* Fields from intake for this section */}
        </div>
      </section>

      {/* Repeat for each section */}

      <div className="settings-page__actions">
        <Button
          label="Save changes"
          type="button"
          variant="solid"
          color="primary"
          loading={loading}
          onClick={() => onSave(values as SettingsData)}
        />
      </div>
    </div>
  );

  if (routes) {
    return <AppTemplate routes={routes}>{content}</AppTemplate>;
  }
  return content;
};
```

### SettingsPage.styles.css

Apply Mode from VISUAL DIRECTIVE: `light` → white sections; `dark` → glass surface sections on dark canvas.

```css
.settings-page { padding: 1.5rem; max-width: 800px; }
.settings-page h1 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: var(--color-gray-900);
}
/* Light mode section */
.settings-page__section {
  background: var(--color-white);
  border: 1px solid var(--color-border-light);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}
/* Dark mode section — use when Mode: dark */
/* .settings-page__section {
  background: rgba(20, 20, 40, 0.55);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
} */
.settings-page__section-title {
  font-family: var(--font-mono);
  font-size: 0.6875rem; /* 11px */
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-gray-500);
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--color-border-light);
}
.settings-page__fields {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.settings-page__actions { margin-top: 1.5rem; }
```

---

## Shared Rules (Embedded)

> These rules are always active. They apply even if `_shared/` files are not read.

### Output — always three files

Every skill output: `ComponentName.types.ts` → `ComponentName.tsx` → `ComponentName.styles.css`.
No inline styles (`style={{}}`). No `<style>` tags inside components. CSS only in `.styles.css`.

### Imports

```tsx
import { Button, Card, Input, Badge, Link, Select, Modal, DataTable } from 'neus-ui';
```

Never import from internal paths like `../../components/Button/Button`.

### Types

All `type` / `interface` declarations → `ComponentName.types.ts`. Never declare types in `.tsx`.

### React 19 — No FormEvent

Never `import { FormEvent } from 'react'`. Use `<Button type="submit" onClick={...} />` instead.

### Component Prop Constraints

- **Button** `variant`: `"solid"` | `"outlined"` | `"text"` — `"ghost"` does NOT exist
- **Button** `color`: `"primary"` | `"success"` | `"error"` | `"info"` | `"white"` — `"white"` for dark canvas only
- **Button** `size`: `"small"` | `"medium"` | `"large"`
- **Card** `variant`: `"default"` | `"glass"` — `"glass"` for dark canvas
- **Badge** `color`: `"primary"` | `"success"` | `"error"` | `"info"` | `"neutral"`
- **Link** `type`: `"primary"` (brand) | `"secondary"` (muted gray)
- **Select**: no `required` prop — handle validation externally
- **FormTemplate**: only `children`, `submitLabel`, `loading` — no `onSubmit`/`onCancel`

### Slop Blacklist

- No inline styles / `style={{}}` / `<style>` tags
- No hardcoded data arrays when data comes from API — use typed props
- No invented copy (fake testimonials, placeholder names, fake metrics)
- No `any` TypeScript type
- No raw `<a>`, `<span>`, `<input>`, `<button>` when a Neus UI component exists
- No hardcoded font stacks — use `var(--font-display)` / `var(--font-mono)`
- In dark mode: no `var(--color-primary-light)` as section background; no raw div cards — use `<Card variant="glass">`
