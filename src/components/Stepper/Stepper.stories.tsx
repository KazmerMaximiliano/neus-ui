import { Meta, StoryObj } from "@storybook/react";
import { Stepper as StepperComponent } from "./Stepper";

const meta: Meta<typeof StepperComponent> = {
  title: "Components/Stepper",
  component: StepperComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
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
        "Visual style: dots (numbered circles), linear (progress bar), simple (small dots)",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the dot indicators (dots variant only)",
    },
    showLabels: {
      control: "boolean",
      description:
        "Show step labels below dots (dots/simple) or step counter (linear)",
    },
    showConnectors: {
      control: "boolean",
      description: "Show connector lines between dots (dots variant only)",
    },
    onStepClick: {
      action: "stepClicked",
      description:
        "Callback when a completed step dot is clicked. Receives step index (0-indexed).",
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Stepper: Story = {
  args: {
    currentStep: 1,
    totalSteps: 3,
    variant: "dots",
    size: "small",
    labels: ["Profile", "Goals", "Done"],
    showLabels: true,
    showConnectors: true,
  },
};

export default meta;
