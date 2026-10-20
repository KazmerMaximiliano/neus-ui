---
version: alpha
name: AuraFlow Sand
description: Warm, quiet system for AuraFlow, an AI meditation app. Extends Neus with a sand ground, terracotta action, Newsreader headlines and soft 8/12px shapes.
colors:
  primary: "#A8471F"
  primary-dark: "#E8936B"
  ground: "#F5EFE6"
  ground-raised: "#EDE4D6"
  ink: "#2A211B"
  ink-soft: "#5E5146"
  ink-muted: "#6E6155"
  hairline: "#E0D4C3"
  hairline-muted: "#E8DFD1"
  field-border: "#C9B8A2"
  field-border-hover: "#A8957D"
  ground-dark: "#1C1814"
  ground-raised-dark: "#26211B"
  ink-dark: "#F1E9DE"
  ink-soft-dark: "#C2B5A5"
  ink-muted-dark: "#A99B8B"
  hairline-dark: "#3A332B"
  hairline-muted-dark: "#2F2923"
  field-border-dark: "#544A3F"
  field-border-hover-dark: "#75685A"
typography:
  body-md:
    fontFamily: '"Work Sans", "Manrope", system-ui, sans-serif'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  heading:
    fontFamily: '"Newsreader", Georgia, serif'
    fontSize: 1.75rem
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.01em
  display:
    fontFamily: '"Newsreader", Georgia, serif'
    fontSize: 4.75rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.03em
  headline:
    fontFamily: '"Newsreader", Georgia, serif'
    fontSize: 3rem
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: -0.02em
  lead:
    fontFamily: '"Work Sans", "Manrope", system-ui, sans-serif'
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  mono:
    fontFamily: '"IBM Plex Mono", ui-monospace, monospace'
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0em
rounded:
  control: 8px
  card: 12px
  sm: 6px
  md: 8px
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
    rounded: "{rounded.control}"
  input-field:
    rounded: "{rounded.control}"
    typography: "{typography.body-md}"
  card:
    rounded: "{rounded.card}"
x-neus:
  extends: neus
  tokens:
    base:
      --font-display: "{typography.display.fontFamily}"
      --font-body: "{typography.body-md.fontFamily}"
      --font-mono: "{typography.mono.fontFamily}"
      --fs-base: "{typography.body-md.fontSize}"
      --radius-default: "{rounded.card}"
      --radius-sm: "{rounded.sm}"
      --radius-md: "{rounded.md}"
      --type-heading-size: "{typography.heading.fontSize}"
      --type-heading-weight: "{typography.heading.fontWeight}"
      --type-heading-line-height: "{typography.heading.lineHeight}"
      --type-heading-tracking: "{typography.heading.letterSpacing}"
      --type-display-size: "clamp(2.75rem, 1.9rem + 3.6vw, {typography.display.fontSize})"
      --type-display-weight: "{typography.display.fontWeight}"
      --type-display-line-height: "{typography.display.lineHeight}"
      --type-display-tracking: "{typography.display.letterSpacing}"
      --type-headline-size: "clamp(2rem, 1.63rem + 1.52vw, {typography.headline.fontSize})"
      --type-headline-weight: "{typography.headline.fontWeight}"
      --type-headline-line-height: "{typography.headline.lineHeight}"
      --type-headline-tracking: "{typography.headline.letterSpacing}"
      --type-body-line-height: "{typography.body-md.lineHeight}"
      --elevation-floating: 0 6px 16px var(--color-shadow)
      --elevation-dialog: 0 12px 32px var(--color-shadow)
    light:
      --color-surface: "{colors.ground}"
      --color-surface-secondary: "{colors.ground-raised}"
      --color-surface-disabled: "{colors.ground-raised}"
      --color-text-primary: "{colors.ink}"
      --color-text-secondary: "{colors.ink-soft}"
      --color-text-muted: "{colors.ink-muted}"
      --color-text-placeholder: "{colors.ink-muted}"
      --color-border-subtle: "{colors.hairline}"
      --color-border-muted: "{colors.hairline-muted}"
      --color-border-input: "{colors.field-border}"
      --color-border-input-hover: "{colors.field-border-hover}"
      --color-tag-bg: "{colors.ground-raised}"
    dark:
      --color-surface: "{colors.ground-dark}"
      --color-surface-secondary: "{colors.ground-raised-dark}"
      --color-surface-disabled: "{colors.ground-raised-dark}"
      --color-text-primary: "{colors.ink-dark}"
      --color-text-secondary: "{colors.ink-soft-dark}"
      --color-text-muted: "{colors.ink-muted-dark}"
      --color-text-placeholder: "{colors.ink-muted-dark}"
      --color-border-subtle: "{colors.hairline-dark}"
      --color-border-muted: "{colors.hairline-muted-dark}"
      --color-border-input: "{colors.field-border-dark}"
      --color-border-input-hover: "{colors.field-border-hover-dark}"
      --color-tag-bg: "{colors.ground-raised-dark}"
  recipes:
    button:
      base:
        --button-radius: "{rounded.control}"
        --button-label-transform: none
        --button-label-spacing: "0"
        --button-label-weight: "600"
        --button-font-size-small: var(--fs-base)
        --button-font-size-medium: var(--fs-md)
        --button-font-size-large: var(--fs-lg)
    input:
      base:
        --input-radius: "{rounded.control}"
        --input-font-size: var(--fs-md)
        --input-padding: 0.75em 1em
        --input-control-height-medium: 44px
        --input-control-height-large: 52px
        --input-label-font-size: var(--fs-base)
        --input-focus-border-color: var(--color-primary)
    select:
      base:
        --select-tag-radius: "{rounded.sm}"
    card:
      base:
        --card-border-color: var(--color-border-subtle)
        --card-header-border-width: 0px
        --card-content-padding: 24px
        --card-header-padding: 24px 24px 0
        --card-footer-padding: 0 24px 24px
    sections:
      base:
        --site-header-link-font-size: var(--fs-md)
        --feature-icon-size: 44px
        --feature-icon-glyph-size: 22px
        --feature-icon-radius: "{rounded.md}"
        --testimonial-quote-size: var(--fs-xl)
        --testimonial-rule-width: 2px
        --section-header-margin-block-end: var(--space-8)
---

# AuraFlow Sand

## Overview

Extends Neus. AuraFlow is an AI meditation app for young professionals who
are tired and short of time; the system should read as a pause, not as
another productivity tool. It keeps Neus's components, spacing rhythm and
focus behavior, and replaces the identity: a warm sand ground instead of
white, terracotta instead of indigo, Newsreader headlines over Work Sans
text, soft 8/12px shapes instead of pills, and hairlines instead of shadows.

Signature move: an oversized headline set tight in Newsreader, the one loud
element on each page; everything around it stays quiet.

Provenance: direction "Sand and terracotta" dealt by
`deal-directions.mjs --surface marketing` (seed 2575709694), chosen by the
user on 2026-10-20. Chosen over the category reflex (purple gradients for AI,
pale blue for wellness).

## Colors

One ground (sand `#F5EFE6`), one ink (`#2A211B`), one accent (terracotta
`#A8471F`, `#E8936B` in dark). The accent marks the primary action and at
most one other element per view (an icon tile, a quote rule). Raised bands
use `#EDE4D6`, one tone step off the ground. Supporting text `#5E5146` keeps
4.5:1 on both grounds. Status colors keep Neus roles and always come with a
label or icon.

## Typography

Newsreader (display, headline, heading; weight 500, tight tracking) for
titles; Work Sans for everything a person reads or types; IBM Plex Mono only
for code and placeholder labels. Sentence case everywhere; no uppercase
labels, button labels in natural case. Running text 16px or more; the
display headline fits in two lines at every width.

## Layout

Neus's four-pixel rhythm and 1120px container. Sections alternate the
default and subtle tones; at most one brand band per page (the closing
call to action). Generous vertical space separates sections instead of rules.

## Elevation & Depth

Hairlines. Surfaces share the ground tone; cards and fields are separated by
a 1px hairline (`--color-border-subtle`), never by shadows. Shadows appear
only on floating layers (menus, dialogs).

## Shapes

Soft: 8px for controls (buttons, fields, tags), 12px for cards and media,
round only for avatars. No pills.

## Components

Buttons: one solid terracotta action per view, natural-case 16px label,
8px corners, as tall as the field beside it (44px medium). Fields: 16px
value text, visible label, terracotta focus border. Cards: hairline border,
no header divider, 24px padding. Feature icons sit in an 8px tinted tile.
Testimonials as running text with a 2px terracotta rule beside each quote.

## Do's and Don'ts

- Do let the display headline be the loudest thing on the page.
- Do use tinted icon tiles for features and one brand band for the closing call to action.
- Do keep labels and buttons in sentence case.
- Don't use gradients, glows, glass or shadows on resting surfaces.
- Don't use overlines or eyebrows above titles; put the information in the title.
- Don't use pills, uppercase tracking or purple.
