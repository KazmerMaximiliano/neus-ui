import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Accordion } from "./Accordion";
import * as stories from "./Accordion.stories";
import type { AccordionItem } from "./Accordion.types";

afterEach(cleanup);

const { Accordion: AccordionStory } = composeStories(stories);

const ITEMS: AccordionItem[] = [
  { value: "shipping", title: "Shipping", content: "Two business days" },
  { value: "returns", title: "Returns", content: "Thirty days" },
  { value: "warranty", title: "Warranty", content: "Two years", disabled: true },
];

const header = (name: string) => screen.getByText(name).closest("summary")!;
const item = (name: string) => header(name).parentElement as HTMLDetailsElement;

describe("Accordion", () => {
  describe("rendering", () => {
    it("renders each item as a closed disclosure with its title and content", () => {
      const { container } = render(<Accordion items={ITEMS} />);

      expect(container.firstChild).toHaveClass("accordion");
      expect(container.querySelectorAll("details.accordion__item")).toHaveLength(3);
      expect(header("Shipping")).toHaveClass("accordion__header");
      expect(item("Shipping").open).toBe(false);
      expect(item("Shipping").querySelector(".accordion__content")).toHaveTextContent("Two business days");
      expect(item("Shipping")).not.toHaveAttribute("name");
      expect(header("Shipping").querySelector(".accordion__icon")).toHaveAttribute("aria-hidden", "true");
    });

    it("opens the items in defaultValue", () => {
      render(<Accordion items={ITEMS} defaultValue={["returns"]} />);

      expect(item("Returns").open).toBe(true);
      expect(item("Shipping").open).toBe(false);
    });

    it("wraps each title in a heading with titleAs", () => {
      render(<Accordion items={ITEMS} titleAs="h3" />);

      expect(screen.getByRole("heading", { level: 3, name: "Shipping" })).toHaveClass("accordion__title");
    });

    it("gives single items a shared name so the browser keeps one open", () => {
      render(<Accordion items={ITEMS} type="single" />);
      const name = item("Shipping").getAttribute("name");

      expect(name).toBeTruthy();
      expect(item("Returns")).toHaveAttribute("name", name);
    });

    it("renders its story", () => {
      render(<AccordionStory />);

      expect(item("Shipping").open).toBe(true);
    });
  });

  describe("interactions", () => {
    it("opens and closes items independently and calls onChange", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Accordion items={ITEMS} onChange={onChange} />);

      await user.click(header("Shipping"));
      await user.click(header("Returns"));
      expect(item("Shipping").open).toBe(true);
      expect(item("Returns").open).toBe(true);
      await user.click(header("Shipping"));

      expect(item("Shipping").open).toBe(false);
      expect(onChange.mock.calls).toEqual([[["shipping"]], [["shipping", "returns"]], [["returns"]]]);
    });

    it("closes the open item when another opens in single mode", async () => {
      const user = userEvent.setup();
      render(<Accordion items={ITEMS} type="single" />);

      await user.click(header("Shipping"));
      await user.click(header("Returns"));

      expect(item("Shipping").open).toBe(false);
      expect(item("Returns").open).toBe(true);
    });

    it("leaves the open items to a controlled value", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Accordion items={ITEMS} value={["returns"]} onChange={onChange} />);

      await user.click(header("Shipping"));

      expect(onChange).toHaveBeenCalledWith(["returns", "shipping"]);
      expect(item("Shipping").open).toBe(false);
    });

    it("keeps a disabled item as it is", async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Accordion items={ITEMS} defaultValue={["warranty"]} onChange={onChange} />);

      await user.click(header("Warranty"));

      expect(header("Warranty")).toHaveAttribute("aria-disabled", "true");
      expect(item("Warranty").open).toBe(true);
      expect(onChange).not.toHaveBeenCalled();
    });

    it("follows an item the browser opens to show a find-in-page match", () => {
      const onChange = vi.fn();
      render(<Accordion items={ITEMS} onChange={onChange} />);

      item("Returns").open = true;
      fireEvent(item("Returns"), new Event("toggle"));

      expect(onChange).toHaveBeenCalledWith(["returns"]);
    });
  });

  describe("customization", () => {
    it("forwards native attributes, refs and every part's class and style", () => {
      const ref = createRef<HTMLDivElement>();
      const { container } = render(
        <Accordion
          ref={ref}
          id="faq"
          items={ITEMS}
          className="root"
          style={{ marginBlock: 8 }}
          itemClassName="item"
          itemStyle={{ color: "red" }}
          headerClassName="header"
          headerStyle={{ color: "red" }}
          contentClassName="content"
          contentStyle={{ color: "red" }}
        />,
      );
      const red = { color: "rgb(255, 0, 0)" };

      expect(ref.current).toBe(container.firstChild);
      expect(ref.current).toHaveAttribute("id", "faq");
      expect(ref.current).toHaveClass("accordion", "root");
      expect(ref.current).toHaveStyle({ marginBlock: "8px" });
      for (const [selector, name] of [["details", "item"], ["summary", "header"], [".accordion__content", "content"]]) {
        for (const part of container.querySelectorAll(selector)) {
          expect(part).toHaveClass(name);
          expect(part).toHaveStyle(red);
        }
      }
    });

    it("rejects an item without a value", () => {
      // @ts-expect-error Each item needs its value.
      render(<Accordion items={[{ title: "A", content: "B" }]} />);

      expect(screen.getByText("A")).toBeInTheDocument();
    });
  });
});
