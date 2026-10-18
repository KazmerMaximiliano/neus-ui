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
lists, each with the layout the dealt composition names (taste.md), and
apply the substance rules: display headline, a lead, 16px running text,
alternating Section bands, one anchor per section. Heading, Text, Section,
Grid and Stack carry the scale, widths and rhythm of the active system; the
page CSS only places what they cannot.

```tsx
import { MessageSquareText, Timer } from "lucide-react";
import {
  Button, Card, CardContent, CardFooter, CardHeader, Container, FormTemplate, Grid, Heading, Input, Link, Section,
  Stack, Text,
} from "neus-ui";
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
    <Container as="header" size="xl">
      <Stack direction="row" align="center" justify="between" gap={6} className="landing-header">
        <Text as="span" weight="semibold">AuraFlow</Text>
        <Stack as="nav" direction="row" align="center" gap={6} aria-label="Main">
          <Link href="#features" label="How it works" />
          <Button label="Create my account" href="#signup" variant="outlined" size="small" />
        </Stack>
      </Stack>
    </Container>
    <main id="main">
      <Section aria-labelledby="hero-title">
        <Grid columns={{ base: 1, lg: 2 }} gap={12} className="landing-split">
          <Stack gap={6} align="start">
            <Heading id="hero-title" as="h1" size="display">A pause that fits your day.</Heading>
            <Text variant="lead">Tell AuraFlow how you arrive in one sentence and get a one-to-ten-minute session for that moment.</Text>
            <Button label="Create my account" href="#signup" size="large" />
            <Text variant="small" tone="muted">Two fields, then your first session.</Text>
          </Stack>
          <Card>{/* The real interface or a live demo: the section's anchor. */}</Card>
        </Grid>
      </Section>
      <Section id="features" tone="subtle" aria-labelledby="features-title">
        <Stack gap={12}>
          <Heading id="features-title">Not another audio library.</Heading>
          <Grid as="ul">
            {FEATURES.map(({ icon: Icon, title, text }) => (
              <Card as="li" key={title}>
                <CardHeader><Icon aria-hidden size={24} /><Heading as="h3" size="sm">{title}</Heading></CardHeader>
                <CardContent><Text>{text}</Text></CardContent>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Section>
      <Section aria-labelledby="voices-title">
        <Stack gap={12}>
          <Heading id="voices-title">Used in the gaps of a full calendar.</Heading>
          <Grid as="ul">
            {QUOTES.map(({ quote, name, role }) => (
              <Card as="li" key={name}>
                <CardContent><blockquote><Text variant="lead">{quote}</Text></blockquote></CardContent>
                <CardFooter><Text as="span" variant="small"><strong>{name}</strong>, {role}</Text></CardFooter>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Section>
      <Section id="signup" tone="accent" aria-labelledby="signup-title">
        <Grid columns={{ base: 1, lg: 2 }} gap={12} className="landing-split">
          <Stack gap={4}>
            <Heading id="signup-title">Start today.</Heading>
            <Text variant="lead">We only ask for your name and email.</Text>
          </Stack>
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
        </Grid>
      </Section>
    </main>
    <Container as="footer" size="xl">
      <Text variant="small" tone="muted" className="landing-footer">© 2026 AuraFlow</Text>
    </Container>
  </>
);
```

```css
.landing-header { padding-block: var(--space-6); }
.landing-split { align-items: center; }
.landing-footer { padding-block: var(--space-8); }
.skip-link { position: absolute; inset-inline-start: var(--space-4); inset-block-start: calc(-1 * var(--space-16)); }
.skip-link:focus { inset-block-start: var(--space-4); }
```

- Every section the brief lists exists; the dealt composition decides its
  layout (features as `cards`, `grid` or `list`; testimonials as `card`,
  `plain` or `featured`).
- One `h1` (`size="display"`); section titles are the default `h2`, item
  titles `h3` at `size="sm"`. Alternate `default` and `subtle` Section tones;
  `accent` once, on the final call to action.
- Feature and testimonial groups are `Grid as="ul"` of `Card as="li"` with
  the default `variant="auto"`: the system decides border, fill or flat.
  Never a Card inside a Card.
- One solid action per viewport: the header action is `outlined`.
- Testimonials the brief asks for are marked `SAMPLE:` and listed in the
  delivery; prices, trials and metrics appear only when the brief gives them.
- Run `npx neus lint` and the visual loop (`npx neus shot /`) after the first
  render.
