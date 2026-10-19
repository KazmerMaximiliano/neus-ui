import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { FeatureListProps } from "../../sections";
import { FeatureItem, FeatureList } from "../../sections";
import * as stories from "./FeatureList.stories";

afterEach(cleanup);

const { FeatureList: FeatureListStory } = composeStories(stories);

describe("FeatureList", () => {
  it("renders a grid list of items at the default columns", () => {
    render(<FeatureList aria-label="Services"><FeatureItem title="A" /><FeatureItem title="B" /></FeatureList>);
    const list = screen.getByRole("list", { name: "Services" });
    expect(list).toHaveClass("grid", "feature-list");
    expect(list).toHaveAttribute("data-variant", "grid");
    expect(list.style.getPropertyValue("--grid-columns")).toBe("");
    expect(list.style.getPropertyValue("--grid-gap")).toBe("var(--space-8)");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("forces one column for the list variant and passes columns otherwise", () => {
    const { rerender } = render(<FeatureList variant="list"><FeatureItem title="A" /></FeatureList>);
    expect(screen.getByRole("list").style.getPropertyValue("--grid-columns-lg")).toBe("1");
    rerender(<FeatureList variant="cards" columns={{ base: 1, lg: 4 }}><FeatureItem title="A" /></FeatureList>);
    expect(screen.getByRole("list").style.getPropertyValue("--grid-columns-lg")).toBe("4");
    expect(screen.getByRole("listitem")).toHaveClass("card");
  });

  it("forwards native attributes, classes, styles and refs", () => {
    const ref = createRef<HTMLUListElement>();
    render(<FeatureList ref={ref} id="services" className="mine" style={{ color: "red" }}><FeatureItem title="A" /></FeatureList>);
    const list = screen.getByRole("list");
    expect(ref.current).toBe(list);
    expect(list).toHaveAttribute("id", "services");
    expect(list).toHaveClass("feature-list", "mine");
    expect(list).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("renders its story", () => {
    render(<FeatureListStory />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("types the variant", () => {
    expectTypeOf<FeatureListProps>().toHaveProperty("columns");
    // @ts-expect-error variants are grid, list and cards
    void (<FeatureList variant="carousel"><FeatureItem title="A" /></FeatureList>);
  });
});
