import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";
import * as stories from "./EmptyState.stories";

afterEach(cleanup);

const { EmptyState: EmptyStateStory } = composeStories(stories);

describe("EmptyState", () => {
  it("renders the title as an h2 alone, without the optional parts", () => {
    const { container } = render(<EmptyState title="No messages yet" />);

    expect(screen.getByRole("heading", { level: 2, name: "No messages yet" })).toHaveClass("empty-state__title");
    expect(container.querySelector(".empty-state__media")).toBeNull();
    expect(container.querySelector(".empty-state__description")).toBeNull();
    expect(container.querySelector(".empty-state__actions")).toBeNull();
  });

  it("takes the title element its place in the outline needs", () => {
    const { rerender } = render(<EmptyState title="Empty" titleAs="h4" />);

    expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument();
    rerender(<EmptyState title="Empty" titleAs="p" />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    expect(screen.getByText("Empty").tagName).toBe("P");
  });

  it("orders media, title, description and actions", () => {
    render(
      <EmptyState
        media={<svg aria-hidden data-testid="icon" />}
        title="No files"
        description="Upload a file to start."
        actions={<button>Upload</button>}
      />,
    );

    expect(screen.getByTestId("icon").parentElement).toHaveClass("empty-state__media");
    expect(screen.getByText("Upload a file to start.").tagName).toBe("P");
    expect(screen.getByRole("button", { name: "Upload" }).parentElement).toHaveClass("empty-state__actions");
  });

  it("announces itself with a status role when asked", () => {
    render(<EmptyState role="status" title="No results" description="Try other words." />);

    expect(screen.getByRole("status")).toHaveTextContent("No resultsTry other words.");
  });

  it.each([
    ["mediaClassName", "mediaStyle", "empty-state__media"],
    ["titleClassName", "titleStyle", "empty-state__title"],
    ["descriptionClassName", "descriptionStyle", "empty-state__description"],
    ["actionsClassName", "actionsStyle", "empty-state__actions"],
  ])("applies and removes %s and %s on .%s", (classProp, styleProp, base) => {
    const props = { title: "T", description: "D", media: "M", actions: "A" };
    const { container, rerender } = render(
      <EmptyState {...props} {...{ [classProp]: "consumer-part", [styleProp]: { outlineOffset: "7px" } }} />,
    );
    const part = container.querySelector<HTMLElement>(".consumer-part")!;

    expect(part).toHaveClass(base);
    expect(part).toHaveStyle({ outlineOffset: "7px" });
    rerender(<EmptyState {...props} />);
    expect(container.querySelector(".consumer-part")).toBeNull();
  });

  it("forwards classes, styles, native attributes and the ref to the root", () => {
    const ref = createRef<HTMLDivElement>();
    render(<EmptyState ref={ref} title="T" className="extra" style={{ outlineOffset: "7px" }} data-testid="empty" />);

    expect(ref.current).toBe(screen.getByTestId("empty"));
    expect(ref.current).toHaveClass("empty-state", "extra");
    expect(ref.current).toHaveStyle({ outlineOffset: "7px" });
  });

  it("renders its story", () => {
    render(<EmptyStateStory />);

    expect(screen.getByRole("heading", { name: "No messages yet" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Invite customers" })).toBeInTheDocument();
  });
});
