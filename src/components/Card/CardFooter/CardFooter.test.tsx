import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { CardFooter } from "./CardFooter";
import * as stories from "./CardFooter.stories";

afterEach(cleanup);

const { CardFooter: Preview } = composeStories(stories);

describe("CardFooter", () => {
  it("renders empty and independently of Card without inline overrides", () => {
    const { container } = render(<CardFooter />);
    expect(container.firstElementChild?.tagName).toBe("DIV");
    expect(container.firstElementChild).toHaveClass("card-footer");
    expect(container.firstElementChild).toBeEmptyDOMElement();
    expect(container.firstElementChild).not.toHaveAttribute("style");
  });

  it("renders arbitrary children directly and preserves their order", () => {
    const { container } = render(
      <CardFooter>
        <span>First</span>
        {0}
        <>
          <a href="#last">Last</a>
        </>
      </CardFooter>,
    );
    expect(container.firstElementChild).toHaveTextContent("First0Last");
    expect(screen.getByText("First").parentElement).toBe(
      container.firstElementChild,
    );
    expect(screen.getByRole("link").parentElement).toBe(
      container.firstElementChild,
    );
  });

  it("forwards classes, styles, native attributes and a div reference", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <CardFooter
        ref={ref}
        className="custom"
        style={{ padding: 21 }}
        id="section"
        role="group"
        aria-label="Section"
        data-section="test"
      />,
    );
    const section = screen.getByRole("group", { name: "Section" });
    expect(ref.current).toBe(section);
    expect(section).toHaveClass("card-footer", "custom");
    expect(section).toHaveStyle({ padding: "21px" });
    expect(section).toHaveAttribute("id", "section");
    expect(section).toHaveAttribute("data-section", "test");
  });

  it("accepts null and clears previous style overrides", () => {
    const { container, rerender } = render(
      <CardFooter style={{ padding: 21 }} />,
    );
    rerender(<CardFooter style={null} />);
    expect((container.firstElementChild as HTMLElement).style.padding).toBe("");
  });

  it("has one themed story with editable className and style", () => {
    expect(Object.keys(stories).filter((key) => key !== "default")).toEqual([
      "CardFooter",
    ]);
    const { container } = render(
      <Preview
        designSystem="apple"
        className="preview-section"
        style={{ padding: 22 }}
      />,
    );
    const section = container.querySelector(".card-footer")!;
    expect(section).toHaveClass("preview-section");
    expect(section).toHaveStyle({ padding: "22px" });
    expect(section.closest("[data-design-system]")).toHaveAttribute(
      "data-design-system",
      "apple",
    );
  });
});
