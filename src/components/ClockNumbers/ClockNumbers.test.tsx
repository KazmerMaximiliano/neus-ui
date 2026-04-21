import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ClockNumbers } from "./ClockNumbers";

afterEach(() => {
  cleanup();
});

const renderClockNumbers = (props: {
  mode: "hours" | "minutes";
  format: "12h" | "24h";
  currentValue: { hours: number; minutes: number };
}) => {
  return render(<ClockNumbers {...props} />);
};

describe("ClockNumbers", () => {
  describe("hours mode - 12h format", () => {
    it("renders 12 hour numbers", () => {
      const { container } = renderClockNumbers({
        mode: "hours",
        format: "12h",
        currentValue: { hours: 12, minutes: 0 },
      });
      const numbers = container.querySelectorAll(".clock__number");
      expect(numbers).toHaveLength(12);
    });

    it("displays hours 1-12", () => {
      const { container } = renderClockNumbers({
        mode: "hours",
        format: "12h",
        currentValue: { hours: 12, minutes: 0 },
      });
      const numbers = container.querySelectorAll(".clock__number");
      const values = Array.from(numbers).map((n) => n.textContent);
      expect(values).toContain("12");
      expect(values).toContain("1");
      expect(values).toContain("6");
    });

    it("marks selected hour", () => {
      const { container } = renderClockNumbers({
        mode: "hours",
        format: "12h",
        currentValue: { hours: 3, minutes: 0 },
      });
      const selectedNumber = container.querySelector(
        ".clock__number--selected",
      );
      expect(selectedNumber).toBeInTheDocument();
      expect(selectedNumber).toHaveTextContent("3");
    });
  });

  describe("hours mode - 24h format", () => {
    it("renders 24 hour numbers (inner and outer)", () => {
      const { container } = renderClockNumbers({
        mode: "hours",
        format: "24h",
        currentValue: { hours: 12, minutes: 0 },
      });
      const numbers = container.querySelectorAll(".clock__number");
      expect(numbers).toHaveLength(24);
    });

    it("renders outer ring hours (12-23)", () => {
      const { container } = renderClockNumbers({
        mode: "hours",
        format: "24h",
        currentValue: { hours: 12, minutes: 0 },
      });
      const numbers = container.querySelectorAll(
        ".clock__number:not(.clock__number--inner)",
      );
      const values = Array.from(numbers).map((n) => n.textContent);
      expect(values).toContain("12");
      expect(values).toContain("15");
      expect(values).toContain("18");
      expect(values).toContain("21");
    });

    it("renders inner ring hours (0-11)", () => {
      const { container } = renderClockNumbers({
        mode: "hours",
        format: "24h",
        currentValue: { hours: 0, minutes: 0 },
      });
      const innerNumbers = container.querySelectorAll(
        ".clock__number--inner",
      );
      expect(innerNumbers).toHaveLength(12);
      const values = Array.from(innerNumbers).map((n) => n.textContent);
      expect(values).toContain("0");
      expect(values).toContain("3");
      expect(values).toContain("6");
      expect(values).toContain("9");
    });

    it("marks selected hour in outer ring", () => {
      const { container } = renderClockNumbers({
        mode: "hours",
        format: "24h",
        currentValue: { hours: 15, minutes: 0 },
      });
      const selectedNumber = container.querySelector(
        ".clock__number--selected:not(.clock__number--inner)",
      );
      expect(selectedNumber).toBeInTheDocument();
      expect(selectedNumber).toHaveTextContent("15");
    });

    it("marks selected hour in inner ring", () => {
      const { container } = renderClockNumbers({
        mode: "hours",
        format: "24h",
        currentValue: { hours: 3, minutes: 0 },
      });
      const selectedNumber = container.querySelector(
        ".clock__number--inner.clock__number--selected",
      );
      expect(selectedNumber).toBeInTheDocument();
      expect(selectedNumber).toHaveTextContent("3");
    });
  });

  describe("minutes mode", () => {
    it("renders 12 minute markers", () => {
      const { container } = renderClockNumbers({
        mode: "minutes",
        format: "12h",
        currentValue: { hours: 12, minutes: 0 },
      });
      const numbers = container.querySelectorAll(".clock__number");
      expect(numbers).toHaveLength(12);
    });

    it("displays minutes in 5-minute increments", () => {
      const { container } = renderClockNumbers({
        mode: "minutes",
        format: "12h",
        currentValue: { hours: 12, minutes: 0 },
      });
      const numbers = container.querySelectorAll(".clock__number");
      const values = Array.from(numbers).map((n) => n.textContent);
      expect(values).toContain("00");
      expect(values).toContain("15");
      expect(values).toContain("30");
      expect(values).toContain("45");
    });

    it("pads single digit minutes with zero", () => {
      const { container } = renderClockNumbers({
        mode: "minutes",
        format: "12h",
        currentValue: { hours: 12, minutes: 5 },
      });
      const numbers = container.querySelectorAll(".clock__number");
      const values = Array.from(numbers).map((n) => n.textContent);
      expect(values).toContain("05");
    });

    it("marks selected minute", () => {
      const { container } = renderClockNumbers({
        mode: "minutes",
        format: "12h",
        currentValue: { hours: 12, minutes: 15 },
      });
      const selectedNumber = container.querySelector(
        ".clock__number--selected",
      );
      expect(selectedNumber).toBeInTheDocument();
      expect(selectedNumber).toHaveTextContent("15");
    });

    it("works the same for 24h format", () => {
      const { container } = renderClockNumbers({
        mode: "minutes",
        format: "24h",
        currentValue: { hours: 12, minutes: 30 },
      });
      const numbers = container.querySelectorAll(".clock__number");
      expect(numbers).toHaveLength(12);
    });
  });

  describe("positioning", () => {
    it("applies transform styles to numbers", () => {
      const { container } = renderClockNumbers({
        mode: "hours",
        format: "12h",
        currentValue: { hours: 12, minutes: 0 },
      });
      const number = container.querySelector(".clock__number");
      expect(number).toHaveAttribute("style");
      expect(number?.getAttribute("style")).toContain("transform");
    });
  });
});
