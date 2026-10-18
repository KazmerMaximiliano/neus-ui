import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { StackProps } from "../../index";
import { Stack } from "../../index";
import * as stories from "./Stack.stories";

afterEach(cleanup);

const { Stack: StackStory } = composeStories(stories);

describe("Stack", () => {
  it("renders a div without inline styles when the defaults apply", () => {
    const { container } = render(<Stack>Item</Stack>);
    const stack = container.firstElementChild as HTMLElement;
    expect(stack.tagName).toBe("DIV");
    expect(stack).toHaveClass("stack");
    expect(stack).not.toHaveAttribute("style");
    expect(stack).not.toHaveAttribute("data-wrap");
  });

  it("writes every breakpoint of direction and gap as custom properties", () => {
    const { container } = render(<Stack direction={{ base: "column", md: "row" }} gap={{ base: 0, lg: 8 }} />);
    const { style } = container.firstElementChild as HTMLElement;
    expect(style.getPropertyValue("--stack-direction")).toBe("column");
    expect(style.getPropertyValue("--stack-direction-md")).toBe("row");
    expect(style.getPropertyValue("--stack-direction-lg")).toBe("row");
    expect(style.getPropertyValue("--stack-gap")).toBe("0px");
    expect(style.getPropertyValue("--stack-gap-md")).toBe("0px");
    expect(style.getPropertyValue("--stack-gap-lg")).toBe("var(--space-8)");
  });

  it("renders lists, alignment, wrapping, native props, classes, styles and refs", () => {
    const ref = createRef<HTMLUListElement>();
    render(
      <Stack as="ul" ref={ref} aria-label="Plans" align="center" justify="between" wrap className="custom" style={{ color: "red" }}>
        <li>Basic</li>
      </Stack>,
    );
    const list = screen.getByRole("list", { name: "Plans" });
    expect(ref.current).toBe(list);
    expect(list).toHaveAttribute("data-align", "center");
    expect(list).toHaveAttribute("data-justify", "between");
    expect(list).toHaveAttribute("data-wrap");
    expect(list).toHaveClass("stack", "custom");
    expect(list).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("renders its story", () => {
    render(<StackStory />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("types steps, directions and elements", () => {
    expectTypeOf<StackProps<"ul">>().toHaveProperty("ref");
    // @ts-expect-error gaps are steps of the space scale
    void (<Stack gap={5} />);
    // @ts-expect-error breakpoints are base, md and lg
    void (<Stack direction={{ base: "row", xl: "column" }} />);
  });
});
