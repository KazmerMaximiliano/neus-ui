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
        --button-elevated-shadow-active: 2px 2px 0 var(--color-text-primary)
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
        --stepper-bar-background: color-mix(in srgb, var(--color-text-primary) 70%, var(--color-surface))
        --stepper-simple-size: 14px
        --stepper-simple-current-width: 32px
        --stepper-simple-radius: 2px
        --stepper-simple-border-width: 2px
        --stepper-simple-border-color: var(--color-text-primary)
        --stepper-simple-background: var(--color-surface)
      dark:
        --stepper-bar-background: var(--color-surface)
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
    sections:
      base:
        --pricing-price-weight: 900
        --pricing-check-color: var(--color-text-primary)
        --pricing-featured-border-color: var(--color-text-primary)
        --pricing-featured-ring-width: 0px
        --pricing-featured-shadow: 6px 6px 0 var(--color-primary)
    spinner:
      base:
        --spinner-stroke-width: 0.2em
        --spinner-color: var(--color-text-primary)
        --spinner-track-color: var(--color-primary)
    switch:
      base:
        --switch-track-width: 52px
        --switch-track-height: 28px
        --switch-track-radius: 4px
        --switch-track-border-width: 3px
        --switch-track-border-color: var(--color-text-primary)
        --switch-track-shadow: 2px 2px 0 var(--color-text-primary)
        --switch-track-hover-border-color: var(--color-text-primary)
        --switch-track-checked-border-color: var(--color-text-primary)
        --switch-track-checked-shadow: 2px 2px 0 var(--color-text-primary)
        --switch-thumb-size: 16px
        --switch-thumb-checked-size: 16px
        --switch-thumb-radius: 2px
        --switch-thumb-color: var(--color-text-primary)
        --switch-thumb-hover-color: var(--color-text-primary)
        --switch-focus-offset: 4px
        --switch-label-color: var(--color-text-primary)
    radio:
      base:
        --radio-dot-size: 10px
    popover: {}
    progress:
      base:
        --progress-label-color: var(--color-text-primary)
        --progress-label-weight: "800"
        --progress-value-color: var(--color-text-primary)
        --progress-value-weight: "800"
        --progress-height-small: 10px
        --progress-height-medium: 16px
        --progress-height-large: 24px
        --progress-track-radius: 4px
        --progress-fill-radius: 0px
        --progress-track-border-width: 3px
        --progress-track-border-color: var(--color-text-primary)
        --progress-track-background: color-mix(in srgb, var(--color-text-primary) 70%, var(--color-surface))
        --progress-fill-border-width: 3px
      dark:
        --progress-track-background: var(--color-surface)
    skeleton:
      base:
        --skeleton-background: color-mix(in srgb, var(--color-text-primary) 14%, var(--color-surface))
        --skeleton-text-radius: 0px
    toast: {}
    tooltip:
      base:
        --tooltip-background: var(--color-surface)
        --tooltip-color: var(--color-text-primary)
        --tooltip-border-width: 2px
        --tooltip-border-color: var(--color-text-primary)
        --tooltip-radius: 4px
        --tooltip-shadow: 3px 3px 0 var(--color-text-primary)
        --tooltip-font-weight: "700"
    tabs:
      base:
        --tabs-disabled-color: color-mix(in srgb, var(--color-text-primary) 50%, transparent)
        --tabs-font-weight: "700"
        --tabs-selected-font-weight: "700"
        --tabs-radius: 0px
        --tabs-color: var(--color-text-primary)
        --tabs-hover-background: color-mix(in srgb, var(--color-primary) 35%, transparent)
        --tabs-selected-color: var(--color-text-primary)
        --tabs-divider-width: 2px
        --tabs-divider-color: var(--color-text-primary)
        --tabs-indicator-height: 4px
        --tabs-indicator-radius: 0px
        --tabs-indicator-color: var(--color-text-primary)
        --tabs-contained-height: 40px
        --tabs-contained-gap: 4px
        --tabs-contained-padding: 4px
        --tabs-contained-border-width: 3px
        --tabs-contained-border-color: var(--color-text-primary)
        --tabs-contained-radius: 4px
        --tabs-contained-background: var(--color-surface)
        --tabs-contained-tab-radius: 2px
        --tabs-contained-color: var(--color-text-primary)
        --tabs-contained-hover-background: color-mix(in srgb, var(--color-primary) 35%, var(--color-surface))
        --tabs-contained-selected-background: var(--color-primary)
        --tabs-contained-selected-color: var(--color-text-on-primary)
        --tabs-contained-selected-shadow: inset 0 0 0 2px var(--color-text-primary)
    breadcrumbs:
      base:
        --breadcrumbs-font-size: 14px
        --breadcrumbs-font-weight: "500"
        --breadcrumbs-color: var(--color-text-primary)
        --breadcrumbs-separator: '"›"'
        --breadcrumbs-separator-gap: 6px
        --breadcrumbs-separator-color: var(--color-text-primary)
        --breadcrumbs-separator-weight: "800"
        --breadcrumbs-link-color: var(--color-text-primary)
        --breadcrumbs-link-weight: var(--link-font-weight)
        --breadcrumbs-link-decoration: var(--link-decoration)
        --breadcrumbs-current-weight: "800"
    pagination:
      base:
        --pagination-font-weight: "700"
        --pagination-current-font-weight: "800"
        --pagination-item-radius: 4px
        --pagination-item-border-width: 3px
        --pagination-item-border-color: var(--color-text-primary)
        --pagination-item-background: var(--color-surface)
        --pagination-item-hover-background: color-mix(in srgb, var(--color-primary) 35%, var(--color-surface))
        --pagination-current-background: var(--color-primary)
        --pagination-current-color: var(--color-text-on-primary)
        --pagination-current-border-color: var(--color-text-primary)
        --pagination-current-shadow: 3px 3px 0 var(--color-text-primary)
    accordion:
      base:
        --accordion-gap: 16px
        --accordion-divider-width: 3px
        --accordion-divider-color: var(--color-text-primary)
        --accordion-item-background: var(--color-surface)
        --accordion-item-border-width: 3px
        --accordion-item-border-color: var(--color-text-primary)
        --accordion-item-radius: 4px
        --accordion-item-shadow: 4px 4px 0 var(--color-text-primary)
        --accordion-header-padding: 16px
        --accordion-header-radius: 0px
        --accordion-header-background: var(--color-primary)
        --accordion-header-hover-background: color-mix(in srgb, var(--color-primary) 85%, var(--color-text-on-primary))
        --accordion-title-color: var(--color-text-on-primary)
        --accordion-title-weight: "700"
        --accordion-title-line-height: 24px
        --accordion-icon-color: var(--color-text-on-primary)
        --accordion-content-padding: 16px
        --accordion-content-divider-width: 3px
        --accordion-content-color: var(--color-text-primary)
        --accordion-content-size: 14px
        --accordion-content-line-height: 20px
        --accordion-disabled-color: color-mix(in srgb, var(--color-text-on-primary) 50%, var(--color-primary))
        --accordion-focus-width: 3px
        --accordion-focus-offset: -3px
    form-field: {}
    number-input:
      base:
        --number-input-stepper-gap: 0px
        --number-input-button-radius: 0px
        --number-input-button-color: var(--color-text-primary)
        --number-input-button-hover-background: var(--color-primary)
        --number-input-button-hover-color: var(--color-text-on-primary)
        --number-input-divider-width: 3px
        --number-input-divider-color: var(--color-text-primary)
    slider:
      base:
        --slider-track-height: 12px
        --slider-track-radius: 4px
        --slider-track-border-width: 3px
        --slider-track-border-color: var(--color-text-primary)
        --slider-track-background: var(--color-surface)
        --slider-thumb-border-width: 3px
        --slider-thumb-border-color: var(--color-text-primary)
        --slider-thumb-shadow: 2px 2px 0 var(--color-text-primary)
        --slider-thumb-hover-shadow: "0 0 #0000"
        --slider-disabled-opacity: "0.5"
        --slider-step-radius: 0px
        --slider-step-color: var(--color-text-primary)
        --slider-step-active-color: var(--color-text-on-primary)
    toggle:
      base:
        --toggle-font-weight: "700"
        --toggle-height-small: 36px
        --toggle-height-large: 44px
        --toggle-padding-small: 0 10px
        --toggle-padding-medium: 0 12px
        --toggle-padding-large: 0 16px
        --toggle-icon-size-small: 14px
        --toggle-icon-size-medium: 16px
        --toggle-icon-size-large: 16px
        --toggle-radius: 4px
        --toggle-border-width: 3px
        --toggle-border-color: var(--color-text-primary)
        --toggle-background: var(--color-surface)
        --toggle-shadow: 2px 2px 0 var(--color-text-primary)
        --toggle-hover-background: color-mix(in srgb, var(--color-primary) 35%, var(--color-surface))
        --toggle-pressed-background: var(--color-primary)
        --toggle-pressed-hover-background: var(--color-primary)
        --toggle-pressed-color: var(--color-text-on-primary)
        --toggle-pressed-border-color: var(--color-text-primary)
        --toggle-focus-offset: 4px
    drawer:
      base:
        --drawer-width: 384px
        --drawer-viewport-margin: 25%
        --drawer-radius: 0px
        --drawer-sheet-radius: 4px
        --drawer-shadow: none
        --drawer-header-padding: 16px
        --drawer-content-padding: 16px
        --drawer-footer-padding: 16px
        --drawer-easing: cubic-bezier(0.4, 0, 0.2, 1)
    chip:
      base:
        --chip-font-weight: "700"
        --chip-radius: 4px
        --chip-border-width: 2px
        --chip-border-color: var(--color-text-primary)
        --chip-background: var(--color-surface)
        --chip-hover-background: color-mix(in srgb, var(--color-primary) 35%, var(--color-surface))
        --chip-selected-background: var(--color-primary)
        --chip-selected-hover-background: var(--color-primary)
        --chip-selected-color: var(--color-text-on-primary)
        --chip-selected-border-color: var(--color-text-primary)
        --chip-remove-radius: 2px
        --chip-remove-color: currentColor
        --chip-remove-hover-background: color-mix(in srgb, currentColor 15%, transparent)
        --chip-focus-offset: 4px
        --chip-disabled-opacity: "0.5"
    list:
      base:
        --list-radius: 4px
        --list-background: var(--color-surface)
        --list-border-width: 3px
        --list-border-color: var(--color-text-primary)
        --list-divider-width: 2px
        --list-divider-color: var(--color-text-primary)
        --list-item-min-height: 0px
        --list-item-padding: 14px 16px
        --list-item-gap: 14px
        --list-body-gap: 4px
        --list-leading-size: 20px
        --list-leading-color: var(--color-text-primary)
        --list-title-weight: "700"
        --list-title-line-height: "1.375"
        --list-description-color: var(--color-text-primary)
        --list-description-size: 14px
        --list-trailing-color: var(--color-text-primary)
        --list-trailing-size: 14px
    separator:
      base:
        --separator-color: var(--color-text-primary)
        --separator-thickness: 2px
    empty-state:
      base:
        --empty-state-padding: 24px
        --empty-state-max-width: 24rem
        --empty-state-background: var(--color-surface)
        --empty-state-border-width: 3px
        --empty-state-border-style: dashed
        --empty-state-border-color: var(--color-text-primary)
        --empty-state-media-size: 20px
        --empty-state-media-color: var(--color-text-on-primary)
        --empty-state-media-background: var(--color-primary)
        --empty-state-media-padding: 10px
        --empty-state-media-radius: 4px
        --empty-state-title-size: 14px
        --empty-state-title-weight: "700"
        --empty-state-title-line-height: "1.42857"
        --empty-state-description-color: var(--color-text-primary)
        --empty-state-description-size: 14px
        --empty-state-description-line-height: "1.625"
        --empty-state-actions-gap: 10px
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
the problem while focus remains apparent. Read-only must remain readable. A multi-line
field keeps the thick frame and hard shadow and grows by whole lines.

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

### FAQ

Framed cards with yellow question bars and hard shadows.

### Pricing

Framed cards with the price in black weight; the recommended plan casts a yellow hard shadow and carries a badge.

### Supporting controls and content

Use the same semantic foreground, surface and focus roles for selectors, date and time controls, feedback and data views. Keep selected values distinct from hover and keyboard focus. Floating panels share the overlay geometry; tables and calendars preserve readable alignment when space is constrained. Templates establish page rhythm and responsive grouping without changing the visual identity of embedded controls.

A spinner is a heavy ink arc over a yellow track, as thick as the frames around it.

A switch is a squared, ink-framed track with a hard shadow and a square ink knob; on, the track turns yellow and the knob slides to the end.

A radio is the checkbox made round: a 3px ink ring with the hard shadow, filled yellow with a 10px ink dot when chosen.

A popover is the menu panel with room inside: the ink frame and hard shadow, with 16px of padding.

A progress bar is a 3px ink frame filled with yellow up to a 3px ink edge; the rest of the track, like the stepper's linear bar, is dark slate in light mode, so the yellow keeps 3:1 against it, and the page color in dark mode. It is 16px thick by default, with the label and value in heavy ink.

A skeleton is a flat ink-tinted block with square text lines that pulses.

A toast is the alert with the hard ink shadow.

A tooltip is a small framed card: the page color with a 2px ink border, 4px corners, a 3px hard ink shadow and bold text. A combobox is the framed field with the select's list.

Line tabs are bold ink labels on a 2px ink rule, the selected one with a 4px ink bar, and hovering tints a tab with the yellow. Contained tabs sit in a framed tray, a 3px ink border with 4px corners and 4px of padding, where the selected tab is a yellow tile outlined in ink. The thicker frame and the ink indicator follow this system's controls; the neobrutalism components draw a 2px frame and a blue bar ([neobrutalism tabs](https://github.com/ekmas/neobrutalism-components/blob/main/src/components/ui/tabs.tsx), consulted 2026-11-18).

Breadcrumbs are ink, medium weight, with each link bold and underlined like every link here and the current page extra bold; heavy chevrons separate the items ([neobrutalism breadcrumb](https://github.com/ekmas/neobrutalism-components/blob/main/src/components/ui/breadcrumb.tsx), consulted 2026-11-18).

Pagination is a row of framed tiles: 40px squares with a 3px ink border and 4px corners on the page color, bold numbers, and the current page filled with yellow over a 3px hard ink shadow ([neobrutalism pagination](https://github.com/ekmas/neobrutalism-components/blob/main/src/components/ui/pagination.tsx), consulted 2026-11-18). The shadow is this system's mark for the current page; the components library has none there.

An accordion is a stack of framed cards 16px apart: a 3px ink border, 4px corners and a hard ink shadow, each question a bold bar in yellow with ink text and chevron, and the answer below a 3px rule on the page color ([neobrutalism accordion](https://github.com/ekmas/neobrutalism-components/blob/main/src/components/ui/accordion.tsx), consulted 2026-11-19). The components library uses its blue and a 2px frame; the yellow and 3px frame follow this system.

A form field or a fieldset takes the input's label and error styles, so they need no values of their own.

A number input ends in square minus and plus buttons in ink, split by a 3px ink rule like the field's border; hovering one fills it with yellow. The components library has no stepper, so this is a local decision on top of its input ([neobrutalism input](https://github.com/ekmas/neobrutalism-components/blob/main/src/components/ui/input.tsx), consulted 2026-11-19).

A slider is a 12px track with a 3px ink outline and 4px corners, filled with the primary color up to a white circle knob in the same ink outline with a hard 2px shadow ([neobrutalism slider source](https://github.com/ekmas/neobrutalism-components/blob/main/src/components/ui/slider.tsx), consulted 2026-11-19, with the 3px borders and offset shadows of this system). Step marks are 4px ink squares inside the track, in the ink that reads on the primary fill inside the value, a local decision.

A toggle is a white button with a 3px ink border, 4px corners, bold type and a hard 2px shadow; pressed, it fills with the primary color and drops the shadow, as if pushed in ([neobrutalism toggle source](https://github.com/ekmas/neobrutalism-components/blob/main/src/components/ui/toggle.tsx), consulted 2026-11-19, where the pressed toggle fills with the main color). A toggle group is the contained tabs' tray, with the pressed toggle filled in primary.

A drawer follows the neobrutalism sheet ([neobrutalism sheet](https://github.com/ekmas/neobrutalism-components/blob/main/src/components/ui/sheet.tsx), consulted 2026-11-20): a square slab on the surface color, three quarters of the screen wide up to 384px, with no shadow, so the ink border on its inner edge alone sets it off from the page. The header, body and footer have 16px of padding, the title is the modal's extra-bold ink, and the panel slides in 300ms on an ease-in-out curve; the library opens in 500ms and closes in 300ms, and one duration serves both here. The 3px border, where the library draws 2px, the 2px ink rules under the header and above the footer, the ink backdrop at 60% instead of black at 80%, and the 16px gap between footer actions follow this system's modal: local decisions. The library's swipe drawer ([neobrutalism drawer](https://github.com/ekmas/neobrutalism-components/blob/main/src/components/ui/drawer.tsx), consulted 2026-11-20) rounds its edge to 5px; a drawer from the top or bottom takes those corners at this system's 4px, and a side drawer keeps the sheet's square edge.

The neobrutalism components have no chip; their multi-select combobox example lists the chosen labels as text in the trigger. A chip borrows from two of their components. Their Badge is a 2px ink frame around 12px text, with 10px of side padding and 12px icons, which gives a 24px height. Their Toggle fills with the main color when pressed ([neobrutalism badge](https://github.com/ekmas/neobrutalism-components/blob/main/src/components/ui/badge.tsx), [toggle](https://github.com/ekmas/neobrutalism-components/blob/main/src/components/ui/toggle.tsx) and [combobox](https://github.com/ekmas/neobrutalism-components/blob/main/src/components/ui/combobox.tsx), consulted 2026-11-20). Here a chip is a page-colored tile with the system's 4px corners and a 2px ink border, like the MultiSelect tag, with bold ink text. Hovering tints it with yellow at 35%. A selected chip fills with yellow and keeps its ink border and dark text. The remove button is a cross in the chip's text color with nearly square 2px corners and a faint tint of that color under the pointer. The keyboard outline sits 4px outside the chip, as on toggles and checkboxes, and a disabled chip drops to half opacity. Chips cast no hard shadow, so a row of chips stays calm. The missing shadow and the bold weight are local decisions.

A list follows the neobrutalism Item ([neobrutalism item](https://github.com/ekmas/neobrutalism-components/blob/main/src/components/ui/item.tsx), consulted 2026-11-20). Rows have 14px by 16px of padding and 14px between a 20px ink icon, the text and the trailing content. Titles are 14px on a 1.375 line, and descriptions are 14px in ink, not a muted gray, 4px below. The library frames each item with a 2px border and spaces items 16px apart. This system frames the group once instead, as its cards do: a page-colored panel with a 3px ink border and 4px corners. In a divided list, rows are separated by 2px ink rules, as in the modal. Titles are bold, following the system's heavy short labels, where the library uses its 500 base weight. The single frame, the bold titles and the 2px rules are local decisions.

A separator is a 2px ink rule with 16px of space on each side. The neobrutalism components have no separator component (none in [src/components/ui](https://github.com/ekmas/neobrutalism-components/tree/main/src/components/ui), consulted 2026-11-20), so the rule is a local decision. It is the system's own divider, as in the modal, the tabs and divided lists, where 2px ink rules separate parts inside 3px frames.

An empty state follows [neobrutalism Empty](https://www.neobrutalism.dev/docs/empty) (consulted 2026-11-20, [source](https://github.com/ekmas/neobrutalism-components/blob/main/src/components/ui/empty.tsx)). It is a page-colored panel inside a dashed ink border, with the card's 4px corners and 24px of padding. Its centered text column is at most 24rem wide. The icon is 20px in a 40px square tile with 4px corners. The title is 14px bold ink on a 20px line. The description is 14px ink text with relaxed 1.625 leading, 8px below. The actions sit 16px below the text, 10px apart, as in EmptyContent. Three choices are local decisions. The border is 3px, like the system's card frames, where the library draws 2px. The icon tile is filled yellow with dark text, like the system's accent tiles, where the library draws a white tile with a 2px ink border: the recipe has no media border, and a white tile without one would vanish on the page color. The padding stays 24px on wide screens, where the library grows it to 48px from the md breakpoint.

## Do's and Don'ts

- Do preserve shadow clearance and test every interaction in both color modes.
- Do separate bold labels from readable body text and values.
- Do verify yellow text/outline contrast instead of extrapolating from solid actions.
- Don't use blur, glossy gradients, or rounded pills as default treatments.
- Don't apply a thick border and shadow to every nested object.
- Don't present this project vocabulary as a canonical external standard.
- Do use thick borders, hard shadows and yellow bands on public pages, with uppercase labels sparingly; never blur or soft gradients.
