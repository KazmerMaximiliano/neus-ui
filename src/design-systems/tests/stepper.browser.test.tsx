import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Stepper } from "../../components/Stepper";
import "../../css/app.css";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./design-systems.test-utils";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", sizes: [28, 36, 48], radius: "50%" },
  { id: "apple", sizes: [28, 36, 48], radius: "50%" },
  { id: "carbon", sizes: [24, 32, 40], radius: "50%" },
  { id: "material", sizes: [24, 32, 40], radius: "50%" },
  { id: "neobrutalism", sizes: [28, 36, 48], radius: "4px" },
  { id: "vercel", sizes: [24, 32, 40], radius: "50%" },
] as const;
const SIZES = ["small", "medium", "large"] as const;

describe.each(["light", "dark"] as const)("Stepper designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("renders $id markers, centered connectors and legible states", async (system) => {
    const { container } = render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        {SIZES.map((size) => (
          <Stepper
            key={size}
            size={size}
            currentStep={1}
            totalSteps={3}
            labels={["Profile", "Goals", "Done"]}
            showLabels={size === "small"}
            onStepClick={vi.fn()}
          />
        ))}
        <Stepper variant="linear" currentStep={1} totalSteps={4} />
        <Stepper variant="simple" currentStep={1} totalSteps={3} />
      </ThemeProvider>,
    );
    const steppers = container.querySelectorAll(".stepper--dots");
    SIZES.forEach((_, index) => {
      const dot = steppers[index].querySelector(".stepper__dot")!.getBoundingClientRect();
      const connector = steppers[index].querySelector(".stepper__connector")!.getBoundingClientRect();
      expect(dot.width).toBe(system.sizes[index]);
      expect(connector.top + connector.height / 2).toBeCloseTo(dot.top + dot.height / 2, 0);
    });

    const surface = resolveColor(steppers[0] as HTMLElement, "--color-surface");
    const states = ["done", "active", "inactive"].map((state) =>
      getComputedStyle(steppers[0].querySelector(`.stepper__dot--${state}`)!),
    );
    expect(states[0].borderRadius).toBe(system.radius);
    for (const marker of states) {
      expect(
        contrastRatio(marker.color, flatten(marker.backgroundColor, surface)),
      ).toBeGreaterThanOrEqual(4.5);
    }
    for (const label of steppers[0].querySelectorAll(".stepper__label")) {
      expect(contrastRatio(getComputedStyle(label).color, surface)).toBeGreaterThanOrEqual(4.5);
    }

    const bar = container.querySelector(".stepper__bar")!.getBoundingClientRect();
    const fill = container.querySelector(".stepper__bar-fill")!.getBoundingClientRect();
    expect(fill.width / bar.width).toBeCloseTo(0.5, 1);
    const simple = container.querySelectorAll(".stepper__simple-dot");
    expect(simple[1].getBoundingClientRect().width).toBeGreaterThanOrEqual(
      simple[0].getBoundingClientRect().width,
    );

    await userEvent.tab();
    const completed = screen.getAllByRole("button", { name: /completed/ })[0];
    expect(completed).toHaveFocus();
    expect(getComputedStyle(completed).outlineStyle).toBe("solid");
  });
});
