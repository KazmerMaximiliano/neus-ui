# Material 3 — Neus UI target

## Overview

**Target rules.** Use Material 3 base as the visual target: clear action hierarchy,
semantic color pairs, tonal surfaces, purposeful shapes, and legible type roles.
The goal is a coherent product interface across forms, navigation, and content.
Material 3 Expressive is outside this baseline.

**Current implementation.** All public component families and both templates now
have scoped CSS token contracts and six-system recipes. Button, Card and Input
share the expanded presentation API described below. This is the project's web
mapping, not full feature parity with an external component framework.

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

**Current implementation.** Semantic surfaces, text, selection, field/layer and feedback roles are
mapped in the scoped tokens and palettes. Light/dark values preserve role pairs.
Solid action foregrounds are resolved per state; custom six-digit hex primary
accents also receive readable text/focus mappings. These local roles do not provide
a complete external theme matrix or a full dynamic tonal color engine.
Material includes tertiary/on-tertiary and the surface-container hierarchy.

**Validation boundary.** Consumer-supplied CSS foreground/background overrides and arbitrary non-hex
accent formats are outside the automatic contrast contract.

## Typography

**Target rules.** Organize text into display, headline, title, body, and label
roles, with size variants. Use body roles for reading and label roles for actions,
following [M3 applying type](https://m3.material.io/styles/typography/applying-type).
Local baseline: prefer Roboto for both body and display, with sans-serif fallbacks;
keep labels in natural case and preserve hierarchy at narrow widths.

**Current implementation.** Font stacks remain declared locally without downloaded assets. Body,
heading, label and caption roles include size, weight, line height and tracking.
Component-specific sizes remain deliberate local mappings, not a claim that the
entire external typography catalog has been implemented.

**Validation boundary.** Use local fallback fonts and review application content at zoom and with
long translations; font asset loading belongs to the consuming application.

## Layout

**Target rules.** Local web mapping: use a consistent spacing rhythm, align field
groups, and let content determine responsive composition. Preserve usable targets
and text before reducing whitespace. Navigation may change presentation with
available width while retaining the same destinations.

**Current implementation.** AppTemplate and FormTemplate now map page-region spacing and responsive
columns through recipes. AppTemplate follows Sidebar at 768/1024px; FormTemplate
uses 2/2/1 columns by default with independent gap/region overrides. Components keep
readable internal geometry; week grids and tables retain horizontal navigation
where their data cannot fit a narrow viewport.

**Validation boundary.** The shared breakpoints are Neus web choices. Application page compositions
and specialized external grid systems remain consumer decisions.

## Elevation & Depth

**Target rules.** Use tonal separation to distinguish surfaces; reserve stronger
depth for elevated or floating elements. Material's surface-container roles
provide a color hierarchy. Elevated buttons should be used selectively rather
than giving every action a shadow. References:
[color roles](https://m3.material.io/styles/color/the-color-system/key-colors-tones)
and [Material Web buttons](https://github.com/material-components/material-web/blob/main/docs/components/button.md).

**Current implementation.** Floating and dialog elevation roles map the existing overlay and modal
recipes. Ordinary surfaces and action variants have separate treatments; Card
stays passive, Button reserves elevation for its explicit treatment where required,
and reduced-motion rules suppress nonessential transitions. Neobrutalism retains
hard shadows with clearance in fields, cards and template spacing.

**Validation boundary.** Nested surfaces and custom scroll containers must preserve focus and shadow
clearance; the library cannot control clipping imposed by consumer overflow rules.

## Shapes

**Target rules.** Local mapping: rounded actions and navigation indicators,
moderately rounded content surfaces, and restrained field corners. Shape should
identify a component's role; one radius should not be imposed on everything.

**Current implementation.** Every adapted family has its own radius/border contract, including nested
selectors, calendars, overlays, maps and tables. Neus keeps its navigation curves;
other systems disable that decoration. Media clipping and focus remain separate
from surface geometry. Explicit presentation variants have recipes in all systems.

**Validation boundary.** Recipe geometry expresses the documented local web target. Native platform
rendering and additional interactive surface types are separate capabilities.

## Components

### Button

**Target rules.** Distinguish filled, tonal, elevated, outlined, and text actions
by emphasis. Use filled for important completion actions and lower emphasis for
supporting actions, following [Material Web buttons](https://github.com/material-components/material-web/blob/main/docs/components/button.md).
Local requirement: loading must keep the action understandable and visually stable.

**Current implementation.** [Button recipe](./button.css) maps solid, secondary, tonal, elevated,
outlined and text actions. Carbon uses primary/secondary/tertiary/ghost hierarchy
for solid/secondary/outlined/text; Material reserves resting elevation for elevated.
The shared implementation reserves the idle label box while busy. Semantic and
custom hex accent foregrounds are resolved for resting, hover and pressed fills.

**Refactor boundaries.** Six shared variants express the supported action hierarchy. System-specific
native APIs and additional interaction patterns remain outside this contract.

### Card

**Target rules.** Local mapping: a quiet rounded container whose surface treatment
reflects its place in the tonal hierarchy. Keep the root passive; use child actions
for interaction. Filled, outlined and elevated treatments are explicit shared variants.

**Current implementation.** [Card recipe](./card.css) keeps the root passive. `variant="auto"`
uses this system's existing treatment; filled, outlined and elevated can be chosen
explicitly in all six systems. Header/Content/Footer keep independent spacing;
media clips inside the surface and child controls own interactions.

**Refactor boundaries.** The root remains passive. Selection, expansion, loading, errors and keyboard
actions belong to meaningful child content and controls.

### Input

**Target rules.** Material distinguishes filled and outlined fields and supports
floating or external labels and supporting/error text. The Neus M3 mapping uses integrated floating labels by default. Keep invalid
and focused treatments recognizable. Reference:
[Material Web text fields](https://github.com/material-components/material-web/blob/main/docs/components/text-field.md).

**Current implementation.** [Input recipe](./input.css) supplies field geometry and state roles.
The shared anatomy supports auto/filled/outlined, small/medium/large,
auto/external/floating labels, prefix/suffix content and an optional error icon.
Auto uses a floating outlined field in Material and external labels elsewhere.
Focused, populated, prefixed and native color fields keep floating labels raised.
Errors stay associated with the native input; readonly remains distinct from disabled.

**Refactor boundaries.** Prefixes/suffixes and floating labels do not introduce masks, autocomplete
providers or other application behavior. Native input semantics remain in use.

### Sidebar

**Target rules.** Local mapping: a tonal navigation container with rounded selected
indicators, readable labels, and clearly separate hover, current-location, and focus
states. Preserve destinations when changing between expanded and compact layouts.

**Current implementation.** [Sidebar recipe](./sidebar.css): surface-container
panel, rounded items, secondary-container selection with its on-color, no border,
and a small shadow. Shared behavior provides a desktop panel, tablet rail, and
mobile dialog.

**Refactor boundaries.** Desktop/rail/mobile behavior is shared Neus navigation. Native-platform grouped
sidebars and external framework navigation parity are separate capabilities.

### Other component families and templates

- Base and Navigation retain their interaction APIs and have explicit recipes for
  fields, nested controls, feedback, floating surfaces, keyboard focus and selection.
- Calendar separates single/range/multiple values; `numberOfMonths` controls visible
  months. Clock keeps the period synchronized with controlled time. Dial labels
  stay above the hand, with contrasting ink clipped to the indicator tip for
  partially covered marks. DateInput and TimeInput share field presentations and
  offer panel overrides. Empty floating fields hide the placeholder at rest;
  focusing or opening the picker raises the label and reveals it. External labels
  and fields without labels retain visible placeholders.
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

- Do pair roles intentionally and review every pair in light/dark.
- Do distinguish body, label, heading, and display typography.
- Do identify missing anatomy or public variants as explicit future work.
- Don't equate purple, rounded corners, and shadows with complete Material 3.
- Don't confuse the shared secondary surface with Material's secondary accent.
- Don't introduce Expressive motion or shapes into this base target by default.

Local implementation update: 2026-10-15. See the
[migration and validation guide](../../../docs/refactor-migration.md) for public
API changes, test coverage and limits of this web adaptation. Visual review is
against these local target rules; claims of native or complete framework parity
remain outside the contract.
