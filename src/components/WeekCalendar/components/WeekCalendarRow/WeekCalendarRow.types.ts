import type { CSSProperties } from "react";
import type { DesignSystemId } from "../../../../design-systems";
export type DayCellType = "empty" | "single" | "start" | "continue" | "end";

export type DayCellInfo = {
  type: DayCellType;
  event: CalendarEvent | null;
  durationDays: number;
};

export type EventsByCategory = {
  readonly category: Category;
  readonly events: readonly CalendarEvent[];
};

export type Category = {
  readonly color?: string;
  readonly title: string;
  readonly label: string;
};

export type CalendarEvent = {
  readonly id?: number;
  readonly title: string;
  readonly start: Date;
  readonly end: Date;
  readonly description?: string;
};

export type WeekCalendarRowProps = {
  readonly categoryClassName?: string;
  readonly categoryInfoClassName?: string;
  readonly categoryInfoStyle?: CSSProperties;
  readonly categoryNameClassName?: string;
  readonly categoryNameStyle?: CSSProperties;
  readonly dayCellClassName?: string;
  readonly dayCellStyle?: CSSProperties;
  readonly eventAvatarClassName?: string;
  readonly eventAvatarStyle?: CSSProperties;
  readonly eventClassName?: string;
  readonly eventDescriptionClassName?: string;
  readonly eventDescriptionStyle?: CSSProperties;
  readonly eventInfoClassName?: string;
  readonly eventInfoStyle?: CSSProperties;
  readonly eventTitleClassName?: string;
  readonly eventTitleStyle?: CSSProperties;
  readonly tooltipClassName?: string;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly categoryStyle?: CSSProperties;
  readonly eventStyle?: CSSProperties;
  readonly tooltipStyle?: CSSProperties;
  readonly entry: EventsByCategory;
  readonly days: readonly Date[];
  readonly color: string;
  readonly hoverContent?: (event: CalendarEvent) => React.ReactNode;
  readonly onEventClick?: (event: CalendarEvent) => void;
  /** BCP 47 tag for the date in each event's accessible name; en-US when omitted or unsupported. */
  readonly language?: string;
};

export type EventTooltip = { x: number; y: number; event: CalendarEvent; };

export type WeekCalendarRowStoryArgs = WeekCalendarRowProps & {
  readonly designSystem: DesignSystemId;
};
