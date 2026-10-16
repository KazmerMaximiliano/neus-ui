import { useContext, type HTMLAttributes } from "react";
import {
  CalendarCaptionContext,
  OpenMonthViewContext,
} from "../CalendarContext";

export const CaptionButton = ({
  children,
  className,
}: HTMLAttributes<HTMLSpanElement>) => {
  const openMonthView = useContext(OpenMonthViewContext);
  const { captionClassName, captionStyle } = useContext(CalendarCaptionContext);
  return (
    <button
      type="button"
      className={[className, captionClassName].filter(Boolean).join(" ")}
      style={captionStyle}
      onClick={openMonthView}
    >
      {children}
    </button>
  );
};
