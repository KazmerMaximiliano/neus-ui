import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Badge as BadgeComponent } from "./Badge";
import type { BadgeStoryArgs } from "./Badge.types";

const meta: Meta<BadgeStoryArgs> = {
  title: "Base/Badge",
  component: BadgeComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional classes for className",
    },
    dotClassName: {
      control: "text",
      description: "Additional classes for dot",
    },
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the badge",
    },
    label: {
      control: "text",
      description: "Text displayed inside the badge",
    },
    variant: {
      control: "select",
      options: ["solid", "dot"],
      description: "Visual style of the badge",
    },
    color: {
      control: "select",
      options: ["primary", "success", "error", "info", "neutral"],
      description: "Semantic color of the badge",
    },
    badgeStyle: {
      control: "object",
      description: "CSS properties applied to the badge element",
    },
    dotStyle: {
      control: "object",
      description: "CSS properties applied to the dot of the dot variant",
    },
  },
};

export const Badge: StoryObj<BadgeStoryArgs> = {
  args: {
    className: undefined,
    dotClassName: undefined,
    designSystem: "neus",
    label: "Active",
    variant: "solid",
    color: "success",
    badgeStyle: {},
    dotStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <BadgeComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
