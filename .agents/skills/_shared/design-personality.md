# Design Personality — Neus UI Creative Direction

Read this file during Phase 3 (Visual Context Resolution) in neus-designer, and before generating any page or component in high-visual-impact skills.

---

## Section 1 — Choose a Personality Axis First

Before writing a single line of JSX, select the personality that matches the palette + style chosen in intake:

| Palette | Minimalist/Clean | Detailed/Rich | Brutalist/Bold | Soft/Friendly |
|---------|-----------------|---------------|----------------|---------------|
| Vibrant and energetic | **Kinetic** | Bold-Geometric | Kinetic-Max | Kinetic-Soft |
| Neutral and relaxed | **Airy** | Editorial | Airy-Dense | Airy-Warm |
| Corporate and formal | **Structured** | Technical | Structured-Bold | Structured-Clean |
| Creative and expressive | **Layered** | Expressive | Expressive-Max | Layered-Soft |

**Default (when unsure):** use the bold entry for the chosen palette row.

### Personality definitions

**Kinetic** — heavy-weight headings (`font-weight: 800`), bold primary fills, sharp contrast between accent and background. No soft gradients. Cards use `fill={true}` with distinct colors. One staggered fade-up animation.

**Airy** — generous whitespace (`padding: 6rem 2rem` for sections), muted fills, `var(--color-primary-light)` as alternating section backgrounds. Typography at `font-weight: 600`. Subtle fade-up on hero only.

**Structured** — strong horizontal dividers, tight spacing (`gap: 1.5rem`), info color accent on key metrics. All headings left-aligned. No decorative elements. No animation.

**Layered** — overlapping card compositions, asymmetric 2-col grids, purple/pink/blue card palette variety. Feature cards use `grid-column: span 2` for the flagship. Slide-in animation on first grid row.

Document the chosen personality in the VISUAL DIRECTIVE block passed to each skill.

---

## Section 2 — Layout Composition Rules

Apply these unconditionally. They override the "safe" default of center-everything uniform grids.

**Never center-align app view headings.** Only marketing pages (landing, auth) center their hero text. App pages (`page-list`, `page-form`, `page-detail`, `page-dashboard`, `page-settings`) always left-align.

**Flagship card rule.** Any grid of 3+ cards must have one card at `grid-column: span 2` — the most important item (top metric, primary feature, recommended plan). Apply via CSS class, never inline style.

**Asymmetric two-column hero.** Landing page heroes should not be a single centered column. Use `grid-template-columns: 1.4fr 0.6fr` or `2fr 1fr` — headline + CTA left, visual/illustration right.

**Dashboard KPI grid.** Never 4 equal cards in a row. Use `grid-template-columns: repeat(3, 1fr)` with the primary KPI spanning 2 columns, or `repeat(4, 1fr)` with alternating visual weight via card color.

**Feature sections.** The first feature card is the flagship — give it full width or `span 2`. Remaining features go in a `repeat(auto-fit, minmax(280px, 1fr))` grid below.

**No uniform stacks.** If three or more sections appear stacked full-width, alternate their internal layout: left-text/right-image, then right-text/left-image, then centered.

---

## Section 3 — Color Usage Directives

These are additive to `anti-slop.md`. All colors still come from `var(--color-*)` or ThemeProvider.

**Section backgrounds:** Use `var(--color-primary-light)` as the background for every other content section on landing pages. Creates visual rhythm without non-system colors.

**KPI card colors:** Never use the same `color` prop twice in a KPI grid. Use `blue`, `green`, `purple`, `yellow` (Neus UI Card color values) in combination. Always set `fill={true}` on KPI cards. Flat white KPI cards are the #1 indicator of generic AI output.

**Landing CTA section:** Footer CTA zone uses `background: var(--color-primary-light)` as a warm call-to-action block — not a white section, not a hardcoded color.

**Error/success banners:** Always `var(--color-error-light)` for error zones, `var(--color-success-light)` for success zones. Never neutral grays for these states.

**App page H1 accent:** A `border-left: 4px solid var(--color-primary); padding-left: 1rem` on app page headings is the minimum personality signal. Always include it.

**Featured card highlight:** On landing pages with pricing or feature cards, the recommended/flagship card gets `highlighted={true}`.

---

## Section 4 — Typography Scale

Neus UI base: **Manrope** (`--font-display`), 16px. JetBrains Mono (`--font-mono`) for metadata. These overrides go in `.styles.css`:

| Context | Size | Weight | Font | Notes |
|---------|------|--------|------|-------|
| Landing H1 | `clamp(2.5rem, 6vw, 4rem)` | `800` | `--font-display` | Never below `2rem`; tracking `-0.03em` |
| Landing H2 section heading | `2rem` | `700` | `--font-display` | Not `1.5rem` |
| App page H1 | `1.75rem` | `700` | `--font-display` | + left-border accent |
| Dashboard KPI value | `2.5rem` | `800` | `--font-display` | Center-aligned in card |
| Dashboard KPI label | `0.75rem` | `500` | `--font-mono` | Uppercase, `letter-spacing: 0.15em` |
| Auth page heading | `1.5rem` | `700` | `--font-display` | Centered |
| Card title in feature grid | `1.125rem` | `600` | `--font-display` | — |
| Eyebrow / section metadata | `0.6875rem` (11px) | `500` | `--font-mono` | Uppercase, `letter-spacing: 0.15em`, primary color |
| Table column headers | `0.6875rem` (11px) | `500` | `--font-mono` | Uppercase, `letter-spacing: 0.15em` |

Never produce an H1 below `1.5rem`. Never use `font-weight: 400` for a page heading.

**Eyebrow pattern** — use for section metadata, category labels, KPI labels, table headers:
```css
.eyebrow {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-primary);
}
```
Or use the global `.neus-eyebrow` utility class. For muted metadata (table headers, secondary labels), set `color: var(--color-gray-500)` instead.

---

## Section 5 — Spacing Rhythm

| Context | Value |
|---------|-------|
| Landing section padding | `6rem 2rem` (not `4rem`) |
| App page section padding | `2rem` |
| Feature/card grid gap | `2rem` |
| Dashboard KPI grid gap | `1.5rem` |
| Form field gap | `1.25rem` |
| Dashboard section margin-bottom | `3rem` between KPI grid and table |
| Button margin in hero | `1.5rem` top margin on CTA group |

The extra vertical air in landing sections signals quality. Do not compress to `4rem`.

---

## Section 6 — CSS Animation Budget

Each skill output gets **exactly one animation** in its `.styles.css`. Choose based on context:

| Context | Animation | Apply to |
|---------|-----------|----------|
| Landing hero | `neus-fade-up` | `.hero__headline`, `.hero__subtext` (staggered) |
| Dashboard | `neus-slide-in` | `.dashboard__kpis` |
| Onboarding | `neus-fade-up` | `.onboarding__step` |
| Auth | `neus-fade-up` | `.auth__card` |
| Feature grid | `neus-fade-up` staggered | `.features-grid > *:nth-child(n)` |
| All others | none | — |

Keyframes to include in `.styles.css` when using animation:

```css
@keyframes neus-fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes neus-slide-in {
  from { opacity: 0; transform: translateX(-12px); }
  to   { opacity: 1; transform: translateX(0); }
}
```

Stagger pattern for card grids (up to 4 cards):

```css
.features-grid > *:nth-child(1) { animation: neus-fade-up 0.5s 0.05s ease both; }
.features-grid > *:nth-child(2) { animation: neus-fade-up 0.5s 0.15s ease both; }
.features-grid > *:nth-child(3) { animation: neus-fade-up 0.5s 0.25s ease both; }
.features-grid > *:nth-child(4) { animation: neus-fade-up 0.5s 0.35s ease both; }
```

No JS animations. No animation libraries. CSS only.

---

## Section 7 — Anti-Generic Safeguards (Neus-specific)

These are additive to `anti-slop.md` — focused on visual creativity, not code quality:

1. **No `fullWidth` on every Button.** Reserve `fullWidth` for auth pages and single-CTA scenarios. In most contexts buttons are auto-width.
2. **No uniform 3-column feature grid.** The flagship feature deserves `grid-column: span 2` or full-width treatment.
3. **No flat white KPI cards.** Always set `fill={true}` and a distinct `color` prop per card.
4. **No same card color twice in a grid.** Rotate through `blue`, `green`, `purple`, `yellow`.
5. **No center-align on app view headings.** Only marketing pages center their H1.
6. **No omitting the left-border accent on app page H1.** It is the minimum personality signal.
7. **No landing hero with `padding: 5rem` or less.** Use `6rem 2rem` minimum.
8. **No uniform section spacing.** Alternate `6rem` and `5rem` padding across sections for rhythm.
9. **No equal-weight buttons in a hero.** Primary CTA is `variant="solid"`, secondary is `variant="outlined"` — never two `solid` buttons side by side.
10. **No missing animation.** If the context calls for an animation (see Section 6), include it. A completely static landing page or dashboard feels unfinished.

---

## Section 8 — Kit Layout Patterns (Reference)

The `new_design/kits/` directory contains four reference pages (dashboard, landing, docs, playground) that demonstrate advanced layout and information architecture patterns. These are **optional reference patterns** — use them when the intake suggests a similar need, not as mandatory requirements.

See `.agents/skills/_shared/layout-patterns.md` for the documented patterns.

**When to consult layout-patterns.md:**
- Dashboard with multiple KPI metrics and data panels → dashboard pattern
- Landing/marketing page with stats, feature grid, or showcase → landing patterns
- Documentation or multi-panel UI → docs/playground patterns

---

## VISUAL DIRECTIVE Block Format

After reading this file and resolving the palette, build this block and include it verbatim in the context passed to every skill invocation:

```
VISUAL DIRECTIVE:
- Palette: [Vibrant / Neutral / Corporate / Creative]
- Personality: [Kinetic / Airy / Structured / Layered]
- Mode: [light / dark]
- Animation: [neus-fade-up on [element] / neus-slide-in on [element] / none]
- Layout: [asymmetric 2-col hero / flagship-card grid / left-border H1 / centered auth]
- H1: [clamp(2.5rem,6vw,4rem) weight-800 / 1.75rem weight-700 + left-border / 1.5rem weight-700]
- Card colors: [blue+green+purple+yellow / primary fills / grayscale]
```

**Mode context for CSS:**
- `light` → standard surfaces: `background: var(--color-white); border: 1px solid var(--color-border-light)`
- `dark` → see Section 9 for the full surface recipe system. One-line summary: canvas `background: #0a0a14; color: #e2e8f0`, cards use glass morphism (`rgba` + `backdrop-filter: blur`). Never use `var(--color-white)` as a background in dark mode.

Skills must apply every directive in this block. If a directive conflicts with a prop constraint in `prop-constraints.md`, the constraint wins.

---

## Section 9 — Dark Mode Surface Recipes

When `Mode: dark`, replace all standard surfaces with the recipes below. See also `.agents/skills/_shared/dark-surfaces.md` for copy-pasteable CSS blocks.

### 9.1 — Canvas (page root)

```css
.page-dark {
  min-height: 100vh;
  background: #0a0a14;
  color: #e2e8f0;
  overflow-x: hidden;
}
```

Add mesh gradient + grid overlay as fixed pseudo-layers (z-index 0, pointer-events none):

```css
/* mesh — three radial gradients, fixed behind everything */
.page-dark__mesh {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 60% 50% at 15% 0%, rgba(34,211,238,0.18), transparent 60%),
    radial-gradient(ellipse 60% 50% at 85% 30%, rgba(217,70,239,0.16), transparent 60%),
    radial-gradient(ellipse 80% 60% at 50% 90%, rgba(99,102,241,0.20), transparent 70%);
}

/* grid overlay — subtle dot grid masked to top area */
.page-dark__grid {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.4;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(ellipse 70% 70% at 50% 30%, black, transparent 80%);
}
```

All content sits inside a `.page-dark__content` at `position: relative; z-index: 1`.

---

### 9.2 — Glass Card (default dark surface)

Use for article cards, feature tiles, info panels:

```css
.glass-card {
  background: rgba(20,20,40,0.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  transition: border-color 0.3s, transform 0.3s;
}

.glass-card:hover {
  border-color: rgba(129,140,248,0.35);
  transform: translateY(-2px);
}
```

---

### 9.3 — Glass Nav (sticky top bar)

```css
.glass-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 32px;
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(10,10,20,0.6);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
```

Include a brand mark (32px square, gradient fill, mono initial, glow shadow):

```css
.brand-mark {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: linear-gradient(135deg, #22d3ee 0%, #6366f1 50%, #d946ef 100%);
  display: grid;
  place-items: center;
  font-family: var(--font-mono);
  font-weight: 700;
  color: #0a0a14;
  font-size: 14px;
  letter-spacing: -0.04em;
  box-shadow: 0 0 24px rgba(99,102,241,0.45);
}
```

Nav links: `font-size: 13px; color: #94a3b8; transition: color 0.2s` → hover `color: white`.

---

### 9.4 — Newsletter / CTA Glow Card

Full-width centered card with radial glow behind and subtle grid texture:

```css
.nl-card {
  position: relative;
  overflow: hidden;
  background: rgba(15,15,30,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 24px;
  padding: 64px 56px;
  text-align: center;
}

/* radial glow behind content */
.nl-card::before {
  content: "";
  position: absolute;
  inset: -40% -10% auto -10%;
  height: 80%;
  background: radial-gradient(ellipse 50% 60% at 50% 50%, rgba(99,102,241,0.32), transparent 70%);
  z-index: -1;
  filter: blur(60px);
  pointer-events: none;
}

/* subtle grid texture */
.nl-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent 80%);
  z-index: 0;
  pointer-events: none;
}

/* all direct children above pseudo layers */
.nl-card > * { position: relative; z-index: 1; }
```

Newsletter input: pill-shaped container (not separate `<Input>` + `<Button>`):

```css
.nl-form {
  display: flex;
  gap: 10px;
  max-width: 520px;
  margin: 0 auto;
  background: rgba(0,0,0,0.35);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 3em;
  padding: 6px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.nl-form:focus-within {
  border-color: rgba(129,140,248,0.5);
  box-shadow: 0 0 0 4px rgba(99,102,241,0.12);
}
```

**Note:** The pill form is a native `<input>` + `<button>` inside `.nl-form`, NOT Neus UI `<Input>` + `<Button>` — those components can't be inlined into a pill container.

---

### 9.5 — Eyebrow Pill (dark hero)

```css
.eyebrow-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 28px;
}

.eyebrow-pill__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22d3ee;
  box-shadow: 0 0 12px #22d3ee;
}
```

---

### 9.6 — Gradient Text

For H1 accent words or newsletter headings in dark + vibrant mode:

```css
.gradient-text {
  background: linear-gradient(135deg, #22d3ee 0%, #818cf8 45%, #d946ef 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Apply as a `<span className="gradient-text">` around the accent word(s) in the heading.

---

### 9.7 — Category Pills

For article/content cards — per-category tint, not a Neus UI component:

```css
.pill { display: inline-flex; align-items: center; gap: 6px; padding: 4px 11px; border-radius: 2em; font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; font-weight: 600; }
.pill--systems  { background: rgba(34,211,238,0.12);  color: #22d3ee; }
.pill--design   { background: rgba(217,70,239,0.12);  color: #e879f9; }
.pill--craft    { background: rgba(129,140,248,0.14); color: #a5b4fc; }
.pill--tools    { background: rgba(76,175,80,0.14);   color: #6ee78b; }
.pill--notes    { background: rgba(244,191,67,0.14);  color: #fbbf24; }
.pill--featured { background: linear-gradient(135deg, rgba(34,211,238,0.18), rgba(217,70,239,0.18)); color: white; border: 1px solid rgba(217,70,239,0.4); }
```

Map category strings to class names in a `CATEGORY_PILL_CLASS` constant in the component.

---

### 9.8 — Featured Content Art Panel

For a featured card with a visual left panel (no real image):

```css
.featured-art {
  background:
    radial-gradient(ellipse 70% 60% at 30% 30%, rgba(34,211,238,0.45), transparent 60%),
    radial-gradient(ellipse 60% 60% at 80% 80%, rgba(217,70,239,0.5), transparent 60%),
    #0e0e22;
  min-height: 360px;
  position: relative;
  overflow: hidden;
}

/* inner grid texture */
.featured-art::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent 80%);
}

/* centered code glyph */
.featured-art__glyph {
  position: absolute;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-mono);
  font-size: 96px;
  font-weight: 700;
  color: rgba(255,255,255,0.95);
  letter-spacing: -0.04em;
  text-shadow: 0 0 60px rgba(99,102,241,0.6);
}

/* blinking cursor */
.featured-art__cursor {
  display: inline-block;
  width: 0.12em;
  height: 0.9em;
  background: #22d3ee;
  margin-left: 0.06em;
  vertical-align: -0.05em;
  animation: blink 1s steps(2) infinite;
}

@keyframes blink { 50% { opacity: 0; } }
```

Art panel sits left in a `grid-template-columns: 1.05fr 0.95fr` split inside a glass-card wrapper.
