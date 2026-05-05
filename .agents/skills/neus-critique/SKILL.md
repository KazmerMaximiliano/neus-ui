---
name: neus-critique
description: |
  Reviews a Neus UI component or page and generates a structured design critique report.
  Evaluates 5 dimensions: visual hierarchy, component usage, theme consistency, field
  specificity, and visual containment. Produces a scored report with ASCII radar chart
  and prioritized recommendations.
  Use when user wants to: "revisar diseño", "critique UI", "review de interfaz",
  "evaluar el componente", "qué tan bien está este diseño", "feedback del UI",
  "check my design", "design review", "auditar la interfaz".
od:
  mode: analysis
  platform: all
  scenario: design
  design_system:
    requires: true
  craft:
    requires: [neus-components, typescript]
  example_prompt: "Review the ProductList component we generated — is it well implemented?"
---

# Neus UI Critique

Generates a structured design review report evaluating 5 key dimensions.

## Before starting

Read:
- `references/critique-rubric.md` — 5 dimension definitions and scoring criteria

## Phase 0 — Collect Material

Ask:
1. Which component or page to review? (paste code or indicate file path)
2. What was the original requirement? (what was asked — to evaluate field specificity)
3. Any additional context? (e.g.: it's a landing page, it's an edit form, etc.)

If the user doesn't paste code, request it before continuing.

## Phase 1 — Analysis per Dimension

For each dimension, evaluate the provided code against rubric criteria.
Assign score 1–5 with concrete justification (cite specific lines or patterns).

### Dimension 1: Visual Hierarchy
- Is there a clear focal point?
- Do font sizes and weights guide reading?
- Is there enough whitespace between sections?

### Dimension 2: Neus UI Component Usage
- Are available components used instead of reimplementing with HTML/CSS?
- Do imports come from `neus-ui`?
- Are `variant` and `color` props correct?

### Dimension 3: Theme Consistency
- Are `var(--color-*)` used instead of hardcoded hex?
- Is `ThemeProvider` present when custom colors are needed?
- Are semantic color roles correct (error → error, success → success)?

### Dimension 4: Field Specificity
- Do generated fields match exactly what was requested?
- Are there extra fields not in the requirement?
- Does data come as props instead of hardcoded?

### Dimension 5: Visual Containment
- Does full-width content have max-width?
- No overflow or bleeding outside containers?
- Does the layout work on the target viewport?

## Phase 2 — Report

Emit the report in this exact format:

---

## Critique Report — [ComponentName]

### Score

```
Visual Hierarchy  [████░]  X/5
Neus Components   [████░]  X/5
Theme Consistency [████░]  X/5
Field Specificity [████░]  X/5
Visual Containment[████░]  X/5
─────────────────────────────
Total             [     ]  XX/25
```

**Verdict:** [Ship-ready | Acceptable with minor fixes | Needs rework | Rebuild recommended]

---

### Findings per Dimension

#### Visual Hierarchy — X/5
[Concrete description of what works and what fails. Cite code example.]

#### Neus UI Component Usage — X/5
[Concrete description. If there are reimplementations, cite which component should be used.]

#### Theme Consistency — X/5
[If there are hardcoded hex values, list them. If ThemeProvider is missing, indicate it.]

#### Field Specificity — X/5
[Compare generated fields vs requirement. List extras or missing fields.]

#### Visual Containment — X/5
[Indicate if there are elements without max-width, detected overflow, or layout issues.]

---

### Priority Recommendations

**P0 — Critical (blocks ship):**
- [ ] [Specific action with code example if applicable]

**P1 — Important (fix before demo):**
- [ ] [Specific action]

**P2 — Improvement (nice to have):**
- [ ] [Improvement suggestion]

---

### Final Verdict

[1-2 sentences: how production-ready it is and what the most important fix is]
