import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { ContainerProps } from "../../index";
import { Container } from "../../index";
import * as stories from "./Container.stories";

afterEach(cleanup);

const { Container: ContainerStory } = composeStories(stories);

describe("Container", () => {
  it("renders a large div with gutters by default", () => {
    const { container } = render(<Container>Content</Container>);
    const root = container.firstElementChild!;
    expect(root.tagName).toBe("DIV");
    expect(root).toHaveClass("layout-container");
    expect(root).toHaveAttribute("data-size", "lg");
    expect(root).toHaveAttribute("data-gutter", "true");
    expect(root).not.toHaveAttribute("style");
  });

  it("renders the element, size, gutter, native props, classes, styles and refs", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Container as="main" ref={ref} size="full" gutter={false} id="content" className="custom" style={{ color: "red" }}>
        Main
      </Container>,
    );
    const main = screen.getByRole("main");
    expect(ref.current).toBe(main);
    expect(main).toHaveAttribute("data-size", "full");
    expect(main).toHaveAttribute("data-gutter", "false");
    expect(main).toHaveAttribute("id", "content");
    expect(main).toHaveClass("layout-container", "custom");
    expect(main).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("renders its story", () => {
    render(<ContainerStory />);
    expect(screen.getByRole("heading", { name: "Pricing" })).toBeInTheDocument();
  });

  it("types sizes and elements", () => {
    expectTypeOf<ContainerProps<"main">>().toHaveProperty("ref");
    // @ts-expect-error sizes are named
    void (<Container size={1200} />);
    // @ts-expect-error a container is not a list
    void (<Container as="ul" />);
  });
});
