import { useContext, type HTMLAttributes } from "react";
import { OpenMonthViewContext } from "../CalendarContext";

export const CaptionButton = ({
  children,
  className,
}: HTMLAttributes<HTMLSpanElement>) => {
  const openMonthView = useContext(OpenMonthViewContext);
  return (
    <button type="button" className={className} onClick={openMonthView}>
      {children}
    </button>
  );
};

