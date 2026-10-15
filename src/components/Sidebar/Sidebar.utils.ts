import type { SidebarScrollLock, SidebarViewport } from "./Sidebar.types";

const SCROLL_LOCKS = new WeakMap<Document, SidebarScrollLock>();
const SCROLL_LOCK_CLASS = "sidebar-scroll-locked";

export const getSidebarViewport = (): SidebarViewport => {
  if (typeof window === "undefined") return "desktop";
  if (window.innerWidth < 768) return "mobile";
  return window.innerWidth < 1024 ? "tablet" : "desktop";
};

export const getSidebarServerViewport = (): SidebarViewport => "desktop";

export const subscribeSidebarViewport = (notify: () => void) => {
  window.addEventListener("resize", notify);
  return () => window.removeEventListener("resize", notify);
};

export const lockSidebarScroll = (document: Document) => {
  const lock = SCROLL_LOCKS.get(document) ?? {
    count: 0,
    hadClass: document.documentElement.classList.contains(SCROLL_LOCK_CLASS),
  };
  lock.count += 1;
  SCROLL_LOCKS.set(document, lock);
  document.documentElement.classList.add(SCROLL_LOCK_CLASS);
  return () => {
    lock.count -= 1;
    if (lock.count === 0) {
      if (!lock.hadClass) document.documentElement.classList.remove(SCROLL_LOCK_CLASS);
      SCROLL_LOCKS.delete(document);
    }
  };
};

export const isOutsideSidebarDialog = (
  dialog: HTMLDialogElement,
  clientX: number,
  clientY: number,
) => {
  const bounds = dialog.getBoundingClientRect();
  return clientX < bounds.left || clientX > bounds.right
    || clientY < bounds.top || clientY > bounds.bottom;
};
