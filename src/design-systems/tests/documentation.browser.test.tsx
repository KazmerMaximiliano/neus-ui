import { composeStories } from "@storybook/react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { Button, Input, Menu, Modal, ModalContent, ModalHeader } from "../../components";
import { ThemeProvider } from "../../providers";
import * as appStories from "../../templates/AppTemplate/AppTemplate.stories";
import * as formStories from "../../templates/FormTemplate/FormTemplate.stories";
import "../../css/app.css";
import "./fixtures/documentation-customization.css";
import { DESIGN_SYSTEMS } from "../design-systems.consts";
import { resolveColor } from "./design-systems.test-utils";

const { AppTemplate } = composeStories(appStories);
const { FormTemplate } = composeStories(formStories);

afterEach(cleanup);

describe.each(["light", "dark"] as const)("Documented templates in %s", (scheme) => {
  it.each(DESIGN_SYSTEMS)("inherits, overrides and restores $id in both stories", async ({ id }) => {
    await page.viewport(1280, 900);
    const documentSystem = document.documentElement.getAttribute("data-design-system");
    const app = render(
      <ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
        <AppTemplate designSystem="global" />
      </ThemeProvider>,
    );
    const shell = app.container.querySelector<HTMLElement>(".app-template")!;
    const local = shell.closest<HTMLElement>("[data-design-system]")!;
    expect(local).toHaveAttribute("data-design-system", id);
    expect(local).toHaveAttribute("data-color-scheme", scheme);
    expect(getComputedStyle(shell).backgroundColor).toBe(resolveColor(shell, "--app-template-background"));
    app.rerender(
      <ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
        <AppTemplate designSystem={id === "carbon" ? "neus" : "carbon"} />
      </ThemeProvider>,
    );
    expect(local).toHaveAttribute("data-design-system", id === "carbon" ? "neus" : "carbon");
    expect(local).toHaveAttribute("data-color-scheme", scheme);
    app.rerender(
      <ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
        <AppTemplate designSystem="global" />
      </ThemeProvider>,
    );
    expect(local).toHaveAttribute("data-design-system", id);
    app.unmount();

    const form = render(
      <ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
        <FormTemplate designSystem="global" />
      </ThemeProvider>,
    );
    const grid = form.container.querySelector<HTMLElement>(".form-template")!;
    const formScope = grid.closest<HTMLElement>("[data-design-system]")!;
    expect(formScope).toHaveAttribute("data-design-system", id);
    expect(formScope).toHaveAttribute("data-color-scheme", scheme);
    expect(getComputedStyle(grid).display).toBe("grid");
    expect(getComputedStyle(grid).backgroundColor).toBe(resolveColor(grid, "--form-template-background"));
    form.rerender(
      <ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
        <FormTemplate designSystem={id === "vercel" ? "neus" : "vercel"} />
      </ThemeProvider>,
    );
    expect(formScope).toHaveAttribute("data-design-system", id === "vercel" ? "neus" : "vercel");
    expect(formScope).toHaveAttribute("data-color-scheme", scheme);
    form.rerender(
      <ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
        <FormTemplate designSystem="global" />
      </ThemeProvider>,
    );
    expect(formScope).toHaveAttribute("data-design-system", id);
    expect(document.documentElement.getAttribute("data-design-system")).toBe(documentSystem);
  });
});

it.each([1280, 900, 375])("preserves responsive layout and drawer scope at %ipx", async (width) => {
  await page.viewport(width, 900);
  const app = render(
    <ThemeProvider scope="local" designSystem="material" colorScheme="dark">
      <AppTemplate designSystem="global" />
    </ThemeProvider>,
  );
  const sidebar = app.container.querySelector<HTMLElement>(".sidebar")!;
  await waitFor(() => expect(sidebar).toHaveAttribute("data-viewport", width < 768 ? "mobile" : width < 1024 ? "tablet" : "desktop"));
  if (width < 768) {
    fireEvent.click(app.container.querySelector(".sidebar__toggle")!);
    const dialog = screen.getByRole("dialog");
    expect(dialog.closest("[data-design-system]")).toHaveAttribute("data-design-system", "material");
    expect(dialog.closest("[data-color-scheme]")).toHaveAttribute("data-color-scheme", "dark");
  }
  app.unmount();
  const form = render(
    <ThemeProvider scope="local" designSystem="material">
      <FormTemplate designSystem="global" />
    </ThemeProvider>,
  );
  const grid = form.container.querySelector<HTMLElement>(".form-template")!;
  expect(getComputedStyle(grid).gridTemplateColumns.split(" ")).toHaveLength(width < 768 ? 1 : 2);
});

it("applies documented classes and tokens through focus, disabled and nested scopes", async () => {
  await page.viewport(1280, 900);
  const view = render(
    <ThemeProvider scope="local" designSystem="vercel" className="documentation-theme">
      <Input
        className="documentation-field"
        label="Email"
        labelClassName="documentation-label"
        inputClassName="documentation-input"
        labelStyle={{ fontWeight: 600 }}
      />
      <ThemeProvider scope="local" designSystem="neus"><Input label="Nested" /></ThemeProvider>
    </ThemeProvider>,
  );
  const input = screen.getByRole("textbox", { name: "Email" });
  const nested = screen.getByRole("textbox", { name: "Nested" });
  expect(getComputedStyle(input).borderRadius).toBe("10px");
  expect(getComputedStyle(nested).borderRadius).not.toBe("10px");
  const label = view.container.querySelector<HTMLElement>(".documentation-label")!;
  expect(getComputedStyle(label).fontWeight).toBe("600");
  input.focus();
  await waitFor(() => expect(getComputedStyle(input).borderColor).toBe("rgb(24, 86, 144)"));
  expect(getComputedStyle(input).outlineOffset).toBe("3px");
  view.rerender(
    <ThemeProvider scope="local" designSystem="vercel" className="documentation-theme">
      <Input
        className="documentation-field"
        label="Email"
        inputClassName="documentation-input"
        disabled
      />
    </ThemeProvider>,
  );
  expect(input).toBeDisabled();
  expect(getComputedStyle(input).cursor).toBe("not-allowed");
  expect(getComputedStyle(input).color).toBe("rgb(99, 102, 106)");
});

it("keeps part classes and palette inheritance in popovers and dialog backdrops", async () => {
  const view = render(
    <ThemeProvider scope="local" designSystem="carbon" colorScheme="dark">
      <Menu
        text="Actions"
        itemClassName="documentation-menu-item"
        items={[{ label: "Edit", onClick: () => { } }]}
      />
      <Modal className="documentation-dialog" isOpen>
        <ModalHeader><h2>Project</h2></ModalHeader>
        <ModalContent><Button label="Save" /></ModalContent>
      </Modal>
    </ThemeProvider>,
  );
  const dialog = screen.getByRole("dialog", { name: "Project" });
  expect(dialog.closest("[data-design-system]")).toHaveAttribute("data-design-system", "carbon");
  expect(getComputedStyle(dialog, "::backdrop").backgroundColor).toBe("rgba(0, 0, 0, 0.65)");
  // Close the native modal before exercising the independent menu trigger.
  view.rerender(
    <ThemeProvider scope="local" designSystem="carbon" colorScheme="dark">
      <Menu
        text="Actions"
        itemClassName="documentation-menu-item"
        items={[{ label: "Edit", onClick: () => { } }]}
      />
    </ThemeProvider>,
  );
  fireEvent.click(screen.getByRole("button", { name: "Actions" }));
  const item = screen.getByRole("menuitem", { name: "Edit" });
  expect(item).toHaveClass("menu__item", "documentation-menu-item");
  expect(item.closest("[data-color-scheme]")).toHaveAttribute("data-color-scheme", "dark");
});
