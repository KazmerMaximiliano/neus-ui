import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Link as LinkComponent } from "./Link";
import type { LinkStoryArgs } from "./Link.types";

const meta: Meta<LinkStoryArgs> = {
  title: "Base/Link",
  component: LinkComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the link",
    },
    label: {
      control: "text",
      description: "The text content of the link",
    },
    type: {
      control: "select",
      options: ["primary", "secondary"],
      description: "The visual style variant of the link",
    },
    href: {
      control: "text",
      description: "The URL or path the link points to",
    },
    target: {
      control: "select",
      options: [undefined, "_self", "_blank"],
      description: "Native target attribute",
    },
    rel: {
      control: "text",
      description: "Native rel attribute; use noopener with _blank",
    },
    className: {
      control: "text",
      description: "Additional classes",
    },
    style: {
      control: "object",
      description: "Styles applied to this link",
    },
    onClick: {
      action: "clicked",
      description: "Native click handler",
    },
  },
};

export const Link: StoryObj<LinkStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Read the documentation",
    type: "primary",
    href: "#",
    className: "",
    style: null,
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <LinkComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
