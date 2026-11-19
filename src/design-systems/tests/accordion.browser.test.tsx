import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { cdp, userEvent as pointer } from "vitest/browser";
import { Accordion } from "../../components/Accordion";
import { Card } from "../../components/Card";
import { ThemeProvider } from "../../providers";
import { FAQ } from "../../sections/FAQ";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import type { DesignSystemId } from "../../design-systems";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = ["neus", "apple", "carbon", "material", "neobrutalism", "vercel"] as const;

const ITEMS = [
  { value: "shipping", title: "Shipping", content: "Orders leave within two business days." },
  { value: "returns", title: "Returns", content: "Send anything back within 30 days." },
  { value: "warranty", title: "Warranty", content: "Two years on every device.", disabled: true },
];

const accordion = (system: DesignSystemId, scheme: "light" | "dark" = "light") => (
  <ThemeProvider scope="local" designSystem={system} colorScheme={scheme}>
    <div style={{ width: 480, background: "var(--color-surface)" }}>
      <Accordion items={ITEMS} defaultValue={["shipping"]} />
    </div>
  </ThemeProvider>
);

const header = (name: string) => screen.getByText(name).closest("summary")!;

describe.each(["light", "dark"] as const)("Accordion designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("keeps the %s titles, answers and chevron legible and turns the chevron when open", (system) => {
    render(accordion(system, scheme));
    const open = header("Shipping");
    const surface = resolveColor(open, "--color-surface");
    const item = getComputedStyle(open.parentElement!);
    const fill = flatten(item.backgroundColor, surface);
    const headerFill = flatten(getComputedStyle(open).backgroundColor, fill);
    const content = open.parentElement!.querySelector<HTMLElement>(".accordion__content")!;

    expect(open.getBoundingClientRect().height).toBeGreaterThanOrEqual(40);
    expect(contrastRatio(getComputedStyle(open).color, headerFill)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(getComputedStyle(content).color, fill)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(getComputedStyle(open.querySelector("svg")!).color, headerFill)).toBeGreaterThanOrEqual(3);
    expect(getComputedStyle(open.querySelector("svg")!).transform).not.toBe("none");
    expect(getComputedStyle(header("Returns").querySelector("svg")!).transform).toBe("none");
    // Items are told apart by a rule or by their own outline.
    expect(parseFloat(item.borderTopWidth)).toBeGreaterThan(0);
  });
});

describe("Accordion behavior in the browser", () => {
  it("opens and closes from the keyboard and outlines the focused header", async () => {
    render(accordion("neus"));

    // The browser's own keyboard: only real key presses activate a summary.
    await pointer.tab();
    await pointer.tab();
    expect(header("Returns")).toHaveFocus();
    expect(getComputedStyle(header("Returns")).outlineStyle).toBe("solid");
    await pointer.keyboard("{Enter}");
    expect((header("Returns").parentElement as HTMLDetailsElement).open).toBe(true);
    await pointer.keyboard(" ");
    expect((header("Returns").parentElement as HTMLDetailsElement).open).toBe(false);
  });

  it("keeps one item open in single mode", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local">
        <Accordion type="single" items={ITEMS} defaultValue={["shipping"]} />
      </ThemeProvider>,
    );

    await user.click(header("Returns"));

    expect((header("Shipping").parentElement as HTMLDetailsElement).open).toBe(false);
    expect((header("Returns").parentElement as HTMLDetailsElement).open).toBe(true);
  });

  it("fills a header on hover but not a disabled one", async () => {
    render(accordion("neus"));
    const rest = getComputedStyle(header("Returns")).backgroundColor;

    await pointer.hover(header("Returns"));
    await waitFor(() => expect(getComputedStyle(header("Returns")).backgroundColor).not.toBe(rest));
    await pointer.hover(header("Warranty"));
    expect(getComputedStyle(header("Warranty")).backgroundColor).toBe(rest);
    expect(getComputedStyle(header("Warranty")).cursor).toBe("not-allowed");
  });

  it("resets a nested Neus scope inside Neobrutalism", () => {
    render(
      <ThemeProvider scope="local" designSystem="neobrutalism">
        <ThemeProvider designSystem="neus">
          <Accordion items={ITEMS} />
        </ThemeProvider>
      </ThemeProvider>,
    );
    const item = getComputedStyle(header("Shipping").parentElement!);

    expect(item.borderLeftWidth).toBe("0px");
    expect(item.borderTopWidth).toBe("1px");
    expect(getComputedStyle(header("Shipping")).fontWeight).toBe("600");
  });

  it("turns the chevron at once under reduced motion", async () => {
    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
      render(accordion("neus"));

      expect(getComputedStyle(header("Shipping").querySelector("svg")!).transitionDuration).toBe("0s");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });
});

describe("FAQ designs", () => {
  it.each(SYSTEMS)("draws each %s question as a card of the system in the cards variant", (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system}>
        <Card data-testid="card" />
        <FAQ variant="cards" items={[{ question: "Do I need an appointment?", answer: "For check-ups, yes." }]} />
      </ThemeProvider>,
    );
    const card = getComputedStyle(screen.getByTestId("card"));
    const item = getComputedStyle(document.querySelector(".faq__item")!);

    expect(item.borderTopLeftRadius).toBe(card.borderTopLeftRadius);
    expect(item.borderLeftWidth).toBe(card.borderLeftWidth);
    expect(item.backgroundColor).toBe(card.backgroundColor);
    expect(item.boxShadow).toBe(card.boxShadow);
  });

  it("stops the list at a readable measure", () => {
    render(
      <ThemeProvider scope="local">
        <div style={{ width: 1200 }}>
          <FAQ items={[{ question: "Do I need an appointment?", answer: "For check-ups, yes." }]} />
        </div>
      </ThemeProvider>,
    );

    expect(document.querySelector(".faq")!.getBoundingClientRect().width).toBe(768);
  });
});
