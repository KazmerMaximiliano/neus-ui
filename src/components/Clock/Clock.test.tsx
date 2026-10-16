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
      expect(container.querySelector(".clock__wrapper")).toBeInTheDocument();
    });

    it("renders clock container", () => {
      const { container } = renderClock();
      expect(container.querySelector(".clock__container")).toBeInTheDocument();
    });

    it("renders clock face", () => {
      const { container } = renderClock();
      expect(container.querySelector(".clock__face")).toBeInTheDocument();
    });

    it("renders clock hand", () => {
      const { container } = renderClock();
      expect(container.querySelector(".clock__hand")).toBeInTheDocument();
    });

    it("renders clock center", () => {
      const { container } = renderClock();
      expect(container.querySelector(".clock__center")).toBeInTheDocument();
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
      const buttons = container.querySelectorAll(".clock__time-button");
      expect(buttons[0]).toHaveTextContent("10");
      expect(buttons[1]).toHaveTextContent("30");
    });

    it("pads single digit minutes with zero", () => {
      const { container } = renderClock({ value: { hours: 10, minutes: 5 } });
      const buttons = container.querySelectorAll(".clock__time-button");
      expect(buttons[1]).toHaveTextContent("05");
    });

    it("displays default time when no value provided", () => {
      const { container } = renderClock();
      const buttons = container.querySelectorAll(".clock__time-button");
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
      expect(amButton).toHaveClass("clock__period-button--active");
    });

    it("activates PM button for afternoon hours", () => {
      renderClock({ value: { hours: 15, minutes: 0 }, format: "12h" });
      const pmButton = screen.getByText("PM");
      expect(pmButton).toHaveClass("clock__period-button--active");
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
        ".clock__time-button--active",
      );
      expect(hoursButton).toBeInTheDocument();
    });

    it("switches to minutes mode when minutes button is clicked", () => {
      renderClock();
      const buttons = screen.getAllByRole("button");
      const minutesButton = buttons[1];
      fireEvent.click(minutesButton);
      expect(minutesButton).toHaveClass("clock__time-button--active");
    });

    it("switches to hours mode when hours button is clicked", () => {
      renderClock();
      const buttons = screen.getAllByRole("button");
      const hoursButton = buttons[0];
      fireEvent.click(hoursButton);
      expect(hoursButton).toHaveClass("clock__time-button--active");
    });
  });

  describe("disabled state", () => {
    it("applies disabled class when disabled", () => {
      const { container } = renderClock({ disabled: true });
      expect(
        container.querySelector(".clock__wrapper--disabled"),
      ).toBeInTheDocument();
    });

    it("disables time buttons when disabled", () => {
      const { container } = renderClock({ disabled: true });
      const timeButtons = container.querySelectorAll(".clock__time-button");
      timeButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe("readonly state", () => {
    it("applies readonly class when readonly", () => {
      const { container } = renderClock({ readonly: true });
      expect(
        container.querySelector(".clock__wrapper--readonly"),
      ).toBeInTheDocument();
    });
  });

  describe("onChange", () => {
    it("calls onChange when time is selected", () => {
      const onChange = vi.fn();
      const { container } = renderClock({ onChange });
      const clockFace = container.querySelector(".clock__face");
      fireEvent.click(clockFace!);
      expect(onChange).toHaveBeenCalled();
    });

    it("does not call onChange when disabled", () => {
      const onChange = vi.fn();
      const { container } = renderClock({ disabled: true, onChange });
      const clockFace = container.querySelector(".clock__face");
      fireEvent.click(clockFace!);
      expect(onChange).not.toHaveBeenCalled();
    });

    it("does not call onChange when readonly", () => {
      const onChange = vi.fn();
      const { container } = renderClock({ readonly: true, onChange });
      const clockFace = container.querySelector(".clock__face");
      fireEvent.click(clockFace!);
      expect(onChange).not.toHaveBeenCalled();
    });
  });
});

describe("controlled period", () => {
  it("updates AM/PM with the controlled value", () => {
    const { rerender } = render(<Clock value={{ hours: 9, minutes: 0 }} />);
    expect(screen.getByRole("button", { name: "AM" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    rerender(<Clock value={{ hours: 21, minutes: 0 }} />);
    expect(screen.getByRole("button", { name: "PM" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
  it("applies styles independently to segments, periods, labels and hand", () => {
    const { container } = render(
      <Clock
        segmentStyle={{ color: "red" }}
        periodStyle={{ color: "blue" }}
        numberStyle={{ opacity: 0.7 }}
        indicatorStyle={{ opacity: 0.8 }}
      />,
    );
    expect(screen.getByRole("button", { name: "Horas" })).toHaveStyle({
      color: "rgb(255, 0, 0)",
    });
    expect(container.querySelector(".clock__number")).toHaveStyle({
      opacity: 0.7,
    });
    expect(container.querySelector(".clock__hand")).toHaveStyle({
      opacity: 0.8,
    });
  });
});

describe("pointer time selection", () => {
  it.each([
    { format: "24h" as const, x: 100, y: 10, hours: 12 },
    { format: "24h" as const, x: 130, y: 100, hours: 3 },
    { format: "24h" as const, x: 100, y: 70, hours: 0 },
    { format: "24h" as const, x: 190, y: 100, hours: 15 },
    { format: "12h" as const, x: 190, y: 100, hours: 15 },
    { format: "12h" as const, x: 100, y: 10, hours: 12 },
  ])("selects $hours from $format dial geometry", ({ format, x, y, hours }) => {
    const onChange = vi.fn();
    render(<Clock format={format} onChange={onChange} />);
    const dial = screen.getByRole("slider");
    vi.spyOn(dial, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 200,
      right: 200,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    fireEvent.click(dial, { clientX: x, clientY: y });
    expect(onChange).toHaveBeenLastCalledWith({ hours, minutes: 0 });
    fireEvent.click(dial, { clientX: 190, clientY: 100 });
    expect(onChange).toHaveBeenLastCalledWith({ hours, minutes: 15 });
  });
  it("uses AM for morning selections and respects period changes", () => {
    const onChange = vi.fn();
    render(<Clock value={{ hours: 9, minutes: 0 }} onChange={onChange} />);
    fireEvent.click(screen.getByRole("button", { name: "PM" }));
    expect(onChange).toHaveBeenLastCalledWith({ hours: 21, minutes: 0 });
    const dial = screen.getByRole("slider");
    vi.spyOn(dial, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      width: 200,
      height: 200,
      right: 200,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
    fireEvent.click(dial, { clientX: 100, clientY: 10 });
    expect(onChange).toHaveBeenLastCalledWith({ hours: 0, minutes: 0 });
  });
});
