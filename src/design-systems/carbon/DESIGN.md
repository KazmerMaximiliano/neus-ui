---
version: alpha
name: Carbon
description: Square corners, vivid blue, and precise spacing.
colors:
  primary: "#0f62fe"
  on-primary: "#ffffff"
  hover: "#0353e9"
  active: "#002d9c"
  error: "#da1e28"
  primary-dark: "#78a9ff"
  on-primary-dark: "#161616"
  error-dark: "#ff8389"
  surface: "#ffffff"
  surface-secondary: "#f4f4f4"
  layer-02: "#ffffff"
  text-primary: "#161616"
  text-secondary: "#525252"
  text-placeholder: "#6f6f6f"
  border-strong: "#8d8d8d"
  surface-dark: "#161616"
  surface-secondary-dark: "#262626"
  surface-disabled-dark: "#262626"
  layer-02-dark: "#393939"
  text-primary-dark: "#f4f4f4"
  text-secondary-dark: "#c6c6c6"
  text-muted-dark: "#c6c6c6"
  text-placeholder-dark: "#a8a8a8"
  border-subtle-dark: "#393939"
  border-strong-dark: "#6f6f6f"
typography:
  body-md:
    fontFamily: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif'
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.428571
    letterSpacing: 0em
  heading:
    fontFamily: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif'
    fontSize: 1.5rem
    fontWeight: 400
    lineHeight: 1.333333
    letterSpacing: -0.01em
  label:
    fontFamily: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif'
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.333333
    letterSpacing: 0em
  caption:
    fontFamily: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif'
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0em
  display:
    fontFamily: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif'
    fontSize: 4.75rem
    fontWeight: 300
    lineHeight: 1.17
    letterSpacing: 0em
  headline:
    fontFamily: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif'
    fontSize: 3.75rem
    fontWeight: 300
    lineHeight: 1.19
    letterSpacing: 0em
  lead:
    fontFamily: '"IBM Plex Sans", "Helvetica Neue", Arial, sans-serif'
    fontSize: 2rem
    fontWeight: 300
    lineHeight: 1.28
    letterSpacing: 0em
rounded:
  default: 16px
  sm: 8px
  md: 12px
  pill: 3em
  button: 0px
  card: 0px
  input: 0px
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
    backgroundColor: "{colors.hover}"
  input-field:
    rounded: "{rounded.input}"
    typography: "{typography.body-md}"
  card:
    rounded: "{rounded.card}"
x-neus:
  id: carbon
  palette:
    light:
      primary: "{colors.primary}"
      onPrimary: "{colors.on-primary}"
      hover: "{colors.hover}"
      active: "{colors.active}"
      error: "{colors.error}"
    dark:
      primary: "{colors.primary-dark}"
      onPrimary: "{colors.on-primary-dark}"
      error: "{colors.error-dark}"
  tokens:
    base:
      --type-display-size: "clamp(2.625rem, 2.09rem + 2.69vw, {typography.display.fontSize})"
      --type-display-weight: "{typography.display.fontWeight}"
      --type-display-line-height: "{typography.display.lineHeight}"
      --type-display-tracking: "{typography.display.letterSpacing}"
      --type-headline-size: "clamp(2rem, 1.56rem + 2.22vw, {typography.headline.fontSize})"
      --type-headline-weight: "{typography.headline.fontWeight}"
      --type-headline-line-height: "{typography.headline.lineHeight}"
      --type-headline-tracking: "{typography.headline.letterSpacing}"
      --type-lead-size: "clamp(1.5rem, 1.37rem + 0.63vw, {typography.lead.fontSize})"
      --type-lead-weight: "{typography.lead.fontWeight}"
      --type-lead-line-height: "{typography.lead.lineHeight}"
      --type-lead-tracking: "{typography.lead.letterSpacing}"
      --font-body: "{typography.body-md.fontFamily}"
      --font-display: var(--font-body)
      --font-mono: '"IBM Plex Mono", Menlo, monospace'
      --color-layer-01: var(--color-surface-secondary)
      --color-field: var(--color-layer-01)
      --type-body-size: "{typography.body-md.fontSize}"
      --type-body-line-height: "{typography.body-md.lineHeight}"
      --type-label-size: "{typography.label.fontSize}"
      --type-label-line-height: "{typography.label.lineHeight}"
      --type-heading-weight: "{typography.heading.fontWeight}"
      --type-heading-line-height: "{typography.heading.lineHeight}"
      --elevation-dialog: 0 2px 6px rgba(0, 0, 0, 0.3)
      --elevation-floating: 0 2px 6px rgba(0, 0, 0, 0.3)
    light:
      --color-surface: "{colors.surface}"
      --color-surface-secondary: "{colors.surface-secondary}"
      --color-layer-02: "{colors.layer-02}"
      --color-text-primary: "{colors.text-primary}"
      --color-text-secondary: "{colors.text-secondary}"
      --color-text-placeholder: "{colors.text-placeholder}"
      --color-border-strong: "{colors.border-strong}"
    dark:
      --color-surface: "{colors.surface-dark}"
      --color-surface-secondary: "{colors.surface-secondary-dark}"
      --color-surface-disabled: "{colors.surface-disabled-dark}"
      --color-layer-02: "{colors.layer-02-dark}"
      --color-text-primary: "{colors.text-primary-dark}"
      --color-text-secondary: "{colors.text-secondary-dark}"
      --color-text-muted: "{colors.text-muted-dark}"
      --color-text-placeholder: "{colors.text-placeholder-dark}"
      --color-border-subtle: "{colors.border-subtle-dark}"
      --color-border-strong: "{colors.border-strong-dark}"
  recipes:
    badge:
      base:
        --badge-font-size: 12px
        --badge-font-weight: "400"
        --badge-letter-spacing: 0.32px
        --badge-text-transform: none
        --badge-line-height: 16px
        --badge-padding: 4px 8px
        --badge-radius: 24px
        --badge-dot-font-size: 12px
        --badge-dot-size: 8px
    button:
      base:
        --button-radius: "{rounded.button}"
        --button-padding-small: 10px 47px 10px 15px
        --button-padding-medium: 14px 63px 14px 15px
        --button-padding-large: 22px 63px 22px 15px
        --button-font-size-medium: 14px
        --button-font-size-large: 16px
        --button-line-height: 20px
        --button-label-weight: "400"
        --button-label-spacing: 0.16px
        --button-label-transform: none
        --button-justify: flex-start
        --button-loader-gap: 4px
        --button-focus-offset: -2px
        --button-focus-inner-shadow: inset 0 0 0 1px var(--color-surface)
        --button-secondary-background: "#393939"
        --button-secondary-color: "#ffffff"
        --button-secondary-hover: "#474747"
        --button-elevated-shadow: var(--elevation-floating)
    calendar:
      base:
        --calendar-min-width: 288px
        --calendar-multiple-min-width: 600px
        --calendar-background: var(--color-surface-secondary)
        --calendar-border-width: 0px
        --calendar-radius: 0px
        --calendar-label-color: var(--color-text-primary)
        --calendar-label-weight: "400"
        --calendar-caption-color: var(--color-text-primary)
        --calendar-caption-weight: "600"
        --calendar-nav-color: var(--color-text-primary)
        --calendar-weekday-color: var(--color-text-primary)
        --calendar-day-size: 40px
        --calendar-day-radius: 0px
        --calendar-item-radius: 0px
        --calendar-day-hover-background: color-mix(in srgb, var(--color-text-primary) 8%, transparent)
        --calendar-selected-background: var(--color-primary)
        --calendar-selected-color: var(--color-text-on-primary)
        --calendar-selected-weight: "400"
        --calendar-range-middle-background: color-mix(in srgb, var(--color-primary) 20%, transparent)
        --calendar-today-ring: inset 0 -3px 0 var(--color-primary)
        --calendar-today-weight: "600"
    card:
      base:
        --card-radius: "{rounded.card}"
        --card-background: var(--color-surface-secondary)
        --card-border-width: 0px
        --card-header-border-width: 0px
        --card-nested-background: var(--color-layer-02)
    checkbox:
      base:
        --checkbox-size: 16px
        --checkbox-radius: 2px
        --checkbox-border-width: 1px
        --checkbox-border-color: var(--color-text-primary)
        --checkbox-hover-border-color: var(--color-text-primary)
        --checkbox-checked-background: var(--color-text-primary)
        --checkbox-checked-border-color: var(--color-text-primary)
        --checkbox-checked-shadow: none
        --checkbox-check-color: var(--color-surface)
        --checkbox-icon-size: 12px
        --checkbox-focus-offset: 1px
        --checkbox-label-line-height: 18px
    clock:
      base:
        --clock-min-width: 320px
        --clock-background: var(--color-surface-secondary)
        --clock-border-width: 0px
        --clock-radius: 0px
        --clock-header-padding: 16px
        --clock-header-background: var(--color-surface-secondary)
        --clock-header-color: var(--color-text-primary)
        --clock-display-font-size: 32px
        --clock-segment-padding: 4px 8px
        --clock-segment-radius: 0px
        --clock-segment-inactive-opacity: "1"
        --clock-segment-active-background: var(--color-surface)
        --clock-face-background: var(--color-surface)
        --clock-number-radius: 0px
    dropdown:
      base:
        --dropdown-padding: 4px 12px 4px 4px
        --dropdown-radius: 0px
        --dropdown-border-width: 0px
        --dropdown-background: var(--color-surface-secondary)
        --dropdown-avatar-size: 32px
        --dropdown-caret-size: 16px
        --dropdown-caret-stroke: "2"
        --dropdown-caret-color: var(--color-text-primary)
        --dropdown-name-color: var(--color-text-primary)
        --dropdown-name-weight: "600"
        --dropdown-name-transform: none
    file-uploader:
      base:
        --file-uploader-radius: 0px
        --file-uploader-border-width: 1px
        --file-uploader-border-color: var(--color-border-strong)
        --file-uploader-background: var(--color-surface-secondary)
        --file-uploader-hover-background: var(--color-surface-secondary)
        --file-uploader-drag-border-color: var(--color-focus)
        --file-uploader-drag-transform: none
        --file-uploader-title-size: var(--fs-base)
        --file-uploader-title-weight: "400"
        --file-uploader-hint-size: var(--fs-xs)
        --file-uploader-media-radius: 0px
        --file-uploader-badge-radius: 0px
        --file-uploader-badge-background: transparent
        --file-uploader-badge-color: var(--color-text-primary)
        --file-uploader-error-background: transparent
        --file-uploader-error-border-width: 0px
        --file-uploader-error-padding: "0"
        --file-uploader-error-radius: 0px
    icon-button:
      base:
        --icon-button-radius: 0px
        --icon-button-size-small: 32px
        --icon-button-size-medium: 40px
        --icon-button-size-large: 48px
        --icon-button-icon-size-small: 16px
        --icon-button-icon-size-medium: 16px
        --icon-button-icon-size-large: 20px
        --icon-button-focus-offset: -2px
        --icon-button-focus-inner-shadow: inset 0 0 0 1px var(--color-surface)
    input:
      base:
        --input-radius: "{rounded.input}"
        --input-padding: 12px 16px
        --input-background: var(--color-surface-secondary)
        --input-font-size: 14px
        --input-line-height: 20px
        --input-color: var(--color-text-primary)
        --input-label-color: var(--color-text-primary)
        --input-label-offset: 0px
        --input-error-offset: 0px
        --input-border-width: 0 0 1px
        --input-border-color: var(--color-border-strong)
        --input-hover-border-color: var(--color-border-strong)
        --input-focus-border-color: var(--color-focus)
        --input-focus-shadow: inset 0 0 0 2px var(--color-focus)
        --input-error-shadow: inset 0 0 0 2px var(--color-error)
        --input-error-focus-shadow: inset 0 0 0 2px var(--color-focus)
        --input-disabled-border-color: transparent
        --input-readonly-background: transparent
        --input-readonly-border-style: solid
        --input-readonly-border-color: var(--color-border-subtle)
    link:
      base:
        --link-radius: 0px
        --link-focus-width: 1px
        --link-focus-offset: 0px
    modal:
      base:
        --modal-width: 512px
        --modal-radius: 0px
        --modal-background: var(--color-surface-secondary)
        --modal-shadow: var(--elevation-dialog)
        --modal-backdrop: rgba(22, 22, 22, 0.5)
        --modal-divider-width: 0px
        --modal-header-padding: 16px 16px 8px
        --modal-title-size: 20px
        --modal-title-weight: "400"
        --modal-content-padding: 8px 16px 48px
        --modal-content-color: var(--color-text-primary)
        --modal-footer-padding: "0"
        --modal-footer-gap: "0"
        --modal-footer-justify: stretch
        --modal-footer-item-flex: 1 1 0
    overlay:
      base:
        --overlay-background: var(--color-surface-secondary)
        --overlay-border-width: 0px
        --overlay-radius: 0px
        --overlay-shadow: var(--elevation-floating)
        --overlay-offset: 2px
        --overlay-item-padding: 10px 16px
        --overlay-item-min-height: 40px
        --overlay-item-font-weight: "400"
        --overlay-item-hover-background: color-mix(in srgb, var(--color-text-primary) 8%, transparent)
        --overlay-item-selected-background: color-mix(in srgb, var(--color-text-primary) 14%, transparent)
        --overlay-item-selected-color: var(--color-text-primary)
    select:
      base:
        --select-caret-size: 16px
        --select-caret-gap: 16px
        --select-caret-color: var(--color-text-primary)
        --select-search-radius: 0px
        --select-tag-radius: 24px
        --select-tag-padding: 2px 4px 2px 8px
    sidebar:
      base:
        --sidebar-background: var(--color-surface-secondary)
        --sidebar-color: var(--color-text-primary)
        --sidebar-header-background: var(--sidebar-background)
        --sidebar-decoration-display: none
        --sidebar-convex-radius: 0px
        --sidebar-title-color: var(--color-text-primary)
        --sidebar-item-color: var(--color-text-secondary)
        --sidebar-item-hover-background: var(--color-surface-hover)
        --sidebar-item-hover-color: var(--color-text-primary)
        --sidebar-item-active-background: var(--color-primary)
        --sidebar-item-active-color: var(--color-text-on-primary)
        --sidebar-item-focus-color: var(--color-focus)
        --sidebar-item-size: 14px
        --sidebar-item-weight: "500"
        --sidebar-item-spacing: 0px
        --sidebar-item-transform: none
        --sidebar-item-padding: 12px 16px
        --sidebar-body-gap: 8px
        --sidebar-border-width: 1px
        --sidebar-item-radius: 0px
        --sidebar-header-border-width: 1px
        --sidebar-item-border-width: 0px 0px 1px
        --sidebar-item-border-color: var(--color-border-subtle)
        --sidebar-control-radius: 0px
    stepper:
      base:
        --stepper-dot-size-small: 24px
        --stepper-dot-size-medium: 32px
        --stepper-dot-size-large: 40px
        --stepper-dot-border-width: 1px
        --stepper-dot-border-color: var(--color-text-secondary)
        --stepper-dot-font-weight: "400"
        --stepper-dot-done-background: var(--color-surface)
        --stepper-dot-hover-background: var(--color-surface-secondary)
        --stepper-label-font-size-small: 14px
        --stepper-label-font-size-medium: 14px
        --stepper-label-font-size-large: 16px
        --stepper-label-weight: "400"
        --stepper-label-active-weight: "400"
        --stepper-label-active-color: var(--color-text-primary)
        --stepper-connector-thickness: 1px
        --stepper-connector-done-color: var(--color-focus)
        --stepper-counter-transform: none
        --stepper-counter-spacing: 0.16px
        --stepper-counter-weight: "400"
        --stepper-bar-height: 8px
        --stepper-bar-radius: 0px
        --stepper-bar-fill-radius: 0px
        --stepper-simple-radius: 0px
        --stepper-simple-size: 8px
        --stepper-simple-current-width: 24px
    week-calendar:
      base:
        --week-calendar-radius: 0px
        --week-calendar-padding: 16px
        --week-calendar-event-radius: 0px
        --week-calendar-title-size: 16px
        --week-calendar-cell-height: 48px
        --week-calendar-event-height: 40px
    interactive-map:
      base:
        --interactive-map-radius: 0px
    data-table:
      base:
        --data-table-radius: 0px
        --data-table-control-radius: 0px
        --data-table-spacing: 6px
        --data-table-row-height: 40px
        --data-table-header-height: 40px
        --data-table-background: var(--color-layer-01)
    templates:
      base:
        --app-template-content-padding: 32px
        --app-template-max-width: 1584px
        --app-template-header-height: 48px
        --app-template-header-border-width: 1px
        --form-template-gap: 24px
    typography:
      base:
        --text-overline-tracking: 0em
        --text-overline-transform: none
    layout: {}
---

# Carbon

## Overview

Use Carbon's disciplined enterprise interface: clear task
hierarchy, precise alignment, square geometry, and purposeful color. Prioritize
repeated data and form workflows. Use the official Carbon foundations and Core
component specifications as the visual foundation, preserving Neus UI's React API.

Format: [Google DESIGN.md](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md) (alpha; consulted 2026-10-15).

Design references (consulted 2026-10-14): [themes](https://www.carbondesignsystem.com/building-blocks/foundations/themes/overview), [color layering](https://www.carbondesignsystem.com/building-blocks/foundations/color/guidelines), [typography](https://www.carbondesignsystem.com/building-blocks/foundations/typography/overview). Local web mappings are Neus UI design decisions.

## Colors

Use neutral foundations with blue actions and explicit feedback
roles. Nested surfaces, fields, and borders must belong to a coherent layer set;
moving a control to another layer must preserve its contrast. Carbon's
[layering guidance](https://www.carbondesignsystem.com/building-blocks/foundations/color/guidelines)
provides the reference. Use White as the initial light target and Gray 100 as the
dark target; these are local choices among Carbon's
[themes](https://www.carbondesignsystem.com/building-blocks/foundations/themes/overview).

## Typography

Use IBM Plex Sans for interface text and Plex Mono for code or
identifiers, with local fallbacks. Favor the task-oriented hierarchy described in
[Carbon typography](https://www.carbondesignsystem.com/building-blocks/foundations/typography/overview).
Use natural sentence case, clear labels, and consistent alignment for repeated data.

## Layout

Align forms, data regions, and action groups to consistent columns.
Use deliberate section spacing and compact, readable controls. Field widths should
reflect expected content while fitting the responsive layout, as recommended in
[Carbon forms](https://www.carbondesignsystem.com/building-blocks/core/patterns/forms).

## Elevation & Depth

Prefer layers, borders, and alignment over ornamental shadows.
Reserve floating depth for menus and dialogs. A focused control must remain
recognizable against the surface beneath it.

## Shapes

Use square corners for ordinary fields, actions, tiles, and
navigation rows. Keep circles for intrinsically circular content such as avatars.
Avoid mixing rounded Neus controls into a Carbon form.

## Components

### Button

Preserve the label alignment and action hierarchy of
[Carbon buttons](https://www.carbondesignsystem.com/building-blocks/core/components/button/specifications).
Use separate hover, active, focus, and disabled treatments; focus needs a boundary
that remains visible against the button fill.

### Card

Treat the passive Card as a simple tile: a rectangular layer for
related information. Consult [Carbon tile specifications](https://www.carbondesignsystem.com/building-blocks/core/components/tile/specifications)
for the visual reference; interactive tile types require separate behavior design.

### Input

Follow [Carbon text-input specifications](https://www.carbondesignsystem.com/building-blocks/core/components/text-input/specifications)
for field geometry and focus, and [validation guidance](https://www.carbondesignsystem.com/building-blocks/core/components/text-input/guidelines)
for invalid feedback. Keep labels and messages aligned; distinguish read-only,
disabled, invalid, and focused states.

### Sidebar

Local mapping: build an orderly, quiet navigation shell with
square rows, consistent label alignment, and a persistent current-location cue.
Keep keyboard focus distinct from selection and hover.

### Supporting controls and content

Use the same semantic foreground, surface and focus roles for selectors, date and time controls, feedback and data views. Keep selected values distinct from hover and keyboard focus. Floating panels share the overlay geometry; tables and calendars preserve readable alignment when space is constrained. Templates establish page rhythm and responsive grouping without changing the visual identity of embedded controls.

## Do's and Don'ts

- Do review layer relationships as well as standalone component colors.
- Do use Plex fallbacks, natural labels, square geometry, and consistent alignment.
- Do verify all states in light/dark and nested provider scopes.
- Don't map Neus variants to Carbon names without checking their behavior and roles.
- Don't add new public states or Carbon dependencies as an incidental visual change.
