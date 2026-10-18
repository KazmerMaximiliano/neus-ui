import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Heading as HeadingComponent } from "./Heading";
import type { HeadingStoryArgs } from "./Heading.types";

const meta: Meta<HeadingStoryArgs> = {
  title: "Typography/Heading",
  component: HeadingComponent,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the heading",
    },
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Document level; the default size follows it",
    },
    size: {
      control: "select",
      options: ["display", "xl", "lg", "md", "sm", "xs"],
      description: "Visual size; display for the main headline of a public page",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Text alignment",
    },
    balance: {
      control: "boolean",
      description: "Evens out line lengths with text-wrap: balance",
    },
    children: {
      control: "text",
      description: "Heading text",
    },
    className: {
      control: "text",
      description: "Additional classes on the heading",
    },
    style: {
      control: "object",
      description: "CSS properties on the heading",
    },
  },
};

export const Heading: StoryObj<HeadingStoryArgs> = {
  args: {
    designSystem: "neus",
    as: "h1",
    size: "display",
    align: "start",
    balance: true,
    children: "A calmer way to start the working day",
    className: undefined,
    style: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <HeadingComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
