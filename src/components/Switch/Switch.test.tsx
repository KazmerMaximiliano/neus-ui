import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Switch } from "./Switch";
import * as stories from "./Switch.stories";

afterEach(cleanup);

const { Switch: SwitchStory } = composeStories(stories);

describe("Switch", () => {
  describe("rendering", () => {
    it("renders an unchecked switch named by its label", () => {
      const { container } = render(<Switch label="Wi-Fi" />);
      const control = screen.getByRole("switch", { name: "Wi-Fi" });

      expect(control).not.toBeChecked();
      expect(control).toHaveAttribute("type", "checkbox");
      expect(container.querySelector(".switch__track")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(
        container.querySelector(".switch__track .switch__thumb"),
      ).toBeInTheDocument();
    });

    it("announces the description apart from the name, after the caller's ids", () => {
      render(
        <Switch
          label="Wi-Fi"
          description="Joins known networks."
          aria-describedby="hint"
        />,
      );
      const control = screen.getByRole("switch", { name: "Wi-Fi" });
      const description = screen.getByText("Joins known networks.");

      expect(description).toHaveClass("field__description");
      expect(control).toHaveAttribute(
        "aria-describedby",
        `hint ${description.id}`,
      );
    });

    it("is named by aria-label or aria-labelledby without a visible label", () => {
      const { rerender } = render(<Switch aria-label="Dark mode" />);
      expect(
        screen.getByRole("switch", { name: "Dark mode" }),
      ).toBeInTheDocument();

      rerender(
        <>
          <span id="row">Dark mode</span>
          <Switch aria-labelledby="row" />
        </>,
      );
      expect(
        screen.getByRole("switch", { name: "Dark mode" }),
      ).not.toHaveAttribute("aria-describedby");
    });

    it("starts from defaultChecked", () => {
      render(<Switch label="Wi-Fi" defaultChecked />);

      expect(screen.getByRole("switch", { name: "Wi-Fi" })).toBeChecked();
    });

    it("renders its story", () => {
      render(<SwitchStory />);

      expect(
        screen.getByRole("switch", { name: "Email notifications" }),
      ).toHaveAccessibleDescription("A summary of the week, every Monday.");
    });
  });

  describe("interactions", () => {
    it("toggles from the label, the track and the keyboard", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { container } = render(
        <Switch label="Wi-Fi" onChange={onChange} />,
      );
      const control = screen.getByRole("switch", { name: "Wi-Fi" });

      await user.click(screen.getByText("Wi-Fi"));
      expect(control).toBeChecked();
      expect(onChange).toHaveBeenLastCalledWith(true);
      await user.click(container.querySelector(".switch__track")!);
      expect(onChange).toHaveBeenLastCalledWith(false);
      await user.keyboard(" ");
      expect(control).toBeChecked();
      expect(onChange).toHaveBeenCalledTimes(3);
    });

    it("keeps a controlled state owned by the consumer", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      const { rerender } = render(
        <Switch label="Wi-Fi" checked={false} onChange={onChange} />,
      );
      const control = screen.getByRole("switch", { name: "Wi-Fi" });

      await user.click(control);
      expect(onChange).toHaveBeenCalledWith(true);
      expect(control).not.toBeChecked();
      rerender(<Switch label="Wi-Fi" checked onChange={onChange} />);
      expect(control).toBeChecked();
    });

    it("ignores clicks while disabled", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Switch label="Wi-Fi" disabled onChange={onChange} />);
      const control = screen.getByRole("switch", { name: "Wi-Fi" });

      await user.click(screen.getByText("Wi-Fi"));

      expect(control).toBeDisabled();
      expect(control).not.toBeChecked();
      expect(onChange).not.toHaveBeenCalled();
    });

    it("submits its value with the form only while on", async () => {
      const user = userEvent.setup();
      const submit = vi.fn();
      render(
        <form
          onSubmit={(event) => {
            event.preventDefault();
            submit(new FormData(event.currentTarget).get("alerts"));
          }}
        >
          <Switch name="alerts" value="weekly" label="Alerts" />
          <button type="submit">Save</button>
        </form>,
      );

      await user.click(screen.getByRole("button", { name: "Save" }));
      expect(submit).toHaveBeenLastCalledWith(null);
      await user.click(screen.getByRole("switch", { name: "Alerts" }));
      await user.click(screen.getByRole("button", { name: "Save" }));
      expect(submit).toHaveBeenLastCalledWith("weekly");
    });
  });

  describe("customization", () => {
    it("forwards native attributes and the ref to the input", () => {
      const ref = createRef<HTMLInputElement>();
      render(
        <Switch
          ref={ref}
          label="Wi-Fi"
          id="wifi"
          required
          data-testid="wifi"
        />,
      );
      const control = screen.getByRole("switch", { name: "Wi-Fi" });

      expect(ref.current).toBe(control);
      expect(control).toHaveAttribute("id", "wifi");
      expect(control).toBeRequired();
      expect(control).toHaveAttribute("data-testid", "wifi");
    });

    it.each([
      ["className", "style", "switch"],
      ["labelClassName", "labelStyle", "switch__label"],
      ["trackClassName", "trackStyle", "switch__track"],
      ["thumbClassName", "thumbStyle", "switch__thumb"],
      ["descriptionClassName", "descriptionStyle", "field__description"],
    ])("applies and removes %s and %s on .%s", (classProp, styleProp, base) => {
      const props = { label: "Wi-Fi", description: "Joins known networks." };
      const { container, rerender } = render(
        <Switch
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
      rerender(<Switch {...props} />);
      expect(container.querySelector(".consumer-part")).toBeNull();
      expect(part.style.outlineOffset).toBe("");
    });

    it("keeps optional parts absent even when their hooks are supplied", () => {
      const { container } = render(
        <Switch
          aria-label="Wi-Fi"
          labelStyle={{ color: "red" }}
          descriptionStyle={{ color: "red" }}
        />,
      );

      expect(container.querySelector(".switch__label")).toBeNull();
      expect(container.querySelector(".field__description")).toBeNull();
    });

    it("rejects attributes that clash with its own API", () => {
      void (
        <Switch
          // @ts-expect-error Switch reports the checked state, not the change event.
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => event}
        />
      );
      // @ts-expect-error The switch is always a checkbox.
      void (<Switch type="radio" />);
      // @ts-expect-error The role is always switch.
      void (<Switch role="checkbox" />);
    });
  });
});
