import { Meta, StoryObj } from "@storybook/react";
import { TimeClock as TimeClockComponent } from "./TimeClock";

const meta: Meta<typeof TimeClockComponent> = {
  title: "Components/TimeClock",
  component: TimeClockComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: false,
      description: "The current selected time",
      table: {
        type: { summary: "{ hours: number; minutes: number }" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the clock from user interaction",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    readonly: {
      control: "boolean",
      description: "Makes the clock read-only",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    format: {
      control: "select",
      options: ["12h", "24h"],
      description: "Time format (12-hour or 24-hour)",
      table: {
        type: { summary: "12h | 24h" },
        defaultValue: { summary: "12h" },
      },
    },
    onChange: {
      control: false,
      description: "Callback when time selection changes",
      table: {
        type: {
          summary: "(value: { hours: number; minutes: number }) => void",
        },
      },
    },
  },
};

type Story = StoryObj<typeof meta>;

export const TimeClock: Story = {
  args: {
    format: "12h",
    disabled: false,
    readonly: false,
  },
};

export default meta;
