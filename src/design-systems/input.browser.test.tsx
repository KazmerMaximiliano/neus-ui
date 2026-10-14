import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type {} from "@vitest/browser-playwright";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cdp, page } from "vitest/browser";
import { Input } from "../components/Input";
import "../css/app.css";
import { ThemeProvider } from "../providers";
import { FormTemplate } from "../templates/FormTemplate/FormTemplate";

afterEach(cleanup);

const INPUT_SYSTEM_CASES = [
  {
    id: "neus",
    radius: 40,
    padding: [13.333333, 26.666666],
    border: "1px",
    shadow: false,
  },
  { id: "apple", radius: 8, padding: [12, 16], border: "1px", shadow: false },
  { id: "carbon", radius: 0, padding: [12, 16], border: "1px", shadow: false },
  {
    id: "material",
    radius: 4,
    padding: [16, 16],
    border: "1px",
    shadow: false,
  },
  {
    id: "neobrutalism",
    radius: 4,
    padding: [12, 16],
    border: "3px",
    shadow: true,
  },
  { id: "vercel", radius: 6, padding: [8, 12], border: "1px", shadow: false },
] as const;

/** Resolve semantic colors through the browser instead of comparing CSS syntax. */
const resolveColor = (element: HTMLElement, token: string) => {
  const probe = document.createElement("span");
  probe.style.color = `var(${token})`;
  element.append(probe);
  const value = getComputedStyle(probe).color;
  probe.remove();
  return value;
};

describe.each(["light", "dark"] as const)(
  "Input designs in %s mode",
  (scheme) => {
    it.each(INPUT_SYSTEM_CASES)(
      "renders $id geometry, states and native color field",
      async (system) => {
        const onChange = vi.fn();
        render(
          <ThemeProvider
            scope="local"
            designSystem={system.id}
            colorScheme={scheme}
          >
            <Input
              label="Name"
              placeholder="Enter name"
              required
              onChange={onChange}
            />
            <Input label="Invalid" error="Check this value" />
            <Input label="Disabled" error="Still invalid" disabled />
            <Input label="Read only" readonly defaultValue="Original" />
            <Input
              label="Color"
              type="color"
              defaultValue="#123456"
              onChange={onChange}
            />
          </ThemeProvider>,
        );
        if (import.meta.env.VITE_INPUT_VISUAL_QA === "true") {
          await page.screenshot({
            path: `__screenshots__/input-${system.id}-${scheme}.png`,
          });
        }
        const input = screen.getByRole("textbox", { name: "Name" });
        const wrapper = input.parentElement!;
        const styles = getComputedStyle(input);
        expect(parseFloat(styles.borderRadius)).toBeCloseTo(system.radius, 2);
        expect(parseFloat(styles.paddingTop)).toBeCloseTo(system.padding[0], 2);
        expect(parseFloat(styles.paddingLeft)).toBeCloseTo(
          system.padding[1],
          2,
        );
        expect(styles.borderTopWidth).toBe(system.border);
        expect(styles.boxShadow !== "none").toBe(system.shadow);
        expect(styles.minWidth).toBe("200px");
        expect(getComputedStyle(wrapper).gap).toBe("8px");
        expect(styles.backgroundColor).toBe(
          resolveColor(
            wrapper,
            system.id === "carbon"
              ? "--color-surface-secondary"
              : "--color-surface",
          ),
        );
        expect(styles.color).toBe(
          resolveColor(
            wrapper,
            system.id === "neus"
              ? "--color-control-text"
              : "--color-text-primary",
          ),
        );
        expect(getComputedStyle(input, "::placeholder").color).toBe(
          resolveColor(wrapper, "--color-text-placeholder"),
        );

        const hoverColor = resolveColor(wrapper, "--color-border-input-hover");
        const focusColor = resolveColor(
          wrapper,
          system.id === "neus" ? "--color-info-300" : "--color-focus",
        );
        const errorColor = resolveColor(wrapper, "--color-error");
        await page.getByRole("textbox", { name: "Name", exact: true }).hover();
        await waitFor(() =>
          expect(getComputedStyle(input).borderTopColor).toBe(hoverColor),
        );
        await userEvent.tab();
        expect(input).toHaveFocus();
        await waitFor(() =>
          expect(getComputedStyle(input).borderTopColor).toBe(focusColor),
        );
        await userEvent.type(input, "Ada");
        expect(onChange).toHaveBeenLastCalledWith("Ada");

        const invalid = screen.getByRole("textbox", { name: "Invalid" });
        await userEvent.click(invalid);
        await page
          .getByRole("textbox", { name: "Invalid", exact: true })
          .hover();
        await waitFor(() =>
          expect(getComputedStyle(invalid).borderTopColor).toBe(errorColor),
        );
        expect(invalid).toHaveAccessibleDescription("Check this value");
        const disabled = screen.getByRole("textbox", { name: "Disabled" });
        await page
          .getByRole("textbox", { name: "Disabled", exact: true })
          .hover();
        expect(getComputedStyle(disabled).color).toBe(
          resolveColor(wrapper, "--color-text-disabled"),
        );
        expect(getComputedStyle(disabled).borderTopColor).toBe(
          resolveColor(wrapper, "--color-border-subtle"),
        );
        expect(getComputedStyle(disabled).backgroundColor).toBe(
          resolveColor(wrapper, "--color-surface-disabled"),
        );
        expect(getComputedStyle(screen.getByText("Disabled")).color).toBe(
          resolveColor(wrapper, "--color-text-disabled"),
        );
        expect(getComputedStyle(screen.getByText("Still invalid")).color).toBe(
          resolveColor(wrapper, "--color-error"),
        );
        await userEvent.tab();
        const readonly = screen.getByRole("textbox", { name: "Read only" });
        expect(readonly).toHaveFocus();
        await userEvent.type(readonly, "X");
        expect(readonly).toHaveValue("Original");

        const color = screen.getByLabelText("Color");
        expect(getComputedStyle(color).padding).toBe("0px");
        expect(getComputedStyle(color).borderRadius).toBe(styles.borderRadius);
        expect(parseFloat(getComputedStyle(color).height)).toBeCloseTo(
          parseFloat(getComputedStyle(color).fontSize) * 3.5,
          1,
        );
        fireEvent.change(color, { target: { value: "#abcdef" } });
        expect(onChange).toHaveBeenLastCalledWith("#abcdef");
      },
    );
  },
);

describe("Input scopes and customization", () => {
  it("disables transitions when reduced motion is requested", async () => {
    const session = cdp();
    try {
      await session.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: "reduce" }],
      });
      render(
        <ThemeProvider scope="local">
          <Input label="Name" />
        </ThemeProvider>,
      );
      expect(
        getComputedStyle(screen.getByRole("textbox", { name: "Name" }))
          .transitionDuration,
      ).toBe("0s");
    } finally {
      await session.send("Emulation.setEmulatedMedia", { features: [] });
    }
  });

  it("resets nested Neus geometry and light colors without changing siblings", () => {
    render(
      <>
        <ThemeProvider
          scope="local"
          designSystem="neobrutalism"
          colorScheme="dark"
        >
          <Input label="Outer" />
          <ThemeProvider designSystem="neus" colorScheme="light">
            <Input label="Inner" />
          </ThemeProvider>
        </ThemeProvider>
        <ThemeProvider scope="local" designSystem="vercel" colorScheme="dark">
          <Input label="Sibling" />
        </ThemeProvider>
      </>,
    );
    const inner = screen.getByRole("textbox", { name: "Inner" });
    const styles = getComputedStyle(inner);
    expect(styles.backgroundColor).toBe("rgb(255, 255, 255)");
    expect(styles.color).toBe("rgb(40, 53, 147)");
    expect(getComputedStyle(screen.getByText("Inner")).color).toBe(
      styles.color,
    );
    expect(parseFloat(styles.borderRadius)).toBeCloseTo(40, 2);
    expect(styles.borderTopWidth).toBe("1px");
    expect(styles.boxShadow).toBe("none");
    expect(styles.fontFamily).toContain("Manrope");
    expect(
      getComputedStyle(screen.getByRole("textbox", { name: "Outer" }))
        .borderTopWidth,
    ).toBe("3px");
    expect(
      getComputedStyle(screen.getByRole("textbox", { name: "Sibling" }))
        .borderRadius,
    ).toBe("6px");
  });

  it("updates design and scheme without losing an uncontrolled value", async () => {
    const view = render(
      <ThemeProvider
        scope="local"
        designSystem="neobrutalism"
        colorScheme="dark"
      >
        <Input label="Name" />
      </ThemeProvider>,
    );
    const input = screen.getByRole("textbox", { name: "Name" });
    await userEvent.type(input, "Ada");
    input.blur();
    view.rerender(
      <ThemeProvider scope="local" designSystem="carbon" colorScheme="light">
        <Input label="Name" />
      </ThemeProvider>,
    );
    expect(input).toHaveValue("Ada");
    expect(getComputedStyle(input).borderRadius).toBe("0px");
    expect(getComputedStyle(input).boxShadow).toBe("none");
    expect(getComputedStyle(input).backgroundColor).toBe("rgb(244, 244, 244)");
  });

  it("honors reusable token overrides and restores recipes after inline overrides", () => {
    const view = render(
      <ThemeProvider scope="local" designSystem="apple">
        <Input
          label="Name"
          required
          error="Invalid"
          wrapperStyle={{ gap: 20 }}
          inputStyle={{ borderRadius: 25 }}
          labelStyle={{ fontSize: 19 }}
          requiredStyle={{ marginLeft: 12 }}
          errorStyle={{ fontSize: 17 }}
        />
      </ThemeProvider>,
    );
    const input = screen.getByRole("textbox", { name: "Name" });
    const wrapper = input.parentElement!;
    wrapper.style.setProperty("--input-radius", "18px");
    expect(getComputedStyle(input).borderRadius).toBe("25px");
    expect(getComputedStyle(wrapper).gap).toBe("20px");
    expect(getComputedStyle(screen.getByText("Name")).fontSize).toBe("19px");
    expect(getComputedStyle(screen.getByText("*")).marginLeft).toBe("12px");
    expect(getComputedStyle(screen.getByText("Invalid")).fontSize).toBe("17px");
    view.rerender(
      <ThemeProvider scope="local" designSystem="apple">
        <Input label="Name" required error="Invalid" />
      </ThemeProvider>,
    );
    expect(getComputedStyle(input).borderRadius).toBe("18px");
    wrapper.style.removeProperty("--input-radius");
    expect(getComputedStyle(input).borderRadius).toBe("8px");
    expect(getComputedStyle(wrapper).gap).toBe("8px");
  });

  it("retains the FormTemplate grid placement", () => {
    render(
      <ThemeProvider scope="local">
        <FormTemplate submitLabel="Save">
          <Input label="Name" />
        </FormTemplate>
      </ThemeProvider>,
    );
    const wrapper = screen.getByRole("textbox", {
      name: "Name",
    }).parentElement!;
    expect(getComputedStyle(wrapper).gridColumnStart).toBe("span 1");
    expect(wrapper.getBoundingClientRect().width).toBeGreaterThanOrEqual(200);
  });
});
