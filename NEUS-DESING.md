# NEUS DESIGN — AI-Powered UI Generation System

AI-driven UI generation system integrated as an orchestrator sub-agent + Claude Code skills. Produces `.tsx` artifacts based on Neus UI components — no external app, no raw HTML.

---

## What is Neus Design

**Neus Design** converts natural language descriptions into production-ready React code using Neus UI components. It differs from Open Design and Claude Design in three key ways:

| Feature | Open Design | Claude Design | **Neus Design** |
|---------|-------------|---------------|-----------------|
| Artifacts | Raw HTML | Generic HTML/JSX | `.tsx` with Neus UI |
| Design system | 72+ systems | Variable | Neus UI (single) |
| Integration | External app (nexu.io) | Claude.ai | Claude Code CLI |
| Orchestration | Manual | Manual | `neus-designer` sub-agent |
| Typing | None | Partial | Full TypeScript |

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

## Available Skills (24)

### Category 1: App Views — Dashboard

*Require AppTemplate + sidebar. Data comes as props, never hardcoded.*

| Skill | Trigger | Generates |
|-------|---------|-----------|
| `neus-page-list` | "list of X", "table of X", "listing" | DataTable + filters + Actions + confirmation Modal |
| `neus-page-form` | "form for X", "create X", "edit X" | FormTemplate + typed inputs + submit |
| `neus-page-detail` | "detail of X", "view X", "show X" | Card + fields + Actions + confirmation Modal |
| `neus-page-dashboard` | "dashboard", "control panel", "metrics" | KPI Cards + DataTable + actions |
| `neus-page-settings` | "settings", "configuration", "preferences" | Grouped sections + inputs + save |

### Category 2: Landing Pages and Marketing

*No AppTemplate. Free layout. Copy 100% from intake — zero invented.*

| Skill | Trigger | Generates |
|-------|---------|-----------|
| `neus-landing-saas` | "landing page", "product page", "hero + features" | Hero + features + proof + pricing + CTA + footer |
| `neus-landing-pricing` | "pricing page", "plans", "pricing" | Plan cards + comparison table + FAQ + footer CTA |
| `neus-landing-generic` | "generic landing", "presentation page" | Flexible landing: hero + sections + CTA |
| `neus-page-auth` | "login", "register", "sign in", "auth" | Centered page with email + password + Button |
| `neus-page-blog` | "blog post", "article", "editorial" | Editorial layout: masthead + hero + body + author |

### Category 3: Isolated Component Patterns

*Reusable component without a full page structure.*

| Skill | Trigger | Generates |
|-------|---------|-----------|
| `neus-pattern-table` | "table with X", "data table", "list data" | DataTable with columns + pagination |
| `neus-pattern-form` | "form pattern", "standalone form" | FormTemplate with validation and submit |
| `neus-pattern-modal` | "modal for X", "confirmation modal" | Modal with trigger + confirm/cancel + handlers |
| `neus-pattern-card-grid` | "card grid", "cards for X" | Card grid with color cycling |
| `neus-pattern-hero` | "hero section", "main banner" | Hero with headline + subheading + CTAs |

### Category 4: Multi-Screen Flows

*Multiple steps or screens in a single component.*

| Skill | Trigger | Generates |
|-------|---------|-----------|
| `neus-flow-onboarding` | "onboarding", "welcome flow", "initial flow" | 3 onboarding screens with stepper |
| `neus-flow-wizard` | "wizard", "step by step", "multi-step form" | Multi-step FormTemplate with progress bar |
| `neus-flow-kanban` | "kanban", "task board", "sprint board" | Board with columns + task cards + filters |

### Category 5: Layouts and Shells

*Container structure without business content.*

| Skill | Trigger | Generates |
|-------|---------|-----------|
| `neus-layout-app` | "app layout", "app shell", "app with sidebar" | AppTemplate + routes[] + content slot |
| `neus-layout-landing` | "landing shell", "marketing layout" | Sticky header + main + footer |
| `neus-layout-empty` | "empty state", "no data", "placeholder" | Icon + message + optional CTA |

### Category 6: Design System

| Skill | Trigger | Generates |
|-------|---------|-----------|
| `neus-theme-preview` | "theme preview", "see colors", "active palette" | Full page showing all theme tokens |

### Category 7: Analysis and Documentation

| Skill | Trigger | Generates |
|-------|---------|-----------|
| `neus-critique` | "review design", "critique UI", "evaluate" | 5-dimension report + ASCII radar + recommendations |
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

| Component | Use case | Affected skills | Current workaround | Priority |
|-----------|----------|----------------|--------------------|----------|
| **Toast/Notification** | Post-action feedback (submit, delete) | page-list, page-form, page-detail | Prop `successMessage?: string` → div with `var(--color-success-light)` | High |
| **Badge/Tag** | Status indicators in DataTable cells | page-list, page-dashboard | `<span>` with CSS class | High |
| **Tabs** | Section navigation | page-settings, page-detail | Buttons with active state + CSS | High |
| **Accordion/FAQ** | FAQ in pricing and settings sections | landing-pricing, page-settings | Native `<details>`/`<summary>` HTML | High |
| **NavigationBar** | Top nav in landing pages | landing-saas, landing-pricing, page-blog | `<header>` + `<nav>` with custom CSS | High |
| **FeatureTile** | Feature grid with icon + title + description | landing-saas, landing-generic | Card with `leading` prop + lucide icon | Medium |
| **TestimonialCard** | Social proof in landings | landing-saas, landing-generic | `<blockquote>` with custom CSS | Medium |
| **PricingCard** | Plan pricing display | landing-pricing | Custom div with border + shadow | Medium |
| **Stepper** | Step indicator in onboarding/wizard | flow-onboarding, flow-wizard | Step dots with CSS + `active` state | Medium |
| **Breadcrumb** | Hierarchical navigation | page-detail, page-form | Links separated by `/` with CSS | Low |
| **Skeleton/Loading** | Page loading state | all | `react-spinners` (already a dep) | Low |
| **EmptyState** | No-data placeholder | page-list, page-dashboard | CSS layout + lucide icon + Button | Low |
| **Alert/Banner** | System messages | page-form, page-settings | Div with `var(--color-info-light)` | Low |

---

## Example Prompts

### 1. Full CRUD management app
```
@neus-designer I want an employee management app. I need a list with name, email, 
position, and status (active/inactive), a creation form with those same fields, 
and a detail view. Primary color: #0F4C81.
```
**Output:** `neus-layout-app` → `neus-page-list` → `neus-page-form` → `neus-page-detail`. Four `.tsx` files. Data as props `employees: Employee[]`.

---

### 2. Full SaaS landing
```
@neus-designer Landing page for "Facturo", an invoicing app. Tagline: 
"Invoice in seconds, get paid faster". Features: electronic invoicing, 
online payments, real-time reports, multi-company. Two plans: Starter $29/mo 
and Pro $79/mo. No testimonials. CTA: "Try free for 14 days".
```
**Output:** `neus-layout-landing` → `neus-landing-saas` → `neus-landing-pricing`. Copy exactly from prompt. No invented features or social proof.

---

### 3. Onboarding flow
```
@neus-designer Welcome flow for "FitTrack". 3 steps: 
1) "Welcome to FitTrack" - choose your goal (lose weight / build muscle / maintain), 
2) "Your routine" - training frequency, 
3) "All set!" - go to dashboard. No login required.
```
**Output:** `neus-flow-onboarding` with exactly 3 steps. Visual stepper. No sidebar. Centered layout.

---

### 4. Dashboard with specific KPIs
```
Control panel with these metrics: monthly sales, average ticket, and conversion rate. 
Recent orders table with columns: id, customer, amount, status.
```
**Output:** `neus-page-dashboard` with exactly 3 KPI Cards and DataTable with 4 columns. Props `kpis: KpiData` and `recentOrders: Order[]`.

---

### 5. Wireframe before generating
```
Wireframe for the product creation form. 
Fields: name, description, price, category (dropdown), stock, image.
```
**Output:** `neus-wireframe` with ASCII sketch. Mapping to `FormTemplate` + `Input` × 4 + `Select` + `FileUploader`. Suggested next step: `neus-page-form`.

---

### 6. Design review
```
Review the product list component you generated. The requirement was: 
table with name, price, and stock. Is it correctly implemented?
```
**Output:** `neus-critique` with score across 5 dimensions + P0/P1/P2 fixes + verdict.

---

### 7. Isolated pattern
```
Card grid for product categories. Each category has a name, lucide icon, 
and color (6 variants). The component receives the array as a prop.
```
**Output:** `neus-pattern-card-grid` with `categories: Category[]` prop. No hardcoded data.

---

### 8. Auth + onboarding
```
@neus-designer Fitness app. Login/register first, then a 3-step welcome flow.
```
**Output:** `neus-page-auth` → `neus-flow-onboarding`. Centered layout in both. No AppTemplate.

---

## Test Prompts — Manual Verification

Two test categories: **Category A** validates the `neus-designer` orchestrator end-to-end (full intake, skill decision, artifact coherence); **Category B** validates each skill individually with exact input data and a single expected output artifact.

---

### Category A — End-to-End / neus-designer

Send these prompts via `@neus-designer`. The agent must run the intake (AskUserQuestion × 2), present the plan, and invoke skills in sequence.

**What to verify in all Category A cases:**
- The agent presents the plan before executing ("I will generate: ...")
- `ThemeProvider` uses the same `primaryColor` across all generated files
- No file imports from internal relative paths (only `from 'neus-ui'`)
- The agent generates no fields, sections, or features not explicitly requested

| ID | Prompt | Expected skills in order | Specific verification |
|----|--------|-------------------------|-----------------------|
| A1 | `@neus-designer Employee management app. List with name, email, position, and status (active/inactive). Creation form with those fields. Detail view.` | layout-app → page-list → page-form → page-detail | AppTemplate in all 3 page files; props `employees: Employee[]`; exactly 4 columns in DataTable |
| A2 | `@neus-designer Landing for "Facturo". Tagline: "Invoice in seconds, get paid faster". Features: electronic invoicing, online payments, real-time reports, multi-company. Plans: Starter $29/mo, Pro $79/mo. CTA: "Try free for 14 days". No testimonials.` | layout-landing → landing-saas → landing-pricing | No AppTemplate in any file; exactly 4 features; exactly 2 plan cards; copy 1:1 with prompt |
| A3 | `@neus-designer Fitness app FitTrack. Login/register first, then 3-step welcome: "Your goal" (lose weight / build muscle / maintain), "Your routine" (frequency), "All set!" (go to dashboard).` | page-auth → flow-onboarding | No AppTemplate or sidebar; centered layout; Stepper with exactly 3 steps matching prompt titles |
| A4 | `@neus-designer E-commerce app. Presentation landing, pricing page, login, orders dashboard (metrics: total orders, monthly revenue, average ticket) and product catalog (columns: name, price, stock, status).` | layout-landing → landing-saas → landing-pricing → page-auth → layout-app → page-dashboard → page-list | Same `primaryColor` in all files; landing/auth without AppTemplate; exactly 3 KPI cards; exactly 4 columns in catalog |

---

### Category B — Individual Skills

Send these prompts as direct skill invocations (without `@neus-designer`). Each case provides exact input data so the skill skips intake — ideal for fast testing without the orchestrator.

**What to verify in all Category B cases:**
- The `.tsx` artifact imports only from `neus-ui` and `lucide-react`
- No extra fields or sections beyond what the prompt specifies
- Props correctly typed for API-sourced data (not hardcoded)
- Custom CSS only when Neus UI props are insufficient

#### App Views

| ID | Skill | Prompt | Expected output | Verify |
|----|-------|--------|----------------|--------|
| B1 | `neus-page-list` | `Product list. Columns: name (string), price (number), category (string), stock (number). Row actions: edit and delete. Global button "Add product". Active route: /products.` | `ProductListPage.tsx` | DataTable with exactly 4 columns; delete confirmation Modal; Button "Add product"; prop `products: Product[]` |
| B2 | `neus-page-form` | `Product creation form. Fields: name (Input), description (Input multiline), price (Input number), category (Select — options as prop), image (FileUploader). Submit: "Save product".` | `ProductFormPage.tsx` | FormTemplate; exactly 5 fields; prop `categoryOptions: SelectOption[]`; submitLabel "Save product" |
| B3 | `neus-page-detail` | `Order detail view. Fields to display: order number, customer, date, total, status. Actions: "Edit order" and "Delete order". Active route: /orders.` | `OrderDetailPage.tsx` | Card with 5 fields; 2 Actions buttons; delete confirmation Modal; prop `order: Order` |
| B4 | `neus-page-dashboard` | `Sales dashboard. KPIs: monthly sales (currency), average ticket (currency), conversion rate (percentage). Latest transactions table: id, customer, amount, date, status.` | `SalesDashboardPage.tsx` | Exactly 3 KPI Cards; DataTable with 5 columns; props `kpis: SalesKpis` and `transactions: Transaction[]` |
| B5 | `neus-page-settings` | `Account settings page. Section 1: personal data (name, email). Section 2: notifications (summary emails — Checkbox, system alerts — Checkbox). Button "Save changes".` | `AccountSettingsPage.tsx` | 2 visually separated sections; exactly 2 Inputs and 2 Checkboxes; Button "Save changes" |

#### Marketing / Landing

| ID | Skill | Prompt | Expected output | Verify |
|----|-------|--------|----------------|--------|
| B6 | `neus-landing-saas` | `Landing for "Neus UI". Tagline: "Build faster UIs with production-ready components". Features: 25+ components, dynamic theming, TypeScript support, Storybook docs. No pricing section. No testimonials. Main CTA: "Get started free".` | `NeusLandingPage.tsx` | No AppTemplate; hero with exact tagline; exactly 4 feature tiles; no pricing section; CTA "Get started free" |
| B7 | `neus-landing-pricing` | `Pricing for "Neus UI". Plans: Free (free, basic components, no support), Pro ($19/mo, all components, email support), Enterprise (contact for pricing, everything + SLA + dedicated support). No comparison table. FAQ: "Can I use Neus UI in commercial projects?", "Is there React Native support?", "How do I upgrade between versions?"` | `NeusPricingPage.tsx` | Exactly 3 plan cards; no comparison table; exactly 3 FAQ items with those questions |
| B8 | `neus-landing-generic` | `Landing for "DevBlog". Tagline: "Thoughts on software, design and craft". Recent articles section (prop). Newsletter section (email input + subscribe button). No pricing.` | `DevBlogLandingPage.tsx` | No AppTemplate; hero with tagline; prop `recentPosts: Post[]`; Input email + Button subscribe; no pricing |
| B9 | `neus-page-auth` | `Login page for "Facturo". Login only (no registration). Fields: email, password. Link "Forgot password?". No sign up link.` | `FacturoLoginPage.tsx` | Centered layout without AppTemplate; login form only; exactly 2 fields; Link "Forgot password?"; no registration |
| B10 | `neus-page-blog` | `Blog post. Title: "How we built Neus UI in 6 months". Author: "Max Kazmer". Date: "May 2026". Category: "Engineering". Read time: "8 min read". Article content comes as prop.` | `BlogPostPage.tsx` | Masthead with title/author/date/category/read time; prop `content: string`; no sidebar |

#### Patterns

| ID | Skill | Prompt | Expected output | Verify |
|----|-------|--------|----------------|--------|
| B11 | `neus-pattern-table` | `Transactions DataTable. Columns: date (date), description (string), amount (currency), type (string), status (string). No row actions.` | `TransactionsTable.tsx` | DataTable with exactly 5 columns; prop `transactions: Transaction[]`; no Actions column |
| B12 | `neus-pattern-form` | `Contact form. Fields: name (Input), email (Input), subject (Input), message (Input multiline). Submit: "Send message".` | `ContactForm.tsx` | FormTemplate with 4 fields; submitLabel "Send message"; no AppTemplate |
| B13 | `neus-pattern-modal` | `Subscription cancellation confirmation modal. Title: "Cancel subscription". Message: "Your plan will remain active until the end of the billing period." Buttons: "Keep subscription" (secondary) and "Cancel subscription" (error).` | `CancelSubscriptionModal.tsx` | Modal with exact title and message; 2 buttons with that text and those color variants |
| B14 | `neus-pattern-card-grid` | `Membership plan grid. Each card: plan name (string), price (string), description (string). No icon. Card color per plan (prop). Button "Choose plan" per card.` | `MembershipGrid.tsx` | Props `memberships: Membership[]`; no hardcoded data; Button "Choose plan" on each card |
| B15 | `neus-pattern-hero` | `Hero section for SaaS landing. Headline prop. Subheadline prop. Primary CTA: "Start free trial". Secondary CTA: "View demo". No image.` | `HeroSection.tsx` | Props `headline` and `subheadline`; 2 Buttons with exact text; no img tag |

#### Flows

| ID | Skill | Prompt | Expected output | Verify |
|----|-------|--------|----------------|--------|
| B16 | `neus-flow-onboarding` | `Onboarding for "WorkSpace". Step 1: "Set up your workspace" — workspace name (Input). Step 2: "Invite your team" — comma-separated emails (Input). Step 3: "You're all set!" — go to dashboard. Final CTA: "Go to dashboard".` | `WorkSpaceOnboarding.tsx` | 3 steps with those exact titles; visual Stepper; step 1 with 1 Input, step 2 with 1 Input; CTA "Go to dashboard" |
| B17 | `neus-flow-wizard` | `Email campaign creation wizard. Step 1: "Campaign details" — name (Input), subject (Input). Step 2: "Audience" — segment (Select, options as prop). Step 3: "Schedule" — send date (DateInput), send time (TimeInput). Step 4: "Review & send".` | `CampaignWizard.tsx` | 4 steps; props `segmentOptions: SelectOption[]`; DateInput + TimeInput in step 3; Back/Continue buttons between steps |
| B18 | `neus-flow-kanban` | `Development task kanban. Columns: Backlog, In Progress, In Review, Done. Each card: title (string), assignee (string), priority (string). Card actions: Edit, Move, Delete.` | `DevKanbanBoard.tsx` | 4 columns with those names; prop `tasks: Task[]`; 3 actions per card via Dropdown |

#### Layouts

| ID | Skill | Prompt | Expected output | Verify |
|----|-------|--------|----------------|--------|
| B19 | `neus-layout-app` | `App shell for "AdminPanel". Sidebar: Dashboard (/), Users (/users), Reports (/reports), Settings (/settings). User menu in header (avatar + name). Primary color: #1E40AF.` | `AdminPanelShell.tsx` | AppTemplate with 4 SidebarItems with those routes; menu prop with avatar; ThemeProvider primary `#1E40AF` |
| B20 | `neus-layout-landing` | `Landing shell for "Orbit". Nav: Features, Pricing, Docs, Blog. Header CTA: "Sign up free". Footer: copyright only.` | `OrbitLandingLayout.tsx` | No AppTemplate; header with 4 nav links and CTA; footer with copyright only; no footer columns |
| B21 | `neus-layout-empty` | `Empty state for the projects list when no projects exist. Title: "No projects yet". Description: "Create your first project to get started." CTA: "New project". Icon: FolderOpen.` | `ProjectsEmptyState.tsx` | Icon FolderOpen; exact title and description; Button "New project"; prop `onAction` |

#### Design System / Analysis

| ID | Skill | Prompt | Expected output | Verify |
|----|-------|--------|----------------|--------|
| B22 | `neus-theme-preview` | `Theme preview with primaryColor: #7C3AED. Color swatches only, no component examples.` | `ThemePreviewPage.tsx` | ThemeProvider with `#7C3AED`; semantic color and gray sections; no Button/Input/Card examples |
| B23 | `neus-critique` | `Review this component: DataTable with columns name, price, stock. The requirement was exactly those 3 columns with name filter and 10-item pagination.` | Critique report in text | Score across 5 dimensions; P0/P1/P2 findings; Pass/Revise/Fail verdict |
| B24 | `neus-wireframe` | `Wireframe for supplier registration form. Fields: company name, tax ID, contact email, phone, address, industry (dropdown), active (checkbox). Submit: "Save supplier".` | ASCII wireframe | Sketch with 7 fields in correct layout; mapping to Neus UI components (Input ×5, Select ×1, Checkbox ×1); suggested next skill |

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
