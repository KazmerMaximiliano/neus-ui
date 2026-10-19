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
for content that floats above the page. Lay cards out with `Grid` (for example
`<Grid minItemWidth="20rem">`) and page titles with `Heading` and `Text`.

## 6. Scheduling

`WeekCalendar` for the week view, `DateInput` / `TimeInput` for editing a
slot inside a Modal, `Badge` for status. Read the WeekCalendar guide for its
event and category shapes before modelling data.

## 7. Content page in Astro

Render Heading, Text, Section, Container, Stack and Grid statically from the
`.astro` page (no client directive): they have no handlers. Add interactive
neus components as islands only where users interact. For promotional
sections, follow pattern 8 and the system DESIGN.md's do's and don'ts.

## 8. Landing page

Use for product, launch and signup pages. Build the sections the brief
lists, each with the variant the dealt composition names (taste.md), and
apply the substance rules. The page sections from `neus-ui/sections` carry
the structure, scale and rhythm of the active system; Heading, Text,
Section, Grid and Card cover what they do not (an agenda, prices, a team).

```tsx
import { MessageSquareText, Timer } from "lucide-react";
import { Avatar, Button, Card, CardContent, FormTemplate, Input, Section } from "neus-ui";
import {
  CallToAction, FeatureItem, FeatureList, Hero, SectionHeader, SiteFooter, SiteHeader, Testimonial, TestimonialList,
} from "neus-ui/sections";

// SAMPLE: realistic quotes; replace with real ones before launch.
const QUOTES = [
  { quote: "I open it in the lift before the daily.", name: "Lucía Ferreyra", role: "Product designer" },
  { quote: "I wrote that I could not sleep. It gave me five minutes for that.", name: "Martín Ibarra", role: "Financial analyst" },
];

export const LandingPage = ({ onSignup }: { onSignup: (data: FormData) => void }) => (
  <>
    <SiteHeader brand="AuraFlow" skipLinkTarget="#main" variant="sticky"
      links={[{ label: "How it works", href: "#features" }, { label: "Stories", href: "#voices" }]}
      actions={<Button label="Create my account" href="#signup" variant="outlined" size="small" />} />
    <main id="main">
      <Hero variant="split" title="A pause that fits your day."
        lead="Tell AuraFlow how you arrive in one sentence and get a one-to-ten-minute session for that moment."
        actions={<Button label="Create my account" href="#signup" size="large" />}
        note="Two fields, then your first session."
        media={<Card>{/* The real interface or a live demo: the hero's anchor. */}</Card>} />
      <Section id="features" tone="subtle" aria-labelledby="features-title">
        <SectionHeader titleId="features-title" title="Not another audio library." />
        <FeatureList variant="cards">
          <FeatureItem icon={<MessageSquareText />} title="Tell it how you arrive">One sentence is enough; the session adapts its breathing and length.</FeatureItem>
          <FeatureItem icon={<Timer />} title="Sessions that fit a lift ride">One to ten minutes, at your desk or between meetings.</FeatureItem>
        </FeatureList>
      </Section>
      <Section id="voices" aria-labelledby="voices-title">
        <SectionHeader titleId="voices-title" title="Used in the gaps of a full calendar." />
        <TestimonialList variant="card">
          {QUOTES.map(({ quote, name, role }) => (
            <Testimonial key={name} quote={quote} name={name} role={role} avatar={<Avatar name={name} alt="" />} />
          ))}
        </TestimonialList>
      </Section>
      <CallToAction id="signup" variant="split" tone="brand" title="Start today."
        text="We only ask for your name and email."
        aside={
          <Card>
            <CardContent>
              <form onSubmit={(event) => { event.preventDefault(); onSignup(new FormData(event.currentTarget)); }}>
                <FormTemplate submitLabel="Create my account" columns={1} tabletColumns={1} mobileColumns={1}>
                  <Input name="name" label="Name" autoComplete="name" required />
                  <Input name="email" label="Email" type="email" autoComplete="email" spellCheck={false}
                    placeholder="you@example.com" required />
                </FormTemplate>
              </form>
            </CardContent>
          </Card>
        } />
    </main>
    <SiteFooter brand="AuraFlow" legal="© 2026 AuraFlow" />
  </>
);
```

- Every section the brief lists exists; the dealt composition picks each
  variant (Hero `split`, `centered`, `media-first`; FeatureList `grid`,
  `list`, `cards`; TestimonialList `plain`, `card`, `featured`;
  CallToAction `band`, `split`).
- One `h1` (the Hero's); section titles are SectionHeader `h2`s, item titles
  `h3`s. Alternate `default` and `subtle` Section tones; one or two bands of
  strong color (`tone="brand"` or `"inverse"`).
- Lists of other things (agenda, prices, team) are `Grid as="ul"` of
  `Card as="li"` with the default `variant="auto"`. Never a Card inside a Card.
- One solid action per viewport: the header action is `outlined`. On a
  `brand` band primary buttons adapt by themselves.
- A page about people or a place shows them: real pictures, or a
  `MediaPlaceholder` per shot marked `SAMPLE:`.
- Testimonials the brief asks for are marked `SAMPLE:` and listed in the
  delivery; prices, trials and metrics appear only when the brief gives them.
- Run `npx neus lint` and the visual loop (`npx neus shot /`) after the first
  render.
