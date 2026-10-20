---
version: alpha
name: Los Aromos
description: Warm neighborhood-clinic system for Veterinaria Los Aromos. Forest green on cream, Newsreader over Work Sans, crisp small radii and hard ink offsets on floating layers.
colors:
  primary: "#2F5D3A"
  primary-dark: "#8FBF96"
  ground: "#F4F2EA"
  ground-raised: "#EAE6D8"
  ink: "#1D2A20"
  ink-secondary: "#4A5A4E"
  border-subtle: "#D9D4C3"
  border-input: "#8F8A76"
  ground-dark: "#141A16"
  ground-raised-dark: "#1C251F"
  ink-dark: "#ECEDE4"
  ink-secondary-dark: "#B4BDB2"
  border-subtle-dark: "#2E3A32"
  border-input-dark: "#66736A"
  shadow-ink: "#1D2A20"
  shadow-ink-dark: "#000000"
typography:
  display:
    fontFamily: '"Newsreader", "Work Sans", Georgia, serif'
    fontSize: 4rem
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -0.02em
  headline:
    fontFamily: '"Newsreader", "Work Sans", Georgia, serif'
    fontSize: 3rem
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -0.015em
  heading:
    fontFamily: '"Newsreader", "Work Sans", Georgia, serif'
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.005em
  body-md:
    fontFamily: '"Work Sans", system-ui, sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  lead:
    fontFamily: '"Work Sans", system-ui, sans-serif'
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  label:
    fontFamily: '"Work Sans", system-ui, sans-serif'
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0em
rounded:
  control: 4px
  card: 6px
  sm: 4px
  md: 6px
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
    textColor: "#ffffff"
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
      --font-mono: ui-monospace, "SF Mono", Menlo, monospace
      --type-display-weight: "500"
      --type-display-tracking: "-0.02em"
      --type-headline-weight: "500"
      --type-headline-tracking: "-0.015em"
      --type-heading-weight: "600"
      --type-heading-line-height: "1.25"
      --type-heading-tracking: "-0.005em"
      --radius-default: "{rounded.card}"
      --radius-sm: "{rounded.sm}"
      --radius-md: "{rounded.md}"
    light:
      --color-surface: "{colors.ground}"
      --color-surface-secondary: "{colors.ground-raised}"
      --color-surface-disabled: "{colors.ground-raised}"
      --color-text-primary: "{colors.ink}"
      --color-text-secondary: "{colors.ink-secondary}"
      --color-text-muted: "{colors.ink-secondary}"
      --color-text-placeholder: "{colors.ink-secondary}"
      --color-border-subtle: "{colors.border-subtle}"
      --color-border-muted: "{colors.border-subtle}"
      --color-border-input: "{colors.border-input}"
      --color-tag-bg: "{colors.ground-raised}"
      --elevation-floating: "3px 3px 0 {colors.shadow-ink}"
      --elevation-dialog: "6px 6px 0 {colors.shadow-ink}"
    dark:
      --color-surface: "{colors.ground-dark}"
      --color-surface-secondary: "{colors.ground-raised-dark}"
      --color-surface-disabled: "{colors.ground-raised-dark}"
      --color-text-primary: "{colors.ink-dark}"
      --color-text-secondary: "{colors.ink-secondary-dark}"
      --color-text-muted: "{colors.ink-secondary-dark}"
      --color-text-placeholder: "{colors.ink-secondary-dark}"
      --color-border-subtle: "{colors.border-subtle-dark}"
      --color-border-muted: "{colors.border-subtle-dark}"
      --color-border-input: "{colors.border-input-dark}"
      --color-tag-bg: "{colors.ground-raised-dark}"
      --elevation-floating: "3px 3px 0 {colors.shadow-ink-dark}"
      --elevation-dialog: "6px 6px 0 {colors.shadow-ink-dark}"
  recipes:
    button:
      base:
        --button-radius: "{rounded.control}"
        --button-label-transform: none
        --button-label-spacing: "0"
    input:
      base:
        --input-radius: "{rounded.control}"
    card:
      base:
        --card-radius: "{rounded.card}"
---

# Los Aromos

## Overview

Extends neus. A calm, neighborhood system for Veterinaria Los Aromos, a
small clinic on Bv. Oroño in Rosario. It keeps the Neus components, density
and spacing rhythm, and replaces the indigo, Manrope and pill identity with
forest green on cream paper, a news serif for titles and crisp small
corners: the feel of a well-kept clinic sign, not a tech product.

Signature move: one full-bleed accent band (`Section tone="brand"`) on the
page; every other section sits on the cream ground or its raised tone.

Provenance: dealt direction "Forest and brass" (deal-directions.mjs, seed
3867305388), with density kept at Neus Standard instead of the dealt Compact
because the audience fills forms on phones. The green also echoes the aromo
tree in the clinic's name. Format: Google DESIGN.md (alpha).

## Colors

Forest green `#2F5D3A` marks actions and at most one other element per
view; `#8FBF96` replaces it in dark mode. The ground is a warm cream
`#F4F2EA` with a raised tone `#EAE6D8` for alternating bands; ink is a deep
green-black `#1D2A20` with `#4A5A4E` for supporting text (both above 4.5:1
on either ground). Field borders `#8F8A76` keep 3:1 against the ground.
Status colors stay Neus defaults and always come with text.

## Typography

Newsreader (open license) for display, headline and headings, at medium
weight with slight negative tracking; Work Sans for body, labels and
buttons. Sentence case everywhere, including button labels. Public pages
open with one display headline and a lead; running text is 16px or more.
The overline is the one uppercase style and is used sparingly.

## Layout

Neus four-pixel rhythm and Standard density (36, 48 and 56px controls).
Pages sit in a 1120px Container, divided into Section bands that alternate
the ground and the raised tone; one brand band per page.

## Elevation & Depth

Content does not float: bands, borders and tone carry depth. Floating
layers (menus, popovers, dialogs) get a hard ink offset shadow with no blur,
3px for floating and 6px for dialogs. No soft shadows, no glows.

## Shapes

Crisp: 4px on buttons, fields and small elements, 6px on cards and media.
No pills except avatars and badges.

## Components

### Button

Solid forest green for the one primary action in a view, sentence-case
label in Work Sans. Secondary actions use outlined or text variants.

### Card

Flat cream or raised surface with a 6px radius and a subtle border; never a
shadow at rest, never a card inside a card.

### Input

Visible label, 4px radius, `#8F8A76` border, green focus ring.

### Hero

Newsreader display headline, Work Sans lead in secondary ink, one solid
action with its note. A real picture of the clinic anchors it.

### Feature list

Cards with a tinted icon tile and a short title, two or four per row.

### Testimonial

Cards with an initials avatar, name and the client's pet; one featured
quote. No stars or ratings.

## Do's and Don'ts

- Do keep one brand band per page and alternate ground and raised tones for the rest.
- Do use icon tiles, overlines sparingly and sentence-case button labels.
- Do check light and dark, keyboard focus, long content and reduced motion.
- Don't use gradients, glows, glass or soft blurred shadows.
- Don't use pill shapes on buttons or fields, or uppercase labels on buttons.
- Don't use green for more than the action and one other element per view.
