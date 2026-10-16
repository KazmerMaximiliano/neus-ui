import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MultiSelect } from "./MultiSelect";
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
      const hidden = container.querySelectorAll('input[type="hidden"]');
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
