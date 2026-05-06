# Pricing Layouts — Neus Landing Pricing

## Plan Cards Grid

Use `Card` with `highlighted` prop. Compose pricing content in `children`.

```tsx
import { Card, Button } from 'neus-ui';

<section className="pricing__plans">
  <div className="pricing__plans-grid">
    {/* One Card per plan from intake */}
    <Card highlighted={plan.featured}>
      <div className="pricing__plan-header">
        <h3 className="pricing__plan-name">{plan.name}</h3>
        {plan.featured && <span className="pricing__badge">Recommended</span>}
      </div>
      <div className="pricing__plan-price">
        <span className="pricing__amount">${plan.price}</span>
        <span className="pricing__period">/{plan.period}</span>
      </div>
      <ul className="pricing__features">
        {plan.features.map((f) => <li key={f}>{f}</li>)}
      </ul>
      <Button
        label={plan.ctaText}
        variant={plan.featured ? 'solid' : 'outlined'}
        color="primary"
        fullWidth
      />
    </Card>
  </div>
</section>
```

```css
.pricing__plans { padding: 4rem 2rem; }
.pricing__plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  align-items: start;
}
.pricing__plan-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
.pricing__plan-name { font-size: 1.25rem; font-weight: 600; margin: 0; }
.pricing__badge {
  background: var(--color-primary-light);
  color: var(--color-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 3em;
  font-size: 0.75rem;
  font-weight: 600;
}
.pricing__plan-price { display: flex; align-items: baseline; gap: 0.25rem; margin-bottom: 1rem; }
.pricing__amount { font-size: 2.5rem; font-weight: 700; color: var(--color-primary); }
.pricing__period { font-size: 1rem; color: var(--color-gray-500); }
.pricing__features { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; flex: 1; margin-bottom: 1rem; }
.pricing__features li {
  font-size: 0.9rem;
  color: var(--color-gray-700);
  padding-left: 1.25rem;
  position: relative;
}
.pricing__features li::before { content: "✓"; position: absolute; left: 0; color: var(--color-success); font-weight: 700; }
```

## Comparison Table

```tsx
<section className="pricing__comparison">
  <h2>Compare plans</h2>
  <div className="pricing__table-wrapper">
    <table className="pricing__table">
      <thead>
        <tr>
          <th>Feature</th>
          {plans.map((p) => <th key={p.name}>{p.name}</th>)}
        </tr>
      </thead>
      <tbody>
        {features.map((feature) => (
          <tr key={feature.name}>
            <td>{feature.name}</td>
            {plans.map((plan) => (
              <td key={plan.name}>
                {plan.features.includes(feature.name) ? '✓' : '—'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
```

```css
.pricing__comparison { padding: 2rem; max-width: 900px; margin: 0 auto; }
.pricing__table-wrapper { overflow-x: auto; }
.pricing__table { width: 100%; border-collapse: collapse; }
.pricing__table th, .pricing__table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
  font-size: 0.9rem;
}
.pricing__table th { font-weight: 600; color: var(--color-gray-700); background: var(--color-gray-100); }
.pricing__table td:first-child { color: var(--color-gray-700); }
.pricing__table td:not(:first-child) { text-align: center; color: var(--color-success); }
```

## FAQ (using HTML details/summary — Accordion pending)

```tsx
<section className="pricing__faq">
  <h2>Frequently asked questions</h2>
  <div className="pricing__faq-list">
    {faqs.map((faq) => (
      <details key={faq.question} className="pricing__faq-item">
        <summary className="pricing__faq-question">{faq.question}</summary>
        <p className="pricing__faq-answer">{faq.answer}</p>
      </details>
    ))}
  </div>
</section>
```

```css
.pricing__faq { padding: 3rem 2rem; max-width: 700px; margin: 0 auto; }
.pricing__faq h2 { font-size: 1.75rem; font-weight: 600; margin-bottom: 2rem; text-align: center; }
.pricing__faq-list { display: flex; flex-direction: column; gap: 0.75rem; }
.pricing__faq-item {
  border: 1px solid var(--color-border-light);
  border-radius: 16px;
  padding: 1rem 1.25rem;
  cursor: pointer;
}
.pricing__faq-item[open] { border-color: var(--color-primary-light); }
.pricing__faq-question {
  font-weight: 600;
  color: var(--color-gray-900);
  list-style: none;
}
.pricing__faq-question::-webkit-details-marker { display: none; }
.pricing__faq-answer { margin-top: 0.75rem; color: var(--color-gray-600); line-height: 1.6; font-size: 0.95rem; }
```
