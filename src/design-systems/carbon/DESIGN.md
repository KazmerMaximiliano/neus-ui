# Carbon — Neus UI target

## Overview

**Target rules.** Aim for Carbon's disciplined enterprise interface: clear task
hierarchy, precise alignment, square geometry, and purposeful color. Prioritize
repeated data and form workflows. Use the official Carbon foundations and Core
component specifications as the visual target, preserving Neus UI's React API.

**Current implementation.** All public component families and both templates now
have scoped CSS token contracts and six-system recipes. Button, Card and Input
share the expanded presentation API described below. This is the project's web
mapping, not full feature parity with an external component framework.

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

**Current implementation.** Semantic surfaces, text, selection, field/layer and feedback roles are
mapped in the scoped tokens and palettes. Light/dark values preserve role pairs.
Solid action foregrounds are resolved per state; custom six-digit hex primary
accents also receive readable text/focus mappings. These local roles do not provide
a complete external theme matrix or a full dynamic tonal color engine.
Carbon maps White and Gray 100, including nested layer-02 surfaces.

**Validation boundary.** Consumer-supplied CSS foreground/background overrides and arbitrary non-hex
accent formats are outside the automatic contrast contract.

## Typography

**Target rules.** Use IBM Plex Sans for interface text and Plex Mono for code or
identifiers, with local fallbacks. Favor the task-oriented hierarchy described in
[Carbon typography](https://www.carbondesignsystem.com/building-blocks/foundations/typography/overview).
Use natural sentence case, clear labels, and consistent alignment for repeated data.

**Current implementation.** Font stacks remain declared locally without downloaded assets. Body,
heading, label and caption roles include size, weight, line height and tracking.
Component-specific sizes remain deliberate local mappings, not a claim that the
entire external typography catalog has been implemented.

**Validation boundary.** Use local fallback fonts and review application content at zoom and with
long translations; font asset loading belongs to the consuming application.

## Layout

**Target rules.** Align forms, data regions, and action groups to consistent columns.
Use deliberate section spacing and compact, readable controls. Field widths should
reflect expected content while fitting the responsive layout, as recommended in
[Carbon forms](https://www.carbondesignsystem.com/building-blocks/core/patterns/forms).

**Current implementation.** AppTemplate and FormTemplate now map page-region spacing and responsive
columns through recipes. AppTemplate follows Sidebar at 768/1024px; FormTemplate
uses 2/2/1 columns by default with independent gap/region overrides. Components keep
readable internal geometry; week grids and tables retain horizontal navigation
where their data cannot fit a narrow viewport.

**Validation boundary.** The shared breakpoints are Neus web choices. Application page compositions
and specialized external grid systems remain consumer decisions.

## Elevation & Depth

**Target rules.** Prefer layers, borders, and alignment over ornamental shadows.
Reserve floating depth for menus and dialogs. A focused control must remain
recognizable against the surface beneath it.

**Current implementation.** Floating and dialog elevation roles map the existing overlay and modal
recipes. Ordinary surfaces and action variants have separate treatments; Card
stays passive, Button reserves elevation for its explicit treatment where required,
and reduced-motion rules suppress nonessential transitions. Neobrutalism retains
hard shadows with clearance in fields, cards and template spacing.

**Validation boundary.** Nested surfaces and custom scroll containers must preserve focus and shadow
clearance; the library cannot control clipping imposed by consumer overflow rules.

## Shapes

**Target rules.** Use square corners for ordinary fields, actions, tiles, and
navigation rows. Keep circles for intrinsically circular content such as avatars.
Avoid mixing rounded Neus controls into a Carbon form.

**Current implementation.** Every adapted family has its own radius/border contract, including nested
selectors, calendars, overlays, maps and tables. Neus keeps its navigation curves;
other systems disable that decoration. Media clipping and focus remain separate
from surface geometry. Explicit presentation variants have recipes in all systems.

**Validation boundary.** Recipe geometry expresses the documented local web target. Native platform
rendering and additional interactive surface types are separate capabilities.

## Components

### Button

**Target rules.** Preserve the label alignment and action hierarchy of
[Carbon buttons](https://www.carbondesignsystem.com/building-blocks/core/components/button/specifications).
Use separate hover, active, focus, and disabled treatments; focus needs a boundary
that remains visible against the button fill.

**Current implementation.** [Button recipe](./button.css) maps solid, secondary, tonal, elevated,
outlined and text actions. Carbon uses primary/secondary/tertiary/ghost hierarchy
for solid/secondary/outlined/text; Material reserves resting elevation for elevated.
The shared implementation reserves the idle label box while busy. Semantic and
custom hex accent foregrounds are resolved for resting, hover and pressed fills.

**Refactor boundaries.** Six shared variants express the supported action hierarchy. System-specific
native APIs and additional interaction patterns remain outside this contract.

### Card

**Target rules.** Treat the passive Card as a simple tile: a rectangular layer for
related information. Consult [Carbon tile specifications](https://www.carbondesignsystem.com/building-blocks/core/components/tile/specifications)
for the visual reference; interactive tile types require separate behavior design.

**Current implementation.** [Card recipe](./card.css) keeps the root passive. `variant="auto"`
uses this system's existing treatment; filled, outlined and elevated can be chosen
explicitly in all six systems. Header/Content/Footer keep independent spacing;
media clips inside the surface and child controls own interactions.

**Refactor boundaries.** The root remains passive. Selection, expansion, loading, errors and keyboard
actions belong to meaningful child content and controls.

### Input

**Target rules.** Follow [Carbon text-input specifications](https://www.carbondesignsystem.com/building-blocks/core/components/text-input/specifications)
for field geometry and focus, and [validation guidance](https://www.carbondesignsystem.com/building-blocks/core/components/text-input/guidelines)
for invalid feedback. Keep labels and messages aligned; distinguish read-only,
disabled, invalid, and focused states.

**Current implementation.** [Input recipe](./input.css) supplies field geometry and state roles.
The shared anatomy supports auto/filled/outlined, small/medium/large,
auto/external/floating labels, prefix/suffix content and an optional error icon.
Auto uses a floating outlined field in Material and external labels elsewhere.
Focused, populated, prefixed and native color fields keep floating labels raised.
Errors stay associated with the native input; readonly remains distinct from disabled.

**Refactor boundaries.** Prefixes/suffixes and floating labels do not introduce masks, autocomplete
providers or other application behavior. Native input semantics remain in use.

### Sidebar

**Target rules.** Local mapping: build an orderly, quiet navigation shell with
square rows, consistent label alignment, and a persistent current-location cue.
Keep keyboard focus distinct from selection and hover.

**Current implementation.** [Sidebar recipe](./sidebar.css): secondary surface,
row/header separators, solid blue selected row, on-primary selected text, and
square controls. Shared behavior supplies the rail and mobile dialog.

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

- Do review layer relationships as well as standalone component colors.
- Do use Plex fallbacks, natural labels, square geometry, and consistent alignment.
- Do verify all states in light/dark and nested provider scopes.
- Don't describe a blue accent and square corners as complete Carbon support.
- Don't map Neus variants to Carbon names without checking their behavior and roles.
- Don't add new public states or Carbon dependencies as an incidental visual change.

Local implementation update: 2026-10-15. See the
[migration and validation guide](../../../docs/refactor-migration.md) for public
API changes, test coverage and limits of this web adaptation. Visual review is
against these local target rules; claims of native or complete framework parity
remain outside the contract.
