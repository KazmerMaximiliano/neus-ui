import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Calendar } from "./Calendar";
import { CalendarProps } from "./Calendar.types";

afterEach(() => {
  cleanup();
});

const renderCalendar = (props: Partial<CalendarProps> = {}) => {
  return render(<Calendar {...(props as CalendarProps)} />);
};

describe("Calendar", () => {
  describe("rendering", () => {
    it("renders calendar container", () => {
      const { container } = renderCalendar();
      expect(
        container.querySelector(".calendar-container"),
      ).toBeInTheDocument();
    });

    it("renders day picker container", () => {
      const { container } = renderCalendar();
      expect(
        container.querySelector(".day-picker-container"),
      ).toBeInTheDocument();
    });
  });

  describe("label", () => {
    it("renders label when provided", () => {
      renderCalendar({ label: "Select Date" });
      expect(screen.getByText("Select Date")).toBeInTheDocument();
    });

    it("does not render label when not provided", () => {
      const { container } = renderCalendar();
      expect(container.querySelector(".calendar-label")).not.toBeInTheDocument();
    });

    it("renders required indicator when required is true", () => {
      renderCalendar({ label: "Select Date", required: true });
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("applies error class to label when error is present", () => {
      renderCalendar({ label: "Select Date", error: "Error" });
      const label = screen.getByText("Select Date");
      expect(label).toHaveClass("error");
    });
  });

  describe("error state", () => {
    it("renders error message when error is provided", () => {
      renderCalendar({ error: "Please select a date" });
      expect(screen.getByText("Please select a date")).toBeInTheDocument();
    });

    it("does not render error when not provided", () => {
      const { container } = renderCalendar();
      expect(container.querySelector(".calendar-error")).not.toBeInTheDocument();
    });
  });

  describe("disabled state", () => {
    it("applies disabled class when disabled", () => {
      const { container } = renderCalendar({ disabled: true });
      expect(
        container.querySelector(".calendar-container.disabled"),
      ).toBeInTheDocument();
    });
  });

  describe("readonly state", () => {
    it("applies readonly class when readonly", () => {
      const { container } = renderCalendar({ readonly: true });
      expect(
        container.querySelector(".calendar-container.readonly"),
      ).toBeInTheDocument();
    });
  });

  describe("hidden input", () => {
    it("renders hidden input when name is provided", () => {
      const { container } = renderCalendar({ name: "date-field" });
      const hiddenInput = container.querySelector('input[type="hidden"]');
      expect(hiddenInput).toBeInTheDocument();
      expect(hiddenInput).toHaveAttribute("name", "date-field");
    });

    it("does not render hidden input when name is not provided", () => {
      const { container } = renderCalendar();
      expect(
        container.querySelector('input[type="hidden"]'),
      ).not.toBeInTheDocument();
    });

    it("sets required attribute on hidden input when required", () => {
      const { container } = renderCalendar({ name: "date-field", required: true });
      const hiddenInput = container.querySelector('input[type="hidden"]');
      expect(hiddenInput).toHaveAttribute("required");
    });
  });

  describe("modes", () => {
    it("renders in single mode by default", () => {
      const { container } = renderCalendar();
      expect(
        container.querySelector(".day-picker-container"),
      ).toBeInTheDocument();
    });

    it("renders two months when multiple is true", () => {
      const { container } = renderCalendar({ multiple: true });
      expect(
        container.querySelector(".day-picker-container"),
      ).toBeInTheDocument();
    });
  });

  describe("controlled vs uncontrolled", () => {
    it("works with defaultValue", () => {
      const date = new Date(2024, 0, 15);
      const { container } = renderCalendar({ defaultValue: date });
      expect(
        container.querySelector(".calendar-container"),
      ).toBeInTheDocument();
    });

    it("works with controlled value", () => {
      const date = new Date(2024, 0, 15);
      const { container } = renderCalendar({ value: date, onChange: vi.fn() });
      expect(
        container.querySelector(".calendar-container"),
      ).toBeInTheDocument();
    });
  });
});
