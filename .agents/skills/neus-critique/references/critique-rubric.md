# Critique Rubric — Neus UI Design Review

## 5 Evaluation Dimensions

Each dimension scored 1–5. Score 1 = critical issues, 3 = acceptable, 5 = excellent.

---

### 1. Jerarquía Visual (Visual Hierarchy)

**What to evaluate:**
- Does the layout have a clear focal point?
- Is information ordered by importance (primary → secondary → tertiary)?
- Are font sizes, weights, and spacing used to guide the eye?
- Is there enough whitespace to separate sections?

| Score | Criteria |
|-------|----------|
| 1 | No clear hierarchy. Everything same weight, eye doesn't know where to go |
| 2 | Weak hierarchy. Primary action competes with secondary content |
| 3 | Acceptable. Clear H1 → body flow but some sections feel flat |
| 4 | Good. Clear focal point, breathing room, logical reading order |
| 5 | Excellent. Effortless scan path, perfect weight distribution |

**Common issues:**
- Too many buttons with "solid primary" style competing for attention
- Section headers same size as body text
- Dense grids with no whitespace between groups

---

### 2. Uso de Componentes Neus UI (Component Usage)

**What to evaluate:**
- Are Neus UI components used where available (Button, Card, Input, Modal, etc.)?
- Are `variant` and `color` props used correctly?
- Are custom CSS workarounds justified (missing component) or lazy?
- Do imports come from `neus-ui` exclusively?

| Score | Criteria |
|-------|----------|
| 1 | Custom HTML/CSS reimplementing existing Neus UI components |
| 2 | Neus components used but props wrong (hardcoded colors, wrong variant) |
| 3 | Correct components used, minor prop inconsistencies |
| 4 | All available components used correctly with proper variants |
| 5 | Perfect usage + pending components documented + workarounds minimal |

**Red flags:**
- `<button style={{background: '#4F46E5'}}>` instead of `<Button variant="solid" color="primary">`
- `import { Button } from '../../../components/Button/Button'` (internal path)
- Custom checkbox when `<Checkbox />` exists

---

### 3. Coherencia del Tema (Theme Consistency)

**What to evaluate:**
- Are `var(--color-*)` CSS variables used instead of hardcoded hex values?
- Is `ThemeProvider` present when custom colors are needed?
- Is the same primary color used consistently across the page?
- Are semantic color roles respected (success = green, error = red, etc.)?

| Score | Criteria |
|-------|----------|
| 1 | Multiple hardcoded hex values, no ThemeProvider, inconsistent colors |
| 2 | Some CSS vars, some hardcoded — mixed usage |
| 3 | CSS vars used mostly, minor hardcoded values in non-critical areas |
| 4 | Full CSS var usage, ThemeProvider configured, consistent palette |
| 5 | Perfect — ThemeProvider at correct level, all colors semantic, no hardcoded values |

**Red flags:**
- `color: '#6B7280'` instead of `color: var(--color-gray-500)`
- Multiple ThemeProvider instances nested
- Error state using `--color-info` instead of `--color-error`

---

### 4. Especificidad de Campos (Field Specificity)

**What to evaluate:**
- Do the generated fields/columns match exactly what was requested in the intake?
- Are there extra fields that weren't requested?
- Are field labels in the correct language (as specified by the user)?
- Is data typed correctly (text vs number vs date vs select)?

| Score | Criteria |
|-------|----------|
| 1 | Many extra fields not in intake, invented data, wrong types |
| 2 | 2-3 extra fields, some labels wrong |
| 3 | Mostly correct, 1 minor extra or missing field |
| 4 | Exact fields from intake, correct types and labels |
| 5 | Perfect match — fields, labels, types, order all exactly as requested |

**Red flags:**
- Adding "Teléfono" and "Dirección" fields when user only asked for "Nombre" and "Email"
- Hardcoded `data` arrays instead of receiving `items: Entity[]` as prop
- English labels when user specified Spanish

---

### 5. Contención Visual (Visual Containment)

**What to evaluate:**
- Is content properly bounded (no elements bleeding out of containers)?
- Does the layout work at the intended viewport (desktop/mobile)?
- Are max-widths applied to prevent ultra-wide stretching?
- Do modals/overlays display correctly without layout shifts?

| Score | Criteria |
|-------|----------|
| 1 | Content overflows containers, no max-width on full-width layouts |
| 2 | Some containment issues — one section bleeds or has no max-width |
| 3 | Acceptable containment, minor layout issues on resize |
| 4 | Well-contained, max-width present, no visible overflow |
| 5 | Perfect — responsive containment, correct breakpoints, no overflow |

**Red flags:**
- Full-width landing page with no `max-width: 1200px` on content
- Modal that triggers layout shift on open
- Table overflowing its Card container on smaller viewports

---

## Scoring Summary Table

| Dimension | Score (1-5) | Main Finding |
|-----------|-------------|--------------|
| Jerarquía Visual | X | ... |
| Uso de Componentes | X | ... |
| Coherencia del Tema | X | ... |
| Especificidad de Campos | X | ... |
| Contención Visual | X | ... |
| **Total** | **/25** | |

**Interpretation:**
- 20-25: Ship-ready
- 15-19: Acceptable with minor fixes
- 10-14: Needs significant rework
- <10: Rebuild recommended

---

## Radar Chart Format (ASCII)

```
        Jerarquía
           5
           │
     4─────┼─────4
    ╱       │       ╲
Contención  │  Componentes
   3─────ᛃ ─────3
    ╲       │       ╱
     2─────┼─────2
           │
        Especificidad
```

Output: include a simple ASCII radar or table with filled bars (████░░) to show score per dimension visually without SVG.

**Bar format:**
```
Jerarquía Visual  ████░  4/5
Componentes       ███░░  3/5
Tema              █████  5/5
Especificidad     ████░  4/5
Contención        ██░░░  2/5
```
