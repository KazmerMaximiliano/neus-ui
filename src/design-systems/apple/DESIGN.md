---
version: alpha
name: Apple
description: Action blue, soft corners, and system typography.
colors:
  primary: "#0071e3"
  on-primary: "#ffffff"
  primary-dark: "#2997ff"
  on-primary-dark: "#161616"
  hover-dark: "#4aa8ff"
  surface: "#ffffff"
  surface-secondary: "#f5f5f7"
  text-primary: "#1d1d1f"
  text-secondary: "#6e6e73"
  surface-dark: "#1c1c1e"
  surface-secondary-dark: "#2c2c2e"
  surface-disabled-dark: "#2c2c2e"
  text-primary-dark: "#f5f5f7"
  text-secondary-dark: "#a1a1a6"
  text-muted-dark: "#a1a1a6"
  text-placeholder-dark: "#8e8e93"
  border-subtle-dark: rgba(255, 255, 255, 0.16)
typography:
  body-md:
    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial,
      sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  heading:
    fontFamily: '"SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue",
      Helvetica, Arial, sans-serif'
    fontSize: 1.5rem
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: -0.01em
  label:
    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial,
      sans-serif'
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0em
  caption:
    fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica, Arial,
      sans-serif'
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0em
rounded:
  default: 16px
  sm: 8px
  md: 12px
  pill: 3em
  button: 8px
  card: 12px
  input: 8px
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
  id: apple
  palette:
    light:
      primary: "{colors.primary}"
      onPrimary: "{colors.on-primary}"
    dark:
      primary: "{colors.primary-dark}"
      onPrimary: "{colors.on-primary-dark}"
      hover: "{colors.hover-dark}"
  tokens:
    base:
      --font-body: "{typography.body-md.fontFamily}"
      --font-display: '"SF Pro Display", var(--font-body)'
      --elevation-dialog: 0 10px 40px rgba(0, 0, 0, 0.2)
      --elevation-floating: 0 8px 24px rgba(0, 0, 0, 0.16)
    light:
      --color-surface: "{colors.surface}"
      --color-surface-secondary: "{colors.surface-secondary}"
      --color-text-primary: "{colors.text-primary}"
      --color-text-secondary: "{colors.text-secondary}"
    dark:
      --color-surface: "{colors.surface-dark}"
      --color-surface-secondary: "{colors.surface-secondary-dark}"
      --color-surface-disabled: "{colors.surface-disabled-dark}"
      --color-text-primary: "{colors.text-primary-dark}"
      --color-text-secondary: "{colors.text-secondary-dark}"
      --color-text-muted: "{colors.text-muted-dark}"
      --color-text-placeholder: "{colors.text-placeholder-dark}"
      --color-border-subtle: "{colors.border-subtle-dark}"
  recipes:
    badge:
      base:
        --badge-font-size: 12px
        --badge-font-weight: "500"
        --badge-letter-spacing: normal
        --badge-text-transform: none
        --badge-line-height: 16px
        --badge-padding: 2px 8px
        --badge-dot-font-size: 12px
    button:
      base:
        --button-radius: "{rounded.button}"
        --button-padding-small: 6px 12px
        --button-padding-medium: 8px 15px
        --button-padding-large: 12px 22px
        --button-font-size-medium: 14px
        --button-font-size-large: 17px
        --button-line-height: 20px
        --button-label-weight: "400"
        --button-label-spacing: normal
        --button-label-transform: none
        --button-active-transform: scale(0.98)
        --button-loader-size: 5px
    calendar:
      base:
        --calendar-radius: 12px
        --calendar-border-color: var(--color-border-subtle)
        --calendar-label-color: var(--color-text-primary)
        --calendar-caption-weight: "600"
        --calendar-weekday-size: 11px
        --calendar-selected-background: var(--color-primary)
        --calendar-selected-color: var(--color-text-on-primary)
        --calendar-selected-weight: "600"
        --calendar-today-ring: none
        --calendar-item-radius: 8px
    card:
      base:
        --card-radius: "{rounded.card}"
        --card-border-color: var(--color-border-subtle)
        --card-shadow: 0 2px 8px var(--color-shadow)
        --card-header-border-width: 0px
      dark:
        --card-shadow: none
    checkbox:
      base:
        --checkbox-radius: 5px
        --checkbox-border-width: 1px
        --checkbox-border-color: var(--color-text-placeholder)
        --checkbox-checked-shadow: none
    clock:
      base:
        --clock-radius: 14px
        --clock-border-color: var(--color-border-subtle)
        --clock-header-padding: 16px 20px
        --clock-header-border-width: 1px
        --clock-header-background: var(--color-surface)
        --clock-header-color: var(--color-text-primary)
        --clock-display-font-size: 40px
        --clock-segment-padding: 0 6px
        --clock-segment-radius: 8px
        --clock-segment-inactive-opacity: "1"
        --clock-segment-active-background: var(--color-surface-secondary)
    dropdown:
      base:
        --dropdown-padding: 4px 8px 4px 4px
        --dropdown-radius: 10px
        --dropdown-border-color: var(--color-border-subtle)
        --dropdown-avatar-size: 32px
        --dropdown-caret-size: 16px
        --dropdown-caret-stroke: "2"
        --dropdown-caret-color: var(--color-text-secondary)
        --dropdown-name-color: var(--color-text-primary)
        --dropdown-name-weight: "600"
        --dropdown-name-transform: none
    file-uploader:
      base:
        --file-uploader-radius: 12px
        --file-uploader-border-width: 1px
        --file-uploader-border-color: var(--color-text-placeholder)
        --file-uploader-background: var(--color-surface)
        --file-uploader-drag-transform: none
        --file-uploader-title-weight: "500"
        --file-uploader-badge-radius: 12px
        --file-uploader-error-radius: 8px
        --file-uploader-error-area-background: var(--file-uploader-background)
    icon-button:
      base:
        --icon-button-radius: 8px
        --icon-button-size-small: 32px
        --icon-button-size-medium: 44px
        --icon-button-size-large: 56px
        --icon-button-icon-size-small: 16px
        --icon-button-icon-size-medium: 20px
        --icon-button-icon-size-large: 24px
        --icon-button-active-transform: scale(0.96)
    input:
      base:
        --input-radius: "{rounded.input}"
        --input-padding: 12px 16px
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
        --input-readonly-border-color: transparent
    link:
      base:
        --link-underline-offset: 0.15em
    modal:
      base:
        --modal-width: 480px
        --modal-radius: 14px
        --modal-shadow: var(--elevation-dialog)
        --modal-backdrop: rgba(0, 0, 0, 0.35)
        --modal-divider-width: 0px
        --modal-header-padding: 20px 20px 4px
        --modal-title-size: 17px
        --modal-content-padding: 4px 20px 16px
        --modal-footer-padding: 16px 20px 20px
        --modal-footer-gap: 8px
      dark:
        --modal-background: var(--color-surface-secondary)
    overlay:
      base:
        --overlay-border-color: var(--color-border-subtle)
        --overlay-radius: 12px
        --overlay-shadow: var(--elevation-floating)
        --overlay-padding: 5px
        --overlay-item-padding: 6px 10px
        --overlay-item-min-height: 32px
        --overlay-item-radius: 6px
        --overlay-item-font-weight: "400"
        --overlay-item-hover-background: var(--color-primary)
        --overlay-item-hover-color: var(--color-text-on-primary)
        --overlay-item-selected-color: var(--color-text-primary)
    select:
      base:
        --select-caret-gap: 12px
        --select-caret-color: var(--color-text-secondary)
        --select-search-radius: 8px
        --select-tag-radius: 6px
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
        --sidebar-item-active-background: var(--color-primary-light)
        --sidebar-item-active-color: var(--color-text-primary)
        --sidebar-item-focus-color: var(--color-focus)
        --sidebar-item-size: 14px
        --sidebar-item-weight: "500"
        --sidebar-item-spacing: 0px
        --sidebar-item-transform: none
        --sidebar-item-padding: 12px 16px
        --sidebar-body-gap: 8px
        --sidebar-border-width: 1px
        --sidebar-item-radius: 10px
        --sidebar-shadow: 0 2px 8px var(--color-shadow)
        --sidebar-title-weight: "600"
        --sidebar-control-radius: 12px
    stepper:
      base:
        --stepper-dot-border-width: 1.5px
        --stepper-dot-font-weight: "600"
        --stepper-dot-done-color: var(--color-text-primary)
        --stepper-label-font-size-small: 12px
        --stepper-label-font-size-medium: 13px
        --stepper-counter-transform: none
        --stepper-counter-spacing: normal
        --stepper-bar-height: 6px
        --stepper-bar-radius: 3px
        --stepper-bar-fill-radius: 3px
        --stepper-simple-size: 8px
        --stepper-simple-current-width: 8px
    week-calendar:
      base:
        --week-calendar-radius: 12px
        --week-calendar-padding: 20px
        --week-calendar-event-radius: 8px
    interactive-map:
      base:
        --interactive-map-radius: 12px
    data-table:
      base:
        --data-table-radius: 12px
        --data-table-control-radius: 8px
    templates:
      base:
        --app-template-content-padding: 24px
        --form-template-gap: 20px
---

# Apple

## Overview

Use the clarity and familiar hierarchy of Apple's Human
Interface Guidelines: content comes first, controls are easy to recognize, and
decoration is restrained. This project's chosen web direction uses sober, opaque
surfaces. Liquid Glass is not a requirement; this is a deliberate local choice,
not a claim to reproduce every current Apple platform.

Format: [Google DESIGN.md](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md) (alpha; consulted 2026-10-15).

Design references (consulted 2026-10-14): [color guidance](https://developer.apple.com/design/human-interface-guidelines/color), [button guidance](https://developer.apple.com/design/human-interface-guidelines/buttons), [sidebar guidance](https://developer.apple.com/design/human-interface-guidelines/sidebars). Local web mappings are Neus UI design decisions.

## Colors

Use semantic foregrounds, backgrounds, and separators, with one
restrained action accent. Keep destructive feedback distinct from the normal
action. Light and dark palettes must preserve meaning and legibility; color must
not be the only way to identify an error or selection. These principles follow
[HIG color guidance](https://developer.apple.com/design/human-interface-guidelines/color).

## Typography

Use the local system sans-serif stack with clear title, body,
label, and supporting-text roles. Preserve natural label casing and modest
weight differences. Let text wrap and respect browser zoom; a web fallback must
remain usable when SF fonts are unavailable. This is the project's web policy.

## Layout

Give content room to breathe, align form labels and values, and
keep related actions the same size. Prioritize visible hierarchy over dense chrome.
Buttons need clear separation and a usable activation area, consistent with
[HIG buttons](https://developer.apple.com/design/human-interface-guidelines/buttons).
For this web adaptation, use 44 CSS pixels as the touch-target review goal rather
than copying native point units into CSS.

## Elevation & Depth

Prefer quiet surface contrast and separators; use soft shadows
only where they clarify grouping or floating content. Opaque surfaces are the
local default. Avoid applying blur or translucency merely to signal “Apple.”

## Shapes

Use restrained rounded rectangles for controls and slightly
softer containers. Keep related controls consistent; preserve circles for avatars.
These web radii are project choices, not universal Apple dimensions.

## Components

### Button

Emphasize the likely action through style, keep adjacent choices
similarly sized, and provide a recognizable press response. Use concise action
labels. These priorities follow [HIG buttons](https://developer.apple.com/design/human-interface-guidelines/buttons).
Local web requirements: retain visible keyboard focus and a readable loading state.

### Card

Use a quiet grouped surface with clear internal alignment.
Content and embedded controls carry meaning; the container remains passive.
This Card composition is a local web convention.

### Input

Keep the label persistent and the value visually primary.
Use a clear focus boundary, explicit error text, and a quieter disabled surface.
Preserve read-only text readability. These are local web form requirements.

### Sidebar

Use a leading navigation area with short labels and obvious
current location. Adapt or collapse it when content needs the space, following
[HIG sidebar principles](https://developer.apple.com/design/human-interface-guidelines/sidebars).
Opaque panels, a tablet rail, and a mobile dialog are this project's web mapping.

### Supporting controls and content

Use the same semantic foreground, surface and focus roles for selectors, date and time controls, feedback and data views. Keep selected values distinct from hover and keyboard focus. Floating panels share the overlay geometry; tables and calendars preserve readable alignment when space is constrained. Templates establish page rhythm and responsive grouping without changing the visual identity of embedded controls.

## Do's and Don'ts

- Do distinguish HIG principles from local web geometry and existing Neus behavior.
- Do review light/dark, keyboard focus, touch areas, zoom, and fallback fonts.
- Do use emphasis sparingly and keep supporting text legible.
- Don't turn every surface into glass or every action into a prominent blue button.
