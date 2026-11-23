import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ListItem } from "./components/ListItem";
import { List } from "./List";
import * as stories from "./List.stories";

afterEach(cleanup);

const { List: ListStory } = composeStories(stories);

describe("List", () => {
  it("renders an unordered list of its rows", () => {
    render(
      <List aria-label="Team">
        <ListItem title="Ana" />
        <ListItem title="Bruno" />
      </List>,
    );
    const list = screen.getByRole("list", { name: "Team" });

    expect(list.tagName).toBe("UL");
    expect(list).toHaveClass("list");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(list).not.toHaveAttribute("data-divided");
  });

  it("renders an ordered list and marks dividers", () => {
    render(<List as="ol" divided aria-label="Steps"><ListItem title="One" /></List>);
    const list = screen.getByRole("list", { name: "Steps" });

    expect(list.tagName).toBe("OL");
    expect(list).toHaveAttribute("data-divided", "true");
  });

  it("forwards classes, styles, native attributes and the ref", () => {
    const ref = createRef<HTMLUListElement>();
    render(<List ref={ref} className="extra" style={{ outlineOffset: "7px" }} data-testid="list" />);

    expect(ref.current).toBe(screen.getByTestId("list"));
    expect(ref.current).toHaveClass("list", "extra");
    expect(ref.current).toHaveStyle({ outlineOffset: "7px" });
  });

  it("renders its story", () => {
    render(<ListStory />);

    expect(screen.getByRole("list", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByRole("switch", { name: "Notifications" })).toBeChecked();
  });
});
