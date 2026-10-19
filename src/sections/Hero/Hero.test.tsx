import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { HeroProps } from "../../sections";
import { Hero } from "../../sections";
import * as stories from "./Hero.stories";

afterEach(cleanup);

const { Hero: HeroStory } = composeStories(stories);

describe("Hero", () => {
  it("renders a region named by a display h1, without absent parts", () => {
    const { container } = render(<Hero title="Respirá entre reunión y reunión" />);
    const region = screen.getByRole("region", { name: "Respirá entre reunión y reunión" });
    expect(region).toHaveClass("section", "hero");
    expect(region).toHaveAttribute("data-variant", "split");
    expect(region).not.toHaveAttribute("data-media");
    expect(screen.getByRole("heading", { level: 1 })).toHaveAttribute("data-size", "display");
    expect(container.querySelector(".section__content")).toHaveClass("hero__layout");
    for (const part of [".hero__eyebrow", ".hero__lead", ".hero__actions", ".hero__note", ".hero__media"]) {
      expect(container.querySelector(part)).not.toBeInTheDocument();
    }
  });

  it("renders every slot and centers the text in the centered variant", () => {
    render(
      <Hero variant="centered" titleAs="h2" title="T" eyebrow="E" lead="L" note="N"
        actions={<button type="button">Go</button>} media={<img alt="Pic" src="/p.jpg" />} />,
    );
    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("data-variant", "centered");
    expect(region).toHaveAttribute("data-media");
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute("data-align", "center");
    expect(screen.getByText("E")).toHaveAttribute("data-variant", "overline");
    expect(screen.getByText("L")).toHaveAttribute("data-variant", "lead");
    expect(screen.getByText("N")).toHaveAttribute("data-variant", "small");
    expect(screen.getByRole("button", { name: "Go" }).parentElement).toHaveClass("hero__actions");
    expect(screen.getByRole("img", { name: "Pic" }).parentElement).toHaveClass("hero__media");
  });

  it("forwards Section props, refs and every part hook", () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(
      <Hero ref={ref} id="inicio" tone="subtle" title="T" eyebrow="E" lead="L" note="N" actions={<span>A</span>} media={<span>M</span>}
        className="h" style={{ color: "red" }} bodyClassName="b" bodyStyle={{ color: "red" }} eyebrowClassName="e" eyebrowStyle={{ color: "red" }}
        titleClassName="t" titleStyle={{ color: "red" }} leadClassName="l" leadStyle={{ color: "red" }} actionsClassName="a" actionsStyle={{ color: "red" }}
        noteClassName="n" noteStyle={{ color: "red" }} mediaClassName="m" mediaStyle={{ color: "red" }} />,
    );
    expect(ref.current).toBe(screen.getByRole("region"));
    expect(screen.getByRole("region")).toHaveAttribute("id", "inicio");
    expect(screen.getByRole("region")).toHaveAttribute("data-tone", "subtle");
    for (const [part, extra] of [["hero", "h"], ["hero__body", "b"], ["hero__eyebrow", "e"], ["hero__title", "t"], ["hero__lead", "l"],
      ["hero__actions", "a"], ["hero__note", "n"], ["hero__media", "m"]]) {
      const element = container.querySelector(`.${part}`)!;
      expect(element, part).toHaveClass(extra);
      expect(element, part).toHaveStyle({ color: "rgb(255, 0, 0)" });
    }
  });

  it("renders its story", () => {
    render(<HeroStory />);
    expect(screen.getByRole("img", { name: /Vet examining a dog/ })).toBeInTheDocument();
  });

  it("requires a title", () => {
    expectTypeOf<HeroProps>().toHaveProperty("media");
    // @ts-expect-error every hero has a headline
    void (<Hero lead="L" />);
  });
});
