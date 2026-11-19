import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Textarea } from "./Textarea";
import * as stories from "./Textarea.stories";

afterEach(cleanup);

const { Textarea: TextareaStory } = composeStories(stories);

describe("Textarea", () => {
  describe("rendering", () => {
    it("renders a labelled multi-line field with three rows by default", () => {
      render(<Textarea label="Message" />);
      const field = screen.getByRole("textbox", { name: "Message" });

      expect(field.tagName).toBe("TEXTAREA");
      expect(field).toHaveClass("textarea");
      expect(field).toHaveAttribute("rows", "3");
      expect(field.style.getPropertyValue("--textarea-rows")).toBe("3");
      expect(field.style.getPropertyValue("--textarea-max-rows")).toBe("");
      expect(field).toHaveAttribute("placeholder", " ");
      expect(field.closest(".textarea__wrapper")).toHaveAttribute(
        "data-variant",
        "auto",
      );
    });

    it("passes rows, maxRows and autoResize to the field", () => {
      render(
        <Textarea
          label="Notes"
          rows={2}
          maxRows={6}
          autoResize
          placeholder="Gate code, floor"
        />,
      );
      const field = screen.getByRole("textbox", { name: "Notes" });

      expect(field).toHaveAttribute("rows", "2");
      expect(field.style.getPropertyValue("--textarea-rows")).toBe("2");
      expect(field.style.getPropertyValue("--textarea-max-rows")).toBe("6");
      expect(field).toHaveClass("textarea--auto-resize");
      expect(field).toHaveAttribute("placeholder", "Gate code, floor");
    });

    it("applies the field presentation", () => {
      render(
        <Textarea
          label="Bio"
          variant="filled"
          labelPlacement="floating"
          size="large"
        />,
      );
      const wrapper = screen
        .getByRole("textbox", { name: "Bio" })
        .closest(".textarea__wrapper")!;

      expect(wrapper).toHaveClass("field-presentation");
      expect(wrapper).toHaveAttribute("data-variant", "filled");
      expect(wrapper).toHaveAttribute("data-label-placement", "floating");
      expect(wrapper).toHaveAttribute("data-size", "large");
    });

    it("marks required fields with a hidden asterisk and the native attribute", () => {
      render(<Textarea label="Message" required />);

      expect(screen.getByRole("textbox", { name: "Message" })).toBeRequired();
      expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
    });

    it("names a field without a visible label", () => {
      render(<Textarea aria-label="Reply" />);

      expect(
        screen.getByRole("textbox", { name: "Reply" }),
      ).toBeInTheDocument();
      expect(document.querySelector("label")).toBeNull();
    });

    it("renders its story", () => {
      render(<TextareaStory />);

      expect(
        screen.getByRole("textbox", { name: "Message" }),
      ).toHaveAccessibleDescription(
        "Tell us what you need; we reply within a day.",
      );
    });
  });

  describe("notched outline", () => {
    it("wraps the textarea and its hidden outline in a control", () => {
      const { container } = render(<Textarea label="Message" />);
      const control = container.querySelector(".textarea__control")!;

      expect(control.querySelector("textarea")).toBe(screen.getByRole("textbox", { name: "Message" }));
      expect(control.querySelector(".field__outline")).toHaveAttribute("aria-hidden", "true");
      expect(control.querySelector(".field__notch")).toHaveAttribute("data-label", "Message");
      expect(control.querySelector(".field__notch")).not.toHaveAttribute("data-required");
    });
  });

  describe("description and errors", () => {
    it("announces the description, the error and the caller's ids", () => {
      const { rerender } = render(
        <Textarea
          id="message"
          label="Message"
          description="Up to 500 characters."
          aria-describedby="hint"
        />,
      );
      const field = screen.getByRole("textbox", { name: "Message" });

      expect(field).toHaveAttribute(
        "aria-describedby",
        "hint message-description",
      );
      rerender(
        <Textarea
          id="message"
          label="Message"
          description="Up to 500 characters."
          error="Write a message."
        />,
      );
      expect(field).toHaveAccessibleDescription(
        "Up to 500 characters. Write a message.",
      );
      expect(field).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByText("Message")).toHaveClass("textarea__label--error");
      expect(screen.getByText("Write a message.")).toHaveClass(
        "textarea__error-message",
      );
      rerender(<Textarea id="message" label="Message" />);
      expect(field).not.toHaveAttribute("aria-describedby");
      expect(field).not.toHaveAttribute("aria-invalid");
    });
  });

  describe("interactions", () => {
    it("reports the text on every edit, with line breaks", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Textarea label="Message" onChange={onChange} />);

      await user.type(
        screen.getByRole("textbox", { name: "Message" }),
        "Hi{Enter}there",
      );

      expect(onChange).toHaveBeenLastCalledWith("Hi\nthere");
    });

    it("keeps controlled values owned by the consumer", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { rerender } = render(
        <Textarea label="Message" value="A" onChange={onChange} />,
      );
      const field = screen.getByRole("textbox", { name: "Message" });

      await user.type(field, "B");
      expect(onChange).toHaveBeenLastCalledWith("AB");
      expect(field).toHaveValue("A");
      rerender(<Textarea label="Message" value="AB" onChange={onChange} />);
      expect(field).toHaveValue("AB");
    });

    it("submits its text with the form", async () => {
      const user = userEvent.setup();
      const submit = vi.fn();
      render(
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(new FormData(event.currentTarget).get("message"));
          }}
        >
          <Textarea name="message" label="Message" defaultValue="Hello" />
          <button type="submit">Send</button>
        </form>,
      );

      await user.click(screen.getByRole("button", { name: "Send" }));

      expect(submit).toHaveBeenCalledWith("Hello");
    });

    it.each(["disabled", "readonly"] as const)(
      "prevents edits when %s",
      async (state) => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(
          <Textarea
            label="Message"
            defaultValue="Original"
            {...{ [state]: true }}
            onChange={onChange}
          />,
        );
        const field = screen.getByRole("textbox", { name: "Message" });

        await user.type(field, "X");

        expect(field).toHaveValue("Original");
        expect(onChange).not.toHaveBeenCalled();
        expect(field).toHaveAttribute(
          state === "disabled" ? "disabled" : "readonly",
        );
      },
    );

    it("dims the label of a disabled field", () => {
      render(<Textarea label="Message" disabled />);

      expect(screen.getByText("Message")).toHaveClass(
        "textarea__label--disabled",
      );
    });
  });

  describe("customization", () => {
    it("forwards native attributes and the ref", () => {
      const ref = createRef<HTMLTextAreaElement>();
      render(
        <Textarea
          ref={ref}
          label="Message"
          maxLength={500}
          spellCheck={false}
          data-testid="message"
        />,
      );
      const field = screen.getByTestId("message");

      expect(ref.current).toBe(field);
      expect(field).toHaveAttribute("maxlength", "500");
      expect(field).toHaveAttribute("spellcheck", "false");
    });

    it.each([
      ["className", "wrapperStyle", "textarea__wrapper"],
      ["labelClassName", "labelStyle", "textarea__label"],
      ["requiredClassName", "requiredStyle", "textarea__required"],
      ["textareaClassName", "textareaStyle", "textarea"],
      ["descriptionClassName", "descriptionStyle", "field__description"],
      ["errorClassName", "errorStyle", "textarea__error-message"],
    ])("applies and removes %s and %s on .%s", (classProp, styleProp, base) => {
      const props = {
        label: "Message",
        required: true,
        description: "Help",
        error: "Invalid",
      };
      const { container, rerender } = render(
        <Textarea
          {...props}
          {...{
            [classProp]: "consumer-part",
            [styleProp]: { outlineOffset: "7px" },
          }}
        />,
      );
      const part = container.querySelector<HTMLElement>(".consumer-part")!;

      expect(part).toHaveClass(base);
      expect(part).toHaveStyle({ outlineOffset: "7px" });
      rerender(<Textarea {...props} />);
      expect(container.querySelector(".consumer-part")).toBeNull();
      expect(part.style.outlineOffset).toBe("");
    });

    it("keeps the line counts when a textarea style is given", () => {
      render(
        <Textarea
          label="Message"
          maxRows={5}
          textareaStyle={{ color: "red" }}
        />,
      );
      const field = screen.getByRole("textbox", { name: "Message" });

      expect(field.style.getPropertyValue("--textarea-max-rows")).toBe("5");
      expect(field).toHaveStyle({ color: "rgb(255, 0, 0)" });
    });

    it("keeps optional parts absent even when their hooks are supplied", () => {
      const { container } = render(
        <Textarea
          required
          labelStyle={{ color: "red" }}
          requiredStyle={{ color: "red" }}
          errorStyle={{ color: "red" }}
        />,
      );

      expect(container.querySelector("label")).toBeNull();
      expect(container.querySelector(".textarea__required")).toBeNull();
      expect(container.querySelector(".textarea__error-message")).toBeNull();
    });

    it("rejects attributes that clash with its own API", () => {
      void (
        <Textarea
          // @ts-expect-error Textarea reports the text, not the change event.
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => event}
        />
      );
      // @ts-expect-error Use readonly, Textarea's own prop.
      void (<Textarea readOnly />);
      // @ts-expect-error The text is value or defaultValue.
      void (<Textarea>Hello</Textarea>);
    });
  });
});
