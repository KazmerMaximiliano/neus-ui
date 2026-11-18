import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Trash2 } from "lucide-react";
import { afterEach, describe, expect, it } from "vitest";
import { IconButton } from "../../components/IconButton";
import { Tooltip } from "../../components/Tooltip";
import { WeekCalendar } from "../../components/WeekCalendar";
import { ThemeProvider } from "../../providers";
import { contrastRatio, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import type { TooltipProps } from "../../components/Tooltip";
import type { DesignSystemId } from "../../design-systems";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", radius: "8px", padding: "6px 10px", fontSize: "12px", offset: 6 },
  { id: "apple", radius: "8px", padding: "6px 10px", fontSize: "12px", offset: 6 },
  { id: "carbon", radius: "2px", padding: "2px 16px", fontSize: "14px", offset: 10 },
  { id: "material", radius: "4px", padding: "4px 8px", fontSize: "12px", offset: 6 },
  { id: "neobrutalism", radius: "4px", padding: "6px 10px", fontSize: "12px", offset: 6 },
  { id: "vercel", radius: "6px", padding: "6px 10px", fontSize: "13px", offset: 6 },
] as const;

const tip = (
  props: Partial<TooltipProps> = {},
  system: DesignSystemId = "neus",
  scheme: "light" | "dark" = "light",
) => (
  <ThemeProvider scope="local" designSystem={system} colorScheme={scheme}>
    <Tooltip
      content="Moves it to the trash"
      trigger={(trigger) => <IconButton {...trigger} icon={Trash2} label="Delete" />}
      delay={0}
      {...props}
    />
  </ThemeProvider>
);

const parts = () => ({
  trigger: screen.getByRole("button", { name: "Delete" }),
  bubble: document.querySelector<HTMLElement>(".tooltip")!,
});

const center = (rect: DOMRect) => rect.left + rect.width / 2;

describe.each(["light", "dark"] as const)("Tooltip designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("centers the $id tooltip above its trigger and keeps it legible", async (system) => {
    const user = userEvent.setup();
    render(<div style={{ padding: "120px 200px" }}>{tip({}, system.id, scheme)}</div>);
    const { trigger, bubble } = parts();

    await user.hover(trigger);
    await waitFor(() => expect(bubble.matches(":popover-open")).toBe(true));
    const styles = getComputedStyle(bubble);
    const surface = resolveColor(bubble.parentElement!, "--color-surface");

    await waitFor(() => expect(bubble.getBoundingClientRect().bottom)
      .toBeCloseTo(trigger.getBoundingClientRect().top - system.offset, 0));
    expect(center(bubble.getBoundingClientRect())).toBeCloseTo(center(trigger.getBoundingClientRect()), 0);
    expect(styles.borderTopLeftRadius).toBe(system.radius);
    expect(styles.padding).toBe(system.padding);
    expect(styles.fontSize).toBe(system.fontSize);
    expect(contrastRatio(styles.color, styles.backgroundColor)).toBeGreaterThanOrEqual(4.5);
    // It stands apart from the page by its own fill or by an outline.
    const edge = parseFloat(styles.borderTopWidth) > 0 ? styles.borderTopColor : styles.backgroundColor;
    expect(contrastRatio(edge, surface)).toBeGreaterThanOrEqual(3);
  });
});

describe("Carbon tooltip", () => {
  it("points a 6px caret at the trigger from 4px away, without a shadow", async () => {
    const user = userEvent.setup();
    render(<div style={{ padding: "120px 200px" }}>{tip({}, "carbon")}</div>);
    const { trigger, bubble } = parts();

    await user.hover(trigger);
    await waitFor(() => expect(bubble.dataset.placement).toBe("top"));
    const caret = getComputedStyle(bubble, "::before");
    const box = bubble.getBoundingClientRect();

    expect(caret.width).toBe("12px");
    expect(caret.height).toBe("6px");
    expect(caret.backgroundColor).toBe(getComputedStyle(bubble).backgroundColor);
    expect(box.left + parseFloat(caret.left) + 6).toBeCloseTo(center(trigger.getBoundingClientRect()), 0);
    expect(trigger.getBoundingClientRect().top - (box.bottom + 6)).toBeCloseTo(4, 0);
    expect(getComputedStyle(bubble).boxShadow).toBe("none");
    expect(getComputedStyle(bubble).lineHeight).toBe("20px");
  });

  it("turns the caret upward below the trigger and keeps it on the trigger near a screen edge", async () => {
    const user = userEvent.setup();
    render(
      <div style={{ position: "fixed", top: 4, left: 4 }}>
        {tip({ placement: "bottom" }, "carbon")}
      </div>,
    );
    const { trigger, bubble } = parts();

    await user.hover(trigger);
    await waitFor(() => expect(bubble.matches(":popover-open")).toBe(true));
    const caret = getComputedStyle(bubble, "::before");
    const box = bubble.getBoundingClientRect();

    expect(bubble.dataset.placement).toBe("bottom");
    expect(box.top - 6 - trigger.getBoundingClientRect().bottom).toBeCloseTo(4, 0);
    expect(box.left + parseFloat(caret.left) + 6).toBeCloseTo(center(trigger.getBoundingClientRect()), 0);
  });

  it("gives wrapping text the multi-line padding and width", async () => {
    const user = userEvent.setup();
    render(
      <div style={{ display: "flex", justifyContent: "center", padding: "160px 0" }}>
        {tip({ content: "Deleting a project moves it and its deployments to the trash, where it stays for 30 days" }, "carbon")}
      </div>,
    );
    const { trigger, bubble } = parts();

    await user.hover(trigger);
    await waitFor(() => expect(bubble).toHaveAttribute("data-multiline"));
    const styles = getComputedStyle(bubble);

    expect(styles.padding).toBe("16px");
    expect(styles.maxWidth).toBe("288px");
    expect(center(bubble.getBoundingClientRect())).toBeCloseTo(center(trigger.getBoundingClientRect()), 0);
  });
});

describe("Tooltip placement, hover and scopes", () => {
  it("moves below a trigger with no room above and stays inside the viewport", async () => {
    const user = userEvent.setup();
    render(
      <div style={{ position: "fixed", top: 4, left: 4 }}>
        {tip({ content: "A longer description that needs most of the width it is allowed" })}
      </div>,
    );
    const { trigger, bubble } = parts();

    await user.hover(trigger);
    await waitFor(() => expect(bubble.dataset.placement).toBe("bottom"));
    expect(bubble.getBoundingClientRect().top).toBeCloseTo(trigger.getBoundingClientRect().bottom + 6, 0);
    expect(bubble.getBoundingClientRect().left).toBeGreaterThanOrEqual(0);
  });

  it("stays open while the pointer crosses onto it", async () => {
    const user = userEvent.setup();
    render(tip());
    const { trigger, bubble } = parts();

    await user.hover(trigger);
    await waitFor(() => expect(bubble.matches(":popover-open")).toBe(true));
    await user.unhover(trigger);
    await user.hover(bubble);
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(bubble.matches(":popover-open")).toBe(true);
  });

  it("shows on keyboard focus and closes on Escape", async () => {
    const user = userEvent.setup();
    render(tip({ delay: 2000 }));
    const { trigger, bubble } = parts();

    await user.tab();
    await waitFor(() => expect(bubble.matches(":popover-open")).toBe(true));
    await user.keyboard("{Escape}");

    await waitFor(() => expect(bubble.matches(":popover-open")).toBe(false));
    expect(trigger).toHaveFocus();
  });

  it("resets a nested Neus scope inside Carbon", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local" designSystem="carbon">
        <ThemeProvider designSystem="neus">
          <div style={{ display: "flex", justifyContent: "center", padding: "160px 0" }}>
            <Tooltip
              content="Deleting a project moves it and its deployments to the trash, where it stays for 30 days"
              trigger={(trigger) => <IconButton {...trigger} icon={Trash2} label="Delete" />}
            />
          </div>
        </ThemeProvider>
      </ThemeProvider>,
    );
    const { trigger, bubble } = parts();

    await user.hover(trigger);
    await waitFor(() => expect(bubble).toHaveAttribute("data-multiline"));
    // Neus has no multi-line structure: wrapping text keeps the single-line padding and width.
    expect(getComputedStyle(bubble).padding).toBe("6px 10px");
    expect(getComputedStyle(bubble).maxWidth).toBe("240px");
    expect(getComputedStyle(bubble).borderTopLeftRadius).toBe("8px");
    expect(getComputedStyle(bubble).fontSize).toBe("12px");
    expect(getComputedStyle(bubble, "::before").height).toBe("0px");
  });

  it("keeps the overlay surface and calendar type on WeekCalendar's tooltip", async () => {
    const user = userEvent.setup();
    const today = new Date();
    render(
      <ThemeProvider scope="local" designSystem="material">
        <WeekCalendar
          events={[{ category: { title: "Team", label: "Ops" }, events: [{ id: 1, title: "Review", start: today, end: today }] }]}
          hoverContent={(event) => event.title}
        />
      </ThemeProvider>,
    );

    await user.hover(screen.getByLabelText(/^Review/));
    const bubble = await screen.findByRole("tooltip");
    const styles = getComputedStyle(bubble);

    expect(bubble).toHaveClass("tooltip", "week-calendar-row__hover-tooltip");
    expect(styles.backgroundColor).toBe(resolveColor(bubble, "--overlay-background"));
    expect(styles.fontSize).toBe(getComputedStyle(bubble.parentElement!).fontSize);
    expect(styles.position).toBe("fixed");
  });
});
