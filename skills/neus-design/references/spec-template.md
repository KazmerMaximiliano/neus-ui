# Spec template

Save as `design/specs/<slug>.md`. Keep it short; it is the memory that lets a
later session, or another agent, continue the same design.

```md
# <Feature name>

Status: draft | building | delivered
Framework: react | next | astro · Rendering: spa | ssr | rsc | islands
Design system: <id from neus.config.json> · Color scheme: light | dark | both
Brand: <brand from neus.config.json> · chosen from: <the directions offered>

## Answers
The Phase 1 questions and the option the user chose for each.

## Goal
One or two sentences: who does what, and what success looks like.

## Audience and context
Internal or customer-facing, device priority, frequency of use.

## Public page (landing and marketing pages only)
Inventory: eight to twelve facts only this subject has (from the brief).
Argument: section → claim → proof; every section the brief lists.
Composition: dealt option and seed → hero / features / testimonials / cta → why.
Idea sentence: On this page, <something only this subject has> becomes <device>.

## Screens and flow
1. <Screen> — route `<path>` — primary task — primary action label
2. ...

## Component map
| Screen | Region | Components and key props |
| --- | --- | --- |
| Orders | Shell | AppTemplate title="Kestrel Supply", routes from currentPath |
| Orders | List | DataTable (controlled pagination, renderMobileCard), Badge variant="dot" |

## States
| Screen | Loading | Empty | Error | Other |
| --- | --- | --- | --- | --- |

## Content
Real labels, headings and empty-state copy. Mark unknown values as
placeholders: `[pending: refund policy text]`.

## Customization decisions
- Level 0 (variants): ...
- Level 1 (palette): unchanged | `npx neus init --yes --primary <hex> --brand "..."`
- Level 2 (tokens in neus.overrides.css): the brand block (brand.md); other token → value → reason
- Level 3/4 (part classes/styles): part → reason

## Assumptions and open questions
- Assumed ... (user can change it by ...)
```
