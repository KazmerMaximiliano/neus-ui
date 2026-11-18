import { useState } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Combobox } from "./Combobox";
import * as stories from "./Combobox.stories";
import type { ComboboxProps } from "./Combobox.types";

afterEach(cleanup);

const { Combobox: ComboboxStory } = composeStories(stories);

const OPTIONS = [
  { value: "ar", label: "Argentina" },
  { value: "br", label: "Brazil" },
  { value: "cl", label: "Chile" },
];

const renderCombobox = (props: Partial<ComboboxProps> = {}) =>
  render(
    <>
      <Combobox label="Country" options={OPTIONS} {...props} />
      <button type="button">Next</button>
    </>,
  );

const field = () => screen.getByRole("combobox", { name: "Country" });
const options = () => screen.queryAllByRole("option").map((option) => option.textContent);

describe("Combobox", () => {
  describe("rendering", () => {
    it("renders a closed combobox that controls a named listbox", () => {
      renderCombobox();

      expect(field()).toHaveAttribute("aria-autocomplete", "list");
      expect(field()).toHaveAttribute("aria-expanded", "false");
      expect(field()).toHaveAttribute("autocomplete", "off");
      expect(field()).toHaveAttribute("aria-controls", screen.getByRole("listbox", { hidden: true }).id);
      expect(screen.getByRole("listbox", { hidden: true })).toHaveAccessibleName("Country");
      expect(options()).toEqual([]);
    });

    it("shows the label of its default value", () => {
      renderCombobox({ defaultValue: "br" });

      expect(field()).toHaveValue("Brazil");
    });

    it("submits the value, not the label, through a hidden input", async () => {
      const user = userEvent.setup();
      const { container } = renderCombobox({ name: "country" });

      await user.type(field(), "chi");
      await user.keyboard("{ArrowDown}{Enter}");

      expect(container.querySelector('input[type="hidden"]')).toHaveAttribute("name", "country");
      expect(container.querySelector('input[type="hidden"]')).toHaveValue("cl");
      expect(field()).not.toHaveAttribute("name");
    });

    it("renders its story", async () => {
      const user = userEvent.setup();
      render(<ComboboxStory />);

      await user.type(screen.getByRole("combobox", { name: "Country" }), "co");

      expect(screen.getAllByRole("option").map((option) => option.textContent)).toEqual(["Colombia", "Mexico"]);
    });
  });

  describe("interactions", () => {
    it("opens and narrows the options as you type", async () => {
      const user = userEvent.setup();
      renderCombobox();

      await user.type(field(), "BR");

      expect(field()).toHaveAttribute("aria-expanded", "true");
      expect(options()).toEqual(["Brazil"]);
    });

    it("moves the active option with the arrows while focus stays in the field", async () => {
      const user = userEvent.setup();
      renderCombobox();

      await user.click(field());
      await user.keyboard("{ArrowDown}{ArrowDown}");
      const [, brazil] = screen.getAllByRole("option");

      expect(field()).toHaveFocus();
      expect(field()).toHaveAttribute("aria-activedescendant", brazil.id);
      expect(brazil).toHaveClass("combobox__option--active");

      await user.keyboard("{ArrowUp}{ArrowUp}");
      expect(field()).toHaveAttribute("aria-activedescendant", screen.getAllByRole("option")[2].id);
    });

    it("opens on ArrowDown at the chosen option", async () => {
      const user = userEvent.setup();
      renderCombobox({ defaultValue: "cl" });

      await user.tab();
      await user.keyboard("{ArrowDown}");

      expect(screen.getByRole("option", { name: "Chile" })).toHaveAttribute("aria-selected", "true");
      expect(field()).toHaveAttribute("aria-activedescendant", screen.getByRole("option", { name: "Chile" }).id);
    });

    it("chooses the active option with Enter", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const onInputChange = vi.fn();
      renderCombobox({ onChange, onInputChange });

      await user.type(field(), "ar");
      await user.keyboard("{ArrowDown}{Enter}");

      expect(onChange).toHaveBeenCalledWith("ar");
      expect(onInputChange).toHaveBeenLastCalledWith("Argentina");
      expect(field()).toHaveValue("Argentina");
      expect(field()).toHaveAttribute("aria-expanded", "false");
    });

    it("chooses an option with a click and keeps focus in the field", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderCombobox({ onChange });

      await user.click(field());
      await user.click(screen.getByRole("option", { name: "Chile" }));

      expect(onChange).toHaveBeenCalledWith("cl");
      expect(field()).toHaveValue("Chile");
      expect(field()).toHaveFocus();
    });

    it("offers every option again while the field shows the chosen label", async () => {
      const user = userEvent.setup();
      renderCombobox({ defaultValue: "br" });

      await user.click(field());

      expect(options()).toEqual(["Argentina", "Brazil", "Chile"]);
    });

    it("keeps an exact match and restores the last choice for other text when it leaves", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderCombobox({ defaultValue: "ar", onChange });

      await user.clear(field());
      await user.type(field(), "chile");
      await user.tab();
      expect(onChange).toHaveBeenCalledWith("cl");
      expect(field()).toHaveValue("Chile");

      await user.clear(field());
      await user.type(field(), "Atlantis");
      await user.tab();
      expect(field()).toHaveValue("Chile");
      expect(onChange).toHaveBeenCalledOnce();
    });

    it("keeps typed text as the value with allowCustomValue", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderCombobox({ allowCustomValue: true, onChange });

      await user.type(field(), "Atlantis{Enter}");

      expect(onChange).toHaveBeenCalledWith("Atlantis");
      expect(field()).toHaveValue("Atlantis");
    });

    it("clears the value when the text is erased", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      renderCombobox({ defaultValue: "ar", onChange });

      await user.clear(field());
      await user.tab();

      expect(onChange).toHaveBeenCalledWith("");
    });

    it("closes on Escape and keeps the typed text", async () => {
      const user = userEvent.setup();
      renderCombobox();

      await user.type(field(), "b");
      await user.keyboard("{Escape}");

      expect(field()).toHaveAttribute("aria-expanded", "false");
      expect(field()).toHaveValue("b");
      expect(field()).toHaveFocus();
    });

    it("calls the caller's key, click and blur handlers", async () => {
      const user = userEvent.setup();
      const onKeyDown = vi.fn();
      const onClick = vi.fn();
      const onBlur = vi.fn();
      renderCombobox({ onKeyDown, onClick, onBlur });

      await user.click(field());
      await user.keyboard("a");
      await user.tab();

      expect(onClick).toHaveBeenCalledOnce();
      expect(onKeyDown).toHaveBeenCalled();
      expect(onBlur).toHaveBeenCalledOnce();
    });
  });

  describe("async results", () => {
    it("leaves filtering to the caller and reports the text", async () => {
      const user = userEvent.setup();
      const onInputChange = vi.fn();
      renderCombobox({ filter: false, onInputChange });

      await user.type(field(), "zz");

      expect(onInputChange).toHaveBeenLastCalledWith("zz");
      expect(options()).toEqual(["Argentina", "Brazil", "Chile"]);
    });

    it("works with controlled text and keeps the chosen label when results change", async () => {
      const user = userEvent.setup();
      const Search = () => {
        const [text, setText] = useState("");
        const results = OPTIONS.filter((option) => option.label.toLowerCase().startsWith(text.toLowerCase()));
        return (
          <Combobox label="Country" options={results} filter={false} inputValue={text} onInputChange={setText} />
        );
      };
      render(<><Search /><button type="button">Next</button></>);

      await user.type(field(), "b");
      await user.keyboard("{ArrowDown}{Enter}");
      await user.type(field(), "x");
      await user.tab();

      expect(field()).toHaveValue("Brazil");
    });

    it("shows a spinner, a busy list and the loading text", async () => {
      const user = userEvent.setup();
      const { container } = renderCombobox({ options: [], loading: true, loadingLabel: "Buscando…" });

      await user.type(field(), "a");

      expect(container.querySelector(".input__suffix .spinner")).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByRole("listbox")).toHaveAttribute("aria-busy", "true");
      expect(screen.getByRole("status")).toHaveTextContent("Buscando…");
    });

    it("says when nothing matches", async () => {
      const user = userEvent.setup();
      renderCombobox({ emptyLabel: "Sin resultados" });

      await user.type(field(), "zz");

      expect(screen.getByRole("status")).toHaveTextContent("Sin resultados");
    });
  });

  describe("edge cases", () => {
    it("shows the label of a value set from outside", () => {
      const { rerender } = render(<Combobox label="Country" options={OPTIONS} value="ar" />);

      rerender(<Combobox label="Country" options={OPTIONS} value="cl" />);

      expect(field()).toHaveValue("Chile");
    });

    it("does not open when disabled or read only", async () => {
      const user = userEvent.setup();
      const { rerender } = render(<Combobox label="Country" options={OPTIONS} readonly />);

      await user.click(field());
      await user.keyboard("{ArrowDown}");
      expect(field()).toHaveAttribute("aria-expanded", "false");

      rerender(<Combobox label="Country" options={OPTIONS} disabled />);
      expect(field()).toBeDisabled();
    });

    it("forwards its part classes and styles", async () => {
      const user = userEvent.setup();
      const { container } = renderCombobox({
        className: "app-field",
        listClassName: "app-list",
        listStyle: { maxHeight: 120 },
        optionClassName: "app-option",
        optionStyle: { fontWeight: 700 },
        statusClassName: "app-status",
        statusStyle: { opacity: 0.8 },
      });

      await user.type(field(), "a");
      expect(container.querySelector(".input__wrapper")).toHaveClass("combobox", "app-field");
      expect(document.querySelector(".select__popover")).toHaveClass("combobox__list", "app-list");
      expect(document.querySelector(".select__popover")).toHaveStyle({ maxHeight: "120px" });
      expect(screen.getAllByRole("option")[0]).toHaveClass("select__option", "app-option");
      expect(screen.getAllByRole("option")[0]).toHaveStyle({ fontWeight: "700" });

      await user.type(field(), "zzz");
      expect(screen.getByRole("status")).toHaveClass("combobox__status", "app-status");
      expect(screen.getByRole("status")).toHaveStyle({ opacity: "0.8" });
    });

    it("types its value as text", () => {
      // @ts-expect-error Combobox is a text field; it has no numeric type.
      renderCombobox({ type: "number" });

      expect(field()).toBeInTheDocument();
    });
  });
});
