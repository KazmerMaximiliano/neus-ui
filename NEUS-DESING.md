# NEUS DESIGN — AI-Powered UI Generation System

AI-driven UI generation system integrated as an orchestrator sub-agent + Claude Code skills. Produces `.tsx` artifacts based on Neus UI components — no external app, no raw HTML.

---

## What is Neus Design

**Neus Design** converts natural language descriptions into production-ready React code using Neus UI components. It differs from Open Design and Claude Design in three key ways:

| Feature       | Open Design            | Claude Design    | **Neus Design**           |
| ------------- | ---------------------- | ---------------- | ------------------------- |
| Artifacts     | Raw HTML               | Generic HTML/JSX | `.tsx` with Neus UI       |
| Design system | 72+ systems            | Variable         | Neus UI (single)          |
| Integration   | External app (nexu.io) | Claude.ai        | Claude Code CLI           |
| Orchestration | Manual                 | Manual           | `neus-designer` sub-agent |
| Typing        | None                   | Partial          | Full TypeScript           |

**Core principle:** every generated field exists because the user asked for it. Neus Design never invents data, never adds "useful" columns, never generates filler copy.

---

## Quickstart

### Invoke the orchestrator

```
@neus-designer I want an inventory management app
@neus-designer I need a landing page for my accounting SaaS
@neus-designer Create the onboarding flow for my fitness app
```

The `neus-designer` agent runs the project intake, resolves the visual palette, and plans which skills to invoke in which order.

### Invoke skills directly

If you already know what you need, you can skip the orchestrator:

```
"Generate a users table with name, email, and role columns"
"I want a product creation form"
"Give me an empty state for the orders list"
"Preview the current theme"
```

Claude Code detects the intent and executes the corresponding skill.

---

## Available Skills (21)

### Category 1: App Views — Dashboard

_Require AppTemplate + sidebar. Data comes as props, never hardcoded._

| Skill                 | Trigger                                    | Generates                                          |
| --------------------- | ------------------------------------------ | -------------------------------------------------- |
| `neus-page-list`      | "list of X", "table of X", "listing"       | DataTable + filters + Actions + confirmation Modal |
| `neus-page-form`      | "form for X", "create X", "edit X"         | FormTemplate + typed inputs + submit               |
| `neus-page-detail`    | "detail of X", "view X", "show X"          | Card + fields + Actions + confirmation Modal       |
| `neus-page-dashboard` | "dashboard", "control panel", "metrics"    | KPI Cards + DataTable + actions                    |
| `neus-page-settings`  | "settings", "configuration", "preferences" | Grouped sections + inputs + save                   |

### Category 2: Landing Pages and Marketing

_No AppTemplate. Free layout. Copy 100% from intake — zero invented._

| Skill                  | Trigger                                           | Generates                                         |
| ---------------------- | ------------------------------------------------- | ------------------------------------------------- |
| `neus-landing-saas`    | "landing page", "product page", "hero + features" | Hero + features + proof + pricing + CTA + footer  |
| `neus-landing-generic` | "generic landing", "presentation page"            | Flexible landing: hero + sections + CTA           |
| `neus-page-auth`       | "login", "register", "sign in", "auth"            | Centered page with email + password + Button      |
| `neus-page-blog`       | "blog post", "article", "editorial"               | Editorial layout: masthead + hero + body + author |

### Category 3: Isolated Component Patterns

_Reusable component without a full page structure._

| Skill                    | Trigger                                   | Generates                                      |
| ------------------------ | ----------------------------------------- | ---------------------------------------------- |
| `neus-pattern-table`     | "table with X", "data table", "list data" | DataTable with columns + pagination            |
| `neus-pattern-form`      | "form pattern", "standalone form"         | FormTemplate with validation and submit        |
| `neus-pattern-modal`     | "modal for X", "confirmation modal"       | Modal with trigger + confirm/cancel + handlers |
| `neus-pattern-card-grid` | "card grid", "cards for X"                | Card grid with color cycling                   |
| `neus-pattern-hero`      | "hero section", "main banner"             | Hero with headline + subheading + CTAs         |

### Category 4: Multi-Screen Flows

_Multiple steps or screens in a single component._

| Skill                  | Trigger                                      | Generates                                 |
| ---------------------- | -------------------------------------------- | ----------------------------------------- |
| `neus-flow-onboarding` | "onboarding", "welcome flow", "initial flow" | 3 onboarding screens with stepper         |
| `neus-flow-wizard`     | "wizard", "step by step", "multi-step form"  | Multi-step FormTemplate with progress bar |

### Category 5: Layouts and Shells

_Container structure without business content._

| Skill                 | Trigger                                       | Generates                             |
| --------------------- | --------------------------------------------- | ------------------------------------- |
| `neus-layout-app`     | "app layout", "app shell", "app with sidebar" | AppTemplate + routes[] + content slot |
| `neus-layout-landing` | "landing shell", "marketing layout"           | Sticky header + main + footer         |
| `neus-layout-empty`   | "empty state", "no data", "placeholder"       | Icon + message + optional CTA         |

### Category 6: Design System

| Skill                | Trigger                                         | Generates                          |
| -------------------- | ----------------------------------------------- | ---------------------------------- |
| `neus-theme-preview` | "theme preview", "see colors", "active palette" | Full page showing all theme tokens |

### Category 7: Analysis and Documentation

| Skill            | Trigger                                            | Generates                                             |
| ---------------- | -------------------------------------------------- | ----------------------------------------------------- |
| `neus-wireframe` | "wireframe", "sketch", "lo-fi layout", "blueprint" | ASCII sketch of layout with Neus UI component mapping |

---

## Design System

Neus Design uses exclusively the Neus UI design system. Full reference at [`guides/DESING_SYSTEM.md`](guides/DESING_SYSTEM.md).

### Customization with neus-designer

When invoking `@neus-designer`, the agent asks about:

- **Palette**: vibrant/energetic, neutral/relaxed, corporate/formal, creative/expressive
- **Theme**: light only, dark only, both
- **Style**: minimalist, detailed, brutalist, soft/friendly
- **Typography**: modern/tech, classic/elegant, friendly/casual, system default

These answers are mapped to concrete values for `ThemeProvider`:

```tsx
<ThemeProvider initialTheme={{
  primaryColor: '#[hex resolved from palette]',
  successColor: '#10B981',
  errorColor: '#EF4444',
  infoColor: '#3B82F6',
}}>
```

### Available CSS Variables

```css
/* Semantic */
var(--color-primary)        var(--color-primary-light)    var(--color-primary-dark)
var(--color-success)        var(--color-success-light)    var(--color-success-dark)
var(--color-error)          var(--color-error-light)      var(--color-error-dark)
var(--color-info)           var(--color-info-light)       var(--color-info-dark)

/* Grays */
var(--color-gray-900)  var(--color-gray-700)  var(--color-gray-600)  var(--color-gray-500)
var(--color-gray-400)  var(--color-gray-300)  var(--color-gray-200)  var(--color-gray-150)
var(--color-gray-100)

/* Base */
var(--color-white)     var(--color-black)
var(--color-border-light)  var(--color-shadow)
```

---

## Anti-AI-Slop

Neus Design applies anti-slop in two distinct profiles.

### Profile A: App Views

**Prohibited:**

- Fields not requested in intake (user asks for "name, email, role" → exactly those three are generated, not four)
- Hardcoded data that should come as props (`data: Entity[]`)
- CSS with hex colors instead of CSS variables
- Imports from internal paths (`../../../components/Button`)
- `any` in TypeScript when the type can be inferred

**Self-critique before emitting (5 dimensions):**

1. Do the generated fields exactly match the intake?
2. Are all available Neus UI components being used where applicable?
3. Does the theme use CSS variables, not hardcoded hex?
4. Do dynamic data values come as props, not hardcoded?
5. Is the content visually contained (max-width, no overflow)?

### Profile B: Landing Pages and Marketing

**Prohibited:**

- Invented copy (taglines, feature descriptions, client names)
- Fictitious company logos
- Unsourced metrics ("10,000+ happy users" if the user didn't provide it)
- Social proof without data from intake
- Sections not requested

**Golden rule:** if the user didn't say it, it doesn't exist in the output.

---

## Pending Components

Detected during system construction. Implemented with CSS workarounds in each skill; documented as candidates for official Neus UI components.

| Component              | Use case                              | Affected skills                          | Current workaround                                                     | Priority |
| ---------------------- | ------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------- | -------- |
| **Toast/Notification** | Post-action feedback (submit, delete) | page-list, page-form, page-detail        | Prop `successMessage?: string` → div with `var(--color-success-light)` | High     |
| **Tabs**               | Section navigation                    | page-settings, page-detail               | Buttons with active state + CSS                                        | High     |
| **Accordion/FAQ**      | FAQ in pricing and settings sections  | landing-pricing, page-settings           | Native `<details>`/`<summary>` HTML                                    | High     |
| **NavigationBar**      | Top nav in landing pages              | landing-saas, landing-pricing, page-blog | `<header>` + `<nav>` with custom CSS                                   | High     |
| **Breadcrumb**         | Hierarchical navigation               | page-detail, page-form                   | Links separated by `/` with CSS                                        | Low      |
| **Skeleton/Loading**   | Page loading state                    | all                                      | `react-spinners` (already a dep)                                       | Low      |
| **EmptyState**         | No-data placeholder                   | page-list, page-dashboard                | CSS layout + lucide icon + Button                                      | Low      |
| **Alert/Banner**       | System messages                       | page-form, page-settings                 | Div with `var(--color-info-light)`                                     | Low      |

---

## Extending the System

### Add a new skill

1. Create directory `.agents/skills/neus-[category]-[name]/`
2. Create `SKILL.md` with `od:` frontmatter following the pattern of existing skills
3. Create `references/` if the skill has complex layout or data patterns
4. Add the skill to the [neus-designer sub-agent](.claude/agents/neus-designer.md) table in the "Available Skills" section
5. Document it in this file under the corresponding category table

### Add a component to Neus UI

When a workaround becomes necessary across multiple skills, escalate to an official component:

1. Implement in `src/components/ComponentName/` following the library pattern
2. Remove from the "Pending Components" table in this file
3. Update `_shared/component-catalog.md` with the JSX example and props of the new component
4. Update affected skills to use the official import `from 'neus-ui'`

### Update the orchestrator

If the decision logic changes (new skills, new cases):

- `.claude/agents/neus-designer.md` → decision table in Phase 4
- This file → available skills table

---

## System Architecture

```
.claude/agents/
└── neus-designer.md              # Orchestrator sub-agent (intake + planning)

.agents/skills/
├── _shared/                      # Resources shared by all skills
│   ├── anti-slop.md              # Anti-AI-slop rules
│   ├── component-catalog.md      # 25 components with props + JSX examples
│   ├── theme-config.md           # ThemeProvider, useTheme, CSS variables
│   └── checklist.md              # P0/P1/P2 gates
│
├── neus-page-*/                  # App views (5 skills)
├── neus-landing-*/               # Marketing/landing (5 skills)
├── neus-pattern-*/               # Isolated patterns (5 skills)
├── neus-flow-*/                  # Multi-screen flows (3 skills)
├── neus-layout-*/                # Shells/layouts (3 skills)
├── neus-theme-preview/           # Design system preview
├── neus-critique/                # Design review + scoring
└── neus-wireframe/               # Lo-fi ASCII sketching

NEUS-DESING.md                    # This file
```

**Critical constraint:** `neus-designer` is a sub-agent, not a skill. Sub-agents cannot spawn other sub-agents. The orchestrator invokes **skills** via the `Skill` tool — skills run within the orchestrator's context.
