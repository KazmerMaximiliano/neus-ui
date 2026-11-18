import { composeStories } from "@storybook/react-vite";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Toast } from "./Toast";
import * as stories from "./Toast.stories";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const { Toast: ToastStory } = composeStories(stories);

describe("Toast", () => {
  describe("rendering", () => {
    it("renders a silent alert with the toast class", () => {
      render(<Toast status="success" title="Saved" className="mine">Profile updated.</Toast>);
      const toast = screen.getByText("Saved").closest(".alert")!;

      expect(toast).toHaveClass("alert", "toast", "mine");
      expect(toast).toHaveAttribute("data-status", "success");
      expect(toast).not.toHaveAttribute("role");
      expect(screen.getByText("Profile updated.")).toBeInTheDocument();
    });

    it("renders its story with a button that shows a toast through the provider", async () => {
      const user = userEvent.setup();
      render(<ToastStory />);

      expect(screen.getAllByText("Changes saved")).toHaveLength(1);
      await user.click(screen.getByRole("button", { name: "Show toast" }));
      expect(screen.getAllByText("Changes saved")).toHaveLength(2);
    });
  });

  describe("timing", () => {
    it("calls onDismiss once its duration runs out", () => {
      vi.useFakeTimers();
      const onDismiss = vi.fn();
      render(<Toast title="Saved" duration={3000} onDismiss={onDismiss} dismissLabel="Dismiss" />);

      act(() => vi.advanceTimersByTime(2999));
      expect(onDismiss).not.toHaveBeenCalled();
      act(() => vi.advanceTimersByTime(1));
      expect(onDismiss).toHaveBeenCalledOnce();
    });

    it("stays open without a duration", () => {
      vi.useFakeTimers();
      const onDismiss = vi.fn();
      render(<Toast title="Saved" onDismiss={onDismiss} dismissLabel="Dismiss" />);

      act(() => vi.advanceTimersByTime(60_000));
      expect(onDismiss).not.toHaveBeenCalled();
    });

    it("pauses while hovered and keeps the time it had left", async () => {
      // Testing Library waits on a real timeout between user events, so fake time also advances.
      vi.useFakeTimers({ shouldAdvanceTime: true });
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const onDismiss = vi.fn();
      const onMouseEnter = vi.fn();
      const onMouseLeave = vi.fn();
      render(
        <Toast
          title="Saved"
          duration={3000}
          onDismiss={onDismiss}
          dismissLabel="Dismiss"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />,
      );
      const toast = screen.getByText("Saved").closest<HTMLElement>(".toast")!;

      act(() => vi.advanceTimersByTime(2000));
      await user.hover(toast);
      act(() => vi.advanceTimersByTime(10_000));
      expect(onDismiss).not.toHaveBeenCalled();
      await user.unhover(toast);
      act(() => vi.advanceTimersByTime(900));
      expect(onDismiss).not.toHaveBeenCalled();
      act(() => vi.advanceTimersByTime(200));
      expect(onDismiss).toHaveBeenCalledOnce();
      expect(onMouseEnter).toHaveBeenCalledOnce();
      expect(onMouseLeave).toHaveBeenCalledOnce();
    });

    it("pauses while keyboard focus is inside it", async () => {
      // Testing Library waits on a real timeout between user events, so fake time also advances.
      vi.useFakeTimers({ shouldAdvanceTime: true });
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
      const onDismiss = vi.fn();
      const onFocus = vi.fn();
      const onBlur = vi.fn();
      render(
        <Toast
          title="Saved"
          duration={1000}
          onDismiss={onDismiss}
          dismissLabel="Dismiss"
          onFocus={onFocus}
          onBlur={onBlur}
          actions={<button type="button">Undo</button>}
        />,
      );

      await user.tab();
      expect(screen.getByRole("button", { name: "Undo" })).toHaveFocus();
      await user.tab();
      expect(screen.getByRole("button", { name: "Dismiss" })).toHaveFocus();
      act(() => vi.advanceTimersByTime(5000));
      expect(onDismiss).not.toHaveBeenCalled();
      await user.tab();
      act(() => vi.advanceTimersByTime(1000));
      expect(onDismiss).toHaveBeenCalledOnce();
      expect(onFocus).toHaveBeenCalledTimes(2);
      expect(onBlur).toHaveBeenCalledTimes(2);
    });
  });

  describe("interactions", () => {
    it("closes from its close button", async () => {
      const user = userEvent.setup();
      const onDismiss = vi.fn();
      render(<Toast title="Saved" onDismiss={onDismiss} dismissLabel="Close notification" />);

      await user.click(screen.getByRole("button", { name: "Close notification" }));
      expect(onDismiss).toHaveBeenCalledOnce();
    });
  });

  describe("types", () => {
    it("rejects a live setting and a close action without its label", () => {
      // @ts-expect-error the provider's list announces toasts
      void (<Toast live="polite" />);
      // @ts-expect-error onDismiss needs the close button's accessible name
      void (<Toast onDismiss={() => undefined} />);
    });
  });
});
