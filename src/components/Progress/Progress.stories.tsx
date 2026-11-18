import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Progress as ProgressComponent } from "./Progress";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ProgressStoryArgs } from "./Progress.types";

const meta: Meta<ProgressStoryArgs> = {
  title: "Feedback/Progress",
  component: ProgressComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the bar",
    },
    value: {
      control: { type: "number", min: 0, max: 100 },
      description: "Current value; clear it for an indeterminate bar",
    },
    min: { control: "number", description: "Value of an empty bar" },
    max: { control: "number", description: "Value of a full bar" },
    label: { control: "text", description: "Visible text that names the bar" },
    showValue: {
      control: "boolean",
      description: "Shows the value text or the percentage",
    },
    valueText: {
      control: "text",
      description: "The value in words, announced instead of the percentage",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Thickness of the bar",
    },
    className: {
      control: "text",
      description: "Additional classes on the progress bar",
    },
    style: {
      control: "object",
      description: "CSS properties on the progress bar",
    },
    labelClassName: {
      control: "text",
      description: "Additional classes on the label",
    },
    labelStyle: {
      control: "object",
      description: "CSS properties on the label",
    },
    valueClassName: {
      control: "text",
      description: "Additional classes on the value",
    },
    valueStyle: {
      control: "object",
      description: "CSS properties on the value",
    },
    trackClassName: {
      control: "text",
      description: "Additional classes on the track",
    },
    trackStyle: {
      control: "object",
      description: "CSS properties on the track",
    },
    fillClassName: {
      control: "text",
      description: "Additional classes on the fill",
    },
    fillStyle: { control: "object", description: "CSS properties on the fill" },
  },
};

export const Progress: StoryObj<ProgressStoryArgs> = {
  args: {
    designSystem: "neus",
    value: undefined,
    min: 0,
    max: 100,
    label: "Uploading photos",
    showValue: true,
    valueText: undefined,
    size: "medium",
    className: undefined,
    style: {},
    labelClassName: undefined,
    labelStyle: {},
    valueClassName: undefined,
    valueStyle: {},
    trackClassName: undefined,
    trackStyle: {},
    fillClassName: undefined,
    fillStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div style={{ width: "min(360px, 80vw)" }}>
        <ProgressComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
