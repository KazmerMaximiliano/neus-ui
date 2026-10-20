---
version: alpha
name: Programa
description: Paper ground, ink rules, signal orange and a printed-programme serif.
colors:
  primary: "#c2410c"
  on-primary: "#ffffff"
  ground: "#f7f5f0"
  ground-raised: "#efebe3"
  ink: "#1c1b19"
  ink-secondary: "#57534e"
  rule: "#ddd8ce"
  field-border: "#8a857c"
  ground-dark: "#171614"
  ground-raised-dark: "#211f1c"
  ink-dark: "#f2efe9"
  ink-secondary-dark: "#b5afa5"
  rule-dark: "#34312c"
  field-border-dark: "#6b665e"
typography:
  body-md:
    fontFamily: '"Source Sans 3", "Geist", Arial, sans-serif'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  heading:
    fontFamily: '"Source Serif 4", Georgia, serif'
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.01em
  label:
    fontFamily: '"Source Sans 3", "Geist", Arial, sans-serif'
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0em
  caption:
    fontFamily: '"Source Sans 3", "Geist", Arial, sans-serif'
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0em
  display:
    fontFamily: '"Source Serif 4", Georgia, serif'
    fontSize: 5rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.03em
  headline:
    fontFamily: '"Source Serif 4", Georgia, serif'
    fontSize: 2.75rem
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  lead:
    fontFamily: '"Source Sans 3", "Geist", Arial, sans-serif'
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  mono:
    fontFamily: '"Source Code Pro", monospace'
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0em
rounded:
  sm: 4px
  md: 6px
  default: 6px
  pill: 3em
  button: 4px
  input: 4px
  card: 6px
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
    textColor: "{colors.on-primary}"
    rounded: "{rounded.button}"
  input-field:
    rounded: "{rounded.input}"
    typography: "{typography.body-md}"
  card:
    backgroundColor: "{colors.ground}"
    rounded: "{rounded.card}"
x-neus:
  extends: vercel
  tokens:
    base:
      --font-body: "{typography.body-md.fontFamily}"
      --font-display: "{typography.display.fontFamily}"
      --font-mono: "{typography.mono.fontFamily}"
      --type-display-size: "clamp(2.75rem, 1.9rem + 3.6vw, {typography.display.fontSize})"
      --type-display-weight: "{typography.display.fontWeight}"
      --type-display-line-height: "{typography.display.lineHeight}"
      --type-display-tracking: "{typography.display.letterSpacing}"
      --type-headline-size: "clamp(2rem, 1.7rem + 1.2vw, {typography.headline.fontSize})"
      --type-headline-weight: "{typography.headline.fontWeight}"
      --type-headline-line-height: "{typography.headline.lineHeight}"
      --type-headline-tracking: "{typography.headline.letterSpacing}"
      --type-heading-weight: "{typography.heading.fontWeight}"
      --type-heading-tracking: "{typography.heading.letterSpacing}"
      --type-lead-size: "{typography.lead.fontSize}"
      --type-lead-line-height: "{typography.lead.lineHeight}"
      --radius-sm: "{rounded.sm}"
      --radius-md: "{rounded.md}"
      --radius-default: "{rounded.default}"
    light:
      --color-surface: "{colors.ground}"
      --color-surface-secondary: "{colors.ground-raised}"
      --color-surface-container-low: "{colors.ground-raised}"
      --color-text-primary: "{colors.ink}"
      --color-text-secondary: "{colors.ink-secondary}"
      --color-border-subtle: "{colors.rule}"
      --color-border-input: "{colors.field-border}"
      --elevation-floating: 0 0 0 1px var(--color-border-subtle), 0 8px 16px -8px rgba(28, 27, 25, 0.18)
      --elevation-dialog: 0 0 0 1px var(--color-border-subtle), 0 16px 32px -12px rgba(28, 27, 25, 0.24)
    dark:
      --color-surface: "{colors.ground-dark}"
      --color-surface-secondary: "{colors.ground-raised-dark}"
      --color-surface-container-low: "{colors.ground-raised-dark}"
      --color-text-primary: "{colors.ink-dark}"
      --color-text-secondary: "{colors.ink-secondary-dark}"
      --color-border-subtle: "{colors.rule-dark}"
      --color-border-input: "{colors.field-border-dark}"
      --elevation-floating: 0 0 0 1px var(--color-border-subtle), 0 8px 16px -8px rgba(28, 27, 25, 0.5)
      --elevation-dialog: 0 0 0 1px var(--color-border-subtle), 0 16px 32px -12px rgba(28, 27, 25, 0.6)
  recipes:
    button:
      base:
        --button-radius: "{rounded.button}"
        --button-min-height-small: 32px
        --button-min-height-medium: 36px
        --button-min-height-large: 44px
        --button-padding-medium: 7px 16px
        --button-padding-large: 11px 22px
        --button-font-size-medium: 15px
        --button-font-size-large: 16px
        --button-label-weight: "600"
    input:
      base:
        --input-radius: "{rounded.input}"
        --input-control-height-medium: 36px
        --input-control-height-large: 44px
        --input-font-size: 16px
        --input-border-color: var(--color-border-input)
    card:
      base:
        --card-radius: "{rounded.card}"
        --card-border-color: var(--color-border-subtle)
        --card-shadow: none
---

# Programa

## Overview

Extends vercel. A printed conference programme on paper: warm off-white
ground, near-black ink, one signal orange for actions, a serif display face
for titles and a humanist sans for everything you read. Density is compact
and surfaces share one tone; structure comes from hairline rules.

Signature move: every page section starts on a full-width 1px ink rule, and
titles stand on it with no label above them.

Dealt direction (deal-directions.mjs, seed 58283564): palette "Ink and signal
orange", type "Source Serif 4 + Source Sans 3", shape "Crisp", density
"Compact", elevation "Hairlines". Inspiration: concept from printed event
programmes and festival schedules: "sections divided by ruled lines, times
set in a fixed-width column".

## Colors

Paper `#f7f5f0` is the ground and `#1c1b19` the ink; supporting text is a warm
grey that keeps 7:1 on the ground. Signal orange `#c2410c` marks the action and
nothing else at rest. Field borders keep 3:1 against the ground. Dark mode
inverts to a warm near-black ground with the same orange.

## Typography

Source Serif 4 at 600 for display, headline and headings, tracked slightly
tight. Source Sans 3 for body, labels, buttons and fields, 16px or more for
running text. Source Code Pro only for times and figures set in a column.
Sentence case everywhere; no uppercase labels.

## Layout

Vercel's four-pixel rhythm and the 1120px container. Public pages separate
sections with the ink rule, not with tone changes; one inverse band carries
the densest content (the agenda).

## Elevation & Depth

Hairlines. Cards and fields have a 1px border in the rule tone and no shadow.
Only floating layers (menus, dialogs) get a ring and a short soft shadow.

## Shapes

Crisp: 4px on controls, 6px on cards and floating surfaces. Only avatars are
round.

## Components

### Button

Solid orange for the one primary action per view; outlined in ink otherwise.
Natural-case labels at 600. Heights 32, 36 and 44px.

### Card

Ground-colored with a hairline border and no shadow; headers have no rule.

### Input

36px (44px large) fields with a 4px radius, 16px text and a 3:1 border.

### Hero

Split: serif display headline, lead and the solid action on the start column;
the picture of the venue beside it.

### Feature list

Cards with a hairline border; no tinted icon tiles.

## Do's and Don'ts

- Do open every page section with a full-width 1px ink rule.
- Do set times and figures in Source Code Pro or tabular numerals.
- Do use one inverse band per page for the densest content.
- Don't put overlines or eyebrows above titles.
- Don't use gradients, glows, glass, tinted icon tiles or shadows on cards.
- Don't use orange for decoration, only for actions and focus of attention.
