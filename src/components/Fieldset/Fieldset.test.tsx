import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Fieldset } from "./Fieldset";
import * as stories from "./Fieldset.stories";
import type { FieldsetProps } from "./Fieldset.types";

afterEach(cleanup);

const { Fieldset: FieldsetStory } = composeStories(stories);

const renderFieldset = (props: Partial<FieldsetProps> = {}) =>
  render(
    <Fieldset label="Shipping address" {...props}>
      <label>
        Street <input name="street" />
      </label>
      <label>
        City <input name="city" />
      </label>
    </Fieldset>,
  );

describe("Fieldset", () => {
  describe("rendering", () => {
    it("renders a group named by its legend around the controls", () => {
      renderFieldset();
      const group = screen.getByRole("group", { name: "Shipping address" });

      expect(group.tagName).toBe("FIELDSET");
      expect(group.querySelector("legend")).toHaveClass("fieldset__label");
      expect(screen.getAllByRole("textbox")).toHaveLength(2);
      expect(group).not.toHaveAttribute("aria-describedby");
    });

    it("announces the description and the error after the caller's ids", () => {
      renderFieldset({ description: "Where we send the order.", error: "Enter a city.", "aria-describedby": "hint" });
      const group = screen.getByRole("group", { name: "Shipping address" });
      const description = screen.getByText("Where we send the order.");
      const error = screen.getByText("Enter a city.");

      expect(group).toHaveAttribute("aria-describedby", `hint ${description.id} ${error.id}`);
      expect(group).toHaveClass("fieldset--invalid");
      expect(description).toHaveClass("field__description");
      expect(error).toHaveClass("fieldset__error");
    });

    it("shows a hidden asterisk on the legend when required", () => {
      renderFieldset({ required: true });

      expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByRole("group", { name: "Shipping address" })).toBeInTheDocument();
    });

    it("is named by aria-label without a legend", () => {
      render(
        <Fieldset aria-label="Filters" required>
          <input aria-label="Search" />
        </Fieldset>,
      );

      expect(screen.getByRole("group", { name: "Filters" })).toBeInTheDocument();
      expect(document.querySelector("legend")).toBeNull();
    });

    it("takes the role it is given", () => {
      renderFieldset({ role: "radiogroup" });

      expect(screen.getByRole("radiogroup", { name: "Shipping address" })).toBeInTheDocument();
    });

    it("renders its story", () => {
      render(<FieldsetStory />);

      expect(screen.getByRole("group", { name: "Notifications" })).toHaveAccessibleDescription(
        "Choose where we let you know about new orders.",
      );
      expect(screen.getByRole("switch", { name: "Email" })).toBeChecked();
    });
  });

  describe("interactions", () => {
    it("disables every control through the native fieldset", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <Fieldset label="Contact" disabled>
          <input aria-label="Email" onChange={onChange} />
        </Fieldset>,
      );

      await user.type(screen.getByRole("textbox", { name: "Email" }), "a");

      expect(screen.getByRole("group")).toBeDisabled();
      expect(screen.getByRole("textbox", { name: "Email" })).toBeDisabled();
      expect(onChange).not.toHaveBeenCalled();
    });

    it("submits its controls with the form", async () => {
      const user = userEvent.setup();
      const submit = vi.fn();
      render(
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(new FormData(event.currentTarget).get("city"));
          }}
        >
          <Fieldset label="Address">
            <input aria-label="City" name="city" />
          </Fieldset>
          <button type="submit">Save</button>
        </form>,
      );

      await user.type(screen.getByRole("textbox", { name: "City" }), "Lyon");
      await user.click(screen.getByRole("button", { name: "Save" }));

      expect(submit).toHaveBeenCalledWith("Lyon");
    });
  });

  describe("customization", () => {
    it("forwards native attributes and the ref to the fieldset", () => {
      const ref = createRef<HTMLFieldSetElement>();
      renderFieldset({ ref, id: "address", name: "address", "data-testid": "address" } as Partial<FieldsetProps>);

      expect(ref.current).toBe(screen.getByRole("group"));
      expect(ref.current).toHaveAttribute("id", "address");
      expect(ref.current).toHaveAttribute("name", "address");
      expect(ref.current).toHaveAttribute("data-testid", "address");
    });

    it.each([
      ["className", "style", "fieldset"],
      ["labelClassName", "labelStyle", "fieldset__label"],
      ["requiredClassName", "requiredStyle", "fieldset__required"],
      ["descriptionClassName", "descriptionStyle", "field__description"],
      ["contentClassName", "contentStyle", "fieldset__content"],
      ["errorClassName", "errorStyle", "fieldset__error"],
    ])("applies and removes %s and %s on .%s", (classProp, styleProp, base) => {
      const props = { required: true, description: "Help.", error: "Wrong." };
      const { container, rerender } = render(
        <Fieldset label="Address" {...props} {...{ [classProp]: "consumer-part", [styleProp]: { outlineOffset: "7px" } }}>
          <input aria-label="City" />
        </Fieldset>,
      );
      const part = container.querySelector<HTMLElement>(".consumer-part")!;

      expect(part).toHaveClass(base);
      expect(part).toHaveStyle({ outlineOffset: "7px" });
      rerender(
        <Fieldset label="Address" {...props}>
          <input aria-label="City" />
        </Fieldset>,
      );
      expect(container.querySelector(".consumer-part")).toBeNull();
      expect(part.style.outlineOffset).toBe("");
    });

    it("keeps optional parts absent even when their hooks are supplied", () => {
      const { container } = render(
        <Fieldset aria-label="Filters" labelStyle={{ color: "red" }} errorStyle={{ color: "red" }}>
          <input aria-label="Search" />
        </Fieldset>,
      );

      expect(container.querySelector(".fieldset__label")).toBeNull();
      expect(container.querySelector(".fieldset__error")).toBeNull();
      expect(container.querySelector(".field__description")).toBeNull();
    });

    it("rejects attributes that clash with its own API", () => {
      // @ts-expect-error The disabled state is a boolean.
      void (<Fieldset disabled="yes">{null}</Fieldset>);
      // @ts-expect-error Fieldset needs the controls it groups.
      void (<Fieldset label="Empty" />);
    });
  });
});
