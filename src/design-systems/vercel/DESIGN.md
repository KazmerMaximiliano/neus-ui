# Vercel Geist — Neus UI target

## Overview

**Target rules.** Aim for Geist's precise, restrained product interface: neutral
surfaces, clear text hierarchy, compact controls, and purposeful emphasis. The
design should support developer tools, settings, and data workflows without
requiring promotional graphics to establish identity.

**Current implementation.** All public component families and both templates now
have scoped CSS token contracts and six-system recipes. Button, Card and Input
share the expanded presentation API described below. This is the project's web
mapping, not full feature parity with an external component framework.

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

**Current implementation.** Semantic surfaces, text, selection, field/layer and feedback roles are
mapped in the scoped tokens and palettes. Light/dark values preserve role pairs.
Solid action foregrounds are resolved per state; custom six-digit hex primary
accents also receive readable text/focus mappings. These local roles do not provide
a complete external theme matrix or a full dynamic tonal color engine.
Vercel maps neutral dark backgrounds and borders rather than inheriting indigo surfaces.

**Validation boundary.** Consumer-supplied CSS foreground/background overrides and arbitrary non-hex
accent formats are outside the automatic contrast contract.

## Typography

**Target rules.** Use Geist Sans for interface text and Geist Mono for code and
technical identifiers. Separate heading, button, label, and copy roles; multiline
copy needs more leading than a compact label. Reference:
[Geist typography](https://vercel.com/geist/typography).
Local policy: avoid uppercase styling for ordinary actions and navigation.

**Current implementation.** Font stacks remain declared locally without downloaded assets. Body,
heading, label and caption roles include size, weight, line height and tracking.
Component-specific sizes remain deliberate local mappings, not a claim that the
entire external typography catalog has been implemented.

**Validation boundary.** Use local fallback fonts and review application content at zoom and with
long translations; font asset loading belongs to the consuming application.

## Layout

**Target rules.** Local product-layout policy: use consistent columns, aligned
form fields, and economical spacing. Keep dense metadata readable and separate
sections through headings and spacing. Marketing grids and large display text
must not determine the density of routine application controls.

**Current implementation.** AppTemplate and FormTemplate now map page-region spacing and responsive
columns through recipes. AppTemplate follows Sidebar at 768/1024px; FormTemplate
uses 2/2/1 columns by default with independent gap/region overrides. Components keep
readable internal geometry; week grids and tables retain horizontal navigation
where their data cannot fit a narrow viewport.

**Validation boundary.** The shared breakpoints are Neus web choices. Application page compositions
and specialized external grid systems remain consumer decisions.

## Elevation & Depth

**Target rules.** Select a material according to its place in the hierarchy: quiet
resting content, raised content, and floating overlays have different needs.
Choose the least elevation that remains legible and preserve separation in dark
mode. Reference: [Geist materials](https://vercel.com/geist/materials).

**Current implementation.** Floating and dialog elevation roles map the existing overlay and modal
recipes. Ordinary surfaces and action variants have separate treatments; Card
stays passive, Button reserves elevation for its explicit treatment where required,
and reduced-motion rules suppress nonessential transitions. Neobrutalism retains
hard shadows with clearance in fields, cards and template spacing.

**Validation boundary.** Nested surfaces and custom scroll containers must preserve focus and shadow
clearance; the library cannot control clipping imposed by consumer overflow rules.

## Shapes

**Target rules.** Small corner radii suit everyday surfaces and controls; larger
floating surfaces can use a different material radius. Geist's material presets
combine radius with fill, stroke, and shadow, rather than choosing each in isolation.
Reference: [Geist materials](https://vercel.com/geist/materials).

**Current implementation.** Every adapted family has its own radius/border contract, including nested
selectors, calendars, overlays, maps and tables. Neus keeps its navigation curves;
other systems disable that decoration. Media clipping and focus remain separate
from surface geometry. Explicit presentation variants have recipes in all systems.

**Validation boundary.** Recipe geometry expresses the documented local web target. Native platform
rendering and additional interactive surface types are separate capabilities.

## Components

### Button

**Target rules.** Local mapping informed by [Geist Button](https://vercel.com/geist/button):
use a strong neutral solid action, quieter outlined/text alternatives, concise
labels, and consistent sizes. Keep hover, press, keyboard focus, disabled, and
loading states legible without decorative motion.

**Current implementation.** [Button recipe](./button.css) maps solid, secondary, tonal, elevated,
outlined and text actions. Carbon uses primary/secondary/tertiary/ghost hierarchy
for solid/secondary/outlined/text; Material reserves resting elevation for elevated.
The shared implementation reserves the idle label box while busy. Semantic and
custom hex accent foregrounds are resolved for resting, hover and pressed fills.

**Refactor boundaries.** Six shared variants express the supported action hierarchy. System-specific
native APIs and additional interaction patterns remain outside this contract.

### Card

**Target rules.** Local mapping: use a base content surface with a quiet boundary
and deliberate internal spacing. Let headers, body text, and child actions provide
hierarchy. Choose elevation only when the surrounding layout requires it.

**Current implementation.** [Card recipe](./card.css) keeps the root passive. `variant="auto"`
uses this system's existing treatment; filled, outlined and elevated can be chosen
explicitly in all six systems. Header/Content/Footer keep independent spacing;
media clips inside the surface and child controls own interactions.

**Refactor boundaries.** The root remains passive. Selection, expansion, loading, errors and keyboard
actions belong to meaningful child content and controls.

### Input

**Target rules.** Local mapping informed by [Geist Input](https://vercel.com/geist/input):
keep compact geometry, a clear label/value hierarchy, a quiet resting border,
visible focus, and explicit validation feedback. Read-only values remain readable.

**Current implementation.** [Input recipe](./input.css) supplies field geometry and state roles.
The shared anatomy supports auto/filled/outlined, small/medium/large,
auto/external/floating labels, prefix/suffix content and an optional error icon.
Auto uses a floating outlined field in Material and external labels elsewhere.
Focused, populated, prefixed and native color fields keep floating labels raised.
Errors stay associated with the native input; readonly remains distinct from disabled.

**Refactor boundaries.** Prefixes/suffixes and floating labels do not introduce masks, autocomplete
providers or other application behavior. Native input semantics remain in use.

### Sidebar

**Target rules.** Local navigation mapping: a neutral panel with aligned labels,
quiet separators, understated hover, and a clear current-location treatment.
Keyboard focus must be identifiable even on a selected item.

**Current implementation.** [Sidebar recipe](./sidebar.css): neutral panel,
rounded rows, header separator, tinted selection, and blue focus. Shared behavior
provides the rail and mobile dialog; controls have no shadow.

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

- Do choose typography and surface roles before tuning individual pixel values.
- Do verify neutral separation, selection, and focus in both themes.
- Do draw shared boundaries once and preserve readable supporting text.
- Don't equate monochrome controls and 6px corners with full Geist support.
- Don't use promotional gradients or display typography as default product chrome.
- Don't claim unimplemented component APIs or a complete material/token scale.

Local implementation update: 2026-10-15. See the
[migration and validation guide](../../../docs/refactor-migration.md) for public
API changes, test coverage and limits of this web adaptation. Visual review is
against these local target rules; claims of native or complete framework parity
remain outside the contract.
