import { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../design-systems";
import { ThemeProvider } from "../../providers";
import { WeekCalendar as WeekCalendarComponent } from "./WeekCalendar";
import type { WeekCalendarStoryArgs } from "./WeekCalendar.types";

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
const threeDaysLater = new Date(today);
threeDaysLater.setDate(threeDaysLater.getDate() + 3);

const meta: Meta<WeekCalendarStoryArgs> = {
  title: "Date & Time/WeekCalendar",
  component: WeekCalendarComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    categoryClassName: {
      control: "text",
      description: "Additional CSS classes for category",
    },
    dateRangeClassName: {
      control: "text",
      description: "Additional CSS classes for date range",
    },
    dateRangeStyle: {
      control: "object",
      description: "Inline CSS override for date range",
    },
    eventClassName: {
      control: "text",
      description: "Additional CSS classes for event",
    },
    tooltipClassName: {
      control: "text",
      description: "Additional CSS classes for tooltip",
    },
    dayNameClassName: {
      control: "text",
      description: "Additional classes for dayName",
    },
    dayNameStyle: {
      control: "object",
      description: "Style override for dayName",
    },
    dayNumberClassName: {
      control: "text",
      description: "Additional classes for dayNumber",
    },
    dayNumberStyle: {
      control: "object",
      description: "Style override for dayNumber",
    },
    gridClassName: {
      control: "text",
      description: "Additional classes for grid",
    },
    headerCategoryCellClassName: {
      control: "text",
      description: "Additional classes for headerCategoryCell",
    },
    headerCategoryCellStyle: {
      control: "object",
      description: "Style override for headerCategoryCell",
    },
    headerClassName: {
      control: "text",
      description: "Additional classes for header",
    },
    headerDayCellClassName: {
      control: "text",
      description: "Additional classes for headerDayCell",
    },
    headerDayCellStyle: {
      control: "object",
      description: "Style override for headerDayCell",
    },
    headerRowClassName: {
      control: "text",
      description: "Additional classes for headerRow",
    },
    headerRowStyle: {
      control: "object",
      description: "Style override for headerRow",
    },
    navigationClassName: {
      control: "text",
      description: "Additional classes for navigation",
    },
    titleClassName: {
      control: "text",
      description: "Additional classes for title",
    },
    titleStyle: { control: "object", description: "Style override for title" },
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the WeekCalendar",
    },
    className: { control: "text", description: "className override" },
    style: { control: "object", description: "style override" },
    headerStyle: { control: "object", description: "headerStyle override" },
    navigationStyle: {
      control: "object",
      description: "navigationStyle override",
    },
    gridStyle: { control: "object", description: "gridStyle override" },
    categoryStyle: { control: "object", description: "categoryStyle override" },
    eventStyle: { control: "object", description: "eventStyle override" },
    tooltipStyle: { control: "object", description: "tooltipStyle override" },

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
        "Render function called with the hovered CalendarEvent, returns a React node displayed as tooltip at the cursor position",
    },
    onEventClick: {
      action: "eventClicked",
      description:
        "Callback fired when clicking an event cell, receives the CalendarEvent",
    },
    onDayChange: {
      action: "dayChanged",
      description:
        "Callback fired when navigating to a different day, receives weekStart and weekEnd dates",
    },
  },
};

type Story = StoryObj<typeof meta>;

export const WeekCalendar: Story = {
  args: {
    categoryClassName: undefined,
    dateRangeClassName: undefined,
    dateRangeStyle: undefined,
    eventClassName: undefined,
    tooltipClassName: undefined,
    dayNameClassName: undefined,
    dayNameStyle: undefined,
    dayNumberClassName: undefined,
    dayNumberStyle: undefined,
    gridClassName: undefined,
    headerCategoryCellClassName: undefined,
    headerCategoryCellStyle: undefined,
    headerClassName: undefined,
    headerDayCellClassName: undefined,
    headerDayCellStyle: undefined,
    headerRowClassName: undefined,
    headerRowStyle: undefined,
    navigationClassName: undefined,
    titleClassName: undefined,
    titleStyle: undefined,
    designSystem: "neus",
    className: undefined,
    style: {},
    headerStyle: {},
    navigationStyle: {},
    gridStyle: {},
    categoryStyle: {},
    eventStyle: {},
    tooltipStyle: {},

    title: "Events",
    hoverContent: (event) => (
      <div>
        <strong>{event.title}</strong>
        {event.description && <p>{event.description}</p>}
      </div>
    ),
    events: [
      {
        category: { title: "Room A", label: "Suite", color: "#FF5733" },
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
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <WeekCalendarComponent {...args} />
    </ThemeProvider>
  ),
};

export default meta;
