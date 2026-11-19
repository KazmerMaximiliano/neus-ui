import { Button } from "../../components/Button";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { PricingCard } from "../PricingCard";
import { PricingTable as PricingTableComponent } from "./PricingTable";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { PricingTableStoryArgs } from "./PricingTable.types";

const PLANS = [
  { name: "Hobby", price: "Free", description: "For side projects.", features: ["Three projects", "Community support"], action: "Start" },
  {
    name: "Team",
    price: "$24",
    period: "per seat, per month",
    description: "For teams that ship every week.",
    features: ["Unlimited projects", "Preview deployments", "Email support within a day"],
    action: "Start a trial",
    featured: true,
    badge: "Most popular",
  },
  { name: "Enterprise", price: "Custom", description: "For security reviews and contracts.", features: ["Single sign-on", "Audit logs", "A named contact"], action: "Talk to sales" },
];

const meta: Meta<PricingTableStoryArgs> = {
  title: "Sections/PricingTable",
  component: PricingTableComponent,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    designSystem: { control: "select", options: DESIGN_SYSTEMS.map(({ id }) => id), description: "The design system used to preview the plans" },
    columns: { control: "number", description: "Columns; in code also { base, md, lg }" },
    children: { control: false, description: "PricingCard elements" },
    "aria-label": { control: "text", description: "Accessible name of the list, when no heading names its section" },
    className: { control: "text", description: "Additional classes on the list" },
    style: { control: "object", description: "CSS properties on the list" },
  },
};

export const PricingTable: StoryObj<PricingTableStoryArgs> = {
  args: {
    designSystem: "neus",
    columns: undefined,
    children: PLANS.map(({ action, ...plan }) => (
      <PricingCard key={plan.name} {...plan} action={<Button label={action} variant={plan.featured ? "solid" : "outlined"} fullWidth />} />
    )),
    className: undefined,
    style: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <PricingTableComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
