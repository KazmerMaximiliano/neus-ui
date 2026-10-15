# Apple — Neus UI target

## Overview

**Target rules.** Aim for the clarity and familiar hierarchy of Apple's Human
Interface Guidelines: content comes first, controls are easy to recognize, and
decoration is restrained. This project's chosen web direction uses sober, opaque
surfaces. Liquid Glass is not a requirement; this is a deliberate local choice,
not a claim to reproduce every current Apple platform.

**Current implementation.** Button, Card, Input, and Sidebar have Apple-inspired
recipes. They are React web components, not native Apple controls. The rest of the
library retains existing structure and styles with shared theme colors.

Format: [Google DESIGN.md](https://github.com/google-labs-code/design.md/blob/main/docs/spec.md)
(alpha, prose only). Sources consulted 2026-10-14: Apple's
[color guidance](https://developer.apple.com/design/human-interface-guidelines/color),
[button guidance](https://developer.apple.com/design/human-interface-guidelines/buttons),
and [sidebar guidance](https://developer.apple.com/design/human-interface-guidelines/sidebars).
The web geometry and mappings below are project decisions unless attributed.

Implemented values remain in [tokens](./tokens.css), [palettes](../palettes.ts),
[shared defaults](../../css/variables.css), and component recipes. See the
[architecture guide](../../../docs/design-systems.md) for scope and inheritance.

## Colors

**Target rules.** Use semantic foregrounds, backgrounds, and separators, with one
restrained action accent. Keep destructive feedback distinct from the normal
action. Light and dark palettes must preserve meaning and legibility; color must
not be the only way to identify an error or selection. These principles follow
[HIG color guidance](https://developer.apple.com/design/human-interface-guidelines/color).

**Current implementation.** The palette supplies blue actions for each mode.
Light-mode tokens supply white/soft-gray surfaces and dark neutral text. Dark
surfaces, muted text, and most feedback colors come from Neus defaults.

**Refactor gaps.** Define Apple-oriented dark surface and feedback pairs; do not
describe the inherited dark palette as Apple's system colors. Audit
`--color-focus-ring` and `--color-focus-ring-error`, which currently retain shared
values, separately from `--color-focus`. Custom accents do not automatically
produce new readable on-accent colors.

## Typography

**Target rules.** Use the local system sans-serif stack with clear title, body,
label, and supporting-text roles. Preserve natural label casing and modest
weight differences. Let text wrap and respect browser zoom; a web fallback must
remain usable when SF fonts are unavailable. This is the project's web policy.

**Current implementation.** `--font-body` prefers SF Pro Text and Apple/system
fallbacks; `--font-display` prefers SF Pro Display. Buttons use regular-weight,
untransformed labels; navigation uses medium weight. The size scale is inherited.
Selecting the system does not load fonts or enable native Dynamic Type.

**Refactor gaps.** Define semantic type roles and review fallback metrics. Avoid
presenting the shared pixel scale as an Apple platform type specification.

## Layout

**Target rules.** Give content room to breathe, align form labels and values, and
keep related actions the same size. Prioritize visible hierarchy over dense chrome.
Buttons need clear separation and a usable activation area, consistent with
[HIG buttons](https://developer.apple.com/design/human-interface-guidelines/buttons).
For this web adaptation, use 44 CSS pixels as the touch-target review goal rather
than copying native point units into CSS.

**Current implementation.** Control padding is recipe-specific; Card spacing and
Sidebar's desktop/rail/mobile behavior are inherited from Neus. Input retains
the shared minimum width. Breakpoints are library choices, not HIG specifications.

**Refactor gaps.** Review small controls for touch use, long text, and narrow form
containers. A compact visual control can require a larger activation area.

## Elevation & Depth

**Target rules.** Prefer quiet surface contrast and separators; use soft shadows
only where they clarify grouping or floating content. Opaque surfaces are the
local default. Avoid applying blur or translucency merely to signal “Apple.”

**Current implementation.** Card and Sidebar have soft shadows. Button has no
resting shadow and uses a slight scale change on press. Inputs gain a focus ring.

**Refactor gaps.** Validate shadow separation on inherited dark surfaces. The
shared reduced-motion rule removes transitions, but the pressed scale remains;
review whether nonessential transforms should also be suppressed.

## Shapes

**Target rules.** Use restrained rounded rectangles for controls and slightly
softer containers. Keep related controls consistent; preserve circles for avatars.
These web radii are project choices, not universal Apple dimensions.

**Current implementation.** Button/Input use 8px corners, Card 12px, and Sidebar
items 10px. The Neus concave navigation decoration is disabled.

**Refactor gaps.** Extend this shape hierarchy to remaining components instead of
allowing inherited pills to define unrelated controls accidentally.

## Components

### Button

**Target rules.** Emphasize the likely action through style, keep adjacent choices
similarly sized, and provide a recognizable press response. Use concise action
labels. These priorities follow [HIG buttons](https://developer.apple.com/design/human-interface-guidelines/buttons).
Local web requirements: retain visible keyboard focus and a readable loading state.

**Current implementation.** [Button recipe](./button.css): rounded rectangle,
regular labels, subtle pressed scale. Shared behavior provides solid/outlined/text
variants, hover colors, focus outline, disabled treatment, and a busy dot loader.

**Refactor gaps.** Validate dark and custom-accent foreground pairs, touch sizes,
and stable loading geometry. Shared variants and disabled colors are still Neus
API choices rather than native Apple button styles.

### Card

**Target rules.** Use a quiet grouped surface with clear internal alignment.
Content and embedded controls carry meaning; the container remains passive.
This Card composition is a local web convention.

**Current implementation.** [Card recipe](./card.css): 12px radius, subtle border,
soft shadow, no header divider. Header/Content/Footer own padding; media clips
inside the surface. Both modes use semantic background/text tokens.

**Refactor gaps.** Review the combined border and shadow on dark surfaces. Focus,
loading, and error feedback belong to child controls or content, not the Card root.

### Input

**Target rules.** Keep the label persistent and the value visually primary.
Use a clear focus boundary, explicit error text, and a quieter disabled surface.
Preserve read-only text readability. These are local web form requirements.

**Current implementation.** [Input recipe](./input.css): 8px corners, neutral text,
aligned external labels, subtle border, blue focus border and shared focus shadow.
Errors change the border, value, label, and message; native read-only is supported.

**Refactor gaps.** Define theme-matched focus/error rings and review invalid-focus
visibility in both modes. Read-only has no separate visual treatment. The external
label is intentional; no native text-field parity is implied.

### Sidebar

**Target rules.** Use a leading navigation area with short labels and obvious
current location. Adapt or collapse it when content needs the space, following
[HIG sidebar principles](https://developer.apple.com/design/human-interface-guidelines/sidebars).
Opaque panels, a tablet rail, and a mobile dialog are this project's web mapping.

**Current implementation.** [Sidebar recipe](./sidebar.css): neutral panel,
rounded items, subtle hover, tinted selection, blue focus, soft shadow, no curves.
The shared component manages rail expansion and mobile dialog interactions.

**Refactor gaps.** Audit selection/focus contrast in dark mode and with custom
accents. Grouped hierarchy and native sidebar customization are not implemented
by the visual recipe. Errors and progress should be explicit content, not a
replacement for the current-location indication.

### Extension to other families — pending adaptation

- Selection and date/time controls: carry over neutral fields, clear labels, and
  restrained blue selection without copying native platform behavior blindly.
- DataTable and calendars: favor readable rows, quiet separators, and aligned values.
- Modal and menus: use opaque floating surfaces, restrained shadows, and clear
  focus; translucency is optional future work, not a baseline requirement.
- Badge and Stepper: keep status readable through labels and shape as well as color.
- Templates: preserve content space and navigation discoverability at narrow widths.

## Do's and Don'ts

- Do distinguish HIG principles from local web geometry and existing Neus behavior.
- Do review light/dark, keyboard focus, touch areas, zoom, and fallback fonts.
- Do use emphasis sparingly and keep supporting text legible.
- Don't turn every surface into glass or every action into a prominent blue button.
- Don't claim native system colors, Dynamic Type, or complete Apple parity.
- Don't treat a documented target as permission to silently change public APIs.
