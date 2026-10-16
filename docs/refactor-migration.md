# Component refactor: migration and validation

Updated: 2026-10-15. This release intentionally removes obsolete APIs without
compatibility adapters. The starting point includes the previously staged/local
component refactors. There is no automatic package publication.

## Design selection and overrides

`ThemeProvider` selects one of `neus`, `apple`, `carbon`, `material`,
`neobrutalism`, `vercel`, and light/dark mode. All public component families and
AppTemplate/FormTemplate have recipes. Every provider scope resets the complete
Neus contract before applying its recipe. Component code does not choose anatomy
by reading the design system.

Recipes implement local web targets documented in each `DESIGN.md`; they do not
promise all features of Material, Carbon, HIG or Geist. Material Expressive,
automatic font downloads, a full dynamic tonal palette, and six bespoke Google
cartographies are outside this refactor.

Use scope or instance CSS variables for reusable customization. Explicit style
props override only their documented element. CSS token values remain in CSS and
TypeScript; the design documents describe intent and boundaries without YAML copies.

## Button, Card and Input

Button adds `secondary`, `tonal`, `elevated` alongside `solid`, `outlined`, `text`.
Carbon maps solid/secondary/outlined/text to primary/secondary/tertiary/ghost.
All variants exist in all systems. Busy buttons retain the idle size and accessible
name and prevent activation.

```tsx
<Button label="Save" variant="tonal" />
<Card variant="outlined"><CardContent>Content</CardContent></Card>
<Input label="Amount" variant="filled" labelPlacement="floating"
  size="large" prefix="$" suffix="USD" />
```

Card adds `variant="auto" | "filled" | "outlined" | "elevated"`; auto preserves the
recipe's existing surface. The root is passive and retains subcomponent composition.

Input adds `variant="auto" | "filled" | "outlined"`,
`labelPlacement="auto" | "external" | "floating"`, and small/medium/large sizes.
Auto labels float in Material and remain external elsewhere. Floating labels rise
on focus, value, prefix or native color content. Prefix, suffix and error icon
have independent style props. `errorIcon={null}` removes the icon; undefined supplies
an accessible decorative default. Error text still explains and identifies the issue.
The native input now sits inside `.input__control`; use the public style props or
`.input__wrapper` rather than assumptions about its immediate parent.

Theme accent overrides accept the existing six-digit hex contract. Foregrounds on
solid action fills are recalculated per state; arbitrary CSS foreground/background
overrides are the application's responsibility. These mappings do not generate a
full Material dynamic color palette.

## Calendar, Clock and picker fields

Before:

```tsx
<Calendar mode="single" selected={date} value={date} required={false} />
<Calendar mode="range" selected={range} value={range} required multiple />
```

After:

```tsx
<Calendar mode="single" value={date} onChange={setDate} />
<Calendar mode="range" value={range} onChange={setRange} numberOfMonths={2} />
<Calendar mode="multiple" value={dates} onChange={setDates} required />
```

`selected` is removed. The boolean `multiple` is replaced by `numberOfMonths`.
Selection mode determines the types of value/defaultValue/onChange. `required`
works consistently in all modes; false allows deselection where DayPicker supports it.

DateInput and TimeInput add the same variant/labelPlacement/size controls as Input,
and `panelStyle` for the popover. Existing fieldStyle/labelStyle/errorStyle remain.
Clock adds segmentStyle/periodStyle/numberStyle/indicatorStyle. Its AM/PM state
follows controlled values. Dial keyboard controls and native field serialization
remain available.

WeekCalendar keeps one-day navigation across a seven-day window. WeekCalendarRow
remains public; both support styles for categories, events and tooltips. Event
cells support Enter/Space and tooltip details via focus; Escape dismisses details.
Events sharing a day retain the existing first-matching-event behavior; this is
not an overlapping-event scheduler. Event accents are tinted against the active
surface to retain readable foregrounds.

## InteractiveMap

Add `className`, root `style`, mapStyle/searchStyle/instructionsStyle/loadingStyle/
errorStyle, `mapOptions` and `onError`. Google owns cartography; CSS recipes style
the surrounding interface. Readonly permits exploration and blocks map selection,
marker dragging and change callbacks. Initial coordinate strings must contain two
finite, bounded numbers. Invalid configuration is reported before loading Google.
SDK errors and reverse-geocoding failures are visible; later selections supersede
outstanding geocoding results. Prop changes to initial coordinates/address restart
the map's initial state; readonly changes preserve the current marker.

Automated tests mock Google Maps and geocoding. A real Maps SDK check requires a
consumer-provided valid API key and its enabled Google services. Storybook ships
without a credential and renders the configuration state by default.

## DataTable and voluntary actions

Before:

```tsx
<DataTable data={users} pagination={pagination}
  columnLabels={{ name: "Name" }} hiddenColumns={["id"]}
  onInfo={openUser} useCardLayout />
```

After:

```tsx
import type { ICellRendererParams } from "ag-grid-community";
import type { DataTableColDef } from "neus-ui";

type User = { id: number; name: string };
const columns: DataTableColDef<User>[] = [
  { field: "id", hide: true },
  { field: "name", headerName: "Name" },
  { colId: "actions", sortable: false, filter: false,
    cellRenderer: ({ data }: ICellRendererParams<User>) => data
      ? <IconButton icon={Info} label={`View ${data.name}`} onClick={() => openUser(data)} />
      : null },
];
<DataTable data={users} columnDefs={columns} pagination={pagination}
  renderMobileCard={(row) => <Card><CardContent>{row.name}</CardContent></Card>} />
```

`columnDefs` is required and typed for each row. Remove columnLabels, hiddenColumns,
onInfo/onEdit/onDelete and useCardLayout. A renderMobileCard callback opts into
consumer cards below 768px; without it, the grid remains available with horizontal
scrolling. The renderer owns which fields and actions are present in its cards.

Actions and ActionsProps are removed from the library. Compose IconButton/Menu and
Card directly in application code. Storybook's `Others/Integrations/DataTable actions`
contains this integration; the DataTable story demonstrates both layouts.

Pagination remains externally controlled. Sorting/filtering apply to supplied rows
(the current page); this wrapper does not implement AG Grid's Enterprise server-side
row model. Empty state and pagination have separate style props. AG Grid 36.1.0
uses a stable Quartz theme whose parameters reference the scoped data-table tokens;
no dependency upgrade or fixed universal appearance is needed.

## Templates

AppTemplate adds title, className, style, headerStyle/sidebarStyle/contentStyle/
contentContainerStyle. Sidebar owns mobile dialog and rail behavior at the existing
768/1024 breakpoints. Layout widths and offsets consume the Sidebar contract;
header/content sizing is now token-driven.

FormTemplate adds className, style, actionsStyle, columns/tabletColumns/mobileColumns
and gap. Defaults are 2/2/1 columns and the recipe's gap. Numeric gaps are pixels;
CSS length expressions also work. The layout accepts arbitrary children without
selectors tied to Input internals. The consumer owns the form element, validation
and submission; custom actions can replace the default submit button.

## Validation

Run lint, unit tests, real-browser design-system tests, Storybook tests, coverage,
library build and Storybook build. Browser tests cover six systems in both schemes,
computed states/contrast, nested providers, runtime changes, field anatomy and real
AG Grid/DayPicker behavior. Visual QA captures use VITE_REFACTOR_VISUAL_QA=true;
inspect the generated PNGs for clipping, alignment and readability. Tests use
fallback fonts; selecting a design does not load branded assets.

The complete Google DESIGN.md schema is a reference format. This repository retains
its explicit prose-only choice and CSS/TypeScript source of truth.

## Verified result — 2026-10-15

- Lint and TypeScript checks pass.
- Library build and static Storybook build pass.
- Full coverage run: 90 test files, 926 tests passed, including unit, Chromium
  design-system and Storybook tests.
- Coverage: statements 94.19%, branches 93.46%, functions 94.73%, lines 96.23%.
- Clock implementation line coverage: 92.42%; DateInput and TimeInput: 100%.
- Design-system browser suite: 243 tests across the six systems and both schemes.
- Twelve generated system/mode preview captures were inspected for field geometry,
  hierarchy, grid typography, surface separation, borders and shadow clearance.
- Google Maps SDK/geocoding behavior is verified with mocks; no live API credential
  was used.

## Calendar and Storybook corrections — 2026-10-15

Calendar distributes seven equal columns across the surface, centers day buttons,
and preserves continuous range bands. Its default recipe width and explicit width
overrides remain available; multiple months scroll on narrow screens. The Calendar
story now allows uncontrolled selection instead of supplying `value={undefined}`.

Calendar, Clock, DateInput, TimeInput, WeekCalendar and WeekCalendarRow use the
same preview-only `designSystem` select as Button: six systems, Neus by default,
and a local ThemeProvider in the story render. DataTable retains its
**Heredar global** option. All previews retain the toolbar's color scheme.
Storybook chrome no longer applies fixed dark colors to component tables. The
WeekCalendar tooltip example uses the component's themed surface.

The DataTable consumer example shares three small text actions between grid cells
and mobile cards, with independent callbacks and a fixed 160px actions column.
See [the component guide](components/DataTable.md) and the copyable Storybook
integration for the composition and CSS.

Verified: 650 unit tests and 291 browser/Storybook tests pass, including geometry,
range backgrounds, theme inheritance, open picker panels and keyboard actions.
Lint, TypeScript, library build and Storybook build pass. Captures of all seven
stories were reviewed in all six systems and both schemes; Canvas and Docs were
also checked against the final Storybook build.

## Component constants and Calendar language — 2026-10-15

Static component data and configuration now belong in `ComponentName.consts.ts`.
Existing `.constants.ts` modules were renamed and literal tables/defaults were
extracted from implementations and utilities. Mutable runtime registries and
values derived from props remain with their logic.

Calendar uses the first localization option through native Intl, with no new
dependency:

```tsx
<Calendar language="es-AR" />
<Calendar language="en-US" />
```

`language` defaults to `en-US`, including the fallback for malformed or unsupported
tags. It updates Gregorian month names, captions, weekdays, day/year numbers and
date/navigation labels while preserving selection, the open picker view and ISO
serialization. Consumer labels/errors remain consumer content. See the
[Calendar guide](components/Calendar.md#language) for behavior and limits.

Validated: 662 unit tests with coverage and 302 browser/Storybook tests pass;
Calendar implementation line coverage is 93.75%. Application, Storybook and test
type checks pass. The visual review includes Spanish in all six systems and both
schemes, plus French, German, Japanese and Arabic at 320px.
