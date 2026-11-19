import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { cdp, userEvent as pointer } from "vitest/browser";
import { Fieldset } from "../../components/Fieldset";
import { FormField } from "../../components/FormField";
import { Input } from "../../components/Input";
import { NumberInput } from "../../components/NumberInput";
import { Radio } from "../../components/Radio";
import { RadioGroup } from "../../components/RadioGroup";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", button: 28 },
  { id: "apple", button: 28 },
  { id: "carbon", button: 32 },
  { id: "material", button: 32 },
  { id: "neobrutalism", button: 28 },
  { id: "vercel", button: 24 },
] as const;

const box = (element: Element) => element.getBoundingClientRect();
const typography = (element: Element) => {
  const { color, fontSize, fontWeight, fontFamily } = getComputedStyle(element);
  return { color, fontSize, fontWeight, fontFamily };
};

describe.each(["light", "dark"] as const)("Form fields in %s mode", (scheme) => {
  it.each(SYSTEMS)("labels $id FormField and Fieldset like a RadioGroup legend", (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <FormField label="Avatar" description="PNG, up to 2 MB." error="Too large.">
          {(control) => <input type="file" {...control} />}
        </FormField>
        <Fieldset label="Address" error="Enter a city.">
          <Input label="City" />
        </Fieldset>
        <RadioGroup label="Delivery">
          <Radio value="standard" label="Standard" />
        </RadioGroup>
      </ThemeProvider>,
    );
    const legend = screen.getByText("Delivery");
    const surface = resolveColor(legend, "--color-surface");

    expect({ ...typography(screen.getByText("Address")), color: "" })
      .toEqual({ ...typography(legend), color: "" });
    expect(typography(screen.getByText("Avatar")).fontSize).toBe(typography(legend).fontSize);
    expect(getComputedStyle(screen.getByText("Avatar")).color).toBe(resolveColor(legend, "--input-error-color"));
    for (const text of ["Avatar", "PNG, up to 2 MB.", "Too large.", "Address", "Enter a city."]) {
      expect(contrastRatio(getComputedStyle(screen.getByText(text)).color, surface)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it.each(SYSTEMS)("draws the $id NumberInput steppers inside the field with 3:1 icons", async (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <NumberInput label="Guests" defaultValue={1} min={1} max={8} />
      </ThemeProvider>,
    );
    const field = screen.getByRole("spinbutton");
    const increase = screen.getByRole("button", { name: "Increase" });
    const decrease = screen.getByRole("button", { name: "Decrease" });
    const stepper = increase.parentElement!;
    const surface = resolveColor(stepper, "--color-surface");
    const ground = flatten(
      getComputedStyle(stepper).backgroundColor,
      flatten(getComputedStyle(field).backgroundColor, surface),
    );

    expect([increase.offsetWidth, increase.offsetHeight]).toEqual([system.button, system.button]);
    expect(box(decrease).right).toBeLessThanOrEqual(box(increase).left);
    expect(box(stepper).right).toBeLessThanOrEqual(box(field).right);
    expect(box(stepper).left).toBeGreaterThanOrEqual(
      box(field).right - parseFloat(getComputedStyle(field).paddingRight) - 0.5,
    );
    expect(Math.abs(
      box(stepper).top + box(stepper).height / 2 - (box(field).top + box(field).height / 2),
    )).toBeLessThan(1);
    expect(contrastRatio(getComputedStyle(increase).color, ground)).toBeGreaterThanOrEqual(3);
    expect(decrease).toBeDisabled();
    expect(getComputedStyle(decrease).color).toBe(resolveColor(decrease, "--number-input-disabled-color"));

    // Resolved outside waitFor: the probe it appends would wake waitFor's DOM observer forever.
    const hover = resolveColor(increase, "--number-input-button-hover-background");
    await pointer.hover(increase);
    await waitFor(() => expect(getComputedStyle(increase).backgroundColor).toBe(hover));
    expect(contrastRatio(
      getComputedStyle(increase).color,
      flatten(getComputedStyle(increase).backgroundColor, ground),
    )).toBeGreaterThanOrEqual(3);
  });
});

describe("Form field layout, scopes and motion", () => {
  it("stacks the label, help text, control and error of a FormField", () => {
    render(
      <ThemeProvider scope="local">
        <FormField label="Avatar" description="PNG, up to 2 MB." error="Too large.">
          {(control) => <input type="file" {...control} />}
        </FormField>
      </ThemeProvider>,
    );
    const label = box(screen.getByText("Avatar"));
    const description = box(screen.getByText("PNG, up to 2 MB."));
    const control = box(screen.getByLabelText("Avatar"));
    const error = box(screen.getByText("Too large."));

    expect(description.top).toBeGreaterThanOrEqual(label.bottom);
    expect(control.top).toBeGreaterThanOrEqual(description.bottom);
    expect(error.top).toBeGreaterThanOrEqual(control.bottom);
    expect(description.left).toBeCloseTo(label.left, 0);
  });

  it("leaves 16px between a Fieldset's controls", () => {
    render(
      <ThemeProvider scope="local">
        <Fieldset label="Address">
          <Input label="Street" />
          <Input label="City" />
        </Fieldset>
      </ThemeProvider>,
    );
    const street = screen.getByRole("textbox", { name: "Street" }).closest(".input__wrapper")!;
    const city = screen.getByRole("textbox", { name: "City" }).closest(".input__wrapper")!;

    expect(box(city).top - box(street).bottom).toBeCloseTo(16, 0);
  });

  it("keeps the steppers clear of the error icon", () => {
    render(
      <ThemeProvider scope="local">
        <NumberInput label="Guests" error="Too many." defaultValue={9} />
      </ThemeProvider>,
    );
    const field = screen.getByRole("spinbutton");
    const icon = field.parentElement!.querySelector(".input__error-icon")!;
    const stepper = field.parentElement!.querySelector(".number-input__stepper")!;

    expect(box(stepper).right).toBeLessThanOrEqual(box(icon).left);
    expect(box(stepper).left).toBeGreaterThanOrEqual(
      box(field).right - parseFloat(getComputedStyle(field).paddingRight) - 0.5,
    );
  });

  it("steps with the keyboard and keeps the focus on a stepper click", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local">
        <NumberInput label="Guests" defaultValue={2} />
      </ThemeProvider>,
    );
    const field = screen.getByRole("spinbutton");

    await user.click(field);
    await user.keyboard("{ArrowUp}{ArrowUp}");
    expect(field).toHaveValue("4");
    await pointer.click(screen.getByRole("button", { name: "Decrease" }));
    expect(field).toHaveFocus();
    expect(field).toHaveValue("3");
  });

  it("resets a nested Neus scope inside Material", () => {
    render(
      <ThemeProvider scope="local" designSystem="material">
        <NumberInput label="Outer" />
        <ThemeProvider designSystem="neus">
          <NumberInput label="Inner" />
        </ThemeProvider>
      </ThemeProvider>,
    );
    const [outer, inner] = screen.getAllByRole("button", { name: "Increase" });

    expect(outer.offsetWidth).toBe(32);
    expect(inner.offsetWidth).toBe(28);
  });

  it("drops the stepper transition under reduced motion", async () => {
    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      render(
        <ThemeProvider scope="local">
          <NumberInput label="Guests" />
        </ThemeProvider>,
      );
      expect(getComputedStyle(screen.getByRole("button", { name: "Increase" })).transitionDuration).toBe("0s");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });
});
