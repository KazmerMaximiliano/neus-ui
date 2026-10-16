import "@testing-library/jest-dom/vitest";

// jsdom lacks the Popover API; mirror the open state so components can call it.
HTMLElement.prototype.togglePopover ??= function (
  this: HTMLElement,
  force?: boolean | TogglePopoverOptions,
) {
  const next = typeof force === "boolean" ? force : !this.hasAttribute("data-popover-open");
  this.toggleAttribute("data-popover-open", next);
  return next;
};

// jsdom's UA sheet hides every [popover]; show the ones the polyfill opened.
const popoverStyle = document.createElement("style");
popoverStyle.textContent = "[popover][data-popover-open] { display: block !important; }";
document.head.append(popoverStyle);

// jsdom lacks modal dialogs; mirror the open attribute and the close event.
HTMLDialogElement.prototype.showModal ??= function (this: HTMLDialogElement) {
  this.setAttribute("open", "");
};
HTMLDialogElement.prototype.close ??= function (this: HTMLDialogElement) {
  if (!this.open) return;
  this.removeAttribute("open");
  this.dispatchEvent(new Event("close"));
};

// jsdom does not lay out or scroll.
Element.prototype.scrollIntoView ??= () => {};
