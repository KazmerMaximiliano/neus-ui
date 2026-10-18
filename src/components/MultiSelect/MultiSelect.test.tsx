import {
  cleanup,
  fireEvent as fireCustomization,
  render,
  render as renderCustomization,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider as CustomizationThemeProvider } from "../../providers";
import {
  MultiSelect as CustomizationComponent,
  MultiSelect,
} from "./MultiSelect";
import type { MultiSelectProps } from "./MultiSelect.types";

afterEach(cleanup);

const OPTIONS = [
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
];

const renderMulti = (props: Partial<MultiSelectProps> = {}) =>
  render(
    <MultiSelect name="colors" label="Colors" options={OPTIONS} {...props} />,
  );

const combobox = () => screen.getByRole("combobox", { name: "Colors" });

describe("MultiSelect description", () => {
  it("renders help text and announces it before the error", () => {
    const { rerender } = renderMulti({ description: "Pick up to three.", descriptionClassName: "hint" });
    expect(screen.getByText("Pick up to three.")).toHaveClass("field__description", "hint");
    expect(combobox()).toHaveAccessibleDescription("Pick up to three.");
    rerender(<MultiSelect name="colors" label="Colors" options={OPTIONS} description="Pick up to three." error="Pick one" />);
    expect(combobox()).toHaveAccessibleDescription("Pick up to three. Pick one");
  });
});

describe("MultiSelect", () => {
  describe("rendering", () => {
    it("renders a labelled combobox with its placeholder", () => {
      renderMulti({ placeholder: "Pick colors" });
      expect(combobox()).toHaveTextContent("Pick colors");
    });

    it("uses the placeholder as label without a label", () => {
      render(<MultiSelect name="c" placeholder="Pick" options={OPTIONS} />);
      expect(
        screen.getByRole("combobox", { name: "Pick" }),
      ).toBeInTheDocument();
    });

    it("renders one hidden input per selected value", () => {
      const { container } = renderMulti({ defaultValue: ["red", "blue"] });
      const hidden = container.querySelectorAll("input[type=\"hidden\"]");
      expect([...hidden].map((input) => input.getAttribute("name"))).toEqual([
        "colors[0]",
        "colors[1]",
      ]);
      expect(
        [...hidden].map((input) => (input as HTMLInputElement).value),
      ).toEqual(["red", "blue"]);
    });

    it("shows selected values as tags and in the combobox value text", () => {
      renderMulti({ value: ["green"] });
      expect(document.querySelector(".multiselect__tag")).toHaveTextContent(
        "Green",
      );
      expect(combobox()).toHaveTextContent("Green");
    });

    it("associates the error message", () => {
      renderMulti({ error: "Pick at least one" });
      expect(combobox()).toHaveAttribute("aria-invalid", "true");
      expect(combobox()).toHaveAccessibleDescription("Pick at least one");
    });
  });

  describe("interactions", () => {
    it("opens a multiselectable listbox and stays open while toggling", async () => {
      const onChange = vi.fn();
      renderMulti({ onChange });
      await userEvent.click(combobox());
      const listbox = screen.getByRole("listbox", { name: "Colors" });
      expect(listbox).toHaveAttribute("aria-multiselectable", "true");
      await userEvent.click(screen.getByRole("option", { name: "Red" }));
      await userEvent.click(screen.getByRole("option", { name: "Blue" }));
      expect(onChange).toHaveBeenLastCalledWith(["red", "blue"]);
      expect(screen.getByRole("option", { name: "Red" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      await userEvent.click(screen.getByRole("option", { name: "Red" }));
      expect(onChange).toHaveBeenLastCalledWith(["blue"]);
      expect(screen.getByRole("listbox")).toBeInTheDocument();
    });

    it("toggles options from the keyboard", async () => {
      const onChange = vi.fn();
      renderMulti({ onChange, viewSearchBar: false });
      await userEvent.click(combobox());
      expect(screen.getByRole("option", { name: "Red" })).toHaveFocus();
      await userEvent.keyboard("{ArrowDown} ");
      expect(onChange).toHaveBeenLastCalledWith(["green"]);
    });

    it("removes a tag through its named button", async () => {
      const onChange = vi.fn();
      renderMulti({ defaultValue: ["red", "green"], onChange });
      await userEvent.click(screen.getByRole("button", { name: "Quitar Red" }));
      expect(onChange).toHaveBeenLastCalledWith(["green"]);
      expect(
        screen.queryByRole("button", { name: "Quitar Red" }),
      ).not.toBeInTheDocument();
    });

    it("disables the trigger and hides tag removal", async () => {
      renderMulti({ disabled: true, defaultValue: ["red"] });
      expect(combobox()).toBeDisabled();
      expect(
        screen.queryByRole("button", { name: /Quitar/ }),
      ).not.toBeInTheDocument();
      await userEvent.click(combobox());
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("ignores options without a value", async () => {
      const onChange = vi.fn();
      render(
        <MultiSelect
          name="c"
          label="Colors"
          options={[{ value: null, label: "None" }]}
          onChange={onChange}
        />,
      );
      await userEvent.click(combobox());
      await userEvent.click(screen.getByRole("option", { name: "None" }));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("customization", () => {
    it("applies fieldStyle and tagStyle", () => {
      const { container } = renderMulti({
        defaultValue: ["red"],
        fieldStyle: { borderRadius: 3 },
        tagStyle: { fontSize: 17 },
      });
      expect(container.querySelector(".select__field")).toHaveStyle({
        borderRadius: "3px",
      });
      expect(container.querySelector(".multiselect__tag")).toHaveStyle({
        fontSize: "17px",
      });
    });
  });
});

describe("MultiSelect part customization", () => {
  it.each([
    {
      cls: "tagRemoveIconClassName",
      sty: "tagRemoveIconStyle",
      base: "multiselect__tag-remove-icon",
      phase: "open",
    },

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
      cls: "tagClassName",
      sty: "tagStyle",
      base: "multiselect__tag",
      phase: "open",
    },
    {
      cls: "tagRemoveClassName",
      sty: "tagRemoveStyle",
      base: "multiselect__tag-remove",
      phase: "open",
    },
    {
      cls: "triggerClassName",
      sty: "triggerStyle",
      base: "select__trigger",
      phase: "open",
    },
    {
      cls: "placeholderClassName",
      sty: "placeholderStyle",
      base: "select__placeholder",
      phase: "placeholder",
    },
    {
      cls: "srOnlyClassName",
      sty: "srOnlyStyle",
      base: "select__sr-only",
      phase: "open",
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
      cls: "checkboxClassName",
      sty: "checkboxStyle",
      base: "checkbox",
      phase: "open",
    },
    {
      cls: "boxClassName",
      sty: "boxStyle",
      base: "checkbox__box",
      phase: "open",
    },
    {
      cls: "iconClassName",
      sty: "iconStyle",
      base: "checkbox__icon",
      phase: "open",
    },
    {
      cls: "optionLabelClassName",
      sty: "optionLabelStyle",
      base: "select__option-label",
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
            name="roles"
            label="Roles"
            error="Invalid"
            options={[
              { value: "a", label: "Alpha" },
              { value: "b", label: "Beta" },
            ]}
            defaultValue={phase === "placeholder" ? [] : ["a", "b"]}
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
            name="roles"
            label="Roles"
            error="Invalid"
            options={[
              { value: "a", label: "Alpha" },
              { value: "b", label: "Beta" },
            ]}
            defaultValue={phase === "placeholder" ? [] : ["a", "b"]}
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
