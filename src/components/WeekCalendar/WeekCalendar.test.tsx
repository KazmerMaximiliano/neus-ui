import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../providers/ThemeProvider";
import { WeekCalendar } from "./WeekCalendar";
import type { WeekCalendarProps } from "./WeekCalendar.types";

afterEach(() => {
  cleanup();
});

it("forwards existing event/category hooks and their class counterparts to rows", async () => {
  const user = userEvent.setup();
  const today = new Date();
  const end = new Date(today);
  end.setDate(end.getDate() + 3);
  const view = render(
    <ThemeProvider scope="local">
      <WeekCalendar
        events={[
          {
            category: { title: "Team", label: "Work" },
            events: [{ title: "Planning", start: today, end }],
          },
        ]}
        categoryClassName="consumer-category"
        categoryStyle={{ outlineOffset: 6 }}
        eventClassName="consumer-event"
        eventStyle={{ outlineOffset: 7 }}
        tooltipClassName="consumer-tooltip"
        tooltipStyle={{ outlineOffset: 8 }}
        hoverContent={(event) => <span>{event.title}</span>}
      />
    </ThemeProvider>,
  );
  expect(view.container.querySelector(".consumer-category")).toHaveStyle({
    outlineOffset: "6px",
  });
  const events = view.container.querySelectorAll(".consumer-event");
  expect(events.length).toBeGreaterThan(1);
  for (const event of events)
    expect(event).toHaveStyle({ outlineOffset: "7px" });
  await user.click(view.container.querySelector("[tabindex=\"0\"]")!);
  expect(view.container.querySelector(".consumer-tooltip")).toHaveStyle({
    outlineOffset: "8px",
  });
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
      expect(container.querySelector(".week-calendar")).toBeInTheDocument();
    });

    it("renders the default title", () => {
      renderWeekCalendar();
      expect(screen.getByText("Calendar")).toBeInTheDocument();
    });

    it("renders a custom title", () => {
      renderWeekCalendar({ title: "Bookings" });
      expect(screen.getByText("Bookings")).toBeInTheDocument();
    });

    it("renders seven day columns", () => {
      const { container } = renderWeekCalendar();
      const dayNames = container.querySelectorAll(".week-calendar__day-name");
      expect(dayNames).toHaveLength(7);
    });

    it("renders the date range in the header", () => {
      const { container } = renderWeekCalendar();
      const weekSelector = container.querySelector(".week-calendar__selector");
      expect(weekSelector).toBeInTheDocument();
      expect(weekSelector?.textContent).toMatch(/\w+ \d+\s*-\s*\w+ \d+/);
    });
  });

  describe("language", () => {
    it("writes the day names and the range in the language given", () => {
      const { container } = renderWeekCalendar({ language: "es-AR" });
      const names = [...container.querySelectorAll(".week-calendar__day-name")].map((name) => name.textContent);
      const week = [...Array(7)].map((_, index) => {
        const day = new Date();
        day.setDate(day.getDate() - 3 + index);
        return day;
      });
      const date = (day: Date) => day.toLocaleDateString("es-AR", { day: "numeric", month: "short" });

      expect(names).toEqual(week.map((day) => day.toLocaleDateString("es-AR", { weekday: "short" })));
      expect(container.querySelector(".week-calendar__date-range")).toHaveTextContent(`${date(week[0])} - ${date(week[6])}`);
    });

    it("falls back to English for an unsupported tag", () => {
      const { container } = renderWeekCalendar({ language: "not a tag" });
      const names = [...container.querySelectorAll(".week-calendar__day-name")].map((name) => name.textContent);

      expect(names.every((name) => /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat)$/.test(name ?? ""))).toBe(true);
    });
  });

  describe("events", () => {
    it("renders without events by default", () => {
      const { container } = renderWeekCalendar();
      const categoryCells = container.querySelectorAll(
        ".week-calendar-row__category-cell--with-point",
      );
      expect(categoryCells).toHaveLength(0);
    });

    it("renders event rows when events are provided", () => {
      const { container } = renderWeekCalendar({ events: mockEvents });
      const categoryCells = container.querySelectorAll(
        ".week-calendar-row__category-cell--with-point",
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
      const buttons = container.querySelectorAll(
        ".week-calendar__selector button",
      );
      expect(buttons).toHaveLength(2);
    });

    it("names the week buttons in English unless labels says otherwise", () => {
      const { rerender } = renderWeekCalendar();

      expect(screen.getByRole("button", { name: "Previous week" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Next week" })).toBeInTheDocument();

      rerender(
        <ThemeProvider>
          <WeekCalendar labels={{ previous: "Earlier", next: "Later" }} />
        </ThemeProvider>,
      );
      expect(screen.getByRole("button", { name: "Earlier" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Later" })).toBeInTheDocument();
    });

    it("navigates to the previous day", async () => {
      const user = userEvent.setup();
      const { container } = renderWeekCalendar();
      const weekSelector = container.querySelector(".week-calendar__selector");
      const initialText = weekSelector?.textContent;

      const prevButton = container.querySelectorAll(
        ".week-calendar__selector button",
      )[0];
      await user.click(prevButton);

      const updatedText = weekSelector?.textContent;
      expect(updatedText).not.toBe(initialText);
    });

    it("navigates to the next day", async () => {
      const user = userEvent.setup();
      const { container } = renderWeekCalendar();
      const weekSelector = container.querySelector(".week-calendar__selector");
      const initialText = weekSelector?.textContent;

      const nextButton = container.querySelectorAll(
        ".week-calendar__selector button",
      )[1];
      await user.click(nextButton);

      const updatedText = weekSelector?.textContent;
      expect(updatedText).not.toBe(initialText);
    });
  });

  describe("today highlight", () => {
    it("highlights the current day", () => {
      const { container } = renderWeekCalendar();
      const todayCell = container.querySelector(
        ".week-calendar__day-cell--today",
      );
      expect(todayCell).toBeInTheDocument();
    });

    it("centers today in the middle of the 7-day range", () => {
      const { container } = renderWeekCalendar();
      const dayCells = container.querySelectorAll(
        ".week-calendar-row__day-cell",
      );
      const todayIndex = Array.from(dayCells).findIndex((cell) =>
        cell.classList.contains("week-calendar__day-cell--today"),
      );
      expect(todayIndex).toBe(3);
    });
  });

  describe("onDayChange", () => {
    it("calls onDayChange when navigating to previous day", async () => {
      const user = userEvent.setup();
      const handleDayChange = vi.fn();
      const { container } = renderWeekCalendar({
        onDayChange: handleDayChange,
      });
      const prevButton = container.querySelectorAll(
        ".week-calendar__selector button",
      )[0];
      await user.click(prevButton);
      expect(handleDayChange).toHaveBeenCalledTimes(1);
      expect(handleDayChange).toHaveBeenCalledWith(
        expect.any(Date),
        expect.any(Date),
      );
    });

    it("calls onDayChange when navigating to next day", async () => {
      const user = userEvent.setup();
      const handleDayChange = vi.fn();
      const { container } = renderWeekCalendar({
        onDayChange: handleDayChange,
      });
      const nextButton = container.querySelectorAll(
        ".week-calendar__selector button",
      )[1];
      await user.click(nextButton);
      expect(handleDayChange).toHaveBeenCalledTimes(1);
      expect(handleDayChange).toHaveBeenCalledWith(
        expect.any(Date),
        expect.any(Date),
      );
    });

    it("provides weekEnd 6 days after weekStart", async () => {
      const user = userEvent.setup();
      const handleDayChange = vi.fn();
      const { container } = renderWeekCalendar({
        onDayChange: handleDayChange,
      });
      const nextButton = container.querySelectorAll(
        ".week-calendar__selector button",
      )[1];
      await user.click(nextButton);
      const [start, end] = handleDayChange.mock.calls[0];
      const diffDays = Math.round((end.getTime() - start.getTime()) / 86400000);
      expect(diffDays).toBe(6);
    });

    it("does not throw when onDayChange is not provided", async () => {
      const user = userEvent.setup();
      const { container } = renderWeekCalendar();
      const prevButton = container.querySelectorAll(
        ".week-calendar__selector button",
      )[0];
      await expect(user.click(prevButton)).resolves.not.toThrow();
    });
  });

  describe("hoverContent", () => {
    it("passes hoverContent to event rows and renders with event data", async () => {
      const user = userEvent.setup();
      const { container } = renderWeekCalendar({
        events: mockEvents,
        hoverContent: (event) => <span>{event.title}</span>,
      });
      const dayCells = container.querySelectorAll(
        ".week-calendar-row__day-cell",
      );
      const eventCell = Array.from(dayCells).find(
        (cell) =>
          cell.querySelector("[class*='week-calendar-row__event--']") !== null,
      );
      if (eventCell) {
        await user.hover(eventCell);
        expect(screen.getByText("John Doe")).toBeInTheDocument();
      }
    });
  });

  describe("onEventClick", () => {
    it("passes onEventClick to event rows", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = renderWeekCalendar({
        events: mockEvents,
        onEventClick: handleClick,
      });
      const clickableCells = container.querySelectorAll(
        ".week-calendar-row__day-cell--clickable",
      );
      if (clickableCells.length > 0) {
        await user.click(clickableCells[0]);
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith(
          expect.objectContaining({ title: "John Doe" }),
        );
      }
    });
  });
});

describe("WeekCalendar part customization", () => {
  it.each([
    {
      cls: "className",
      sty: "style",
      base: "week-calendar",
      phase: "default",
    },
    {
      cls: "headerClassName",
      sty: "headerStyle",
      base: "week-calendar__header",
      phase: "default",
    },
    {
      cls: "titleClassName",
      sty: "titleStyle",
      base: "week-calendar__title",
      phase: "default",
    },
    {
      cls: "navigationClassName",
      sty: "navigationStyle",
      base: "week-calendar__selector",
      phase: "default",
    },
    {
      cls: "dateRangeClassName",
      sty: "dateRangeStyle",
      base: "week-calendar__date-range",
      phase: "default",
    },
    {
      cls: "gridClassName",
      sty: "gridStyle",
      base: "week-calendar__grid",
      phase: "default",
    },
    {
      cls: "headerRowClassName",
      sty: "headerRowStyle",
      base: "week-calendar-row",
      phase: "default",
    },
    {
      cls: "headerCategoryCellClassName",
      sty: "headerCategoryCellStyle",
      base: "week-calendar-row__category-cell",
      phase: "default",
    },
    {
      cls: "headerDayCellClassName",
      sty: "headerDayCellStyle",
      base: "week-calendar-row__day-cell",
      phase: "default",
    },
    {
      cls: "dayNameClassName",
      sty: "dayNameStyle",
      base: "week-calendar__day-name",
      phase: "default",
    },
    {
      cls: "dayNumberClassName",
      sty: "dayNumberStyle",
      base: "week-calendar__day-number",
      phase: "default",
    },
  ])(
    "applies and removes $cls / $sty ($phase) while preserving base classes",
    async ({ cls, sty, base }) => {
      const overrides = {
        [cls]: "consumer-part",
        [sty]: { outlineOffset: "7px" },
      };
      const view = render(
        <ThemeProvider scope="local">
          <WeekCalendar
            title="Schedule"
            events={[
              { category: { title: "Team", label: "Work" }, events: [] },
            ]}
            {...overrides}
          />
        </ThemeProvider>,
      );
      const targets = view.container.querySelectorAll(".consumer-part");
      expect(targets.length).toBeGreaterThan(0);
      for (const target of targets) {
        expect(target).toHaveClass(base);
        expect(target).toHaveStyle({ outlineOffset: "7px" });
      }
      view.rerender(
        <ThemeProvider scope="local">
          <WeekCalendar
            title="Schedule"
            events={[
              { category: { title: "Team", label: "Work" }, events: [] },
            ]}
          />
        </ThemeProvider>,
      );
      expect(view.container.querySelector(".consumer-part")).toBeNull();
      for (const target of view.container.querySelectorAll("." + base)) {
        expect((target as HTMLElement).style.outlineOffset).not.toBe("7px");
      }
    },
  );
});
