import type { Meta, StoryObj } from "@storybook/react";
import { Badge as BadgeComponent } from "./Badge";

const meta: Meta<typeof BadgeComponent> = {
  title: "Components/Badge",
  component: BadgeComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
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
  },
  args: {
    label: "Active",
    variant: "solid",
    color: "success",
  },
};

type Story = StoryObj<typeof meta>;

export const Badge: Story = {
  args: {
    label: "Active",
    variant: "solid",
    color: "success",
  },
};

export default meta;
