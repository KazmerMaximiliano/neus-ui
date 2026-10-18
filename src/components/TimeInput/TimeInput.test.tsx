import {
  cleanup,
  fireEvent as fireCustomization,
  fireEvent,
  render,
  render as renderCustomization,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider as CustomizationThemeProvider } from "../../providers";
import { TimeInput as CustomizationComponent, TimeInput } from "./TimeInput";

afterEach(() => {
  cleanup();
});

const renderTimeInput = (props = {}) => {
  return render(<TimeInput {...props} />);
};

describe("TimeInput description", () => {
  it("passes help text to the picker field and announces it", () => {
    render(<TimeInput label="Start" description="Clinic opens at 9." />);
    expect(screen.getByRole("button", { name: /^Start/ })).toHaveAccessibleDescription("Clinic opens at 9.");
  });
});

describe("TimeInput", () => {
  describe("rendering", () => {
    it("renders time input wrapper", () => {
      const { container } = renderTimeInput();
      expect(
        container.querySelector(".time-input__wrapper"),
      ).toBeInTheDocument();
    });

    it("renders time input field button", () => {
      const { container } = renderTimeInput();
      expect(container.querySelector(".time-input__field")).toBeInTheDocument();
    });

    it("renders placeholder when no value", () => {
      renderTimeInput({ placeholder: "Select a time" });
      expect(screen.getByText("Select a time")).toBeInTheDocument();
    });
  });

  describe("label", () => {
    it("renders label when provided", () => {
      renderTimeInput({ label: "Start Time" });
      expect(screen.getByText("Start Time")).toBeInTheDocument();
    });

    it("does not render label when not provided", () => {
      const { container } = renderTimeInput();
      expect(
        container.querySelector(".time-input__label"),
      ).not.toBeInTheDocument();
    });

    it("renders required indicator when required is true", () => {
      renderTimeInput({ label: "Start Time", required: true });
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("applies error class to label when error is present", () => {
      renderTimeInput({ label: "Start Time", error: "Error" });
      const label = screen.getByText("Start Time");
      expect(label).toHaveClass("time-input__label--error");
    });

    it("applies disabled class to label when disabled", () => {
      renderTimeInput({ label: "Start Time", disabled: true });
      const label = screen.getByText("Start Time");
      expect(label).toHaveClass("time-input__label--disabled");
    });
  });

  describe("error state", () => {
    it("renders error message when error is provided", () => {
      renderTimeInput({ error: "Please select a time" });
      expect(screen.getByText("Please select a time")).toBeInTheDocument();
    });

    it("applies error class to field when error is present", () => {
      const { container } = renderTimeInput({ error: "Error" });
      expect(
        container.querySelector(".time-input__field--error"),
      ).toBeInTheDocument();
    });
  });

  describe("disabled state", () => {
    it("disables the button when disabled", () => {
      const { container } = renderTimeInput({ disabled: true });
      const button = container.querySelector(".time-input__field");
      expect(button).toBeDisabled();
    });

    it("applies disabled class to field when disabled", () => {
      const { container } = renderTimeInput({ disabled: true });
      expect(
        container.querySelector(".time-input__field--disabled"),
      ).toBeInTheDocument();
    });

    it("does not open dropdown when disabled", () => {
      const { container } = renderTimeInput({ disabled: true });
      const button = container.querySelector(".time-input__field");
      fireEvent.click(button!);
      expect(
        container.querySelector(".time-input__dropdown"),
      ).not.toBeInTheDocument();
    });
  });

  describe("readonly state", () => {
    it("does not open dropdown when readonly", () => {
      const { container } = renderTimeInput({ readonly: true });
      const button = container.querySelector(".time-input__field");
      fireEvent.click(button!);
      expect(
        container.querySelector(".time-input__dropdown"),
      ).not.toBeInTheDocument();
    });
  });

  describe("dropdown", () => {
    it("opens dropdown on click", () => {
      const { container } = renderTimeInput();
      const button = container.querySelector(".time-input__field");
      fireEvent.click(button!);
      expect(
        container.querySelector(".time-input__dropdown"),
      ).toBeInTheDocument();
    });

    it("closes dropdown on outside click", () => {
      const { container } = renderTimeInput();
      const button = container.querySelector(".time-input__field");
      fireEvent.click(button!);
      expect(
        container.querySelector(".time-input__dropdown"),
      ).toBeInTheDocument();
      fireEvent.mouseDown(document.body);
      expect(
        container.querySelector(".time-input__dropdown"),
      ).not.toBeInTheDocument();
    });

    it("toggles dropdown on click", () => {
      const { container } = renderTimeInput();
      const button = container.querySelector(".time-input__field");
      fireEvent.click(button!);
      expect(
        container.querySelector(".time-input__dropdown"),
      ).toBeInTheDocument();
      fireEvent.click(button!);
      expect(
        container.querySelector(".time-input__dropdown"),
      ).not.toBeInTheDocument();
    });

    it("renders Clock component in dropdown", () => {
      const { container } = renderTimeInput();
      const button = container.querySelector(".time-input__field");
      fireEvent.click(button!);
      expect(container.querySelector(".clock__wrapper")).toBeInTheDocument();
    });
  });

  describe("hidden input", () => {
    it("renders hidden input when name is provided", () => {
      const { container } = renderTimeInput({ name: "start-time" });
      const hiddenInput = container.querySelector("input[type=\"hidden\"]");
      expect(hiddenInput).toBeInTheDocument();
      expect(hiddenInput).toHaveAttribute("name", "start-time");
    });

    it("does not render hidden input when name is not provided", () => {
      const { container } = renderTimeInput();
      expect(
        container.querySelector("input[type=\"hidden\"]"),
      ).not.toBeInTheDocument();
    });

    it("sets required attribute on hidden input when required", () => {
      const { container } = renderTimeInput({ name: "time", required: true });
      const hiddenInput = container.querySelector("input[type=\"hidden\"]");
      expect(hiddenInput).toHaveAttribute("required");
    });
  });

  describe("display value", () => {
    it("displays time in correct format", () => {
      renderTimeInput({ value: { hours: 14, minutes: 30 } });
      expect(screen.getByText("14:30")).toBeInTheDocument();
    });

    it("pads single digit minutes", () => {
      renderTimeInput({ value: { hours: 9, minutes: 5 } });
      expect(screen.getByText("09:05")).toBeInTheDocument();
    });
  });

  describe("format", () => {
    it("displays time in 24h format by default", () => {
      renderTimeInput({ value: { hours: 14, minutes: 30 } });
      expect(screen.getByText("14:30")).toBeInTheDocument();
    });

    it("displays time in 12h format with PM", () => {
      renderTimeInput({ value: { hours: 14, minutes: 30 }, format: "12h" });
      expect(screen.getByText("02:30 PM")).toBeInTheDocument();
    });

    it("displays time in 12h format with AM", () => {
      renderTimeInput({ value: { hours: 9, minutes: 15 }, format: "12h" });
      expect(screen.getByText("09:15 AM")).toBeInTheDocument();
    });

    it("displays 12:00 PM for noon in 12h format", () => {
      renderTimeInput({ value: { hours: 12, minutes: 0 }, format: "12h" });
      expect(screen.getByText("12:00 PM")).toBeInTheDocument();
    });

    it("displays 12:00 AM for midnight in 12h format", () => {
      renderTimeInput({ value: { hours: 0, minutes: 0 }, format: "12h" });
      expect(screen.getByText("12:00 AM")).toBeInTheDocument();
    });

    it("hidden input always uses 24h format", () => {
      const { container } = renderTimeInput({
        name: "time",
        value: { hours: 14, minutes: 30 },
        format: "12h",
      });
      const hiddenInput = container.querySelector("input[type=\"hidden\"]");
      expect(hiddenInput).toHaveAttribute("value", "14:30");
    });
  });

  describe("controlled vs uncontrolled", () => {
    it("works with defaultValue", () => {
      renderTimeInput({ defaultValue: { hours: 10, minutes: 30 } });
      expect(screen.getByText("10:30")).toBeInTheDocument();
    });

    it("works with controlled value", () => {
      renderTimeInput({
        value: { hours: 15, minutes: 45 },
        onChange: vi.fn(),
      });
      expect(screen.getByText("15:45")).toBeInTheDocument();
    });

    it("updates display when value changes", () => {
      const { rerender } = render(
        <TimeInput value={{ hours: 10, minutes: 30 }} onChange={vi.fn()} />,
      );
      expect(screen.getByText("10:30")).toBeInTheDocument();
      rerender(
        <TimeInput value={{ hours: 15, minutes: 45 }} onChange={vi.fn()} />,
      );
      expect(screen.getByText("15:45")).toBeInTheDocument();
    });
  });
});

describe("time selection", () => {
  it("updates and serializes uncontrolled time via the real Clock keyboard controls", () => {
    const onChange = vi.fn();
    const { container } = render(
      <TimeInput
        label="Start"
        name="start"
        defaultValue={{ hours: 10, minutes: 30 }}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /^Start/ }));
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowUp" });
    expect(onChange).toHaveBeenLastCalledWith({ hours: 11, minutes: 30 });
    expect(container.querySelector("input[name=\"start\"]")).toHaveValue("11:30");
    fireEvent.click(screen.getByRole("button", { name: "Minutos" }));
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowRight" });
    expect(onChange).toHaveBeenLastCalledWith({ hours: 11, minutes: 31 });
  });
  it("leaves controlled time with the consumer and clears an explicit undefined", () => {
    const onChange = vi.fn();
    const { rerender, container } = render(
      <TimeInput
        label="Start"
        name="start"
        value={{ hours: 10, minutes: 30 }}
        onChange={onChange}
        panelStyle={{ padding: 8 }}
        variant="filled"
        labelPlacement="floating"
        size="large"
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /^Start/ }));
    fireEvent.keyDown(screen.getByRole("slider"), { key: "ArrowUp" });
    expect(onChange).toHaveBeenCalledWith({ hours: 11, minutes: 30 });
    expect(container.querySelector("input[name=\"start\"]")).toHaveValue("10:30");
    expect(screen.getByRole("dialog")).toHaveStyle({ padding: "8px" });
    rerender(
      <TimeInput
        label="Start"
        name="start"
        value={undefined}
        onChange={onChange}
      />,
    );
    expect(container.querySelector("input[name=\"start\"]")).toHaveValue("");
  });
});

describe("TimeInput part customization", () => {
  it.each([
    {
      cls: "className",
      sty: "style",
      base: "picker-field",
      phase: "open",
    },
    {
      cls: "labelClassName",
      sty: "labelStyle",
      base: "picker-field__label",
      phase: "open",
    },
    {
      cls: "requiredClassName",
      sty: "requiredStyle",
      base: "picker-field__required",
      phase: "open",
    },
    {
      cls: "containerClassName",
      sty: "containerStyle",
      base: "picker-field__container",
      phase: "open",
    },
    {
      cls: "fieldClassName",
      sty: "fieldStyle",
      base: "picker-field__field",
      phase: "open",
    },
    {
      cls: "valueClassName",
      sty: "valueStyle",
      base: "picker-field__value",
      phase: "open",
    },
    {
      cls: "placeholderClassName",
      sty: "placeholderStyle",
      base: "picker-field__placeholder",
      phase: "placeholder",
    },
    {
      cls: "iconClassName",
      sty: "iconStyle",
      base: "picker-field__icon",
      phase: "open",
    },
    {
      cls: "panelClassName",
      sty: "panelStyle",
      base: "picker-field__popover",
      phase: "open",
    },
    {
      cls: "dropdownClassName",
      sty: "dropdownStyle",
      base: "time-input__dropdown",
      phase: "open",
    },
    {
      cls: "errorClassName",
      sty: "errorStyle",
      base: "picker-field__error",
      phase: "open",
    },
  ])(
    "applies and removes $cls / $sty ($phase) while preserving base classes",
    async ({ cls, sty, base, phase }) => {
      const overrides = {
        [cls]: "consumer-part",
        [sty]: { outlineOffset: "7px" },
      };
      const view = renderCustomization(
        <CustomizationThemeProvider scope="local">
          <CustomizationComponent
            label="Time"
            required
            error="Invalid"
            defaultValue={
              phase === "placeholder" ? undefined : { hours: 9, minutes: 30 }
            }
            {...overrides}
          />
        </CustomizationThemeProvider>,
      );
      fireCustomization.click(
        view.container.querySelector(".picker-field__field")!,
      );
      const targets = view.container.querySelectorAll(".consumer-part");
      expect(targets.length).toBeGreaterThan(0);
      for (const target of targets) {
        expect(target).toHaveClass(base);
        expect(target).toHaveStyle({ outlineOffset: "7px" });
      }
      view.rerender(
        <CustomizationThemeProvider scope="local">
          <CustomizationComponent
            label="Time"
            required
            error="Invalid"
            defaultValue={
              phase === "placeholder" ? undefined : { hours: 9, minutes: 30 }
            }
          />
        </CustomizationThemeProvider>,
      );
      expect(view.container.querySelector(".consumer-part")).toBeNull();
      for (const target of view.container.querySelectorAll("." + base)) {
        expect((target as HTMLElement).style.outlineOffset).not.toBe("7px");
      }
    },
  );
});
