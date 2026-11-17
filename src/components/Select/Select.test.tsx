import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../../providers";
import { Select } from "./Select";
import type { SelectProps } from "./Select.types";

afterEach(cleanup);

const OPTIONS = [
  { value: "ar", label: "Argentina" },
  { value: "br", label: "Brasil" },
  { value: "cl", label: "Chile" },
];

const renderSelect = (props: Partial<SelectProps> = {}) =>
  render(<Select label="Country" options={OPTIONS} {...props} />);

const combobox = () => screen.getByRole("combobox", { name: "Country" });

describe("Select required", () => {
  it("marks the label and the trigger, and forwards the asterisk hooks", () => {
    const { rerender } = render(<Select label="Motivo" options={[{ value: "a", label: "A" }]} />);
    expect(screen.getByRole("combobox", { name: "Motivo" })).not.toHaveAttribute("aria-required");
    expect(document.querySelector(".select__required")).not.toBeInTheDocument();
    rerender(<Select label="Motivo" required requiredClassName="star" requiredStyle={{ color: "red" }} options={[{ value: "a", label: "A" }]} />);
    expect(screen.getByRole("combobox", { name: "Motivo" })).toHaveAttribute("aria-required", "true");
    const star = document.querySelector(".select__required")!;
    expect(star).toHaveTextContent("*");
    expect(star).toHaveAttribute("aria-hidden", "true");
    expect(star).toHaveClass("star");
    expect(star).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });
});

describe("Select field presentation", () => {
  it("defaults the variant, label placement and size, and takes each prop", () => {
    const { container, rerender } = renderSelect();
    const wrapper = container.querySelector(".select__wrapper")!;

    expect(wrapper).toHaveClass("field-presentation");
    expect(wrapper).toHaveAttribute("data-variant", "auto");
    expect(wrapper).toHaveAttribute("data-label-placement", "auto");
    expect(wrapper).toHaveAttribute("data-size", "medium");
    rerender(<Select label="Country" options={OPTIONS} variant="filled" labelPlacement="floating" size="large" />);
    expect(wrapper).toHaveAttribute("data-variant", "filled");
    expect(wrapper).toHaveAttribute("data-label-placement", "floating");
    expect(wrapper).toHaveAttribute("data-size", "large");
  });

  it("draws a hidden outline in the field, sized from the label", () => {
    const { container } = renderSelect({ required: true });
    const outline = container.querySelector(".select__field > .field__outline")!;

    expect(outline).toHaveAttribute("aria-hidden", "true");
    expect(outline.querySelector(".field__notch")).toHaveAttribute("data-label", "Country");
    expect(outline.querySelector(".field__notch")).toHaveAttribute("data-required");
    expect(combobox()).toBeInTheDocument();
  });
});

describe("Select description", () => {
  it("renders help text and announces it before the error", () => {
    const { rerender } = render(<Select label="Plan" options={[{ value: "pro", label: "Pro" }]} description="You can change it later." />);
    const trigger = screen.getByRole("combobox");
    expect(screen.getByText("You can change it later.")).toHaveClass("field__description");
    expect(trigger).toHaveAccessibleDescription("You can change it later.");
    rerender(<Select label="Plan" options={[{ value: "pro", label: "Pro" }]} description="You can change it later." error="Choose a plan" />);
    expect(trigger).toHaveAccessibleDescription("You can change it later. Choose a plan");
    rerender(<Select label="Plan" options={[{ value: "pro", label: "Pro" }]} />);
    expect(trigger).not.toHaveAttribute("aria-describedby");
  });
});

describe("Select", () => {
  describe("rendering", () => {
    it("renders a combobox named by its visible label", () => {
      renderSelect();
      expect(combobox()).toHaveAttribute("aria-haspopup", "listbox");
      expect(combobox()).toHaveAttribute("aria-expanded", "false");
    });

    it("uses the placeholder as label when no label is given", () => {
      render(<Select placeholder="Pick one" options={OPTIONS} />);
      expect(
        screen.getByRole("combobox", { name: "Pick one" }),
      ).toBeInTheDocument();
    });

    it("shows the default placeholder and names an unlabeled combobox", () => {
      render(<Select options={OPTIONS} />);
      expect(
        screen.getByRole("combobox", { name: "Selecciona una opción" }),
      ).toHaveTextContent("Selecciona una opción...");
    });

    it("submits the value through a hidden input", () => {
      const { container } = renderSelect({
        name: "country",
        defaultValue: "br",
      });
      expect(container.querySelector("input[type=\"hidden\"]")).toHaveAttribute(
        "name",
        "country",
      );
      expect(container.querySelector("input[type=\"hidden\"]")).toHaveValue("br");
    });

    it("shows the controlled value and otherwise the default value", () => {
      const { rerender } = renderSelect({ value: "cl", defaultValue: "br" });
      expect(combobox()).toHaveTextContent("Chile");
      rerender(<Select label="Country" options={OPTIONS} defaultValue="br" />);
      expect(combobox()).toHaveTextContent("Brasil");
    });
  });

  describe("states", () => {
    it("associates the error message and marks the field invalid", () => {
      const { container } = renderSelect({ error: "Required" });
      expect(combobox()).toHaveAttribute("aria-invalid", "true");
      expect(combobox()).toHaveAccessibleDescription("Required");
      expect(container.querySelector(".select__field")).toHaveClass(
        "select__field--error",
      );
      expect(container.querySelector(".select__label")).toHaveClass(
        "select__label--error",
      );
    });

    it("disables the native trigger and its label", async () => {
      const user = userEvent.setup();
      const { container } = renderSelect({ disabled: true });
      expect(combobox()).toBeDisabled();
      expect(container.querySelector(".select__label")).toHaveClass(
        "select__label--disabled",
      );
      await user.click(combobox());
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("opens the listbox with the search box focused", async () => {
      const user = userEvent.setup();
      renderSelect();
      await user.click(combobox());
      expect(combobox()).toHaveAttribute("aria-expanded", "true");
      expect(
        screen.getByRole("listbox", { name: "Country" }),
      ).toBeInTheDocument();
      expect(screen.getAllByRole("option")).toHaveLength(3);
      expect(
        screen.getByRole("searchbox", { name: "Buscar..." }),
      ).toHaveFocus();
    });

    it("filters options and reports empty results", async () => {
      const user = userEvent.setup();
      renderSelect();
      await user.click(combobox());
      await user.keyboard("bra");
      expect(screen.getAllByRole("option")).toHaveLength(1);
      await user.keyboard("zzz");
      expect(screen.getByText("Sin resultados")).toBeInTheDocument();
    });

    it("selects with the pointer, closes and restores focus", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderSelect({ onChange });
      await user.click(combobox());
      await user.click(screen.getByRole("option", { name: "Chile" }));
      expect(onChange).toHaveBeenCalledWith("cl");
      expect(combobox()).toHaveTextContent("Chile");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(combobox()).toHaveFocus();
    });

    it("selects with arrow keys and Enter", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderSelect({ onChange });
      await user.click(combobox());
      await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
      expect(onChange).toHaveBeenCalledWith("br");
    });

    it("focuses the selected option when the search bar is hidden", async () => {
      const user = userEvent.setup();
      renderSelect({ viewSearchBar: false, defaultValue: "br" });
      await user.click(combobox());
      const selected = screen.getByRole("option", { name: "Brasil" });
      expect(selected).toHaveFocus();
      expect(selected).toHaveAttribute("aria-selected", "true");
      await user.keyboard(" ");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("clears the search after closing", async () => {
      const user = userEvent.setup();
      renderSelect();
      await user.click(combobox());
      await user.keyboard("bra{Escape}");
      expect(combobox()).toHaveFocus();
      await user.click(combobox());
      expect(screen.getByRole("searchbox")).toHaveValue("");
    });

    it("closes on outside clicks and on Tab", async () => {
      const user = userEvent.setup();
      renderSelect();
      await user.click(combobox());
      await user.click(document.body);
      expect(combobox()).toHaveAttribute("aria-expanded", "false");
      await user.click(combobox());
      await user.keyboard("{ArrowDown}");
      await user.tab();
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("handles options with a null value", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <Select
          label="Country"
          options={[{ value: null, label: "None" }, ...OPTIONS]}
          onChange={onChange}
        />,
      );
      await user.click(combobox());
      await user.click(screen.getByRole("option", { name: "None" }));
      expect(onChange).toHaveBeenCalledWith("");
    });
  });

  describe("customization", () => {
    it("applies each style object to its part", async () => {
      const user = userEvent.setup();
      const { container } = renderSelect({
        fieldStyle: { borderRadius: 3 },
        listStyle: { maxHeight: 99 },
        optionStyle: { paddingLeft: 31 },
      });
      expect(container.querySelector(".select__field")).toHaveStyle({
        borderRadius: "3px",
      });
      await user.click(combobox());
      expect(container.querySelector(".select__popover")).toHaveStyle({
        maxHeight: "99px",
      });
      expect(screen.getByRole("option", { name: "Chile" })).toHaveStyle({
        paddingLeft: "31px",
      });
    });
  });
});

describe("Select part customization", () => {
  it.each([
    {
      cls: "className",
      sty: "style",
      base: "select__wrapper",
      phase: "open",
    },
    {
      cls: "labelClassName",
      sty: "labelStyle",
      base: "select__label",
      phase: "open",
    },
    {
      cls: "fieldClassName",
      sty: "fieldStyle",
      base: "select__field",
      phase: "open",
    },
    {
      cls: "triggerClassName",
      sty: "triggerStyle",
      base: "select__trigger",
      phase: "open",
    },
    {
      cls: "valueClassName",
      sty: "valueStyle",
      base: "select__value",
      phase: "open",
    },
    {
      cls: "placeholderClassName",
      sty: "placeholderStyle",
      base: "select__placeholder",
      phase: "placeholder",
    },
    {
      cls: "caretClassName",
      sty: "caretStyle",
      base: "select__caret",
      phase: "open",
    },
    {
      cls: "errorMessageClassName",
      sty: "errorMessageStyle",
      base: "select__error-message",
      phase: "open",
    },
    {
      cls: "listClassName",
      sty: "listStyle",
      base: "select__popover",
      phase: "open",
    },
    {
      cls: "panelClassName",
      sty: "panelStyle",
      base: "select__panel",
      phase: "open",
    },
    {
      cls: "searchClassName",
      sty: "searchStyle",
      base: "select__search",
      phase: "open",
    },
    {
      cls: "searchInputClassName",
      sty: "searchInputStyle",
      base: "select__search-input",
      phase: "open",
    },
    {
      cls: "listContentClassName",
      sty: "listContentStyle",
      base: "select__list",
      phase: "open",
    },
    {
      cls: "optionClassName",
      sty: "optionStyle",
      base: "select__option",
      phase: "open",
    },
    {
      cls: "optionLabelClassName",
      sty: "optionLabelStyle",
      base: "select__option-label",
      phase: "open",
    },
    {
      cls: "optionCheckClassName",
      sty: "optionCheckStyle",
      base: "select__option-check",
      phase: "open",
    },
    {
      cls: "emptyClassName",
      sty: "emptyStyle",
      base: "select__empty",
      phase: "empty",
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
          <Select
            label="Role"
            error="Invalid"
            options={[
              { value: "a", label: "Alpha" },
              { value: "b", label: "Beta" },
            ]}
            defaultValue={phase === "placeholder" ? undefined : "a"}
            placeholder="Choose"
            {...overrides}
          />
        </ThemeProvider>,
      );
      await user.click(
        view.container.querySelector("[role=\"combobox\"]")!,
      );
      if (phase === "empty")
        await user.type(
          view.container.querySelector("input[type=\"search\"]")!,
          "unmatched-query",
        );
      const targets = view.container.querySelectorAll(".consumer-part");
      expect(targets.length).toBeGreaterThan(0);
      for (const target of targets) {
        expect(target).toHaveClass(base);
        expect(target).toHaveStyle({ outlineOffset: "7px" });
      }
      view.rerender(
        <ThemeProvider scope="local">
          <Select
            label="Role"
            error="Invalid"
            options={[
              { value: "a", label: "Alpha" },
              { value: "b", label: "Beta" },
            ]}
            defaultValue={phase === "placeholder" ? undefined : "a"}
            placeholder="Choose"
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
