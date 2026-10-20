---
version: alpha
name: Neobrutalism
description: Bright yellow, thick borders, and hard shadows.
colors:
  primary: "#fdc800"
  on-primary: "#1c293c"
  focus: "#432dd7"
  error: "#e11d48"
  primary-dark: "#fdc800"
  on-primary-dark: "#1c293c"
  focus-dark: "#c8b3fd"
  error-dark: "#ff6b6b"
  surface: "#fbfbf9"
  text-primary: "#1c293c"
  warning: "#ff6b00"
  warning-dark-mode: "#ff9a3c"
typography:
  body-md:
    fontFamily: '"Inter", Arial, sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  heading:
    fontFamily: '"Inter", Arial, sans-serif'
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.01em
  label:
    fontFamily: '"Inter", Arial, sans-serif'
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0em
  caption:
    fontFamily: '"Inter", Arial, sans-serif'
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0em
  display:
    fontFamily: '"Inter", Arial, sans-serif'
    fontSize: 4.5rem
    fontWeight: 800
    lineHeight: 1
    letterSpacing: -0.03em
  headline:
    fontFamily: '"Inter", Arial, sans-serif'
    fontSize: 3rem
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: -0.02em
  lead:
    fontFamily: '"Inter", Arial, sans-serif'
    fontSize: 1.25rem
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0em
rounded:
  default: 16px
  sm: 8px
  md: 12px
  pill: 3em
  button: 4px
  card: 4px
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
  id: neobrutalism
  palette:
    light:
      primary: "{colors.primary}"
      onPrimary: "{colors.on-primary}"
      focus: "{colors.focus}"
      error: "{colors.error}"
      warning: "{colors.warning}"
    dark:
      primary: "{colors.primary-dark}"
      onPrimary: "{colors.on-primary-dark}"
      focus: "{colors.focus-dark}"
      error: "{colors.error-dark}"
      warning: "{colors.warning-dark-mode}"
  tokens:
    base:
      --type-display-size: "clamp(2.5rem, 1.76rem + 3.05vw, {typography.display.fontSize})"
      --type-display-weight: "{typography.display.fontWeight}"
      --type-display-line-height: "{typography.display.lineHeight}"
      --type-display-tracking: "{typography.display.letterSpacing}"
      --type-headline-size: "clamp(2rem, 1.63rem + 1.52vw, {typography.headline.fontSize})"
      --type-headline-weight: "{typography.headline.fontWeight}"
      --type-headline-line-height: "{typography.headline.lineHeight}"
      --type-headline-tracking: "{typography.headline.letterSpacing}"
      --type-lead-size: "clamp(1.125rem, 1.08rem + 0.19vw, {typography.lead.fontSize})"
      --type-lead-weight: "{typography.lead.fontWeight}"
      --type-lead-line-height: "{typography.lead.lineHeight}"
      --type-lead-tracking: "{typography.lead.letterSpacing}"
      --font-body: "{typography.body-md.fontFamily}"
      --font-display: var(--font-body)
      --font-mono: '"JetBrains Mono", monospace'
      --color-primary-text: var(--color-text-primary)
      --elevation-dialog: 8px 8px 0 var(--color-text-primary)
      --elevation-floating: 4px 4px 0 var(--color-text-primary)
    light:
      --color-surface: "{colors.surface}"
      --color-text-primary: "{colors.text-primary}"
  recipes:
    badge:
      base:
        --badge-font-size: 12px
        --badge-font-weight: "800"
        --badge-letter-spacing: normal
        --badge-line-height: 16px
        --badge-padding: 2px 8px
        --badge-radius: 4px
        --badge-border-width: 2px
        --badge-border-color: var(--color-text-primary)
        --badge-text-mix: 0%
        --badge-dot-size: 10px
        --badge-dot-radius: 2px
        --badge-dot-border-width: 2px
        --badge-dot-font-size: 12px
        --badge-dot-font-weight: "700"
    button:
      base:
        --button-radius: "{rounded.button}"
        --button-padding-small: 8px 16px
        --button-padding-medium: 12px 24px
        --button-min-height-small: 0px
        --button-min-height-medium: 0px
        --button-min-height-large: 0px
        --button-padding-large: 16px 32px
        --button-font-size-medium: 15px
        --button-font-size-large: 17px
        --button-line-height: 20px
        --button-label-weight: "800"
        --button-label-spacing: normal
        --button-border-width: 3px
        --button-border-color: var(--color-text-primary)
        --button-outlined-border-width: 3px
        --button-shadow: 4px 4px 0 var(--color-text-primary)
        --button-shadow-hover: 4px 4px 0 var(--color-text-primary)
        --button-shadow-active: 2px 2px 0 var(--color-text-primary)
        --button-active-transform: translate(2px, 2px)
        --button-loader-gap: 4px
        --button-loader-size: 7px
        --button-focus-offset: 6px
        --button-elevated-shadow: 4px 4px 0 var(--color-text-primary)
        --button-elevated-shadow-hover: 6px 6px 0 var(--color-text-primary)
    calendar:
      base:
        --calendar-border-width: 3px
        --calendar-border-color: var(--color-text-primary)
        --calendar-radius: 4px
        --calendar-shadow: 4px 4px 0 var(--color-text-primary)
        --calendar-divider-width: 3px
        --calendar-divider-color: var(--color-text-primary)
        --calendar-label-color: var(--color-text-primary)
        --calendar-label-weight: "800"
        --calendar-caption-color: var(--color-text-primary)
        --calendar-caption-weight: "800"
        --calendar-nav-color: var(--color-text-primary)
        --calendar-weekday-color: var(--color-text-primary)
        --calendar-day-radius: 4px
        --calendar-item-radius: 4px
        --calendar-day-hover-background: var(--color-primary-light)
        --calendar-selected-background: var(--color-primary)
        --calendar-selected-color: var(--color-text-on-primary)
        --calendar-selected-weight: "800"
        --calendar-selected-shadow: inset 0 0 0 2px var(--color-text-primary)
        --calendar-range-edge-color: var(--color-text-on-primary)
        --calendar-today-color: var(--color-text-primary)
        --calendar-today-ring: inset 0 0 0 2px var(--color-text-primary)
        --calendar-today-weight: "800"
    card:
      base:
        --card-radius: "{rounded.card}"
        --card-border-width: 3px
        --card-border-color: var(--color-text-primary)
        --card-shadow: 4px 4px 0 var(--color-text-primary)
        --card-header-border-width: 0px
        --card-footer-padding: 12px 16px 16px
        --card-footer-gap: 12px
        --card-filled-border-width: 3px
        --card-outlined-border-width: 3px
        --card-elevated-shadow: 4px 4px 0 var(--color-text-primary)
    checkbox:
      base:
        --checkbox-size: 22px
        --checkbox-border-width: 3px
        --checkbox-border-color: var(--color-text-primary)
        --checkbox-hover-border-color: var(--color-text-primary)
        --checkbox-shadow: 2px 2px 0 var(--color-text-primary)
        --checkbox-checked-border-color: var(--color-text-primary)
        --checkbox-checked-shadow: 2px 2px 0 var(--color-text-primary)
        --checkbox-icon-size: 14px
        --checkbox-icon-stroke: "3.5"
        --checkbox-focus-offset: 4px
        --checkbox-label-color: var(--color-text-primary)
    clock:
      base:
        --clock-border-width: 3px
        --clock-border-color: var(--color-text-primary)
        --clock-radius: 4px
        --clock-shadow: 4px 4px 0 var(--color-text-primary)
        --clock-header-border-width: 3px
        --clock-header-color: var(--color-text-on-primary)
        --clock-segment-inactive-opacity: "0.75"
        --clock-face-background: var(--color-surface)
        --clock-face-border-width: 3px
        --clock-hand-color: var(--color-text-primary)
        --clock-hand-text-color: var(--color-surface)
        --clock-hand-width: 3px
        --clock-number-radius: 4px
        --clock-selected-color: var(--color-text-on-primary)
    dropdown:
      base:
        --dropdown-radius: 4px
        --dropdown-border-width: 3px
        --dropdown-border-color: var(--color-text-primary)
        --dropdown-hover-border-color: var(--color-text-primary)
        --dropdown-shadow: 4px 4px 0 var(--color-text-primary)
        --dropdown-avatar-color: var(--color-text-on-primary)
        --dropdown-caret-color: var(--color-text-primary)
        --dropdown-name-color: var(--color-text-primary)
        --dropdown-name-weight: "800"
    file-uploader:
      base:
        --file-uploader-radius: 4px
        --file-uploader-border-width: 3px
        --file-uploader-border-color: var(--color-text-primary)
        --file-uploader-shadow: 4px 4px 0 var(--color-text-primary)
        --file-uploader-hover-border-color: var(--color-text-primary)
        --file-uploader-hover-background: var(--color-primary-light)
        --file-uploader-drag-border-color: var(--color-text-primary)
        --file-uploader-drag-background: var(--color-primary)
        --file-uploader-drag-transform: translate(-2px, -2px)
        --file-uploader-success-border-color: var(--color-text-primary)
        --file-uploader-title-weight: "800"
        --file-uploader-hint-color: var(--color-text-primary)
        --file-uploader-media-radius: 4px
        --file-uploader-badge-radius: 4px
        --file-uploader-badge-border-width: 2px
        --file-uploader-badge-background: var(--color-primary)
        --file-uploader-badge-color: var(--color-text-on-primary)
        --file-uploader-error-border-width: 3px
        --file-uploader-error-radius: 4px
        --file-uploader-error-text-color: var(--color-text-primary)
    icon-button:
      base:
        --icon-button-radius: 4px
        --icon-button-size-small: 40px
        --icon-button-size-medium: 48px
        --icon-button-size-large: 60px
        --icon-button-icon-stroke: "2.5"
        --icon-button-border-width: 3px
        --icon-button-border-color: var(--color-text-primary)
        --icon-button-outlined-border-width: 3px
        --icon-button-shadow: 4px 4px 0 var(--color-text-primary)
        --icon-button-shadow-hover: 4px 4px 0 var(--color-text-primary)
        --icon-button-shadow-active: 2px 2px 0 var(--color-text-primary)
        --icon-button-active-transform: translate(2px, 2px)
        --icon-button-focus-offset: 6px
    input:
      base:
        --input-radius: "{rounded.input}"
        --input-padding: 12px 16px
        --input-border-width: 3px
        --input-border-color: var(--color-text-primary)
        --input-shadow: 4px 4px 0 var(--color-text-primary)
        --input-focus-shadow: 4px 4px 0 var(--color-text-primary)
        --input-error-focus-shadow: 4px 4px 0 var(--color-error)
        --input-font-size: 14px
        --input-line-height: 20px
        --input-color: var(--color-text-primary)
        --input-label-color: var(--color-text-primary)
        --input-label-offset: 0px
        --input-error-offset: 0px
        --input-focus-border-color: var(--color-focus)
        --input-readonly-border-color: var(--color-text-primary)
        --input-filled-border-width: 3px
    link:
      base:
        --link-font-weight: "700"
        --link-decoration: underline
        --link-decoration-thickness: 2px
        --link-underline-offset: 3px
        --link-hover-background: var(--color-primary)
        --link-hover-primary-color: var(--color-text-on-primary)
        --link-padding: 0 2px
        --link-radius: 0px
    modal:
      base:
        --modal-radius: 4px
        --modal-border-width: 3px
        --modal-border-color: var(--color-text-primary)
        --modal-shadow: var(--elevation-dialog)
        --modal-backdrop: rgba(28, 41, 60, 0.6)
        --modal-divider-width: 2px
        --modal-divider-color: var(--color-text-primary)
        --modal-title-weight: "800"
        --modal-content-color: var(--color-text-primary)
        --modal-footer-gap: 16px
    overlay:
      base:
        --overlay-border-width: 3px
        --overlay-border-color: var(--color-text-primary)
        --overlay-radius: 4px
        --overlay-shadow: var(--elevation-floating)
        --overlay-offset: 8px
        --overlay-item-font-weight: "700"
        --overlay-item-hover-background: var(--color-primary)
        --overlay-item-hover-color: var(--color-text-on-primary)
        --overlay-item-selected-background: var(--color-primary)
        --overlay-item-selected-color: var(--color-text-on-primary)
        --overlay-divider-color: var(--color-text-primary)
    select:
      base:
        --select-caret-size: 20px
        --select-caret-gap: 14px
        --select-caret-color: var(--color-text-primary)
        --select-search-radius: 4px
        --select-tag-radius: 4px
        --select-tag-background: var(--color-primary)
        --select-tag-color: var(--color-text-on-primary)
        --select-tag-border-width: 2px
        --select-tag-border-color: var(--color-text-primary)
        --select-tag-remove-color: var(--color-text-on-primary)
    sidebar:
      base:
        --sidebar-background: var(--color-surface)
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
        --sidebar-item-weight: "700"
        --sidebar-item-spacing: 0px
        --sidebar-item-transform: none
        --sidebar-item-padding: 12px 16px
        --sidebar-body-gap: 8px
        --sidebar-border-width: 3px
        --sidebar-item-radius: 4px
        --sidebar-border-color: var(--color-text-primary)
        --sidebar-item-border-width: 2px
        --sidebar-item-border-color: var(--color-text-primary)
        --sidebar-shadow: 4px 4px 0 var(--color-text-primary)
        --sidebar-control-radius: 4px
        --sidebar-control-border-width: 3px
        --sidebar-control-border-color: var(--color-text-primary)
        --sidebar-control-shadow: 3px 3px 0 var(--color-text-primary)
      dark:
        --sidebar-item-border-color: var(--color-border-input-hover)
    stepper:
      base:
        --stepper-dot-radius: 4px
        --stepper-dot-border-width: 3px
        --stepper-dot-border-color: var(--color-text-primary)
        --stepper-dot-color: var(--color-text-primary)
        --stepper-dot-font-weight: "800"
        --stepper-dot-active-border-color: var(--color-text-primary)
        --stepper-dot-active-shadow: 3px 3px 0 var(--color-text-primary)
        --stepper-dot-done-border-color: var(--color-text-primary)
        --stepper-dot-done-background: var(--color-surface)
        --stepper-dot-hover-background: var(--color-primary-light)
        --stepper-label-weight: "700"
        --stepper-label-active-weight: "800"
        --stepper-label-color: var(--color-text-primary)
        --stepper-connector-thickness: 3px
        --stepper-connector-color: var(--color-border-input-hover)
        --stepper-connector-done-color: var(--color-text-primary)
        --stepper-counter-color: var(--color-text-primary)
        --stepper-counter-weight: "800"
        --stepper-bar-height: 16px
        --stepper-bar-radius: 4px
        --stepper-bar-fill-radius: 0px
        --stepper-bar-border-width: 3px
        --stepper-bar-border-color: var(--color-text-primary)
        --stepper-bar-background: var(--color-surface)
        --stepper-simple-size: 14px
        --stepper-simple-current-width: 32px
        --stepper-simple-radius: 2px
        --stepper-simple-border-width: 2px
        --stepper-simple-border-color: var(--color-text-primary)
        --stepper-simple-background: var(--color-surface)
    week-calendar:
      base:
        --week-calendar-border-width: 3px
        --week-calendar-radius: 4px
        --week-calendar-padding: 24px
        --week-calendar-event-radius: 4px
        --week-calendar-shadow: 4px 4px 0 var(--color-text-primary)
        --week-calendar-border-color: var(--color-text-primary)
    interactive-map:
      base:
        --interactive-map-radius: 4px
        --interactive-map-border-width: 3px
        --interactive-map-border-color: var(--color-text-primary)
        --interactive-map-shadow: 4px 4px 0 var(--color-text-primary)
    data-table:
      base:
        --data-table-radius: 4px
        --data-table-control-radius: 4px
        --data-table-border-color: var(--color-text-primary)
        --data-table-shadow: 4px 4px 0 var(--color-text-primary)
    templates:
      base:
        --app-template-content-padding: 32px
        --app-template-header-border-width: 3px
        --app-template-header-border-color: var(--color-text-primary)
        --form-template-gap: 24px
        --form-template-action-padding: 12px
    typography:
      base:
        --text-overline-tracking: 0em
        --text-overline-transform: none
    layout: {}
    media-placeholder: {}
    alert: {}
    avatar:
      base:
        --avatar-background: var(--color-primary)
        --avatar-color: var(--color-text-on-primary)
    sections: {}
---

# Neobrutalism

## Overview

Make structure visible: strong outlines, flat vivid accents,
hard offset shadows, bold action labels, and direct feedback. The interface should
feel energetic and tangible while remaining orderly enough for forms and data.
All aesthetic rules here are Neus UI project decisions. This recipe does not claim
an official or universal neobrutalism standard.

Format: [Google DESIGN.md](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md) (alpha; consulted 2026-10-15).

## Colors

Use yellow for important actions and selected navigation, with
dark on-accent text. Keep content surfaces quiet so saturated accents remain
meaningful. Use a contrasting focus color distinct from selection. Errors need
explicit text and a boundary change, not color alone.

Warning is a saturated orange, a local decision that stays distinct from the yellow primary.

## Typography

Use Inter with sans-serif fallbacks for interface text; reserve
JetBrains Mono for code and identifiers. Use heavy labels for short actions, but
regular text for paragraphs, values, and dense data. Keep headings concise and
avoid making every text element uppercase.

## Layout

Use a regular alignment grid and generous separation between
independent objects. Budget space for offset shadows so adjacent controls do not
collide. Keep dense data internally calm; the surrounding structure supplies the
visual energy. Wrap action groups before reducing readable content.

Public pages stack bold bands with thick borders between them; give offset shadows room at section edges.

## Elevation & Depth

Use crisp offset shadows to imply physical layers; avoid blur and
gradient lighting. Pressing an action should visibly reduce its apparent lift.
Do not animate passive content simply because it has a shadow. Preserve focus
independently of shadow and suppress nonessential motion when requested.

## Shapes

Use nearly square rectangles with a small consistent radius,
strong edges, and clear internal padding. Reserve circles for avatars or inherent
symbols. Avoid Neus pill controls and ornamental concave curves in this system.

## Components

### Button

A solid yellow action is the primary affordance; reduce emphasis
for supporting actions without sacrificing legibility. Keep keyboard focus visible
outside the heavy frame. Pressed feedback changes depth, and loading must remain
identifiable without layout jumps.

### Card

Frame a coherent content group with one strong outline and hard
offset shadow. Keep internal content uncluttered; do not add another heavy frame
around every slot. The surface stays passive even when it resembles a physical tile.

### Input

Use a framed field with a persistent, aligned label. Keep entered
text calm and legible. Focus changes a recognizable boundary; error text explains
the problem while focus remains apparent. Read-only must remain readable.

### Sidebar

Present navigation as a clearly framed region with compact,
outlined rows. Use a filled yellow item for current location and preserve a separate
focus outline. Keep hover quieter than selection.

### Hero

Heavy Inter display in ink, a yellow solid action with its hard shadow, and a bordered media frame.

### Feature list

Bordered cards with hard shadows, numbered or iconed, with yellow accents on the tiles.

### Testimonial

Bordered cards with bold quotes; a featured quote can sit on a yellow band.

### Supporting controls and content

Use the same semantic foreground, surface and focus roles for selectors, date and time controls, feedback and data views. Keep selected values distinct from hover and keyboard focus. Floating panels share the overlay geometry; tables and calendars preserve readable alignment when space is constrained. Templates establish page rhythm and responsive grouping without changing the visual identity of embedded controls.

## Do's and Don'ts

- Do preserve shadow clearance and test every interaction in both color modes.
- Do separate bold labels from readable body text and values.
- Do verify yellow text/outline contrast instead of extrapolating from solid actions.
- Don't use blur, glossy gradients, or rounded pills as default treatments.
- Don't apply a thick border and shadow to every nested object.
- Don't present this project vocabulary as a canonical external standard.
- Do use thick borders, hard shadows and yellow bands on public pages, with uppercase labels sparingly; never blur or soft gradients.
