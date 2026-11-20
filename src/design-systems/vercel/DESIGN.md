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
  default: 10px
  sm: 6px
  md: 8px
  pill: 3em
  button: 10px
  card: 14px
  input: 10px
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
        --badge-padding: 2px 8px
        --badge-gap: 4px
        --badge-dot-font-size: 12px
    button:
      base:
        --button-radius: "{rounded.button}"
        --button-font-size-small: 0.8rem
        --button-font-size-medium: 14px
        --button-font-size-large: 14px
        --button-padding-small: 3px 10px
        --button-padding-medium: 5px 10px
        --button-min-height-small: 28px
        --button-min-height-medium: 32px
        --button-min-height-large: 36px
        --button-padding-large: 7px 10px
        --button-line-height: 20px
        --button-label-weight: "500"
        --button-label-spacing: normal
        --button-label-transform: none
        --button-border-width: 1px
        --button-active-transform: translateY(1px)
        --button-loader-size: 5px
        --button-loader-gap: 1px
        --button-focus-offset: 0px
        --button-disabled-opacity: "0.5"
        --button-transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1)
        --button-secondary-background: "#f2f2f2"
        --button-secondary-color: var(--color-text-primary)
        --button-secondary-hover: color-mix(in srgb, var(--button-secondary-background), var(--color-text-primary) 5%)
        --button-tonal-background: var(--button-secondary-background)
        --button-outlined-border-color: var(--color-border-subtle)
        --button-tonal-color: var(--button-secondary-color)
        --button-elevated-background: var(--color-surface)
        --button-elevated-color: var(--color-text-primary)
        --button-elevated-shadow: 0 0 0 1px var(--color-border-subtle), 0 1px 2px 0 rgb(0 0 0 / 0.05)
        --button-elevated-shadow-hover: 0 0 0 1px var(--color-border-subtle), 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
      dark:
        --button-secondary-background: "#1a1a1a"
        --button-outlined-border-color: var(--color-border-input)
        --button-elevated-shadow: 0 0 0 1px var(--color-border-input), 0 1px 2px 0 rgb(0 0 0 / 0.05)
        --button-elevated-shadow-hover: 0 0 0 1px var(--color-border-input), 0 1px 3px 0 rgb(0 0 0 / 0.3)
    calendar:
      base:
        --calendar-radius: 10px
        --calendar-border-color: var(--color-border-subtle)
        --calendar-label-color: var(--color-text-primary)
        --calendar-caption-color: var(--color-text-primary)
        --calendar-caption-size: 14px
        --calendar-caption-weight: "500"
        --calendar-nav-color: var(--color-text-primary)
        --calendar-weekday-size: 0.8rem
        --calendar-day-size: 30px
        --calendar-day-font-size: 14px
        --calendar-day-radius: 8px
        --calendar-item-radius: 8px
        --calendar-day-hover-background: "#f2f2f2"
        --calendar-selected-background: var(--color-primary)
        --calendar-selected-color: var(--color-text-on-primary)
        --calendar-selected-weight: "400"
        --calendar-range-middle-background: "#f2f2f2"
        --calendar-today-color: var(--color-text-primary)
        --calendar-today-weight: "400"
        --calendar-today-ring: "inset 0 0 0 var(--calendar-day-size) #f2f2f2"
        --calendar-disabled-opacity: "0.5"
      dark:
        --calendar-day-hover-background: "color-mix(in srgb, #1a1a1a 50%, transparent)"
        --calendar-range-middle-background: "#1a1a1a"
        --calendar-today-ring: "inset 0 0 0 var(--calendar-day-size) #1a1a1a"
    card:
      base:
        --card-radius: 14px
        --card-border-color: var(--color-border-subtle)
        --card-header-gap: 4px
        --card-header-border-width: 0px
        --card-footer-padding: 16px
    checkbox:
      base:
        --checkbox-size: 16px
        --checkbox-border-width: 1px
        --checkbox-border-color: var(--color-text-placeholder)
        --checkbox-hover-border-color: var(--color-text-placeholder)
        --checkbox-checked-shadow: none
        --checkbox-icon-size: 14px
        --checkbox-icon-stroke: "2"
        --checkbox-focus-offset: 0px
        --checkbox-transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)
    clock:
      base:
        --clock-radius: 10px
        --clock-border-color: var(--color-border-subtle)
        --clock-header-padding: 16px 20px
        --clock-header-border-width: 1px
        --clock-header-background: var(--color-surface)
        --clock-header-color: var(--color-text-primary)
        --clock-display-font-size: 36px
        --clock-segment-padding: 0 6px
        --clock-segment-radius: 8px
        --clock-segment-inactive-opacity: "1"
        --clock-segment-active-background: var(--color-surface-secondary)
        --clock-face-background: var(--color-surface-secondary)
    dropdown:
      base:
        --dropdown-padding: 3px 8px
        --dropdown-gap: 6px
        --dropdown-radius: 10px
        --dropdown-border-color: var(--color-border-subtle)
        --dropdown-hover-border-color: var(--color-text-placeholder)
        --dropdown-avatar-size: 24px
        --dropdown-avatar-background: "#f2f2f2"
        --dropdown-avatar-color: var(--color-text-secondary)
        --dropdown-caret-size: 16px
        --dropdown-caret-stroke: "2"
        --dropdown-caret-color: var(--color-text-primary)
        --dropdown-name-color: var(--color-text-secondary)
        --dropdown-name-weight: "500"
        --dropdown-name-transform: none
      dark:
        --dropdown-border-color: var(--color-border)
        --dropdown-avatar-background: "#1a1a1a"
    file-uploader:
      base:
        --file-uploader-radius: 14px
        --file-uploader-border-width: 1px
        --file-uploader-border-color: var(--color-text-placeholder)
        --file-uploader-background: var(--color-surface-secondary)
        --file-uploader-hover-border-color: var(--color-text-primary)
        --file-uploader-drag-border-color: var(--color-focus)
        --file-uploader-drag-transform: none
        --file-uploader-title-size: var(--fs-base)
        --file-uploader-title-weight: "500"
        --file-uploader-badge-radius: 10px
        --file-uploader-badge-background: var(--color-surface)
        --file-uploader-badge-border-width: 1px
        --file-uploader-badge-color: var(--color-text-primary)
        --file-uploader-error-radius: 10px
    icon-button:
      base:
        --icon-button-radius: "{rounded.button}"
        --icon-button-size-small: 28px
        --icon-button-size-medium: 32px
        --icon-button-size-large: 36px
        --icon-button-icon-size-small: 16px
        --icon-button-icon-size-medium: 16px
        --icon-button-icon-size-large: 16px
        --icon-button-active-transform: translateY(1px)
        --icon-button-focus-offset: 0px
        --icon-button-disabled-opacity: "0.5"
        --icon-button-transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1)
    input:
      base:
        --input-radius: 10px
        --input-padding: 7px 10px
        --input-control-height-small: 28px
        --input-control-height-medium: 32px
        --input-control-height-large: 36px
        --input-small-padding: 5px 10px
        --input-large-padding: 9px 10px
        --input-border-color: var(--color-border-input)
        --input-hover-border-color: var(--color-border-input)
        --input-font-size: 14px
        --input-line-height: 16px
        --textarea-line-height: 20px
        --input-color: var(--color-text-primary)
        --input-label-font-size: 14px
        --input-label-color: var(--color-text-primary)
        --input-label-offset: 0px
        --input-error-font-size: 14px
        --input-error-offset: 0px
        --input-focus-border-color: var(--color-focus)
        --input-focus-shadow: 0 0 0 3px var(--color-focus-ring)
        --input-error-focus-shadow: 0 0 0 3px var(--color-focus-ring-error)
        --input-transition: border-color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)
        --input-adornment-size: 16px
        --input-readonly-background: var(--color-surface-secondary)
        --input-readonly-border-style: solid
        --input-readonly-border-color: var(--color-border-subtle)
    link:
      base:
        --link-font-weight: "500"
        --link-decoration: underline
        --link-underline-offset: 4px
    modal:
      base:
        --modal-width: 384px
        --modal-radius: 14px
        --modal-border-width: 1px
        --modal-border-color: color-mix(in srgb, var(--color-text-primary) 10%, transparent)
        --modal-shadow: var(--elevation-dialog)
        --modal-backdrop: color-mix(in srgb, var(--color-black) 10%, transparent)
        --modal-divider-width: 0px
        --modal-header-padding: 16px
        --modal-title-size: 16px
        --modal-title-weight: "500"
        --modal-title-line-height: "1"
        --modal-content-padding: 0 16px 16px
        --modal-content-line-height: 20px
        --modal-footer-padding: 16px
        --modal-footer-gap: 8px
    overlay:
      base:
        --overlay-border-color: color-mix(in srgb, var(--color-text-primary) 10%, transparent)
        --overlay-radius: 10px
        --overlay-shadow: var(--elevation-floating)
        --overlay-offset: 4px
        --overlay-padding: 4px
        --overlay-min-width: 128px
        --overlay-item-padding: 4px 6px
        --overlay-item-min-height: 28px
        --overlay-item-radius: 8px
        --overlay-item-font-weight: "400"
        --overlay-item-hover-background: "#f2f2f2"
      dark:
        --overlay-shadow: var(--elevation-floating)
        --overlay-item-hover-background: "#1a1a1a"
    select:
      base:
        --select-caret-size: 16px
        --select-caret-gap: 8px
        --select-caret-color: var(--color-text-secondary)
        --select-search-radius: 6px
        --select-tag-gap: "{spacing.step-1}"
        --select-tag-padding: 0 2px 0 6px
        --select-tag-radius: 6px
        --select-tag-background: "#f2f2f2"
        --select-tag-remove-color: color-mix(in srgb, var(--color-text-primary) 50%, transparent)
      dark:
        --select-tag-background: "#1a1a1a"
    sidebar:
      base:
        --sidebar-width: 256px
        --sidebar-compact-width: 48px
        --sidebar-mobile-width: 288px
        --sidebar-transition: 0.2s linear
        --sidebar-header-height: 64px
        --sidebar-header-min-height: 64px
        --sidebar-header-padding: 8px
        --sidebar-background: var(--color-surface)
        --sidebar-color: var(--color-text-primary)
        --sidebar-header-background: var(--sidebar-background)
        --sidebar-decoration-display: none
        --sidebar-convex-radius: 0px
        --sidebar-title-color: var(--color-text-primary)
        --sidebar-body-padding: 8px
        --sidebar-body-gap: 0px
        --sidebar-body-padding-bottom: 8px
        --sidebar-body-padding-left: 8px
        --sidebar-item-padding: 6px 8px
        --sidebar-item-gap: 8px
        --sidebar-item-min-height: 32px
        --sidebar-item-radius: 8px
        --sidebar-item-color: var(--color-text-primary)
        --sidebar-item-hover-background: "#f2f2f2"
        --sidebar-item-hover-color: var(--color-text-primary)
        --sidebar-item-active-background: "#f2f2f2"
        --sidebar-item-active-color: var(--color-text-primary)
        --sidebar-item-focus-color: var(--color-focus)
        --sidebar-item-size: 14px
        --sidebar-item-weight: "400"
        --sidebar-item-active-weight: "500"
        --sidebar-item-line-height: 20px
        --sidebar-item-spacing: 0px
        --sidebar-item-transform: none
        --sidebar-border-width: 1px
        --sidebar-header-border-width: 1px
        --sidebar-control-size: 32px
        --sidebar-control-radius: 10px
        --sidebar-control-icon-size: 16px
        --sidebar-control-shadow: none
        --sidebar-backdrop-background: rgb(0 0 0 / 0.1)
      dark:
        --sidebar-item-hover-background: "#1a1a1a"
        --sidebar-item-active-background: "#1a1a1a"
    stepper:
      base:
        --stepper-dot-size-small: 24px
        --stepper-dot-size-medium: 32px
        --stepper-dot-size-large: 40px
        --stepper-dot-font-size-small: 12px
        --stepper-dot-font-size-medium: 14px
        --stepper-dot-font-size-large: 14px
        --stepper-dot-border-width: 1px
        --stepper-dot-font-weight: "500"
        --stepper-dot-border-color: var(--color-border-subtle)
        --stepper-dot-done-background: var(--color-surface)
        --stepper-dot-done-border-color: var(--color-text-primary)
        --stepper-dot-done-color: var(--color-text-primary)
        --stepper-dot-hover-background: "#f2f2f2"
        --stepper-label-font-size-small: 12px
        --stepper-label-font-size-medium: 14px
        --stepper-label-font-size-large: 14px
        --stepper-label-weight: "400"
        --stepper-label-active-weight: "500"
        --stepper-label-active-color: var(--color-text-primary)
        --stepper-connector-thickness: 1px
        --stepper-connector-done-color: var(--color-text-primary)
        --stepper-counter-font-size: 14px
        --stepper-counter-weight: "400"
        --stepper-counter-transform: none
        --stepper-counter-spacing: normal
        --stepper-bar-height: 4px
        --stepper-bar-radius: "{rounded.pill}"
        --stepper-bar-fill-radius: 0px
        --stepper-bar-background: "#f2f2f2"
        --stepper-simple-size: 8px
        --stepper-simple-current-width: 20px
      dark:
        --stepper-dot-hover-background: "#1a1a1a"
        --stepper-bar-background: "#1a1a1a"
    week-calendar:
      base:
        --week-calendar-radius: 10px
        --week-calendar-padding: 16px
        --week-calendar-event-radius: 8px
        --week-calendar-title-size: 16px
    interactive-map:
      base:
        --interactive-map-radius: 10px
    data-table:
      base:
        --data-table-header-background: var(--color-surface)
        --data-table-hover-background: "color-mix(in srgb, #f2f2f2 50%, transparent)"
        --data-table-selection-background: "#f2f2f2"
        --data-table-font-size: 14px
        --data-table-header-font-size: 14px
        --data-table-spacing: 4px
        --data-table-radius: 8px
        --data-table-control-radius: 6px
        --data-table-row-height: 36px
        --data-table-header-height: 40px
        --data-table-empty-height: 96px
        --data-table-empty-title-size: 14px
      dark:
        --data-table-hover-background: "color-mix(in srgb, #1a1a1a 50%, transparent)"
        --data-table-selection-background: "#1a1a1a"
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
    media-placeholder:
      base:
        --media-placeholder-radius: 14px
    alert:
      base:
        --alert-radius: 10px
        --alert-padding: 8px 10px
        --alert-gap: 8px
        --alert-line-height: 20px
        --alert-title-weight: "500"
        --alert-icon-size: 16px
        --alert-info-background: var(--color-surface)
        --alert-info-border-color: var(--color-border-subtle)
        --alert-info-icon-color: var(--color-text-primary)
        --alert-success-background: var(--color-surface)
        --alert-success-border-color: var(--color-border-subtle)
        --alert-warning-background: var(--color-surface)
        --alert-warning-border-color: var(--color-border-subtle)
        --alert-error-background: var(--color-surface)
        --alert-error-border-color: var(--color-border-subtle)
    avatar:
      base:
        --avatar-size-small: 24px
        --avatar-size-medium: 32px
        --avatar-size-large: 40px
        --avatar-background: "#f2f2f2"
        --avatar-color: var(--color-text-secondary)
        --avatar-font-weight: "400"
      dark:
        --avatar-background: "#1a1a1a"
    sections:
      base:
        --hero-media-radius: 14px
        --feature-icon-radius: 10px
        --site-header-sticky-background: color-mix(in srgb, var(--color-surface) 88%, transparent)
        --site-header-sticky-backdrop-filter: saturate(1.4) blur(12px)
        --pricing-price-size: 32px
        --pricing-price-weight: 450
        --pricing-price-tracking: -0.06em
        --pricing-period-font-family: var(--font-mono)
        --pricing-check-color: var(--color-text-primary)
        --pricing-featured-border-color: var(--color-text-primary)
        --pricing-featured-shadow: "0 0 #0000"
    spinner:
      base:
        --spinner-size-small: 12px
        --spinner-size-medium: 16px
        --spinner-size-large: 24px
        --spinner-stroke-width: 0.0833em
        --spinner-color: currentColor
        --spinner-ring-duration: 1s
    switch:
      base:
        --switch-gap: 8px
        --switch-track-width: 32px
        --switch-track-height: 18.4px
        --switch-track-border-width: 0px
        --switch-track-background: var(--color-text-placeholder)
        --switch-track-checked-shadow: none
        --switch-thumb-size: 16px
        --switch-thumb-checked-size: 16px
        --switch-thumb-color: var(--color-surface)
        --switch-thumb-hover-color: var(--color-surface)
        --switch-label-font-size: 14px
        --switch-focus-offset: 0px
        --switch-disabled-opacity: "0.5"
        --switch-duration: 150ms
        --switch-easing: cubic-bezier(0.4, 0, 0.2, 1)
    radio:
      base:
        --radio-group-gap: "{spacing.step-2}"
        --radio-group-text-gap: "{spacing.step-3}"
        --radio-group-label-gap: 6px
    popover:
      base:
        --popover-padding: 10px
        --popover-max-width: 288px
    progress:
      base:
        --progress-gap: "{spacing.step-3}"
        --progress-text-gap: "{spacing.step-3}"
        --progress-label-font-size: 14px
        --progress-label-weight: "500"
        --progress-value-font-size: 14px
        --progress-value-weight: "400"
        --progress-height-medium: 4px
        --progress-height-large: 10px
        --progress-track-background: "#f2f2f2"
        --progress-transition: width 150ms cubic-bezier(0.4, 0, 0.2, 1)
      dark:
        --progress-track-background: "#1a1a1a"
    skeleton:
      base:
        --skeleton-background: "#f2f2f2"
        --skeleton-duration: 2s
        --skeleton-text-radius: 8px
        --skeleton-rect-radius: 8px
      dark:
        --skeleton-background: "#1a1a1a"
    toast:
      base:
        --toast-width: 384px
        --toast-gap: 12px
        --toast-offset: 16px
        --toast-radius: 18px
        --toast-duration: 500ms
        --toast-easing: cubic-bezier(0.22, 1, 0.36, 1)
        --toast-enter-offset: 150%
    tooltip:
      base:
        --tooltip-radius: 8px
        --tooltip-shadow: 0 1px 1px rgb(0 0 0 / 0.02), 0 4px 8px rgb(0 0 0 / 0.04)
        --tooltip-padding: 6px 12px
        --tooltip-max-width: 320px
        --tooltip-offset: 4px
        --tooltip-caret-size: 4px
        --tooltip-font-size: 12px
        --tooltip-font-weight: "400"
        --tooltip-line-height: 16px
    tabs:
      base:
        --tabs-font-size: 14px
        --tabs-font-weight: "500"
        --tabs-selected-font-weight: "500"
        --tabs-line-height: 20px
        --tabs-height: 32px
        --tabs-padding: 2px 6px
        --tabs-gap: 4px
        --tabs-icon-gap: 6px
        --tabs-radius: 8px
        --tabs-color: color-mix(in srgb, var(--color-text-primary) 60%, transparent)
        --tabs-hover-background: transparent
        --tabs-selected-color: var(--color-text-primary)
        --tabs-disabled-color: color-mix(in srgb, var(--tabs-color) 50%, transparent)
        --tabs-divider-width: 0px
        --tabs-indicator-height: 2px
        --tabs-indicator-radius: 0px
        --tabs-indicator-color: var(--color-text-primary)
        --tabs-panel-gap: "{spacing.step-2}"
        --tabs-contained-height: 26px
        --tabs-contained-gap: 0px
        --tabs-contained-padding: 3px
        --tabs-contained-radius: 10px
        --tabs-contained-background: "#f2f2f2"
        --tabs-contained-tab-radius: 8px
        --tabs-contained-tab-padding: 2px 6px
        --tabs-contained-font-size: 14px
        --tabs-contained-color: var(--tabs-color)
        --tabs-contained-hover-background: transparent
        --tabs-contained-selected-background: var(--color-surface)
        --tabs-contained-selected-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
      dark:
        --tabs-color: var(--color-text-secondary)
        --tabs-contained-background: "#1a1a1a"
    breadcrumbs:
      base:
        --breadcrumbs-font-size: 14px
        --breadcrumbs-line-height: 20px
        --breadcrumbs-row-gap: 6px
        --breadcrumbs-separator: '"›"'
        --breadcrumbs-separator-gap: 6px
        --breadcrumbs-link-color: var(--color-text-secondary)
        --breadcrumbs-link-weight: "400"
        --breadcrumbs-link-hover-color: var(--color-text-primary)
        --breadcrumbs-link-hover-decoration: none
        --breadcrumbs-current-weight: "400"
    pagination:
      base:
        --pagination-font-size: 14px
        --pagination-font-weight: "500"
        --pagination-current-font-weight: "500"
        --pagination-gap: 2px
        --pagination-item-size: 32px
        --pagination-item-radius: 10px
        --pagination-item-border-width: 1px
        --pagination-item-hover-background: "#f2f2f2"
        --pagination-current-background: var(--color-surface)
        --pagination-current-color: var(--color-text-primary)
        --pagination-current-border-color: var(--color-text-primary)
        --pagination-ellipsis-color: var(--color-text-primary)
      dark:
        --pagination-item-hover-background: "color-mix(in srgb, #1a1a1a 50%, transparent)"
    accordion:
      base:
        --accordion-header-min-height: 40px
        --accordion-header-padding: 10px 0
        --accordion-header-radius: 10px
        --accordion-header-hover-background: transparent
        --accordion-title-size: 14px
        --accordion-title-weight: "500"
        --accordion-title-line-height: 20px
        --accordion-icon-size: 16px
        --accordion-icon-duration: 0s
        --accordion-content-padding: 0 0 10px
        --accordion-content-color: var(--color-text-primary)
        --accordion-content-size: 14px
        --accordion-content-line-height: 20px
        --accordion-disabled-color: "#8f8f8f"
        --accordion-focus-offset: 0px
    form-field:
      base:
        --fieldset-gap: "{spacing.step-4}"
        --fieldset-label-gap: 6px
        --fieldset-content-gap: 20px
    number-input:
      base:
        --number-input-stepper-gap: "{spacing.step-2}"
        --number-input-stepper-inset: 4px
        --number-input-button-size: 24px
        --number-input-button-radius: 7px
        --number-input-button-hover-background: "#f2f2f2"
        --number-input-transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1)
      dark:
        --number-input-button-hover-background: "color-mix(in srgb, #1a1a1a 50%, transparent)"
    slider:
      base:
        --slider-track-height: 4px
        --slider-track-background: "#f2f2f2"
        --slider-thumb-width: 12px
        --slider-thumb-height: 12px
        --slider-thumb-border-width: 1px
        --slider-thumb-border-color: var(--color-text-placeholder)
        --slider-thumb-background: var(--color-white)
        --slider-thumb-shadow: "0 0 #0000"
        --slider-thumb-hover-shadow: 0 0 0 3px color-mix(in srgb, var(--color-text-placeholder) 50%, transparent)
        --slider-thumb-active-shadow: var(--slider-thumb-hover-shadow)
        --slider-focus-shadow: 0 0 0 2px var(--color-focus), 0 0 0 5px var(--color-focus-ring)
        --slider-disabled-opacity: "0.5"
        --slider-transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)
        --slider-step-width: 2px
        --slider-step-height: 2px
        --slider-step-color: var(--color-text-placeholder)
        --slider-step-active-color: var(--color-surface)
      dark:
        --slider-track-background: "#1a1a1a"
    toggle:
      base:
        --toggle-font-size: 14px
        --toggle-font-weight: "500"
        --toggle-gap: "{spacing.step-1}"
        --toggle-height-small: 28px
        --toggle-height-medium: 32px
        --toggle-height-large: 36px
        --toggle-padding-small: 0 10px
        --toggle-padding-medium: 0 10px
        --toggle-padding-large: 0 10px
        --toggle-icon-size-small: 14px
        --toggle-icon-size-medium: 16px
        --toggle-icon-size-large: 16px
        --toggle-radius: 10px
        --toggle-border-width: 0px
        --toggle-hover-background: "#f2f2f2"
        --toggle-pressed-background: "#f2f2f2"
        --toggle-pressed-hover-background: "#f2f2f2"
        --toggle-pressed-color: var(--color-text-primary)
        --toggle-focus-offset: 0px
        --toggle-disabled-opacity: "0.5"
        --toggle-transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1)
        --toggle-group-gap: "{spacing.step-2}"
        --toggle-group-padding: 0px
        --toggle-group-border-width: 0px
        --toggle-group-radius: 10px
        --toggle-group-background: transparent
        --toggle-group-item-radius: 10px
        --toggle-group-item-background: transparent
        --toggle-group-item-color: var(--color-text-primary)
        --toggle-group-item-hover-background: "#f2f2f2"
        --toggle-group-item-hover-color: var(--color-text-primary)
        --toggle-group-item-pressed-background: "#f2f2f2"
        --toggle-group-item-pressed-color: var(--color-text-primary)
        --toggle-group-item-pressed-shadow: none
      dark:
        --toggle-hover-background: "#1a1a1a"
        --toggle-pressed-background: "#1a1a1a"
        --toggle-pressed-hover-background: "#1a1a1a"
        --toggle-group-item-hover-background: "#1a1a1a"
        --toggle-group-item-pressed-background: "#1a1a1a"
    drawer:
      base:
        --drawer-width: 384px
        --drawer-viewport-margin: 25%
        --drawer-border-color: var(--color-border-subtle)
        --drawer-radius: 0px
        --drawer-sheet-radius: 14px
        --drawer-sheet-max-height: calc(100% - 96px)
        --drawer-title-line-height: 24px
        --drawer-content-padding: 16px
        --drawer-duration: 0.2s
        --drawer-easing: cubic-bezier(0.4, 0, 0.2, 1)
---

# Vercel

## Overview

Vercel's product interface as its apps build it: Geist foundations under shadcn/ui components.
Colors, the Geist Sans and Geist Mono type and the elevation materials come from Geist; the
components follow shadcn/ui's Base UI components in their default base-nova style, read from
their published source. The result is a precise, restrained interface: neutral surfaces, clear
text hierarchy, compact controls and purposeful emphasis, for developer tools, settings and
data workflows.

Format: [Google DESIGN.md](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md) (alpha; consulted 2026-10-15).

Design references: [Geist colors](https://vercel.com/geist/colors), [typography](https://vercel.com/geist/typography) and [materials](https://vercel.com/geist/materials) (consulted 2026-10-14); [shadcn/ui components](https://ui.shadcn.com/docs/components) in the base-nova style, whose source is published at `https://ui.shadcn.com/r/styles/base-nova/<name>.json` (consulted 2026-11-20). shadcn's neutral roles map onto Geist's palette: background, card and popover are the page surface; muted, secondary and accent fills are Geist gray 100; borders are the subtle border; and the focus ring is Geist's blue focus color. Components shadcn does not have are local mappings onto the same vocabulary.

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

Corners follow shadcn's radius scale, built on a 10px base: 6px for small inner parts such as
chips, 8px for menu items, days and list rows, 10px for buttons, fields and panels, and 14px
for cards, dialogs and media. Pills are reserved for badges, switches, sliders and avatars.
Shadows stay Geist's materials, chosen by the surface's place in the hierarchy. References:
[shadcn/ui theming](https://ui.shadcn.com/docs/theming) (consulted 2026-11-20) and
[Geist materials](https://vercel.com/geist/materials).

## Components

### Button

Buttons follow the shadcn/ui button that Vercel's interfaces are built on, in its default base-nova style ([shadcn/ui Button](https://ui.shadcn.com/docs/components/base/button), consulted 2026-11-20): 14px medium labels (12.8px in the small size) on a 20px line, 10px of side padding inside a 1px transparent border and 10px corners; small, medium and large are 28, 32 and 36px tall. Solid fills with the primary ink; secondary is a gray-100 tile (#f2f2f2, #1a1a1a in dark mode) in foreground text that takes 5% of the foreground on hover, and tonal is the same tile. Elevated is shadcn's outline button with its extra-small shadow: the background color inside a hairline of the border color (the input border in dark mode) and a 1px shadow at 5% black that deepens to shadcn's small shadow on hover, a local decision so the variant still rises as it does in every system; outlined and text are the outline and ghost forms, tinted with the accent on hover. A press moves the button down 1px, keyboard focus is a 2px focus-blue outline on the edge, and a disabled button drops to half opacity. Success, error and info keep their palette fills, and shadcn's link variant has no counterpart here: the Link component covers it. Local decisions: the palette's darker hover fill instead of shadcn's 80% primary, the gray disabled fill, the 5px dot loader, and one 10px corner for every size where shadcn rounds the small one to 8px.

### Icon button

An icon button is one of shadcn's square icon sizes ([shadcn/ui Button](https://ui.shadcn.com/docs/components/base/button), consulted 2026-11-20): 28, 32 and 36px with a 16px icon at every size, and the button's 10px corners, fills, 1px press, focus outline and half-opacity disabled state. shadcn rounds the small square to 8px; one corner for all sizes is a local decision.

### Badge

A badge follows the shadcn/ui badge ([shadcn/ui Badge](https://ui.shadcn.com/docs/components/base/badge), consulted 2026-11-20): a 20px pill of 12px medium text on a 16px line, 2px by 8px of padding and 4px between a dot and its label, in sentence case. Every color takes the tinted form shadcn gives its destructive badge, a 10% wash with the text mixed toward the foreground so it stays readable; shadcn's filled, outline, ghost and link badges have no counterpart. The 6px status dot with a secondary-text label is a local decision.

### Link

A link is the inline link of [shadcn/ui Typography](https://ui.shadcn.com/docs/components/base/typography) (consulted 2026-11-20), since shadcn has no link component: medium weight in the primary ink, always underlined 4px below the text. The secondary link in the secondary text color, the 2px focus-blue outline 2px from the text and the short color fade are local decisions.

### Card

A card follows the [shadcn/ui Card](https://ui.shadcn.com/docs/components/base/card) in its default base-nova style (consulted 2026-11-20): the page surface inside a 1px subtle border with 14px corners and no shadow, 16px of padding around the header, content and footer, and 4px between a title and its actions, with no divider under the header. shadcn sets the footer on a muted band under a top border; here the footer stays on the card surface with its actions 8px apart, a local decision. The filled and elevated variants have no shadcn counterpart and keep the secondary surface and the floating material.

### Input

Fields follow shadcn/ui's input in its default base-nova style ([shadcn/ui Input](https://ui.shadcn.com/docs/components/base/input), [Textarea](https://ui.shadcn.com/docs/components/base/textarea), [Field](https://ui.shadcn.com/docs/components/base/field) and [Label](https://ui.shadcn.com/docs/components/base/label), consulted 2026-11-20): a box on the page surface with a 1px input-border hairline, 10px corners and 14px text, 32px tall with 10px of side padding, and 28 or 36px tall for the small and large sizes, like the small and large buttons. The border stays the same under the pointer; keyboard focus turns it the Geist focus blue with a 3px translucent focus ring, and an invalid field keeps the error border and takes the error ring while focused. Above the field sits a 14px medium label in the foreground color, 8px away, and below it help text in the secondary text color and errors in the error text, both 14px and aligned with the field. Placeholders use the placeholder gray; disabled fields keep the disabled surface and text roles, and read-only values stay solid on the secondary surface. A one-line field sets its text on a 16px line inside 7px of padding instead of shadcn's 20px line and 4px, which looks the same and lets a floating label clear the text inside a 32px field; a textarea is the same frame with the same 10px corners and shadcn's 20px lines, and icons inside a field are 16px, 8px from its edge. The outlined look is the default; shadcn has no filled variant or floating label, so those keep the shared Neus treatment, a local decision.

A select is the same field with a 16px chevron in the secondary text color, 8px from its right edge, as in [shadcn/ui Select](https://ui.shadcn.com/docs/components/base/select) (consulted 2026-11-20); its list is the shared overlay panel. A multiple select shows its choices as chips taken from [shadcn/ui Combobox](https://ui.shadcn.com/docs/components/base/combobox) (consulted 2026-11-20): gray 100 tiles (#f2f2f2, #1a1a1a in dark mode) with 6px corners and 12px foreground text, 4px apart, each ending in a remove icon at half strength. The search box inside the list keeps its 6px corners, a local decision.

### Sidebar

The sidebar follows the base-nova style of [shadcn/ui Sidebar](https://ui.shadcn.com/docs/components/base/sidebar) (consulted 2026-11-20): a 256px panel, 48px as the tablet rail and 288px as the phone drawer over a 10% black backdrop, with a 1px border-color edge and square corners, resizing in 200ms linear. The header and the item list have 8px of padding and the items touch: 32px tall, 6px by 8px of padding, 8px corners and 8px between a 16px icon and a 14px regular foreground label over 20px. Hover and the current item take the muted fill (#f2f2f2, #1a1a1a in dark mode) with foreground text, the current item in medium weight, and keyboard focus is the 2px focus outline, also on the current item. The menu, expand and close buttons are 32px with 10px corners and 16px icons. Local decisions: the panel keeps the page surface where shadcn uses a separate sidebar tone, so the muted fill stays visible in dark mode; the buttons keep the primary fill they share with the collapsed brand avatar, where shadcn's trigger is a ghost button; and the 64px header with its 1px rule and 16px bold title stays aligned with the application header.

### Hero

Geist display with tight negative tracking, centered, a solid black action and an outlined secondary; product UI or code is the anchor.

### Feature list

A grid inside one bordered frame with hairline dividers; small monochrome icons, no tinted tiles.

### Testimonial

Plain quotes with small avatars, or a row of customer names.

### FAQ

Questions over hairlines in the accordion's form: 14px medium questions and answers, with no hover fill.

### Pricing

Bordered cards with the price set tight and the period in mono; the recommended plan gets an ink outline, a pill badge and the one solid action.

### Supporting controls and content

Use the same semantic foreground, surface and focus roles for selectors, date and time controls, feedback and data views. Keep selected values distinct from hover and keyboard focus. Floating panels share the overlay geometry; tables and calendars preserve readable alignment when space is constrained. Templates establish page rhythm and responsive grouping without changing the visual identity of embedded controls.

An avatar is the [shadcn/ui Avatar](https://ui.shadcn.com/docs/components/base/avatar) circle (consulted 2026-11-20): 24, 32 and 40px for small, medium and large, with initials in regular weight and the secondary text color over gray 100 (#f2f2f2, #1a1a1a in dark mode). In a group, avatars overlap by a quarter of their size inside a 2px ring in the page color. The rounded shape has no shadcn counterpart and keeps 12px corners.

A spinner follows the [shadcn/ui Spinner](https://ui.shadcn.com/docs/components/base/spinner) (consulted 2026-11-20): it takes the color of the text beside it, turns once a second with a stroke one twelfth of its size, and is 16px by default, 12px small and 24px large, the sizes the shadcn page shows. shadcn draws an open loader icon; the ring here keeps a faint track and the dots keep their pulse, local decisions.

A checkbox is shadcn/ui's 16px box with 4px corners and a 1px border, which fills with the primary ink and shows a 14px check with a 2px stroke in the on-primary color when checked, without a shadow ([shadcn/ui Checkbox](https://ui.shadcn.com/docs/components/base/checkbox), consulted 2026-11-20). Its label is 14px and 8px from the box. The unchecked border uses the placeholder gray instead of shadcn's input border, so the box keeps 3:1 against the page, and it does not change under the pointer; keyboard focus is a 2px focus-blue outline right against the box. These two choices are local decisions.

A switch follows [shadcn/ui Switch](https://ui.shadcn.com/docs/components/base/switch) (consulted 2026-11-20): a 32 by 18.4px pill filled with the primary ink when on, with a 16px round knob in the page color that turns the on-primary color when on and slides across in 150ms. The label comes first, at 14px and 8px from the track; keyboard focus is a 2px focus-blue outline around the track, and a disabled switch dims to half opacity. The off track is the placeholder gray instead of shadcn's input color, so the track and knob keep 3:1 in both modes, a local decision.

A radio is the checkbox drawn as a circle, as in [shadcn/ui Radio Group](https://ui.shadcn.com/docs/components/base/radio-group) (consulted 2026-11-20): a 16px ring that fills with the primary ink and shows an 8px dot in the on-primary color when chosen. Options are 8px apart. The group's 14px medium legend sits 6px above its help text or options, and the help text, options and error are 12px apart, as shadcn spaces a field set around a radio group.

Menus, the dropdown's menu, the select's list and the combobox's suggestions share the floating panel of the shadcn/ui dropdown menu and select in their default base-nova style: the surface color with a 1px foreground line at 10% opacity, 10px corners, 4px of padding, at least 128px wide and 4px from the trigger, raised with Geist's floating material ([shadcn/ui Dropdown Menu](https://ui.shadcn.com/docs/components/base/dropdown-menu), [shadcn/ui Select](https://ui.shadcn.com/docs/components/base/select) and [shadcn/ui Combobox](https://ui.shadcn.com/docs/components/base/combobox), consulted 2026-11-20). Items are 14px regular text, 28px tall with 4px by 6px of padding and 8px corners, and fill with gray 100 (#f2f2f2, #1a1a1a in dark mode) under the pointer. shadcn marks the chosen option only with a check and sets the combobox 6px away; here the chosen option keeps the primary tint so a combobox, which draws no check, still shows it, every list sits 4px away, and keyboard focus adds a 2px focus-color outline, local decisions.

The dropdown's trigger is the shadcn/ui outline button that opens a dropdown menu: 32px tall with 10px corners, a 1px subtle border (the input border in dark mode) on the surface color, 8px of padding at each end, and a 24px round avatar in gray 100 with secondary text, the small [shadcn/ui Avatar](https://ui.shadcn.com/docs/components/base/avatar) fallback, 6px from a 16px chevron in the text color ([shadcn/ui Dropdown Menu](https://ui.shadcn.com/docs/components/base/dropdown-menu) and [shadcn/ui Button](https://ui.shadcn.com/docs/components/base/button), consulted 2026-11-20). The name over the menu is its label, medium weight in the secondary text color and without capitals, at the item size rather than shadcn's 12px. shadcn fills the button with gray 100 on hover; the trigger has no fill of its own here, so its border darkens instead, a local decision.

A popover is the menu panel with more room, as in the shadcn/ui popover: the same surface, 10% foreground line, 10px corners and floating material, with 10px of padding, at most 288px wide and 4px from its trigger ([shadcn/ui Popover](https://ui.shadcn.com/docs/components/base/popover), consulted 2026-11-20). shadcn fixes that width; here it is a maximum so short content stays narrow, a local decision.

A progress bar follows the [shadcn/ui Progress](https://ui.shadcn.com/docs/components/base/progress) (consulted 2026-11-20): a 4px gray 100 pill (#f2f2f2, #1a1a1a in dark mode) filled with the primary ink, which moves in 150ms, with the label in 14px medium text and the value in 14px regular secondary text, 12px apart and 12px above the bar. shadcn has a single thickness; the small bar shares it and the 10px large bar is a local decision.

A stepper has no shadcn/ui counterpart; as a local decision its colors, corners and type follow the shadcn/ui vocabulary of the other components (consulted 2026-11-20). Dots are 24, 32 and 40px circles with a 1px border-color ring and 12, 14 and 14px medium numbers in the muted foreground on the surface, taking the muted fill on hover (#f2f2f2, #1a1a1a in dark mode); the current step fills with the primary and its foreground, and finished steps keep the surface inside a foreground ring with a check. Labels are 12 or 14px, regular in the muted foreground, medium foreground for the current step and foreground once finished, joined by 1px border-color connectors that turn foreground behind finished steps. The linear stepper is the [shadcn/ui Progress](https://ui.shadcn.com/docs/components/base/progress) track, a 4px muted pill with a square-ended primary fill and a 14px regular count in the muted foreground; the simple stepper keeps 8px border-color dots, the current one 20px wide and the reached ones primary.

A skeleton is the [shadcn/ui Skeleton](https://ui.shadcn.com/docs/components/base/skeleton) (consulted 2026-11-20): gray 100 shapes (#f2f2f2, #1a1a1a in dark mode) with 8px corners that pulse to half opacity every two seconds, while circles stay round.

A data table follows the [shadcn/ui Table](https://ui.shadcn.com/docs/components/base/table) and its [data table guide](https://ui.shadcn.com/docs/components/base/data-table) (consulted 2026-11-20): 14px text on the page surface inside a 1px subtle border with 8px corners, a 40px header row in medium foreground text with no fill, 36px rows between subtle rules with 8px of cell padding, half of gray 100 on hover and the full gray 100 on selected rows (#f2f2f2, #1a1a1a in dark mode). An empty table is 96px tall with its message in 14px. The 6px corners of the grid's own filters and controls are a local decision.

A calendar follows the [shadcn/ui Calendar](https://ui.shadcn.com/docs/components/base/calendar) (consulted 2026-11-20), built on the same day picker: a page-surface panel with a 1px subtle border and 10px corners, a 14px medium caption, weekday names in 0.8rem secondary text and 28px days in 14px regular type with 8px corners. Hover fills a day with gray 100 (half of it in dark mode), today is a gray 100 square in foreground text, the selected day and both ends of a range fill with the primary ink in background-colored numbers, and the days between take gray 100 (#f2f2f2, #1a1a1a in dark mode). A disabled calendar dims to half opacity. The date input opens this same calendar, and the field label above the grid keeps the input's label.

A toast is the alert raised with Geist's floating material, laid out as the base-nova toast ([shadcn/ui Sonner](https://ui.shadcn.com/docs/components/base/sonner) and the [base-nova toast source](https://ui.shadcn.com/r/styles/base-nova/toast.json), consulted 2026-11-20): at most 384px wide with 18px corners, 16px from the screen edges and 12px apart, sliding in from one and a half times its height over 500ms on an ease-out curve. Its padding is the alert's. shadcn stacks waiting toasts behind the newest; here they are listed one above another, a local decision. Geist keeps toasts polite and saves assertive announcements for blocking errors, and an Undo action stays on screen for 5 to 10 seconds ([Geist toast](https://vercel.com/geist/toast), consulted 2026-11-17).

A tooltip follows the shadcn/ui tooltip: the foreground color behind background-colored text in 12px regular over 16px, with 6px by 12px of padding, 8px corners, at most 320px wide, and a small arrow 4px deep that points at the trigger from 4px away ([shadcn/ui Tooltip](https://ui.shadcn.com/docs/components/base/tooltip), consulted 2026-11-20). It keeps the lightest Geist shadow, the tooltip material ([Geist materials](https://vercel.com/geist/materials), consulted 2026-11-18). shadcn shows a tooltip at once; Geist waits about 150ms before showing one so a sweeping pointer does not flash it ([Geist tooltip](https://vercel.com/geist/tooltip), consulted 2026-11-18), which is the component's delay. A combobox is the input with the select's list.

A modal follows the shadcn/ui dialog: a panel at most 384px wide on the surface color, with 14px corners and a 1px foreground line at 10% opacity, raised with Geist's dialog material over a black backdrop at 10% opacity ([shadcn/ui Dialog](https://ui.shadcn.com/docs/components/base/dialog), consulted 2026-11-20). The header, body and footer have 16px of padding, the title is 16px medium on a line height of 1, the body is 14px secondary text over 20px, and the footer actions sit at the end, 8px apart. shadcn sets the footer on a muted band under a top border and blurs the backdrop; this modal separates its parts by spacing alone and leaves the page sharp, a local decision.

An alert follows the shadcn/ui alert: the surface color with a 1px subtle border, 10px corners, 8px by 10px of padding and 14px text over 20px, with a 16px icon 8px before a medium-weight title ([shadcn/ui Alert](https://ui.shadcn.com/docs/components/base/alert), consulted 2026-11-20). shadcn has a default and a destructive alert, both on the plain surface, so every status keeps that surface and border: the information icon takes the text color, the error icon the error text color, and success and warning keep their status colors so the status still reads from the icon, a local decision. shadcn's destructive alert also colors its text; here only the icon carries the error color.

Tabs follow the base-nova style of [shadcn/ui Tabs](https://ui.shadcn.com/docs/components/base/tabs) (consulted 2026-11-20). The line variant is its line list: 14px medium labels over 20px, 32px tall with 2px by 6px of padding, 4px apart and 6px between an icon and its label, in the foreground at 60% (the muted foreground in dark mode), with no divider under the list; the hovered and the selected tab turn foreground, the selected one over a 2px square-ended foreground bar. The contained variant is its default list: a 32px muted tray (#f2f2f2, #1a1a1a in dark mode) with 10px corners and 3px of padding, holding tabs with 8px corners and the same type, where the selected tab is the background surface with the small shadow and hover only darkens the text. Disabled tabs show their label at half strength, keyboard focus is the 2px focus outline inside the tab, and the panel sits 8px below. Local decisions: the tray's tabs are 26px rather than shadcn's 25px so the tray stays a 32px control, and the selected tab keeps the surface in dark mode instead of shadcn's translucent input fill.

Breadcrumbs follow the base-nova style of [shadcn/ui Breadcrumb](https://ui.shadcn.com/docs/components/base/breadcrumb) (consulted 2026-11-20): 14px regular text over 20px in the muted foreground, wrapping with 6px between lines and on each side of a separator; links turn foreground on hover with no underline, and the current page is regular foreground text. Local decisions: shadcn's 14px chevron icon is the › character here, and the button that reveals collapsed items keeps a 24px target where shadcn shows a 20px ellipsis.

Page buttons follow the base-nova style of [shadcn/ui Pagination](https://ui.shadcn.com/docs/components/base/pagination) (consulted 2026-11-20), whose page links are icon-size buttons: 32px squares, 2px apart, with 10px corners, a 1px border and 14px medium numbers in the foreground. Other pages are ghost buttons that take the muted fill on hover (#f2f2f2, half of #1a1a1a in dark mode); the current page is an outline button, the background surface inside its border, and the ellipsis keeps the foreground color. Local decisions: the current page's border is the foreground instead of shadcn's border color so the current page stands out at 3:1; numbers too wide for the square keep 8px of side padding; previous and next are the small text icon buttons, and the page count and page-size select keep their own roles, since shadcn has no counterpart.

An accordion follows the base-nova style of [shadcn/ui Accordion](https://ui.shadcn.com/docs/components/base/accordion) (consulted 2026-11-20), replacing the pricing-page FAQ look: items are separated by 1px rules in the border color, and each question is 14px medium foreground text over 20px with 10px above and below and no side padding, at least 40px tall with 10px corners, ending in a 16px chevron in the muted foreground that points up while open, without a turning animation. Answers are 14px foreground text over 20px with 10px below. Keyboard focus is the 2px focus outline on the question's edge. Local decisions: shadcn underlines a question on hover, while here hover leaves it unchanged; a disabled question turns gray 700 (#8f8f8f), where shadcn only stops the pointer; and the list keeps a rule above its first and below its last item.

A form field takes the input's 14px medium label, help text and error with 8px between them, as [shadcn/ui Field](https://ui.shadcn.com/docs/components/base/field) does (consulted 2026-11-20). A fieldset follows its FieldSet: the legend is 14px medium like every field label, as in FieldLegend's label size, and sits 6px above what follows; help text, content and error are 16px apart, and the fields inside are 20px apart, as in FieldGroup.

A number input ends in two ghost icon buttons, the extra-small icon buttons of [shadcn/ui Input Group](https://ui.shadcn.com/docs/components/base/input-group) (consulted 2026-11-20): 24px squares with 7px corners and 16px icons in the secondary text color, 8px apart and 4px from the field's edge, that take the gray 100 fill on hover (#f2f2f2, and #1a1a1a at half strength in dark mode) and turn the foreground color. shadcn has no number input, so building its stepper from these buttons is a local mapping.

A slider follows the [shadcn/ui Slider](https://ui.shadcn.com/docs/components/base/slider) in its default base-nova style ([source](https://ui.shadcn.com/r/styles/base-nova/slider.json), consulted 2026-11-20): a 4px gray 100 track with full corners (#f2f2f2, #1a1a1a in dark mode) filled with the primary ink up to a white 12px circle with a 1px border in the placeholder gray and no shadow. A 3px halo of that gray at half opacity appears under the pointer and while pressed; keyboard focus draws a solid 2px focus-blue ring inside the translucent focus halo instead. The slider dims to half opacity when disabled. shadcn draws no step marks; the 2px dots in the same gray, surface-colored on the fill, are a local decision.

A toggle and a toggle group follow [shadcn/ui Toggle](https://ui.shadcn.com/docs/components/base/toggle) and [Toggle Group](https://ui.shadcn.com/docs/components/base/toggle-group) in their default variant (consulted 2026-11-20): a borderless, transparent button with 10px corners, 14px medium labels and 16px icons 4px apart, 28, 32 and 36px tall with 10px of side padding. Hover and the pressed state fill it with gray 100 (#f2f2f2, #1a1a1a in dark mode) under foreground text, keyboard focus draws a 2px focus-blue outline at its edge, and a disabled toggle dims to half opacity. A group is a row or column of these toggles 8px apart, with no tray or border of its own. shadcn's small toggle has 8px corners and 12.8px text; here every size keeps the 10px corners and 14px type, a local decision.

A drawer follows the shadcn/ui sheet ([shadcn/ui Sheet](https://ui.shadcn.com/docs/components/base/sheet), consulted 2026-11-20): a square panel on the surface color, three quarters of the screen wide up to 384px, separated from the page by a 1px border on its inner edge and raised with Geist's dialog material over the modal's black backdrop at 10% opacity. The header, body and footer have 16px of padding, the title is 16px medium on a 24px line, and the panel slides in 200ms on an ease-in-out curve. shadcn's bottom drawer ([shadcn/ui Drawer](https://ui.shadcn.com/docs/components/base/drawer), consulted 2026-11-20) rounds its top corners to 14px, drops the shadow, stops 96px below the top of the screen and can be dragged; this drawer is a dialog like the sheet and is not dragged, so it takes the drawer's 14px corners and its 96px gap from the top only when it rises from the top or bottom, and keeps the shadow. shadcn blurs the backdrop, stacks the footer actions and moves the sheet only 40px while it fades; this drawer leaves the page sharp, keeps the actions in a row at the end and slides the whole panel: local decisions.

## Do's and Don'ts

- Do choose typography and surface roles before tuning individual pixel values.
- Do verify neutral separation, selection, and focus in both themes.
- Do draw shared boundaries once and preserve readable supporting text.
- Don't use promotional gradients or display typography as default product chrome.
- Do use hairline grids, inverse bands and real product screenshots on public pages; never colorful gradients or tinted icon tiles.
