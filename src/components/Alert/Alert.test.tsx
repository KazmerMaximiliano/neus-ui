import { composeStories } from "@storybook/react";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import type { AlertProps } from "../../index";
import { Alert } from "../../index";
import * as stories from "./Alert.stories";

afterEach(cleanup);

const { Alert: AlertStory } = composeStories(stories);

describe("Alert", () => {
  it("renders a polite info status with its icon and message, without empty parts", () => {
    const { container } = render(<Alert>Saved drafts sync every minute.</Alert>);
    const alert = screen.getByRole("status");
    expect(alert).toHaveClass("alert");
    expect(alert).toHaveAttribute("data-status", "info");
    expect(alert.querySelector(".alert__icon svg")).toBeInTheDocument();
    expect(alert.querySelector(".alert__icon")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("Saved drafts sync every minute.")).toHaveClass("alert__content");
    for (const part of [".alert__title", ".alert__actions", ".alert__dismiss"]) {
      expect(container.querySelector(part)).not.toBeInTheDocument();
    }
  });

  it.each([["assertive", "alert"], ["polite", "status"]] as const)("maps live=%s to role=%s", (live, role) => {
    render(<Alert live={live} status="error">Payment failed.</Alert>);
    expect(screen.getByRole(role)).toHaveAttribute("data-status", "error");
  });

  it("drops the role when live is off", () => {
    const { container } = render(<Alert live="off">Note</Alert>);
    expect(container.firstElementChild).not.toHaveAttribute("role");
  });

  it("renders title and actions, replaces or removes the icon", () => {
    const { rerender, container } = render(
      <Alert status="success" title="Booked" actions={<button type="button">Undo</button>} icon={<span data-testid="mine" />}>
        See you on Monday.
      </Alert>,
    );
    expect(screen.getByText("Booked")).toHaveClass("alert__title");
    expect(screen.getByRole("button", { name: "Undo" }).parentElement).toHaveClass("alert__actions");
    expect(screen.getByTestId("mine").parentElement).toHaveClass("alert__icon");
    rerender(<Alert icon={null}>No icon</Alert>);
    expect(container.querySelector(".alert__icon")).not.toBeInTheDocument();
  });

  it("calls onDismiss from a close button named by dismissLabel", async () => {
    const onDismiss = vi.fn();
    render(<Alert onDismiss={onDismiss} dismissLabel="Cerrar">Mensaje</Alert>);
    await userEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it("forwards native attributes, refs and every part's class and style", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Alert ref={ref} id="trial" className="root" style={{ marginBlock: 8 }} title="T" actions={<span>A</span>}
        onDismiss={() => {}} dismissLabel="Close"
        iconClassName="i" iconStyle={{ color: "red" }} titleClassName="t" titleStyle={{ color: "red" }}
        contentClassName="c" contentStyle={{ color: "red" }} actionsClassName="a" actionsStyle={{ color: "red" }}
        dismissClassName="d" dismissStyle={{ color: "red" }}>
        Body
      </Alert>,
    );
    const alert = screen.getByRole("status");
    expect(ref.current).toBe(alert);
    expect(alert).toHaveAttribute("id", "trial");
    expect(alert).toHaveClass("alert", "root");
    expect(alert).toHaveStyle({ marginBlock: "8px" });
    for (const [part, extra] of [["alert__icon", "i"], ["alert__title", "t"], ["alert__content", "c"], ["alert__actions", "a"], ["alert__dismiss", "d"]]) {
      const element = alert.querySelector(`.${part}`)!;
      expect(element).toHaveClass(extra);
      expect(element).toHaveStyle({ color: "rgb(255, 0, 0)" });
    }
  });

  it("renders its story", async () => {
    render(<AlertStory />);
    expect(screen.getByRole("status")).toHaveAttribute("data-status", "warning");
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("types the status and requires a label with onDismiss", () => {
    expectTypeOf<AlertProps>().toHaveProperty("actions");
    // @ts-expect-error the close button needs an accessible name
    void (<Alert onDismiss={() => {}}>Message</Alert>);
    // @ts-expect-error a label without a handler renders nothing
    void (<Alert dismissLabel="Close">Message</Alert>);
    // @ts-expect-error statuses are info, success, warning and error
    void (<Alert status="danger">Message</Alert>);
  });
});
