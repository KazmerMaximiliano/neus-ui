---
name: neus-wireframe
description: |
  Generates a lo-fi ASCII wireframe sketch of a UI layout — boxes, labels, and annotations.
  No real components, no CSS. Produces a text-based structural blueprint to validate
  layout decisions before generating real .tsx code.
  Use when user wants to: "wireframe", "boceto", "esquema lo-fi", "layout en papel",
  "sketch de la pantalla", "estructura antes de codear", "lo-fi", "blueprint de la UI",
  "qué estructura tendría", "dibujar el layout", "planear la pantalla".
od:
  mode: prototype
  platform: all
  scenario: design
  design_system:
    requires: false
  craft:
    requires: [anti-slop]
  example_prompt: "Wireframe the sales dashboard before generating it"
---

# Neus Wireframe

Generates a lo-fi ASCII sketch of the requested layout. No components, no CSS. Structure only.

## Phase 0 — Collect Data (minimum)

Ask in one question:
1. What screen/section to sketch?
2. Is it an app (with sidebar) or a public page (without sidebar)?
3. Main sections it must have

## Phase 1 — Generate ASCII Wireframe

Use ASCII characters to represent structure. Rules:
- `┌─┐ └─┘ │` for containers and borders
- `[LABEL]` for interactive elements (buttons, inputs, links)
- `(Text content)` for text content
- `▓▓▓▓▓▓` for image/media placeholders
- `~ ~ ~ ~` for separators or dividers
- Comments with `// ` to the right of elements

### Reference templates

#### App with sidebar (desktop)
```
┌─────────────────────────────────────────────────────┐
│ ┌──────────┐  ┌──────────────────────────────────┐  │
│ │ SIDEBAR  │  │ HEADER                    [Menu] │  │
│ │          │  ├──────────────────────────────────┤  │
│ │ > Item 1 │  │                                  │  │
│ │   Item 2 │  │  MAIN CONTENT                    │  │
│ │   Item 3 │  │                                  │  │
│ │          │  │  ┌──────────┐ ┌──────────┐       │  │
│ │          │  │  │ Card 1   │ │ Card 2   │       │  │
│ │          │  │  └──────────┘ └──────────┘       │  │
│ │          │  │                                  │  │
│ └──────────┘  └──────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

#### Public page (landing)
```
┌─────────────────────────────────────────────────────┐
│ [Logo]    Nav1   Nav2   Nav3          [CTA Button]  │  // sticky header
├─────────────────────────────────────────────────────┤
│                                                     │
│  (Large headline)                   ▓▓▓▓▓▓▓▓▓▓▓▓   │  // hero
│  (Subheadline)                      ▓▓▓▓▓▓▓▓▓▓▓▓   │
│  [Primary CTA]  [Secondary CTA]     ▓▓▓▓▓▓▓▓▓▓▓▓   │
│                                                     │
├─────────────────────────────────────────────────────┤
│  (Section 2)                                        │
│  ┌───────┐  ┌───────┐  ┌───────┐                   │  // features
│  │Feature│  │Feature│  │Feature│                   │
│  └───────┘  └───────┘  └───────┘                   │
└─────────────────────────────────────────────────────┘
```

#### Centered form (auth/modal)
```
         ┌────────────────────────┐
         │ (Form title)           │
         │                        │
         │ Label                  │
         │ ┌──────────────────┐   │
         │ │ input text       │   │
         │ └──────────────────┘   │
         │                        │
         │ Label                  │
         │ ┌──────────────────┐   │
         │ │ input password   │   │
         │ └──────────────────┘   │
         │                        │
         │ [Primary Button]       │
         │                        │
         │ (Link: Already have an account?) │
         └────────────────────────┘
```

## Phase 2 — Legend and Notes

After the wireframe, include:

```
LEGEND
─────────────────────────────
[  ]  →  Interactive element (button, input, link)
(  )  →  Text content
▓▓▓▓  →  Image / media placeholder
> Item  →  Active item in sidebar
─────────────────────────────

LAYOUT NOTES
• [Note about an important layout decision]
• [Neus UI component that maps to each section]
```

## Phase 3 — Neus UI Mapping

After the legend, mapping table:

| Wireframe section | Neus UI Component |
|-------------------|-------------------|
| Sidebar           | AppTemplate (built-in sidebar) |
| [CTA Button]      | `<Button variant="solid" color="primary">` |
| Cards             | `<Card>` |
| Inputs            | `<Input>` |
| ...               | ... |

**Next step:** "To generate the real code, invoke `neus-layout-app` / `neus-page-*` / `neus-landing-*` using this wireframe as reference."
