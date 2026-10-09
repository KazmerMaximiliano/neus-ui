import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Button as ButtonComponent } from "./Button";
import type { ButtonStoryArgs } from "./Button.types";

const meta: Meta<ButtonStoryArgs> = {
  title: "Components/Button",
  component: ButtonComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the button",
    },
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
      options: ["primary", "success", "error", "info", "white"],
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
    buttonStyle: {
      control: "object",
      description: "CSS properties applied to the button element",
    },
    labelStyle: {
      control: "object",
      description: "CSS properties applied to the label span",
    },
    loaderStyle: {
      control: "object",
      description: "CSS properties applied to the BeatLoader container (not its individual dots)",
    },
    onClick: {
      action: "clicked",
      description: "Callback function triggered on button click",
    },
  },
};

export const Button: StoryObj<ButtonStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Click Me",
    type: "button",
    variant: "solid",
    color: "primary",
    size: "medium",
    disabled: false,
    fullWidth: false,
    loading: false,
    buttonStyle: {},
    labelStyle: {},
    loaderStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <ButtonComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
