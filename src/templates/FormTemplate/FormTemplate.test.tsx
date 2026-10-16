import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
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
    const { container } = render(<FormTemplate submitLabel="Save" actions={<button>Custom</button>} className="custom" actionsStyle={{ gap: 20 }} style={{ padding: 10 }}>Content</FormTemplate>);
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
