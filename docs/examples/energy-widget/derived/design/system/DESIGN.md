---
version: alpha
name: Musgo
description: Warm moss accent, editorial serif headings on a humanist sans, soft corners and hairline depth.
colors:
  primary: "#55652F"
  on-primary: "#ffffff"
  primary-dark: "#B5C98A"
  on-primary-dark: "#1F2318"
  ground: "#F5F5F0"
  raised: "#FFFFFF"
  ink: "#1F2318"
  ink-soft: "#565B4C"
  hairline: "#DCDDD3"
  ground-dark: "#171A12"
  raised-dark: "#20241A"
  ink-dark: "#ECEDE4"
  ink-soft-dark: "#AEB2A2"
  hairline-dark: "#353A2C"
typography:
  body-md:
    fontFamily: '"Source Sans 3", "Segoe UI", system-ui, sans-serif'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0em
  heading:
    fontFamily: '"Source Serif 4", Georgia, serif'
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.005em
  label:
    fontFamily: '"Source Sans 3", "Segoe UI", system-ui, sans-serif'
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0em
  display:
    fontFamily: '"Source Serif 4", Georgia, serif'
    fontSize: 4rem
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.015em
  mono:
    fontFamily: '"Source Code Pro", ui-monospace, monospace'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
rounded:
  control: 8px
  card: 12px
spacing:
  step-1: 4px
  step-2: 8px
  step-3: 12px
  step-4: 16px
  step-6: 24px
  step-8: 32px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.control}"
  input-field:
    rounded: "{rounded.control}"
    typography: "{typography.body-md}"
  card:
    backgroundColor: "{colors.raised}"
    rounded: "{rounded.card}"
x-neus:
  extends: apple
  tokens:
    base:
      --font-body: "{typography.body-md.fontFamily}"
      --font-display: "{typography.display.fontFamily}"
      --font-mono: "{typography.mono.fontFamily}"
      --type-display-weight: "{typography.display.fontWeight}"
      --type-headline-weight: "{typography.heading.fontWeight}"
      --radius-sm: 6px
      --radius-md: "{rounded.control}"
      --radius-default: "{rounded.card}"
    light:
      --color-surface: "{colors.ground}"
      --color-surface-secondary: "{colors.raised}"
      --color-text-primary: "{colors.ink}"
      --color-text-secondary: "{colors.ink-soft}"
      --color-border-subtle: "{colors.hairline}"
    dark:
      --color-surface: "{colors.ground-dark}"
      --color-surface-secondary: "{colors.raised-dark}"
      --color-text-primary: "{colors.ink-dark}"
      --color-text-secondary: "{colors.ink-soft-dark}"
      --color-border-subtle: "{colors.hairline-dark}"
  recipes:
    button:
      base:
        --button-radius: "{rounded.control}"
        --button-label-weight: "600"
    card:
      base:
        --card-radius: "{rounded.card}"
        --card-border-color: var(--color-border-subtle)
      light:
        --card-shadow: none
        --card-background: "{colors.raised}"
      dark:
        --card-shadow: none
        --card-background: "{colors.raised-dark}"
---

# Musgo

## Overview

Extends `apple`. Musgo is a calm, domestic system for household tools: energy,
budgets, home care. It reads like a well-made utility bill that wants to help.
Signature move: one moss accent marks the single most important figure or
action on a screen; nothing else uses the accent at rest. Dealt direction
"Moss neutral" (palette, type pairing, soft shape, hairline elevation), with
density moved from compact to standard because the first product is a
consumer widget, not a table.

## Colors

A warm off-white ground (`#F5F5F0`) with white raised surfaces and olive-tinted
ink. The moss accent (`#55652F`) is the action and the key result; a pale moss
(`#B5C98A`) carries it in dark mode. Semantic colors come from the base.

## Typography

Source Serif 4 for headings and large figures gives warmth and authority;
Source Sans 3 for everything else stays legible at small sizes. Body text is
16px. Figures use tabular numerals.

## Layout

Standard density: 40px controls, 12px rhythm on the 4px spacing scale.
Content sits in a single comfortable column; widgets cap at about 720px.

## Elevation & Depth

Hairlines, not shadows. Surfaces at rest share one tone separated by
`#DCDDD3` hairlines; only floating layers (menus, dialogs) keep the base
shadow.

## Shapes

Soft: 8px controls, 12px cards. No pills except badges.

## Components

Cards are white on the warm ground with a hairline border and no shadow.
Primary buttons are moss with white labels, natural case, weight 600.

## Do's and Don'ts

- Do keep the accent for one figure or action per view.
- Do use serif for headings and the key result figure only.
- Do show the assumptions behind any estimate next to it.
- Don't use gradients, glows, glass or drop shadows on resting surfaces.
- Don't set running text below 16px or in all caps.
