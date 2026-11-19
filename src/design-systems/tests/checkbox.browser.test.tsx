import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Checkbox } from "../../components/Checkbox";
import { ThemeProvider } from "../../providers";
import { contrastRatio, resolveColor } from "./colorContrast";
import { xHeightOffset } from "./labelAlignment";
import "../../css/app.css";

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
    const user = userEvent.setup();
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

    await user.tab();
    expect(screen.getByRole("checkbox", { name: "Off" })).toHaveFocus();
    expect(off.outlineStyle).toBe("solid");
    const label = getComputedStyle(screen.getByText("Off"));
    expect(contrastRatio(label.color, surface)).toBeGreaterThanOrEqual(4.5);
  });
});

describe("Checkbox interaction", () => {
  it.each(SYSTEMS)("centers the $id box on the label's lowercase letters", ({ id }) => {
    const { container } = render(
      <ThemeProvider scope="local" designSystem={id}>
        <Checkbox label="accept terms" />
      </ThemeProvider>,
    );

    expect(Math.abs(xHeightOffset(screen.getByText("accept terms"), container.querySelector(".checkbox__box")!)))
      .toBeLessThan(0.5);
  });

  it("toggles through its label and keyboard", async () => {
    const user = userEvent.setup();
    const changes: boolean[] = [];
    render(
      <ThemeProvider scope="local">
        <Checkbox label="Terms" onChange={(checked) => changes.push(checked)} />
      </ThemeProvider>,
    );
    await user.click(screen.getByText("Terms"));
    await user.keyboard(" ");
    expect(changes).toEqual([true, true]);
  });
});
