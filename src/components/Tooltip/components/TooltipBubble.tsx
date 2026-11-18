import type { TooltipBubbleProps } from "../Tooltip.types";
import "../Tooltip.styles.css";

/** The tooltip surface; its host decides where it sits. */
export const TooltipBubble = ({ className, ...props }: TooltipBubbleProps) => (
  <span {...props} role="tooltip" className={["tooltip", className].filter(Boolean).join(" ")} />
);
