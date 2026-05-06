---
name: neus-page-blog
description: |
  Generates an editorial blog post / article page layout using Neus UI Button, Card, and Link.
  Produces a .tsx file with masthead, article header, body, author bio, and related posts.
  NO AppTemplate — editorial layout without app sidebar.
  Use whenever the user asks for: "blog post", "artículo", "nota de blog", "editorial page",
  "article layout", "página de artículo", "blog layout", "content page". Always use for
  any editorial or long-form content page in a Neus UI project.
od:
  mode: prototype
  platform: web
  scenario: marketing
  design_system:
    requires: true
  inputs:
    - name: article_topic
      type: string
      required: true
      description: "Article topic or title"
  craft:
    requires: [anti-slop, neus-components, typescript]
  example_prompt: "Blog layout for an article about artificial intelligence in finance"
---

# Neus Page Blog

Generates an editorial layout for blog articles. No AppTemplate.

## Before starting

Read:
- `.agents/skills/_shared/anti-slop.md` — mandatory quality rules ("Marketing Pages" section)
- `.agents/skills/_shared/prop-constraints.md` — forbidden props and non-existent components
- `.agents/skills/_shared/component-catalog.md` — Button, Link sections
- `.agents/skills/_shared/checklist.md` — P0/P1/P2 gates
- `references/blog-layouts.md` — masthead, article, author patterns

## Phase 0 — Collect Data

Ask in free text:
1. Blog / brand name
2. Article title (H1)
3. Article category/tag
4. Author (name + optional role)
5. Include "Related articles" section? (yes/no — if yes: how many)
6. Masthead nav items (exact links)
7. Primary theme color

## Phase 2 — Generate Artifact

Read `references/blog-layouts.md` for each section's patterns.

```tsx
import { Card, Link, Button } from 'neus-ui';

type BlogPostProps = {
  // Static content — editorial copy, no API props
};

export const BlogPost = () => {
  return (
    <div className="blog">
      {/* 1. Masthead (Nav) */}
      {/* 2. Article Header (category, title, author, date) */}
      {/* 3. Hero image (aspect-ratio container) */}
      {/* 4. Article Body (prose) */}
      {/* 5. Author Bio */}
      {/* 6. Related Posts (Card grid) — if requested */}
    </div>
  );
};
```

## Missing Neus UI Components

- **NavigationBar/Masthead**: Use custom `<header>` — document as pending
