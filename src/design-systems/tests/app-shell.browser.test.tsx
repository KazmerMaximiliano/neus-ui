import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import "../../css/app.css";
import { ThemeProvider } from "../../providers";
import { AppTemplate } from "../../templates/AppTemplate/AppTemplate";
import { DESIGN_SYSTEMS } from "../design-systems.consts";
import { contrastRatio } from "./design-systems.test-utils";

afterEach(cleanup);

const ROUTES = [{ label: "Resumen", active: true }, { label: "Publicaciones" }];

const renderShell = (id: string, scheme: "light" | "dark") => render(
  <ThemeProvider scope="local" designSystem={id as never} colorScheme={scheme}>
    <AppTemplate title="Pulso" routes={ROUTES} headerStart={<span>Estudio Norte</span>} menu={<button type="button">Cuenta</button>}>
      <h1>Resumen</h1>
    </AppTemplate>
  </ThemeProvider>,
);

describe.each(DESIGN_SYSTEMS)("Application shell in $id", ({ id }) => {
  it.each(["light", "dark"] as const)("joins the sidebar's top block and the header in one band (%s)", async (scheme) => {
    await page.viewport(1440, 900);
    const { container } = renderShell(id, scheme);
    const header = container.querySelector(".app-template__header")!;
    const top = container.querySelector(".sidebar__header")!;
    const body = container.querySelector(".sidebar__body")!;
    const content = container.querySelector(".app-template__content")!;
    const convex = parseFloat(getComputedStyle(body).borderTopRightRadius);
    // The band ends where the panel's curve has turned: block height plus the curve.
    expect(Math.round(header.getBoundingClientRect().bottom)).toBe(Math.round(top.getBoundingClientRect().bottom + convex));
    const band = getComputedStyle(header).backgroundColor;
    const behindTop = getComputedStyle(container.querySelector(".sidebar")!).backgroundColor;
    const topFill = getComputedStyle(top).backgroundColor;
    expect(topFill === "rgba(0, 0, 0, 0)" ? behindTop : topFill).toBe(band);
    // Carbon's UI shell keeps content on the header's background (its tiles are the gray layer)
    // and separates them with a rule; every other system gives the content its own surface.
    if (getComputedStyle(content).backgroundColor === band) {
      expect(id).toBe("carbon");
      expect(parseFloat(getComputedStyle(header).borderBottomWidth)).toBeGreaterThan(0);
    }
    expect(screen.getByText("Estudio Norte").getBoundingClientRect().left)
      .toBeLessThan(screen.getByRole("button", { name: "Cuenta" }).getBoundingClientRect().left);
    if (id === "neus") {
      const panel = getComputedStyle(body).backgroundColor;
      expect(contrastRatio(panel, band)).toBeGreaterThanOrEqual(3);
      expect(contrastRatio(panel, getComputedStyle(content).backgroundColor)).toBeGreaterThanOrEqual(3);
    }
  });
});

it.each([800, 390])("keeps the content below the header at %ipx", async (width) => {
  await page.viewport(width, 900);
  const { container } = renderShell("neus", "light");
  const header = container.querySelector(".app-template__header")!.getBoundingClientRect();
  const heading = screen.getByRole("heading", { name: "Resumen" }).getBoundingClientRect();
  expect(heading.top).toBeGreaterThanOrEqual(header.bottom);
  if (width >= 768) {
    const top = container.querySelector(".sidebar__header")!.getBoundingClientRect();
    expect(header.bottom).toBeGreaterThanOrEqual(top.bottom);
  }
});
