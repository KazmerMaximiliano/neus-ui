import { composeStories } from "@storybook/react-vite";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Trash2 } from "lucide-react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { IconButton } from "../IconButton";
import { Link } from "../Link";
import { TooltipBubble } from "./components/TooltipBubble";
import { Tooltip } from "./Tooltip";
import * as stories from "./Tooltip.stories";
import type { TooltipProps } from "./Tooltip.types";

const { Tooltip: TooltipStory } = composeStories(stories);

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const setup = () => userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

const renderTooltip = (props: Partial<TooltipProps> = {}) =>
  render(
    <>
      <Tooltip
        content="Moves it to the trash"
        trigger={(trigger) => <IconButton {...trigger} icon={Trash2} label="Delete" />}
        {...props}
      />
      <button type="button">Outside</button>
    </>,
  );

const tooltip = () => document.querySelector<HTMLElement>(".tooltip")!;
const isOpen = () => tooltip().hasAttribute("data-popover-open");
const wait = (ms: number) => act(() => vi.advanceTimersByTime(ms));

describe("Tooltip", () => {
  describe("rendering", () => {
    it("describes its trigger with a closed tooltip", () => {
      renderTooltip();
      const trigger = screen.getByRole("button", { name: "Delete" });

      expect(trigger).toHaveAccessibleDescription("Moves it to the trash");
      expect(trigger).toHaveAttribute("aria-describedby", tooltip().id);
      expect(tooltip()).toHaveAttribute("role", "tooltip");
      expect(tooltip()).toHaveAttribute("popover", "manual");
      expect(isOpen()).toBe(false);
    });

    it("forwards its class and style to the tooltip", () => {
      renderTooltip({ className: "app-tip", style: { maxWidth: 120 } });

      expect(tooltip()).toHaveClass("tooltip", "app-tip");
      expect(tooltip()).toHaveStyle({ maxWidth: "120px" });
    });

    it("prefers the top side and takes the bottom one on request", async () => {
      const user = setup();
      const { unmount } = renderTooltip({ delay: 0 });
      await user.hover(screen.getByRole("button", { name: "Delete" }));
      await wait(0);

      expect(tooltip()).toHaveAttribute("data-placement", "top");
      unmount();

      renderTooltip({ delay: 0, placement: "bottom" });
      await user.hover(screen.getByRole("button", { name: "Delete" }));
      await wait(0);

      expect(tooltip()).toHaveAttribute("data-placement", "bottom");
    });

    it("renders its story", () => {
      render(<TooltipStory />);

      expect(screen.getByRole("button", { name: "Delete project" }))
        .toHaveAccessibleDescription("Moves it to the trash for 30 days");
    });
  });

  describe("interactions", () => {
    it("shows after the pointer rests for the delay and hides after it leaves", async () => {
      const user = setup();
      renderTooltip({ delay: 400 });
      const trigger = screen.getByRole("button", { name: "Delete" });

      await user.hover(trigger);
      await wait(300);
      expect(isOpen()).toBe(false);
      await wait(100);
      expect(isOpen()).toBe(true);

      await user.unhover(trigger);
      await wait(200);
      expect(isOpen()).toBe(false);
    });

    it("stays open while the pointer moves onto it", async () => {
      const user = setup();
      renderTooltip();
      const trigger = screen.getByRole("button", { name: "Delete" });
      await user.hover(trigger);
      await wait(200);

      await user.unhover(trigger);
      await user.hover(tooltip());
      await wait(500);

      expect(isOpen()).toBe(true);
    });

    it("shows at once on keyboard focus and hides on blur", async () => {
      const user = setup();
      renderTooltip({ delay: 1000 });

      await user.tab();
      await wait(0);
      expect(isOpen()).toBe(true);

      await user.tab();
      await wait(200);
      expect(isOpen()).toBe(false);
      expect(screen.getByRole("button", { name: "Outside" })).toHaveFocus();
    });

    it("closes on Escape, keeps focus and stays closed while hovered", async () => {
      const user = setup();
      renderTooltip();
      const trigger = screen.getByRole("button", { name: "Delete" });
      await user.hover(trigger);
      await wait(200);

      await user.keyboard("{Escape}");
      await wait(500);

      expect(isOpen()).toBe(false);
      expect(trigger).not.toHaveFocus();
    });

    it("ignores touch, which would flash it over the action", async () => {
      renderTooltip({ delay: 0 });

      fireEvent.pointerEnter(screen.getByRole("button", { name: "Delete" }), { pointerType: "touch" });
      await wait(200);

      expect(isOpen()).toBe(false);
    });
  });

  describe("edge cases", () => {
    it("accepts a link trigger through its element type", () => {
      render(
        <Tooltip<HTMLAnchorElement>
          content="Opens the billing portal"
          trigger={(trigger) => <Link {...trigger} href="/billing" label="Billing" />}
        />,
      );

      expect(screen.getByRole("link", { name: "Billing" })).toHaveAccessibleDescription("Opens the billing portal");
    });

    it("renders a bare bubble with the tooltip role for hosts that place it", () => {
      render(<TooltipBubble className="host-tip">Room 4</TooltipBubble>);

      expect(screen.getByRole("tooltip")).toHaveClass("tooltip", "host-tip");
      expect(screen.getByRole("tooltip")).not.toHaveAttribute("popover");
    });

    it("types its placement", () => {
      // @ts-expect-error A tooltip is centered; it has no start or end edge.
      renderTooltip({ placement: "top-start" });

      expect(tooltip()).toBeInTheDocument();
    });
  });
});
