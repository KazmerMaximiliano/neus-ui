import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Select } from "./Select";

afterEach(() => {
  cleanup();
});

const defaultOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

const renderSelect = (props = {}) => {
  return render(<Select options={defaultOptions} {...props} />);
};

describe("Select", () => {
  describe("rendering", () => {
    it("renders select element", () => {
      const { container } = renderSelect();
      expect(container.querySelector(".select")).toBeInTheDocument();
    });

    it("renders with base select class", () => {
      const { container } = renderSelect();
      expect(container.querySelector(".select")).toBeInTheDocument();
    });

    it("renders all options when open", () => {
      const { container } = renderSelect();
      const select = container.querySelector(".select") as HTMLElement;
      fireEvent.click(select);
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });

    it("renders with name attribute on hidden input", () => {
      const { container } = renderSelect({ name: "test-select" });
      const hiddenInput = container.querySelector("input[type=\"hidden\"]");
      expect(hiddenInput).toHaveAttribute("name", "test-select");
    });

    it("renders default placeholder when no value", () => {
      renderSelect();
      expect(
        screen.getByText("Selecciona una opción..."),
      ).toBeInTheDocument();
    });

    it("renders custom placeholder", () => {
      const { container } = renderSelect({ placeholder: "Choose..." });
      expect(container.querySelector(".select__placeholder")).toHaveTextContent("Choose...");
    });
  });

  describe("label", () => {
    it("renders label when provided", () => {
      renderSelect({ label: "Test Label" });
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("uses placeholder as label when label not provided", () => {
      const { container } = renderSelect({ placeholder: "Placeholder Label" });
      const label = container.querySelector(".select__label");
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Placeholder Label");
    });

    it("applies error class to label when error is present", () => {
      renderSelect({ label: "Test Label", error: "Error message" });
      const label = screen.getByText("Test Label");
      expect(label).toHaveClass("select__label--error");
    });

    it("applies disabled class to label when disabled", () => {
      renderSelect({ label: "Test Label", disabled: true });
      const label = screen.getByText("Test Label");
      expect(label).toHaveClass("select__label--disabled");
    });
  });

  describe("error state", () => {
    it("renders error message when error is provided", () => {
      renderSelect({ error: "This field is required" });
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("applies error class to select when error is present", () => {
      const { container } = renderSelect({ error: "Error message" });
      expect(container.querySelector(".select")).toHaveClass("select--error");
    });
  });

  describe("disabled state", () => {
    it("applies disabled class when disabled prop is true", () => {
      const { container } = renderSelect({ disabled: true });
      expect(container.querySelector(".select")).toHaveClass("select--disabled");
    });

    it("does not open dropdown when disabled", () => {
      const { container } = renderSelect({ disabled: true });
      const select = container.querySelector(".select") as HTMLElement;
      fireEvent.click(select);
      expect(
        container.querySelector(".select__dropdown"),
      ).not.toHaveClass("select__dropdown--open");
    });

    it("does not call onChange when disabled", () => {
      const onChange = vi.fn();
      const { container } = renderSelect({ disabled: true, onChange });
      const select = container.querySelector(".select") as HTMLElement;
      fireEvent.click(select);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("value", () => {
    it("renders with controlled value", () => {
      const { container } = renderSelect({ value: "2", onChange: vi.fn() });
      const select = container.querySelector(".select") as HTMLElement;
      expect(select).toHaveTextContent("Option 2");
    });

    it("renders with defaultValue", () => {
      const { container } = renderSelect({ defaultValue: "3" });
      const select = container.querySelector(".select") as HTMLElement;
      expect(select).toHaveTextContent("Option 3");
    });

    it("does not render placeholder when value is set", () => {
      renderSelect({ value: "1", onChange: vi.fn() });
      expect(
        screen.queryByText("Selecciona una opción..."),
      ).not.toBeInTheDocument();
    });
  });

  describe("change handling", () => {
    it("calls onChange with selected value", () => {
      const onChange = vi.fn();
      const { container } = renderSelect({ onChange });
      const select = container.querySelector(".select") as HTMLElement;
      fireEvent.click(select);
      fireEvent.click(screen.getByText("Option 2"));
      expect(onChange).toHaveBeenCalledWith("2");
    });

    it("closes dropdown after selecting an option", () => {
      const { container } = renderSelect({ onChange: vi.fn() });
      const select = container.querySelector(".select") as HTMLElement;
      fireEvent.click(select);
      expect(
        container.querySelector(".select__dropdown"),
      ).toHaveClass("select__dropdown--open");
      fireEvent.click(screen.getByText("Option 1"));
      expect(
        container.querySelector(".select__dropdown"),
      ).not.toHaveClass("select__dropdown--open");
    });

    it("works without onChange handler", () => {
      const { container } = renderSelect({ defaultValue: "1" });
      const select = container.querySelector(".select") as HTMLElement;
      expect(() => {
        fireEvent.click(select);
        fireEvent.click(screen.getByText("Option 2"));
      }).not.toThrow();
    });
  });

  describe("dropdown", () => {
    it("does not show dropdown by default", () => {
      const { container } = renderSelect();
      expect(
        container.querySelector(".select__dropdown"),
      ).not.toHaveClass("select__dropdown--open");
    });

    it("opens dropdown on click", () => {
      const { container } = renderSelect();
      const select = container.querySelector(".select") as HTMLElement;
      fireEvent.click(select);
      expect(
        container.querySelector(".select__dropdown"),
      ).toHaveClass("select__dropdown--open");
    });

    it("closes dropdown on outside click", () => {
      const { container } = renderSelect();
      const select = container.querySelector(".select") as HTMLElement;
      fireEvent.click(select);
      expect(
        container.querySelector(".select__dropdown"),
      ).toHaveClass("select__dropdown--open");
      fireEvent.mouseDown(document.body);
      expect(
        container.querySelector(".select__dropdown"),
      ).not.toHaveClass("select__dropdown--open");
    });
  });

  describe("options with null value", () => {
    it("handles options with null value", () => {
      const optionsWithNull = [
        { value: null, label: "None" },
        { value: "1", label: "Option 1" },
      ];
      const { container } = render(<Select options={optionsWithNull} />);
      const select = container.querySelector(".select") as HTMLElement;
      fireEvent.click(select);
      expect(screen.getByText("None")).toBeInTheDocument();
    });
  });
});
