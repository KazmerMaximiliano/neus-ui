import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DrawerContent } from "./DrawerContent";
import * as stories from "./DrawerContent.stories";

afterEach(cleanup);

const { DrawerContent: Preview } = composeStories(stories);

describe("DrawerContent", () => {
  it("renders free content without inline overrides", () => {
    const { container } = render(
      <DrawerContent>
        <span>First</span>
        <a href="#last">Last</a>
      </DrawerContent>,
    );
    const part = container.firstElementChild!;
    expect(part).toHaveClass("drawer-content");
    expect(part).toHaveTextContent("FirstLast");
    expect(screen.getByRole("link").parentElement).toBe(part);
    expect(part).not.toHaveAttribute("style");
  });

  it("forwards classes, styles, native attributes and a div reference", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <DrawerContent ref={ref} className="extra" style={{ padding: 30 }} data-testid="part" aria-live="polite" />,
    );
    const part = container.firstElementChild!;
    expect(ref.current).toBe(part);
    expect(part).toHaveClass("drawer-content", "extra");
    expect(part).toHaveStyle({ padding: "30px" });
    expect(part).toHaveAttribute("data-testid", "part");
    expect(part).toHaveAttribute("aria-live", "polite");
  });

  it("renders the story preview inside a static drawer surface", () => {
    const { container } = render(<Preview />);
    expect(container.querySelector(".drawer-story .drawer-content")).toBeInTheDocument();
  });
});
