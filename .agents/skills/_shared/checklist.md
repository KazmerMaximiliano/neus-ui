# Neus Design — Quality Checklist

Apply this checklist to every artifact before emitting. P0 items block emission. P1/P2 are post-generation.

---

## P0 — Blockers (must pass before generating)

- [ ] All fields from intake are mapped to Neus UI components
- [ ] No extra fields, columns, or sections added beyond intake
- [ ] AppTemplate used ONLY if user explicitly requested it (never in landing/marketing pages)
- [ ] All imports come from `neus-ui` package (not internal paths)
- [ ] API-driven data is received as typed props, not hardcoded arrays
- [ ] Self-critique 5 dimensions passed (see anti-slop.md)

---

## P1 — Post-generation (verify after writing code)

- [ ] Custom CSS used only when component props cannot achieve the layout
- [ ] ThemeProvider wrapping included when user specified custom colors
- [ ] No hardcoded data that should come from props (option arrays, table rows, etc.)
- [ ] All event handler props are optional: `onEdit?: () => void`
- [ ] TypeScript types are explicit — no `any` usage
- [ ] Neus UI components used for all interactive elements (no bare `<button>`, `<input>`, `<select>`)
- [ ] Page headings use `font-family: var(--font-display)` — not Arial/Helvetica or unspecified
- [ ] Monospace metadata (KPI labels, field labels, table headers) use `font-family: var(--font-mono)`
- [ ] Chosen mode (light/dark) is consistently applied throughout the generated CSS (no white backgrounds in dark mode, no dark backgrounds in light mode)

---

## P2 — Quality (nice-to-have)

- [ ] Missing Neus UI components documented in NEUS-DESING.md "Componentes Pendientes" section
- [ ] CSS class names follow kebab-case convention
- [ ] Responsive behavior considered for mobile (especially for landing pages)
- [ ] Loading/disabled states handled where applicable

---

## Component Availability Quick Check

Before generating, verify which Neus UI components cover the requirements:

| Need | Use |
|------|-----|
| Table with sorting/pagination | `DataTable` |
| Row actions (edit/delete/info) | `Actions` or `DataTable` onEdit/onDelete/onInfo props |
| Form layout | `FormTemplate` |
| Text input | `Input` |
| Single selection | `Select` |
| Multiple selection | `MultiSelect` |
| Date picker | `Calendar` or `DateInput` |
| Time picker | `Clock` or `TimeInput` |
| File upload | `FileUploader` |
| Map with location | `InteractiveMap` |
| Confirmation dialog | `Modal` |
| Primary action button | `Button` |
| Icon-only button | `IconButton` |
| Dropdown menu | `Dropdown` or `Menu` |
| Navigation with sidebar | `AppTemplate` |
| Content card | `Card` |
| Navigation link | `Link` |
| Checkbox | `Checkbox` |
| App shell | `AppTemplate` |
| Form submit layout | `FormTemplate` |

## Missing Components (implement with CSS when required)

These are not in Neus UI — implement inline and document as pending:

| Need | Workaround | Document as |
|------|-----------|-------------|
| Toast/notification | div with fixed position + animation | Toast |
| Tabs | div + button group with active state | Tabs |
| Accordion/FAQ | `<details>`/`<summary>` | Accordion |
| Top navigation bar | div with flex + sticky | NavigationBar |
| Feature tile | Card with icon slot via `leading` prop | FeatureTile |
| Testimonial card | Card with avatar + quote | TestimonialCard |
| Pricing card | Card with structured content | PricingCard |
| Breadcrumb | `<nav>` + `<ol>` | Breadcrumb |
| Skeleton loader | div with shimmer animation | Skeleton |
| Empty state | div with icon + text + CTA | EmptyState |
| Alert/banner | div with color variant | Alert |
