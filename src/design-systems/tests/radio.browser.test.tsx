import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { cdp } from "vitest/browser";
import { Radio } from "../../components/Radio";
import { RadioGroup } from "../../components/RadioGroup";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import type { RadioGroupProps } from "../../components/RadioGroup";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", circle: 18, dot: 8 },
  { id: "apple", circle: 18, dot: 6 },
  { id: "carbon", circle: 18, dot: 8 },
  { id: "material", circle: 20, dot: 10 },
  { id: "neobrutalism", circle: 22, dot: 10 },
  { id: "vercel", circle: 16, dot: 6 },
] as const;

const parts = (name: string) => {
  const control = screen.getByRole("radio", { name });
  const circle = control.nextElementSibling as HTMLElement;
  return { control, circle, dot: circle.firstElementChild as HTMLElement };
};

const delivery = (props: Partial<RadioGroupProps> = {}) => (
  <RadioGroup label="Delivery" {...props}>
    <Radio value="standard" label="Standard" />
    <Radio value="express" label="Express" />
  </RadioGroup>
);

describe.each(["light", "dark"] as const)("Radio designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("draws the $id circle and dot with 3:1 in both states", async (system) => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        {delivery()}
      </ThemeProvider>,
    );
    const { circle, dot } = parts("Standard");
    const surface = resolveColor(circle, "--color-surface");
    const styles = () => getComputedStyle(circle);
    const fill = () => flatten(styles().backgroundColor, surface);

    expect([circle.offsetWidth, circle.offsetHeight]).toEqual([system.circle, system.circle]);
    expect(styles().borderTopLeftRadius).toBe("50%");
    expect(dot.getBoundingClientRect().width).toBe(0);
    expect(contrastRatio(styles().borderTopColor, surface)).toBeGreaterThanOrEqual(3);

    await user.click(screen.getByText("Standard"));
    await waitFor(() => expect(dot.getBoundingClientRect().width).toBeCloseTo(system.dot, 1));
    await waitFor(() => expect(Math.max(
      contrastRatio(fill(), surface),
      contrastRatio(styles().borderTopColor, surface),
    )).toBeGreaterThanOrEqual(3));
    expect(contrastRatio(getComputedStyle(dot).backgroundColor, fill())).toBeGreaterThanOrEqual(3);

    for (const text of ["Standard", "Delivery"]) {
      expect(contrastRatio(getComputedStyle(screen.getByText(text)).color, surface)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it.each(SYSTEMS)("shows $id keyboard focus, an error and a disabled radio", async (system) => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        {delivery({ error: "Choose a delivery." })}
        <RadioGroup label="Plan" defaultValue="pro">
          <Radio value="pro" label="Pro" disabled />
        </RadioGroup>
      </ThemeProvider>,
    );
    const standard = parts("Standard");
    const pro = parts("Pro");
    const surface = resolveColor(standard.circle, "--color-surface");

    await user.tab();
    expect(standard.control).toHaveFocus();
    expect(getComputedStyle(standard.circle).outlineStyle).toBe("solid");
    expect(getComputedStyle(standard.circle).outlineColor).toBe(resolveColor(standard.circle, "--color-focus"));
    expect(getComputedStyle(standard.circle).borderTopColor)
      .toBe(resolveColor(standard.circle, "--input-error-border-color"));
    const error = getComputedStyle(screen.getByText("Choose a delivery.")).color;
    expect(error).toBe(resolveColor(standard.circle, "--input-error-color"));
    expect(contrastRatio(error, surface)).toBeGreaterThanOrEqual(4.5);

    expect(pro.control).toBeChecked();
    expect(getComputedStyle(pro.dot).backgroundColor).toBe(resolveColor(pro.circle, "--color-text-disabled"));
    expect(pro.dot.getBoundingClientRect().width).toBeCloseTo(system.dot, 1);
    expect(getComputedStyle(screen.getByText("Pro")).color).toBe(resolveColor(pro.circle, "--color-text-disabled"));
    expect(getComputedStyle(screen.getByText("Pro").parentElement!).cursor).toBe("not-allowed");
  });
});

describe("Radio and RadioGroup layout, scopes and motion", () => {
  it("stacks the options under the legend, or lays them in a row", () => {
    const { rerender } = render(
      <ThemeProvider scope="local">
        {delivery({ description: "Prices include taxes." })}
      </ThemeProvider>,
    );
    const box = (text: string) => screen.getByText(text).getBoundingClientRect();
    const legend = box("Delivery");

    expect(box("Prices include taxes.").top).toBeGreaterThanOrEqual(legend.bottom);
    expect(box("Prices include taxes.").left).toBeCloseTo(legend.left, 0);
    expect(parts("Standard").circle.getBoundingClientRect().left).toBeCloseTo(legend.left, 0);
    expect(box("Standard").bottom).toBeLessThanOrEqual(box("Express").top - 12);

    rerender(
      <ThemeProvider scope="local">
        {delivery({ orientation: "horizontal" })}
      </ThemeProvider>,
    );
    expect(box("Express").top).toBeCloseTo(box("Standard").top, 0);
    expect(parts("Express").circle.getBoundingClientRect().left - box("Standard").right).toBeCloseTo(24, 0);
  });

  it("puts a radio's description under its label", () => {
    render(
      <ThemeProvider scope="local">
        <RadioGroup label="Delivery">
          <Radio value="express" label="Express" description="Next business day." />
        </RadioGroup>
      </ThemeProvider>,
    );
    const label = screen.getByText("Express").getBoundingClientRect();
    const description = screen.getByText("Next business day.").getBoundingClientRect();

    expect(description.left).toBeCloseTo(label.left, 0);
    expect(description.top).toBeGreaterThanOrEqual(label.bottom);
  });

  it("draws a lone radio like a grouped one, invalid through aria-invalid", () => {
    render(
      <ThemeProvider scope="local">
        <Radio value="terms" label="Accept" aria-invalid />
      </ThemeProvider>,
    );
    const { circle } = parts("Accept");

    expect(circle.offsetWidth).toBe(18);
    expect(getComputedStyle(circle).borderTopColor).toBe(resolveColor(circle, "--input-error-border-color"));
  });

  it("moves the selection with the arrow keys", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local">
        {delivery({ defaultValue: "standard" })}
      </ThemeProvider>,
    );

    await user.tab();
    await user.keyboard("{ArrowDown}");
    expect(parts("Express").control).toBeChecked();
    expect(parts("Express").control).toHaveFocus();
  });

  it("resets a nested Neus scope inside Material", () => {
    render(
      <ThemeProvider scope="local" designSystem="material">
        <RadioGroup label="Outer"><Radio value="a" label="Outer radio" /></RadioGroup>
        <ThemeProvider designSystem="neus">
          <RadioGroup label="Inner"><Radio value="a" label="Inner radio" /></RadioGroup>
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(parts("Outer radio").circle.offsetWidth).toBe(20);
    expect(parts("Inner radio").circle.offsetWidth).toBe(18);
  });

  it("drops transitions under reduced motion", async () => {
    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      render(
        <ThemeProvider scope="local">
          {delivery()}
        </ThemeProvider>,
      );
      const { circle, dot } = parts("Standard");
      expect(getComputedStyle(circle).transitionDuration).toBe("0s");
      expect(getComputedStyle(dot).transitionDuration).toBe("0s");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });
});
