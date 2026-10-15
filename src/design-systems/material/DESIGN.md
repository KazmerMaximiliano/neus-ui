# Material 3 — Neus UI target

## Overview

**Target rules.** Use Material 3 base as the visual target: clear action hierarchy,
semantic color pairs, tonal surfaces, purposeful shapes, and legible type roles.
The goal is a coherent product interface across forms, navigation, and content.
Material 3 Expressive is outside this baseline.

**Current implementation.** Button, Card, Input, and Sidebar have Material-inspired
recipes. Purple actions, rounded controls, and shadows are an approximation, not
a complete Material 3 implementation. Other components retain their existing styles.

Format: [Google DESIGN.md](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)
(alpha, prose only). Primary sources consulted 2026-10-14:
[M3 color roles](https://m3.material.io/styles/color/the-color-system/key-colors-tones),
[applying type](https://m3.material.io/styles/typography/applying-type), and the
official Material Web [button](https://github.com/material-components/material-web/blob/main/docs/components/button.md)
and [text-field](https://github.com/material-components/material-web/blob/main/docs/components/text-field.md)
references. Neus component mappings below are local decisions.

Implemented values remain in [tokens](./tokens.css), [palettes](../palettes.ts),
[shared defaults](../../css/variables.css), and the component recipes. See the
[architecture guide](../../../docs/design-systems.md) for the implementation contract.

## Colors

**Target rules.** Distinguish primary, secondary, tertiary, error, surface, and
outline roles. Pair a fill with its corresponding on-color; use surface-container
levels to express grouping. Light and dark schemes must preserve these role
relationships rather than invert colors mechanically. Reference:
[M3 color roles](https://m3.material.io/styles/color/the-color-system/key-colors-tones).

**Current implementation.** `--color-primary` and `--color-text-on-primary` provide
the primary pair. Purple palettes differ by mode, but most neutrals, feedback,
focus-ring values, and dark surfaces are inherited from Neus. Shared
`--color-surface-secondary` is not Material's secondary accent role.

**Refactor gaps.** Secondary/tertiary container pairs and a full tonal surface
hierarchy need future token mappings. Generated hover shades and alpha tints do
not implement a Material tonal palette or dynamic color. Audit runtime accent
overrides separately; they do not regenerate all foreground pairs.

## Typography

**Target rules.** Organize text into display, headline, title, body, and label
roles, with size variants. Use body roles for reading and label roles for actions,
following [M3 applying type](https://m3.material.io/styles/typography/applying-type).
Local baseline: prefer Roboto for both body and display, with sans-serif fallbacks;
keep labels in natural case and preserve hierarchy at narrow widths.

**Current implementation.** Display prefers Roboto, but body prefers Inter before
Roboto. Buttons use medium-weight 14px labels; Input values use 14px. Font stacks
are declared without loading assets; the numerical size scale is shared with Neus.

**Refactor gaps.** Align the font priority with the target and map complete type
roles, including weight, tracking, and line height. Do not identify the inherited
scale as the Material 3 type scale.

## Layout

**Target rules.** Local web mapping: use a consistent spacing rhythm, align field
groups, and let content determine responsive composition. Preserve usable targets
and text before reducing whitespace. Navigation may change presentation with
available width while retaining the same destinations.

**Current implementation.** The shared four-pixel scale, Card slot padding, Input
minimum width, and Sidebar desktop/rail/mobile breakpoints remain in use. These
are Neus implementation choices rather than Material window-size classes.

**Refactor gaps.** Establish a template-level adaptive layout mapping and review
control sizes for touch use. Do not silently replace library breakpoints while
adjusting a component's visual recipe.

## Elevation & Depth

**Target rules.** Use tonal separation to distinguish surfaces; reserve stronger
depth for elevated or floating elements. Material's surface-container roles
provide a color hierarchy. Elevated buttons should be used selectively rather
than giving every action a shadow. References:
[color roles](https://m3.material.io/styles/color/the-color-system/key-colors-tones)
and [Material Web buttons](https://github.com/material-components/material-web/blob/main/docs/components/button.md).

**Current implementation.** Button has resting/hover/pressed shadow tokens; Card
and Sidebar use small shadows and the shared secondary surface. There is no
dedicated elevation-role scale or state-layer implementation.

**Refactor gaps.** Replace generic shadow application with role-appropriate
treatment. Verify surface separation in dark mode and define reduced-motion
behavior when adding state effects.

## Shapes

**Target rules.** Local mapping: rounded actions and navigation indicators,
moderately rounded content surfaces, and restrained field corners. Shape should
identify a component's role; one radius should not be imposed on everything.

**Current implementation.** Buttons use 20px corners, Card 12px, Input 4px, and
Sidebar items 28px. Neus navigation curves are disabled. These values describe
the approximation, not a complete Material shape scale.

**Refactor gaps.** Map each component to the relevant base M3 shape role during
refactoring. Preserve nested media clipping and independent keyboard focus.

## Components

### Button

**Target rules.** Distinguish filled, tonal, elevated, outlined, and text actions
by emphasis. Use filled for important completion actions and lower emphasis for
supporting actions, following [Material Web buttons](https://github.com/material-components/material-web/blob/main/docs/components/button.md).
Local requirement: loading must keep the action understandable and visually stable.

**Current implementation.** [Button recipe](./button.css): rounded shape, medium
label, generic shadows. Neus exposes solid/outlined/text, shared hover/active colors,
an offset focus outline, disabled colors, and a busy dot loader.

**Refactor gaps.** Tonal/elevated roles are not distinct public variants; existing
shadows do not establish that distinction. State layers and theme-specific disabled
roles are pending. Keep API changes explicit; check both schemes and loading width.

### Card

**Target rules.** Local mapping: a quiet rounded container whose surface treatment
reflects its place in the tonal hierarchy. Keep the root passive; use child actions
for interaction. The desired filled/outlined/elevated distinctions require future
design work rather than being inferred from a generic shadow.

**Current implementation.** [Card recipe](./card.css): 12px radius, secondary
surface, small shadow, no border or header divider. Slot spacing is inherited;
media stays within the rounded edge.

**Refactor gaps.** Choose and map a specific base M3 card treatment before claiming
parity. Theme-aware container roles are incomplete. The root has no focus, error,
or loading state; those responsibilities remain with content and child controls.

### Input

**Target rules.** Material distinguishes filled and outlined fields and supports
floating or external labels and supporting/error text. For the future Neus M3
mapping, prefer integrated floating labels as an explicit local target. Keep invalid
and focused treatments recognizable. Reference:
[Material Web text fields](https://github.com/material-components/material-web/blob/main/docs/components/text-field.md).

**Current implementation.** [Input recipe](./input.css): a rounded outlined native
input, external label, 16px padding, shared focus shadow, and associated error text.
Disabled and read-only behavior comes from the shared native input.

**Refactor gaps.** Neither a filled-field anatomy nor an integrated/floating label
is implemented. Label positioning cannot be claimed through token changes alone.
Review read-only styling, invalid focus, helper space, and dark-state colors before
introducing any new shared anatomy or API.

### Sidebar

**Target rules.** Local mapping: a tonal navigation container with rounded selected
indicators, readable labels, and clearly separate hover, current-location, and focus
states. Preserve destinations when changing between expanded and compact layouts.

**Current implementation.** [Sidebar recipe](./sidebar.css): secondary surface,
rounded items, primary-tinted selection, no border, and a small shadow. Shared
behavior provides a desktop panel, tablet rail, and mobile dialog.

**Refactor gaps.** Map selection to the intended M3 container/on-container pair;
the current primary tint is an approximation. The tablet rail and mobile drawer
are not complete Material navigation components. Verify selected/focused states
in both modes; show errors or progress without overwriting location state.

### Extension to other families — pending adaptation

- Selection and date/time controls: map selected, unselected, focused, and invalid
  states to semantic pairs; do not reuse primary tint for every role.
- DataTable and calendars: use readable body/label roles and restrained surfaces;
  distinguish range selection, current date, and keyboard focus.
- Modal and menus: map container elevation and scrim roles with clear focus handling.
- Badge and Stepper: use feedback/selection roles and non-color state cues.
- Templates: compose adaptive regions without embedding system checks in components.

## Do's and Don'ts

- Do pair roles intentionally and review every pair in light/dark.
- Do distinguish body, label, heading, and display typography.
- Do identify missing anatomy or public variants as explicit future work.
- Don't equate purple, rounded corners, and shadows with complete Material 3.
- Don't confuse the shared secondary surface with Material's secondary accent.
- Don't introduce Expressive motion or shapes into this base target by default.
