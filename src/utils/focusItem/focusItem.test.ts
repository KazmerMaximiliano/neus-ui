import { afterEach, describe, expect, it } from "vitest";
import { focusItem } from "./focusItem";

const list = (count: number) => {
  const container = document.createElement("div");
  container.innerHTML = Array.from({ length: count }, (_, index) => `<button>${index}</button>`).join("");
  document.body.append(container);
  return container;
};

afterEach(() => document.body.replaceChildren());

describe("focusItem", () => {
  it("moves to the next and previous item and wraps at both ends", () => {
    const container = list(3);
    const [first, , last] = container.querySelectorAll("button");
    first.focus();

    expect(focusItem(container, "ArrowUp", "button")).toBe(true);
    expect(last).toHaveFocus();
    focusItem(container, "ArrowDown", "button");
    expect(first).toHaveFocus();
  });

  it("jumps to the ends with Home and End", () => {
    const container = list(3);
    const [first, , last] = container.querySelectorAll("button");

    focusItem(container, "End", "button");
    expect(last).toHaveFocus();
    focusItem(container, "Home", "button");
    expect(first).toHaveFocus();
  });

  it("takes other keys for next and previous", () => {
    const container = list(2);
    const [first, second] = container.querySelectorAll("button");
    first.focus();

    expect(focusItem(container, "ArrowDown", "button", ["ArrowRight", "ArrowLeft"])).toBe(false);
    focusItem(container, "ArrowRight", "button", ["ArrowRight", "ArrowLeft"]);
    expect(second).toHaveFocus();
  });

  it("ignores other keys and a missing container", () => {
    expect(focusItem(list(1), "Enter", "button")).toBe(false);
    expect(focusItem(null, "ArrowDown", "button")).toBe(false);
  });
});
