import { createContext } from "react";
import type { CalendarCaptionCustomization } from "./Calendar.types";

export const OpenMonthViewContext = createContext<() => void>(() => { });
export const CalendarCaptionContext = createContext<CalendarCaptionCustomization>({});
