import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RadioGroup } from "../RadioGroup";
import { Radio } from "./Radio";
import * as stories from "./Radio.stories";

afterEach(cleanup);

const { Radio: RadioStory } = composeStories(stories);

describe("Radio", () => {
  describe("rendering", () => {
    it("renders a native radio named by its label with a hidden circle", () => {
      const { container } = render(<Radio value="express" label="Express" />);
      const radio = screen.getByRole("radio", { name: "Express" });

      expect(radio).toHaveAttribute("value", "express");
      expect(radio).not.toBeChecked();
      expect(radio).not.toHaveAttribute("name");
      expect(container.querySelector(".radio__circle")).toHaveAttribute("aria-hidden", "true");
      expect(container.querySelector(".radio__circle .radio__dot")).toBeInTheDocument();
    });

    it("announces the description apart from the name, after the caller's ids", () => {
      render(<Radio value="express" label="Express" description="Next business day." aria-describedby="hint" />);
      const radio = screen.getByRole("radio", { name: "Express" });
      const description = screen.getByText("Next business day.");

      expect(description).toHaveClass("field__description");
      expect(radio).toHaveAttribute("aria-describedby", `hint ${description.id}`);
    });

    it("is named by aria-label or aria-labelledby without a visible label", () => {
      const { container, rerender } = render(<Radio value="pro" aria-label="Pro plan" />);
      expect(screen.getByRole("radio", { name: "Pro plan" })).toBeInTheDocument();
      expect(container.querySelector(".radio__label")).toBeNull();

      rerender(<><span id="plan">Pro plan</span><Radio value="pro" aria-labelledby="plan" /></>);
      expect(screen.getByRole("radio", { name: "Pro plan" })).toBeInTheDocument();
    });

    it("starts from defaultChecked", () => {
      render(<Radio value="express" label="Express" defaultChecked />);

      expect(screen.getByRole("radio", { name: "Express" })).toBeChecked();
    });

    it("renders its story", () => {
      render(<RadioStory />);
      const radio = screen.getByRole("radio", { name: "Express" });

      expect(radio).toHaveAttribute("name", "delivery");
      expect(radio).toHaveAccessibleDescription("Next business day.");
    });
  });

  describe("interactions", () => {
    it("reports its value when chosen and moves the choice between radios that share a name", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <>
          <Radio name="plan" value="monthly" label="Monthly" onChange={onChange} />
          <Radio name="plan" value="yearly" label="Yearly" onChange={onChange} />
        </>,
      );

      await user.click(screen.getByText("Monthly"));
      expect(onChange).toHaveBeenLastCalledWith("monthly");
      await user.keyboard("{ArrowDown}");
      expect(screen.getByRole("radio", { name: "Yearly" })).toBeChecked();
      expect(screen.getByRole("radio", { name: "Monthly" })).not.toBeChecked();
      expect(onChange).toHaveBeenLastCalledWith("yearly");
    });

    it("keeps a controlled state owned by the consumer", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { rerender } = render(<Radio value="express" label="Express" checked={false} onChange={onChange} />);
      const radio = screen.getByRole("radio", { name: "Express" });

      await user.click(radio);
      expect(onChange).toHaveBeenCalledWith("express");
      expect(radio).not.toBeChecked();
      rerender(<Radio value="express" label="Express" checked onChange={onChange} />);
      expect(radio).toBeChecked();
    });

    it("ignores clicks while disabled", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Radio value="express" label="Express" disabled onChange={onChange} />);

      await user.click(screen.getByText("Express"));

      expect(screen.getByRole("radio", { name: "Express" })).toBeDisabled();
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("inside a RadioGroup", () => {
    it("takes the group's name, choice, required and invalid states", () => {
      render(
        <RadioGroup label="Delivery" name="delivery" value="express" required error="Choose a delivery.">
          <Radio value="standard" label="Standard" />
          <Radio value="express" label="Express" />
        </RadioGroup>,
      );
      const standard = screen.getByRole("radio", { name: "Standard" });

      expect(standard).toHaveAttribute("name", "delivery");
      expect(standard).toBeRequired();
      expect(standard).toHaveAttribute("aria-invalid", "true");
      expect(standard).not.toBeChecked();
      expect(screen.getByRole("radio", { name: "Express" })).toBeChecked();
    });

    it("lets its own props win and reports a choice to both handlers", async () => {
      const user = userEvent.setup();
      const own = vi.fn();
      const group = vi.fn();
      render(
        <RadioGroup label="Delivery" name="delivery" onChange={group}>
          <Radio value="standard" label="Standard" defaultChecked aria-invalid={false} />
          <Radio value="express" label="Express" onChange={own} />
        </RadioGroup>,
      );

      expect(screen.getByRole("radio", { name: "Standard" })).toBeChecked();
      await user.click(screen.getByText("Express"));
      expect(own).toHaveBeenCalledExactlyOnceWith("express");
      expect(group).toHaveBeenCalledExactlyOnceWith("express");
    });
  });

  describe("customization", () => {
    it("forwards native attributes and the ref to the input", () => {
      const ref = createRef<HTMLInputElement>();
      render(<Radio ref={ref} value="express" label="Express" id="express" form="checkout" data-testid="express" />);
      const radio = screen.getByRole("radio", { name: "Express" });

      expect(ref.current).toBe(radio);
      expect(radio).toHaveAttribute("id", "express");
      expect(radio).toHaveAttribute("form", "checkout");
      expect(radio).toHaveAttribute("data-testid", "express");
    });

    it.each([
      ["className", "style", "radio"],
      ["circleClassName", "circleStyle", "radio__circle"],
      ["dotClassName", "dotStyle", "radio__dot"],
      ["labelClassName", "labelStyle", "radio__label"],
      ["descriptionClassName", "descriptionStyle", "field__description"],
    ])("applies and removes %s and %s on .%s", (classProp, styleProp, base) => {
      const props = { value: "express", label: "Express", description: "Next business day." };
      const { container, rerender } = render(
        <Radio {...props} {...{ [classProp]: "consumer-part", [styleProp]: { outlineOffset: "7px" } }} />,
      );
      const part = container.querySelector<HTMLElement>(".consumer-part")!;

      expect(part).toHaveClass(base);
      expect(part).toHaveStyle({ outlineOffset: "7px" });
      rerender(<Radio {...props} />);
      expect(container.querySelector(".consumer-part")).toBeNull();
      expect(part.style.outlineOffset).toBe("");
    });

    it("keeps optional parts absent even when their hooks are supplied", () => {
      const { container } = render(
        <Radio value="pro" aria-label="Pro" labelStyle={{ color: "red" }} descriptionStyle={{ color: "red" }} />,
      );

      expect(container.querySelector(".radio__label")).toBeNull();
      expect(container.querySelector(".field__description")).toBeNull();
    });

    it("rejects attributes that clash with its own API", () => {
      // @ts-expect-error Radio reports its value, not the change event.
      void (<Radio value="a" onChange={(event: React.ChangeEvent<HTMLInputElement>) => event} />);
      // @ts-expect-error The radio is always a radio.
      void (<Radio value="a" type="checkbox" />);
      // @ts-expect-error A radio needs the value it submits.
      void (<Radio label="A" />);
    });
  });
});
