import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Clock } from "./Clock";

afterEach(() => {
  cleanup();
});

const renderClock = (props = {}) => {
  return render(<Clock {...props} />);
};

describe("Clock", () => {
  describe("rendering", () => {
    it("renders clock wrapper", () => {
      const { container } = renderClock();
      expect(container.querySelector(".clock-wrapper")).toBeInTheDocument();
    });

    it("renders clock container", () => {
      const { container } = renderClock();
      expect(container.querySelector(".clock-container")).toBeInTheDocument();
    });

    it("renders clock face", () => {
      const { container } = renderClock();
      expect(container.querySelector(".clock-face")).toBeInTheDocument();
    });

    it("renders clock hand", () => {
      const { container } = renderClock();
      expect(container.querySelector(".clock-hand")).toBeInTheDocument();
    });

    it("renders clock center", () => {
      const { container } = renderClock();
      expect(container.querySelector(".clock-center")).toBeInTheDocument();
    });
  });

  describe("time display", () => {
    it("renders hours button", () => {
      renderClock();
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });

    it("renders minutes button", () => {
      renderClock();
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(1);
    });

    it("displays correct initial time", () => {
      const { container } = renderClock({ value: { hours: 10, minutes: 30 } });
      const buttons = container.querySelectorAll(".clock-time-button");
      expect(buttons[0]).toHaveTextContent("10");
      expect(buttons[1]).toHaveTextContent("30");
    });

    it("pads single digit minutes with zero", () => {
      const { container } = renderClock({ value: { hours: 10, minutes: 5 } });
      const buttons = container.querySelectorAll(".clock-time-button");
      expect(buttons[1]).toHaveTextContent("05");
    });

    it("displays default time when no value provided", () => {
      const { container } = renderClock();
      const buttons = container.querySelectorAll(".clock-time-button");
      expect(buttons[0]).toHaveTextContent("12");
      expect(buttons[1]).toHaveTextContent("00");
    });
  });

  describe("12h format", () => {
    it("renders AM/PM buttons in 12h format", () => {
      renderClock({ format: "12h" });
      expect(screen.getByText("AM")).toBeInTheDocument();
      expect(screen.getByText("PM")).toBeInTheDocument();
    });

    it("activates AM button for morning hours", () => {
      renderClock({ value: { hours: 9, minutes: 0 }, format: "12h" });
      const amButton = screen.getByText("AM");
      expect(amButton).toHaveClass("active");
    });

    it("activates PM button for afternoon hours", () => {
      renderClock({ value: { hours: 15, minutes: 0 }, format: "12h" });
      const pmButton = screen.getByText("PM");
      expect(pmButton).toHaveClass("active");
    });
  });

  describe("24h format", () => {
    it("does not render AM/PM buttons in 24h format", () => {
      renderClock({ format: "24h" });
      expect(screen.queryByText("AM")).not.toBeInTheDocument();
      expect(screen.queryByText("PM")).not.toBeInTheDocument();
    });
  });

  describe("mode switching", () => {
    it("starts in hours mode", () => {
      const { container } = renderClock();
      const hoursButton = container.querySelector(
        ".clock-time-button.active",
      );
      expect(hoursButton).toBeInTheDocument();
    });

    it("switches to minutes mode when minutes button is clicked", () => {
      renderClock();
      const buttons = screen.getAllByRole("button");
      const minutesButton = buttons[1];
      fireEvent.click(minutesButton);
      expect(minutesButton).toHaveClass("active");
    });

    it("switches to hours mode when hours button is clicked", () => {
      renderClock();
      const buttons = screen.getAllByRole("button");
      const hoursButton = buttons[0];
      fireEvent.click(hoursButton);
      expect(hoursButton).toHaveClass("active");
    });
  });

  describe("disabled state", () => {
    it("applies disabled class when disabled", () => {
      const { container } = renderClock({ disabled: true });
      expect(
        container.querySelector(".clock-wrapper.disabled"),
      ).toBeInTheDocument();
    });

    it("disables time buttons when disabled", () => {
      const { container } = renderClock({ disabled: true });
      const timeButtons = container.querySelectorAll(".clock-time-button");
      timeButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe("readonly state", () => {
    it("applies readonly class when readonly", () => {
      const { container } = renderClock({ readonly: true });
      expect(
        container.querySelector(".clock-wrapper.readonly"),
      ).toBeInTheDocument();
    });
  });

  describe("onChange", () => {
    it("calls onChange when time is selected", () => {
      const onChange = vi.fn();
      const { container } = renderClock({ onChange });
      const clockFace = container.querySelector(".clock-face");
      fireEvent.click(clockFace!);
      expect(onChange).toHaveBeenCalled();
    });

    it("does not call onChange when disabled", () => {
      const onChange = vi.fn();
      const { container } = renderClock({ disabled: true, onChange });
      const clockFace = container.querySelector(".clock-face");
      fireEvent.click(clockFace!);
      expect(onChange).not.toHaveBeenCalled();
    });

    it("does not call onChange when readonly", () => {
      const onChange = vi.fn();
      const { container } = renderClock({ readonly: true, onChange });
      const clockFace = container.querySelector(".clock-face");
      fireEvent.click(clockFace!);
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
