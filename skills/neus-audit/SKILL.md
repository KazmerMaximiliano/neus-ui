---
name: neus-audit
description: Audit interface code built with neus-ui for accessibility, the Vercel Web Interface Guidelines, design-system compliance and generated-look tells, and report findings as file:line with P0/P1/P2 severity. Use when the user asks to review, audit or check UI, accessibility, UX or design quality, and as the verification step of the neus-design skill.
license: Apache-2.0
metadata:
  source: neus-ui
  managed-by: "neus init (rewritten on every run; put project rules in AGENTS.md)"
---

# Neus audit

Review the files or route the user names. With no argument, audit the files
changed since the last commit (`git diff --name-only HEAD` plus untracked
files). You report; you do not edit unless the user asks you to fix the
findings.

## Passes

Run all four, in order. Record findings as you go; deduplicate at the end.

### 1. Deterministic checks

- Types: `npx tsc --noEmit`; in Astro, `npx astro check`.
- `npx neus lint <files> --json` over the audited files, read with
  [references/neus-rules.md](references/neus-rules.md). Every hit is a
  candidate: confirm it by reading the line before you report it.

Every type error and confirmed hit is a finding with its own severity. Report
the lint coverage in the summary.

### 2. Web interface guidelines

Fetch the current Vercel Web Interface Guidelines (MIT):

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

If fetching is not possible, use the snapshot in
[references/web-interface-guidelines.md](references/web-interface-guidelines.md)
and say which one you used. Apply every rule to the code, with the
adjustments in [references/neus-rules.md](references/neus-rules.md): some
rules are already satisfied inside neus components, some depend on the
project's language, and some can only be fixed in the library.

### 3. Design contract and taste

- `neus.config.json`, the active system's Do's and Don'ts (its DESIGN.md:
  `derivedSystem` when set, otherwise
  `node_modules/neus-ui/src/design-systems/<designSystem>/DESIGN.md`) and
  `<styles>/neus.overrides.css` (`paths.styles`).
- The customization ladder and the taste rules of the neus-design skill:
  [../neus-design/references/customization.md](../neus-design/references/customization.md)
  and [../neus-design/references/taste.md](../neus-design/references/taste.md).
- A derived system: its DESIGN.md and the overrides it describes agree.
- The feature spec in `design/specs/` when one covers these files: every
  screen, state and primary action it lists exists.

### 4. Rendered check

When the user gave a route, or the spec names one, run from the project
root:

```sh
npx neus shot <route> --widths 1440,768,390 --json
```

It reuses the dev server a previous run left, or starts the project's
`dev` script, and saves full-page screenshots in `.neus/shots/`. It never
installs browsers. Every entry in its `problems` list is a `render` finding:
horizontal scroll and console errors are P0; running text under 16px,
fonts not loaded and more than one solid button per viewport are P1. Then
open the images and judge what it cannot measure: tap targets, contrast,
focus visibility, alignment, empty areas, broken dark mode. A problem
visible in a screenshot is real whatever the code says.

If it exits with code 2 (no browser or playwright-core), skip this pass and
say so in the report; never describe a render you did not see.

## Severity

- **P0**: blocks use or breaks the contract. Inaccessible control, broken
  state, hand-written palette variable, wrong prop, overflow at 390px,
  contrast below 4.5:1 for body text.
- **P1**: degrades quality. Guideline violations, taste tells, missing
  empty or error state, copy problems.
- **P2**: polish.

## Output

Group by file. One terse line per finding, clickable `file:line`, with its
severity and source tag (`a11y`, `guidelines`, `neus`, `taste`, `spec`,
`render`). Explain only when the fix is not obvious.

```text
## app/orders/OrdersScreen.tsx

app/orders/OrdersScreen.tsx:42 [P0 a11y] icon-only action without accessible name
app/orders/OrdersScreen.tsx:57 [P1 guidelines] "..." → "…"
app/orders/OrdersScreen.tsx:88 [P1 taste] four KPI tiles with invented deltas; show the two real figures

## app/neus.overrides.css

app/neus.overrides.css:12 [P0 neus] --color-primary written by hand; use `npx neus init --primary`

## app/orders/page.tsx

✓ pass

## Library

[library] Sidebar routes render buttons without href: no Cmd/Ctrl+click or new tab (Vercel: links use <a>)
```

Report each library limitation once, in the Library section, never per
usage. End with the count per severity and `Verdict: ship` or
`Verdict: fix P0 first`. Save the report to
`design/audits/<YYYY-MM-DD>-<slug>.md` when the user asked for an audit
rather than a quick check.
