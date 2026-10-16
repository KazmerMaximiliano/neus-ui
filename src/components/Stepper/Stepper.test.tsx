import {
  cleanup,
  fireEvent,
  render,
  render as renderCustomization,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider as CustomizationThemeProvider } from "../../providers";
import { Stepper as CustomizationComponent, Stepper } from "./Stepper";

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
      expect(
        container.querySelector(".stepper__dot--inactive [aria-hidden]"),
      ).toHaveTextContent("3");
      expect(
        container.querySelector(".stepper__dot--active [aria-hidden]"),
      ).toHaveTextContent("2");
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

    it("renders completed steps as native buttons reachable by keyboard", async () => {
      const onStepClick = vi.fn();
      render(
        <Stepper
          currentStep={2}
          totalSteps={3}
          labels={["Profile", "Goals", "Done"]}
          onStepClick={onStepClick}
        />,
      );
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveAccessibleName("Step 1: Profile, completed");
      await userEvent.tab();
      expect(buttons[0]).toHaveFocus();
      await userEvent.keyboard("{Enter}");
      await userEvent.tab();
      await userEvent.keyboard(" ");
      expect(onStepClick.mock.calls).toEqual([[0], [1]]);
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
      const bar = container.querySelector(".stepper__bar") as HTMLElement;
      expect(bar.style.getPropertyValue("--stepper-progress")).toBe("0.5");
      expect(
        screen.getByRole("progressbar", { name: "Progress" }),
      ).toHaveAttribute("aria-valuetext", "Step 2 of 4");
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
      expect(container.querySelectorAll(".stepper__simple-dot")).toHaveLength(
        4,
      );
    });

    it("marks current and previous dots as active", () => {
      const { container } = render(
        <Stepper currentStep={1} totalSteps={3} variant="simple" />,
      );
      const dots = container.querySelectorAll(".stepper__simple-dot");
      expect(dots[0]).toHaveClass("stepper__simple-dot--active");
      expect(dots[1]).toHaveClass("stepper__simple-dot--active");
      expect(dots[2]).not.toHaveClass("stepper__simple-dot--active");
      expect(dots[1]).toHaveClass("stepper__simple-dot--current");
      expect(dots[0]).not.toHaveClass("stepper__simple-dot--current");
    });

    it("exposes its position as a named progressbar", () => {
      render(<Stepper currentStep={1} totalSteps={3} variant="simple" />);
      const progress = screen.getByRole("progressbar", { name: "Progress" });
      expect(progress).toHaveAttribute("aria-valuenow", "2");
      expect(progress).toHaveAttribute("aria-valuetext", "Step 2 of 3");
    });
  });

  describe("size", () => {
    it("applies small size class by default", () => {
      const { container } = render(<Stepper currentStep={0} totalSteps={3} />);
      expect(container.querySelector(".stepper__dot")).toHaveClass(
        "stepper__dot--small",
      );
    });

    it("applies medium size class", () => {
      const { container } = render(
        <Stepper currentStep={0} totalSteps={3} size="medium" />,
      );
      expect(container.querySelector(".stepper__dot")).toHaveClass(
        "stepper__dot--medium",
      );
    });

    it("applies large size class", () => {
      const { container } = render(
        <Stepper currentStep={0} totalSteps={3} size="large" />,
      );
      expect(container.querySelector(".stepper__dot")).toHaveClass(
        "stepper__dot--large",
      );
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
      expect(container.querySelector(".stepper")).toHaveClass(
        "stepper--linear",
      );
    });

    it("applies simple variant class", () => {
      const { container } = render(
        <Stepper currentStep={0} totalSteps={3} variant="simple" />,
      );
      expect(container.querySelector(".stepper")).toHaveClass(
        "stepper--simple",
      );
    });
  });
});

describe("Stepper accessibility and parts", () => {
  it("announces each step state in text, not only through color", () => {
    const { container } = render(
      <Stepper
        currentStep={1}
        totalSteps={3}
        labels={["A", "B", "C"]}
        showLabels
      />,
    );
    const dots = container.querySelectorAll(".stepper__dot");
    expect(dots[0]).toHaveTextContent("Step 1, completed");
    expect(dots[1]).toHaveTextContent("Step 2, current");
    expect(dots[2]).toHaveTextContent("Step 3, not started");
  });

  it("names hidden labels in the step announcement", () => {
    const { container } = render(
      <Stepper currentStep={0} totalSteps={2} labels={["Profile", "Done"]} />,
    );
    expect(container.querySelector(".stepper__dot")).toHaveTextContent(
      "Step 1: Profile, current",
    );
  });

  it("applies each style object to its parts", () => {
    const { container, rerender } = render(
      <Stepper
        currentStep={1}
        totalSteps={2}
        labels={["A", "B"]}
        showLabels
        dotStyle={{ width: 40 }}
        labelStyle={{ fontSize: 19 }}
        connectorStyle={{ height: 5 }}
      />,
    );
    expect(container.querySelector(".stepper__dot")).toHaveStyle({
      width: "40px",
    });
    expect(screen.getByText("A")).toHaveStyle({ fontSize: "19px" });
    expect(container.querySelector(".stepper__connector")).toHaveStyle({
      height: "5px",
    });
    rerender(
      <Stepper
        currentStep={1}
        totalSteps={2}
        variant="linear"
        showLabels
        barStyle={{ height: 9 }}
        labelStyle={{ fontSize: 19 }}
      />,
    );
    const bar = container.querySelector(".stepper__bar") as HTMLElement;
    expect(bar).toHaveStyle({ height: "9px" });
    expect(bar.style.getPropertyValue("--stepper-progress")).toBe("1");
    expect(screen.getByText("Step 2 of 2")).toHaveStyle({ fontSize: "19px" });
  });

  it("adds the size class to the root for token scaling", () => {
    const { container } = render(
      <Stepper currentStep={0} totalSteps={2} size="large" />,
    );
    expect(container.firstElementChild).toHaveClass(
      "stepper",
      "stepper--dots",
      "stepper--large",
    );
  });
});

describe("Stepper part customization", () => {
  it.each([
    {
      cls: "className",
      sty: "style",
      base: "stepper",
      phase: "dots",
    },
    {
      cls: "trackClassName",
      sty: "trackStyle",
      base: "stepper__track",
      phase: "dots",
    },
    {
      cls: "stepClassName",
      sty: "stepStyle",
      base: "stepper__step",
      phase: "dots",
    },
    {
      cls: "dotClassName",
      sty: "dotStyle",
      base: "stepper__dot",
      phase: "dots",
    },
    {
      cls: "checkClassName",
      sty: "checkStyle",
      base: "stepper__check",
      phase: "dots",
    },
    {
      cls: "srOnlyClassName",
      sty: "srOnlyStyle",
      base: "stepper__sr-only",
      phase: "dots",
    },
    {
      cls: "labelClassName",
      sty: "labelStyle",
      base: "stepper__label",
      phase: "dots",
    },
    {
      cls: "connectorClassName",
      sty: "connectorStyle",
      base: "stepper__connector",
      phase: "dots",
    },
    {
      cls: "labelClassName",
      sty: "labelStyle",
      base: "stepper__counter",
      phase: "linear",
    },
    {
      cls: "barClassName",
      sty: "barStyle",
      base: "stepper__bar",
      phase: "linear",
    },
    {
      cls: "barFillClassName",
      sty: "barFillStyle",
      base: "stepper__bar-fill",
      phase: "linear",
    },
    {
      cls: "dotClassName",
      sty: "dotStyle",
      base: "stepper__simple-dot",
      phase: "simple",
    },
  ])(
    "applies and removes $cls / $sty ($phase) while preserving base classes",
    async ({ cls, sty, base, phase }) => {
      const overrides = {
        [cls]: "consumer-part",
        [sty]: { outlineOffset: "7px" },
      };
      const view = renderCustomization(
        <CustomizationThemeProvider scope="local">
          <CustomizationComponent
            variant={
              phase === "linear"
                ? "linear"
                : phase === "simple"
                  ? "simple"
                  : "dots"
            }
            currentStep={1}
            totalSteps={4}
            showLabels
            labels={["One", "Two", "Three", "Four"]}
            {...overrides}
          />
        </CustomizationThemeProvider>,
      );
      const targets = view.container.querySelectorAll(".consumer-part");
      expect(targets.length).toBeGreaterThan(0);
      for (const target of targets) {
        expect(target).toHaveClass(base);
        expect(target).toHaveStyle({ outlineOffset: "7px" });
      }
      view.rerender(
        <CustomizationThemeProvider scope="local">
          <CustomizationComponent
            variant={
              phase === "linear"
                ? "linear"
                : phase === "simple"
                  ? "simple"
                  : "dots"
            }
            currentStep={1}
            totalSteps={4}
            showLabels
            labels={["One", "Two", "Three", "Four"]}
          />
        </CustomizationThemeProvider>,
      );
      expect(view.container.querySelector(".consumer-part")).toBeNull();
      for (const target of view.container.querySelectorAll("." + base)) {
        expect((target as HTMLElement).style.outlineOffset).not.toBe("7px");
      }
    },
  );
});
