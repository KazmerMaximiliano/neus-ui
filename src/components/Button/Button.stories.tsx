import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Button as ButtonComponent } from "./Button";
import type { ButtonStoryArgs } from "./Button.types";

const meta: Meta<ButtonStoryArgs> = {
  title: "Base/Button",
  // No `component`: the controls are one flat shape, while Button's props are an action/link union.
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional classes for className",
    },
    labelClassName: {
      control: "text",
      description: "Additional classes for label",
    },
    loaderClassName: {
      control: "text",
      description: "Additional classes for loader",
    },
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
      description: "The HTML button type; ignored with href",
    },
    href: {
      control: "text",
      description: "Destination; renders a link with the button's look instead of a button",
    },
    target: {
      control: "select",
      options: [undefined, "_blank", "_self"],
      description: "Link target; only with href",
    },
    rel: {
      control: "text",
      description: "Link relationship; only with href",
    },
    linkComponent: {
      control: false,
      description: "Router link component (for example Next.js Link) rendered instead of <a>; only with href",
    },
    variant: {
      control: "select",
      options: ["solid", "outlined", "text", "secondary", "tonal", "elevated"],
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
      description:
        "CSS properties applied to the BeatLoader container (not its individual dots)",
    },
    onClick: {
      action: "clicked",
      description: "Callback triggered on click; receives the anchor event with href",
    },
  },
};

export const Button: StoryObj<ButtonStoryArgs> = {
  args: {
    className: undefined,
    labelClassName: undefined,
    loaderClassName: undefined,
    designSystem: "neus",
    label: "Click Me",
    type: "button",
    href: undefined,
    target: undefined,
    rel: undefined,
    linkComponent: undefined,
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
  render: ({ designSystem, type, href, target, rel, linkComponent, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      {href ? (
        <ButtonComponent {...args} href={href} target={target} rel={rel} linkComponent={linkComponent} />
      ) : (
        <ButtonComponent {...args} type={type} />
      )}
    </ThemeProvider>
  ),
};

export default meta;
