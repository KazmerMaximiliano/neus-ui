import { createRef } from "react";
import { composeStories } from "@storybook/react-vite";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Progress } from "./Progress";
import * as stories from "./Progress.stories";

afterEach(cleanup);

const { Progress: ProgressStory } = composeStories(stories);

describe("Progress", () => {
  describe("rendering", () => {
    it("exposes a determinate value from 0 to 100 by default", () => {
      render(<Progress aria-label="Upload" value={40} />);
      const bar = screen.getByRole("progressbar", { name: "Upload" });

      expect(bar).toHaveAttribute("aria-valuenow", "40");
      expect(bar).toHaveAttribute("aria-valuemin", "0");
      expect(bar).toHaveAttribute("aria-valuemax", "100");
      expect(bar).not.toHaveAttribute("aria-valuetext");
      expect(bar).toHaveClass("progress", "progress--medium");
      expect(bar).not.toHaveClass("progress--indeterminate");
      expect(bar.style.getPropertyValue("--progress-value")).toBe("0.4");
      expect(
        bar.querySelector(".progress__track > .progress__fill"),
      ).toBeInTheDocument();
    });

    it("names the bar with its visible label", () => {
      render(<Progress label="Uploading photos" value={2} max={8} />);

      expect(
        screen.getByRole("progressbar", { name: "Uploading photos" }),
      ).toHaveAttribute("aria-valuemax", "8");
      expect(screen.getByText("Uploading photos")).toHaveClass(
        "progress__label",
      );
    });

    it("becomes indeterminate without a value", () => {
      render(<Progress aria-label="Syncing" />);
      const bar = screen.getByRole("progressbar", { name: "Syncing" });

      expect(bar).toHaveClass("progress--indeterminate");
      for (const attribute of [
        "aria-valuenow",
        "aria-valuemin",
        "aria-valuemax",
      ]) {
        expect(bar).not.toHaveAttribute(attribute);
      }
      expect(bar.style.getPropertyValue("--progress-value")).toBe("");
    });

    it("shows the percentage, or the value in words, with showValue", () => {
      const { rerender } = render(
        <Progress label="Upload" value={1} max={3} showValue />,
      );

      expect(screen.getByText("33%")).toHaveClass("progress__value");
      expect(screen.getByText("33%")).toHaveAttribute("aria-hidden", "true");

      rerender(
        <Progress
          label="Upload"
          value={1}
          max={3}
          valueText="1 of 3 files"
          showValue
        />,
      );
      expect(screen.getByText("1 of 3 files")).toBeInTheDocument();
      expect(screen.getByRole("progressbar")).toHaveAttribute(
        "aria-valuetext",
        "1 of 3 files",
      );

      rerender(
        <Progress label="Upload" value={1} max={3} valueText="1 of 3 files" />,
      );
      expect(screen.queryByText("1 of 3 files")).not.toBeInTheDocument();
    });

    it("shows no value while indeterminate unless it has words for it", () => {
      const { container, rerender } = render(
        <Progress label="Sync" showValue />,
      );

      expect(
        container.querySelector(".progress__value"),
      ).not.toBeInTheDocument();

      rerender(<Progress label="Sync" showValue valueText="Preparing files" />);
      expect(screen.getByText("Preparing files")).toBeInTheDocument();
    });

    it("keeps the value inside min and max", () => {
      const { rerender } = render(
        <Progress aria-label="Steps" value={12} min={1} max={10} />,
      );
      const bar = screen.getByRole("progressbar");

      expect(bar).toHaveAttribute("aria-valuenow", "10");
      expect(bar.style.getPropertyValue("--progress-value")).toBe("1");

      rerender(<Progress aria-label="Steps" value={-3} min={1} max={10} />);
      expect(bar).toHaveAttribute("aria-valuenow", "1");
      expect(bar.style.getPropertyValue("--progress-value")).toBe("0");

      rerender(<Progress aria-label="Steps" value={5} min={5} max={5} />);
      expect(bar.style.getPropertyValue("--progress-value")).toBe("0");
    });

    it.each(["small", "large"] as const)("applies the %s size", (size) => {
      render(<Progress aria-label="Upload" value={1} size={size} />);

      expect(screen.getByRole("progressbar")).toHaveClass(`progress--${size}`);
    });

    it("renders its story", () => {
      render(<ProgressStory />);

      const bar = screen.getByRole("progressbar", { name: "Uploading photos" });

      expect(bar).toHaveClass("progress--indeterminate");
      expect(bar).not.toHaveAttribute("aria-valuenow");
    });
  });

  describe("customization", () => {
    it("forwards native attributes, refs and every part's class and style", () => {
      const ref = createRef<HTMLDivElement>();
      render(
        <Progress
          ref={ref}
          id="upload"
          aria-describedby="hint"
          label="Upload"
          value={50}
          showValue
          className="root"
          style={{ marginBlock: 8 }}
          labelClassName="label"
          labelStyle={{ color: "red" }}
          valueClassName="value"
          valueStyle={{ color: "red" }}
          trackClassName="track"
          trackStyle={{ color: "red" }}
          fillClassName="fill"
          fillStyle={{ color: "red" }}
        />,
      );
      const bar = screen.getByRole("progressbar");

      expect(ref.current).toBe(bar);
      expect(bar).toHaveAttribute("id", "upload");
      expect(bar).toHaveAttribute("aria-describedby", "hint");
      expect(bar).toHaveClass("progress", "root");
      expect(bar).toHaveStyle({ marginBlock: "8px" });
      expect(bar.style.getPropertyValue("--progress-value")).toBe("0.5");
      for (const [part, extra] of [
        ["progress__label", "label"],
        ["progress__value", "value"],
        ["progress__track", "track"],
        ["progress__fill", "fill"],
      ]) {
        const element = bar.querySelector(`.${part}`)!;
        expect(element).toHaveClass(extra);
        expect(element).toHaveStyle({ color: "rgb(255, 0, 0)" });
      }
    });

    it("lets aria-labelledby replace the visible label as the name", () => {
      render(
        <>
          <h2 id="heading">Backup</h2>
          <Progress label="Copying" aria-labelledby="heading" value={10} />
        </>,
      );

      expect(
        screen.getByRole("progressbar", { name: "Backup" }),
      ).toBeInTheDocument();
    });

    it("rejects unknown sizes, roles and children", () => {
      // @ts-expect-error sizes are small, medium and large
      void (<Progress size="xl" />);
      // @ts-expect-error the role is always progressbar
      void (<Progress role="meter" />);
      // @ts-expect-error the bar draws its own parts
      void (<Progress>50%</Progress>);
    });
  });
});
