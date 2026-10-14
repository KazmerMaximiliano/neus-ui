import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FormTemplate } from "../../templates/FormTemplate/FormTemplate";
import type { InputProps } from "./index";
import { Input } from "./index";

afterEach(() => {
  cleanup();
});

const renderInput = (props: InputProps = {}) => {
  return render(<Input {...props} />);
};

describe("Input", () => {
  describe("rendering", () => {
    it("renders input element", () => {
      renderInput();
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders with default props", () => {
      renderInput();
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "text");
      expect(input).not.toBeDisabled();
      expect(input).not.toHaveAttribute("readonly");
      expect(input).not.toBeRequired();
    });

    it("renders with placeholder", () => {
      renderInput({ placeholder: "Enter text" });
      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    });

    it("renders with value", () => {
      renderInput({ value: "test value", onChange: vi.fn() });
      expect(screen.getByRole("textbox")).toHaveValue("test value");
    });

    it("renders with defaultValue", () => {
      renderInput({ defaultValue: "default text" });
      expect(screen.getByRole("textbox")).toHaveValue("default text");
    });

    it("renders with name attribute", () => {
      renderInput({ name: "test-input" });
      expect(screen.getByRole("textbox")).toHaveAttribute("name", "test-input");
    });
  });

  describe("label", () => {
    it("renders label when provided", () => {
      renderInput({ label: "Test Label" });
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("does not render label when not provided", () => {
      renderInput();
      expect(screen.queryByText("Test Label")).not.toBeInTheDocument();
    });

    it("renders required indicator when required is true", () => {
      renderInput({ label: "Test Label", required: true });
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("does not render required indicator when required is false", () => {
      renderInput({ label: "Test Label", required: false });
      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });

    it("applies error class to label when error is present", () => {
      renderInput({ label: "Test Label", error: "Error message" });
      const label = screen.getByText("Test Label");
      expect(label).toHaveClass("input__label--error");
    });

    it("applies disabled class to label when disabled", () => {
      renderInput({ label: "Test Label", disabled: true });
      const label = screen.getByText("Test Label");
      expect(label).toHaveClass("input__label--disabled");
    });
  });

  describe("error state", () => {
    it("renders error message when error is provided", () => {
      renderInput({ error: "This field is required" });
      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("does not render error message when error is not provided", () => {
      renderInput();
      expect(
        screen.queryByText("This field is required"),
      ).not.toBeInTheDocument();
    });

    it("applies error class to input when error is present", () => {
      renderInput({ error: "Error message" });
      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("input--error");
    });
  });

  describe("disabled state", () => {
    it("is disabled when disabled prop is true", () => {
      renderInput({ disabled: true });
      expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("applies disabled class to input when disabled", () => {
      renderInput({ disabled: true });
      expect(screen.getByRole("textbox")).toHaveClass("input--disabled");
    });

    it("does not call onChange when disabled", () => {
      const onChange = vi.fn();
      renderInput({ disabled: true, onChange });
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "new value" },
      });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("readonly state", () => {
    it("has readonly attribute when readonly is true", () => {
      renderInput({ readonly: true });
      expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
    });
  });

  describe("required state", () => {
    it("has required attribute when required is true", () => {
      renderInput({ required: true });
      expect(screen.getByRole("textbox")).toBeRequired();
    });
  });

  describe("change handling", () => {
    it("calls onChange with value when input changes", () => {
      const onChange = vi.fn();
      renderInput({ onChange });
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "new value" },
      });
      expect(onChange).toHaveBeenCalledWith("new value");
    });

    it("works without onChange handler", () => {
      renderInput({ defaultValue: "initial" });
      expect(() =>
        fireEvent.change(screen.getByRole("textbox"), {
          target: { value: "new value" },
        }),
      ).not.toThrow();
    });
  });

  describe("input types", () => {
    it("renders text type by default", () => {
      renderInput();
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
    });

    it("renders email type", () => {
      renderInput({ type: "email" });
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "email");
    });

    it("renders password type", () => {
      renderInput({ type: "password" });
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it("renders number type", () => {
      renderInput({ type: "number" });
      expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number");
    });

    it("renders tel type", () => {
      renderInput({ type: "tel" });
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "tel");
    });

    it("renders url type", () => {
      renderInput({ type: "url" });
      expect(screen.getByRole("textbox")).toHaveAttribute("type", "url");
    });

    it("renders color type", () => {
      renderInput({ type: "color" });
      const input = document.querySelector('input[type="color"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass("input--color");
    });

    it.each(["text", "email", "tel", "url"] as const)(
      "applies correct class for %s type",
      (type) => {
        renderInput({ type });
        expect(screen.getByRole("textbox")).toHaveClass(`input--${type}`);
      },
    );
  });

  describe("number input props", () => {
    it("renders with min attribute", () => {
      renderInput({ type: "number", min: 0 });
      expect(screen.getByRole("spinbutton")).toHaveAttribute("min", "0");
    });

    it("renders with max attribute", () => {
      renderInput({ type: "number", max: 100 });
      expect(screen.getByRole("spinbutton")).toHaveAttribute("max", "100");
    });

    it("renders with step attribute", () => {
      renderInput({ type: "number", step: 5 });
      expect(screen.getByRole("spinbutton")).toHaveAttribute("step", "5");
    });

    it("renders with all number props", () => {
      renderInput({ type: "number", min: 0, max: 100, step: 10 });
      const input = screen.getByRole("spinbutton");
      expect(input).toHaveAttribute("min", "0");
      expect(input).toHaveAttribute("max", "100");
      expect(input).toHaveAttribute("step", "10");
    });
  });
});

describe("Input accessibility and customization", () => {
  it("associates labels, hides the required marker and focuses on label click", async () => {
    render(<Input id="email" label="Email" required />);
    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveAttribute("id", "email");
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
    await userEvent.click(screen.getByText("Email"));
    expect(input).toHaveFocus();
  });

  it("generates unique stable IDs and clears error associations", () => {
    const view = render(
      <>
        <Input label="First" error="Invalid" />
        <Input label="Second" />
      </>,
    );
    const first = screen.getByRole("textbox", { name: "First" });
    const second = screen.getByRole("textbox", { name: "Second" });
    const firstId = first.id;
    expect(firstId).not.toBe(second.id);
    expect(first).toHaveAccessibleDescription("Invalid");
    expect(first).toHaveAttribute("aria-invalid", "true");
    view.rerender(
      <>
        <Input label="First" />
        <Input label="Second" />
      </>,
    );
    expect(first.id).toBe(firstId);
    expect(first).not.toHaveAttribute("aria-describedby");
    expect(first).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByText("Invalid")).not.toBeInTheDocument();
  });

  it("names a field without a label", () => {
    render(<Input aria-label="Search" />);
    expect(screen.getByRole("textbox", { name: "Search" })).toBeInTheDocument();
  });

  it("applies overrides to their own parts and removes them when omitted", () => {
    const view = render(
      <Input
        label="Name"
        required
        error="Invalid"
        wrapperStyle={{ gap: 17 }}
        inputStyle={{ borderRadius: 9 }}
        labelStyle={{ fontWeight: 800 }}
        requiredStyle={{ marginLeft: 10 }}
        errorStyle={{ fontSize: 18 }}
      />,
    );
    const input = screen.getByRole("textbox", { name: "Name" });
    const parts = [
      input.parentElement!,
      input,
      screen.getByText("Name"),
      screen.getByText("*"),
      screen.getByText("Invalid"),
    ];
    expect(parts[0]).toHaveStyle({ gap: "17px" });
    expect(parts[1]).toHaveStyle({ borderRadius: "9px" });
    expect(parts[2]).toHaveStyle({ fontWeight: "800" });
    expect(parts[3]).toHaveStyle({ marginLeft: "10px" });
    expect(parts[4]).toHaveStyle({ fontSize: "18px" });
    expect(input.style.gap).toBe("");
    view.rerender(<Input label="Name" required error="Invalid" />);
    parts.forEach((part) => expect(part.getAttribute("style") ?? "").toBe(""));
  });

  it("keeps optional parts absent even when their styles are supplied", () => {
    const { container } = render(
      <Input
        required
        labelStyle={{ color: "red" }}
        requiredStyle={{ color: "red" }}
        errorStyle={{ color: "red" }}
      />,
    );
    expect(container.querySelector("label")).toBeNull();
    expect(container.querySelector(".input__required")).toBeNull();
    expect(container.querySelector(".input__error-message")).toBeNull();
  });

  it("preserves uncontrolled edits and defaultValue semantics", async () => {
    const onChange = vi.fn();
    const view = render(
      <Input label="Name" defaultValue="A" onChange={onChange} />,
    );
    const input = screen.getByRole("textbox", { name: "Name" });
    await userEvent.type(input, "B");
    expect(input).toHaveValue("AB");
    expect(onChange).toHaveBeenLastCalledWith("AB");
    view.rerender(
      <Input label="Name" defaultValue="Replacement" onChange={onChange} />,
    );
    expect(input).toHaveValue("AB");
    await userEvent.clear(input);
    expect(onChange).toHaveBeenLastCalledWith("");
  });

  it("keeps controlled values owned by the consumer", async () => {
    const onChange = vi.fn();
    const view = render(<Input label="Name" value="A" onChange={onChange} />);
    const input = screen.getByRole("textbox", { name: "Name" });
    await userEvent.type(input, "B");
    expect(onChange).toHaveBeenLastCalledWith("AB");
    expect(input).toHaveValue("A");
    view.rerender(<Input label="Name" value="AB" onChange={onChange} />);
    expect(input).toHaveValue("AB");
  });

  it("emits number edits and clearing as strings", async () => {
    const onChange = vi.fn();
    render(
      <Input
        type="number"
        label="Amount"
        defaultValue={12}
        onChange={onChange}
      />,
    );
    const input = screen.getByRole("spinbutton", { name: "Amount" });
    await userEvent.clear(input);
    expect(onChange).toHaveBeenLastCalledWith("");
    await userEvent.type(input, "23");
    expect(onChange).toHaveBeenLastCalledWith("23");
  });

  it.each(["disabled", "readonly"] as const)(
    "prevents user edits when %s",
    async (state) => {
      const onChange = vi.fn();
      render(
        <Input
          label="Name"
          defaultValue="Original"
          {...{ [state]: true }}
          onChange={onChange}
        />,
      );
      const input = screen.getByRole("textbox", { name: "Name" });
      await userEvent.type(input, "X");
      expect(input).toHaveValue("Original");
      expect(onChange).not.toHaveBeenCalled();
    },
  );

  it("preserves the wrapper used by FormTemplate and native form submission", async () => {
    const submit = vi.fn();
    render(
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit(new FormData(event.currentTarget).get("name"));
        }}
      >
        <FormTemplate submitLabel="Save">
          <Input name="name" label="Name" required />
        </FormTemplate>
      </form>,
    );
    const input = screen.getByRole("textbox", { name: "Name" });
    expect(input.parentElement).toHaveClass("input__wrapper");
    expect(input.parentElement?.parentElement).toHaveClass("form-template");
    await userEvent.type(input, "Ada");
    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(submit).toHaveBeenCalledWith("Ada");
  });
});
