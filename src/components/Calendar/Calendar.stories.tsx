import { Meta, StoryObj } from "@storybook/react";
import type { DateRange } from "react-day-picker";
import { Calendar as CalendarComponent } from "./Calendar";

const meta: Meta<typeof CalendarComponent> = {
  title: "Components/Calendar",
  component: CalendarComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: false,
      description: "The current selected date(s)",
      table: {
        type: { summary: "Date | Date[] | DateRange" },
      },
    },
    defaultValue: {
      control: false,
      description: "The initial date(s) value",
      table: {
        type: { summary: "Date | Date[] | DateRange" },
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
      description: "Label text displayed above the calendar",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Disables the calendar from user interaction",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    readonly: {
      control: "boolean",
      description: "Makes the calendar read-only",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    multiple: {
      control: "boolean",
      description: "Allows selection of multiple dates",
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
      description: "Callback when date selection changes",
      table: {
        type: {
          summary: "(value: Date | Date[] | DateRange | undefined) => void",
        },
      },
    },
    mode: {
      control: "select",
      options: ["single", "range", "multiple"],
      description: "Calendar selection mode",
      table: {
        type: { summary: "single | range | multiple" },
      },
    },
    required: {
      control: "boolean",
      description: "Whether a date selection is required",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    selected: {
      control: false,
      description: "The selected date(s) (from DayPicker)",
      table: {
        type: { summary: "Date | DateRange | Date[]" },
      },
    },
  },
};

type Story = StoryObj<
  typeof CalendarComponent &
    (
      | { mode: "single"; selected: Date; required?: boolean }
      | { mode: "range"; selected: DateRange; required: true }
      | { mode: "multiple"; selected: Date[]; required: true }
    )
>;

export const Calendar: Story = {
  args: {
    mode: "single",
    selected: new Date(),
    required: false,
    label: "Select a date",
    name: "calendar",
    disabled: false,
    readonly: false,
    multiple: false,
    error: undefined,
    value: undefined,
    defaultValue: undefined,
  },
};

export default meta;
