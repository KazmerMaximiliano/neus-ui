import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton";
import * as stories from "./Skeleton.stories";

afterEach(cleanup);

const { Skeleton: SkeletonStory } = composeStories(stories);

describe("Skeleton", () => {
  describe("rendering", () => {
    it("renders one hidden text line by default", () => {
      const { container } = render(<Skeleton />);
      const skeleton = container.firstElementChild as HTMLElement;

      expect(skeleton).toHaveClass("skeleton", "skeleton--text");
      expect(skeleton).toHaveAttribute("aria-hidden", "true");
      expect(skeleton.querySelectorAll(".skeleton__line")).toHaveLength(1);
      expect(skeleton.getAttribute("style")).toBeNull();
    });

    it("renders the requested number of lines, never fewer than one", () => {
      const { container, rerender } = render(<Skeleton lines={3} />);

      expect(container.querySelectorAll(".skeleton__line")).toHaveLength(3);

      rerender(<Skeleton lines={0} />);
      expect(container.querySelectorAll(".skeleton__line")).toHaveLength(1);
    });

    it.each(["rect", "circle"] as const)(
      "draws a %s without lines",
      (variant) => {
        const { container } = render(<Skeleton variant={variant} />);

        expect(container.firstElementChild).toHaveClass(`skeleton--${variant}`);
        expect(
          container.querySelector(".skeleton__line"),
        ).not.toBeInTheDocument();
      },
    );

    it("passes sizes as custom properties, numbers as pixels", () => {
      const { container, rerender } = render(
        <Skeleton variant="rect" width={200} height="50%" />,
      );
      const skeleton = container.firstElementChild as HTMLElement;

      expect(skeleton.style.getPropertyValue("--skeleton-width")).toBe("200px");
      expect(skeleton.style.getPropertyValue("--skeleton-height")).toBe("50%");

      rerender(<Skeleton variant="circle" width="3rem" />);
      expect(skeleton.style.getPropertyValue("--skeleton-width")).toBe("3rem");
      expect(skeleton.style.getPropertyValue("--skeleton-height")).toBe("");
    });

    it("renders its story inside a busy region", () => {
      const { container } = render(<SkeletonStory />);

      expect(
        container.querySelector("[aria-busy='true'] .skeleton"),
      ).toBeInTheDocument();
      expect(container.querySelectorAll(".skeleton__line")).toHaveLength(3);
    });
  });

  describe("customization", () => {
    it("forwards native attributes, refs and every part's class and style", () => {
      const ref = createRef<HTMLSpanElement>();
      const { container } = render(
        <Skeleton
          ref={ref}
          id="title"
          lines={2}
          width={120}
          className="root"
          style={{ marginBlock: 8 }}
          lineClassName="line"
          lineStyle={{ color: "red" }}
        />,
      );
      const skeleton = container.firstElementChild as HTMLElement;

      expect(ref.current).toBe(skeleton);
      expect(skeleton).toHaveAttribute("id", "title");
      expect(skeleton).toHaveClass("skeleton", "root");
      expect(skeleton).toHaveStyle({ marginBlock: "8px" });
      expect(skeleton.style.getPropertyValue("--skeleton-width")).toBe("120px");
      for (const line of skeleton.querySelectorAll(".skeleton__line")) {
        expect(line).toHaveClass("line");
        expect(line).toHaveStyle({ color: "rgb(255, 0, 0)" });
      }
    });

    it("stays hidden from assistive technology over native attributes", () => {
      const { container } = render(<Skeleton aria-hidden={false} />);

      expect(container.firstElementChild).toHaveAttribute(
        "aria-hidden",
        "true",
      );
    });

    it("rejects unknown variants and children", () => {
      // @ts-expect-error variants are text, rect and circle
      void (<Skeleton variant="pill" />);
      // @ts-expect-error a placeholder has no content
      void (<Skeleton>Loading</Skeleton>);
    });
  });
});
