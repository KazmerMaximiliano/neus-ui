import { act, cleanup, render, renderHook, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ToastProvider } from "./ToastProvider";
import { useToast } from "./useToast";
import type { ToastApi, ToastProviderProps } from "./ToastProvider.types";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
});

const setup = (props: Omit<ToastProviderProps, "children"> = {}) => {
  const api: { current?: ToastApi } = {};
  const Probe = () => {
    api.current = useToast();
    return <p>Page</p>;
  };
  render(<ToastProvider {...props}><Probe /></ToastProvider>);
  return api as { current: ToastApi };
};

const region = () => screen.getByRole("region", { name: "Notifications" });
const lists = () => [...region().querySelectorAll<HTMLElement>(".toast-region__list")];

describe("ToastProvider", () => {
  describe("rendering", () => {
    it("renders its children and mounts both live lists while empty", () => {
      setup();

      expect(screen.getByText("Page")).toBeInTheDocument();
      expect(region()).toHaveAttribute("data-placement", "bottom-end");
      expect(lists().map((list) => list.getAttribute("aria-live"))).toEqual(["polite", "assertive"]);
      expect(lists().every((list) => list.childElementCount === 0)).toBe(true);
    });

    it("adds a toast to the polite list by default and returns its id", () => {
      const api = setup();
      let id = "";

      act(() => {
        id = api.current.show({ status: "success", title: "Saved", message: "Profile updated." });
      });
      const [polite, assertive] = lists();

      expect(id).toMatch(/^toast-\d+$/);
      expect(within(polite).getByText("Saved").closest(".toast")).toHaveAttribute("data-status", "success");
      expect(within(polite).getByText("Profile updated.")).toBeInTheDocument();
      expect(assertive.childElementCount).toBe(0);
    });

    it("puts assertive toasts in the assertive list", () => {
      const api = setup();

      act(() => {
        api.current.show({ status: "error", title: "Payment failed", live: "assertive" });
      });

      expect(within(lists()[1]).getByText("Payment failed")).toBeInTheDocument();
    });

    it("shows the newest toasts up to max and brings back older ones as they close", () => {
      const api = setup({ max: 2 });
      const ids: string[] = [];

      act(() => {
        for (const title of ["First", "Second", "Third"]) ids.push(api.current.show({ title }));
      });
      expect(screen.queryByText("First")).not.toBeInTheDocument();
      expect(screen.getByText("Second")).toBeInTheDocument();
      expect(screen.getByText("Third")).toBeInTheDocument();

      act(() => api.current.dismiss(ids[2]));
      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.queryByText("Third")).not.toBeInTheDocument();
    });
  });

  describe("dismissal", () => {
    it("closes a toast from its close button, named by the provider", async () => {
      const user = userEvent.setup();
      const api = setup({ dismissLabel: "Close notification" });

      act(() => {
        api.current.show({ title: "Saved" });
        api.current.show({ title: "Sent", dismissLabel: "Close sent" });
      });
      await user.click(screen.getByRole("button", { name: "Close notification" }));

      expect(screen.queryByText("Saved")).not.toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Close sent" })).toBeInTheDocument();
    });

    it("closes after five seconds unless the toast or the provider sets another duration", () => {
      vi.useFakeTimers();
      const api = setup({ duration: 8000 });

      act(() => {
        api.current.show({ title: "Provider" });
        api.current.show({ title: "Own", duration: 2000 });
        api.current.show({ title: "Persistent", duration: null });
      });
      act(() => vi.advanceTimersByTime(2000));
      expect(screen.queryByText("Own")).not.toBeInTheDocument();
      expect(screen.getByText("Provider")).toBeInTheDocument();
      act(() => vi.advanceTimersByTime(6000));
      expect(screen.queryByText("Provider")).not.toBeInTheDocument();
      act(() => vi.advanceTimersByTime(60_000));
      expect(screen.getByText("Persistent")).toBeInTheDocument();
    });

    it("uses five seconds by default", () => {
      vi.useFakeTimers();
      const api = setup();

      act(() => {
        api.current.show({ title: "Saved" });
      });
      act(() => vi.advanceTimersByTime(4999));
      expect(screen.getByText("Saved")).toBeInTheDocument();
      act(() => vi.advanceTimersByTime(1));
      expect(screen.queryByText("Saved")).not.toBeInTheDocument();
    });

    it("hands actions a callback that closes their toast", async () => {
      const user = userEvent.setup();
      const api = setup();
      const undo = vi.fn();

      act(() => {
        api.current.show({
          title: "Message archived",
          actions: (close) => (
            <button type="button" onClick={() => { undo(); close(); }}>Undo</button>
          ),
        });
        api.current.show({ title: "Static", actions: <a href="/inbox">Open inbox</a> });
      });
      await user.click(screen.getByRole("button", { name: "Undo" }));

      expect(undo).toHaveBeenCalledOnce();
      expect(screen.queryByText("Message archived")).not.toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Open inbox" })).toBeInTheDocument();
    });
  });

  describe("customization", () => {
    it("labels the region and forwards classes and styles to the region, lists and toasts", () => {
      const api = setup({
        label: "Avisos",
        placement: "top-center",
        className: "region",
        style: { color: "red" },
        listClassName: "list",
        listStyle: { color: "red" },
        toastClassName: "item",
        toastStyle: { color: "red" },
      });

      act(() => {
        api.current.show({ title: "Saved" });
      });
      const named = screen.getByRole("region", { name: "Avisos" });

      expect(named).toHaveClass("toast-region", "region");
      expect(named).toHaveAttribute("data-placement", "top-center");
      expect(named).toHaveStyle({ color: "rgb(255, 0, 0)" });
      for (const list of named.querySelectorAll(".toast-region__list")) {
        expect(list).toHaveClass("list");
        expect(list).toHaveStyle({ color: "rgb(255, 0, 0)" });
      }
      expect(screen.getByText("Saved").closest(".toast")).toHaveClass("item");
      expect(screen.getByText("Saved").closest(".toast")).toHaveStyle({ color: "rgb(255, 0, 0)" });
    });

    it("throws a clear error when useToast has no provider", () => {
      vi.spyOn(console, "error").mockImplementation(() => undefined);

      expect(() => renderHook(() => useToast())).toThrow("useToast needs a ToastProvider");
    });
  });
});
