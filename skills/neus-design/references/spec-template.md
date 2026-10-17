# Spec template

Save as `design/specs/<slug>.md`. Keep it short; it is the memory that lets a
later session, or another agent, continue the same design.

```md
# <Feature name>

Status: draft | building | delivered
Framework: react | next | astro · Rendering: spa | ssr | rsc | islands
Design system: <id from neus.config.json> · Color scheme: light | dark | both

## Goal
One or two sentences: who does what, and what success looks like.

## Audience and context
Internal or customer-facing, device priority, frequency of use.

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
- Level 1 (palette): unchanged | changed with `npx neus init --yes --primary ...`
- Level 2 (tokens in neus.overrides.css): token → value → reason
- Level 3/4 (part classes/styles): part → reason

## Assumptions and open questions
- Assumed ... (user can change it by ...)
```
