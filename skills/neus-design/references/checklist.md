# Delivery checklist

P0 must pass before delivery. P1 should pass. P2 is polish. The searches in
neus-audit's `references/neus-rules.md` cover the items marked (search);
check the rest by reading your diff.

## P0

- [ ] Types pass (`tsc --noEmit` or `astro check`). No `any` added to silence a prop.
- [ ] Every component, prop, part class and token used exists in its guide (search for tokens).
- [ ] No raw hex, rgb or hsl outside `neus.overrides.css` (search).
- [ ] No hand-written palette variables: `--color-primary*`, `--color-success*`, `--color-error*`, `--color-info*`, `--color-text-on-*`, `--color-focus` (search).
- [ ] No inline background, color or border on Button, IconButton, Input or other interactive parts; use a token or variant (search).
- [ ] No selectors on internal parts or third-party DOM; no `!important` (search).
- [ ] Imports only from `"neus-ui"` or `"neus-ui/theme"`; the stylesheet is imported once at the entry (search).
- [ ] One theme owner per document (frameworks.md). Next.js App Router: no functions passed from Server to Client Components; server code imports data from `"neus-ui/theme"`. Astro: no global ThemeProvider inside an island; no functions passed from `.astro` to a hydrated island.
- [ ] No tell from taste.md that the active system does not define.
- [ ] One solid primary action per view. Destructive actions use `color="error"` and confirm first.
- [ ] Every state in the spec exists: loading, empty, error, disabled and success where they apply.
- [ ] Forms: visible labels, field-level `error` messages that say how to fix it, real submit handling or a named handler.
- [ ] Copy is real and specific. No lorem ipsum, no "Feature one", no invented metrics (search for common filler).
- [ ] No emoji as functional icons; icons come from one family (lucide-react).
- [ ] User-facing defaults are in the project's language (search placeholders, uploader texts, sidebar labels, empty-table texts).
- [ ] Nothing outside the requested scope changed.

## P1

- [ ] Layout reflows at 375px with no horizontal scroll; DataTable has `renderMobileCard` when the table matters on phones.
- [ ] Spacing uses `--space-*`; type uses the system's roles. No one-off pixel values in your own CSS.
- [ ] Hierarchy comes from size, weight, spacing and position, not from extra borders or cards.
- [ ] Hover, focus-visible and disabled states keep at least the default contrast. Check dark mode separately.
- [ ] Sections alternate density; the page does not repeat the same block three times.
- [ ] Buttons say what happens ("Create client", not "Submit").

## P2

- [ ] One deliberate visual move per page, consistent with the system's DESIGN.md.
- [ ] Gradient and glow helpers appear at most once, and never in product chrome when the system's don'ts exclude promotional treatments.
- [ ] Spec updated with any decision made during the build.
