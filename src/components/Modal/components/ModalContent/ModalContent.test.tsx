import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { ModalContent } from "./ModalContent";
import * as stories from "./ModalContent.stories";

afterEach(cleanup);

const { ModalContent: Preview } = composeStories(stories);

describe("ModalContent", () => {
  it("renders free content independently of Modal without inline overrides", () => {
    const { container } = render(
      <ModalContent>
        <span>First</span>
        <a href="#last">Last</a>
      </ModalContent>,
    );
    const section = container.firstElementChild!;
    expect(section).toHaveClass("modal-content");
    expect(section).toHaveTextContent("FirstLast");
    expect(screen.getByRole("link").parentElement).toBe(section);
    expect(section).not.toHaveAttribute("style");
  });

  it("forwards classes, styles, native attributes and a div reference", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <ModalContent
        ref={ref}
        className="extra"
        style={{ padding: 30 }}
        data-testid="section"
        aria-live="polite"
      />,
    );
    const section = container.firstElementChild!;
    expect(ref.current).toBe(section);
    expect(section).toHaveClass("modal-content", "extra");
    expect(section).toHaveStyle({ padding: "30px" });
    expect(section).toHaveAttribute("data-testid", "section");
    expect(section).toHaveAttribute("aria-live", "polite");
  });

  it("renders the story preview inside a static surface", () => {
    const { container } = render(<Preview />);
    expect(
      container.querySelector(".modal-story .modal-content"),
    ).toBeInTheDocument();
  });
});
