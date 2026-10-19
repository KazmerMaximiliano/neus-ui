import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { TestimonialListProps } from "../../sections";
import { Testimonial, TestimonialList } from "../../sections";
import * as stories from "./TestimonialList.stories";

afterEach(cleanup);

const { TestimonialList: TestimonialListStory } = composeStories(stories);

describe("TestimonialList", () => {
  it("renders a list of card quotes by default", () => {
    render(<TestimonialList aria-label="Opiniones"><Testimonial quote="A" name="Ana" /><Testimonial quote="B" name="Beto" /></TestimonialList>);
    const list = screen.getByRole("list", { name: "Opiniones" });
    expect(list).toHaveClass("grid", "testimonial-list");
    expect(list).toHaveAttribute("data-variant", "card");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getAllByRole("figure")).toHaveLength(2);
  });

  it("passes variant and columns, and widens the gap for plain quotes", () => {
    render(<TestimonialList variant="plain" columns={2}><Testimonial quote="A" name="Ana" /></TestimonialList>);
    const list = screen.getByRole("list");
    expect(list).toHaveAttribute("data-variant", "plain");
    expect(list.style.getPropertyValue("--grid-columns-lg")).toBe("2");
    expect(list.style.getPropertyValue("--grid-gap")).toBe("var(--space-8)");
  });

  it("forwards native attributes, classes, styles and refs", () => {
    const ref = createRef<HTMLUListElement>();
    render(<TestimonialList ref={ref} id="voices" className="mine" style={{ color: "red" }}><Testimonial quote="A" name="Ana" /></TestimonialList>);
    const list = screen.getByRole("list");
    expect(ref.current).toBe(list);
    expect(list).toHaveAttribute("id", "voices");
    expect(list).toHaveClass("testimonial-list", "mine");
    expect(list).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("renders its story", () => {
    render(<TestimonialListStory />);
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("types the variant", () => {
    expectTypeOf<TestimonialListProps>().toHaveProperty("columns");
    // @ts-expect-error variants are plain, card and featured
    void (<TestimonialList variant="slider"><Testimonial quote="A" name="Ana" /></TestimonialList>);
  });
});
