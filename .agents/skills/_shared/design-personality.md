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
- `dark` → glass surfaces: `background: rgba(20,20,40,0.55); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08)` on canvas `background: #0a0a14; color: #e2e8f0`

Skills must apply every directive in this block. If a directive conflicts with a prop constraint in `prop-constraints.md`, the constraint wins.
