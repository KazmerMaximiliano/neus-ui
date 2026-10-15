# Vercel Geist — Neus UI target

## Overview

**Target rules.** Aim for Geist's precise, restrained product interface: neutral
surfaces, clear text hierarchy, compact controls, and purposeful emphasis. The
design should support developer tools, settings, and data workflows without
requiring promotional graphics to establish identity.

**Current implementation.** Button, Card, Input, and Sidebar have Geist-inspired
recipes. Small radii and monochrome actions are a starting point, not full Geist
coverage. Other components retain their current styles.

Format: [Google DESIGN.md](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)
(alpha, prose only). Primary references consulted 2026-10-14:
[Geist colors](https://vercel.com/geist/colors),
[typography](https://vercel.com/geist/typography),
[materials](https://vercel.com/geist/materials),
[Button](https://vercel.com/geist/button), and [Input](https://vercel.com/geist/input).
Neus API and layout mappings below are local choices.

Implemented values remain in [tokens](./tokens.css), [palettes](../palettes.ts),
[shared defaults](../../css/variables.css), and the component recipes. See the
[architecture guide](../../../docs/design-systems.md) for theme scope behavior.

## Colors

**Target rules.** Use neutral roles for text, borders, backgrounds, and ordinary
controls. Reserve chromatic accents for meaning, focus, and feedback. Keep
backgrounds, interactive fills, borders, and text distinct. Geist distinguishes
opaque gray from gray-alpha used where the background should show through;
avoid doubling translucent borders at intersections.
Reference: [Geist colors](https://vercel.com/geist/colors).

**Current implementation.** The palette switches primary actions from dark-on-light
to light-on-dark with a matching on-primary color; focus is blue. Light text and
surface values are overridden. Dark surfaces and most status/disabled colors still
come from Neus, so the full neutral Geist hierarchy is not implemented.

**Refactor gaps.** Map dark neutral surfaces, interactive states, and feedback
pairs. Input's shared focus-ring color is independent of the blue focus border.
Audit custom accent overrides rather than assuming the on-primary pair recalculates.

## Typography

**Target rules.** Use Geist Sans for interface text and Geist Mono for code and
technical identifiers. Separate heading, button, label, and copy roles; multiline
copy needs more leading than a compact label. Reference:
[Geist typography](https://vercel.com/geist/typography).
Local policy: avoid uppercase styling for ordinary actions and navigation.

**Current implementation.** The system declares Geist/Geist Mono with fallbacks,
without loading font files. Buttons use medium-weight 14px text; Input also uses
14px values. The remaining numerical type scale is inherited from Neus.

**Refactor gaps.** Add semantic type-role mappings with line-height and tracking.
Fallback font metrics and aligned numeric data require review; the existing stack
does not automatically implement every Geist text style.

## Layout

**Target rules.** Local product-layout policy: use consistent columns, aligned
form fields, and economical spacing. Keep dense metadata readable and separate
sections through headings and spacing. Marketing grids and large display text
must not determine the density of routine application controls.

**Current implementation.** Input uses compact padding; Card slots and the shared
four-pixel spacing scale remain. Sidebar uses Neus's desktop panel, tablet rail,
and mobile dialog. These breakpoints are not a Geist layout contract.

**Refactor gaps.** Map form/table density consistently and review narrow containers,
wrapping action groups, long identifiers, and touch targets. Do not solve overflow
by shrinking all interface text.

## Elevation & Depth

**Target rules.** Select a material according to its place in the hierarchy: quiet
resting content, raised content, and floating overlays have different needs.
Choose the least elevation that remains legible and preserve separation in dark
mode. Reference: [Geist materials](https://vercel.com/geist/materials).

**Current implementation.** Button and Card have no resting shadow. Card and
Sidebar rely on subtle borders; sidebar controls remove the inherited shadow.
Input adds a shared focus shadow.

**Refactor gaps.** Establish explicit floating material mappings for menus and
dialogs. Do not infer a complete material hierarchy from the current flat Card.
Focus and overlay semantics remain responsibilities of the shared components.

## Shapes

**Target rules.** Small corner radii suit everyday surfaces and controls; larger
floating surfaces can use a different material radius. Geist's material presets
combine radius with fill, stroke, and shadow, rather than choosing each in isolation.
Reference: [Geist materials](https://vercel.com/geist/materials).

**Current implementation.** Button, Card, Input, and Sidebar items use 6px corners;
the Neus sidebar decoration is disabled. This uniform baseline covers only the
currently adapted components.

**Refactor gaps.** Map overlay and larger-surface geometry when adapting them.
Do not force the 6px control radius onto every future dialog or menu.

## Components

### Button

**Target rules.** Local mapping informed by [Geist Button](https://vercel.com/geist/button):
use a strong neutral solid action, quieter outlined/text alternatives, concise
labels, and consistent sizes. Keep hover, press, keyboard focus, disabled, and
loading states legible without decorative motion.

**Current implementation.** [Button recipe](./button.css): 6px corners, medium
natural-case label, no shadow. Shared CSS provides variant state colors, blue
focus outline, and disabled treatment. Loading disables activation and replaces
the label with busy dots. The primary fill/text pair changes with the mode.

**Refactor gaps.** Review derived dark hover/active colors, semantic variants,
disabled roles, and loading width. Neus variants and size names do not establish
complete Geist Button API or visual parity.

### Card

**Target rules.** Local mapping: use a base content surface with a quiet boundary
and deliberate internal spacing. Let headers, body text, and child actions provide
hierarchy. Choose elevation only when the surrounding layout requires it.

**Current implementation.** [Card recipe](./card.css): 6px corners, subtle border,
no shadow or header divider. Shared slots supply spacing and clipped media; semantic
foreground/background follow the selected mode.

**Refactor gaps.** Dark-mode surfaces still inherit Neus rather than a mapped Geist
material. Card remains passive: focus, errors, and loading belong to content or
child controls, not a container-wide interaction state.

### Input

**Target rules.** Local mapping informed by [Geist Input](https://vercel.com/geist/input):
keep compact geometry, a clear label/value hierarchy, a quiet resting border,
visible focus, and explicit validation feedback. Read-only values remain readable.

**Current implementation.** [Input recipe](./input.css): 6px corners, compact
padding, neutral values, aligned labels, subtle border, and blue focus border with
a shared shadow. The component supplies associated error text and native disabled
and read-only behavior.

**Refactor gaps.** Map focus/error rings and disabled surfaces to both Geist modes.
Read-only has no dedicated recipe. Input prefixes, suffixes, and other Geist features
are not supplied by this visual adaptation; API additions require separate work.

### Sidebar

**Target rules.** Local navigation mapping: a neutral panel with aligned labels,
quiet separators, understated hover, and a clear current-location treatment.
Keyboard focus must be identifiable even on a selected item.

**Current implementation.** [Sidebar recipe](./sidebar.css): neutral panel,
rounded rows, header separator, tinted selection, and blue focus. Shared behavior
provides the rail and mobile dialog; controls have no shadow.

**Refactor gaps.** Review selected-state contrast and inherited dark surfaces.
The component is Neus navigation styled toward Geist, not an official Geist Sidebar
implementation. Keep errors/progress separate from current-location state.

### Extension to other families — pending adaptation

- Selection and date/time controls: use compact neutral fields, clear selection,
  and explicit focus/error states consistent with Input.
- DataTable and calendars: align labels and values, reserve mono for technical
  content, and distinguish muted metadata from disabled information.
- Modal and menus: choose a floating material and appropriate focus treatment;
  do not copy a flat Card unchanged into every overlay.
- Badge and Stepper: use restrained semantic accents with text or shape cues.
- Templates: compose clear product regions without importing marketing decoration.

## Do's and Don'ts

- Do choose typography and surface roles before tuning individual pixel values.
- Do verify neutral separation, selection, and focus in both themes.
- Do draw shared boundaries once and preserve readable supporting text.
- Don't equate monochrome controls and 6px corners with full Geist support.
- Don't use promotional gradients or display typography as default product chrome.
- Don't claim unimplemented component APIs or a complete material/token scale.
