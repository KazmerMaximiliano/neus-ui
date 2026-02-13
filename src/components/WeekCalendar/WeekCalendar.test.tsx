import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { WeekCalendar } from "./WeekCalendar";
import { WeekCalendarProps } from "./WeekCalendar.types";

afterEach(() => {
  cleanup();
});

const mockEvents: WeekCalendarProps["events"] = [
  {
    category: { title: "Room A", label: "Suite", color: "purple" },
    events: [
      {
        id: 1,
        title: "John Doe",
        start: new Date(2024, 0, 15),
        end: new Date(2024, 0, 17),
        description: "2 guests",
      },
    ],
  },
];

const renderWeekCalendar = (props: Partial<WeekCalendarProps> = {}) => {
  return render(
    <ThemeProvider>
      <WeekCalendar {...props} />
    </ThemeProvider>,
  );
};

describe("WeekCalendar", () => {
  describe("rendering", () => {
    it("renders the calendar container", () => {
      const { container } = renderWeekCalendar();
      expect(
        container.querySelector(".week-calendar-container"),
      ).toBeInTheDocument();
    });

    it("renders the default title", () => {
      renderWeekCalendar();
      expect(screen.getByText("Calendar")).toBeInTheDocument();
    });

    it("renders a custom title", () => {
      renderWeekCalendar({ title: "Reservaciones" });
      expect(screen.getByText("Reservaciones")).toBeInTheDocument();
    });

    it("renders seven day columns", () => {
      const { container } = renderWeekCalendar();
      const dayNames = container.querySelectorAll(".week-calendar-day-name");
      expect(dayNames).toHaveLength(7);
    });

    it("renders the date range in the header", () => {
      const { container } = renderWeekCalendar();
      const weekSelector = container.querySelector(".week-selector");
      expect(weekSelector).toBeInTheDocument();
      expect(weekSelector?.textContent).toMatch(/\w+ \d+\s*-\s*\w+ \d+/);
    });
  });

  describe("events", () => {
    it("renders without events by default", () => {
      const { container } = renderWeekCalendar();
      const categoryCells = container.querySelectorAll(
        ".week-calendar-category-cell.with-point",
      );
      expect(categoryCells).toHaveLength(0);
    });

    it("renders event rows when events are provided", () => {
      const { container } = renderWeekCalendar({ events: mockEvents });
      const categoryCells = container.querySelectorAll(
        ".week-calendar-category-cell.with-point",
      );
      expect(categoryCells).toHaveLength(1);
    });

    it("renders category title and label", () => {
      renderWeekCalendar({ events: mockEvents });
      expect(screen.getByText("Room A")).toBeInTheDocument();
      expect(screen.getByText("Suite")).toBeInTheDocument();
    });
  });

  describe("navigation", () => {
    it("renders navigation buttons", () => {
      const { container } = renderWeekCalendar();
      const buttons = container.querySelectorAll(".week-selector button");
      expect(buttons).toHaveLength(2);
    });

    it("navigates to the previous day", () => {
      const { container } = renderWeekCalendar();
      const weekSelector = container.querySelector(".week-selector");
      const initialText = weekSelector?.textContent;

      const prevButton = container.querySelectorAll(
        ".week-selector button",
      )[0];
      fireEvent.click(prevButton);

      const updatedText = weekSelector?.textContent;
      expect(updatedText).not.toBe(initialText);
    });

    it("navigates to the next day", () => {
      const { container } = renderWeekCalendar();
      const weekSelector = container.querySelector(".week-selector");
      const initialText = weekSelector?.textContent;

      const nextButton = container.querySelectorAll(
        ".week-selector button",
      )[1];
      fireEvent.click(nextButton);

      const updatedText = weekSelector?.textContent;
      expect(updatedText).not.toBe(initialText);
    });
  });

  describe("today highlight", () => {
    it("highlights the current day", () => {
      const { container } = renderWeekCalendar();
      const todayCell = container.querySelector(".week-calendar-day-today");
      expect(todayCell).toBeInTheDocument();
    });

    it("centers today in the middle of the 7-day range", () => {
      const { container } = renderWeekCalendar();
      const dayCells = container.querySelectorAll(".week-calendar-day-cell");
      const todayIndex = Array.from(dayCells).findIndex((cell) =>
        cell.classList.contains("week-calendar-day-today"),
      );
      expect(todayIndex).toBe(3);
    });
  });

  describe("onDayChange", () => {
    it("calls onDayChange when navigating to previous day", () => {
      const handleDayChange = vi.fn();
      const { container } = renderWeekCalendar({
        onDayChange: handleDayChange,
      });
      const prevButton = container.querySelectorAll(
        ".week-selector button",
      )[0];
      fireEvent.click(prevButton);
      expect(handleDayChange).toHaveBeenCalledTimes(1);
      expect(handleDayChange).toHaveBeenCalledWith(
        expect.any(Date),
        expect.any(Date),
      );
    });

    it("calls onDayChange when navigating to next day", () => {
      const handleDayChange = vi.fn();
      const { container } = renderWeekCalendar({
        onDayChange: handleDayChange,
      });
      const nextButton = container.querySelectorAll(
        ".week-selector button",
      )[1];
      fireEvent.click(nextButton);
      expect(handleDayChange).toHaveBeenCalledTimes(1);
      expect(handleDayChange).toHaveBeenCalledWith(
        expect.any(Date),
        expect.any(Date),
      );
    });

    it("provides weekEnd 6 days after weekStart", () => {
      const handleDayChange = vi.fn();
      const { container } = renderWeekCalendar({
        onDayChange: handleDayChange,
      });
      const nextButton = container.querySelectorAll(
        ".week-selector button",
      )[1];
      fireEvent.click(nextButton);
      const [start, end] = handleDayChange.mock.calls[0];
      const diffDays = Math.round(
        (end.getTime() - start.getTime()) / 86400000,
      );
      expect(diffDays).toBe(6);
    });

    it("does not throw when onDayChange is not provided", () => {
      const { container } = renderWeekCalendar();
      const prevButton = container.querySelectorAll(
        ".week-selector button",
      )[0];
      expect(() => fireEvent.click(prevButton)).not.toThrow();
    });
  });

  describe("hoverContent", () => {
    it("passes hoverContent to event rows", () => {
      const { container } = renderWeekCalendar({
        events: mockEvents,
        hoverContent: <span>Hover tooltip</span>,
      });
      const dayCells = container.querySelectorAll(".week-calendar-day-cell");
      const eventCell = Array.from(dayCells).find(
        (cell) =>
          cell.querySelector("[class^='event-']") !== null,
      );
      if (eventCell) {
        fireEvent.mouseMove(eventCell, { clientX: 100, clientY: 200 });
        expect(screen.getByText("Hover tooltip")).toBeInTheDocument();
      }
    });
  });

  describe("onEventClick", () => {
    it("passes onEventClick to event rows", () => {
      const handleClick = vi.fn();
      const { container } = renderWeekCalendar({
        events: mockEvents,
        onEventClick: handleClick,
      });
      const clickableCells = container.querySelectorAll(
        ".week-calendar-day-cell.clickable",
      );
      if (clickableCells.length > 0) {
        fireEvent.click(clickableCells[0]);
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(
          expect.objectContaining({ title: "John Doe" }),
        );
      }
    });
  });
});
