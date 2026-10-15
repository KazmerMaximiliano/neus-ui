# Neus UI

## Overview

**Target rules.** Neus is a clear, approachable interface for application forms,
navigation, and data workflows. Its identity combines Manrope, indigo emphasis,
pill-shaped controls, quiet content surfaces, and a distinctive curved sidebar.
Keep those signatures consistent as the library grows; decorative treatments
must not compete with the task. These are Neus UI project decisions.

**Current implementation.** Neus is the default system and supplies the reset
contract for Button, Card, Input, and Sidebar in every provider scope. Other
components retain their original styles; their existence does not mean they
already use the complete component-token architecture.

This document follows the prose structure of the
[Google DESIGN.md specification](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)+(alpha; consulted 2026-10-14), without YAML. Design intent lives here; implemented
values live in [shared variables](../../css/variables.css),
[semantic tokens](./tokens.css), [action palettes](../palettes.ts), and the linked
component recipes. Review date: 2026-10-14.

**Refactor gaps.** Apply the rules below incrementally. A target is not an existing
API, and a gap is not permission to change component behavior as part of a visual
refactor. See the [architecture guide](../../../docs/design-systems.md).

## Colors

**Target rules.** Use indigo for primary actions and navigation, neutral surfaces
for content, and separate success/error/information roles for feedback. Keep
primary text distinct from supporting text and placeholders. Color must accompany
a label, icon, border, or other recognizable state cue. In dark mode, preserve
semantic roles while adjusting both foreground and background for legibility.

**Current implementation.** `--color-primary` and `--color-text-on-primary` form the
primary action pair. `--color-surface`, `--color-surface-secondary`, and
`--color-text-primary` describe content surfaces. The provider resolves light/dark
action palettes and application overrides; the CSS supplies the remaining roles.

**Refactor gaps.** Validate all semantic button pairs, focus indicators, and
disabled/read-only distinctions in both modes. Runtime accent overrides do not
automatically recalculate every foreground or focus-ring color. Brand gradients
and glows exist in the shared variables but are optional promotional decoration,
not the default treatment for application controls.

## Typography

**Target rules.** Use Manrope for interface text, with system sans-serif fallbacks;
reserve monospace for code and identifiers. Establish hierarchy through size,
weight, and spacing before color. Keep prose and field labels in natural case.
Use the spaced uppercase treatment only for short action and navigation labels.

**Current implementation.** `--font-body`, `--font-display`, and `--font-mono`
define stacks; `--fs-base` and the other shared size tokens define a numerical
scale. Button and Sidebar use bold uppercase labels with wide tracking. Input
uses a smaller regular-weight value and a separate label style. Fonts are not
downloaded by selecting this system.

**Refactor gaps.** Define reusable body, heading, caption, and label roles from
the existing scale. Check long translations, zoom, and fallback fonts before
extending uppercase labels to another control.

## Layout

**Target rules.** Build spacing from the shared four-pixel rhythm. Group related
fields closely and separate sections more generously. Align labels, inputs, and
actions; allow wrapping instead of shrinking text. Page grids belong to templates
or applications, not to individual component recipes.

**Current implementation.** `--space-1` through the shared spacing scale provide
layout primitives. Card Header/Content have 16px padding; Footer has 8px padding
and gap. Sidebar is expanded at desktop widths, a rail from 768px to below 1024px,
and a dialog below 768px. These are shared library breakpoints.

**Refactor gaps.** Component paddings still mix literals and scale references.
Review Input's `--input-min-width` in narrow containers and check zoomed content,
wrapping actions, and long navigation labels during each adaptation.

## Elevation & Depth

**Target rules.** Separate ordinary content through spacing, subtle borders, and
surface contrast. Reserve shadows for floating controls and overlays. Keep focus
recognizable independently of elevation. Motion should explain a state change;
respect reduced-motion preferences.

**Current implementation.** Button and Card have no resting shadow. Sidebar's
floating controls use `--sidebar-control-shadow`; the mobile dialog has a backdrop.
Button, Input, and Sidebar disable transitions under reduced motion.

**Refactor gaps.** Define an overlay elevation convention when adapting Modal and
menus. Reduced-motion CSS currently removes transitions but does not remove
recipe-driven pressed transforms in other systems.

## Shapes

**Target rules.** Use pills for short actions and text-entry controls, rounded
rectangles for content, and the concave/convex curve only as a navigation signature.
Do not apply pill rounding to every container or copy navigation decoration into
form controls.

**Current implementation.** Button uses `--radius-pill`, Input has an equivalent
pill radius, and Card uses `--radius-default`. Sidebar's transparent decorative
wedge and body corner use separate radius tokens.

**Refactor gaps.** Preserve the transparent cutout when changing page backgrounds.
Review media clipping and focus outlines independently of container rounding.

## Components

### Button

**Target rules.** A solid button carries the main action; outlined and text actions
provide lower emphasis. Keep size independent of importance. Hover and press must
be visible, and keyboard focus must remain distinct. Loading must communicate
progress without losing the action's accessible name or causing disruptive resizing.

**Current implementation.** [Button recipe](./button.css): pill geometry, bold
tracked labels, color-based hover/press, and no shadow. Shared CSS provides an
offset focus outline and disabled styling. Loading disables the native button,
sets its busy state, and replaces the label with dots.

**Refactor gaps.** Loading dimensions are not explicitly reserved. Audit short and
long labels and semantic colors in both modes before claiming full state coverage.

### Card

**Target rules.** A Card groups related content; its children own actions. Keep
media inside the rounded surface and place spacing in Header, Content, and Footer.
Do not make a passive surface look clickable through hover elevation.

**Current implementation.** [Card recipe](./card.css): rounded bordered surface,
header divider, no shadow, and semantic foreground/background in both modes.
The root has no padding or interactive states; Footer actions can wrap.

**Refactor gaps.** Review the header divider against both surface modes. Loading,
errors, and focus belong to appropriate children, not new Card state props.

### Input

**Target rules.** Keep a visible label, legible value, subordinate placeholder,
and explicit error message. Focus must remain evident when invalid. A read-only
value stays readable and distinct from an unavailable field.

**Current implementation.** [Input recipe](./input.css): pill field, indented
label/error, semantic surface, hover border, and focus border without a shadow.
The shared component associates errors with the input and supports native
disabled and read-only behavior.

**Refactor gaps.** Review focus contrast, especially invalid focus with no added
shadow. Read-only has no dedicated visual recipe. Light-mode value color is
accent-based; review readability when the application overrides that accent.

### Sidebar

**Target rules.** Use the primary-colored panel to anchor navigation. Keep hover,
current destination, and keyboard focus distinguishable. Preserve readable labels
when a rail expands and keep the mobile close control discoverable.

**Current implementation.** [Sidebar recipe](./sidebar.css): curved panel,
pill items, translucent hover/active fills, offset focus outlines, and semantic
on-primary text. Shared behavior supplies rail expansion and the mobile dialog.

**Refactor gaps.** Review selected/focused combinations in both modes and with
custom accents. Do not encode navigation errors or loading as a selected item;
use explicit content or feedback instead.

### Extension to other families — pending token adaptation

- Selection and date/time controls: inherit Input's label, error, and focus rules;
  distinguish selection from hover and from today's date.
- DataTable and calendars: use neutral rows, consistent alignment, and restrained
  status accents; avoid uppercase body data and decorative glows.
- Modal, Dropdown, and Menu: establish a floating surface and focus hierarchy;
  preserve scope when rendering through portals.
- Badge, Stepper, and feedback: combine semantic color with text or shape; use
  pill geometry only where it fits the information.
- AppTemplate/FormTemplate: compose the spacing and navigation rules without
  introducing component-specific system conditionals.

## Do's and Don'ts

- Do read the current recipe and the target rule together before changing a token.
- Do check light/dark, nested scopes, keyboard focus, long content, and reduced motion.
- Do preserve Neus defaults at every provider boundary when adding a token.
- Don't treat shared colors alone as a completed component adaptation.
- Don't use gradients, glows, or all-uppercase copy as a substitute for hierarchy.
- Don't claim a pending target or accessibility review is already implemented.
