import { Meta, StoryObj } from "@storybook/react";
import { TimeInput as TimeInputComponent } from "./TimeInput";

const meta: Meta<typeof TimeInputComponent> = {
  title: "Components/TimeInput",
  component: TimeInputComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: false,
      description: "The current selected time(s)",
      table: {
        type: { summary: "TimeValue" },
      },
    },
    defaultValue: {
      control: false,
      description: "The initial time(s) value",
      table: {
        type: { summary: "TimeValue" },
      },
    },
    name: {
      control: "text",
      description: "The name attribute for the input",
      table: {
        type: { summary: "string" },
      },
    },
    label: {
      control: "text",
      description: "Label text displayed above the input",
      table: {
        type: { summary: "string" },
      },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Select a time" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the input from user interaction",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    readonly: {
      control: "boolean",
      description: "Makes the input read-only",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: "boolean",
      description: "Whether a time selection is required",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    error: {
      control: "text",
      description: "Error message to display",
      table: {
        type: { summary: "string" },
      },
    },
    onChange: {
      control: false,
      description: "Callback when time selection changes",
      table: {
        type: {
          summary: "(value: TimeValue | undefined) => void",
        },
      },
    },
  },
};

type Story = StoryObj<typeof meta>;

export const TimeInput: Story = {
  args: {
    label: "Select a time",
    name: "time-input",
    placeholder: "Pick a time...",
    disabled: false,
    readonly: false,
    required: false,
    error: undefined,
  },
};

export default meta;
