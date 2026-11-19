import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { FormField } from "./FormField";
import * as stories from "./FormField.stories";
import type { FormFieldProps } from "./FormField.types";

afterEach(cleanup);

const { FormField: FormFieldStory } = composeStories(stories);

const renderField = (props: Partial<FormFieldProps> = {}) =>
  render(
    <FormField label="Avatar" {...props}>
      {(control) => <input type="file" {...control} />}
    </FormField>,
  );

describe("FormField", () => {
  describe("rendering", () => {
    it("names the control with its label, by for and by aria-labelledby", () => {
      renderField();
      const control = screen.getByLabelText("Avatar");
      const label = screen.getByText("Avatar");

      expect(label.tagName).toBe("LABEL");
      expect(label).toHaveAttribute("for", control.id);
      expect(control).toHaveAttribute("aria-labelledby", label.id);
      expect(control).not.toHaveAttribute("aria-describedby");
      expect(control).not.toHaveAttribute("aria-invalid");
    });

    it("uses the given id for the control", () => {
      renderField({ id: "avatar" });

      expect(screen.getByLabelText("Avatar")).toHaveAttribute("id", "avatar");
      expect(screen.getByText("Avatar")).toHaveAttribute("id", "avatar-label");
    });

    it("announces the description and the error with the control", () => {
      renderField({ description: "PNG or JPG, up to 2 MB.", error: "The file is too large." });
      const control = screen.getByLabelText("Avatar");
      const description = screen.getByText("PNG or JPG, up to 2 MB.");
      const error = screen.getByText("The file is too large.");

      expect(control).toHaveAttribute("aria-describedby", `${description.id} ${error.id}`);
      expect(control).toHaveAttribute("aria-invalid", "true");
      expect(description).toHaveClass("field__description");
      expect(error).toHaveClass("form-field__error");
      expect(screen.getByText("Avatar").closest(".form-field")).toHaveClass("form-field--invalid");
    });

    it("marks a required field with a hidden asterisk and aria-required", () => {
      renderField({ required: true });

      expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByLabelText(/Avatar/)).toHaveAttribute("aria-required", "true");
    });

    it("disables the control and dims the label", () => {
      renderField({ disabled: true });

      expect(screen.getByLabelText("Avatar")).toBeDisabled();
      expect(screen.getByText("Avatar").closest(".form-field")).toHaveClass("form-field--disabled");
    });

    it("names a control that is not labelable through aria-labelledby", () => {
      render(
        <FormField label="Rating">
          {(control) => <div role="slider" aria-valuenow={3} tabIndex={0} {...control} />}
        </FormField>,
      );

      expect(screen.getByRole("slider", { name: "Rating" })).toBeInTheDocument();
    });

    it("renders its story, a star rating named by the label", async () => {
      const user = userEvent.setup();
      render(<FormFieldStory />);

      expect(screen.getByRole("radiogroup", { name: "Rating" })).toHaveAccessibleDescription("How was your stay?");
      await user.click(screen.getByRole("radio", { name: "4 stars" }));
      expect(screen.getByRole("radio", { name: "4 stars" })).toBeChecked();
    });
  });

  describe("interactions", () => {
    it("focuses the control when the label is clicked", async () => {
      const user = userEvent.setup();
      render(
        <FormField label="Nickname">{(control) => <input {...control} />}</FormField>,
      );

      await user.click(screen.getByText("Nickname"));

      expect(screen.getByRole("textbox", { name: "Nickname" })).toHaveFocus();
    });
  });

  describe("customization", () => {
    it.each([
      ["className", "style", "form-field"],
      ["labelClassName", "labelStyle", "form-field__label"],
      ["requiredClassName", "requiredStyle", "form-field__required"],
      ["descriptionClassName", "descriptionStyle", "field__description"],
      ["errorClassName", "errorStyle", "form-field__error"],
    ])("applies and removes %s and %s on .%s", (classProp, styleProp, base) => {
      const props = { required: true, description: "Help.", error: "Wrong." };
      const control = (field: object) => <input {...field} />;
      const { container, rerender } = render(
        <FormField label="Name" {...props} {...{ [classProp]: "consumer-part", [styleProp]: { outlineOffset: "7px" } }}>
          {control}
        </FormField>,
      );
      const part = container.querySelector<HTMLElement>(".consumer-part")!;

      expect(part).toHaveClass(base);
      expect(part).toHaveStyle({ outlineOffset: "7px" });
      rerender(<FormField label="Name" {...props}>{control}</FormField>);
      expect(container.querySelector(".consumer-part")).toBeNull();
      expect(part.style.outlineOffset).toBe("");
    });

    it("keeps optional parts absent", () => {
      const { container } = renderField({ requiredStyle: { color: "red" }, errorStyle: { color: "red" } });

      expect(container.querySelector(".form-field__required")).toBeNull();
      expect(container.querySelector(".form-field__error")).toBeNull();
      expect(container.querySelector(".field__description")).toBeNull();
    });

    it("rejects children that are not a render function", () => {
      // @ts-expect-error The control needs the ids FormField hands it.
      void (<FormField label="Name"><input /></FormField>);
    });
  });
});
