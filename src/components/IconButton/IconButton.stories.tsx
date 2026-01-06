import { Meta, StoryObj } from "@storybook/react";
import { FaPen } from "react-icons/fa";
import { IconButton as IconButtonComponent } from "./IconButton";

const meta: Meta<typeof IconButtonComponent> = {
  title: "Components/IconButton",
  component: IconButtonComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: false,
      description: "The icon component to display inside the button",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "The HTML button type",
    },
    variant: {
      control: "select",
      options: ["solid", "outlined", "text"],
      description: "The visual style variant of the button",
    },
    color: {
      control: "select",
      options: ["primary", "success", "error", "info"],
      description: "The color scheme of the button",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button when true",
    },
    loading: {
      control: "boolean",
      description: "Shows a loading spinner when true",
    },
    onClick: {
      action: "clicked",
      description: "Callback function triggered on button click",
    },
  },
};

type Story = StoryObj<typeof meta>;

export const IconButton: Story = {
  args: {
    icon: FaPen,
    type: "button",
    variant: "solid",
    color: "primary",
    size: "medium",
    disabled: false,
    loading: false,
  },
};

export default meta;
