import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { Button } from "../../components/Button";
import { ThemeProvider } from "../../providers";
import { PricingCard } from "../../sections/PricingCard";
import { PricingTable } from "../../sections/PricingTable";
import { contrastRatio, flatten, resolveColor } from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import "../../css/app.css";

afterEach(cleanup);

const SYSTEMS = ["neus", "apple", "carbon", "material", "neobrutalism", "vercel"] as const;

describe.each(["light", "dark"] as const)("Pricing designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("sets the featured %s plan apart and lines the actions up", async (system) => {
    await page.viewport(1280, 900);
    render(
      <ThemeProvider scope="local" designSystem={system} colorScheme={scheme}>
        <div style={{ background: "var(--color-surface)", padding: 24 }}>
          <PricingTable aria-label="Plans">
            <PricingCard name="Hobby" price="Free" features={["Three projects"]} action={<Button label="Start" variant="outlined" fullWidth />} />
            <PricingCard name="Team" price="$24" period="per seat, per month" description="For teams that ship every week." featured badge="Most popular"
              features={["Unlimited projects", "Preview deployments", "Email support within a day"]} action={<Button label="Start a trial" fullWidth />} />
            <PricingCard name="Enterprise" price="Custom" features={["Single sign-on", "Audit logs"]} action={<Button label="Talk to sales" variant="outlined" fullWidth />} />
          </PricingTable>
        </div>
      </ThemeProvider>,
    );
    const [hobby, team] = screen.getAllByRole("listitem").filter((item) => item.classList.contains("pricing-card"));
    const surface = resolveColor(team, "--color-surface");
    const featured = getComputedStyle(team);
    const plain = getComputedStyle(hobby);
    const amount = getComputedStyle(screen.getByText("$24"));
    const period = getComputedStyle(screen.getByText("per seat, per month"));
    const fill = flatten(featured.backgroundColor, surface);

    // The featured plan has its own outline color or shadow, and a badge, never color alone.
    expect(featured.borderTopColor !== plain.borderTopColor || featured.boxShadow !== plain.boxShadow).toBe(true);
    expect(screen.getByText("Most popular")).toBeVisible();
    expect(parseFloat(amount.fontSize)).toBeGreaterThanOrEqual(parseFloat(getComputedStyle(screen.getByText("Unlimited projects")).fontSize) * 1.5);
    expect(contrastRatio(amount.color, fill)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(period.color, fill)).toBeGreaterThanOrEqual(4.5);
    const bottoms = ["Start", "Start a trial", "Talk to sales"].map((name) => Math.round(screen.getByRole("button", { name }).getBoundingClientRect().bottom));
    expect(new Set(bottoms).size).toBe(1);
    expect(hobby.getBoundingClientRect().height).toBe(team.getBoundingClientRect().height);
  });
});

describe("PricingCard alone", () => {
  it("is a div with its check marks beside the first line of each feature", () => {
    render(
      <ThemeProvider scope="local">
        <div style={{ width: 280 }}>
          <PricingCard name="Team" price="$24" features={["Preview deployments for every branch you push"]} />
        </div>
      </ThemeProvider>,
    );
    const feature = screen.getByText("Preview deployments for every branch you push");
    const check = feature.parentElement!.querySelector("svg")!.getBoundingClientRect();
    const line = parseFloat(getComputedStyle(feature).lineHeight);

    expect(feature.closest(".pricing-card")!.tagName).toBe("DIV");
    expect(feature.getBoundingClientRect().height).toBeGreaterThan(line * 1.5);
    expect(check.top + check.height / 2).toBeCloseTo(feature.getBoundingClientRect().top + line / 2, 0);
  });
});
