import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Separator } from "./Separator";
import * as stories from "./Separator.stories";

afterEach(cleanup);

const { Separator: SeparatorStory } = composeStories(stories);

describe("Separator", () => {
  it("is a horizontal separator by default", () => {
    render(<Separator />);
    const line = screen.getByRole("separator");

    expect(line).toHaveClass("separator");
    expect(line).toHaveAttribute("data-orientation", "horizontal");
    expect(line).not.toHaveAttribute("aria-orientation");
  });

  it("says when it runs down a row", () => {
    render(<Separator orientation="vertical" />);

    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("leaves the accessibility tree when it only decorates", () => {
    const { container } = render(<Separator orientation="vertical" decorative />);

    expect(screen.queryByRole("separator")).not.toBeInTheDocument();
    expect(container.firstElementChild).toHaveAttribute("role", "none");
    expect(container.firstElementChild).not.toHaveAttribute("aria-orientation");
  });

  it("forwards classes, styles, native attributes and the ref", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Separator ref={ref} className="extra" style={{ outlineOffset: "7px" }} data-testid="line" />);

    expect(ref.current).toBe(screen.getByTestId("line"));
    expect(ref.current).toHaveClass("separator", "extra");
    expect(ref.current).toHaveStyle({ outlineOffset: "7px" });
  });

  it("renders its story", () => {
    render(<SeparatorStory />);

    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("rejects children and its own role", () => {
    // @ts-expect-error A separator has no content.
    void (<Separator>Text</Separator>);
    // @ts-expect-error The role follows decorative.
    void (<Separator role="presentation" />);
  });
});
