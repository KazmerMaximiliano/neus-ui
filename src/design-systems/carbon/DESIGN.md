# Carbon — Neus UI target

## Overview

**Target rules.** Aim for Carbon's disciplined enterprise interface: clear task
hierarchy, precise alignment, square geometry, and purposeful color. Prioritize
repeated data and form workflows. Use the official Carbon foundations and Core
component specifications as the visual target, preserving Neus UI's React API.

**Current implementation.** Four recipes approximate Carbon: Button, Card, Input,
and Sidebar. They do not implement Carbon's complete theme or component system.

Format: [Google DESIGN.md](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)
(alpha, prose only). Primary references consulted 2026-10-14:
[themes](https://www.carbondesignsystem.com/building-blocks/foundations/themes/overview),
[color layering](https://www.carbondesignsystem.com/building-blocks/foundations/color/guidelines),
[typography](https://www.carbondesignsystem.com/building-blocks/foundations/typography/overview),
and the component specifications linked below. Any Neus mapping is a local decision.

Implemented values live in [tokens](./tokens.css), [palettes](../palettes.ts),
[shared defaults](../../css/variables.css), and component recipes. Follow the
[architecture guide](../../../docs/design-systems.md) when extending them.

## Colors

**Target rules.** Use neutral foundations with blue actions and explicit feedback
roles. Nested surfaces, fields, and borders must belong to a coherent layer set;
moving a control to another layer must preserve its contrast. Carbon's
[layering guidance](https://www.carbondesignsystem.com/building-blocks/foundations/color/guidelines)
provides the reference. Use White as the initial light target and Gray 100 as the
dark target; these are local choices among Carbon's
[themes](https://www.carbondesignsystem.com/building-blocks/foundations/themes/overview).

**Current implementation.** Light tokens supply white/gray surfaces and neutral
text. The action palette supplies blue actions and Carbon-oriented error colors.
Dark surfaces and most feedback/disabled roles still inherit Neus. Two shared
surface tokens do not implement Carbon's nested layer model.

**Refactor gaps.** Introduce mapped layer/field/border roles during future work;
review foregrounds, focus, hover, active, and disabled pairs in each mode. Do not
equate the inherited dark theme with Gray 100 or advertise all four Carbon themes.

## Typography

**Target rules.** Use IBM Plex Sans for interface text and Plex Mono for code or
identifiers, with local fallbacks. Favor the task-oriented hierarchy described in
[Carbon typography](https://www.carbondesignsystem.com/building-blocks/foundations/typography/overview).
Use natural sentence case, clear labels, and consistent alignment for repeated data.

**Current implementation.** Font stacks are supplied, not downloaded. Button uses
regular-weight 14px medium labels; Input also uses 14px values. Sidebar overrides
Neus uppercase/tracking. Other text sizes remain on the shared scale.

**Refactor gaps.** Map semantic body, heading, label, and helper roles, including
line height. Do not call the shared numerical scale Carbon's complete type scale.

## Layout

**Target rules.** Align forms, data regions, and action groups to consistent columns.
Use deliberate section spacing and compact, readable controls. Field widths should
reflect expected content while fitting the responsive layout, as recommended in
[Carbon forms](https://www.carbondesignsystem.com/building-blocks/core/patterns/forms).

**Current implementation.** The shared four-pixel spacing scale and Card padding
remain. Buttons have asymmetric horizontal padding and left-aligned labels.
Sidebar uses the library's desktop, tablet rail, and mobile drawer breakpoints.

**Refactor gaps.** Establish a template-level column/grid mapping and consistent
field heights. Shared breakpoints and paddings are local approximations, not an
implementation of the full Carbon layout system.

## Elevation & Depth

**Target rules.** Prefer layers, borders, and alignment over ornamental shadows.
Reserve floating depth for menus and dialogs. A focused control must remain
recognizable against the surface beneath it.

**Current implementation.** Button and Card are flat. Card uses the secondary
surface; Sidebar uses separators and square items. The floating sidebar control
still inherits a shared shadow.

**Refactor gaps.** Review floating controls as a separate elevation role. Nested
layer contrast must work in dark mode without adding arbitrary shadows to tiles.

## Shapes

**Target rules.** Use square corners for ordinary fields, actions, tiles, and
navigation rows. Keep circles for intrinsically circular content such as avatars.
Avoid mixing rounded Neus controls into a Carbon form.

**Current implementation.** All four recipes remove their main rounded geometry;
Sidebar also disables the Neus decorative curve.

**Refactor gaps.** Remaining components need explicit shape adaptation. A square
outer wrapper alone does not adapt an embedded selector or calendar.

## Components

### Button

**Target rules.** Preserve the label alignment and action hierarchy of
[Carbon buttons](https://www.carbondesignsystem.com/building-blocks/core/components/button/specifications).
Use separate hover, active, focus, and disabled treatments; focus needs a boundary
that remains visible against the button fill.

**Current implementation.** [Button recipe](./button.css): square, asymmetric
padding, regular labels, flat surface. The light palette defines distinct blue
hover/active colors. Shared CSS supplies an external focus outline and three
variants; loading substitutes dots and disables activation.

**Refactor gaps.** The external focus outline differs from Carbon's border/inset
focus treatment. Secondary/tertiary/ghost hierarchy and disabled roles are not a
one-to-one mapping of Neus variants. Review dark-state pairs and loading geometry.

### Card

**Target rules.** Treat the passive Card as a simple tile: a rectangular layer for
related information. Consult [Carbon tile specifications](https://www.carbondesignsystem.com/building-blocks/core/components/tile/specifications)
for the visual reference; interactive tile types require separate behavior design.

**Current implementation.** [Card recipe](./card.css): square, borderless secondary
surface with no shadow or header divider. Content and footer spacing are inherited.

**Refactor gaps.** Correct nested surface layering in both themes. Do not add
selectable, expandable, hover, or loading states to the passive root merely because
Carbon offers other tile types. Child controls own focus and errors.

### Input

**Target rules.** Follow [Carbon text-input specifications](https://www.carbondesignsystem.com/building-blocks/core/components/text-input/specifications)
for field geometry and focus, and [validation guidance](https://www.carbondesignsystem.com/building-blocks/core/components/text-input/guidelines)
for invalid feedback. Keep labels and messages aligned; distinguish read-only,
disabled, invalid, and focused states.

**Current implementation.** [Input recipe](./input.css): square field, secondary
surface, external label, full perimeter border, and shared focus/error shadows.
The component has error text and native read-only behavior, but no error icon.

**Refactor gaps.** The full border and generic ring differ from Carbon's field
underline/focus treatment. Layer-aware field colors, error icon treatment,
read-only styling, and Carbon size roles remain pending. Verify invalid focus
and disabled contrast in both themes.

### Sidebar

**Target rules.** Local mapping: build an orderly, quiet navigation shell with
square rows, consistent label alignment, and a persistent current-location cue.
Keep keyboard focus distinct from selection and hover.

**Current implementation.** [Sidebar recipe](./sidebar.css): secondary surface,
row/header separators, solid blue selected row, on-primary selected text, and
square controls. Shared behavior supplies the rail and mobile dialog.

**Refactor gaps.** Review selected-state emphasis against Carbon shell patterns
before claiming parity. Shared dimensions, mobile behavior, and solid selection
are local choices. Validate focus on selected rows in light/dark; communicate
errors/progress separately from navigation selection.

### Extension to other families — pending adaptation

- Selection and date/time controls: share field layers, square geometry, and
  explicit invalid/read-only states with Input.
- DataTable and calendars: prioritize aligned data, compact rows, and distinct
  selection, hover, and focus; preserve third-party grid behavior.
- Modal and menus: map floating layers and focus boundaries rather than adding
  rounded cards with generic shadows.
- Badge and Stepper: communicate status using labels/icons and restrained color.
- Templates: align headings, form regions, tables, and action groups consistently.

## Do's and Don'ts

- Do review layer relationships as well as standalone component colors.
- Do use Plex fallbacks, natural labels, square geometry, and consistent alignment.
- Do verify all states in light/dark and nested provider scopes.
- Don't describe a blue accent and square corners as complete Carbon support.
- Don't map Neus variants to Carbon names without checking their behavior and roles.
- Don't add new public states or Carbon dependencies as an incidental visual change.
