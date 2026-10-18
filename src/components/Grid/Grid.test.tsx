import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { GridProps } from "../../index";
import { Grid } from "../../index";
import * as stories from "./Grid.stories";

afterEach(cleanup);

const { Grid: GridStory } = composeStories(stories);

describe("Grid", () => {
  it("leaves the default 1, 2 and 3 columns to the stylesheet", () => {
    const { container } = render(<Grid />);
    const grid = container.firstElementChild as HTMLElement;
    expect(grid.tagName).toBe("DIV");
    expect(grid).toHaveClass("grid");
    expect(grid).not.toHaveAttribute("style");
    expect(grid).not.toHaveAttribute("data-auto");
  });

  it("writes columns and gap for every breakpoint", () => {
    const { container } = render(<Grid columns={{ base: 2, lg: 4 }} gap={8} />);
    const { style } = container.firstElementChild as HTMLElement;
    expect(style.getPropertyValue("--grid-columns")).toBe("2");
    expect(style.getPropertyValue("--grid-columns-md")).toBe("2");
    expect(style.getPropertyValue("--grid-columns-lg")).toBe("4");
    expect(style.getPropertyValue("--grid-gap-lg")).toBe("var(--space-8)");
  });

  it("switches to auto-fit with minItemWidth and ignores columns", () => {
    const { container } = render(<Grid minItemWidth="14rem" columns={4} />);
    const grid = container.firstElementChild as HTMLElement;
    expect(grid).toHaveAttribute("data-auto");
    expect(grid.style.getPropertyValue("--grid-min-item-width")).toBe("14rem");
    expect(grid.style.getPropertyValue("--grid-columns")).toBe("");
  });

  it("renders lists, native props, classes, styles and refs", () => {
    const ref = createRef<HTMLOListElement>();
    render(
      <Grid as="ol" ref={ref} aria-label="Steps" className="custom" style={{ color: "red" }}>
        <li>One</li>
      </Grid>,
    );
    const list = screen.getByRole("list", { name: "Steps" });
    expect(ref.current).toBe(list);
    expect(list).toHaveClass("grid", "custom");
    expect(list).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("renders its story as a list of cards", () => {
    render(<GridStory />);
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("types columns and elements", () => {
    expectTypeOf<GridProps<"ul">>().toHaveProperty("ref");
    // @ts-expect-error columns are counts
    void (<Grid columns="3" />);
    // @ts-expect-error a grid is not a span
    void (<Grid as="span" />);
  });
});
