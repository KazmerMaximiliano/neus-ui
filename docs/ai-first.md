# AI-First Workflow

Neus UI is designed as an AI-first component library. The components,
templates, documentation, and project-local skills work together so agents can
turn natural language requests into production-ready React interfaces.

The AI layer is called **Neus Design**. It generates typed `.tsx` artifacts with
Neus UI components, separate CSS files, separate type files, and the same code
style expected from hand-written components.

## What Neus Design Does

Neus Design converts product intent into interface code while staying inside
the Neus UI system.

| Capability | Neus Design behavior |
| --- | --- |
| Artifacts | Generates React `.tsx` files, CSS files, and type files |
| Design system | Uses Neus UI components and theme variables |
| Orchestration | Uses the `neus-designer` subagent for intake and planning |
| Execution | Invokes focused project skills for pages, flows, layouts, and patterns |
| Type safety | Keeps props and entities typed instead of using `any` |

The core rule is simple: every generated field, column, section, and copy block
must come from the user's request. Neus Design should not invent extra data,
fake testimonials, placeholder metrics, or "useful" UI that was not requested.

## The `neus-designer` Subagent

The `neus-designer` subagent acts as the UI generation orchestrator. It collects
visual and functional context before any code is generated, then decides which
skills should run and in what order.

It resolves:

- Palette: vibrant, neutral, corporate, or creative
- Theme: light, dark, or both
- Visual style: minimalist, detailed, brutalist, or soft
- Typography: modern, classic, friendly, or system default
- Project type: dashboard app, landing page, both, or isolated pattern
- Scope: one page, one module, or a complete system

The subagent then maps the answers to a concrete `ThemeProvider` configuration
and a visual directive that each skill must follow.

## Skills

Neus Design skills are specialized generators. Each one owns a specific UI
shape and uses the same Neus UI component catalog.

| Category | Skills | Generates |
| --- | --- | --- |
| App views | `neus-page-list`, `neus-page-form`, `neus-page-detail`, `neus-page-dashboard`, `neus-page-settings` | Dashboard pages, entity lists, forms, detail views, settings |
| Landing pages | `neus-landing-saas`, `neus-landing-generic`, `neus-page-auth`, `neus-page-blog` | Marketing, auth, and editorial pages |
| Patterns | `neus-pattern-table`, `neus-pattern-form`, `neus-pattern-modal`, `neus-pattern-card-grid`, `neus-pattern-hero` | Reusable standalone UI patterns |
| Flows | `neus-flow-onboarding`, `neus-flow-wizard` | Multi-screen onboarding and step-by-step forms |
| Layouts | `neus-layout-app`, `neus-layout-landing`, `neus-layout-empty` | Shells, public layouts, and empty states |
| Design system | `neus-theme-preview` | Theme token and component previews |
| Analysis | `neus-wireframe` | Lo-fi layout sketches before implementation |

## Typical Generation Paths

| Request | Skill sequence |
| --- | --- |
| App with dashboard | `neus-layout-app` -> `neus-page-dashboard` -> `neus-page-list` -> `neus-page-form` -> `neus-page-detail` |
| SaaS landing page | `neus-layout-landing` -> `neus-landing-saas` |
| Landing plus app | `neus-layout-landing` -> `neus-landing-saas` -> `neus-layout-app` -> `neus-page-dashboard` |
| Onboarding | `neus-page-auth` -> `neus-flow-onboarding` |
| Multi-step form | `neus-flow-wizard` |
| Standalone table | `neus-pattern-table` or `neus-page-list` |
| Standalone form | `neus-pattern-form` or `neus-page-form` |

## Anti-Slop Rules

Neus Design is intentionally conservative. The generated UI should reflect the
request exactly and stay compatible with the component library.

Required behavior:

- Use Neus UI components when a matching component exists.
- Import from `neus-ui`, not internal component paths.
- Receive API data as typed props instead of hardcoding business data.
- Keep CSS in dedicated `.styles.css` files.
- Keep types in dedicated `.types.ts` files.
- Use CSS variables such as `var(--color-primary)` and `var(--color-gray-300)`.
- Preserve the user's requested fields, columns, nav items, and sections.

Prohibited behavior:

- No invented fields, columns, metrics, testimonials, or company names.
- No `any` when a type can be declared.
- No raw HTML-only artifacts for generated UI.
- No landing pages wrapped in `AppTemplate`.
- No inline styles when a CSS class or Neus UI prop can express the layout.
- No extra "nice to have" features unless the user requested them.

## Design System Integration

Generated interfaces must use the same theme system as the component library.
The orchestrator maps user intent to `ThemeProvider` colors:

```tsx
<ThemeProvider
  initialTheme={{
    primaryColor: "#1E40AF",
    successColor: "#059669",
    errorColor: "#DC2626",
    infoColor: "#0284C7",
  }}
>
  <App />
</ThemeProvider>
```

Custom styles should rely on the public tokens documented in
[Design System](./design-system) and [Theming](./theming).

## Source Reference

This page is the public guide for the AI-first workflow. The deeper project
source lives in
[`NEUS-DESING.md`](https://github.com/KazmerMaximiliano/neus-ui/blob/main/NEUS-DESING.md),
alongside the local subagent and skill files.
