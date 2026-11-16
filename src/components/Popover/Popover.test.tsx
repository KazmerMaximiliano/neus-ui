import { useState } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Settings } from "lucide-react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { Popover } from "./Popover";
import * as stories from "./Popover.stories";
import type { PopoverProps } from "./Popover.types";

afterEach(cleanup);

const { Popover: PopoverStory } = composeStories(stories);

const renderPopover = (props: Partial<PopoverProps> = {}) =>
  render(
    <>
      <Popover label="Filters" trigger={(trigger) => <Button {...trigger} label="Filters" />} {...props}>
        <p>Show projects that are</p>
        <button type="button">Active</button>
      </Popover>
      <button type="button">Outside</button>
    </>,
  );

const isOpen = () => document.querySelector(".popover__panel")!.hasAttribute("data-popover-open");

describe("Popover", () => {
  describe("rendering", () => {
    it("wires the trigger to a closed, named dialog panel", () => {
      renderPopover();
      const trigger = screen.getByRole("button", { name: "Filters" });
      const panel = document.querySelector(".popover__panel")!;

      expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(trigger).toHaveAttribute("aria-controls", panel.id);
      expect(panel).toHaveAttribute("role", "dialog");
      expect(panel).toHaveAttribute("aria-label", "Filters");
      expect(panel).toHaveAttribute("popover", "manual");
      expect(panel).toHaveClass("popover-panel");
      expect(isOpen()).toBe(false);
    });

    it("starts open with defaultOpen without taking focus from the page", () => {
      renderPopover({ defaultOpen: true });

      expect(isOpen()).toBe(true);
      expect(screen.getByRole("dialog", { name: "Filters" })).toBeInTheDocument();
      expect(document.body).toHaveFocus();
    });

    it("works with an IconButton trigger", () => {
      render(
        <Popover label="Settings" trigger={(trigger) => <IconButton {...trigger} icon={Settings} label="Settings" />}>
          <p>Details</p>
        </Popover>,
      );

      expect(screen.getByRole("button", { name: "Settings" })).toHaveAttribute("aria-expanded", "false");
    });

    it("renders its story", () => {
      render(<PopoverStory />);

      expect(screen.getByRole("button", { name: "Filters" })).toHaveAttribute("aria-haspopup", "dialog");
    });
  });

  describe("interactions", () => {
    it("opens from the trigger, focuses the first control and closes again", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      renderPopover({ onOpenChange });
      const trigger = screen.getByRole("button", { name: "Filters" });

      await user.click(trigger);
      expect(isOpen()).toBe(true);
      expect(trigger).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("button", { name: "Active" })).toHaveFocus();
      await user.click(trigger);
      expect(isOpen()).toBe(false);
      expect(onOpenChange.mock.calls).toEqual([[true], [false]]);
    });

    it("closes on Escape and returns focus to the trigger", async () => {
      const user = userEvent.setup();
      renderPopover();

      await user.click(screen.getByRole("button", { name: "Filters" }));
      await user.keyboard("{Escape}");

      expect(isOpen()).toBe(false);
      expect(screen.getByRole("button", { name: "Filters" })).toHaveFocus();
    });

    it("closes on an outside click but not on a click inside", async () => {
      const user = userEvent.setup();
      renderPopover();

      await user.click(screen.getByRole("button", { name: "Filters" }));
      await user.click(screen.getByText("Show projects that are"));
      expect(isOpen()).toBe(true);
      await user.click(screen.getByRole("button", { name: "Outside" }));
      expect(isOpen()).toBe(false);
    });

    it("closes when focus tabs out of the panel", async () => {
      const user = userEvent.setup();
      renderPopover();

      await user.click(screen.getByRole("button", { name: "Filters" }));
      await user.tab();

      expect(screen.getByRole("button", { name: "Outside" })).toHaveFocus();
      expect(isOpen()).toBe(false);
    });

    it("follows a controlled open state and reports requested changes", async () => {
      const user = userEvent.setup();
      const onOpenChange = vi.fn();
      const { rerender } = renderPopover({ open: false, onOpenChange });

      await user.click(screen.getByRole("button", { name: "Filters" }));
      expect(onOpenChange).toHaveBeenLastCalledWith(true);
      expect(isOpen()).toBe(false);
      rerender(
        <Popover label="Filters" open onOpenChange={onOpenChange} trigger={(trigger) => <Button {...trigger} label="Filters" />}>
          <p>Content</p>
        </Popover>,
      );
      expect(isOpen()).toBe(true);
      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenLastCalledWith(false);
      expect(isOpen()).toBe(true);
    });

    it("closes from inside its content through a controlled state", async () => {
      const user = userEvent.setup();
      const Filters = () => {
        const [open, setOpen] = useState(false);
        return (
          <Popover label="Filters" open={open} onOpenChange={setOpen} trigger={(trigger) => <Button {...trigger} label="Filters" />}>
            <Button label="Apply" onClick={() => setOpen(false)} />
          </Popover>
        );
      };
      render(<Filters />);

      await user.click(screen.getByRole("button", { name: "Filters" }));
      await user.click(screen.getByRole("button", { name: "Apply" }));

      expect(isOpen()).toBe(false);
    });
  });

  describe("customization", () => {
    it.each([
      ["className", "style", "popover"],
      ["panelClassName", "panelStyle", "popover__panel"],
    ])("applies and removes %s and %s on .%s", (classProp, styleProp, base) => {
      const props = { label: "Filters", trigger: () => null, children: "Content" };
      const { container, rerender } = render(
        <Popover {...props} {...{ [classProp]: "consumer-part", [styleProp]: { outlineOffset: "7px" } }} />,
      );
      const part = container.querySelector<HTMLElement>(".consumer-part")!;

      expect(part).toHaveClass(base);
      expect(part).toHaveStyle({ outlineOffset: "7px" });
      rerender(<Popover {...props} />);
      expect(container.querySelector(".consumer-part")).toBeNull();
      expect(part.style.outlineOffset).toBe("");
    });
  });
});
