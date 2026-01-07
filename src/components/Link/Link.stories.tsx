import { Meta, StoryObj } from "@storybook/react";
import { Link as LinkComponent } from "./Link";

const meta: Meta<typeof LinkComponent> = {
  title: "Components/Link",
  component: LinkComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: { type: "text" },
      description: "The text content of the link",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
    type: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "The visual style variant of the link",
      table: {
        type: { summary: "'primary' | 'secondary'" },
        category: "Props",
        defaultValue: { summary: "'primary'" },
      },
    },
    href: {
      control: { type: "text" },
      description: "The URL or path the link points to",
      table: {
        type: { summary: "string" },
        category: "Props",
      },
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Link: Story = {
  args: {
    label: "Click here",
    type: "primary",
    href: "#",
  },
};

export default meta;
