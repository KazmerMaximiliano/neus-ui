# Neobrutalism — Neus UI design

## Overview

**Target rules.** Make structure visible: strong outlines, flat vivid accents,
hard offset shadows, bold action labels, and direct feedback. The interface should
feel energetic and tangible while remaining orderly enough for forms and data.
All aesthetic rules here are Neus UI project decisions. This recipe does not claim
an official or universal neobrutalism standard.

**Current implementation.** All public component families and both templates now
have scoped CSS token contracts and six-system recipes. Button, Card and Input
share the expanded presentation API described below. This is the project's web
mapping, not full feature parity with an external component framework.

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

**Current implementation.** Semantic surfaces, text, selection, field/layer and feedback roles are
mapped in the scoped tokens and palettes. Light/dark values preserve role pairs.
Solid action foregrounds are resolved per state; custom six-digit hex primary
accents also receive readable text/focus mappings. These local roles do not provide
a complete external theme matrix or a full dynamic tonal color engine.

**Validation boundary.** Consumer-supplied CSS foreground/background overrides and arbitrary non-hex
accent formats are outside the automatic contrast contract.

## Typography

**Target rules.** Use Inter with sans-serif fallbacks for interface text; reserve
JetBrains Mono for code and identifiers. Use heavy labels for short actions, but
regular text for paragraphs, values, and dense data. Keep headings concise and
avoid making every text element uppercase.

**Current implementation.** Font stacks remain declared locally without downloaded assets. Body,
heading, label and caption roles include size, weight, line height and tracking.
Component-specific sizes remain deliberate local mappings, not a claim that the
entire external typography catalog has been implemented.

**Validation boundary.** Use local fallback fonts and review application content at zoom and with
long translations; font asset loading belongs to the consuming application.

## Layout

**Target rules.** Use a regular alignment grid and generous separation between
independent objects. Budget space for offset shadows so adjacent controls do not
collide. Keep dense data internally calm; the surrounding structure supplies the
visual energy. Wrap action groups before reducing readable content.

**Current implementation.** AppTemplate and FormTemplate now map page-region spacing and responsive
columns through recipes. AppTemplate follows Sidebar at 768/1024px; FormTemplate
uses 2/2/1 columns by default with independent gap/region overrides. Components keep
readable internal geometry; week grids and tables retain horizontal navigation
where their data cannot fit a narrow viewport.

**Validation boundary.** The shared breakpoints are Neus web choices. Application page compositions
and specialized external grid systems remain consumer decisions.

## Elevation & Depth

**Target rules.** Use crisp offset shadows to imply physical layers; avoid blur and
gradient lighting. Pressing an action should visibly reduce its apparent lift.
Do not animate passive content simply because it has a shadow. Preserve focus
independently of shadow and suppress nonessential motion when requested.

**Current implementation.** Floating and dialog elevation roles map the existing overlay and modal
recipes. Ordinary surfaces and action variants have separate treatments; Card
stays passive, Button reserves elevation for its explicit treatment where required,
and reduced-motion rules suppress nonessential transitions. Neobrutalism retains
hard shadows with clearance in fields, cards and template spacing.

**Validation boundary.** Nested surfaces and custom scroll containers must preserve focus and shadow
clearance; the library cannot control clipping imposed by consumer overflow rules.

## Shapes

**Target rules.** Use nearly square rectangles with a small consistent radius,
strong edges, and clear internal padding. Reserve circles for avatars or inherent
symbols. Avoid Neus pill controls and ornamental concave curves in this system.

**Current implementation.** Every adapted family has its own radius/border contract, including nested
selectors, calendars, overlays, maps and tables. Neus keeps its navigation curves;
other systems disable that decoration. Media clipping and focus remain separate
from surface geometry. Explicit presentation variants have recipes in all systems.

**Validation boundary.** Recipe geometry expresses the documented local web target. Native platform
rendering and additional interactive surface types are separate capabilities.

## Components

### Button

**Target rules.** A solid yellow action is the primary affordance; reduce emphasis
for supporting actions without sacrificing legibility. Keep keyboard focus visible
outside the heavy frame. Pressed feedback changes depth, and loading must remain
identifiable without layout jumps.

**Current implementation.** [Button recipe](./button.css) maps solid, secondary, tonal, elevated,
outlined and text actions. Carbon uses primary/secondary/tertiary/ghost hierarchy
for solid/secondary/outlined/text; Material reserves resting elevation for elevated.
The shared implementation reserves the idle label box while busy. Semantic and
custom hex accent foregrounds are resolved for resting, hover and pressed fills.

**Refactor boundaries.** Six shared variants express the supported action hierarchy. System-specific
native APIs and additional interaction patterns remain outside this contract.

### Card

**Target rules.** Frame a coherent content group with one strong outline and hard
offset shadow. Keep internal content uncluttered; do not add another heavy frame
around every slot. The surface stays passive even when it resembles a physical tile.

**Current implementation.** [Card recipe](./card.css) keeps the root passive. `variant="auto"`
uses this system's existing treatment; filled, outlined and elevated can be chosen
explicitly in all six systems. Header/Content/Footer keep independent spacing;
media clips inside the surface and child controls own interactions.

**Refactor boundaries.** The root remains passive. Selection, expansion, loading, errors and keyboard
actions belong to meaningful child content and controls.

### Input

**Target rules.** Use a framed field with a persistent, aligned label. Keep entered
text calm and legible. Focus changes a recognizable boundary; error text explains
the problem while focus remains apparent. Read-only must remain readable.

**Current implementation.** [Input recipe](./input.css) supplies field geometry and state roles.
The shared anatomy supports auto/filled/outlined, small/medium/large,
auto/external/floating labels, prefix/suffix content and an optional error icon.
Auto uses a floating outlined field in Material and external labels elsewhere.
Focused, populated, prefixed and native color fields keep floating labels raised.
Errors stay associated with the native input; readonly remains distinct from disabled.

**Refactor boundaries.** Prefixes/suffixes and floating labels do not introduce masks, autocomplete
providers or other application behavior. Native input semantics remain in use.

### Sidebar

**Target rules.** Present navigation as a clearly framed region with compact,
outlined rows. Use a filled yellow item for current location and preserve a separate
focus outline. Keep hover quieter than selection.

**Current implementation.** [Sidebar recipe](./sidebar.css): heavy outer border,
hard shadow, bordered rows, bold natural-case labels, yellow selection with dark
text, and square-ish controls. In dark mode rows use a quieter outline so the panel
frame stays dominant. Shared rail and mobile dialog behavior remains.

**Refactor boundaries.** Desktop/rail/mobile behavior is shared Neus navigation. Native-platform grouped
sidebars and external framework navigation parity are separate capabilities.

### Other component families and templates

- Base and Navigation retain their interaction APIs and have explicit recipes for
  fields, nested controls, feedback, floating surfaces, keyboard focus and selection.
- Calendar separates single/range/multiple values; `numberOfMonths` controls visible
  months. Clock keeps the period synchronized with controlled time. Dial labels
  stay above the hand, with contrasting ink clipped to the indicator tip for
  partially covered marks. DateInput and TimeInput share field presentations and
  offer panel overrides.
- WeekCalendar and WeekCalendarRow share a token family, a seven-day window with
  one-day navigation, keyboard event activation and tooltips on focus or hover.
- InteractiveMap adapts the Neus interface; `mapOptions` configures Google cartography.
  Readonly blocks selection and marker changes. Maps SDK and geocoding failures
  surface as errors; obsolete asynchronous responses are ignored.
- DataTable preserves AG Grid Community. A stable theme bridge resolves
  `--data-table-*` in the nearest provider. Columns and optional mobile cards belong
  to the consumer; actions are documented composition rather than a public component.
- AppTemplate shares Sidebar's breakpoints; its regions use layout tokens.
  FormTemplate exposes responsive columns and gaps and accepts arbitrary children.

## Do's and Don'ts

- Do preserve shadow clearance and test every interaction in both color modes.
- Do separate bold labels from readable body text and values.
- Do verify yellow text/outline contrast instead of extrapolating from solid actions.
- Don't use blur, glossy gradients, or rounded pills as default treatments.
- Don't apply a thick border and shadow to every nested object.
- Don't present this project vocabulary as a canonical external standard.

Local implementation update: 2026-10-15. See the
[migration and validation guide](../../../docs/refactor-migration.md) for public
API changes, test coverage and limits of this web adaptation. Visual review is
against these local target rules; claims of native or complete framework parity
remain outside the contract.
