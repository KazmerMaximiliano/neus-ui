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
    hoverContent: {
      control: false,
      description:
        "Custom React node displayed as a tooltip at the cursor position when hovering over event cells",
    },
    onEventClick: {
      action: "eventClicked",
      description:
        "Callback fired when clicking an event cell, receives the CalendarEvent",
    },
    onWeekChange: {
      action: "weekChanged",
      description:
        "Callback fired when navigating to a different week, receives weekStart and weekEnd dates",
    },
  },
};

type Story = StoryObj<typeof meta>;

export const WeekCalendar: Story = {
  args: {
    title: "Events",
    hoverContent: (
      <div
        style={{
          padding: "8px 12px",
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          fontSize: "13px",
        }}
      >
        Click to see details
      </div>
    ),
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
