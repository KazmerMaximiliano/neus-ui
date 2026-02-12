import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
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

    it("renders day names", () => {
      renderWeekCalendar();
      expect(screen.getByText("Sun")).toBeInTheDocument();
      expect(screen.getByText("Mon")).toBeInTheDocument();
      expect(screen.getByText("Tue")).toBeInTheDocument();
      expect(screen.getByText("Wed")).toBeInTheDocument();
      expect(screen.getByText("Thu")).toBeInTheDocument();
      expect(screen.getByText("Fri")).toBeInTheDocument();
      expect(screen.getByText("Sat")).toBeInTheDocument();
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
      const lodgingCells = container.querySelectorAll(
        ".week-calendar-lodging-cell.with-point",
      );
      expect(lodgingCells).toHaveLength(0);
    });

    it("renders event rows when events are provided", () => {
      const { container } = renderWeekCalendar({ events: mockEvents });
      const lodgingCells = container.querySelectorAll(
        ".week-calendar-lodging-cell.with-point",
      );
      expect(lodgingCells).toHaveLength(1);
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

    it("navigates to the previous week", () => {
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

    it("navigates to the next week", () => {
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
  });
});
