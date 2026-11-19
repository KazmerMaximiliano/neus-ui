import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { cdp } from "vitest/browser";
import { Input } from "../../components/Input";
import { MultiSelect } from "../../components/MultiSelect";
import { Select } from "../../components/Select";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import "../../css/app.css";

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
    const user = userEvent.setup();
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
    await user.click(country);
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

    await user.keyboard("{Escape}");
    const tag = getComputedStyle(document.querySelector(".multiselect__tag")!);
    expect(
      contrastRatio(
        tag.color,
        flatten(
          tag.backgroundColor,
          flatten(getComputedStyle(field("Countries")).backgroundColor, resolveColor(field("Countries"), "--color-surface")),
        ),
      ),
    ).toBeGreaterThanOrEqual(4.5);
  });
});

describe("Floating labels on selects", () => {
  const parts = (name: string) => {
    const wrapper = field(name).closest<HTMLElement>(".select__wrapper")!;
    return {
      label: wrapper.querySelector<HTMLElement>(".select__label")!,
      notch: wrapper.querySelector<HTMLElement>(".field__notch")!,
      outline: wrapper.querySelector<HTMLElement>(".field__outline")!,
    };
  };

  it("rests the label inside an empty Material select and raises it into the outline's gap", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local" designSystem="material">
        <Select label="Country" placeholder="Pick one" options={OPTIONS} />
        <Select label="Chosen" options={OPTIONS} defaultValue="ar" />
        <MultiSelect name="c" label="Countries" options={OPTIONS} defaultValue={["br"]} />
      </ThemeProvider>,
    );
    const empty = parts("Country");
    const box = field("Country").getBoundingClientRect();

    expect(box.height).toBe(56);
    expect(field("Countries").getBoundingClientRect().height).toBe(56);
    expect(getComputedStyle(empty.label).fontWeight).toBe("400");
    expect(getComputedStyle(field("Country")).backgroundColor).toBe("rgba(0, 0, 0, 0)");
    expect(empty.label.getBoundingClientRect().top).toBeGreaterThan(box.top);
    expect(getComputedStyle(screen.getByText("Pick one")).opacity).toBe("0");
    expect(empty.notch.getBoundingClientRect().width).toBeLessThan(1);
    for (const name of ["Chosen", "Countries"]) {
      const { label, notch } = parts(name);
      expect(label.getBoundingClientRect().top).toBeLessThan(field(name).getBoundingClientRect().top);
      expect(notch.getBoundingClientRect().width).toBeCloseTo(label.getBoundingClientRect().width, 0);
    }

    await user.click(screen.getByRole("combobox", { name: "Country" }));
    await waitFor(() => expect(empty.label.getBoundingClientRect().bottom).toBeLessThan(box.top + 8));
    expect(getComputedStyle(screen.getByText("Pick one")).opacity).toBe("1");
  });

  it("keeps the label above the field in systems with external labels", () => {
    render(
      <ThemeProvider scope="local" designSystem="carbon">
        <Select label="Country" options={OPTIONS} />
      </ThemeProvider>,
    );
    const { label, outline } = parts("Country");

    expect(getComputedStyle(label).position).toBe("static");
    expect(label.getBoundingClientRect().bottom).toBeLessThanOrEqual(field("Country").getBoundingClientRect().top);
    expect(getComputedStyle(outline).borderTopWidth).toBe("0px");
  });

  it("slides the label instead of jumping, and jumps under reduced motion", async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <ThemeProvider scope="local" designSystem="material">
        <Input label="Name" />
      </ThemeProvider>,
    );
    const label = screen.getByText("Name");
    const styles = getComputedStyle(label);

    expect(styles.transitionDuration.split(", ")).toContain("0.15s");
    expect(styles.transitionProperty).toContain("top");
    await user.click(screen.getByRole("textbox", { name: "Name" }));
    expect(getComputedStyle(label).top).not.toBe("0px");
    await waitFor(() => expect(getComputedStyle(label).top).toBe("0px"));

    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      rerender(
        <ThemeProvider scope="local" designSystem="material">
          <Select label="Country" options={OPTIONS} />
        </ThemeProvider>,
      );
      expect(getComputedStyle(parts("Country").label).transitionDuration).toBe("0s");
      expect(getComputedStyle(parts("Country").notch).transitionDuration).toBe("0s");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });
});

describe("Select interaction in the browser", () => {
  it("keeps tag removal clickable above the stretched trigger", async () => {
    const user = userEvent.setup();
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
    const remove = screen.getByRole("button", { name: "Remove Argentina" });
    const { x, y, width, height } = remove.getBoundingClientRect();
    expect(document.elementFromPoint(x + width / 2, y + height / 2)?.closest("button")).toBe(remove);
    await user.click(remove);
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
    const options = [{ value: "long", label: "Mind racing ahead of an important meeting with the team" }];
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
