import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { ModalHeader } from "./ModalHeader";
import * as stories from "./ModalHeader.stories";

afterEach(cleanup);

const { ModalHeader: Preview } = composeStories(stories);

describe("ModalHeader", () => {
  it("renders free content independently of Modal without inline overrides", () => {
    const { container } = render(
      <ModalHeader>
        <span>First</span>
        <a href="#last">Last</a>
      </ModalHeader>,
    );
    const section = container.firstElementChild!;
    expect(section).toHaveClass("modal-header");
    expect(section).toHaveTextContent("FirstLast");
    expect(screen.getByRole("link").parentElement).toBe(section);
    expect(section).not.toHaveAttribute("style");
  });

  it("forwards classes, styles, native attributes and a div reference", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <ModalHeader
        ref={ref}
        className="extra"
        style={{ padding: 30 }}
        data-testid="section"
        aria-live="polite"
      />,
    );
    const section = container.firstElementChild!;
    expect(ref.current).toBe(section);
    expect(section).toHaveClass("modal-header", "extra");
    expect(section).toHaveStyle({ padding: "30px" });
    expect(section).toHaveAttribute("data-testid", "section");
    expect(section).toHaveAttribute("aria-live", "polite");
  });

  it("renders the story preview inside a static surface", () => {
    const { container } = render(<Preview />);
    expect(
      container.querySelector(".modal-story .modal-header"),
    ).toBeInTheDocument();
  });
});
