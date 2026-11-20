import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tag } from "lucide-react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Chip } from "./Chip";
import * as stories from "./Chip.stories";

afterEach(cleanup);

const { Chip: ChipStory } = composeStories(stories);

describe("Chip", () => {
  describe("rendering", () => {
    it("renders a static label with a decorative icon and no buttons", () => {
      const { container } = render(<Chip label="Design" icon={Tag} />);

      expect(screen.getByText("Design")).toHaveClass("chip__label");
      expect(container.querySelector(".chip__icon")).toHaveAttribute("aria-hidden", "true");
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
      expect(container.firstElementChild).toHaveAttribute("data-size", "medium");
    });

    it("becomes a toggle with any selection prop, and shows a check while selected", () => {
      const { container, rerender } = render(<Chip label="Design" icon={Tag} selected={false} />);

      expect(screen.getByRole("button", { name: "Design" })).toHaveAttribute("aria-pressed", "false");
      expect(container.querySelector(".chip__check")).toBeNull();
      rerender(<Chip label="Design" icon={Tag} selected />);
      expect(screen.getByRole("button", { name: "Design" })).toHaveAttribute("aria-pressed", "true");
      expect(container.querySelector(".chip__check")).toBeInTheDocument();
      expect(container.firstElementChild).toHaveAttribute("data-selected", "true");
    });

    it("names its remove button after the label, in the given language", () => {
      render(<Chip label="Design" onRemove={() => {}} labels={{ remove: (label) => `Quitar ${label}` }} />);

      expect(screen.getByRole("button", { name: "Quitar Design" })).toBeInTheDocument();
    });

    it("renders its story", () => {
      render(<ChipStory />);

      expect(screen.getByRole("button", { name: "Design" })).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("interactions", () => {
    it("toggles on its own and reports the state", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Chip label="Design" defaultSelected={false} onSelectedChange={handleChange} />);
      const chip = screen.getByRole("button", { name: "Design" });

      await user.click(chip);
      expect(chip).toHaveAttribute("aria-pressed", "true");
      expect(handleChange).toHaveBeenLastCalledWith(true);
      await user.keyboard("[Space]");
      expect(chip).toHaveAttribute("aria-pressed", "false");
    });

    it("stays on a controlled state until the prop changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Chip label="Design" selected={false} onSelectedChange={handleChange} />);

      await user.click(screen.getByRole("button"));

      expect(handleChange).toHaveBeenCalledWith(true);
      expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
    });

    it("is selectable and removable at once, with sibling buttons", async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();
      const handleChange = vi.fn();
      render(<Chip label="Design" onSelectedChange={handleChange} onRemove={handleRemove} />);
      const [action, remove] = screen.getAllByRole("button");

      expect(action.contains(remove)).toBe(false);
      await user.click(remove);
      expect(handleRemove).toHaveBeenCalledOnce();
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("disables both buttons", async () => {
      const user = userEvent.setup();
      const handleRemove = vi.fn();
      const { container } = render(<Chip label="Design" selected onRemove={handleRemove} disabled />);

      for (const button of screen.getAllByRole("button")) expect(button).toBeDisabled();
      await user.click(screen.getByRole("button", { name: "Remove Design" }));
      expect(handleRemove).not.toHaveBeenCalled();
      expect(container.firstElementChild).toHaveAttribute("data-disabled", "true");
    });
  });

  describe("customization", () => {
    it.each([
      ["className", "style", "chip"],
      ["iconClassName", "iconStyle", "chip__icon"],
      ["actionClassName", "actionStyle", "chip__action"],
      ["labelClassName", "labelStyle", "chip__label"],
      ["removeClassName", "removeStyle", "chip__remove"],
      ["removeIconClassName", "removeIconStyle", "chip__remove-icon"],
    ])("applies and removes %s and %s on .%s", (classProp, styleProp, base) => {
      const props = { label: "Design", icon: Tag, onSelectedChange: () => {}, onRemove: () => {} };
      const { container, rerender } = render(
        <Chip {...props} {...{ [classProp]: "consumer-part", [styleProp]: { outlineOffset: "7px" } }} />,
      );
      const part = container.querySelector<HTMLElement | SVGElement>(".consumer-part")!;

      expect(part).toHaveClass(base);
      expect(part).toHaveStyle({ outlineOffset: "7px" });
      rerender(<Chip {...props} />);
      expect(container.querySelector(".consumer-part")).toBeNull();
      expect(part.style.outlineOffset).toBe("");
    });

    it("passes native attributes and the ref to the root, with its size", () => {
      const ref = createRef<HTMLSpanElement>();
      render(<Chip label="Design" ref={ref} size="small" data-testid="chip" title="Design team" />);

      expect(ref.current).toBe(screen.getByTestId("chip"));
      expect(ref.current).toHaveAttribute("title", "Design team");
      expect(ref.current).toHaveAttribute("data-size", "small");
    });
  });
});
