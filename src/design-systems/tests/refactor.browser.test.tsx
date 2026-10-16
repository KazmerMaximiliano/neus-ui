import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import type {} from "@vitest/browser-playwright";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cdp, page } from "vitest/browser";
import {
  Button,
  Calendar,
  Card,
  CardContent,
  Clock,
  DataTable,
  DateInput,
  Input,
  InteractiveMap,
  TimeInput,
  WeekCalendar,
} from "../../components";
import "../../css/app.css";
import { ThemeProvider } from "../../providers";
import { FormTemplate } from "../../templates";
import { DESIGN_SYSTEMS } from "../design-systems.consts";
import {
  contrastRatio,
  flatten,
  resolveColor,
} from "./design-systems.test-utils";
import "./fixtures/refactor.test.css";

afterEach(cleanup);

const forceState = async (element: HTMLElement, pseudoClasses: string[]) => {
  element.setAttribute("data-refactor-force", "target");
  const session = cdp();
  await session.send("DOM.enable");
  await session.send("CSS.enable");
  const { root } = await session.send("DOM.getDocument", {
    depth: -1,
    pierce: true,
  });
  const find = (node: typeof root): number | undefined => {
    if (
      node.attributes?.some(
        (value, index, attributes) =>
          value === "data-refactor-force" && attributes[index + 1] === "target",
      )
    )
      return node.nodeId;
    for (const child of [
      ...(node.children ?? []),
      ...(node.shadowRoots ?? []),
      ...(node.contentDocument ? [node.contentDocument] : []),
    ]) {
      const id = find(child);
      if (id !== undefined) return id;
    }
  };
  const nodeId = find(root);
  if (nodeId === undefined)
    throw new Error("Browser state target was not found");
  await session.send("CSS.forcePseudoState", {
    nodeId,
    forcedPseudoClasses: pseudoClasses,
  });
  element.removeAttribute("data-refactor-force");
};

const days = [new Date(2026, 9, 15), new Date(2026, 9, 16)];
const rows = [{ id: 1, name: "Ana Pérez", email: "ana@example.com" }];
const pagination = { current_page: 1, last_page: 3, per_page: 10, total: 21 };

describe.each(["light", "dark"] as const)(
  "Complete recipes in %s",
  (scheme) => {
    it.each(DESIGN_SYSTEMS)(
      "renders and isolates $id with the real grid",
      async ({ id }) => {
        await page.viewport(1200, 1000);
        const { container } = render(
          <ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
            <div className="refactor-preview">
              <h2>
                {id} / {scheme}
              </h2>
              <div className="refactor-preview-actions">
                {(
                  [
                    "solid",
                    "secondary",
                    "tonal",
                    "elevated",
                    "outlined",
                    "text",
                  ] as const
                ).map((variant) => (
                  <Button key={variant} label={variant} variant={variant} />
                ))}
              </div>
              <div className="refactor-preview-fields">
                <Input label="Automatic" defaultValue="Ada Lovelace" />
                <Input
                  label="Floating"
                  labelPlacement="floating"
                  variant="outlined"
                  prefix="$"
                  suffix="USD"
                  defaultValue="100"
                />
                <Input label="Invalid" error="Please check this value" />
                <Input label="Filled" variant="filled" defaultValue="Value" />
                <DateInput label="Date" defaultValue={days[0]} />
                <TimeInput
                  label="Time"
                  defaultValue={{ hours: 14, minutes: 30 }}
                />
              </div>
              <div className="refactor-preview-cards">
                {(["filled", "outlined", "elevated"] as const).map(
                  (variant) => (
                    <Card key={variant} variant={variant}>
                      <CardContent>
                        {variant} card{" "}
                        <Button label={`${variant} action`} size="small" />
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
              <DataTable
                data={rows}
                columnDefs={[{ field: "name" }, { field: "email" }]}
                pagination={pagination}
              />
              <WeekCalendar
                events={[
                  {
                    category: {
                      title: "Design",
                      label: "Review",
                      color: "#5c6bc0",
                    },
                    events: [
                      { id: 1, title: "Review", start: days[0], end: days[1] },
                    ],
                  },
                ]}
              />
              <InteractiveMap googleMapsApiKey="" />
            </div>
          </ThemeProvider>,
        );
        await waitFor(() =>
          expect(
            container.querySelector(".ag-cell[col-id='name']"),
          ).toHaveTextContent("Ana Pérez"),
        );
        const input = screen.getByRole("textbox", { name: "Automatic" });
        const label = screen.getByText("Automatic", { selector: "label" });
        expect(getComputedStyle(label).position).toBe(
          id === "material" ? "absolute" : "static",
        );
        const surface = resolveColor(
          input.closest<HTMLElement>(".input__wrapper")!,
          "--color-surface",
        );
        expect(
          contrastRatio(getComputedStyle(input).color, surface),
        ).toBeGreaterThanOrEqual(4.5);
        for (const variant of ["secondary", "tonal", "elevated"]) {
          const button = screen.getByRole("button", { name: variant });
          await waitFor(() => {
            const current = getComputedStyle(button);
            expect(
              contrastRatio(
                current.color,
                flatten(current.backgroundColor, surface),
              ),
              `${id}/${scheme}/${variant}: ${current.color} on ${current.backgroundColor}`,
            ).toBeGreaterThanOrEqual(4.5);
          });
          await forceState(button, ["hover"]);
          await waitFor(() =>
            expect(
              contrastRatio(
                getComputedStyle(button).color,
                flatten(getComputedStyle(button).backgroundColor, surface),
              ),
            ).toBeGreaterThanOrEqual(4.5),
          );
          await forceState(button, []);
        }
        const gridCell = container.querySelector<HTMLElement>(
          ".ag-cell[col-id='name']",
        )!;
        expect(getComputedStyle(gridCell).fontFamily).toBe(
          getComputedStyle(input).fontFamily,
        );
        expect(
          getComputedStyle(container.querySelector(".ag-root-wrapper")!)
            .backgroundColor,
        ).toBe(
          resolveColor(
            input.closest<HTMLElement>(".input__wrapper")!,
            "--data-table-background",
          ),
        );
        if (import.meta.env.VITE_REFACTOR_VISUAL_QA === "true")
          await page.screenshot({
            path: `__screenshots__/refactor-${id}-${scheme}.png`,
            fullPage: true,
          });
      },
    );
  },
);

it("keeps semantic action states readable in all systems and schemes", async () => {
  for (const { id } of DESIGN_SYSTEMS)
    for (const scheme of ["light", "dark"] as const) {
      const view = render(
        <ThemeProvider scope="local" designSystem={id} colorScheme={scheme}>
          {(["success", "error", "info"] as const).map((color) => (
            <Button key={color} label={color} color={color} />
          ))}
        </ThemeProvider>,
      );
      for (const color of ["success", "error", "info"] as const) {
        const element = screen.getByRole("button", { name: color });
        expect(
          contrastRatio(
            getComputedStyle(element).color,
            getComputedStyle(element).backgroundColor,
          ),
        ).toBeGreaterThanOrEqual(4.5);
        await forceState(element, ["hover"]);
        await waitFor(() =>
          expect(
            contrastRatio(
              getComputedStyle(element).color,
              getComputedStyle(element).backgroundColor,
            ),
          ).toBeGreaterThanOrEqual(4.5),
        );
        await forceState(element, []);
      }
      view.unmount();
    }
});

it("isolates new contracts inside nested scopes and switches grid themes at runtime", async () => {
  const view = render(
    <ThemeProvider scope="local" designSystem="neobrutalism" colorScheme="dark">
      <ThemeProvider designSystem="neus" colorScheme="light">
        <DataTable
          data={rows}
          columnDefs={[{ field: "name" }]}
          pagination={pagination}
        />
      </ThemeProvider>
    </ThemeProvider>,
  );
  await waitFor(() =>
    expect(document.querySelector(".ag-cell")).toHaveTextContent("Ana Pérez"),
  );
  const root = document.querySelector(".ag-root-wrapper")!;
  expect(getComputedStyle(root).borderRadius).toBe("16px");
  expect(getComputedStyle(root).backgroundColor).toBe("rgb(255, 255, 255)");
  view.rerender(
    <ThemeProvider scope="local" designSystem="carbon" colorScheme="dark">
      <DataTable
        data={rows}
        columnDefs={[{ field: "name" }]}
        pagination={pagination}
      />
    </ThemeProvider>,
  );
  await waitFor(() =>
    expect(
      getComputedStyle(document.querySelector(".ag-root-wrapper")!)
        .borderRadius,
    ).toBe("0px"),
  );
  expect(
    getComputedStyle(document.querySelector(".ag-root-wrapper")!)
      .backgroundColor,
  ).toBe("rgb(38, 38, 38)");
});

it("keeps narrow forms usable and honors floating-label overrides", async () => {
  await page.viewport(320, 800);
  render(
    <ThemeProvider scope="local" designSystem="material">
      <div className="refactor-preview">
        <FormTemplate submitLabel="Save" columns={3} gap={24}>
          <Input
            label="A long translated field label"
            labelPlacement="external"
          />
          <Input label="Floating empty" />
          <Input label="Color" type="color" />
        </FormTemplate>
      </div>
    </ThemeProvider>,
  );
  const label = screen.getByText("A long translated field label", {
    selector: "label",
  });
  expect(getComputedStyle(label).position).toBe("static");
  const field = screen.getByRole("textbox", { name: "Floating empty" });
  const floating = screen.getByText("Floating empty", { selector: "label" });
  const resting = floating.getBoundingClientRect().top;
  field.focus();
  expect(floating.getBoundingClientRect().top).toBeLessThan(resting);
  fireEvent.change(field, { target: { value: "Filled" } });
  field.blur();
  expect(floating.getBoundingClientRect().top).toBeLessThan(resting);
  expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(320);
});

it("supports real DayPicker selection and keyboard Clock interaction", async () => {
  await page.viewport(1000, 900);
  const onChange = vi.fn();
  render(
    <ThemeProvider scope="local" designSystem="carbon">
      <Calendar defaultValue={days[0]} onChange={onChange} />
      <Clock
        value={{ hours: 13, minutes: 5 }}
        format="24h"
        onChange={onChange}
      />
    </ThemeProvider>,
  );
  const day = document.querySelector<HTMLButtonElement>(
    ".rdp-day_button[tabindex='0']",
  )!;
  day.focus();
  fireEvent.click(day);
  expect(onChange).toHaveBeenCalledWith(undefined);
  const dial = screen.getByRole("slider");
  fireEvent.keyDown(dial, { key: "ArrowUp" });
  expect(onChange).toHaveBeenLastCalledWith({ hours: 14, minutes: 5 });
});

it("keeps semantic quiet actions and custom accents readable", () => {
  for (const { id } of DESIGN_SYSTEMS)
    for (const scheme of ["light", "dark"] as const) {
      const view = render(
        <ThemeProvider
          scope="local"
          designSystem={id}
          colorScheme={scheme}
          initialTheme={{ primaryColor: "#ffff00" }}
        >
          <Input label="Custom accent" />
          <Button label="Custom solid" />
          <Button label="Custom outline" variant="outlined" />
          {(["success", "error", "info"] as const).map((color) => (
            <Button key={color} label={color} color={color} variant="text" />
          ))}
        </ThemeProvider>,
      );
      const input = screen.getByRole("textbox");
      const surface = resolveColor(
        input.closest<HTMLElement>(".input__wrapper")!,
        "--color-surface",
      );
      expect(
        contrastRatio(getComputedStyle(input).color, surface),
        `${id}/${scheme}/custom input`,
      ).toBeGreaterThanOrEqual(4.5);
      for (const name of ["Custom outline", "success", "error", "info"]) {
        const button = screen.getByRole("button", { name });
        expect(
          contrastRatio(getComputedStyle(button).color, surface),
          `${id}/${scheme}/${name}`,
        ).toBeGreaterThanOrEqual(4.5);
      }
      const solid = getComputedStyle(
        screen.getByRole("button", { name: "Custom solid" }),
      );
      expect(
        contrastRatio(solid.color, solid.backgroundColor),
      ).toBeGreaterThanOrEqual(4.5);
      view.unmount();
    }
});
