import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { SectionProps } from "../../index";
import { Section } from "../../index";
import * as stories from "./Section.stories";

afterEach(cleanup);

const { Section: SectionStory } = composeStories(stories);

describe("Section", () => {
  it("renders a default large band with its content in a large Container", () => {
    const { container } = render(<Section>Content</Section>);
    const band = container.firstElementChild!;
    expect(band.tagName).toBe("SECTION");
    expect(band).toHaveClass("section");
    expect(band).toHaveAttribute("data-tone", "default");
    expect(band).toHaveAttribute("data-spacing", "lg");
    const content = band.firstElementChild!;
    expect(content).toHaveClass("layout-container", "section__content");
    expect(content).toHaveAttribute("data-size", "lg");
    expect(content).toHaveTextContent("Content");
  });

  it("forwards tone, spacing, container size and the content hooks", () => {
    render(
      <Section tone="accent" spacing="sm" container="md" contentClassName="inner" contentStyle={{ color: "red" }}>
        Body
      </Section>,
    );
    const content = screen.getByText("Body");
    expect(content).toHaveClass("section__content", "inner");
    expect(content).toHaveAttribute("data-size", "md");
    expect(content).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(content.parentElement).toHaveAttribute("data-tone", "accent");
    expect(content.parentElement).toHaveAttribute("data-spacing", "sm");
  });

  it("renders children directly without a container and ignores the content hooks", () => {
    const { container } = render(
      <Section container={false} contentClassName="inner">
        <p>Direct</p>
      </Section>,
    );
    expect(container.querySelector(".section__content")).not.toBeInTheDocument();
    expect(container.querySelector(".inner")).not.toBeInTheDocument();
    expect(screen.getByText("Direct").parentElement).toBe(container.firstElementChild);
  });

  it("labels the region and forwards the element, native props, classes, styles and refs", () => {
    const ref = createRef<HTMLElement>();
    render(
      <Section as="footer" ref={ref} id="contact" className="custom" style={{ color: "red" }}>
        Footer
      </Section>,
    );
    const footer = screen.getByRole("contentinfo");
    expect(ref.current).toBe(footer);
    expect(footer).toHaveAttribute("id", "contact");
    expect(footer).toHaveClass("section", "custom");
    expect(footer).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("renders its story as a labelled region", () => {
    render(<SectionStory />);
    expect(screen.getByRole("region", { name: "Not another audio library" })).toHaveAttribute("id", "features");
  });

  it("types tones and container sizes", () => {
    expectTypeOf<SectionProps>().toHaveProperty("contentStyle");
    // @ts-expect-error tones are named roles, not colors
    void (<Section tone="primary" />);
    // @ts-expect-error container takes a size or false
    void (<Section container />);
  });
});
