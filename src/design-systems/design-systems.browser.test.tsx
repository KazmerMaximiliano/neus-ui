import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "../components/Button/Button";
import { ThemeProvider } from "../providers";
import "../css/app.css";

afterEach(cleanup);

const SYSTEM_CASES = [
  { id: "neus", light: "rgb(40, 53, 147)", dark: "rgb(165, 180, 252)" },
  { id: "apple", light: "rgb(0, 113, 227)", dark: "rgb(41, 151, 255)" },
  { id: "carbon", light: "rgb(15, 98, 254)", dark: "rgb(120, 169, 255)" },
  { id: "material", light: "rgb(100, 66, 214)", dark: "rgb(200, 179, 253)" },
  { id: "neobrutalism", light: "rgb(253, 200, 0)", dark: "rgb(253, 200, 0)" },
  { id: "vercel", light: "rgb(23, 23, 23)", dark: "rgb(237, 237, 237)" },
] as const;

describe.each(["light", "dark"] as const)("Design systems in %s mode", (scheme) => {
  it.each(SYSTEM_CASES)("renders $id with its palette and keeps variant/color/size independent", (system) => {
    render(
      <ThemeProvider scope="local" designSystem={system.id} colorScheme={scheme}>
        <Button label="Primary" />
        <Button label="Outline" variant="outlined" />
        <Button label="Text" variant="text" />
        <Button label="Small" size="small" />
        <Button label="Large" size="large" />
        <Button label="Success" color="success" />
        <Button label="Error" color="error" />
        <Button label="Info" color="info" />
        <Button label="White" color="white" />
      </ThemeProvider>,
    );
    const primary = screen.getByRole("button", { name: "Primary" });
    expect(getComputedStyle(primary).backgroundColor).toBe(system[scheme]);
    const outline = getComputedStyle(screen.getByRole("button", { name: "Outline" }));
    expect(outline.backgroundColor).toBe("rgba(0, 0, 0, 0)");
    expect(outline.color).toBe(system[scheme]);
    expect(parseFloat(outline.borderTopWidth)).toBeGreaterThan(0);
    const text = getComputedStyle(screen.getByRole("button", { name: "Text" }));
    expect(text.borderTopWidth).toBe("0px");
    expect(text.boxShadow).toBe("none");
    expect(text.backgroundColor).toBe("rgba(0, 0, 0, 0)");
    const small = screen.getByRole("button", { name: "Small" }).getBoundingClientRect();
    const large = screen.getByRole("button", { name: "Large" }).getBoundingClientRect();
    expect(large.height).toBeGreaterThan(small.height);
    expect(getComputedStyle(screen.getByRole("button", { name: "Success" })).backgroundColor)
      .not.toBe(system[scheme]);
    expect(getComputedStyle(screen.getByRole("button", { name: "Error" })).backgroundColor)
      .not.toBe(system[scheme]);
    expect(getComputedStyle(screen.getByRole("button", { name: "Info" })).backgroundColor)
      .toBe(system[scheme]);
    expect(getComputedStyle(screen.getByRole("button", { name: "White" })).backgroundColor)
      .toBe("rgb(255, 255, 255)");
  });
});

describe("Theme scope isolation and state styles", () => {
  it("resets button geometry and fonts inside nested scopes and when switching systems", async () => {
    const view = render(
      <ThemeProvider scope="local" designSystem="neobrutalism" colorScheme="dark">
        <Button label="Outer" />
        <ThemeProvider designSystem="neus" colorScheme="light">
          <Button label="Inner" />
        </ThemeProvider>
      </ThemeProvider>,
    );
    const outer = screen.getByRole("button", { name: "Outer" });
    const inner = screen.getByRole("button", { name: "Inner" });
    expect(getComputedStyle(outer).borderTopWidth).toBe("3px");
    expect(getComputedStyle(inner).borderTopWidth).toBe("0px");
    expect(getComputedStyle(inner).boxShadow).toBe("none");
    expect(getComputedStyle(inner).backgroundColor).toBe("rgb(40, 53, 147)");
    expect(getComputedStyle(inner).fontFamily).toContain("Manrope");
    view.rerender(
      <ThemeProvider scope="local" designSystem="carbon" colorScheme="light">
        <Button label="Outer" />
      </ThemeProvider>,
    );
    expect(getComputedStyle(screen.getByRole("button")).borderRadius).toBe("0px");
    await waitFor(() => {
      expect(getComputedStyle(screen.getByRole("button")).boxShadow).toBe("none");
    });
  });

  it("honors style overrides and colors loader dots through currentColor", () => {
    const { rerender } = render(
      <ThemeProvider scope="local" designSystem="neobrutalism">
        <Button label="Save" buttonStyle={{ borderRadius: "12px", color: "rgb(255, 0, 0)" }}
          labelStyle={{ letterSpacing: "2px" }} />
      </ThemeProvider>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(getComputedStyle(button).borderRadius).toBe("12px");
    expect(getComputedStyle(button.querySelector(".button-label")!).color).toBe("rgb(255, 0, 0)");
    expect(getComputedStyle(button.querySelector(".button-label")!).letterSpacing).toBe("2px");
    rerender(
      <ThemeProvider scope="local" designSystem="neobrutalism">
        <Button label="Save" loading loaderStyle={{ color: "rgb(255, 0, 0)", gap: "8px" }} />
      </ThemeProvider>,
    );
    const loader = screen.getByRole("button", { name: "Save" }).querySelector(".button-loader")!;
    expect(getComputedStyle(loader).gap).toBe("8px");
    expect(getComputedStyle(loader.children[0]).backgroundColor).toBe("rgb(255, 0, 0)");
    expect(getComputedStyle(loader.children[0]).width).toBe("7px");
    expect(getComputedStyle(loader).filter).toBe("none");
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("aria-busy", "true");
  });

  it("keeps button keyboard focus and disabled interactions working", async () => {
    const onClick = vi.fn();
    render(
      <ThemeProvider scope="local" designSystem="carbon">
        <Button label="Submit" onClick={onClick} />
        <Button label="Disabled button" disabled onClick={onClick} />
        <Button label="Loading button" loading onClick={onClick} />
        <Button label="Next action" />
      </ThemeProvider>,
    );
    const user = userEvent.setup();
    await user.tab();
    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toHaveFocus();
    expect(getComputedStyle(button).outlineStyle).toBe("solid");
    expect(getComputedStyle(button).outlineWidth).toBe("2px");
    expect(getComputedStyle(button).outlineColor).toBe("rgb(15, 98, 254)");
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "Disabled button" }));
    fireEvent.click(screen.getByRole("button", { name: "Loading button" }));
    expect(onClick).toHaveBeenCalledOnce();
    await user.tab();
    expect(screen.getByRole("button", { name: "Next action" })).toHaveFocus();
  });
});
