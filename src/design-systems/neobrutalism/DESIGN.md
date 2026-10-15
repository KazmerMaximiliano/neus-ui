# Neobrutalism — Neus UI design

## Overview

**Target rules.** Make structure visible: strong outlines, flat vivid accents,
hard offset shadows, bold action labels, and direct feedback. The interface should
feel energetic and tangible while remaining orderly enough for forms and data.
All aesthetic rules here are Neus UI project decisions. This recipe does not claim
an official or universal neobrutalism standard.

**Current implementation.** Button, Card, Input, and Sidebar share a yellow accent,
dark ink in light mode, strong borders, small radii, and hard shadows. Other
components retain existing styles and are not yet adapted to this vocabulary.

Format reference, consulted 2026-10-14:
[Google DESIGN.md](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)
(alpha, prose only). Primary design evidence is this repository's
[tokens](./tokens.css), [palettes](../palettes.ts), and component recipes linked
below, reviewed 2026-10-14. [Shared defaults](../../css/variables.css) remain the
fallback. See the [architecture guide](../../../docs/design-systems.md).

## Colors

**Target rules.** Use yellow for important actions and selected navigation, with
dark on-accent text. Keep content surfaces quiet so saturated accents remain
meaningful. Use a contrasting focus color distinct from selection. Errors need
explicit text and a boundary change, not color alone.

**Current implementation.** The yellow primary and dark on-primary pair are shared
across modes. Light surfaces are off-white with dark blue-gray text. Focus is
purple, with a lighter dark-mode alternative. Dark surfaces, neutral text, and
most status roles inherit Neus. Borders and hard shadows often use
`--color-text-primary`, becoming light in dark mode.

**Refactor gaps.** Review yellow outlined/text buttons on light surfaces and every
semantic action pair; a legible solid button does not guarantee a legible text
variant. Audit dark-mode outlines/shadows as deliberate contrast, not accidental
glow. Custom accents do not automatically recalculate the on-accent pair.

## Typography

**Target rules.** Use Inter with sans-serif fallbacks for interface text; reserve
JetBrains Mono for code and identifiers. Use heavy labels for short actions, but
regular text for paragraphs, values, and dense data. Keep headings concise and
avoid making every text element uppercase.

**Current implementation.** Font stacks are declared without loading fonts.
Button uses weight 800 and retains uppercase labels, with normal tracking.
Sidebar uses weight 700 and natural case. Input values use regular 14px text.
The remaining size scale is shared.

**Refactor gaps.** Define heading/body/caption roles and review heavy-weight fallback
metrics. Validate long button labels, zoom, and compact navigation without squeezing
text or introducing arbitrary font sizes.

## Layout

**Target rules.** Use a regular alignment grid and generous separation between
independent objects. Budget space for offset shadows so adjacent controls do not
collide. Keep dense data internally calm; the surrounding structure supplies the
visual energy. Wrap action groups before reducing readable content.

**Current implementation.** Shared spacing primitives and Card slot padding remain.
Button sizes have proportional padding; Sidebar uses shared desktop/rail/mobile
behavior. Hard shadows extend beyond component bounds without reserving layout space.

**Refactor gaps.** Check shadow clearance in forms, Card footers, scroll containers,
and narrow viewports. Input still has the shared minimum width. Responsive spacing
must account for decorative extents as well as the border box.

## Elevation & Depth

**Target rules.** Use crisp offset shadows to imply physical layers; avoid blur and
gradient lighting. Pressing an action should visibly reduce its apparent lift.
Do not animate passive content simply because it has a shadow. Preserve focus
independently of shadow and suppress nonessential motion when requested.

**Current implementation.** Button/Card/Input and the navigation panel use hard
offset shadows. A pressed button translates toward a smaller shadow. Focus on an
Input keeps a hard shadow rather than adding a soft halo.

**Refactor gaps.** Shared reduced-motion CSS removes transitions, not the Button
pressed translation. Decide that suppression in the future shared state contract.
Check clipping and contrast of the hard shadow in dark mode and nested surfaces.

## Shapes

**Target rules.** Use nearly square rectangles with a small consistent radius,
strong edges, and clear internal padding. Reserve circles for avatars or inherent
symbols. Avoid Neus pill controls and ornamental concave curves in this system.

**Current implementation.** The four adapted component families use 4px main
radii; Button, Card, Input, and the sidebar panel have strong borders. Navigation
rows have a thinner border than the outer panel. Neus decoration is disabled.

**Refactor gaps.** Adapt the remaining selectors and feedback components explicitly.
Maintain inner media clipping without adding a second heavy border at every seam.

## Components

### Button

**Target rules.** A solid yellow action is the primary affordance; reduce emphasis
for supporting actions without sacrificing legibility. Keep keyboard focus visible
outside the heavy frame. Pressed feedback changes depth, and loading must remain
identifiable without layout jumps.

**Current implementation.** [Button recipe](./button.css): 3px border, 4px radius,
hard shadow, bold uppercase label, and pressed translation. The shared text variant
removes border/shadow; the outlined variant uses its accent as the border color.
Shared behavior supplies focus, disabled styling, and a busy dot loader.

**Refactor gaps.** Text/outlined primary contrast, semantic colors, loading size,
and reduced-motion translation need review. Disabled buttons retain geometry and
shadow with shared muted colors/opacity; verify they no longer suggest availability.

### Card

**Target rules.** Frame a coherent content group with one strong outline and hard
offset shadow. Keep internal content uncluttered; do not add another heavy frame
around every slot. The surface stays passive even when it resembles a physical tile.

**Current implementation.** [Card recipe](./card.css): 3px border, 4px corners,
hard shadow, and no header divider. Shared semantic text/background support both
modes; slot spacing and clipped media remain unchanged.

**Refactor gaps.** Check outer-shadow clipping and border contrast in dark mode.
Hover, error, loading, and focus belong to meaningful children rather than invented
Card states. Footer controls need enough separation for their own shadows.

### Input

**Target rules.** Use a framed field with a persistent, aligned label. Keep entered
text calm and legible. Focus changes a recognizable boundary; error text explains
the problem while focus remains apparent. Read-only must remain readable.

**Current implementation.** [Input recipe](./input.css): 3px border, 4px radius,
hard shadow, neutral values, purple focus border, and error border/message. Invalid
focus changes the hard shadow to the error color. Native disabled/read-only
behavior comes from the shared component; disabled styling removes the shadow.

**Refactor gaps.** Review the combined error/focus appearance in both modes.
Read-only lacks a dedicated recipe, and semantic error colors still inherit Neus.
Avoid letting the strong border outweigh the value or error message.

### Sidebar

**Target rules.** Present navigation as a clearly framed region with compact,
outlined rows. Use a filled yellow item for current location and preserve a separate
focus outline. Keep hover quieter than selection.

**Current implementation.** [Sidebar recipe](./sidebar.css): heavy outer border,
hard shadow, bordered rows, bold natural-case labels, yellow selection with dark
text, and square-ish controls. Shared rail and mobile dialog behavior remains.

**Refactor gaps.** Check rail focus clearance, mobile shadow clipping, and dark-mode
outline intensity. Keep loading/error content separate from current-location
state; do not indicate a failure by recoloring the selected destination alone.

### Extension to other families — pending adaptation

- Selection and date/time controls: use strong frames and explicit check/selection
  marks; preserve legible values and clear invalid focus.
- DataTable and calendars: emphasize the outer boundary and selected cells; avoid
  adding thick borders and offset shadows to every data cell.
- Modal and menus: use hard-edged floating surfaces, with enough room for shadows
  and visible focus inside overlays.
- Badge and Stepper: combine bold shape with readable text or state symbols.
- Templates: balance expressive boundaries with a stable grid and quiet reading areas.

## Do's and Don'ts

- Do preserve shadow clearance and test every interaction in both color modes.
- Do separate bold labels from readable body text and values.
- Do verify yellow text/outline contrast instead of extrapolating from solid actions.
- Don't use blur, glossy gradients, or rounded pills as default treatments.
- Don't apply a thick border and shadow to every nested object.
- Don't present this project vocabulary as a canonical external standard.
