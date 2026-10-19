# CSS token reference

[Design index](./README.md) · [Documentation](../README.md) ·
[Customization](./customization.md)

CSS custom properties connect the selected design system to shared styles and component
recipes. The tables below enumerate the Neus shared contract. Values are baseline
declarations rather than guarantees for every system or mode.

## Layers

1. Foundations define color roles, fonts, spacing, radii and common primitives.
2. System tokens override semantic choices, typography and elevation roles.
3. Component recipes map those roles to component-specific tokens.
4. ThemeProvider writes runtime action colors on its document or local boundary.
5. Application CSS and per-instance styles customize the intended scope/element.

Neus defines complete scope resets before sibling system overrides. CSS var(), calc() and
color-mix() dependencies remain live at runtime; a runtime palette change can therefore flow
into a recipe without rebuilding CSS.

## Shared declarations

### Foundations

[Baseline source](../../src/design-systems/neus/generated/foundations.css) · [Editable
specification](../../src/design-systems/neus/DESIGN.md)

| Token | Role | Baseline | Selector / mode |
| --- | --- | --- | --- |
| `--color-primary` | color primary | `#283593` | `:root, [data-design-system]` |
| `--color-primary-light` | color primary light | `rgba(40, 53, 147, 0.1)` | `:root, [data-design-system]` |
| `--color-primary-dark` | color primary dark | `#1c258c` | `:root, [data-design-system]` |
| `--color-success` | color success | `#4caf50` | `:root, [data-design-system]` |
| `--color-success-light` | color success light | `rgba(76, 175, 80, 0.1)` | `:root, [data-design-system]` |
| `--color-success-dark` | color success dark | `#357a3a` | `:root, [data-design-system]` |
| `--color-error` | color error | `#f44336` | `:root, [data-design-system]` |
| `--color-error-light` | color error light | `rgba(244, 67, 54, 0.1)` | `:root, [data-design-system]` |
| `--color-error-dark` | color error dark | `#d32f2f` | `:root, [data-design-system]` |
| `--color-warning` | color warning | `#ed6c02` | `:root, [data-design-system]` |
| `--color-warning-light` | color warning light | `rgba(237, 108, 2, 0.1)` | `:root, [data-design-system]` |
| `--color-warning-dark` | color warning dark | `#c95c02` | `:root, [data-design-system]` |
| `--color-info` | color info | `#283593` | `:root, [data-design-system]` |
| `--color-info-light` | color info light | `rgba(40, 53, 147, 0.1)` | `:root, [data-design-system]` |
| `--color-info-dark` | color info dark | `#1a237e` | `:root, [data-design-system]` |
| `--color-info-100` | color info 100 | `color-mix(in srgb, var(--color-info) 5%, transparent)` | `:root, [data-design-system]` |
| `--color-info-300` | color info 300 | `color-mix(in srgb, var(--color-info) 40%, transparent)` | `:root, [data-design-system]` |
| `--color-white` | color white | `#ffffff` | `:root, [data-design-system]` |
| `--color-black` | color black | `#000000` | `:root, [data-design-system]` |
| `--color-white-100` | color white 100 | `rgba(255, 255, 255, 0.15)` | `:root, [data-design-system]` |
| `--color-white-200` | color white 200 | `rgba(255, 255, 255, 0.25)` | `:root, [data-design-system]` |
| `--color-white-300` | color white 300 | `rgba(255, 255, 255, 0.55)` | `:root, [data-design-system]` |
| `--color-black-100` | color black 100 | `rgba(0, 0, 0, 0.1)` | `:root, [data-design-system]` |
| `--color-black-200` | color black 200 | `rgba(0, 0, 0, 0.5)` | `:root, [data-design-system]` |
| `--color-gray-900` | color gray 900 | `#333333` | `:root, [data-design-system]` |
| `--color-gray-700` | color gray 700 | `#475569` | `:root, [data-design-system]` |
| `--color-gray-600` | color gray 600 | `#666666` | `:root, [data-design-system]` |
| `--color-gray-500` | color gray 500 | `#64748b` | `:root, [data-design-system]` |
| `--color-gray-400` | color gray 400 | `#6b7280` | `:root, [data-design-system]` |
| `--color-gray-300` | color gray 300 | `#cbd5e1` | `:root, [data-design-system]` |
| `--color-gray-200` | color gray 200 | `#e0e0e0` | `:root, [data-design-system]` |
| `--color-gray-150` | color gray 150 | `#e5e7eb` | `:root, [data-design-system]` |
| `--color-gray-100` | color gray 100 | `#f9fafb` | `:root, [data-design-system]` |
| `--color-border-light` | color border light | `var(--color-primary-light)` | `:root, [data-design-system]` |
| `--color-border-dark` | color border dark | `#b0b8c1` | `:root, [data-design-system]` |
| `--color-shadow` | color shadow | `var(--color-black-100)` | `:root, [data-design-system]` |
| `--radius-default` | radius default | `16px` | `:root, [data-design-system]` |
| `--radius-sm` | radius sm | `8px` | `:root, [data-design-system]` |
| `--radius-md` | radius md | `12px` | `:root, [data-design-system]` |
| `--radius-pill` | radius pill | `3em` | `:root, [data-design-system]` |
| `--color-surface` | color surface | `#ffffff` | `:root, [data-design-system]` |
| `--color-surface-secondary` | color surface secondary | `#f9fafb` | `:root, [data-design-system]` |
| `--color-surface-hover` | color surface hover | `rgba(0, 0, 0, 0.02)` | `:root, [data-design-system]` |
| `--color-surface-disabled` | color surface disabled | `#f9fafb` | `:root, [data-design-system]` |
| `--color-text-primary` | color text primary | `#333333` | `:root, [data-design-system]` |
| `--color-text-secondary` | color text secondary | `#666666` | `:root, [data-design-system]` |
| `--color-text-muted` | color text muted | `#64748b` | `:root, [data-design-system]` |
| `--color-text-placeholder` | color text placeholder | `#6b7280` | `:root, [data-design-system]` |
| `--color-text-disabled` | color text disabled | `#64748b` | `:root, [data-design-system]` |
| `--color-text-on-primary` | color text on primary | `#ffffff` | `:root, [data-design-system]` |
| `--color-border` | color border | `var(--color-primary-light)` | `:root, [data-design-system]` |
| `--color-border-input` | color border input | `var(--color-primary-light)` | `:root, [data-design-system]` |
| `--color-border-input-hover` | color border input hover | `#b0b8c1` | `:root, [data-design-system]` |
| `--color-border-subtle` | color border subtle | `#e0e0e0` | `:root, [data-design-system]` |
| `--color-border-muted` | color border muted | `#e5e7eb` | `:root, [data-design-system]` |
| `--color-focus-ring` | color focus ring | `rgba(40, 53, 147, 0.18)` | `:root, [data-design-system]` |
| `--color-focus-ring-error` | color focus ring error | `rgba(244, 67, 54, 0.18)` | `:root, [data-design-system]` |
| `--color-outlined-ring` | color outlined ring | `rgba(40, 53, 147, 0.4)` | `:root, [data-design-system]` |
| `--color-outlined-ring-hover` | color outlined ring hover | `rgba(40, 53, 147, 0.7)` | `:root, [data-design-system]` |
| `--color-outlined-ring-success` | color outlined ring success | `rgba(76, 175, 80, 0.4)` | `:root, [data-design-system]` |
| `--color-outlined-ring-success-hover` | color outlined ring success hover | `rgba(76, 175, 80, 0.7)` | `:root, [data-design-system]` |
| `--color-outlined-ring-error` | color outlined ring error | `rgba(244, 67, 54, 0.4)` | `:root, [data-design-system]` |
| `--color-outlined-ring-error-hover` | color outlined ring error hover | `rgba(244, 67, 54, 0.7)` | `:root, [data-design-system]` |
| `--color-overlay` | color overlay | `rgba(0, 0, 0, 0.5)` | `:root, [data-design-system]` |
| `--color-tag-bg` | color tag bg | `#e5e7eb` | `:root, [data-design-system]` |
| `--color-tag-remove` | color tag remove | `#6b7280` | `:root, [data-design-system]` |
| `--font-display` | font display | `"Manrope", system-ui, sans-serif` | `:root, [data-design-system]` |
| `--font-body` | font body | `"Manrope", system-ui, sans-serif` | `:root, [data-design-system]` |
| `--font-mono` | font mono | `"JetBrains Mono", ui-monospace, monospace` | `:root, [data-design-system]` |
| `--fs-xs` | fs xs | `12px` | `:root, [data-design-system]` |
| `--fs-sm` | fs sm | `13px` | `:root, [data-design-system]` |
| `--fs-base` | fs base | `14px` | `:root, [data-design-system]` |
| `--fs-md` | fs md | `16px` | `:root, [data-design-system]` |
| `--fs-lg` | fs lg | `18px` | `:root, [data-design-system]` |
| `--fs-xl` | fs xl | `20px` | `:root, [data-design-system]` |
| `--fs-2xl` | fs 2xl | `24px` | `:root, [data-design-system]` |
| `--fs-3xl` | fs 3xl | `32px` | `:root, [data-design-system]` |
| `--fs-4xl` | fs 4xl | `48px` | `:root, [data-design-system]` |
| `--fs-5xl` | fs 5xl | `64px` | `:root, [data-design-system]` |
| `--space-1` | space 1 | `4px` | `:root, [data-design-system]` |
| `--space-2` | space 2 | `8px` | `:root, [data-design-system]` |
| `--space-3` | space 3 | `12px` | `:root, [data-design-system]` |
| `--space-4` | space 4 | `16px` | `:root, [data-design-system]` |
| `--space-6` | space 6 | `24px` | `:root, [data-design-system]` |
| `--space-8` | space 8 | `32px` | `:root, [data-design-system]` |
| `--space-12` | space 12 | `48px` | `:root, [data-design-system]` |
| `--space-16` | space 16 | `64px` | `:root, [data-design-system]` |
| `--gradient-brand` | gradient brand | `linear-gradient( 135deg, #22d3ee 0%, #6366f1 45%, #d946ef 100% )` | `:root, [data-design-system]` |
| `--gradient-brand-soft` | gradient brand soft | `linear-gradient( 135deg, rgba(34, 211, 238, 0.18) 0%, rgba(99, 102, 241, 0.18) 45%, rgba(217, 70, 239, 0.18) 100% )` | `:root, [data-design-system]` |
| `--glow-brand` | glow brand | `0 0 40px rgba(99, 102, 241, 0.35)` | `:root, [data-design-system]` |
| `--glow-brand-strong` | glow brand strong | `0 0 60px rgba(99, 102, 241, 0.5), 0 0 100px rgba(217, 70, 239, 0.25)` | `:root, [data-design-system]` |
| `--glow-cyan` | glow cyan | `0 0 30px rgba(34, 211, 238, 0.4)` | `:root, [data-design-system]` |
| `--color-surface` | color surface | `#1e1e2e` | `[data-color-scheme="dark"]` |
| `--color-surface-secondary` | color surface secondary | `#2a2a3d` | `[data-color-scheme="dark"]` |
| `--color-surface-hover` | color surface hover | `rgba(255, 255, 255, 0.04)` | `[data-color-scheme="dark"]` |
| `--color-surface-disabled` | color surface disabled | `#2a2a3d` | `[data-color-scheme="dark"]` |
| `--color-text-primary` | color text primary | `#e2e8f0` | `[data-color-scheme="dark"]` |
| `--color-text-secondary` | color text secondary | `#94a3b8` | `[data-color-scheme="dark"]` |
| `--color-text-muted` | color text muted | `#94a3b8` | `[data-color-scheme="dark"]` |
| `--color-text-placeholder` | color text placeholder | `#94a3b8` | `[data-color-scheme="dark"]` |
| `--color-text-disabled` | color text disabled | `#475569` | `[data-color-scheme="dark"]` |
| `--color-text-on-primary` | color text on primary | `#ffffff` | `[data-color-scheme="dark"]` |
| `--color-border` | color border | `rgba(255, 255, 255, 0.2)` | `[data-color-scheme="dark"]` |
| `--color-border-input` | color border input | `rgba(255, 255, 255, 0.2)` | `[data-color-scheme="dark"]` |
| `--color-border-input-hover` | color border input hover | `rgba(255, 255, 255, 0.45)` | `[data-color-scheme="dark"]` |
| `--color-border-subtle` | color border subtle | `rgba(255, 255, 255, 0.15)` | `[data-color-scheme="dark"]` |
| `--color-border-muted` | color border muted | `rgba(255, 255, 255, 0.1)` | `[data-color-scheme="dark"]` |
| `--color-white-100` | color white 100 | `rgba(255, 255, 255, 0.3)` | `[data-color-scheme="dark"]` |
| `--color-label-on-dark` | color label on dark | `#e2e8f0` | `[data-color-scheme="dark"]` |
| `--color-black-100` | color black 100 | `rgba(0, 0, 0, 0.3)` | `[data-color-scheme="dark"]` |
| `--color-black-200` | color black 200 | `rgba(0, 0, 0, 0.7)` | `[data-color-scheme="dark"]` |
| `--color-overlay` | color overlay | `rgba(0, 0, 0, 0.7)` | `[data-color-scheme="dark"]` |
| `--color-tag-bg` | color tag bg | `#2a2a3d` | `[data-color-scheme="dark"]` |
| `--color-tag-remove` | color tag remove | `#94a3b8` | `[data-color-scheme="dark"]` |
| `--color-gray-900` | color gray 900 | `#e2e8f0` | `[data-color-scheme="dark"]` |
| `--color-gray-700` | color gray 700 | `#94a3b8` | `[data-color-scheme="dark"]` |
| `--color-gray-600` | color gray 600 | `#64748b` | `[data-color-scheme="dark"]` |
| `--color-gray-500` | color gray 500 | `#475569` | `[data-color-scheme="dark"]` |
| `--color-gray-400` | color gray 400 | `#64748b` | `[data-color-scheme="dark"]` |
| `--color-gray-300` | color gray 300 | `#334155` | `[data-color-scheme="dark"]` |
| `--color-gray-200` | color gray 200 | `#1e293b` | `[data-color-scheme="dark"]` |
| `--color-gray-150` | color gray 150 | `#1a2235` | `[data-color-scheme="dark"]` |
| `--color-gray-100` | color gray 100 | `#2a2a3d` | `[data-color-scheme="dark"]` |
| `--color-border-light` | color border light | `rgba(255, 255, 255, 0.1)` | `[data-color-scheme="dark"]` |
| `--color-border-dark` | color border dark | `rgba(255, 255, 255, 0.2)` | `[data-color-scheme="dark"]` |
| `--color-shadow` | color shadow | `rgba(0, 0, 0, 0.4)` | `[data-color-scheme="dark"]` |
| `--color-focus-ring` | color focus ring | `rgba(165, 180, 252, 0.25)` | `[data-color-scheme="dark"]` |
| `--color-focus-ring-error` | color focus ring error | `rgba(239, 83, 80, 0.25)` | `[data-color-scheme="dark"]` |
| `--color-outlined-ring` | color outlined ring | `rgba(165, 180, 252, 0.4)` | `[data-color-scheme="dark"]` |
| `--color-outlined-ring-hover` | color outlined ring hover | `rgba(165, 180, 252, 0.7)` | `[data-color-scheme="dark"]` |
| `--color-outlined-ring-success` | color outlined ring success | `rgba(102, 187, 106, 0.4)` | `[data-color-scheme="dark"]` |
| `--color-outlined-ring-success-hover` | color outlined ring success hover | `rgba(102, 187, 106, 0.7)` | `[data-color-scheme="dark"]` |
| `--color-outlined-ring-error` | color outlined ring error | `rgba(239, 83, 80, 0.4)` | `[data-color-scheme="dark"]` |
| `--color-outlined-ring-error-hover` | color outlined ring error hover | `rgba(239, 83, 80, 0.7)` | `[data-color-scheme="dark"]` |
| `--color-info-100` | color info 100 | `rgba(40, 53, 147, 0.15)` | `[data-color-scheme="dark"]` |
| `--color-info-300` | color info 300 | `rgba(100, 130, 220, 0.5)` | `[data-color-scheme="dark"]` |
| `--color-primary` | color primary | `#a5b4fc` | `[data-color-scheme="dark"]` |
| `--color-primary-light` | color primary light | `rgba(165, 180, 252, 0.15)` | `[data-color-scheme="dark"]` |
| `--color-primary-dark` | color primary dark | `#c7d2fe` | `[data-color-scheme="dark"]` |
| `--color-info` | color info | `#a5b4fc` | `[data-color-scheme="dark"]` |
| `--color-info-light` | color info light | `rgba(165, 180, 252, 0.15)` | `[data-color-scheme="dark"]` |
| `--color-info-dark` | color info dark | `#c7d2fe` | `[data-color-scheme="dark"]` |
| `--color-success` | color success | `#66bb6a` | `[data-color-scheme="dark"]` |
| `--color-success-light` | color success light | `rgba(102, 187, 106, 0.15)` | `[data-color-scheme="dark"]` |
| `--color-success-dark` | color success dark | `#81c784` | `[data-color-scheme="dark"]` |
| `--color-error` | color error | `#ef5350` | `[data-color-scheme="dark"]` |
| `--color-error-light` | color error light | `rgba(239, 83, 80, 0.15)` | `[data-color-scheme="dark"]` |
| `--color-error-dark` | color error dark | `#e57373` | `[data-color-scheme="dark"]` |
| `--color-warning` | color warning | `#ffa726` | `[data-color-scheme="dark"]` |
| `--color-warning-light` | color warning light | `rgba(255, 167, 38, 0.15)` | `[data-color-scheme="dark"]` |
| `--color-warning-dark` | color warning dark | `#d98e20` | `[data-color-scheme="dark"]` |

### System roles

[Baseline source](../../src/design-systems/neus/generated/tokens.css) · [Editable
specification](../../src/design-systems/neus/DESIGN.md)

| Token | Role | Baseline | Selector / mode |
| --- | --- | --- | --- |
| `--theme-color-scheme` | theme color scheme | `light` | `:root, [data-design-system]` |
| `--color-focus` | color focus | `var(--color-primary)` | `:root, [data-design-system]` |
| `--color-primary-active` | color primary active | `var(--color-primary-dark)` | `:root, [data-design-system]` |
| `--color-control-text` | color control text | `var(--color-primary-text)` | `:root, [data-design-system]` |
| `--color-primary-text` | color primary text | `var(--color-primary)` | `:root, [data-design-system]` |
| `--color-focus-ring` | color focus ring | `color-mix(in srgb, var(--color-focus) 25%, transparent)` | `:root, [data-design-system]` |
| `--color-focus-ring-error` | color focus ring error | `color-mix(in srgb, var(--color-error) 25%, transparent)` | `:root, [data-design-system]` |
| `--type-body-size` | type body size | `var(--fs-base)` | `:root, [data-design-system]` |
| `--type-body-weight` | type body weight | `400` | `:root, [data-design-system]` |
| `--type-body-line-height` | type body line height | `1.5` | `:root, [data-design-system]` |
| `--type-body-tracking` | type body tracking | `0em` | `:root, [data-design-system]` |
| `--type-heading-size` | type heading size | `1.5rem` | `:root, [data-design-system]` |
| `--type-heading-weight` | type heading weight | `700` | `:root, [data-design-system]` |
| `--type-heading-line-height` | type heading line height | `1.3` | `:root, [data-design-system]` |
| `--type-heading-tracking` | type heading tracking | `-0.01em` | `:root, [data-design-system]` |
| `--type-label-size` | type label size | `var(--fs-sm)` | `:root, [data-design-system]` |
| `--type-label-weight` | type label weight | `500` | `:root, [data-design-system]` |
| `--type-label-line-height` | type label line height | `1.4` | `:root, [data-design-system]` |
| `--type-label-tracking` | type label tracking | `0em` | `:root, [data-design-system]` |
| `--type-caption-size` | type caption size | `var(--fs-xs)` | `:root, [data-design-system]` |
| `--type-caption-weight` | type caption weight | `400` | `:root, [data-design-system]` |
| `--type-caption-line-height` | type caption line height | `1.4` | `:root, [data-design-system]` |
| `--type-caption-tracking` | type caption tracking | `0em` | `:root, [data-design-system]` |
| `--type-display-size` | type display size | `clamp(2.5rem, 1.94rem + 2.29vw, 4rem)` | `:root, [data-design-system]` |
| `--type-display-weight` | type display weight | `700` | `:root, [data-design-system]` |
| `--type-display-line-height` | type display line height | `1.05` | `:root, [data-design-system]` |
| `--type-display-tracking` | type display tracking | `-0.03em` | `:root, [data-design-system]` |
| `--type-headline-size` | type headline size | `clamp(2rem, 1.63rem + 1.52vw, 3rem)` | `:root, [data-design-system]` |
| `--type-headline-weight` | type headline weight | `700` | `:root, [data-design-system]` |
| `--type-headline-line-height` | type headline line height | `1.1` | `:root, [data-design-system]` |
| `--type-headline-tracking` | type headline tracking | `-0.025em` | `:root, [data-design-system]` |
| `--type-lead-size` | type lead size | `clamp(1.125rem, 1.08rem + 0.19vw, 1.25rem)` | `:root, [data-design-system]` |
| `--type-lead-weight` | type lead weight | `400` | `:root, [data-design-system]` |
| `--type-lead-line-height` | type lead line height | `1.6` | `:root, [data-design-system]` |
| `--type-lead-tracking` | type lead tracking | `0em` | `:root, [data-design-system]` |
| `--color-layer-01` | color layer 01 | `var(--color-surface-secondary)` | `:root, [data-design-system]` |
| `--color-layer-02` | color layer 02 | `var(--color-surface)` | `:root, [data-design-system]` |
| `--color-field` | color field | `var(--color-surface)` | `:root, [data-design-system]` |
| `--color-selection` | color selection | `var(--color-primary-light)` | `:root, [data-design-system]` |
| `--color-on-selection` | color on selection | `var(--color-primary-text)` | `:root, [data-design-system]` |
| `--color-secondary-container` | color secondary container | `var(--color-surface-secondary)` | `:root, [data-design-system]` |
| `--color-on-secondary-container` | color on secondary container | `var(--color-text-primary)` | `:root, [data-design-system]` |
| `--color-surface-container-lowest` | color surface container lowest | `var(--color-surface)` | `:root, [data-design-system]` |
| `--color-surface-container-low` | color surface container low | `var(--color-surface-secondary)` | `:root, [data-design-system]` |
| `--color-surface-container-high` | color surface container high | `var(--color-surface-secondary)` | `:root, [data-design-system]` |
| `--color-surface-container-highest` | color surface container highest | `var(--color-surface-secondary)` | `:root, [data-design-system]` |
| `--color-tertiary` | color tertiary | `var(--color-info)` | `:root, [data-design-system]` |
| `--color-on-tertiary` | color on tertiary | `var(--color-text-on-info)` | `:root, [data-design-system]` |
| `--elevation-floating` | elevation floating | `0 4px 8px var(--color-shadow)` | `:root, [data-design-system]` |
| `--elevation-dialog` | elevation dialog | `0 4px 20px var(--color-shadow)` | `:root, [data-design-system]` |
| `--color-text-on-success` | color text on success | `#000000` | `:root, [data-design-system]` |
| `--color-text-on-error` | color text on error | `#000000` | `:root, [data-design-system]` |
| `--color-text-on-warning` | color text on warning | `#000000` | `:root, [data-design-system]` |
| `--color-text-on-info` | color text on info | `var(--color-text-on-primary)` | `:root, [data-design-system]` |
| `--color-success-text` | color success text | `color-mix(in srgb, var(--color-success) 25%, var(--color-text-primary))` | `:root, [data-design-system]` |
| `--color-error-text` | color error text | `color-mix(in srgb, var(--color-error) 25%, var(--color-text-primary))` | `:root, [data-design-system]` |
| `--color-warning-text` | color warning text | `color-mix(in srgb, var(--color-warning) 25%, var(--color-text-primary))` | `:root, [data-design-system]` |
| `--color-info-text` | color info text | `color-mix(in srgb, var(--color-info) 25%, var(--color-text-primary))` | `:root, [data-design-system]` |
| `--theme-color-scheme` | theme color scheme | `dark` | `[data-color-scheme="dark"]` |
| `--color-control-text` | color control text | `var(--color-text-primary)` | `[data-color-scheme="dark"]` |

The display, headline and lead roles serve public pages through Heading and Text. Each
system sets its own values: Neus, Apple and Neobrutalism are local decisions, Carbon follows
its fluid display and heading styles, Material its display and headline scale and Vercel the
Geist heading classes. Sizes grow with the viewport between 390px and 1440px.

## Key tokens

The short list for page and component CSS. Prefer a component prop when one exists.

| Token | Use |
| --- | --- |
| `--color-primary`, `--color-primary-text` | Brand fill; brand-colored text and icons on surfaces |
| `--color-text-on-primary` | Text on a primary fill |
| `--color-surface`, `--color-surface-container-low` | Page and raised band backgrounds |
| `--color-text-primary`, `--color-text-secondary` | Body ink and supporting text |
| `--color-border-subtle` | Dividers and quiet outlines |
| `--color-success-text`, `--color-error-text`, `--color-info-text`, `--color-warning-text` | Status text on surfaces |
| `--color-focus` | Focus indicators |
| `--font-display`, `--font-body`, `--font-mono` | Font families |
| `--type-display-size`, `--type-headline-size`, `--type-lead-size` | Fluid page type (prefer Heading and Text) |
| `--fs-sm`, `--fs-md`, `--fs-lg` | Fixed text sizes; running text is `--fs-md` or larger |
| `--space-1` … `--space-16` | Spacing scale (1, 2, 3, 4, 6, 8, 12, 16) |
| `--radius-sm`, `--radius-md`, `--radius-default`, `--radius-pill` | Corner radii |
| `--elevation-floating`, `--elevation-dialog` | Shadows for floating layers |
| `--container-lg-max-width`, `--container-gutter` | Page width and side padding (prefer Container) |
| `--text-measure` | Comfortable line length (prefer Text) |

## Runtime action palette

ThemeProvider writes these on its boundary. Their resolved values take precedence over
ordinary stylesheet declarations on that same element:

| Variables | Meaning |
| --- | --- |
| `--color-primary`, `--color-success`, `--color-error`, `--color-info`, `--color-warning` | Main system or consumer-supplied action colors |
| Corresponding `-light` and `-dark` suffixes | Translucent and darker action variants |
| `--color-text-on-primary`, `--color-text-on-success`, `--color-text-on-error`, `--color-text-on-info`, `--color-text-on-warning` | Foregrounds for action fills |
| Corresponding `-hover` and `-active` foreground suffixes | Foregrounds for hover/active action fills |
| `--color-primary-active` | Primary active fill |
| `--color-focus` | Focus role derived from the selected palette/primary override |
| `--color-primary-text` | Written when primaryColor is overridden |
| `--color-border-light`, `--color-shadow` | Mode-dependent border/shadow values |

Use [ThemeProvider configuration](./theme-provider.md) for palette overrides. The colors
hook contains the palette subset described there, not every token in these tables. CSS
overrides alone do not update the hook.

## Component contracts

Every [component](../components/README.md) and [template](../templates/README.md) guide
lists its applicable recipe tokens, state selectors and runtime values. Shared overlay
tokens cover menu/listbox/picker surfaces. Input presentation tokens are also used by
DateInput, TimeInput, Select and MultiSelect.

Runtime geometry such as clock hand angles, number positions, event duration, tooltip
positions and form column counts belongs to the component implementation. Those values may
appear as inline custom properties; they are not ThemeConfig fields. Consumer styles are
merged after internal defaults on the same element.

## Global helpers

Importing the package CSS also supplies `.neus-gradient-text` for gradient text,
`.neus-eyebrow` for compact uppercase labels, and `.neus-mono` for monospace text. Their
declarations live in [app.css](../../src/css/app.css). They follow the relevant
font/color/gradient tokens.

Use [authoring guidance](../contributing/design-system-authoring.md) to change shipped
defaults. Edit DESIGN.md and generate artifacts; never hand-edit the generated files linked
above.
