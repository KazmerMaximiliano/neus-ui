# Landing Sections — Neus Landing SaaS

All sections use Neus UI components or minimal CSS. No AppTemplate. No sidebar.

## 1. Navigation Header (NavigationBar — pending component)

```tsx
<header className="landing__nav">
  <div className="landing__nav-brand">
    <span className="landing__nav-logo">[ProductName]</span>
  </div>
  <nav className="landing__nav-links">
    {/* White header background → type="primary". Never "secondary" on light bg. */}
    {navItems.map((item) => (
      <Link key={item.label} label={item.label} href={item.href} type="primary" />
    ))}
  </nav>
  <Button label="Get started" variant="solid" color="primary" onClick={() => {}} />
</header>
```

```css
.landing__nav-brand { font-size: 1.25rem; font-weight: 700; color: var(--color-primary); }
.landing__nav-links { display: flex; gap: 1.5rem; align-items: center; }
```

## 2. Hero Section

```tsx
<section className="landing__hero">
  <h1>[ProductName] — [Tagline]</h1>
  <p>[Subheading: 1-2 sentences expanding the tagline]</p>
  <div className="landing__hero-cta">
    <Button label="[Primary CTA]" variant="solid" color="primary" />
    {/* Hero has light background → type="primary" */}
    <Link label="See how it works" type="primary" href="#features" />
  </div>
</section>
```

## 3. Features Grid (using Card icon/title/description slots)

```tsx
<section className="landing__features">
  <h2>Everything you need</h2>
  <div className="landing__features-grid">
    {/* One Card per feature — exact features from intake */}
    <Card
      icon={<Zap size={24} color="var(--color-primary)" />}
      title="[Feature title from intake]"
      description="[Feature description from intake]"
    />
  </div>
</section>
```

## 4. Social Proof (only if user provided real data)

```tsx
<section className="landing__proof">
  <h2>Trusted by companies</h2>

  {/* Metrics (if user provided) */}
  <div className="landing__metrics">
    <div className="landing__metric">
      <span className="landing__metric-value">[metric from intake]</span>
      <span className="landing__metric-label">[label from intake]</span>
    </div>
  </div>

  {/* Testimonials (if user provided) */}
  <div className="landing__testimonials">
    {/* Card with avatar + quote — exact testimonials from intake */}
    <Card avatarImage={testimonial.avatar} avatarAlt={testimonial.name}>
      <blockquote className="landing__quote">"{testimonial.quote}"</blockquote>
      <cite>{testimonial.name} — {testimonial.role}</cite>
    </Card>
  </div>
</section>
```

## 5. Pricing (only if requested)

```tsx
<section className="landing__pricing">
  <h2>Plans and pricing</h2>
  <div className="landing__pricing-grid">
    {/* One Card per plan — exact plans from intake */}
    <Card highlighted={plan.highlighted}>
      {plan.highlighted && <span className="landing__plan-badge">Most popular</span>}
      <h3 className="landing__plan-name">[Plan name from intake]</h3>
      <div className="landing__plan-price">
        <span className="landing__plan-amount">[price]</span>
        <span className="landing__plan-period">/[period]</span>
      </div>
      <ul className="landing__plan-features">
        {/* Exact features from intake for this plan */}
        <li>[feature]</li>
      </ul>
      <Button
        label="[CTA from intake]"
        variant={plan.highlighted ? "solid" : "outlined"}
        color="primary"
        fullWidth
      />
    </Card>
  </div>
</section>
```

```css
.landing__pricing { padding: 4rem 2rem; background: var(--color-gray-100); }
.landing__pricing h2 { text-align: center; font-size: 2rem; font-weight: 600; margin-bottom: 3rem; }
.landing__pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; max-width: 900px; margin: 0 auto; }
.landing__plan-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 0.75rem;
  font-weight: 600;
}
.landing__plan-name { font-size: 1.25rem; font-weight: 600; margin: 0.5rem 0; }
.landing__plan-price { display: flex; align-items: baseline; gap: 0.25rem; margin-bottom: 0.5rem; }
.landing__plan-amount { font-size: 2.5rem; font-weight: 700; color: var(--color-primary); }
.landing__plan-period { font-size: 1rem; color: var(--color-gray-500); }
.landing__plan-features { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; margin-bottom: 1rem; }
.landing__plan-features li { font-size: 0.9rem; color: var(--color-gray-700); padding-left: 1rem; position: relative; }
.landing__plan-features li::before { content: "✓"; position: absolute; left: 0; color: var(--color-success); }
```

## 6. Footer CTA

```tsx
<section className="landing__footer-cta">
  <h2>[Closing headline from intake]</h2>
  <Button label="[Primary CTA text]" variant="solid" color="primary" />
</section>
```

## 7. Footer

```tsx
<footer className="landing__footer">
  <span>{productName} © {new Date().getFullYear()}</span>
  <div className="landing__footer-links">
    {/* Light footer background → type="primary". Use "secondary" only on dark footer bg. */}
    <Link label="Terms" type="primary" href="/terms" />
    <Link label="Privacy" type="primary" href="/privacy" />
  </div>
</footer>
```

```css
.landing__footer { padding: 2rem; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border-light); }
.landing__footer-links { display: flex; gap: 1rem; }
```
