import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Stepper as StepperComponent } from "./Stepper";
import type { StepperStoryArgs } from "./Stepper.types";

const meta: Meta<StepperStoryArgs> = {
  title: "Navigation/Stepper",
  component: StepperComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the stepper",
    },
    currentStep: {
      control: "number",
      description: "Current active step (0-indexed)",
    },
    totalSteps: {
      control: "number",
      description: "Total number of steps",
    },
    variant: {
      control: "select",
      options: ["dots", "linear", "simple"],
      description:
        "Visual style: dots (numbered markers), linear (progress bar), simple (compact markers)",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the dot indicators (dots variant only)",
    },
    labels: {
      control: "object",
      description: "Step names; announced even when not shown",
    },
    showLabels: {
      control: "boolean",
      description: "Show step labels (dots) or the step counter (linear)",
    },
    showConnectors: {
      control: "boolean",
      description: "Show connector lines between dots (dots variant only)",
    },
    dotStyle: {
      control: "object",
      description: "CSS properties applied to every step marker",
    },
    labelStyle: {
      control: "object",
      description: "CSS properties applied to labels and the linear counter",
    },
    connectorStyle: {
      control: "object",
      description: "CSS properties applied to every connector",
    },
    barStyle: {
      control: "object",
      description: "CSS properties applied to the linear track",
    },
    onStepClick: {
      action: "stepClicked",
      description:
        "Makes completed steps buttons; receives the step index (0-indexed)",
    },
  },
};

export const Stepper: StoryObj<StepperStoryArgs> = {
  args: {
    designSystem: "neus",
    currentStep: 1,
    totalSteps: 3,
    variant: "dots",
    size: "small",
    labels: ["Profile", "Goals", "Done"],
    showLabels: true,
    showConnectors: true,
    dotStyle: {},
    labelStyle: {},
    connectorStyle: {},
    barStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <div style={{ width: 420 }}>
        <StepperComponent {...args} />
      </div>
    </ThemeProvider>
  ),
};

export default meta;
