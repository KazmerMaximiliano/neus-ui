import { composeStories } from "@storybook/react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { page } from "vitest/browser";
import * as calendarStories from "../components/Calendar/Calendar.stories";
import * as clockStories from "../components/Clock/Clock.stories";
import * as dateStories from "../components/DateInput/DateInput.stories";
import * as timeStories from "../components/TimeInput/TimeInput.stories";
import * as weekStories from "../components/WeekCalendar/WeekCalendar.stories";
import * as rowStories from "../components/WeekCalendar/components/WeekCalendarRow/WeekCalendarRow.stories";
import * as tableStories from "../components/DataTable/DataTable.stories";
import { ThemeProvider } from "../providers";
import "../css/app.css";
import previewChrome from "../../.storybook/preview-body.html?raw";
import { DESIGN_SYSTEMS } from "./registry";
import { resolveColor } from "./design-systems.test-utils";

const { Calendar } = composeStories(calendarStories);
const { Clock } = composeStories(clockStories);
const { DateInput } = composeStories(dateStories);
const { TimeInput } = composeStories(timeStories);
const { WeekCalendar } = composeStories(weekStories);
const { WeekCalendarRow } = composeStories(rowStories);
const { DataTable } = composeStories(tableStories);

const { recordAction } = vi.hoisted(() => ({ recordAction: vi.fn() }));
vi.mock("storybook/actions", () => ({ action: (name: string) => (row: unknown) => recordAction(name, row) }));

afterEach(() => {
  cleanup();
  recordAction.mockClear();
  for (const style of document.head.querySelectorAll("style")) {
    if (style.textContent?.includes("Never target component tables")) style.remove();
  }
  delete document.documentElement.dataset.colorScheme;
});

/** Measure geometry rather than assuming that a token or stylesheet was applied. */
const expectMonthLayout = (container: HTMLElement) => {
  const months = [...container.querySelectorAll<HTMLElement>(".rdp-month")];
  const widths = months.map((month) => month.getBoundingClientRect().width);
  for (const width of widths) expect(Math.abs(width - widths[0])).toBeLessThan(1);
  for (const cell of container.querySelectorAll<HTMLElement>(".rdp-day:not(.rdp-selected), .rdp-weekday")) {
    expect(getComputedStyle(cell).backgroundColor).toBe("rgba(0, 0, 0, 0)");
  }
  for (const month of months) {
    const grid = month.querySelector<HTMLElement>(".rdp-month_grid")!;
    expect(Math.abs(grid.getBoundingClientRect().width - month.getBoundingClientRect().width)).toBeLessThan(1);
    const headers = [...grid.querySelectorAll<HTMLElement>(".rdp-weekday")];
    for (const header of headers) expect(Math.abs(header.getBoundingClientRect().width - grid.getBoundingClientRect().width / 7)).toBeLessThan(1);
    for (const button of grid.querySelectorAll<HTMLElement>(".rdp-day_button")) {
      const rect = button.getBoundingClientRect();
      const cell = button.parentElement!.getBoundingClientRect();
      expect(Math.abs(rect.width - rect.height)).toBeLessThan(1);
      expect(Math.abs(rect.left + rect.width / 2 - cell.left - cell.width / 2)).toBeLessThan(1);
    }
  }
  const content = container.querySelector<HTMLElement>(".calendar__day-picker")!;
  expect(content.scrollHeight).toBe(content.clientHeight);
  const contentBounds = content.getBoundingClientRect();
  for (const grid of container.querySelectorAll<HTMLElement>(".rdp-month_grid")) {
    expect(grid.getBoundingClientRect().bottom).toBeLessThanOrEqual(contentBounds.bottom + 1);
  }
  const monthsBox = container.querySelector<HTMLElement>(".rdp-months")!.getBoundingClientRect();
  expect(Math.abs(monthsBox.width - content.clientWidth)).toBeLessThan(1);
};

describe.each(["light", "dark"] as const)("Story corrections in %s", (scheme) => {
  it.each(DESIGN_SYSTEMS)("prevents picker placeholder overlap in $id", async ({ id }) => {
    await page.viewport(1200, 1100);
    for (const Story of [DateInput, TimeInput]) {
      for (const placement of ["auto", "floating", "external"] as const) {
        const view = render(<ThemeProvider scope="local" colorScheme={scheme}>
          <Story designSystem={id} label="Choose" placeholder="Placeholder extends past the label" labelPlacement={placement} />
        </ThemeProvider>);
        const field = view.container.querySelector<HTMLButtonElement>(".picker-field__field")!;
        const label = view.container.querySelector<HTMLElement>(".picker-field__label")!;
        const placeholder = view.container.querySelector<HTMLElement>(".picker-field__placeholder")!;
        const floating = placement === "floating" || (placement === "auto" && id === "material");
        expect(getComputedStyle(placeholder).opacity).toBe(floating ? "0" : "1");
        const restTop = label.getBoundingClientRect().top;
        field.focus();
        expect(getComputedStyle(placeholder).opacity).toBe("1");
        if (floating) expect(label.getBoundingClientRect().bottom).toBeLessThan(placeholder.getBoundingClientRect().top);
        field.blur();
        expect(getComputedStyle(placeholder).opacity).toBe(floating ? "0" : "1");
        expect(label.getBoundingClientRect().top).toBe(restTop);
        fireEvent.click(field);
        expect(field).toHaveAttribute("aria-expanded", "true");
        expect(getComputedStyle(placeholder).opacity).toBe("1");
        if (floating) expect(label.getBoundingClientRect().bottom).toBeLessThan(placeholder.getBoundingClientRect().top);
        view.unmount();
      }
      const unlabelled = render(<ThemeProvider scope="local" colorScheme={scheme}>
        <Story designSystem={id} label={undefined} placeholder="Choose a value" />
      </ThemeProvider>);
      expect(getComputedStyle(unlabelled.container.querySelector<HTMLElement>(".picker-field__placeholder")!).opacity).toBe("1");
      unlabelled.unmount();
    }
  });

  it.each(DESIGN_SYSTEMS)("contains the DataTable preview when its $id container resizes", async ({ id }) => {
    await page.viewport(1200, 800);
    const view = render(<ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
      <DataTable designSystem={id} renderMobileCard={undefined} />
    </ThemeProvider>);
    await screen.findByRole("button", { name: "View Ana Pérez" });
    const story = view.container.querySelector<HTMLElement>(".data-table-story")!;
    const viewport = view.container.querySelector<HTMLElement>(".ag-body-horizontal-scroll-viewport")!;
    for (const width of [900, 620, 280, 900]) {
      view.container.style.width = `${width}px`;
      await waitFor(() => {
        expect(Math.round(story.getBoundingClientRect().width)).toBe(width);
        expect(view.container.scrollWidth).toBe(view.container.clientWidth);
        expect(story.scrollWidth).toBe(story.clientWidth);
        if (width === 280) {
          expect(viewport.scrollWidth).toBeGreaterThan(viewport.clientWidth);
        } else {
          expect(viewport.scrollWidth).toBe(viewport.clientWidth);
        }
      });
      if (width === 280) {
        viewport.scrollLeft = viewport.scrollWidth;
        expect(viewport.scrollLeft).toBeGreaterThan(0);
      }
    }
  });

  it.each(DESIGN_SYSTEMS)("fills the calendar and previews $id in real stories", async ({ id }) => {
    await page.viewport(1200, 1100);
    // Include real preview chrome so its selectors cannot silently override a recipe.
    const chrome = document.createElement("div");
    chrome.innerHTML = previewChrome;
    document.head.append(...chrome.children);
    document.documentElement.dataset.colorScheme = scheme;
    const view = render(<ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
      <Calendar designSystem={id} calendarStyle={{ width: 560 }} defaultValue={new Date(2026, 9, 15)} />
    </ThemeProvider>);
    expectMonthLayout(view.container);
    view.rerender(<ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
      <Calendar key="range" designSystem={id} mode="range" numberOfMonths={2} calendarStyle={{ width: 900 }} defaultValue={{ from: new Date(2026, 9, 14), to: new Date(2026, 9, 18) }} />
    </ThemeProvider>);
    expectMonthLayout(view.container);
    expect(view.container.querySelectorAll(".rdp-range_middle").length).toBeGreaterThan(0);
    const middle = view.container.querySelector<HTMLElement>(".rdp-range_middle")!;
    expect(getComputedStyle(middle).backgroundColor).toBe(resolveColor(middle, "--calendar-range-middle-background"));
    view.unmount();

    const previews = render(<ThemeProvider scope="local" designSystem="neus" colorScheme={scheme}>
      <Clock designSystem={id} />
      <DateInput designSystem={id} />
      <TimeInput designSystem={id} />
      <WeekCalendar designSystem={id} />
      <WeekCalendarRow designSystem={id} />
      <DataTable designSystem={id} />
    </ThemeProvider>);
    const clock = previews.container.querySelector<HTMLElement>(".clock__container")!;
    expect(clock.closest("[data-design-system]")).toHaveAttribute("data-design-system", id);
    expect(clock.closest("[data-color-scheme]")).toHaveAttribute("data-color-scheme", scheme);
    for (const field of previews.container.querySelectorAll<HTMLButtonElement>(".picker-field__field")) {
      fireEvent.click(field);
      const panel = previews.container.querySelector<HTMLElement>(".picker-field__popover:popover-open")!;
      expect(panel).not.toBeNull();
      expect(panel.closest("[data-design-system]")).toHaveAttribute("data-design-system", id);
      const surface = panel.querySelector<HTMLElement>(".calendar, .clock__container")!;
      const token = surface.classList.contains("calendar") ? "--calendar-background" : "--clock-background";
      expect(getComputedStyle(surface).backgroundColor).toBe(resolveColor(surface, token));
      fireEvent.keyDown(document, { key: "Escape" });
    }
    await waitFor(() => expect(screen.getByRole("button", { name: "View Ana Pérez" })).toBeVisible());
    const cell = previews.container.querySelector<HTMLElement>(".ag-cell[col-id='actions']")!;
    expect(Math.round(cell.getBoundingClientRect().width)).toBe(160);
    const buttons = [...cell.querySelectorAll<HTMLButtonElement>("button")];
    expect(buttons).toHaveLength(3);
    for (const button of buttons) {
      const rect = button.getBoundingClientRect();
      const bounds = cell.getBoundingClientRect();
      expect(rect.top).toBeGreaterThanOrEqual(bounds.top);
      expect(rect.bottom).toBeLessThanOrEqual(bounds.bottom);
      expect(rect.left).toBeGreaterThanOrEqual(bounds.left);
      expect(rect.right).toBeLessThanOrEqual(bounds.right);
      expect(getComputedStyle(button).backgroundColor).toBe("rgba(0, 0, 0, 0)");
      expect(button).toHaveClass("icon-button--small", "icon-button--text");
    }
    expect(getComputedStyle(buttons[0].parentElement!).gap).toBe("4px");
  });
});

it.each([
  ["Calendar", Calendar, ".calendar"],
  ["Clock", Clock, ".clock__container"],
  ["DateInput", DateInput, ".picker-field"],
  ["TimeInput", TimeInput, ".picker-field"],
  ["WeekCalendar", WeekCalendar, ".week-calendar"],
  ["WeekCalendarRow", WeekCalendarRow, ".week-calendar-row"],
] as const)("previews %s like Button and inherits the global scheme", async (_name, Story, selector) => {
  const view = render(<ThemeProvider scope="local" designSystem="carbon" colorScheme="light"><Story /></ThemeProvider>);
  const surface = () => view.container.querySelector<HTMLElement>(selector)!;
  expect(surface().closest("[data-design-system]")).toHaveAttribute("data-design-system", "neus");
  view.rerender(<ThemeProvider scope="local" designSystem="material" colorScheme="dark"><Story designSystem="vercel" /></ThemeProvider>);
  expect(surface().closest("[data-design-system]")).toHaveAttribute("data-design-system", "vercel");
  expect(surface().closest("[data-color-scheme]")).toHaveAttribute("data-color-scheme", "dark");
  view.rerender(<ThemeProvider scope="local" designSystem="apple" colorScheme="light"><Story designSystem="vercel" /></ThemeProvider>);
  expect(surface().closest("[data-design-system]")).toHaveAttribute("data-design-system", "vercel");
  expect(surface().closest("[data-color-scheme]")).toHaveAttribute("data-color-scheme", "light");
});

it("keeps multiple months reachable without overflowing the narrow document", async () => {
  await page.viewport(320, 800);
  const view = render(<ThemeProvider scope="local" designSystem="material"><Calendar designSystem="material" numberOfMonths={2} /></ThemeProvider>);
  const content = view.container.querySelector<HTMLElement>(".calendar__day-picker")!;
  expect(content.scrollHeight).toBe(content.clientHeight);
  expect(content.scrollWidth).toBeGreaterThan(content.clientWidth);
  content.scrollLeft = content.scrollWidth;
  expect(content.scrollLeft).toBeGreaterThan(0);
  expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(320);
});

it("activates independent row actions with the keyboard in the grid and mobile cards", async () => {
  const user = userEvent.setup();
  for (const width of [1100, 390]) {
    await page.viewport(width, 800);
    const view = render(<ThemeProvider scope="local"><DataTable /></ThemeProvider>);
    for (const [label, name] of [["View", "row-view"], ["Edit", "row-edit"], ["Delete", "row-delete"]]) {
      const button = await screen.findByRole("button", { name: `${label} Ana Pérez` });
      button.focus();
      await user.keyboard("{Enter}");
      expect(recordAction).toHaveBeenLastCalledWith(name, expect.objectContaining({ id: 1 }));
      await user.keyboard(" ");
      expect(recordAction).toHaveBeenLastCalledWith(name, expect.objectContaining({ id: 1 }));
      expect(getComputedStyle(button).outlineStyle).toBe("solid");
    }
    expect(view.container.querySelector(width < 768 ? ".data-table__cards" : ".ag-root-wrapper")).not.toBeNull();
    view.unmount();
  }
  expect(recordAction).toHaveBeenCalledTimes(12);
});

it.each(["en-US", "es-AR", "fr-FR", "de-DE", "ja-JP", "ar-SA"])(
  "keeps localized Calendar readable and scroll-free in %s on narrow screens",
  async (language) => {
    await page.viewport(320, 800);
    const { container } = render(<ThemeProvider scope="local" colorScheme="dark">
      <Calendar designSystem="material" language={language} defaultValue={new Date(2026, 9, 15)} />
    </ThemeProvider>);
    const content = container.querySelector<HTMLElement>(".calendar__day-picker")!;
    expect(content.scrollHeight).toBe(content.clientHeight);
    const caption = new Intl.DateTimeFormat(language, { month: "long", year: "numeric", calendar: "gregory" });
    fireEvent.click(screen.getByRole("button", { name: caption.format(new Date(2026, 9, 15)) }));
    const months = [...container.querySelectorAll<HTMLButtonElement>(".calendar__month-item")];
    expect(months).toHaveLength(12);
    for (const month of months) {
      expect(month.scrollWidth).toBeLessThanOrEqual(month.clientWidth);
      expect(month.getBoundingClientRect().bottom).toBeLessThanOrEqual(content.getBoundingClientRect().bottom + 1);
    }
    fireEvent.click(months[0]);
    expect(screen.getByRole("button", { name: caption.format(new Date(2026, 0, 1)) })).toBeVisible();
    expect(content.scrollHeight).toBe(content.clientHeight);
    expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(320);
  },
);
