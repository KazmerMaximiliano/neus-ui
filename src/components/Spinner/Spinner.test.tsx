import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Spinner } from "./Spinner";
import * as stories from "./Spinner.stories";

afterEach(cleanup);

const { Spinner: SpinnerStory } = composeStories(stories);

describe("Spinner", () => {
  describe("rendering", () => {
    it("renders a decorative medium ring by default", () => {
      const { container } = render(<Spinner />);
      const spinner = container.firstElementChild!;

      expect(spinner).toHaveClass(
        "spinner",
        "spinner--ring",
        "spinner--medium",
      );
      expect(spinner).toHaveAttribute("aria-hidden", "true");
      expect(spinner).not.toHaveAttribute("role");
      expect(spinner.querySelector(".spinner__ring")).toBeInTheDocument();
      expect(spinner.querySelector(".spinner__label")).not.toBeInTheDocument();
    });

    it("announces its label as a polite status", () => {
      render(<Spinner label="Loading results" />);
      const status = screen.getByRole("status");

      expect(status).toHaveTextContent("Loading results");
      expect(status).not.toHaveAttribute("aria-hidden");
      expect(screen.getByText("Loading results")).toHaveClass("spinner__label");
    });

    it("renders three dots in the dots variant", () => {
      const { container } = render(<Spinner variant="dots" />);
      const spinner = container.firstElementChild!;

      expect(spinner).toHaveClass("spinner--dots");
      expect(spinner.querySelectorAll(".spinner__dot")).toHaveLength(3);
      expect(spinner.querySelector(".spinner__ring")).not.toBeInTheDocument();
    });

    it.each(["small", "large"] as const)("applies the %s size", (size) => {
      const { container } = render(<Spinner size={size} />);

      expect(container.firstElementChild).toHaveClass(`spinner--${size}`);
    });

    it("renders its story", () => {
      render(<SpinnerStory />);

      expect(screen.getByRole("status")).toHaveTextContent("Loading results");
      expect(screen.getByRole("status")).toHaveClass("spinner--ring");
    });
  });

  describe("customization", () => {
    it("forwards native attributes, refs and every part's class and style", () => {
      const ref = createRef<HTMLSpanElement>();
      const { rerender } = render(
        <Spinner
          ref={ref}
          id="loading"
          label="Saving"
          className="root"
          style={{ marginInline: 8 }}
          ringClassName="ring"
          ringStyle={{ color: "red" }}
          labelClassName="text"
          labelStyle={{ color: "red" }}
        />,
      );
      const spinner = screen.getByRole("status");

      expect(ref.current).toBe(spinner);
      expect(spinner).toHaveAttribute("id", "loading");
      expect(spinner).toHaveClass("spinner", "root");
      expect(spinner).toHaveStyle({ marginInline: "8px" });
      for (const [part, extra] of [
        ["spinner__ring", "ring"],
        ["spinner__label", "text"],
      ]) {
        const element = spinner.querySelector(`.${part}`)!;
        expect(element).toHaveClass(extra);
        expect(element).toHaveStyle({ color: "rgb(255, 0, 0)" });
      }

      rerender(
        <Spinner
          variant="dots"
          dotClassName="dot"
          dotStyle={{ color: "red" }}
        />,
      );
      for (const dot of document.querySelectorAll(".spinner__dot")) {
        expect(dot).toHaveClass("dot");
        expect(dot).toHaveStyle({ color: "rgb(255, 0, 0)" });
      }

      rerender(<Spinner variant="dots" />);
      expect(document.querySelector(".spinner__dot")).toHaveAttribute(
        "class",
        "spinner__dot",
      );
      expect(
        document.querySelector(".spinner__dot")?.getAttribute("style") ?? "",
      ).toBe("");
    });

    it("keeps its own role and hidden state over native attributes", () => {
      // @ts-expect-error the role comes from the label
      render(<Spinner role="alert" aria-hidden={false} />);

      expect(document.querySelector(".spinner")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      expect(document.querySelector(".spinner")).not.toHaveAttribute("role");
    });

    it("rejects unknown variants, sizes and children", () => {
      // @ts-expect-error variants are ring and dots
      void (<Spinner variant="bars" />);
      // @ts-expect-error sizes are small, medium and large
      void (<Spinner size="xl" />);
      // @ts-expect-error the spinner draws its own parts
      void (<Spinner>Loading</Spinner>);
    });
  });
});
