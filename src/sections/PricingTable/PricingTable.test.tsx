import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { PricingCard } from "../PricingCard";
import { PricingTable } from "./PricingTable";
import * as stories from "./PricingTable.stories";

afterEach(cleanup);

const { PricingTable: PricingTableStory } = composeStories(stories);

describe("PricingTable", () => {
  it("lists its plans as list items in a grid", () => {
    render(
      <PricingTable aria-label="Plans" columns={2} className="plans">
        <PricingCard name="Hobby" price="Free" />
        <PricingCard name="Team" price="$24" featured />
      </PricingTable>,
    );
    const list = screen.getByRole("list", { name: "Plans" });
    const plans = within(list).getAllByRole("listitem");

    expect(list.tagName).toBe("UL");
    expect(list).toHaveClass("grid", "pricing-table", "plans");
    expect(list.style.getPropertyValue("--grid-columns")).toBe("2");
    expect(plans).toHaveLength(2);
    expect(plans[1]).toHaveClass("card", "pricing-card");
    expect(plans[1]).toHaveAttribute("data-featured", "true");
  });

  it("renders its story", () => {
    render(<PricingTableStory />);

    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(3);
    expect(screen.getByText("Most popular")).toBeInTheDocument();
  });

  it("requires its plans", () => {
    // @ts-expect-error A pricing table needs its PricingCards.
    render(<PricingTable />);

    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
