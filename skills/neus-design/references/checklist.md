# Delivery checklist

P0 must pass before delivery. P1 should pass. P2 is polish. `npx neus lint`
checks the items marked (lint); check the rest by reading your diff.

## P0

- [ ] Types pass (`tsc --noEmit` or `astro check`). No `any` added to silence a prop.
- [ ] `npx neus lint` reports no P0: only tokens and classes that exist, no raw colors outside `neus.overrides.css`, no hand-written palette variables, no inline colors on interactive components, no `!important`, imports only from public entries, one theme owner per document (lint).
- [ ] Every component, prop and part used exists in its guide (`npx neus docs <Name>`).
- [ ] Next.js App Router: no functions passed from Server to Client Components; server code imports data from `"neus-ui/theme"`. Astro: no functions passed from `.astro` to a hydrated island (frameworks.md).
- [ ] No tell from taste.md that the active system does not define.
- [ ] One solid primary action per view. Destructive actions use `color="error"` and confirm first.
- [ ] Every state in the spec exists: loading, empty, error, disabled and success where they apply.
- [ ] Forms: visible labels, `required` on required fields (never "Required" as a hint), field-level `error` messages that say how to fix it, real submit handling or a named handler.
- [ ] Form rows are even: every field of a row has a hint or none, hints fit one line (examples go in `placeholder`), a long one gets its own row (`className="form-template__full"`); `neus shot` reports no uneven form row.
- [ ] Copy is real and specific. No lorem ipsum, no "Feature one" (lint finds common filler).
- [ ] Sample social proof is marked `SAMPLE:` in the code and listed in the delivery; no prices, trials, guarantees or metrics the brief did not give.
- [ ] No emoji as functional icons; icons come from one family (lucide-react) (lint).
- [ ] User-facing defaults are in the project's language (search placeholders, uploader texts, sidebar labels, empty-table texts).
- [ ] Every section the brief lists exists.
- [ ] `brand` in `neus.config.json` is decided (a direction or `"system"`); it is still `null` only when the user skipped the question, and the delivery says so.
- [ ] Brand overrides set only the tokens in brand.md, in light and dark, with ink at 4.5:1 or more on both grounds.
- [ ] `npx neus shot` ran after the last change and its 1440 and 390 px screenshots were opened, or the delivery says why it could not run.
- [ ] Nothing outside the requested scope changed.

## P1

- [ ] `npx neus lint` lists no raw element a neus component replaces (headings, paragraphs, sections, lists, buttons, fields, links); component coverage of 80% or more (lint).
- [ ] Layout reflows at 375px with no horizontal scroll; DataTable has `renderMobileCard` when the table matters on phones.
- [ ] Spacing comes from Stack, Grid and Section or `--space-*`; type from Heading and Text. No one-off pixel values in your own CSS.
- [ ] Hierarchy comes from size, weight, spacing and position, not from extra borders. Cards hold discrete objects (a feature, a quote, a widget, a form), never other cards.
- [ ] Public pages meet the substance rules in taste.md: `Heading size="display"`, running text of 16px or more, Section bands at the system's width, an anchor in every section.
- [ ] Hover, focus-visible and disabled states keep at least the default contrast. Check dark mode separately.
- [ ] Sections alternate density; the page does not repeat the same block three times.
- [ ] Buttons say what happens ("Create client", not "Submit").

## P2

- [ ] One deliberate visual move per page, consistent with the system's DESIGN.md.
- [ ] Gradient and glow helpers appear at most once, and never in product chrome when the system's don'ts exclude promotional treatments.
- [ ] Spec updated with any decision made during the build.
