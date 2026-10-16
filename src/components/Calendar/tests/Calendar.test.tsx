import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Calendar } from "../Calendar";
import { CalendarProps } from "../Calendar.types";

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
      expect(container.querySelector(".calendar")).toBeInTheDocument();
    });

    it("renders day picker container", () => {
      const { container } = renderCalendar();
      expect(
        container.querySelector(".calendar__day-picker"),
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
      expect(
        container.querySelector(".calendar__label"),
      ).not.toBeInTheDocument();
    });

    it("renders required indicator when required is true", () => {
      renderCalendar({ label: "Select Date", required: true });
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("applies error class to label when error is present", () => {
      renderCalendar({ label: "Select Date", error: "Error" });
      const label = screen.getByText("Select Date");
      expect(label).toHaveClass("calendar__label--error");
    });
  });

  describe("error state", () => {
    it("renders error message when error is provided", () => {
      renderCalendar({ error: "Please select a date" });
      expect(screen.getByText("Please select a date")).toBeInTheDocument();
    });

    it("does not render error when not provided", () => {
      const { container } = renderCalendar();
      expect(
        container.querySelector(".calendar__error-message"),
      ).not.toBeInTheDocument();
    });
  });

  describe("disabled state", () => {
    it("applies disabled class when disabled", () => {
      const { container } = renderCalendar({ disabled: true });
      expect(
        container.querySelector(".calendar--disabled"),
      ).toBeInTheDocument();
    });
  });

  describe("readonly state", () => {
    it("applies readonly class when readonly", () => {
      const { container } = renderCalendar({ readonly: true });
      expect(
        container.querySelector(".calendar--readonly"),
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
      const { container } = renderCalendar({
        name: "date-field",
        required: true,
      });
      const hiddenInput = container.querySelector('input[type="hidden"]');
      expect(hiddenInput).toHaveAttribute("required");
    });
  });

  describe("modes", () => {
    it("renders in single mode by default", () => {
      const { container } = renderCalendar();
      expect(
        container.querySelector(".calendar__day-picker"),
      ).toBeInTheDocument();
    });

    it("renders two months when multiple is true", () => {
      const { container } = renderCalendar({ numberOfMonths: 2 });
      expect(
        container.querySelector(".calendar__day-picker"),
      ).toBeInTheDocument();
    });
  });

  describe("controlled vs uncontrolled", () => {
    it("works with defaultValue", () => {
      const date = new Date(2024, 0, 15);
      const { container } = renderCalendar({ defaultValue: date });
      expect(container.querySelector(".calendar")).toBeInTheDocument();
    });

    it("works with controlled value", () => {
      const date = new Date(2024, 0, 15);
      const { container } = renderCalendar({ value: date, onChange: vi.fn() });
      expect(container.querySelector(".calendar")).toBeInTheDocument();
    });
  });
});

describe("Calendar accessibility and parts", () => {
  it("groups the grid under its label and links the error", () => {
    renderCalendar({ label: "Birthday", error: "Pick a date" });
    const group = screen.getByRole("group", { name: "Birthday" });
    expect(group).toHaveAccessibleDescription("Pick a date");
  });

  it("opens the month picker from a keyboard-reachable caption", async () => {
    renderCalendar({ defaultValue: new Date(2026, 4, 10) });
    const caption = screen.getByRole("button", { name: /May 2026/ });
    caption.focus();
    await userEvent.keyboard("{Enter}");
    const may = screen.getByRole("button", { name: "May" });
    expect(may).toHaveAttribute("aria-pressed", "true");
    expect(may).toHaveAttribute("type", "button");
    await userEvent.click(screen.getByRole("button", { name: "2026" }));
    expect(
      screen.getByRole("button", { name: "2026", pressed: true }),
    ).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    expect(
      screen.queryByRole("button", { name: "May" }),
    ).not.toBeInTheDocument();
  });

  it("does not submit an enclosing form from the pickers", async () => {
    const onSubmit = vi.fn((event: Event) => event.preventDefault());
    render(
      <form onSubmit={(e) => onSubmit(e.nativeEvent)}>
        <Calendar mode="single" defaultValue={new Date(2026, 4, 10)} />
      </form>,
    );
    await userEvent.click(screen.getByRole("button", { name: /May 2026/ }));
    await userEvent.click(screen.getByRole("button", { name: "June" }));
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("applies each style object to its part", () => {
    const { container } = renderCalendar({
      label: "Date",
      error: "Oops",
      calendarStyle: { minWidth: 400 },
      labelStyle: { fontSize: 19 },
      errorStyle: { fontSize: 17 },
    });
    expect(container.querySelector(".calendar")).toHaveStyle({
      minWidth: "400px",
    });
    expect(screen.getByText("Date")).toHaveStyle({ fontSize: "19px" });
    expect(screen.getByText("Oops")).toHaveStyle({ fontSize: "17px" });
  });
});

describe("typed selection behavior", () => {
  const date = new Date(2026, 9, 15);
  it("clears an explicitly controlled value without restoring its initial selection", () => {
    const { container, rerender } = render(
      <Calendar value={date} name="date" />,
    );
    expect(container.querySelector('input[type="hidden"]')).toHaveValue(
      date.toISOString(),
    );
    rerender(<Calendar value={undefined} name="date" />);
    expect(container.querySelector('input[type="hidden"]')).toHaveValue("");
  });
  it.each([true, false])(
    "honors required=%s in multiple mode",
    async (required) => {
      const onChange = vi.fn();
      render(
        <Calendar
          mode="multiple"
          defaultValue={[date]}
          required={required}
          onChange={onChange}
        />,
      );
      const selected = screen.getByRole("button", { name: /October 15, 2026/ });
      await userEvent.click(selected);
      if (required) expect(onChange).not.toHaveBeenCalled();
      else expect(onChange).toHaveBeenCalledWith([]);
    },
  );
  it("keeps visible months independent of single selection mode", () => {
    const { container } = render(
      <Calendar defaultValue={date} numberOfMonths={2} />,
    );
    expect(container.querySelectorAll(".rdp-month")).toHaveLength(2);
  });
});

it("allows switching an uncontrolled calendar between selection modes", async () => {
  const date = new Date(2026, 9, 15);
  const { container, rerender } = render(
    <Calendar defaultValue={date} name="mode" />,
  );
  rerender(<Calendar mode="multiple" name="mode" />);
  expect(container.querySelector('input[type="hidden"]')).toHaveValue("");
  await userEvent.click(
    screen.getByRole("button", { name: /October 15, 2026/ }),
  );
  expect(container.querySelector('input[type="hidden"]')).toHaveValue(
    date.toISOString(),
  );
  rerender(<Calendar mode="range" name="mode" />);
  expect(container.querySelector('input[type="hidden"]')).toHaveValue("");
});

describe("native date localization", () => {
  it.each(["en-US", "es-AR", "fr-FR", "de-DE", "ja-JP", "ar-SA"])(
    "localizes the caption, weekdays, month picker and selection in %s",
    async (language) => {
      const selected = new Date(2026, 9, 15);
      const onChange = vi.fn();
      const { container } = render(
        <Calendar
          language={language}
          defaultValue={selected}
          onChange={onChange}
        />,
      );
      const caption = new Intl.DateTimeFormat(language, {
        month: "long",
        year: "numeric",
        calendar: "gregory",
      });
      const month = new Intl.DateTimeFormat(language, {
        month: "long",
        calendar: "gregory",
      });
      const weekday = new Intl.DateTimeFormat(language, {
        weekday: "long",
        calendar: "gregory",
      });
      expect(container.querySelector(".calendar")).toHaveAttribute(
        "lang",
        language,
      );
      expect(container.querySelector(".rdp-weekday")).toHaveAttribute(
        "aria-label",
        weekday.format(new Date(2026, 9, 11)),
      );
      expect(container.querySelector(".rdp-weekday")).toHaveTextContent(
        new Intl.DateTimeFormat(language, { weekday: "short" }).format(
          new Date(2026, 9, 11),
        ),
      );
      await userEvent.click(
        screen.getByRole("button", { name: caption.format(selected) }),
      );
      expect(container.querySelectorAll(".calendar__month-item")).toHaveLength(
        12,
      );
      expect(
        screen.getByRole("button", {
          name: month.format(selected),
          pressed: true,
        }),
      ).toBeInTheDocument();
      await userEvent.click(
        screen.getByRole("button", {
          name: month.format(new Date(2026, 0, 1)),
        }),
      );
      expect(
        screen.getByRole("button", {
          name: caption.format(new Date(2026, 0, 1)),
        }),
      ).toBeInTheDocument();
      await userEvent.click(
        container.querySelector<HTMLButtonElement>(
          '.rdp-day[data-day="2026-01-20"] button',
        )!,
      );
      expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 0, 20));
    },
  );

  it("switches language without losing the selected value or current view", async () => {
    const selected = new Date(2026, 9, 15);
    const { container, rerender } = render(
      <Calendar language="en-US" defaultValue={selected} name="date" />,
    );
    await userEvent.click(screen.getByRole("button", { name: "October 2026" }));
    rerender(<Calendar language="es-AR" defaultValue={selected} name="date" />);
    expect(
      screen.getByRole("button", { name: "octubre", pressed: true }),
    ).toBeInTheDocument();
    expect(container.querySelector('input[type="hidden"]')).toHaveValue(
      selected.toISOString(),
    );
    await userEvent.keyboard("{Escape}");
    expect(
      screen.getByRole("button", { name: "octubre de 2026" }),
    ).toBeInTheDocument();
    expect(
      container.querySelector('.rdp-day[data-day="2026-10-15"]'),
    ).toHaveAttribute("aria-selected", "true");
  });

  it.each(["not_a_locale", "zz-ZZ", ""])(
    "falls back to English for %j",
    (language) => {
      const { container } = render(
        <Calendar language={language} defaultValue={new Date(2026, 9, 15)} />,
      );
      expect(container.querySelector(".calendar")).toHaveAttribute(
        "lang",
        "en-US",
      );
      expect(
        screen.getByRole("button", { name: "October 2026" }),
      ).toBeInTheDocument();
    },
  );
});
