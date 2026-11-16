import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { cdp } from "vitest/browser";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { ThemeProvider } from "../../providers";
import { contrastRatio, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import "../../css/app.css";

afterEach(cleanup);

// The input radius, capped at 16px: Neus' pill becomes a rounded rectangle on several lines.
const SYSTEMS = [
  { id: "neus", radius: 16 },
  { id: "apple", radius: 8 },
  { id: "carbon", radius: 0 },
  { id: "material", radius: 4 },
  { id: "neobrutalism", radius: 4 },
  { id: "vercel", radius: 6 },
] as const;

const SHARED = [
  "backgroundColor", "color", "borderTopColor", "borderTopWidth", "borderBottomWidth", "paddingTop",
  "paddingLeft", "fontFamily", "fontSize", "boxShadow",
] as const;

const contentHeight = (field: HTMLElement) => {
  const styles = getComputedStyle(field);
  return field.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
};

describe.each(["light", "dark"] as const)("Textarea designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("draws the $id field like its Input, on whole lines", async (system) => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <Input label="Name" />
        <Textarea label="Message" rows={2} />
        <Textarea label="Notes" rows={4} />
        <Textarea label="Invalid" error="Write a message." />
      </ThemeProvider>,
    );
    const input = screen.getByRole("textbox", { name: "Name" });
    const field = screen.getByRole("textbox", { name: "Message" });
    const styles = getComputedStyle(field);
    const wrapper = field.closest<HTMLElement>(".textarea__wrapper")!;

    for (const property of SHARED) expect(styles[property]).toBe(getComputedStyle(input)[property]);
    expect(parseFloat(styles.borderTopLeftRadius)).toBe(system.radius);
    expect(field.getBoundingClientRect().width).toBeCloseTo(wrapper.getBoundingClientRect().width, 1);
    expect(contentHeight(screen.getByRole("textbox", { name: "Notes" }))).toBeCloseTo(2 * contentHeight(field), 0);

    const invalid = screen.getByRole("textbox", { name: "Invalid" });
    expect(getComputedStyle(invalid).borderTopColor).toBe(resolveColor(wrapper, "--input-error-border-color"));
    const rest = [getComputedStyle(invalid).boxShadow, getComputedStyle(invalid).borderBottomColor].join();
    await user.click(invalid);
    await waitFor(() => expect([getComputedStyle(invalid).boxShadow, getComputedStyle(invalid).borderBottomColor].join())
      .not.toBe(rest));
    const message = getComputedStyle(screen.getByText("Write a message.")).color;
    expect(contrastRatio(message, resolveColor(wrapper, "--color-surface"))).toBeGreaterThanOrEqual(4.5);
  });

  it.each(SYSTEMS)("keeps $id read-only and disabled fields apart", (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <Input label="Input read only" readonly defaultValue="Original" />
        <Textarea label="Read only" readonly defaultValue="Original" />
        <Input label="Input disabled" disabled defaultValue="Original" />
        <Textarea label="Disabled" disabled defaultValue="Original" />
      </ThemeProvider>,
    );
    const pairs = [["Read only", "Input read only"], ["Disabled", "Input disabled"]] as const;
    for (const [textarea, input] of pairs) {
      const a = getComputedStyle(screen.getByRole("textbox", { name: textarea }));
      const b = getComputedStyle(screen.getByRole("textbox", { name: input }));
      expect([a.backgroundColor, a.borderBottomStyle, a.borderBottomColor, a.color])
        .toEqual([b.backgroundColor, b.borderBottomStyle, b.borderBottomColor, b.color]);
    }
    expect(getComputedStyle(screen.getByRole("textbox", { name: "Disabled" })).resize).toBe("none");
  });
});

describe("Textarea growth, labels and scopes", () => {
  it("grows with its content up to maxRows, then scrolls", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local">
        <Textarea label="Notes" rows={2} maxRows={4} autoResize />
      </ThemeProvider>,
    );
    const field = screen.getByRole("textbox", { name: "Notes" });
    const twoLines = contentHeight(field);

    await user.type(field, "1{Enter}2{Enter}3");
    expect(contentHeight(field)).toBeCloseTo(twoLines * 1.5, 0);
    await user.type(field, "{Enter}4{Enter}5{Enter}6");
    expect(contentHeight(field)).toBeCloseTo(twoLines * 2, 0);
    expect(field.scrollHeight).toBeGreaterThan(field.clientHeight);
    expect(getComputedStyle(field).resize).toBe("none");
  });

  it("rests a floating label on the first line and raises it once there is text", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local" designSystem="material">
        <Input label="Name" />
        <Textarea label="Message" />
      </ThemeProvider>,
    );
    const offset = (name: string) => {
      const label = screen.getByText(name);
      return label.getBoundingClientRect().top - label.parentElement!.getBoundingClientRect().top;
    };
    const rest = offset("Message");

    expect(rest).toBeCloseTo(offset("Name"), 0);
    await user.type(screen.getByRole("textbox", { name: "Message" }), "Hi");
    screen.getByRole("textbox", { name: "Message" }).blur();
    await waitFor(() => expect(offset("Message")).toBeLessThan(rest));
  });

  it("resets a nested Neus scope inside Carbon", () => {
    render(
      <ThemeProvider scope="local" designSystem="carbon">
        <Textarea label="Outer" />
        <ThemeProvider designSystem="neus">
          <Textarea label="Inner" />
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(getComputedStyle(screen.getByRole("textbox", { name: "Outer" })).borderTopLeftRadius).toBe("0px");
    expect(getComputedStyle(screen.getByRole("textbox", { name: "Inner" })).borderTopLeftRadius).toBe("16px");
  });

  it("drops transitions under reduced motion", async () => {
    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      render(
        <ThemeProvider scope="local">
          <Textarea label="Message" />
        </ThemeProvider>,
      );
      expect(getComputedStyle(screen.getByRole("textbox", { name: "Message" })).transitionDuration).toBe("0s");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });
});
