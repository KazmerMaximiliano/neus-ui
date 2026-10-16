import { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Clock as ClockComponent } from "./Clock";
import type { ClockStoryArgs } from "./Clock.types";

const meta: Meta<ClockStoryArgs> = {
  title: "Date & Time/Clock",
  component: ClockComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the Clock",
    },
    clockStyle: { control: "object", description: "clockStyle override" },
    headerStyle: { control: "object", description: "headerStyle override" },
    faceStyle: { control: "object", description: "faceStyle override" },
    segmentStyle: { control: "object", description: "segmentStyle override" },
    periodStyle: { control: "object", description: "periodStyle override" },
    numberStyle: { control: "object", description: "numberStyle override" },
    indicatorStyle: {
      control: "object",
      description: "indicatorStyle override",
    },

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
      action: "changed",
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

export const Clock: Story = {
  args: {
    designSystem: "neus",
    clockStyle: {},
    headerStyle: {},
    faceStyle: {},
    segmentStyle: {},
    periodStyle: {},
    numberStyle: {},
    indicatorStyle: {},

    format: "12h",
    disabled: false,
    readonly: false,
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <ClockComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
