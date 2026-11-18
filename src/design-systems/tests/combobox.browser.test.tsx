import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Combobox } from "../../components/Combobox";
import { Input } from "../../components/Input";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = ["neus", "apple", "carbon", "material", "neobrutalism", "vercel"] as const;
const OPTIONS = [
  { value: "ar", label: "Argentina" },
  { value: "br", label: "Brazil" },
  { value: "cl", label: "Chile" },
];

describe.each(["light", "dark"] as const)("Combobox fields in %s mode", (scheme) => {
  it.each(SYSTEMS)("is the %s Input with the select list under the whole field", async (system) => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local" designSystem={system} colorScheme={scheme}>
        <div style={{ width: 320 }}>
          <Input label="Name" />
          <Combobox label="Country" options={OPTIONS} defaultValue="br" suffix="km" />
        </div>
      </ThemeProvider>,
    );
    const field = screen.getByRole("combobox", { name: "Country" });
    const control = field.closest<HTMLElement>(".input__control")!;
    const input = screen.getByRole("textbox", { name: "Name" });

    expect(control.getBoundingClientRect().height).toBe(input.closest(".input__control")!.getBoundingClientRect().height);
    expect(getComputedStyle(field).borderRadius).toBe(getComputedStyle(input).borderRadius);

    await user.click(field);
    await user.keyboard("{ArrowDown}{ArrowDown}{ArrowDown}");
    const panel = screen.getByRole("listbox", { name: "Country" }).closest<HTMLElement>("[popover]")!;
    const box = panel.getBoundingClientRect();
    const active = screen.getByRole("option", { name: "Chile" });
    const activeStyles = getComputedStyle(active);
    const surface = getComputedStyle(panel).backgroundColor;

    expect(panel.matches(":popover-open")).toBe(true);
    expect(box.left).toBeCloseTo(control.getBoundingClientRect().left, 0);
    expect(box.width).toBeCloseTo(control.getBoundingClientRect().width, 0);
    expect(box.top).toBeGreaterThan(control.getBoundingClientRect().bottom);
    expect(field).toHaveFocus();
    expect(field).toHaveAttribute("aria-activedescendant", active.id);
    expect(activeStyles.outlineStyle).toBe("solid");
    expect(contrastRatio(activeStyles.color, flatten(activeStyles.backgroundColor, surface))).toBeGreaterThanOrEqual(4.5);
    const selected = getComputedStyle(screen.getByRole("option", { name: "Brazil" }));
    expect(contrastRatio(selected.color, flatten(selected.backgroundColor, surface))).toBeGreaterThanOrEqual(4.5);
  });
});

describe("Combobox loading and empty states", () => {
  it("spins in the field and says it is loading in the list", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local" designSystem="carbon">
        <Combobox label="City" options={[]} loading filter={false} />
      </ThemeProvider>,
    );

    await user.type(screen.getByRole("combobox", { name: "City" }), "Ro");
    const spinner = document.querySelector<HTMLElement>(".input__suffix .spinner")!;

    expect(spinner.getBoundingClientRect().width).toBeGreaterThan(0);
    expect(screen.getByRole("status")).toHaveTextContent("Loading…");
    expect(screen.getByRole("status").getBoundingClientRect().height).toBeGreaterThan(0);
  });
});
