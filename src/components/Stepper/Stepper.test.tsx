import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Stepper } from "./Stepper";

afterEach(() => {
  cleanup();
});

describe("Stepper", () => {
  describe("dots variant", () => {
    it("renders correct number of step dots", () => {
      const { container } = render(<Stepper currentStep={0} totalSteps={3} />);
      expect(container.querySelectorAll(".stepper__dot")).toHaveLength(3);
    });

    it("applies active class to current step", () => {
      const { container } = render(<Stepper currentStep={1} totalSteps={3} />);
      const dots = container.querySelectorAll(".stepper__dot");
      expect(dots[1]).toHaveClass("stepper__dot--active");
    });

    it("applies done class to completed steps", () => {
      const { container } = render(<Stepper currentStep={2} totalSteps={3} />);
      const dots = container.querySelectorAll(".stepper__dot");
      expect(dots[0]).toHaveClass("stepper__dot--done");
      expect(dots[1]).toHaveClass("stepper__dot--done");
    });

    it("applies inactive class to future steps", () => {
      const { container } = render(<Stepper currentStep={0} totalSteps={3} />);
      const dots = container.querySelectorAll(".stepper__dot");
      expect(dots[1]).toHaveClass("stepper__dot--inactive");
      expect(dots[2]).toHaveClass("stepper__dot--inactive");
    });

    it("shows step numbers on inactive and active dots", () => {
      const { container } = render(<Stepper currentStep={1} totalSteps={3} />);
      expect(container.querySelector(".stepper__dot--inactive")).toHaveTextContent("3");
      expect(container.querySelector(".stepper__dot--active")).toHaveTextContent("2");
    });

    it("sets aria-current=step on active dot", () => {
      const { container } = render(<Stepper currentStep={1} totalSteps={3} />);
      const dots = container.querySelectorAll(".stepper__dot");
      expect(dots[1]).toHaveAttribute("aria-current", "step");
      expect(dots[0]).not.toHaveAttribute("aria-current");
    });

    it("renders connectors between steps by default", () => {
      const { container } = render(<Stepper currentStep={0} totalSteps={3} />);
      expect(container.querySelectorAll(".stepper__connector")).toHaveLength(2);
    });

    it("hides connectors when showConnectors=false", () => {
      const { container } = render(
        <Stepper currentStep={0} totalSteps={3} showConnectors={false} />,
      );
      expect(container.querySelectorAll(".stepper__connector")).toHaveLength(0);
    });

    it("applies done class to connectors for completed steps", () => {
      const { container } = render(<Stepper currentStep={2} totalSteps={3} />);
      const connectors = container.querySelectorAll(".stepper__connector");
      expect(connectors[0]).toHaveClass("stepper__connector--done");
      expect(connectors[1]).toHaveClass("stepper__connector--done");
    });
  });

  describe("labels", () => {
    it("renders labels when showLabels=true and labels provided", () => {
      render(
        <Stepper
          currentStep={0}
          totalSteps={3}
          labels={["First", "Second", "Third"]}
          showLabels
        />,
      );
      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Second")).toBeInTheDocument();
      expect(screen.getByText("Third")).toBeInTheDocument();
    });

    it("does not render labels when showLabels=false", () => {
      render(
        <Stepper
          currentStep={0}
          totalSteps={3}
          labels={["First", "Second", "Third"]}
        />,
      );
      expect(screen.queryByText("First")).not.toBeInTheDocument();
    });

    it("applies correct state class to labels", () => {
      const { container } = render(
        <Stepper
          currentStep={1}
          totalSteps={3}
          labels={["Done", "Active", "Idle"]}
          showLabels
        />,
      );
      const labels = container.querySelectorAll(".stepper__label");
      expect(labels[0]).toHaveClass("stepper__label--done");
      expect(labels[1]).toHaveClass("stepper__label--active");
      expect(labels[2]).toHaveClass("stepper__label--inactive");
    });
  });

  describe("onStepClick", () => {
    it("fires onStepClick when done step is clicked", () => {
      const onStepClick = vi.fn();
      const { container } = render(
        <Stepper currentStep={2} totalSteps={3} onStepClick={onStepClick} />,
      );
      const doneDot = container.querySelector(".stepper__dot--done");
      fireEvent.click(doneDot!);
      expect(onStepClick).toHaveBeenCalledWith(0);
    });

    it("does not fire onStepClick on active step", () => {
      const onStepClick = vi.fn();
      const { container } = render(
        <Stepper currentStep={1} totalSteps={3} onStepClick={onStepClick} />,
      );
      const activeDot = container.querySelector(".stepper__dot--active");
      fireEvent.click(activeDot!);
      expect(onStepClick).not.toHaveBeenCalled();
    });

    it("does not fire onStepClick on inactive step", () => {
      const onStepClick = vi.fn();
      const { container } = render(
        <Stepper currentStep={0} totalSteps={3} onStepClick={onStepClick} />,
      );
      const inactiveDot = container.querySelector(".stepper__dot--inactive");
      fireEvent.click(inactiveDot!);
      expect(onStepClick).not.toHaveBeenCalled();
    });

    it("adds clickable class to done dots when onStepClick provided", () => {
      const { container } = render(
        <Stepper currentStep={2} totalSteps={3} onStepClick={vi.fn()} />,
      );
      const dots = container.querySelectorAll(".stepper__dot");
      expect(dots[0]).toHaveClass("stepper__dot--clickable");
      expect(dots[1]).toHaveClass("stepper__dot--clickable");
      expect(dots[2]).not.toHaveClass("stepper__dot--clickable");
    });

    it("done dots are not clickable when onStepClick not provided", () => {
      const { container } = render(<Stepper currentStep={2} totalSteps={3} />);
      const dots = container.querySelectorAll(".stepper__dot");
      expect(dots[0]).not.toHaveClass("stepper__dot--clickable");
    });

    it("fires onStepClick via Enter key on done dot", () => {
      const onStepClick = vi.fn();
      const { container } = render(
        <Stepper currentStep={2} totalSteps={3} onStepClick={onStepClick} />,
      );
      const doneDot = container.querySelector(".stepper__dot--done");
      fireEvent.keyDown(doneDot!, { key: "Enter" });
      expect(onStepClick).toHaveBeenCalledWith(0);
    });
  });

  describe("linear variant", () => {
    it("renders progress bar", () => {
      const { container } = render(
        <Stepper currentStep={0} totalSteps={3} variant="linear" />,
      );
      expect(container.querySelector(".stepper__bar")).toBeInTheDocument();
      expect(container.querySelector(".stepper__bar-fill")).toBeInTheDocument();
    });

    it("sets correct width on bar fill", () => {
      const { container } = render(
        <Stepper currentStep={1} totalSteps={4} variant="linear" />,
      );
      const fill = container.querySelector(".stepper__bar-fill") as HTMLElement;
      expect(fill.style.width).toBe("50%");
    });

    it("shows step counter when showLabels=true", () => {
      render(
        <Stepper currentStep={1} totalSteps={3} variant="linear" showLabels />,
      );
      expect(screen.getByText("Step 2 of 3")).toBeInTheDocument();
    });

    it("hides step counter when showLabels=false", () => {
      render(<Stepper currentStep={1} totalSteps={3} variant="linear" />);
      expect(screen.queryByText("Step 2 of 3")).not.toBeInTheDocument();
    });
  });

  describe("simple variant", () => {
    it("renders correct number of simple dots", () => {
      const { container } = render(
        <Stepper currentStep={0} totalSteps={4} variant="simple" />,
      );
      expect(container.querySelectorAll(".stepper__simple-dot")).toHaveLength(4);
    });

    it("marks current and previous dots as active", () => {
      const { container } = render(
        <Stepper currentStep={1} totalSteps={3} variant="simple" />,
      );
      const dots = container.querySelectorAll(".stepper__simple-dot");
      expect(dots[0]).toHaveClass("stepper__simple-dot--active");
      expect(dots[1]).toHaveClass("stepper__simple-dot--active");
      expect(dots[2]).not.toHaveClass("stepper__simple-dot--active");
    });
  });

  describe("size", () => {
    it("applies small size class by default", () => {
      const { container } = render(<Stepper currentStep={0} totalSteps={3} />);
      expect(container.querySelector(".stepper__dot")).toHaveClass("stepper__dot--small");
    });

    it("applies medium size class", () => {
      const { container } = render(
        <Stepper currentStep={0} totalSteps={3} size="medium" />,
      );
      expect(container.querySelector(".stepper__dot")).toHaveClass("stepper__dot--medium");
    });

    it("applies large size class", () => {
      const { container } = render(
        <Stepper currentStep={0} totalSteps={3} size="large" />,
      );
      expect(container.querySelector(".stepper__dot")).toHaveClass("stepper__dot--large");
    });

    it("connector carries size class for alignment offset", () => {
      const { container } = render(
        <Stepper currentStep={0} totalSteps={3} size="medium" />,
      );
      expect(container.querySelector(".stepper__connector")).toHaveClass(
        "stepper__connector--size-medium",
      );
    });
  });

  describe("variant class", () => {
    it("applies dots variant class by default", () => {
      const { container } = render(<Stepper currentStep={0} totalSteps={3} />);
      expect(container.querySelector(".stepper")).toHaveClass("stepper--dots");
    });

    it("applies linear variant class", () => {
      const { container } = render(
        <Stepper currentStep={0} totalSteps={3} variant="linear" />,
      );
      expect(container.querySelector(".stepper")).toHaveClass("stepper--linear");
    });

    it("applies simple variant class", () => {
      const { container } = render(
        <Stepper currentStep={0} totalSteps={3} variant="simple" />,
      );
      expect(container.querySelector(".stepper")).toHaveClass("stepper--simple");
    });
  });
});
