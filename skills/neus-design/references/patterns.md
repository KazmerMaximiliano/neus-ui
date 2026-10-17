# Page patterns

Start from the closest skeleton and adapt it to the spec. These show the
composition and the required props; check every other prop in the
component's guide (`node_modules/neus-ui/docs/components/<Name>.md`). The interactive skeletons are client code: in
Next.js App Router they are `"use client"` files rendered by the page, and in
Astro they are rendered from an `.astro` page with one client directive (see
frameworks.md). Swap `window.location.assign` for the host router's
navigation where one exists.

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
  const go = (href: string) => () => window.location.assign(href);
  const routes = [
    { label: "Orders", active: currentPath.startsWith("/orders"), onClick: go("/orders") },
    { label: "Customers", active: currentPath.startsWith("/customers"), onClick: go("/customers") },
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
      <Input name="email" label="Billing email" type="email" required />
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
handlers, and as islands only where users interact. Neus targets application
interfaces; for promotional sections, follow the system DESIGN.md's do's and
don'ts and keep decoration to one deliberate move per page.
