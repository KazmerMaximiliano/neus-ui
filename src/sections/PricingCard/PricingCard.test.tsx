import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PricingCard } from "./PricingCard";
import * as stories from "./PricingCard.stories";

afterEach(cleanup);

const { PricingCard: PricingCardStory } = composeStories(stories);

describe("PricingCard", () => {
  it("renders the plan's name, price, period, description, features and action", () => {
    const { container } = render(
      <PricingCard
        name="Team"
        price="$24"
        period="per month"
        description="For teams."
        features={["Unlimited projects", "Audit logs"]}
        action={<button type="button">Start</button>}
      />,
    );
    const card = container.firstElementChild!;

    expect(card.tagName).toBe("DIV");
    expect(card).toHaveClass("card", "pricing-card");
    expect(card).not.toHaveAttribute("data-featured");
    expect(screen.getByRole("heading", { level: 3, name: "Team" })).toHaveClass("pricing-card__name");
    expect(screen.getByText("$24")).toHaveClass("pricing-card__amount");
    expect(screen.getByText("per month")).toHaveClass("pricing-card__period");
    expect(screen.getByText("$24").parentElement).toHaveClass("pricing-card__price");
    expect(screen.getByText("For teams.")).toHaveClass("pricing-card__description");
    const features = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(features).toHaveLength(2);
    expect(features[0]).toHaveTextContent("Unlimited projects");
    expect(features[0].querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("button", { name: "Start" }).parentElement).toHaveClass("pricing-card__action");
  });

  it("leaves out the parts it is not given", () => {
    const { container } = render(<PricingCard name="Free" price="$0" />);

    expect(container.querySelector(".pricing-card__period")).not.toBeInTheDocument();
    expect(container.querySelector(".pricing-card__description")).not.toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(container.querySelector(".pricing-card__action")).not.toBeInTheDocument();
    expect(container.querySelector(".badge")).not.toBeInTheDocument();
  });

  it("marks the featured plan and shows its badge beside the name", () => {
    const { container } = render(<PricingCard name="Team" price="$24" featured badge="Most popular" nameAs="h2" />);

    expect(container.firstElementChild).toHaveAttribute("data-featured", "true");
    expect(screen.getByText("Most popular").closest(".pricing-card__heading")).toContainElement(
      screen.getByRole("heading", { level: 2, name: "Team" }),
    );
  });

  it("renders its story", () => {
    render(<PricingCardStory />);

    expect(screen.getByRole("heading", { name: "Team" })).toBeInTheDocument();
  });

  it("forwards every part's class and style", () => {
    const { container } = render(
      <PricingCard
        name="Team"
        price="$24"
        description="For teams."
        features={["A", "B"]}
        action="Start"
        className="root"
        style={{ color: "red" }}
        headerClassName="header"
        headerStyle={{ color: "red" }}
        nameClassName="name"
        nameStyle={{ color: "red" }}
        priceClassName="price"
        priceStyle={{ color: "red" }}
        descriptionClassName="description"
        descriptionStyle={{ color: "red" }}
        featuresClassName="features"
        featuresStyle={{ color: "red" }}
        featureClassName="feature"
        featureStyle={{ color: "red" }}
        actionClassName="action"
        actionStyle={{ color: "red" }}
      />,
    );
    const red = { color: "rgb(255, 0, 0)" };

    for (const [base, name] of [
      ["pricing-card", "root"],
      ["pricing-card__header", "header"],
      ["pricing-card__name", "name"],
      ["pricing-card__price", "price"],
      ["pricing-card__description", "description"],
      ["pricing-card__features", "features"],
      ["pricing-card__feature", "feature"],
      ["pricing-card__action", "action"],
    ]) {
      const parts = container.querySelectorAll(`.${base}`);
      expect(parts.length, base).toBeGreaterThan(0);
      for (const part of parts) {
        expect(part).toHaveClass(name);
        expect(part).toHaveStyle(red);
      }
    }
  });

  it("requires a name and a price", () => {
    // @ts-expect-error A plan needs its name and its price.
    render(<PricingCard name="Team" />);

    expect(screen.getByRole("heading", { name: "Team" })).toBeInTheDocument();
  });
});
