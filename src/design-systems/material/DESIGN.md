---
version: alpha
name: Material
description: Primary purple, rounded shapes, and subtle elevation.
colors:
  primary: "#6750a4"
  on-primary: "#ffffff"
  primary-dark: "#d0bcff"
  on-primary-dark: "#381e72"
  error: "#b3261e"
  error-dark: "#f2b8b5"
  primary-container: "#eaddff"
  on-primary-container: "#21005d"
  primary-container-dark: "#4f378b"
  on-primary-container-dark: "#eaddff"
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
      error: "{colors.error}"
    dark:
      primary: "{colors.primary-dark}"
      onPrimary: "{colors.on-primary-dark}"
      error: "{colors.error-dark}"
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
      --color-primary-container: "{colors.primary-container}"
      --color-on-primary-container: "{colors.on-primary-container}"
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
      --color-primary-container: "{colors.primary-container-dark}"
      --color-on-primary-container: "{colors.on-primary-container-dark}"
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
        --button-shadow-hover: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)
        --button-outlined-shadow-hover: none
        --button-shadow-active: none
        --button-loader-gap: 3px
        --button-disabled-opacity: "1"
        --button-disabled-background: color-mix(in srgb, var(--color-text-primary) 12%, var(--color-surface))
        --button-disabled-color: color-mix(in srgb, var(--color-text-primary) 38%, var(--color-surface))
        --button-elevated-shadow: 0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)
        --button-elevated-shadow-hover: var(--elevation-floating)
    calendar:
      base:
        --calendar-background: var(--color-surface-container-high)
        --calendar-border-width: 0px
        --calendar-radius: 16px
        --calendar-shadow: var(--elevation-dialog)
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
        --card-border-color: var(--color-border-subtle)
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
        --clock-background: var(--color-surface-container-high)
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
        --clock-segment-active-background: var(--color-primary-container)
        --clock-segment-active-color: var(--color-on-primary-container)
        --clock-face-size: 256px
        --clock-face-background: var(--color-surface-container-highest)
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
        --input-gap: 4px
        --input-radius: "{rounded.input}"
        --input-padding: 15px 16px
        --input-control-height-medium: 56px
        --input-background: transparent
        --input-border-color: var(--color-border-input-hover)
        --input-font-size: 16px
        --input-line-height: 24px
        --input-color: var(--color-text-primary)
        --input-label-color: var(--color-text-secondary)
        --input-label-focus-color: var(--color-primary-text)
        --input-label-weight: "400"
        --input-label-hover-color: var(--color-text-primary)
        --input-error-value-color: var(--input-color)
        --input-label-duration: 150ms
        --input-label-easing: cubic-bezier(0.2, 0, 0, 1)
        --input-label-offset: 0px
        --input-error-offset: 16px
        --input-error-color: var(--color-error)
        --input-error-font-size: 12px
        --input-description-font-size: 12px
        --input-hover-border-color: var(--color-text-primary)
        --input-focus-border-color: var(--color-primary)
        --input-focus-border-width: 2px
        --input-focus-shadow: none
        --input-error-focus-shadow: none
        --input-disabled-background: transparent
        --input-disabled-border-color: color-mix(in srgb, var(--color-text-primary) 12%, transparent)
        --input-disabled-color: color-mix(in srgb, var(--color-text-primary) 38%, transparent)
        --input-label-position: absolute
        --input-label-top: calc(var(--field-height) / 2)
        --input-label-left: 12px
        --input-label-translate: translateY(-50%)
        --input-label-background: transparent
        --input-label-padding: 0 4px
        --input-label-rest-size: var(--input-font-size)
        --input-label-raised-top: 0px
        --input-label-raised-translate: translateY(-50%)
        --input-label-raised-size: 12px
        --input-notch-outline-width: var(--input-border-width)
        --input-notch-border-image: linear-gradient(transparent, transparent)
        --input-filled-background: var(--color-surface-container-highest)
        --input-filled-border-color: var(--color-text-secondary)
        --input-filled-radius: 4px 4px 0 0
        --input-filled-padding: 24px 16px 7px
        --input-filled-label-top: 8px
        --input-filled-label-translate: none
        --input-filled-label-background: transparent
        --input-filled-hover-background: color-mix(in srgb, var(--color-text-primary) 8%, var(--color-surface-container-highest))
        --textarea-filled-radius: 4px 4px 0 0
        --input-placeholder-rest-opacity: "0"
    link:
      base:
        --link-decoration: underline
        --link-underline-offset: 0.15em
    modal:
      base:
        --modal-width: 560px
        --modal-radius: 28px
        --modal-background: var(--color-surface-container-high)
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
        --select-tag-margin-block: -2px
        --select-tag-background: transparent
        --select-tag-border-width: 1px
        --select-tag-border-color: var(--color-border-input-hover)
        --select-tag-color: var(--color-text-secondary)
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
        --sidebar-item-hover-background: color-mix(in srgb, var(--color-text-primary) 8%, transparent)
        --sidebar-item-hover-color: var(--color-text-primary)
        --sidebar-item-focus-color: var(--color-focus)
        --sidebar-item-size: 14px
        --sidebar-item-weight: "500"
        --sidebar-item-spacing: 0px
        --sidebar-item-transform: none
        --sidebar-item-padding: 0 24px 0 16px
        --sidebar-item-min-height: 56px
        --sidebar-item-active-weight: "700"
        --sidebar-icon-size: 24px
        --sidebar-body-padding: 12px
        --sidebar-body-padding-left: 12px
        --sidebar-body-padding-bottom: 12px
        --sidebar-body-gap: 0px
        --sidebar-border-width: 0px
        --sidebar-item-radius: 28px
        --sidebar-item-active-background: var(--color-secondary-container)
        --sidebar-item-active-color: var(--color-on-secondary-container)
        --sidebar-shadow: none
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
        --app-template-header-background: var(--color-surface)
        --app-template-header-border-width: 0px
        --app-template-content-background: var(--color-surface-container-low)
        --form-template-gap: 24px
    typography:
      base:
        --text-overline-tracking: 0em
        --text-overline-transform: none
    layout: {}
    media-placeholder: {}
    alert:
      base:
        --alert-info-background: color-mix(in srgb, var(--color-info) 10%, var(--color-surface-container-lowest))
        --alert-info-border-color: color-mix(in srgb, var(--color-info) 35%, var(--color-surface-container-lowest))
        --alert-success-background: color-mix(in srgb, var(--color-success) 14%, var(--color-surface-container-lowest))
        --alert-success-border-color: color-mix(in srgb, var(--color-success) 45%, var(--color-surface-container-lowest))
        --alert-warning-background: color-mix(in srgb, var(--color-warning) 24%, var(--color-surface-container-lowest))
        --alert-warning-border-color: color-mix(in srgb, var(--color-warning) 60%, var(--color-surface-container-lowest))
        --alert-warning-icon-color: color-mix(in srgb, var(--color-warning) 70%, var(--color-text-primary))
        --alert-error-background: color-mix(in srgb, var(--color-error) 14%, var(--color-surface-container-lowest))
        --alert-error-border-color: color-mix(in srgb, var(--color-error) 45%, var(--color-surface-container-lowest))
        --alert-error-icon-color: var(--color-error)
    avatar: {}
    sections:
      base:
        --site-header-sticky-background: color-mix(in srgb, var(--color-surface) 88%, transparent)
        --site-header-sticky-backdrop-filter: saturate(1.4) blur(12px)
        --pricing-price-size: 32px
        --pricing-price-weight: 400
        --pricing-price-tracking: 0px
        --pricing-featured-ring-width: 2px
        --pricing-featured-shadow: var(--card-shadow)
    spinner:
      base:
        --spinner-size-medium: 40px
        --spinner-size-large: 48px
        --spinner-stroke-width: 0.1em
        --spinner-color: var(--color-primary)
        --spinner-track-color: transparent
        --spinner-ring-duration: 1568ms
    switch:
      base:
        --switch-gap: 12px
        --switch-track-width: 52px
        --switch-track-height: 32px
        --switch-track-border-color: var(--color-text-placeholder)
        --switch-track-background: var(--color-surface-container-highest)
        --switch-track-hover-border-color: var(--color-text-placeholder)
        --switch-track-checked-shadow: none
        --switch-thumb-size: 16px
        --switch-thumb-checked-size: 24px
        --switch-thumb-color: var(--color-text-placeholder)
        --switch-thumb-hover-color: var(--color-text-secondary)
        --switch-label-color: var(--color-text-primary)
        --switch-duration: 300ms
        --switch-easing: cubic-bezier(0.2, 0, 0, 1)
    radio:
      base:
        --radio-size: 20px
        --radio-checked-background: var(--radio-background)
        --radio-dot-size: 10px
        --radio-dot-color: var(--color-primary)
        --radio-dot-transition: scale 300ms cubic-bezier(0.05, 0.7, 0.1, 1)
    popover: {}
    progress:
      base:
        --progress-label-weight: "400"
        --progress-value-weight: "400"
        --progress-height-medium: 4px
        --progress-height-large: 8px
        --progress-track-radius: 0px
        --progress-fill-radius: 0px
        --progress-track-background: var(--color-surface-container-highest)
        --progress-indeterminate-duration: 2s
    skeleton:
      base:
        --skeleton-background: var(--color-surface-container-highest)
    toast:
      base:
        --toast-radius: 4px
    tooltip:
      base:
        --tooltip-background: "#322f35"
        --tooltip-color: "#f5eff7"
        --tooltip-radius: 4px
        --tooltip-padding: 4px 8px
        --tooltip-font-size: 12px
        --tooltip-font-weight: "400"
        --tooltip-line-height: 16px
        --tooltip-letter-spacing: 0.4px
      dark:
        --tooltip-background: "#e6e0e9"
        --tooltip-color: "#322f35"
    tabs:
      base:
        --tabs-disabled-color: color-mix(in srgb, var(--color-text-primary) 38%, transparent)
        --tabs-font-size: 14px
        --tabs-font-weight: "500"
        --tabs-selected-font-weight: "500"
        --tabs-line-height: 20px
        --tabs-letter-spacing: 0.1px
        --tabs-height: 48px
        --tabs-radius: 0px
        --tabs-hover-background: color-mix(in srgb, var(--color-text-primary) 8%, transparent)
        --tabs-selected-color: var(--color-primary)
        --tabs-indicator-inset: 16px
        --tabs-focus-width: 3px
        --tabs-contained-height: 40px
        --tabs-contained-gap: 1px
        --tabs-contained-padding: 0px
        --tabs-contained-border-width: 1px
        --tabs-contained-border-color: var(--color-border-input-hover)
        --tabs-contained-radius: "{rounded.pill}"
        --tabs-contained-background: var(--color-border-input-hover)
        --tabs-contained-tab-radius: 0px
        --tabs-contained-tab-background: var(--color-surface)
        --tabs-contained-color: var(--color-text-primary)
        --tabs-contained-hover-background: color-mix(in srgb, var(--color-text-primary) 8%, var(--color-surface))
        --tabs-contained-selected-background: var(--color-secondary-container)
        --tabs-contained-selected-color: var(--color-on-secondary-container)
        --tabs-contained-selected-shadow: none
    breadcrumbs:
      base:
        --breadcrumbs-font-size: 14px
        --breadcrumbs-line-height: 20px
        --breadcrumbs-letter-spacing: 0.25px
        --breadcrumbs-link-weight: "400"
        --breadcrumbs-current-weight: "500"
    pagination:
      base:
        --pagination-font-size: 14px
        --pagination-current-font-weight: "500"
        --pagination-item-hover-background: color-mix(in srgb, var(--color-text-primary) 8%, transparent)
        --pagination-current-background: var(--color-primary)
        --pagination-current-color: var(--color-text-on-primary)
    accordion:
      base:
        --accordion-header-padding: 12px 16px
        --accordion-header-hover-background: color-mix(in srgb, var(--color-text-primary) 8%, transparent)
        --accordion-title-size: 16px
        --accordion-title-weight: "400"
        --accordion-title-line-height: 24px
        --accordion-title-letter-spacing: 0.5px
        --accordion-icon-size: 24px
        --accordion-content-padding: 0 16px 16px
        --accordion-content-size: 14px
        --accordion-content-line-height: 20px
        --accordion-disabled-color: color-mix(in srgb, var(--color-text-primary) 38%, transparent)
        --accordion-focus-width: 3px
        --accordion-focus-offset: -3px
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

The colors are the M3 baseline scheme: primary `#6750a4` (`#d0bcff` in dark), error `#b3261e`
(`#f2b8b5`), and the surface roles from the neutral palette, surface `#fef7ff` (neutral 98) and
the containers from `#ffffff` to `#e6e0e9` (neutral 100 to 90). Those neutrals carry a little of
the purple key color, which is why surfaces read faintly lavender rather than white
([Material Web color tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-color.scss)
and [reference palette](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-ref-palette.scss), consulted 2026-11-16).

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
Filled and tonal buttons rise to level 1 on hover and drop back when pressed; outlined and text
buttons stay flat, and elevated buttons go from level 1 to level 2 on hover and back to level 1
when pressed ([elevated](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-elevated-button.scss), [filled](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-filled-button.scss)
and [tonal button tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-filled-tonal-button.scss), consulted 2026-11-16).

### Card

Local mapping: a quiet rounded container whose surface treatment
reflects its place in the tonal hierarchy. Keep the root passive; use child actions
for interaction. Filled, outlined and elevated treatments are explicit shared variants.

### Input

Material distinguishes filled and outlined fields and supports
floating or external labels and supporting/error text. The Neus M3 mapping uses integrated floating labels by default. Keep invalid
and focused treatments recognizable. Reference:
[Material Web text fields](https://github.com/material-components/material-web/blob/main/docs/components/text-field.md).
A textarea is the same filled or outlined field on several lines; its floating label rests on
the first line and rises to the border like a single-line field's.

The outlined field has no fill: a 1px outline in the outline color, on-surface on hover and a
2px primary outline on focus, 4px corners and 56px of height. The label rests inside in
body large and on-surface-variant, and rises to 12px into a gap cut in the outline, 4px clear on
each side, primary while focused; nothing is painted behind it, so the field works on any
surface. The filled field is the highest container with top corners only and a bottom indicator
in on-surface-variant; its label rises inside the container, 8px from the top. Text is body large
in on-surface; supporting and error text are body small, 16px in from the edge and 4px below
the field. Errors use the error color for the outline, the label and the message; disabled
fields keep 38% text and a 12% outline
([outlined](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-outlined-text-field.scss)
and [filled text field tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-filled-text-field.scss),
and [the field implementation](https://github.com/material-components/material-web/tree/main/field/internal), consulted 2026-11-16).
The label slides between its two positions in 150ms with the standard easing, and the gap in the
outline opens with it. The focus outline follows the 2px token; Material Web currently draws 3px
pending a token update. Select and MultiSelect are the same field: their label rests inside and
rises once a value is chosen or the list opens. An invalid field keeps its value in on-surface;
an outlined field's label turns on-surface under the pointer, and a filled field's container
takes the 8% hover layer. A filled textarea, like a filled field, rounds only its top corners.

### Sidebar

Local mapping: a tonal navigation container with rounded selected
indicators, readable labels, and clearly separate hover, current-location, and focus
states. Preserve destinations when changing between expanded and compact layouts.

The sidebar is the standard navigation drawer: the surface color with no elevation, 12px of
inner space, items 56px tall with a full-pill active indicator in secondary-container, 24px
icons and label large text in on-surface-variant, the current item in on-secondary-container
and bold, and an 8% on-surface layer on hover
([Material Web navigation drawer tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-navigation-drawer.scss), consulted 2026-11-16).
The 250px width is a local decision: the drawer opens from 1024px, where the token's 360px
would leave too little room for content. The application shell puts the header on the surface,
as a top app bar, and the content on surface-container-low, also a local decision: M3 sets
no color for an application's content pane.

### Hero

Display large in Roboto regular, a filled button and a tonal or text secondary; the anchor sits on a container surface.

### Feature list

Cards on container tones with the system radius, or a plain grid; icons in tonal circles.

### Testimonial

Cards on surface-container-low with an avatar and the author's role.

### FAQ

List items over outline-variant dividers, or cards on container tones.

### Pricing

Cards on container tones with the price in headline large; the recommended plan gets a primary outline, a local mapping.

### Supporting controls and content

Use the same semantic foreground, surface and focus roles for selectors, date and time controls, feedback and data views. Keep selected values distinct from hover and keyboard focus. Floating panels share the overlay geometry; tables and calendars preserve readable alignment when space is constrained. Templates establish page rhythm and responsive grouping without changing the visual identity of embedded controls.

The circular progress indicator is a 4px primary arc on an invisible track, 40px by default and 48px large, turning once every 1.57s ([Material Web progress](https://github.com/material-components/material-web/blob/main/docs/components/progress.md) and its circular indicator tokens, consulted 2026-11-15). A fixed arc is the local web mapping of its growing and shrinking one.

The switch is the 52×32 track: unselected, a 2px outline around the highest container with a 16px outline-colored handle; selected, a primary track with a 24px on-primary handle ([Material Web switch tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-switch.scss), consulted 2026-11-16). The handle darkens on hover. The pressed 28px handle, the hover halo and the optional icons are left out.

The radio button is a 20px circle with a 2px outline; selected, the outline turns primary and a 10px primary dot grows in over 300ms with the emphasized decelerate easing ([Material Web radio tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-radio-button.scss) and [its dot geometry](https://github.com/material-components/material-web/blob/main/radio/internal/radio.ts), consulted 2026-11-16). The 40px state layer is left out.

Dialogs and the date and time pickers sit on the high surface container with level 3 elevation, as their tokens set ([dialog](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-dialog.scss), [date picker](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-date-picker-docked.scss) and [time picker tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-time-picker.scss), consulted 2026-11-16). The time picker's dial is the highest container and its selected hour or minute uses the primary container; an outlined card's outline is outline-variant, and a selected value's chip in MultiSelect is outlined in the outline color.

A popover uses the menu container: the surface container color, level-2 elevation and extra-small corners ([Material Web menu tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-menu.scss), consulted 2026-11-16), with 16px of padding for arbitrary content. Material has no popover component; mapping it to the menu container is a local decision.

The linear progress indicator is a 4px primary bar on the highest surface container, with square ends, and large is 8px ([Material Web linear progress tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-linear-progress-indicator.scss), consulted 2026-11-17). Its indeterminate state slides one primary segment along the track over 2s; the two alternating segments are simplified to one.

Material has no skeleton; placeholders use the highest surface container, a local decision.

A toast takes the snackbar's extra-small 4px corners ([Material Web snackbar tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-snackbar.scss), consulted 2026-11-17). Two local decisions depart from the snackbar: a toast keeps its status color instead of the inverse surface, so success, warning and error stay distinct, and it floats at level 2, the menus' elevation, instead of level 3, so a stack of toasts stays light.

A tooltip is the plain tooltip: the inverse surface (#322f35, #e6e0e9 in dark mode) with inverse-on-surface text in body small, 12px over 16px with 0.4px tracking, and extra-small 4px corners, without elevation ([Material Web plain tooltip tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-plain-tooltip.scss), consulted 2026-11-18). The tokens leave out padding; 4px by 8px is a local decision. A combobox is the text field with the menu list below it, the exposed dropdown menu that accepts typing.

Tabs are the primary tabs: 48px tall, labels in title small (14px over 20px, weight 500, 0.1px tracking) in on-surface-variant, the active one in primary with a 3px primary indicator as wide as the label and rounded on top, over a 1px outline-variant divider; hovering adds the on-surface state layer at 8% ([material-web tab tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-primary-navigation-tab.scss), consulted 2026-11-18). Focus is a 3px ring inside the tab. Material 3 has no contained tabs, so they take the outlined segmented button: a 40px pill with a 1px outline that also divides the segments, on-surface labels in label large, and the selected segment in secondary container ([material-web segmented button tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-outlined-segmented-button.scss), consulted 2026-11-18). Disabled tabs take on-surface at 38%.

Material 3 has no breadcrumbs or pagination. Breadcrumbs keep the Neus trail in body medium (14px over 20px, 0.25px tracking): links in on-surface-variant that turn primary and underline on hover, and the current page in on-surface at weight 500, a local mapping. Page buttons are 32px circles like the small icon buttons, with the on-surface state layer on hover and the current page filled in primary with on-primary numbers, like a selected filled icon button: also a local mapping.

Material 3 has no accordion either, so its rows are one-line list items: 56px tall with 16px at the sides, titles in body large (16px over 24px, 0.5px tracking) in on-surface, a 24px chevron in on-surface-variant, answers in body medium, outline-variant dividers and the on-surface state layer at 8% on hover ([material-web list tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-comp-list.scss), consulted 2026-11-19). The chevron and the dividers between rows are a local mapping.

Material has no success or warning roles, so alert colors are a local decision. Alerts tint the lowest surface container, not the tinted surface: mixed into its violet cast, green turns gray and orange and red look alike. Warning takes a 24% tint and error 14%, and their icons carry the status color (warning at 70% over the text color, to keep 3:1), so the two read apart in both modes.

## Do's and Don'ts

- Do pair roles intentionally and review every pair in light/dark.
- Do distinguish body, label, heading, and display typography.
- Don't equate purple, rounded corners, and shadows with complete Material 3.
- Don't confuse the shared secondary surface with Material's secondary accent.
- Don't introduce Expressive motion or shapes into this base target by default.
- Do use tonal surfaces and container roles for bands; do not use gradients or more than one primary-filled band per page.
