# Dark Landing Patterns — neus-landing-generic

Reference patterns for generic landing pages when `Mode: dark`. CSS recipes come from `.agents/skills/_shared/dark-surfaces.md`. This file documents **layout structure, composition, and component usage** — the section order, grid ratios, and JSX anatomy.

**Core rule:** Always prefer Neus UI components. Raw HTML/CSS is only used for patterns with no Neus UI equivalent (brand mark, eyebrow pill dot, art panel glyph, meta row avatar).

---

## 1 — Page Structure (dark)

```tsx
import { Button, Card, Link, Input, Badge } from 'neus-ui';

<div className="[root]">
  <div className="[root]__mesh" aria-hidden="true" />
  <div className="[root]__grid" aria-hidden="true" />
  <div className="[root]__content">
    <nav className="[root]__nav">…</nav>
    <main>
      <section className="[root]__hero">…</section>
      <section className="[root]__[section2]">…</section>
      {/* exactly the sections from intake */}
    </main>
    <footer className="[root]__footer">…</footer>
  </div>
</div>
```

Mesh and grid divs: `aria-hidden="true"`, `pointer-events: none`, `z-index: 0`. Content wrapper: `position: relative; z-index: 1`.

---

## 2 — Sticky Glass Nav

Nav links use `<Link type="secondary">`. CTA uses `<Button>`.

```tsx
<nav className="[root]__nav">
  <div className="[root]__nav-brand">
    <div className="[root]__brand-mark" aria-hidden="true">
      {brandInitial}
    </div>
    <span className="[root]__brand-name">{brandName}</span>
  </div>
  <div className="[root]__nav-links">
    {navItems.map(item => (
      <Link key={item.href} type="secondary" href={item.href} label={item.label} />
    ))}
  </div>
  <Button label={ctaLabel} variant="solid" color="primary" size="small" onClick={onCtaClick} />
</nav>
```

CSS: glass nav recipe from `dark-surfaces.md §3`. Nav links hidden below 640px.

---

## 3 — Hero (dark, asymmetric 2-col)

Layout: `grid-template-columns: 1.4fr 0.6fr`, left = copy, right = visual panel or featured card.

```tsx
<section className="[root]__hero" aria-labelledby="[root]-title">
  <div className="[root]__hero-copy">
    <div className="[root]__eyebrow-pill">
      <span className="[root]__eyebrow-dot" aria-hidden="true" />
      {brandName}
      <span aria-hidden="true">/</span>
      {taglineKeyword}
    </div>
    <h1 id="[root]-title">
      {headlinePart1}{" "}
      <span className="gradient-text">{headlineAccent}</span>
    </h1>
    <p className="[root]__hero-sub">{tagline}</p>
    <div className="[root]__hero-cta">
      <Button label={primaryCta.label} variant="solid" color="primary" onClick={primaryCta.onClick} />
      <Button label={secondaryCta.label} variant="outlined" color="primary" onClick={secondaryCta.onClick} />
    </div>
  </div>
  <div className="[root]__hero-visual">
    {/* right panel — featured Card or art panel */}
  </div>
</section>
```

CSS:
- Section: `padding: 6rem 2rem`, `max-width: min(72rem, 100%)`, `margin: 0 auto`
- Grid: `display: grid; grid-template-columns: 1.4fr 0.6fr; gap: 3rem; align-items: center`
- H1: `font-family: var(--font-display); font-size: clamp(2.5rem,6vw,4rem); font-weight: 800; letter-spacing: -0.04em; line-height: 0.98`
- Animation: `neus-fade-up` on `.hero-copy` only

---

## 4 — Featured Content Split (blog/editorial)

Use `<Card variant="glass">` for the outer wrapper. Art panel is raw — no Neus UI equivalent.

```tsx
<Card variant="glass">
  <div className="[root]__featured-inner">
    <div className="[root]__featured-art" aria-hidden="true">
      <div className="[root]__featured-glyph">
        {"</>"}
        <span className="[root]__featured-cursor" />
      </div>
    </div>
    <div className="[root]__featured-body">
      <div className="[root]__pill-row">
        <Badge variant="solid" color="primary" label="Featured" />
        {article.categories?.map(cat => (
          <Badge
            key={cat}
            variant="solid"
            color={BADGE_COLOR[cat] ?? "neutral"}
            label={cat}
          />
        ))}
      </div>
      <h3>{article.title}</h3>
      {article.excerpt && <p className="[root]__featured-dek">{article.excerpt}</p>}
      <div className="meta-row">
        <div className="meta-row__avatar">{authorInitial}</div>
        <span className="meta-row__author">{article.author}</span>
        <span className="meta-row__sep">·</span>
        <span>{article.meta}</span>
      </div>
    </div>
  </div>
</Card>
```

CSS:
- `.featured-inner`: `display: grid; grid-template-columns: 1.05fr 0.95fr`
- Art panel: featured-art recipe from `dark-surfaces.md §8`
- Meta row: `dark-surfaces.md §9`
- Collapse to 1-col at ≤960px

---

## 5 — Article Card Grid (3-col, glass cards)

Use `<Card variant="glass">` for cards. Use `<Badge>` for category pills.

```tsx
<div className="[root]__article-grid">
  {articles.map(article => (
    <Card variant="glass" key={article.id} onClick={() => onArticleClick?.(article.id)}>
      <div className="[root]__article-card-inner">
        <div className="[root]__pill-row">
          {article.categories?.map(cat => (
            <Badge
              key={cat}
              variant="solid"
              color={BADGE_COLOR[cat] ?? "neutral"}
              label={cat}
            />
          ))}
        </div>
        <h3>{article.title}</h3>
        {article.excerpt && <p className="[root]__article-dek">{article.excerpt}</p>}
        <div className="meta-row">
          <div className="meta-row__avatar">{getInitial(article.author)}</div>
          <span className="meta-row__author">{article.author}</span>
          <span className="meta-row__sep">·</span>
          <span>{article.meta}</span>
        </div>
      </div>
    </Card>
  ))}
</div>
```

CSS:
- Grid: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px`
- Inner: `display: flex; flex-direction: column; gap: 14px; min-height: 280px`
- H3: `font-family: var(--font-display); font-size: 19px; font-weight: 600; line-height: 1.25; letter-spacing: -0.015em; margin: 0`
- Dek: `font-size: 13.5px; color: #94a3b8; line-height: 1.55; flex: 1`
- Collapse to 1-col at ≤960px

---

## 6 — Section Head Split (dark)

Left: eyebrow + title. Right: "see all" `<Link type="secondary">`.

```tsx
<div className="[root]__section-head">
  <div>
    <p className="[root]__sec-eyebrow">{sectionLabel}</p>
    <h2 className="[root]__sec-title">{sectionTitle}</h2>
    {sectionSub && <p className="[root]__sec-sub">{sectionSub}</p>}
  </div>
  {seeAllHref && (
    <Link label="See all →" type="secondary" href={seeAllHref} />
  )}
</div>
```

CSS:
- Container: `display: flex; align-items: flex-end; justify-content: space-between; gap: 48px; margin-bottom: 40px`
- Eyebrow: `font-family: var(--font-mono); font-size: 11px; color: #818cf8; text-transform: uppercase; letter-spacing: 0.25em; margin: 0 0 14px`
- Title: `font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 700; letter-spacing: -0.03em; line-height: 1.05; margin: 0; color: #e2e8f0`

---

## 7 — Newsletter Glow Card

Outer glow card is CSS. Form uses Neus UI `<Input>` + `<Button>`.

```tsx
<section className="[root]__newsletter">
  <div className="[root]__nl-card">
    <p className="[root]__sec-eyebrow">Newsletter</p>
    <h2>
      Stay in the loop.{" "}
      <span className="gradient-text">No noise.</span>
    </h2>
    <p className="[root]__nl-dek">{newsletterDescription}</p>
    {subscribed ? (
      <p className="[root]__nl-success">✓ You're subscribed — thanks!</p>
    ) : (
      <div className="[root]__nl-form">
        <Input
          name="newsletter-email"
          type="email"
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChange={setEmail}
          required
        />
        <Button
          label={loading ? "…" : "Subscribe"}
          type="submit"
          variant="solid"
          color="primary"
          loading={loading}
          onClick={() => onSubscribe?.(email)}
        />
      </div>
    )}
    {subscribeError && <p className="[root]__nl-error">{subscribeError}</p>}
  </div>
</section>
```

CSS: nl-card recipe from `dark-surfaces.md §4`. Newsletter section: `padding: 6rem 2rem`.

```css
.[root]__nl-form {
  display: flex;
  gap: 1rem;
  align-items: flex-end;
  max-width: 520px;
  margin: 0 auto;
}
```

---

## 8 — Byline / Stats Row (optional, under hero)

```tsx
import { FiCheck } from 'react-icons/fi'; // already in project

<div className="[root]__byline-row">
  <span className="[root]__byline-pellet">
    <FiCheck size={14} />
    {stat1}
  </span>
  <span className="[root]__byline-pellet">
    <FiCheck size={14} />
    {stat2}
  </span>
</div>
```

CSS: `display: flex; align-items: center; justify-content: center; gap: 32px; flex-wrap: wrap; color: #64748b; font-size: 12px; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.15em; margin-top: 56px`

---

## 9 — Dark Footer

Footer links use `<Link type="secondary">`.

```tsx
<footer className="[root]__footer">
  <span>© {new Date().getFullYear()} {brandName}.</span>
  <div className="[root]__footer-links">
    {footerLinks.map(link => (
      <Link key={link.href} type="secondary" href={link.href} label={link.label} />
    ))}
  </div>
</footer>
```

CSS: `dark-surfaces.md §10`.

---

## 10 — Responsive Summary

| Breakpoint | Change |
|---|---|
| ≤960px | Featured split → 1-col; article grid → 1-col; section head → stack |
| ≤640px | Nav links hidden; hero grid → 1-col; nl-card padding → 48px 24px |

---

## BADGE_COLOR Mapping (define in `.types.ts`)

```ts
import type { BadgeColor } from 'neus-ui';

export const BADGE_COLOR: Record<string, BadgeColor> = {
  systems:  "primary",  // indigo #a5b4fc in dark
  design:   "error",    // red #ef5350 in dark
  craft:    "neutral",  // gray #64748b in dark
  tools:    "success",  // green #66bb6a in dark
  featured: "primary",
};
```

Primary and info resolve identically in dark mode — use only primary, error, neutral, success for 4 visually distinct categories. Map a 5th category to `"neutral"` as fallback.

---

## Section Padding Rhythm

| Section | Padding |
|---|---|
| Hero | `6rem 2rem` |
| Content sections | alternate `6rem 2rem` and `5rem 2rem` |
| Newsletter | `6rem 2rem` |
| Footer | `36px 32px 48px` |

Max-width wrapper: `max-width: min(72rem, 100%); margin: 0 auto` inside each section.
