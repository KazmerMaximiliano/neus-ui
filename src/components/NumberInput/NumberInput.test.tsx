import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NumberInput } from "./NumberInput";
import * as stories from "./NumberInput.stories";
import type { NumberInputProps } from "./NumberInput.types";
import { decimalsOf, parseNumber, settleNumber } from "./NumberInput.utils";

afterEach(cleanup);

const { NumberInput: NumberInputStory } = composeStories(stories);

const renderNumber = (props: Partial<NumberInputProps> = {}) =>
  render(<NumberInput label="Guests" {...props} />);

const field = () => screen.getByRole("spinbutton");

describe("NumberInput", () => {
  describe("rendering", () => {
    it("renders a labelled spinbutton with its range and steppers", () => {
      renderNumber({ defaultValue: 2, min: 1, max: 8 });

      expect(field()).toHaveAccessibleName("Guests");
      expect(field()).toHaveValue("2");
      expect(field()).toHaveAttribute("aria-valuenow", "2");
      expect(field()).toHaveAttribute("aria-valuemin", "1");
      expect(field()).toHaveAttribute("aria-valuemax", "8");
      expect(field()).toHaveAttribute("inputmode", "decimal");
      expect(screen.getByRole("button", { name: "Increase" })).toHaveAttribute("tabindex", "-1");
      expect(screen.getByRole("button", { name: "Decrease" })).toBeInTheDocument();
    });

    it("starts empty without a value", () => {
      renderNumber();

      expect(field()).toHaveValue("");
      expect(field()).not.toHaveAttribute("aria-valuenow");
      expect(field()).not.toHaveAttribute("aria-valuetext");
    });

    it("formats the number in the locale with the given options", () => {
      renderNumber({ defaultValue: 1234.5, step: 0.01, formatOptions: { style: "currency", currency: "EUR" }, locale: "de-DE" });

      // Intl separates the currency with a no-break space.
      expect(field()).toHaveValue("1.234,50\u00a0€");
      expect(field()).toHaveAttribute("aria-valuetext", "1.234,50\u00a0€");
    });

    it("hides the steppers", () => {
      renderNumber({ hideStepper: true });

      expect(screen.queryByRole("button")).toBeNull();
    });

    it("names the steppers with the given labels", () => {
      renderNumber({ labels: { increment: "More", decrement: "Fewer" } });

      expect(screen.getByRole("button", { name: "More" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Fewer" })).toBeInTheDocument();
    });

    it("renders its story as a controlled currency field", () => {
      render(<NumberInputStory />);

      expect(screen.getByRole("spinbutton", { name: "Price" })).toHaveValue("$1,250.00");
    });
  });

  describe("interactions", () => {
    it("shows the plain number while editing and the formatted one after", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderNumber({ defaultValue: 1200, step: 0.5, onChange });

      await user.click(field());
      expect(field()).toHaveValue("1200");
      await user.clear(field());
      await user.type(field(), "2,500.5");
      await user.tab();

      expect(field()).toHaveValue("2,500.5");
      expect(onChange).toHaveBeenCalledWith(2500.5);
    });

    it("clamps and rounds what is typed", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderNumber({ min: 0, max: 10, step: 0.5, onChange });

      await user.type(field(), "12.345");
      await user.tab();
      expect(onChange).toHaveBeenLastCalledWith(10);

      await user.clear(field());
      await user.type(field(), "3.14");
      await user.tab();
      expect(onChange).toHaveBeenLastCalledWith(3.1);
      expect(field()).toHaveValue("3.1");
    });

    it("clears to null and keeps the last number when the text is not a number", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderNumber({ defaultValue: 4, onChange });

      await user.clear(field());
      await user.type(field(), "abc");
      await user.tab();
      expect(field()).toHaveValue("4");
      expect(onChange).not.toHaveBeenCalled();

      await user.clear(field());
      await user.tab();
      expect(onChange).toHaveBeenCalledWith(null);
      expect(field()).toHaveValue("");
    });

    it("steps with the arrow, page, home and end keys", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderNumber({ defaultValue: 5, min: 0, max: 50, onChange });

      await user.click(field());
      await user.keyboard("{ArrowUp}");
      expect(field()).toHaveValue("6");
      await user.keyboard("{ArrowDown}{ArrowDown}");
      expect(field()).toHaveValue("4");
      await user.keyboard("{PageUp}");
      expect(field()).toHaveValue("14");
      await user.keyboard("{PageDown}");
      expect(field()).toHaveValue("4");
      await user.keyboard("{End}");
      expect(field()).toHaveValue("50");
      await user.keyboard("{Home}");
      expect(field()).toHaveValue("0");
      expect(onChange).toHaveBeenLastCalledWith(0);
    });

    it("steps from what is being typed and keeps decimals exact", async () => {
      const user = userEvent.setup();
      renderNumber({ step: 0.1 });

      await user.type(field(), "0.2");
      await user.keyboard("{ArrowUp}");

      expect(field()).toHaveValue("0.3");
    });

    it("steps with the buttons without taking the focus", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderNumber({ defaultValue: 1, max: 2, onChange });

      await user.click(field());
      await user.click(screen.getByRole("button", { name: "Increase" }));

      expect(field()).toHaveFocus();
      expect(onChange).toHaveBeenCalledWith(2);
      expect(screen.getByRole("button", { name: "Increase" })).toBeDisabled();
      await user.click(screen.getByRole("button", { name: "Decrease" }));
      expect(onChange).toHaveBeenLastCalledWith(1);
    });

    it("keeps a controlled value owned by the consumer", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { rerender } = render(<NumberInput label="Guests" value={2} onChange={onChange} />);

      await user.click(screen.getByRole("button", { name: "Increase" }));
      expect(onChange).toHaveBeenCalledWith(3);
      expect(field()).toHaveValue("2");
      rerender(<NumberInput label="Guests" value={3} onChange={onChange} />);
      expect(field()).toHaveValue("3");
    });

    it("submits the plain number under its name, also after Enter", async () => {
      const user = userEvent.setup();
      const submit = vi.fn();
      render(
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(new FormData(event.currentTarget).get("amount"));
          }}
        >
          <NumberInput label="Amount" name="amount" formatOptions={{ style: "currency", currency: "USD" }} />
          <button type="submit">Pay</button>
        </form>,
      );

      await user.type(field(), "1,500{Enter}");

      expect(submit).toHaveBeenLastCalledWith("1500");
      expect(field()).not.toHaveAttribute("name");
    });

    it("does not change while disabled or read-only", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { rerender } = render(<NumberInput label="Guests" defaultValue={2} disabled onChange={onChange} />);

      expect(field()).toBeDisabled();
      expect(screen.getByRole("button", { name: "Increase" })).toBeDisabled();
      rerender(<NumberInput label="Guests" defaultValue={2} readonly onChange={onChange} />);
      await user.click(field());
      await user.keyboard("{ArrowUp}");

      expect(field()).toHaveValue("2");
      expect(screen.getByRole("button", { name: "Increase" })).toBeDisabled();
      expect(onChange).not.toHaveBeenCalled();
    });

    it("lets the consumer's key handler cancel a step", async () => {
      const user = userEvent.setup();
      renderNumber({ defaultValue: 1, onKeyDown: (event) => event.preventDefault() });

      await user.click(field());
      await user.keyboard("{ArrowUp}");

      expect(field()).toHaveValue("1");
    });
  });

  describe("customization", () => {
    it.each([
      ["stepperClassName", "stepperStyle", "number-input__stepper"],
      ["incrementClassName", "incrementStyle", "number-input__increment"],
      ["decrementClassName", "decrementStyle", "number-input__decrement"],
    ])("applies and removes %s and %s on .%s", (classProp, styleProp, base) => {
      const { container, rerender } = render(
        <NumberInput label="Guests" {...{ [classProp]: "consumer-part", [styleProp]: { outlineOffset: "7px" } }} />,
      );
      const part = container.querySelector<HTMLElement>(".consumer-part")!;

      expect(part).toHaveClass(base);
      expect(part).toHaveStyle({ outlineOffset: "7px" });
      rerender(<NumberInput label="Guests" />);
      expect(container.querySelector(".consumer-part")).toBeNull();
      expect(part.style.outlineOffset).toBe("");
    });

    it("keeps the Input's parts and adds its root class", () => {
      const { container } = renderNumber({ className: "consumer", error: "Too many.", description: "Up to 8." });

      expect(container.querySelector(".input__wrapper")).toHaveClass("number-input", "consumer");
      expect(field()).toHaveAttribute("aria-invalid", "true");
      expect(field()).toHaveAccessibleDescription("Up to 8. Too many.");
    });

    it("rejects props that clash with its own API", () => {
      // @ts-expect-error NumberInput reports numbers, not text.
      void (<NumberInput label="Guests" onChange={(value: string) => value} />);
      // @ts-expect-error The field is always a spinbutton.
      void (<NumberInput label="Guests" type="number" />);
    });
  });

  describe("utilities", () => {
    it("reads text in the locale", () => {
      expect(parseNumber("1.234,5", "de-DE", {})).toBe(1234.5);
      expect(parseNumber("$ 1,000", "en-US", {})).toBe(1000);
      expect(parseNumber("-3", "en-US", {})).toBe(-3);
      expect(parseNumber("25%", "en-US", { style: "percent" })).toBe(0.25);
      expect(parseNumber("  ", "en-US", {})).toBeNull();
      expect(parseNumber("-", "en-US", {})).toBeUndefined();
      expect(parseNumber("1-2", "en-US", {})).toBeUndefined();
    });

    it("counts the decimals of a step and settles numbers", () => {
      expect(decimalsOf(1)).toBe(0);
      expect(decimalsOf(0.25)).toBe(2);
      expect(settleNumber(0.1 + 0.2, 1)).toBe(0.3);
      expect(settleNumber(-4, 0, 0, 10)).toBe(0);
      expect(settleNumber(14, 0, 0, 10)).toBe(10);
    });
  });
});
