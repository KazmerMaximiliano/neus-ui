import { Meta, StoryObj } from "@storybook/react";
import { WeekCalendar as WeekCalendarComponent } from "./WeekCalendar";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
const threeDaysLater = new Date(today);
threeDaysLater.setDate(threeDaysLater.getDate() + 3);

const meta: Meta<typeof WeekCalendarComponent> = {
  title: "Components/WeekCalendar",
  component: WeekCalendarComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "The title displayed in the calendar header",
    },
    events: {
      control: "object",
      description: "Array of event categories with their events",
    },
  },
};

type Story = StoryObj<typeof meta>;

export const WeekCalendar: Story = {
  args: {
    title: "Events",
    events: [
      {
        category: { title: "Room A", label: "Suite", color: "purple" },
        events: [
          {
            id: 1,
            title: "John Doe",
            start: today,
            end: dayAfterTomorrow,
            description: "2 guests",
          },
        ],
      },
      {
        category: { title: "Room B", label: "Standard" },
        events: [
          {
            id: 2,
            title: "Jane Smith",
            start: tomorrow,
            end: threeDaysLater,
            description: "1 guest",
          },
        ],
      },
    ],
  },
};

export default meta;
