import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Bold } from "lucide-react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Toggle } from "./Toggle";
import * as stories from "./Toggle.stories";

afterEach(cleanup);

const { Toggle: ToggleStory } = composeStories(stories);

describe("Toggle", () => {
  describe("rendering", () => {
    it("renders a button that is not pressed", () => {
      render(<Toggle label="Bold" />);
      const toggle = screen.getByRole("button", { name: "Bold" });

      expect(toggle).toHaveAttribute("type", "button");
      expect(toggle).toHaveAttribute("aria-pressed", "false");
      expect(toggle).toHaveAttribute("data-size", "medium");
    });

    it("shows a decorative icon before the label", () => {
      const { container } = render(<Toggle label="Bold" icon={Bold} />);

      expect(container.querySelector(".toggle__icon")).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByText("Bold")).toHaveClass("toggle__label");
    });

    it("names an icon-only toggle with its label", () => {
      const { container } = render(<Toggle label="Bold" icon={Bold} iconOnly />);

      expect(screen.getByRole("button", { name: "Bold" })).toBeInTheDocument();
      expect(container.querySelector(".toggle__label")).toBeNull();
    });

    it("renders its story", () => {
      render(<ToggleStory />);

      expect(screen.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "false");
    });
  });

  describe("interactions", () => {
    it("toggles on its own and reports the state", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle label="Bold" onPressedChange={handleChange} />);
      const toggle = screen.getByRole("button");

      await user.click(toggle);
      expect(toggle).toHaveAttribute("aria-pressed", "true");
      expect(handleChange).toHaveBeenLastCalledWith(true);

      await user.keyboard("[Space]");
      expect(toggle).toHaveAttribute("aria-pressed", "false");
      expect(handleChange).toHaveBeenLastCalledWith(false);
    });

    it("stays on a controlled state until the prop changes", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const { rerender } = render(<Toggle label="Bold" pressed={false} onPressedChange={handleChange} />);

      await user.click(screen.getByRole("button"));

      expect(handleChange).toHaveBeenCalledWith(true);
      expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
      rerender(<Toggle label="Bold" pressed onPressedChange={handleChange} />);
      expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
    });

    it("starts pressed with defaultPressed", () => {
      render(<Toggle label="Bold" defaultPressed />);

      expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true");
    });

    it("keeps its state when onClick prevents the default", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle label="Bold" onClick={(event) => event.preventDefault()} onPressedChange={handleChange} />);

      await user.click(screen.getByRole("button"));

      expect(handleChange).not.toHaveBeenCalled();
      expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
    });

    it("does nothing while disabled", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Toggle label="Bold" disabled onPressedChange={handleChange} />);

      await user.click(screen.getByRole("button"));

      expect(screen.getByRole("button")).toBeDisabled();
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe("customization", () => {
    it.each([
      ["className", "style", "toggle"],
      ["iconClassName", "iconStyle", "toggle__icon"],
      ["labelClassName", "labelStyle", "toggle__label"],
    ])("applies and removes %s and %s on .%s", (classProp, styleProp, base) => {
      const { container, rerender } = render(
        <Toggle label="Bold" icon={Bold} {...{ [classProp]: "consumer-part", [styleProp]: { outlineOffset: "7px" } }} />,
      );
      const part = container.querySelector<HTMLElement | SVGElement>(".consumer-part")!;

      expect(part).toHaveClass(base);
      expect(part).toHaveStyle({ outlineOffset: "7px" });
      rerender(<Toggle label="Bold" icon={Bold} />);
      expect(container.querySelector(".consumer-part")).toBeNull();
      expect(part.style.outlineOffset).toBe("");
    });

    it("passes native attributes and the ref to the button", () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Toggle label="Bold" size="small" ref={ref} aria-keyshortcuts="Control+B" />);

      expect(ref.current).toBe(screen.getByRole("button"));
      expect(ref.current).toHaveAttribute("aria-keyshortcuts", "Control+B");
      expect(ref.current).toHaveAttribute("data-size", "small");
    });

    it("keeps its own pressed state over an aria-pressed attribute", () => {
      render(<Toggle label="Bold" aria-pressed="true" />);

      expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
    });
  });
});
