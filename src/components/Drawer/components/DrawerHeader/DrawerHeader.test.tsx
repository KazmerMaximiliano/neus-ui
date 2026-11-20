import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { DrawerHeader } from "./DrawerHeader";
import * as stories from "./DrawerHeader.stories";

afterEach(cleanup);

const { DrawerHeader: Preview } = composeStories(stories);

describe("DrawerHeader", () => {
  it("renders free content without inline overrides", () => {
    const { container } = render(
      <DrawerHeader>
        <span>First</span>
        <a href="#last">Last</a>
      </DrawerHeader>,
    );
    const part = container.firstElementChild!;
    expect(part).toHaveClass("drawer-header");
    expect(part).toHaveTextContent("FirstLast");
    expect(screen.getByRole("link").parentElement).toBe(part);
    expect(part).not.toHaveAttribute("style");
  });

  it("forwards classes, styles, native attributes and a div reference", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <DrawerHeader ref={ref} className="extra" style={{ padding: 30 }} data-testid="part" aria-live="polite" />,
    );
    const part = container.firstElementChild!;
    expect(ref.current).toBe(part);
    expect(part).toHaveClass("drawer-header", "extra");
    expect(part).toHaveStyle({ padding: "30px" });
    expect(part).toHaveAttribute("data-testid", "part");
    expect(part).toHaveAttribute("aria-live", "polite");
  });

  it("renders the story preview inside a static drawer surface", () => {
    const { container } = render(<Preview />);
    expect(container.querySelector(".drawer-story .drawer-header")).toBeInTheDocument();
  });
});
