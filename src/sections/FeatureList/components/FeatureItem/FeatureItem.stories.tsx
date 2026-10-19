import type { Meta, StoryObj } from "@storybook/react";
import { Timer } from "lucide-react";
import { DESIGN_SYSTEMS } from "../../../../design-systems";
import { ThemeProvider } from "../../../../providers";
import { FeatureList } from "../../FeatureList";
import { FeatureItem as FeatureItemComponent } from "./FeatureItem";
import type { FeatureItemStoryArgs } from "./FeatureItem.types";

const meta: Meta<FeatureItemStoryArgs> = {
  title: "Sections/FeatureItem",
  component: FeatureItemComponent,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    designSystem: { control: "select", options: DESIGN_SYSTEMS.map(({ id }) => id), description: "The design system used to preview the item" },
    variant: { control: "select", options: ["grid", "list", "cards"], description: "Preview control: the enclosing FeatureList's variant" },
    icon: { control: false, description: "A lucide-react icon element on a tinted tile" },
    title: { control: "text", description: "Feature title" },
    children: { control: "text", description: "The explanation" },
    action: { control: false, description: "A link to more detail" },
    titleAs: { control: "select", options: ["h2", "h3", "h4"], description: "Heading level of the title" },
    className: { control: "text", description: "Additional classes on the item" },
    style: { control: "object", description: "CSS properties on the item" },
    iconClassName: { control: "text", description: "Additional classes on the icon tile" },
    iconStyle: { control: "object", description: "CSS properties on the icon tile" },
    titleClassName: { control: "text", description: "Additional classes on the title" },
    titleStyle: { control: "object", description: "CSS properties on the title" },
    descriptionClassName: { control: "text", description: "Additional classes on the description" },
    descriptionStyle: { control: "object", description: "CSS properties on the description" },
    actionClassName: { control: "text", description: "Additional classes on the action" },
    actionStyle: { control: "object", description: "CSS properties on the action" },
  },
};

export const FeatureItem: StoryObj<FeatureItemStoryArgs> = {
  args: {
    designSystem: "neus",
    variant: "cards",
    icon: <Timer />,
    title: "Fits between two meetings",
    children: "Sessions of one to ten minutes for the desk, the commute or before a hard call.",
    titleAs: "h3",
    className: undefined,
    style: {},
    iconClassName: undefined,
    iconStyle: {},
    titleClassName: undefined,
    titleStyle: {},
    descriptionClassName: undefined,
    descriptionStyle: {},
    actionClassName: undefined,
    actionStyle: {},
  },
  render: ({ designSystem, variant, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <FeatureList variant={variant} columns={1} style={{ maxWidth: 420 }}>
        <FeatureItemComponent {...args} />
      </FeatureList>
    </ThemeProvider>
  ),
};

export default meta;
