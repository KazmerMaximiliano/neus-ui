import { useCallback, useEffect, useId, useRef, useState } from "react";

export const usePopover = <
  T extends HTMLElement = HTMLButtonElement,
  P extends HTMLElement = HTMLDivElement,
  A extends HTMLElement = HTMLDivElement,
>({ initialFocus }: { initialFocus?: string } = {}) => {
  const id = useId();
  const triggerRef = useRef<T>(null);
  const popoverRef = useRef<P>(null);
  const anchorRef = useRef<A>(null);
  const [open, setOpen] = useState(false);

  const place = useCallback(() => {
    const anchor = anchorRef.current ?? triggerRef.current;
    const popover = popoverRef.current;
    if (!anchor || !popover) return;
    const { bottom, left, right, width } = anchor.getBoundingClientRect();
    const viewport = document.documentElement.clientWidth;
    popover.style.setProperty("--popover-top", `${bottom}px`);
    popover.style.setProperty("--popover-left", `${left}px`);
    popover.style.setProperty("--popover-right", `${viewport - right}px`);
    popover.style.setProperty("--popover-anchor-width", `${width}px`);
  }, []);

  const show = useCallback(() => {
    place();
    popoverRef.current?.togglePopover(true);
    setOpen(true);
  }, [place]);

  const hide = useCallback((restoreFocus = false) => {
    popoverRef.current?.togglePopover(false);
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  const toggle = useCallback(() => (open ? hide() : show()), [open, hide, show]);

  useEffect(() => {
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
      if (event.key === "Escape") hide(true);
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
  }, [open, hide, place]);

  return { id, open, triggerRef, popoverRef, anchorRef, show, hide, toggle };
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
