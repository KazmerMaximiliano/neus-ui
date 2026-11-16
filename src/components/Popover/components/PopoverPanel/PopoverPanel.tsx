import type { PopoverPanelProps } from "./PopoverPanel.types";
import "./PopoverPanel.styles.css";

/** The top-layer panel shared by Popover, Menu, Select and the picker fields; each host styles its surface. */
export const PopoverPanel = ({ className, ...props }: PopoverPanelProps) => (
  <div {...props} popover="manual" className={["popover-panel", className].filter(Boolean).join(" ")} />
);
