import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cdp, page } from "vitest/browser";
import { Input } from "../../components/Input";
import { ThemeProvider } from "../../providers";
import { FormTemplate } from "../../templates/FormTemplate";
import {
  contrastRatio,
  flatten,
  resolveColor,
} from "./colorContrast";
import type {} from "@vitest/browser-playwright";
import "../../css/app.css";

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
  { id: "carbon", radius: 0, padding: [12, 16], border: "0px", shadow: false },
  // Material's floating label sits in a gap of the outline, which the fieldset draws.
  {
    id: "material",
    radius: 4,
    padding: [15, 16],
    border: "1px",
    shadow: false,
    gap: "4px",
    notched: true,
  },
  {
    id: "neobrutalism",
    radius: 4,
    padding: [12, 16],
    border: "3px",
    shadow: true,
  },
  { id: "vercel", radius: 10, padding: [7, 10], border: "1px", shadow: false },
] as const;

describe.each(["light", "dark"] as const)(
  "Input designs in %s mode",
  (scheme) => {
    it.each(INPUT_SYSTEM_CASES)(
      "renders $id geometry, states and native color field",
      async (system) => {
        const user = userEvent.setup();
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
        const wrapper = input.closest<HTMLElement>(".input__wrapper")!;
        const styles = getComputedStyle(input);
        expect(parseFloat(styles.borderRadius)).toBeCloseTo(system.radius, 2);
        expect(parseFloat(styles.paddingTop)).toBeCloseTo(system.padding[0], 2);
        expect(parseFloat(styles.paddingLeft)).toBeCloseTo(
          system.padding[1],
          2,
        );
        expect(styles.borderTopWidth).toBe(system.border);
        expect(styles.borderBottomWidth).toBe(
          system.id === "carbon" ? "1px" : system.border,
        );
        expect(styles.boxShadow !== "none").toBe(system.shadow);
        expect(styles.minWidth).toBe("200px");
        expect(getComputedStyle(wrapper).gap).toBe("gap" in system ? system.gap : "8px");
        expect(styles.backgroundColor).toBe(
          "notched" in system
            ? "rgba(0, 0, 0, 0)"
            : resolveColor(
              wrapper,
              system.id === "carbon"
                ? "--color-surface-secondary"
                : "--color-surface",
            ),
        );
        const outline = getComputedStyle(input.parentElement!.querySelector(".field__outline")!);
        expect(outline.borderTopWidth).toBe("notched" in system ? "1px" : "0px");
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

        const hoverColor = resolveColor(wrapper, "--input-hover-border-color");
        const focusColor = resolveColor(
          wrapper,
          system.id === "neus" ? "--color-info-300" : "--color-focus",
        );
        const errorColor = resolveColor(wrapper, "--color-error");
        await page.getByRole("textbox", { name: "Name", exact: true }).hover();
        await waitFor(() =>
          expect(getComputedStyle(input).borderTopColor).toBe(hoverColor),
        );
        await user.tab();
        expect(input).toHaveFocus();
        await waitFor(() =>
          expect(getComputedStyle(input).borderTopColor).toBe(focusColor),
        );
        if ("notched" in system) {
          expect(outline.borderTopColor).toBe(focusColor);
          expect(outline.borderTopWidth).toBe("2px");
        }
        await user.type(input, "Ada");
        expect(onChange).toHaveBeenLastCalledWith("Ada");

        const invalid = screen.getByRole("textbox", { name: "Invalid" });
        await user.click(invalid);
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
          resolveColor(wrapper, "--input-disabled-color"),
        );
        expect(getComputedStyle(disabled).borderTopColor).toBe(
          resolveColor(wrapper, "--input-disabled-border-color"),
        );
        expect(getComputedStyle(disabled).backgroundColor).toBe(
          resolveColor(wrapper, "--input-disabled-background"),
        );
        expect(getComputedStyle(screen.getByText("Disabled")).color).toBe(
          resolveColor(wrapper, "--input-disabled-color"),
        );
        const message = getComputedStyle(screen.getByText("Still invalid")).color;
        expect(message).toBe(resolveColor(wrapper, "--input-error-color"));
        expect(
          contrastRatio(message, resolveColor(wrapper, "--color-surface")),
        ).toBeGreaterThanOrEqual(4.5);
        await user.tab();
        const readonly = screen.getByRole("textbox", { name: "Read only" });
        expect(readonly).toHaveFocus();
        await user.type(readonly, "X");
        expect(readonly).toHaveValue("Original");

        const color = screen.getByLabelText("Color");
        expect(getComputedStyle(color).padding).toBe("0px");
        expect(getComputedStyle(color).borderRadius).toBe(styles.borderRadius);
        expect(parseFloat(getComputedStyle(color).height)).toBeCloseTo(
          Math.max(48, parseFloat(getComputedStyle(color).fontSize) * 3.5),
          1,
        );
        fireEvent.change(color, { target: { value: "#abcdef" } });
        expect(onChange).toHaveBeenLastCalledWith("#abcdef");
      },
    );
  },
);

describe.each(["light", "dark"] as const)(
  "Input state contract in %s mode",
  (scheme) => {
    it.each(INPUT_SYSTEM_CASES)(
      "distinguishes $id invalid focus, read-only and disabled fields",
      async (system) => {
        render(
          <ThemeProvider
            scope="local"
            designSystem={system.id}
            colorScheme={scheme}
          >
            <Input label="Invalid" error="Check this value" />
            <Input label="Read only" readonly defaultValue="Original" />
            <Input label="Disabled" disabled defaultValue="Original" />
          </ThemeProvider>,
        );
        // What shows focus: the field's ring or border, or the notched outline's width.
        const indicator = (field: HTMLElement) => {
          const own = getComputedStyle(field);
          const outline = getComputedStyle(field.parentElement!.querySelector(".field__outline")!);
          return [own.boxShadow, own.borderBottomColor, outline.borderTopWidth, outline.borderTopColor].join();
        };
        const invalid = screen.getByRole("textbox", { name: "Invalid" });
        const restState = indicator(invalid);
        invalid.focus();
        await waitFor(() => expect(indicator(invalid)).not.toBe(restState));

        const readonly = screen.getByRole("textbox", { name: "Read only" });
        const disabled = screen.getByRole("textbox", { name: "Disabled" });
        const surface = resolveColor(readonly.parentElement!, "--color-surface");
        const r = getComputedStyle(readonly);
        const d = getComputedStyle(disabled);
        expect(r.color).not.toBe(d.color);
        expect(
          [r.backgroundColor, r.borderBottomStyle, r.borderBottomColor].join(),
        ).not.toBe(
          [d.backgroundColor, d.borderBottomStyle, d.borderBottomColor].join(),
        );
        expect(
          contrastRatio(r.color, flatten(r.backgroundColor, surface)),
        ).toBeGreaterThanOrEqual(4.5);

        const readonlyRest = indicator(readonly);
        readonly.focus();
        await waitFor(() => expect(indicator(readonly)).not.toBe(readonlyRest));
      },
    );
  },
);

describe("Material text fields", () => {
  const notch = (field: HTMLElement) => field.parentElement!.querySelector<HTMLElement>(".field__notch")!.getBoundingClientRect();

  it("opens a gap in the outline behind the raised label, with no fill behind either", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider scope="local" designSystem="material">
        <Input label="Email" defaultValue="ada@example.com" required />
        <Input label="Name" />
      </ThemeProvider>,
    );
    const email = screen.getByRole("textbox", { name: /Email/ });
    const name = screen.getByRole("textbox", { name: "Name" });
    const label = email.closest(".input__wrapper")!.querySelector<HTMLElement>(".input__label")!;

    expect(email.getBoundingClientRect().height).toBe(56);
    expect(getComputedStyle(email).backgroundColor).toBe("rgba(0, 0, 0, 0)");
    expect(getComputedStyle(label).backgroundColor).toBe("rgba(0, 0, 0, 0)");
    expect(notch(email).left).toBeCloseTo(label.getBoundingClientRect().left, 0);
    expect(notch(email).width).toBeCloseTo(label.getBoundingClientRect().width, 0);
    expect(notch(name).width).toBeLessThan(1);

    await user.click(name);
    await waitFor(() => expect(notch(name).width).toBeGreaterThan(20));
    // resolveColor appends a probe, which would retrigger waitFor's DOM observer: resolve it first.
    const primary = resolveColor(label, "--color-primary-text");
    await waitFor(() => expect(getComputedStyle(screen.getByText("Name")).color).toBe(primary));
  });

  it("keeps the value in on-surface while invalid and darkens an outlined label on hover", async () => {
    render(
      <ThemeProvider scope="local" designSystem="material">
        <Input label="Phone" error="Enter a phone." defaultValue="12" />
        <Input label="Name" />
        <Input label="Filled" variant="filled" />
      </ThemeProvider>,
    );
    const phone = screen.getByRole("textbox", { name: "Phone" });
    const label = screen.getByText("Name");
    const filled = screen.getByText("Filled");
    const onSurface = resolveColor(label, "--color-text-primary");
    const onSurfaceVariant = resolveColor(label, "--color-text-secondary");

    expect(getComputedStyle(phone).color).toBe(onSurface);
    expect(getComputedStyle(screen.getByText("Phone")).color).toBe(resolveColor(label, "--color-error"));
    expect(getComputedStyle(label).color).toBe(onSurfaceVariant);
    await page.getByRole("textbox", { name: "Name", exact: true }).hover();
    await waitFor(() => expect(getComputedStyle(label).color).toBe(onSurface));
    const filledRest = getComputedStyle(screen.getByRole("textbox", { name: "Filled" })).backgroundColor;
    await page.getByRole("textbox", { name: "Filled", exact: true }).hover();
    await waitFor(() => expect(getComputedStyle(screen.getByRole("textbox", { name: "Filled" })).backgroundColor)
      .not.toBe(filledRest));
    expect(getComputedStyle(filled).color).toBe(onSurfaceVariant);
  });

  it("raises a filled field's label inside its container, with top corners only", () => {
    render(
      <ThemeProvider scope="local" designSystem="material">
        <Input label="Filled" variant="filled" defaultValue="Ada" />
      </ThemeProvider>,
    );
    const field = screen.getByRole("textbox", { name: "Filled" });
    const label = screen.getByText("Filled");
    const styles = getComputedStyle(field);

    expect(label.getBoundingClientRect().top - field.getBoundingClientRect().top).toBeCloseTo(8, 0);
    expect(getComputedStyle(label).backgroundColor).toBe("rgba(0, 0, 0, 0)");
    expect([styles.borderTopLeftRadius, styles.borderBottomLeftRadius]).toEqual(["4px", "0px"]);
    expect(field.getBoundingClientRect().height).toBe(56);
    expect(getComputedStyle(field.parentElement!.querySelector(".field__outline")!).borderTopWidth).toBe("0px");
  });
});

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
    ).toBe("10px");
  });

  it("updates design and scheme without losing an uncontrolled value", async () => {
    const user = userEvent.setup();
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
    await user.type(input, "Ada");
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
    const wrapper = input.closest<HTMLElement>(".input__wrapper")!;
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
    }).closest<HTMLElement>(".input__wrapper")!;
    expect(getComputedStyle(wrapper.parentElement!).display).toBe("grid");
    expect(getComputedStyle(wrapper).gridColumnStart).toBe("auto");
    expect(wrapper.getBoundingClientRect().width).toBeGreaterThanOrEqual(200);
  });
});
