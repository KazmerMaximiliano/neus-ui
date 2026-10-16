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
    centerClassName: {
      control: "text",
      description: "Additional classes for center",
    },
    centerStyle: {
      control: "object",
      description: "Style override for center",
    },
    className: {
      control: "text",
      description: "Additional classes for className",
    },
    clockClassName: {
      control: "text",
      description: "Additional classes for clock",
    },
    displayClassName: {
      control: "text",
      description: "Additional classes for display",
    },
    displayStyle: {
      control: "object",
      description: "Style override for display",
    },
    faceClassName: {
      control: "text",
      description: "Additional classes for face",
    },
    handTipClassName: {
      control: "text",
      description: "Additional classes for handTip",
    },
    handTipStyle: {
      control: "object",
      description: "Style override for handTip",
    },
    headerClassName: {
      control: "text",
      description: "Additional classes for header",
    },
    indicatorClassName: {
      control: "text",
      description: "Additional classes for indicator",
    },
    numberClassName: {
      control: "text",
      description: "Additional classes for number",
    },
    numbersClassName: {
      control: "text",
      description: "Additional classes for numbers",
    },
    numbersStyle: {
      control: "object",
      description: "Style override for numbers",
    },
    periodClassName: {
      control: "text",
      description: "Additional classes for period",
    },
    periodContentClassName: {
      control: "text",
      description: "Additional classes for periodContent",
    },
    periodContentStyle: {
      control: "object",
      description: "Style override for periodContent",
    },
    segmentClassName: {
      control: "text",
      description: "Additional classes for segment",
    },
    separatorClassName: {
      control: "text",
      description: "Additional classes for separator",
    },
    separatorStyle: {
      control: "object",
      description: "Style override for separator",
    },
    style: { control: "object", description: "Style override for style" },
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
    centerClassName: undefined,
    centerStyle: undefined,
    className: undefined,
    clockClassName: undefined,
    displayClassName: undefined,
    displayStyle: undefined,
    faceClassName: undefined,
    handTipClassName: undefined,
    handTipStyle: undefined,
    headerClassName: undefined,
    indicatorClassName: undefined,
    numberClassName: undefined,
    numbersClassName: undefined,
    numbersStyle: undefined,
    periodClassName: undefined,
    periodContentClassName: undefined,
    periodContentStyle: undefined,
    segmentClassName: undefined,
    separatorClassName: undefined,
    separatorStyle: undefined,
    style: undefined,
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
