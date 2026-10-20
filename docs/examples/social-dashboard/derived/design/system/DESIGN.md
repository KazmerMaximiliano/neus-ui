---
version: alpha
name: Bento tonal
description: Rounded bento cards resting on a cool green-gray ground, emerald action and blue data accent, Inter Tight with mono figures.
colors:
  primary: "#047857"
  primary-dark: "#34D399"
  data-blue: "#1D4ED8"
  data-blue-dark: "#60A5FA"
  ground: "#EEF2EF"
  card: "#FFFFFF"
  ink: "#0F1A15"
  ink-secondary: "#4A5850"
  border-subtle: "#DDE4DF"
  border-input: "#C9D3CC"
  ground-dark: "#0E1411"
  card-dark: "#18201C"
  ink-dark: "#E8EFEA"
  ink-secondary-dark: "#A3B2A9"
  border-subtle-dark: "#2A342F"
  border-input-dark: "#3A4640"
typography:
  body-md:
    fontFamily: '"Inter Tight", "Manrope", system-ui, sans-serif'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  heading:
    fontFamily: '"Inter Tight", "Manrope", system-ui, sans-serif'
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.015em
  label:
    fontFamily: '"Inter Tight", "Manrope", system-ui, sans-serif'
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0em
  caption:
    fontFamily: '"Inter Tight", "Manrope", system-ui, sans-serif'
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0em
  figure:
    fontFamily: '"JetBrains Mono", ui-monospace, monospace'
    fontSize: 2rem
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.02em
  display:
    fontFamily: '"Inter Tight", "Manrope", system-ui, sans-serif'
    fontSize: 3.5rem
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.03em
  headline:
    fontFamily: '"Inter Tight", "Manrope", system-ui, sans-serif'
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.025em
  lead:
    fontFamily: '"Inter Tight", "Manrope", system-ui, sans-serif'
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
rounded:
  sm: 10px
  md: 14px
  card: 20px
  pill: 999px
spacing:
  step-1: 4px
  step-2: 8px
  step-3: 12px
  step-4: 16px
  step-6: 24px
  step-8: 32px
  step-12: 48px
  step-16: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.card}"
x-neus:
  extends: neus
  tokens:
    base:
      --font-body: "{typography.body-md.fontFamily}"
      --font-display: "{typography.heading.fontFamily}"
      --font-mono: "{typography.figure.fontFamily}"
      --radius-sm: "{rounded.sm}"
      --radius-md: "{rounded.md}"
      --radius-default: "{rounded.card}"
      --radius-pill: "{rounded.pill}"
      --type-display-size: "clamp(2.5rem, 1.9rem + 2.4vw, {typography.display.fontSize})"
      --type-display-weight: "{typography.display.fontWeight}"
      --type-display-line-height: "{typography.display.lineHeight}"
      --type-display-tracking: "{typography.display.letterSpacing}"
      --type-headline-size: "clamp(2rem, 1.8rem + 0.8vw, {typography.headline.fontSize})"
      --type-headline-weight: "{typography.headline.fontWeight}"
      --type-headline-line-height: "{typography.headline.lineHeight}"
      --type-headline-tracking: "{typography.headline.letterSpacing}"
    light:
      --color-surface: "{colors.card}"
      --color-surface-secondary: "{colors.ground}"
      --color-text-primary: "{colors.ink}"
      --color-text-secondary: "{colors.ink-secondary}"
      --color-border-subtle: "{colors.border-subtle}"
      --color-border-input: "{colors.border-input}"
    dark:
      --color-surface: "{colors.card-dark}"
      --color-surface-secondary: "{colors.ground-dark}"
      --color-text-primary: "{colors.ink-dark}"
      --color-text-secondary: "{colors.ink-secondary-dark}"
      --color-border-subtle: "{colors.border-subtle-dark}"
      --color-border-input: "{colors.border-input-dark}"
  recipes:
    card:
      base:
        --card-radius: "{rounded.card}"
        --card-border-width: 0px
        --card-shadow: none
        --card-elevated-shadow: none
    sidebar:
      base:
        --sidebar-item-transform: none
        --sidebar-item-spacing: 0
    button:
      base:
        --button-label-transform: none
        --button-label-spacing: 0
---

# Bento tonal

## Overview

Extends neus. A calm analytics surface for people who check their numbers
several times a day: rounded bento cards of varied size rest on a cool
green-gray ground, and depth comes only from that tone step. Signature move:
every figure in summaries and tables is set in JetBrains Mono with tabular
numerals, so numbers line up and read as data.

Provenance: dealt with `deal-directions.mjs` (seed 3380135315). Type, density
and elevation come from the deal; palette and shape were redealt because the
brief fixes them (emerald and blue accents, rounded cards). Neus's pill
controls and curved sidebar are kept.

## Colors

Emerald `#047857` is the only action color: buttons, the sidebar, the selected
tab. Blue `#1D4ED8` is a data color, the second series in charts and the
comparison line; it never marks an action. Cards are white on a `#EEF2EF`
ground; text is a green-tinted ink. Success and error keep neus semantics for
deltas.

## Typography

Inter Tight for interface text and headings, natural case everywhere.
JetBrains Mono for figures (KPI values, chart axes, table numbers) with
tabular numerals. Hierarchy comes from size and weight, never color.

## Layout

Standard density: 40px controls, 12px rhythm inside cards, 16px gutters
between bento tiles. A dashboard is a 12-column bento: KPI tiles span 3, the
main chart 8, a side list 4. On phones every tile spans the full width.

## Elevation & Depth

Tonal. Cards have no border and no shadow; the step from ground to white card
is the separation. Only floating layers (menus, dialogs) keep the neus
floating shadow.

## Shapes

Cards 20px, inner panels 14px, small chips 10px, controls pill.

## Components

### Card

White, borderless, 20px radius, 24px padding. One idea per card: a title in
label size, the figure in mono, a delta beside it.

### Button

Pill, natural-case labels. Primary emerald, secondary quiet.

### Sidebar

The neus curved sidebar on emerald.

## Do's and Don'ts

- Do set every metric value in the mono face with tabular numerals.
- Do separate tiles with the ground tone, not borders or shadows.
- Do use blue only for data series, never for actions.
- Don't use gradients, glows or glass.
- Don't put more than one primary button on a screen.
