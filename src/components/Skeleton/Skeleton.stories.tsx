import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Skeleton as SkeletonComponent } from "./Skeleton";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SkeletonStoryArgs } from "./Skeleton.types";

const meta: Meta<SkeletonStoryArgs> = {
  title: "Feedback/Skeleton",
  component: SkeletonComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the placeholder",
    },
    variant: {
      control: "select",
      options: ["text", "rect", "circle"],
      description: "Lines of text, a block or a circle",
    },
    lines: {
      control: { type: "number", min: 1 },
      description: "Number of text lines",
    },
    width: {
      control: "text",
      description: "CSS length or pixels; full width by default",
    },
    height: {
      control: "text",
      description: "CSS length or pixels for blocks and circles",
    },
    className: {
      control: "text",
      description: "Additional classes on the placeholder",
    },
    style: {
      control: "object",
      description: "CSS properties on the placeholder",
    },
    lineClassName: {
      control: "text",
      description: "Additional classes on each text line",
    },
    lineStyle: {
      control: "object",
      description: "CSS properties on each text line",
    },
  },
};

export const Skeleton: StoryObj<SkeletonStoryArgs> = {
  args: {
    designSystem: "neus",
    variant: "text",
    lines: 3,
    width: undefined,
    height: undefined,
    className: undefined,
    style: {},
    lineClassName: undefined,
    lineStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div style={{ width: "min(360px, 80vw)" }} aria-busy="true">
        <SkeletonComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
