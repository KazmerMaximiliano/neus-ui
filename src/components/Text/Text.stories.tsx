import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Text as TextComponent } from "./Text";
import type { TextStoryArgs } from "./Text.types";

const meta: Meta<TextStoryArgs> = {
  title: "Typography/Text",
  component: TextComponent,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the text",
    },
    as: {
      control: "select",
      options: ["p", "span", "div", "small", "strong"],
      description: "Rendered element",
    },
    variant: {
      control: "select",
      options: ["lead", "body", "small", "caption", "overline"],
      description: "Step of the type scale; body is 16px or more in every system",
    },
    tone: {
      control: "select",
      options: ["default", "muted", "primary", "success", "error"],
      description: "Color role; default inherits the surrounding color",
    },
    weight: {
      control: "select",
      options: [undefined, "regular", "medium", "semibold"],
      description: "Overrides the variant's weight",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Text alignment; center also centers the measured block",
    },
    measure: {
      control: "boolean",
      description: "Caps the line length at --text-measure; on by default for lead and body",
    },
    lines: {
      control: "number",
      description: "Truncates after this many lines",
    },
    numeric: {
      control: "boolean",
      description: "Tabular figures for numbers that align or update",
    },
    children: {
      control: "text",
      description: "Text content",
    },
    className: {
      control: "text",
      description: "Additional classes on the element",
    },
    style: {
      control: "object",
      description: "CSS properties on the element",
    },
  },
};

export const Text: StoryObj<TextStoryArgs> = {
  args: {
    designSystem: "neus",
    as: "p",
    variant: "lead",
    tone: "default",
    weight: undefined,
    align: "start",
    measure: true,
    lines: undefined,
    numeric: false,
    children:
      "Short guided sessions that fit between meetings. Tell it how you feel and it picks the breathing, the pace and the length.",
    className: undefined,
    style: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <TextComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
