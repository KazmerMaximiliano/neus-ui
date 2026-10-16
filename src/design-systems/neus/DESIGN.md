# Neus UI

## Overview

**Target rules.** Neus is a clear, approachable interface for application forms,
navigation, and data workflows. Its identity combines Manrope, indigo emphasis,
pill-shaped controls, quiet content surfaces, and a distinctive curved sidebar.
Keep those signatures consistent as the library grows; decorative treatments
must not compete with the task. These are Neus UI project decisions.

**Current implementation.** All public component families and both templates now
have scoped CSS token contracts and six-system recipes. Button, Card and Input
share the expanded presentation API described below. This is the project's web
mapping, not full feature parity with an external component framework.

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

**Current implementation.** Semantic surfaces, text, selection, field/layer and feedback roles are
mapped in the scoped tokens and palettes. Light/dark values preserve role pairs.
Solid action foregrounds are resolved per state; custom six-digit hex primary
accents also receive readable text/focus mappings. These local roles do not provide
a complete external theme matrix or a full dynamic tonal color engine.

**Validation boundary.** Consumer-supplied CSS foreground/background overrides and arbitrary non-hex
accent formats are outside the automatic contrast contract.

## Typography

**Target rules.** Use Manrope for interface text, with system sans-serif fallbacks;
reserve monospace for code and identifiers. Establish hierarchy through size,
weight, and spacing before color. Keep prose and field labels in natural case.
Use the spaced uppercase treatment only for short action and navigation labels.

**Current implementation.** Font stacks remain declared locally without downloaded assets. Body,
heading, label and caption roles include size, weight, line height and tracking.
Component-specific sizes remain deliberate local mappings, not a claim that the
entire external typography catalog has been implemented.

**Validation boundary.** Use local fallback fonts and review application content at zoom and with
long translations; font asset loading belongs to the consuming application.

## Layout

**Target rules.** Build spacing from the shared four-pixel rhythm. Group related
fields closely and separate sections more generously. Align labels, inputs, and
actions; allow wrapping instead of shrinking text. Page grids belong to templates
or applications, not to individual component recipes.

**Current implementation.** AppTemplate and FormTemplate now map page-region spacing and responsive
columns through recipes. AppTemplate follows Sidebar at 768/1024px; FormTemplate
uses 2/2/1 columns by default with independent gap/region overrides. Components keep
readable internal geometry; week grids and tables retain horizontal navigation
where their data cannot fit a narrow viewport.

**Validation boundary.** The shared breakpoints are Neus web choices. Application page compositions
and specialized external grid systems remain consumer decisions.

## Elevation & Depth

**Target rules.** Separate ordinary content through spacing, subtle borders, and
surface contrast. Reserve shadows for floating controls and overlays. Keep focus
recognizable independently of elevation. Motion should explain a state change;
respect reduced-motion preferences.

**Current implementation.** Floating and dialog elevation roles map the existing overlay and modal
recipes. Ordinary surfaces and action variants have separate treatments; Card
stays passive, Button reserves elevation for its explicit treatment where required,
and reduced-motion rules suppress nonessential transitions. Neobrutalism retains
hard shadows with clearance in fields, cards and template spacing.

**Validation boundary.** Nested surfaces and custom scroll containers must preserve focus and shadow
clearance; the library cannot control clipping imposed by consumer overflow rules.

## Shapes

**Target rules.** Use pills for short actions and text-entry controls, rounded
rectangles for content, and the concave/convex curve only as a navigation signature.
Do not apply pill rounding to every container or copy navigation decoration into
form controls.

**Current implementation.** Every adapted family has its own radius/border contract, including nested
selectors, calendars, overlays, maps and tables. Neus keeps its navigation curves;
other systems disable that decoration. Media clipping and focus remain separate
from surface geometry. Explicit presentation variants have recipes in all systems.

**Validation boundary.** Recipe geometry expresses the documented local web target. Native platform
rendering and additional interactive surface types are separate capabilities.

## Components

### Button

**Target rules.** A solid button carries the main action; outlined and text actions
provide lower emphasis. Keep size independent of importance. Hover and press must
be visible, and keyboard focus must remain distinct. Loading must communicate
progress without losing the action's accessible name or causing disruptive resizing.

**Current implementation.** [Button recipe](./button.css) maps solid, secondary, tonal, elevated,
outlined and text actions. Carbon uses primary/secondary/tertiary/ghost hierarchy
for solid/secondary/outlined/text; Material reserves resting elevation for elevated.
The shared implementation reserves the idle label box while busy. Semantic and
custom hex accent foregrounds are resolved for resting, hover and pressed fills.

**Refactor boundaries.** Six shared variants express the supported action hierarchy. System-specific
native APIs and additional interaction patterns remain outside this contract.

### Card

**Target rules.** A Card groups related content; its children own actions. Keep
media inside the rounded surface and place spacing in Header, Content, and Footer.
Do not make a passive surface look clickable through hover elevation.

**Current implementation.** [Card recipe](./card.css) keeps the root passive. `variant="auto"`
uses this system's existing treatment; filled, outlined and elevated can be chosen
explicitly in all six systems. Header/Content/Footer keep independent spacing;
media clips inside the surface and child controls own interactions.

**Refactor boundaries.** The root remains passive. Selection, expansion, loading, errors and keyboard
actions belong to meaningful child content and controls.

### Input

**Target rules.** Keep a visible label, legible value, subordinate placeholder,
and explicit error message. Focus must remain evident when invalid. A read-only
value stays readable and distinct from an unavailable field.

**Current implementation.** [Input recipe](./input.css) supplies field geometry and state roles.
The shared anatomy supports auto/filled/outlined, small/medium/large,
auto/external/floating labels, prefix/suffix content and an optional error icon.
Auto uses a floating outlined field in Material and external labels elsewhere.
Focused, populated, prefixed and native color fields keep floating labels raised.
Errors stay associated with the native input; readonly remains distinct from disabled.

**Refactor boundaries.** Prefixes/suffixes and floating labels do not introduce masks, autocomplete
providers or other application behavior. Native input semantics remain in use.

### Sidebar

**Target rules.** Use the primary-colored panel to anchor navigation. Keep hover,
current destination, and keyboard focus distinguishable. Preserve readable labels
when a rail expands and keep the mobile close control discoverable.

**Current implementation.** [Sidebar recipe](./sidebar.css): curved panel,
pill items, translucent hover/active fills, offset focus outlines, and semantic
on-primary text. Shared behavior supplies rail expansion and the mobile dialog.

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

- Do read the current recipe and the target rule together before changing a token.
- Do check light/dark, nested scopes, keyboard focus, long content, and reduced motion.
- Do preserve Neus defaults at every provider boundary when adding a token.
- Don't treat shared colors alone as a completed component adaptation.
- Don't use gradients, glows, or all-uppercase copy as a substitute for hierarchy.
- Don't claim a pending target or accessibility review is already implemented.

Local implementation update: 2026-10-15. See the
[migration and validation guide](../../../docs/refactor-migration.md) for public
API changes, test coverage and limits of this web adaptation. Visual review is
against these local target rules; claims of native or complete framework parity
remain outside the contract.
