import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Checkbox } from "../components/Checkbox";
import "../css/app.css";
import { ThemeProvider } from "../providers";
import { contrastRatio, resolveColor } from "./design-systems.test-utils";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", size: 18, radius: "4px" },
  { id: "apple", size: 18, radius: "5px" },
  { id: "carbon", size: 16, radius: "2px" },
  { id: "material", size: 18, radius: "2px" },
  { id: "neobrutalism", size: 22, radius: "4px" },
  { id: "vercel", size: 16, radius: "4px" },
] as const;

const box = (name: string) =>
  screen.getByRole("checkbox", { name }).nextElementSibling as HTMLElement;

describe.each(["light", "dark"] as const)("Checkbox designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("renders $id boxes, marks and a visible focus", async (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <Checkbox label="Off" />
        <Checkbox label="On" checked />
        <Checkbox label="Mixed" indeterminate />
      </ThemeProvider>,
    );
    const off = getComputedStyle(box("Off"));
    expect(box("Off").getBoundingClientRect().width).toBe(system.size);
    expect(off.borderRadius).toBe(system.radius);
    const surface = resolveColor(box("Off").parentElement!, "--color-surface");
    expect(contrastRatio(off.borderTopColor, surface)).toBeGreaterThanOrEqual(3);

    for (const name of ["On", "Mixed"]) {
      const filled = getComputedStyle(box(name));
      const icon = getComputedStyle(box(name).querySelector("svg")!);
      expect(icon.opacity).toBe("1");
      expect(contrastRatio(icon.color, filled.backgroundColor)).toBeGreaterThanOrEqual(3);
    }
    expect(getComputedStyle(box("Off").querySelector("svg")!).opacity).toBe("0");

    await userEvent.tab();
    expect(screen.getByRole("checkbox", { name: "Off" })).toHaveFocus();
    expect(off.outlineStyle).toBe("solid");
    const label = getComputedStyle(screen.getByText("Off"));
    expect(contrastRatio(label.color, surface)).toBeGreaterThanOrEqual(4.5);
  });
});

describe("Checkbox interaction", () => {
  it("toggles through its label and keyboard", async () => {
    const changes: boolean[] = [];
    render(
      <ThemeProvider scope="local">
        <Checkbox label="Terms" onChange={(checked) => changes.push(checked)} />
      </ThemeProvider>,
    );
    await userEvent.click(screen.getByText("Terms"));
    await userEvent.keyboard(" ");
    expect(changes).toEqual([true, true]);
  });
});
