import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import { DESIGN_SYSTEMS } from "../../design-systems";
import type {
  CardContentProps,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
} from "../../index";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardMedia,
} from "../../index";
import { ThemeProvider } from "../../providers";
import * as stories from "./Card.stories";

afterEach(cleanup);

const { Card: CardStory } = composeStories(stories);

describe("Card", () => {
  it("renders an empty passive div without generated sections or inline styles", () => {
    const { container } = render(<Card />);
    expect(container.firstElementChild?.tagName).toBe("DIV");
    expect(container.firstElementChild).toHaveClass("card");
    expect(container.firstElementChild).toBeEmptyDOMElement();
    expect(container.firstElementChild).not.toHaveAttribute("style");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders free-form children directly, including zero and fragments", () => {
    const { container } = render(
      <Card>
        Plain text{0}
        <>
          <span>Nested text</span>
        </>
      </Card>,
    );
    expect(container.firstElementChild).toHaveTextContent(
      "Plain text0Nested text",
    );
    expect(screen.getByText("Nested text").parentElement).toBe(
      container.firstElementChild,
    );
    expect(container.querySelector(".card-content")).not.toBeInTheDocument();
  });

  it("preserves complete composition and caller order without additional wrappers", () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <h2>Product</h2>
        </CardHeader>
        <CardMedia src="/product.png" alt="Product preview" />
        <CardContent>Description</CardContent>
        <CardFooter>
          <a href="#details">Details</a>
        </CardFooter>
      </Card>,
    );
    expect(
      Array.from(
        container.firstElementChild!.children,
        (child) => child.className,
      ),
    ).toEqual(["card-header", "card-media", "card-content", "card-footer"]);
    expect(
      screen.getByRole("heading", { name: "Product" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Product preview" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Details" })).toHaveAttribute(
      "href",
      "#details",
    );
  });

  it("permits partial, reordered and repeated sections", () => {
    const { container } = render(
      <Card>
        <CardFooter>First</CardFooter>
        <CardContent>Second</CardContent>
        <CardContent>Third</CardContent>
      </Card>,
    );
    expect(container.firstElementChild).toHaveTextContent("FirstSecondThird");
    expect(container.querySelector(".card-header")).toBeNull();
    expect(container.querySelector(".card-media")).toBeNull();
  });

  it("merges classes, forwards attributes/ref and applies only its own style", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Card
        ref={ref}
        id="product"
        role="group"
        aria-label="Product"
        data-product="one"
        className="custom-card"
        style={{ borderRadius: 7 }}
      >
        <CardContent style={{ padding: 23 }}>Details</CardContent>
      </Card>,
    );
    const card = screen.getByRole("group", { name: "Product" });
    expect(ref.current).toBe(card);
    expect(card).toHaveClass("card", "custom-card");
    expect(card).toHaveAttribute("id", "product");
    expect(card).toHaveAttribute("data-product", "one");
    expect(card).toHaveStyle({ borderRadius: "7px" });
    expect(screen.getByText("Details")).toHaveStyle({ padding: "23px" });
    expect(screen.getByText("Details").style.borderRadius).toBe("");
  });

  it("renders as a list item, article, figure or section with a matching ref", () => {
    const ref = createRef<HTMLLIElement>();
    render(
      <ul>
        <Card as="li" ref={ref} variant="outlined">
          Feature
        </Card>
      </ul>,
    );
    const item = screen.getByRole("listitem");
    expect(ref.current).toBe(item);
    expect(item).toHaveClass("card");
    expect(item).toHaveAttribute("data-variant", "outlined");
    for (const element of ["article", "figure", "section"] as const) {
      const { container } = render(<Card as={element}>Content</Card>);
      expect(container.firstElementChild?.tagName).toBe(element.toUpperCase());
    }
  });

  it("removes prior inline overrides when style returns to null", () => {
    const { container, rerender } = render(<Card style={{ padding: 12 }} />);
    rerender(<Card style={null} />);
    expect((container.firstElementChild as HTMLElement).style.padding).toBe("");
  });

  it("keeps actions in children independently clickable and keyboard accessible", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Card>
        <CardContent>Content</CardContent>
        <CardFooter>
          <button onClick={onClick}>Save</button>
          <a href="#details">Details</a>
        </CardFooter>
      </Card>,
    );
    await user.click(screen.getByText("Content"));
    expect(onClick).not.toHaveBeenCalled();
    await user.tab();
    expect(screen.getByRole("button", { name: "Save" })).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).toHaveBeenCalledTimes(2);
    await user.tab();
    expect(screen.getByRole("link")).toHaveFocus();
  });

  it("exports public props and rejects the retired API at type checking", () => {
    expectTypeOf<CardProps>().toHaveProperty("children");
    expectTypeOf<CardHeaderProps>().toHaveProperty("style");
    expectTypeOf<CardContentProps>().toHaveProperty("className");
    expectTypeOf<CardFooterProps>().toHaveProperty("ref");
    expectTypeOf<CardProps>().toHaveProperty("variant");
    expectTypeOf<CardProps>().not.toHaveProperty("avatarImage");
    expectTypeOf<CardProps>().not.toHaveProperty("avatarAlt");
    expectTypeOf<CardProps>().not.toHaveProperty("leading");
    expectTypeOf<CardProps>().not.toHaveProperty("trailing");
    expectTypeOf<CardProps>().not.toHaveProperty("fill");
    expectTypeOf<CardProps>().not.toHaveProperty("color");
    expectTypeOf<CardProps>().not.toHaveProperty("icon");
    expectTypeOf<CardProps>().not.toHaveProperty("title");
    expectTypeOf<CardProps>().not.toHaveProperty("description");
    expectTypeOf<CardProps>().not.toHaveProperty("highlighted");
    expectTypeOf<CardProps>().not.toHaveProperty("selected");
    expectTypeOf<CardProps>().not.toHaveProperty("disabled");
    expectTypeOf<CardProps>().not.toHaveProperty("onClick");
    // @ts-expect-error Card no longer accepts a click behavior.
    void (<Card onClick={() => undefined} />);
    // @ts-expect-error Card's style must be a CSS object, not a string.
    void (<Card style="padding: 1rem" />);
    expectTypeOf<CardProps<"li">>().toHaveProperty("value");
    expectTypeOf<CardProps>().not.toHaveProperty("value");
    // @ts-expect-error Card renders only passive container elements.
    void (<Card as="button" />);
    // @ts-expect-error The ref must match the selected element.
    void (<Card as="li" ref={createRef<HTMLDivElement>()} />);
    // @ts-expect-error The default div infers a div ref.
    void (<Card ref={createRef<HTMLLIElement>()} />);
  });
});

describe("Card story", () => {
  it("exports one story with all systems and the new controls", () => {
    expect(Object.keys(stories).filter((key) => key !== "default")).toEqual([
      "Card",
    ]);
    expect(stories.default.argTypes?.designSystem?.options).toEqual(
      DESIGN_SYSTEMS.map(({ id }) => id),
    );
    expect(stories.Card.args?.style).toBeNull();
    expect(stories.default.argTypes).toHaveProperty("variant.options", [
      "auto",
      "filled",
      "outlined",
      "elevated",
    ]);
    expect(stories.default.argTypes).toHaveProperty("as.options", [
      "div",
      "article",
      "li",
      "figure",
      "section",
    ]);
  });

  it("previews the full composition and changes only its local design", () => {
    const { rerender } = render(
      <ThemeProvider scope="local" designSystem="carbon" colorScheme="dark">
        <CardStory />
      </ThemeProvider>,
    );
    const card = screen.getByRole("heading").closest(".card")!;
    expect(card.closest("[data-design-system]")).toHaveAttribute(
      "data-design-system",
      "neus",
    );
    expect(card.closest("[data-color-scheme]")).toHaveAttribute(
      "data-color-scheme",
      "dark",
    );
    expect(card.querySelector(".card-media")).toBeInTheDocument();
    expect(card.querySelector(".card-content")).toBeInTheDocument();
    expect(card.querySelector(".card-footer")).toBeInTheDocument();
    rerender(
      <CardStory
        designSystem="material"
        className="story-override"
        style={{ padding: 5 }}
      />,
    );
    expect(screen.getByRole("heading").closest(".card")).toHaveClass(
      "story-override",
    );
    expect(screen.getByRole("heading").closest(".card")).toHaveStyle({
      padding: "5px",
    });
    expect(
      screen.getByRole("heading").closest("[data-design-system]"),
    ).toHaveAttribute("data-design-system", "material");
  });
});

describe("surface variants", () => {
  it.each(["auto", "filled", "outlined", "elevated"] as const)(
    "keeps %s passive and preserves composition",
    (variant) => {
      const { container } = render(
        <Card variant={variant}>
          <button>Child action</button>
        </Card>,
      );
      expect(container.querySelector(".card")).toHaveAttribute(
        "data-variant",
        variant,
      );
      expect(screen.getAllByRole("button")).toHaveLength(1);
      expect(screen.getByRole("button")).toHaveTextContent("Child action");
    },
  );
});
