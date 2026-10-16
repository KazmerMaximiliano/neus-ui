import type { Meta, StoryObj } from "@storybook/react";
import { Pencil } from "lucide-react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { IconButton as IconButtonComponent } from "./IconButton";
import type { IconButtonStoryArgs } from "./IconButton.types";

const meta: Meta<IconButtonStoryArgs> = {
  title: "Base/IconButton",
  component: IconButtonComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the icon button",
    },
    icon: {
      control: false,
      description: "The lucide icon component rendered inside the button",
    },
    label: {
      control: "text",
      description: "Accessible name announced for the icon-only action",
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
      description: "Replaces the icon with a busy loader when true",
    },
    buttonStyle: {
      control: "object",
      description: "CSS properties applied to the button element",
    },
    iconStyle: {
      control: "object",
      description: "CSS properties applied to the icon SVG",
    },
    loaderStyle: {
      control: "object",
      description: "CSS properties applied to the BeatLoader container",
    },
    onClick: {
      action: "clicked",
      description: "Callback function triggered on button click",
    },
  },
};

export const IconButton: StoryObj<IconButtonStoryArgs> = {
  args: {
    designSystem: "neus",
    icon: Pencil,
    label: "Edit",
    type: "button",
    variant: "solid",
    color: "primary",
    size: "medium",
    disabled: false,
    loading: false,
    buttonStyle: {},
    iconStyle: {},
    loaderStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <IconButtonComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
