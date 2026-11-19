import { Button } from "../../components/Button";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { PricingCard as PricingCardComponent } from "./PricingCard";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { PricingCardStoryArgs } from "./PricingCard.types";
import "./PricingCard.stories.css";

const meta: Meta<PricingCardStoryArgs> = {
  title: "Sections/PricingCard",
  component: PricingCardComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: { control: "select", options: DESIGN_SYSTEMS.map(({ id }) => id), description: "The design system used to preview the plan" },
    name: { control: "text", description: "Name of the plan" },
    price: { control: "text", description: "The price, formatted in the page's locale" },
    period: { control: "text", description: "What the price covers" },
    description: { control: "text", description: "Who the plan is for" },
    features: { control: "object", description: "What the plan includes" },
    action: { control: false, description: "The plan's call to action" },
    featured: { control: "boolean", description: "Sets the recommended plan apart" },
    badge: { control: "text", description: "A short tag beside the name" },
    nameAs: { control: "select", options: ["h2", "h3", "h4", "h5", "h6"], description: "Heading level of the name" },
    className: { control: "text", description: "Additional classes on the card" },
    style: { control: "object", description: "CSS properties on the card" },
    headerClassName: { control: "text", description: "Additional classes on the header" },
    headerStyle: { control: "object", description: "CSS properties on the header" },
    nameClassName: { control: "text", description: "Additional classes on the name" },
    nameStyle: { control: "object", description: "CSS properties on the name" },
    priceClassName: { control: "text", description: "Additional classes on the price" },
    priceStyle: { control: "object", description: "CSS properties on the price" },
    descriptionClassName: { control: "text", description: "Additional classes on the description" },
    descriptionStyle: { control: "object", description: "CSS properties on the description" },
    featuresClassName: { control: "text", description: "Additional classes on the feature list" },
    featuresStyle: { control: "object", description: "CSS properties on the feature list" },
    featureClassName: { control: "text", description: "Additional classes on each feature" },
    featureStyle: { control: "object", description: "CSS properties on each feature" },
    actionClassName: { control: "text", description: "Additional classes on the action footer" },
    actionStyle: { control: "object", description: "CSS properties on the action footer" },
  },
};

export const PricingCard: StoryObj<PricingCardStoryArgs> = {
  args: {
    designSystem: "neus",
    name: "Team",
    price: "$24",
    period: "per seat, per month",
    description: "For teams that ship every week.",
    features: ["Unlimited projects", "Preview deployments", "Email support within a day"],
    action: <Button label="Start a trial" fullWidth />,
    featured: true,
    badge: "Most popular",
    nameAs: "h3",
    className: undefined,
    style: {},
    headerClassName: undefined,
    headerStyle: {},
    nameClassName: undefined,
    nameStyle: {},
    priceClassName: undefined,
    priceStyle: {},
    descriptionClassName: undefined,
    descriptionStyle: {},
    featuresClassName: undefined,
    featuresStyle: {},
    featureClassName: undefined,
    featureStyle: {},
    actionClassName: undefined,
    actionStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div className="pricing-card-story">
        <PricingCardComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
