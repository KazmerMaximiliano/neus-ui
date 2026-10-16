import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { Calendar as CalendarComponent } from "./Calendar";
import type { CalendarStoryArgs } from "./Calendar.types";

const meta: Meta<CalendarStoryArgs> = {
  title: "Date & Time/Calendar",
  component: CalendarComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    language: {
      control: "text",
      description:
        "BCP 47 language tag for Gregorian months, weekdays and date labels; uses native Intl, with en-US fallback",
    },
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the Calendar",
    },
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
    numberOfMonths: {
      control: "number",
      description: "Number of visible months; independent of selection mode",
    },
    error: {
      control: "text",
      description: "Error message to display",
      table: {
        type: { summary: "string" },
      },
    },
    onChange: {
      action: "date-changed",
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
    yearRange: {
      control: "object",
      description: "Range of years available in the year picker",
      table: {
        type: { summary: "{ from: number; to: number }" },
        defaultValue: { summary: "currentYear - 50 to currentYear + 10" },
      },
    },
    calendarStyle: {
      control: "object",
      description: "CSS properties applied to the calendar surface",
    },
    labelStyle: {
      control: "object",
      description: "CSS properties applied to the label text",
    },
    errorStyle: {
      control: "object",
      description: "CSS properties applied to the error message",
    },
  },
};

export const Calendar = {
  args: {
    language: "en-US",
    designSystem: "neus",
    mode: "single",
    required: false,
    label: "Select a date",
    name: "calendar",
    disabled: false,
    readonly: false,
    numberOfMonths: 1,
    error: undefined,
    defaultValue: undefined,
    yearRange: { from: 1970, to: 2040 },
    calendarStyle: {},
    labelStyle: {},
    errorStyle: {},
  },
  render: ({ designSystem, ...args }: CalendarStoryArgs) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <CalendarComponent {...args} />
    </ThemeProvider>
  ),
} satisfies StoryObj<CalendarStoryArgs>;

export default meta;
