import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { TextProps } from "../../index";
import { Text } from "../../index";
import * as stories from "./Text.stories";

afterEach(cleanup);

const { Text: TextStory } = composeStories(stories);

describe("Text", () => {
  it("renders a measured body paragraph that inherits its color", () => {
    const { container } = render(<Text>Running text</Text>);
    const text = container.firstElementChild!;
    expect(text.tagName).toBe("P");
    expect(text).toHaveClass("text");
    expect(text).toHaveAttribute("data-variant", "body");
    expect(text).toHaveAttribute("data-tone", "default");
    expect(text).toHaveAttribute("data-align", "start");
    expect(text).toHaveAttribute("data-measure");
    expect(text).not.toHaveAttribute("data-weight");
    expect(text).not.toHaveAttribute("data-numeric");
    expect(text).not.toHaveAttribute("style");
  });

  it.each([
    ["lead", true], ["body", true], ["small", false], ["caption", false], ["overline", false],
  ] as const)("measures %s only by default (%s)", (variant, measured) => {
    const { container } = render(<Text variant={variant}>Text</Text>);
    expect(container.firstElementChild!.hasAttribute("data-measure")).toBe(measured);
  });

  it("renders the chosen element, tone, weight, alignment and numeric figures", () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Text as="span" ref={ref} variant="caption" tone="muted" weight="semibold" align="center" numeric measure>
        42
      </Text>,
    );
    const text = screen.getByText("42");
    expect(ref.current).toBe(text);
    expect(text.tagName).toBe("SPAN");
    expect(text).toHaveAttribute("data-tone", "muted");
    expect(text).toHaveAttribute("data-weight", "semibold");
    expect(text).toHaveAttribute("data-align", "center");
    expect(text).toHaveAttribute("data-measure");
    expect(text).toHaveAttribute("data-numeric");
  });

  it("clamps lines through a custom property merged before the consumer style", () => {
    render(
      <Text lines={2} style={{ color: "red" }} className="custom" id="summary">
        Long text
      </Text>,
    );
    const text = screen.getByText("Long text");
    expect(text).toHaveAttribute("data-lines", "2");
    expect(text.style.getPropertyValue("--text-lines")).toBe("2");
    expect(text).toHaveStyle({ color: "rgb(255, 0, 0)" });
    expect(text).toHaveClass("text", "custom");
    expect(text).toHaveAttribute("id", "summary");
  });

  it("renders its story", () => {
    render(<TextStory />);
    expect(screen.getByText(/Short guided sessions/)).toHaveAttribute("data-variant", "lead");
  });

  it("types the element and its native props", () => {
    expectTypeOf<TextProps<"span">>().toHaveProperty("ref");
    expectTypeOf<TextProps>().toHaveProperty("variant");
    // @ts-expect-error headings use Heading
    void (<Text as="h2">Title</Text>);
    // @ts-expect-error tones are semantic roles, not colors
    void (<Text tone="red">Text</Text>);
  });
});
