import { TABBABLE } from "./Drawer.consts";

/** Whether a point falls outside the element's box: on a dialog, that is its backdrop. */
export const isOutside = (element: Element, x: number, y: number) => {
  const { left, right, top, bottom } = element.getBoundingClientRect();
  return x < left || x > right || y < top || y > bottom;
};

/** The controls Tab reaches inside the root, in document order. */
export const tabbables = (root: HTMLElement) =>
  [...root.querySelectorAll<HTMLElement>(TABBABLE)].filter(
    (element) =>
      element.tabIndex >= 0 &&
      !element.matches(":disabled") &&
      element.getClientRects().length > 0,
  );
