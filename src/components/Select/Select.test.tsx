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
      renderSelect();
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });

    it("renders with base select class", () => {
      renderSelect();
      expect(screen.getByRole("combobox")).toHaveClass("select");
    });

    it("renders all options", () => {
      renderSelect();
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });

    it("renders with name attribute", () => {
      renderSelect({ name: "test-select" });
      expect(screen.getByRole("combobox")).toHaveAttribute(
        "name",
        "test-select",
      );
    });

    it("renders default placeholder when no value", () => {
      renderSelect();
      expect(
        screen.getByText("Selecciona una opción..."),
      ).toBeInTheDocument();
    });

    it("renders custom placeholder", () => {
      renderSelect({ placeholder: "Choose..." });
      const options = screen.getAllByText("Choose...");
      expect(options.length).toBeGreaterThan(0);
    });
  });

  describe("label", () => {
    it("renders label when provided", () => {
      renderSelect({ label: "Test Label" });
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("uses placeholder as label when label not provided", () => {
      const { container } = renderSelect({ placeholder: "Placeholder Label" });
      const label = container.querySelector(".select-label");
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Placeholder Label");
    });

    it("applies error class to label when error is present", () => {
      renderSelect({ label: "Test Label", error: "Error message" });
      const label = screen.getByText("Test Label");
      expect(label).toHaveClass("error");
    });

    it("applies disabled class to label when disabled", () => {
      renderSelect({ label: "Test Label", disabled: true });
      const label = screen.getByText("Test Label");
      expect(label).toHaveClass("disabled");
    });
  });

  describe("error state", () => {
    it("renders error message when error is provided", () => {
      renderSelect({ error: "This field is required" });
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("applies error class to select when error is present", () => {
      renderSelect({ error: "Error message" });
      expect(screen.getByRole("combobox")).toHaveClass("error");
    });
  });

  describe("disabled state", () => {
    it("is disabled when disabled prop is true", () => {
      renderSelect({ disabled: true });
      expect(screen.getByRole("combobox")).toBeDisabled();
    });

    it("applies disabled class to select when disabled", () => {
      renderSelect({ disabled: true });
      expect(screen.getByRole("combobox")).toHaveClass("disabled");
    });

    it("does not call onChange when disabled", () => {
      const onChange = vi.fn();
      renderSelect({ disabled: true, onChange });
      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "2" },
      });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("value", () => {
    it("renders with controlled value", () => {
      renderSelect({ value: "2", onChange: vi.fn() });
      expect(screen.getByRole("combobox")).toHaveValue("2");
    });

    it("renders with defaultValue", () => {
      renderSelect({ defaultValue: "3" });
      expect(screen.getByRole("combobox")).toHaveValue("3");
    });

    it("does not render placeholder option when value is set", () => {
      renderSelect({ value: "1", onChange: vi.fn() });
      expect(
        screen.queryByText("Selecciona una opción..."),
      ).not.toBeInTheDocument();
    });
  });

  describe("change handling", () => {
    it("calls onChange with selected value", () => {
      const onChange = vi.fn();
      renderSelect({ onChange });
      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "2" },
      });
      expect(onChange).toHaveBeenCalledWith("2");
    });

    it("works without onChange handler", () => {
      renderSelect({ defaultValue: "1" });
      expect(() =>
        fireEvent.change(screen.getByRole("combobox"), {
          target: { value: "2" },
        }),
      ).not.toThrow();
    });
  });

  describe("options with null value", () => {
    it("handles options with null value", () => {
      const optionsWithNull = [
        { value: null, label: "None" },
        { value: "1", label: "Option 1" },
      ];
      render(<Select options={optionsWithNull} />);
      expect(screen.getByText("None")).toBeInTheDocument();
    });
  });
});
