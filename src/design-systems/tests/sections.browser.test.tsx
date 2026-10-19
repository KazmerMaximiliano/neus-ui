import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { Button, MediaPlaceholder } from "../../components";
import "../../css/app.css";
import { ThemeProvider } from "../../providers";
import { CallToAction, FeatureItem, FeatureList, Hero, SiteFooter, SiteHeader } from "../../sections";
import { DESIGN_SYSTEMS } from "../design-systems.consts";
import { contrastRatio } from "./design-systems.test-utils";

afterEach(cleanup);

const LINKS = [{ label: "Servicios", href: "#servicios" }, { label: "Equipo", href: "#equipo" }];

const renderPage = (id: string) => render(
  <ThemeProvider scope="local" designSystem={id as never}>
    <SiteHeader brand="Los Aromos" links={LINKS} actions={<Button label="Pedir turno" size="small" href="#turno" />} />
    <Hero title="Tu veterinaria de barrio" lead="Consultas y vacunas." actions={<Button label="Pedir turno" href="#turno" />}
      media={<MediaPlaceholder label="Consultorio" />} />
    <FeatureList variant="cards"><FeatureItem title="Consultas" /><FeatureItem title="Vacunas" /><FeatureItem title="Cirugías" /></FeatureList>
    <CallToAction tone="brand" title="Pedí tu turno" actions={<Button label="Pedir turno" href="#turno" />} />
    <SiteFooter brand="Los Aromos" columns={[{ title: "Clínica", links: LINKS }]} legal="Bv. Oroño 1450" />
  </ThemeProvider>,
);

describe.each(DESIGN_SYSTEMS)("Page sections in $id", ({ id }) => {
  it("opens the phone menu with the native popover and closes it from a link", async () => {
    await page.viewport(390, 844);
    renderPage(id);
    const button = screen.getByRole("button", { name: "Menu" });
    const menu = document.querySelector<HTMLElement>(".site-header__menu")!;
    expect(menu.matches(":popover-open")).toBe(false);
    expect(getComputedStyle(menu).display).toBe("none");
    await userEvent.click(button);
    expect(menu.matches(":popover-open")).toBe(true);
    const link = menu.querySelector<HTMLElement>('a[href="#equipo"]')!;
    expect(link).toBeVisible();
    await userEvent.click(link);
    expect(menu.matches(":popover-open")).toBe(false);
    expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(390);
  });

  it("shows the inline bar, a two-column hero and three feature cards at 1440px", async () => {
    await page.viewport(1440, 900);
    renderPage(id);
    expect(getComputedStyle(document.querySelector(".site-header__menu-button")!).display).toBe("none");
    expect(screen.getByRole("navigation", { name: "Main" })).toBeVisible();
    const title = screen.getByRole("heading", { level: 1 }).getBoundingClientRect();
    const media = screen.getByRole("img", { name: "Consultorio" }).getBoundingClientRect();
    expect(media.left).toBeGreaterThan(title.right - 1);
    const cards = screen.getAllByRole("listitem").filter((item) => item.classList.contains("feature-item"));
    expect(new Set(cards.map((card) => Math.round(card.getBoundingClientRect().top))).size).toBe(1);
  });

  it.each(["light", "dark"] as const)("keeps the brand band's text and primary buttons legible in %s mode", async (scheme) => {
    await page.viewport(1440, 900);
    render(
      <ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
        <CallToAction tone="brand" title="Pedí tu turno" actions={<><Button label="Reservar" /><Button label="Ver horarios" variant="outlined" /></>} />
      </ThemeProvider>,
    );
    const band = getComputedStyle(screen.getByRole("region")).backgroundColor;
    expect(contrastRatio(getComputedStyle(screen.getByRole("heading")).color, band)).toBeGreaterThanOrEqual(4.5);
    const solid = getComputedStyle(screen.getByRole("button", { name: "Reservar" }));
    expect(contrastRatio(solid.backgroundColor, band)).toBeGreaterThanOrEqual(3);
    expect(contrastRatio(solid.color, solid.backgroundColor)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(getComputedStyle(screen.getByRole("button", { name: "Ver horarios" })).color, band)).toBeGreaterThanOrEqual(4.5);
  });
});
