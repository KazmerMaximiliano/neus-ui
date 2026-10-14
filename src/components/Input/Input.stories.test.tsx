import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentType } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Input as InputStory } from "./Input.stories";
import type { InputStoryArgs } from "./Input.types";

const { updateArgs } = vi.hoisted(() => ({ updateArgs: vi.fn() }));
vi.mock("storybook/preview-api", () => ({ useArgs: () => [{}, updateArgs] }));

const Preview = InputStory.render as ComponentType<InputStoryArgs>;

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Input story controls", () => {
  it("keeps fast typing while earlier argument updates are acknowledged", async () => {
    const onChange = vi.fn();
    const args: InputStoryArgs = {
      designSystem: "neus",
      label: "Name",
      value: "",
      onChange,
    };
    const view = render(<Preview {...args} />);
    const input = screen.getByRole("textbox", { name: "Name" });
    await userEvent.type(input, "ABC");
    expect(input).toHaveValue("ABC");
    expect(onChange).toHaveBeenLastCalledWith("ABC");
    expect(updateArgs).toHaveBeenLastCalledWith({ value: "ABC" });
    view.rerender(<Preview {...args} value="A" />);
    expect(input).toHaveValue("ABC");
    view.rerender(<Preview {...args} value="AB" />);
    expect(input).toHaveValue("ABC");
    view.rerender(<Preview {...args} value="ABC" />);
    expect(input).toHaveValue("ABC");
    view.rerender(<Preview {...args} value="From controls" />);
    expect(input).toHaveValue("From controls");
    await userEvent.clear(input);
    expect(input).toHaveValue("");
    expect(updateArgs).toHaveBeenLastCalledWith({ value: "" });
  });

  it("accepts numeric control values", () => {
    const view = render(
      <Preview designSystem="carbon" label="Amount" type="number" value={0} />,
    );
    const input = screen.getByRole("spinbutton", { name: "Amount" });
    expect(input).toHaveValue(0);
    view.rerender(
      <Preview designSystem="carbon" label="Amount" type="number" value={42} />,
    );
    expect(input).toHaveValue(42);
  });

  it("keeps uncontrolled edits without publishing a value argument", async () => {
    const view = render(
      <Preview designSystem="apple" label="Name" defaultValue="A" />,
    );
    const input = screen.getByRole("textbox", { name: "Name" });
    await userEvent.type(input, "B");
    expect(input).toHaveValue("AB");
    expect(updateArgs).not.toHaveBeenCalled();
    view.rerender(
      <Preview designSystem="apple" label="Name" defaultValue="Replacement" />,
    );
    expect(input).toHaveValue("AB");
  });

  it("remounts the field when switching controlled and uncontrolled previews", () => {
    const view = render(
      <Preview designSystem="neus" label="Name" value="Controlled" />,
    );
    const first = screen.getByRole("textbox", { name: "Name" });
    view.rerender(
      <Preview designSystem="neus" label="Name" defaultValue="Default" />,
    );
    const second = screen.getByRole("textbox", { name: "Name" });
    expect(second).not.toBe(first);
    expect(second).toHaveValue("Default");
    view.rerender(
      <Preview designSystem="neus" label="Name" value="New control" />,
    );
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue(
      "New control",
    );
  });
});
