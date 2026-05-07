# Prop Constraints — Neus UI

**Read this before emitting any TSX.** Every item below is a bug that has occurred in generated code. Violating these rules produces TypeScript compile errors.

---

## Button

**Valid `variant` values:** `"solid"` | `"outlined"` | `"text"`

- `"outline"` → does NOT exist → TS error
- `"ghost"` → does NOT exist → TS error
- `"primary"` → does NOT exist as variant → TS error

**Valid `color` values:** `"primary"` | `"success"` | `"error"` | `"info"`

- `"secondary"` → does NOT exist → TS error
- `"danger"` → does NOT exist → TS error
- `"default"` → does NOT exist → TS error

**For a "back" or "cancel" button** use `variant="outlined" color="primary"` — NOT ghost/secondary.

```tsx
// CORRECT
<Button label="← Back" variant="outlined" color="primary" onClick={onBack} />
<Button label="Cancel" variant="text" color="primary" onClick={onCancel} />

// WRONG — these do not exist
<Button variant="ghost" color="secondary" />
```

---

## Card

`title`, `description`, and `icon` are **optional slot props** — they render fixed text nodes inside the card. For free-form content use `children`.

```tsx
// CORRECT — use slots for simple feature tiles
<Card icon={<Package size={24} />} title="Title here" description="Description here" />

// CORRECT — use children for custom layouts
<Card leading={<Package size={24} color="var(--color-primary)" />}>
  <p className="feature__title">Title here</p>
  <p className="feature__desc">Description here</p>
</Card>
```

**Behavioral props** (`highlighted`, `selected`, `disabled`, `onClick`) only modify the shell's visual state — they never change layout.

**`onClick` makes Card a `<button>`.** When `onClick` is provided the root element changes to `<button>`. Use this for selectable card patterns.

**No `variant` prop.** Card has no variant system — layout is always controlled by the developer via `children`.

---

## FormTemplate

**Only 3 props exist:** `children`, `submitLabel`, `loading`.

There is NO `onSubmit`, NO `onCancel`, NO `cancelLabel` prop.

Form submission must be handled by wrapping the content in a `<form>` element with an `onSubmit` handler, or by wiring the submit button externally.

```tsx
// CORRECT — FormTemplate only wraps layout
<FormTemplate submitLabel="Save" loading={loading}>
  <Input name="name" label="Name" />
</FormTemplate>

// WRONG — these props do not exist
<FormTemplate
  onSubmit={handleSubmit}   // ← does not exist
  onCancel={handleCancel}   // ← does not exist
  cancelLabel="Cancel"      // ← does not exist
  submitLabel="Save"
>
```

**Pattern for form submission:** wrap FormTemplate in a `<form>` tag:

```tsx
<form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
  <FormTemplate submitLabel="Save" loading={loading}>
    <Input name="name" label="Name" />
  </FormTemplate>
</form>
```

---

## Select

**No `required` prop.** Required field validation must be handled externally (not via Select prop).

```tsx
// CORRECT
<Select name="status" label="Status" options={statusOptions} />

// WRONG — required does not exist on Select
<Select name="status" required />
```

Valid Select props: `options`, `name`, `value`, `defaultValue`, `placeholder`, `label`, `error`, `disabled`, `viewSearchBar`, `searchBarPlaceholder`, `onChange`.

---

## Link

**Valid props:** `label`, `type`, `href`, `onClick`

**`onClick` is supported** — use for inline actions in hero/CTA sections without page navigation.

**`type` visual behavior:**

- `type="primary"` → brand color text. Use on **light/white backgrounds** (nav headers, body, hero)
- `type="secondary"` → muted gray (`--color-gray-500`). Legible on **both light and dark** backgrounds

```tsx
// CORRECT — primary in white nav header
<Link label="Features" type="primary" href="#features" />

// CORRECT — secondary as subdued style (works on any background)
<Link label="Terms" type="secondary" href="/terms" />

// CORRECT — onClick for hero CTA without navigation
<Link label="See how it works →" type="primary" onClick={onSecondaryAction} />

// WRONG — secondary is no longer invisible on light backgrounds; this is now valid
// (old guidance was wrong — secondary now uses --color-gray-500)
```

---

## SidebarItem — NOT importable from `neus-ui`

`SidebarItem` is an internal type. It is **not exported** from the `neus-ui` package.

```tsx
// WRONG — this import does not exist
import type { SidebarItem } from 'neus-ui';

// CORRECT — define locally or use inline
type SidebarItem = {
  label: string;
  icon?: React.ComponentType<{ size?: number }>;
  onClick?: () => void;
  active?: boolean;
  visible?: boolean;
};
```

---

## Stepper

**`currentStep` is 0-indexed.** Step 0 = first step. Do NOT pass 1 for the first step.

**`labels` length MUST equal `totalSteps`** when provided, or labels are silently ignored.

**`onStepClick` only fires on completed steps** (index < currentStep). Active and inactive steps are not clickable regardless of whether the prop is provided.

```tsx
// CORRECT — 3 steps, currently on second (index 1)
<Stepper currentStep={1} totalSteps={3} labels={["First", "Second", "Third"]} showLabels />

// WRONG — 1-indexed; renders active on second dot instead of first
<Stepper currentStep={1} totalSteps={3} /> // if user is on first step, pass currentStep={0}
```

**Variant guide:**
- `"dots"` → onboarding flows with named steps
- `"linear"` → wizard forms with progress bar + "Step N of M" counter
- `"simple"` → minimal indicator, no numbers

---

## Badge

`Badge` **exists** in `neus-ui`. Use it for status indicators and categorical labels.

```tsx
import { Badge } from 'neus-ui';

<Badge label="Active" variant="solid" color="success" />
<Badge label="Inactive" color="neutral" />
```

Valid `color` values: `"primary"` | `"success"` | `"error"` | `"info"` | `"neutral"`.
Valid `variant` values: `"solid"` | `"dot"`.

Do NOT use raw `<span>` workarounds — use Badge instead.

---

## CSS — always a separate file, never inline

CSS must **never** be placed inside the component. Two forbidden patterns:

```tsx
// WRONG — <style> tag inside component
export const MyComponent = () => (
  <>
    <style>{`.my-class { color: red; }`}</style>
    <div className="my-class">...</div>
  </>
);

// WRONG — inline style prop
<div style={{ color: 'red', padding: '1rem' }} />
```

```tsx
// CORRECT — import a dedicated CSS file
import './MyComponent.styles.css';

export const MyComponent = () => (
  <div className="my-component">...</div>
);
```

Every skill output must be **two files**: `ComponentName.tsx` + `ComponentName.styles.css`.

---

## lucide-react — NOT installed by default

Skills that use lucide-react icons must note in a comment at the top of the file:

```tsx
// Requires: pnpm add lucide-react
import { Home, Users, Package } from 'lucide-react';
```

If the consumer project does not have lucide-react installed, all icon imports will fail. The skill output should include this note.

---

## Quick Reference — What does NOT exist

| Import / Prop | Status | Fix |
|---------------|--------|-----|
| `Button variant="ghost"` | ❌ does not exist | Use `variant="outlined"` or `variant="text"` |
| `Button variant="outline"` | ❌ typo | Use `variant="outlined"` |
| `Button color="secondary"` | ❌ does not exist | Use `color="primary"` |
| `Button color="danger"` | ❌ does not exist | Use `color="error"` |
| `Card variant="..."` | ❌ prop does not exist | No variant system — use `children` for layout |
| `FormTemplate onSubmit` | ❌ prop does not exist | Wrap with `<form onSubmit>` |
| `FormTemplate onCancel` | ❌ prop does not exist | Handle cancel externally |
| `FormTemplate cancelLabel` | ❌ prop does not exist | No cancel button in FormTemplate |
| `Select required` | ❌ prop does not exist | Handle validation externally |
| `Stepper currentStep={1}` (first step) | ❌ off-by-one | Use `currentStep={0}` for first step |
| `Badge color="gray"` | ❌ value does not exist | Use `color="neutral"` |
| `import type { SidebarItem } from 'neus-ui'` | ❌ not exported | Define type locally |
