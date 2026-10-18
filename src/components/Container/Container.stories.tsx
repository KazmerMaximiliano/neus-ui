import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Heading } from "../Heading/Heading";
import { Text } from "../Text/Text";
import { Container as ContainerComponent } from "./Container";
import type { ContainerStoryArgs } from "./Container.types";

const meta: Meta<ContainerStoryArgs> = {
  title: "Layout/Container",
  component: ContainerComponent,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the container",
    },
    as: {
      control: "select",
      options: ["div", "section", "header", "footer", "main"],
      description: "Rendered element",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Maximum width from --container-<size>-max-width; full has none",
    },
    gutter: {
      control: "boolean",
      description: "Responsive side padding from --container-gutter",
    },
    children: {
      control: false,
      description: "Page content",
    },
    className: {
      control: "text",
      description: "Additional classes on the container",
    },
    style: {
      control: "object",
      description: "CSS properties on the container",
    },
  },
};

export const Container: StoryObj<ContainerStoryArgs> = {
  args: {
    designSystem: "neus",
    as: "div",
    size: "lg",
    gutter: true,
    children: (
      <>
        <Heading as="h2">Pricing</Heading>
        <Text>Content lines up with every other section of the page at the same width.</Text>
      </>
    ),
    className: undefined,
    style: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <ContainerComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
