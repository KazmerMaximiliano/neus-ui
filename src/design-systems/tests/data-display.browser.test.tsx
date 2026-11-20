import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { Bell, Settings } from "lucide-react";
import { afterEach, describe, expect, it } from "vitest";
import { cdp, userEvent as pointer } from "vitest/browser";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Chip } from "../../components/Chip";
import { IconButton } from "../../components/IconButton";
import { List, ListItem } from "../../components/List";
import { Radio } from "../../components/Radio";
import { Switch } from "../../components/Switch";
import { Toggle } from "../../components/Toggle";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import type { ReactNode } from "react";
import type { DesignSystemId } from "../design-systems.types";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS: readonly { id: DesignSystemId; chip: number; small: number; row: number }[] = [
  { id: "neus", chip: 32, small: 24, row: 56 },
  { id: "apple", chip: 32, small: 24, row: 52 },
  { id: "carbon", chip: 24, small: 18, row: 48 },
  { id: "material", chip: 32, small: 24, row: 56 },
  { id: "neobrutalism", chip: 32, small: 24, row: 40 },
  { id: "vercel", chip: 24, small: 20, row: 40 },
];

/** The text color against what is painted behind it, down to the page surface. */
const textContrast = (element: HTMLElement, ...layers: HTMLElement[]) => {
  const surface = resolveColor(element, "--color-surface");
  const ground = [element, ...layers].reduceRight(
    (backdrop, layer) => flatten(getComputedStyle(layer).backgroundColor, backdrop),
    surface,
  );
  return contrastRatio(getComputedStyle(element).color, ground);
};

describe.each(["light", "dark"] as const)("Data display in %s mode", (scheme) => {
  it.each(SYSTEMS)("draws the $id chips at rest, selected and small with readable labels", async (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <Chip label="Rest" onSelectedChange={() => {}} />
        <Chip label="Selected" defaultSelected />
        <Chip label="Small" size="small" onRemove={() => {}} />
      </ThemeProvider>,
    );
    const rest = screen.getByText("Rest").closest<HTMLElement>(".chip")!;
    const selected = screen.getByText("Selected").closest<HTMLElement>(".chip")!;
    const small = screen.getByText("Small").closest<HTMLElement>(".chip")!;

    expect(rest.offsetHeight).toBe(system.chip);
    expect(small.offsetHeight).toBe(system.small);
    expect(textContrast(screen.getByText("Rest"), rest)).toBeGreaterThanOrEqual(4.5);
    expect(textContrast(screen.getByText("Selected"), selected)).toBeGreaterThanOrEqual(4.5);
    expect(selected.querySelector(".chip__check")).not.toBeNull();
    expect([getComputedStyle(selected).backgroundColor, getComputedStyle(selected).borderTopColor])
      .not.toEqual([getComputedStyle(rest).backgroundColor, getComputedStyle(rest).borderTopColor]);
    const remove = screen.getByRole("button", { name: "Remove Small" });
    expect(remove.getBoundingClientRect().right).toBeLessThanOrEqual(small.getBoundingClientRect().right + 0.5);

    await pointer.tab();
    expect(screen.getByRole("button", { name: "Rest" })).toHaveFocus();
    expect(getComputedStyle(screen.getByRole("button", { name: "Rest" })).outlineStyle).toBe("solid");
  });

  it.each(SYSTEMS)("draws the $id list rows with readable text and dividers", (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <List divided aria-label="Settings">
          <ListItem leading={<Bell aria-hidden />} title="Notifications" description="Every Monday." trailing="On" />
          <ListItem title="Billing" trailing="Monthly" />
        </List>
      </ThemeProvider>,
    );
    const list = screen.getByRole("list");
    const [first, second] = screen.getAllByRole("listitem");

    expect(first.offsetHeight).toBeGreaterThanOrEqual(system.row);
    for (const text of ["Notifications", "Every Monday.", "On", "Billing"]) {
      expect(textContrast(screen.getByText(text), list)).toBeGreaterThanOrEqual(4.5);
    }
    expect(getComputedStyle(second, "::before").borderTopWidth).not.toBe("0px");
    expect(getComputedStyle(first, "::before").content).toBe("none");
    expect(Math.round(screen.getByText("On").getBoundingClientRect().right))
      .toBeLessThanOrEqual(Math.round(first.getBoundingClientRect().right));
  });
});

const TRAILING: [string, ReactNode, string][] = [
  ["Switch", <Switch aria-label="On" defaultChecked />, ".switch__track"],
  ["Radio", <Radio value="a" aria-label="On" />, ".radio__circle"],
  ["Checkbox", <Checkbox aria-label="On" />, ".checkbox__box"],
  ["Button", <Button label="Edit" size="small" variant="outlined" />, ".button"],
  ["IconButton", <IconButton icon={Settings} label="Settings" size="small" variant="text" />, "button"],
  ["Badge", <Badge label="On" color="success" />, ".badge"],
  ["Chip", <Chip label="Pro" size="small" />, ".chip"],
  ["Toggle", <Toggle label="Pin" size="small" />, ".toggle"],
];

describe("List trailing content", () => {
  it.each(SYSTEMS)("ends every $id trailing control on the row's edge", ({ id }) => {
    for (const [name, node, selector] of TRAILING) {
      const view = render(
        <ThemeProvider scope="local" designSystem={id}>
          <div style={{ width: 400 }}>
            <List aria-label="Settings"><ListItem title="Row" trailing={node} /></List>
          </div>
        </ThemeProvider>,
      );
      const row = view.container.querySelector<HTMLElement>(".list-item")!;
      const edge = row.getBoundingClientRect().right - parseFloat(getComputedStyle(row).paddingRight);
      const visible = row.querySelector<HTMLElement>(`.list-item__trailing ${selector}`)!;

      expect(Math.abs(edge - visible.getBoundingClientRect().right), `${id} ${name}`).toBeLessThan(0.5);
      view.unmount();
    }
  });
});

describe("Data display behavior, scopes and motion", () => {
  it("changes only the chip under the pointer, and the remove button on its own", async () => {
    render(
      <ThemeProvider scope="local">
        <Chip label="Design" onSelectedChange={() => {}} onRemove={() => {}} />
      </ThemeProvider>,
    );
    const chip = screen.getByText("Design").closest<HTMLElement>(".chip")!;
    const rest = getComputedStyle(chip).backgroundColor;
    // Resolved outside waitFor: the probe it appends would wake waitFor's DOM observer forever.
    const hover = resolveColor(chip, "--chip-hover-background");

    await pointer.hover(screen.getByText("Design"));
    await waitFor(() => expect(getComputedStyle(chip).backgroundColor).toBe(hover));
    await pointer.hover(screen.getByRole("button", { name: "Remove Design" }));
    await waitFor(() => expect(getComputedStyle(chip).backgroundColor).toBe(rest));
  });

  it("spaces undivided rows apart and stacks the title over the description", () => {
    render(
      <ThemeProvider scope="local">
        <List aria-label="Team">
          <ListItem title="Ana" description="Design" />
          <ListItem title="Bruno" />
        </List>
      </ThemeProvider>,
    );
    const [first, second] = screen.getAllByRole("listitem");

    expect(second.getBoundingClientRect().top - first.getBoundingClientRect().bottom).toBe(8);
    expect(screen.getByText("Design").getBoundingClientRect().top)
      .toBeGreaterThanOrEqual(screen.getByText("Ana").getBoundingClientRect().bottom);
  });

  it("truncates a long chip label inside its container", () => {
    render(
      <ThemeProvider scope="local">
        <div style={{ width: 120 }}>
          <Chip label="A label far too long for the chip to show whole" />
        </div>
      </ThemeProvider>,
    );
    const label = screen.getByText(/A label far too long/);

    expect(label.closest<HTMLElement>(".chip")!.getBoundingClientRect().width).toBeLessThanOrEqual(120);
    expect(label.scrollWidth).toBeGreaterThan(label.clientWidth);
  });

  it("resets a nested Neus scope inside Material", () => {
    render(
      <ThemeProvider scope="local" designSystem="material">
        <ThemeProvider designSystem="neus">
          <Chip label="Inner" />
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(getComputedStyle(screen.getByText("Inner").closest(".chip")!).borderTopLeftRadius).toBe("39px");
  });

  it("drops the chip transition under reduced motion", async () => {
    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
      render(
        <ThemeProvider scope="local">
          <Chip label="Still" />
        </ThemeProvider>,
      );
      expect(getComputedStyle(screen.getByText("Still").closest(".chip")!).transitionDuration).toBe("0s");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });
});
