import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { Alert, Avatar, AvatarGroup, Card, CardContent, Grid, Heading, MediaPlaceholder, Section, Stack, Text } from "../../components";
import "../../css/app.css";
import { ThemeProvider } from "../../providers";
import { DESIGN_SYSTEMS } from "../design-systems.consts";
import { contrastRatio, flatten } from "./design-systems.test-utils";

afterEach(cleanup);

const SIZES = ["display", "xl", "lg", "md", "sm", "xs"] as const;
const px = (element: Element, property = "fontSize") =>
  parseFloat(getComputedStyle(element)[property as "fontSize"]);
const columns = (element: Element) => getComputedStyle(element).gridTemplateColumns.split(" ").length;

const renderFoundations = (id: string) => render(
  <ThemeProvider scope="local" designSystem={id as never}>
    {SIZES.map((size) => <Heading key={size} as="h2" size={size}>{size}</Heading>)}
    <Text>Running text of a public page, long enough to wrap on a phone.</Text>
    <Grid data-testid="grid">{[1, 2, 3].map((item) => <div key={item}>{item}</div>)}</Grid>
    <Stack data-testid="outer" direction="row" gap={8}>
      <Stack data-testid="inner"><span>a</span><span>b</span></Stack>
    </Stack>
    <Section data-testid="default">Default</Section>
    <Section data-testid="subtle" tone="subtle">Subtle</Section>
    <Section data-testid="accent" tone="accent">Accent</Section>
  </ThemeProvider>,
);

describe.each(DESIGN_SYSTEMS)("Typography and layout in $id", ({ id }) => {
  it("scales the display headline with the viewport and keeps the heading ladder in order", async () => {
    const measure = async (width: number) => {
      await page.viewport(width, 900);
      renderFoundations(id);
      const sizes = SIZES.map((size) => px(screen.getByRole("heading", { name: size })));
      cleanup();
      return sizes;
    };
    const phone = await measure(390);
    const desktop = await measure(1440);
    expect(desktop[0]).toBeGreaterThan(phone[0]);
    expect(phone[0]).toBeGreaterThanOrEqual(36);
    for (const sizes of [phone, desktop]) {
      sizes.slice(1).forEach((size, index) => expect(size).toBeLessThanOrEqual(sizes[index]));
      expect(sizes[0]).toBeGreaterThan(sizes[3]);
    }
  });

  it.each([390, 1440])("keeps body text at 16px or more, grids responsive and nested stacks independent at %ipx", async (width) => {
    await page.viewport(width, 900);
    renderFoundations(id);
    expect(px(screen.getByText(/Running text/))).toBeGreaterThanOrEqual(16);
    expect(columns(screen.getByTestId("grid"))).toBe(width < 768 ? 1 : 3);
    expect(getComputedStyle(screen.getByTestId("outer")).flexDirection).toBe("row");
    const inner = getComputedStyle(screen.getByTestId("inner"));
    expect(inner.flexDirection).toBe("column");
    expect(inner.rowGap).not.toBe(getComputedStyle(screen.getByTestId("outer")).columnGap);
  });

  it.each(["light", "dark"] as const)("separates section tones and keeps filled bands legible in %s mode", async (scheme) => {
    await page.viewport(1440, 900);
    const tones = ["default", "subtle", "accent", "brand", "inverse"] as const;
    render(
      <ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
        {tones.map((tone) => (
          <Section key={tone} data-testid={tone} tone={tone}>
            <Text>Body {tone}</Text>
            <Text tone="muted">Muted {tone}</Text>
            <Card><CardContent><Text tone="muted">Card {tone}</Text></CardContent></Card>
          </Section>
        ))}
      </ThemeProvider>,
    );
    const background = (tone: string) => getComputedStyle(screen.getByTestId(tone)).backgroundColor;
    expect(new Set(["default", "subtle", "accent"].map(background)).size).toBe(3);
    // Monochrome systems (Vercel) fill brand and inverse with the same ink; both still differ from the page.
    for (const tone of ["brand", "inverse"]) expect(background(tone)).not.toBe(background("default"));
    expect(px(screen.getByTestId("default"), "paddingTop")).toBeGreaterThanOrEqual(48);
    for (const tone of ["brand", "inverse"]) {
      const band = background(tone);
      expect(contrastRatio(getComputedStyle(screen.getByText(`Body ${tone}`)).color, band)).toBeGreaterThanOrEqual(4.5);
      const muted = getComputedStyle(screen.getByText(`Muted ${tone}`)).color;
      expect(contrastRatio(flatten(muted, band), band)).toBeGreaterThanOrEqual(4.5);
      const card = screen.getByText(`Card ${tone}`);
      const surface = getComputedStyle(card.closest(".card")!).backgroundColor;
      expect(contrastRatio(flatten(getComputedStyle(card).color, surface), surface)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it.each(["light", "dark"] as const)("keeps alerts, avatars and placeholders legible in %s mode", async (scheme) => {
    await page.viewport(1440, 900);
    render(
      <ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
        {(["info", "success", "warning", "error"] as const).map((status) => (
          <Alert key={status} status={status} title={`Title ${status}`}>Message {status}</Alert>
        ))}
        <AvatarGroup max={2}><Avatar name="Ana Paz" /><Avatar name="Bruno Díaz" /><Avatar name="Carla Gómez" /></AvatarGroup>
        <MediaPlaceholder label="Team on stage" />
      </ThemeProvider>,
    );
    for (const status of ["info", "success", "warning", "error"]) {
      const alert = screen.getByText(`Message ${status}`).closest(".alert")!;
      const surface = getComputedStyle(alert).backgroundColor;
      expect(contrastRatio(getComputedStyle(screen.getByText(`Message ${status}`)).color, surface)).toBeGreaterThanOrEqual(4.5);
      const icon = getComputedStyle(alert.querySelector(".alert__icon")!).color;
      expect(contrastRatio(icon, surface)).toBeGreaterThanOrEqual(3);
    }
    const avatar = screen.getByRole("img", { name: "Ana Paz" });
    expect(contrastRatio(getComputedStyle(avatar).color, getComputedStyle(avatar).backgroundColor)).toBeGreaterThanOrEqual(4.5);
    expect(avatar.getBoundingClientRect().width).toBe(avatar.getBoundingClientRect().height);
    const more = screen.getByRole("img", { name: "+1" });
    expect(more.getBoundingClientRect().left).toBeLessThan(screen.getByRole("img", { name: "Bruno Díaz" }).getBoundingClientRect().right);
    const placeholder = screen.getByRole("img", { name: "Team on stage" });
    const box = placeholder.getBoundingClientRect();
    expect(box.width / box.height).toBeCloseTo(4 / 3, 1);
    expect(contrastRatio(getComputedStyle(placeholder).color, getComputedStyle(placeholder).backgroundColor)).toBeGreaterThanOrEqual(4.5);
  });
});
