import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { Link } from "../../components/Link";
import "../../css/app.css";
import { ThemeProvider } from "../../providers";
import { contrastRatio, resolveColor } from "./design-systems.test-utils";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", underline: false },
  { id: "apple", underline: false },
  { id: "carbon", underline: false },
  { id: "material", underline: true },
  { id: "neobrutalism", underline: true },
  { id: "vercel", underline: false },
] as const;

describe.each(["light", "dark"] as const)("Link designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("renders legible $id links with a visible focus", async (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <Link label="Primary" />
        <Link label="Secondary" type="secondary" />
      </ThemeProvider>,
    );
    const primary = screen.getByRole("link", { name: "Primary" });
    const surface = resolveColor(primary.parentElement!, "--color-surface");
    for (const name of ["Primary", "Secondary"]) {
      const styles = getComputedStyle(screen.getByRole("link", { name }));
      expect(contrastRatio(styles.color, surface)).toBeGreaterThanOrEqual(4.5);
    }
    expect(getComputedStyle(primary).textDecorationLine).toBe(
      system.underline ? "underline" : "none",
    );
    await userEvent.tab();
    expect(primary).toHaveFocus();
    expect(getComputedStyle(primary).outlineStyle).toBe("solid");
  });
});
