import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { TestimonialProps } from "../../../../sections";
import { Testimonial, TestimonialList } from "../../../../sections";
import * as stories from "./Testimonial.stories";

afterEach(cleanup);

const { Testimonial: TestimonialStory } = composeStories(stories);

describe("Testimonial", () => {
  it("renders a figure with the quote in a blockquote and the author in the caption", () => {
    const { container } = render(<Testimonial quote="Nos atendieron sin turno." name="Graciela P." role="Bruno, labrador" />);
    const root = container.firstElementChild!;
    expect(root).toHaveClass("card", "testimonial");
    expect(root.tagName).toBe("DIV");
    expect(screen.getByRole("figure")).toHaveClass("testimonial__figure");
    expect(screen.getByRole("blockquote")).toHaveTextContent("Nos atendieron sin turno.");
    expect(container.querySelector("q")).toBeInTheDocument();
    expect(screen.getByText("Graciela P.")).toHaveClass("testimonial__name");
    expect(screen.getByText("Bruno, labrador")).toHaveClass("testimonial__role");
  });

  it("becomes a list item that follows the list's variant", () => {
    const { rerender } = render(<TestimonialList variant="plain"><Testimonial quote="Q" name="N" variant="card" /></TestimonialList>);
    const item = screen.getByRole("listitem");
    expect(item).toHaveClass("testimonial");
    expect(item).not.toHaveClass("card");
    expect(item).toHaveAttribute("data-variant-item", "plain");
    rerender(<TestimonialList variant="card"><Testimonial quote="Q" name="N" /></TestimonialList>);
    expect(screen.getByRole("listitem")).toHaveClass("card", "testimonial");
  });

  it("renders the avatar, omits an absent role and forwards every part hook", () => {
    const { container } = render(
      <Testimonial quote="Q" name="N" variant="plain" avatar={<span data-testid="avatar" />} className="t" style={{ color: "red" }}
        quoteClassName="q" quoteStyle={{ color: "red" }} captionClassName="c" captionStyle={{ color: "red" }}
        nameClassName="n" nameStyle={{ color: "red" }} />,
    );
    expect(container.querySelector(".testimonial__role")).not.toBeInTheDocument();
    expect(screen.getByTestId("avatar").parentElement).toHaveClass("testimonial__caption", "c");
    expect(container.firstElementChild).toHaveClass("testimonial", "t");
    for (const [part, extra] of [["testimonial__quote", "q"], ["testimonial__caption", "c"], ["testimonial__name", "n"]]) {
      const element = container.querySelector(`.${part}`)!;
      expect(element).toHaveClass(extra);
      expect(element).toHaveStyle({ color: "rgb(255, 0, 0)" });
    }
  });

  it("renders its story", () => {
    render(<TestimonialStory />);
    expect(screen.getByText("Lucía Ferreyra")).toBeInTheDocument();
  });

  it("requires the quote and the name", () => {
    expectTypeOf<TestimonialProps>().toHaveProperty("avatar");
    // @ts-expect-error a quote without an author is not a testimonial
    void (<Testimonial quote="Q" />);
  });
});
