import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { UsePopoverOptions } from "./usePopover.types";
import { resolvePlacement } from "./usePopover.utils";

export const usePopover = <
  T extends HTMLElement = HTMLButtonElement,
  P extends HTMLElement = HTMLDivElement,
  A extends HTMLElement = HTMLDivElement,
>({
  initialFocus,
  placement = "bottom-start",
  restoreFocus = true,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: UsePopoverOptions = {}) => {
  const id = useId();
  const triggerRef = useRef<T>(null);
  const popoverRef = useRef<P>(null);
  const anchorRef = useRef<A>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;

  const place = useCallback(() => {
    const anchor = anchorRef.current ?? triggerRef.current;
    const popover = popoverRef.current;
    if (!anchor || !popover) return;
    const rect = anchor.getBoundingClientRect();
    const { clientWidth, clientHeight } = document.documentElement;
    popover.dataset.placement = resolvePlacement(
      placement,
      rect,
      { width: popover.offsetWidth, height: popover.offsetHeight },
      { width: clientWidth, height: clientHeight },
      getComputedStyle(anchor).direction === "rtl",
    );
    popover.style.setProperty("--popover-top", `${rect.bottom}px`);
    popover.style.setProperty("--popover-bottom", `${clientHeight - rect.top}px`);
    popover.style.setProperty("--popover-left", `${rect.left}px`);
    popover.style.setProperty("--popover-right", `${clientWidth - rect.right}px`);
    popover.style.setProperty("--popover-anchor-width", `${rect.width}px`);
    // A centered panel stays whole inside the viewport.
    const centered = rect.left + (rect.width - popover.offsetWidth) / 2;
    popover.style.setProperty(
      "--popover-center",
      `${Math.max(0, Math.min(centered, clientWidth - popover.offsetWidth))}px`,
    );
  }, [placement]);

  const setOpen = useCallback((next: boolean) => {
    if (next === open) return;
    if (controlledOpen === undefined) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }, [open, controlledOpen, onOpenChange]);

  const show = useCallback(() => setOpen(true), [setOpen]);

  const hide = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, [setOpen]);

  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);

  // The panel follows the state. It is placed once shown, so flipping measures its real size.
  useLayoutEffect(() => {
    const popover = popoverRef.current;
    if (!popover?.isConnected) return;
    popover.togglePopover(open);
    if (open) place();
  }, [open, place]);

  // A panel open from the first render (defaultOpen) does not take focus away from the page.
  const openedOnMount = useRef(open);
  useEffect(() => {
    if (openedOnMount.current) {
      openedOnMount.current = false;
      return;
    }
    if (open && initialFocus) {
      popoverRef.current?.querySelector<HTMLElement>(initialFocus)?.focus();
    }
  }, [open, initialFocus]);

  useEffect(() => {
    if (!open) return;
    const onMouseDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !popoverRef.current?.contains(target) &&
        !triggerRef.current?.contains(target) &&
        !anchorRef.current?.contains(target)
      ) {
        hide();
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide(restoreFocus);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open, hide, place, restoreFocus]);

  return { id, open, triggerRef, popoverRef, anchorRef, show, hide, toggle, place };
};

const NAVIGATION_KEYS = ["ArrowDown", "ArrowUp", "Home", "End"];

export const focusMenuItem = (
  container: HTMLElement | null,
  key: string,
  selector = '[role="menuitem"]:not(:disabled)',
) => {
  if (!container || !NAVIGATION_KEYS.includes(key)) return false;
  const items = [...container.querySelectorAll<HTMLElement>(selector)];
  if (items.length === 0) return true;
  const current = items.indexOf(document.activeElement as HTMLElement);
  const index =
    key === "Home"
      ? 0
      : key === "End"
        ? items.length - 1
        : (current + (key === "ArrowDown" ? 1 : -1) + items.length) %
        items.length;
  items[index].focus();
  return true;
};
