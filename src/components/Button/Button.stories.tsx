import { Meta, StoryObj } from "@storybook/react";
import { Button as ButtonComponent } from "./Button";

const meta: Meta<typeof ButtonComponent> = {
  title: "Components/Button",
  component: ButtonComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The text displayed inside the button",
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
    fullWidth: {
      control: "boolean",
      description: "Makes the button take full width when true",
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

export const Button: Story = {
  args: {
    label: "Click Me",
    type: "button",
    variant: "solid",
    color: "primary",
    size: "medium",
    disabled: false,
    fullWidth: false,
    loading: false,
  },
};

export default meta;
