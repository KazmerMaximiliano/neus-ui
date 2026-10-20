import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { page } from "vitest/browser";
import { Button, DateInput, Input, Select } from "../../components";
import "../../css/app.css";
import { ThemeProvider } from "../../providers";
import { FormTemplate } from "../../templates/FormTemplate/FormTemplate";
import { DESIGN_SYSTEMS } from "../design-systems.consts";

afterEach(cleanup);

const box = (label: string) => screen.getByText(label, { selector: "label" }).parentElement!.getBoundingClientRect();

it("spans every column with form-template__full", async () => {
  await page.viewport(1280, 900);
  render(
    <ThemeProvider scope="local">
      <div style={{ width: 720 }}>
        <FormTemplate submitLabel="Enviar">
          <Input label="Nombre" />
          <Input label="Motivo" className="form-template__full" description="Contanos qué le pasa a tu mascota y desde cuándo." />
        </FormTemplate>
      </div>
    </ThemeProvider>,
  );
  expect(Math.round(box("Motivo").width)).toBeGreaterThan(Math.round(box("Nombre").width) * 1.9);
});

const height = (element: Element) => Math.round(element.getBoundingClientRect().height);

// Neus and Geist give buttons the field heights; the other systems keep their own standard heights.
describe.each(["neus", "vercel"] as const)("Field and button heights in %s", (id) => {
  it.each(["small", "medium", "large"] as const)("makes a %s button as tall as the field of that size", (size) => {
    const { container } = render(
      <ThemeProvider scope="local" designSystem={id}>
        <Button label="Guardar" size={size} />
        <Input label="Nombre" size={size} />
        <DateInput label="Fecha" size={size} />
      </ThemeProvider>,
    );
    const button = height(container.querySelector(".button")!);
    expect(height(screen.getByRole("textbox", { name: "Nombre" }))).toBe(button);
    expect(height(container.querySelector(".picker-field__field")!)).toBe(button);
  });
});

it.each(DESIGN_SYSTEMS)("gives Select the height of a medium Input in $id", ({ id }) => {
  const { container } = render(
    <ThemeProvider scope="local" designSystem={id}>
      <Input label="Nombre" />
      <Select label="Motivo" options={[{ value: "a", label: "A" }]} />
    </ThemeProvider>,
  );
  expect(height(container.querySelector(".select__field")!)).toBe(height(screen.getByRole("textbox", { name: "Nombre" })));
});
