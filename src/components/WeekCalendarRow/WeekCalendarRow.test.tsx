import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { WeekCalendarRow } from "./WeekCalendarRow";
import { WeekCalendarRowProps } from "./WeekCalendarRow.types";

afterEach(() => {
  cleanup();
});

const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const dayAfterTomorrow = new Date(today);
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

const mockDays = [today, tomorrow, dayAfterTomorrow];

const mockEntry: WeekCalendarRowProps["entry"] = {
  category: { title: "Category A", label: "Label A" },
  events: [
    {
      id: 1,
      title: "Test Event",
      start: today,
      end: tomorrow,
      description: "A description",
    },
  ],
};

const mockEntryNoEvents: WeekCalendarRowProps["entry"] = {
  category: { title: "Category B", label: "Label B" },
  events: [],
};

const renderRow = (props: Partial<WeekCalendarRowProps> = {}) => {
  return render(
    <WeekCalendarRow
      entry={mockEntry}
      days={mockDays}
      color="purple"
      {...props}
    />,
  );
};

describe("WeekCalendarRow", () => {
  describe("rendering", () => {
    it("renders the row container", () => {
      const { container } = renderRow();
      expect(
        container.querySelector(".week-calendar-row"),
      ).toBeInTheDocument();
    });

    it("renders the category cell with title and label", () => {
      renderRow();
      expect(screen.getByText("Category A")).toBeInTheDocument();
      expect(screen.getByText("Label A")).toBeInTheDocument();
    });

    it("renders category cell with resolved color as CSS variable", () => {
      const { container } = renderRow({ color: "blue" });
      const cell = container.querySelector(".week-calendar-row__category-cell") as HTMLElement;
      expect(cell.style.getPropertyValue("--category-dot-color")).toBe("#4a7b9d");
    });

    it("renders category cell with arbitrary hex color as CSS variable", () => {
      const { container } = renderRow({ color: "#FF5733" });
      const cell = container.querySelector(".week-calendar-row__category-cell") as HTMLElement;
      expect(cell.style.getPropertyValue("--category-dot-color")).toBe("#FF5733");
    });

    it("renders day cells for each day", () => {
      const { container } = renderRow();
      const dayCells = container.querySelectorAll(".week-calendar-row__day-cell");
      expect(dayCells).toHaveLength(mockDays.length);
    });

    it("renders event indicator on cells with events", () => {
      const { container } = renderRow();
      const eventStart = container.querySelector(".week-calendar-row__event--start");
      expect(eventStart).toBeInTheDocument();
    });

    it("does not render event indicators on empty cells", () => {
      const { container } = renderRow({ entry: mockEntryNoEvents });
      const eventElements = container.querySelectorAll(
        "[class*='week-calendar-row__event--']",
      );
      expect(eventElements).toHaveLength(0);
    });

    it("renders event avatar with first letter of title", () => {
      renderRow();
      expect(screen.getByText("T")).toBeInTheDocument();
    });
  });

  describe("onEventClick", () => {
    it("calls onEventClick with event data when clicking an event cell", () => {
      const handleClick = vi.fn();
      const { container } = renderRow({ onEventClick: handleClick });
      const dayCells = container.querySelectorAll(".week-calendar-row__day-cell");
      fireEvent.click(dayCells[0]);
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(mockEntry.events[0]);
    });

    it("does not call onEventClick when clicking an empty cell", () => {
      const handleClick = vi.fn();
      const { container } = renderRow({ onEventClick: handleClick });
      const dayCells = container.querySelectorAll(".week-calendar-row__day-cell");
      fireEvent.click(dayCells[2]);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("adds clickable class to event cells when onEventClick is provided", () => {
      const { container } = renderRow({ onEventClick: vi.fn() });
      const dayCells = container.querySelectorAll(".week-calendar-row__day-cell");
      expect(dayCells[0]).toHaveClass("week-calendar-row__day-cell--clickable");
    });

    it("does not add clickable class to empty cells", () => {
      const { container } = renderRow({ onEventClick: vi.fn() });
      const dayCells = container.querySelectorAll(".week-calendar-row__day-cell");
      expect(dayCells[2]).not.toHaveClass("week-calendar-row__day-cell--clickable");
    });

    it("does not add clickable class when onEventClick is not provided", () => {
      const { container } = renderRow();
      const dayCells = container.querySelectorAll(".week-calendar-row__day-cell");
      expect(dayCells[0]).not.toHaveClass("clickable");
    });
  });

  describe("hoverContent", () => {
    it("does not render tooltip when hoverContent is not provided", () => {
      const { container } = renderRow();
      expect(
        container.querySelector(".week-calendar-row__hover-tooltip"),
      ).not.toBeInTheDocument();
    });

    it("does not render tooltip before hovering", () => {
      const { container } = renderRow({
        hoverContent: (event) => <span>{event.title}</span>,
      });
      expect(
        container.querySelector(".week-calendar-row__hover-tooltip"),
      ).not.toBeInTheDocument();
    });

    it("renders tooltip on mouse move over event cell", () => {
      const { container } = renderRow({
        hoverContent: (event) => <span>{event.title}</span>,
      });
      const dayCells = container.querySelectorAll(".week-calendar-row__day-cell");
      fireEvent.mouseMove(dayCells[0], { clientX: 100, clientY: 200 });
      const tooltip = container.querySelector(".week-calendar-row__hover-tooltip");
      expect(tooltip).toBeInTheDocument();
      expect(screen.getByText("Test Event")).toBeInTheDocument();
    });

    it("renders tooltip with event data from hoverContent function", () => {
      const { container } = renderRow({
        hoverContent: (event) => <span data-testid="desc">{event.description}</span>,
      });
      const dayCells = container.querySelectorAll(".week-calendar-row__day-cell");
      fireEvent.mouseMove(dayCells[0], { clientX: 100, clientY: 200 });
      expect(screen.getByTestId("desc").textContent).toBe("A description");
    });

    it("positions tooltip at cursor coordinates", () => {
      const { container } = renderRow({
        hoverContent: (event) => <span>{event.title}</span>,
      });
      const dayCells = container.querySelectorAll(".week-calendar-row__day-cell");
      fireEvent.mouseMove(dayCells[0], { clientX: 150, clientY: 250 });
      const tooltip = container.querySelector(".week-calendar-row__hover-tooltip");
      expect(tooltip).toHaveStyle({ left: "150px", top: "250px" });
    });

    it("hides tooltip on mouse leave", () => {
      const { container } = renderRow({
        hoverContent: (event) => <span>{event.title}</span>,
      });
      const dayCells = container.querySelectorAll(".week-calendar-row__day-cell");
      fireEvent.mouseMove(dayCells[0], { clientX: 100, clientY: 200 });
      expect(
        container.querySelector(".week-calendar-row__hover-tooltip"),
      ).toBeInTheDocument();
      fireEvent.mouseLeave(dayCells[0]);
      expect(
        container.querySelector(".week-calendar-row__hover-tooltip"),
      ).not.toBeInTheDocument();
    });

    it("does not show tooltip on mouse move over empty cell", () => {
      const { container } = renderRow({
        hoverContent: (event) => <span>{event.title}</span>,
      });
      const dayCells = container.querySelectorAll(".week-calendar-row__day-cell");
      fireEvent.mouseMove(dayCells[2], { clientX: 100, clientY: 200 });
      expect(
        container.querySelector(".week-calendar-row__hover-tooltip"),
      ).not.toBeInTheDocument();
    });
  });
});
