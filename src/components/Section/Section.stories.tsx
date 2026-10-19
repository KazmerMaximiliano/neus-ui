import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Heading } from "../Heading/Heading";
import { Stack } from "../Stack/Stack";
import { Text } from "../Text/Text";
import { Section as SectionComponent } from "./Section";
import type { SectionStoryArgs } from "./Section.types";

const meta: Meta<SectionStoryArgs> = {
  title: "Layout/Section",
  component: SectionComponent,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the section",
    },
    as: {
      control: "select",
      options: ["section", "div", "header", "footer", "aside"],
      description: "Rendered element",
    },
    tone: {
      control: "select",
      options: ["default", "subtle", "accent", "brand", "inverse"],
      description: "Band background; alternate default and subtle, brand and inverse once or twice per page",
    },
    spacing: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Vertical padding of the band",
    },
    container: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full", false],
      description: "Container size around the content; false renders the children directly",
    },
    id: {
      control: "text",
      description: "Anchor for links such as a CTA with href=\"#signup\"",
    },
    children: {
      control: false,
      description: "Section content",
    },
    className: {
      control: "text",
      description: "Additional classes on the band",
    },
    style: {
      control: "object",
      description: "CSS properties on the band",
    },
    contentClassName: {
      control: "text",
      description: "Additional classes on the inner Container; absent when container is false",
    },
    contentStyle: {
      control: "object",
      description: "CSS properties on the inner Container; absent when container is false",
    },
  },
};

export const Section: StoryObj<SectionStoryArgs> = {
  args: {
    designSystem: "neus",
    as: "section",
    tone: "subtle",
    spacing: "lg",
    container: "lg",
    id: "features",
    "aria-labelledby": "features-title",
    children: (
      <Stack gap={3}>
        <Heading id="features-title">Not another audio library</Heading>
        <Text variant="lead" tone="muted">Each session starts from how you arrive, not from a catalog.</Text>
      </Stack>
    ),
    className: undefined,
    style: {},
    contentClassName: undefined,
    contentStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <SectionComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
