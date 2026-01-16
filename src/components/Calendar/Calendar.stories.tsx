import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Calendar as CalendarComponent } from "./Calendar";
import { CalendarDateRange } from "./Calendar.types";

const meta: Meta<typeof CalendarComponent> = {
  title: "Components/Calendar",
  component: CalendarComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "range"],
      description: "Selection mode: single date or range",
    },
    selected: {
      control: "object",
      description: "Selected date or date range",
    },
    locale: {
      control: "text",
      description: "Locale for date formatting (e.g., es-ES, en-US, fr-FR)",
    },
    label: {
      control: "text",
      description: "Calendar label",
    },
    required: {
      control: "boolean",
      description: "If the input is required",
    },
    disabled: {
      control: "boolean",
      description: "If the input is disabled",
    },
    readonly: {
      control: "boolean",
      description: "If the input is read-only",
    },
    error: {
      control: "text",
      description: "Error message",
    },
    onSelect: { action: "date selected" },
  },
};

type Story = StoryObj<typeof meta>;

export const Calendar: Story = {
  args: {
    mode: "single",
    selected: undefined,
    locale: "en",
    label: "Select a date",
    required: true,
    disabled: false,
    readonly: false,
    error: undefined,
    onSelect: undefined,
  },
};

export default meta;
