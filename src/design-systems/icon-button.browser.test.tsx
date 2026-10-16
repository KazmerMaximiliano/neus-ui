import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Plus } from "lucide-react";
import { afterEach, describe, expect, it } from "vitest";
import { IconButton } from "../components/IconButton";
import "../css/app.css";
import { ThemeProvider } from "../providers";
import { contrastRatio, resolveColor } from "./design-systems.test-utils";

afterEach(cleanup);

const SYSTEMS = [
  { id: "neus", radius: "50%", sizes: [40, 54, 68], icon: 20 },
  { id: "apple", radius: "8px", sizes: [32, 44, 56], icon: 20 },
  { id: "carbon", radius: "0px", sizes: [32, 40, 48], icon: 16 },
  { id: "material", radius: "50%", sizes: [32, 40, 56], icon: 24 },
  { id: "neobrutalism", radius: "4px", sizes: [40, 48, 60], icon: 20 },
  { id: "vercel", radius: "6px", sizes: [32, 40, 48], icon: 16 },
] as const;

describe.each(["light", "dark"] as const)("IconButton designs in %s mode", (scheme) => {
  it.each(SYSTEMS)("renders $id geometry and legible pairs", async (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <IconButton icon={Plus} label="Small" size="small" />
        <IconButton icon={Plus} label="Medium" />
        <IconButton icon={Plus} label="Large" size="large" />
        <IconButton icon={Plus} label="Quiet" variant="text" />
        <IconButton icon={Plus} label="Disabled" disabled />
      </ThemeProvider>,
    );
    const sizes = ["Small", "Medium", "Large"].map(
      (name) => screen.getByRole("button", { name }).getBoundingClientRect().width,
    );
    expect(sizes).toEqual([...system.sizes]);
    const medium = screen.getByRole("button", { name: "Medium" });
    const styles = getComputedStyle(medium);
    expect(styles.borderRadius).toBe(system.radius);
    expect(medium.querySelector("svg")!.getBoundingClientRect().width).toBe(system.icon);
    expect(contrastRatio(styles.color, styles.backgroundColor)).toBeGreaterThanOrEqual(4.5);
    const surface = resolveColor(medium.parentElement!, "--color-surface");
    const quiet = getComputedStyle(screen.getByRole("button", { name: "Quiet" }));
    expect(contrastRatio(quiet.color, surface)).toBeGreaterThanOrEqual(4.5);
    expect(getComputedStyle(screen.getByRole("button", { name: "Disabled" })).boxShadow).toBe("none");

    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Small" })).toHaveFocus();
    expect(getComputedStyle(screen.getByRole("button", { name: "Small" })).outlineStyle).toBe("solid");
  });
});

describe("IconButton theme boundaries", () => {
  it("resets geometry inside a nested Neus scope and keeps siblings isolated", () => {
    render(
      <>
        <ThemeProvider scope="local" designSystem="carbon" colorScheme="dark">
          <IconButton icon={Plus} label="Outer" />
          <ThemeProvider designSystem="neus" colorScheme="light">
            <IconButton icon={Plus} label="Inner" />
          </ThemeProvider>
        </ThemeProvider>
        <ThemeProvider scope="local" designSystem="neobrutalism">
          <IconButton icon={Plus} label="Sibling" />
        </ThemeProvider>
      </>,
    );
    const outer = screen.getByRole("button", { name: "Outer" });
    const inner = screen.getByRole("button", { name: "Inner" });
    const sibling = screen.getByRole("button", { name: "Sibling" });
    expect(getComputedStyle(outer).borderRadius).toBe("0px");
    expect(inner.getBoundingClientRect().width).toBe(54);
    expect(getComputedStyle(inner).backgroundColor).toBe("rgb(40, 53, 147)");
    expect(getComputedStyle(sibling).borderTopWidth).toBe("3px");
    expect(getComputedStyle(sibling).boxShadow).not.toBe("none");
  });
});
