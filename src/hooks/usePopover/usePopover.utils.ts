import type { PlacementRect, PlacementSize, PopoverPlacement } from "./usePopover.types";

/** The preferred placement, flipped to the other side or edge when the panel does not fit and the other one has more room. */
export const resolvePlacement = (
  placement: PopoverPlacement,
  anchor: PlacementRect,
  panel: PlacementSize,
  viewport: PlacementSize,
  rtl = false,
): PopoverPlacement => {
  let [side, align] = placement.split("-") as ["top" | "bottom", "start" | "end"];
  const below = viewport.height - anchor.bottom;
  const above = anchor.top;
  if (side === "bottom" ? panel.height > below && above > below : panel.height > above && below > above) {
    side = side === "bottom" ? "top" : "bottom";
  }
  const fitsLeftEdge = anchor.left + panel.width <= viewport.width;
  const fitsRightEdge = anchor.right - panel.width >= 0;
  const [fitsStart, fitsEnd] = rtl ? [fitsRightEdge, fitsLeftEdge] : [fitsLeftEdge, fitsRightEdge];
  if (align === "start" ? !fitsStart && fitsEnd : !fitsEnd && fitsStart) {
    align = align === "start" ? "end" : "start";
  }
  return `${side}-${align}`;
};
