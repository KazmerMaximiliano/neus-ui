import type { Meta, StoryObj } from "@storybook/react";
import { DESIGN_SYSTEMS } from "../../../../design-systems";
import { ThemeProvider } from "../../../../providers";
import { WeekCalendarRow as WeekCalendarRowComponent } from "./WeekCalendarRow";
import type { WeekCalendarRowStoryArgs } from "./WeekCalendarRow.types";

const days = Array.from(
  { length: 7 },
  (_, index) => new Date(2026, 9, 12 + index),
);
const meta: Meta<WeekCalendarRowStoryArgs> = {
  title: "Date & Time/WeekCalendar/WeekCalendarRow",
  component: WeekCalendarRowComponent,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  argTypes: {
    categoryClassName: {
      control: "text",
      description: "Additional classes for category",
    },
    categoryInfoClassName: {
      control: "text",
      description: "Additional classes for categoryInfo",
    },
    categoryInfoStyle: {
      control: "object",
      description: "Style override for categoryInfo",
    },
    categoryNameClassName: {
      control: "text",
      description: "Additional classes for categoryName",
    },
    categoryNameStyle: {
      control: "object",
      description: "Style override for categoryName",
    },
    dayCellClassName: {
      control: "text",
      description: "Additional classes for dayCell",
    },
    dayCellStyle: {
      control: "object",
      description: "Style override for dayCell",
    },
    eventAvatarClassName: {
      control: "text",
      description: "Additional classes for eventAvatar",
    },
    eventAvatarStyle: {
      control: "object",
      description: "Style override for eventAvatar",
    },
    eventClassName: {
      control: "text",
      description: "Additional classes for event",
    },
    eventDescriptionClassName: {
      control: "text",
      description: "Additional classes for eventDescription",
    },
    eventDescriptionStyle: {
      control: "object",
      description: "Style override for eventDescription",
    },
    eventInfoClassName: {
      control: "text",
      description: "Additional classes for eventInfo",
    },
    eventInfoStyle: {
      control: "object",
      description: "Style override for eventInfo",
    },
    eventTitleClassName: {
      control: "text",
      description: "Additional classes for eventTitle",
    },
    eventTitleStyle: {
      control: "object",
      description: "Style override for eventTitle",
    },
    tooltipClassName: {
      control: "text",
      description: "Additional classes for tooltip",
    },
    designSystem: {
      control: "select",
      options: DESIGN_SYSTEMS.map(({ id }) => id),
      description: "The design system used to preview the WeekCalendarRow",
    },
    entry: { control: "object", description: "Category and events" },
    days: { control: "object", description: "Displayed calendar dates" },
    color: { control: "color", description: "Category accent" },
    hoverContent: {
      control: false,
      description: "Informational tooltip on hover or focus",
    },
    onEventClick: {
      action: "event-clicked",
      description: "Mouse and keyboard event activation",
    },
    className: { control: "text", description: "Row classes" },
    style: { control: "object", description: "Row styles" },
    categoryStyle: { control: "object", description: "Category styles" },
    eventStyle: { control: "object", description: "Event styles" },
    tooltipStyle: { control: "object", description: "Tooltip styles" },
  },
};
export const WeekCalendarRow: StoryObj<typeof meta> = {
  args: {
    categoryClassName: undefined,
    categoryInfoClassName: undefined,
    categoryInfoStyle: undefined,
    categoryNameClassName: undefined,
    categoryNameStyle: undefined,
    dayCellClassName: undefined,
    dayCellStyle: undefined,
    eventAvatarClassName: undefined,
    eventAvatarStyle: undefined,
    eventClassName: undefined,
    eventDescriptionClassName: undefined,
    eventDescriptionStyle: undefined,
    eventInfoClassName: undefined,
    eventInfoStyle: undefined,
    eventTitleClassName: undefined,
    eventTitleStyle: undefined,
    tooltipClassName: undefined,
    designSystem: "neus",
    days,
    color: "#5c6bc0",
    entry: {
      category: { title: "Design", label: "Team" },
      events: [
        {
          id: 1,
          title: "Review",
          start: days[1],
          end: days[3],
          description: "Design systems",
        },
      ],
    },
    hoverContent: (event) => <span>{event.title}</span>,
    className: "",
    style: {},
    categoryStyle: {},
    eventStyle: {},
    tooltipStyle: {},
  },
  render: ({ designSystem, ...args }) => (
    <ThemeProvider scope="local" designSystem={designSystem}>
      <WeekCalendarRowComponent {...args} />
    </ThemeProvider>
  ),
};
export default meta;
