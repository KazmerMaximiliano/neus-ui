import {
  cleanup,
  fireEvent as fireCustomization,
  fireEvent,
  render,
  render as renderCustomization,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider as CustomizationThemeProvider } from "../../providers";
import { Select as CustomizationComponent, Select } from "./Select";
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
      const { container } = renderSelect({ disabled: true });
      expect(combobox()).toBeDisabled();
      expect(container.querySelector(".select__label")).toHaveClass(
        "select__label--disabled",
      );
      await userEvent.click(combobox());
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  describe("interactions", () => {
    it("opens the listbox with the search box focused", async () => {
      renderSelect();
      await userEvent.click(combobox());
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
      renderSelect();
      await userEvent.click(combobox());
      await userEvent.keyboard("bra");
      expect(screen.getAllByRole("option")).toHaveLength(1);
      await userEvent.keyboard("zzz");
      expect(screen.getByText("Sin resultados")).toBeInTheDocument();
    });

    it("selects with the pointer, closes and restores focus", async () => {
      const onChange = vi.fn();
      renderSelect({ onChange });
      await userEvent.click(combobox());
      await userEvent.click(screen.getByRole("option", { name: "Chile" }));
      expect(onChange).toHaveBeenCalledWith("cl");
      expect(combobox()).toHaveTextContent("Chile");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
      expect(combobox()).toHaveFocus();
    });

    it("selects with arrow keys and Enter", async () => {
      const onChange = vi.fn();
      renderSelect({ onChange });
      await userEvent.click(combobox());
      await userEvent.keyboard("{ArrowDown}{ArrowDown}{Enter}");
      expect(onChange).toHaveBeenCalledWith("br");
    });

    it("focuses the selected option when the search bar is hidden", async () => {
      renderSelect({ viewSearchBar: false, defaultValue: "br" });
      await userEvent.click(combobox());
      const selected = screen.getByRole("option", { name: "Brasil" });
      expect(selected).toHaveFocus();
      expect(selected).toHaveAttribute("aria-selected", "true");
      await userEvent.keyboard(" ");
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("clears the search after closing", async () => {
      renderSelect();
      await userEvent.click(combobox());
      await userEvent.keyboard("bra{Escape}");
      expect(combobox()).toHaveFocus();
      await userEvent.click(combobox());
      expect(screen.getByRole("searchbox")).toHaveValue("");
    });

    it("closes on outside clicks and on Tab", async () => {
      renderSelect();
      await userEvent.click(combobox());
      fireEvent.mouseDown(document.body);
      expect(combobox()).toHaveAttribute("aria-expanded", "false");
      await userEvent.click(combobox());
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.tab();
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("handles options with a null value", async () => {
      const onChange = vi.fn();
      render(
        <Select
          label="Country"
          options={[{ value: null, label: "None" }, ...OPTIONS]}
          onChange={onChange}
        />,
      );
      await userEvent.click(combobox());
      await userEvent.click(screen.getByRole("option", { name: "None" }));
      expect(onChange).toHaveBeenCalledWith("");
    });
  });

  describe("customization", () => {
    it("applies each style object to its part", async () => {
      const { container } = renderSelect({
        fieldStyle: { borderRadius: 3 },
        listStyle: { maxHeight: 99 },
        optionStyle: { paddingLeft: 31 },
      });
      expect(container.querySelector(".select__field")).toHaveStyle({
        borderRadius: "3px",
      });
      await userEvent.click(combobox());
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
      const overrides = {
        [cls]: "consumer-part",
        [sty]: { outlineOffset: "7px" },
      };
      const view = renderCustomization(
        <CustomizationThemeProvider scope="local">
          <CustomizationComponent
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
        </CustomizationThemeProvider>,
      );
      fireCustomization.click(
        view.container.querySelector("[role=\"combobox\"]")!,
      );
      if (phase === "empty")
        fireCustomization.change(
          view.container.querySelector("input[type=\"search\"]")!,
          { target: { value: "unmatched-query" } },
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
            label="Role"
            error="Invalid"
            options={[
              { value: "a", label: "Alpha" },
              { value: "b", label: "Beta" },
            ]}
            defaultValue={phase === "placeholder" ? undefined : "a"}
            placeholder="Choose"
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
