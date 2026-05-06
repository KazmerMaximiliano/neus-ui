# Blog Layouts — Neus Page Blog

## 1. Masthead / Navigation

```tsx
<header className="blog__masthead">
  <div className="blog__masthead-inner">
    <Link label="[BlogName]" type="primary" href="/" />
    <nav className="blog__nav">
      {navItems.map((item) => (
        <Link key={item.label} label={item.label} href={item.href} type="secondary" />
      ))}
    </nav>
  </div>
</header>
```

```css
.blog__masthead { border-bottom: 1px solid var(--color-border-light); padding: 1rem 2rem; }
.blog__masthead-inner { max-width: 760px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
.blog__nav { display: flex; gap: 1.5rem; }
```

## 2. Article Header

```tsx
<div className="blog__article-header">
  <span className="blog__category">[Category]</span>
  <h1 className="blog__title">[Article Title]</h1>
  <div className="blog__meta">
    <span className="blog__author">{author.name}</span>
    <span className="blog__date">{formattedDate}</span>
    <span className="blog__read-time">5 min read</span>
  </div>
</div>
```

```css
.blog__article-header { max-width: 760px; margin: 3rem auto 2rem; padding: 0 2rem; }
.blog__category {
  display: inline-block;
  background: var(--color-primary-light);
  color: var(--color-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 3em;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}
.blog__title { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700; line-height: 1.2; margin-bottom: 1rem; color: var(--color-gray-900); }
.blog__meta { display: flex; gap: 1rem; align-items: center; font-size: 0.9rem; color: var(--color-gray-500); }
```

## 3. Hero Image

```tsx
<div className="blog__hero-image">
  {/* Aspect ratio container — 16:9 */}
  <div className="blog__hero-image-inner" />
</div>
```

```css
.blog__hero-image { max-width: 900px; margin: 0 auto 2rem; padding: 0 2rem; }
.blog__hero-image-inner {
  aspect-ratio: 16/9;
  background: var(--color-gray-200);
  border-radius: 16px;
  /* In real usage: background-image: url(article.image); background-size: cover; */
}
```

## 4. Article Body

```tsx
<article className="blog__body">
  <p>[Lead paragraph]</p>
  <h2>[Section H2]</h2>
  <p>[Body paragraph]</p>
  <blockquote className="blog__pullquote">
    [Pull quote from article]
  </blockquote>
  {/* Continue with sections from intake */}
</article>
```

```css
.blog__body { max-width: 760px; margin: 0 auto; padding: 0 2rem 3rem; }
.blog__body p { font-size: 1.05rem; line-height: 1.75; color: var(--color-gray-700); margin-bottom: 1.25rem; }
.blog__body h2 { font-size: 1.5rem; font-weight: 600; margin: 2rem 0 1rem; color: var(--color-gray-900); }
.blog__pullquote {
  border-left: 4px solid var(--color-primary);
  padding: 1rem 1.5rem;
  margin: 2rem 0;
  background: var(--color-primary-light);
  border-radius: 0 8px 8px 0;
  font-size: 1.15rem;
  font-style: italic;
  color: var(--color-gray-700);
}
```

## 5. Author Bio

```tsx
<div className="blog__author-bio">
  {author.avatar && (
    <img src={author.avatar} alt={author.name} className="blog__author-avatar" />
  )}
  <div>
    <strong className="blog__author-name">{author.name}</strong>
    {author.role && <p className="blog__author-role">{author.role}</p>}
  </div>
</div>
```

```css
.blog__author-bio {
  max-width: 760px;
  margin: 0 auto 3rem;
  padding: 1.5rem 2rem;
  border-top: 1px solid var(--color-border-light);
  display: flex;
  gap: 1rem;
  align-items: center;
}
.blog__author-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; }
.blog__author-name { font-weight: 600; color: var(--color-gray-900); }
.blog__author-role { font-size: 0.85rem; color: var(--color-gray-500); margin-top: 0.25rem; }
```

## 6. Related Posts (using Card)

```tsx
<section className="blog__related">
  <h2>Related articles</h2>
  <div className="blog__related-grid">
    {relatedPosts.map((post) => (
      <Card key={post.id} trailing={<Link label="Read more →" type="primary" href={post.href} />}>
        <div className="blog__related-post">
          <span className="blog__category">{post.category}</span>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      </Card>
    ))}
  </div>
</section>
```

```css
.blog__related { max-width: 900px; margin: 0 auto; padding: 2rem; }
.blog__related h2 { font-size: 1.5rem; font-weight: 600; margin-bottom: 1.5rem; }
.blog__related-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem; }
.blog__related-post h3 { font-size: 1rem; font-weight: 600; margin: 0.5rem 0; color: var(--color-gray-900); }
.blog__related-post p { font-size: 0.9rem; color: var(--color-gray-600); line-height: 1.5; }
```
