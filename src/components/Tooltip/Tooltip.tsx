import { useEffect, useLayoutEffect, useState } from "react";
import { usePopover } from "../../hooks/usePopover";
import { TooltipBubble } from "./components/TooltipBubble";
import type { TooltipProps } from "./Tooltip.types";
import { TOOLTIP_CLOSE_DELAY, TOOLTIP_DELAY } from "./Tooltip.consts";

/** A short description of its trigger, shown on hover and keyboard focus. */
export const Tooltip = <T extends HTMLElement = HTMLButtonElement>({
  content,
  trigger,
  placement = "top",
  delay = TOOLTIP_DELAY,
  className,
  style,
}: TooltipProps<T>) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const { id, triggerRef, popoverRef, place } = usePopover<T, HTMLSpanElement>({
    placement,
    open,
    onOpenChange: setOpen,
    restoreFocus: false,
  });
  const wanted = hovered || focused;

  // Escape closes it without changing what is wanted, so it stays closed until the pointer or focus comes back.
  useEffect(() => {
    const timer = setTimeout(
      () => setOpen(wanted),
      wanted ? (focused ? 0 : delay) : TOOLTIP_CLOSE_DELAY,
    );
    return () => clearTimeout(timer);
  }, [wanted, focused, delay]);

  // Text that wraps takes the multi-line padding and width some systems define (Carbon), then the tooltip is placed again.
  useLayoutEffect(() => {
    const bubble = popoverRef.current;
    if (!open || !bubble) return;
    delete bubble.dataset.multiline;
    const { lineHeight, paddingTop, paddingBottom } = getComputedStyle(bubble);
    const text = bubble.clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
    if (text > parseFloat(lineHeight) * 1.5) {
      bubble.dataset.multiline = "";
      place();
    }
  });

  return (
    <>
      {trigger({
        ref: triggerRef,
        "aria-describedby": id,
        // A tap would flash the tooltip over the action it starts.
        onPointerEnter: (event) => setHovered(event.pointerType !== "touch"),
        onPointerLeave: () => setHovered(false),
        // A mouse click focuses without :focus-visible; hovering already covers it.
        onFocus: (event) => setFocused(event.currentTarget.matches(":focus-visible")),
        onBlur: () => setFocused(false),
      })}
      <TooltipBubble
        ref={popoverRef}
        id={id}
        popover="manual"
        className={className}
        style={style}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {content}
      </TooltipBubble>
    </>
  );
};
