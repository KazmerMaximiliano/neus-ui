# Page patterns

Start from the closest skeleton and adapt it to the spec. These show the
composition and the required props; check every other prop in the
component's guide (`node_modules/neus-ui/docs/components/<Name>.md`). The interactive skeletons are client code: in
Next.js App Router they are `"use client"` files rendered by the page, and in
Astro they are rendered from an `.astro` page with one client directive (see
frameworks.md). Navigation uses `href` on Button and Sidebar routes; pass
the host router's link as `linkComponent` where one exists.

Icons for Sidebar items and IconButton are lucide-react components, and
custom DataTable cells use AG Grid types. Add `lucide-react` or
`ag-grid-community` to the project's own dependencies before importing from
them; strict package managers such as pnpm do not expose neus-ui's
dependencies to the project.

## 1. App shell with a data list

Use for back-office lists, admin tools and dashboards.

```tsx
import type { ICellRendererParams } from "ag-grid-community";
import { AppTemplate, Badge, Button, DataTable } from "neus-ui";
import type { Order, OrdersPageProps } from "./OrdersPage.types";

export const OrdersPage = ({ orders, pagination, currentPath }: OrdersPageProps) => {
  const routes = [
    { label: "Orders", href: "/orders", active: currentPath.startsWith("/orders") },
    { label: "Customers", href: "/customers", active: currentPath.startsWith("/customers") },
  ];

  return (
    <AppTemplate title="Kestrel Supply" routes={routes} menu={<Button label="New order" size="small" />}>
      <DataTable
        data={orders}
        pagination={pagination}
        noDataTitle="No orders yet"
        noDataDescription="Orders appear here as soon as a customer checks out."
        columnDefs={[
          { field: "customer", headerName: "Customer" },
          { field: "total", headerName: "Total" },
          {
            field: "status",
            headerName: "Status",
            cellRenderer: ({ data }: ICellRendererParams<Order>) => (
              <Badge label={data?.status ?? ""} variant="dot" color={data?.status === "paid" ? "success" : "neutral"} />
            ),
          },
        ]}
        renderMobileCard={(order) => <span>{order.customer} · {order.total}</span>}
      />
    </AppTemplate>
  );
};
```

- One solid primary action in the header; row actions use Menu or text buttons.
- Pagination is controlled: wire `onPaginationChange` to the data source.
- Provide `renderMobileCard` for tables people use on phones.

## 2. Form page

Use for create/edit screens and settings forms.

```tsx
import { Checkbox, DateInput, FormTemplate, Input, Select } from "neus-ui";

export const NewClientForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => (
  <form onSubmit={(event) => { event.preventDefault(); onSubmit(new FormData(event.currentTarget)); }}>
    <FormTemplate submitLabel="Create client" columns={2} mobileColumns={1} gap={24}>
      <Input name="name" label="Legal name" required />
      <Input name="email" label="Billing email" type="email" autoComplete="email" spellCheck={false}
        description="Invoices are sent here." required />
      <Select
        name="plan"
        label="Plan"
        options={[{ value: "basic", label: "Basic" }, { value: "pro", label: "Pro" }]}
        searchBarPlaceholder="Search plans"
      />
      <DateInput name="start" label="Start date" />
      <Checkbox name="invoice" label="Send monthly invoice" />
    </FormTemplate>
  </form>
);
```

- The application owns validation and submission; pass messages through each
  field's `error` prop.
- Labels are always visible. Put required markers on real requirements only.

## 3. Multi-step flow

Combine Stepper with one FormTemplate per step. Keep step state in the
parent, show `Stepper currentStep totalSteps labels showLabels`, and keep
the primary action label specific ("Continue to billing", not "Next").

## 4. Detail or confirmation dialog

```tsx
<Modal isOpen={open} onClose={close}>
  <ModalHeader><h2>Cancel order #1042?</h2></ModalHeader>
  <ModalContent>The customer is refunded and stock returns to inventory.</ModalContent>
  <ModalFooter>
    <Button label="Keep order" variant="text" onClick={close} />
    <Button label="Cancel order" color="error" onClick={confirm} />
  </ModalFooter>
</Modal>
```

- Destructive actions use `color="error"` and a confirmation step.
- One primary button in the footer; the dismiss action is `text` or `outlined`.

## 5. Settings or overview with cards

Group related settings in `Card` sections (`CardHeader`, `CardContent`,
`CardFooter`). Use `variant="outlined"` for dense pages and `elevated` only
for content that floats above the page. Lay cards out with your own CSS grid
using `--space-*` gaps.

## 6. Scheduling

`WeekCalendar` for the week view, `DateInput` / `TimeInput` for editing a
slot inside a Modal, `Badge` for status. Read the WeekCalendar guide for its
event and category shapes before modelling data.

## 7. Content page in Astro

Keep the page in `.astro` with semantic HTML and token-based CSS. Add neus
components as static renders (no client directive) when they have no
handlers, and as islands only where users interact. For promotional
sections, follow pattern 8 and the system DESIGN.md's do's and don'ts.

## 8. Landing page

Use for product, launch and signup pages. Build the sections the brief
lists, each with the layout the dealt composition names (taste.md), and
apply the substance rules: display-scale headline, 16px running text, wide
container, alternating bands, one anchor per section.

```tsx
import { MessageSquareText, Timer } from "lucide-react";
import { Button, Card, CardContent, CardFooter, CardHeader, FormTemplate, Input, Link } from "neus-ui";
import "./LandingPage.css";

const FEATURES = [
  { icon: MessageSquareText, title: "Tell it how you arrive", text: "One sentence is enough; the session adapts its breathing and length." },
  { icon: Timer, title: "Sessions that fit a lift ride", text: "One to ten minutes, at your desk or between meetings." },
];
// SAMPLE: realistic quotes; replace with real ones before launch.
const QUOTES = [
  { quote: "I open it in the lift before the daily.", name: "Lucía", role: "Product designer" },
  { quote: "I wrote that I could not sleep. It gave me five minutes for that.", name: "Martín", role: "Financial analyst" },
];

export const LandingPage = ({ onSignup }: { onSignup: (data: FormData) => void }) => (
  <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="landing-header landing-container">
      <span className="landing-brand">AuraFlow</span>
      <nav aria-label="Main"><Link href="#features" label="How it works" /></nav>
      <Button label="Create my account" href="#signup" variant="outlined" size="small" />
    </header>
    <main id="main">
      <section className="landing-section" aria-labelledby="hero-title">
        <div className="landing-container landing-split">
          <div>
            <h1 id="hero-title" className="landing-display">A pause that fits your day.</h1>
            <p className="landing-lead">Tell AuraFlow how you arrive in one sentence and get a one-to-ten-minute session for that moment.</p>
            <Button label="Create my account" href="#signup" size="large" />
            <p className="landing-note">Two fields, then your first session.</p>
          </div>
          <Card>{/* The real interface or a live demo: the section's anchor. */}</Card>
        </div>
      </section>
      <section id="features" className="landing-section landing-band" aria-labelledby="features-title">
        <div className="landing-container">
          <h2 id="features-title" className="landing-title">Not another audio library.</h2>
          <ul className="landing-grid">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <Card as="li" key={title}>
                <CardHeader><Icon aria-hidden size={24} /><h3>{title}</h3></CardHeader>
                <CardContent><p>{text}</p></CardContent>
              </Card>
            ))}
          </ul>
        </div>
      </section>
      <section className="landing-section" aria-labelledby="voices-title">
        <div className="landing-container">
          <h2 id="voices-title" className="landing-title">Used in the gaps of a full calendar.</h2>
          <ul className="landing-grid">
            {QUOTES.map(({ quote, name, role }) => (
              <Card as="li" key={name}>
                <CardContent><blockquote><p>{quote}</p></blockquote></CardContent>
                <CardFooter><strong>{name}</strong>, {role}</CardFooter>
              </Card>
            ))}
          </ul>
        </div>
      </section>
      <section id="signup" className="landing-section landing-band" aria-labelledby="signup-title">
        <div className="landing-container landing-split">
          <div>
            <h2 id="signup-title" className="landing-title">Start today.</h2>
            <p className="landing-lead">We only ask for your name and email.</p>
          </div>
          <Card>
            <CardContent>
              <form onSubmit={(event) => { event.preventDefault(); onSignup(new FormData(event.currentTarget)); }}>
                <FormTemplate submitLabel="Create my account" columns={1} tabletColumns={1} mobileColumns={1}>
                  <Input name="name" label="Name" autoComplete="name" required />
                  <Input name="email" label="Email" type="email" autoComplete="email" spellCheck={false}
                    description="Only to create your account." required />
                </FormTemplate>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
    <footer className="landing-container landing-footer">© 2026 AuraFlow</footer>
  </>
);
```

```css
.landing-container { max-width: 1200px; margin-inline: auto; padding-inline: clamp(var(--space-4), 4vw, var(--space-8)); }
.landing-section { padding-block: clamp(var(--space-12), 8vw, var(--space-16)); }
.landing-band { background: var(--color-surface-container-low); }
.landing-split { display: grid; gap: var(--space-8); align-items: center; }
.landing-grid { display: grid; gap: var(--space-6); padding: 0; list-style: none; }
.landing-display { font: 700 clamp(var(--fs-3xl), 5vw, var(--fs-5xl)) / 1.05 var(--font-display); text-wrap: balance; }
.landing-title { font: 700 clamp(var(--fs-2xl), 3vw, var(--fs-4xl)) / 1.15 var(--font-display); text-wrap: balance; }
.landing-lead { font-size: var(--fs-lg); max-width: 60ch; }
@media (width >= 768px) { .landing-grid { grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr)); } }
@media (width >= 1024px) { .landing-split { grid-template-columns: 1.1fr 1fr; } }
```

- Every section the brief lists exists; the dealt composition decides its
  layout (features as `cards`, `grid` or `list`; testimonials as `card`,
  `plain` or `featured`).
- Feature and testimonial groups are lists of `Card as="li"` with the
  default `variant="auto"`: the system decides border, fill or flat. Never a
  Card inside a Card.
- One solid action per viewport: the header action is `outlined`.
- Testimonials the brief asks for are marked `SAMPLE:` and listed in the
  delivery; prices, trials and metrics appear only when the brief gives them.
- Run the visual loop (`npx neus shot /`) after the first render.
