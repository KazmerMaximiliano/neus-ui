import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { SectionHeaderProps } from "../../sections";
import { SectionHeader } from "../../sections";
import * as stories from "./SectionHeader.stories";

afterEach(cleanup);

const { SectionHeader: SectionHeaderStory } = composeStories(stories);

describe("SectionHeader", () => {
  it("renders an h2 at the default size, start-aligned, without absent parts", () => {
    const { container } = render(<SectionHeader title="El equipo" />);
    expect(container.firstElementChild).toHaveClass("section-header");
    expect(container.firstElementChild).toHaveAttribute("data-align", "start");
    expect(screen.getByRole("heading", { level: 2, name: "El equipo" })).toHaveAttribute("data-size", "lg");
    for (const part of [".section-header__eyebrow", ".section-header__description", ".section-header__actions"]) {
      expect(container.querySelector(part)).not.toBeInTheDocument();
    }
  });

  it("renders eyebrow, description, actions, a heading id and level, centered", () => {
    render(<SectionHeader align="center" titleAs="h3" titleId="team" title="T" eyebrow="E" description="D" actions={<a href="/team">All</a>} />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveAttribute("id", "team");
    expect(heading).toHaveAttribute("data-align", "center");
    expect(screen.getByText("E")).toHaveAttribute("data-variant", "overline");
    expect(screen.getByText("D")).toHaveAttribute("data-variant", "lead");
    expect(screen.getByRole("link", { name: "All" }).parentElement).toHaveClass("section-header__actions");
  });

  it("forwards native attributes, refs and every part hook", () => {
    const ref = createRef<HTMLDivElement>();
    const { container } = render(
      <SectionHeader ref={ref} id="h" title="T" eyebrow="E" description="D" actions={<span>A</span>} className="s" style={{ color: "red" }}
        eyebrowClassName="e" eyebrowStyle={{ color: "red" }} titleClassName="t" titleStyle={{ color: "red" }}
        descriptionClassName="d" descriptionStyle={{ color: "red" }} actionsClassName="a" actionsStyle={{ color: "red" }} />,
    );
    expect(ref.current).toBe(container.firstElementChild);
    expect(container.firstElementChild).toHaveAttribute("id", "h");
    for (const [part, extra] of [["section-header", "s"], ["section-header__eyebrow", "e"], ["section-header__title", "t"],
      ["section-header__description", "d"], ["section-header__actions", "a"]]) {
      const element = container.querySelector(`.${part}`)!;
      expect(element, part).toHaveClass(extra);
      expect(element, part).toHaveStyle({ color: "rgb(255, 0, 0)" });
    }
  });

  it("renders its story", () => {
    render(<SectionHeaderStory />);
    expect(screen.getByRole("heading", { name: "Two days, two tracks" })).toHaveAttribute("id", "agenda-title");
  });

  it("requires a title", () => {
    expectTypeOf<SectionHeaderProps>().toHaveProperty("titleId");
    // @ts-expect-error every section header has a title
    void (<SectionHeader description="D" />);
  });
});
