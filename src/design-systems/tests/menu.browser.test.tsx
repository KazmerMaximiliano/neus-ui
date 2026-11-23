import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Dropdown } from "../../components/Dropdown";
import { Menu } from "../../components/Menu";
import { ThemeProvider } from "../../providers";
import { contrastRatio, flatten } from "./colorContrast";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", radius: "16px", border: "1px" },
  { id: "apple", radius: "12px", border: "1px" },
  { id: "carbon", radius: "0px", border: "0px" },
  { id: "material", radius: "4px", border: "0px" },
  { id: "neobrutalism", radius: "4px", border: "3px" },
  { id: "vercel", radius: "10px", border: "1px" },
] as const;

const items = [
  { label: "Edit", onClick: vi.fn() },
  { label: "Delete", onClick: vi.fn() },
];

it("keeps a menu near the left edge inside the viewport", async () => {
  const user = userEvent.setup();
  render(
    <ThemeProvider scope="local">
      <Menu text="Options" items={items} />
    </ThemeProvider>,
  );
  const trigger = screen.getByRole("button", { name: "Options" });
  await user.click(trigger);
  const panel = screen.getByRole("menu", { name: "Options" });

  expect(panel.dataset.placement).toBe("bottom-start");
  expect(panel.getBoundingClientRect().left).toBeCloseTo(trigger.getBoundingClientRect().left, 0);
  expect(panel.getBoundingClientRect().left).toBeGreaterThanOrEqual(0);
});

describe.each(["light", "dark"] as const)("Menu overlays in %s mode", (scheme) => {
  it.each(SYSTEMS)("renders the $id floating surface below its trigger", async (system) => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <div style={{ paddingInlineStart: 240 }}>
          <Menu text="Options" items={items} />
        </div>
      </ThemeProvider>,
    );
    const trigger = screen.getByRole("button", { name: "Options" });
    await user.click(trigger);
    const panel = screen.getByRole("menu", { name: "Options" });
    expect(panel.matches(":popover-open")).toBe(true);
    expect(panel.closest(`[data-design-system="${system.id}"]`)).not.toBeNull();
    const styles = getComputedStyle(panel);
    expect(styles.borderRadius).toBe(system.radius);
    expect(styles.borderTopWidth).toBe(system.border);
    expect(styles.boxShadow).not.toBe("none");
    expect(panel.getBoundingClientRect().top).toBeGreaterThanOrEqual(
      trigger.getBoundingClientRect().bottom,
    );
    expect(
      Math.round(panel.getBoundingClientRect().right),
    ).toBe(Math.round(trigger.getBoundingClientRect().right));

    const item = screen.getByRole("menuitem", { name: "Edit" });
    expect(item).toHaveFocus();
    const focused = getComputedStyle(item);
    expect(focused.outlineStyle).toBe("solid");
    expect(
      contrastRatio(
        focused.color,
        flatten(focused.backgroundColor, styles.backgroundColor),
      ),
    ).toBeGreaterThanOrEqual(4.5);
  });
});

describe("Dropdown trigger designs", () => {
  it.each(SYSTEMS)("keeps the $id avatar legible and opens the account menu", async (system) => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local" designSystem={system.id}>
        <Dropdown name="Ada" items={items} />
      </ThemeProvider>,
    );
    const avatar = getComputedStyle(document.querySelector(".dropdown__avatar")!);
    expect(contrastRatio(avatar.color, avatar.backgroundColor)).toBeGreaterThanOrEqual(4.5);
    await user.click(screen.getByRole("button", { name: "Ada" }));
    expect(screen.getByRole("menu", { name: "Ada" }).matches(":popover-open")).toBe(true);
  });

  it("escapes overflow clipping through the top layer", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local">
        <div style={{ overflow: "hidden", height: 60 }}>
          <Menu text="Options" items={items} />
        </div>
      </ThemeProvider>,
    );
    await user.click(screen.getByRole("button", { name: "Options" }));
    const item = screen.getByRole("menuitem", { name: "Delete" });
    const { x, y, width, height } = item.getBoundingClientRect();
    expect(document.elementFromPoint(x + width / 2, y + height / 2)).toBe(item);
  });
});
