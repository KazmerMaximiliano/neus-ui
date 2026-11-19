import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { FAQ } from "./FAQ";
import * as stories from "./FAQ.stories";

afterEach(cleanup);

const { FAQ: FAQStory } = composeStories(stories);

const ITEMS = [
  { question: "Do I need an appointment?", answer: "For check-ups, yes." },
  { question: "How do I pay?", answer: "Cash or card." },
];

const details = (question: string) => screen.getByRole("heading", { name: question }).closest("details")!;

describe("FAQ", () => {
  it("renders each question as an h3 heading over its closed answer", () => {
    const { container } = render(<FAQ items={ITEMS} />);

    expect(container.firstChild).toHaveClass("accordion", "faq");
    expect(container.firstChild).toHaveAttribute("data-variant", "list");
    expect(screen.getByRole("heading", { level: 3, name: "How do I pay?" })).toBeInTheDocument();
    expect(details("How do I pay?").open).toBe(false);
    expect(details("How do I pay?")).toHaveTextContent("Cash or card.");
    expect(details("How do I pay?")).not.toHaveAttribute("name");
  });

  it("opens answers independently, or one at a time with single", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<FAQ items={ITEMS} />);

    await user.click(screen.getByText("Do I need an appointment?"));
    await user.click(screen.getByText("How do I pay?"));
    expect(details("Do I need an appointment?").open).toBe(true);
    expect(details("How do I pay?").open).toBe(true);

    rerender(<FAQ key="single" items={ITEMS} single />);
    await user.click(screen.getByText("Do I need an appointment?"));
    await user.click(screen.getByText("How do I pay?"));
    expect(details("Do I need an appointment?").open).toBe(false);
    expect(details("How do I pay?").open).toBe(true);
    expect(details("How do I pay?")).toHaveAttribute("name");
  });

  it("takes the cards variant and another heading level", () => {
    const { container } = render(<FAQ items={ITEMS} variant="cards" questionAs="h4" />);

    expect(container.firstChild).toHaveAttribute("data-variant", "cards");
    expect(screen.getByRole("heading", { level: 4, name: "How do I pay?" })).toBeInTheDocument();
  });

  it("renders its story", () => {
    render(<FAQStory />);

    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
  });

  it("forwards native attributes, refs and every part's class and style", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <FAQ
        ref={ref}
        id="faq"
        items={ITEMS}
        className="root"
        style={{ marginBlock: 8 }}
        itemClassName="item"
        itemStyle={{ color: "red" }}
        questionClassName="question"
        questionStyle={{ color: "red" }}
        answerClassName="answer"
        answerStyle={{ color: "red" }}
      />,
    );
    const red = { color: "rgb(255, 0, 0)" };

    expect(ref.current).toHaveAttribute("id", "faq");
    expect(ref.current).toHaveClass("faq", "root");
    expect(ref.current).toHaveStyle({ marginBlock: "8px" });
    for (const [selector, name] of [["details", "item"], ["summary", "question"], [".accordion__content", "answer"]]) {
      for (const part of container.querySelectorAll(selector)) {
        expect(part).toHaveClass(`faq__${name === "item" ? "item" : name}`, name);
        expect(part).toHaveStyle(red);
      }
    }
  });

  it("rejects an item without an answer", () => {
    // @ts-expect-error Each question needs its answer.
    render(<FAQ items={[{ question: "Q" }]} />);

    expect(screen.getByRole("heading", { name: "Q" })).toBeInTheDocument();
  });
});
