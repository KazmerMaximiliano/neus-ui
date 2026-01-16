import { Meta, StoryObj } from "@storybook/react";
import { Calendar as CalendarComponent } from "./Calendar";

const meta: Meta<typeof CalendarComponent> = {
  title: "Components/Calendar",
  component: CalendarComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
};

type Story = StoryObj<typeof meta>;

export const Calendar: Story = {
  args: {},
};

export default meta;
