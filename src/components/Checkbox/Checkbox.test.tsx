import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Checkbox } from "./Checkbox";

afterEach(() => {
  cleanup();
});

const renderCheckbox = (props = {}) => {
  return render(<Checkbox {...props} />);
};

describe("Checkbox", () => {
  describe("rendering", () => {
    it("renders checkbox element", () => {
      renderCheckbox();
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("renders with default props", () => {
      renderCheckbox();
      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeDisabled();
      expect(checkbox).not.toBeChecked();
    });

    it("renders with name attribute", () => {
      renderCheckbox({ name: "test-checkbox" });
      expect(screen.getByRole("checkbox")).toHaveAttribute(
        "name",
        "test-checkbox",
      );
    });

    it("renders with checkbox class", () => {
      const { container } = renderCheckbox();
      expect(container.querySelector(".checkbox")).toBeInTheDocument();
    });
  });

  describe("checked state", () => {
    it("is checked when checked prop is true", () => {
      renderCheckbox({ checked: true });
      expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("is not checked when checked prop is false", () => {
      renderCheckbox({ checked: false });
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    });
  });

  describe("disabled state", () => {
    it("is disabled when disabled prop is true", () => {
      renderCheckbox({ disabled: true });
      expect(screen.getByRole("checkbox")).toBeDisabled();
    });

    it("is not disabled when disabled prop is false", () => {
      renderCheckbox({ disabled: false });
      expect(screen.getByRole("checkbox")).not.toBeDisabled();
    });

    it("does not call onChange when disabled", () => {
      const onChange = vi.fn();
      renderCheckbox({ disabled: true, onChange });
      fireEvent.click(screen.getByRole("checkbox"));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("change handling", () => {
    it("calls onChange with true when checkbox is checked", () => {
      const onChange = vi.fn();
      renderCheckbox({ onChange, checked: false });
      fireEvent.click(screen.getByRole("checkbox"));
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it("calls onChange with false when checkbox is unchecked", () => {
      const onChange = vi.fn();
      renderCheckbox({ onChange, checked: true });
      fireEvent.click(screen.getByRole("checkbox"));
      expect(onChange).toHaveBeenCalledWith(false);
    });

    it("works without onChange handler", () => {
      renderCheckbox();
      expect(() => fireEvent.click(screen.getByRole("checkbox"))).not.toThrow();
    });
  });
});

describe("Checkbox label, mixed state and parts", () => {
  it("names the native checkbox with its visible label", () => {
    renderCheckbox({ label: "Accept terms" });
    expect(
      screen.getByRole("checkbox", { name: "Accept terms" }),
    ).toBeInTheDocument();
  });

  it("exposes the indeterminate state on the native input", () => {
    renderCheckbox({ indeterminate: true });
    const input = screen.getByRole("checkbox") as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
    expect(input).toBePartiallyChecked();
    expect(document.querySelector(".checkbox")).toHaveClass(
      "checkbox--indeterminate",
    );
  });

  it("applies checkboxStyle to the box and labelStyle to the text", () => {
    renderCheckbox({
      label: "Label",
      checkboxStyle: { borderRadius: 7 },
      labelStyle: { fontSize: 19 },
    });
    expect(document.querySelector(".checkbox__box")).toHaveStyle({
      borderRadius: "7px",
    });
    expect(screen.getByText("Label")).toHaveStyle({ fontSize: "19px" });
  });

  it("submits its value with a form", () => {
    renderCheckbox({ name: "terms", value: "yes", checked: true });
    expect(screen.getByRole("checkbox")).toHaveAttribute("value", "yes");
  });
});
