import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { HeadingProps } from "../../index";
import { Heading } from "../../index";
import * as stories from "./Heading.stories";

afterEach(cleanup);

const { Heading: HeadingStory } = composeStories(stories);

describe("Heading", () => {
  it("renders an h2 at size lg by default, balanced and start-aligned", () => {
    render(<Heading>Plans</Heading>);
    const heading = screen.getByRole("heading", { level: 2, name: "Plans" });
    expect(heading).toHaveClass("heading");
    expect(heading).toHaveAttribute("data-size", "lg");
    expect(heading).toHaveAttribute("data-align", "start");
    expect(heading).toHaveAttribute("data-balance");
  });

  it.each([
    ["h1", "xl"], ["h2", "lg"], ["h3", "md"], ["h4", "sm"], ["h5", "xs"], ["h6", "xs"],
  ] as const)("sizes %s as %s unless size is given", (as, size) => {
    const { rerender } = render(<Heading as={as}>Title</Heading>);
    expect(screen.getByRole("heading", { level: Number(as[1]) })).toHaveAttribute("data-size", size);
    rerender(<Heading as={as} size="display">Title</Heading>);
    expect(screen.getByRole("heading", { level: Number(as[1]) })).toHaveAttribute("data-size", "display");
  });

  it("aligns, drops balance and forwards native attributes, classes, styles and refs", () => {
    const ref = createRef<HTMLHeadingElement>();
    render(
      <Heading ref={ref} id="pricing" align="center" balance={false} className="custom" style={{ marginBlockEnd: 8 }}>
        Pricing
      </Heading>,
    );
    const heading = screen.getByRole("heading", { name: "Pricing" });
    expect(ref.current).toBe(heading);
    expect(heading).toHaveAttribute("id", "pricing");
    expect(heading).toHaveAttribute("data-align", "center");
    expect(heading).not.toHaveAttribute("data-balance");
    expect(heading).toHaveClass("heading", "custom");
    expect(heading).toHaveStyle({ marginBlockEnd: "8px" });
  });

  it("renders its story", () => {
    render(<HeadingStory />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveAttribute("data-size", "display");
  });

  it("types the level and size", () => {
    expectTypeOf<HeadingProps>().toHaveProperty("as");
    expectTypeOf<HeadingProps>().toHaveProperty("size");
    // @ts-expect-error a paragraph is not a heading level
    void (<Heading as="p">Title</Heading>);
    // @ts-expect-error sizes are named, not numbered
    void (<Heading size={3}>Title</Heading>);
  });
});
