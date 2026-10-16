import { render as renderCustomization } from "@testing-library/react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { FormTemplate as CustomizationComponent } from "./FormTemplate";
import { ThemeProvider as CustomizationThemeProvider } from "../../providers";
import { FormTemplate } from "./FormTemplate";

afterEach(cleanup);
describe("FormTemplate", () => {
  it("preserves arbitrary children and provides a submit action", () => {
    const { container } = render(<FormTemplate submitLabel="Save"><label>Name<input /></label></FormTemplate>);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute("type", "submit");
    expect(container.querySelector("form")).toBeNull();
  });
  it("accepts custom actions and independent styling", () => {
    const { container } = render(<FormTemplate
      submitLabel="Save"
      actions={<button>Custom</button>}
      className="custom"
      actionsStyle={{ gap: 20 }}
      style={{ padding: 10 }}
    >Content</FormTemplate>);
    expect(screen.queryByRole("button", { name: "Save" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Custom" })).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("custom");
    expect(container.firstChild).toHaveStyle({ padding: "10px" });
    expect(container.querySelector(".form-template__submit")).toHaveStyle({ gap: "20px" });
  });
  it("normalizes column counts and maps a numeric gap to pixels", () => {
    const { container } = render(<FormTemplate submitLabel="Save" columns={0} tabletColumns={3.8} mobileColumns={NaN} gap={24}>Content</FormTemplate>);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue("--form-template-columns")).toBe("1");
    expect(root.style.getPropertyValue("--form-template-tablet-columns")).toBe("3");
    expect(root.style.getPropertyValue("--form-template-mobile-columns")).toBe("1");
    expect(root.style.getPropertyValue("--form-template-gap")).toBe("24px");
  });
  it("retains CSS gap expressions and busy action semantics", () => {
    const { container } = render(<FormTemplate submitLabel="Save" loading gap="2rem">Content</FormTemplate>);
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
    expect((container.firstElementChild as HTMLElement).style.getPropertyValue("--form-template-gap")).toBe("2rem");
  });
});


describe("FormTemplate part customization", () => {
  it.each([
    {
      "cls": "actionsClassName",
      "sty": "actionsStyle",
      "base": "form-template__submit",
      "phase": "default"
    }
  ])(
    "applies and removes $cls / $sty ($phase) while preserving base classes",
    async ({ cls, sty, base }) => {
      const overrides = { [cls]: "consumer-part", [sty]: { outlineOffset: "7px" } };
      const view = renderCustomization(<CustomizationThemeProvider scope="local"><CustomizationComponent submitLabel="Save" {...overrides}><input aria-label="Name" /></CustomizationComponent></CustomizationThemeProvider>);
      const targets = view.container.querySelectorAll(".consumer-part");
      expect(targets.length).toBeGreaterThan(0);
      for (const target of targets) {
        expect(target).toHaveClass(base);
        expect(target).toHaveStyle({ outlineOffset: "7px" });
      }
      view.rerender(<CustomizationThemeProvider scope="local"><CustomizationComponent submitLabel="Save" ><input aria-label="Name" /></CustomizationComponent></CustomizationThemeProvider>);
      expect(view.container.querySelector(".consumer-part")).toBeNull();
      for (const target of view.container.querySelectorAll("." + base)) {
        expect((target as HTMLElement).style.outlineOffset).not.toBe("7px");
      }
    },
  );
});
