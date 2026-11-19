import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../../../providers";
import { WeekCalendarRow } from "./WeekCalendarRow";
import type { WeekCalendarRowProps } from "./WeekCalendarRow.types";

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
  describe("language", () => {
    it("dates each event's name in English unless language says otherwise", () => {
      const { rerender } = renderRow({ onEventClick: () => undefined });

      expect(screen.getAllByRole("button", { name: `Test Event, ${today.toLocaleDateString("en-US")}` })).toHaveLength(1);

      rerender(<WeekCalendarRow entry={mockEntry} days={mockDays} color="purple" language="es-AR" onEventClick={() => undefined} />);
      expect(screen.getAllByRole("button", { name: `Test Event, ${today.toLocaleDateString("es-AR")}` })).toHaveLength(1);
    });
  });

  describe("rendering", () => {
    it("renders the row container", () => {
      const { container } = renderRow();
      expect(container.querySelector(".week-calendar-row")).toBeInTheDocument();
    });

    it("renders the category cell with title and label", () => {
      renderRow();
      expect(screen.getByText("Category A")).toBeInTheDocument();
      expect(screen.getByText("Label A")).toBeInTheDocument();
    });

    it("renders category cell with resolved color as CSS variable", () => {
      const { container } = renderRow({ color: "blue" });
      const cell = container.querySelector(
        ".week-calendar-row__category-cell",
      ) as HTMLElement;
      expect(
        cell.parentElement!.style.getPropertyValue("--category-color"),
      ).toBe("#4a7b9d");
    });

    it("renders category cell with arbitrary hex color as CSS variable", () => {
      const { container } = renderRow({ color: "#FF5733" });
      const cell = container.querySelector(
        ".week-calendar-row__category-cell",
      ) as HTMLElement;
      expect(
        cell.parentElement!.style.getPropertyValue("--category-color"),
      ).toBe("#FF5733");
    });

    it("renders day cells for each day", () => {
      const { container } = renderRow();
      const dayCells = container.querySelectorAll(
        ".week-calendar-row__day-cell",
      );
      expect(dayCells).toHaveLength(mockDays.length);
    });

    it("renders event indicator on cells with events", () => {
      const { container } = renderRow();
      const eventStart = container.querySelector(
        ".week-calendar-row__event--start",
      );
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
    it("calls onEventClick with event data when clicking an event cell", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = renderRow({ onEventClick: handleClick });
      const dayCells = container.querySelectorAll(
        ".week-calendar-row__day-cell",
      );
      await user.click(dayCells[0]);
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(mockEntry.events[0]);
    });

    it("does not call onEventClick when clicking an empty cell", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const { container } = renderRow({ onEventClick: handleClick });
      const dayCells = container.querySelectorAll(
        ".week-calendar-row__day-cell",
      );
      await user.click(dayCells[2]);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("adds clickable class to event cells when onEventClick is provided", () => {
      const { container } = renderRow({ onEventClick: vi.fn() });
      const dayCells = container.querySelectorAll(
        ".week-calendar-row__day-cell",
      );
      expect(dayCells[0]).toHaveClass("week-calendar-row__day-cell--clickable");
    });

    it("does not add clickable class to empty cells", () => {
      const { container } = renderRow({ onEventClick: vi.fn() });
      const dayCells = container.querySelectorAll(
        ".week-calendar-row__day-cell",
      );
      expect(dayCells[2]).not.toHaveClass(
        "week-calendar-row__day-cell--clickable",
      );
    });

    it("does not add clickable class when onEventClick is not provided", () => {
      const { container } = renderRow();
      const dayCells = container.querySelectorAll(
        ".week-calendar-row__day-cell",
      );
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

    it("renders tooltip on mouse move over event cell", async () => {
      const user = userEvent.setup();
      const { container } = renderRow({
        hoverContent: (event) => <span>{event.title}</span>,
      });
      const dayCells = container.querySelectorAll(
        ".week-calendar-row__day-cell",
      );
      await user.hover(dayCells[0]);
      const tooltip = container.querySelector(
        ".week-calendar-row__hover-tooltip",
      );
      expect(tooltip).toBeInTheDocument();
      expect(screen.getByText("Test Event")).toBeInTheDocument();
    });

    it("renders tooltip with event data from hoverContent function", async () => {
      const user = userEvent.setup();
      const { container } = renderRow({
        hoverContent: (event) => (
          <span data-testid="desc">{event.description}</span>
        ),
      });
      const dayCells = container.querySelectorAll(
        ".week-calendar-row__day-cell",
      );
      await user.hover(dayCells[0]);
      expect(screen.getByTestId("desc").textContent).toBe("A description");
    });

    it("positions tooltip at cursor coordinates", async () => {
      const user = userEvent.setup();
      const { container } = renderRow({
        hoverContent: (event) => <span>{event.title}</span>,
      });
      const dayCells = container.querySelectorAll(
        ".week-calendar-row__day-cell",
      );
      await user.pointer({
        target: dayCells[0],
        coords: { clientX: 150, clientY: 250 },
      });
      const tooltip = container.querySelector(
        ".week-calendar-row__hover-tooltip",
      );
      expect(
        (tooltip as HTMLElement).style.getPropertyValue("--tooltip-x"),
      ).toBe("150px");
      expect(
        (tooltip as HTMLElement).style.getPropertyValue("--tooltip-y"),
      ).toBe("250px");
    });

    it("hides tooltip on mouse leave", async () => {
      const user = userEvent.setup();
      const { container } = renderRow({
        hoverContent: (event) => <span>{event.title}</span>,
      });
      const dayCells = container.querySelectorAll(
        ".week-calendar-row__day-cell",
      );
      await user.hover(dayCells[0]);
      expect(
        container.querySelector(".week-calendar-row__hover-tooltip"),
      ).toBeInTheDocument();
      await user.unhover(dayCells[0]);
      expect(
        container.querySelector(".week-calendar-row__hover-tooltip"),
      ).not.toBeInTheDocument();
    });

    it("does not show tooltip on mouse move over empty cell", async () => {
      const user = userEvent.setup();
      const { container } = renderRow({
        hoverContent: (event) => <span>{event.title}</span>,
      });
      const dayCells = container.querySelectorAll(
        ".week-calendar-row__day-cell",
      );
      await user.hover(dayCells[2]);
      expect(
        container.querySelector(".week-calendar-row__hover-tooltip"),
      ).not.toBeInTheDocument();
    });
  });
});

describe("event keyboard access", () => {
  it("exposes event details on focus, dismisses with Escape and activates with Enter/Space", async () => {
    const user = userEvent.setup();
    const onEventClick = vi.fn();
    renderRow({
      onEventClick,
      hoverContent: (event) => <span>Details: {event.title}</span>,
    });
    const event = screen.getAllByRole("button")[0];
    await user.tab();
    expect(event).toHaveFocus();
    expect(screen.getByRole("tooltip")).toHaveTextContent(
      "Details: Test Event",
    );
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onEventClick).toHaveBeenCalledTimes(2);
    await user.tab({ shift: true });
    await user.tab();
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    await user.tab({ shift: true });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});

describe("WeekCalendarRow part customization", () => {
  it.each([
    {
      cls: "className",
      sty: "style",
      base: "week-calendar-row",
      phase: "default",
    },
    {
      cls: "categoryClassName",
      sty: "categoryStyle",
      base: "week-calendar-row__category-cell",
      phase: "default",
    },
    {
      cls: "categoryNameClassName",
      sty: "categoryNameStyle",
      base: "week-calendar-row__category-name",
      phase: "default",
    },
    {
      cls: "categoryInfoClassName",
      sty: "categoryInfoStyle",
      base: "week-calendar-row__category-info",
      phase: "default",
    },
    {
      cls: "dayCellClassName",
      sty: "dayCellStyle",
      base: "week-calendar-row__day-cell",
      phase: "default",
    },
    {
      cls: "eventClassName",
      sty: "eventStyle",
      base: "week-calendar-row__event--",
      phase: "default",
    },
    {
      cls: "eventClassName",
      sty: "eventStyle",
      base: "week-calendar-row__event-content",
      phase: "default",
    },
    {
      cls: "eventAvatarClassName",
      sty: "eventAvatarStyle",
      base: "week-calendar-row__event-avatar",
      phase: "default",
    },
    {
      cls: "eventInfoClassName",
      sty: "eventInfoStyle",
      base: "week-calendar-row__event-info",
      phase: "default",
    },
    {
      cls: "eventTitleClassName",
      sty: "eventTitleStyle",
      base: "week-calendar-row__event-title",
      phase: "default",
    },
    {
      cls: "eventDescriptionClassName",
      sty: "eventDescriptionStyle",
      base: "week-calendar-row__event-description",
      phase: "default",
    },
    {
      cls: "tooltipClassName",
      sty: "tooltipStyle",
      base: "week-calendar-row__hover-tooltip",
      phase: "tooltip",
    },
  ])(
    "applies and removes $cls / $sty ($phase) while preserving base classes",
    async ({ cls, sty, base, phase }) => {
      const user = userEvent.setup();
      const overrides = {
        [cls]: "consumer-part",
        [sty]: { outlineOffset: "7px" },
      };
      const view = render(
        <ThemeProvider scope="local">
          <WeekCalendarRow
            entry={{
              category: { title: "Team", label: "Work" },
              events: [
                {
                  title: "Planning",
                  description: "Details",
                  start: new Date(2026, 9, 16),
                  end: new Date(2026, 9, 20),
                },
              ],
            }}
            days={Array.from(
              { length: 7 },
              (_, i) => new Date(2026, 9, 16 + i),
            )}
            color="primary"
            onEventClick={() => { }}
            hoverContent={(event) => <span>{event.title}</span>}
            {...overrides}
          />
        </ThemeProvider>,
      );
      if (phase === "tooltip") await user.tab();
      const targets = view.container.querySelectorAll(".consumer-part");
      expect(targets.length).toBeGreaterThan(0);
      for (const target of targets) {
        if (cls === "eventClassName") {
          expect(target.className).toMatch(
            /week-calendar-row__event(?:--(?:single|start|continue|end)|-content)/,
          );
        } else {
          expect(target).toHaveClass(base);
        }
        expect(target).toHaveStyle({ outlineOffset: "7px" });
      }
      view.rerender(
        <ThemeProvider scope="local">
          <WeekCalendarRow
            entry={{
              category: { title: "Team", label: "Work" },
              events: [
                {
                  title: "Planning",
                  description: "Details",
                  start: new Date(2026, 9, 16),
                  end: new Date(2026, 9, 20),
                },
              ],
            }}
            days={Array.from(
              { length: 7 },
              (_, i) => new Date(2026, 9, 16 + i),
            )}
            color="primary"
            onEventClick={() => { }}
            hoverContent={(event) => <span>{event.title}</span>}
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
