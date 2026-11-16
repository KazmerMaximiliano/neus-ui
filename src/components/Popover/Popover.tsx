import { usePopover } from "../../hooks/usePopover";
import { PopoverPanel } from "./components/PopoverPanel";
import type { PopoverProps } from "./Popover.types";
import { POPOVER_INITIAL_FOCUS } from "./Popover.consts";
import "./Popover.styles.css";

const join = (...names: (string | undefined)[]) => names.filter(Boolean).join(" ");

/** Content anchored to a trigger, in a non-modal dialog on the top layer. */
export const Popover = ({
  className,
  style,
  panelClassName,
  panelStyle,
  trigger,
  label,
  children,
  placement = "bottom-start",
  open,
  defaultOpen,
  onOpenChange,
}: PopoverProps) => {
  const { id, open: shown, triggerRef, popoverRef, toggle, hide } = usePopover({
    placement, open, defaultOpen, onOpenChange, initialFocus: POPOVER_INITIAL_FOCUS,
  });

  return (
    <div
      className={join("popover", className)}
      style={style}
      // Tabbing out of the panel closes it; a click on its text (no related target) does not.
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) hide();
      }}
    >
      {trigger({
        ref: triggerRef,
        "aria-haspopup": "dialog",
        "aria-expanded": shown,
        "aria-controls": id,
        onClick: toggle,
      })}
      <PopoverPanel
        ref={popoverRef}
        id={id}
        role="dialog"
        aria-label={label}
        className={join("popover__panel", panelClassName)}
        style={panelStyle}
      >
        {children}
      </PopoverPanel>
    </div>
  );
};
