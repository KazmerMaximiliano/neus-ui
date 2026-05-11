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
Produce **three files**: `BlogPost.tsx` + `BlogPost.styles.css` + `BlogPost.types.ts`.

### BlogPost.types.ts

```ts
export type RelatedArticle = {
  title: string;
  category: string;
  excerpt: string;
  href: string;
};

export type BlogPostProps = {
  // Static editorial content — no API props
  // Add relatedArticles prop only if "Related articles" was requested
  relatedArticles?: RelatedArticle[];
};
```

### BlogPost.tsx

```tsx
import { Card, Link, Button } from 'neus-ui';
import './BlogPost.styles.css';
import type { BlogPostProps } from './BlogPost.types';

export const BlogPost = ({ relatedArticles }: BlogPostProps) => {
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

### BlogPost.styles.css

Apply Mode from VISUAL DIRECTIVE.

```css
/* Light mode (default) */
.blog { font-family: var(--font-display); }
.blog__masthead {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  /* Light glass nav */
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
.blog__category {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--color-primary);
  margin-bottom: 1rem;
}
.blog__title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-gray-900);
  margin-bottom: 1.5rem;
}
.blog__body { max-width: 680px; margin: 0 auto; font-size: 1.0625rem; line-height: 1.75; color: var(--color-gray-700); }

/* Dark mode overrides — apply when Mode: dark */
/* .blog { background: #0a0a14; color: #e2e8f0; } */
/* .blog__masthead { background: rgba(10,10,20,0.8); border-bottom: 1px solid rgba(255,255,255,0.06); } */
/* .blog__title { color: #e2e8f0; } */
/* .blog__body { color: #94a3b8; } */
```

## Missing Neus UI Components

- **NavigationBar/Masthead**: Use custom `<header>` — document as pending
