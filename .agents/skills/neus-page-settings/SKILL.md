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

Read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Input, Select, Checkbox, Button sections
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates

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

## Phase 1 — P0 Verification

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


```css
.settings-page { padding: 1.5rem; max-width: 800px; }
.settings-page h1 { font-size: 1.5rem; font-weight: 600; margin-bottom: 2rem; color: var(--color-gray-900); }
.settings-page__section {
  background: var(--color-white);
  border: 1px solid var(--color-border-light);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}
.settings-page__section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-gray-700);
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
