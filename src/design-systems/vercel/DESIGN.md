---
version: alpha
name: Vercel
description: Neutral surfaces, small corner radii, and compact typography.
colors:
  primary: "#171717"
  on-primary: "#ffffff"
  focus: "#0072f5"
  primary-dark: "#ededed"
  on-primary-dark: "#171717"
  focus-dark: "#52a8ff"
  surface: "#ffffff"
  surface-secondary: "#fafafa"
  surface-disabled: "#f2f2f2"
  text-primary: "#171717"
  text-secondary: "#4d4d4d"
  border-subtle: "#ebebeb"
  surface-dark: "#0a0a0a"
  surface-secondary-dark: "#1a1a1a"
  surface-disabled-dark: "#111111"
  text-primary-dark: "#ededed"
  text-secondary-dark: "#a1a1a1"
  text-muted-dark: "#a1a1a1"
  text-placeholder-dark: "#8f8f8f"
  border-subtle-dark: "#2e2e2e"
  warning: "#ffb200"
  warning-dark-mode: "#ffb200"
typography:
  body-md:
    fontFamily: '"Geist", Arial, sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  heading:
    fontFamily: '"Geist", Arial, sans-serif'
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.01em
  label:
    fontFamily: '"Geist", Arial, sans-serif'
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0em
  caption:
    fontFamily: '"Geist", Arial, sans-serif'
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0em
  display:
    fontFamily: '"Geist", Arial, sans-serif'
    fontSize: 4.5rem
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.06em
  headline:
    fontFamily: '"Geist", Arial, sans-serif'
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.05em
  lead:
    fontFamily: '"Geist", Arial, sans-serif'
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 0em
rounded:
  default: 16px
  sm: 8px
  md: 12px
  pill: 3em
  button: 6px
  card: 6px
  input: 6px
  sidebar: 0px
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
  button-primary-hover:
    backgroundColor: "{colors.primary}"
  input-field:
    rounded: "{rounded.input}"
    typography: "{typography.body-md}"
  card:
    rounded: "{rounded.card}"
x-neus:
  id: vercel
  palette:
    light:
      primary: "{colors.primary}"
      onPrimary: "{colors.on-primary}"
      focus: "{colors.focus}"
      warning: "{colors.warning}"
    dark:
      primary: "{colors.primary-dark}"
      onPrimary: "{colors.on-primary-dark}"
      focus: "{colors.focus-dark}"
      warning: "{colors.warning-dark-mode}"
  tokens:
    base:
      --type-display-size: "clamp(2.5rem, 1.76rem + 3.05vw, {typography.display.fontSize})"
      --type-display-weight: "{typography.display.fontWeight}"
      --type-display-line-height: "{typography.display.lineHeight}"
      --type-display-tracking: "{typography.display.letterSpacing}"
      --type-headline-size: "clamp(2rem, 1.81rem + 0.76vw, {typography.headline.fontSize})"
      --type-headline-weight: "{typography.headline.fontWeight}"
      --type-headline-line-height: "{typography.headline.lineHeight}"
      --type-headline-tracking: "{typography.headline.letterSpacing}"
      --type-lead-size: "{typography.lead.fontSize}"
      --type-lead-weight: "{typography.lead.fontWeight}"
      --type-lead-line-height: "{typography.lead.lineHeight}"
      --type-lead-tracking: "{typography.lead.letterSpacing}"
      --font-body: "{typography.body-md.fontFamily}"
      --font-display: var(--font-body)
      --font-mono: '"Geist Mono", monospace'
      --elevation-dialog: 0 1px 1px rgba(0, 0, 0, 0.02), 0 8px 16px -4px rgba(0, 0, 0, 0.04), 0 24px 32px
        -8px rgba(0, 0, 0, 0.06)
      --elevation-floating: 0 4px 8px -4px rgba(0, 0, 0, 0.04), 0 16px 24px -8px rgba(0, 0, 0, 0.06)
    light:
      --color-surface: "{colors.surface}"
      --color-surface-secondary: "{colors.surface-secondary}"
      --color-surface-disabled: "{colors.surface-disabled}"
      --color-text-primary: "{colors.text-primary}"
      --color-text-secondary: "{colors.text-secondary}"
      --color-border-subtle: "{colors.border-subtle}"
    dark:
      --color-surface: "{colors.surface-dark}"
      --color-surface-secondary: "{colors.surface-secondary-dark}"
      --color-surface-disabled: "{colors.surface-disabled-dark}"
      --color-text-primary: "{colors.text-primary-dark}"
      --color-text-secondary: "{colors.text-secondary-dark}"
      --color-text-muted: "{colors.text-muted-dark}"
      --color-text-placeholder: "{colors.text-placeholder-dark}"
      --color-border-subtle: "{colors.border-subtle-dark}"
      --elevation-floating: 0 0 0 1px var(--color-border-subtle), 0 16px 24px -8px rgba(0, 0, 0, 0.5)
  recipes:
    badge:
      base:
        --badge-font-size: 12px
        --badge-font-weight: "500"
        --badge-letter-spacing: normal
        --badge-text-transform: none
        --badge-line-height: 16px
        --badge-padding: 2px 10px
        --badge-dot-font-size: 12px
    button:
      base:
        --button-radius: "{rounded.button}"
        --button-padding-small: 6px 12px
        --button-padding-medium: 8px 16px
        --button-min-height-small: 32px
        --button-min-height-medium: 40px
        --button-min-height-large: 48px
        --button-padding-large: 12px 24px
        --button-font-size-medium: 14px
        --button-font-size-large: 16px
        --button-line-height: 20px
        --button-label-weight: "500"
        --button-label-spacing: normal
        --button-label-transform: none
        --button-loader-size: 5px
        --button-loader-gap: 1px
    calendar:
      base:
        --calendar-radius: 12px
        --calendar-border-color: var(--color-border-subtle)
        --calendar-label-color: var(--color-text-primary)
        --calendar-caption-color: var(--color-text-primary)
        --calendar-caption-weight: "600"
        --calendar-nav-color: var(--color-text-primary)
        --calendar-day-radius: 6px
        --calendar-item-radius: 6px
        --calendar-day-hover-background: var(--color-surface-secondary)
        --calendar-selected-background: var(--color-primary)
        --calendar-selected-color: var(--color-text-on-primary)
        --calendar-selected-weight: "500"
        --calendar-range-middle-background: var(--color-surface-secondary)
        --calendar-today-color: "#0068d6"
        --calendar-today-ring: none
      dark:
        --calendar-today-color: "#52a8ff"
    card:
      base:
        --card-radius: "{rounded.card}"
        --card-border-color: var(--color-border-subtle)
        --card-header-border-width: 0px
    checkbox:
      base:
        --checkbox-size: 16px
        --checkbox-border-width: 1px
        --checkbox-border-color: var(--color-text-placeholder)
        --checkbox-hover-border-color: var(--color-text-primary)
        --checkbox-checked-shadow: none
        --checkbox-icon-size: 12px
    clock:
      base:
        --clock-radius: 12px
        --clock-border-color: var(--color-border-subtle)
        --clock-header-padding: 16px 20px
        --clock-header-border-width: 1px
        --clock-header-background: var(--color-surface)
        --clock-header-color: var(--color-text-primary)
        --clock-display-font-size: 36px
        --clock-segment-padding: 0 6px
        --clock-segment-radius: 6px
        --clock-segment-inactive-opacity: "1"
        --clock-segment-active-background: var(--color-surface-secondary)
        --clock-face-background: var(--color-surface-secondary)
    dropdown:
      base:
        --dropdown-padding: 4px 8px 4px 4px
        --dropdown-radius: 6px
        --dropdown-border-color: var(--color-border-subtle)
        --dropdown-hover-border-color: var(--color-text-placeholder)
        --dropdown-avatar-size: 28px
        --dropdown-caret-size: 16px
        --dropdown-caret-stroke: "2"
        --dropdown-caret-color: var(--color-text-secondary)
        --dropdown-name-color: var(--color-text-primary)
        --dropdown-name-weight: "500"
        --dropdown-name-transform: none
    file-uploader:
      base:
        --file-uploader-radius: 12px
        --file-uploader-border-width: 1px
        --file-uploader-border-color: var(--color-text-placeholder)
        --file-uploader-background: var(--color-surface-secondary)
        --file-uploader-hover-border-color: var(--color-text-primary)
        --file-uploader-drag-border-color: var(--color-focus)
        --file-uploader-drag-transform: none
        --file-uploader-title-size: var(--fs-base)
        --file-uploader-title-weight: "500"
        --file-uploader-badge-radius: 8px
        --file-uploader-badge-background: var(--color-surface)
        --file-uploader-badge-border-width: 1px
        --file-uploader-badge-color: var(--color-text-primary)
        --file-uploader-error-radius: 6px
    icon-button:
      base:
        --icon-button-radius: 6px
        --icon-button-size-small: 32px
        --icon-button-size-medium: 40px
        --icon-button-size-large: 48px
        --icon-button-icon-size-small: 16px
        --icon-button-icon-size-medium: 16px
        --icon-button-icon-size-large: 20px
    input:
      base:
        --input-radius: "{rounded.input}"
        --input-padding: 8px 12px
        --input-control-height-small: 32px
        --input-control-height-medium: 40px
        --input-control-height-large: 48px
        --input-small-padding: 5px 10px
        --input-large-padding: 13px 16px
        --input-border-color: var(--color-border-subtle)
        --input-font-size: 14px
        --input-line-height: 20px
        --input-color: var(--color-text-primary)
        --input-label-color: var(--color-text-primary)
        --input-label-offset: 0px
        --input-error-offset: 0px
        --input-focus-border-color: var(--color-focus)
        --input-focus-shadow: 0 0 0 3px var(--color-focus-ring)
        --input-error-focus-shadow: 0 0 0 3px var(--color-focus-ring-error)
        --input-readonly-background: var(--color-surface-secondary)
        --input-readonly-border-style: solid
        --input-readonly-border-color: var(--color-border-subtle)
    link:
      base:
        --link-color: "#0068d6"
        --link-underline-offset: 0.15em
      dark:
        --link-color: "#52a8ff"
    modal:
      base:
        --modal-width: 540px
        --modal-radius: 12px
        --modal-border-width: 1px
        --modal-border-color: var(--color-border-subtle)
        --modal-shadow: var(--elevation-dialog)
        --modal-backdrop: rgba(0, 0, 0, 0.3)
        --modal-divider-width: 0px
        --modal-title-size: 24px
        --modal-content-padding: 0 24px 24px
        --modal-footer-padding: 16px 24px
      dark:
        --modal-background: var(--color-surface-secondary)
    overlay:
      base:
        --overlay-border-color: var(--color-border-subtle)
        --overlay-radius: 12px
        --overlay-shadow: var(--elevation-floating)
        --overlay-offset: 4px
        --overlay-padding: 8px
        --overlay-item-padding: 8px
        --overlay-item-min-height: 40px
        --overlay-item-radius: 6px
        --overlay-item-font-weight: "400"
      dark:
        --overlay-shadow: var(--elevation-floating)
    select:
      base:
        --select-caret-size: 16px
        --select-caret-gap: 12px
        --select-caret-color: var(--color-text-secondary)
        --select-search-radius: 6px
        --select-tag-radius: 6px
    sidebar:
      base:
        --sidebar-header-height: 64px
        --sidebar-header-min-height: 64px
        --sidebar-header-padding: 10px
        --sidebar-background: var(--color-surface)
        --sidebar-color: var(--color-text-primary)
        --sidebar-header-background: var(--sidebar-background)
        --sidebar-decoration-display: none
        --sidebar-convex-radius: 0px
        --sidebar-title-color: var(--color-text-primary)
        --sidebar-item-color: var(--color-text-secondary)
        --sidebar-item-hover-background: var(--color-surface-hover)
        --sidebar-item-hover-color: var(--color-text-primary)
        --sidebar-item-active-background: var(--color-primary-light)
        --sidebar-item-active-color: var(--color-primary)
        --sidebar-item-focus-color: var(--color-focus)
        --sidebar-item-size: 14px
        --sidebar-item-weight: "500"
        --sidebar-item-spacing: 0px
        --sidebar-item-transform: none
        --sidebar-item-padding: 12px 16px
        --sidebar-body-gap: 8px
        --sidebar-border-width: 1px
        --sidebar-item-radius: 6px
        --sidebar-header-border-width: 1px
        --sidebar-control-radius: 6px
        --sidebar-control-shadow: none
    stepper:
      base:
        --stepper-dot-size-small: 24px
        --stepper-dot-size-medium: 32px
        --stepper-dot-size-large: 40px
        --stepper-dot-border-width: 1px
        --stepper-dot-font-weight: "500"
        --stepper-dot-done-background: var(--color-surface)
        --stepper-dot-done-border-color: var(--color-text-primary)
        --stepper-dot-done-color: var(--color-text-primary)
        --stepper-dot-hover-background: var(--color-surface-secondary)
        --stepper-label-font-size-small: 13px
        --stepper-label-font-size-medium: 14px
        --stepper-label-active-color: var(--color-text-primary)
        --stepper-connector-thickness: 1px
        --stepper-connector-done-color: var(--color-text-primary)
        --stepper-counter-transform: none
        --stepper-counter-spacing: normal
        --stepper-bar-height: 6px
        --stepper-bar-radius: 3px
        --stepper-bar-fill-radius: 3px
        --stepper-simple-size: 8px
        --stepper-simple-current-width: 20px
    week-calendar:
      base:
        --week-calendar-radius: 6px
        --week-calendar-padding: 16px
        --week-calendar-event-radius: 6px
        --week-calendar-title-size: 16px
    interactive-map:
      base:
        --interactive-map-radius: 6px
    data-table:
      base:
        --data-table-radius: 6px
        --data-table-control-radius: 6px
        --data-table-spacing: 6px
        --data-table-row-height: 40px
        --data-table-header-height: 40px
        --data-table-font-size: 14px
    templates:
      base:
        --app-template-content-padding: 24px
        --app-template-header-border-color: var(--color-border-subtle)
        --form-template-gap: 16px
    typography:
      base:
        --text-overline-tracking: 0em
        --text-overline-transform: none
    layout: {}
    media-placeholder: {}
    alert: {}
    avatar: {}
    sections: {}
---

# Vercel

## Overview

Use Geist's precise, restrained product interface: neutral
surfaces, clear text hierarchy, compact controls, and purposeful emphasis. The
design should support developer tools, settings, and data workflows without
requiring promotional graphics to establish identity.

Format: [Google DESIGN.md](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md) (alpha; consulted 2026-10-15).

Design references (consulted 2026-10-14): [Geist colors](https://vercel.com/geist/colors), [typography](https://vercel.com/geist/typography), [materials](https://vercel.com/geist/materials), [Button](https://vercel.com/geist/button), [Input](https://vercel.com/geist/input). Local web mappings are Neus UI design decisions.

## Colors

Use neutral roles for text, borders, backgrounds, and ordinary
controls. Reserve chromatic accents for meaning, focus, and feedback. Keep
backgrounds, interactive fills, borders, and text distinct. Geist distinguishes
opaque gray from gray-alpha used where the background should show through;
avoid doubling translucent borders at intersections.
Reference: [Geist colors](https://vercel.com/geist/colors).

Warning is Geist amber 700 in both themes ([Geist colors](https://vercel.com/geist/colors)).

## Typography

Use Geist Sans for interface text and Geist Mono for code and
technical identifiers. Separate heading, button, label, and copy roles; multiline
copy needs more leading than a compact label. Reference:
[Geist typography](https://vercel.com/geist/typography).
Local policy: avoid uppercase styling for ordinary actions and navigation.

## Layout

Local product-layout policy: use consistent columns, aligned
form fields, and economical spacing. Keep dense metadata readable and separate
sections through headings and spacing. Marketing grids and large display text
must not determine the density of routine application controls.

Public pages may use large display type and monochrome bands; routine controls keep their product density.

## Elevation & Depth

Select a material according to its place in the hierarchy: quiet
resting content, raised content, and floating overlays have different needs.
Choose the least elevation that remains legible and preserve separation in dark
mode. Reference: [Geist materials](https://vercel.com/geist/materials).

## Shapes

Small corner radii suit everyday surfaces and controls; larger
floating surfaces can use a different material radius. Geist's material presets
combine radius with fill, stroke, and shadow, rather than choosing each in isolation.
Reference: [Geist materials](https://vercel.com/geist/materials).

## Components

### Button

Local mapping informed by [Geist Button](https://vercel.com/geist/button):
use a strong neutral solid action, quieter outlined/text alternatives, concise
labels, and consistent sizes: small, medium and large are 32, 40 and 48px tall,
the same as inputs. Keep hover, press, keyboard focus, disabled, and loading
states legible without decorative motion.

### Card

Local mapping: use a base content surface with a quiet boundary
and deliberate internal spacing. Let headers, body text, and child actions provide
hierarchy. Choose elevation only when the surrounding layout requires it.

### Input

Local mapping informed by [Geist Input](https://vercel.com/geist/input):
keep compact geometry, a clear label/value hierarchy, a quiet resting border,
visible focus, and explicit validation feedback. Read-only values remain readable.

### Sidebar

Local navigation mapping: a neutral panel with aligned labels,
quiet separators, understated hover, and a clear current-location treatment.
Keyboard focus must be identifiable even on a selected item.

### Hero

Geist display with tight negative tracking, centered, a solid black action and an outlined secondary; product UI or code is the anchor.

### Feature list

A grid inside one bordered frame with hairline dividers; small monochrome icons, no tinted tiles.

### Testimonial

Plain quotes with small avatars, or a row of customer names.

### Supporting controls and content

Use the same semantic foreground, surface and focus roles for selectors, date and time controls, feedback and data views. Keep selected values distinct from hover and keyboard focus. Floating panels share the overlay geometry; tables and calendars preserve readable alignment when space is constrained. Templates establish page rhythm and responsive grouping without changing the visual identity of embedded controls.

## Do's and Don'ts

- Do choose typography and surface roles before tuning individual pixel values.
- Do verify neutral separation, selection, and focus in both themes.
- Do draw shared boundaries once and preserve readable supporting text.
- Don't use promotional gradients or display typography as default product chrome.
- Do use hairline grids, inverse bands and real product screenshots on public pages; never colorful gradients or tinted icon tiles.
