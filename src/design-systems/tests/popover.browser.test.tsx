import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";
import { Menu } from "../../components/Menu";
import { Popover } from "../../components/Popover";
import { Select } from "../../components/Select";
import { ThemeProvider } from "../../providers";
import { contrastRatio, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import type { PopoverProps } from "../../components/Popover";
import type { DesignSystemId } from "../../design-systems";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", radius: "16px", maxWidth: "320px", offset: 8 },
  { id: "apple", radius: "12px", maxWidth: "320px", offset: 8 },
  { id: "carbon", radius: "2px", maxWidth: "368px", offset: 2 },
  { id: "material", radius: "4px", maxWidth: "320px", offset: 4 },
  { id: "neobrutalism", radius: "4px", maxWidth: "320px", offset: 8 },
  { id: "vercel", radius: "10px", maxWidth: "288px", offset: 4, padding: "10px" },
] as const;

const filters = (props: Partial<PopoverProps> = {}, system: DesignSystemId = "neus", scheme: "light" | "dark" = "light") => (
  <ThemeProvider scope="local" designSystem={system} colorScheme={scheme}>
    <Popover label="Filters" trigger={(trigger) => <Button {...trigger} label="Filters" />} {...props}>
      <p>Show projects that are</p>
      <Checkbox label="Active" />
    </Popover>
  </ThemeProvider>
);

const parts = () => ({
  trigger: screen.getByRole("button", { name: "Filters" }),
  panel: document.querySelector<HTMLElement>(".popover__panel")!,
});

describe.each(["light", "dark"] as const)("Popover designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("draws the $id panel under its trigger with readable text", async (system) => {
    render(filters({ defaultOpen: true }, system.id, scheme));
    const { trigger, panel } = parts();
    const styles = getComputedStyle(panel);

    expect(panel.matches(":popover-open")).toBe(true);
    await waitFor(() => expect(panel.getBoundingClientRect().top)
      .toBeCloseTo(trigger.getBoundingClientRect().bottom + system.offset, 0));
    expect(panel.getBoundingClientRect().left).toBeCloseTo(trigger.getBoundingClientRect().left, 0);
    expect(styles.paddingTop).toBe("padding" in system ? system.padding : "16px");
    expect(styles.borderTopLeftRadius).toBe(system.radius);
    expect(styles.maxWidth).toBe(system.maxWidth);
    expect(styles.backgroundColor).toBe(resolveColor(panel, "--overlay-background"));
    expect(parseFloat(styles.borderTopWidth) > 0 || styles.boxShadow !== "none").toBe(true);
    expect(contrastRatio(getComputedStyle(screen.getByText("Show projects that are")).color, styles.backgroundColor))
      .toBeGreaterThanOrEqual(4.5);
  });
});

describe("Popover placement, keyboard and scopes", () => {
  it("lines up the trailing edges with bottom-end", async () => {
    render(filters({ defaultOpen: true, placement: "bottom-end", style: { marginInlineStart: 400 } }));
    const { trigger, panel } = parts();

    await waitFor(() => expect(panel.getBoundingClientRect().right).toBeCloseTo(trigger.getBoundingClientRect().right, 0));
  });

  it("opens above its trigger when there is no room below", async () => {
    render(
      <div style={{ position: "fixed", bottom: 8, left: 8 }}>
        {filters({ defaultOpen: true })}
      </div>,
    );
    const { trigger, panel } = parts();

    await waitFor(() => expect(panel.dataset.placement).toBe("top-start"));
    expect(panel.getBoundingClientRect().bottom).toBeCloseTo(trigger.getBoundingClientRect().top - 8, 0);
  });

  it("starts from the right edge in right-to-left text", async () => {
    render(<div dir="rtl">{filters({ defaultOpen: true })}</div>);
    const { trigger, panel } = parts();

    await waitFor(() => expect(panel.getBoundingClientRect().right).toBeCloseTo(trigger.getBoundingClientRect().right, 0));
  });

  it("opens from the keyboard, moves focus inside and closes on Escape", async () => {
    const user = userEvent.setup();
    render(filters());
    const { trigger, panel } = parts();

    await user.tab();
    await user.keyboard("{Enter}");
    expect(panel.matches(":popover-open")).toBe(true);
    expect(screen.getByRole("checkbox", { name: "Active" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(panel.matches(":popover-open")).toBe(false);
    expect(trigger).toHaveFocus();
  });

  it("resets a nested Neus scope inside Carbon", () => {
    render(
      <ThemeProvider scope="local" designSystem="carbon">
        <ThemeProvider designSystem="neus">
          <Popover label="Filters" defaultOpen trigger={(trigger) => <Button {...trigger} label="Filters" />}>
            <p>Content</p>
          </Popover>
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(getComputedStyle(parts().panel).borderTopLeftRadius).toBe("16px");
  });
});

describe("Hosts on the shared panel", () => {
  it("keeps the Menu panel aligned to the trigger's right edge", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local">
        <div style={{ paddingInlineStart: 300 }}>
          <Menu text="Options" items={[{ label: "Rename", onClick: () => undefined }]} />
        </div>
      </ThemeProvider>,
    );
    const trigger = screen.getByRole("button", { name: "Options" });

    await user.click(trigger);
    const panel = screen.getByRole("menu");
    expect(panel.getBoundingClientRect().right).toBeCloseTo(trigger.getBoundingClientRect().right, 0);
    expect(panel.getBoundingClientRect().top).toBeCloseTo(trigger.getBoundingClientRect().bottom + 8, 0);
  });

  it("keeps the Select listbox as wide as its field, under it", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ThemeProvider scope="local">
        <Select label="Country" options={[{ value: "ar", label: "Argentina" }, { value: "uy", label: "Uruguay" }]} />
      </ThemeProvider>,
    );

    await user.click(screen.getByRole("combobox", { name: "Country" }));
    const field = container.querySelector(".select__field")!.getBoundingClientRect();
    const panel = container.querySelector(".select__popover")!.getBoundingClientRect();
    expect(panel.left).toBeCloseTo(field.left, 0);
    expect(panel.width).toBeCloseTo(field.width, 0);
    expect(panel.top).toBeCloseTo(field.bottom + 8, 0);
  });
});
