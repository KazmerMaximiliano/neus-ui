import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Spinner as SpinnerComponent } from "./Spinner";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { SpinnerStoryArgs } from "./Spinner.types";

const meta: Meta<SpinnerStoryArgs> = {
  title: "Feedback/Spinner",
  component: SpinnerComponent,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the spinner",
    },
    label: {
      control: "text",
      description: "Announced as a polite status; empty makes the spinner decorative",
    },
    variant: {
      control: "select",
      options: ["ring", "dots"],
      description: "A rotating ring, or three pulsing dots for inline and in-button use",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Diameter of the ring or the height of the dots",
    },
    className: { control: "text", description: "Additional classes on the spinner" },
    style: { control: "object", description: "CSS properties on the spinner" },
    ringClassName: { control: "text", description: "Additional classes on the ring" },
    ringStyle: { control: "object", description: "CSS properties on the ring" },
    dotClassName: { control: "text", description: "Additional classes on each dot" },
    dotStyle: { control: "object", description: "CSS properties on each dot" },
    labelClassName: { control: "text", description: "Additional classes on the hidden label" },
    labelStyle: { control: "object", description: "CSS properties on the hidden label" },
  },
};

export const Spinner: StoryObj<SpinnerStoryArgs> = {
  args: {
    designSystem: "neus",
    label: "Loading results",
    variant: "ring",
    size: "medium",
    className: undefined,
    style: {},
    ringClassName: undefined,
    ringStyle: {},
    dotClassName: undefined,
    dotStyle: {},
    labelClassName: undefined,
    labelStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <SpinnerComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
