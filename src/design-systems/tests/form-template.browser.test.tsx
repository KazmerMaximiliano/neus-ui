import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { page } from "vitest/browser";
import { Input } from "../../components";
import "../../css/app.css";
import { ThemeProvider } from "../../providers";
import { FormTemplate } from "../../templates/FormTemplate/FormTemplate";

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
