import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Input } from "../../components/Input";
import { MultiSelect } from "../../components/MultiSelect";
import { Select } from "../../components/Select";
import "../../css/app.css";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten } from "./design-systems.test-utils";

afterEach(cleanup);

const SYSTEMS = ["neus", "apple", "carbon", "material", "neobrutalism", "vercel"] as const;
const OPTIONS = [
  { value: "ar", label: "Argentina" },
  { value: "br", label: "Brasil" },
];

const field = (name: string) =>
  screen.getByRole("combobox", { name }).closest(".select__field") as HTMLElement;

describe.each(["light", "dark"] as const)("Select fields in %s mode", (scheme) => {
  it.each(SYSTEMS)("matches the %s Input recipe and the overlay list", async (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system} colorScheme={scheme}>
        <Input label="Name" />
        <Select label="Country" options={OPTIONS} defaultValue="ar" />
        <MultiSelect name="c" label="Countries" options={OPTIONS} defaultValue={["br"]} />
      </ThemeProvider>,
    );
    const input = getComputedStyle(screen.getByRole("textbox", { name: "Name" }));
    for (const name of ["Country", "Countries"]) {
      const styles = getComputedStyle(field(name));
      expect(styles.borderRadius).toBe(input.borderRadius);
      expect(styles.borderBottomWidth).toBe(input.borderBottomWidth);
      expect(styles.backgroundColor).toBe(input.backgroundColor);
      expect(styles.fontFamily).toBe(input.fontFamily);
    }

    const country = screen.getByRole("combobox", { name: "Country" });
    await userEvent.click(country);
    const list = screen.getByRole("listbox", { name: "Country" });
    const popover = list.closest("[popover]") as HTMLElement;
    expect(popover.matches(":popover-open")).toBe(true);
    expect(popover.getBoundingClientRect().width).toBeCloseTo(
      field("Country").getBoundingClientRect().width,
      0,
    );
    const panel = getComputedStyle(popover);
    const selected = getComputedStyle(screen.getByRole("option", { name: "Argentina" }));
    expect(
      contrastRatio(selected.color, flatten(selected.backgroundColor, panel.backgroundColor)),
    ).toBeGreaterThanOrEqual(4.5);
    expect(getComputedStyle(field("Country")).borderTopColor).toBe(
      getComputedStyle(field("Country")).borderBottomColor,
    );

    await userEvent.keyboard("{Escape}");
    const tag = getComputedStyle(document.querySelector(".multiselect__tag")!);
    expect(
      contrastRatio(
        tag.color,
        flatten(tag.backgroundColor, getComputedStyle(field("Countries")).backgroundColor),
      ),
    ).toBeGreaterThanOrEqual(4.5);
  });
});

describe("Select interaction in the browser", () => {
  it("keeps tag removal clickable above the stretched trigger", async () => {
    const values: string[][] = [];
    render(
      <ThemeProvider scope="local">
        <MultiSelect
          name="c"
          label="Countries"
          options={OPTIONS}
          defaultValue={["ar", "br"]}
          onChange={(next) => values.push(next)}
        />
      </ThemeProvider>,
    );
    const remove = screen.getByRole("button", { name: "Quitar Argentina" });
    const { x, y, width, height } = remove.getBoundingClientRect();
    expect(document.elementFromPoint(x + width / 2, y + height / 2)?.closest("button")).toBe(remove);
    await userEvent.click(remove);
    expect(values).toEqual([["br"]]);
  });

  it("opens from any point of the field", async () => {
    render(
      <ThemeProvider scope="local">
        <Select label="Country" options={OPTIONS} />
      </ThemeProvider>,
    );
    const box = field("Country").getBoundingClientRect();
    const hit = document.elementFromPoint(box.right - 4, box.top + box.height / 2);
    expect(hit).toBe(screen.getByRole("combobox", { name: "Country" }));
  });

  it("shrinks a long value to its grid column instead of widening it", () => {
    const options = [{ value: "long", label: "Con la cabeza a mil antes de una reunión importante" }];
    render(
      <ThemeProvider scope="local">
        <div style={{ display: "grid", width: 240 }}>
          <Select label="Mood" options={options} defaultValue="long" />
          <MultiSelect name="m" label="Moods" options={options} defaultValue={["long"]} />
        </div>
      </ThemeProvider>,
    );
    for (const name of ["Mood", "Moods"]) {
      expect(field(name).getBoundingClientRect().width).toBeLessThanOrEqual(240);
    }
  });
});
