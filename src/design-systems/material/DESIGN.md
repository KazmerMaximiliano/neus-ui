---
version: alpha
name: Material
description: Primary purple, rounded shapes, and subtle elevation.
colors:
  primary: "#6442d6"
  on-primary: "#ffffff"
  primary-dark: "#c8b3fd"
  on-primary-dark: "#161616"
  surface: "#fef7ff"
  surface-secondary: "#f3edf7"
  surface-container-low: "#f7f2fa"
  surface-disabled: "#f3edf7"
  text-primary: "#1d1b20"
  text-secondary: "#49454f"
  text-muted: "#49454f"
  text-placeholder: "#79747e"
  border-subtle: "#cac4d0"
  border-input-hover: "#79747e"
  secondary-container: "#e8def8"
  on-secondary-container: "#4a4459"
  surface-container-lowest: "#ffffff"
  surface-container-high: "#ece6f0"
  surface-container-highest: "#e6e0e9"
  tertiary: "#7d5260"
  on-tertiary: "#ffffff"
  surface-dark: "#141218"
  surface-secondary-dark: "#211f26"
  surface-container-low-dark: "#1d1b20"
  surface-disabled-dark: "#1d1b20"
  text-primary-dark: "#e6e0e9"
  text-secondary-dark: "#cac4d0"
  text-muted-dark: "#cac4d0"
  text-placeholder-dark: "#938f99"
  border-subtle-dark: "#49454f"
  border-input-hover-dark: "#938f99"
  secondary-container-dark: "#4a4458"
  on-secondary-container-dark: "#e8def8"
  surface-container-lowest-dark: "#0f0d13"
  surface-container-high-dark: "#2b2930"
  surface-container-highest-dark: "#36343b"
  tertiary-dark: "#efb8c8"
  on-tertiary-dark: "#492532"
typography:
  body-md:
    fontFamily: '"Roboto", Arial, sans-serif'
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.5px
  heading:
    fontFamily: '"Roboto", Arial, sans-serif'
    fontSize: 1.5rem
    fontWeight: 400
    lineHeight: 1.333333
    letterSpacing: -0.01em
  label:
    fontFamily: '"Roboto", Arial, sans-serif'
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.1px
  caption:
    fontFamily: '"Roboto", Arial, sans-serif'
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.4px
  display:
    fontFamily: '"Roboto", Arial, sans-serif'
    fontSize: 3.5625rem
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: -0.25px
  headline:
    fontFamily: '"Roboto", Arial, sans-serif'
    fontSize: 2rem
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: 0em
  lead:
    fontFamily: '"Roboto", Arial, sans-serif'
    fontSize: 1.375rem
    fontWeight: 400
    lineHeight: 1.27
    letterSpacing: 0em
rounded:
  default: 16px
  sm: 8px
  md: 12px
  pill: 3em
  button: 20px
  card: 12px
  input: 4px
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
  id: material
  palette:
    light:
      primary: "{colors.primary}"
      onPrimary: "{colors.on-primary}"
    dark:
      primary: "{colors.primary-dark}"
      onPrimary: "{colors.on-primary-dark}"
  tokens:
    base:
      --type-display-size: "clamp(2.25rem, 1.76rem + 2vw, {typography.display.fontSize})"
      --type-display-weight: "{typography.display.fontWeight}"
      --type-display-line-height: "{typography.display.lineHeight}"
      --type-display-tracking: "{typography.display.letterSpacing}"
      --type-headline-size: "clamp(1.5rem, 1.31rem + 0.76vw, {typography.headline.fontSize})"
      --type-headline-weight: "{typography.headline.fontWeight}"
      --type-headline-line-height: "{typography.headline.lineHeight}"
      --type-headline-tracking: "{typography.headline.letterSpacing}"
      --type-lead-size: "{typography.lead.fontSize}"
      --type-lead-weight: "{typography.lead.fontWeight}"
      --type-lead-line-height: "{typography.lead.lineHeight}"
      --type-lead-tracking: "{typography.lead.letterSpacing}"
      --font-body: "{typography.body-md.fontFamily}"
      --font-display: var(--font-body)
      --type-body-size: "{typography.body-md.fontSize}"
      --type-body-line-height: "{typography.body-md.lineHeight}"
      --type-body-tracking: "{typography.body-md.letterSpacing}"
      --type-heading-weight: "{typography.heading.fontWeight}"
      --type-heading-line-height: "{typography.heading.lineHeight}"
      --type-label-tracking: "{typography.label.letterSpacing}"
      --type-caption-tracking: "{typography.caption.letterSpacing}"
      --elevation-dialog: 0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.3)
      --elevation-floating: 0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(0, 0, 0, 0.15)
    light:
      --color-surface: "{colors.surface}"
      --color-surface-secondary: "{colors.surface-secondary}"
      --color-surface-container-low: "{colors.surface-container-low}"
      --color-surface-disabled: "{colors.surface-disabled}"
      --color-text-primary: "{colors.text-primary}"
      --color-text-secondary: "{colors.text-secondary}"
      --color-text-muted: "{colors.text-muted}"
      --color-text-placeholder: "{colors.text-placeholder}"
      --color-border-subtle: "{colors.border-subtle}"
      --color-border-input-hover: "{colors.border-input-hover}"
      --color-secondary-container: "{colors.secondary-container}"
      --color-on-secondary-container: "{colors.on-secondary-container}"
      --color-surface-container-lowest: "{colors.surface-container-lowest}"
      --color-surface-container-high: "{colors.surface-container-high}"
      --color-surface-container-highest: "{colors.surface-container-highest}"
      --color-tertiary: "{colors.tertiary}"
      --color-on-tertiary: "{colors.on-tertiary}"
    dark:
      --color-surface: "{colors.surface-dark}"
      --color-surface-secondary: "{colors.surface-secondary-dark}"
      --color-surface-container-low: "{colors.surface-container-low-dark}"
      --color-surface-disabled: "{colors.surface-disabled-dark}"
      --color-text-primary: "{colors.text-primary-dark}"
      --color-text-secondary: "{colors.text-secondary-dark}"
      --color-text-muted: "{colors.text-muted-dark}"
      --color-text-placeholder: "{colors.text-placeholder-dark}"
      --color-border-subtle: "{colors.border-subtle-dark}"
      --color-border-input-hover: "{colors.border-input-hover-dark}"
      --color-secondary-container: "{colors.secondary-container-dark}"
      --color-on-secondary-container: "{colors.on-secondary-container-dark}"
      --color-surface-container-lowest: "{colors.surface-container-lowest-dark}"
      --color-surface-container-high: "{colors.surface-container-high-dark}"
      --color-surface-container-highest: "{colors.surface-container-highest-dark}"
      --color-tertiary: "{colors.tertiary-dark}"
      --color-on-tertiary: "{colors.on-tertiary-dark}"
  recipes:
    badge:
      base:
        --badge-font-size: 12px
        --badge-font-weight: "500"
        --badge-letter-spacing: 0.5px
        --badge-text-transform: none
        --badge-line-height: 16px
        --badge-padding: 4px 8px
        --badge-radius: 8px
        --badge-dot-font-size: 12px
    button:
      base:
        --button-radius: "{rounded.button}"
        --button-padding-small: 8px 16px
        --button-padding-medium: 10px 24px
        --button-min-height-small: 0px
        --button-min-height-medium: 0px
        --button-min-height-large: 0px
        --button-padding-large: 14px 28px
        --button-font-size-medium: 14px
        --button-font-size-large: 16px
        --button-line-height: 20px
        --button-label-weight: "500"
        --button-label-spacing: 0.1px
        --button-label-transform: none
        --button-shadow: none
        --button-shadow-hover: none
        --button-shadow-active: none
        --button-loader-gap: 3px
        --button-disabled-opacity: "1"
        --button-disabled-background: color-mix(in srgb, var(--color-text-primary) 12%, var(--color-surface))
        --button-disabled-color: color-mix(in srgb, var(--color-text-primary) 38%, var(--color-surface))
        --button-elevated-shadow: 0 1px 3px var(--color-shadow)
        --button-elevated-shadow-hover: 0 2px 6px var(--color-shadow)
    calendar:
      base:
        --calendar-background: var(--color-surface-secondary)
        --calendar-border-width: 0px
        --calendar-radius: 16px
        --calendar-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(0, 0, 0, 0.15)
        --calendar-divider-color: var(--color-border-subtle)
        --calendar-label-color: var(--color-text-secondary)
        --calendar-label-weight: "500"
        --calendar-caption-color: var(--color-text-secondary)
        --calendar-caption-weight: "500"
        --calendar-nav-color: var(--color-text-secondary)
        --calendar-weekday-color: var(--color-text-primary)
        --calendar-day-size: 40px
        --calendar-item-radius: 999px
        --calendar-day-hover-background: color-mix(in srgb, var(--color-text-primary) 8%, transparent)
        --calendar-selected-background: var(--color-primary)
        --calendar-selected-color: var(--color-text-on-primary)
        --calendar-selected-weight: "500"
        --calendar-range-middle-background: var(--color-secondary-container)
        --calendar-range-middle-color: var(--color-on-secondary-container)
        --calendar-today-color: var(--color-primary-text)
        --calendar-today-weight: "500"
    card:
      base:
        --card-radius: "{rounded.card}"
        --card-background: var(--color-surface-container-low)
        --card-border-width: 0px
        --card-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)
        --card-header-border-width: 0px
        --card-filled-background: var(--color-surface-container-highest)
        --card-elevated-background: var(--color-surface-container-low)
        --card-elevated-shadow: var(--card-shadow)
    checkbox:
      base:
        --checkbox-radius: 2px
        --checkbox-border-color: var(--color-text-secondary)
        --checkbox-hover-border-color: var(--color-text-primary)
        --checkbox-checked-shadow: none
        --checkbox-icon-size: 14px
        --checkbox-gap: 12px
    clock:
      base:
        --clock-min-width: 328px
        --clock-background: var(--color-surface-secondary)
        --clock-border-width: 0px
        --clock-radius: 28px
        --clock-shadow: 0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.3)
        --clock-header-padding: 24px 24px 0
        --clock-header-background: transparent
        --clock-header-color: var(--color-text-primary)
        --clock-display-font-size: 45px
        --clock-segment-padding: 4px 12px
        --clock-segment-gap: 4px
        --clock-segment-radius: 8px
        --clock-segment-inactive-opacity: "1"
        --clock-segment-active-background: var(--color-secondary-container)
        --clock-segment-active-color: var(--color-on-secondary-container)
        --clock-face-size: 256px
        --clock-face-background: var(--color-surface-container-low)
        --clock-number-size: 48px
    dropdown:
      base:
        --dropdown-padding: 4px 12px 4px 4px
        --dropdown-radius: 24px
        --dropdown-border-color: var(--color-border-subtle)
        --dropdown-hover-border-color: var(--color-text-secondary)
        --dropdown-avatar-size: 32px
        --dropdown-caret-size: 18px
        --dropdown-caret-stroke: "2"
        --dropdown-caret-color: var(--color-text-secondary)
        --dropdown-name-color: var(--color-text-primary)
        --dropdown-name-weight: "500"
        --dropdown-name-transform: none
    file-uploader:
      base:
        --file-uploader-radius: 12px
        --file-uploader-border-width: 1px
        --file-uploader-border-color: var(--color-text-secondary)
        --file-uploader-background: var(--color-surface-container-low)
        --file-uploader-drag-transform: none
        --file-uploader-title-weight: "500"
        --file-uploader-badge-radius: 16px
        --file-uploader-badge-background: var(--color-secondary-container)
        --file-uploader-badge-color: var(--color-on-secondary-container)
        --file-uploader-error-radius: 4px
    icon-button:
      base:
        --icon-button-size-small: 32px
        --icon-button-size-medium: 40px
        --icon-button-size-large: 56px
        --icon-button-icon-size-small: 18px
        --icon-button-icon-size-medium: 24px
        --icon-button-icon-size-large: 28px
    input:
      base:
        --input-radius: "{rounded.input}"
        --input-padding: 16px
        --input-border-color: var(--color-border-input-hover)
        --input-font-size: 14px
        --input-line-height: 20px
        --input-color: var(--color-text-primary)
        --input-label-color: var(--color-text-primary)
        --input-label-offset: 0px
        --input-error-offset: 0px
        --input-hover-border-color: var(--color-text-primary)
        --input-focus-border-color: var(--color-focus)
        --input-focus-shadow: inset 0 0 0 1px var(--color-focus)
        --input-error-focus-shadow: inset 0 0 0 1px var(--color-error)
        --input-label-position: absolute
        --input-label-top: calc(var(--field-height) / 2)
        --input-label-left: 12px
        --input-label-translate: translateY(-50%)
        --input-label-background: var(--input-background)
        --input-label-padding: 0 4px
        --input-label-rest-size: var(--input-font-size)
        --input-label-raised-top: 0px
        --input-label-raised-translate: translateY(-50%)
        --input-label-raised-size: 12px
        --input-filled-background: var(--color-surface-container-highest)
        --input-placeholder-rest-opacity: "0"
    link:
      base:
        --link-decoration: underline
        --link-underline-offset: 0.15em
    modal:
      base:
        --modal-width: 560px
        --modal-radius: 28px
        --modal-background: var(--color-surface-secondary)
        --modal-shadow: var(--elevation-dialog)
        --modal-backdrop: rgba(0, 0, 0, 0.32)
        --modal-divider-width: 0px
        --modal-header-padding: 24px 24px 16px
        --modal-title-size: 24px
        --modal-title-weight: "400"
        --modal-content-padding: 0 24px
        --modal-footer-padding: 24px
        --modal-footer-gap: 8px
    overlay:
      base:
        --overlay-background: var(--color-surface-secondary)
        --overlay-border-width: 0px
        --overlay-radius: 4px
        --overlay-shadow: var(--elevation-floating)
        --overlay-offset: 4px
        --overlay-padding: 8px 0
        --overlay-item-padding: 12px
        --overlay-item-min-height: 48px
        --overlay-item-font-weight: "400"
        --overlay-item-hover-background: color-mix(in srgb, var(--color-text-primary) 8%, transparent)
        --overlay-item-selected-background: var(--color-secondary-container)
        --overlay-item-selected-color: var(--color-on-secondary-container)
    select:
      base:
        --select-caret-size: 24px
        --select-caret-gap: 12px
        --select-caret-color: var(--color-text-secondary)
        --select-search-radius: 4px
        --select-tag-radius: 8px
        --select-tag-background: transparent
        --select-tag-border-width: 1px
        --select-tag-border-color: var(--color-border-subtle)
        --select-tag-color: var(--color-text-secondary)
    sidebar:
      base:
        --sidebar-header-height: 64px
        --sidebar-header-min-height: 64px
        --sidebar-header-padding: 10px
        --sidebar-background: var(--color-surface-secondary)
        --sidebar-color: var(--color-text-primary)
        --sidebar-header-background: var(--sidebar-background)
        --sidebar-decoration-display: none
        --sidebar-convex-radius: 0px
        --sidebar-title-color: var(--color-text-primary)
        --sidebar-item-color: var(--color-text-secondary)
        --sidebar-item-hover-background: var(--color-surface-hover)
        --sidebar-item-hover-color: var(--color-text-primary)
        --sidebar-item-focus-color: var(--color-focus)
        --sidebar-item-size: 14px
        --sidebar-item-weight: "500"
        --sidebar-item-spacing: 0px
        --sidebar-item-transform: none
        --sidebar-item-padding: 12px 16px
        --sidebar-body-gap: 8px
        --sidebar-border-width: 0px
        --sidebar-item-radius: 28px
        --sidebar-item-active-background: var(--color-secondary-container)
        --sidebar-item-active-color: var(--color-on-secondary-container)
        --sidebar-shadow: 0 1px 3px var(--color-shadow)
        --sidebar-control-radius: 16px
    stepper:
      base:
        --stepper-dot-size-small: 24px
        --stepper-dot-size-medium: 32px
        --stepper-dot-size-large: 40px
        --stepper-dot-border-color: var(--color-text-secondary)
        --stepper-dot-font-weight: "500"
        --stepper-dot-done-background: var(--color-secondary-container)
        --stepper-dot-done-border-color: var(--color-secondary-container)
        --stepper-dot-done-color: var(--color-on-secondary-container)
        --stepper-label-font-size-small: 12px
        --stepper-label-font-size-medium: 14px
        --stepper-label-font-size-large: 16px
        --stepper-label-active-color: var(--color-text-primary)
        --stepper-counter-transform: none
        --stepper-counter-spacing: 0.1px
        --stepper-bar-background: var(--color-secondary-container)
        --stepper-simple-background: var(--color-secondary-container)
    week-calendar:
      base:
        --week-calendar-radius: 12px
        --week-calendar-padding: 24px
        --week-calendar-event-radius: 12px
        --week-calendar-today-background: var(--color-secondary-container)
        --week-calendar-today-color: var(--color-on-secondary-container)
    interactive-map:
      base:
        --interactive-map-radius: 12px
    data-table:
      base:
        --data-table-radius: 12px
        --data-table-control-radius: 4px
        --data-table-header-background: var(--color-surface-container-low)
    templates:
      base:
        --app-template-content-padding: 24px
        --app-template-header-background: var(--color-surface-container-low)
        --app-template-header-border-width: 0px
        --app-template-content-background: var(--color-surface)
        --form-template-gap: 24px
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

# Material

## Overview

Use Material 3 base as the visual foundation: clear action hierarchy,
semantic color pairs, tonal surfaces, purposeful shapes, and legible type roles.
The goal is a coherent product interface across forms, navigation, and content.
Material 3 Expressive is outside this baseline.

Format: [Google DESIGN.md](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md) (alpha; consulted 2026-10-15).

Design references (consulted 2026-10-14): [M3 color roles](https://m3.material.io/styles/color/the-color-system/key-colors-tones), [applying type](https://m3.material.io/styles/typography/applying-type), [button](https://github.com/material-components/material-web/blob/main/docs/components/button.md), [text-field](https://github.com/material-components/material-web/blob/main/docs/components/text-field.md). Local web mappings are Neus UI design decisions.

## Colors

Distinguish primary, secondary, tertiary, error, surface, and
outline roles. Pair a fill with its corresponding on-color; use surface-container
levels to express grouping. Light and dark schemes must preserve these role
relationships rather than invert colors mechanically. Reference:
[M3 color roles](https://m3.material.io/styles/color/the-color-system/key-colors-tones).

M3 defines no warning role; warning uses the Neus orange, a local decision.

## Typography

Organize text into display, headline, title, body, and label
roles, with size variants. Use body roles for reading and label roles for actions,
following [M3 applying type](https://m3.material.io/styles/typography/applying-type).
Local baseline: prefer Roboto for both body and display, with sans-serif fallbacks;
keep labels in natural case and preserve hierarchy at narrow widths.

## Layout

Local web mapping: use a consistent spacing rhythm, align field
groups, and let content determine responsive composition. Preserve usable targets
and text before reducing whitespace. Navigation may change presentation with
available width while retaining the same destinations.

Public pages separate sections with surface-container tones and keep content in a centered container.

## Elevation & Depth

Use tonal separation to distinguish surfaces; reserve stronger
depth for elevated or floating elements. Material's surface-container roles
provide a color hierarchy. Elevated buttons should be used selectively rather
than giving every action a shadow. References:
[color roles](https://m3.material.io/styles/color/the-color-system/key-colors-tones)
and [Material Web buttons](https://github.com/material-components/material-web/blob/main/docs/components/button.md).

## Shapes

Local mapping: rounded actions and navigation indicators,
moderately rounded content surfaces, and restrained field corners. Shape should
identify a component's role; one radius should not be imposed on everything.

## Components

### Button

Distinguish filled, tonal, elevated, outlined, and text actions
by emphasis. Use filled for important completion actions and lower emphasis for
supporting actions, following [Material Web buttons](https://github.com/material-components/material-web/blob/main/docs/components/button.md).
Local requirement: loading must keep the action understandable and visually stable.

### Card

Local mapping: a quiet rounded container whose surface treatment
reflects its place in the tonal hierarchy. Keep the root passive; use child actions
for interaction. Filled, outlined and elevated treatments are explicit shared variants.

### Input

Material distinguishes filled and outlined fields and supports
floating or external labels and supporting/error text. The Neus M3 mapping uses integrated floating labels by default. Keep invalid
and focused treatments recognizable. Reference:
[Material Web text fields](https://github.com/material-components/material-web/blob/main/docs/components/text-field.md).

### Sidebar

Local mapping: a tonal navigation container with rounded selected
indicators, readable labels, and clearly separate hover, current-location, and focus
states. Preserve destinations when changing between expanded and compact layouts.

### Hero

Display large in Roboto regular, a filled button and a tonal or text secondary; the anchor sits on a container surface.

### Feature list

Cards on container tones with the system radius, or a plain grid; icons in tonal circles.

### Testimonial

Cards on surface-container-low with an avatar and the author's role.

### Supporting controls and content

Use the same semantic foreground, surface and focus roles for selectors, date and time controls, feedback and data views. Keep selected values distinct from hover and keyboard focus. Floating panels share the overlay geometry; tables and calendars preserve readable alignment when space is constrained. Templates establish page rhythm and responsive grouping without changing the visual identity of embedded controls.

## Do's and Don'ts

- Do pair roles intentionally and review every pair in light/dark.
- Do distinguish body, label, heading, and display typography.
- Don't equate purple, rounded corners, and shadows with complete Material 3.
- Don't confuse the shared secondary surface with Material's secondary accent.
- Don't introduce Expressive motion or shapes into this base target by default.
- Do use tonal surfaces and container roles for bands; do not use gradients or more than one primary-filled band per page.
