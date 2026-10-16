import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../../../design-systems";
export type DayCellType = "empty" | "single" | "start" | "continue" | "end";

export type DayCellInfo = {
  type: DayCellType;
  event: CalendarEvent | null;
  durationDays: number;
};

export type EventsByCategory = {
  category: Category;
  events: CalendarEvent[];
};

export type Category = {
  color?: string;
  title: string;
  label: string;
};

export type CalendarEvent = {
  id?: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
};

export type WeekCalendarRowProps = {
  categoryClassName?: string;
  categoryInfoClassName?: string;
  categoryInfoStyle?: CSSProperties;
  categoryNameClassName?: string;
  categoryNameStyle?: CSSProperties;
  dayCellClassName?: string;
  dayCellStyle?: CSSProperties;
  eventAvatarClassName?: string;
  eventAvatarStyle?: CSSProperties;
  eventClassName?: string;
  eventDescriptionClassName?: string;
  eventDescriptionStyle?: CSSProperties;
  eventInfoClassName?: string;
  eventInfoStyle?: CSSProperties;
  eventTitleClassName?: string;
  eventTitleStyle?: CSSProperties;
  tooltipClassName?: string;
  className?: string;
  style?: CSSProperties;
  categoryStyle?: CSSProperties;
  eventStyle?: CSSProperties;
  tooltipStyle?: CSSProperties;
  entry: EventsByCategory;
  days: Date[];
  color: string;
  hoverContent?: (event: CalendarEvent) => React.ReactNode;
  onEventClick?: (event: CalendarEvent) => void;
};

export type EventTooltip = { x: number; y: number; event: CalendarEvent; };

export type WeekCalendarRowStoryArgs = WeekCalendarRowProps & {
  designSystem: DesignSystemId;
};
