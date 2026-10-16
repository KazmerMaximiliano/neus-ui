import { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { TimeInput as TimeInputComponent } from "./TimeInput";
import type { TimeInputStoryArgs } from "./TimeInput.types";

const meta: Meta<TimeInputStoryArgs> = {
  title: "Date & Time/TimeInput",
  component: TimeInputComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the TimeInput",
    },
    variant: {
      control: "select",
      options: ["auto", "filled", "outlined"],
      description: "Shared field variant",
    },
    labelPlacement: {
      control: "select",
      options: ["auto", "external", "floating"],
      description: "Shared field labelPlacement",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Shared field size",
    },
    fieldStyle: { control: "object", description: "fieldStyle override" },
    labelStyle: { control: "object", description: "labelStyle override" },
    errorStyle: { control: "object", description: "errorStyle override" },
    panelStyle: { control: "object", description: "panelStyle override" },

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
    format: {
      control: "radio",
      options: ["12h", "24h"],
      description: "Time display format (12-hour or 24-hour)",
      table: {
        type: { summary: '"12h" | "24h"' },
        defaultValue: { summary: '"24h"' },
      },
    },
    onChange: {
      action: "changed",
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
    designSystem: "neus",
    variant: "auto",
    labelPlacement: "auto",
    size: "medium",
    fieldStyle: {},
    labelStyle: {},
    errorStyle: {},
    panelStyle: {},

    label: "Select a time",
    name: "time-input",
    placeholder: "Pick a time...",
    disabled: false,
    readonly: false,
    required: false,
    error: undefined,
    format: "24h",
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <TimeInputComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
