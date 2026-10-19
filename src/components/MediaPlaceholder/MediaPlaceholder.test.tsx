import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { MediaPlaceholderProps } from "../../index";
import { MediaPlaceholder } from "../../index";
import * as stories from "./MediaPlaceholder.stories";

afterEach(cleanup);

const { MediaPlaceholder: MediaPlaceholderStory } = composeStories(stories);

describe("MediaPlaceholder", () => {
  it("renders an image role named by its label, with the label visible once", () => {
    render(<MediaPlaceholder label="Team portrait" />);
    const frame = screen.getByRole("img", { name: "Team portrait" });
    expect(frame).toHaveClass("media-placeholder");
    expect(frame.style.getPropertyValue("--media-placeholder-ratio")).toBe("4 / 3");
    const label = frame.querySelector(".media-placeholder__label")!;
    expect(label).toHaveTextContent("Team portrait");
    expect(label).toHaveAttribute("aria-hidden", "true");
  });

  it("forwards ratio, native attributes, classes, styles and refs to their parts", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <MediaPlaceholder ref={ref} label="Map" ratio="16 / 9" id="map" className="frame" style={{ maxWidth: 320 }}
        labelClassName="caption" labelStyle={{ color: "red" }} />,
    );
    const frame = screen.getByRole("img", { name: "Map" });
    expect(ref.current).toBe(frame);
    expect(frame).toHaveAttribute("id", "map");
    expect(frame).toHaveClass("media-placeholder", "frame");
    expect(frame.style.getPropertyValue("--media-placeholder-ratio")).toBe("16 / 9");
    expect(frame).toHaveStyle({ maxWidth: "320px" });
    expect(frame.firstElementChild).toHaveClass("media-placeholder__label", "caption");
    expect(frame.firstElementChild).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("renders its story", () => {
    render(<MediaPlaceholderStory />);
    expect(screen.getByRole("img", { name: /Vet examining a dog/ })).toBeInTheDocument();
  });

  it("requires a label and takes no children", () => {
    expectTypeOf<MediaPlaceholderProps>().toHaveProperty("label");
    // @ts-expect-error the label is what the picture will show
    void (<MediaPlaceholder />);
    // @ts-expect-error the frame has no children
    void (<MediaPlaceholder label="x">child</MediaPlaceholder>);
  });
});
