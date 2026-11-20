import { createRef, type ReactNode } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ListItem } from "./ListItem";
import * as stories from "./ListItem.stories";

afterEach(cleanup);

const { ListItem: ListItemStory } = composeStories(stories);

const inList = (node: ReactNode) => render(<ul>{node}</ul>);

describe("ListItem", () => {
  it("renders the title alone, without the optional parts", () => {
    const { container } = inList(<ListItem title="Billing" />);

    expect(screen.getByRole("listitem")).toHaveClass("list-item");
    expect(screen.getByText("Billing")).toHaveClass("list-item__title");
    expect(container.querySelector(".list-item__leading")).toBeNull();
    expect(container.querySelector(".list-item__description")).toBeNull();
    expect(container.querySelector(".list-item__trailing")).toBeNull();
  });

  it("orders leading, title, description, extra content and trailing", () => {
    inList(
      <ListItem leading={<span>L</span>} title="Title" description="Description" trailing={<button>T</button>}>
        <span>Extra</span>
      </ListItem>,
    );

    expect(screen.getByRole("listitem")).toHaveTextContent("LTitleDescriptionExtraT");
    expect(screen.getByText("Extra").parentElement).toHaveClass("list-item__body");
    expect(screen.getByRole("button", { name: "T" }).parentElement).toHaveClass("list-item__trailing");
  });

  it.each([
    ["leadingClassName", "leadingStyle", "list-item__leading"],
    ["bodyClassName", "bodyStyle", "list-item__body"],
    ["titleClassName", "titleStyle", "list-item__title"],
    ["descriptionClassName", "descriptionStyle", "list-item__description"],
    ["trailingClassName", "trailingStyle", "list-item__trailing"],
  ])("applies and removes %s and %s on .%s", (classProp, styleProp, base) => {
    const props = { title: "T", description: "D", leading: "L", trailing: "R" };
    const { container, rerender } = render(
      <ul><ListItem {...props} {...{ [classProp]: "consumer-part", [styleProp]: { outlineOffset: "7px" } }} /></ul>,
    );
    const part = container.querySelector<HTMLElement>(".consumer-part")!;

    expect(part).toHaveClass(base);
    expect(part).toHaveStyle({ outlineOffset: "7px" });
    rerender(<ul><ListItem {...props} /></ul>);
    expect(container.querySelector(".consumer-part")).toBeNull();
  });

  it("forwards classes, styles, native attributes and the ref to the row", () => {
    const ref = createRef<HTMLLIElement>();
    inList(<ListItem ref={ref} title="T" className="extra" style={{ outlineOffset: "7px" }} aria-current="true" />);

    expect(ref.current).toHaveClass("list-item", "extra");
    expect(ref.current).toHaveStyle({ outlineOffset: "7px" });
    expect(ref.current).toHaveAttribute("aria-current", "true");
  });

  it("renders its story inside a list", () => {
    render(<ListItemStory />);

    expect(screen.getByRole("listitem")).toHaveTextContent("Notifications");
  });
});
