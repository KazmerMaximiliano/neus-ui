import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { Clock } from "../../components/Clock/Clock";
import { ThemeProvider } from "../../providers";
import "../../css/app.css";
import { DESIGN_SYSTEMS } from "../design-systems.consts";
import { contrastRatio, resolveColor } from "./design-systems.test-utils";

afterEach(cleanup);

describe.each(["light", "dark"] as const)("Clock dial in %s", (scheme) => {
  it.each(DESIGN_SYSTEMS)("keeps exact and partially overlapped numbers legible in $id", async ({ id }) => {
    await page.viewport(800, 800);
    const view = render(<ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
      <Clock value={{ hours: 2, minutes: 11 }} />
    </ThemeProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Minutos" }));
    const face = screen.getByRole("slider", { name: "Minutos" });
    const numbers = view.container.querySelector<HTMLElement>(".clock__numbers")!;
    const hand = view.container.querySelector<HTMLElement>(".clock__hand")!;
    expect(Number(getComputedStyle(numbers).zIndex)).toBeGreaterThan(Number(getComputedStyle(hand).zIndex));

    for (const minute of [11, 10, 59, 0]) {
      view.rerender(<ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
        <Clock value={{ hours: 2, minutes: minute }} />
      </ThemeProvider>);
      await waitFor(() => expect(parseFloat(getComputedStyle(face).getPropertyValue("--clock-hand-angle"))).toBeCloseTo(minute * 6 - 90, 2));
      const label = view.container.querySelector<HTMLElement>(`.clock__number[data-label="${minute === 59 || minute === 0 ? "00" : "10"}"]`)!;
      const ink = getComputedStyle(label, "::after");
      expect(ink.content).toBe(`"${label.textContent}"`);
      expect(ink.clipPath).toMatch(/^inset\(/);
      const background = label.classList.contains("clock__number--selected")
        ? getComputedStyle(label).backgroundColor
        : getComputedStyle(view.container.querySelector(".clock__hand-tip")!).backgroundColor;
      expect(contrastRatio(ink.color, background), `${id}/${scheme}/${minute}`).toBeGreaterThanOrEqual(4.5);
      if (!label.classList.contains("clock__number--selected")) {
        expect(contrastRatio(getComputedStyle(label).color, resolveColor(face, "--clock-face-background"))).toBeGreaterThanOrEqual(4.5);
      }
      if (minute === 11 || minute === 59) expect(view.container.querySelector(".clock__number--selected")).toBeNull();
    }

    fireEvent.click(screen.getByRole("button", { name: "Horas" }));
    for (const hour of [2, 14]) {
      view.rerender(<ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
        <Clock value={{ hours: hour, minutes: 11 }} format="24h" />
      </ThemeProvider>);
      const selected = view.container.querySelector<HTMLElement>(".clock__number--selected")!;
      expect(selected).toHaveTextContent(String(hour));
      await waitFor(() => expect(parseFloat(getComputedStyle(face).getPropertyValue("--clock-hand-scale"))).toBeCloseTo(hour < 12 ? 0.6 : 1, 2));
      expect(contrastRatio(getComputedStyle(selected, "::after").color, getComputedStyle(selected).backgroundColor)).toBeGreaterThanOrEqual(4.5);
    }
  });
});
