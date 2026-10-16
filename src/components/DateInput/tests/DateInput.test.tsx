import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DateInput } from "../DateInput";

afterEach(() => {
  cleanup();
});

const renderDateInput = (props = {}) => {
  return render(<DateInput {...props} />);
};

describe("DateInput", () => {
  describe("rendering", () => {
    it("renders date input wrapper", () => {
      const { container } = renderDateInput();
      expect(
        container.querySelector(".date-input__wrapper"),
      ).toBeInTheDocument();
    });

    it("renders date input field button", () => {
      const { container } = renderDateInput();
      expect(container.querySelector(".date-input__field")).toBeInTheDocument();
    });

    it("renders placeholder when no value", () => {
      renderDateInput({ placeholder: "Select a date" });
      expect(screen.getByText("Select a date")).toBeInTheDocument();
    });
  });

  describe("label", () => {
    it("renders label when provided", () => {
      renderDateInput({ label: "Birth Date" });
      expect(screen.getByText("Birth Date")).toBeInTheDocument();
    });

    it("does not render label when not provided", () => {
      const { container } = renderDateInput();
      expect(
        container.querySelector(".date-input__label"),
      ).not.toBeInTheDocument();
    });

    it("renders required indicator when required is true", () => {
      renderDateInput({ label: "Birth Date", required: true });
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("applies error class to label when error is present", () => {
      renderDateInput({ label: "Birth Date", error: "Error" });
      const label = screen.getByText("Birth Date");
      expect(label).toHaveClass("date-input__label--error");
    });

    it("applies disabled class to label when disabled", () => {
      renderDateInput({ label: "Birth Date", disabled: true });
      const label = screen.getByText("Birth Date");
      expect(label).toHaveClass("date-input__label--disabled");
    });
  });

  describe("error state", () => {
    it("renders error message when error is provided", () => {
      renderDateInput({ error: "Please select a date" });
      expect(screen.getByText("Please select a date")).toBeInTheDocument();
    });

    it("applies error class to field when error is present", () => {
      const { container } = renderDateInput({ error: "Error" });
      expect(
        container.querySelector(".date-input__field--error"),
      ).toBeInTheDocument();
    });
  });

  describe("disabled state", () => {
    it("disables the button when disabled", () => {
      const { container } = renderDateInput({ disabled: true });
      const button = container.querySelector(".date-input__field");
      expect(button).toBeDisabled();
    });

    it("applies disabled class to field when disabled", () => {
      const { container } = renderDateInput({ disabled: true });
      expect(
        container.querySelector(".date-input__field--disabled"),
      ).toBeInTheDocument();
    });

    it("does not open dropdown when disabled", () => {
      const { container } = renderDateInput({ disabled: true });
      const button = container.querySelector(".date-input__field");
      fireEvent.click(button!);
      expect(
        container.querySelector(".date-input__dropdown"),
      ).not.toBeInTheDocument();
    });
  });

  describe("readonly state", () => {
    it("does not open dropdown when readonly", () => {
      const { container } = renderDateInput({ readonly: true });
      const button = container.querySelector(".date-input__field");
      fireEvent.click(button!);
      expect(
        container.querySelector(".date-input__dropdown"),
      ).not.toBeInTheDocument();
    });
  });

  describe("dropdown", () => {
    it("opens dropdown on click", () => {
      const { container } = renderDateInput();
      const button = container.querySelector(".date-input__field");
      fireEvent.click(button!);
      expect(
        container.querySelector(".date-input__dropdown"),
      ).toBeInTheDocument();
    });

    it("closes dropdown on outside click", () => {
      const { container } = renderDateInput();
      const button = container.querySelector(".date-input__field");
      fireEvent.click(button!);
      expect(
        container.querySelector(".date-input__dropdown"),
      ).toBeInTheDocument();
      fireEvent.mouseDown(document.body);
      expect(
        container.querySelector(".date-input__dropdown"),
      ).not.toBeInTheDocument();
    });

    it("toggles dropdown on click", () => {
      const { container } = renderDateInput();
      const button = container.querySelector(".date-input__field");
      fireEvent.click(button!);
      expect(
        container.querySelector(".date-input__dropdown"),
      ).toBeInTheDocument();
      fireEvent.click(button!);
      expect(
        container.querySelector(".date-input__dropdown"),
      ).not.toBeInTheDocument();
    });
  });

  describe("hidden input", () => {
    it("renders hidden input when name is provided", () => {
      const { container } = renderDateInput({ name: "birth-date" });
      const hiddenInput = container.querySelector('input[type="hidden"]');
      expect(hiddenInput).toBeInTheDocument();
      expect(hiddenInput).toHaveAttribute("name", "birth-date");
    });

    it("does not render hidden input when name is not provided", () => {
      const { container } = renderDateInput();
      expect(
        container.querySelector('input[type="hidden"]'),
      ).not.toBeInTheDocument();
    });

    it("sets required attribute on hidden input when required", () => {
      const { container } = renderDateInput({ name: "date", required: true });
      const hiddenInput = container.querySelector('input[type="hidden"]');
      expect(hiddenInput).toHaveAttribute("required");
    });
  });

  describe("modes", () => {
    it("renders in single mode by default", () => {
      const { container } = renderDateInput();
      const button = container.querySelector(".date-input__field");
      fireEvent.click(button!);
      expect(
        container.querySelector(".date-input__dropdown"),
      ).toBeInTheDocument();
    });

    it("renders range mode with a two-month calendar", () => {
      const { container } = renderDateInput({ mode: "range" });
      const button = container.querySelector(".date-input__field");
      fireEvent.click(button!);
      expect(
        container.querySelector(".date-input__dropdown .calendar"),
      ).toHaveClass("calendar--multiple");
    });
  });

  describe("controlled vs uncontrolled", () => {
    it("works with defaultValue", () => {
      const date = new Date(2024, 0, 15);
      const { container } = renderDateInput({ defaultValue: date });
      const button = container.querySelector(".date-input__field");
      expect(button?.textContent).toBeTruthy();
      expect(button?.textContent).not.toBe("");
    });

    it("works with controlled value", () => {
      const date = new Date(2024, 5, 20);
      const { container } = renderDateInput({ value: date, onChange: vi.fn() });
      const button = container.querySelector(".date-input__field");
      expect(button?.textContent).toBeTruthy();
      expect(button?.textContent).not.toBe("");
    });

    it("updates display when value changes", () => {
      const date1 = new Date(2024, 0, 15);
      const date2 = new Date(2024, 5, 20);
      const { rerender, container } = render(
        <DateInput value={date1} onChange={vi.fn()} />,
      );
      const button = container.querySelector(".date-input__field");
      const firstValue = button?.textContent;
      expect(firstValue).toBeTruthy();
      rerender(<DateInput value={date2} onChange={vi.fn()} />);
      const secondValue = button?.textContent;
      expect(secondValue).toBeTruthy();
      expect(secondValue).not.toBe(firstValue);
    });
  });
});

describe("DateInput accessibility and parts", () => {
  it("names the field with its label and current value", () => {
    renderDateInput({ label: "Birthday", defaultValue: new Date(2024, 0, 15) });
    const field = screen.getByRole("button", { name: /^Birthday / });
    expect(field).toHaveAttribute("aria-haspopup", "dialog");
    expect(field).toHaveAccessibleName(
      `Birthday ${new Date(2024, 0, 15).toLocaleDateString()}`,
    );
  });

  it("opens a named dialog with focus on the selected day and closes on Escape", async () => {
    renderDateInput({ label: "Birthday", defaultValue: new Date(2024, 0, 15) });
    const field = screen.getByRole("button", { name: /^Birthday / });
    await userEvent.click(field);
    expect(field).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("dialog", { name: "Birthday: calendario" }),
    ).toBeInTheDocument();
    expect(document.activeElement).toHaveTextContent("15");
    await userEvent.keyboard("{Escape}");
    expect(field).toHaveAttribute("aria-expanded", "false");
    expect(field).toHaveFocus();
  });

  it("links the error and applies each style object", () => {
    renderDateInput({
      label: "Birthday",
      error: "Required",
      fieldStyle: { borderRadius: 3 },
      labelStyle: { fontSize: 19 },
      errorStyle: { fontSize: 17 },
    });
    const field = screen.getByRole("button", { name: /^Birthday/ });
    expect(field).toHaveAttribute("aria-invalid", "true");
    expect(field).toHaveAccessibleDescription("Required");
    expect(field).toHaveStyle({ borderRadius: "3px" });
    expect(screen.getByText("Birthday")).toHaveStyle({ fontSize: "19px" });
    expect(screen.getByText("Required")).toHaveStyle({ fontSize: "17px" });
  });
});

describe("picker selection and serialization", () => {
  it("selects a date, closes the picker and serializes the uncontrolled value", async () => {
    const onChange = vi.fn();
    const { container } = render(
      <DateInput
        label="Birthday"
        name="birthday"
        defaultValue={new Date(2026, 9, 15)}
        onChange={onChange}
      />,
    );
    const field = screen.getByRole("button", { name: /^Birthday/ });
    await userEvent.click(field);
    await userEvent.click(
      screen.getByRole("button", { name: /October 16, 2026/ }),
    );
    expect(onChange).toHaveBeenLastCalledWith(new Date(2026, 9, 16));
    expect(container.querySelector('input[name="birthday"]')).toHaveValue(
      new Date(2026, 9, 16).toISOString(),
    );
    expect(field).toHaveAttribute("aria-expanded", "false");
    expect(field).toHaveFocus();
  });
  it("can clear a controlled date without restoring the initial selection", async () => {
    const onChange = vi.fn();
    const { rerender, container } = render(
      <DateInput
        label="Birthday"
        name="birthday"
        value={new Date(2026, 9, 15)}
        onChange={onChange}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: /^Birthday/ }));
    await userEvent.click(
      screen.getByRole("button", { name: /October 15, 2026/ }),
    );
    expect(onChange).toHaveBeenLastCalledWith(undefined);
    rerender(
      <DateInput
        label="Birthday"
        name="birthday"
        value={undefined}
        onChange={onChange}
      />,
    );
    expect(container.querySelector('input[name="birthday"]')).toHaveValue("");
  });
  it("keeps range selection open and exposes shared presentation and panel styles", async () => {
    const onChange = vi.fn();
    const { container } = render(
      <DateInput
        label="Stay"
        mode="range"
        defaultValue={{
          from: new Date(2026, 9, 15),
          to: new Date(2026, 9, 16),
        }}
        onChange={onChange}
        variant="filled"
        labelPlacement="floating"
        size="large"
        panelStyle={{ padding: 8 }}
      />,
    );
    const field = screen.getByRole("button", { name: /^Stay/ });
    await userEvent.click(field);
    await userEvent.click(
      screen.getByRole("button", { name: /October 20, 2026/ }),
    );
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ from: expect.any(Date) }),
    );
    expect(field).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog")).toHaveStyle({ padding: "8px" });
    expect(container.querySelector(".picker-field")).toHaveAttribute(
      "data-variant",
      "filled",
    );
    expect(container.querySelectorAll(".rdp-month")).toHaveLength(2);
  });
});
