import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { FeatureItemProps } from "../../../../sections";
import { FeatureItem, FeatureList } from "../../../../sections";
import * as stories from "./FeatureItem.stories";

afterEach(cleanup);

const { FeatureItem: FeatureItemStory } = composeStories(stories);

describe("FeatureItem", () => {
  it("renders a grid list item with an h3 at size sm and a decorative icon tile", () => {
    render(<ul><FeatureItem icon={<svg data-testid="icon" />} title="Turnos online">Pedí turno desde el celular.</FeatureItem></ul>);
    const item = screen.getByRole("listitem");
    expect(item).toHaveClass("feature-item");
    expect(item).toHaveAttribute("data-variant-item", "grid");
    const heading = screen.getByRole("heading", { level: 3, name: "Turnos online" });
    expect(heading).toHaveAttribute("data-size", "sm");
    expect(screen.getByTestId("icon").parentElement).toHaveClass("feature-item__icon");
    expect(screen.getByTestId("icon").parentElement).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Pedí turno desde el celular.")).toHaveClass("feature-item__description");
  });

  it("becomes a Card list item inside a cards list, without empty parts", () => {
    const { container } = render(<FeatureList variant="cards"><FeatureItem title="Vacunación" /></FeatureList>);
    const item = screen.getByRole("listitem");
    expect(item).toHaveClass("card", "feature-item");
    expect(item.querySelector(".card-header")).toHaveClass("feature-item__header");
    for (const part of [".feature-item__icon", ".feature-item__description", ".feature-item__action"]) {
      expect(container.querySelector(part)).not.toBeInTheDocument();
    }
  });

  it("takes the list variant, a heading level and every part hook", () => {
    render(
      <FeatureList variant="list">
        <FeatureItem icon={<svg />} title="Consultas" titleAs="h4" action={<a href="#turno">Pedir turno</a>}
          className="f" style={{ color: "red" }} iconClassName="i" iconStyle={{ color: "red" }}
          titleClassName="t" titleStyle={{ color: "red" }} descriptionClassName="d" descriptionStyle={{ color: "red" }}
          actionClassName="a" actionStyle={{ color: "red" }}>
          Controles de rutina.
        </FeatureItem>
      </FeatureList>,
    );
    const item = screen.getByRole("listitem");
    expect(item).toHaveAttribute("data-variant-item", "list");
    expect(item).toHaveClass("feature-item", "f");
    expect(screen.getByRole("heading", { level: 4 })).toHaveClass("feature-item__title", "t");
    for (const [part, extra] of [["feature-item__icon", "i"], ["feature-item__description", "d"], ["feature-item__action", "a"]]) {
      const element = item.querySelector(`.${part}`)!;
      expect(element).toHaveClass(extra);
      expect(element).toHaveStyle({ color: "rgb(255, 0, 0)" });
    }
  });

  it("renders its story", () => {
    render(<FeatureItemStory />);
    expect(screen.getByRole("heading", { name: "Fits between two meetings" })).toBeInTheDocument();
  });

  it("requires a title", () => {
    expectTypeOf<FeatureItemProps>().toHaveProperty("icon");
    // @ts-expect-error every feature has a title
    void (<FeatureItem>Text</FeatureItem>);
  });
});
