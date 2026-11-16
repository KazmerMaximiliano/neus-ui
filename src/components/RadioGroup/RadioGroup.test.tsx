import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Radio } from "../Radio";
import { RadioGroup } from "./RadioGroup";
import * as stories from "./RadioGroup.stories";
import type { RadioGroupProps } from "./RadioGroup.types";

afterEach(cleanup);

const { RadioGroup: RadioGroupStory } = composeStories(stories);

const renderGroup = (props: Partial<RadioGroupProps> = {}) =>
  render(
    <RadioGroup label="Delivery" {...props}>
      <Radio value="standard" label="Standard" />
      <Radio value="express" label="Express" />
      <Radio value="pickup" label="Store pickup" disabled />
    </RadioGroup>,
  );

describe("RadioGroup", () => {
  describe("rendering", () => {
    it("renders a radio group named by its legend, with radios that share a name", () => {
      renderGroup();
      const group = screen.getByRole("radiogroup", { name: "Delivery" });
      const radios = screen.getAllByRole("radio");

      expect(group.tagName).toBe("FIELDSET");
      expect(group).toHaveAttribute("data-orientation", "vertical");
      expect(radios).toHaveLength(3);
      expect(new Set(radios.map((radio) => radio.getAttribute("name"))).size).toBe(1);
      expect(radios[0]).toHaveAttribute("name");
      expect(radios.every((radio) => !(radio as HTMLInputElement).checked)).toBe(true);
    });

    it("uses the given name and starts from defaultValue", () => {
      renderGroup({ name: "delivery", defaultValue: "express" });

      expect(screen.getByRole("radio", { name: "Express" })).toBeChecked();
      expect(screen.getByRole("radio", { name: "Standard" })).toHaveAttribute("name", "delivery");
    });

    it("announces the description and the error after the caller's ids", () => {
      renderGroup({ description: "Prices include taxes.", error: "Choose a delivery.", "aria-describedby": "hint" });
      const group = screen.getByRole("radiogroup", { name: "Delivery" });
      const description = screen.getByText("Prices include taxes.");
      const error = screen.getByText("Choose a delivery.");

      expect(group).toHaveAttribute("aria-describedby", `hint ${description.id} ${error.id}`);
      expect(group).toHaveAttribute("aria-invalid", "true");
      expect(description).toHaveClass("field__description");
      expect(error).toHaveClass("radio-group__error");
    });

    it("marks a required group with a hidden asterisk and required radios", () => {
      renderGroup({ required: true });
      const group = screen.getByRole("radiogroup", { name: "Delivery" });

      expect(group).toHaveAttribute("aria-required", "true");
      expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByRole("radio", { name: "Standard" })).toBeRequired();
    });

    it("is named by aria-label without a legend", () => {
      render(
        <RadioGroup aria-label="Plan">
          <Radio value="free" label="Free" />
        </RadioGroup>,
      );

      expect(screen.getByRole("radiogroup", { name: "Plan" })).not.toHaveAttribute("aria-describedby");
      expect(document.querySelector("legend")).toBeNull();
    });

    it("lays the radios in a row when horizontal", () => {
      renderGroup({ orientation: "horizontal" });

      expect(screen.getByRole("radiogroup")).toHaveAttribute("data-orientation", "horizontal");
    });

    it("renders its story as a controlled group", () => {
      render(<RadioGroupStory />);

      expect(screen.getByRole("radio", { name: "Standard" })).toBeChecked();
      expect(screen.getByRole("radiogroup", { name: "Delivery" })).toHaveAccessibleDescription("Prices include taxes.");
    });
  });

  describe("interactions", () => {
    it("selects with a click and moves the selection with the arrow keys", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderGroup({ onChange });

      await user.click(screen.getByText("Standard"));
      expect(screen.getByRole("radio", { name: "Standard" })).toBeChecked();
      expect(onChange).toHaveBeenLastCalledWith("standard");
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("radio", { name: "Express" })).toBeChecked();
      expect(screen.getByRole("radio", { name: "Standard" })).not.toBeChecked();
      expect(onChange).toHaveBeenLastCalledWith("express");
    });

    it("keeps a controlled value owned by the consumer", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { rerender } = render(
        <RadioGroup label="Delivery" value={null} onChange={onChange}>
          <Radio value="standard" label="Standard" />
          <Radio value="express" label="Express" />
        </RadioGroup>,
      );

      await user.click(screen.getByRole("radio", { name: "Express" }));
      expect(onChange).toHaveBeenCalledWith("express");
      expect(screen.getByRole("radio", { name: "Express" })).not.toBeChecked();
      rerender(
        <RadioGroup label="Delivery" value="express" onChange={onChange}>
          <Radio value="standard" label="Standard" />
          <Radio value="express" label="Express" />
        </RadioGroup>,
      );
      expect(screen.getByRole("radio", { name: "Express" })).toBeChecked();
    });

    it("disables every radio through the fieldset", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderGroup({ disabled: true, onChange });

      await user.click(screen.getByText("Standard"));

      expect(screen.getByRole("radiogroup")).toBeDisabled();
      expect(screen.getByRole("radio", { name: "Standard" })).toBeDisabled();
      expect(onChange).not.toHaveBeenCalled();
    });

    it("submits the chosen value with the form", async () => {
      const user = userEvent.setup();
      const submit = vi.fn();
      render(
        <form onSubmit={(event) => {
          event.preventDefault();
          submit(new FormData(event.currentTarget).get("delivery"));
        }}>
          <RadioGroup label="Delivery" name="delivery" defaultValue="standard">
            <Radio value="standard" label="Standard" />
            <Radio value="express" label="Express" />
          </RadioGroup>
          <button type="submit">Save</button>
        </form>,
      );

      await user.click(screen.getByRole("radio", { name: "Express" }));
      await user.click(screen.getByRole("button", { name: "Save" }));
      expect(submit).toHaveBeenLastCalledWith("express");
    });
  });

  describe("customization", () => {
    it("forwards native attributes and the ref to the fieldset", () => {
      const ref = createRef<HTMLFieldSetElement>();
      renderGroup({ ref, id: "delivery", "data-testid": "delivery" } as Partial<RadioGroupProps>);

      expect(ref.current).toBe(screen.getByRole("radiogroup"));
      expect(ref.current).toHaveAttribute("id", "delivery");
      expect(ref.current).toHaveAttribute("data-testid", "delivery");
    });

    it.each([
      ["className", "style", "radio-group"],
      ["labelClassName", "labelStyle", "radio-group__label"],
      ["requiredClassName", "requiredStyle", "radio-group__required"],
      ["descriptionClassName", "descriptionStyle", "field__description"],
      ["optionsClassName", "optionsStyle", "radio-group__options"],
      ["errorClassName", "errorStyle", "radio-group__error"],
    ])("applies and removes %s and %s on .%s", (classProp, styleProp, base) => {
      const props = { required: true, description: "Prices include taxes.", error: "Choose a delivery." };
      const { container, rerender } = render(
        <RadioGroup label="Delivery" {...props} {...{ [classProp]: "consumer-part", [styleProp]: { outlineOffset: "7px" } }}>
          <Radio value="standard" label="Standard" />
        </RadioGroup>,
      );
      const part = container.querySelector<HTMLElement>(".consumer-part")!;

      expect(part).toHaveClass(base);
      expect(part).toHaveStyle({ outlineOffset: "7px" });
      rerender(
        <RadioGroup label="Delivery" {...props}>
          <Radio value="standard" label="Standard" />
        </RadioGroup>,
      );
      expect(container.querySelector(".consumer-part")).toBeNull();
      expect(part.style.outlineOffset).toBe("");
    });

    it("keeps optional parts absent even when their hooks are supplied", () => {
      const { container } = render(
        <RadioGroup aria-label="Plan" labelStyle={{ color: "red" }} errorStyle={{ color: "red" }} requiredStyle={{ color: "red" }}>
          <Radio value="free" label="Free" />
        </RadioGroup>,
      );

      expect(container.querySelector(".radio-group__label")).toBeNull();
      expect(container.querySelector(".radio-group__error")).toBeNull();
      expect(container.querySelector(".radio-group__required")).toBeNull();
    });

    it("rejects attributes that clash with its own API", () => {
      // @ts-expect-error RadioGroup reports the chosen value, not the change event.
      void (<RadioGroup onChange={(event: React.ChangeEvent<HTMLFieldSetElement>) => event}>{null}</RadioGroup>);
      // @ts-expect-error The role is always radiogroup.
      void (<RadioGroup role="group">{null}</RadioGroup>);
    });
  });
});
