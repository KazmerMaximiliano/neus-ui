# Evaluation rubric

Score each run after `score.mjs` has saved its screenshots. Write the scores in
`runs/<label>/<brief>/scores.json`, then rebuild the summary with
`node eval/score.mjs --label <label>`.

## Axes (1 to 5)

Judge the 1440 and 390 px screenshots first, the code second.

| Axis | 1 | 3 | 5 |
| --- | --- | --- | --- |
| `hierarchy` | Flat: headline barely larger than body, body under 16px | Clear levels, but timid scale or crowded sections | Display headline, lead, body and captions read in order at a glance |
| `composition` | One narrow column, sections that repeat the same block | Varied sections, some empty or anchorless | Wide container, alternating bands, a visual anchor in every section |
| `fidelity` | Another palette or fonts; mostly hand-written HTML | System kept, but many elements neus could resolve are hand-written | System palette and fonts; neus components wherever the catalog has one |
| `substance` | Sections missing, filler copy or invented facts | Every section present, thin or generic content | Complete, specific content; microcopy by the CTA; samples marked, no invented facts |
| `responsive` | Horizontal scroll or broken layout at 390 px | Works at 390 px with awkward spacing or order | Reads as designed for phones |
| `polish` | Misaligned edges, inconsistent spacing, broken states | Minor inconsistencies | Consistent rhythm, alignment and states, light and dark |

## Head to head (`versus`)

Put the two 1440 px screenshots side by side, hiding which one is ours:
`runs/<label>/<brief>/shots/index-1440.png` and the Claude Design capture in
`reference/<brief>/`. Pick the page you would ship. Record `"win"`, `"tie"` or
`"loss"` for our run.

## Other fields

- `readScreenshots`: `true` when the session opened its own `neus shot`
  screenshots (check the transcript), `false` when it did not.
- `notes`: the three most visible problems, in a few words each.

## Phase cuts

| Phase | Passes when |
| --- | --- |
| 1 · Skill and visual loop | Brief 01 renders with `data-design-system="neus"`, `--color-primary` #283593 and Manrope, and every run has `readScreenshots: true` |
| 2 · Foundations | Every brief: component coverage of 80% or more, no P0 from `neus lint`, smallest running text of 16px or more |
| 3 · Sections and feedback | `win` or `tie` in at least 2 of the 3 public pages (01, 04, 05) |
| 4 · None mode | All five briefs pass the phase 2 cut and score `versus` win or tie with `--system none` |
