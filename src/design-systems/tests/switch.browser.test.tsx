import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { cdp } from "vitest/browser";
import { Switch } from "../../components/Switch";
import { ThemeProvider } from "../../providers";
import { contrastRatio, resolveColor } from "./colorContrast";
import { xHeightOffset } from "./labelAlignment";
import type {} from "@vitest/browser-playwright";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", track: [44, 24], thumb: [12, 16] },
  { id: "apple", track: [51, 31], thumb: [27, 27] },
  { id: "carbon", track: [48, 24], thumb: [18, 18] },
  { id: "material", track: [52, 32], thumb: [16, 24] },
  { id: "neobrutalism", track: [52, 28], thumb: [16, 16] },
  { id: "vercel", track: [32, 18], thumb: [16, 16] },
] as const;

const parts = (name: string) => {
  const control = screen.getByRole("switch", { name });
  const track = control.nextElementSibling as HTMLElement;
  return { control, track, thumb: track.firstElementChild as HTMLElement };
};

// What separates the switch from the page: its border when it has one, otherwise its fill.
const boundary = (track: HTMLElement) => {
  const styles = getComputedStyle(track);
  return parseFloat(styles.borderTopWidth) > 0 ? styles.borderTopColor : styles.backgroundColor;
};

describe.each(["light", "dark"] as const)("Switch designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("draws the $id track and thumb with 3:1 in both states", async (system) => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <Switch label="Wi-Fi" />
      </ThemeProvider>,
    );
    const { track, thumb } = parts("Wi-Fi");
    const surface = resolveColor(track, "--color-surface");
    const center = () => {
      const box = thumb.getBoundingClientRect();
      return box.left + box.width / 2 - track.getBoundingClientRect().left;
    };

    expect([track.offsetWidth, track.offsetHeight]).toEqual(system.track);
    for (const [index, checked] of [false, true].entries()) {
      if (checked) {
        await user.click(track);
        await waitFor(() => expect(thumb.offsetWidth).toBe(system.thumb[1]));
      }
      expect(thumb.offsetWidth).toBe(system.thumb[index]);
      await waitFor(() => expect(center()).toBeCloseTo(
        checked ? system.track[0] - system.track[1] / 2 : system.track[1] / 2, 0,
      ));
      expect(contrastRatio(boundary(track), surface)).toBeGreaterThanOrEqual(3);
      expect(contrastRatio(getComputedStyle(thumb).backgroundColor, getComputedStyle(track).backgroundColor))
        .toBeGreaterThanOrEqual(3);
    }
    const label = getComputedStyle(screen.getByText("Wi-Fi")).color;
    expect(contrastRatio(label, surface)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(SYSTEMS)("shows $id keyboard focus and a disabled state", async (system) => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <Switch label="Wi-Fi" />
        <Switch label="Bluetooth" disabled defaultChecked />
      </ThemeProvider>,
    );
    const wifi = parts("Wi-Fi");
    const bluetooth = parts("Bluetooth");

    await user.tab();
    expect(wifi.control).toHaveFocus();
    expect(getComputedStyle(wifi.track).outlineStyle).toBe("solid");
    expect(getComputedStyle(wifi.track).outlineColor).toBe(resolveColor(wifi.track, "--color-focus"));
    expect(getComputedStyle(bluetooth.track).opacity).toBe(["apple", "vercel"].includes(system.id) ? "0.5" : "0.38");
    expect(getComputedStyle(bluetooth.thumb).left).not.toBe(getComputedStyle(wifi.thumb).left);
    expect(getComputedStyle(screen.getByText("Bluetooth")).color).toBe(resolveColor(bluetooth.track, "--color-text-disabled"));
    expect(getComputedStyle(screen.getByText("Bluetooth").parentElement!).cursor).toBe("not-allowed");
    await user.click(screen.getByText("Bluetooth"));
    expect(bluetooth.control).toBeChecked();
  });
});

describe("Switch layout, scopes and motion", () => {
  it.each(SYSTEMS)("centers the $id track on the label's lowercase letters", ({ id }) => {
    render(
      <ThemeProvider scope="local" designSystem={id}>
        <Switch label="wireless" />
      </ThemeProvider>,
    );

    expect(Math.abs(xHeightOffset(screen.getByText("wireless"), parts("wireless").track))).toBeLessThan(0.5);
  });

  it("puts the track at the far edge when stretched and the description under the label", () => {
    render(
      <ThemeProvider scope="local">
        <Switch label="Wi-Fi" description="Joins known networks." style={{ width: 320 }} />
      </ThemeProvider>,
    );
    const { track } = parts("Wi-Fi");
    const root = track.parentElement!;
    const label = screen.getByText("Wi-Fi").getBoundingClientRect();
    const description = screen.getByText("Joins known networks.").getBoundingClientRect();

    expect(track.getBoundingClientRect().right).toBeCloseTo(root.getBoundingClientRect().right, 0);
    expect(description.left).toBeCloseTo(label.left, 0);
    expect(description.top).toBeGreaterThanOrEqual(label.bottom);
  });

  it("moves the thumb to the start of the track when checked in right-to-left text", () => {
    render(
      <ThemeProvider scope="local">
        <div dir="rtl"><Switch label="Wi-Fi" defaultChecked /></div>
      </ThemeProvider>,
    );
    const { track, thumb } = parts("Wi-Fi");

    expect(thumb.getBoundingClientRect().left - track.getBoundingClientRect().left).toBeLessThan(track.offsetWidth / 2);
  });

  it("resets a nested Neus scope inside Carbon", () => {
    render(
      <ThemeProvider scope="local" designSystem="carbon">
        <Switch label="Outer" />
        <ThemeProvider designSystem="neus">
          <Switch label="Inner" />
        </ThemeProvider>
      </ThemeProvider>,
    );

    expect(parts("Outer").track.offsetWidth).toBe(48);
    expect(parts("Inner").track.offsetWidth).toBe(44);
    expect(getComputedStyle(parts("Inner").track).borderTopWidth).toBe("2px");
  });

  it("drops transitions under reduced motion", async () => {
    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      render(
        <ThemeProvider scope="local">
          <Switch label="Wi-Fi" />
        </ThemeProvider>,
      );
      const { track, thumb } = parts("Wi-Fi");
      expect(getComputedStyle(track).transitionDuration).toBe("0s");
      expect(getComputedStyle(thumb).transitionDuration).toBe("0s");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });
});
