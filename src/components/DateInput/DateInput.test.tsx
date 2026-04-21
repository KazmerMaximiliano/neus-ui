import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DateInput } from "./DateInput";

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

    it("renders range mode dropdown with correct width", () => {
      const { container } = renderDateInput({ mode: "range" });
      const button = container.querySelector(".date-input__field");
      fireEvent.click(button!);
      const dropdown = container.querySelector(".date-input__dropdown");
      expect(dropdown).toHaveStyle({ minWidth: "625px" });
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
