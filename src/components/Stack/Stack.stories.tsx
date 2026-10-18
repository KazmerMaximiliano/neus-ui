import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Button } from "../Button/Button";
import { Stack as StackComponent } from "./Stack";
import type { StackStoryArgs } from "./Stack.types";

const STEPS = [0, 1, 2, 3, 4, 6, 8, 12, 16];

const meta: Meta<StackStoryArgs> = {
  title: "Layout/Stack",
  component: StackComponent,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the stack",
    },
    as: {
      control: "select",
      options: ["div", "ul", "ol", "section", "nav", "header", "footer", "article", "aside", "form"],
      description: "Rendered element; ul or ol for lists, with li children",
    },
    direction: {
      control: "select",
      options: ["column", "row"],
      description: "Main axis; in code also { base, md, lg } to change at 768px and 1024px",
    },
    gap: {
      control: "select",
      options: STEPS,
      description: "Step of the --space-* scale; in code also { base, md, lg }",
    },
    align: {
      control: "select",
      options: [undefined, "start", "center", "end", "stretch", "baseline"],
      description: "Cross-axis alignment",
    },
    justify: {
      control: "select",
      options: [undefined, "start", "center", "end", "between"],
      description: "Main-axis distribution",
    },
    wrap: {
      control: "boolean",
      description: "Wraps children onto new lines",
    },
    children: {
      control: false,
      description: "Stacked content",
    },
    className: {
      control: "text",
      description: "Additional classes on the stack",
    },
    style: {
      control: "object",
      description: "CSS properties on the stack, merged after the layout properties",
    },
  },
};

export const Stack: StoryObj<StackStoryArgs> = {
  args: {
    designSystem: "neus",
    as: "div",
    direction: "row",
    gap: 3,
    align: "center",
    justify: undefined,
    wrap: true,
    children: (
      <>
        <Button label="Start free" />
        <Button label="See plans" variant="outlined" />
        <Button label="Talk to us" variant="text" />
      </>
    ),
    className: undefined,
    style: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <StackComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
