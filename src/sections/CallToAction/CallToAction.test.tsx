import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import type { CallToActionProps } from "../../sections";
import { CallToAction } from "../../sections";
import * as stories from "./CallToAction.stories";

afterEach(cleanup);

const { CallToAction: CallToActionStory } = composeStories(stories);

describe("CallToAction", () => {
  it("renders an accent band named by a centered h2, without absent parts", () => {
    const { container } = render(<CallToAction title="Sumate a la lista" />);
    const region = screen.getByRole("region", { name: "Sumate a la lista" });
    expect(region).toHaveClass("section", "call-to-action");
    expect(region).toHaveAttribute("data-tone", "accent");
    expect(region).toHaveAttribute("data-variant", "band");
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute("data-align", "center");
    for (const part of [".call-to-action__text", ".call-to-action__actions", ".call-to-action__aside"]) {
      expect(container.querySelector(part)).not.toBeInTheDocument();
    }
  });

  it("puts the aside beside start-aligned text in split", () => {
    render(<CallToAction variant="split" tone="brand" title="T" text="X" actions={<button type="button">Go</button>} aside={<form aria-label="Signup" />} />);
    const region = screen.getByRole("region");
    expect(region).toHaveAttribute("data-variant", "split");
    expect(region).toHaveAttribute("data-aside");
    expect(region).toHaveAttribute("data-tone", "brand");
    expect(screen.getByRole("heading")).toHaveAttribute("data-align", "start");
    expect(screen.getByRole("form", { name: "Signup" }).parentElement).toHaveClass("call-to-action__aside");
  });

  it("forwards Section props, refs and every part hook", () => {
    const ref = createRef<HTMLElement>();
    const { container } = render(
      <CallToAction ref={ref} id="signup" title="T" text="X" actions={<span>A</span>} aside={<span>S</span>} className="c" style={{ color: "red" }}
        bodyClassName="b" bodyStyle={{ color: "red" }} titleClassName="t" titleStyle={{ color: "red" }} textClassName="x" textStyle={{ color: "red" }}
        actionsClassName="a" actionsStyle={{ color: "red" }} asideClassName="s" asideStyle={{ color: "red" }} />,
    );
    expect(ref.current).toBe(screen.getByRole("region"));
    expect(screen.getByRole("region")).toHaveAttribute("id", "signup");
    for (const [part, extra] of [["call-to-action", "c"], ["call-to-action__body", "b"], ["call-to-action__title", "t"], ["call-to-action__text", "x"],
      ["call-to-action__actions", "a"], ["call-to-action__aside", "s"]]) {
      const element = container.querySelector(`.${part}`)!;
      expect(element, part).toHaveClass(extra);
      expect(element, part).toHaveStyle({ color: "rgb(255, 0, 0)" });
    }
  });

  it("renders its story", () => {
    render(<CallToActionStory />);
    expect(screen.getByRole("region")).toHaveAttribute("data-tone", "brand");
  });

  it("requires a title", () => {
    expectTypeOf<CallToActionProps>().toHaveProperty("aside");
    // @ts-expect-error every call to action has a claim
    void (<CallToAction text="X" />);
  });
});
